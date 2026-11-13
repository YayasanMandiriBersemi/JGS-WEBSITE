export type SignalAssetCategory = 'METALS' | 'FOREX' | 'INDICES' | 'CRYPTO';
export type SignalTradingStyle = 'SCALPING' | 'INTRADAY' | 'SWING';
export type SignalOrderType = 'MARKET BUY' | 'MARKET SELL' | 'BUY LIMIT' | 'SELL LIMIT';

export interface IntelligenceSignalSetup {
  id: string;
  symbol: string;
  centSymbol: string;
  tvSymbol: string;
  category: SignalAssetCategory;
  style: SignalTradingStyle;
  direction: 'BUY' | 'SELL';
  orderType: SignalOrderType;
  timeframe: string;
  sessionWib: string;
  grade: 'GRADE A+ TRIAD' | 'GRADE B KILLZONE';
  baselinePrice: number;
  decimals: number;
  /** Signed delta added to live spot price to determine exact entry level */
  entryOffsetPrice: number;
  /** Absolute price distance from entry to stop loss */
  slDistancePrice: number;
  /** Absolute price distance from entry to TP1 */
  tp1DistancePrice: number;
  /** Absolute price distance from entry to TP2 */
  tp2DistancePrice: number;
  /** Price per 1 pip (e.g., 0.1 for Gold, 0.0001 for EURUSD, 0.01 for JPY, 1 for Indices/BTC) */
  pipSize: number;
  /** USC risk per 1 pip at 0.01 Cent Lot (1 USD = 100 USC) */
  uscPerPipAtMinCentLot: number;
  minLotWarningId?: string;
  minLotWarningEn?: string;
  fundamentalTagId: string;
  fundamentalTagEn: string;
  cotTagId: string;
  cotTagEn: string;
  reasonsId: [string, string, string, string];
  reasonsEn: [string, string, string, string];
  liveRateSource?:
    | 'BINANCE_BTC'
    | 'BINANCE_ETH'
    | 'BINANCE_SOL'
    | 'FX_EUR'
    | 'FX_GBP'
    | 'FX_JPY'
    | 'FX_GBPJPY'
    | 'FX_AUD'
    | 'FX_CAD';
}

export interface CalibratedSignalCalculation {
  spotPrice: number;
  entryPrice: number;
  slPrice: number;
  tp1Price: number;
  tp2Price: number;
  slPips: number;
  tp1Pips: number;
  tp2Pips: number;
  rrrRatio: string;
  recommendedCentLot: number;
  riskUsc: number;
  riskRp: number;
  tp1ProfitUsc: number;
  tp1ProfitRp: number;
  tp2ProfitUsc: number;
  tp2ProfitRp: number;
  formatPrice: (p: number) => string;
}

const RP_PER_USC = 160; // $1 = Rp16.000 -> 1 USC = Rp160

export function calculateCalibratedSignalTrade(
  sig: IntelligenceSignalSetup,
  spotPrice: number,
  capitalRp: number,
  riskPct: number
): CalibratedSignalCalculation {
  const safeSpot = Number.isFinite(spotPrice) && spotPrice > 0 ? spotPrice : sig.baselinePrice;
  const entryPrice = Number((safeSpot + sig.entryOffsetPrice).toFixed(sig.decimals));
  const isBuy = sig.direction === 'BUY';

  const slPrice = Number(
    (isBuy ? entryPrice - sig.slDistancePrice : entryPrice + sig.slDistancePrice).toFixed(
      sig.decimals
    )
  );
  const tp1Price = Number(
    (isBuy ? entryPrice + sig.tp1DistancePrice : entryPrice - sig.tp1DistancePrice).toFixed(
      sig.decimals
    )
  );
  const tp2Price = Number(
    (isBuy ? entryPrice + sig.tp2DistancePrice : entryPrice - sig.tp2DistancePrice).toFixed(
      sig.decimals
    )
  );

  const slPips = Math.max(1, Math.round(sig.slDistancePrice / sig.pipSize));
  const tp1Pips = Math.max(1, Math.round(sig.tp1DistancePrice / sig.pipSize));
  const tp2Pips = Math.max(1, Math.round(sig.tp2DistancePrice / sig.pipSize));
  const rrrNumeric = Number((tp2Pips / slPips).toFixed(2));

  const capitalUsc = Math.max(100, capitalRp / RP_PER_USC);
  const maxRiskBudgetUsc = capitalUsc * (Math.max(0.25, Math.min(5, riskPct)) / 100);
  const riskAtMinLotUsc = slPips * sig.uscPerPipAtMinCentLot;

  // Floor to clean 0.01 Cent Lot steps, minimum 0.01
  const rawSteps = riskAtMinLotUsc > 0 ? Math.floor(maxRiskBudgetUsc / riskAtMinLotUsc) : 1;
  const lotSteps = Math.max(1, Math.min(50, rawSteps));
  const recommendedCentLot = Number((lotSteps * 0.01).toFixed(2));

  const actualRiskUsc = Number((lotSteps * riskAtMinLotUsc).toFixed(1));
  const tp1ProfitUsc = Number((lotSteps * tp1Pips * sig.uscPerPipAtMinCentLot).toFixed(1));
  const tp2ProfitUsc = Number((lotSteps * tp2Pips * sig.uscPerPipAtMinCentLot).toFixed(1));

  const formatPrice = (p: number) =>
    p.toLocaleString('en-US', {
      minimumFractionDigits: sig.decimals,
      maximumFractionDigits: sig.decimals,
    });

  return {
    spotPrice: safeSpot,
    entryPrice,
    slPrice,
    tp1Price,
    tp2Price,
    slPips,
    tp1Pips,
    tp2Pips,
    rrrRatio: `1 : ${rrrNumeric.toFixed(2)}`,
    recommendedCentLot,
    riskUsc: actualRiskUsc,
    riskRp: Math.round(actualRiskUsc * RP_PER_USC),
    tp1ProfitUsc,
    tp1ProfitRp: Math.round(tp1ProfitUsc * RP_PER_USC),
    tp2ProfitUsc,
    tp2ProfitRp: Math.round(tp2ProfitUsc * RP_PER_USC),
    formatPrice,
  };
}

export interface FundamentalBiasAsset {
  id: string;
  symbol: string;
  nameId: string;
  nameEn: string;
  score: number;
  policyStanceId: string;
  policyStanceEn: string;
  keyDriverId: string;
  keyDriverEn: string;
  yieldNoteId: string;
  yieldNoteEn: string;
  biasLabelId: string;
  biasLabelEn: string;
}

export interface MacroDataSourceLink {
  id: string;
  institution: string;
  metricNameId: string;
  metricNameEn: string;
  whatToCheckId: string;
  whatToCheckEn: string;
  url: string;
}

export interface MarketNewsWibItem {
  id: string;
  eventTitleId: string;
  eventTitleEn: string;
  currency: string;
  typicalWibTime: string;
  impactLevel: 'HIGH IMPACT' | 'CRITICAL FOMC';
  simpleExplainId: string;
  simpleExplainEn: string;
  ifActualHigherId: string;
  ifActualHigherEn: string;
  ifActualHigherEffect: 'USD_UP_GOLD_DOWN' | 'USD_DOWN_GOLD_UP';
  ifActualLowerId: string;
  ifActualLowerEn: string;
  ifActualLowerEffect: 'USD_DOWN_GOLD_UP' | 'USD_UP_GOLD_DOWN';
  hmrRuleId: string;
  hmrRuleEn: string;
}

export interface CotPositioningRow {
  id: string;
  asset: string;
  cftcCode: string;
  retailLongPct: number;
  cotInstLongPct: number;
  cotWeeklyNetDeltaId: string;
  cotWeeklyNetDeltaEn: string;
  summaryId: string;
  summaryEn: string;
}

