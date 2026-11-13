import { describe, it, expect } from 'vitest';
import {
  calculateCentComparison,
  calculateBrokerSymbolPositionSize,
  convertUsdAndUsc,
  simulateHighWaterMarkFeeSchedule
} from '../cent-calculator';
import {
  calculateRequiredRecoveryGainPercent,
  calculateBreakevenWinRatePercent,
  calculateRiskMetrics
} from '../risk-engine';
import { simulatePlaygroundDecision } from '../playground-engine';
import { PLAYGROUND_SCENARIOS } from '../../data/playground-scenarios';
import { computeTradeRMultiple, computeJournalAnalytics } from '../journal-analytics';
import { getDefaultTelemetrySystemState } from '../../telemetry/telemetry-provider';
import { EDUCATIONAL_SAMPLE_JOURNAL_ENTRIES } from '../../storage/jgs-local-store';

describe('JGS Financial Math & Honesty Engines', () => {
  describe('Bidirectional USD <-> USC Conversion', () => {
    it('converts USD to USC (1 USD = 100 USC) and USC to USD accurately', () => {
      const fromUsd = convertUsdAndUsc(25, 'USD');
      expect(fromUsd.usd).toBe(25);
      expect(fromUsd.usc).toBe(2500);

      const fromUsc = convertUsdAndUsc(2500, 'USC');
      expect(fromUsc.usc).toBe(2500);
      expect(fromUsc.usd).toBe(25);
    });
  });

  describe('Broker-Specific Symbol Specification Position Sizer', () => {
    it('approves exact risk-compliant volume on a Cent Account (2,500 USC, 1% risk, XAUUSD)', () => {
      const res = calculateBrokerSymbolPositionSize({
        equity: 2500,
        accountDenomination: 'USC',
        riskPercentage: 1.0,
        stopLossDistance: 2.5,
        tickSize: 0.01,
        tickValuePerLot: 1.0,
        minimumLot: 0.01,
        maximumLot: 100.0,
        volumeStep: 0.01,
        leverage: 500,
        contractUnitsPerLot: 1,
        referencePrice: 2650.0
      });

      expect(res.status).toBe('APPROVED');
      expect(res.isExecutable).toBe(true);
      expect(res.maxAllowedRiskAmount).toBe(25);
      expect(res.stopLossTicks).toBe(250);
      expect(res.lossPerOneFullLot).toBe(250);
      expect(res.approvedLotSize).toBe(0.1);
      expect(res.actualRiskAmount).toBe(25);
      expect(res.actualRiskPercentage).toBe(1.0);
      // Margin: (0.10 * 1 * 2650) / 500 = 0.53 USC
      expect(res.estimatedMarginRequired).toBeCloseTo(0.53, 2);
      expect(res.estimatedFreeMargin).toBeCloseTo(2499.47, 2);
    });

    it('explicitly REJECTS the trade size instead of rounding up to minimumLot when risk limit cannot be met', () => {
      // $25 Standard Account, 1% risk ($0.25 max risk), $2.50 Gold stop (250 ticks * $1/tick/lot = $250/lot)
      // Ideal lot = 0.25 / 250 = 0.001 lots, which is below minimumLot (0.01).
      // Minimum 0.01 lot would risk $2.50 (10% of equity). Must be REJECTED!
      const rejected = calculateBrokerSymbolPositionSize({
        equity: 25,
        accountDenomination: 'USD',
        riskPercentage: 1.0,
        stopLossDistance: 2.5,
        tickSize: 0.01,
        tickValuePerLot: 1.0,
        minimumLot: 0.01,
        maximumLot: 100.0,
        volumeStep: 0.01
      });

      expect(rejected.status).toBe('REJECTED_RISK_LIMIT_EXCEEDED');
      expect(rejected.isExecutable).toBe(false);
      expect(rejected.approvedLotSize).toBeNull();
      expect(rejected.actualRiskAmount).toBeNull();
      expect(rejected.rawIdealLotSize).toBeCloseTo(0.001, 5);
      expect(rejected.lossAtMinimumLot).toBe(2.5);
      expect(rejected.minimumLotRiskPercentage).toBe(10);
    });

    it('floors volume to volumeStep so actual risk never exceeds requested risk percentage', () => {
      // 5,000 USC, 1% risk = 50 USC max risk.
      // SL distance = 0.00150, tickSize = 0.00001 (150 ticks), tickValuePerLot = 1.0 -> 150 USC/lot.
      // Ideal lot = 50 / 150 = 0.333333 lots.
      // With volumeStep = 0.05, it must floor to 0.30 lots (45 USC = 0.90% risk), NOT round up to 0.35 (52.5 USC).
      const stepped = calculateBrokerSymbolPositionSize({
        equity: 5000,
        accountDenomination: 'USC',
        riskPercentage: 1.0,
        stopLossDistance: 0.0015,
        tickSize: 0.00001,
        tickValuePerLot: 1.0,
        minimumLot: 0.05,
        maximumLot: 50.0,
        volumeStep: 0.05
      });

      expect(stepped.status).toBe('APPROVED');
      expect(stepped.approvedLotSize).toBe(0.3);
      expect(stepped.actualRiskAmount).toBe(45);
      expect(stepped.actualRiskPercentage).toBe(0.9);
      expect(stepped.unusedRiskBufferAmount).toBe(5);
    });

    it('caps volume at maximumLot when ideal volume exceeds broker maximumLot', () => {
      const capped = calculateBrokerSymbolPositionSize({
        equity: 500000,
        accountDenomination: 'USC',
        riskPercentage: 2.0,
        stopLossDistance: 0.5,
        tickSize: 0.01,
        tickValuePerLot: 1.0,
        minimumLot: 0.01,
        maximumLot: 50.0,
        volumeStep: 0.01
      });

      expect(capped.status).toBe('CAPPED_AT_MAXIMUM_LOT');
      expect(capped.isExecutable).toBe(true);
      expect(capped.approvedLotSize).toBe(50.0);
    });

    it('returns INVALID_PARAMETERS when broker or account inputs are invalid', () => {
      const invalid = calculateBrokerSymbolPositionSize({
        equity: 0,
        accountDenomination: 'USC',
        riskPercentage: -1,
        stopLossDistance: 0,
        tickSize: 0,
        tickValuePerLot: 1.0,
        minimumLot: 0.5,
        maximumLot: 0.1,
        volumeStep: 0
      });

      expect(invalid.status).toBe('INVALID_PARAMETERS');
      expect(invalid.isExecutable).toBe(false);
      expect(invalid.approvedLotSize).toBeNull();
      expect(invalid.validationErrors.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Cent Account vs Standard Account Comparator', () => {
    it('converts $25 USD to 2,500 USC and detects Standard Account over-risk trap on XAUUSD', () => {
      const result = calculateCentComparison({
        depositAmount: 25,
        depositCurrency: 'USD',
        instrument: 'XAUUSD',
        stopLossPoints: 250,
        riskPercent: 1.0,
        leverage: 500
      });

      expect(result.depositUsd).toBe(25);
      expect(result.depositUsc).toBe(2500);

      // Standard account at 0.01 lot on 250 points risks $2.50 = 10% of $25!
      expect(result.standardAnalysis.approvedLotSizeOrNull).toBeNull();
      expect(result.standardAnalysis.executableLotSize).toBe(0.01);
      expect(result.standardAnalysis.actualRiskAmount).toBe(2.5);
      expect(result.standardAnalysis.actualRiskPercentOfAccount).toBe(10);
      expect(result.standardAnalysis.isOverRiskTrap).toBe(true);

      // Cent account (2,500 USC) at 1% risk = 25 USC -> 0.10 Cent Lots = exact 1.0% risk!
      expect(result.centAnalysis.approvedLotSizeOrNull).toBe(0.1);
      expect(result.centAnalysis.executableLotSize).toBe(0.1);
      expect(result.centAnalysis.actualRiskAmount).toBe(25);
      expect(result.centAnalysis.actualRiskPercentOfAccount).toBe(1);
      expect(result.centAnalysis.isOverRiskTrap).toBe(false);
    });
  });

  describe('Trading Playground Custom Decision & SL/TP Simulation Engine', () => {
    const londonSweepScenario = PLAYGROUND_SCENARIOS[0]; // Decision bar close = 2648.90 (Optimal: SELL)
    const demandPullbackScenario = PLAYGROUND_SCENARIOS[2]; // Decision bar close = 2635.00 (Optimal: BUY, dips to 2632.80 then rallies to 2643.00)

    it('validates BUY and SELL Stop-Loss / Take-Profit geometry', () => {
      // Invalid BUY: Stop-Loss above Entry (2635.00)
      const invalidBuy = simulatePlaygroundDecision({
        scenario: demandPullbackScenario,
        action: 'BUY',
        stopLossPrice: 2637.0,
        takeProfitPrice: 2642.5,
        equityUsc: 2500,
        riskPercent: 1.0
      });
      expect(invalidBuy.isValidConfiguration).toBe(false);
      expect(invalidBuy.validationError).toContain('BELOW');

      // Invalid SELL: Stop-Loss below Entry (2648.90)
      const invalidSell = simulatePlaygroundDecision({
        scenario: londonSweepScenario,
        action: 'SELL',
        stopLossPrice: 2645.0,
        takeProfitPrice: 2642.9,
        equityUsc: 2500,
        riskPercent: 1.0
      });
      expect(invalidSell.isValidConfiguration).toBe(false);
      expect(invalidSell.validationError).toContain('ABOVE');
    });

    it('simulates a winning structural BUY with Take-Profit hit and S-Rank quality score', () => {
      const sim = simulatePlaygroundDecision({
        scenario: demandPullbackScenario,
        action: 'BUY',
        stopLossPrice: 2632.0,
        takeProfitPrice: 2642.5,
        equityUsc: 2000,
        riskPercent: 1.0
      });

      expect(sim.isValidConfiguration).toBe(true);
      expect(sim.outcomeType).toBe('TAKE_PROFIT_HIT');
      expect(sim.realizedRMultiple).toBeCloseTo(2.5, 2);
      expect(sim.decisionQualityScore).toBeGreaterThanOrEqual(85);
      expect(sim.decisionGrade).toBe('S-RANK STRATEGIST');
    });

    it('detects when a tight Stop-Loss on the right direction gets wicked out', () => {
      // In Scenario 03 (entry 2635.00), bar 14:00 dips to low 2632.80 before rallying to 2643.00
      const tightStopSim = simulatePlaygroundDecision({
        scenario: demandPullbackScenario,
        action: 'BUY',
        stopLossPrice: 2634.0,
        takeProfitPrice: 2642.5,
        equityUsc: 2000,
        riskPercent: 1.0
      });

      expect(tightStopSim.outcomeType).toBe('STOP_LOSS_HIT');
      expect(tightStopSim.realizedRMultiple).toBe(-1.0);
      expect(tightStopSim.outcomeExplanation).toContain('too tightly');
    });

    it('awards S-Rank Strategist when choosing WAIT on a chop/revenge trap scenario', () => {
      const revengeScenario = PLAYGROUND_SCENARIOS[3]; // Optimal action is WAIT
      const waitSim = simulatePlaygroundDecision({
        scenario: revengeScenario,
        action: 'WAIT',
        stopLossPrice: 0,
        takeProfitPrice: 0,
        equityUsc: 2500,
        riskPercent: 1.0
      });

      expect(waitSim.outcomeType).toBe('WAITED_DISCIPLINED');
      expect(waitSim.realizedRMultiple).toBe(0);
      expect(waitSim.decisionGrade).toBe('S-RANK STRATEGIST');
    });
  });

  describe('Risk Management & Drawdown Recovery Engine', () => {
    it('calculates nonlinear drawdown recovery percentages accurately', () => {
      expect(calculateRequiredRecoveryGainPercent(10)).toBeCloseTo(11.11, 2);
      expect(calculateRequiredRecoveryGainPercent(20)).toBeCloseTo(25.0, 2);
      expect(calculateRequiredRecoveryGainPercent(50)).toBeCloseTo(100.0, 2);
      expect(calculateRequiredRecoveryGainPercent(80)).toBeCloseTo(400.0, 2);
    });

    it('calculates breakeven win rate for asymmetric R:R ratios', () => {
      expect(calculateBreakevenWinRatePercent(1)).toBeCloseTo(50.0, 2);
      expect(calculateBreakevenWinRatePercent(2)).toBeCloseTo(33.33, 2);
      expect(calculateBreakevenWinRatePercent(3)).toBeCloseTo(25.0, 2);
    });

    it('computes position sizing and daily loss lock thresholds', () => {
      const metrics = calculateRiskMetrics({
        accountBalance: 5000,
        accountUnit: 'USC',
        riskPercent: 1.0,
        stopLossPoints: 250,
        rewardToRiskRatio: 2.0,
        dailyMaxLossPercent: 3.0,
        pointValuePerMinLot: 0.01
      });

      expect(metrics.riskAmountInUnit).toBe(50);
      expect(metrics.projectedRewardInUnit).toBe(100);
      expect(metrics.recommendedLotSize).toBe(0.2);
      expect(metrics.maxTradesBeforeDailyLock).toBe(3);
    });
  });

  describe('Trader Journal Analytics & Discipline Engine', () => {
    it('computes realized R-multiple for Long and Short trades', () => {
      expect(computeTradeRMultiple('LONG', 2650, 2647.5, 2655)).toBe(2.0);
      expect(computeTradeRMultiple('SHORT', 2650, 2652.5, 2645)).toBe(2.0);
      expect(computeTradeRMultiple('LONG', 2650, 2647.5, 2647.5)).toBe(-1.0);
    });

    it('computes win rate, expectancy, and discipline score from journal ledger', () => {
      const stats = computeJournalAnalytics(EDUCATIONAL_SAMPLE_JOURNAL_ENTRIES);
      expect(stats.totalTrades).toBe(4);
      expect(stats.winCount).toBe(2);
      expect(stats.lossCount).toBe(2);
      expect(stats.winRatePercent).toBe(50.0);
      expect(stats.expectancyR).toBeGreaterThan(0.5);
      expect(stats.disciplineScorePercent).toBeCloseTo(81.3, 1);
    });
  });

  describe('Telemetry Anti-Fabrication State Guard', () => {
    it('defaults strictly to DISCONNECTED state with isLiveVerified = false', () => {
      const state = getDefaultTelemetrySystemState();
      expect(state.connectionStatus).toBe('DISCONNECTED');
      expect(state.isLiveVerified).toBe(false);
      expect(state.lastHeartbeatIso).toBeNull();
    });
  });

  describe('High-Water Mark (HWM) 30% Performance Fee Schedule Engine', () => {
    it('charges 30% only on eligible net new profit highs and charges $0 during drawdown recovery', () => {
      const schedule = simulateHighWaterMarkFeeSchedule({
        initialEquity: 100,
        feeRatePercent: 30,
        periodNetReturnsBeforeFee: [
          { periodLabel: 'P1 (+20)', netProfitOrLoss: 20 },
          { periodLabel: 'P2 (-15)', netProfitOrLoss: -15 },
          { periodLabel: 'P3 (+10)', netProfitOrLoss: 10 },
          { periodLabel: 'P4 (+18)', netProfitOrLoss: 18 }
        ]
      });

      // Period 1: Start $100 -> +$20 -> $120 (> HWM $100). Eligible = $20. Fee = $6.00. End = $114. New HWM = $114.
      expect(schedule.periods[0].eligibleNewProfitAboveHwm).toBe(20);
      expect(schedule.periods[0].performanceFeeCharged).toBe(6);
      expect(schedule.periods[0].endingEquityAfterFee).toBe(114);
      expect(schedule.periods[0].highWaterMarkAfter).toBe(114);

      // Period 2: Start $114 -> -$15 -> $99 (< HWM $114). Eligible = $0. Fee = $0. End = $99. HWM stays $114.
      expect(schedule.periods[1].eligibleNewProfitAboveHwm).toBe(0);
      expect(schedule.periods[1].performanceFeeCharged).toBe(0);
      expect(schedule.periods[1].endingEquityAfterFee).toBe(99);
      expect(schedule.periods[1].highWaterMarkAfter).toBe(114);

      // Period 3: Start $99 -> +$10 -> $109 (still < HWM $114). Eligible = $0. Fee = $0! End = $109. HWM stays $114.
      expect(schedule.periods[2].eligibleNewProfitAboveHwm).toBe(0);
      expect(schedule.periods[2].performanceFeeCharged).toBe(0);
      expect(schedule.periods[2].endingEquityAfterFee).toBe(109);
      expect(schedule.periods[2].highWaterMarkAfter).toBe(114);

      // Period 4: Start $109 -> +$18 -> $127 (> HWM $114 by $13). Eligible = $13. Fee = $3.90. End = $123.10. New HWM = $123.10.
      expect(schedule.periods[3].eligibleNewProfitAboveHwm).toBe(13);
      expect(schedule.periods[3].performanceFeeCharged).toBe(3.9);
      expect(schedule.periods[3].endingEquityAfterFee).toBe(123.1);
      expect(schedule.periods[3].highWaterMarkAfter).toBe(123.1);

      expect(schedule.totalFeesCharged).toBe(9.9);
      expect(schedule.finalNetEquity).toBe(123.1);
      expect(schedule.finalHighWaterMark).toBe(123.1);
    });
  });
});
