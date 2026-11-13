'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  Clock,
  Coffee,
  Compass,
  Crown,
  Landmark,
  Layers,
  Play,
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import {
  AnimatedNumber,
  GoldConfettiBurst,
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
  SpotlightCard,
  Tilt3DCard,
} from '@/components/ui/LuxuryMotion';
import { LiveKursPill } from '@/components/market/LiveKursPill';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';
import {
  getLiveGangRoster,
  loadStrategistSession,
  type StrategistUserSession,
} from '@/lib/storage/jgs-local-store';
import { MythologicalRankShowcase } from '@/components/account/MythologicalRankShowcase';

interface CandleBar {
  o: number;
  h: number;
  l: number;
  c: number;
}

// Mode A: 25 candles, Retail buys breakout top on $10 Std, swept to Margin Call
const MODE_A_CANDLES: CandleBar[] = [
  { o: 2884, h: 2887, l: 2882, c: 2886 },
  { o: 2886, h: 2889, l: 2884, c: 2888 },
  { o: 2888, h: 2891, l: 2886, c: 2890 },
  { o: 2890, h: 2893, l: 2888, c: 2892 },
  { o: 2892, h: 2895, l: 2891, c: 2894 },
  { o: 2894, h: 2897, l: 2892, c: 2896 },
  { o: 2896, h: 2899, l: 2894, c: 2898 },
  { o: 2898, h: 2902, l: 2897, c: 2901 }, // FOMO retail entry bar (idx 7)
  { o: 2901, h: 2903, l: 2898, c: 2899 },
  { o: 2899, h: 2900, l: 2895, c: 2896 },
  { o: 2896, h: 2897, l: 2892, c: 2893 },
  { o: 2893, h: 2894, l: 2889, c: 2891 },
  { o: 2891, h: 2892, l: 2888, c: 2890 }, // -$10 Margin Call level crossed here
  { o: 2890, h: 2893, l: 2889, c: 2892 },
  { o: 2892, h: 2895, l: 2891, c: 2894 },
  { o: 2894, h: 2898, l: 2893, c: 2897 },
  { o: 2897, h: 2900, l: 2895, c: 2899 },
  { o: 2899, h: 2902, l: 2897, c: 2901 },
  { o: 2901, h: 2904, l: 2899, c: 2903 },
  { o: 2903, h: 2906, l: 2901, c: 2905 },
  { o: 2905, h: 2907, l: 2902, c: 2906 },
  { o: 2906, h: 2909, l: 2904, c: 2908 },
  { o: 2908, h: 2911, l: 2906, c: 2910 },
  { o: 2910, h: 2912, l: 2908, c: 2911 },
  { o: 2911, h: 2914, l: 2909, c: 2913 },
];

// Mode B: 25 candles, Wait for SSL sweep + MSS + enter at FVG -> hit +20 USC (1:2 RRR)
const MODE_B_CANDLES: CandleBar[] = [
  { o: 2895, h: 2897, l: 2893, c: 2894 },
  { o: 2894, h: 2896, l: 2891, c: 2892 },
  { o: 2892, h: 2894, l: 2890, c: 2891 },
  { o: 2891, h: 2893, l: 2889, c: 2890 },
  { o: 2890, h: 2892, l: 2886, c: 2887 },
  { o: 2887, h: 2888, l: 2883, c: 2886 }, // SSL Sweep low (idx 5)
  { o: 2886, h: 2891, l: 2885, c: 2890 }, // Strong displacement begins
  { o: 2890, h: 2896, l: 2889, c: 2895 }, // MSS + FVG created (idx 7)
  { o: 2895, h: 2898, l: 2893, c: 2894 },
  { o: 2894, h: 2895, l: 2890, c: 2891 }, // Retraces cleanly into FVG Entry (idx 9)
  { o: 2891, h: 2893, l: 2889, c: 2892 },
  { o: 2892, h: 2896, l: 2891, c: 2895 },
  { o: 2895, h: 2898, l: 2894, c: 2897 },
  { o: 2897, h: 2900, l: 2896, c: 2899 },
  { o: 2899, h: 2901, l: 2897, c: 2900 },
  { o: 2900, h: 2903, l: 2898, c: 2902 }, // 1:2 RRR Target hit (+20 USC) (idx 15)
  { o: 2902, h: 2904, l: 2900, c: 2903 },
  { o: 2903, h: 2906, l: 2901, c: 2905 },
  { o: 2905, h: 2907, l: 2903, c: 2906 },
  { o: 2906, h: 2908, l: 2904, c: 2907 },
  { o: 2907, h: 2910, l: 2905, c: 2909 },
  { o: 2909, h: 2911, l: 2907, c: 2910 },
  { o: 2910, h: 2912, l: 2908, c: 2911 },
  { o: 2911, h: 2914, l: 2909, c: 2913 },
  { o: 2913, h: 2915, l: 2911, c: 2914 },
];

type KillzonePhaseKey = 'ROLLOVER' | 'ASIA' | 'LONDON' | 'OVERLAP' | 'OFFPEAK';