export const MULTI_ASSET_SIGNALS: IntelligenceSignalSetup[] = [
  // =========================================================================
  // STYLE 1: SCALPING (M1 - M5 FAST SESSIONS)
  // =========================================================================
  {
    id: 'sig-xauusd-scalp',
    symbol: 'XAUUSD',
    centSymbol: 'XAUUSDc',
    tvSymbol: 'OANDA:XAUUSD',
    category: 'METALS',
    style: 'SCALPING',
    direction: 'BUY',
    orderType: 'MARKET BUY',
    timeframe: 'M15 Bias -> M1/M5 Trigger',
    sessionWib: 'London Open Killzone (14:00 - 16:30 WIB)',
    grade: 'GRADE A+ TRIAD',
    baselinePrice: 3985.5,
    decimals: 2,
    entryOffsetPrice: 0,
    slDistancePrice: 2.5,
    tp1DistancePrice: 4.0,
    tp2DistancePrice: 6.5,
    pipSize: 0.1,
    uscPerPipAtMinCentLot: 0.1,
    fundamentalTagId: 'Macro Emas Bullish (+78): Permintaan Safe-Haven Terjaga',
    fundamentalTagEn: 'Macro Gold Bullish (+78): Sovereign & Real-Yield Tailwind',
    cotTagId: 'COT Institusi 74% Long vs Ritel 72% Short',
    cotTagEn: 'COT Funds 74% Long vs 72% Retail Shorts',
    reasonsId: [
      'Sapuan Likuiditas Cepat M5: Harga menusuk tipis level rendah 15 menit sebelumnya lalu langsung memantul dengan buntut bawah panjang.',
      'Konfirmasi Break Struktur M1/M5: Lilin hijau menutup di atas puncak kecil terakhir membentuk FVG segar untuk eksekusi cepat.',
      'Kalibrasi Scalping Modal Rp160rb: Dengan jarak SL $2.50 (25 pips) dan 0.03 Cent Lot, risiko terkunci Rp1.200 (7.5 USC).',
      'Kunci Keuntungan Cepat: Ambil separuh profit di TP1 (+1:1.6) lalu geser SL ke Break Even agar bebas stres.',
    ],
    reasonsEn: [
      'Fast M5 Liquidity Sweep: Price pierced the prior 15-minute low and snapped straight back above with a rejection wick.',
      'M1/M5 Shift Trigger: Crisp green candle body closed past micro swing high exposing a clean execution FVG.',
      'Micro-Capital Calibration: Tight $2.50 (25-pip) stop with 0.03 Cent Lot locks worst-case risk around 7.5 USC.',
      'Active Trade Hygiene: Bank partial gains cleanly at TP1 and move stops to Entry.',
    ],
  },
  {
    id: 'sig-eurusd-scalp',
    symbol: 'EURUSD',
    centSymbol: 'EURUSDc',
    tvSymbol: 'FX:EURUSD',
    category: 'FOREX',
    style: 'SCALPING',
    direction: 'BUY',
    orderType: 'BUY LIMIT',
    timeframe: 'M5 Structure -> M1 Entry',
    sessionWib: 'London Session (14:15 - 17:30 WIB)',
    grade: 'GRADE A+ TRIAD',
    baselinePrice: 1.0845,
    decimals: 4,
    entryOffsetPrice: -0.001,
    slDistancePrice: 0.0012,
    tp1DistancePrice: 0.002,
    tp2DistancePrice: 0.0032,
    pipSize: 0.0001,
    uscPerPipAtMinCentLot: 0.1,
    liveRateSource: 'FX_EUR',
    fundamentalTagId: 'Macro Bullish (+42): Tekanan Dolar Melunak',
    fundamentalTagEn: 'Macro Bullish (+42): Narrowing US-EA Spreads',
    cotTagId: 'COT Hedge Fund Mulai Kurangi Short Euro',
    cotTagEn: 'COT Large Speculators Trimming EUR Shorts',
    reasonsId: [
      'Spread Paling Tipis untuk Scalping: Biaya selisih Ask-Bid EURUSDc terendah di jam London, aman dari gesekan komisi.',
      'Pasang Buy Limit di Bawah Harga Sekarang: Menjemput area retracement FVG 50% tanpa mengejar candle hijau.',
      'Stop Loss Ketat 12 Pips: Diletakkan rapi di bawah ekor sapuan M5 sehingga R:R mencapai 1:2.67.',
      'Aman Untuk Akun 1.000 USC: Ukuran 0.06 Cent Lot hanya mempertaruhkan Rp1.152 (7.2 USC).',
    ],
    reasonsEn: [
      'Lowest Friction FX Pair: Peak European liquidity keeps Bid-Ask spreads razor thin for tight scalping.',
      'Clean Buy Limit Anchor: Rests patiently at the 50% M5 FVG midpoint instead of chasing breakouts.',
      '12-Pip Structural Shield: Sits neatly behind the Asian-session sweep tail offering 1:2.67 R:R.',
      'Strict Cent Sizing: 0.06 Cent Lots risk only 7.2 USC inside the 1% account guardrail.',
    ],
  },
  {
    id: 'sig-gbpjpy-scalp',
    symbol: 'GBPJPY',
    centSymbol: 'GBPJPYc',
    tvSymbol: 'FX:GBPJPY',
    category: 'FOREX',
    style: 'SCALPING',
    direction: 'SELL',
    orderType: 'SELL LIMIT',
    timeframe: 'M15 Supply -> M1/M5 Entry',
    sessionWib: 'Tokyo Late / London Open (13:30 - 16:00 WIB)',
    grade: 'GRADE B KILLZONE',
    baselinePrice: 198.4,
    decimals: 2,
    entryOffsetPrice: 0.12,
    slDistancePrice: 0.2,
    tp1DistancePrice: 0.35,
    tp2DistancePrice: 0.55,
    pipSize: 0.01,
    uscPerPipAtMinCentLot: 0.065,
    liveRateSource: 'FX_GBPJPY',
    fundamentalTagId: 'Kewaspadaan BoJ (-28): Zona Resistance Rawan Tolakan',
    fundamentalTagEn: 'Macro BoJ Watch (-28): Supply Rejection Sensitivity',
    cotTagId: 'COT Mengurangi Short Yen Ekstrem',
    cotTagEn: 'COT Funds Trimming Crowded Short Yen Bets',
    reasonsId: [
      'Ingat Skala Desimal JPY (0.01): Pastikan penentuan jarak SL 20 pips terbaca sebagai 0.20 poin pada harga GBPJPYc.',
      'Pasang Sell Limit di Zona Suplai Atas: Biarkan harga menyentuh antrean jualmu alih-alih buru-buru Sell di tengah jalan.',
      'Tolakan M5 di Sesi Pembukaan Eropa: Lilin merah panjang menutup mematahkan pijakan naik terakhir.',
      'Kontrol Volatilitas Cepat: Segera pindahkan SL ke titik entry begitu mencapai +20 pips.',
    ],
    reasonsEn: [
      '2-Decimal Yen Standard: Read 20 pips precisely as 0.20 price units on GBPJPYc before setting pending stops.',
      'Overhead Sell Limit Trap: Let price spike up into M15 supply to trigger your passive limit order.',
      'London Open Bearish MSS: Strong red displacement engulfed micro support.',
      'Fast Move Protection: Shift SL to Break Even promptly at +1R to insulate against Yen whipsaws.',
    ],
  },
  {
    id: 'sig-btcusd-scalp',
    symbol: 'BTCUSDT',
    centSymbol: 'BTCUSDTc',
    tvSymbol: 'BINANCE:BTCUSDT',
    category: 'CRYPTO',
    style: 'SCALPING',
    direction: 'BUY',
    orderType: 'BUY LIMIT',
    timeframe: 'M15 FVG -> M5 Trigger',
    sessionWib: 'Wall Street / NY Overlap (20:00 - 23:00 WIB)',
    grade: 'GRADE B KILLZONE',
    baselinePrice: 92400.0,
    decimals: 0,
    entryOffsetPrice: -220,
    slDistancePrice: 350,
    tp1DistancePrice: 600,
    tp2DistancePrice: 950,
    pipSize: 1,
    uscPerPipAtMinCentLot: 0.01,
    liveRateSource: 'BINANCE_BTC',
    minLotWarningId: 'Cek spesifikasi spread kripto MT5 Exness Cent sebelum pasang SL.',
    minLotWarningEn: 'Check MT5 Crypto Cent spread width before sending tight stops.',
    fundamentalTagId: 'Macro Bullish (+66): Aliran Spot ETF & Likuiditas AS',
    fundamentalTagEn: 'Macro Bullish (+66): Spot ETF Inflows Active',
    cotTagId: 'CME Institutions Net Long >75%',
    cotTagEn: 'CME Asset Managers >75% Long',
    reasonsId: [
      'Pantau Jam Bursa ETF AS: Gerak Bitcoin paling bersih terjadi jam 20:00-23:00 WIB saat dana institusional aktif.',
      'Likuidasi Leverage Ritel Cepat: Penurunan cepat 200-300 poin sering menjemput zona order blok M5 sebelum memantul.',
      'Gunakan Lot Cent Minimum 0.01: Jarak SL 350 poin masih terkelola sangat aman di bawah 4 USC (Rp640).',
      'Waspada Spread Sabtu-Minggu: Jangan menaruh SL terlalu rapat tepat menempel garis angka bulat.',
    ],
    reasonsEn: [
      'Peak NY ETF Window: Cleanest Bitcoin scalps cluster inside 20:00-23:00 WIB US cash desk activity.',
      'Perpetual Sweep Fuel: Quick 200-pt flushes regularly tap fresh M5 order blocks right before reversing.',
      'Ultra-Safe 0.01 Cent Floor: 350-point protective stop risks under 4 USC on balanced Cent volume.',
      'Spread Awareness: Keep protective stops comfortably outside whole-thousand psychological numbers.',
    ],
  },

  // =========================================================================
  // STYLE 2: INTRADAY (M15 - H1 HARIAN, TUTUP HARI INI)
  // =========================================================================
  {
    id: 'sig-xauusd-intraday',
    symbol: 'XAUUSD',
    centSymbol: 'XAUUSDc',
    tvSymbol: 'OANDA:XAUUSD',
    category: 'METALS',
    style: 'INTRADAY',
    direction: 'BUY',
    orderType: 'BUY LIMIT',
    timeframe: 'H1 Bias -> M15/M5 Entry',
    sessionWib: 'NY Killzone (19:30 - 22:30 WIB)',
    grade: 'GRADE A+ TRIAD',
    baselinePrice: 3985.5,
    decimals: 2,
    entryOffsetPrice: -4.5,
    slDistancePrice: 5.0,
    tp1DistancePrice: 10.0,
    tp2DistancePrice: 15.0,
    pipSize: 0.1,
    uscPerPipAtMinCentLot: 0.1,
    fundamentalTagId: 'Macro Bullish (+78): Yield Riil US10Y Melandai',
    fundamentalTagEn: 'Macro Bullish (+78): US10Y Real Yields Softening',
    cotTagId: 'COT Institusi +18.4k Net Long Baru',
    cotTagEn: 'COT Funds Added +18.4k Net Longs WoW',
    reasonsId: [
      'Skenario Intraday Utama (Harian): Menunggu harga Emas turun menjemput zona diskon H1 dekat area sapuan sesi sebelumnya.',
      'Tunggu Konfirmasi M5/M15: Setelah limit tersentuh, pastikan tidak ada berita merah mendadak 15 menit ke depan.',
      'Stop Loss Longgar $5.00 (50 Pips): Memberi ruang napas wajar dari ayunan jarum sesi New York agar tidak tersapu prematur.',
      'Target 1:3 Penuh di Puncak Harian: Modal Rp160.000 (0.02 Cent Lot) berisiko 10 USC dengan target +30 USC (+Rp4.800).',
    ],
    reasonsEn: [
      'Primary Intraday Plan: Patiently awaits an H1 discount pullback into the session Fair Value Gap.',
      'News Safety Filter: Verify zero high-impact US red folders sit within the next 15 minutes.',
      'Roomy $5.00 (50-Pip) Buffer: Protects trade cleanly against routine New York opening noise spikes.',
      'Clean 1:3 Intraday R:R: Risks 10 USC at 0.02 Cent Lot aiming cleanly for +30 USC upside.',
    ],
  },
  {
    id: 'sig-eurusd-intraday',
    symbol: 'EURUSD',
    centSymbol: 'EURUSDc',
    tvSymbol: 'FX:EURUSD',
    category: 'FOREX',
    style: 'INTRADAY',
    direction: 'BUY',
    orderType: 'BUY LIMIT',
    timeframe: 'H1 Structure -> M15 Entry',
    sessionWib: 'London / NY Overlap (15:00 - 21:00 WIB)',
    grade: 'GRADE A+ TRIAD',
    baselinePrice: 1.0845,
    decimals: 4,
    entryOffsetPrice: -0.0018,
    slDistancePrice: 0.0022,
    tp1DistancePrice: 0.0044,
    tp2DistancePrice: 0.0062,
    pipSize: 0.0001,
    uscPerPipAtMinCentLot: 0.1,
    liveRateSource: 'FX_EUR',
    fundamentalTagId: 'Macro Bullish (+42): Data Zona Euro Stabil',
    fundamentalTagEn: 'Macro Positive (+42): Eurozone Spread Support',
    cotTagId: 'Ritel 67% Short Terjebak Berlawanan COT',
    cotTagEn: 'Retail 67% Short Crowding Opposite Institutional Buying',
    reasonsId: [
      'Sapuan Yesterday Low (PDL): Pola klasik harian memakan SL pembeli pagi hari sebelum tren utama ke atas berjalan.',
      'Korelasi Harian ke Emas: Jika kamu sudah ambil XAUUSDc Buy, kurangi setengah lot di EURUSDc agar risiko USD tidak ganda.',
      'Stop Loss Harian 22 Pips: Ditaruh di bawah struktur H1 terakhir untuk rasio R:R 1:2.82.',
      'Selesai Sebelum Rollover 04:00 WIB: Bebas dari pembengkakan spread swap subuh.',
    ],
    reasonsEn: [
      'Previous-Day Low Raid: Classic intraday stop hunt clears early morning longs before directional expansion.',
      'USD Correlation Guard: Halve exposure if already holding full XAUUSDc long risk simultaneously.',
      '22-Pip Intraday Stop: Anchored cleanly behind H1 demand for a structured 1:2.82 target reach.',
      'Rollover Clean Exit: Resolves cleanly well ahead of 04:00 WIB midnight swap widening.',
    ],
  },
  {
    id: 'sig-usdjpy-intraday',
    symbol: 'USDJPY',
    centSymbol: 'USDJPYc',
    tvSymbol: 'FX:USDJPY',
    category: 'FOREX',
    style: 'INTRADAY',
    direction: 'SELL',
    orderType: 'SELL LIMIT',
    timeframe: 'H1 Supply -> M15 MSS',
    sessionWib: 'NY Killzone (19:30 - 22:30 WIB)',
    grade: 'GRADE A+ TRIAD',
    baselinePrice: 153.2,
    decimals: 2,
    entryOffsetPrice: 0.25,
    slDistancePrice: 0.35,
    tp1DistancePrice: 0.7,
    tp2DistancePrice: 1.0,
    pipSize: 0.01,
    uscPerPipAtMinCentLot: 0.065,
    liveRateSource: 'FX_JPY',
    fundamentalTagId: 'Macro Bearish USDJPY (-45): Yield Spread Menyempit',
    fundamentalTagEn: 'Macro Bearish USDJPY (-45): US-JP Yield Convergence',
    cotTagId: 'Ritel 69% Long Melawan Tutup Short Institusi',
    cotTagEn: '69% Retail Long Trap Against Fund Yen Buying',
    reasonsId: [
      'Sentimen Yield Obligasi AS-Jepang: Setiap penurunan yield US10Y langsung menekan pasangan USDJPY turun.',
      'Mayoritas Ritel 69% Terjebak Buy: Menjadi bahan bakar likuiditas ke bawah begitu pijakan H1 patah.',
      'Jemput Sell Limit 25 Pips Di Atas Spot: Menghindari mengejar penurunan dan mendapat SL pendek 35 pips.',
      'Target Harian +100 Pips (1.00 Yen): Memberi rasio bersih 1:2.86 dengan risiko modal sangat terkontrol.',
    ],
    reasonsEn: [
      'Treasury-JGB Spread Sensitivity: Softening US10Y yields act directly as downward gravity on USD/JPY.',
      '69% Retail Long Crowding: Dense retail stops resting below intraday lows magnetize downside delivery.',
      'Passive Premium Sell Limit: Captures optimal price execution 25 pips higher with a 35-pip ceiling.',
      '100-Pip Clean Objective: Delivers crisp 1:2.86 intraday upside-downside efficiency.',
    ],
  },
  {
    id: 'sig-ustec-intraday',
    symbol: 'USTEC / NAS100',
    centSymbol: 'USTECc',
    tvSymbol: 'NASDAQ:NDX',
    category: 'INDICES',
    style: 'INTRADAY',
    direction: 'BUY',
    orderType: 'BUY LIMIT',
    timeframe: '15m Opening Range -> M5 MSS',
    sessionWib: 'Wall Street Open (20:45 - 23:00 WIB)',
    grade: 'GRADE A+ TRIAD',
    baselinePrice: 20850.0,
    decimals: 1,
    entryOffsetPrice: -45.0,
    slDistancePrice: 55.0,
    tp1DistancePrice: 110.0,
    tp2DistancePrice: 165.0,
    pipSize: 1,
    uscPerPipAtMinCentLot: 0.01,
    minLotWarningId: 'Verifikasi nilai per poin USTECc di Spesifikasi MT5 sebelum order.',
    minLotWarningEn: 'Confirm exact USTECc point value in MT5 Specification before execution.',
    fundamentalTagId: 'Macro Bullish (+60): Belanja AI Big-Tech Kuat',
    fundamentalTagEn: 'Macro Positive (+60): Mega-Cap Tech Earnings',
    cotTagId: 'COT Asset Managers 71% Net Long',
    cotTagEn: 'COT Institutional Managers 71% Net Long',
    reasonsId: [
      'Aturan Emas 15 Menit Pertama: Tunggu hingga jam 20:45 WIB setelah bel pembukaan Wall Street mereda.',
      'Cocok Untuk Jadwal Malam WIB: Eksekusi rapi antara pukul 20:45 hingga 23:00 WIB setelah jam kerja/kuliah.',
      'Order Buy Limit Mengincar Judas Dip Pembukaan: Masuk pada tarikan turun awal yang menjemput stop ritel.',
      'Kunci Lot Minimum Cent (0.01): Cek nilai tick di broker agar jarak SL 55 poin tetap di dalam batas 1%.',
    ],
    reasonsEn: [
      'Mandatory 15-Min Cash Bell Wait: Hands off from 20:30-20:45 WIB until Opening Range bounds lock.',
      'Evening WIB Friendly Schedule: High-probability rotation resolves well before midnight.',
      'Judas Opening Dip Limit: Enters precisely where opening stops clear beneath Asia/London midpoints.',
      'Verify Broker Point Step: Check Cent index specification first so 55 points stay within <=10 USC.',
    ],
  },
  {
    id: 'sig-ethusd-intraday',
    symbol: 'ETHUSDT',
    centSymbol: 'ETHUSDTc',
    tvSymbol: 'BINANCE:ETHUSDT',
    category: 'CRYPTO',
    style: 'INTRADAY',
    direction: 'BUY',
    orderType: 'BUY LIMIT',
    timeframe: 'H1 Range -> M15 FVG',
    sessionWib: 'NY Cash Overlap (19:30 - 23:30 WIB)',
    grade: 'GRADE B KILLZONE',
    baselinePrice: 3180.0,
    decimals: 2,
    entryOffsetPrice: -22.0,
    slDistancePrice: 35.0,
    tp1DistancePrice: 70.0,
    tp2DistancePrice: 105.0,
    pipSize: 1,
    uscPerPipAtMinCentLot: 0.01,
    liveRateSource: 'BINANCE_ETH',
    fundamentalTagId: 'Macro Positif (+44): Mengikuti Likuiditas Bitcoin',
    fundamentalTagEn: 'Macro Positive (+44): High-Beta Follow-Through',
    cotTagId: 'Sentimen Lebih Bersih Dari Altcoin Berlebihan',
    cotTagEn: 'Cleaner Leverage Profile vs Stretched Alts',
    reasonsId: [
      'Mengikuti Arah Induk Bitcoin: Pastikan BTCUSDT tidak sedang breakdown sebelum Buy Limit ETH aktif.',
      'Sapuan Rentang Bawah H1: Order menunggu di Order Block H1 bersih berjarak aman 35 poin di bawah entry.',
      'Rasio Asimetris 1:3.00: Satu kemenangan bersih TP2 dapat menutup hingga tiga kali risiko terencana.',
      'Periksa Spread MT5 di Akhir Pekan: Jangan pasang pending order terlalu dekat dengan garis harga saat likuiditas tipis.',
    ],
    reasonsEn: [
      'Bitcoin Beta Filter: Confirm BTC holds H1 demand prior to letting ETH limits stay active overnight.',
      'Clean H1 Sweep Order Block: Limit order aligns cleanly above structural invalidation.',
      'Asymmetric 1:3 Intraday Target: Clear risk-to-reward profile built for small accounts.',
      'Spread Inspection Checklist: Audit broker weekend spread cushion in Market Watch first.',
    ],
  },

  // =========================================================================
  // STYLE 3: SWING (H4 - DAILY MULTI-DAY POSITION)
  // =========================================================================
  {
    id: 'sig-xauusd-swing',
    symbol: 'XAUUSD',
    centSymbol: 'XAUUSDc',
    tvSymbol: 'OANDA:XAUUSD',
    category: 'METALS',
    style: 'SWING',
    direction: 'BUY',
    orderType: 'BUY LIMIT',
    timeframe: 'Daily Bias -> H4 Confirmation',
    sessionWib: 'Posisi Multi-Hari (Setup Minggu Ini)',
    grade: 'GRADE A+ TRIAD',
    baselinePrice: 3985.5,
    decimals: 2,
    entryOffsetPrice: -18.5,
    slDistancePrice: 12.0,
    tp1DistancePrice: 28.0,
    tp2DistancePrice: 45.0,
    pipSize: 0.1,
    uscPerPipAtMinCentLot: 0.1,
    fundamentalTagId: 'Macro Swing Kuat (+78): Akumulasi Emas Bank Sentral',
    fundamentalTagEn: 'Strong Structural Bull (+78): Central Bank Bullion Demand',
    cotTagId: 'COT Multi-Minggu Fund Tambah Long Bersih',
    cotTagEn: 'Multi-Week Institutional COT Long Expansion',
    reasonsId: [
      'Cocok Untuk Trader Sibuk Kerja / Kuliah: Tidak perlu memelototi grafik menit ke menit, cukup cek penutupan candle H4 setiap 4 jam.',
      'Antre Buy Limit di Diskon Besar ($18.50 Di Bawah Harga): Membiarkan koreksi mingguan menjemput level permintaan H4 yang kuat.',
      'Stop Loss Swing Aman 120 Pips ($12): Tahan terhadap gejolak berita harian tanpa mengganggu target mingguan 450 pips (1:3.75).',
      'Kunci 0.01 Cent Lot Saja: Pada modal Rp160.000, SL $12 hanya berisiko 12 USC (Rp1.920) untuk target profit +45 USC (+Rp7.200)!',
    ],
    reasonsEn: [
      'Built For Full-Time Professionals & Students: Review clean H4 candle closes instead of gluing to M1 noise.',
      'Deep Weekly Buy Limit: Waits $18.50 lower right on a major H4 institutional Order Block.',
      '120-Pip Swing Shield: Absorbs normal mid-week volatility while aiming cleanly for +450 pips (1:3.75 R:R).',
      'Micro 0.01 Cent Lot Simplicity: $12 SL risks ~12 USC (~Rp1,920) aiming for +45 USC gain.',
    ],
  },
  {
    id: 'sig-usdjpy-swing',
    symbol: 'USDJPY',
    centSymbol: 'USDJPYc',
    tvSymbol: 'FX:USDJPY',
    category: 'FOREX',
    style: 'SWING',
    direction: 'SELL',
    orderType: 'SELL LIMIT',
    timeframe: 'Daily Supply -> H4 MSS',
    sessionWib: 'Posisi Multi-Hari (H4 Close Audit)',
    grade: 'GRADE B KILLZONE',
    baselinePrice: 153.2,
    decimals: 2,
    entryOffsetPrice: 0.65,
    slDistancePrice: 0.9,
    tp1DistancePrice: 1.8,
    tp2DistancePrice: 3.1,
    pipSize: 0.01,
    uscPerPipAtMinCentLot: 0.065,
    liveRateSource: 'FX_JPY',
    fundamentalTagId: 'Macro Bearish Swing (-45): Normalisasi Kebijakan BoJ',
    fundamentalTagEn: 'Macro Bearish (-45): Multi-Quarter Carry Unwind Risk',
    cotTagId: 'COT Mulai Tutup Short Yen Berkelanjutan',
    cotTagEn: 'Multi-Week Institutional Yen Short Covering',
    reasonsId: [
      'Menangkap Reversal Mingguan di Zona Supply D1: Mengantisipasi normalisasi suku bunga Jepang melawan Dolar.',
      'Perhatikan Swap Inap Multi-Hari: Cek biaya Swap Short pada MT5 agar posisi tahan berhari-hari tidak tergerus bunga inap.',
      'Jarak SL 90 Pips Memberi Ruang Bernapas: Mengincar penurunan struktur hingga 310 pips (R:R 1:3.44).',
      'Lot 0.01-0.02 Cent Cukup Memadai: Pertahankan ketenangan psikologis tanpa perlu memantau ponsel setiap jam.',
    ],
    reasonsEn: [
      'Captures Weekly Supply Turn: Aligns with multi-week US-Japan yield compression.',
      'Overnight Swap Audit: Check MT5 USDJPYc overnight swap cost when holding multi-day Short trades.',
      '90-Pip Swing Stop Distance:Targets major H4/D1 downside liquidity pool for 1:3.44 R:R.',
      'Relaxed Multi-Day Execution: Small Cent volume removes screen fatigue.',
    ],
  },
  {
    id: 'sig-us30-swing',
    symbol: 'US30 / DJ30',
    centSymbol: 'US30c',
    tvSymbol: 'DJ:DJI',
    category: 'INDICES',
    style: 'SWING',
    direction: 'BUY',
    orderType: 'BUY LIMIT',
    timeframe: 'Daily Demand -> H4 Reversal',
    sessionWib: 'Posisi Multi-Hari (Wall Street Trend)',
    grade: 'GRADE B KILLZONE',
    baselinePrice: 44120.0,
    decimals: 1,
    entryOffsetPrice: -180.0,
    slDistancePrice: 160.0,
    tp1DistancePrice: 350.0,
    tp2DistancePrice: 540.0,
    pipSize: 1,
    uscPerPipAtMinCentLot: 0.01,
    minLotWarningId: 'Pastikan akun memakai lot 0.01 dan cek minimum margin US30c di MT5.',
    minLotWarningEn: 'Verify minimum index margin & point value for US30c inside MT5.',
    fundamentalTagId: 'Macro Siklus Saham AS Positif (+32)',
    fundamentalTagEn: 'Broad Cyclical Equities Constructive (+32)',
    cotTagId: 'Arus Institusi Bertahan Net Long',
    cotTagEn: 'Asset Manager Flows Steady Net Long',
    reasonsId: [
      'Mengikuti Tren Indeks Blue-Chip AS: Saham berkapitalisasi besar cenderung mencetak higher-low rapi di grafik H4.',
      'Pending Order Menjemput Diskon 180 Poin: Tidak mengejar reli harian, hanya masuk jika pasar terkoreksi sehat.',
      'Rasio Kemenangan 1:3.38: Cocok untuk strategi set-and-forget berbekal SL struktural di bawah lembah mingguan.',
      'Audit Margin Bebas Terlebih Dahulu: Pastikan Free Margin cukup menahan fluktuasi awal.',
    ],
    reasonsEn: [
      'Blue-Chip Structural Trend: Industrial leaders form reliable higher lows on H4 pullbacks.',
      '180-Point Retrace Limit: Avoids FOMO highs, demanding a clean discount before entry activates.',
      '3.38x Asymmetric Reach: Built for measured swing progression beneath weekly support.',
      'Free Margin Pre-Check: Audit MT5 contract size first to protect micro-account breathing room.',
    ],
  },
  {
    id: 'sig-solusd-swing',
    symbol: 'SOLUSDT',
    centSymbol: 'SOLUSDTc',
    tvSymbol: 'BINANCE:SOLUSDT',
    category: 'CRYPTO',
    style: 'SWING',
    direction: 'BUY',
    orderType: 'BUY LIMIT',
    timeframe: 'Daily Structure -> H4 FVG',
    sessionWib: 'Posisi Multi-Hari (24/7 Watch)',
    grade: 'GRADE B KILLZONE',
    baselinePrice: 205.5,
    decimals: 2,
    entryOffsetPrice: -6.5,
    slDistancePrice: 7.0,
    tp1DistancePrice: 15.0,
    tp2DistancePrice: 24.5,
    pipSize: 1,
    uscPerPipAtMinCentLot: 0.01,
    liveRateSource: 'BINANCE_SOL',
    fundamentalTagId: 'Kripto Ekosistem Beta Tinggi (+52)',
    fundamentalTagEn: 'High-Beta Crypto Ecosystem Expansion (+52)',
    cotTagId: 'Mengikuti Arah Likuiditas Bitcoin CME',
    cotTagEn: 'Tracks Institutional Bitcoin Liquidity Regimes',
    reasonsId: [
      'Volatilitas Kripto Membutuhkan Jarak SL Lebar: Menggunakan struktur H4 agar tidak gampang terhentak sumbu acak.',
      'Antre Buy Limit di Order Block H4: Bersabar menunggu tarikan koreksi sehat daripada FOMO saat candle hijau raksasa.',
      'Target 1:3.50 Ke Puncak Sebelumnya: Potensi pertumbuhan menarik tetap dengan modal mikro terukur.',
      'Pantau Pergerakan BTC Terlebih Dahulu: Batalkan Limit Buy jika Bitcoin mengalami kejatuhan harian ekstrem.',
    ],
    reasonsEn: [
      'Volatility Buffer By Design: H4 structural sizing neutralizes routine crypto intra-day stop wicks.',
      'Patient H4 Demand Limit: Waits cleanly for healthy discount retracement instead of chasing tops.',
      '3.50x Target Expansion: High asymmetry tailored cleanly for disciplined small-lot exposure.',
      'Bitcoin Regime Guard: Cancel pending buy limits if BTC loses daily demand cleanly.',
    ],
  },
];

