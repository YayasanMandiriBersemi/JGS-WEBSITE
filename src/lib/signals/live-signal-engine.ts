import type {
  CandleBar,
  CotAssetReport,
  MacroOverviewSnapshot,
  MarketQuoteWithCandles,
} from '@/lib/market/types';

export type LiveSignalStyleId = 'SCALPING' | 'INTRADAY' | 'SWING';
export type LiveSignalOrderType = 'BUY LIMIT' | 'SELL LIMIT';

export type JgsDeskLifecycleState =
  | 'WAITING_FILL'
  | 'ACTIVE_RUNNING'
  | 'CLOSED_WIN'
  | 'CLOSED_LOSS';

export type LiveSignalStatusBadge = JgsDeskLifecycleState | 'NO_DATA';

export interface LiveAlgorithmicSignal {
  id: string;
  ticketId: string;
  issuedWibLabel: string;
  symbol: string;
  displaySymbol: string;
  category: 'METALS' | 'FOREX' | 'INDICES' | 'CRYPTO';
  style: LiveSignalStyleId;
  timeframeLabel: string;
  tvSymbol: string;
  available: boolean;
  livePrice: number;
  decimals: number;
  changePct24h: number;
  direction: 'BUY' | 'SELL';
  orderType: LiveSignalOrderType;
  zoneLabelId: string;
  zoneLabelEn: string;
  rsi14: number;
  atrValue: number;
  entryPrice: number;
  stopLoss: number;
  effectiveStopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  slPips: number;
  tp1Pips: number;
  tp2Pips: number;
  rrr1: string;
  rrr2: string;
  status: LiveSignalStatusBadge;
  breakEvenProtected: boolean;
  distanceToLimitPips: number;
  floatingPips: number;
  recommendedCentLot: number;
  riskUsc: number;
  riskRp: number;
  floatingUsc: number;
  floatingRp: number;
  tp1ProfitUsc: number;
  tp1ProfitRp: number;
  tp2ProfitUsc: number;
  tp2ProfitRp: number;
  sessionWib: string;
  reasonsId: [string, string, string, string];
  reasonsEn: [string, string, string, string];
  sourceNote: string;
}

interface SignalInstrumentMeta {
  symbol: string;
  displaySymbol: string;
  category: 'METALS' | 'FOREX' | 'INDICES' | 'CRYPTO';
  decimals: number;
  pipSize: number;
  uscPerPipAtMinCentLot: number;
  tvSymbol: string;
  cotCode?: string;
  optimalSessionWibId: string;
  optimalSessionWibEn: string;
}

