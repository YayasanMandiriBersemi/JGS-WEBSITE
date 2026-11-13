'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Activity,
  AlertTriangle,
  Archive,
  BarChart3,
  BookOpen,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Gauge,
  Globe,
  Newspaper,
  Plus,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import { MACRO_DATA_SOURCES, COT_POSITIONING_ROWS } from '@/lib/data/market-intelligence-data';
import {
  generateLiveSignalsForStyle,
  type LiveAlgorithmicSignal,
  type LiveSignalStyleId,
} from '@/lib/signals/live-signal-engine';
import {
  syncSignalsWithJgsDesk,
  type JgsDeskOrderRecord,
} from '@/lib/signals/jgs-execution-desk';
import type { SignalAssetCategory } from '@/lib/data/market-intelligence-data';
import type { NewsPairFilterKey, WibCalendarEvent } from '@/lib/market/types';
import { BrokerRecommendationHub } from '@/components/brokers/BrokerRecommendationHub';
import { TradingViewLiveWidget } from '@/components/charts/TradingViewLiveWidget';
import { LiveKursPill } from '@/components/market/LiveKursPill';
import { useLiveCurrency, useLiveMarket } from '@/lib/context/LiveMarketContext';
import { formatWibDateTime, getPairSpecificNewsBrief } from '@/lib/market/wib';
import {
  loadJournalEntries,
  loadThemeMode,
  saveJournalEntries,
  type JgsThemeMode,
} from '@/lib/storage/jgs-local-store';
import { MotionReveal, SpotlightCard } from '@/components/ui/LuxuryMotion';

export type IntelligenceTabId =
  | 'signals'
  | 'fundamental'
  | 'news'
  | 'calendar'
  | 'cot'
  | 'brokers';

interface LiveIntelligenceHubProps {
  initialTab?: IntelligenceTabId;
}

interface DynamicMacroBiasRow {
  id: string;
  symbol: string;
  nameId: string;
  nameEn: string;
  score: number;
  policyDiffNote: string;
  driverId: string;
  driverEn: string;
}

function buildDynamicFundamentalBias(params: {
  dxyChg: number;
  us10yChg: number;
  goldChg: number;
  silverChg: number;
  vixLevel: number;
}): DynamicMacroBiasRow[] {
  const { dxyChg, us10yChg, goldChg, silverChg, vixLevel } = params;
  const dxyMomentum = Math.round(dxyChg * 28 + us10yChg * 14);
  const goldScore = Math.max(-95, Math.min(95, Math.round(45 - us10yChg * 18 - dxyChg * 15 + goldChg * 14 + (vixLevel > 18 ? 12 : 4))));
  const silverScore = Math.max(-95, Math.min(95, Math.round(35 - us10yChg * 14 - dxyChg * 12 + silverChg * 12)));
  const dxyScore = Math.max(-95, Math.min(95, dxyMomentum));
  const eurScore = Math.max(-95, Math.min(95, Math.round(-dxyScore * 0.8 + 12)));
  const gbpScore = Math.max(-95, Math.min(95, Math.round(-dxyScore * 0.75 + 22)));
  const jpyScore = Math.max(-95, Math.min(95, Math.round(us10yChg * 22 - 18))); // USDJPY directional score
  const nasScore = Math.max(-95, Math.min(95, Math.round(38 - us10yChg * 16 - (vixLevel > 22 ? 25 : 0))));
  const btcScore = Math.max(-95, Math.min(95, Math.round(42 - dxyChg * 12 - (vixLevel > 24 ? 20 : 0))));

  return [
    {
      id: 'dyn-xau',
      symbol: 'XAUUSD (GOLD)',
      nameId: 'Emas Spot Dunia',
      nameEn: 'Spot Gold Bullion',
      score: goldScore,
      policyDiffNote: 'Fed 4.50%-4.75% vs Real Yield + Central Bank Accumulation',
      driverId: `Terhitung dinamis dari pergerakan US10Y (${us10yChg >= 0 ? '+' : ''}${us10yChg}%), DXY (${dxyChg >= 0 ? '+' : ''}${dxyChg}%), dan VIX (${vixLevel.toFixed(1)}).`,
      driverEn: `Live telemetry from US10Y (${us10yChg}%), DXY (${dxyChg}%), and VIX (${vixLevel.toFixed(1)}).`,
    },
    {
      id: 'dyn-dxy',
      symbol: 'DXY (USD INDEX)',
      nameId: 'Indeks Dolar AS',
      nameEn: 'US Dollar Index',
      score: dxyScore,
      policyDiffNote: 'Fed Policy Rate: 4.50% - 4.75%',
      driverId: 'Mengukur kekuatan relatif Dolar terhadap sekeranjang mata uang G10 seiring naik-turunnya imbal hasil obligasi AS.',
      driverEn: 'Reflects live Dollar momentum tied directly to front-end US Treasury yield shifts.',
    },
    {
      id: 'dyn-eur',
      symbol: 'EURUSD',
      nameId: 'Euro / Dolar AS',
      nameEn: 'Euro / US Dollar',
      score: eurScore,
      policyDiffNote: 'ECB Rate 3.25% vs Fed 4.75%',
      driverId: 'Sensitif terhadap selisih yield Bund Jerman vs US Treasury serta pelemahan/penguatan DXY sesi Eropa.',
      driverEn: 'Driven by live DXY inverse elasticity and Bund-Treasury yield convergence.',
    },
    {
      id: 'dyn-gbp',
      symbol: 'GBPUSD',
      nameId: 'Poundsterling / USD',
      nameEn: 'British Pound / USD',
      score: gbpScore,
      policyDiffNote: 'BoE Rate 4.75% vs Fed 4.75%',
      driverId: 'Didukung suku bunga Bank of England yang relatif setara terhadap AS dibanding rekan mata uang Eropa lainnya.',
      driverEn: 'Supported by balanced BoE-Fed benchmark policy spreads.',
    },
    {
      id: 'dyn-usdjpy',
      symbol: 'USDJPY',
      nameId: 'Dolar AS / Yen Jepang',
      nameEn: 'USD / Japanese Yen',
      score: jpyScore,
      policyDiffNote: 'Fed 4.75% vs BoJ 0.25% (Intervensi Watch)',
      driverId: 'Korelasi tinggi dengan US10Y Treasury Yield dan normalisasi bertahap kebijakan suku bunga Bank of Japan.',
      driverEn: 'Tightly tracks US10Y yield spread alongside Bank of Japan normalization sensitivity.',
    },
    {
      id: 'dyn-xag',
      symbol: 'XAGUSD (SILVER)',
      nameId: 'Perak Futures / Spot',
      nameEn: 'Silver Metals Complex',
      score: silverScore,
      policyDiffNote: 'High-Beta Monetary & Industrial Demand',
      driverId: 'Mengikuti momentum Emas (XAUUSD) dengan volatilitas persentase harian yang jauh lebih tajam.',
      driverEn: 'Tracks Gold macro drivers with heightened intraday industrial beta.',
    },
    {
      id: 'dyn-nas100',
      symbol: 'NAS100 / USTEC',
      nameId: 'Indeks Nasdaq 100',
      nameEn: 'Nasdaq 100 Tech Index',
      score: nasScore,
      policyDiffNote: 'AI Capex vs Real Cost of Capital (US10Y)',
      driverId: 'Saham pertumbuhan teknologi bernapas lega setiap kali US10Y Yield mendingin dan indeks VIX berada di bawah 20.',
      driverEn: 'Equity growth multiples expand whenever US10Y stabilizes and VIX stays calm below 20.',
    },
    {
      id: 'dyn-btcusdt',
      symbol: 'BTCUSDT',
      nameId: 'Bitcoin Likuiditas Global',
      nameEn: 'Bitcoin Macro Liquidity',
      score: btcScore,
      policyDiffNote: 'US Spot ETF Flows + Global M2 Sensitivity',
      driverId: 'Responsif terhadap pelemahan DXY, arus dana ETF Wall Street, serta selera risiko pasar ekuitas AS.',
      driverEn: 'Follows global liquidity appetite, ETF demand, and calmer DXY trends.',
    },
  ];
}