export const FUNDAMENTAL_BIAS_ASSETS: FundamentalBiasAsset[] = [
  {
    id: 'fb-xauusd',
    symbol: 'XAUUSD',
    nameId: 'Emas Spot Dunia',
    nameEn: 'Spot Gold Bullion',
    score: 78,
    policyStanceId: 'Sangat Mendukung Naik (Ekspektasi Suku Bunga + Pembelian Bank Sentral)',
    policyStanceEn: 'Strongly Bullish (Easing Trajectory + Sovereign Accumulation)',
    keyDriverId:
      'Pelemahan imbal hasil riil obligasi AS & akumulasi cadangan emas fisik bank sentral dunia menciptakan pijakan permintaan jangka menengah yang kokoh.',
    keyDriverEn:
      'Softer inflation-adjusted Treasury yields plus continuous sovereign bullion demand reinforce structural support.',
    yieldNoteId: 'Pantau US10Y Real Yield: setiap penurunan yield mendorong harga Emas menguat.',
    yieldNoteEn: 'Track US10Y Real Yield: falling real yields push XAUUSD cleanly upward.',
    biasLabelId: 'BULLISH KUAT (+78)',
    biasLabelEn: 'STRONG BULLISH (+78)',
  },
  {
    id: 'fb-dxy',
    symbol: 'DXY (USD)',
    nameId: 'Indeks Dolar AS',
    nameEn: 'US Dollar Index',
    score: -48,
    policyStanceId: 'Tekanan Turun Bertahap (Normalisasi Siklus Bunga The Fed)',
    policyStanceEn: 'Moderately Bearish (Fed Rate Normalization Priced In)',
    keyDriverId:
      'Pasar obligasi memperhitungkan ruang pelonggaran suku bunga bertahap saat data ketenagakerjaan mendingin dari puncak siklus.',
    keyDriverEn:
      'Rates markets price gradual policy easing as US employment tightness moderates steadily.',
    yieldNoteId: 'Imbal hasil Treasury tenor 2 tahun menjadi pengukur utama tenaga Dolar.',
    yieldNoteEn: 'US02Y Treasury front-end yield remains the cleanest leading USD barometer.',
    biasLabelId: 'BEARISH SEDANG (-48)',
    biasLabelEn: 'BEARISH BIAS (-48)',
  },
  {
    id: 'fb-eurusd',
    symbol: 'EURUSD',
    nameId: 'Euro / Dolar AS',
    nameEn: 'Euro / US Dollar',
    score: 42,
    policyStanceId: 'Moderat Bullish (Penyempitan Selisih Yield Jerman vs AS)',
    policyStanceEn: 'Moderately Bullish (Narrowing Bund-Treasury Spread)',
    keyDriverId:
      'Stabilisasi bertahap data ekonomi Zona Euro bersama pelonggaran kekuatan Dolar mendukung pemulihan nilai wajar EUR.',
    keyDriverEn:
      'Stabilizing Eurozone data paired with softer USD carry spreads underpin EUR recovery.',
    yieldNoteId: 'Selisih Bund vs Treasury AS menyempit memberi angin positif bagi EURUSD.',
    yieldNoteEn: 'Narrowing Bund-US10Y yield spreads strengthen medium-term EUR support.',
    biasLabelId: 'BULLISH MODERAT (+42)',
    biasLabelEn: 'MODERATE BULLISH (+42)',
  },
  {
    id: 'fb-gbpusd',
    symbol: 'GBPUSD',
    nameId: 'Poundsterling / Dolar',
    nameEn: 'British Pound / USD',
    score: 35,
    policyStanceId: 'Positif Moderat (BoE Lebih Berhati-hati Memangkas Bunga)',
    policyStanceEn: 'Constructive (BoE Preserves Relative Yield Support)',
    keyDriverId:
      'Inflasi sektor jasa Inggris yang masih bertahan membuat Bank of England cenderung menahan suku bunga lebih lama.',
    keyDriverEn:
      'Persistent UK services inflation slows Bank of England rate-cut pace relative to peers.',
    yieldNoteId: 'Imbal hasil obligasi Gilt Inggris menjaga daya tarik Pound di sesi London.',
    yieldNoteEn: 'Competitive UK Gilt yields reinforce Sterling bids during Europe.',
    biasLabelId: 'BULLISH RINGAN (+35)',
    biasLabelEn: 'MILD BULLISH (+35)',
  },
  {
    id: 'fb-usdjpy',
    symbol: 'USDJPY',
    nameId: 'Dolar AS / Yen Jepang',
    nameEn: 'US Dollar / Japanese Yen',
    score: -45,
    policyStanceId: 'Bearish Korektif (Kewaspadaan BoJ & Pengetatan Selisih Yield)',
    policyStanceEn: 'Corrective Bearish (BoJ Policy Normalization & MoF Vigilance)',
    keyDriverId:
      'Kenaikan upah di Jepang memberi ruang Bank of Japan menormalisasi suku bunga sekaligus memicu penutupan posisi Carry Trade Yen.',
    keyDriverEn:
      'Rising Japanese wage dynamics anchor gradual BoJ hikes, trimming crowded Yen carry bets.',
    yieldNoteId: 'USDJPY sangat sensitif: ikut turun cepat saat US10Y Treasury Yield terkoreksi.',
    yieldNoteEn: 'Tightly tracks downward US10Y yield moves.',
    biasLabelId: 'BEARISH SEDANG (-45)',
    biasLabelEn: 'BEARISH BIAS (-45)',
  },
  {
    id: 'fb-gbpjpy',
    symbol: 'GBPJPY',
    nameId: 'Pound / Yen Jepang',
    nameEn: 'Pound / Japanese Yen',
    score: -28,
    policyStanceId: 'Korektif Hati-Hati (Tarik-Menarik Pound vs Penguatan Yen)',
    policyStanceEn: 'Neutral-Bearish (Sterling Strength vs Safe-Haven Yen)',
    keyDriverId:
      'Saat pasar saham global melemah, aliran dana aman (risk-off) sering menguatkan Yen dan menarik GBPJPY turun tajam.',
    keyDriverEn:
      'Whenever global equity risk sentiment softens, sudden Yen flows spark sharp reversals.',
    yieldNoteId: 'Wajib disiplin pada resistance harian dan konfirmasi M5.',
    yieldNoteEn: 'Respect upper daily supply boundaries and strict M5 shifts.',
    biasLabelId: 'KOREKTIF HATI-HATI (-28)',
    biasLabelEn: 'CAUTIOUS (-28)',
  },
  {
    id: 'fb-us100',
    symbol: 'USTEC (NDX)',
    nameId: 'Indeks Nasdaq 100',
    nameEn: 'Nasdaq 100 Index',
    score: 60,
    policyStanceId: 'Bullish Struktural (Pertumbuhan Laba Teknologi & Yield Stabil)',
    policyStanceEn: 'Constructive Bullish (Tech Earnings + Calmer Treasury Yields)',
    keyDriverId:
      'Belanja modal infrastruktur AI emiten besar AS bersama yield obligasi yang tenang menjaga minat dana institusional ke ekuitas.',
    keyDriverEn:
      'Mega-cap technology spending alongside stable yields bolster equity growth demand.',
    yieldNoteId: 'Indeks teknologi menguat paling stabil saat suku bunga bergerak mendatar/turun.',
    yieldNoteEn: 'Thrives cleanly when Treasury yields cool alongside solid growth.',
    biasLabelId: 'BULLISH KUAT (+60)',
    biasLabelEn: 'BULLISH (+60)',
  },
  {
    id: 'fb-btcusd',
    symbol: 'BTCUSD',
    nameId: 'Bitcoin Spot / Futures',
    nameEn: 'Bitcoin Spot / Futures',
    score: 66,
    policyStanceId: 'Bullish Institusi (Aliran ETF Spot + Likuiditas Global M2)',
    policyStanceEn: 'Institutional Bullish (Spot ETF Demand + M2 Liquidity)',
    keyDriverId:
      'Arus masuk bersih ETF Spot AS dan ekspansi likuiditas keuangan global menopang permintaan saat harga masuk diskon H4/D1.',
    keyDriverEn:
      'Steady US Spot ETF net inflows paired with expanding M2 liquidity cushion dips.',
    yieldNoteId: 'Cenderung menguat selaras dengan pelemahan Indeks Dolar DXY.',
    yieldNoteEn: 'Responds favorably to expanding liquidity and softer USD trends.',
    biasLabelId: 'BULLISH KUAT (+66)',
    biasLabelEn: 'STRONG BULLISH (+66)',
  },
];

