'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  RotateCcw,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import {
  computeJournalAnalytics,
  type JournalEmotion,
  type TradeJournalItem,
} from '@/lib/math/journal-analytics';
import {
  EDUCATIONAL_SAMPLE_JOURNAL_ENTRIES,
  loadCompletedLessonSlugs,
  loadJournalEntries,
  saveJournalEntries,
} from '@/lib/storage/jgs-local-store';
import {
  loadJgsDeskLedger,
  type JgsDeskOrderRecord,
} from '@/lib/signals/jgs-execution-desk';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';
import { LiveKursPill } from '@/components/market/LiveKursPill';
import { useLocale } from '@/i18n/LocaleContext';

type HonestAuditBadgeId = 'SOP' | 'FOMO' | 'SL_SLIP' | 'REVENGE';
type JournalCalendarMode = 'TERMINAL_AUDIT' | 'PERSONAL_JOURNAL';

const EXTRA_DEMO_DAYS: TradeJournalItem[] = [
  {
    id: 'sample-cal-5',
    tradedAt: '2026-11-04 14:40',
    instrument: 'XAUUSDc',
    accountMode: 'CENT_USC',
    direction: 'LONG',
    entryPrice: 3972.0,
    stopLoss: 3967.0,
    takeProfit: 3987.0,
    exitPrice: 3987.0,
    lotSize: 0.02,
    realizedPnl: 30.0,
    realizedRMultiple: 3.0,
    setupTag: 'Scalping M5 (London Sweep)',
    emotionTag: 'DISCIPLINED',
    ruleFollowedStopLoss: true,
    ruleProperLotSize: true,
    ruleWaitedConfirmation: true,
    ruleWithinDailyLimit: true,
    notes: 'Masuk tepat di FVG M5 setelah sapuan low Asia. Target 1:3 tercapai bersih.',
  },
  {
    id: 'sample-cal-6',
    tradedAt: '2026-11-11 20:10',
    instrument: 'USDJPYc',
    accountMode: 'CENT_USC',
    direction: 'SHORT',
    entryPrice: 153.4,
    stopLoss: 153.75,
    takeProfit: 152.35,
    exitPrice: 152.5,
    lotSize: 0.04,
    realizedPnl: 36.0,
    realizedRMultiple: 2.57,
    setupTag: 'Intraday M15 Supply Rejection',
    emotionTag: 'DISCIPLINED',
    ruleFollowedStopLoss: true,
    ruleProperLotSize: true,
    ruleWaitedConfirmation: true,
    ruleWithinDailyLimit: true,
    notes: 'Mengikuti bias fundamental US10Y & penolakan High NY Open dengan risiko <= 1%.',
  },
];

const INITIAL_SIX_DAY_SAMPLES: TradeJournalItem[] = [
  ...EDUCATIONAL_SAMPLE_JOURNAL_ENTRIES.map((e) => ({
    ...e,
    instrument: e.instrument.endsWith('c') ? e.instrument : `${e.instrument}c`,
  })),
  ...EXTRA_DEMO_DAYS,
];

const PAIR_STYLE_PRESETS = [
  'XAUUSDc (Scalping M5)',
  'XAUUSDc (Intraday H1)',
  'EURUSDc (London Session)',
  'USDJPYc (NY Killzone)',
  'USTECc (Wall Street 20:45)',
  'BTCUSDTc (ETF Flow)',
];

const HONEST_AUDIT_OPTIONS: {
  id: HonestAuditBadgeId;
  labelId: string;
  labelEn: string;
  emotionTag: JournalEmotion;
  descId: string;
  descEn: string;
  colorClass: string;
}[] = [
  {
    id: 'SOP',
    labelId: 'Disiplin Sesuai SOP',
    labelEn: 'Disciplined On SOP',
    emotionTag: 'DISCIPLINED',
    descId: 'Menunggu konfirmasi, SL tetap & ukuran lot <= 1%.',
    descEn: 'Waited for trigger, kept hard stop & <= 1% sizing.',
    colorClass: 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]',
  },
  {
    id: 'FOMO',
    labelId: 'Masuk Kecepatan (FOMO)',
    labelEn: 'Entered Early (FOMO)',
    emotionTag: 'FOMO',
    descId: 'Mengejar candle hijau/merah sebelum penutupan M5 valid.',
    descEn: 'Chased candle prior to confirmed structure break.',
    colorClass: 'border-[#F59E0B] bg-[#F59E0B]/15 text-[#F59E0B]',
  },
  {
    id: 'SL_SLIP',
    labelId: 'Geser Stop Loss',
    labelEn: 'Moved Stop Loss',
    emotionTag: 'HESITANT',
    descId: 'Melebarkan garis SL saat harga mendekat, melanggar proteksi.',
    descEn: 'Widened stop loss manually instead of accepting -1R.',
    colorClass: 'border-[#EF4444] bg-[#EF4444]/15 text-[#EF4444]',
  },
  {
    id: 'REVENGE',
    labelId: 'Balas Dendam (Overtrade)',
    labelEn: 'Revenge / Overtrade',
    emotionTag: 'REVENGE',
    descId: 'Langsung buka posisi baru tergesa-gesa setelah kena SL.',
    descEn: 'Opened impulsive re-entry right after a planned loss.',
    colorClass: 'border-[#EF4444] bg-[#EF4444]/15 text-[#EF4444]',
  },
];