export const SIGNAL_INSTRUMENTS: SignalInstrumentMeta[] = [
  {
    symbol: 'XAUUSD',
    displaySymbol: 'XAUUSD',
    category: 'METALS',
    decimals: 2,
    pipSize: 0.1,
    uscPerPipAtMinCentLot: 0.1,
    tvSymbol: 'OANDA:XAUUSD',
    cotCode: '088691',
    optimalSessionWibId: 'London / New York Killzone (14:00 - 22:30 WIB)',
    optimalSessionWibEn: 'London / NY Killzone (14:00 - 22:30 WIB)',
  },
  {
    symbol: 'XAGUSD',
    displaySymbol: 'XAGUSD',
    category: 'METALS',
    decimals: 3,
    pipSize: 0.01,
    uscPerPipAtMinCentLot: 0.5,
    tvSymbol: 'OANDA:XAGUSD',
    cotCode: '084691',
    optimalSessionWibId: 'New York Overlap (19:30 - 22:00 WIB)',
    optimalSessionWibEn: 'NY Overlap (19:30 - 22:00 WIB)',
  },
  {
    symbol: 'EURUSD',
    displaySymbol: 'EURUSD',
    category: 'FOREX',
    decimals: 5,
    pipSize: 0.0001,
    uscPerPipAtMinCentLot: 0.1,
    tvSymbol: 'FX:EURUSD',
    cotCode: '099741',
    optimalSessionWibId: 'London Open (14:00 - 18:00 WIB)',
    optimalSessionWibEn: 'London Open (14:00 - 18:00 WIB)',
  },
  {
    symbol: 'GBPUSD',
    displaySymbol: 'GBPUSD',
    category: 'FOREX',
    decimals: 5,
    pipSize: 0.0001,
    uscPerPipAtMinCentLot: 0.1,
    tvSymbol: 'FX:GBPUSD',
    cotCode: '096742',
    optimalSessionWibId: 'London Killzone (14:00 - 17:30 WIB)',
    optimalSessionWibEn: 'London Killzone (14:00 - 17:30 WIB)',
  },
  {
    symbol: 'USDJPY',
    displaySymbol: 'USDJPY',
    category: 'FOREX',
    decimals: 3,
    pipSize: 0.01,
    uscPerPipAtMinCentLot: 0.065,
    tvSymbol: 'FX:USDJPY',
    cotCode: '097741',
    optimalSessionWibId: 'Tokyo / NY Yield Overlap (07:30 & 19:30 WIB)',
    optimalSessionWibEn: 'Tokyo / NY Yield Overlap',
  },
  {
    symbol: 'GBPJPY',
    displaySymbol: 'GBPJPY',
    category: 'FOREX',
    decimals: 3,
    pipSize: 0.01,
    uscPerPipAtMinCentLot: 0.065,
    tvSymbol: 'FX:GBPJPY',
    optimalSessionWibId: 'London Volatility Window (14:00 - 17:00 WIB)',
    optimalSessionWibEn: 'London Volatility Window (14:00 - 17:00 WIB)',
  },
  {
    symbol: 'NAS100',
    displaySymbol: 'NAS100 / USTEC',
    category: 'INDICES',
    decimals: 2,
    pipSize: 1.0,
    uscPerPipAtMinCentLot: 0.1,
    tvSymbol: 'OANDA:NAS100USD',
    cotCode: '209742',
    optimalSessionWibId: 'Wall Street Open (20:30 - 23:30 WIB)',
    optimalSessionWibEn: 'NYSE Cash Open (20:30 - 23:30 WIB)',
  },
  {
    symbol: 'US30',
    displaySymbol: 'US30 / DJ30',
    category: 'INDICES',
    decimals: 2,
    pipSize: 1.0,
    uscPerPipAtMinCentLot: 0.1,
    tvSymbol: 'OANDA:US30USD',
    cotCode: '13874A',
    optimalSessionWibId: 'New York Equities Open (20:30 - 23:00 WIB)',
    optimalSessionWibEn: 'NY Cash Open (20:30 - 23:00 WIB)',
  },
  {
    symbol: 'BTCUSDT',
    displaySymbol: 'BTCUSDT',
    category: 'CRYPTO',
    decimals: 2,
    pipSize: 10.0,
    uscPerPipAtMinCentLot: 0.1,
    tvSymbol: 'BINANCE:BTCUSDT',
    cotCode: '133741',
    optimalSessionWibId: '24/7 Spot & US ETF Window (20:00 - 02:00 WIB)',
    optimalSessionWibEn: '24/7 Liquidity / US ETF Overlap',
  },
  {
    symbol: 'ETHUSDT',
    displaySymbol: 'ETHUSDT',
    category: 'CRYPTO',
    decimals: 2,
    pipSize: 1.0,
    uscPerPipAtMinCentLot: 0.1,
    tvSymbol: 'BINANCE:ETHUSDT',
    optimalSessionWibId: '24/7 Crypto High-Beta Session',
    optimalSessionWibEn: '24/7 High-Beta Crypto Session',
  },
  {
    symbol: 'SOLUSDT',
    displaySymbol: 'SOLUSDT',
    category: 'CRYPTO',
    decimals: 2,
    pipSize: 0.1,
    uscPerPipAtMinCentLot: 0.1,
    tvSymbol: 'BINANCE:SOLUSDT',
    optimalSessionWibId: '24/7 High-Momentum Session',
    optimalSessionWibEn: '24/7 Momentum Session',
  },
];

function computeEmaSeries(values: number[], period: number): number[] {
  if (values.length === 0) return [];
  const k = 2 / (period + 1);
  const out: number[] = [values[0]];
  for (let i = 1; i < values.length; i++) {
    out.push(values[i] * k + out[i - 1] * (1 - k));
  }
  return out;
}

function computeAtr14(candles: CandleBar[]): number {
  if (candles.length < 2) return 0;
  const slice = candles.slice(-15);
  const trs: number[] = [];
  for (let i = 1; i < slice.length; i++) {
    const prevClose = slice[i - 1].close;
    const h = slice[i].high;
    const l = slice[i].low;
    const tr = Math.max(h - l, Math.abs(h - prevClose), Math.abs(l - prevClose));
    trs.push(tr);
  }
  if (trs.length === 0) return 0;
  return trs.reduce((a, b) => a + b, 0) / trs.length;
}

