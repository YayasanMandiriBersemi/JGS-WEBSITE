'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Crosshair,
  TrendingUp,
  Layers,
  AlertTriangle,
  ShieldCheck,
  Play,
  RotateCcw,
  ArrowRight,
  Skull,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

// ============================================================================
// 1. ENGINE 4: INTERACTIVE SIMULATION "BEDAH ANATOMI MARGIN CALL VS SETUP TERUKUR"
// ============================================================================

interface SimStep {
  tradeNum: number;
  eventId: string;
  eventEn: string;
  retailActionId: string;
  retailActionEn: string;
  retailBalanceUsc: number;
  retailDeltaLabel: string;
  jgsActionId: string;
  jgsActionEn: string;
  jgsBalanceUsc: number;
  jgsDeltaLabel: string;
}

const FIVE_TRADE_XAUUSD_SEQUENCE: SimStep[] = [
  {
    tradeNum: 0,
    eventId: 'Saldo Awal Akun Cent: 1,000 USC ($10.00)',
    eventEn: 'Starting Cent Balance: 1,000 USC ($10.00)',
    retailActionId: 'Belum ada posisi terbuka.',
    retailActionEn: 'No open positions yet.',
    retailBalanceUsc: 1000,
    retailDeltaLabel: '1,000 USC (100%)',
    jgsActionId: 'Cek Killzone & batasi risiko 1% = 10 USC per setup.',
    jgsActionEn: 'Verify Killzone & cap risk at 1% = 10 USC per setup.',
    jgsBalanceUsc: 1000,
    jgsDeltaLabel: '1,000 USC (100%)',
  },
  {
    tradeNum: 1,
    eventId: 'Trade 1, Judas Swing London Session (XAUUSD turun dulu)',
    eventEn: 'Trade 1, London Session Judas Swing (Fake Breakout)',
    retailActionId: 'FOMO Buy 0.20 lot tanpa Stop Loss → Loss -220 USC!',
    retailActionEn: 'FOMO Buy 0.20 lot without Stop Loss → Loss -220 USC!',
    retailBalanceUsc: 780,
    retailDeltaLabel: '-220 USC (-22%)',
    jgsActionId: 'Buy FVG 0.02 lot Cent, kena SL terukur → -10 USC (-1%).',
    jgsActionEn: '0.02 Cent lot entry, clean SL hit → -10 USC (-1%).',
    jgsBalanceUsc: 990,
    jgsDeltaLabel: '-10 USC (-1%)',
  },
  {
    tradeNum: 2,
    eventId: 'Trade 2, Candle CPI/Berita Menghentak Dua Arah',
    eventEn: 'Trade 2, Volatile Whipsaw During Macro Release',
    retailActionId: 'Balas dendam lipat lot (Martingale 0.40 lot) → -380 USC!',
    retailActionEn: 'Revenge trade doubling to 0.40 lot → -380 USC!',
    retailBalanceUsc: 400,
    retailDeltaLabel: '-380 USC (Saldo sisa 40%)',
    jgsActionId: 'Tetap disiplin 0.02 lot Cent, SL kena lagi → -10 USC.',
    jgsActionEn: 'Stay calm with 0.02 Cent lot, second SL hit → -10 USC.',
    jgsBalanceUsc: 980,
    jgsDeltaLabel: '-10 USC (Saldo masih 98%!)',
  },
  {
    tradeNum: 3,
    eventId: 'Trade 3, Sapuan SSL + Market Structure Shift Valid (1:2.5 R:R)',
    eventEn: 'Trade 3, Valid SSL Sweep + MSS + FVG Setup (1:2.5 R:R)',
    retailActionId: 'Panik & over-lot "All-In" 0.50 lot di pucuk → -290 USC!',
    retailActionEn: 'Panic all-in 0.50 lot chasing price → -290 USC!',
    retailBalanceUsc: 110,
    retailDeltaLabel: '-290 USC (Kritis! Sisa 11%)',
    jgsActionId: 'Tunggu 24j cooldown, entry 0.02 lot di FVG → Win +25 USC (+2.5R).',
    jgsActionEn: 'Respected cooldown, clean 0.02 FVG entry → Win +25 USC (+2.5R).',
    jgsBalanceUsc: 1005,
    jgsDeltaLabel: '+25 USC (+2.5R • Balik Profit!)',
  },
  {
    tradeNum: 4,
    eventId: 'Trade 4, NY Silver Bullet (21:00 WIB) Setup A+ 1:3.5 R:R',
    eventEn: 'Trade 4, NY Silver Bullet (10:00 AM EST) A+ Setup 1:3.5 R:R',
    retailActionId: 'Akun kena Margin Call / Stop Out saat spread melebar → 0 USC!',
    retailActionEn: 'Account liquidated via Margin Call / Stop Out → 0 USC!',
    retailBalanceUsc: 0,
    retailDeltaLabel: '-110 USC (MARGIN CALL 0 USC)',
    jgsActionId: 'Entry 0.02 lot di FVG Diskon → TP kena bersih +35 USC (+3.5R)!',
    jgsActionEn: '0.02 lot entry in Discount FVG → Full TP +35 USC (+3.5R)!',
    jgsBalanceUsc: 1040,
    jgsDeltaLabel: '+35 USC (Total +40 USC / +4.0%)',
  },
  {
    tradeNum: 5,
    eventId: 'Trade 5, Evaluasi Jurnal Akhir Pekan (5 Transaksi Selesai)',
    eventEn: 'Trade 5, Weekly Review After 5 XAUUSD Executions',
    retailActionId: 'Akun hangus total (-100%). Tidak punya data untuk dievaluasi.',
    retailActionEn: 'Account wiped (-100%). Forced to top up again from zero.',
    retailBalanceUsc: 0,
    retailDeltaLabel: 'HANCUR (-100% MC)',
    jgsActionId: 'Meski sempat 2x kalah di awal, aturan 1% menjaga modal & profit +40 USC!',
    jgsActionEn: 'Even starting with 2 losses, 1% sizing preserved capital & closed +40 USC!',
    jgsBalanceUsc: 1040,
    jgsDeltaLabel: '+40 USC NET (+4.0R)',
  },
];