function extractDateKey(tradedAt: string): string {
  const m = tradedAt.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : '2026-11-12';
}

function resolveBadgeLabel(item: TradeJournalItem, isId: boolean): { text: string; isClean: boolean } {
  if (item.emotionTag === 'DISCIPLINED' || item.emotionTag === 'CALM') {
    return {
      text: isId ? 'Disiplin Sesuai SOP' : 'Disciplined SOP',
      isClean: item.ruleFollowedStopLoss && item.ruleWaitedConfirmation && item.ruleWithinDailyLimit,
    };
  }
  if (item.emotionTag === 'FOMO') {
    return { text: isId ? 'Masuk Kecepatan (FOMO)' : 'FOMO Entry', isClean: false };
  }
  if (item.emotionTag === 'REVENGE') {
    return { text: isId ? 'Balas Dendam (Overtrade)' : 'Revenge Overtrade', isClean: false };
  }
  if (!item.ruleFollowedStopLoss) {
    return { text: isId ? 'Geser Stop Loss' : 'Moved Stop Loss', isClean: false };
  }
  return { text: item.emotionTag, isClean: true };
}

export function TraderJournalWorkspace() {
  const { isId, l } = useLocale();
  const { rpPerUsc, formatUscToIdr } = useLiveCurrency();

  const [calendarTab, setCalendarTab] = useState<JournalCalendarMode>('TERMINAL_AUDIT');
  const [deskLedger, setDeskLedger] = useState<JgsDeskOrderRecord[]>([]);
  const [entries, setEntries] = useState<TradeJournalItem[]>(INITIAL_SIX_DAY_SAMPLES);
  const [completedCount, setCompletedCount] = useState<number>(0);

  // Active calendar view month (year, zero-based month -> 2026-11 = year 2026, month 10)
  const [viewYear, setViewYear] = useState<number>(2026);
  const [viewMonthIdx, setViewMonthIdx] = useState<number>(10); // November 2026
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);

  // "Catat Cepat 3 Detik" Modal / Drawer State
  const [isQuickModalOpen, setIsQuickModalOpen] = useState<boolean>(false);
  const [quickDateKey, setQuickDateKey] = useState<string>('2026-11-12');
  const [quickPairPreset, setQuickPairPreset] = useState<string>(PAIR_STYLE_PRESETS[0]);
  const [quickDirection, setQuickDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [quickPnlUsc, setQuickPnlUsc] = useState<string>('20');
  const [quickAuditBadge, setQuickAuditBadge] = useState<HonestAuditBadgeId>('SOP');
  const [quickNote, setQuickNote] = useState<string>('');
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadJournalEntries();
    if (stored.length > 0) {
      setEntries(stored);
    } else {
      saveJournalEntries(INITIAL_SIX_DAY_SAMPLES);
      setEntries(INITIAL_SIX_DAY_SAMPLES);
    }
    setDeskLedger(loadJgsDeskLedger());
    setCompletedCount(loadCompletedLessonSlugs().length);
  }, []);

  const monthKeyPrefix = `${viewYear}-${String(viewMonthIdx + 1).padStart(2, '0')}`;
  const monthEntries = useMemo(
    () => entries.filter((e) => extractDateKey(e.tradedAt).startsWith(monthKeyPrefix)),
    [entries, monthKeyPrefix]
  );

  const monthlyStats = useMemo(() => computeJournalAnalytics(monthEntries), [monthEntries]);

  // Aggregate daily PnL & count per dateKey ("YYYY-MM-DD")
  const dailySummaryMap = useMemo(() => {
    const map: Record<string, { pnlUsc: number; count: number; items: TradeJournalItem[] }> = {};
    for (const item of monthEntries) {
      const k = extractDateKey(item.tradedAt);
      if (!map[k]) {
        map[k] = { pnlUsc: 0, count: 0, items: [] };
      }
      map[k].pnlUsc = Number((map[k].pnlUsc + item.realizedPnl).toFixed(2));
      map[k].count += 1;
      map[k].items.push(item);
    }
    return map;
  }, [monthEntries]);

  const profitDaysCount = useMemo(
    () => Object.values(dailySummaryMap).filter((d) => d.pnlUsc > 0).length,
    [dailySummaryMap]
  );
  const lossDaysCount = useMemo(
    () => Object.values(dailySummaryMap).filter((d) => d.pnlUsc < 0).length,
    [dailySummaryMap]
  );

  // Build Monday-Sunday calendar cells for current month
  const calendarCells = useMemo(() => {
    const firstDayJs = new Date(viewYear, viewMonthIdx, 1).getDay(); // 0=Sun..6=Sat
    const mondayOffset = (firstDayJs + 6) % 7; // Mon=0..Sun=6
    const daysInMonth = new Date(viewYear, viewMonthIdx + 1, 0).getDate();

    const cells: { dayNum: number | null; dateKey: string | null }[] = [];
    for (let i = 0; i < mondayOffset; i++) {
      cells.push({ dayNum: null, dateKey: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${monthKeyPrefix}-${String(d).padStart(2, '0')}`;
      cells.push({ dayNum: d, dateKey: key });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ dayNum: null, dateKey: null });
    }
    return cells;
  }, [viewYear, viewMonthIdx, monthKeyPrefix]);

  const monthTitle = new Date(viewYear, viewMonthIdx, 1).toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    month: 'long',
    year: 'numeric',
  });

  function shiftMonth(delta: number) {
    const dt = new Date(viewYear, viewMonthIdx + delta, 1);
    setViewYear(dt.getFullYear());
    setViewMonthIdx(dt.getMonth());
    setSelectedDayKey(null);
  }

  function openQuickLogForDate(dateKey: string) {
    setSelectedDayKey(dateKey);
    setQuickDateKey(dateKey);
    setQuickPnlUsc('20');
    setQuickAuditBadge('SOP');
    setQuickNote('');
    setIsQuickModalOpen(true);
  }

  function handleSaveQuickLog(e: React.FormEvent) {
    e.preventDefault();
    const numericPnl = Number(quickPnlUsc);
    if (!Number.isFinite(numericPnl)) return;

    const cleanPreset = quickPairPreset.trim();
    const pairSymbol = cleanPreset.split(' ')[0] || 'XAUUSDc';
    const selectedAudit =
      HONEST_AUDIT_OPTIONS.find((opt) => opt.id === quickAuditBadge) ?? HONEST_AUDIT_OPTIONS[0];

    const absPnl = Math.max(1, Math.abs(numericPnl));
    const estR = Number((numericPnl / 10).toFixed(2));
    const baseEntry = pairSymbol.includes('EUR') ? 1.0845 : pairSymbol.includes('JPY') ? 153.2 : 3985.5;
    const riskDist = pairSymbol.includes('EUR') ? 0.002 : pairSymbol.includes('JPY') ? 0.35 : 5.0;
    const isBuy = quickDirection === 'LONG';
    const sl = isBuy ? baseEntry - riskDist : baseEntry + riskDist;
    const exit = isBuy
      ? baseEntry + estR * riskDist
      : baseEntry - estR * riskDist;

    const newTrade: TradeJournalItem = {
      id: `cal-${Date.now()}`,
      tradedAt: `${quickDateKey} 19:45`,
      instrument: pairSymbol,
      accountMode: 'CENT_USC',
      direction: quickDirection,
      entryPrice: Number(baseEntry.toFixed(4)),
      stopLoss: Number(sl.toFixed(4)),
      takeProfit: Number((isBuy ? baseEntry + riskDist * 2 : baseEntry - riskDist * 2).toFixed(4)),
      exitPrice: Number(exit.toFixed(4)),
      lotSize: 0.02,
      realizedPnl: Number(numericPnl.toFixed(1)),
      realizedRMultiple: estR,
      setupTag: cleanPreset,
      emotionTag: selectedAudit.emotionTag,
      ruleFollowedStopLoss: quickAuditBadge !== 'SL_SLIP',
      ruleProperLotSize: absPnl <= 80,
      ruleWaitedConfirmation: quickAuditBadge !== 'FOMO',
      ruleWithinDailyLimit: quickAuditBadge !== 'REVENGE',
      notes:
        quickNote.trim() ||
        (isId
          ? `${selectedAudit.labelId} (${cleanPreset})`
          : `${selectedAudit.labelEn} (${cleanPreset})`),
    };

    const next = [newTrade, ...entries];
    setEntries(next);
    saveJournalEntries(next);
    setIsQuickModalOpen(false);
    setFeedbackBanner(
      isId
        ? `Tersimpan di ${quickDateKey}: ${pairSymbol} (${numericPnl >= 0 ? '+' : ''}${numericPnl} USC)`
        : `Saved on ${quickDateKey}: ${pairSymbol} (${numericPnl >= 0 ? '+' : ''}${numericPnl} USC)`
    );
    setTimeout(() => setFeedbackBanner(null), 4000);
  }

  function handleDeleteEntry(id: string) {
    const next = entries.filter((item) => item.id !== id);
    setEntries(next);
    saveJournalEntries(next);
  }

  function handleLoadDemoSamples() {
    setEntries(INITIAL_SIX_DAY_SAMPLES);
    saveJournalEntries(INITIAL_SIX_DAY_SAMPLES);
    setViewYear(2026);
    setViewMonthIdx(10);
    setSelectedDayKey(null);
  }

  function handleExportCsv() {
    const esc = (v: string) => `"${(v || '').replace(/"/g, '""')}"`;
    const headers = ['Date', 'Pair', 'Direction', 'PnL_USC', 'PnL_IDR', 'Setup', 'Emotion', 'Notes'];
    const rows = entries.map((item) =>
      [
        item.tradedAt,
        esc(item.instrument),
        item.direction,
        item.realizedPnl,
        Math.round(item.realizedPnl * rpPerUsc),
        esc(item.setupTag),
        item.emotionTag,
        esc(item.notes || ''),
      ].join(',')
    );
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jgs-pnl-calendar-${monthKeyPrefix}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const displayedHistory = useMemo(() => {
    if (selectedDayKey) {
      return monthEntries.filter((e) => extractDateKey(e.tradedAt) === selectedDayKey);
    }
    return monthEntries;
  }, [monthEntries, selectedDayKey]);

  const netPnlRp = Math.round(monthlyStats.netPnl * rpPerUsc);
  const netUsd = Number((monthlyStats.netPnl / 100).toFixed(2));
  const weekdays = isId
    ? ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const quickPnlNum = Number(quickPnlUsc) || 0;
  const quickPnlRpPreview = Math.round(quickPnlNum * rpPerUsc);

  const monthDeskRecords = useMemo(
    () => deskLedger.filter((rec) => rec.issuedDateKey.startsWith(monthKeyPrefix)),
    [deskLedger, monthKeyPrefix]
  );

  const deskDailySummaryMap = useMemo(() => {
    const map: Record<string, { netPips: number; wins: number; losses: number; active: number; items: JgsDeskOrderRecord[] }> = {};
    for (const rec of monthDeskRecords) {
      const k = rec.issuedDateKey;
      if (!map[k]) map[k] = { netPips: 0, wins: 0, losses: 0, active: 0, items: [] };
      if (rec.state === 'CLOSED_WIN') {
        map[k].netPips += rec.realizedPips;
        map[k].wins += 1;
      } else if (rec.state === 'CLOSED_LOSS') {
        map[k].netPips += rec.realizedPips;
        map[k].losses += 1;
      } else if (rec.state === 'ACTIVE_RUNNING') {
        map[k].active += 1;
      }
      map[k].items.push(rec);
    }
    return map;
  }, [monthDeskRecords]);

  const displayedDeskRecords = useMemo(() => {
    if (selectedDayKey) {
      return monthDeskRecords.filter((rec) => rec.issuedDateKey === selectedDayKey);
    }
    return monthDeskRecords;
  }, [monthDeskRecords, selectedDayKey]);

  const deskTotalWins = deskLedger.filter((r) => r.state === 'CLOSED_WIN').length;
  const deskTotalLosses = deskLedger.filter((r) => r.state === 'CLOSED_LOSS').length;
  const deskNetPips = deskLedger
    .filter((r) => r.state === 'CLOSED_WIN' || r.state === 'CLOSED_LOSS')
    .reduce((acc, r) => acc + r.realizedPips, 0);
  const deskWinRate =
    deskTotalWins + deskTotalLosses > 0
      ? Number(((deskTotalWins / (deskTotalWins + deskTotalLosses)) * 100).toFixed(1))
      : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-[#D6A937]/30 bg-[var(--bg-surface-1)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D6A937]">
              <Calendar className="w-4 h-4" />
              <span>
                {isId ? 'KALENDER PNL BULANAN & AUDIT DISIPLIN SOP' : 'VISUAL MONTHLY PNL CALENDAR & SOP AUDIT'}
              </span>
            </div>
            <LiveKursPill compact />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-[-0.025em] text-[var(--text-ivory)]">
            {isId ? 'Kalender Jurnal Profit, Loss & Kejujuran Trader' : 'Visual Profit/Loss Calendar & Trader Audit'}
          </h1>
          <p className="text-sm text-justify leading-[1.8] text-[var(--text-secondary)]">
            {isId
              ? 'Audit terbuka seluruh sinyal Limit Order resmi Terminal JGS maupun catatan jurnal trading pribadimu dengan konversi USC ke Rupiah mengikuti kurs USD/IDR real-time.'
              : 'Inspect the transparent public audit log of Official JGS Terminal Limit Orders or switch to your Personal Trading PnL Calendar synced live to USD/IDR.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setCalendarTab('PERSONAL_JOURNAL');
              openQuickLogForDate(`${monthKeyPrefix}-12`);
            }}
            className="jgs-btn-gold text-xs px-4 py-2.5"
          >
            <Plus className="w-4 h-4" />
            <span>{isId ? 'Catat Cepat 3 Detik' : 'Quick 3s Log'}</span>
          </button>
          <button
            type="button"
            onClick={handleLoadDemoSamples}
            className="jgs-btn-outline text-xs px-3.5 py-2.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isId ? 'Muat 6 Hari Contoh' : 'Load 6 Sample Days'}</span>
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-xs font-semibold text-[var(--text-ivory)] hover:border-[#D6A937]"
          >
            <Download className="w-3.5 h-3.5 text-[#D6A937]" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* 2-Way Tab Switcher: Official JGS Terminal Audit vs Personal Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            setCalendarTab('TERMINAL_AUDIT');
            setSelectedDayKey(null);
          }}
          className={`rounded-2xl border p-4 text-left transition flex items-center justify-between gap-3 ${
            calendarTab === 'TERMINAL_AUDIT'
              ? 'jgs-tab-active border-[#D6A937] shadow-md'
              : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/50'
          }`}
        >
          <div className="space-y-0.5">
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
              TAB 1 • TRANSPARANSI PUBLIK
            </div>
            <div className="font-display text-sm sm:text-base font-bold text-[var(--text-ivory)]">
              {isId
                ? 'Kalender Audit Resmi Terminal Sinyal JGS'
                : 'Official JGS Signal Terminal Audit Calendar'}
            </div>
          </div>
          <span className="rounded-lg bg-[#10B981]/15 border border-[#10B981]/40 px-2.5 py-1 font-mono text-xs font-bold text-[#10B981] shrink-0">
            {deskWinRate}% WR
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCalendarTab('PERSONAL_JOURNAL');
            setSelectedDayKey(null);
          }}
          className={`rounded-2xl border p-4 text-left transition flex items-center justify-between gap-3 ${
            calendarTab === 'PERSONAL_JOURNAL'
              ? 'jgs-tab-active border-[#D6A937] shadow-md'
              : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/50'
          }`}
        >
          <div className="space-y-0.5">
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#D6A937]">
              TAB 2 • DISIPLIN PRIBADI
            </div>
            <div className="font-display text-sm sm:text-base font-bold text-[var(--text-ivory)]">
              {isId ? 'Kalender Jurnal Trading Pribadi Saya' : 'My Personal Trading PnL Calendar'}
            </div>
          </div>
          <span className="rounded-lg bg-[#D6A937]/15 border border-[#D6A937]/40 px-2.5 py-1 font-mono text-xs font-bold text-[#D6A937] shrink-0">
            {entries.length} Log
          </span>
        </button>
      </div>

      {feedbackBanner && (
        <div className="rounded-xl border border-[#10B981]/50 bg-[#10B981]/15 px-4 py-3 text-xs sm:text-sm font-semibold text-[#10B981] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedbackBanner}</span>
        </div>
      )}

      {/* 4 Monthly Headline Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            {isId ? 'Net PnL Bulan Ini' : 'Monthly Net PnL'}
          </div>
          <div
            className={`font-mono text-2xl sm:text-3xl font-extrabold tabular-nums ${
              monthlyStats.netPnl >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
            }`}
          >
            {monthlyStats.netPnl >= 0 ? '+' : ''}
            {monthlyStats.netPnl} USC
          </div>
          <div className="font-mono text-xs text-[var(--text-secondary)]">
            {netPnlRp >= 0 ? '+' : ''}Rp{netPnlRp.toLocaleString('id-ID')} (${netUsd >= 0 ? '+' : ''}${netUsd})
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            {isId ? 'Persentase Win Rate' : 'Win Rate %'}
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--text-ivory)] tabular-nums">
            {monthlyStats.winRatePercent}%
          </div>
          <div className="font-mono text-xs text-[var(--text-secondary)]">
            {monthlyStats.winCount} Win / {monthlyStats.lossCount} Loss ({monthlyStats.totalTrades} Trade)
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            {isId ? 'Hari Profit vs Loss' : 'Profit vs Loss Days'}
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-extrabold tabular-nums flex items-center gap-2">
            <span className="text-[#10B981]">{profitDaysCount}</span>
            <span className="text-[var(--text-muted)] text-lg">vs</span>
            <span className="text-[#EF4444]">{lossDaysCount}</span>
          </div>
          <div className="font-mono text-xs text-[var(--text-secondary)]">
            {isId ? `${profitDaysCount} Hari Hijau • ${lossDaysCount} Hari Merah` : `${profitDaysCount} Green Days • ${lossDaysCount} Red`}
          </div>
        </div>

        <div className="rounded-2xl border border-[#D6A937]/35 bg-[var(--bg-surface-1)] p-5 space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-gold)]">
            {isId ? 'Skor Disiplin SOP JGS' : 'SOP Discipline Score'}
          </div>
          <div
            className={`font-mono text-2xl sm:text-3xl font-extrabold tabular-nums ${
              monthlyStats.disciplineScorePercent >= 80 ? 'text-[#10B981]' : 'text-[#F59E0B]'
            }`}
          >
            {monthlyStats.disciplineScorePercent}%
          </div>
          <div className="font-mono text-xs text-[var(--text-secondary)]">
            {monthlyStats.undisciplinedTradeCount > 0
              ? isId
                ? `${monthlyStats.undisciplinedTradeCount} Pelanggaran (Audit: ${monthlyStats.topEmotionalLeak})`
                : `${monthlyStats.undisciplinedTradeCount} Breaches (${monthlyStats.topEmotionalLeak})`
              : isId
                ? '100% Patuh Aturan Risiko 1%'
                : '100% Rule Compliance'}
          </div>
        </div>
      </div>

      {/* Visual 7-Column Calendar Grid */}
      <div className="rounded-3xl border border-[#D6A937]/35 bg-[var(--bg-surface-1)] p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous Month"
              className="p-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--text-ivory)] hover:border-[#D6A937]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-display text-lg sm:text-2xl font-bold text-[var(--text-ivory)] capitalize min-w-[180px] text-center">
              {monthTitle}
            </h2>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Next Month"
              className="p-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--text-ivory)] hover:border-[#D6A937]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1.5 text-[#10B981]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#10B981]" />
              {isId ? 'Hari Profit (Hijau)' : 'Profit Day'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#EF4444]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#EF4444]" />
              {isId ? 'Hari Loss (Merah)' : 'Loss Day'}
            </span>
            {selectedDayKey && (
              <button
                type="button"
                onClick={() => setSelectedDayKey(null)}
                className="px-2.5 py-1 rounded-lg border border-[#D6A937]/50 text-[var(--accent-gold)] hover:bg-[#D6A937]/10"
              >
                {isId ? 'Tampilkan Semua Hari Bulan Ini' : 'Show Full Month'}
              </button>
            )}
          </div>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 text-center font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          {weekdays.map((wd) => (
            <div key={wd} className="py-1.5">
              {wd}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
          {calendarCells.map((cell, idx) => {
            if (!cell.dayNum || !cell.dateKey) {
              return (
                <div
                  key={`pad-${idx}`}
                  className="min-h-[76px] sm:min-h-[96px] rounded-xl bg-[var(--bg-surface-2)]/25 border border-transparent"
                />
              );
            }
            const isAuditMode = calendarTab === 'TERMINAL_AUDIT';
            const auditSummary = deskDailySummaryMap[cell.dateKey];
            const summary = dailySummaryMap[cell.dateKey];
            const isWin = isAuditMode ? auditSummary && auditSummary.netPips > 0 : summary && summary.pnlUsc > 0;
            const isLoss = isAuditMode ? auditSummary && auditSummary.netPips < 0 : summary && summary.pnlUsc < 0;
            const hasActivity = isAuditMode ? Boolean(auditSummary) : Boolean(summary);
            const isSelected = selectedDayKey === cell.dateKey;
            const rpDay = summary ? Math.round(summary.pnlUsc * rpPerUsc) : 0;

            return (
              <button
                key={cell.dateKey}
                type="button"
                onClick={() => {
                  if (isAuditMode) {
                    setSelectedDayKey(cell.dateKey);
                  } else if (summary) {
                    setSelectedDayKey(cell.dateKey);
                  } else {
                    openQuickLogForDate(cell.dateKey!);
                  }
                }}
                className={`min-h-[76px] sm:min-h-[96px] rounded-xl border p-2 sm:p-2.5 text-left flex flex-col justify-between transition group ${
                  isWin
                    ? 'border-[#10B981]/60 bg-[#10B981]/15 hover:bg-[#10B981]/25'
                    : isLoss
                      ? 'border-[#EF4444]/60 bg-[#EF4444]/15 hover:bg-[#EF4444]/25'
                      : hasActivity
                        ? 'border-sky-400/50 bg-sky-500/10 hover:bg-sky-500/20'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/50 hover:border-[#D6A937]'
                } ${isSelected ? 'ring-2 ring-[#D6A937]' : ''}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs font-bold text-[var(--text-ivory)]">
                    {cell.dayNum}
                  </span>
                  {isAuditMode && auditSummary ? (
                    <span className="hidden sm:inline-block font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--bg-surface-1)]/80 text-[var(--text-secondary)]">
                      {auditSummary.wins}W/{auditSummary.losses}L
                    </span>
                  ) : summary ? (
                    <span className="hidden sm:inline-block font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--bg-surface-1)]/80 text-[var(--text-secondary)]">
                      {summary.count}T
                    </span>
                  ) : !isAuditMode ? (
                    <Plus className="w-3 h-3 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition" />
                  ) : null}
                </div>

                {isAuditMode && auditSummary ? (
                  <div className="space-y-0.5 tabular-nums">
                    <div
                      className={`font-mono text-[11px] sm:text-xs font-extrabold leading-tight ${
                        isWin ? 'text-[#10B981]' : isLoss ? 'text-[#EF4444]' : 'text-sky-300'
                      }`}
                    >
                      {auditSummary.netPips > 0 ? '+' : ''}
                      {auditSummary.netPips !== 0 ? `${auditSummary.netPips} Pips` : 'Running'}
                    </div>
                    <div className="hidden md:block font-mono text-[9px] text-[var(--text-secondary)] truncate">
                      {auditSummary.items.length} Tiket JGS
                    </div>
                  </div>
                ) : !isAuditMode && summary ? (
                  <div className="space-y-0.5 tabular-nums">
                    <div
                      className={`font-mono text-[11px] sm:text-xs font-extrabold leading-tight ${
                        isWin ? 'text-[#10B981]' : 'text-[#EF4444]'
                      }`}
                    >
                      {summary.pnlUsc >= 0 ? '+' : ''}
                      {summary.pnlUsc} USC
                    </div>
                    <div className="hidden md:block font-mono text-[9px] text-[var(--text-secondary)] truncate">
                      {rpDay >= 0 ? '+' : ''}Rp{rpDay.toLocaleString('id-ID')}
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:block font-mono text-[9px] text-[var(--text-muted)] opacity-60 group-hover:opacity-100">
                    {isId ? '+ Catat' : '+ Log'}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          QUICK 3-SECOND MODAL DRAWER ("CATAT CEPAT 3 DETIK")
          ============================================================ */}
      {isQuickModalOpen && (
        <div className="rounded-3xl border-2 border-[#D6A937] bg-[var(--bg-surface-1)] p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div className="space-y-1">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#D6A937]">
                {isId ? 'CATAT CEPAT 3 DETIK' : 'QUICK 3-SECOND TRADE LOG'} • {quickDateKey}
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--text-ivory)]">
                {isId ? 'Catat Hasil & Audit Kejujuran Dirimu' : 'Record Result & Honest Discipline Audit'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsQuickModalOpen(false)}
              aria-label="Close Quick Log"
              className="p-2 rounded-xl border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-ivory)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSaveQuickLog} className="space-y-5">
            {/* Step 1: Date + Pair/Style */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4 space-y-1.5">
                <label
                  htmlFor="jgs-quick-date"
                  className="block font-mono text-[11px] font-bold text-[var(--text-ivory)]"
                >
                  {isId ? 'Tanggal Trade' : 'Trade Date'}
                </label>
                <input
                  id="jgs-quick-date"
                  type="date"
                  value={quickDateKey}
                  onChange={(e) => setQuickDateKey(e.target.value)}
                  className="jgs-themed-input w-full px-3.5 py-2.5 rounded-xl font-mono text-sm"
                />
              </div>

              <div className="sm:col-span-8 space-y-1.5">
                <div className="font-mono text-[11px] font-bold text-[var(--text-ivory)]">
                  {isId ? '1. Pilih Pair & Gaya Eksekusi' : '1. Select Pair & Execution Style'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {PAIR_STYLE_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuickPairPreset(preset)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                        quickPairPreset === preset
                          ? 'bg-[#D6A937] text-[#17131D] border-[#D6A937]'
                          : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2 & 3: Direction + Quick PnL */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
              <div className="md:col-span-4 space-y-1.5">
                <div className="font-mono text-[11px] font-bold text-[var(--text-ivory)]">
                  {isId ? '2. Arah Posisi' : '2. Order Direction'}
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setQuickDirection('LONG')}
                    className={`py-3 rounded-xl font-mono text-sm font-extrabold border transition ${
                      quickDirection === 'LONG'
                        ? 'bg-[#10B981] text-[#09120F] border-[#10B981]'
                        : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    BUY
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDirection('SHORT')}
                    className={`py-3 rounded-xl font-mono text-sm font-extrabold border transition ${
                      quickDirection === 'SHORT'
                        ? 'bg-[#EF4444] text-white border-[#EF4444]'
                        : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    SELL
                  </button>
                </div>
              </div>

              <div className="md:col-span-8 space-y-1.5">
                <label
                  htmlFor="jgs-quick-pnl-usc"
                  className="block font-mono text-[11px] font-bold text-[var(--text-ivory)]"
                >
                  {isId
                    ? `3. Hasil Profit / Loss (USC) • Setara ${quickPnlRpPreview >= 0 ? '+' : ''}Rp${quickPnlRpPreview.toLocaleString('id-ID')}`
                    : `3. Profit / Loss Result (USC)`}
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    id="jgs-quick-pnl-usc"
                    type="number"
                    step="0.5"
                    value={quickPnlUsc}
                    onChange={(e) => setQuickPnlUsc(e.target.value)}
                    className="jgs-themed-input w-36 px-3.5 py-2.5 rounded-xl font-mono text-base font-extrabold"
                  />
                  {[
                    ['30', `+30 USC (+${formatUscToIdr(30)})`],
                    ['20', `+20 USC (+${formatUscToIdr(20)})`],
                    ['-10', '-10 USC (SL 1%)'],
                    ['-25', '-25 USC (Over-risk)'],
                  ].map(([val, lbl]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setQuickPnlUsc(val)}
                      className={`px-3 py-2 rounded-xl text-[11px] font-mono font-bold border transition ${
                        quickPnlUsc === val
                          ? 'bg-[#D6A937] text-[#17131D] border-[#D6A937]'
                          : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Honest 1-Click Discipline Audit */}
            <div className="space-y-2">
              <div className="font-mono text-[11px] font-bold text-[var(--text-ivory)]">
                {isId ? '4. Kejujuran Audit Diri (Pilih 1 Status Nyata)' : '4. Honest Self-Audit Badge'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {HONEST_AUDIT_OPTIONS.map((opt) => {
                  const selected = quickAuditBadge === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuickAuditBadge(opt.id)}
                      className={`rounded-2xl border p-3.5 text-left space-y-1 transition ${
                        selected
                          ? opt.colorClass
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:border-[#D6A937]/50'
                      }`}
                    >
                      <div className="font-display text-xs sm:text-sm font-bold">
                        {isId ? opt.labelId : opt.labelEn}
                      </div>
                      <p className="text-[11px] opacity-85 leading-snug">
                        {isId ? opt.descId : opt.descEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full space-y-1">
                <label
                  htmlFor="jgs-quick-note"
                  className="block font-mono text-[11px] font-bold text-[var(--text-muted)]"
                >
                  {isId ? 'Catatan Pelajaran Singkat (Opsional)' : 'Short Lesson Note (Optional)'}
                </label>
                <input
                  id="jgs-quick-note"
                  type="text"
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  placeholder={isId ? 'Contoh: Menunggu candle M5 tutup tegas di FVG...' : 'Optional short lesson note...'}
                  className="jgs-themed-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                />
              </div>

              <button type="submit" className="jgs-btn-gold text-sm px-6 py-3 shrink-0 w-full sm:w-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isId ? 'Simpan Ke Kalender ->' : 'Save To Calendar ->'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Selected Day / Monthly Detailed Log List */}
      {calendarTab === 'TERMINAL_AUDIT' ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-xl font-bold text-[var(--text-ivory)]">
              {selectedDayKey
                ? isId
                  ? `Tiket Audit Resmi Terminal JGS Tanggal ${selectedDayKey} (${displayedDeskRecords.length})`
                  : `Official JGS Terminal Tickets on ${selectedDayKey}`
                : isId
                  ? `Ringkasan Audit Resmi Terminal JGS Bulan ${monthTitle} (${displayedDeskRecords.length} Tiket • Net ${deskNetPips >= 0 ? '+' : ''}${deskNetPips} Pips)`
                  : `Official JGS Desk Audit for ${monthTitle} (${displayedDeskRecords.length} Tickets)`}
            </h3>
            <Link href={l('/signals')} className="jgs-btn-gold text-xs px-4 py-2">
              <span>{isId ? 'Buka Terminal Sinyal Limit ->' : 'Open Limit Signals Desk ->'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedDeskRecords.map((rec) => (
              <div
                key={rec.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-[#D6A937]/15 border border-[#D6A937]/40 px-2 py-0.5 font-mono text-[10px] font-bold text-[#D6A937]">
                        {rec.ticketId}
                      </span>
                      <span className="font-mono font-bold text-base text-[var(--text-ivory)]">
                        {rec.displaySymbol}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                          rec.direction === 'BUY'
                            ? 'bg-[#10B981]/20 text-[#10B981]'
                            : 'bg-[#EF4444]/20 text-[#EF4444]'
                        }`}
                      >
                        {rec.orderType}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-[var(--text-muted)]">
                      {rec.timeframeLabel} • {rec.issuedWibLabel}
                    </div>
                  </div>

                  <div className="text-right font-mono tabular-nums">
                    <span
                      className={`inline-block rounded-lg px-2.5 py-1 text-xs font-extrabold ${
                        rec.state === 'CLOSED_WIN'
                          ? 'bg-[#10B981]/15 text-[#10B981]'
                          : rec.state === 'CLOSED_LOSS'
                            ? 'bg-[#EF4444]/15 text-[#EF4444]'
                            : rec.state === 'ACTIVE_RUNNING'
                              ? 'bg-sky-500/15 text-sky-300'
                              : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                      }`}
                    >
                      {rec.state === 'CLOSED_WIN'
                        ? `WIN +${rec.realizedPips} Pips`
                        : rec.state === 'CLOSED_LOSS'
                          ? `SL ${rec.realizedPips} Pips`
                          : rec.state === 'ACTIVE_RUNNING'
                            ? 'SEDANG RUNNING'
                            : 'LIMIT TERPASANG'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 rounded-xl bg-[var(--bg-surface-2)] p-2.5 font-mono text-[11px] tabular-nums">
                  <div>
                    <span className="block text-[9px] text-[var(--text-muted)]">ENTRY</span>
                    <strong className="text-[var(--text-ivory)]">{rec.entryPrice.toFixed(rec.decimals)}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] text-[var(--text-muted)]">SL</span>
                    <strong className="text-[#EF4444]">{rec.stopLoss.toFixed(rec.decimals)}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] text-[var(--text-muted)]">TP1</span>
                    <strong className="text-[#10B981]">{rec.takeProfit1.toFixed(rec.decimals)}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] text-[var(--text-muted)]">TP2</span>
                    <strong className="text-[#10B981]">{rec.takeProfit2.toFixed(rec.decimals)}</strong>
                  </div>
                </div>

                {rec.postMortemNoteId && (
                  <p className="text-xs text-[var(--text-secondary)] bg-[var(--bg-surface-2)] rounded-xl p-3 leading-relaxed">
                    {isId ? rec.postMortemNoteId : rec.postMortemNoteEn}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-xl font-bold text-[var(--text-ivory)]">
              {selectedDayKey
                ? isId
                  ? `Detail Log Trade Tanggal ${selectedDayKey} (${displayedHistory.length})`
                  : `Trades Logged On ${selectedDayKey}`
                : isId
                  ? `Catatan Bulan ${monthTitle} (${displayedHistory.length} Transaksi)`
                  : `Monthly Log Ledger (${displayedHistory.length} Trades)`}
            </h3>
            {selectedDayKey && (
              <button
                type="button"
                onClick={() => openQuickLogForDate(selectedDayKey)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D6A937] bg-[#D6A937]/15 text-xs font-bold text-[var(--accent-gold)]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isId ? `Tambah Trade Di ${selectedDayKey}` : `Add Trade On ${selectedDayKey}`}</span>
              </button>
            )}
          </div>

          {displayedHistory.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-8 text-center space-y-3">
              <p className="text-sm text-[var(--text-secondary)]">
                {isId
                  ? 'Belum ada catatan transaksi di bulan/tanggal ini. Klik tanggal mana saja di kalender untuk mulai mencatat!'
                  : 'No entries logged for this selection yet. Click any date cell above to add your first entry!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedHistory.map((item) => {
                const badge = resolveBadgeLabel(item, isId);
                const rpVal = Math.round(item.realizedPnl * rpPerUsc);

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                              item.direction === 'LONG'
                                ? 'bg-[#10B981]/20 text-[#10B981]'
                                : 'bg-[#EF4444]/20 text-[#EF4444]'
                            }`}
                          >
                            {item.direction === 'LONG' ? 'BUY' : 'SELL'}
                          </span>
                          <span className="font-mono font-bold text-base text-[var(--text-ivory)]">
                            {item.instrument}
                          </span>
                          <span className="font-mono text-xs text-[var(--text-muted)]">
                            {item.tradedAt}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-[var(--text-secondary)]">
                          {item.setupTag}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right font-mono tabular-nums">
                          <div
                            className={`text-sm sm:text-base font-extrabold ${
                              item.realizedPnl >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                            }`}
                          >
                            {item.realizedPnl >= 0 ? '+' : ''}
                            {item.realizedPnl} USC
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)]">
                            {rpVal >= 0 ? '+' : ''}Rp{rpVal.toLocaleString('id-ID')}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteEntry(item.id)}
                          aria-label="Delete Trade Entry"
                          className="text-[var(--text-muted)] hover:text-[#EF4444]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold ${
                          badge.isClean
                            ? 'bg-[#10B981]/15 text-[#10B981]'
                            : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                        }`}
                      >
                        {badge.isClean ? (
                          <ShieldCheck className="w-3.5 h-3.5" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        )}
                        <span>{badge.text}</span>
                      </span>

                      <Link
                        href={l('/academy?tab=classroom')}
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--accent-gold)] hover:underline"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{isId ? `Progres Akademi (${completedCount} Modul)` : `Academy (${completedCount} Done)`}</span>
                      </Link>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-[var(--text-secondary)] bg-[var(--bg-surface-2)] rounded-xl p-3 leading-relaxed">
                        {item.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