function formatCountdownWib(targetIso: string, nowMs: number): string {
  if (!nowMs) return 'Menghitung...';
  const diffSec = Math.max(0, Math.floor((new Date(targetIso).getTime() - nowMs) / 1000));
  const d = Math.floor(diffSec / 86400);
  const h = String(Math.floor((diffSec % 86400) / 3600)).padStart(2, '0');
  const m = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
  const s = String(diffSec % 60).padStart(2, '0');
  return d > 0 ? `${d} HARI ${h} JAM ${m} MENIT ${s} DETIK` : `${h} JAM ${m} MENIT ${s} DETIK`;
}

export function LiveIntelligenceHub({ initialTab = 'signals' }: LiveIntelligenceHubProps) {
  const { locale, isId, l } = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data, lastUpdatedWibLabel, isSyncing, refreshNow } = useLiveMarket();
  const { usdIdrRate, formatUsdToIdr, formatUscToIdr } = useLiveCurrency();

  const [activeTab, setActiveTab] = useState<IntelligenceTabId>(initialTab);
  const [styleTab, setStyleTab] = useState<LiveSignalStyleId>('SCALPING');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | SignalAssetCategory>('ALL');
  const [expandedSignalId, setExpandedSignalId] = useState<string>('XAUUSD-SCALPING');
  const [chartSignal, setChartSignal] = useState<LiveAlgorithmicSignal | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [followedTickets, setFollowedTickets] = useState<Record<string, boolean>>({});
  const [showDeskLedgerDrawer, setShowDeskLedgerDrawer] = useState<boolean>(false);

  // News Radar segmentation & released archive toggle
  const [newsPairFilter, setNewsPairFilter] = useState<NewsPairFilterKey>('ALL');
  const [showReleasedArchive, setShowReleasedArchive] = useState<boolean>(false);

  // Live USD capital sizing tiers synced 100% to live USD/IDR rate (10 USD = 1,000 USC, etc.)
  const [capitalUsdTier, setCapitalUsdTier] = useState<10 | 30 | 60>(10);
  const [riskPct, setRiskPct] = useState<number>(1.0);
  const capitalRp = Math.round(capitalUsdTier * usdIdrRate);
  const capitalUsc = capitalUsdTier * 100;

  const [themeMode, setThemeMode] = useState<JgsThemeMode>('dark');
  const [clientNowWib, setClientNowWib] = useState<string>('');
  const [clientNowMs, setClientNowMs] = useState<number>(0);

  const tvCalendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const qTab = searchParams.get('tab');
    if (
      qTab === 'signals' ||
      qTab === 'fundamental' ||
      qTab === 'news' ||
      qTab === 'calendar' ||
      qTab === 'cot' ||
      qTab === 'brokers'
    ) {
      setActiveTab(qTab);
    }
  }, [searchParams]);

  useEffect(() => {
    setThemeMode(loadThemeMode());
    const syncTheme = () => setThemeMode(loadThemeMode());
    window.addEventListener('jgs-theme-change', syncTheme);
    return () => window.removeEventListener('jgs-theme-change', syncTheme);
  }, []);

  // Live WIB Clock updated strictly after mount to avoid hydration mismatches
  useEffect(() => {
    const updateClock = () => {
      const now = Date.now();
      const fmt = formatWibDateTime(now);
      const sec = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        second: '2-digit',
      }).format(now);
      setClientNowMs(now);
      setClientNowWib(`${fmt.shortDate.toUpperCase()} • ${fmt.timeOnly.replace(' WIB', `:${sec} WIB`)}`);
    };
    updateClock();
    const t = setInterval(updateClock, 1000);
    return () => clearInterval(t);
  }, []);

  // Load TradingView Economic Calendar STRICTLY inside 'calendar' tab
  useEffect(() => {
    if (activeTab !== 'calendar') return;
    const container = tvCalendarRef.current;
    if (!container) return;
    while (container.firstChild) container.removeChild(container.firstChild);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.type = 'text/javascript';
    script.async = true;
    script.text = JSON.stringify({
      width: '100%',
      height: '600',
      colorTheme: themeMode === 'light' ? 'light' : 'dark',
      isTransparent: false,
      locale: isId ? 'id' : 'en',
      importanceFilter: '-1,0,1',
      currencyFilter: 'USD,EUR,GBP,JPY,AUD,CAD',
    });
    container.appendChild(script);
  }, [activeTab, themeMode, isId]);

  function handleSwitchTab(next: IntelligenceTabId) {
    setActiveTab(next);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleCopyPrice(copyId: string, valText: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(valText);
      setCopiedKey(copyId);
      setTimeout(() => setCopiedKey(null), 1600);
    }
  }

  function handleFollowLimitToJournal(sig: LiveAlgorithmicSignal) {
    const copyPayload = `${sig.ticketId} | ${sig.symbol}c ${sig.orderType} @ ${sig.entryPrice} | SL: ${sig.stopLoss} | TP1: ${sig.takeProfit1} | TP2: ${sig.takeProfit2} | Lot: ${sig.recommendedCentLot}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(copyPayload);
    }

    const nowFmt = formatWibDateTime(Date.now());
    const entries = loadJournalEntries();
    const exists = entries.some((e) => e.id === `desk-follow-${sig.ticketId}-${sig.symbol}`);
    if (!exists) {
      const nextEntries = [
        {
          id: `desk-follow-${sig.ticketId}-${sig.symbol}`,
          tradedAt: `${nowFmt.wibDateKey} ${nowFmt.timeOnly.replace(' WIB', '')}`,
          instrument: `${sig.symbol}c`,
          accountMode: 'CENT_USC' as const,
          direction: sig.direction === 'BUY' ? ('LONG' as const) : ('SHORT' as const),
          entryPrice: sig.entryPrice,
          stopLoss: sig.stopLoss,
          takeProfit: sig.takeProfit2,
          exitPrice: sig.entryPrice,
          lotSize: sig.recommendedCentLot,
          realizedPnl: sig.status === 'CLOSED_WIN' ? sig.tp2ProfitUsc : sig.status === 'CLOSED_LOSS' ? -sig.riskUsc : 0,
          realizedRMultiple: sig.status === 'CLOSED_WIN' ? 3.5 : sig.status === 'CLOSED_LOSS' ? -1.0 : 0,
          setupTag: `${sig.ticketId} (${sig.orderType} ${sig.timeframeLabel})`,
          emotionTag: 'DISCIPLINED' as const,
          ruleFollowedStopLoss: true,
          ruleProperLotSize: true,
          ruleWaitedConfirmation: true,
          ruleWithinDailyLimit: true,
          notes: `Mengikuti sinyal resmi Terminal JGS (${sig.orderType} @ ${sig.entryPrice}, SL ${sig.stopLoss}, TP1 ${sig.takeProfit1}, TP2 ${sig.takeProfit2}).`,
        },
        ...entries,
      ];
      saveJournalEntries(nextEntries);
    }
    setFollowedTickets((prev) => ({ ...prev, [sig.id]: true }));
    setTimeout(() => {
      setFollowedTickets((prev) => ({ ...prev, [sig.id]: false }));
    }, 3000);
  }

  const rawSignalsForStyle = useMemo(() => {
    return generateLiveSignalsForStyle({
      style: styleTab,
      quotes: data?.quotes ?? {},
      macro: data?.macro ?? null,
      cotReports: data?.cotReports ?? [],
      capitalRp,
      riskPct,
      usdIdrRate,
    });
  }, [styleTab, data, capitalRp, riskPct, usdIdrRate]);

  const deskSynced = useMemo(() => {
    return syncSignalsWithJgsDesk({
      signals: rawSignalsForStyle,
      quotes: data?.quotes ?? {},
      usdIdrRate,
    });
  }, [rawSignalsForStyle, data?.quotes, usdIdrRate]);

  const visibleSignals = useMemo(() => {
    if (categoryFilter === 'ALL') return deskSynced.syncedSignals;
    return deskSynced.syncedSignals.filter((s) => s.category === categoryFilter);
  }, [deskSynced.syncedSignals, categoryFilter]);

  const dynamicMacroBias = useMemo(() => {
    const m = data?.macro;
    return buildDynamicFundamentalBias({
      dxyChg: m?.dxyChangePct ?? 0,
      us10yChg: m?.us10yChangePct ?? 0,
      goldChg: m?.goldChangePct ?? 0,
      silverChg: m?.silverChangePct ?? 0,
      vixLevel: m?.vixLevel || 16.5,
    });
  }, [data?.macro]);

  const filteredCalendarGroups = useMemo(() => {
    const events = data?.calendarEvents ?? [];
    const nowRef = clientNowMs || Date.now();
    const byPair =
      newsPairFilter === 'ALL'
        ? events
        : events.filter((ev) => ev.affectedAssets?.includes(newsPairFilter));

    const upcoming: WibCalendarEvent[] = [];
    const released: WibCalendarEvent[] = [];

    for (const ev of byPair) {
      const evMs = new Date(ev.isoDate).getTime();
      if (!Number.isNaN(evMs) && evMs > nowRef) {
        upcoming.push(ev);
      } else {
        released.push(ev);
      }
    }

    upcoming.sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
    released.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());

    return { upcoming, released };
  }, [data?.calendarEvents, newsPairFilter, clientNowMs]);

  const nextUpcomingEvent = filteredCalendarGroups.upcoming[0] ?? null;

  const nextCountdownStr = useMemo(() => {
    if (!nextUpcomingEvent || !clientNowMs) return '--:--:--';
    const diffSec = Math.max(
      0,
      Math.floor((new Date(nextUpcomingEvent.isoDate).getTime() - clientNowMs) / 1000)
    );
    const d = Math.floor(diffSec / 86400);
    const h = String(Math.floor((diffSec % 86400) / 3600)).padStart(2, '0');
    const m = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
    const s = String(diffSec % 60).padStart(2, '0');
    return d > 0 ? `${d}h ${h}:${m}:${s}` : `${h}:${m}:${s}`;
  }, [nextUpcomingEvent, clientNowMs]);

  const tabs: { id: IntelligenceTabId; labelId: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'signals',
      labelId: 'Sinyal Trading Live',
      labelEn: 'Live Signals',
      icon: <Activity className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'fundamental',
      labelId: 'Bias Fundamental',
      labelEn: 'Fundamental Bias',
      icon: <Globe className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'news',
      labelId: 'Berita WIB & Kompas',
      labelEn: 'WIB News & Compass',
      icon: <Newspaper className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'calendar',
      labelId: 'Kalender Ekonomi Live',
      labelEn: 'Economic Calendar',
      icon: <CalendarClock className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'cot',
      labelId: 'Posisi COT Institusi',
      labelEn: 'CFTC COT Radar',
      icon: <BarChart3 className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'brokers',
      labelId: 'Panduan Broker',
      labelEn: 'Broker Guide',
      icon: <Building2 className="w-4 h-4 shrink-0" />,
    },
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Hero Header */}
        <MotionReveal className="rounded-3xl border border-[#D6A937]/30 bg-[var(--bg-surface-1)] p-6 sm:p-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D6A937]">
                  <Compass className="w-4 h-4" />
                  <span>
                    {isId
                      ? 'TERMINAL PENYEDIA SINYAL & RISET REAL-TIME JGS'
                      : 'JGS LIVE SIGNAL PROVIDER & MARKET INTELLIGENCE'}
                  </span>
                </div>
                <LiveKursPill />
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] text-[var(--text-ivory)] leading-[1.1]">
                {isId
                  ? 'Sinyal Trading Presisi, Radar Makro & Data COT Resmi AS'
                  : 'Algorithmic Live Signals, Macro Radar & Official CFTC COT'}
              </h1>

              <p className="text-sm sm:text-base jgs-prose-justify leading-[1.85] text-[var(--text-secondary)]">
                {isId
                  ? 'Setiap harga, sinyal Entry/SL/TP, imbal hasil US10Y, kurs USD/IDR, jadwal rilis berita WIB, dan laporan institusi CFTC di terminal ini dihitung langsung dari data API pihak ketiga secara real-time.'
                  : 'Every live price, algorithmic Entry/SL/TP setup, US10Y yield, USD/IDR exchange rate, economic release clock, and CFTC report inside this hub streams from live third-party APIs.'}
              </p>
            </div>

            {/* Live Sync Telemetry Pill */}
            <div className="shrink-0 rounded-2xl border border-[#10B981]/35 bg-[var(--bg-surface-2)] p-4 sm:p-5 space-y-2.5 min-w-[280px]">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#10B981]">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>
                    {data
                      ? `${data.providerTelemetry?.filter((p) => p.status === 'LIVE').length ?? 8}/11 LIVE APIS CONNECTED`
                      : 'CONNECTING 11 APIS...'}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => void refreshNow()}
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--border-subtle)] px-2.5 py-1 font-mono text-[10px] font-semibold text-[var(--text-ivory)] hover:border-[#D6A937]"
                >
                  <RefreshCw className={`w-3 h-3 text-[#D6A937] ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isId ? 'Refresh' : 'Sync'}</span>
                </button>
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                {isId ? 'Update Data: ' : 'Last Updated: '}
                <strong className="font-mono text-[var(--text-ivory)] block mt-0.5">
                  {lastUpdatedWibLabel}
                </strong>
              </div>
              {data?.fearAndGreed && (
                <div className="font-mono text-[10px] text-[#10B981] flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[#D6A937]" />
                  <span>
                    Fear & Greed Index: <strong>{data.fearAndGreed.value}/100 ({data.fearAndGreed.classification})</strong>
                  </span>
                </div>
              )}
              <div className="font-mono text-[10px] text-[var(--accent-gold)]">
                11 APIs: Yahoo OHLC + open.er-api + ECB + CFTC + FairEconomy + F&amp;G
              </div>
            </div>
          </div>

          {/* 6 Separated Sub-Hub Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSwitchTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-xs font-bold transition-all ${
                    isSelected
                      ? 'jgs-tab-active border-[#D6A937] shadow-md'
                      : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/60'
                  }`}
                >
                  {tab.icon}
                  <span className="whitespace-nowrap">{isId ? tab.labelId : tab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {/* ============================================================
            SUB-HUB 1: 100% LIMIT ORDER SIGNAL PROVIDER & JGS AUTONOMOUS DESK
            ============================================================ */}
        {activeTab === 'signals' && (
          <div className="space-y-7">
            {/* Live JGS Signal Provider Transparency Scoreboard */}
            <div className="rounded-3xl border-2 border-[#D6A937]/45 bg-gradient-to-br from-[#191423] via-[#130F1B] to-[#110D17] p-5 sm:p-6 space-y-4 text-[#F7F4EE]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#D6A937]">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>
                      {isId
                        ? 'MEJA EKSEKUSI OTONOM TERMINAL JGS (100% LIMIT ORDER & AUDIT TRANSPARAN)'
                        : 'JGS AUTONOMOUS EXECUTION DESK (100% LIMIT ORDERS & OPEN AUDIT)'}
                    </span>
                  </div>
                  <p className="text-xs text-[#BEB6CE]">
                    {isId
                      ? 'JGS dilarang mengejar candle dengan Market Order! Terminal kami memasang Pending BUY/SELL LIMIT di zona diskon/premium institusi dan mencatat terbuka seluruh Win maupun Loss.'
                      : 'Zero candle-chasing market orders. The JGS Desk strictly rests BUY/SELL LIMIT tickets at institutional Fib OTE / FVG zones and audits every Win and Loss transparently.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeskLedgerDrawer((v) => !v)}
                    className="rounded-xl border border-[#D6A937]/50 bg-[#D6A937]/15 px-3.5 py-2 font-mono text-xs font-bold text-[#F3E5AB] hover:bg-[#D6A937] hover:text-[#17131D] transition"
                  >
                    {showDeskLedgerDrawer
                      ? isId
                        ? 'Tutup Riwayat Audit Terminal'
                        : 'Hide Desk Audit Log'
                      : isId
                        ? `Buka Riwayat Audit Terminal (${deskSynced.deskRecords.length})`
                        : `Inspect Desk Audit Log (${deskSynced.deskRecords.length})`}
                  </button>
                  <Link
                    href={l('/journal')}
                    className="rounded-xl bg-[#10B981] text-[#09120F] px-3.5 py-2 font-mono text-xs font-extrabold hover:opacity-90 transition"
                  >
                    {isId ? 'Kalender Audit JGS ->' : 'Audit Calendar ->'}
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono tabular-nums">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 space-y-1">
                  <div className="text-[10px] text-[#BEB6CE] uppercase">TOTAL DIEKSEKUSI TERMINAL</div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#F7F4EE]">
                    {deskSynced.scoreboard.totalExecuted} Sinyal Aktif/Tutup
                  </div>
                </div>
                <div className="rounded-2xl border border-[#10B981]/35 bg-[#10B981]/10 p-3.5 space-y-1">
                  <div className="text-[10px] text-[#6EE7B7] uppercase">VERIFIED WIN RATE (HIT TP)</div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#10B981]">
                    {deskSynced.scoreboard.winRatePct}% ({deskSynced.scoreboard.winCount} Win • {deskSynced.scoreboard.lossCount} Loss)
                  </div>
                </div>
                <div className="rounded-2xl border border-[#D6A937]/35 bg-[#D6A937]/10 p-3.5 space-y-1">
                  <div className="text-[10px] text-[#F3E5AB] uppercase">NET AKUMULASI PIPS</div>
                  <div className={`text-lg sm:text-xl font-extrabold ${deskSynced.scoreboard.netPips >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                    {deskSynced.scoreboard.netPips >= 0 ? '+' : ''}
                    {deskSynced.scoreboard.netPips.toLocaleString('id-ID')} Pips Bersih
                  </div>
                </div>
                <div className="rounded-2xl border border-sky-400/35 bg-sky-500/10 p-3.5 space-y-1">
                  <div className="text-[10px] text-sky-300 uppercase">POSISI TERMINAL SAAT INI</div>
                  <div className="text-lg sm:text-xl font-extrabold text-sky-300">
                    {deskSynced.scoreboard.activeRunningCount} Running • {deskSynced.scoreboard.waitingLimitCount} Limit
                  </div>
                </div>
              </div>

              {showDeskLedgerDrawer && (
                <div className="pt-2 border-t border-white/10 space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#D6A937]">
                    BUKU BESAR EKSEKUSI TERMINAL JGS (MENAMPILKAN WIN & LOSS SECARA JUJUR)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {deskSynced.deskRecords.slice(0, 12).map((rec: JgsDeskOrderRecord) => (
                      <div
                        key={rec.id}
                        className="rounded-xl border border-white/10 bg-[#120E19] p-3 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2 font-mono">
                          <span className="font-bold text-[#F3E5AB]">
                            {rec.ticketId} • {rec.displaySymbol} ({rec.orderType})
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                              rec.state === 'CLOSED_WIN'
                                ? 'bg-[#10B981]/20 text-[#10B981]'
                                : rec.state === 'CLOSED_LOSS'
                                  ? 'bg-[#EF4444]/20 text-[#EF4444]'
                                  : rec.state === 'ACTIVE_RUNNING'
                                    ? 'bg-sky-500/20 text-sky-300'
                                    : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                            }`}
                          >
                            {rec.state === 'CLOSED_WIN'
                              ? `WIN +${rec.realizedPips} Pips`
                              : rec.state === 'CLOSED_LOSS'
                                ? `SL ${rec.realizedPips} Pips`
                                : rec.state === 'ACTIVE_RUNNING'
                                  ? 'RUNNING'
                                  : 'LIMIT TERPASANG'}
                          </span>
                        </div>
                        <div className="font-mono text-[10px] text-[#BEB6CE]">
                          Entry Limit: {rec.entryPrice.toFixed(rec.decimals)} | SL: {rec.stopLoss.toFixed(rec.decimals)} | TP2: {rec.takeProfit2.toFixed(rec.decimals)}
                        </div>
                        {rec.postMortemNoteId && (
                          <p className="text-[11px] text-[#D7D0E4]">
                            {isId ? rec.postMortemNoteId : rec.postMortemNoteEn}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Live Capital & Risk Sizing Strip Synced 100% to Live USD/IDR */}
            <div className="rounded-3xl border border-[#D6A937]/35 bg-[var(--bg-surface-1)] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                  {isId
                    ? 'PILIH MODAL BELAJAR & BATAS RISIKO OTOMATIS (SINKRON KURS LIVE)'
                    : 'SELECT PRACTICE CAPITAL & AUTO RISK LIMIT (LIVE USD/IDR)'}
                </div>
                <p className="font-mono text-xs text-[#10B981]">
                  {isId
                    ? `$${capitalUsdTier} (${capitalUsc.toLocaleString('id-ID')} USC) = ${formatUsdToIdr(capitalUsdTier)} • Max SL (${riskPct}%): ${formatUscToIdr((capitalUsc * riskPct) / 100)}`
                    : `$${capitalUsdTier} (${capitalUsc.toLocaleString('en-US')} USC) = ${formatUsdToIdr(capitalUsdTier)} • Risk (${riskPct}%)`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {([10, 30, 60] as const).map((usdVal) => (
                    <button
                      key={usdVal}
                      type="button"
                      onClick={() => setCapitalUsdTier(usdVal)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                        capitalUsdTier === usdVal
                          ? 'bg-[#D6A937] text-[#17131D] border-[#D6A937]'
                          : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      ${usdVal} = {(usdVal * 100).toLocaleString('id-ID')} USC ({formatUsdToIdr(usdVal)})
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  {[0.5, 1.0, 2.0].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setRiskPct(pct)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                        riskPct === pct
                          ? 'bg-[#10B981] text-[#09120F] border-[#10B981]'
                          : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      Risk {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 Dedicated Trading Style Tabs + Asset Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['SCALPING', isId ? 'Scalping Cepat (M1 – M5)' : 'Fast Scalping (M1 – M5)'],
                    ['INTRADAY', isId ? 'Intraday Harian (M15 – H1)' : 'Daily Intraday (M15 – H1)'],
                    ['SWING', isId ? 'Swing Santai (H4 – Daily)' : 'Swing Position (H4 – Daily)'],
                  ] as const
                ).map(([stKey, stLabel]) => (
                  <button
                    key={stKey}
                    type="button"
                    onClick={() => setStyleTab(stKey)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition ${
                      styleTab === stKey
                        ? 'jgs-tab-active border-[#D6A937] shadow-sm'
                        : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/50'
                    }`}
                  >
                    {stLabel}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'METALS', 'FOREX', 'INDICES', 'CRYPTO'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold border transition ${
                      categoryFilter === cat
                        ? 'bg-[#D6A937] text-[#17131D] border-[#D6A937]'
                        : 'bg-[var(--bg-surface-2)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:border-[#D6A937]/50'
                    }`}
                  >
                    {cat === 'ALL' ? (isId ? 'SEMUA PAIR' : 'ALL PAIRS') : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Live TradingView Widget Drawer (Fixed 403 Forbidden!) */}
            {chartSignal && (
              <div className="rounded-2xl border border-[#D6A937]/50 bg-[#120E19] p-4 sm:p-5 space-y-3 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="font-mono text-xs font-bold text-[#D6A937]">
                      LIVE TRADINGVIEW CHART 600PX • {chartSignal.displaySymbol} ({chartSignal.timeframeLabel})
                    </div>
                    <p className="text-xs text-[#C7BED8]">
                      {chartSignal.orderType} • Entry: {chartSignal.entryPrice} | SL: {chartSignal.stopLoss} | TP2: {chartSignal.takeProfit2}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://www.tradingview.com/chart/?symbol=${encodeURIComponent(chartSignal.tvSymbol)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-[#F7F4EE] hover:border-[#D6A937]"
                    >
                      <span>TradingView</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setChartSignal(null)}
                      className="rounded-lg bg-[#D6A937] text-[#17131D] px-3 py-1.5 text-xs font-bold"
                    >
                      {isId ? 'Tutup Grafik' : 'Close Chart'}
                    </button>
                  </div>
                </div>
                <TradingViewLiveWidget
                  symbol={chartSignal.tvSymbol}
                  interval={chartSignal.style === 'SCALPING' ? '5' : chartSignal.style === 'INTRADAY' ? '15' : '240'}
                  theme={themeMode === 'light' ? 'light' : 'dark'}
                  height={600}
                  locale={locale === 'id' ? 'id' : 'en'}
                />
              </div>
            )}

            {/* Signal Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {visibleSignals.map((sig) => {
                const isBuy = sig.direction === 'BUY';
                const isExpanded = expandedSignalId === sig.id;
                const fmt = (n: number) =>
                  n.toLocaleString('en-US', {
                    minimumFractionDigits: sig.decimals,
                    maximumFractionDigits: sig.decimals,
                  });

                if (!sig.available) {
                  return (
                    <SpotlightCard key={sig.id} className="p-5 sm:p-6 space-y-3 opacity-80">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xl font-extrabold text-[var(--text-ivory)]">
                          {sig.displaySymbol}
                        </span>
                        <span className="rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-3 py-1 font-mono text-[11px] font-bold text-[#F59E0B]">
                          {isId ? 'DATA LIVE BELUM TERSEDIA' : 'LIVE STREAM UNAVAILABLE'}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {isId
                          ? 'Feed OHLC real-time untuk pasangan ini tidak menjawab sementara. Sistem menolak mengarang angka sinyal palsu.'
                          : 'Real-time OHLC feed temporarily unavailable; system refuses to synthesize unverified price levels.'}
                      </p>
                    </SpotlightCard>
                  );
                }

                return (
                  <SpotlightCard key={sig.id} className="p-5 sm:p-6 space-y-4">
                    {/* Top Row: Symbol, Ticket ID, Live Spot & Limit Type */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-[#D6A937]/15 border border-[#D6A937]/40 px-2 py-0.5 font-mono text-[10px] font-bold text-[#D6A937]">
                            {sig.ticketId}
                          </span>
                          <span className="font-display text-xl sm:text-2xl font-extrabold text-[var(--text-ivory)]">
                            {sig.displaySymbol}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 font-mono text-[11px] font-extrabold ${
                              isBuy
                                ? 'bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981]'
                                : 'bg-[#EF4444]/20 border border-[#EF4444]/50 text-[#EF4444]'
                            }`}
                          >
                            {isBuy ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            <span>{sig.orderType}</span>
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-[var(--text-muted)]">
                          {sig.timeframeLabel} • {isId ? sig.zoneLabelId : sig.zoneLabelEn}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="inline-flex items-center gap-1.5 font-mono text-lg sm:text-xl font-extrabold text-[var(--text-ivory)] tabular-nums">
                          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span>{fmt(sig.livePrice)}</span>
                        </div>
                        <div
                          className={`font-mono text-[11px] font-bold ${
                            sig.changePct24h >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                          }`}
                        >
                          {sig.changePct24h >= 0 ? '+' : ''}
                          {sig.changePct24h}% (24j) • Live
                        </div>
                      </div>
                    </div>

                    {/* 4-State JGS Autonomous Desk Tracker */}
                    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-3.5 py-2.5 space-y-1.5 text-xs font-mono">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-2 font-bold">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              sig.status === 'CLOSED_WIN'
                                ? 'bg-[#10B981]'
                                : sig.status === 'CLOSED_LOSS'
                                  ? 'bg-[#EF4444]'
                                  : sig.status === 'ACTIVE_RUNNING'
                                    ? 'bg-sky-400 animate-pulse'
                                    : 'bg-[#F59E0B]'
                            }`}
                          />
                          <span className="text-[var(--text-ivory)]">
                            {sig.status === 'WAITING_FILL' &&
                              `LIMIT ORDER TERPASANG DI TERMINAL JGS (Jarak ${sig.distanceToLimitPips} Pips lagi)`}
                            {sig.status === 'ACTIVE_RUNNING' &&
                              `POSISI AKTIF BERJALAN (TERMINAL JGS ENTRY: ${sig.floatingPips >= 0 ? '+' : ''}${sig.floatingPips} Pips / ${sig.floatingUsc >= 0 ? '+' : ''}${sig.floatingUsc} USC / ${sig.floatingRp >= 0 ? '+' : ''}Rp${Math.abs(sig.floatingRp).toLocaleString('id-ID')})`}
                            {sig.status === 'CLOSED_WIN' &&
                              `CLOSED PROFIT (HIT TP VERIFIED WIN: +${sig.floatingPips} Pips)`}
                            {sig.status === 'CLOSED_LOSS' &&
                              `CLOSED LOSS (HIT SL TRANSPARAN: ${sig.floatingPips} Pips / -1R)`}
                          </span>
                        </span>
                        {sig.breakEvenProtected && (
                          <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                            SL+ BREAK-EVEN AKTIF
                          </span>
                        )}
                      </div>
                      {sig.status === 'WAITING_FILL' && (
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-[#F59E0B] transition-all duration-500"
                            style={{ width: `${Math.max(12, Math.min(92, 100 - sig.distanceToLimitPips))}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Exact Copy-Pasteable Limit Entry / SL / TP1 / TP2 Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 tabular-nums">
                      {[
                        {
                          key: 'entry',
                          label: `ZONA ${sig.orderType}`,
                          sub: `Antri Limit (${sig.distanceToLimitPips} Pips dari spot)`,
                          val: fmt(sig.entryPrice),
                          valClass: 'text-[var(--text-ivory)]',
                        },
                        {
                          key: 'sl',
                          label: 'STOP LOSS (SL)',
                          sub: sig.breakEvenProtected
                            ? `SL Geser BEP di ${fmt(sig.effectiveStopLoss)}`
                            : `-${sig.slPips} Pips (Wajib Pasang)`,
                          val: fmt(sig.breakEvenProtected ? sig.effectiveStopLoss : sig.stopLoss),
                          valClass: sig.breakEvenProtected ? 'text-[#10B981]' : 'text-[#EF4444]',
                        },
                        {
                          key: 'tp1',
                          label: 'TAKE PROFIT 1 (TP1)',
                          sub: `+${sig.tp1Pips} Pips (${sig.rrr1} • Geser SL+)`,
                          val: fmt(sig.takeProfit1),
                          valClass: 'text-[#10B981]',
                        },
                        {
                          key: 'tp2',
                          label: 'TAKE PROFIT 2 (TP2)',
                          sub: `+${sig.tp2Pips} Pips (${sig.rrr2} • Maksimal)`,
                          val: fmt(sig.takeProfit2),
                          valClass: 'text-[#10B981]',
                        },
                      ].map((row) => {
                        const cpId = `${sig.id}-${row.key}`;
                        const isCopied = copiedKey === cpId;
                        return (
                          <div
                            key={row.key}
                            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/80 px-3.5 py-2.5 flex items-center justify-between gap-2"
                          >
                            <div>
                              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                                {row.label}
                              </div>
                              <div className={`font-mono text-sm sm:text-base font-extrabold ${row.valClass}`}>
                                {row.val}
                              </div>
                              <div className="font-mono text-[10px] text-[var(--text-secondary)]">
                                {row.sub}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyPrice(cpId, String(row.key === 'entry' ? sig.entryPrice : row.key === 'sl' ? sig.stopLoss : row.key === 'tp1' ? sig.takeProfit1 : sig.takeProfit2))}
                              className="inline-flex items-center gap-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-2.5 py-1.5 font-mono text-[10px] font-bold text-[var(--accent-gold)] hover:border-[#D6A937] shrink-0"
                            >
                              {isCopied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                              <span>{isCopied ? 'Tersalin' : 'Salin'}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Live Kurs Lot & Rupiah Outcome Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-xl border border-[#D6A937]/30 bg-[#D6A937]/10 px-3.5 py-2.5 text-xs font-mono">
                      <div>
                        <span className="text-[var(--text-muted)]">Lot Aman: </span>
                        <strong className="text-[var(--accent-gold)]">
                          {sig.recommendedCentLot.toFixed(2)} Cent Lot
                        </strong>
                      </div>
                      <div>
                        <span className="text-[var(--text-muted)]">Risiko SL: </span>
                        <strong className="text-[#EF4444]">
                          -{sig.riskUsc} USC ({formatUscToIdr(-sig.riskUsc)})
                        </strong>
                      </div>
                      <div>
                        <span className="text-[var(--text-muted)]">Target TP2: </span>
                        <strong className="text-[#10B981]">
                          +{sig.tp2ProfitUsc} USC (+{formatUscToIdr(sig.tp2ProfitUsc)})
                        </strong>
                      </div>
                    </div>

                    {/* Actions Footer including + Follow Limit to Journal */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[var(--border-subtle)]">
                      <button
                        type="button"
                        onClick={() => setExpandedSignalId(isExpanded ? '' : sig.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D6A937] hover:underline"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        <span>
                          {isExpanded
                            ? isId
                              ? 'Sembunyikan 4 Alasan'
                              : 'Hide Reasons'
                            : isId
                              ? 'Lihat 4 Alasan Zona Limit'
                              : 'Inspect Limit Reasons'}
                        </span>
                      </button>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleFollowLimitToJournal(sig)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold border transition ${
                            followedTickets[sig.id]
                              ? 'bg-[#10B981] text-[#09120F] border-[#10B981]'
                              : 'border-[#10B981]/50 bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981] hover:text-[#09120F]'
                          }`}
                        >
                          {followedTickets[sig.id] ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>
                            {followedTickets[sig.id]
                              ? isId
                                ? 'Tersalin & Tercatat di Jurnal!'
                                : 'Copied & Logged!'
                              : isId
                                ? 'Ikut Pasang Limit & Catat ke Jurnal Saya'
                                : 'Copy Limit & Log to Journal'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setChartSignal(sig);
                            if (typeof window !== 'undefined') {
                              window.scrollTo({ top: 340, behavior: 'smooth' });
                            }
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#D6A937]/45 bg-[#D6A937]/10 px-3 py-1.5 text-xs font-bold text-[#D6A937] hover:bg-[#D6A937] hover:text-[#17131D] transition"
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>{isId ? 'Chart Live' : 'Live Chart'}</span>
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="rounded-xl border border-[#10B981]/30 bg-[var(--bg-surface-2)]/80 p-4 space-y-2">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
                          {isId
                            ? `4 PILAR ALASAN KONFIRMASI (${sig.timeframeLabel})`
                            : `4 CONFIRMATION PILLARS (${sig.timeframeLabel})`}
                        </div>
                        <ul className="space-y-1.5 text-xs jgs-prose-justify leading-[1.75] text-[var(--text-ivory)]">
                          {(isId ? sig.reasonsId : sig.reasonsEn).map((reason, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-HUB 2: DYNAMIC RADAR BIAS FUNDAMENTAL LIVE
            ============================================================ */}
        {activeTab === 'fundamental' && (
          <div className="space-y-8">
            {/* Live Timestamp & Live Macro Barometers */}
            <div className="rounded-2xl border border-[#D6A937]/35 bg-[var(--bg-surface-1)] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
                <div className="font-mono text-xs font-bold text-[#10B981] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>
                    {isId
                      ? `Update Real-Time: ${data?.macro?.updatedWibLabel ?? lastUpdatedWibLabel}`
                      : `Real-Time Update: ${data?.macro?.updatedWibLabel ?? lastUpdatedWibLabel}`}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  Yahoo Finance Live Benchmarks + Policy Rate Spreads
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    label: 'US10Y Treasury Yield',
                    val: data?.macro?.us10yYield ? `${data.macro.us10yYield.toFixed(3)}%` : 'Live Syncing...',
                    chg: data?.macro?.us10yChangePct ?? 0,
                  },
                  {
                    label: 'DXY US Dollar Index',
                    val: data?.macro?.dxyPrice ? data.macro.dxyPrice.toFixed(2) : 'Live Syncing...',
                    chg: data?.macro?.dxyChangePct ?? 0,
                  },
                  {
                    label: 'VIX Fear Gauge',
                    val: data?.macro?.vixLevel ? data.macro.vixLevel.toFixed(2) : 'Live Syncing...',
                    chg: data?.macro?.vixChangePct ?? 0,
                  },
                  {
                    label: 'Kurs USD / IDR Live',
                    val: `Rp${Math.round(usdIdrRate).toLocaleString('id-ID')}`,
                    chg: 0,
                  },
                ].map((bm) => (
                  <div
                    key={bm.label}
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-3.5 space-y-1"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      {bm.label}
                    </div>
                    <div className="font-mono text-lg font-extrabold text-[var(--text-ivory)] tabular-nums">
                      {bm.val}
                    </div>
                    {bm.chg !== 0 && (
                      <div
                        className={`font-mono text-[11px] font-bold ${
                          bm.chg >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                        }`}
                      >
                        {bm.chg >= 0 ? '+' : ''}
                        {bm.chg}% (24j)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {dynamicMacroBias.map((asset) => {
                const isBull = asset.score >= 0;
                const absScore = Math.min(100, Math.abs(asset.score));
                const biasBadge = `${isBull ? 'BULLISH' : 'BEARISH'} (${isBull ? '+' : ''}${asset.score})`;
                return (
                  <SpotlightCard key={asset.id} className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-xs text-[#D6A937] font-bold">{asset.symbol}</div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--text-ivory)]">
                          {isId ? asset.nameId : asset.nameEn}
                        </h2>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${
                          isBull
                            ? 'bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981]'
                            : 'bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#EF4444]'
                        }`}
                      >
                        {biasBadge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)]">
                        <span>-100 BEARISH</span>
                        <span>0 NETRAL</span>
                        <span>+100 BULLISH</span>
                      </div>
                      <div className="relative h-3 rounded-full bg-[var(--bg-surface-2)] overflow-hidden border border-[var(--border-subtle)]">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 z-10" />
                        <div
                          className={`absolute top-0 bottom-0 transition-all duration-500 ${
                            isBull ? 'left-1/2 bg-[#10B981]' : 'right-1/2 bg-[#EF4444]'
                          }`}
                          style={{ width: `${absScore / 2}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                      <p className="text-[var(--text-ivory)] font-mono font-semibold">
                        {asset.policyDiffNote}
                      </p>
                      <p className="jgs-prose-justify">{isId ? asset.driverId : asset.driverEn}</p>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>

            {/* Verified Source Directory */}
            <div className="rounded-3xl border border-[#D6A937]/35 bg-[var(--bg-surface-1)] p-6 sm:p-8 space-y-5">
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#D6A937]">
                  {isId ? 'SUMBER DATA MAKRO RESMI (AUDIT MANDIRI)' : 'VERIFIED PRIMARY DATA PORTALS'}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MACRO_DATA_SOURCES.map((src) => (
                  <a
                    key={src.id}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4 space-y-2 hover:border-[#D6A937] transition block group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#D6A937]">{src.institution}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[#D6A937] shrink-0" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-[var(--text-ivory)] leading-snug">
                      {isId ? src.metricNameId : src.metricNameEn}
                    </h3>
                    <p className="text-xs jgs-prose-justify leading-[1.7] text-[var(--text-secondary)]">
                      {isId ? src.whatToCheckId : src.whatToCheckEn}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-HUB 3: UPCOMING-ONLY SEGMENTED NEWS RADAR & HAWKISH/DOVISH COMPASS
            ============================================================ */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {/* Prominent Live WIB Date + Clock Banner + Next Countdown */}
            <div className="rounded-3xl border-2 border-[#D6A937]/45 bg-[var(--bg-surface-1)] p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-5 rounded-2xl border border-[#D6A937]/40 bg-[#17131D] p-5 space-y-1.5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D6A937]">
                  HARI INI • ZONA WAKTU WIB (JAKARTA)
                </div>
                <div className="font-mono text-base sm:text-lg font-extrabold text-[#F7F4EE]">
                  {clientNowWib || 'Memuat Jam WIB...'}
                </div>
                <div className="pt-2 border-t border-white/10 font-mono text-xs text-[#10B981]">
                  {nextUpcomingEvent
                    ? `Rilis Berikutnya (${nextCountdownStr}): ${nextUpcomingEvent.country} ${nextUpcomingEvent.title}`
                    : 'Memantau Rilis Terdekat Selanjutnya (WIB)'}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-2">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#EF4444]">
                  <ShieldAlert className="w-4 h-4" />
                  <span>
                    {isId
                      ? 'RADAR BERITA MENDATANG + SIKAP HAWKISH / DOVISH (-15m s/d +10m)'
                      : 'UPCOMING NEWS RADAR & HAWKISH/DOVISH COMPASS (-15M TO +10M)'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm jgs-prose-justify leading-[1.8] text-[var(--text-secondary)]">
                  {isId
                    ? 'Hanya menampilkan agenda ekonomi yang BELUM TERJADI agar kamu bersiap jauh sebelum detik rilis! Gunakan filter pair di bawah untuk melihat sikap Bank Sentral (HAWKISH vs DOVISH) serta zona BUY LIMIT / SELL LIMIT yang tepat 15 menit pasca rilis.'
                    : 'Exclusively highlights upcoming macroeconomic events with live ticking countdowns, Hawkish/Dovish policy stances, and pair-segmented Limit Order playbooks.'}
                </p>
              </div>
            </div>

            {/* 8 Pair / Currency Segmentation Tabs */}
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ['ALL', isId ? 'Semua Pair Utama' : 'All Majors'],
                  ['XAUUSD', isId ? 'Khusus XAUUSD (Emas)' : 'XAUUSD Gold'],
                  ['USD', isId ? 'Khusus USD (Dolar AS)' : 'USD Dollar'],
                  ['GBP', isId ? 'Khusus GBP (Poundsterling)' : 'GBP Pound'],
                  ['JPY', isId ? 'Khusus JPY (Yen Jepang)' : 'JPY Yen'],
                  ['EUR', isId ? 'Khusus EUR (Euro)' : 'EUR Euro'],
                  ['NAS100', 'Khusus NAS100 / USTEC'],
                  ['BTC', 'Khusus BTC & Crypto'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setNewsPairFilter(key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                    newsPairFilter === key
                      ? 'bg-[#D6A937] text-[#17131D] border-[#D6A937] shadow-sm'
                      : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/60'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Strictly Upcoming News Events with 1-Second Live Countdown */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-ivory)]">
                  {isId
                    ? `Agenda Rilis Akan Datang (${filteredCalendarGroups.upcoming.length} Berita Mendatang)`
                    : `Upcoming Releases Only (${filteredCalendarGroups.upcoming.length} Scheduled)`}
                </h2>
                {filteredCalendarGroups.released.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowReleasedArchive((v) => !v)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-3.5 py-2 font-mono text-xs font-bold text-[var(--text-secondary)] hover:border-[#D6A937]"
                  >
                    <Archive className="w-3.5 h-3.5 text-[#D6A937]" />
                    <span>
                      {showReleasedArchive
                        ? isId
                          ? 'Sembunyikan Arsip Berita Sudah Rilis'
                          : 'Hide Released Archive'
                        : isId
                          ? `Lihat Arsip Berita yang Sudah Rilis (${filteredCalendarGroups.released.length})`
                          : `View Released News Archive (${filteredCalendarGroups.released.length})`}
                    </span>
                  </button>
                )}
              </div>

              {filteredCalendarGroups.upcoming.length === 0 && (
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 text-sm text-[var(--text-secondary)]">
                  {isId
                    ? 'Tidak ada lagi agenda tersisa minggu ini untuk filter pair ini (pasar bersiap menuju jadwal minggu depan). Kamu bisa memeriksa arsip berita yang sudah rilis melalui tombol di atas.'
                    : 'No remaining releases left this week for this pair filter. Check the released archive above or switch back to All Majors.'}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {filteredCalendarGroups.upcoming.map((ev) => {
                  const pairCompassText = getPairSpecificNewsBrief(ev, newsPairFilter, isId);
                  return (
                    <SpotlightCard key={ev.id} className="p-5 sm:p-6 space-y-4 border-[#D6A937]/30">
                      {/* Live Countdown Strip */}
                      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#10B981]/35 bg-[#10B981]/10 px-4 py-2.5 font-mono text-xs">
                        <span className="font-extrabold text-[#10B981] inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 animate-pulse" />
                          <span>AKAN RILIS DALAM: {formatCountdownWib(ev.isoDate, clientNowMs)}</span>
                        </span>
                        <span className="font-bold text-[var(--accent-gold)]">{ev.wibFullDateLabel}</span>
                      </div>

                      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-md px-2.5 py-0.5 font-mono text-[10px] font-bold border ${
                                ev.impact === 'High'
                                  ? 'bg-[#EF4444]/15 border-[#EF4444]/40 text-[#EF4444]'
                                  : ev.impact === 'Medium'
                                    ? 'bg-[#F59E0B]/15 border-[#F59E0B]/40 text-[#F59E0B]'
                                    : 'bg-sky-500/15 border-sky-500/40 text-sky-300'
                              }`}
                            >
                              {ev.impact.toUpperCase()} IMPACT
                            </span>
                            <span className="rounded-md bg-[#D6A937]/15 border border-[#D6A937]/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#D6A937]">
                              {ev.country}
                            </span>
                            <span
                              className={`rounded-md px-2.5 py-0.5 font-mono text-[10px] font-extrabold border ${
                                ev.monetaryStance === 'HAWKISH'
                                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                                  : ev.monetaryStance === 'DOVISH'
                                    ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
                                    : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                              }`}
                            >
                              {isId ? ev.stanceLabelId : ev.stanceLabelEn}
                            </span>
                          </div>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-ivory)]">
                            {ev.title}
                          </h3>
                        </div>
                      </div>

                      {/* Forecast vs Previous Projection Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-3 font-mono text-xs tabular-nums">
                        <div>
                          <span className="block text-[10px] text-[var(--text-muted)]">SEBELUMNYA (PREVIOUS)</span>
                          <strong className="text-sm text-[var(--text-secondary)]">{ev.previous || '-'}</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] text-[var(--text-muted)]">PREDIKSI (FORECAST)</span>
                          <strong className="text-sm text-[var(--text-ivory)]">{ev.forecast || '-'}</strong>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <span className="block text-[10px] text-[var(--text-muted)]">STATUS RILIS</span>
                          <strong className="text-sm text-[#10B981]">{isId ? 'Menunggu Rilis' : 'Pending'}</strong>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm jgs-prose-justify leading-[1.8] text-[var(--text-secondary)]">
                        {isId ? ev.plainExplainId : ev.plainExplainEn}{' '}
                        <strong className="text-[var(--text-ivory)]">
                          {isId ? ev.stanceExplainId : ev.stanceExplainEn}
                        </strong>
                      </p>

                      {/* Explicit Action Bias + Playbook Compass */}
                      <div className="rounded-2xl border border-[#10B981]/45 bg-[#10B981]/10 p-4 space-y-1.5">
                        <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#10B981]">
                          {isId ? ev.actionBiasId : ev.actionBiasEn}
                        </div>
                        <p className="text-xs sm:text-sm font-medium leading-relaxed text-[var(--text-ivory)]">
                          {pairCompassText}
                        </p>
                      </div>
                    </SpotlightCard>
                  );
                })}
              </div>

              {/* Collapsible Released Archive */}
              {showReleasedArchive && filteredCalendarGroups.released.length > 0 && (
                <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 sm:p-6 space-y-3">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    ARSIP BERITA YANG SUDAH RILIS MINGGU INI ({filteredCalendarGroups.released.length})
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredCalendarGroups.released.map((ev) => (
                      <div
                        key={ev.id}
                        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-3.5 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-[var(--text-muted)]">
                          <span>{ev.country} • {ev.impact}</span>
                          <span>{ev.wibFullDateLabel}</span>
                        </div>
                        <div className="font-bold text-[var(--text-ivory)]">{ev.title}</div>
                        <div className="font-mono text-[11px] text-[#D6A937]">
                          Aktual: {ev.actual || '-'} | Prediksi: {ev.forecast || '-'} | Sebelumnya: {ev.previous || '-'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Live Financial Headlines Feed */}
            {data?.headlines && data.headlines.length > 0 && (
              <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#D6A937]">
                  HEADLINE PASAR KEUANGAN GLOBAL TERBARU (YAHOO FINANCE LIVE)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.headlines.map((hd) => (
                    <a
                      key={hd.id}
                      href={hd.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4 space-y-1.5 hover:border-[#D6A937] transition block"
                    >
                      <div className="font-mono text-[10px] text-[var(--accent-gold)]">
                        {hd.wibFullDateLabel} • {hd.publisher}
                      </div>
                      <div className="text-sm font-bold text-[var(--text-ivory)] leading-snug">
                        {hd.title}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            SUB-HUB 4: KALENDER EKONOMI LIVE (WIB)
            ============================================================ */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { session: 'Asia / Tokyo', wib: '06:00 - 13:30 WIB', noteId: 'Range Pagi (Asian High/Low)', noteEn: 'Asian range formation' },
                { session: 'London Killzone', wib: '14:00 - 17:30 WIB', noteId: 'Likuiditas EURUSD & XAUUSD', noteEn: 'London session sweeps' },
                { session: 'New York News', wib: '19:30 - 23:00 WIB', noteId: 'Rilis CPI/NFP & Wall Street', noteEn: 'US macro & NYSE open' },
                { session: 'Rollover Spread', wib: '04:00 - 05:00 WIB', noteId: 'Hindari entry saat spread melebar', noteEn: 'Rollover thin spread hours' },
              ].map((slot) => (
                <div key={slot.session} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-4 space-y-1">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#D6A937]">{slot.session}</div>
                  <div className="font-display text-sm sm:text-base font-bold text-[var(--text-ivory)]">{slot.wib}</div>
                  <p className="text-[11px] text-[var(--text-secondary)]">{isId ? slot.noteId : slot.noteEn}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#D6A937]/35 bg-[var(--bg-surface-1)] p-5 sm:p-6 space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#D6A937] flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{isId ? 'KALENDER EKONOMI DUNIA LIVE (TRADINGVIEW WIDGET)' : 'LIVE WORLD ECONOMIC CALENDAR'}</span>
              </div>
              <div
                ref={tvCalendarRef}
                className="tradingview-widget-container w-full rounded-xl overflow-hidden border border-[var(--border-subtle)] min-h-[600px]"
              />
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-HUB 5: OFFICIAL CFTC COT DATA VS RETAIL PROXY
            ============================================================ */}
        {activeTab === 'cot' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#D6A937]/35 bg-[var(--bg-surface-1)] p-5 sm:p-6 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-ivory)]">
                  {isId
                    ? 'Data Resmi CFTC Commitments of Traders (COT) AS vs Posisi Ritel'
                    : 'Official US CFTC Commitments of Traders (COT) Open Data'}
                </h2>
                <span className="rounded-full bg-[#10B981]/15 border border-[#10B981]/40 px-3 py-1 font-mono text-[10px] font-bold text-[#10B981]">
                  {data?.cotReports && data.cotReports.length > 0
                    ? `LIVE CFTC SOCRATA API (${data.cotReports[0].reportDateIso})`
                    : 'BASELINE FALLBACK'}
                </span>
              </div>
              <p className="text-xs sm:text-sm jgs-prose-justify leading-[1.8] text-[var(--text-secondary)]">
                {isId
                  ? 'Angka kontrak di bawah ini ditarik langsung dari API publik pemerintah AS (publicreporting.cftc.gov) membandingkan spekulan besar institusional (Non-Commercial / Asset Manager + Leveraged Funds) melawan spekulan ritel kecil (Non-Reportable).'
                  : 'Contracts below stream directly from official US CFTC Open Data API comparing Large Institutional speculators against Non-Reportable small retail positions.'}
              </p>
            </div>

            {data?.futuresPositioning && data.futuresPositioning.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.futuresPositioning.map((fp) => (
                  <SpotlightCard key={fp.symbol} className="p-4 space-y-2.5 border-sky-500/35">
                    <div className="flex items-center justify-between font-mono text-xs font-bold">
                      <span className="text-[var(--text-ivory)]">{fp.symbol} PERP (BINANCE FUTURES)</span>
                      <span className="text-[#10B981]">LIVE WHALE RATIO</span>
                    </div>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[#10B981]">Whale Top Trader Long: {fp.topTraderLongPct}%</span>
                        <span className="text-[#EF4444]">Short: {fp.topTraderShortPct}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sky-400">Akun Ritel Global Long: {fp.retailLongPct}%</span>
                        <span className="text-[#F59E0B]">Short: {fp.retailShortPct}%</span>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            )}

            {data?.cotReports && data.cotReports.length > 0 ? (
              <div className="grid grid-cols-1 gap-5">
                {data.cotReports.map((row) => {
                  const instShortPct = 100 - row.instLongPct;
                  const retailShortPct = 100 - row.retailLongPct;
                  return (
                    <SpotlightCard key={row.id} className="p-5 sm:p-6 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-ivory)]">
                            {row.asset}
                          </h3>
                          <div className="font-mono text-[11px] text-[var(--text-muted)]">
                            Code #{row.code} ({row.dataset}) • {row.reportWeekLabel} ({row.reportDateIso})
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs font-bold text-[#D6A937]">
                            Delta Mingguan: {row.weeklyNetDelta >= 0 ? '+' : ''}
                            {row.weeklyNetDelta.toLocaleString('id-ID')} Kontrak
                          </span>
                          {row.divergenceTriggered && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/50 px-3 py-1 font-mono text-[11px] font-bold text-[#FCA5A5]">
                              <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
                              <span>DIVERGENSI INSTITUSI vs RITEL</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-3 font-mono text-xs tabular-nums">
                        <div>
                          <span className="block text-[10px] text-[var(--text-muted)]">OPEN INTEREST</span>
                          <strong className="text-[var(--text-ivory)]">{row.openInterest.toLocaleString('id-ID')}</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] text-[var(--text-muted)]">INSTITUSI NET</span>
                          <strong className={row.instNet >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                            {row.instNet >= 0 ? '+' : ''}{row.instNet.toLocaleString('id-ID')}
                          </strong>
                        </div>
                        <div>
                          <span className="block text-[10px] text-[var(--text-muted)]">INSTITUSI LONG / SHORT</span>
                          <strong className="text-[var(--text-ivory)]">
                            {row.instLong.toLocaleString('id-ID')} / {row.instShort.toLocaleString('id-ID')}
                          </strong>
                        </div>
                        <div>
                          <span className="block text-[10px] text-[var(--text-muted)]">RITEL KECIL L / S</span>
                          <strong className="text-[var(--text-ivory)]">
                            {row.retailLong.toLocaleString('id-ID')} / {row.retailShort.toLocaleString('id-ID')}
                          </strong>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] p-3.5">
                          <div className="flex justify-between font-mono text-xs font-bold">
                            <span className="text-[#10B981]">INSTITUSI LONG: {row.instLongPct}%</span>
                            <span className="text-[#EF4444]">SHORT: {instShortPct}%</span>
                          </div>
                          <div className="h-3 rounded-full overflow-hidden flex bg-[#EF4444]">
                            <div className="h-full bg-[#10B981]" style={{ width: `${row.instLongPct}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] p-3.5">
                          <div className="flex justify-between font-mono text-xs font-bold">
                            <span className="text-[#60A5FA]">RITEL KECIL LONG: {row.retailLongPct}%</span>
                            <span className="text-[#F59E0B]">SHORT: {retailShortPct}%</span>
                          </div>
                          <div className="h-3 rounded-full overflow-hidden flex bg-[#F59E0B]">
                            <div className="h-full bg-[#60A5FA]" style={{ width: `${row.retailLongPct}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <a
                          href={row.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-[#D6A937] hover:underline"
                        >
                          <span>Audit Raw CFTC JSON</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </SpotlightCard>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {COT_POSITIONING_ROWS.map((row) => (
                  <SpotlightCard key={row.id} className="p-5 space-y-2">
                    <div className="font-display font-bold text-[var(--text-ivory)]">{row.asset}</div>
                    <p className="text-xs text-[var(--text-secondary)]">{isId ? row.summaryId : row.summaryEn}</p>
                  </SpotlightCard>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            SUB-HUB 6: BROKER GUIDE
            ============================================================ */}
        {activeTab === 'brokers' && (
          <div className="-mt-6">
            <BrokerRecommendationHub />
          </div>
        )}

        {/* Cross-Ecosystem Footer */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-mono text-[11px] font-bold text-[#D6A937] uppercase tracking-wider">
              {isId ? 'TERHUBUNG DENGAN AKADEMI & KALKULATOR JGS' : 'INTEGRATED ACROSS JGS ECOSYSTEM'}
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {isId
                ? 'Hitung exact lot akun Cent sesuai kurs USD/IDR live sebelum order, atau pelajari Semester 16 & Semester 18 di JGS Academy.'
                : 'Calculate exact Cent lots synced to live USD/IDR before placing trades or review Semester 16 & Semester 18 inside JGS Academy.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={l('/calculators/cent')} className="jgs-btn-gold text-xs px-4 py-2.5">
              <span>{isId ? 'Buka Kalkulator 1.000 USC' : 'Open 1,000 USC Calculator'}</span>
            </Link>
            <Link href={l('/academy')} className="jgs-btn-outline text-xs px-4 py-2.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isId ? 'Kurikulum 20 Semester' : '20-Semester Academy'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
