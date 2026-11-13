import { PlaygroundScenario } from '@/lib/data/playground-scenarios';
import { calculateBrokerSymbolPositionSize } from './cent-calculator';

export type PlaygroundAction = 'BUY' | 'SELL' | 'WAIT';

export interface CustomPlaygroundSimulationInput {
  scenario: PlaygroundScenario;
  action: PlaygroundAction;
  stopLossPrice: number;
  takeProfitPrice: number;
  equityUsc: number;
  riskPercent: number;
}

export interface CustomPlaygroundSimulationResult {
  action: PlaygroundAction;
  isValidConfiguration: boolean;
  validationError: string | null;
  entryPrice: number;
  stopLossPrice: number;
  takeProfitPrice: number;
  stopDistancePrice: number;
  rewardDistancePrice: number;
  stopLossPoints: number;
  takeProfitPoints: number;
  plannedRewardToRisk: number;
  sizingResult: ReturnType<typeof calculateBrokerSymbolPositionSize> | null;
  outcomeType:
    | 'WAITED_DISCIPLINED'
    | 'WAITED_MISSED_SETUP'
    | 'TAKE_PROFIT_HIT'
    | 'STOP_LOSS_HIT'
    | 'SESSION_CLOSE_EXIT'
    | 'REJECTED_BY_RISK_ENGINE';
  exitPrice: number;
  exitTimeLabel: string;
  realizedRMultiple: number;
  realizedPnlUsc: number;
  decisionQualityScore: number; // 0 to 100
  decisionGrade: 'S-RANK STRATEGIST' | 'A-RANK DISCIPLINED' | 'B-RANK SUBOPTIMAL' | 'D-RANK RISK BREACH';
  qualityBreakdown: {
    directionScore: number;
    stopPlacementScore: number;
    asymmetryScore: number;
    sizingComplianceScore: number;
  };
  outcomeHeadline: string;
  outcomeExplanation: string;
  jeyCoachingFeedback: string;
}