export const MACRO_DATA_SOURCES: MacroDataSourceLink[] = [
  {
    id: 'src-fred',
    institution: 'FRED (Federal Reserve Bank of St. Louis)',
    metricNameId: 'Kurva Imbal Hasil Obligasi AS (US10Y, US02Y & Real Yield TIPS)',
    metricNameEn: 'US Treasury Yield Curve & Inflation-Adjusted Real Yields (DFII10)',
    whatToCheckId:
      'Lihat grafik 10-Year TIPS Real Yield: bila garisnya menukik turun, harga XAUUSDc hampir selalu mendapat dorongan naik.',
    whatToCheckEn:
      'Check 10-Year TIPS Real Yield (DFII10): falling real yields historically reduce Gold opportunity cost cleanly.',
    url: 'https://fred.stlouisfed.org/series/DFII10',
  },
  {
    id: 'src-cme',
    institution: 'CME Group FedWatch Tool',
    metricNameId: 'Probabilitas Kenaikan atau Pemangkasan Suku Bunga The Fed',
    metricNameEn: 'Implied FOMC Target Rate Probabilities From Fed Funds Futures',
    whatToCheckId:
      'Cek persentase ekspektasi rapat FOMC terdekat. Perubahan drastis di atas 70% menggerakkan tren Dolar & Emas berminggu-minggu.',
    whatToCheckEn:
      'Audit probability shifts above 70% ahead of the next FOMC meeting to gauge real-time Dollar positioning.',
    url: 'https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html',
  },
  {
    id: 'src-bls',
    institution: 'US Bureau of Labor Statistics (BLS)',
    metricNameId: 'Laporan Resmi Inflasi (CPI) & Tenaga Kerja (Non-Farm Payrolls)',
    metricNameEn: 'Official US Consumer Price Index (CPI) & Employment Situation',
    whatToCheckId:
      'Data primer pemerintah AS di balik guncangan jam 19:30 / 20:30 WIB. Pastikan selalu memeriksa revisi bulan sebelumnya.',
    whatToCheckEn:
      'Primary source driving 19:30/20:30 WIB volatility. Always inspect prior-month revisions alongside headline prints.',
    url: 'https://www.bls.gov/bls/newsrels.htm',
  },
  {
    id: 'src-cftc',
    institution: 'US Commodity Futures Trading Commission (CFTC)',
    metricNameId: 'Laporan Mingguan Commitments of Traders (Disaggregated Futures)',
    metricNameEn: 'Weekly Official CFTC Commitments of Traders (COT) Releases',
    whatToCheckId:
      'Rilis resmi setiap hari Jumat (waktu AS) atau Sabtu subuh WIB untuk mengecek apakah Hedge Fund menambah posisi Long atau Short bersih.',
    whatToCheckEn:
      'Published every Friday US afternoon (Saturday early WIB) revealing exact institutional Managed Money positioning.',
    url: 'https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm',
  },
  {
    id: 'src-wgc',
    institution: 'World Gold Council (Goldhub) & LBMA',
    metricNameId: 'Arus Cadangan Emas Bank Sentral Global & ETF Fisik',
    metricNameEn: 'Global Central Bank Gold Reserves & Physical ETF Tonnage Flows',
    whatToCheckId:
      'Memantau tren pembelian emas fisik bank sentral kuartalan untuk memahami dukungan fundamental jangka panjang Emas.',
    whatToCheckEn:
      'Track sovereign central bank tonnage accumulation driving structural multi-year Gold valuation.',
    url: 'https://www.gold.org/goldhub/data',
  },
  {
    id: 'src-bi',
    institution: 'Bank Indonesia (Kurs JISDOR) & TradingEconomics',
    metricNameId: 'Nilai Tukar USD/IDR & Ringkasan Indikator Makro Negara G10',
    metricNameEn: 'USD/IDR JISDOR Reference Rate & Global G10 Macro Indicators',
    whatToCheckId:
      'Pantau kurs Rupiah terhadap Dolar untuk menghitung nilai deposit & penarikan modal akun Cent secara tepat.',
    whatToCheckEn:
      'Monitor IDR exchange benchmarks and G10 inflation/rate matrices cleanly in one reference.',
    url: 'https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/Default.aspx',
  },
];