export function JgsMarginCallSimulator({ locale }: { locale: 'id' | 'en' }) {
  const isId = locale === 'id';
  const [stepIndex, setStepIndex] = useState<number>(0);

  const current = FIVE_TRADE_XAUUSD_SEQUENCE[stepIndex];
  const visibleHistory = FIVE_TRADE_XAUUSD_SEQUENCE.slice(0, stepIndex + 1);

  const handleRunNextOrComplete = () => {
    if (stepIndex < FIVE_TRADE_XAUUSD_SEQUENCE.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setStepIndex(FIVE_TRADE_XAUUSD_SEQUENCE.length - 1);
    }
  };

  const handleRunFull5Trades = () => {
    setStepIndex(FIVE_TRADE_XAUUSD_SEQUENCE.length - 1);
  };

  const handleReset = () => {
    setStepIndex(0);
  };

  // SVG Chart coordinate mapping (0..5 X axis, 0..1100 USC Y axis)
  const mapX = (idx: number) => 40 + (idx / 5) * 440;
  const mapY = (usc: number) => 170 - (usc / 1100) * 145;

  const retailPoints = visibleHistory
    .map((s) => `${mapX(s.tradeNum)},${mapY(s.retailBalanceUsc)}`)
    .join(' ');
  const jgsPoints = visibleHistory
    .map((s) => `${mapX(s.tradeNum)},${mapY(s.jgsBalanceUsc)}`)
    .join(' ');

  return (
    <div className="rounded-3xl border border-jgs-gold/35 bg-gradient-to-br from-jgs-plum-surface via-jgs-plum-deep to-jgs-plum-surface p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-jgs-gold block">
            {isId
              ? 'ENGINE 4 // SIMULATOR INTERAKTIF EDUKATIF'
              : 'ENGINE 4 // INTERACTIVE SURVIVAL SIMULATION'}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-jgs-ivory mt-1">
            {isId
              ? 'Bedah Anatomi Margin Call vs. Setup Terukur (1,000 USC)'
              : 'Anatomy of a Margin Call vs. Precision Strategy (1,000 USC)'}
          </h3>
          <p className="text-xs sm:text-sm text-jgs-ivory-muted mt-1 max-w-2xl">
            {isId
              ? 'Lihat bagaimana modal yang sama persis ($10 / 1,000 USC) menghasilkan nasib bertolak belakang hanya karena ukuran lot dan disiplin Stop Loss.'
              : 'Watch how the exact same $10 (1,000 USC) balance faces two opposite fates purely due to lot sizing and Stop Loss discipline.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {stepIndex < FIVE_TRADE_XAUUSD_SEQUENCE.length - 1 ? (
            <>
              <button
                type="button"
                onClick={handleRunNextOrComplete}
                className="inline-flex items-center gap-2 rounded-xl bg-jgs-gold px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-jgs-plum-deep hover:bg-jgs-gold-light transition-all shadow-gold-glow"
              >
                <Play className="w-3.5 h-3.5" />
                {isId
                  ? `Jalankan Trade #${stepIndex + 1}`
                  : `Step Trade #${stepIndex + 1}`}
              </button>
              <button
                type="button"
                onClick={handleRunFull5Trades}
                className="inline-flex items-center gap-2 rounded-xl border border-jgs-gold/50 bg-jgs-gold/10 px-4 py-2.5 font-mono text-xs font-semibold text-jgs-gold hover:bg-jgs-gold/20 transition-all"
              >
                {isId
                  ? 'Jalankan Simulasi 5 Transaksi XAUUSD'
                  : 'Run 5-Trade XAUUSD Simulation'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-jgs-plum-surface px-4 py-2.5 font-mono text-xs font-semibold text-jgs-ivory hover:border-jgs-gold/50 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-jgs-gold" />
              {isId ? 'Ulangi Simulasi dari Awal' : 'Reset Simulation'}
            </button>
          )}
        </div>
      </div>

      {/* Current Event Pill */}
      <div className="rounded-xl border border-jgs-gold/30 bg-jgs-plum-deep/80 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-bold text-jgs-gold">
          {isId ? current.eventId : current.eventEn}
        </span>
        <span className="font-mono text-[11px] text-jgs-ivory-faint">
          STEP {stepIndex} / 5
        </span>
      </div>

      {/* Side-by-Side Comparison + Equity Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 6 Cols: Dual Health Bars & Trade Cards */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          {/* Jalur Merah: Retail Emotion */}
          <div className="rounded-2xl border border-red-500/40 bg-red-950/20 p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-red-400">
                <Skull className="w-4 h-4" />
                {isId ? 'JALUR MERAH: RETAIL EMOTION (FOMO & MARTINGALE)' : 'RED PATH: RETAIL EMOTION (OVER-LOT & MARTINGALE)'}
              </span>
              <span className="font-mono text-base font-bold text-red-400">
                {current.retailBalanceUsc} USC
              </span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-jgs-plum-deep border border-red-500/30">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
                style={{ width: `${Math.max(0, (current.retailBalanceUsc / 1000) * 100)}%` }}
              />
            </div>

            <div className="flex items-start justify-between gap-3 text-xs">
              <p className="text-jgs-ivory leading-relaxed">
                {isId ? current.retailActionId : current.retailActionEn}
              </p>
              <span className="font-mono text-[11px] font-bold text-red-300 shrink-0">
                {current.retailDeltaLabel}
              </span>
            </div>
          </div>

          {/* Jalur Emas: JGS Strategist */}
          <div className="rounded-2xl border border-jgs-gold/50 bg-jgs-gold/10 p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-jgs-gold">
                <ShieldCheck className="w-4 h-4" />
                {isId ? 'JALUR EMAS: JGS STRATEGIST (0.02 LOT CENT • 1% RISK)' : 'GOLD PATH: JGS STRATEGIST (0.02 CENT LOT • 1% RISK)'}
              </span>
              <span className="font-mono text-base font-bold text-emerald-400">
                {current.jgsBalanceUsc} USC
              </span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-jgs-plum-deep border border-jgs-gold/30">
              <div
                className="h-full bg-gradient-to-r from-jgs-gold to-emerald-400 transition-all duration-500"
                style={{
                  width: `${Math.min(100, (current.jgsBalanceUsc / 1100) * 100)}%`,
                }}
              />
            </div>

            <div className="flex items-start justify-between gap-3 text-xs">
              <p className="text-jgs-ivory leading-relaxed">
                {isId ? current.jgsActionId : current.jgsActionEn}
              </p>
              <span className="font-mono text-[11px] font-bold text-emerald-400 shrink-0">
                {current.jgsDeltaLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Dual-Path Equity Curve SVG */}
        <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-jgs-plum-deep/90 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-jgs-ivory-faint">
              {isId ? 'KURVA EKUITAS KOMPARATIF (USC)' : 'COMPARATIVE EQUITY CURVE (USC)'}
            </span>
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-jgs-gold">
                <span className="h-2 w-2 rounded-full bg-jgs-gold" /> JGS (1% SL)
              </span>
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="h-2 w-2 rounded-full bg-red-400" /> Retail Over-Lot
              </span>
            </div>
          </div>

          <div className="rounded-xl p-2 jgs-chart-frame">
            <svg viewBox="0 0 520 200" className="w-full h-48 overflow-visible">
            {/* Horizontal grid lines */}
            {[0, 250, 500, 750, 1000].map((val) => {
              const y = mapY(val);
              return (
                <g key={val}>
                  <line
                    x1={40}
                    y1={y}
                    x2={480}
                    y2={y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={34}
                    y={y + 3}
                    textAnchor="end"
                    fill="#9D94AF"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Jalur Merah Polyline */}
            {visibleHistory.length > 1 && (
              <polyline
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={retailPoints}
              />
            )}

            {/* Jalur Emas Polyline */}
            {visibleHistory.length > 1 && (
              <polyline
                fill="none"
                stroke="#D6A937"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={jgsPoints}
              />
            )}

            {/* Dots */}
            {visibleHistory.map((pt) => (
              <g key={pt.tradeNum}>
                <circle
                  cx={mapX(pt.tradeNum)}
                  cy={mapY(pt.retailBalanceUsc)}
                  r={4.5}
                  fill="#EF4444"
                />
                <circle
                  cx={mapX(pt.tradeNum)}
                  cy={mapY(pt.jgsBalanceUsc)}
                  r={5}
                  fill="#D6A937"
                />
                <text
                  x={mapX(pt.tradeNum)}
                  y={190}
                  textAnchor="middle"
                  fill="#9D94AF"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  T{pt.tradeNum}
                </text>
              </g>
            ))}
          </svg>
          </div>

          <p className="text-[11px] text-jgs-ivory-muted border-t border-white/10 pt-3">
            {isId
              ? 'Catatan Kejujuran: Perbedaan hasil di atas adalah murni matematika ukuran lot. JGS menormalisasi kekalahan beruntun menjadi -20 USC, bukan Margin Call.'
              : 'Honest Takeaway: The divergence above is pure position-sizing math. JGS caps consecutive losses at -20 USC instead of a Margin Call.'}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. FLAGSHIP CURRICULUM: 4-STEP VISUAL ICT/SMC EXECUTION BLUEPRINT
// ============================================================================

interface BlueprintStep {
  num: string;
  key: 'TIME' | 'LIQUIDITY' | 'MSS' | 'FVG';
  badge: string;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  ruleId: string;
  ruleEn: string;
}

const ICT_BLUEPRINT_STEPS: BlueprintStep[] = [
  {
    num: '01',
    key: 'TIME',
    badge: 'TIME BEFORE PRICE',
    titleId: 'Langkah 1: Time Before Price (Killzones & Silver Bullet)',
    titleEn: 'Step 1: Time Before Price (Killzones & Silver Bullet)',
    descId:
      'Institusi besar tidak masuk pasar sepanjang 24 jam. Jangan pernah mencari setup di tengah jam tidur pasar Asia. Fokus hanya di London Killzone (14:00–17:00 WIB) atau NY Killzone / Silver Bullet (19:00–22:00 WIB).',
    descEn:
      'Large algorithmic liquidity desks do not execute randomly all day. Focus exclusively on London Killzone (02:00–05:00 EST / 14:00–17:00 WIB) and NY Killzone / Silver Bullet (07:00–11:00 EST / 19:00–22:00 WIB).',
    ruleId: 'Aturan JGS: Chart bagus di luar jam Killzone = JANGAN DISENTUH.',
    ruleEn: 'JGS Rule: Good-looking pattern outside Killzones = DO NOT TOUCH.',
  },
  {
    num: '02',
    key: 'LIQUIDITY',
    badge: 'BSL / SSL SWEEP',
    titleId: 'Langkah 2: Sapuan Likuiditas (Liquidity Sweep BSL/SSL)',
    titleEn: 'Step 2: Liquidity Sweep (BSL & SSL + Judas Swing)',
    descId:
      'Harga menyapu kumpulan Stop Loss trader ritel (Equal Highs / Equal Lows atau High/Low sesi Asia) melalui "Judas Swing" palsu sebelum bergerak ke arah aslinya.',
    descEn:
      'Price engineered a fake move ("Judas Swing") through clustered retail stops resting above Equal Highs (BSL) or below Asian Lows (SSL) to fuel institutional fills.',
    ruleId: 'Aturan JGS: Kita bukan yang kena sapu SL, kita menunggu sapuan selesai.',
    ruleEn: 'JGS Rule: Never chase the breakout; wait for the liquidity sweep to finish.',
  },
  {
    num: '03',
    key: 'MSS',
    badge: 'MSS & DISPLACEMENT',
    titleId: 'Langkah 3: Market Structure Shift (MSS) & Displacement',
    titleEn: 'Step 3: Market Structure Shift (MSS) & Displacement',
    descId:
      'Setelah likuiditas tersapu, harus muncul candle dorongan kuat (Displacement) yang mematahkan titik struktur minor terdekat dan meninggalkan jejak ketidakseimbangan harga.',
    descEn:
      'Following the sweep, an energetic institutional impulse candle (Displacement) must close forcefully through the nearest swing structure pivot.',
    ruleId: 'Aturan JGS: Tanpa candle Displacement tegas, berarti tidak ada perubahan tren valid.',
    ruleEn: 'JGS Rule: Without decisive Displacement body closes, there is no confirmed shift.',
  },
  {
    num: '04',
    key: 'FVG',
    badge: 'FVG + 1,000 USC SIZING',
    titleId: 'Langkah 4: Fair Value Gap (FVG) & Sizing 1,000 USC',
    titleEn: 'Step 4: Fair Value Gap (FVG) Entry & 1,000 USC Sizing',
    descId:
      'Pasang limit atau tunggu harga retrace ke zona Fair Value Gap (FVG) di wilayah Discount (untuk Buy) / Premium (untuk Sell), lalu kunci lot 0.02–0.04 Cent dengan risiko maksimal 1% (10 USC).',
    descEn:
      'Wait for price to retrace into the Discount/Premium Fair Value Gap (FVG) left behind by Displacement, then size strictly at 0.02–0.04 Cent lots capping loss at 1% (10 USC).',
    ruleId: 'Aturan JGS: Wajib lolos 4 Centang di Pre-Entry ICT Gatekeeper sebelum buka MT5.',
    ruleEn: 'JGS Rule: Must pass all 4 Pre-Entry ICT Gatekeeper checks before MT5 order entry.',
  },
];

export function JgsIctExecutionBlueprint({ locale }: { locale: 'id' | 'en' }) {
  const isId = locale === 'id';
  const [activeKey, setActiveKey] = useState<BlueprintStep['key']>('TIME');
  const activeStep = ICT_BLUEPRINT_STEPS.find((s) => s.key === activeKey) ?? ICT_BLUEPRINT_STEPS[0];

  return (
    <div className="rounded-3xl border border-jgs-gold/30 bg-jgs-plum-surface/80 p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-jgs-gold block">
            {isId
              ? 'CURRICULUM FLAGSHIP // ICT & SMC TANPA PUSING'
              : 'FLAGSHIP CURRICULUM // ICT & SMC EXECUTION BLUEPRINT'}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-jgs-ivory mt-1">
            {isId
              ? 'Peta Visual 4 Langkah Eksekusi Presisi (Metodologi Michael J. Huddleston)'
              : '4-Step Visual ICT Execution Blueprint (Michael J. Huddleston Framework)'}
          </h3>
        </div>
        <Link
          href={`/${locale}/calculators/position-size`}
          className="inline-flex items-center gap-2 rounded-xl border border-jgs-gold/45 bg-jgs-gold/10 px-4 py-2 font-mono text-xs font-semibold text-jgs-gold hover:bg-jgs-gold/20 transition-all"
        >
          <Crosshair className="w-3.5 h-3.5" />
          {isId ? 'Uji Checklist di Position Sizer →' : 'Open Pre-Entry ICT Gatekeeper →'}
        </Link>
      </div>

      {/* Interactive 4-Step Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ICT_BLUEPRINT_STEPS.map((step) => {
          const isSelected = step.key === activeKey;
          return (
            <button
              key={step.key}
              type="button"
              onClick={() => setActiveKey(step.key)}
              className={`text-left rounded-2xl border p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] ${
                isSelected
                  ? 'jgs-tab-active border-jgs-gold shadow-gold-glow'
                  : 'border-white/10 bg-jgs-plum-deep/70 hover:border-jgs-gold/40'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className={`font-bold ${isSelected ? 'text-[#D6A937]' : 'text-jgs-gold'}`}>
                  STEP {step.num}
                </span>
                <span className={isSelected ? 'text-[#D6A937]/90' : 'text-jgs-ivory-faint'}>
                  {step.badge}
                </span>
              </div>
              <p
                className={`font-display text-sm font-bold mt-2 leading-snug ${
                  isSelected ? 'text-[#F6F3EC]' : 'text-jgs-ivory'
                }`}
              >
                {isId ? step.titleId.replace(/^Langkah \d+: /, '') : step.titleEn.replace(/^Step \d+: /, '')}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Dive + Clean Visual Schematic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl border border-white/10 bg-jgs-plum-deep/90 p-5 sm:p-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-jgs-gold/40 bg-jgs-gold/10 px-3 py-1 font-mono text-[10px] font-bold text-jgs-gold">
            STEP {activeStep.num} // {activeStep.badge}
          </div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-jgs-ivory">
            {isId ? activeStep.titleId : activeStep.titleEn}
          </h4>
          <p className="text-sm text-jgs-ivory-muted leading-relaxed">
            {isId ? activeStep.descId : activeStep.descEn}
          </p>
          <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3.5 text-xs font-semibold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{isId ? activeStep.ruleId : activeStep.ruleEn}</span>
          </div>
        </div>

        {/* Interactive Schematic SVG highlighting active ICT phase */}
        <div className="lg:col-span-5 rounded-xl border border-white/10 jgs-chart-frame p-4">
          <svg viewBox="0 0 360 180" className="w-full h-44">
            {/* Asian Range SSL Line */}
            <line
              x1="20"
              y1="115"
              x2="340"
              y2="115"
              stroke={activeKey === 'LIQUIDITY' ? '#EF4444' : 'rgba(255,255,255,0.2)'}
              strokeWidth={activeKey === 'LIQUIDITY' ? '2' : '1'}
              strokeDasharray="4 4"
            />
            <text x="24" y="108" fill="#EF4444" fontSize="9" fontFamily="monospace">
              SSL / Asian Low Liquidity Pool
            </text>

            {/* Killzone shaded vertical box */}
            <rect
              x="75"
              y="15"
              width="195"
              height="150"
              fill={activeKey === 'TIME' ? 'rgba(214, 169, 55, 0.16)' : 'rgba(255,255,255,0.03)'}
              stroke={activeKey === 'TIME' ? '#D6A937' : 'rgba(255,255,255,0.1)'}
              strokeDasharray="3 3"
            />
            <text x="82" y="29" fill="#D6A937" fontSize="9" fontFamily="monospace">
              KILLZONE WINDOW (LDN / NY)
            </text>

            {/* Price Path: Sweep below SSL -> MSS Impulse -> FVG Pullback -> Rally */}
            <polyline
              fill="none"
              stroke="#B99AE8"
              strokeWidth="2.5"
              points="25,95 65,108 95,148 120,105 165,55 195,95 295,30"
            />

            {/* Judas Sweep Highlight */}
            <circle
              cx="95"
              cy="148"
              r={activeKey === 'LIQUIDITY' ? '7' : '4'}
              fill="#EF4444"
            />
            <text x="103" y="156" fill="#EF4444" fontSize="9" fontFamily="monospace">
              1. Sweep (Judas)
            </text>

            {/* MSS Line */}
            <line
              x1="100"
              y1="82"
              x2="230"
              y2="82"
              stroke={activeKey === 'MSS' ? '#10B981' : 'rgba(16,185,129,0.45)'}
              strokeWidth={activeKey === 'MSS' ? '2.5' : '1'}
            />
            <text x="168" y="75" fill="#10B981" fontSize="9" fontFamily="monospace">
              2. MSS Break
            </text>

            {/* FVG Box */}
            <rect
              x="145"
              y="88"
              width="95"
              height="20"
              fill={activeKey === 'FVG' ? 'rgba(214, 169, 55, 0.32)' : 'rgba(214, 169, 55, 0.14)'}
              stroke="#D6A937"
              strokeWidth={activeKey === 'FVG' ? '2' : '1'}
            />
            <text x="195" y="102" fill="#F3EFF8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              3. FVG ENTRY (0.02 Lot)
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. "RUANG OTOPSI SETUP GAGAL" (HUMBLE TRANSPARENCY MODULE)
// ============================================================================

export function JgsIctAutopsyRoom({ locale }: { locale: 'id' | 'en' }) {
  const isId = locale === 'id';

  const failedCases = [
    {
      code: 'AUTOPSY #01',
      title: isId
        ? 'Setup XAUUSD Buy FVG Gagal Saat Candle CPI'
        : 'Failed XAUUSD Buy FVG During CPI News Spike',
      whyFailed: isId
        ? 'Struktur H1 terlihat rapi, tetapi trader mengabaikan jam rilis berita CPI (20:30 WIB). Spread broker melebar 45 points dan menembus FVG tanpa pantulan.'
        : 'H1 structure looked textbook, yet trader ignored high-impact CPI release at 8:30 AM EST. Broker spreads widened and sliced straight through the FVG.',
      lossCapped: '-10 USC (-1.0% pada akun 1,000 USC)',
      lesson: isId
        ? 'Karena Stop Loss terkunci 0.02 lot Cent, akun selamat 99% dan tetap siap untuk Setup NY Silver Bullet berikutnya.'
        : 'Because Stop Loss capped risk at 0.02 Cent lots, 99% of equity survived intact for the next valid session.',
    },
    {
      code: 'AUTOPSY #02',
      title: isId
        ? 'Tertipu Sweep Palsu di Tengah Sesi Asia Sepi'
        : 'Trapped in Premature Asian Range Liquidity Fakeout',
      whyFailed: isId
        ? 'Trader masuk pukul 11:00 WIB karena mengira breakout kecil sudah merupakan MSS. Padahal institusi London baru membuka likuiditas pukul 14:00 WIB.'
        : 'Entered at 11:00 WIB mistaking thin Asian volume for Displacement. True institutional liquidity only swept the low at London Open (14:00 WIB).',
      lossCapped: '-10 USC (-1.0% pada akun 1,000 USC)',
      lesson: isId
        ? 'Time Before Price bukan slogan pajangan. Tunggu jendela Killzone sebelum mengambil risiko 1%.'
        : 'Time Before Price is non-negotiable. Wait for the Killzone clock before allocating 1% risk.',
    },
    {
      code: 'AUTOPSY #03',
      title: isId
        ? 'Melawan Arah Daily Bias (Entry Counter-Trend Terlalu Dini)'
        : 'Counter-Trend FVG Buy Against Strong Bearish Daily Bias',
      whyFailed: isId
        ? 'Meski ada FVG M5 naik, harga harian masih menuju SSL besar di bawah. Pullback kecil hanya menjadi Inducement bagi penjual institusi.'
        : 'Despite an M5 bullish FVG, Daily HTF flow was targeting major SSL below. The M5 bounce served merely as retail inducement.',
      lossCapped: '-10 USC (-1.0% pada akun 1,000 USC)',
      lesson: isId
        ? 'Aturan Cooldown 2x Loss (-20 USC) langsung mencegah balas dendam, menghentikan kerugian sebelum melebar.'
        : 'The 2-Loss Cooldown Rule (-20 USC max daily loss) stopped revenge trading cold.',
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-jgs-plum-surface/75 p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-jgs-gold block">
            {isId
              ? 'MODUL KEJUJURAN // RUANG OTOPSI SETUP GAGAL'
              : 'HUMBLE TRANSPARENCY // FAILED SETUP AUTOPSY ROOM'}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-jgs-ivory mt-1">
            {isId
              ? 'Setup ICT pun Bisa Kena Stop Loss, Begini Cara Kami Selamat'
              : 'Even Textbook ICT Setups Hit Stop Loss, Here Is How 1% Risk Saves You'}
          </h3>
        </div>
        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 font-mono text-[11px] text-emerald-400">
          {isId ? 'ZERO HYPE • ZERO WIN-RATE PALSU' : 'ZERO HYPE • NO FAKE 100% WIN RATE'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {failedCases.map((item) => (
          <div
            key={item.code}
            className="rounded-2xl border border-white/10 bg-jgs-plum-deep/85 p-5 flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-red-400 font-bold">{item.code}</span>
                <span className="text-emerald-400">{item.lossCapped}</span>
              </div>
              <h4 className="font-display text-lg font-bold text-jgs-ivory leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-jgs-ivory-muted leading-relaxed">{item.whyFailed}</p>
            </div>

            <div className="rounded-xl border border-jgs-gold/30 bg-jgs-gold/10 p-3 text-xs text-jgs-gold leading-relaxed">
              <strong className="block font-mono text-[10px] uppercase tracking-wider mb-0.5">
                {isId ? 'Pelajaran & Proteksi Modal:' : 'Takeaway & Capital Saved:'}
              </strong>
              {item.lesson}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
