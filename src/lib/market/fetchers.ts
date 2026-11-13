import type {
  BinanceWhaleRetailSnapshot,
  CandleBar,
  CandleTimeframeKey,
  CotAssetReport,
  FearAndGreedSnapshot,
  MacroOverviewSnapshot,
  MarketHeadlineItem,
  MarketIntelligencePayload,
  MarketQuoteWithCandles,
  ProviderStatus,
  ProviderTelemetryItem,
  WibCalendarEvent,
} from './types';
import { formatWibDateTime, interpretEconomicEvent, resolveWibEventStatus } from './wib';

const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)';

async function fetchJsonWithTimeout<T>(
  url: string,
  timeoutMs: number = 5500,
  headers: Record<string, string> = {}
): Promise<T | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'User-Agent': BROWSER_UA,
        Accept: 'application/json, text/plain, */*',
        ...headers,
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchTextWithTimeout(
  url: string,
  timeoutMs: number = 5000
): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
      headers: { 'User-Agent': BROWSER_UA, Accept: 'application/rss+xml, application/xml, text/xml' },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// ============================================================================
// 1.1 USD/IDR EXCHANGE RATE (MULTI-PROVIDER FALLBACK CHAIN)
// ============================================================================
export async function fetchUsdIdrWithFxCross(): Promise<{
  usdIdrRate: number;
  source: string;
  status: ProviderStatus;
  erRates: Record<string, number> | null;
  apiStatuses: { erApi: boolean; fawazCdn: boolean; frankfurter: boolean };
}> {
  const [erRes, jsdRes, frankRes] = await Promise.allSettled([
    fetchJsonWithTimeout<{ result?: string; rates?: Record<string, number> }>(
      'https://open.er-api.com/v6/latest/USD',
      4500
    ),
    fetchJsonWithTimeout<{ usd?: Record<string, number> }>(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
      4500
    ),
    fetchJsonWithTimeout<{ rates?: Record<string, number> }>(
      'https://api.frankfurter.app/latest?from=USD&to=IDR,EUR,GBP,JPY',
      4500
    ),
  ]);

  const erData = erRes.status === 'fulfilled' ? erRes.value : null;
  const jsdData = jsdRes.status === 'fulfilled' ? jsdRes.value : null;
  const frankData = frankRes.status === 'fulfilled' ? frankRes.value : null;

  const apiStatuses = {
    erApi: Boolean(erData?.rates?.IDR && erData.rates.IDR > 10000),
    fawazCdn: Boolean(jsdData?.usd?.idr && jsdData.usd.idr > 10000),
    frankfurter: Boolean(frankData?.rates?.IDR && frankData.rates.IDR > 10000),
  };

  if (apiStatuses.erApi && erData?.rates?.IDR) {
    return {
      usdIdrRate: erData.rates.IDR,
      source: 'open.er-api.com',
      status: 'LIVE',
      erRates: erData.rates,
      apiStatuses,
    };
  }

  if (apiStatuses.fawazCdn && jsdData?.usd?.idr) {
    return {
      usdIdrRate: jsdData.usd.idr,
      source: 'fawazahmed0/currency-api',
      status: 'LIVE',
      erRates: erData?.rates ?? null,
      apiStatuses,
    };
  }

  if (apiStatuses.frankfurter && frankData?.rates?.IDR) {
    return {
      usdIdrRate: frankData.rates.IDR,
      source: 'api.frankfurter.app',
      status: 'LIVE',
      erRates: erData?.rates ?? null,
      apiStatuses,
    };
  }

  const yahooIdr = await fetchYahooChartSeries('IDR=X', '5m', '1d');
  if (yahooIdr && yahooIdr.price > 10000) {
    return {
      usdIdrRate: yahooIdr.price,
      source: 'Yahoo Finance (IDR=X)',
      status: 'LIVE',
      erRates: erData?.rates ?? null,
      apiStatuses,
    };
  }

  return {
    usdIdrRate: 16250,
    source: 'Offline Baseline Reference',
    status: 'FALLBACK',
    erRates: null,
    apiStatuses,
  };
}

// ============================================================================
// 1.2 MULTI-ASSET QUOTES & INTRADAY OHLC CANDLES
// ============================================================================
interface YahooChartJson {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number;
        previousClose?: number;
        chartPreviousClose?: number;
        regularMarketChangePercent?: number;
        regularMarketDayHigh?: number;
        regularMarketDayLow?: number;
      };
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          open?: Array<number | null>;
          high?: Array<number | null>;
          low?: Array<number | null>;
          close?: Array<number | null>;
          volume?: Array<number | null>;
        }>;
      };
    }>;
  };
}