export const MARKET_NEWS_WIB_ITEMS: MarketNewsWibItem[] = [
  {
    id: 'news-cpi',
    eventTitleId: 'US Consumer Price Index (CPI / Data Inflasi AS)',
    eventTitleEn: 'US Consumer Price Index (Headline & Core CPI)',
    currency: 'USD (Berdampak ke XAUUSDc, EURUSDc, USTECc)',
    typicalWibTime: '19:30 WIB (Musim Panas) / 20:30 WIB (Musim Dingin)',
    impactLevel: 'HIGH IMPACT',
    simpleExplainId:
      'Laporan bulanan yang mengukur apakah harga kebutuhan sehari-hari di Amerika Serikat sedang naik makin mahal atau melandai. Jika harga barang naik cepat, bank sentral AS cenderung menahan suku bunga tetap tinggi.',
    simpleExplainEn:
      'Monthly measure tracking how fast US consumer goods & services prices rise. Sticky hot inflation forces higher-for-longer Fed interest rates.',
    ifActualHigherId:
      'Angka CPI Lebih Tinggi Dari Prediksi -> Inflasi masih panas -> DXY Dolar CENDERUNG NAIK (Hijau), XAUUSDc & EURUSDc CENDERUNG TURUN (Merah).',
    ifActualHigherEn:
      'Actual > Forecast -> Sticky inflation -> USD/DXY TENDS HIGHER, Gold XAUUSDc & EURUSDc FACE PRESSURE.',
    ifActualHigherEffect: 'USD_UP_GOLD_DOWN',
    ifActualLowerId:
      'Angka CPI Lebih Rendah Dari Prediksi -> Inflasi mereda -> Ekspektasi potong bunga naik -> DXY Dolar TURUN (Merah), XAUUSDc CENDERUNG NAIK KUAT (Hijau).',
    ifActualLowerEn:
      'Actual < Forecast -> Cooling inflation -> Rate cut expectations rise -> USD FALLS, XAUUSDc TENDS HIGHER.',
    ifActualLowerEffect: 'USD_DOWN_GOLD_UP',
    hmrRuleId:
      'Protokol HMR Exness: Dilarang klik order baru 15 menit sebelum hingga 10 menit sesudah rilis CPI karena leverage akun dibatasi otomatis & spread melebar tajam.',
    hmrRuleEn:
      'Exness HMR Guardrail: Zero new orders 15 min prior to 10 min post CPI print to avoid spread spikes & reduced dynamic margin leverage.',
  },
  {
    id: 'news-nfp',
    eventTitleId: 'US Non-Farm Payrolls (NFP) & Tingkat Pengangguran AS',
    eventTitleEn: 'US Non-Farm Payrolls (NFP) & Unemployment Rate',
    currency: 'USD (Berdampak Seluruh Pair USD & Emas)',
    typicalWibTime: 'Jumat Pertama Tiap Bulan • 19:30 / 20:30 WIB',
    impactLevel: 'HIGH IMPACT',
    simpleExplainId:
      'Laporan jumlah pekerjaan baru di Amerika Serikat di luar sektor pertanian beserta tingkat penganggurannya. Pasar melihat laporan ini untuk menilai apakah ekonomi AS kuat atau mulai lemas.',
    simpleExplainEn:
      'First-Friday monthly pulse showing US net new non-farm jobs and unemployment changes.',
    ifActualHigherId:
      'NFP Lebih Banyak (Pengangguran Rendah) -> Ekonomi AS sangat kuat -> Dolar DXY CENDERUNG MENGUAT (Hijau), XAUUSDc BERPOTENSI TERTEKAN TURUN (Merah).',
    ifActualHigherEn:
      'Stronger NFP & Lower Jobless Rate -> Resilient economy -> DXY TENDS UP, Gold XAUUSDc OFTEN DIPS.',
    ifActualHigherEffect: 'USD_UP_GOLD_DOWN',
    ifActualLowerId:
      'NFP Jauh Lebih Sedikit (Pengangguran Naik) -> Ekonomi melambat -> The Fed terdorong memangkas bunga -> DXY TURUN (Merah), XAUUSDc TERBANG NAIK (Hijau).',
    ifActualLowerEn:
      'Softer NFP & Rising Unemployment -> Labor cooling -> Boosts Fed easing odds -> USD DROPS, XAUUSDc RALLIES.',
    ifActualLowerEffect: 'USD_DOWN_GOLD_UP',
    hmrRuleId:
      'Jebakan Whipsaw Dua Arah: Menit ke-1 NFP sering menyapu High & Low sekaligus. Tunggu minimal 15 menit sampai candle M15 ditutup sempurna sebelum mencari retracement.',
    hmrRuleEn:
      'Two-Way Whipsaw Trap: Initial 5 minutes routinely spike both sides. Wait 15+ minutes for clean M15 closes before hunting pulls.',
  },
  {
    id: 'news-fomc',
    eventTitleId: 'FOMC Interest Rate Decision & Konferensi Pers Jerome Powell',
    eventTitleEn: 'FOMC Rate Statement & Fed Chair Press Conference',
    currency: 'USD (Badai Volatilitas Terbesar Dunia)',
    typicalWibTime: '01:00 WIB (Pernyataan) & 01:30 WIB (Pidato Powell)',
    impactLevel: 'CRITICAL FOMC',
    simpleExplainId:
      'Keputusan resmi suku bunga acuan dunia oleh Federal Reserve AS. Pernyataan jam 01:00 WIB kadang langsung dibalikkan arahnya pada jam 01:30 WIB saat Ketua The Fed berpidato menjawab pertanyaan wartawan.',
    simpleExplainEn:
      'Federal Open Market Committee benchmark rate policy followed 30 minutes later by live Q&A volatility.',
    ifActualHigherId:
      'Suku Bunga Lebih Ketat / Nada Pidato "Hawkish" (Bunga Tinggi Lama) -> DXY MELONJAK (Hijau), Emas & Saham Tech CENDERUNG TURUN (Merah).',
    ifActualHigherEn:
      'Hawkish Rate Guidance / Higher-For-Longer -> USD RALLIES SHARPLY, Bullion & Nasdaq FACE SELLING.',
    ifActualHigherEffect: 'USD_UP_GOLD_DOWN',
    ifActualLowerId:
      'Pemangkasan Bunga / Nada Pidato "Dovish" (Siap Longgarkan Likuiditas) -> DXY TERJUN (Merah), XAUUSDc & BTCUSDT NAIK DERAS (Hijau).',
    ifActualLowerEn:
      'Dovish Cut / Liquidity Easing Signal -> USD WEAKENS, Gold XAUUSDc & Equities SURGE.',
    ifActualLowerEffect: 'USD_DOWN_GOLD_UP',
    hmrRuleId:
      'Aturan Mutlak Modal Kecil $10: Lebih baik tutup atau amankan semua posisi scalping/intraday sebelum pukul 00:30 WIB, dan masuk kembali besok sore di sesi London setelah arah baru JELAS.',
    hmrRuleEn:
      'Micro-Capital Mandatory Shield: Stand flat prior to 00:30 WIB and trade the clean London continuation the following afternoon.',
  },
  {
    id: 'news-jobless',
    eventTitleId: 'US Initial Jobless Claims & Retail Sales',
    eventTitleEn: 'US Weekly Initial Jobless Claims & Retail Sales',
    currency: 'USD (Validasi Mingguan)',
    typicalWibTime: 'Kamis Malam • 19:30 / 20:30 WIB',
    impactLevel: 'HIGH IMPACT',
    simpleExplainId:
      'Laporan mingguan berapa banyak warga AS yang baru mendaftar tunjangan pengangguran, dipadukan data belanja ritel bulanan. Semakin banyak klaim pengangguran berarti pasar kerja mulai mendingin.',
    simpleExplainEn:
      'Weekly pulse of new unemployment benefit filings alongside monthly US consumer retail spending.',
    ifActualHigherId:
      'Klaim Pengangguran NAIK Melebihi Prediksi -> Ekonomi melemah -> DXY CENDERUNG TURUN (Merah), XAUUSDc BERPELUANG NAIK (Hijau). (Catatan: angka pengangguran naik = berita buruk bagi USD!).',
    ifActualHigherEn:
      'Jobless Claims HIGHER Than Forecast -> Labor softness -> USD WEAKENS, Gold XAUUSDc TENDS UP.',
    ifActualHigherEffect: 'USD_DOWN_GOLD_UP',
    ifActualLowerId:
      'Klaim Pengangguran RENDAH & Belanja Ritel Kuat -> Ekonomi AS tangguh -> DXY MENGUAT (Hijau), XAUUSDc KOREKSI TURUN (Merah).',
    ifActualLowerEn:
      'Lower Claims & Strong Spending -> Resilient consumer -> USD FIRMS UP, Gold PULLS BACK.',
    ifActualLowerEffect: 'USD_UP_GOLD_DOWN',
    hmrRuleId:
      'Waspada Logika Terbalik di Initial Jobless Claims: angka aktual lebih BESAR (hijau di kalender?) sebenarnya berarti lebih BANYAK orang menganggur, sehingga berdampak MELEMAHKAN Dolar!',
    hmrRuleEn:
      'Inverse Logic Check: Higher Jobless Claims = MORE unemployed citizens = BEARISH USD & BULLISH Gold!',
  },
];