function detectWibKillzone(wibHour: number, wibMinute: number): {
  key: KillzonePhaseKey;
  titleId: string;
  titleEn: string;
  badgeTone: string;
  spreadNoteId: string;
  spreadNoteEn: string;
  adviceId: string;
  adviceEn: string;
} {
  const totalMins = wibHour * 60 + wibMinute;
  // 04:00 - 06:05 WIB
  if (totalMins >= 240 && totalMins <= 365) {
    return {
      key: 'ROLLOVER',
      titleId: 'ZONA MERAH, Rollover & Daily Bank Settlement (04:00–06:05 WIB)',
      titleEn: 'RED ZONE: Daily Bank Rollover (04:00–06:05 WIB)',
      badgeTone: 'border-rose-500/50 bg-rose-500/15 text-rose-400',
      spreadNoteId: 'Spread Emas sering melompat 50–150+ pts',
      spreadNoteEn: 'Gold spreads spike 50–150+ pts',
      adviceId:
        'Tutup terminal MT5 dulu, jangan buka posisi baru. Posisi dengan Stop Loss ketat mudah tersapu oleh pelebaran spread pergantian hari.',
      adviceEn:
        'Stand aside and avoid new entries. Wide overnight rollover spreads frequently clip tight Stop Losses.',
    };
  }
  // 07:00 - 13:30 WIB
  if (totalMins >= 420 && totalMins <= 810) {
    return {
      key: 'ASIA',
      titleId: 'ZONA KUNING, Akumulasi Sesi Asia / Tokyo (07:00–13:30 WIB)',
      titleEn: 'AMBER ZONE, Asian Range Accumulation (07:00–13:30 WIB)',
      badgeTone: 'border-amber-500/50 bg-amber-500/15 text-amber-400',
      spreadNoteId: 'Spread moderat 28–40 pts, gerak konsolidasi',
      spreadNoteEn: 'Moderate 28–40 pts spread, range-bound flow',
      adviceId:
        'Catat garis High & Low Sesi Asia di XAUUSD. Di sinilah likuiditas (BSL/SSL) ditumpuk untuk disapu institusi saat London buka.',
      adviceEn:
        'Mark Asian Session High & Low on Gold. Smart money accumulates retail stops above and below this range for London sweeps.',
    };
  }
  // 14:00 - 18:30 WIB
  if (totalMins >= 840 && totalMins <= 1110) {
    return {
      key: 'LONDON',
      titleId: 'ZONA HIJAU, London Open Killzone (14:00–18:30 WIB)',
      titleEn: 'GREEN ZONE, London Open Killzone (14:00–18:30 WIB)',
      badgeTone: 'border-emerald-500/50 bg-emerald-500/15 text-emerald-400',
      spreadNoteId: 'Spread mengetat ke 20–25 pts ($0.20–$0.25/oz)',
      spreadNoteEn: 'Spreads tighten to 20–25 pts ($0.20–$0.25/oz)',
      adviceId:
        'Likuiditas bank Eropa aktif! Awasi sapuan ujung Asian Range lalu tunggu Market Structure Shift (MSS) + Fair Value Gap (FVG) sebelum entry 0.02 Cent Lot.',
      adviceEn:
        'European institutional liquidity is active. Watch for an Asian Range sweep followed by MSS + FVG before entering 0.02 Cent Lot.',
    };
  }
  // 19:00 - 23:30 WIB
  if (totalMins >= 1140 && totalMins <= 1410) {
    return {
      key: 'OVERLAP',
      titleId: 'ZONA EMAS, London & New York Overlap (19:00–23:30 WIB)',
      titleEn: 'GOLDEN ZONE, London & New York Overlap (19:00–23:30 WIB)',
      badgeTone: 'border-[#D6A937]/60 bg-[#D6A937]/15 text-[var(--accent-gold)]',
      spreadNoteId: 'Spread paling efisien harian: 16–20 pts ($0.16–$0.20/oz)',
      spreadNoteEn: 'Tightest daily spreads: 16–20 pts ($0.16–$0.20/oz)',
      adviceId:
        'Volume puncak global untuk XAUUSDc & pembukaan Wall Street (USTECc). Tetap waspada 15 menit sekitar rilis CPI/NFP 19:30/20:30 WIB.',
      adviceEn:
        'Peak global institutional volume for Gold & Wall Street open. Stay alert around 19:30/20:30 WIB CPI/NFP news releases.',
    };
  }
  return {
    key: 'OFFPEAK',
    titleId: 'ZONA TRANSISI, Jelang Tutup Pasar AS / Pra-Asia',
    titleEn: 'TRANSITION WINDOW, Late US Close / Pre-Asia',
    badgeTone: 'border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]',
    spreadNoteId: 'Volume melandai, siapkan rencana esok hari',
    spreadNoteEn: 'Tapering liquidity, focus on journaling',
    adviceId:
      'Gunakan waktu tenang ini untuk mencatat jurnal R-multiple harianmu atau belajar 1 modul di JGS Academy tanpa terburu-buru klik grafik.',
    adviceEn:
      'Use calm hours to log your daily R-multiple journal or complete one JGS Academy lesson without chasing thin candles.',
  };
}

