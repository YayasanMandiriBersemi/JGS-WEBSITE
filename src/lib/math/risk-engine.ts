export interface RiskCalculationInput {
  accountBalance: number;
  accountUnit: 'USC' | 'USD';
  riskPercent: number;
  stopLossPoints: number;
  rewardToRiskRatio: number;
  dailyMaxLossPercent: number;
  pointValuePerMinLot: number; // Default 0.01 (1 point = 0.01 USD or 0.01 USC at 0.01 lot)
}

export interface DrawdownRecoveryPoint {
  drawdownPercent: number;
  remainingCapitalPercent: number;
  requiredGainPercentToRecover: number;
  severityZone: 'SAFE_BUFFER' | 'CAUTION_ZONE' | 'CRITICAL_DAMAGE' | 'MATHEMATICAL_RUIN';
}

export interface StreakSimulationStep {
  lossNumber: number;
  remainingBalanceFixedPercent: number;
  drawdownFixedPercent: number;
  remainingBalanceAggressive5Percent: number;
  drawdownAggressive5Percent: number;
}

export interface RiskCalculationResult {
  accountBalance: number;
  accountUnit: 'USC' | 'USD';
  riskPercent: number;
  riskAmountInUnit: number;
  projectedRewardInUnit: number;
  rawIdealLotSize: number;
  recommendedLotSize: number;
  approvedLotSizeOrNull: number | null;
  isRejectedBelowMinLot: boolean;
  stopLossPoints: number;
  takeProfitPoints: number;
  rewardToRiskRatio: number;
  breakevenWinRatePercent: number;
  expectedValueAt45PercentWinRateR: number;
  maxTradesBeforeDailyLock: number;
  dailyLossCapInUnit: number;
  drawdownRecoveryTable: DrawdownRecoveryPoint[];
  streakSimulation: StreakSimulationStep[];
}

/**
 * Calculates required percentage gain to recover from a given percentage drawdown:
 * Gain% = ((1 / (1 - D)) - 1) * 100
 */
export function calculateRequiredRecoveryGainPercent(drawdownPercent: number): number {
  const clamped = Math.max(0, Math.min(99, drawdownPercent));
  const d = clamped / 100;
  const gain = (1 / (1 - d) - 1) * 100;
  return Number(gain.toFixed(2));
}

/**
 * Calculates the minimum win rate (%) needed to break even for a given Reward:Risk ratio:
 * Breakeven% = (1 / (1 + R)) * 100
 */
export function calculateBreakevenWinRatePercent(rewardToRiskRatio: number): number {
  const safeRR = Math.max(0.1, rewardToRiskRatio);
  const winRate = (1 / (1 + safeRR)) * 100;
  return Number(winRate.toFixed(2));
}

export function calculateRiskMetrics(input: RiskCalculationInput): RiskCalculationResult {
  const balance = Math.max(10, Number.isFinite(input.accountBalance) ? input.accountBalance : 2500);
  const riskPct = Math.max(0.1, Math.min(20, input.riskPercent || 1.0));
  const slPoints = Math.max(10, Math.min(10000, Math.round(input.stopLossPoints || 250)));
  const rr = Math.max(0.25, Math.min(15, Number(input.rewardToRiskRatio || 2.0)));
  const dailyMaxPct = Math.max(riskPct, Math.min(50, Number(input.dailyMaxLossPercent || 3.0)));
  const ptVal = input.pointValuePerMinLot > 0 ? input.pointValuePerMinLot : 0.01;

  const riskAmount = Number(((balance * riskPct) / 100).toFixed(2));
  const projectedReward = Number((riskAmount * rr).toFixed(2));
  const riskPerMinLot = slPoints * ptVal;
  const rawLots = riskPerMinLot > 0 ? (riskAmount / riskPerMinLot) * 0.01 : 0;
  const steppedLots = Number((Math.floor((rawLots + 1e-9) * 100) / 100).toFixed(2));
  const isRejectedBelowMinLot = steppedLots < 0.01;
  const approvedLotSizeOrNull = isRejectedBelowMinLot ? null : steppedLots;
  const recommendedLotSize = isRejectedBelowMinLot ? 0 : steppedLots;
  const takeProfitPoints = Math.round(slPoints * rr);

  const breakevenWinRatePercent = calculateBreakevenWinRatePercent(rr);
  // Expectancy in R at a realistic 45% win rate: (0.45 * rr) - (0.55 * 1)
  const expectedValueAt45PercentWinRateR = Number((0.45 * rr - 0.55).toFixed(2));

  const dailyLossCapInUnit = Number(((balance * dailyMaxPct) / 100).toFixed(2));
  const maxTradesBeforeDailyLock = Math.max(1, Math.floor(dailyMaxPct / riskPct));

  const standardDrawdownCheckpoints = [5, 10, 15, 20, 30, 40, 50, 65, 80, 90];
  const drawdownRecoveryTable: DrawdownRecoveryPoint[] = standardDrawdownCheckpoints.map((dd) => {
    const reqGain = calculateRequiredRecoveryGainPercent(dd);
    let severityZone: DrawdownRecoveryPoint['severityZone'] = 'SAFE_BUFFER';
    if (dd >= 60) severityZone = 'MATHEMATICAL_RUIN';
    else if (dd >= 30) severityZone = 'CRITICAL_DAMAGE';
    else if (dd >= 15) severityZone = 'CAUTION_ZONE';

    return {
      drawdownPercent: dd,
      remainingCapitalPercent: 100 - dd,
      requiredGainPercentToRecover: reqGain,
      severityZone
    };
  });

  const streakSimulation: StreakSimulationStep[] = [];
  let balUser = balance;
  let balAggressive = balance;
  for (let i = 1; i <= 10; i++) {
    balUser = balUser * (1 - riskPct / 100);
    balAggressive = balAggressive * (1 - 0.05);
    streakSimulation.push({
      lossNumber: i,
      remainingBalanceFixedPercent: Number(balUser.toFixed(2)),
      drawdownFixedPercent: Number(((1 - balUser / balance) * 100).toFixed(2)),
      remainingBalanceAggressive5Percent: Number(balAggressive.toFixed(2)),
      drawdownAggressive5Percent: Number(((1 - balAggressive / balance) * 100).toFixed(2))
    });
  }

  return {
    accountBalance: balance,
    accountUnit: input.accountUnit,
    riskPercent: riskPct,
    riskAmountInUnit: riskAmount,
    projectedRewardInUnit: projectedReward,
    rawIdealLotSize: Number(rawLots.toFixed(4)),
    recommendedLotSize,
    approvedLotSizeOrNull,
    isRejectedBelowMinLot,
    stopLossPoints: slPoints,
    takeProfitPoints,
    rewardToRiskRatio: rr,
    breakevenWinRatePercent,
    expectedValueAt45PercentWinRateR,
    maxTradesBeforeDailyLock,
    dailyLossCapInUnit,
    drawdownRecoveryTable,
    streakSimulation
  };
}