async function fetchYahooChartSeries(
  yahooSymbol: string,
  interval: '5m' | '15m' | '1h' | '1d',
  range: '1d' | '5d' | '1mo' | '3mo',
  preferQuery2: boolean = true
): Promise<{
  price: number;
  changePct: number;
  dayHigh: number;
  dayLow: number;
  candles: CandleBar[];
} | null> {
  const hosts = preferQuery2
    ? ['query2.finance.yahoo.com', 'query1.finance.yahoo.com']
    : ['query1.finance.yahoo.com', 'query2.finance.yahoo.com'];

  let json: YahooChartJson | null = null;
  for (const host of hosts) {
    const url = `https://${host}/v8/finance/chart/${encodeURIComponent(
      yahooSymbol
    )}?interval=${interval}&range=${range}`;
    const attempt = await fetchJsonWithTimeout<YahooChartJson>(url, 5500);
    if (attempt?.chart?.result?.[0]?.meta) {
      json = attempt;
      break;
    }
  }

  const res = json?.chart?.result?.[0];
  if (!res?.meta) return null;

  const ts = res.timestamp ?? [];
  const q = res.indicators?.quote?.[0];
  const candles: CandleBar[] = [];

  if (q) {
    for (let i = 0; i < ts.length; i++) {
      const o = q.open?.[i];
      const h = q.high?.[i];
      const l = q.low?.[i];
      const c = q.close?.[i];
      if (
        typeof o === 'number' &&
        typeof h === 'number' &&
        typeof l === 'number' &&
        typeof c === 'number' &&
        Number.isFinite(o) &&
        Number.isFinite(h) &&
        Number.isFinite(l) &&
        Number.isFinite(c)
      ) {
        candles.push({
          time: ts[i],
          open: o,
          high: h,
          low: l,
          close: c,
          volume: typeof q.volume?.[i] === 'number' ? q.volume[i] ?? 0 : 0,
        });
      }
    }
  }

  const price =
    res.meta.regularMarketPrice ??
    (candles.length > 0 ? candles[candles.length - 1].close : 0);
  if (!price || !Number.isFinite(price)) return null;

  const prev = res.meta.chartPreviousClose ?? res.meta.previousClose ?? price;
  const computedPct =
    typeof res.meta.regularMarketChangePercent === 'number'
      ? res.meta.regularMarketChangePercent
      : prev > 0
        ? ((price - prev) / prev) * 100
        : 0;

  return {
    price,
    changePct: Number(computedPct.toFixed(2)),
    dayHigh: res.meta.regularMarketDayHigh ?? price,
    dayLow: res.meta.regularMarketDayLow ?? price,
    candles,
  };
}

function aggregateBarsBySeconds(
  bars: CandleBar[],
  bucketSeconds: number,
  maxBars: number = 80
): CandleBar[] {
  if (bars.length === 0) return [];
  const out: CandleBar[] = [];
  let currentBucket = -1;
  let current: CandleBar | null = null;

  for (const bar of bars) {
    const bucket = Math.floor(bar.time / bucketSeconds) * bucketSeconds;
    if (bucket !== currentBucket || !current) {
      if (current) out.push(current);
      currentBucket = bucket;
      current = {
        time: bucket,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
        volume: bar.volume ?? 0,
      };
    } else {
      current.high = Math.max(current.high, bar.high);
      current.low = Math.min(current.low, bar.low);
      current.close = bar.close;
      current.volume = (current.volume ?? 0) + (bar.volume ?? 0);
    }
  }
  if (current) out.push(current);
  return out.slice(-maxBars);
}

interface AssetDefinition {
  symbol: string;
  displaySymbol: string;
  name: string;
  category: MarketQuoteWithCandles['category'];
  decimals: number;
  yahooPrimary: string;
  yahooBackup?: string;
  binanceSymbol?: string;
  coingeckoId?: string;
  erRatePair?: 'EUR' | 'GBP' | 'JPY' | 'AUD';
}

const ASSET_DEFINITIONS: AssetDefinition[] = [
  {
    symbol: 'XAUUSD',
    displaySymbol: 'XAUUSD',
    name: 'Gold Spot / Futures (GC=F)',
    category: 'METALS',
    decimals: 2,
    yahooPrimary: 'GC=F',
    yahooBackup: 'XAUUSD=X',
    coingeckoId: 'pax-gold',
  },
  {
    symbol: 'XAGUSD',
    displaySymbol: 'XAGUSD',
    name: 'Silver Futures (SI=F)',
    category: 'METALS',
    decimals: 3,
    yahooPrimary: 'SI=F',
  },
  {
    symbol: 'EURUSD',
    displaySymbol: 'EURUSD',
    name: 'Euro / US Dollar',
    category: 'FOREX',
    decimals: 5,
    yahooPrimary: 'EURUSD=X',
    erRatePair: 'EUR',
  },
  {
    symbol: 'GBPUSD',
    displaySymbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    category: 'FOREX',
    decimals: 5,
    yahooPrimary: 'GBPUSD=X',
    erRatePair: 'GBP',
  },
  {
    symbol: 'USDJPY',
    displaySymbol: 'USDJPY',
    name: 'US Dollar / Japanese Yen',
    category: 'FOREX',
    decimals: 3,
    yahooPrimary: 'JPY=X',
    erRatePair: 'JPY',
  },
  {
    symbol: 'GBPJPY',
    displaySymbol: 'GBPJPY',
    name: 'Pound Sterling / Japanese Yen',
    category: 'FOREX',
    decimals: 3,
    yahooPrimary: 'GBPJPY=X',
  },
  {
    symbol: 'AUDUSD',
    displaySymbol: 'AUDUSD',
    name: 'Australian Dollar / USD',
    category: 'FOREX',
    decimals: 5,
    yahooPrimary: 'AUDUSD=X',
    erRatePair: 'AUD',
  },
  {
    symbol: 'NAS100',
    displaySymbol: 'NAS100 / USTEC',
    name: 'Nasdaq 100 Index',
    category: 'INDICES',
    decimals: 2,
    yahooPrimary: '^NDX',
    yahooBackup: 'NQ=F',
  },
  {
    symbol: 'US30',
    displaySymbol: 'US30 / DJ30',
    name: 'Dow Jones Industrial Average',
    category: 'INDICES',
    decimals: 2,
    yahooPrimary: '^DJI',
    yahooBackup: 'YM=F',
  },
  {
    symbol: 'SPX500',
    displaySymbol: 'SPX500',
    name: 'S&P 500 Index',
    category: 'INDICES',
    decimals: 2,
    yahooPrimary: '^GSPC',
    yahooBackup: 'ES=F',
  },
  {
    symbol: 'BTCUSDT',
    displaySymbol: 'BTCUSDT',
    name: 'Bitcoin / Tether USD',
    category: 'CRYPTO',
    decimals: 2,
    yahooPrimary: 'BTC-USD',
    binanceSymbol: 'BTCUSDT',
    coingeckoId: 'bitcoin',
  },
  {
    symbol: 'ETHUSDT',
    displaySymbol: 'ETHUSDT',
    name: 'Ethereum / Tether USD',
    category: 'CRYPTO',
    decimals: 2,
    yahooPrimary: 'ETH-USD',
    binanceSymbol: 'ETHUSDT',
    coingeckoId: 'ethereum',
  },
  {
    symbol: 'SOLUSDT',
    displaySymbol: 'SOLUSDT',
    name: 'Solana / Tether USD',
    category: 'CRYPTO',
    decimals: 2,
    yahooPrimary: 'SOL-USD',
    binanceSymbol: 'SOLUSDT',
    coingeckoId: 'solana',
  },
  {
    symbol: 'PAXGUSDT',
    displaySymbol: 'PAXGUSDT',
    name: 'PAX Gold Tokenized Spot',
    category: 'METALS',
    decimals: 2,
    yahooPrimary: 'PAXG-USD',
    binanceSymbol: 'PAXGUSDT',
    coingeckoId: 'pax-gold',
  },
  // Macro Benchmarks
  {
    symbol: 'DXY',
    displaySymbol: 'DXY Index',
    name: 'US Dollar Index',
    category: 'MACRO',
    decimals: 3,
    yahooPrimary: 'DX-Y.NYB',
  },
  {
    symbol: 'US10Y',
    displaySymbol: 'US10Y Yield',
    name: 'US 10-Year Treasury Yield',
    category: 'MACRO',
    decimals: 3,
    yahooPrimary: '^TNX',
  },
  {
    symbol: 'VIX',
    displaySymbol: 'VIX Fear',
    name: 'CBOE Volatility Index',
    category: 'MACRO',
    decimals: 2,
    yahooPrimary: '^VIX',
  },
];