export function simulatePlaygroundDecision(
  input: CustomPlaygroundSimulationInput
): CustomPlaygroundSimulationResult {
  const { scenario, action, stopLossPrice, takeProfitPrice, equityUsc, riskPercent } = input;
  const decisionCandle = scenario.candles[scenario.decisionBarIndex];
  const entryPrice = decisionCandle.close;
  const futureCandles = scenario.candles.slice(scenario.decisionBarIndex + 1);
  const tickSize = scenario.instrument === 'XAUUSD' ? 0.01 : 0.0001;

  // Determine what the optimal action in this historical scenario is
  const optimalPreset = scenario.options.find((o) => o.isOptimalChoice);
  const optimalAction: PlaygroundAction =
    optimalPreset?.actionType === 'LONG'
      ? 'BUY'
      : optimalPreset?.actionType === 'SHORT'
        ? 'SELL'
        : 'WAIT';

  // Handle WAIT (Stand Aside) decision
  if (action === 'WAIT') {
    const isWaitOptimal = optimalAction === 'WAIT';
    const score = isWaitOptimal ? 98 : 74;
    return {
      action: 'WAIT',
      isValidConfiguration: true,
      validationError: null,
      entryPrice,
      stopLossPrice: entryPrice,
      takeProfitPrice: entryPrice,
      stopDistancePrice: 0,
      rewardDistancePrice: 0,
      stopLossPoints: 0,
      takeProfitPoints: 0,
      plannedRewardToRisk: 0,
      sizingResult: null,
      outcomeType: isWaitOptimal ? 'WAITED_DISCIPLINED' : 'WAITED_MISSED_SETUP',
      exitPrice: entryPrice,
      exitTimeLabel: futureCandles[futureCandles.length - 1]?.timeLabel ?? decisionCandle.timeLabel,
      realizedRMultiple: 0,
      realizedPnlUsc: 0,
      decisionQualityScore: score,
      decisionGrade: isWaitOptimal ? 'S-RANK STRATEGIST' : 'A-RANK DISCIPLINED',
      qualityBreakdown: {
        directionScore: isWaitOptimal ? 25 : 15,
        stopPlacementScore: 25,
        asymmetryScore: 24,
        sizingComplianceScore: 24
      },
      outcomeHeadline: isWaitOptimal
        ? 'OPTIMAL STAND-ASIDE: PROTECTED CAPITAL FROM TRAP'
        : 'CAPITAL PRESERVED (0.00R): PASSED ON ACTIVE SETUP',
      outcomeExplanation: isWaitOptimal
        ? `This scenario (${scenario.title}) featured treacherous whipsaw/chop conditions where standing aside was the #1 institutional play. You risked 0 USC and avoided the retail stop-hunt.`
        : `You chose to stand aside. Your capital remained 100% intact (0.00R), though this scenario offered a confirmed ${optimalAction} setup after the ${decisionCandle.timeLabel} candle close.`,
      jeyCoachingFeedback: isWaitOptimal
        ? 'Sitting on your hands when spreads widen or daily loss limits are reached is what separates professionals from gamblers.'
        : 'Passing on a trade never costs you equity. Review the confirmation candle at the decision bar to see why the structural setup was valid.'
    };
  }

  // Validate Stop-Loss & Take-Profit geometry for BUY or SELL
  if (action === 'BUY') {
    if (stopLossPrice >= entryPrice) {
      return createInvalidResult(
        action,
        entryPrice,
        stopLossPrice,
        takeProfitPrice,
        'For a BUY (Long) order, Stop-Loss price must be strictly BELOW the current Entry price.'
      );
    }
    if (takeProfitPrice <= entryPrice) {
      return createInvalidResult(
        action,
        entryPrice,
        stopLossPrice,
        takeProfitPrice,
        'For a BUY (Long) order, Take-Profit price must be strictly ABOVE the current Entry price.'
      );
    }
  } else {
    if (stopLossPrice <= entryPrice) {
      return createInvalidResult(
        action,
        entryPrice,
        stopLossPrice,
        takeProfitPrice,
        'For a SELL (Short) order, Stop-Loss price must be strictly ABOVE the current Entry price.'
      );
    }
    if (takeProfitPrice >= entryPrice) {
      return createInvalidResult(
        action,
        entryPrice,
        stopLossPrice,
        takeProfitPrice,
        'For a SELL (Short) order, Take-Profit price must be strictly BELOW the current Entry price.'
      );
    }
  }

  const stopDistancePrice = Number(Math.abs(entryPrice - stopLossPrice).toFixed(5));
  const rewardDistancePrice = Number(Math.abs(takeProfitPrice - entryPrice).toFixed(5));
  const stopLossPoints = Math.round(stopDistancePrice / tickSize);
  const takeProfitPoints = Math.round(rewardDistancePrice / tickSize);
  const plannedRewardToRisk =
    stopDistancePrice > 0 ? Number((rewardDistancePrice / stopDistancePrice).toFixed(2)) : 0;

  // Compute position sizing via Broker Symbol Sizer on Cent Account (USC)
  const sizingResult = calculateBrokerSymbolPositionSize({
    equity: equityUsc,
    accountDenomination: 'USC',
    riskPercentage: riskPercent,
    stopLossDistance: stopDistancePrice,
    tickSize,
    tickValuePerLot: 1.0, // 1 USC per tick per 1.00 Cent Lot
    minimumLot: 0.01,
    maximumLot: 100.0,
    volumeStep: 0.01,
    leverage: 500,
    contractUnitsPerLot: 1,
    referencePrice: entryPrice
  });

  if (!sizingResult.isExecutable || sizingResult.approvedLotSize === null) {
    return {
      action,
      isValidConfiguration: true,
      validationError: null,
      entryPrice,
      stopLossPrice,
      takeProfitPrice,
      stopDistancePrice,
      rewardDistancePrice,
      stopLossPoints,
      takeProfitPoints,
      plannedRewardToRisk,
      sizingResult,
      outcomeType: 'REJECTED_BY_RISK_ENGINE',
      exitPrice: entryPrice,
      exitTimeLabel: decisionCandle.timeLabel,
      realizedRMultiple: 0,
      realizedPnlUsc: 0,
      decisionQualityScore: 35,
      decisionGrade: 'D-RANK RISK BREACH',
      qualityBreakdown: {
        directionScore: action === optimalAction ? 20 : 5,
        stopPlacementScore: 10,
        asymmetryScore: plannedRewardToRisk >= 1.5 ? 5 : 0,
        sizingComplianceScore: 0
      },
      outcomeHeadline: 'ORDER REJECTED BY RISK ENGINE: STOP TOO WIDE FOR CAPITAL LIMIT',
      outcomeExplanation: sizingResult.rejectionOrStatusExplanation,
      jeyCoachingFeedback:
        'Your stop loss is so wide relative to your equity and risk % that even a 0.01 lot trade would breach your risk cap. Increase equity or use a tighter structural invalidation level.'
    };
  }

  // Step through future candles to see if SL or TP is hit first
  let outcomeType: CustomPlaygroundSimulationResult['outcomeType'] = 'SESSION_CLOSE_EXIT';
  let exitPrice = futureCandles[futureCandles.length - 1]?.close ?? entryPrice;
  let exitTimeLabel = futureCandles[futureCandles.length - 1]?.timeLabel ?? decisionCandle.timeLabel;

  for (const bar of futureCandles) {
    if (action === 'BUY') {
      const hitSL = bar.low <= stopLossPrice;
      const hitTP = bar.high >= takeProfitPrice;
      if (hitSL) {
        outcomeType = 'STOP_LOSS_HIT';
        exitPrice = stopLossPrice;
        exitTimeLabel = bar.timeLabel;
        break;
      }
      if (hitTP) {
        outcomeType = 'TAKE_PROFIT_HIT';
        exitPrice = takeProfitPrice;
        exitTimeLabel = bar.timeLabel;
        break;
      }
    } else {
      const hitSL = bar.high >= stopLossPrice;
      const hitTP = bar.low <= takeProfitPrice;
      if (hitSL) {
        outcomeType = 'STOP_LOSS_HIT';
        exitPrice = stopLossPrice;
        exitTimeLabel = bar.timeLabel;
        break;
      }
      if (hitTP) {
        outcomeType = 'TAKE_PROFIT_HIT';
        exitPrice = takeProfitPrice;
        exitTimeLabel = bar.timeLabel;
        break;
      }
    }
  }

  const priceMoveSigned =
    action === 'BUY' ? exitPrice - entryPrice : entryPrice - exitPrice;
  const realizedRMultiple = Number((priceMoveSigned / stopDistancePrice).toFixed(2));
  const realizedTicks = priceMoveSigned / tickSize;
  const realizedPnlUsc = Number(
    (realizedTicks * sizingResult.approvedLotSize * 1.0).toFixed(2)
  );

  // Compute Decision Quality Score (0–100)
  const directionScore = action === optimalAction ? 30 : 5;
  const stopPlacementScore =
    outcomeType === 'TAKE_PROFIT_HIT'
      ? 25
      : outcomeType === 'SESSION_CLOSE_EXIT' && realizedRMultiple > 0
        ? 20
        : action === optimalAction && outcomeType === 'STOP_LOSS_HIT'
          ? 10 // Right direction, but stop was too tight and got wicked out!
          : 8;
  const asymmetryScore =
    plannedRewardToRisk >= 2.0 ? 25 : plannedRewardToRisk >= 1.5 ? 18 : 6;
  const sizingComplianceScore = riskPercent <= 1.5 ? 20 : riskPercent <= 2.5 ? 12 : 4;

  const decisionQualityScore =
    directionScore + stopPlacementScore + asymmetryScore + sizingComplianceScore;

  let decisionGrade: CustomPlaygroundSimulationResult['decisionGrade'] = 'B-RANK SUBOPTIMAL';
  if (decisionQualityScore >= 85) decisionGrade = 'S-RANK STRATEGIST';
  else if (decisionQualityScore >= 70) decisionGrade = 'A-RANK DISCIPLINED';
  else if (decisionQualityScore < 50) decisionGrade = 'D-RANK RISK BREACH';

  let outcomeHeadline = '';
  let outcomeExplanation = '';
  let jeyCoachingFeedback = '';

  if (outcomeType === 'TAKE_PROFIT_HIT') {
    outcomeHeadline = `TAKE-PROFIT TARGET HIT AT ${exitTimeLabel} (+${realizedRMultiple}R / +${realizedPnlUsc} USC)`;
    outcomeExplanation = `Your ${action} order from ${entryPrice} respected structural invalidation at ${stopLossPrice} and reached your Take-Profit target at ${takeProfitPrice} on bar ${exitTimeLabel}.`;
    jeyCoachingFeedback =
      plannedRewardToRisk >= 2.0
        ? `Clinical execution. You aligned with institutional order flow, sized at ${sizingResult.approvedLotSize.toFixed(2)} Cent Lots (${sizingResult.actualRiskPercentage}% risk), and banked +${realizedRMultiple}R.`
        : `You hit Take-Profit, though your planned R:R was only 1:${plannedRewardToRisk}. Aim for 1:2.0+ on clean displacement setups so winners cover multiple scratches.`;
  } else if (outcomeType === 'STOP_LOSS_HIT') {
    outcomeHeadline = `STOP-LOSS HIT AT ${exitTimeLabel} (${realizedRMultiple}R / ${realizedPnlUsc} USC)`;
    if (action === optimalAction) {
      outcomeExplanation = `You picked the right directional bias (${action}), BUT your Stop-Loss at ${stopLossPrice} (${stopLossPoints} pts) was placed too tightly inside the volatility wick and got hunted at ${exitTimeLabel} before price moved to target!`;
      jeyCoachingFeedback =
        'Crucial lesson: Being right on direction still loses money if your Stop-Loss is squeezed inside market noise. Widen the stop behind the structural wick and let the Cent calculator shrink your lot size.';
    } else {
      outcomeExplanation = `Your ${action} order fought against the scenario’s primary structural flow (or traded into a news/revenge trap) and was stopped out at ${stopLossPrice} on bar ${exitTimeLabel}.`;
      jeyCoachingFeedback = `Because you sized on a Cent Account at ${sizingResult.actualRiskPercentage}% risk, this stop-out only cost ${Math.abs(realizedPnlUsc)} USC. Review the Decision Bar wick to see why ${optimalAction} was the high-probability play.`;
    }
  } else {
    outcomeHeadline = `SESSION CLOSED AT ${exitPrice} (${realizedRMultiple >= 0 ? '+' : ''}${realizedRMultiple}R / ${realizedPnlUsc >= 0 ? '+' : ''}${realizedPnlUsc} USC)`;
    outcomeExplanation = `Neither your Stop-Loss (${stopLossPrice}) nor your Take-Profit (${takeProfitPrice}) was touched before the scenario window ended. Position closed at ${exitPrice}.`;
    jeyCoachingFeedback =
      realizedRMultiple > 0
        ? 'Your directional read and stop protection were solid, though your Take-Profit target was set beyond the session’s available range. Consider taking partial profits at structural liquidity pools.'
        : 'Price drifted against your entry without hitting full invalidation.';
  }

  return {
    action,
    isValidConfiguration: true,
    validationError: null,
    entryPrice,
    stopLossPrice,
    takeProfitPrice,
    stopDistancePrice,
    rewardDistancePrice,
    stopLossPoints,
    takeProfitPoints,
    plannedRewardToRisk,
    sizingResult,
    outcomeType,
    exitPrice,
    exitTimeLabel,
    realizedRMultiple,
    realizedPnlUsc,
    decisionQualityScore,
    decisionGrade,
    qualityBreakdown: {
      directionScore,
      stopPlacementScore,
      asymmetryScore,
      sizingComplianceScore
    },
    outcomeHeadline,
    outcomeExplanation,
    jeyCoachingFeedback
  };
}

function createInvalidResult(
  action: PlaygroundAction,
  entryPrice: number,
  stopLossPrice: number,
  takeProfitPrice: number,
  validationError: string
): CustomPlaygroundSimulationResult {
  return {
    action,
    isValidConfiguration: false,
    validationError,
    entryPrice,
    stopLossPrice,
    takeProfitPrice,
    stopDistancePrice: 0,
    rewardDistancePrice: 0,
    stopLossPoints: 0,
    takeProfitPoints: 0,
    plannedRewardToRisk: 0,
    sizingResult: null,
    outcomeType: 'REJECTED_BY_RISK_ENGINE',
    exitPrice: entryPrice,
    exitTimeLabel: '-',
    realizedRMultiple: 0,
    realizedPnlUsc: 0,
    decisionQualityScore: 0,
    decisionGrade: 'D-RANK RISK BREACH',
    qualityBreakdown: {
      directionScore: 0,
      stopPlacementScore: 0,
      asymmetryScore: 0,
      sizingComplianceScore: 0
    },
    outcomeHeadline: 'INVALID STOP-LOSS OR TAKE-PROFIT LEVEL',
    outcomeExplanation: validationError,
    jeyCoachingFeedback: validationError
  };
}