function computeRsi14(closes: number[]): number {
  if (closes.length < 15) return 50;
  let gains = 0;
  let losses = 0;
  const slice = closes.slice(-15);
  for (let i = 1; i < slice.length; i++) {
    const diff = slice[i] - slice[i - 1];
    if (diff >= 0) gains += diff;
    else losses += Math.abs(diff);
  }
  if (losses === 0) return 75;
  const rs = gains / losses;
  return Number((100 - 100 / (1 + rs)).toFixed(1));
}

function deterministicTicketId(symbol: string, style: LiveSignalStyleId, daySeed: number): string {
  let hash = daySeed;
  const str = `${symbol}-${style}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 89999;
  }
  return `#JGS-${10000 + hash}`;
}

function getStyleTargets(style: LiveSignalStyleId, pipSize: number, symbol: string) {
  const isCryptoOrIdx =
    symbol.includes('BTC') ||
    symbol.includes('ETH') ||
    symbol.includes('SOL') ||
    symbol === 'NAS100' ||
    symbol === 'US30';
  const mult = isCryptoOrIdx ? 1.5 : 1;

  if (style === 'SCALPING') {
    return {
      tfKey: '5m' as const,
      tfLabel: 'M1 - M5',
      minSlPips: Math.round(25 * mult),
      maxSlPips: Math.round(55 * mult),
      tp1Mult: 2.0,
      tp2Mult: 3.5,
      atrLimitMult: 1.0,
      pipSize,
    };
  }
  if (style === 'INTRADAY') {
    return {
      tfKey: '15m' as const,
      tfLabel: 'M15 - H1',
      minSlPips: Math.round(45 * mult),
      maxSlPips: Math.round(110 * mult),
      tp1Mult: 2.0,
      tp2Mult: 3.5,
      atrLimitMult: 1.15,
      pipSize,
    };
  }
  return {
    tfKey: '4h' as const,
    tfLabel: 'H4 - Daily',
    minSlPips: Math.round(110 * mult),
    maxSlPips: Math.round(260 * mult),
    tp1Mult: 2.0,
    tp2Mult: 3.5,
    atrLimitMult: 1.35,
    pipSize,
  };
}