async function fetchBinanceKlinesQuick(
  binanceSymbol: string,
  interval: '5m' | '15m' | '1h' | '4h' | '1d'
): Promise<CandleBar[] | null> {
  const raw = await fetchJsonWithTimeout<Array<[number, string, string, string, string, string]>>(
    `https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${interval}&limit=60`,
    2200
  );
  if (!Array.isArray(raw) || raw.length === 0) return null;
  return raw.map((row) => ({
    time: Math.floor(row[0] / 1000),
    open: Number(row[1]),
    high: Number(row[2]),
    low: Number(row[3]),
    close: Number(row[4]),
    volume: Number(row[5]),
  }));
}

async function fetchOneAssetQuote(
  def: AssetDefinition,
  assetIdx: number,
  cgPrices: Record<string, { usd?: number; usd_24h_change?: number }> | null,
  erRates: Record<string, number> | null
): Promise<MarketQuoteWithCandles> {
  const nowIso = new Date().toISOString();
  const preferQuery2 = assetIdx % 3 !== 2;

  // Single 5m / 5d request per asset prevents Yahoo HTTP 429 burst throttling,
  // while providing full lossless M5 -> M15 -> H1 -> H4 -> D1 OHLC aggregation.
  const trySymbol = def.yahooPrimary;
  let primarySeries = await fetchYahooChartSeries(trySymbol, '5m', '5d', preferQuery2);
  let sourceName = `Yahoo Finance (${trySymbol})`;

  // Fallback to secondary Yahoo ticker if needed
  if (!primarySeries && def.yahooBackup) {
    const bSeries = await fetchYahooChartSeries(def.yahooBackup, '5m', '5d', !preferQuery2);
    if (bSeries) {
      primarySeries = bSeries;
      sourceName = `Yahoo Finance (${def.yahooBackup})`;
    }
  }

  const rawBars = primarySeries?.candles ?? [];
  let candles: Record<CandleTimeframeKey, CandleBar[]> = {
    '5m': rawBars.slice(-80),
    '15m': aggregateBarsBySeconds(rawBars, 900, 80),
    '1h': aggregateBarsBySeconds(rawBars, 3600, 80),
    '4h': aggregateBarsBySeconds(rawBars, 14400, 60),
    '1d': aggregateBarsBySeconds(rawBars, 86400, 30),
  };

  // For crypto assets, opportunistically enhance with CoinGecko OHLC if Yahoo bars are absent
  if (def.coingeckoId && candles['4h'].length === 0) {
    const cgOhlc = await fetchJsonWithTimeout<Array<[number, number, number, number, number]>>(
      `https://api.coingecko.com/api/v3/coins/${def.coingeckoId}/ohlc?vs_currency=usd&days=7`,
      4500
    );
    if (Array.isArray(cgOhlc) && cgOhlc.length > 0) {
      const bars4h: CandleBar[] = cgOhlc.map((row) => ({
        time: Math.floor(row[0] / 1000),
        open: row[1],
        high: row[2],
        low: row[3],
        close: row[4],
        volume: 0,
      }));
      candles['4h'] = bars4h.slice(-60);
      candles['1h'] = bars4h.slice(-60);
      candles['15m'] = bars4h.slice(-60);
      candles['5m'] = bars4h.slice(-60);
      sourceName = 'CoinGecko OHLC Public API';
    }
  }

  // Opportunistic Binance klines if directly reachable
  if (def.binanceSymbol && candles['15m'].length === 0) {
    const b15 = await fetchBinanceKlinesQuick(def.binanceSymbol, '15m');
    if (b15 && b15.length > 0) {
      candles['15m'] = b15;
      sourceName = 'Binance Spot Public API';
    }
  }

  let livePrice = primarySeries?.price ?? 0;
  let changePct = primarySeries?.changePct ?? 0;
  let dayHigh = primarySeries?.dayHigh ?? livePrice;
  let dayLow = primarySeries?.dayLow ?? livePrice;
  let status: ProviderStatus = primarySeries ? 'LIVE' : 'FALLBACK';

  // Cross-check CoinGecko spot for Crypto / PAXG
  if (def.coingeckoId && cgPrices?.[def.coingeckoId]?.usd) {
    const cgVal = cgPrices[def.coingeckoId].usd ?? 0;
    const cgChg = cgPrices[def.coingeckoId].usd_24h_change ?? 0;
    if (!livePrice || def.category === 'CRYPTO' || def.symbol === 'PAXGUSDT') {
      livePrice = cgVal;
      changePct = Number(cgChg.toFixed(2));
      status = 'LIVE';
      if (sourceName.startsWith('Yahoo')) {
        sourceName = `${sourceName} + CoinGecko`;
      } else {
        sourceName = 'CoinGecko Simple Price API';
      }
    }
  }

  // Cross-reference open.er-api FX spot if available
  if (def.erRatePair && erRates?.[def.erRatePair]) {
    const rate = erRates[def.erRatePair];
    const erSpot = def.erRatePair === 'JPY' ? rate : 1 / rate;
    if (Number.isFinite(erSpot) && erSpot > 0) {
      if (!livePrice) {
        livePrice = Number(erSpot.toFixed(def.decimals));
        status = 'LIVE';
        sourceName = 'open.er-api.com Spot';
      } else {
        sourceName = `${sourceName} + open.er-api`;
      }
    }
  }

  // Ensure every higher timeframe fallback has bars when 15m/1h exists
  if (candles['15m'].length === 0 && candles['1h'].length > 0) {
    candles = {
      ...candles,
      '15m': candles['1h'],
    };
  }

  return {
    symbol: def.symbol,
    displaySymbol: def.displaySymbol,
    name: def.name,
    category: def.category,
    decimals: def.decimals,
    price: Number(livePrice.toFixed(def.decimals)),
    changePct24h: changePct,
    dayHigh: Number((dayHigh || livePrice).toFixed(def.decimals)),
    dayLow: Number((dayLow || livePrice).toFixed(def.decimals)),
    candles,
    source: sourceName,
    status,
    updatedAt: nowIso,
  };
}