export const COT_POSITIONING_ROWS: CotPositioningRow[] = [
  {
    id: 'cot-gold',
    asset: 'Gold Futures (XAUUSD)',
    cftcCode: 'COMEX #088691 • Non-Commercial',
    retailLongPct: 28,
    cotInstLongPct: 74,
    cotWeeklyNetDeltaId: '+18.420 Kontrak Net Long Minggu Ini',
    cotWeeklyNetDeltaEn: '+18,420 Contracts Added Net Long WoW',
    summaryId:
      '72% kerumunan ritel sedang menahan rugi posisi Sell berharap Emas jatuh, sementara Hedge Fund justru menambah muatan Long bersih di laporan CFTC.',
    summaryEn:
      '72% of tracked retail accounts hold losing Shorts while Institutional Hedge Funds added +18.4k Net Long contracts.',
  },
  {
    id: 'cot-eur',
    asset: 'Euro FX (EURUSD)',
    cftcCode: 'CME #099741 • Large Speculators',
    retailLongPct: 33,
    cotInstLongPct: 62,
    cotWeeklyNetDeltaId: '+9.150 Kontrak Net Long Minggu Ini',
    cotWeeklyNetDeltaEn: '+9,150 Contracts Shift Toward Net Long',
    summaryId:
      'Ritel 67% berdesakan memprediksi Euro lanjut turun di dekat support, berlawanan dengan institusi yang mulai mengakumulasi posisi Buy.',
    summaryEn:
      'Retail Short crowding hit 67% right as large institutional desks covered shorts and built fresh Long positioning.',
  },
  {
    id: 'cot-usd',
    asset: 'US Dollar Index (DXY)',
    cftcCode: 'ICE #098662 • Leveraged Funds',
    retailLongPct: 71,
    cotInstLongPct: 34,
    cotWeeklyNetDeltaId: '-11.600 Kontrak Pengurangan Net Long USD',
    cotWeeklyNetDeltaEn: '-11,600 Contracts Liquidated From Net Longs',
    summaryId:
      '71% ritel sibuk membeli Dolar mengharap pantulan cepat di saat Dana Institusi aktif memangkas kontrak Net Long Dolar pada laporan COT.',
    summaryEn:
      'Retail crowds sit 71% Long USD catching falling knives while Leveraged Funds actively unwind Net Long USD.',
  },
  {
    id: 'cot-gbp',
    asset: 'British Pound (GBPUSD)',
    cftcCode: 'CME #096742 • Asset Managers',
    retailLongPct: 44,
    cotInstLongPct: 58,
    cotWeeklyNetDeltaId: '+3.210 Kontrak Net Long Stabil',
    cotWeeklyNetDeltaEn: '+3,210 Contracts Net Long Addition',
    summaryId:
      'Posisi institusi dan ritel cukup seimbang tanpa ketegangan ekstrem di atas 65%; fokus ikuti konfirmasi M5 Killzone di level kunci.',
    summaryEn:
      'Balanced retail vs fund spread below extreme 65% crowding levels; follow clean London/NY Killzone triggers.',
  },
  {
    id: 'cot-jpy',
    asset: 'Japanese Yen (USDJPY Inverse)',
    cftcCode: 'CME #097741 • Non-Commercial JPY',
    retailLongPct: 31,
    cotInstLongPct: 66,
    cotWeeklyNetDeltaId: '+14.800 Kontrak Tutup Short Yen (Bullish Yen)',
    cotWeeklyNetDeltaEn: '+14,800 Contracts Covering Short Yen (Bearish USDJPY)',
    summaryId:
      '69% ritel tetap ngotot Buy USDJPY meskipun Hedge Fund institusional agresif menutup Short Yen mereka selama dua minggu beruntun.',
    summaryEn:
      '69% retail accounts stay trapped Long USDJPY while Hedge Funds aggressively unwind short-Yen carry exposure.',
  },
  {
    id: 'cot-nq',
    asset: 'Nasdaq 100 E-Mini (USTEC)',
    cftcCode: 'CME #209742 • Institutional Funds',
    retailLongPct: 26,
    cotInstLongPct: 71,
    cotWeeklyNetDeltaId: '+6.450 Kontrak Net Long Ekuitas Tech',
    cotWeeklyNetDeltaEn: '+6,450 Contracts Net Long Expansion',
    summaryId:
      '74% akun ritel kerap mencoba menebak puncak Sell indeks Nasdaq saat manajer aset jangka panjang mempertahankan 71% eksposur Net Long.',
    summaryEn:
      '74% of retail traders repeatedly fade Nasdaq highs into stops while institutional Asset Managers stay 71% Net Long.',
  },
  {
    id: 'cot-btc',
    asset: 'CME Bitcoin Futures (BTCUSD)',
    cftcCode: 'CME #133741 • Asset Managers',
    retailLongPct: 48,
    cotInstLongPct: 76,
    cotWeeklyNetDeltaId: '+2.890 Kontrak Long ETF & Basis Desk',
    cotWeeklyNetDeltaEn: '+2,890 Contracts Steady Institutional Inflow',
    summaryId:
      'Manajer aset CME bertahan kuat di atas 75% Long lewat arus spot ETF, sementara leverage ritel kerap tersapu dua arah saat akhir pekan.',
    summaryEn:
      'Institutional CME Asset Managers remain heavily skewed Long (>75%), making dips below Sweep Lows high-value entries.',
  },
];
