'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  Landmark,
  Layers,
  MonitorSmartphone,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Terminal,
  Wallet,
} from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import { injectLiveIdrRates } from '@/lib/currency/live-idr';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';
import {
  AnimatedNumber,
  MotionReveal,
  SpotlightCard,
} from '@/components/ui/LuxuryMotion';
import {
  BROKER_PROFILES,
  MT5_SETUP_STEPS,
  MULTI_PAIR_CENT_SPECS,
  WIB_24H_TIMELINE,
  type BrokerTierKey,
} from '@/lib/data/broker-guide-data';

export function BrokerRecommendationHub() {
  const { locale, isId, l } = useLocale();
  const loc = locale === 'en' ? 'en' : 'id';

  // Section 1: M1 Layering Spread Friction Simulator
  const [simLayers, setSimLayers] = useState<number>(10);
  const [simTargetUsd, setSimTargetUsd] = useState<number>(1.5);
  const [simSpreadPts, setSimSpreadPts] = useState<number>(18);

  // Section 2: Tier Tabs
  const [activeTier, setActiveTier] = useState<BrokerTierKey>('CENT');

  // Section 3: Multi-Pair Basket Slider + Live WIB Clock
  const [basketLayers, setBasketLayers] = useState<number>(10);
  const [wibInfo, setWibInfo] = useState<{ label: string; minutes: number } | null>(null);

  // Section 4: 5-Step MT5 Interactive Stepper
  const [activeMt5Step, setActiveMt5Step] = useState<number>(0);

  useEffect(() => {
    const syncClock = () => {
      const now = new Date();
      const str = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
      const [hh, mm] = str.split(':').map(Number);
      setWibInfo({ label: str, minutes: (hh || 0) * 60 + (mm || 0) });
    };
    syncClock();
    const timer = setInterval(syncClock, 15000);
    return () => clearInterval(timer);
  }, []);

  // Section 1 Derived Math (1 Cent Lot = 1 oz -> 0.01 Cent Lot = 0.01 oz)
  const simTotalCentLot = Number((simLayers * 0.01).toFixed(2));
  const simSpreadCostUsc = Number((simLayers * (simSpreadPts / 100)).toFixed(2));
  const simTargetProfitUsc = Number((simLayers * simTargetUsd).toFixed(2));
  const simSpreadPct =
    simTargetProfitUsc > 0 ? Number(((simSpreadCostUsc / simTargetProfitUsc) * 100).toFixed(1)) : 0;
  const isSpreadHealthy = simSpreadPts <= 22;

  const filteredBrokers = useMemo(
    () => BROKER_PROFILES.filter((b) => b.tier === activeTier),
    [activeTier]
  );

  const centBrokersOnly = useMemo(
    () => BROKER_PROFILES.filter((b) => b.tier === 'CENT'),
    []
  );

  const currentStep = useMemo(() => {
    const raw = MT5_SETUP_STEPS[activeMt5Step] ?? MT5_SETUP_STEPS[0];
    return raw;
  }, [activeMt5Step]);
  const { usdIdrRate } = useLiveCurrency();

  const scrollToSec = (id: string) => {
    if (typeof document === 'undefined') return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-ivory)] pb-24">
      {/* =====================================================================
          HERO HEADER
         ===================================================================== */}
      <section className="border-b border-[var(--border-subtle)] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D6A937]/40 bg-[var(--bg-surface-1)] px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
            <Landmark className="w-3.5 h-3.5" strokeWidth={1.6} />
            <span>
              {isId
                ? 'PANDUAN & RISET BROKER QUANTITATIVE JGS (PER 2026)'
                : 'JGS QUANTITATIVE BROKER & MT5 SETUP MASTERCLASS (2026)'}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[var(--text-ivory)] max-w-4xl leading-[1.08]">
            {isId
              ? 'Rekomendasi & Tutorial Broker, Dari $10 (1.000 USC) ke Terminal MT5'
              : 'Broker Selection, Multi-Pair Survival & MT5 Setup, From $10 (1,000 USC)'}
          </h1>

          <p className="text-base sm:text-[17px] leading-[1.75] text-[var(--text-secondary)] max-w-3xl">
            {isId
              ? 'Jangan asal deposit di aplikasi trading sebelum membedah jenis akun Cent vs Standar, gesekan spread M1, aturan kontrak Perak (50x lipat), dan tiga pengaturan wajib di MetaTrader 5.'
              : 'Never fund any trading app before mastering Cent vs Standard contract mass, M1 spread friction, Silver 50x leverage traps, and essential MT5 configurations.'}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={l('/calculators/cent')} className="jgs-btn-outline text-xs sm:text-sm py-2.5 px-4">
              <span>{isId ? 'Buka Cent Lab ($10 = 1.000 USC)' : 'Open Cent Lab'}</span>
            </Link>
            <Link href={l('/academy?tab=classroom')} className="jgs-btn-gold text-xs sm:text-sm py-2.5 px-4">
              <span>{isId ? 'Lanjut Kuliah JGS Academy ->' : 'Enter JGS Academy ->'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          STICKY IN-PAGE 4-PILL SECTION NAVIGATION
         ===================================================================== */}
      <div className="sticky top-16 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center gap-2">
          {[
            ['apa-itu-broker', isId ? '01 Apa Itu Broker & Spread M1' : '01 Broker Basics & Spread Sim'],
            ['matriks-broker', isId ? '02 Matriks 4 Kategori Broker' : '02 4-Tier Broker Matrix'],
            ['sesi-wib', isId ? '03 Multi-Pair & Jadwal WIB' : '03 Multi-Pair & WIB Schedule'],
            ['tutorial-mt5', isId ? '04 Tutorial 5 Langkah MT5' : '04 5-Step MT5 Setup'],
          ].map(([targetId, label]) => (
            <button
              key={targetId}
              type="button"
              onClick={() => scrollToSec(targetId)}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-3 py-1.5 font-mono text-[11px] font-semibold text-[var(--text-ivory)] hover:border-[#D6A937] hover:text-[var(--accent-gold)] transition"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 pt-12">
        {/* ===================================================================
            SECTION 1: "APA ITU BROKER?" + M1 LAYERING SPREAD SIMULATOR
           =================================================================== */}
        <section id="apa-itu-broker" className="scroll-mt-32 space-y-8">
          <MotionReveal className="space-y-2 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
              {isId ? 'BAGIAN 01 • PENGANTAR PEMULA' : 'SECTION 01 • BEGINNER PRIMER'}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-[-0.025em]">
              {isId
                ? 'Apa Itu Broker & Kenapa Spread Menentukan Nasib Modal $10?'
                : 'What Is a Broker & Why Spread Controls $10 Survival?'}
            </h2>
          </MotionReveal>

          {/* 3-Pillar Analogy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: '01',
                icon: Compass,
                titleId: 'Pasar Finansial Global',
                titleEn: 'Global Financial Markets',
                descId:
                  'Ibarat pusat grosir emas dan mata uang dunia. Tempat harga emas, dolar, dan indeks bergerak 23 jam sehari oleh perbankan besar.',
                descEn:
                  'Like the global wholesale exchange for bullion, currencies, and indices driven by commercial banking liquidity.',
              },
              {
                num: '02',
                icon: Wallet,
                titleId: 'Broker (Pialang)',
                titleEn: 'Licensed Broker Custody',
                descId:
                  'Perusahaan dompet & jembatan resmi tempat kamu mendaftar, menyimpan $10 USD, lalu memecahnya otomatis menjadi 1.000 USC (Akun Cent).',
                descEn:
                  'Your regulated account custodian holding $10 USD and translating balances into 1,000 USC Cent units.',
              },
              {
                num: '03',
                icon: MonitorSmartphone,
                titleId: 'Terminal MetaTrader 5 (MT5)',
                titleEn: 'MetaTrader 5 (MT5) Terminal',
                descId:
                  'Aplikasi layar kemudi / stik PS di HP dan Laptop tempat kamu mengamati grafik, memasang Stop Loss, dan mengirim klik Buy / Sell ke server broker.',
                descEn:
                  'Your desktop and mobile steering screen showing live quotes and routing orders safely to your broker server.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <SpotlightCard key={item.num} className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6A937]/15 border border-[#D6A937]/40 text-[var(--accent-gold)]">
                      <Icon className="w-5 h-5" strokeWidth={1.6} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                      PILAR {item.num}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-ivory)]">
                    {isId ? item.titleId : item.titleEn}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {isId ? item.descId : item.descEn}
                  </p>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Interactive M1 Layering Spread Friction Simulator */}
          <div className="jgs-panel p-6 sm:p-8 space-y-6 border-[#D6A937]/35">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-gold)]">
                  <Sliders className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>
                    {isId
                      ? 'SIMULATOR MEKANIS GESEKAN SPREAD M1 (XAUUSDc • SALDO 1.000 USC)'
                      : 'INTERACTIVE M1 LAYERING SPREAD FRICTION SIMULATOR (1,000 USC)'}
                  </span>
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  {isId
                    ? 'Spesifikasi Cent: 1 Cent Lot = 1 troy oz, maka 0.01 Cent Lot = 0.01 oz (gerak emas $1.00 = 100 points = 1.00 USC). Geser slider untuk melihat potongan spread!'
                    : 'Cent Math: 1 Cent Lot = 1 troy oz -> 0.01 Cent Lot = 0.01 oz ($1.00 move = 100 points = 1.00 USC per layer).'}
                </p>
              </div>
              <div className="font-mono text-xs font-bold text-[var(--accent-gold)]">
                Total Volume: {simTotalCentLot.toFixed(2)} Cent Lot ({simLayers} × 0.01)
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="block space-y-2">
                <span className="flex justify-between text-xs font-mono text-[var(--text-ivory)]">
                  <span>{isId ? 'Jumlah Layer (@0.01)' : 'Concurrent Layers'}</span>
                  <strong className="text-[var(--accent-gold)]">{simLayers} layer</strong>
                </span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={simLayers}
                  onChange={(e) => setSimLayers(Number(e.target.value))}
                  className="w-full accent-[#D6A937] cursor-pointer"
                />
              </label>

              <label className="block space-y-2">
                <span className="flex justify-between text-xs font-mono text-[var(--text-ivory)]">
                  <span>{isId ? 'Target Profit ($/oz)' : 'Target Move ($/oz)'}</span>
                  <strong className="text-emerald-400">
                    ${simTargetUsd.toFixed(2)} ({Math.round(simTargetUsd * 100)} pts)
                  </strong>
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={3.0}
                  step={0.25}
                  value={simTargetUsd}
                  onChange={(e) => setSimTargetUsd(Number(e.target.value))}
                  className="w-full accent-[#10B981] cursor-pointer"
                />
              </label>

              <label className="block space-y-2">
                <span className="flex justify-between text-xs font-mono text-[var(--text-ivory)]">
                  <span>{isId ? 'Spread Broker (Points)' : 'Broker Spread (Points)'}</span>
                  <strong className={isSpreadHealthy ? 'text-emerald-400' : 'text-rose-400'}>
                    {simSpreadPts} pts (${(simSpreadPts / 100).toFixed(2)}/oz)
                  </strong>
                </span>
                <input
                  type="range"
                  min={18}
                  max={50}
                  step={1}
                  value={simSpreadPts}
                  onChange={(e) => setSimSpreadPts(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                <div className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {isId ? 'Total Target Profit' : 'Gross Target Profit'}
                </div>
                <div className="font-mono text-2xl font-extrabold text-[#10B981] mt-1">
                  +<AnimatedNumber value={simTargetProfitUsc} decimals={2} locale={loc} suffix=" USC" />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                <div className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {isId ? 'Biaya Spread Langsung Dipotong' : 'Immediate Spread Toll'}
                </div>
                <div className="font-mono text-2xl font-extrabold text-rose-400 mt-1">
                  -<AnimatedNumber value={simSpreadCostUsc} decimals={2} locale={loc} suffix=" USC" />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                <div className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {isId ? '% Target Habis Termakan Spread' : '% of Target Burned by Spread'}
                </div>
                <div
                  className={`font-mono text-2xl font-extrabold mt-1 ${
                    simSpreadPct <= 15
                      ? 'text-emerald-400'
                      : simSpreadPct <= 22
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  <AnimatedNumber value={simSpreadPct} decimals={1} locale={loc} suffix="%" />
                </div>
              </div>
            </div>

            {/* Visual Friction Progress Bar & Verdict */}
            <div className="space-y-2.5">
              <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--bg-surface-3)]">
                <div
                  className={`h-full transition-all duration-300 ${
                    simSpreadPct <= 15
                      ? 'bg-emerald-500'
                      : simSpreadPct <= 22
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, simSpreadPct)}%` }}
                />
              </div>
              <div
                className={`rounded-xl border p-4 text-xs sm:text-sm leading-relaxed ${
                  simSpreadPts <= 22
                    ? 'border-emerald-500/35 bg-emerald-500/10 text-[var(--text-ivory)]'
                    : 'border-rose-500/40 bg-rose-500/10 text-[var(--text-ivory)]'
                }`}
              >
                {simSpreadPts <= 22 ? (
                  isId
                    ? `SEHAT (Spread ${simSpreadPts} pts, setara RoboForex ProCent / XS Cent / Exness London-NY Overlap): biaya spread cuma ${simSpreadCostUsc.toFixed(2)} USC (${simSpreadPct}% dari target ${simTargetProfitUsc.toFixed(2)} USC). Masih sangat ramah untuk eksekusi M1!`
                    : `HEALTHY (Spread ${simSpreadPts} pts, RoboForex ProCent / XS / Exness London-NY): spread friction deducts only ${simSpreadCostUsc.toFixed(2)} USC (${simSpreadPct}% of target).`
                ) : (
                  isId
                    ? `GESEKAN MAHAL (Spread ${simSpreadPts} pts, umum terjadi di akun markup ".p" atau broker lokal ber-spread lebar): spread langsung memotong ${simSpreadCostUsc.toFixed(2)} USC (${simSpreadPct}% target profit!), membuat garis Ask kerap gagal menyentuh Take Profit saat pullback cepat M1!`
                    : `HIGH FRICTION WARNING (${simSpreadPts} pts, typical of ".p" partner markups): spread deducts ${simSpreadCostUsc.toFixed(2)} USC (${simSpreadPct}% of target!), risking missed Ask TP triggers during swift M1 pullbacks.`
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: TIERED 4-TAB BROKER COMPARISON MATRIX
           =================================================================== */}
        <section id="matriks-broker" className="scroll-mt-32 space-y-8">
          <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
                {isId ? 'BAGIAN 02 • RISET KOMPARASI 4 TAHAP MODAL' : 'SECTION 02 • 4-TIER BROKER MATRIX'}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-[-0.025em]">
                {isId
                  ? 'Perbandingan Broker Akun Cent, Mikro USD, Raw ECN & Regulasi Lokal RI'
                  : 'Cent Brokers, USD Micro Bridges, ECN Pro & Indonesian Regulated Tiers'}
              </h2>
            </div>
            <p className="font-mono text-[11px] text-[var(--text-muted)]">
              {isId
                ? 'Riset dikompilasi per 2026 (dapat berubah, selalu verifikasi di situs resmi broker). Zero affiliate markup.'
                : 'Compiled research as of 2026 (verify live specs on official broker websites). Zero affiliate markups.'}
            </p>
          </MotionReveal>

          {/* 4 Tier Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {([
              ['CENT', isId ? '1. Akun Cent Terbaik ($10 / 1.000 USC)' : '1. Best Cent ($10 / 1,000 USC)'],
              ['MICRO_USD', isId ? '2. Jembatan USD Mikro ($5–$50)' : '2. USD Micro Bridge ($5–$50)'],
              ['RAW_ECN', isId ? '3. Raw ECN / Pro ($200–$1.000+)' : '3. Institutional ECN / Pro ($200+)'],
              ['INDONESIA_LOCAL', isId ? '4. Pialang Lokal RI (BI/OJK/Bappebti)' : '4. Indonesian Regulated (BI/OJK)'],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTier(key)}
                className={`px-4 py-3 rounded-xl border text-left text-xs font-bold transition ${
                  activeTier === key
                    ? 'jgs-tab-active border-[#D6A937] shadow-md'
                    : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/60'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contextual Alert Banner for Tab 1 Chart, Tab 2 100x Trap, or Tab 4 2026 RI Law */}
          {activeTier === 'CENT' && (
            <div className="jgs-panel p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                <BarChart3 className="w-4 h-4" strokeWidth={1.6} />
                <span>
                  {isId
                    ? 'GRAFIK PERBANDINGAN RATA-RATA SPREAD XAUUSD AKUN CENT (POINTS / $ PER OZ)'
                    : 'XAUUSD CENT SPREAD BENCHMARK COMPARISON (POINTS / $ PER OZ)'}
                </span>
              </div>
              <div className="space-y-3">
                {[...centBrokersOnly]
                  .sort((a, b) => a.spreadPtsNumeric - b.spreadPtsNumeric)
                  .map((b) => {
                    const widthPct = Math.min(100, Math.round((b.spreadPtsNumeric / 36) * 100));
                    return (
                      <div key={b.id} className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 text-xs font-mono">
                        <div className="sm:col-span-3 font-bold text-[var(--text-ivory)] truncate">
                          {b.name} ({b.accountType.replace(' Account', '')})
                        </div>
                        <div className="sm:col-span-6 h-3 rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              b.isCaution
                                ? 'bg-rose-500'
                                : b.spreadPtsNumeric <= 21
                                ? 'bg-emerald-500'
                                : 'bg-[#D6A937]'
                            }`}
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>
                        <div className="sm:col-span-3 text-[var(--text-secondary)] sm:text-right">
                          ~{b.spreadPtsNumeric} pts (${(b.spreadPtsNumeric / 100).toFixed(2)}/oz)
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {activeTier === 'MICRO_USD' && (
            <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                <AlertTriangle className="w-4 h-4" strokeWidth={1.75} />
                <span>
                  {isId
                    ? 'JEBAKAN UKURAN KONTRAK 100X PADA AKUN USD BIASA ($10)'
                    : 'THE 100X CONTRACT WEIGHT TRAP ON STANDARD USD ACCOUNTS ($10)'}
                </span>
              </div>
              <p className="text-sm text-[var(--text-ivory)] leading-relaxed">
                {isId
                  ? 'Pada akun Standar atau Raw USD biasa (1 lot = 100 oz emas), klik terkecil 0.01 Standard Lot memikul 1.00 troy oz emas utuh! Saat emas di harga $4,100+, margin terpakai langsung menelan ~$4.10 (41% dari saldo $10), dan goyangan harga normal $9–$10 sudah langsung membakar habis modalmu. Jika tetap ingin saldo tampil dalam dolar (non-Cent), WAJIB memakai Akun Mikro sejati (1 Micro Lot = 1 oz) di bawah!'
                  : 'Standard USD accounts set 1 lot = 100 oz, so even 0.01 Standard Lot forces 1.00 full oz exposure ($4.10 margin @ 41% equity on $10, wiping out in a normal $9–$10 gold swing). Use true 1-oz USD Micro accounts below.'}
              </p>
            </div>
          )}

          {activeTier === 'INDONESIA_LOCAL' && (
            <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 p-5 space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" strokeWidth={1.75} />
                <span>
                  {isId
                    ? 'PEMBARUAN REGULASI PIALANG INDONESIA PER JANUARI 2026'
                    : 'INDONESIAN REGULATORY FRAMEWORK UPDATE (JANUARY 2026)'}
                </span>
              </div>
              <p className="text-sm text-[var(--text-ivory)] leading-relaxed">
                {isId
                  ? 'Berdasarkan transisi peraturan Januari 2026: pengawasan derivatif Pasar Uang & Valuta Asing (PUVA / Forex) berada di bawah Bank Indonesia (BI PADG No. 26/2025), pengawasan derivatif indeks saham & keuangan di OJK, serta perdagangan komoditas berjangka (emas) berkoordinasi di bawah Bappebti, bursa JFX/ICDX, dan lembaga kliring KBI.'
                  : 'Under Indonesia’s 2026 regulatory architecture, FX/PUVA derivatives fall under Bank Indonesia (BI PADG No. 26/2025), index/financial derivatives under OJK, and commodity futures under Bappebti, JFX/ICDX, and KBI clearing supervision.'}
              </p>
            </div>
          )}

          {/* Responsive Specification Matrix Table */}
          <div className="jgs-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)] font-mono text-[11px] uppercase tracking-wider text-[var(--accent-gold)]">
                    <th className="px-4 py-3.5">{isId ? 'Broker & Akun' : 'Broker & Tier'}</th>
                    <th className="px-4 py-3.5">{isId ? 'Min. Deposit' : 'Min. Deposit'}</th>
                    <th className="px-4 py-3.5">{isId ? 'Spread / Biaya Emas' : 'Gold Spread / Cost'}</th>
                    <th className="px-4 py-3.5">Leverage</th>
                    <th className="px-4 py-3.5">MC / Stop Out</th>
                    <th className="px-4 py-3.5">{isId ? 'Batas Order / Instrumen' : 'Order Limit'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                  {filteredBrokers.map((b) => (
                    <tr key={b.id} className={b.isCaution ? 'bg-rose-500/5' : ''}>
                      <td className="px-4 py-4 align-top">
                        <div className="font-display font-bold text-[var(--text-ivory)]">
                          {b.name}
                        </div>
                        <div className="font-mono text-[11px] text-[var(--accent-gold)]">
                          {b.accountType}
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top font-mono text-[var(--text-ivory)]">
                        {isId ? b.minDepositId : b.minDepositEn}
                      </td>
                      <td className="px-4 py-4 align-top text-[var(--text-ivory)]">
                        <div>{isId ? b.spreadSummaryId : b.spreadSummaryEn}</div>
                        <div className="font-mono text-[11px] text-[var(--text-muted)]">
                          {isId ? b.commissionId : b.commissionEn}
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top font-mono">{b.leverage}</td>
                      <td className="px-4 py-4 align-top font-mono">{b.mcSo}</td>
                      <td className="px-4 py-4 align-top font-mono text-[var(--text-ivory)]">
                        {isId ? b.maxOrdersId : b.maxOrdersEn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Review Cards for Selected Tier */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredBrokers.map((b) => (
              <SpotlightCard
                key={b.id}
                className={`p-6 space-y-4 ${b.isCaution ? 'border-rose-500/45' : ''}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                        b.isCaution ? 'text-rose-400' : 'text-[var(--accent-gold)]'
                      }`}
                    >
                      {isId ? b.badgeId : b.badgeEn}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[var(--text-ivory)] mt-1">
                      {b.name}, {b.accountType}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {isId ? b.highlightsId : b.highlightsEn}
                </p>

                {(b.mandatoryRulesId || b.mandatoryRulesEn) && (
                  <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 p-3.5 space-y-1.5 text-xs text-[var(--text-ivory)]">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                      {isId ? 'ATURAN WAJIB SEBELUM BUKA AKUN:' : 'MANDATORY RULES:'}
                    </div>
                    {(isId ? b.mandatoryRulesId : b.mandatoryRulesEn)?.map((rule, idx) => (
                      <p key={idx} className="leading-relaxed">
                        • {rule}
                      </p>
                    ))}
                  </div>
                )}

                {(b.warningFlagId || b.warningFlagEn) && (
                  <div className="rounded-xl border border-rose-500/45 bg-rose-500/10 p-3.5 flex items-start gap-2.5 text-xs text-rose-300">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" strokeWidth={1.75} />
                    <span className="leading-relaxed">
                      {isId ? b.warningFlagId : b.warningFlagEn}
                    </span>
                  </div>
                )}
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: MULTI-PAIR SURVIVAL & 24-HOUR WIB SESSION TIMELINE
           =================================================================== */}
        <section id="sesi-wib" className="scroll-mt-32 space-y-10">
          <MotionReveal className="space-y-2 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
              {isId ? 'BAGIAN 03 • MULTI-PAIR & JADWAL WIB' : 'SECTION 03 • MULTI-PAIR BASKET & WIB TIMING'}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-[-0.025em]">
              {isId
                ? 'Uji Ketahanan Multi-Pair di Akun 1.000 USC & Jam Emas WIB'
                : 'Multi-Pair 1,000 USC Survival Simulator & 24h WIB Timeline'}
            </h2>
          </MotionReveal>

          {/* Multi-Pair Basket Survival Simulator */}
          <div className="jgs-panel p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-gold)]">
                  <Layers className="w-4 h-4" strokeWidth={1.6} />
                  <span>
                    {isId
                      ? 'SIMULATOR BASKET MULTI-PAIR PADA SALDO 1.000 USC ($10)'
                      : 'MULTI-PAIR BASKET SURVIVAL ON A 1,000 USC BALANCE'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  {isId
                    ? 'Bandingkan daya tahan emas XAUUSDc versus bahaya kontrak 50x Perak (XAGUSDc), Indeks Nasdaq (USTECc / US30c), GBPJPYc, dan EURUSDc.'
                    : 'Compare XAUUSDc survival against the 50x Silver XAGUSDc trap, Nasdaq USTECc / US30c, GBPJPYc, and EURUSDc.'}
                </p>
              </div>

              <div className="w-full md:w-72 space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span>{isId ? 'Jumlah Layer (@0.01 Cent):' : 'Basket Layers (@0.01):'}</span>
                  <strong className="text-[var(--accent-gold)]">{basketLayers} layer</strong>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={basketLayers}
                  onChange={(e) => setBasketLayers(Number(e.target.value))}
                  className="w-full accent-[#D6A937] cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {MULTI_PAIR_CENT_SPECS.map((spec) => {
                const uscPerUnit = spec.uscPerUnitPer001Lot * basketLayers;
                const adrLossUsc = uscPerUnit * spec.adrUnits;
                const enduranceAdr = 1000 / Math.max(0.01, adrLossUsc);
                const spreadCostUsc = spec.uscPerUnitPer001Lot * spec.spreadUnits * basketLayers;
                const spreadPctAdr = (spreadCostUsc / Math.max(0.01, adrLossUsc)) * 100;
                const dangerHit = basketLayers > spec.recommendedMaxLayers;

                return (
                  <div
                    key={spec.symbol}
                    className={`rounded-2xl border p-5 space-y-3 transition ${
                      spec.isDangerTrap || dangerHit
                        ? 'border-rose-500/50 bg-rose-500/10'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface-2)]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs font-extrabold text-[var(--accent-gold)]">
                          {spec.symbol}
                        </span>
                        <h3 className="font-display text-lg font-bold text-[var(--text-ivory)]">
                          {isId ? spec.nameId : spec.nameEn}
                        </h3>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold ${
                          enduranceAdr <= 1.2
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : enduranceAdr >= 8
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-[#D6A937]/20 text-[var(--accent-gold)] border border-[#D6A937]/40'
                        }`}
                      >
                        {enduranceAdr.toFixed(2)}x ADR ({isId ? 'Ketahanan' : 'Cushion'})
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)]">
                      {isId ? spec.contractNoteId : spec.contractNoteEn}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-2.5">
                        <div className="text-[10px] text-[var(--text-muted)]">
                          {isId ? 'Nilai Gerak Basket' : 'Basket Move Value'}
                        </div>
                        <div className="font-bold text-[var(--text-ivory)] mt-0.5">
                          {uscPerUnit.toFixed(2)} USC / {isId ? spec.unitLabelId : spec.unitLabelEn}
                        </div>
                      </div>
                      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-2.5">
                        <div className="text-[10px] text-[var(--text-muted)]">
                          {isId ? 'Rugi 1 Hari Penuh (ADR)' : 'Full 1-Day ADR Swing'}
                        </div>
                        <div
                          className={`font-bold mt-0.5 ${
                            adrLossUsc >= 950 ? 'text-rose-400' : 'text-[var(--text-ivory)]'
                          }`}
                        >
                          -{adrLossUsc.toFixed(0)} USC
                        </div>
                      </div>
                      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-2.5">
                        <div className="text-[10px] text-[var(--text-muted)]">
                          {isId ? 'Biaya Spread Basket' : 'Basket Spread Cost'}
                        </div>
                        <div className="font-bold text-[var(--accent-gold)] mt-0.5">
                          {spreadCostUsc.toFixed(2)} USC ({spreadPctAdr.toFixed(2)}%)
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-ivory)] leading-relaxed">
                      {isId ? spec.sessionNoteId : spec.sessionNoteEn}
                    </p>

                    {(spec.warningId || dangerHit) && (
                      <div className="flex items-start gap-2 rounded-lg border border-rose-500/40 bg-rose-500/15 p-2.5 text-xs text-rose-300 font-semibold">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                        <span>
                          {spec.warningId
                            ? isId
                              ? spec.warningId
                              : spec.warningEn
                            : isId
                            ? `Melebihi anjuran batas ${spec.recommendedMaxLayers} layer untuk saldo 1.000 USC!`
                            : `Exceeds safe ${spec.recommendedMaxLayers}-layer guideline for a 1,000 USC balance!`}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 24-Hour WIB Session & Spread Fluctuation Timeline */}
          <div className="jgs-panel p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                <Clock className="w-4 h-4" strokeWidth={1.6} />
                <span>
                  {isId
                    ? 'JADWAL SESI SCALPING 24 JAM WIB & FLUKTUASI SPREAD'
                    : '24-HOUR WIB SCALPING TIMELINE & SPREAD DYNAMICS'}
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-[var(--text-ivory)]">
                {isId ? 'Jam WIB Sekarang:' : 'Live WIB Clock:'}{' '}
                <span className="text-[var(--accent-gold)]">{wibInfo?.label ?? '--:--'} WIB</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {WIB_24H_TIMELINE.map((slot) => {
                const isLiveNow =
                  wibInfo !== null &&
                  wibInfo.minutes >= slot.startMinutesWib &&
                  wibInfo.minutes <= slot.endMinutesWib;

                const toneStyle =
                  slot.tone === 'red'
                    ? 'border-rose-500/45 bg-rose-500/10'
                    : slot.tone === 'amber'
                    ? 'border-amber-500/40 bg-amber-500/10'
                    : slot.tone === 'green'
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : 'border-[#D6A937]/50 bg-[#D6A937]/10';

                return (
                  <div
                    key={slot.id}
                    className={`rounded-xl border p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center transition ${
                      isLiveNow ? `${toneStyle} ring-2 ring-[#D6A937]/60` : 'border-[var(--border-subtle)] bg-[var(--bg-surface-2)]'
                    }`}
                  >
                    <div className="lg:col-span-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-extrabold text-[var(--text-ivory)]">
                          {slot.windowWib}
                        </span>
                        {isLiveNow && (
                          <span className="rounded px-2 py-0.5 bg-[#D6A937] text-[#17131D] font-mono text-[10px] font-bold">
                            {isId ? 'AKTIF SEKARANG' : 'LIVE NOW'}
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[11px] font-bold text-[var(--accent-gold)]">
                        {isId ? slot.zoneBadgeId : slot.zoneBadgeEn}
                      </div>
                    </div>

                    <div className="lg:col-span-3 font-mono text-xs">
                      <div className="text-[10px] uppercase text-[var(--text-muted)]">
                        {isId ? 'Kisaran Spread Emas' : 'Gold Spread Range'}
                      </div>
                      <div className="font-bold text-[var(--text-ivory)] mt-0.5">{slot.spreadRange}</div>
                      <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{slot.focusPairs}</div>
                    </div>

                    <div className="lg:col-span-6 text-xs sm:text-sm text-[var(--text-ivory)] leading-relaxed">
                      {isId ? slot.ruleId : slot.ruleEn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: INTERACTIVE 5-STEP MT5 SETUP TUTORIAL (NO JARGON)
           =================================================================== */}
        <section id="tutorial-mt5" className="scroll-mt-32 space-y-8">
          <MotionReveal className="space-y-2 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
              {isId ? 'BAGIAN 04 • PANDUAN BERGAMBAR ANTI-NYASAR' : 'SECTION 04 • 5-STEP MT5 SETUP GUIDE'}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-[-0.025em]">
              {isId
                ? 'Tutorial 5 Langkah: Daftar Akun Cent & Sambungkan ke MetaTrader 5'
                : '5-Step Visual Walkthrough: Open a Cent Account & Connect to MT5'}
            </h2>
          </MotionReveal>

          <div className="jgs-panel p-6 sm:p-8 space-y-6 border-[#D6A937]/35">
            {/* Stepper Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {MT5_SETUP_STEPS.map((st, idx) => {
                const isCurr = idx === activeMt5Step;
                return (
                  <button
                    key={st.stepNum}
                    type="button"
                    onClick={() => setActiveMt5Step(idx)}
                    className={`rounded-xl border px-3 py-2.5 text-left font-mono text-xs font-bold transition ${
                      isCurr
                        ? 'jgs-tab-active border-[#D6A937]'
                        : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/60'
                    }`}
                  >
                    <div>STEP {st.stepNum}</div>
                    <div className="font-sans text-[11px] font-medium truncate mt-0.5">
                      {(isId ? st.titleId : st.titleEn).replace(/^Langkah \d+:\s*|^Step \d+:\s*/i, '')}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Explanation + Simulated MT5 Phone/Desktop Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs font-bold text-[var(--accent-gold)]">
                  LANGKAH {currentStep.stepNum} / 05
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-ivory)]">
                  {isId ? currentStep.titleId : currentStep.titleEn}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {isId ? injectLiveIdrRates(currentStep.summaryId, usdIdrRate) : currentStep.summaryEn}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {(isId ? currentStep.checklistId : currentStep.checklistEn).map((chk, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-3.5 text-xs sm:text-sm text-[var(--text-ivory)] leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span>{isId ? injectLiveIdrRates(chk, usdIdrRate) : chk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simulated Obsidian MT5 Mock Screen Frame */}
              <div className="lg:col-span-5">
                <div className="jgs-chart-frame rounded-2xl border-2 border-[#D6A937]/45 p-5 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-[#D6A937]">
                      <Terminal className="w-4 h-4" strokeWidth={1.6} />
                      <span>{currentStep.mockScreenTitle}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                  </div>

                  <div className="space-y-2 font-mono text-xs text-[#F3EFF8]">
                    {currentStep.mockScreenLines.map((line, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 flex items-center justify-between"
                      >
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#B8AFC7]">
                    <span>MetaTrader 5 Simulated Config</span>
                    <span className="text-[#10B981]">READY • 1,000 USC SAFE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prev / Next Navigation Buttons */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={activeMt5Step === 0}
                onClick={() => setActiveMt5Step((s) => Math.max(0, s - 1))}
                className="jgs-btn-outline text-xs py-2.5 px-4 disabled:opacity-40"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isId ? 'Langkah Sebelumnya' : 'Previous Step'}</span>
              </button>

              {activeMt5Step < MT5_SETUP_STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveMt5Step((s) => Math.min(MT5_SETUP_STEPS.length - 1, s + 1))}
                  className="jgs-btn-gold text-xs py-2.5 px-5"
                >
                  <span>{isId ? 'Langkah Berikutnya' : 'Next Step'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Link href={l('/calculators/position-size')} className="jgs-btn-gold text-xs py-2.5 px-5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {isId
                      ? 'Selesai! Hitung Lot Pertama di Gatekeeper ->'
                      : 'Done! Calculate First Lot ->'}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