export async function fetchAllQuotesAndMacro(erRates: Record<string, number> | null): Promise<{
  quotes: Record<string, MarketQuoteWithCandles>;
  macro: MacroOverviewSnapshot;
  yahooLiveCount: number;
  binanceSpotLive: boolean;
  coingeckoLive: boolean;
}> {
  const [cgData, binanceTickers] = await Promise.all([
    fetchJsonWithTimeout<
      Record<string, { usd?: number; idr?: number; usd_24h_change?: number }>
    >(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,pax-gold,tether-gold&vs_currencies=usd,idr&include_24hr_change=true',
      4500
    ),
    fetchJsonWithTimeout<Array<{ symbol: string; lastPrice: string; priceChangePercent: string }>>(
      'https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","SOLUSDT","PAXGUSDT"]',
      2000
    ),
  ]);

  // Batch in groups of 4 with a tiny stagger so Yahoo never returns HTTP 429 burst blocks
  const quotes: Record<string, MarketQuoteWithCandles> = {};
  const batchSize = 4;
  for (let start = 0; start < ASSET_DEFINITIONS.length; start += batchSize) {
    const chunk = ASSET_DEFINITIONS.slice(start, start + batchSize);
    const settled = await Promise.allSettled(
      chunk.map((def, offset) => fetchOneAssetQuote(def, start + offset, cgData, erRates))
    );
    settled.forEach((res, offset) => {
      const def = chunk[offset];
      if (res.status === 'fulfilled') {
        quotes[def.symbol] = res.value;
      }
    });
    if (start + batchSize < ASSET_DEFINITIONS.length) {
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
  }

  // Opportunistically overlay Binance 24hr spot ticker if reachable in this network
  if (Array.isArray(binanceTickers)) {
    for (const bt of binanceTickers) {
      const target = quotes[bt.symbol];
      const lp = Number(bt.lastPrice);
      const chg = Number(bt.priceChangePercent);
      if (target && Number.isFinite(lp) && lp > 0) {
        target.price = Number(lp.toFixed(target.decimals));
        if (Number.isFinite(chg)) target.changePct24h = Number(chg.toFixed(2));
        target.status = 'LIVE';
        target.source = `${target.source} + Binance 24hr`;
      }
    }
  }

  // Compute GBPJPY spot via open.er-api if Yahoo GBPJPY stalled
  if (quotes.GBPJPY && !quotes.GBPJPY.price && erRates?.GBP && erRates?.JPY) {
    quotes.GBPJPY.price = Number((erRates.JPY / erRates.GBP).toFixed(3));
    quotes.GBPJPY.status = 'LIVE';
    quotes.GBPJPY.source = 'open.er-api Cross Rate';
  }

  const wibNow = formatWibDateTime(Date.now()).fullLabel;
  const macro: MacroOverviewSnapshot = {
    dxyPrice: quotes.DXY?.price ?? 0,
    dxyChangePct: quotes.DXY?.changePct24h ?? 0,
    us10yYield: quotes.US10Y?.price ?? 0,
    us10yChangePct: quotes.US10Y?.changePct24h ?? 0,
    vixLevel: quotes.VIX?.price ?? 0,
    vixChangePct: quotes.VIX?.changePct24h ?? 0,
    goldPrice: quotes.XAUUSD?.price ?? 0,
    goldChangePct: quotes.XAUUSD?.changePct24h ?? 0,
    silverPrice: quotes.XAGUSD?.price ?? 0,
    silverChangePct: quotes.XAGUSD?.changePct24h ?? 0,
    status: quotes.DXY?.status === 'LIVE' || quotes.XAUUSD?.status === 'LIVE' ? 'LIVE' : 'FALLBACK',
    updatedWibLabel: wibNow,
  };

  const yahooLiveCount = Object.values(quotes).filter(
    (q) => q.status === 'LIVE' && q.source.includes('Yahoo')
  ).length;

  return {
    quotes,
    macro,
    yahooLiveCount,
    binanceSpotLive: Array.isArray(binanceTickers) && binanceTickers.length > 0,
    coingeckoLive: Boolean(cgData?.bitcoin?.usd),
  };
}

// ============================================================================
// 1.3 OFFICIAL CFTC COT OPEN DATA API (LEGACY 6dca-aqww + TFF gpe5-46if)
// ============================================================================
interface CftcTargetSpec {
  id: string;
  code: string;
  asset: string;
  preferDataset: 'LEGACY' | 'TFF';
}

const CFTC_TARGETS: CftcTargetSpec[] = [
  { id: 'cot-gold', code: '088691', asset: 'Gold Futures (COMEX XAUUSD)', preferDataset: 'LEGACY' },
  { id: 'cot-silver', code: '084691', asset: 'Silver Futures (COMEX XAGUSD)', preferDataset: 'LEGACY' },
  { id: 'cot-eur', code: '099741', asset: 'Euro FX (CME EURUSD)', preferDataset: 'LEGACY' },
  { id: 'cot-gbp', code: '096742', asset: 'British Pound (CME GBPUSD)', preferDataset: 'LEGACY' },
  { id: 'cot-jpy', code: '097741', asset: 'Japanese Yen (CME JPY)', preferDataset: 'LEGACY' },
  { id: 'cot-spx', code: '13874A', asset: 'E-Mini S&P 500 (CME SPX500)', preferDataset: 'TFF' },
  { id: 'cot-ndx', code: '209742', asset: 'Nasdaq 100 E-Mini (CME NAS100)', preferDataset: 'TFF' },
  { id: 'cot-btc', code: '133741', asset: 'Bitcoin Futures (CME BTCUSD)', preferDataset: 'TFF' },
];

type RawCftcRow = Record<string, string | undefined>;

async function fetchSingleCftcTarget(spec: CftcTargetSpec): Promise<CotAssetReport | null> {
  const tryEndpoints: Array<{ kind: 'LEGACY' | 'TFF'; datasetId: string }> =
    spec.preferDataset === 'TFF'
      ? [
          { kind: 'TFF', datasetId: 'gpe5-46if' },
          { kind: 'LEGACY', datasetId: '6dca-aqww' },
        ]
      : [
          { kind: 'LEGACY', datasetId: '6dca-aqww' },
          { kind: 'TFF', datasetId: 'gpe5-46if' },
        ];

  for (const ep of tryEndpoints) {
    const url = `https://publicreporting.cftc.gov/resource/${ep.datasetId}.json?cftc_contract_market_code=${spec.code}&$order=report_date_as_yyyy_mm_dd%20DESC&$limit=1`;
    const rows = await fetchJsonWithTimeout<RawCftcRow[]>(url, 5500);
    if (!Array.isArray(rows) || rows.length === 0) continue;
    const row = rows[0];

    let instLong = 0;
    let instShort = 0;
    let deltaL = 0;
    let deltaS = 0;
    let commLong = 0;
    let commShort = 0;

    if (ep.kind === 'LEGACY') {
      instLong = Number(row.noncomm_positions_long_all ?? 0);
      instShort = Number(row.noncomm_positions_short_all ?? 0);
      deltaL = Number(row.change_in_noncomm_long_all ?? 0);
      deltaS = Number(row.change_in_noncomm_short_all ?? 0);
      commLong = Number(row.comm_positions_long_all ?? 0);
      commShort = Number(row.comm_positions_short_all ?? 0);
    } else {
      // TFF Financial Futures combines Asset Managers + Leveraged Funds
      instLong =
        Number(row.asset_mgr_positions_long ?? 0) + Number(row.lev_money_positions_long ?? 0);
      instShort =
        Number(row.asset_mgr_positions_short ?? 0) + Number(row.lev_money_positions_short ?? 0);
      deltaL =
        Number(row.change_in_asset_mgr_long ?? 0) + Number(row.change_in_lev_money_long ?? 0);
      deltaS =
        Number(row.change_in_asset_mgr_short ?? 0) + Number(row.change_in_lev_money_short ?? 0);
      commLong = Number(row.dealer_positions_long_all ?? 0);
      commShort = Number(row.dealer_positions_short_all ?? 0);
    }

    const retailLong = Number(row.nonrept_positions_long_all ?? 0);
    const retailShort = Number(row.nonrept_positions_short_all ?? 0);
    const openInterest = Number(row.open_interest_all ?? 0);

    const instTotal = Math.max(1, instLong + instShort);
    const retailTotal = Math.max(1, retailLong + retailShort);
    const instLongPct = Math.round((instLong / instTotal) * 100);
    const retailLongPct = Math.round((retailLong / retailTotal) * 100);
    const instNet = instLong - instShort;
    const weeklyNetDelta = deltaL - deltaS;
    const divergenceTriggered = Math.abs(instLongPct - retailLongPct) >= 22;

    return {
      id: spec.id,
      code: spec.code,
      asset: spec.asset,
      exchangeName: row.market_and_exchange_names ?? spec.asset,
      dataset: ep.kind,
      reportDateIso: (row.report_date_as_yyyy_mm_dd ?? '').slice(0, 10),
      reportWeekLabel: row.yyyy_report_week_ww ?? 'Official CFTC Report',
      openInterest,
      instLong,
      instShort,
      instNet,
      instLongPct,
      weeklyDeltaLong: deltaL,
      weeklyDeltaShort: deltaS,
      weeklyNetDelta,
      retailLong,
      retailShort,
      retailLongPct,
      commLong,
      commShort,
      divergenceTriggered,
      sourceUrl: `https://publicreporting.cftc.gov/resource/${ep.datasetId}.json?cftc_contract_market_code=${spec.code}`,
      status: 'LIVE',
    };
  }

  return null;
}

// Separate slow caches for weekly feeds so 15-second FX/Quote refreshes never trip
// Cloudflare 5-minute 429 limits on FairEconomy or hammer CFTC Socrata.
const CALENDAR_CACHE_TTL_MS = 6 * 60 * 1000;
const COT_CACHE_TTL_MS = 10 * 60 * 1000;
let cachedCalendarSnapshot: {
  ts: number;
  calendarEvents: WibCalendarEvent[];
  calendarStatus: ProviderStatus;
} | null = null;
let cachedCotSnapshot: {
  ts: number;
  reports: CotAssetReport[];
  status: ProviderStatus;
} | null = null;

export async function fetchAllCftcCotReports(): Promise<{
  reports: CotAssetReport[];
  status: ProviderStatus;
}> {
  if (cachedCotSnapshot && Date.now() - cachedCotSnapshot.ts < COT_CACHE_TTL_MS) {
    return { reports: cachedCotSnapshot.reports, status: cachedCotSnapshot.status };
  }
  const settled = await Promise.allSettled(CFTC_TARGETS.map((t) => fetchSingleCftcTarget(t)));
  const reports: CotAssetReport[] = [];
  for (const res of settled) {
    if (res.status === 'fulfilled' && res.value) {
      reports.push(res.value);
    }
  }
  if (reports.length > 0) {
    cachedCotSnapshot = { ts: Date.now(), reports, status: 'LIVE' };
    return { reports, status: 'LIVE' };
  }
  if (cachedCotSnapshot) {
    return { reports: cachedCotSnapshot.reports, status: cachedCotSnapshot.status };
  }
  return {
    reports,
    status: 'FALLBACK',
  };
}

// ============================================================================
// 1.4 LIVE WEEKLY ECONOMIC CALENDAR & MARKET HEADLINES (EXACT WIB TIMESTAMPS)
// ============================================================================
interface RawFairEconomyEvent {
  title?: string;
  country?: string;
  date?: string;
  impact?: string;
  forecast?: string;
  previous?: string;
  actual?: string;
}

function parseRssXmlItems(xmlText: string, defaultPublisher: string): MarketHeadlineItem[] {
  const items: MarketHeadlineItem[] = [];
  const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  for (let i = 0; i < Math.min(10, itemMatches.length); i++) {
    const block = itemMatches[i];
    const titleMatch = block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/);
    const linkMatch = block.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>|<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const title = (titleMatch?.[1] ?? titleMatch?.[2] ?? '').trim();
    const link = (linkMatch?.[1] ?? linkMatch?.[2] ?? '').trim();
    const pubRaw = (pubDateMatch?.[1] ?? '').trim();
    if (!title || !link) continue;
    const dt = pubRaw ? new Date(pubRaw) : new Date();
    const iso = Number.isNaN(dt.getTime()) ? new Date().toISOString() : dt.toISOString();
    items.push({
      id: `rss-${defaultPublisher.slice(0, 4)}-${i}-${iso}`,
      title: title
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'"),
      publisher: defaultPublisher,
      link,
      publishedIso: iso,
      wibFullDateLabel: formatWibDateTime(iso).fullLabel,
      source: defaultPublisher,
    });
  }
  return items;
}