export function EditorialHomepage() {
  const { locale, isId, l } = useLocale();
  const { formatUsdToIdr, formatUscToIdr } = useLiveCurrency();
  const loc = locale === 'en' ? 'en' : 'id';

  // Section 1: Hero 25-Candle Simulator Mode ('jeygang' Mode B vs 'awam' Mode A)
  const [simMode, setSimMode] = useState<'jeygang' | 'awam'>('jeygang');
  const [visibleBars, setVisibleBars] = useState<number>(25);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [confettiKey, setConfettiKey] = useState<number>(0);
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);

  // Section 2: Capital Slider ($10 to $100)
  const [modalUsd, setModalUsd] = useState<number>(10);

  // Section 3: Client-side Live Clock for WIB / UTC / NY (hydration-safe)
  const [clockState, setClockState] = useState<{
    wibText: string;
    utcText: string;
    nyText: string;
    wibHour: number;
    wibMinute: number;
  } | null>(null);

  // Member Roster & Session
  const [session, setSession] = useState<StrategistUserSession | null>(null);
  const [roster, setRoster] = useState(() => getLiveGangRoster());

  useEffect(() => {
    const syncMemberState = () => {
      setSession(loadStrategistSession());
      setRoster(getLiveGangRoster());
    };
    syncMemberState();
    window.addEventListener('jgs-session-change', syncMemberState);
    return () => window.removeEventListener('jgs-session-change', syncMemberState);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const wibFmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      const utcFmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
      const nyFmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);

      const parts = wibFmt.split(':');
      setClockState({
        wibText: wibFmt,
        utcText: utcFmt,
        nyText: nyFmt,
        wibHour: Number(parts[0] ?? 12),
        wibMinute: Number(parts[1] ?? 0),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animate 25-candle replay step-by-step when user clicks Play
  useEffect(() => {
    if (!isPlaying) return;
    if (visibleBars >= 25) {
      setIsPlaying(false);
      if (simMode === 'jeygang') {
        setConfettiKey((k) => k + 1);
      } else {
        setShakeTrigger(true);
        setTimeout(() => setShakeTrigger(false), 650);
      }
      return;
    }
    const timer = setTimeout(() => {
      setVisibleBars((prev) => Math.min(25, prev + 1));
    }, 95);
    return () => clearTimeout(timer);
  }, [isPlaying, visibleBars, simMode]);

  function startReplay(mode?: 'jeygang' | 'awam') {
    if (mode) setSimMode(mode);
    setVisibleBars(4);
    setIsPlaying(true);
  }

  function switchSimMode(mode: 'jeygang' | 'awam') {
    setSimMode(mode);
    setVisibleBars(25);
    setIsPlaying(false);
    if (mode === 'awam') {
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 650);
    }
  }

  // Chart calculations (640x230 SVG)
  const candles = simMode === 'jeygang' ? MODE_B_CANDLES : MODE_A_CANDLES;
  const shownCandles = useMemo(() => candles.slice(0, visibleBars), [candles, visibleBars]);
  const priceMin = 2880;
  const priceMax = 2917;
  const svgW = 640;
  const svgH = 220;
  const priceToY = (p: number) => svgH - 22 - ((p - priceMin) / (priceMax - priceMin)) * (svgH - 42);

  // Derived Section 2 metrics
  const modalUsc = modalUsd * 100;
  const risk1PctUsc = modalUsd;
  const riskIdrApprox = Math.round(modalUsd * 160);

  // Derived Section 3 Killzone phase
  const killzone = useMemo(
    () => detectWibKillzone(clockState?.wibHour ?? 20, clockState?.wibMinute ?? 15),
    [clockState]
  );

  const memberName = session?.displayName || 'Asep Garpit';
  const memberId = session?.gangId || '2702285126';
  const topMembers = roster.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-ivory)] relative">
      <GoldConfettiBurst triggerKey={confettiKey} />
      {/* =====================================================================
          SECTION 1: ARCHITECTURAL HERO + LIVE CANDLESTICK REPLAY & 3D CARD
         ===================================================================== */}
      <section className="relative overflow-hidden border-b border-[var(--border-subtle)] py-14 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="jgs-ambient-pulse pointer-events-none absolute -top-24 left-1/4 h-[420px] w-[420px] rounded-full bg-purple-royal/20 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-1/6 h-[320px] w-[360px] rounded-full bg-[#D6A937]/10 blur-[120px]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: Clear Beginner Copy & High-Impact CTAs */}
          <div className="lg:col-span-6 space-y-6 pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D6A937]/35 bg-[var(--bg-surface-1)] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-gold)]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              <span>
                {isId
                  ? 'THE JEY GANG STRATEGIST • EDUKASI & TOOLS RISIKO 100% GRATIS'
                  : 'THE JEY GANG STRATEGIST • 100% FREE EDUCATION & RISK TECH'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.06] text-[var(--text-ivory)]">
              {isId ? (
                <>
                  Mulai dari paham.
                  <br />
                  <span className="text-[var(--accent-gold)]">Bukan dari modal.</span>
                </>
              ) : (
                <>
                  Start with understanding.
                  <br />
                  <span className="text-[var(--accent-gold)]">Not account size.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-[17px] text-justify leading-[1.9] text-[var(--text-secondary)] max-w-xl">
              {isId
                ? `Pernah nggak sih kamu pengen banget mulai trading, tapi bingung harus mulai dari mana karena takut ketipu? Atau pernah nekat trading pakai modal sendiri, tapi karena ukuran lot-nya kebesaran di akun biasa, baru salah tebak sekali langsung habis terkena Margin Call (MC)? The Jey Gang Strategist dimulai tepat dari akar masalah tersebut. Kami mengubah modal kecil ${formatUsdToIdr(10)} ($10) kamu menjadi 1.000 koin sen (USC) di Akun Cent sebagai laboratorium belajar paling aman, lalu membimbingmu dari nol sampai mandiri.`
                : `Ever wanted to start trading yet felt overwhelmed by fear of scams, or lost your first small deposit to Margin Call on the very first mistake because a standard lot was 100x too heavy? The Jey Gang Strategist solves that exact dilemma: transforming $10 (${formatUsdToIdr(10)}) safely into 1,000 USC Cent coins as your learning laboratory before scaling up independently.`}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href={l('/academy')} className="jgs-btn-gold text-sm">
                <span>
                  {isId
                    ? 'Mulai Kuliah Gratis di JGS Academy ->'
                    : 'Start Free in JGS Academy ->'}
                </span>
              </Link>
              <Link href={l('/calculators/cent')} className="jgs-btn-outline text-sm">
                <Calculator className="w-4 h-4 text-[var(--accent-gold)]" strokeWidth={1.5} />
                <span>
                  {isId ? 'Buka Kalkulator $10 (1.000 USC)' : 'Open $10 (1,000 USC) Calculator'}
                </span>
              </Link>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-[var(--border-subtle)]">
              <div>
                <div className="font-mono font-bold text-base text-[var(--text-ivory)]">
                  60 Modul / 120 SKS
                </div>
                <div className="text-[var(--text-secondary)]">
                  {isId ? 'Kurikulum 20 Semester Gratis' : 'Free 20-Semester Curriculum'}
                </div>
              </div>
              <div>
                <div className="font-mono font-bold text-base text-[var(--accent-gold)]">
                  $10 ({formatUsdToIdr(10)}) = 1.000 USC
                </div>
                <div className="text-[var(--text-secondary)]">
                  {isId ? `1% Risiko = ${formatUscToIdr(10)} / Belajar` : `1% Risk = 10 USC (${formatUscToIdr(10)})`}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="font-mono font-bold text-base text-[#10B981]">
                  0 Paywall
                </div>
                <div className="text-[var(--text-secondary)]">
                  {isId ? 'Tanpa Grup Sinyal Berbayar' : 'Zero Paid Signal Groups'}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dual-Mode Interactive Visual Terminal (Candlestick + 3D Card) */}
          <div className="lg:col-span-6 space-y-5">
            {/* TOP MODULE: 25-Candle Interactive Replay */}
            <div className="jgs-panel overflow-hidden border-[#D6A937]/30">
              <div className="px-4 sm:px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)] block">
                    {isId ? 'SIMULASI 5 DETIK • XAUUSD' : '5-SECOND SIMULATION • XAUUSD'}
                  </span>
                  <h2 className="font-display text-sm sm:text-base font-bold text-[var(--text-ivory)]">
                    {isId
                      ? `Simulasi 5 Detik: Nasib Modal ${formatUsdToIdr(10)} ($10) Kamu`
                      : `5-Second Sim: Fate of Your $10 (${formatUsdToIdr(10)}) Capital`}
                  </h2>
                  <div className="pt-1.5">
                    <LiveKursPill compact />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => startReplay('jeygang')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#D6A937] px-3 py-1.5 font-mono text-[11px] font-bold text-[#17131D] hover:bg-[#F3E5AB] transition"
                  >
                    {visibleBars < 25 && isPlaying ? (
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" strokeWidth={1.75} />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" strokeWidth={1.75} />
                    )}
                    <span>{isId ? 'Klik Test Entry Sekarang' : 'Click Test Entry Now'}</span>
                  </button>
                </div>
              </div>

              {/* Dual-Mode Selector Tabs */}
              <div className="px-4 pt-3 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[var(--bg-surface-1)]">
                <button
                  type="button"
                  onClick={() => switchSimMode('awam')}
                  className={`rounded-xl px-3 py-2 text-left border transition ${
                    simMode === 'awam'
                      ? 'jgs-tab-danger border-rose-500'
                      : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-ivory)]'
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider">
                    {isId ? 'Cara Nekat (Akun Standar)' : 'Reckless Habit (Standard)'}
                  </div>
                  <div className="text-xs font-semibold truncate">
                    {isId ? `$10 (${formatUsdToIdr(10)}) di Akun Standar Biasa` : '$10 on Standard Lot (No Cap)'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => switchSimMode('jeygang')}
                  className={`rounded-xl px-3 py-2 text-left border transition ${
                    simMode === 'jeygang'
                      ? 'jgs-tab-active border-[#D6A937]'
                      : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-ivory)]'
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#D6A937]">
                    {isId ? 'Cara Cerdas JGS (Akun Cent)' : 'Smart JGS Protocol (Cent)'}
                  </div>
                  <div className="text-xs font-semibold truncate">
                    {isId ? `${formatUsdToIdr(10)} = 1.000 USC (Tameng 1%)` : '$10 = 1,000 USC (1% Shield)'}
                  </div>
                </button>
              </div>

              {/* Preserved Obsidian Chart Frame */}
              <div className={`px-4 pb-4 bg-[var(--bg-surface-1)] ${shakeTrigger ? 'jgs-shake' : ''}`}>
                <div className="jgs-chart-frame rounded-xl border border-[#D6A937]/25 p-3">
                  <svg
                    viewBox={`0 0 ${svgW} ${svgH}`}
                    className="w-full h-auto"
                    role="img"
                    aria-label={
                      isId
                        ? 'Simulasi 25 Candlestick XAUUSD Membandingkan Akun Standar dan Akun Cent JGS'
                        : '25-Candle XAUUSD Comparison Between Standard and Cent JGS Accounts'
                    }
                  >
                    {/* Subtle price grid */}
                    {[2885, 2892, 2900, 2908].map((lvl) => (
                      <g key={lvl}>
                        <line
                          x1={16}
                          x2={svgW - 72}
                          y1={priceToY(lvl)}
                          y2={priceToY(lvl)}
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth={1}
                        />
                        <text
                          x={svgW - 64}
                          y={priceToY(lvl) + 3}
                          fill="#8E84A4"
                          fontSize="9"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {lvl}
                        </text>
                      </g>
                    ))}

                    {simMode === 'jeygang' ? (
                      <>
                        {/* SSL Liquidity Pool Zone */}
                        <line
                          x1={18}
                          x2={svgW - 72}
                          y1={priceToY(2886)}
                          y2={priceToY(2886)}
                          stroke="#F59E0B"
                          strokeDasharray="4 4"
                          strokeWidth={1.2}
                        />
                        <text
                          x={22}
                          y={priceToY(2886) + 12}
                          fill="#F59E0B"
                          fontSize="9.5"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          SSL SWEEP (SAPUAN STOP RITEL)
                        </text>

                        {/* Fair Value Gap Glowing Gold Band */}
                        <rect
                          x={190}
                          y={priceToY(2893.5)}
                          width={svgW - 268}
                          height={Math.max(8, priceToY(2889.5) - priceToY(2893.5))}
                          fill="rgba(214, 169, 55, 0.16)"
                          stroke="rgba(214, 169, 55, 0.5)"
                          strokeDasharray="3 3"
                          rx={3}
                        />
                        <text
                          x={250}
                          y={priceToY(2892)}
                          fill="#F3E5AB"
                          fontSize="9.5"
                          fontWeight="bold"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          FVG ENTRY 0.02 CENT LOT • RISIKO 1% (10 USC)
                        </text>

                        {/* Target +20 USC Line */}
                        {visibleBars >= 15 && (
                          <>
                            <line
                              x1={220}
                              x2={svgW - 72}
                              y1={priceToY(2902)}
                              y2={priceToY(2902)}
                              stroke="#10B981"
                              strokeWidth={1.6}
                            />
                            <text
                              x={230}
                              y={priceToY(2902) - 6}
                              fill="#10B981"
                              fontSize="10"
                              fontWeight="bold"
                              fontFamily="JetBrains Mono, monospace"
                            >
                              TARGET 1:2 RRR TERCAPAI (+20 USC / +2.0%)
                            </text>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Retail FOMO Top Entry */}
                        {visibleBars >= 8 && (
                          <>
                            <line
                              x1={180}
                              x2={svgW - 72}
                              y1={priceToY(2900)}
                              y2={priceToY(2900)}
                              stroke="#B99AE8"
                              strokeDasharray="4 4"
                              strokeWidth={1.3}
                            />
                            <text
                              x={186}
                              y={priceToY(2900) - 6}
                              fill="#B99AE8"
                              fontSize="9.5"
                              fontFamily="JetBrains Mono, monospace"
                            >
                              RITEL FOMO BUY PUCUK (0.01 LOT 100 OZ)
                            </text>
                          </>
                        )}

                        {/* Margin Call Red Line */}
                        {visibleBars >= 12 && (
                          <>
                            <line
                              x1={18}
                              x2={svgW - 72}
                              y1={priceToY(2890)}
                              y2={priceToY(2890)}
                              stroke="#EF4444"
                              strokeWidth={2}
                            />
                            <rect
                              x={110}
                              y={priceToY(2890) - 18}
                              width={290}
                              height={18}
                              rx={4}
                              fill="#B91C1C"
                            />
                            <text
                              x={118}
                              y={priceToY(2890) - 6}
                              fill="#FFFFFF"
                              fontSize="9.5"
                              fontWeight="bold"
                              fontFamily="JetBrains Mono, monospace"
                            >
                              MARGIN CALL (-$10.00 / MODAL $10 HABIS!)
                            </text>
                          </>
                        )}
                      </>
                    )}

                    {/* Render Animated 25 OHLC Candlesticks */}
                    {shownCandles.map((bar, idx) => {
                      const stepX = (svgW - 104) / 25;
                      const cx = 28 + idx * stepX;
                      const isBull = bar.c >= bar.o;
                      const fill = isBull ? '#10B981' : '#EF4444';
                      const topY = priceToY(Math.max(bar.o, bar.c));
                      const botY = priceToY(Math.min(bar.o, bar.c));
                      const bodyH = Math.max(3, botY - topY);

                      return (
                        <g key={idx}>
                          <line
                            x1={cx}
                            x2={cx}
                            y1={priceToY(bar.h)}
                            y2={priceToY(bar.l)}
                            stroke={fill}
                            strokeWidth={1.4}
                          />
                          <rect
                            x={cx - 5.5}
                            y={topY}
                            width={11}
                            height={bodyH}
                            rx={1.5}
                            fill={fill}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Outcome Caption Footer */}
                  <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                    <span className="jgs-chart-label">
                      {simMode === 'jeygang'
                        ? isId
                          ? `Tunggu Zona Konfirmasi • SL Tameng ${formatUscToIdr(10)} (10 USC) • 99% Modal Terlindungi`
                          : `Confirmation Zone • Shield SL ${formatUscToIdr(10)} (10 USC) • 99% Equity Protected`
                        : isId
                        ? 'FOMO di Akun Standar: Emas Turun Sedikit -> Saldo Habis Rp0 (MC) dalam 3 Menit!'
                        : 'FOMO on Standard Lot: Small Dip -> Account Wiped Rp0 / Margin Call in 3 Min!'}
                    </span>
                    <span
                      className={`font-bold ${
                        simMode === 'jeygang' ? 'text-[#10B981]' : 'text-[#EF4444]'
                      }`}
                    >
                      {simMode === 'jeygang'
                        ? `+20 USC (${formatUscToIdr(20)}) Aman!`
                        : 'Saldo Rp0 (Margin Call!)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM MODULE: Interactive 3D-Tilt Centurion VIP Member Card */}
            <Tilt3DCard maxTilt={8}>
              <div className="jgs-centurion-dark relative overflow-hidden rounded-2xl border p-5 sm:p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Metallic EMV Chip SVG */}
                    <svg viewBox="0 0 44 32" className="w-10 h-7 shrink-0" aria-hidden="true">
                      <rect x="1" y="1" width="42" height="30" rx="5" fill="#D6A937" fillOpacity="0.9" stroke="#F3E5AB" />
                      <line x1="15" y1="1" x2="15" y2="31" stroke="#17131D" strokeWidth="1" />
                      <line x1="29" y1="1" x2="29" y2="31" stroke="#17131D" strokeWidth="1" />
                      <line x1="1" y1="16" x2="43" y2="16" stroke="#17131D" strokeWidth="1" />
                    </svg>
                    <div>
                      <div className="jgs-card-gold font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                        THE JEY GANG STRATEGIST • VIP PASS
                      </div>
                      <div className="jgs-card-ink font-display text-sm sm:text-base font-extrabold tracking-tight mt-0.5">
                        {memberName} is a part of the jey gang.
                      </div>
                    </div>
                  </div>
                  <Crown className="jgs-card-gold w-6 h-6 shrink-0" strokeWidth={1.6} />
                </div>

                <div className="mt-4 pt-3 border-t border-[#D6A937]/25 flex flex-wrap items-center justify-between gap-3">
                  <p className="jgs-card-muted text-xs font-medium">
                    &ldquo;Here&apos;s where strategist champions are made.&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="jgs-card-gold font-mono text-xs font-bold tracking-widest">
                      GANG MEMBER ID: #{memberId}
                    </span>
                    <Link
                      href={l(session ? '/account' : '/register')}
                      className="rounded-lg bg-[#D6A937] px-3 py-1.5 font-mono text-[11px] font-bold text-[#17131D] hover:bg-[#F3E5AB] transition"
                    >
                      {session
                        ? isId
                          ? 'Kartu Saya'
                          : 'My Card'
                        : isId
                        ? 'Klaim ID Gratis ->'
                        : 'Claim Free ->'}
                    </Link>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: VISUAL ANALOGY ("KENAPA 90% PEMULA BANGKRUT?") + SLIDER
         ===================================================================== */}
      <section className="py-16 sm:py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <MotionReveal className="max-w-3xl space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-gold)]">
              {isId ? 'ANALOGI PRINSIP PERTAMA' : 'FIRST-PRINCIPLES VISUAL ANALOGY'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-ivory)]">
              {isId
                ? 'Kenapa 90% Pemula Modal $10 Bangkrut di Minggu Pertama?'
                : 'Why 90% of $10 Beginners Blow Up in Their First Week'}
            </h2>
            <p className="text-[16px] leading-[1.75] text-[var(--text-secondary)]">
              {isId
                ? `Bayangkan kamu membawa uang $10 (${formatUsdToIdr(10)}) masuk ke toko emas. Masalah pemula bukan soal pintar menebak grafik, melainkan ukuran timbangan kontrak broker yang 100x terlalu berat.`
                : 'Most beginners fail not because they cannot read patterns, but because Standard Broker contract mass is 100x too heavy for a $10 bill.'}
            </p>
          </MotionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Standard vs Cent Visual Analogy Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SpotlightCard className="p-6 border-rose-500/35">
                <div className="space-y-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
                    <Scale className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-rose-400 block">
                    {isId ? 'AKUN STANDAR (100 OZ)' : 'STANDARD ACCOUNT (100 OZ)'}
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[var(--text-ivory)]">
                    {isId
                      ? 'Memikul 1 Batang Emas 31,1 Gram'
                      : 'Carrying a 1.00 Troy Oz Gold Bar'}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {isId
                      ? 'Klik terkecil 0.01 Lot Standar sama dengan memikul 1 troy oz (31,1 gram) emas utuh. Harga emas bergerak normal $10 saja dalam 2 jam -> uang $10 langsung habis 100%.'
                      : 'The smallest 0.01 Standard Lot exposes you to 1 full troy oz. A normal $10 intraday swing wipes out your entire balance.'}
                  </p>
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-6 border-emerald-500/35">
                <div className="space-y-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <Coffee className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
                    {isId ? 'AKUN CENT JGS (1 OZ)' : 'JGS CENT ACCOUNT (1 OZ)'}
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[var(--text-ivory)]">
                    {isId
                      ? 'Memegang 1 Keping 0,31 Gram (Harga Es Kopi)'
                      : 'Holding a 0.01 Oz Micro Coin (Coffee Price)'}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {isId
                      ? `Uang $10 dikonversi menjadi 1.000 USC. Klik 0.01 Cent Lot cuma memikul 0,01 oz emas. Kalah sekali hanya rugi 10 USC (${formatUscToIdr(10)}), setara harga gorengan atau es kopi!`
                      : '$10 becomes 1,000 USC. A 0.01 Cent Lot equals just 0.01 oz of gold, capping each 1% learning mistake at 10 USC (~$0.10).'}
                  </p>
                </div>
              </SpotlightCard>
            </div>

            {/* Interactive Capital Slider + Live Animated Counters */}
            <SpotlightCard className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor="home-capital-slider"
                    className="font-display font-bold text-base text-[var(--text-ivory)]"
                  >
                    {isId ? 'Coba Geser Modal Awal Kamu:' : 'Slide Your Starting Capital:'}
                  </label>
                  <span className="font-mono text-2xl font-extrabold text-[var(--accent-gold)] tabular-nums">
                    ${modalUsd} USD
                  </span>
                </div>

                <input
                  id="home-capital-slider"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={modalUsd}
                  onChange={(e) => setModalUsd(Number(e.target.value))}
                  className="w-full accent-[#D6A937] cursor-pointer"
                />

                <div className="flex justify-between font-mono text-[11px] text-[var(--text-muted)]">
                  <span>$10 (1.000 USC)</span>
                  <span>$50 (5.000 USC)</span>
                  <span>$100 (10.000 USC)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                    {isId ? 'Saldo Akun Cent' : 'Cent Account Balance'}
                  </div>
                  <div className="font-mono text-xl font-extrabold text-[var(--text-ivory)] mt-1">
                    <AnimatedNumber value={modalUsc} locale={loc} suffix=" USC" />
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                    {isId ? 'Batas Rugi Aman 1%' : 'Safe 1% Risk Cap'}
                  </div>
                  <div className="font-mono text-xl font-extrabold text-[var(--accent-gold)] mt-1">
                    <AnimatedNumber value={risk1PctUsc} locale={loc} suffix=" USC" />
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text-muted)] mt-0.5">
                    {isId ? `~Rp ${riskIdrApprox.toLocaleString('id-ID')}` : `~$${(modalUsd * 0.01).toFixed(2)} / trade`}
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                    {isId ? 'Nyawa Belajar (SL)' : 'Learning Runway'}
                  </div>
                  <div className="font-mono text-xl font-extrabold text-emerald-400 mt-1">
                    <AnimatedNumber value={100} locale={loc} suffix={isId ? ' Nyawa' : ' Trades'} />
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text-secondary)] mt-0.5">
                    {isId ? 'Bebas Margin Call dini' : 'Zero sudden blowups'}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: LIVE ICT KILLZONE & WIB MARKET SESSION RADAR BAR
         ===================================================================== */}
      <section className="py-12 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MotionReveal>
            <div className="jgs-panel p-6 sm:p-8 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
                    <Clock className="w-4 h-4" strokeWidth={1.6} />
                    <span>
                      {isId
                        ? 'RADAR WAKTU PASAR REAL-TIME (WIB • UTC • NEW YORK)'
                        : 'LIVE MARKET SESSION RADAR (WIB • UTC • NEW YORK)'}
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs font-bold ${killzone.badgeTone}`}
                  >
                    <Activity className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>{isId ? killzone.titleId : killzone.titleEn}</span>
                  </div>
                </div>

                {/* Live 3-Timezone Clocks */}
                <div className="grid grid-cols-3 gap-2.5 font-mono text-xs shrink-0">
                  <div className="rounded-xl border border-[#D6A937]/40 bg-[var(--bg-surface-2)] px-3.5 py-2.5 text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">WIB (UTC+7)</div>
                    <div className="text-sm sm:text-base font-extrabold text-[var(--accent-gold)] tabular-nums mt-0.5">
                      {clockState?.wibText ?? '--:--:--'}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-3.5 py-2.5 text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">UTC / GMT</div>
                    <div className="text-sm sm:text-base font-bold text-[var(--text-ivory)] tabular-nums mt-0.5">
                      {clockState?.utcText ?? '--:--'}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-3.5 py-2.5 text-center">
                    <div className="text-[10px] text-[var(--text-muted)]">NEW YORK</div>
                    <div className="text-sm sm:text-base font-bold text-[var(--text-ivory)] tabular-nums mt-0.5">
                      {clockState?.nyText ?? '--:--'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-8 flex items-start gap-4">
                  <div className="hidden sm:block shrink-0 w-12 h-12 rounded-full overflow-hidden border border-[#D6A937]/50 bg-[#16121F]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/jessy-waifu.png"
                      alt="Jessy, ICT Session Advisor"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-[11px] font-bold text-[var(--accent-gold)]">
                      {isId ? 'SARAN JEY & JESSY SAAT INI:' : 'CURRENT SESSION PROTOCOL:'} •{' '}
                      <span className="text-[var(--text-secondary)] font-normal">
                        {isId ? killzone.spreadNoteId : killzone.spreadNoteEn}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--text-ivory)]">
                      {isId ? killzone.adviceId : killzone.adviceEn}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-2">
                  <Link href={l('/brokers#sesi-wib')} className="jgs-btn-outline text-xs py-2.5 px-4">
                    <span>{isId ? 'Lihat Jadwal Lengkap 24 Jam WIB ->' : 'Full 24h WIB Timeline ->'}</span>
                  </Link>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: THE 4 PILLARS OF JGS ECOSYSTEM (BENTO GRID SPOTLIGHT)
         ===================================================================== */}
      <section className="py-16 sm:py-20 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <MotionReveal className="max-w-3xl space-y-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-gold)]">
              {isId ? 'EMPAT PILAR EKOSISTEM JGS' : 'FOUR PILLARS OF THE JGS ECOSYSTEM'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-ivory)]">
              {isId
                ? 'Semua yang Dibutuhkan Pemula & Quant Builder, Terbuka Gratis'
                : 'Everything Needed by Beginners & System Builders, 100% Open'}
            </h2>
          </MotionReveal>

          <MotionStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                index: '01',
                icon: BookOpen,
                tag: isId ? 'AKADEMI UNIVERSITAS • 120 SKS' : 'UNIVERSITY LMS • 120 CREDITS',
                title: isId
                  ? 'JGS Academy (20 Semester & Ijazah Resmi)'
                  : 'JGS Academy (20 Semesters & Official Diploma)',
                desc: isId
                  ? 'Belajar dari nol bersama Jessy melalui 3 Mode Baca (termasuk Mode Rangkuman Awam 1 Menit), konfirmasi entry anti-fakeout, playbook Scalping/Intraday/Swing, berita News WIB, CFTC COT, & Ijazah bertanda tangan Jahseya Mochtar Mawardi.'
                  : 'Study from first principles with Jessy via 3 Reading Modes (including 1-Minute Plain Summary), 3-gate confirmations, Scalping/Intraday/Swing SOPs, WIB News Compass, COT data, and Founder-signed Diploma.',
                href: '/academy?tab=lobby',
                cta: isId ? 'Masuk Kampus JGS Academy' : 'Enter JGS Academy',
              },
              {
                index: '02',
                icon: Layers,
                tag: isId ? 'LAB HITUNGAN & SIMULATOR GRAFIK' : 'RISK CALCULATORS & REPLAY',
                title: isId
                  ? 'Cent Lab, Position Sizer & Trading Playground'
                  : 'Cent Lab, Position Sizer & Trading Playground',
                desc: isId
                  ? 'Konversi otomatis $10 menjadi 1.000 USC, pembulatan lot aman ke bawah (Floor Rounding), simulator kerugian beruntun, dan latihan Buy/Sell/Wait di Trading Playground.'
                  : 'Auto-convert $10 into 1,000 USC, enforce safe Floor Rounding lot sizing, simulate losing streaks, and practice Buy/Sell/Wait discipline on historical candles.',
                href: '/calculators/cent',
                cta: isId ? 'Buka Lab Kalkulator' : 'Open Calculators',
              },
              {
                index: '03',
                icon: Landmark,
                tag: isId ? 'PANDUAN PRAKTIS PEMULA & MT5' : 'BEGINNER BROKER & MT5 GUIDE',
                title: isId
                  ? 'Panduan & Rekomendasi Broker Akun Cent + Tutorial MT5'
                  : 'Cent Broker Guide, Multi-Pair Survival & MT5 Setup',
                desc: isId
                  ? 'Riset lengkap Exness Standard Cent, RoboForex ProCent (aturan wajib anti markup .p), XS.com, jebakan Perak XAGUSDc 50x, jadwal spread WIB, dan tutorial 5 langkah login MT5.'
                  : 'Compare Exness Standard Cent, RoboForex ProCent, XS.com, XM Ultra Low, Indonesian BI/OJK brokers, XAGUSDc 50x contract trap, plus 5-step MT5 visual setup.',
                href: '/brokers',
                cta: isId ? 'Buka Panduan Broker & MT5' : 'Open Broker Masterclass',
              },
              {
                index: '04',
                icon: Compass,
                tag: isId ? 'LIVE INTELIJEN • SINYAL & COT' : 'LIVE INTELLIGENCE • SIGNALS & COT',
                title: isId
                  ? 'Riset & Strategi (Live Signal 12 Pair, Fundamental & CFTC COT)'
                  : 'Research & Strategy (12-Pair Scanner, Macro Bias & CFTC COT)',
                desc: isId
                  ? 'Pantau pemindai sinyal 12 pasangan tersinkron harga live setiap 10 detik lengkap dengan 4 alasan konfirmasi dan hitungan lot 1.000 USC, radar skor suku bunga, serta detektor divergensi Ritel vs COT Institusi.'
                  : 'Monitor 12 live-synced trading setups every 10 seconds with 4 confirmation steps and 1,000 USC lot guidance, macro rate radars, and Retail vs Institutional CFTC COT divergence alerts.',
                href: '/signals',
                cta: isId ? 'Buka Live Intelligence Hub' : 'Open Live Intelligence Hub',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <MotionStaggerItem key={card.index}>
                  <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-gold)]">
                          <Icon className="w-4 h-4" strokeWidth={1.6} />
                          <span>{card.tag}</span>
                        </span>
                        <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                          {card.index}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-[var(--text-ivory)]">
                        {card.title}
                      </h3>

                      <p className="text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={l(card.href)}
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-gold)] hover:underline"
                      >
                        <span>{card.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </Link>
                    </div>
                  </SpotlightCard>
                </MotionStaggerItem>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      {/* 8 Ancient Mythological Ranks Showcase */}
      <section className="py-12 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MythologicalRankShowcase compact locale={loc} />
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: WALL OF THE JEY GANG COLLECTIVE & FREE INITIATION CTA
         ===================================================================== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-gold)]">
                <Users className="w-4 h-4" strokeWidth={1.6} />
                <span>{isId ? 'KOLEKTIF ANGGOTA THE JEY GANG' : 'THE JEY GANG COLLECTIVE ROSTER'}</span>
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-ivory)]">
                {isId
                  ? 'Bergabung dengan Strategist yang Belajar Sebelum Pertaruhkan Modal'
                  : 'Join Strategists Mastering Mechanics Before Risking Capital'}
              </h2>
            </div>

            <Link href={l(session ? '/account' : '/register')} className="jgs-btn-gold text-sm shrink-0">
              <Crown className="w-4 h-4" strokeWidth={1.75} />
              <span>
                {session
                  ? isId
                    ? `Buka Kartu #${session.gangId}`
                    : `View Card #${session.gangId}`
                  : isId
                  ? 'Klaim Gang Member ID Gratis ->'
                  : 'Claim Free Gang Member ID ->'}
              </span>
            </Link>
          </MotionReveal>

          <MotionStagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topMembers.map((member) => (
              <MotionStaggerItem key={member.gangId}>
                <SpotlightCard className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
                        {member.beltLabel}
                      </span>
                      <h3 className="font-display text-lg font-bold text-[var(--text-ivory)] mt-0.5">
                        {member.fullName} is a part of the jey gang.
                      </h3>
                    </div>
                    <Award className="w-5 h-5 text-[var(--accent-gold)] shrink-0" strokeWidth={1.5} />
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    &ldquo;Here&apos;s where strategist champions are made.&rdquo;
                  </p>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-[11px]">
                    <span className="text-[var(--accent-gold)] font-bold">
                      GANG MEMBER ID: #{member.gangId}
                    </span>
                    <span className="text-emerald-400 inline-flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {member.division.split(' ')[0]}
                    </span>
                  </div>
                </SpotlightCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>

          {/* Educational Honesty Disclaimer */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/60 p-4 flex items-start gap-3 text-xs text-[var(--text-secondary)]">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" strokeWidth={1.6} />
            <p className="leading-relaxed">
              {isId
                ? 'Catatan Edukasi: Grafik simulasi dan contoh angka $10 = 1.000 USC bersifat ilustratif untuk mempelajari mekanisme kontrak, spread, dan disiplin manajemen risiko. Hasil nyata bergantung pada kondisi likuiditas pasar dan kedisiplinan setiap pengguna.'
                : 'Educational Notice: Simulated chart replays and $10 = 1,000 USC examples illustrate contract mass, spread friction, and risk mechanics. Real outcomes depend on market liquidity and trader discipline.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
