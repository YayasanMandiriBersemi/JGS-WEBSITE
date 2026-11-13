export type JournalAccountMode = 'CENT_USC' | 'STANDARD_USD' | 'DEMO';
export type JournalDirection = 'LONG' | 'SHORT';
export type JournalEmotion =
  | 'DISCIPLINED'
  | 'CALM'
  | 'HESITANT'
  | 'FOMO'
  | 'REVENGE'
  | 'OVERCONFIDENT';

export interface TradeJournalItem {
  id: string;
  tradedAt: string;
  instrument: string;
  accountMode: JournalAccountMode;
  direction: JournalDirection;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  exitPrice: number;
  lotSize: number;
  realizedPnl: number;
  realizedRMultiple: number;
  setupTag: string;
  emotionTag: JournalEmotion;
  ruleFollowedStopLoss: boolean;
  ruleProperLotSize: boolean;
  ruleWaitedConfirmation: boolean;
  ruleWithinDailyLimit: boolean;
  notes: string;
}

export interface JournalComputedStats {
  totalTrades: number;
  winCount: number;
  lossCount: number;
  breakevenCount: number;
  winRatePercent: number;
  averageWinR: number;
  averageLossR: number;
  expectancyR: number;
  netRMultiple: number;
  netPnl: number;
  profitFactor: number;
  disciplineScorePercent: number;
  undisciplinedTradeCount: number;
  topEmotionalLeak: string;
}

/**
 * Computes realized R-multiple given direction, entry, stopLoss, and exitPrice.
 */
export function computeTradeRMultiple(
  direction: JournalDirection,
  entryPrice: number,
  stopLoss: number,
  exitPrice: number
): number {
  const stopDistance = Math.abs(entryPrice - stopLoss);
  if (stopDistance <= 0) return 0;

  const priceDelta =
    direction === 'LONG' ? exitPrice - entryPrice : entryPrice - exitPrice;
  const rMultiple = priceDelta / stopDistance;
  return Number(rMultiple.toFixed(2));
}

export function computeJournalAnalytics(entries: TradeJournalItem[]): JournalComputedStats {
  if (!entries || entries.length === 0) {
    return {
      totalTrades: 0,
      winCount: 0,
      lossCount: 0,
      breakevenCount: 0,
      winRatePercent: 0,
      averageWinR: 0,
      averageLossR: 0,
      expectancyR: 0,
      netRMultiple: 0,
      netPnl: 0,
      profitFactor: 0,
      disciplineScorePercent: 100,
      undisciplinedTradeCount: 0,
      topEmotionalLeak: 'None detected'
    };
  }

  let winCount = 0;
  let lossCount = 0;
  let breakevenCount = 0;
  let sumWinR = 0;
  let sumLossAbsR = 0;
  let netR = 0;
  let netPnl = 0;
  let grossProfitPnl = 0;
  let grossLossAbsPnl = 0;
  let totalRuleChecksPassed = 0;
  let undisciplinedTradeCount = 0;
  const emotionLossMap: Record<string, number> = {};

  for (const item of entries) {
    const r = Number(item.realizedRMultiple) || 0;
    const pnl = Number(item.realizedPnl) || 0;
    netR += r;
    netPnl += pnl;

    if (r > 0.05) {
      winCount++;
      sumWinR += r;
    } else if (r < -0.05) {
      lossCount++;
      sumLossAbsR += Math.abs(r);
      emotionLossMap[item.emotionTag] = (emotionLossMap[item.emotionTag] || 0) + Math.abs(r);
    } else {
      breakevenCount++;
    }

    if (pnl > 0) grossProfitPnl += pnl;
    if (pnl < 0) grossLossAbsPnl += Math.abs(pnl);

    const rulesPassed =
      (item.ruleFollowedStopLoss ? 1 : 0) +
      (item.ruleProperLotSize ? 1 : 0) +
      (item.ruleWaitedConfirmation ? 1 : 0) +
      (item.ruleWithinDailyLimit ? 1 : 0);

    totalRuleChecksPassed += rulesPassed;
    if (rulesPassed < 4) {
      undisciplinedTradeCount++;
    }
  }

  const totalTrades = entries.length;
  const decisiveTrades = winCount + lossCount;
  const winRateFraction = decisiveTrades > 0 ? winCount / decisiveTrades : 0;
  const winRatePercent = Number((winRateFraction * 100).toFixed(1));

  const averageWinR = winCount > 0 ? Number((sumWinR / winCount).toFixed(2)) : 0;
  const averageLossR = lossCount > 0 ? Number((sumLossAbsR / lossCount).toFixed(2)) : 0;

  const expectancyR =
    decisiveTrades > 0
      ? Number(
          (winRateFraction * averageWinR - (1 - winRateFraction) * averageLossR).toFixed(2)
        )
      : 0;

  const profitFactor =
    grossLossAbsPnl > 0
      ? Number((grossProfitPnl / grossLossAbsPnl).toFixed(2))
      : grossProfitPnl > 0
        ? 9.99
        : 0;

  const disciplineScorePercent = Number(
    ((totalRuleChecksPassed / (totalTrades * 4)) * 100).toFixed(1)
  );

  let topEmotionalLeak = 'None: High Execution Discipline';
  let maxLeakR = 0;
  for (const [emotion, lostR] of Object.entries(emotionLossMap)) {
    if ((emotion === 'FOMO' || emotion === 'REVENGE' || emotion === 'OVERCONFIDENT') && lostR > maxLeakR) {
      maxLeakR = lostR;
      topEmotionalLeak = `${emotion} (-${lostR.toFixed(2)}R lost)`;
    }
  }

  return {
    totalTrades,
    winCount,
    lossCount,
    breakevenCount,
    winRatePercent,
    averageWinR,
    averageLossR,
    expectancyR,
    netRMultiple: Number(netR.toFixed(2)),
    netPnl: Number(netPnl.toFixed(2)),
    profitFactor,
    disciplineScorePercent,
    undisciplinedTradeCount,
    topEmotionalLeak
  };
}