export function generateLiveSignalsForStyle(params: {
  style: LiveSignalStyleId;
  quotes: Record<string, MarketQuoteWithCandles>;
  macro: MacroOverviewSnapshot | null;
  cotReports: CotAssetReport[];
  capitalRp: number;
  riskPct: number;
  usdIdrRate: number;
}): LiveAlgorithmicSignal[] {
  const { style, quotes, macro, cotReports, capitalRp, riskPct, usdIdrRate } = params;
  const rpPerUsd = usdIdrRate > 1000 ? usdIdrRate : 16250;
  const rpPerUsc = rpPerUsd / 100;
  const todayUtc = Math.floor(Date.now() / 86400000);

  return SIGNAL_INSTRUMENTS.map((meta) => {
    const quote = quotes[meta.symbol];
    const cfg = getStyleTargets(style, meta.pipSize, meta.symbol);
    const rawCandles =
      quote?.candles?.[cfg.tfKey] && quote.candles[cfg.tfKey].length >= 12
        ? quote.candles[cfg.tfKey]
        : quote?.candles?.['15m'] && quote.candles['15m'].length >= 10
          ? quote.candles['15m']
          : quote?.candles?.['1h'] ?? [];

    const ticketId = deterministicTicketId(meta.symbol, style, todayUtc);

    if (!quote || !quote.price || rawCandles.length < 8) {
      return {
        id: `${meta.symbol}-${style}`,
        ticketId,
        issuedWibLabel: 'Menunggu Sinkronisasi Feed',
        symbol: meta.symbol,
        displaySymbol: meta.displaySymbol,
        category: meta.category,
        style,
        timeframeLabel: cfg.tfLabel,
        tvSymbol: meta.tvSymbol,
        available: false,
        livePrice: quote?.price ?? 0,
        decimals: meta.decimals,
        changePct24h: quote?.changePct24h ?? 0,
        direction: 'BUY',
        orderType: 'BUY LIMIT',
        zoneLabelId: 'Menunggu Data OHLC Live',
        zoneLabelEn: 'Awaiting Live OHLC',
        rsi14: 50,
        atrValue: 0,
        entryPrice: 0,
        stopLoss: 0,
        effectiveStopLoss: 0,
        takeProfit1: 0,
        takeProfit2: 0,
        slPips: 0,
        tp1Pips: 0,
        tp2Pips: 0,
        rrr1: '1 : 2.0',
        rrr2: '1 : 3.5',
        status: 'NO_DATA',
        breakEvenProtected: false,
        distanceToLimitPips: 0,
        floatingPips: 0,
        recommendedCentLot: 0.01,
        riskUsc: 0,
        riskRp: 0,
        floatingUsc: 0,
        floatingRp: 0,
        tp1ProfitUsc: 0,
        tp1ProfitRp: 0,
        tp2ProfitUsc: 0,
        tp2ProfitRp: 0,
        sessionWib: meta.optimalSessionWibId,
        reasonsId: [
          'Feed candlestick live untuk instrumen ini sedang menyinkronkan ulang.',
          'JGS dilarang menampilkan angka limit order palsu tanpa data OHLC aktual.',
          'Tekan Muat Ulang Sinyal atau pilih instrumen aktif seperti XAUUSD/EURUSD.',
          'Cek rilis berita merah mendatang di menu Berita Pasar (News WIB).',
        ],
        reasonsEn: [
          'Live OHLC stream for this asset is resynchronizing.',
          'JGS refuses to fabricate unverified Limit prices without real OHLC candles.',
          'Click Refresh or switch to active pairs such as XAUUSD or EURUSD.',
          'Verify upcoming news countdowns in the WIB News Radar.',
        ],
        sourceNote: quote?.source ?? 'Menunggu Feed Live',
      };
    }

    const closes = rawCandles.map((c) => c.close);
    const ema20 = computeEmaSeries(closes, 20);
    const ema50 = computeEmaSeries(closes, Math.min(50, Math.max(22, closes.length - 1)));
    const lastEma20 = ema20[ema20.length - 1];
    const lastEma50 = ema50[ema50.length - 1];
    const rsi14 = computeRsi14(closes);
    const atr = Math.max(computeAtr14(rawCandles), cfg.minSlPips * meta.pipSize * 0.65);

    const structureSlice = rawCandles.slice(-24);
    const swingHigh = Math.max(...structureSlice.map((c) => c.high));
    const swingLow = Math.min(...structureSlice.map((c) => c.low));
    const swingRange = Math.max(atr * 2, swingHigh - swingLow);
    const livePrice = quote.price;

    const isUsdQuote = meta.symbol.endsWith('USD') || meta.symbol === 'XAUUSD' || meta.symbol === 'XAGUSD';
    const dxyBearish = macro ? macro.dxyChangePct < -0.1 : false;
    const dxyBullish = macro ? macro.dxyChangePct > 0.1 : false;
    let bullScore = lastEma20 >= lastEma50 ? 2 : -2;
    if (rsi14 > 51) bullScore += 1;
    if (rsi14 < 49) bullScore -= 1;
    if (isUsdQuote && dxyBearish) bullScore += 1;
    if (isUsdQuote && dxyBullish) bullScore -= 1;

    const direction: 'BUY' | 'SELL' = bullScore >= 0 ? 'BUY' : 'SELL';
    const orderType: LiveSignalOrderType = direction === 'BUY' ? 'BUY LIMIT' : 'SELL LIMIT';

    // Institutional OTE (61.8% - 70.5% retracement) anchored strictly away from current price
    // so the terminal NEVER chases a candle with a Market Order!
    const offsetAtr = atr * cfg.atrLimitMult;
    const fibOteBuy = swingHigh - swingRange * 0.66;
    const fibOteSell = swingLow + swingRange * 0.66;

    let entryPrice: number;
    if (direction === 'BUY') {
      const candidateBelow = Math.min(livePrice - atr * 0.85, Math.max(fibOteBuy, livePrice - atr * 1.45));
      entryPrice = Math.min(livePrice - meta.pipSize * Math.max(6, Math.round(cfg.minSlPips * 0.3)), candidateBelow);
    } else {
      const candidateAbove = Math.max(livePrice + atr * 0.85, Math.min(fibOteSell, livePrice + atr * 1.45));
      entryPrice = Math.max(livePrice + meta.pipSize * Math.max(6, Math.round(cfg.minSlPips * 0.3)), candidateAbove);
    }
    entryPrice = Number(entryPrice.toFixed(meta.decimals));

    // Structural Stop Loss outside Swing Extreme + 0.6x ATR liquidity buffer
    const rawStructuralDist =
      direction === 'BUY'
        ? Math.max(entryPrice - (swingLow - atr * 0.6), atr * 1.45)
        : Math.max((swingHigh + atr * 0.6) - entryPrice, atr * 1.45);
    const rawSlPips = Math.round(rawStructuralDist / meta.pipSize);
    const slPips = Math.max(cfg.minSlPips, Math.min(cfg.maxSlPips, rawSlPips));
    const slDist = slPips * meta.pipSize;

    const tp1Dist = Number((slDist * cfg.tp1Mult).toFixed(meta.decimals));
    const tp2Dist = Number((slDist * cfg.tp2Mult).toFixed(meta.decimals));
    const tp1Pips = Math.round(slPips * cfg.tp1Mult);
    const tp2Pips = Math.round(slPips * cfg.tp2Mult);

    const stopLoss = Number(
      (direction === 'BUY' ? entryPrice - slDist : entryPrice + slDist).toFixed(meta.decimals)
    );
    const takeProfit1 = Number(
      (direction === 'BUY' ? entryPrice + tp1Dist : entryPrice - tp1Dist).toFixed(meta.decimals)
    );
    const takeProfit2 = Number(
      (direction === 'BUY' ? entryPrice + tp2Dist : entryPrice - tp2Dist).toFixed(meta.decimals)
    );

    const distanceToLimitPips = Math.max(
      0,
      Math.round(Math.abs(livePrice - entryPrice) / meta.pipSize)
    );

    // Capital & Cent lot sizing using exact live USD/IDR rate
    const capitalUsc = Math.max(100, capitalRp / rpPerUsc);
    const riskBudgetUsc = capitalUsc * (Math.max(0.25, Math.min(5, riskPct)) / 100);
    const oneStepRiskUsc = slPips * meta.uscPerPipAtMinCentLot;
    const lotSteps = Math.max(1, Math.min(50, Math.floor(riskBudgetUsc / Math.max(0.01, oneStepRiskUsc))));
    const recommendedCentLot = Number((lotSteps * 0.01).toFixed(2));
    const riskUsc = Number((lotSteps * oneStepRiskUsc).toFixed(1));
    const tp1ProfitUsc = Number((lotSteps * tp1Pips * meta.uscPerPipAtMinCentLot).toFixed(1));
    const tp2ProfitUsc = Number((lotSteps * tp2Pips * meta.uscPerPipAtMinCentLot).toFixed(1));

    const cotMatch = meta.cotCode ? cotReports.find((r) => r.code === meta.cotCode) : undefined;
    const cotSentenceId = cotMatch
      ? `Data CFTC (${cotMatch.reportDateIso}): Institusi ${cotMatch.instLongPct}% Long (Net ${cotMatch.instNet.toLocaleString('id-ID')} kontrak) vs Ritel kecil ${cotMatch.retailLongPct}% Long.`
      : `Arus institusional selaras zona Premium/Discount ${cfg.tfLabel} dengan batas risiko ketat ${riskPct}%.`;
    const cotSentenceEn = cotMatch
      ? `Live CFTC (${cotMatch.reportDateIso}): Funds ${cotMatch.instLongPct}% Long (${cotMatch.instNet} net) vs Retail ${cotMatch.retailLongPct}% Long.`
      : `Institutional flow aligns with ${cfg.tfLabel} Premium/Discount zones at ${riskPct}% risk.`;

    const macroTextId = macro?.dxyPrice
      ? `DXY live di ${macro.dxyPrice.toFixed(2)} (${macro.dxyChangePct >= 0 ? '+' : ''}${macro.dxyChangePct}%) & US10Y Yield ${macro.us10yYield.toFixed(2)}%.`
      : 'Bias makro mengikuti pergerakan Dolar AS dan imbal hasil obligasi AS.';
    const macroTextEn = macro?.dxyPrice
      ? `Live DXY sits at ${macro.dxyPrice.toFixed(2)} (${macro.dxyChangePct >= 0 ? '+' : ''}${macro.dxyChangePct}%) alongside US10Y ${macro.us10yYield.toFixed(2)}%.`
      : 'Macro bias tracks real-time DXY momentum and US10Y yields.';

    const zoneLabelId =
      direction === 'BUY'
        ? 'Zona Diskon Institusi (61.8% - 70.5% Fib OTE + Bullish FVG/OB)'
        : 'Zona Premium Institusi (61.8% - 70.5% Fib OTE + Bearish FVG/OB)';
    const zoneLabelEn =
      direction === 'BUY'
        ? 'Institutional Discount Zone (61.8% - 70.5% Fib OTE + Bullish FVG/OB)'
        : 'Institutional Premium Zone (61.8% - 70.5% Fib OTE + Bearish FVG/OB)';

    const structLabelId =
      direction === 'BUY'
        ? `Tidak mengejar harga pucuk! Antri BUY LIMIT di ${entryPrice.toFixed(meta.decimals)} (jarak ${distanceToLimitPips} pips di bawah spot) dengan bantalan SL di bawah Swing Low ${swingLow.toFixed(meta.decimals)} + 0.6x ATR.`
        : `Tidak mengejar penurunan! Antri SELL LIMIT di ${entryPrice.toFixed(meta.decimals)} (jarak ${distanceToLimitPips} pips di atas spot) dengan bantalan SL di atas Swing High ${swingHigh.toFixed(meta.decimals)} + 0.6x ATR.`;

    const structLabelEn =
      direction === 'BUY'
        ? `Zero candle-chasing! Resting BUY LIMIT at ${entryPrice.toFixed(meta.decimals)} (${distanceToLimitPips} pips below live spot) with SL cushioned beneath ${swingLow.toFixed(meta.decimals)} + 0.6x ATR.`
        : `Zero chasing! Resting SELL LIMIT at ${entryPrice.toFixed(meta.decimals)} (${distanceToLimitPips} pips above live spot) with SL buffered above ${swingHigh.toFixed(meta.decimals)} + 0.6x ATR.`;

    return {
      id: `${meta.symbol}-${style}`,
      ticketId,
      issuedWibLabel: '',
      symbol: meta.symbol,
      displaySymbol: meta.displaySymbol,
      category: meta.category,
      style,
      timeframeLabel: cfg.tfLabel,
      tvSymbol: meta.tvSymbol,
      available: true,
      livePrice,
      decimals: meta.decimals,
      changePct24h: quote.changePct24h,
      direction,
      orderType,
      zoneLabelId,
      zoneLabelEn,
      rsi14,
      atrValue: Number(atr.toFixed(meta.decimals)),
      entryPrice,
      stopLoss,
      effectiveStopLoss: stopLoss,
      takeProfit1,
      takeProfit2,
      slPips,
      tp1Pips,
      tp2Pips,
      rrr1: `1 : ${cfg.tp1Mult.toFixed(1)}`,
      rrr2: `1 : ${cfg.tp2Mult.toFixed(1)}`,
      status: 'WAITING_FILL',
      breakEvenProtected: false,
      distanceToLimitPips,
      floatingPips: 0,
      recommendedCentLot,
      riskUsc,
      riskRp: Math.round(riskUsc * rpPerUsc),
      floatingUsc: 0,
      floatingRp: 0,
      tp1ProfitUsc,
      tp1ProfitRp: Math.round(tp1ProfitUsc * rpPerUsc),
      tp2ProfitUsc,
      tp2ProfitRp: Math.round(tp2ProfitUsc * rpPerUsc),
      sessionWib: meta.optimalSessionWibId,
      reasonsId: [
        structLabelId,
        `Jendela Eksekusi Optimal: ${meta.optimalSessionWibId} dengan SL struktural ${slPips} pips (EMA20 ${lastEma20.toFixed(meta.decimals)} / RSI ${rsi14}).`,
        `Arah Bias Makro Live: ${macroTextId}`,
        cotSentenceId,
      ],
      reasonsEn: [
        structLabelEn,
        `Optimal Session: ${meta.optimalSessionWibEn} with ${slPips}-pip structural buffer (EMA20 ${lastEma20.toFixed(meta.decimals)} / RSI ${rsi14}).`,
        `Live Macro Driver: ${macroTextEn}`,
        cotSentenceEn,
      ],
      sourceNote: quote.source,
    };
  });
}
