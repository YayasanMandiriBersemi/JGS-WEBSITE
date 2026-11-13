export type ProviderStatus = 'LIVE' | 'FALLBACK';

export interface CandleBar {
  time: number; // Unix seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export type CandleTimeframeKey = '5m' | '15m' | '1h' | '4h' | '1d';

export interface MarketQuoteWithCandles {
  symbol: string;
  displaySymbol: string;
  name: string;
  category: 'METALS' | 'FOREX' | 'INDICES' | 'CRYPTO' | 'MACRO';
  decimals: number;
  price: number;
  changePct24h: number;
  dayHigh: number;
  dayLow: number;
  candles: Record<CandleTimeframeKey, CandleBar[]>;
  source: string;
  status: ProviderStatus;
  updatedAt: string;
}

export interface CotAssetReport {
  id: string;
  code: string;
  asset: string;
  exchangeName: string;
  dataset: 'LEGACY' | 'TFF' | 'FALLBACK';
  reportDateIso: string;
  reportWeekLabel: string;
  openInterest: number;
  instLong: number;
  instShort: number;
  instNet: number;
  instLongPct: number;
  weeklyDeltaLong: number;
  weeklyDeltaShort: number;
  weeklyNetDelta: number;
  retailLong: number;
  retailShort: number;
  retailLongPct: number;
  commLong: number;
  commShort: number;
  divergenceTriggered: boolean;
  sourceUrl: string;
  status: ProviderStatus;
}

export type CalendarEventStatusId =
  | 'SUDAH_RILIS_HARI_INI'
  | 'AKAN_RILIS_HARI_INI'
  | 'JADWAL_BESOK'
  | 'SUDAH_RILIS'
  | 'TERJADWAL';

export type NewsPairFilterKey =
  | 'ALL'
  | 'XAUUSD'
  | 'USD'
  | 'GBP'
  | 'JPY'
  | 'EUR'
  | 'NAS100'
  | 'BTC';

export type MonetaryStance = 'HAWKISH' | 'DOVISH' | 'NEUTRAL';

export interface WibCalendarEvent {
  id: string;
  title: string;
  country: string;
  impact: 'High' | 'Medium' | 'Low';
  isoDate: string;
  wibFullDateLabel: string; // "Kamis, 12 November 2026 • Pukul 20:30 WIB"
  wibShortDate: string;
  wibTimeOnly: string;
  statusCode: CalendarEventStatusId;
  forecast: string;
  previous: string;
  actual: string;
  plainExplainId: string;
  plainExplainEn: string;
  compassBuySellId: string;
  compassBuySellEn: string;
  monetaryStance: MonetaryStance;
  stanceLabelId: string;
  stanceLabelEn: string;
  stanceExplainId: string;
  stanceExplainEn: string;
  actionBiasId: string;
  actionBiasEn: string;
  affectedAssets: NewsPairFilterKey[];
  isInverseLogic: boolean;
}

export interface MarketHeadlineItem {
  id: string;
  title: string;
  publisher: string;
  link: string;
  publishedIso: string;
  wibFullDateLabel: string;
  source: string;
}

export interface MacroOverviewSnapshot {
  dxyPrice: number;
  dxyChangePct: number;
  us10yYield: number;
  us10yChangePct: number;
  vixLevel: number;
  vixChangePct: number;
  goldPrice: number;
  goldChangePct: number;
  silverPrice: number;
  silverChangePct: number;
  status: ProviderStatus;
  updatedWibLabel: string;
}

export interface FearAndGreedSnapshot {
  value: number;
  classification: string;
  timestampIso: string;
  source: string;
  status: ProviderStatus;
}

export interface BinanceWhaleRetailSnapshot {
  symbol: 'BTCUSDT' | 'ETHUSDT' | 'SOLUSDT';
  topTraderLongPct: number;
  topTraderShortPct: number;
  retailLongPct: number;
  retailShortPct: number;
  timestampIso: string;
  status: ProviderStatus;
}

export interface ProviderTelemetryItem {
  id: number;
  name: string;
  status: ProviderStatus;
  detail: string;
}

export interface MarketIntelligencePayload {
  usdIdrRate: number;
  tenUsdInIdr: number;
  usdIdrSource: string;
  usdIdrStatus: ProviderStatus;
  lastUpdatedTimestamp: string;
  lastUpdatedWibLabel: string;
  macro: MacroOverviewSnapshot;
  fearAndGreed: FearAndGreedSnapshot | null;
  futuresPositioning: BinanceWhaleRetailSnapshot[];
  quotes: Record<string, MarketQuoteWithCandles>;
  cotReports: CotAssetReport[];
  cotStatus: ProviderStatus;
  calendarEvents: WibCalendarEvent[];
  calendarStatus: ProviderStatus;
  headlines: MarketHeadlineItem[];
  providerTelemetry: ProviderTelemetryItem[];
}