export async function fetchFearAndGreedIndex(): Promise<FearAndGreedSnapshot | null> {
  const json = await fetchJsonWithTimeout<{
    data?: Array<{ value?: string; value_classification?: string; timestamp?: string }>;
  }>('https://api.alternative.me/fng/?limit=1', 4500);
  const item = json?.data?.[0];
  if (!item?.value) return null;
  const val = Number(item.value);
  const tsMs = item.timestamp ? Number(item.timestamp) * 1000 : Date.now();
  return {
    value: Number.isFinite(val) ? val : 50,
    classification: item.value_classification ?? 'Neutral',
    timestampIso: Number.isFinite(tsMs) ? new Date(tsMs).toISOString() : new Date().toISOString(),
    source: 'api.alternative.me/fng',
    status: 'LIVE',
  };
}

export async function fetchBinanceWhaleRetailRatios(): Promise<BinanceWhaleRetailSnapshot[]> {
  const symbols: Array<'BTCUSDT' | 'ETHUSDT' | 'SOLUSDT'> = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
  const settled = await Promise.allSettled(
    symbols.map(async (sym) => {
      const [topRes, globalRes] = await Promise.all([
        fetchJsonWithTimeout<Array<{ longAccount?: string; shortAccount?: string; timestamp?: number }>>(
          `https://fapi.binance.com/futures/data/topLongShortPositionRatio?symbol=${sym}&period=1h&limit=1`,
          2000
        ),
        fetchJsonWithTimeout<Array<{ longAccount?: string; shortAccount?: string; timestamp?: number }>>(
          `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${sym}&period=1h&limit=1`,
          2000
        ),
      ]);
      const top = topRes?.[0];
      const glob = globalRes?.[0];
      if (!top?.longAccount || !glob?.longAccount) return null;
      const topL = Math.round(Number(top.longAccount) * 100);
      const retL = Math.round(Number(glob.longAccount) * 100);
      return {
        symbol: sym,
        topTraderLongPct: topL,
        topTraderShortPct: 100 - topL,
        retailLongPct: retL,
        retailShortPct: 100 - retL,
        timestampIso: top.timestamp
          ? new Date(top.timestamp).toISOString()
          : new Date().toISOString(),
        status: 'LIVE' as ProviderStatus,
      };
    })
  );

  return settled
    .filter((r): r is PromiseFulfilledResult<BinanceWhaleRetailSnapshot | null> => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((v): v is BinanceWhaleRetailSnapshot => v !== null);
}

export async function fetchCalendarAndHeadlines(): Promise<{
  calendarEvents: WibCalendarEvent[];
  calendarStatus: ProviderStatus;
  headlines: MarketHeadlineItem[];
  yahooSearchLive: boolean;
}> {
  const allowedCurrencies = new Set(['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY']);
  const nowMs = Date.now();
  const calendarCacheValid =
    cachedCalendarSnapshot && nowMs - cachedCalendarSnapshot.ts < CALENDAR_CACHE_TTL_MS;

  const [calRaw, yahooSearchJson, yahooRssXml, cnbcRssXml, investingRssXml] = await Promise.all([
    calendarCacheValid
      ? Promise.resolve<RawFairEconomyEvent[] | null>(null)
      : fetchJsonWithTimeout<RawFairEconomyEvent[]>(
          'https://nfs.faireconomy.media/ff_calendar_thisweek.json',
          5500
        ),
    fetchJsonWithTimeout<{
      news?: Array<{
        uuid?: string;
        title?: string;
        publisher?: string;
        link?: string;
        providerPublishTime?: number;
      }>;
    }>(
      'https://query2.finance.yahoo.com/v1/finance/search?q=gold%20federal%20reserve%20forex%20inflation&newsCount=15',
      4500
    ),
    fetchTextWithTimeout(
      'https://feeds.finance.yahoo.com/rss/2.0/headline?s=GC=F,DX-Y.NYB,EURUSD=X,BTC-USD&region=US&lang=en-US',
      4500
    ),
    fetchTextWithTimeout(
      'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664',
      4500
    ),
    fetchTextWithTimeout(
      'https://www.investing.com/rss/news_285.rss',
      4500
    ),
  ]);

  let calendarEvents: WibCalendarEvent[] = [];
  let calendarStatus: ProviderStatus = 'FALLBACK';
  if (Array.isArray(calRaw)) {
    const filtered = calRaw.filter(
      (ev) => ev.country && allowedCurrencies.has(ev.country.toUpperCase())
    );

    const listToUse = filtered.length > 0 ? filtered : calRaw;
    listToUse.forEach((ev, idx) => {
      const title = (ev.title ?? 'Economic Release').trim();
      const country = (ev.country ?? 'USD').toUpperCase();
      const isoDate = ev.date ?? new Date().toISOString();
      const impact =
        ev.impact === 'High' ? 'High' : ev.impact === 'Medium' ? 'Medium' : 'Low';
      const wib = formatWibDateTime(isoDate);
      const actual = (ev.actual ?? '').trim();
      const forecast = (ev.forecast ?? '').trim();
      const previous = (ev.previous ?? '').trim();
      const interpreted = interpretEconomicEvent(title, country, forecast, previous);

      calendarEvents.push({
        id: `ff-${idx}-${country}-${isoDate}`,
        title,
        country,
        impact,
        isoDate,
        wibFullDateLabel: wib.fullLabel,
        wibShortDate: wib.shortDate,
        wibTimeOnly: wib.timeOnly,
        statusCode: resolveWibEventStatus(isoDate, nowMs, actual.length > 0),
        forecast,
        previous,
        actual,
        ...interpreted,
      });
    });

    // Sort chronologically
    calendarEvents.sort(
      (a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime()
    );
    if (calendarEvents.length > 0) {
      calendarStatus = 'LIVE';
      cachedCalendarSnapshot = {
        ts: Date.now(),
        calendarEvents,
        calendarStatus: 'LIVE',
      };
    }
  } else if (cachedCalendarSnapshot) {
    calendarEvents = cachedCalendarSnapshot.calendarEvents;
    calendarStatus = cachedCalendarSnapshot.calendarStatus;
  }

  const yahooSearchItems: MarketHeadlineItem[] = Array.isArray(yahooSearchJson?.news)
    ? yahooSearchJson.news
        .filter((n) => n.title && n.link)
        .map((n, i) => {
          const pubMs = n.providerPublishTime ? n.providerPublishTime * 1000 : Date.now();
          const iso = new Date(pubMs).toISOString();
          return {
            id: n.uuid ?? `ys-${i}-${iso}`,
            title: n.title ?? '',
            publisher: n.publisher ?? 'Yahoo Finance',
            link: n.link ?? 'https://finance.yahoo.com',
            publishedIso: iso,
            wibFullDateLabel: formatWibDateTime(iso).fullLabel,
            source: 'Yahoo Finance Search API',
          };
        })
    : [];

  const rawHeadlines: MarketHeadlineItem[] = [
    ...yahooSearchItems,
    ...(yahooRssXml ? parseRssXmlItems(yahooRssXml, 'Yahoo Finance RSS') : []),
    ...(cnbcRssXml ? parseRssXmlItems(cnbcRssXml, 'CNBC Finance RSS') : []),
    ...(investingRssXml ? parseRssXmlItems(investingRssXml, 'Investing.com RSS') : []),
  ];

  // Deduplicate by title and sort newest-first
  const seenTitles = new Set<string>();
  const headlines = rawHeadlines
    .filter((h) => {
      const key = h.title.toLowerCase();
      if (seenTitles.has(key)) return false;
      seenTitles.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.publishedIso).getTime() - new Date(a.publishedIso).getTime())
    .slice(0, 15);

  return {
    calendarEvents,
    calendarStatus,
    headlines,
    yahooSearchLive: yahooSearchItems.length > 0 || Boolean(yahooRssXml),
  };
}

export async function buildFreshMarketIntelligencePayload(): Promise<MarketIntelligencePayload> {
  const fxResult = await fetchUsdIdrWithFxCross();
  const [quotesMacro, cotResult, calNewsResult, fngResult, binanceFutures] = await Promise.all([
    fetchAllQuotesAndMacro(fxResult.erRates),
    fetchAllCftcCotReports(),
    fetchCalendarAndHeadlines(),
    fetchFearAndGreedIndex(),
    fetchBinanceWhaleRetailRatios(),
  ]);

  const now = new Date();
  const providerTelemetry: ProviderTelemetryItem[] = [
    {
      id: 1,
      name: 'ExchangeRate-API (open.er-api.com)',
      status: fxResult.apiStatuses.erApi ? 'LIVE' : 'FALLBACK',
      detail: fxResult.apiStatuses.erApi ? `USD/IDR ${Math.round(fxResult.usdIdrRate)}` : 'Backup routing active',
    },
    {
      id: 2,
      name: 'Fawazahmed0 Currency CDN API',
      status: fxResult.apiStatuses.fawazCdn ? 'LIVE' : 'FALLBACK',
      detail: fxResult.apiStatuses.fawazCdn ? 'USD/IDR CDN verified' : 'Secondary idle',
    },
    {
      id: 3,
      name: 'Frankfurter ECB Institutional API',
      status: fxResult.apiStatuses.frankfurter ? 'LIVE' : 'FALLBACK',
      detail: fxResult.apiStatuses.frankfurter ? 'ECB reference feed OK' : 'Cross-check idle',
    },
    {
      id: 4,
      name: 'Yahoo Finance v8 Intraday OHLC API',
      status: quotesMacro.yahooLiveCount > 0 ? 'LIVE' : 'FALLBACK',
      detail: `${quotesMacro.yahooLiveCount}/17 instrumen OHLC aktif`,
    },
    {
      id: 5,
      name: 'Binance Spot 24hr Ticker & Klines API',
      status: quotesMacro.binanceSpotLive ? 'LIVE' : 'FALLBACK',
      detail: quotesMacro.binanceSpotLive ? 'BTC/ETH/SOL/PAXG live' : 'Dialihkan ke Yahoo + CoinGecko',
    },
    {
      id: 6,
      name: 'Binance Futures Whale vs Retail Ratio API',
      status: binanceFutures.length > 0 ? 'LIVE' : 'FALLBACK',
      detail: binanceFutures.length > 0 ? `${binanceFutures.length} pair ratios live` : 'Dialihkan ke CFTC COT resmi',
    },
    {
      id: 7,
      name: 'Official US CFTC Socrata Open Data API',
      status: cotResult.status,
      detail: `${cotResult.reports.length} laporan kontrak institusi`,
    },
    {
      id: 8,
      name: 'FairEconomy Weekly Economic Calendar API',
      status: calNewsResult.calendarStatus,
      detail: `${calNewsResult.calendarEvents.length} jadwal makro mingguan`,
    },
    {
      id: 9,
      name: 'Alternative.me Fear & Greed Index API',
      status: fngResult?.status ?? 'FALLBACK',
      detail: fngResult ? `Skor ${fngResult.value}/100 (${fngResult.classification})` : 'Baseline neutral',
    },
    {
      id: 10,
      name: 'CoinGecko Simple Price & IDR Cross-Check API',
      status: quotesMacro.coingeckoLive ? 'LIVE' : 'FALLBACK',
      detail: quotesMacro.coingeckoLive ? 'BTC/ETH/SOL/Gold USD+IDR live' : 'Standby',
    },
    {
      id: 11,
      name: 'Yahoo Finance Financial News Search & RSS API',
      status: calNewsResult.headlines.length > 0 ? 'LIVE' : 'FALLBACK',
      detail: `${calNewsResult.headlines.length} berita pasar terverifikasi`,
    },
  ];

  return {
    usdIdrRate: fxResult.usdIdrRate,
    tenUsdInIdr: Math.round(fxResult.usdIdrRate * 10),
    usdIdrSource: fxResult.source,
    usdIdrStatus: fxResult.status,
    lastUpdatedTimestamp: now.toISOString(),
    lastUpdatedWibLabel: formatWibDateTime(now).fullLabel,
    macro: quotesMacro.macro,
    fearAndGreed: fngResult,
    futuresPositioning: binanceFutures,
    quotes: quotesMacro.quotes,
    cotReports: cotResult.reports,
    cotStatus: cotResult.status,
    calendarEvents: calNewsResult.calendarEvents,
    calendarStatus: calNewsResult.calendarStatus,
    headlines: calNewsResult.headlines,
    providerTelemetry,
  };
}
