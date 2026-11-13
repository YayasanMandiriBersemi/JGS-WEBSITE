'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleContext';
import {
  FlaskConical,
  CheckSquare,
  Square,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Sliders,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface AuditCriterion {
  id: string;
  weight: number;
  title: { id: string; en: string };
  description: { id: string; en: string };
  mt5Setting: string;
}

const EA_AUDIT_CRITERIA: AuditCriterion[] = [
  {
    id: 'real-ticks',
    weight: 20,
    title: {
      id: 'Model Data: "Every Tick Based on Real Ticks" (99%+ Kualitas)',
      en: 'Modeling Mode: "Every Tick Based on Real Ticks" (99%+ Quality)',
    },
    description: {
      id: 'Jangan mengandalkan mode "1 Minute OHLC" atau "Open Prices Only" untuk strategi intraday/Emas karena mode sintetis mengabaikan pelebaran spread dan urutan high/low di dalam bar.',
      en: 'Never rely on "1 Minute OHLC" or "Open Prices Only" for intraday or Gold strategies, as synthetic ticks ignore real spread widening and intra-bar high/low sequencing.',
    },
    mt5Setting: 'Strategy Tester -> Modeling: Every tick based on real ticks',
  },
  {
    id: 'hard-stop-loss',
    weight: 20,
    title: {
      id: 'Setiap Posisi Memiliki Hard Stop-Loss (Tanpa Martingale/Grid Tanpa Batas)',
      en: 'Every Position Carries a Hard Stop-Loss (No Uncapped Martingale/Grid)',
    },
    description: {
      id: 'Pastikan algoritma menutup posisi yang salah pada titik invalidasi struktural, bukan menahan floating loss dan melipatgandakan lot.',
      en: 'Verify that the algorithm exits losing positions at a structural invalidation level rather than holding floating losses and multiplying lots.',
    },
    mt5Setting: 'Backtest Graph -> Equity Curve tracks Balance closely',
  },
  {
    id: 'out-of-sample',
    weight: 15,
    title: {
      id: 'Pengujian Out-of-Sample (Forward Test) Terpisah dari Periode Optimasi',
      en: 'Out-of-Sample (Forward) Validation Separate From Optimization Window',
    },
    description: {
      id: 'Jika parameter dioptimasi pada data 2022–2023, ujilah parameter tersebut tanpa perubahan pada data 2024–2025 untuk mendeteksi curve-fitting.',
      en: 'If parameters were optimized on 2022–2023 data, validate those exact parameters untouched on 2024–2025 data to detect curve-fitting.',
    },
    mt5Setting: 'Strategy Tester -> Forward: 1/3 or Custom Date',
  },
  {
    id: 'execution-latency',
    weight: 10,
    title: {
      id: 'Simulasi Penundaan Eksekusi Jaringan (Execution Delay 100ms–300ms)',
      en: 'Network Execution Latency Simulation (100ms–300ms Delay)',
    },
    description: {
      id: 'Backtest dengan delay 0ms sering menghasilkan profit palsu pada saat volatilitas tinggi. Tambahkan simulasi latensi realistis.',
      en: 'Zero-latency backtests often produce unrealistic fills during fast candle spikes. Always test with realistic network latency enabled.',
    },
    mt5Setting: 'Strategy Tester -> Delays: Random delay / 100–250 ms',
  },
  {
    id: 'broker-spec-match',
    weight: 15,
    title: {
      id: 'Kesesuaian Spesifikasi Kontrak Simbol & Denominasi Akun (USC vs USD)',
      en: 'Verified Symbol Contract Size & Account Denomination Match (USC vs. USD)',
    },
    description: {
      id: 'Pastikan Contract Size, Tick Value, dan Volume Step pada Strategy Tester sama persis dengan akun live/demo tempat EA akan dijalankan.',
      en: 'Confirm that Contract Size, Tick Value, and Volume Step in the Strategy Tester match the target account where the EA will run.',
    },
    mt5Setting: 'Symbol Properties -> Contract Size & Tick Value',
  },
  {
    id: 'sample-size',
    weight: 10,
    title: {
      id: 'Ukuran Sampel Memadai (Minimal 150+ Transaksi Lintas Kondisi Pasar)',
      en: 'Statistically Meaningful Sample Size (150+ Trades Across Market Regimes)',
    },
    description: {
      id: 'Backtest yang hanya terdiri dari 15–30 transaksi tidak memiliki signifikansi statistik dan mudah dipengaruhi kebetulan.',
      en: 'A backtest with only 15–30 trades lacks statistical significance and is easily skewed by a single lucky regime.',
    },
    mt5Setting: 'Backtest Report -> Total Trades >= 150',
  },
  {
    id: 'daily-circuit-breaker',
    weight: 10,
    title: {
      id: 'Pembatas Kerugian Harian (Daily Equity Circuit Breaker) Aktif',
      en: 'Automated Daily Equity Circuit Breaker Enabled',
    },
    description: {
      id: 'Sistem wajib menghentikan pembukaan order baru apabila batas drawdown harian tercapai.',
      en: 'The system must automatically halt new order submissions for the remainder of the server day if the daily drawdown cap is breached.',
    },
    mt5Setting: 'EA Inputs -> DailyMaxDrawdownPct <= 3.0%',
  },
];

export function EaTestingToolkit() {
  const { isId, l } = useLocale();

  // Checklist state
  const [checkedIds, setCheckedIds] = useState<string[]>([
    'real-ticks',
    'hard-stop-loss',
    'broker-spec-match',
  ]);

  // Interactive Spread & Slippage Stress-Tester state
  const [winRatePct, setWinRatePct] = useState<number>(48);
  const [avgWinPoints, setAvgWinPoints] = useState<number>(420);
  const [avgLossPoints, setAvgLossPoints] = useState<number>(220);
  const [sampleTrades, setSampleTrades] = useState<number>(200);
  const [extraFrictionPoints, setExtraFrictionPoints] = useState<number>(35); // Extra spread + slippage per trade

  function toggleCriterion(id: string) {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const auditScore = useMemo(() => {
    return EA_AUDIT_CRITERIA.reduce(
      (sum, item) => (checkedIds.includes(item.id) ? sum + item.weight : sum),
      0
    );
  }, [checkedIds]);

  const stressTestResult = useMemo(() => {
    const winProb = Math.min(0.99, Math.max(0.01, winRatePct / 100));
    const lossProb = 1 - winProb;
    const winsCount = Math.round(sampleTrades * winProb);
    const lossesCount = Math.max(1, sampleTrades - winsCount);

    // Baseline (before extra friction)
    const baseGrossWinPts = winsCount * avgWinPoints;
    const baseGrossLossPts = lossesCount * avgLossPoints;
    const baseNetPts = baseGrossWinPts - baseGrossLossPts;
    const baseProfitFactor =
      baseGrossLossPts > 0 ? Number((baseGrossWinPts / baseGrossLossPts).toFixed(2)) : 0;
    const baseExpectancyPts = Number(
      (winProb * avgWinPoints - lossProb * avgLossPoints).toFixed(1)
    );

    // Stress-tested (every trade suffers extraFrictionPoints of spread widening + slippage:
    // winners net fewer points, losers lose more points)
    const stressedWinPts = Math.max(0, avgWinPoints - extraFrictionPoints);
    const stressedLossPts = avgLossPoints + extraFrictionPoints;
    const stressedGrossWin = winsCount * stressedWinPts;
    const stressedGrossLoss = lossesCount * stressedLossPts;
    const stressedNetPts = stressedGrossWin - stressedGrossLoss;
    const stressedProfitFactor =
      stressedGrossLoss > 0 ? Number((stressedGrossWin / stressedGrossLoss).toFixed(2)) : 0;
    const stressedExpectancyPts = Number(
      (winProb * stressedWinPts - lossProb * stressedLossPts).toFixed(1)
    );

    return {
      baseNetPts,
      baseProfitFactor,
      baseExpectancyPts,
      stressedNetPts,
      stressedProfitFactor,
      stressedExpectancyPts,
      survivesFriction: stressedProfitFactor >= 1.15 && stressedExpectancyPts > 0,
    };
  }, [winRatePct, avgWinPoints, avgLossPoints, sampleTrades, extraFrictionPoints]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="jgs-panel p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
            <FlaskConical className="w-4 h-4" />
            <span>
              {isId
                ? 'EA TESTING TOOLKIT • PANDUAN & ALAT UJI SISTEM ALGORITMIK MT5'
                : 'EA TESTING TOOLKIT • MT5 SYSTEM BACKTEST & ROBUSTNESS AUDITOR'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE]">
            {isId
              ? 'Uji Kualitas Backtest & Ketahanan Strategi Terhadap Pelebaran Spread'
              : 'Audit Backtest Quality & Stress-Test Strategy Expectancy Against Friction'}
          </h1>
          <p className="text-sm sm:text-base text-[#BEB6CE] leading-relaxed">
            {isId
              ? 'Banyak laporan Strategy Tester MT5 terlihat sempurna di atas kertas karena diuji dengan spread tetap dan tanpa latensi. Gunakan toolkit gratis ini untuk mengaudit integritas backtest dan menguji dampak biaya friksi eksekusi.'
              : 'Many MT5 Strategy Tester reports look flawless on paper only because they were run with zero latency and tight synthetic spreads. Use this free toolkit to audit backtest integrity and stress-test execution friction.'}
          </p>
        </div>

        <Link href={l('/quant-lab')} className="jgs-btn-outline text-xs shrink-0">
          <Cpu className="w-4 h-4 text-[#D4AF37]" />
          <span>{isId ? 'Dokumentasi Quant Lab' : 'Quant Lab Architecture'}</span>
        </Link>
      </div>

      {/* Main Grid: Checklist + Spread/Slippage Stress Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Interactive 7-Point MT5 Backtest Integrity Checklist */}
        <div className="lg:col-span-7 jgs-panel p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display text-xl font-bold text-[#F7F4EE]">
                {isId
                  ? '1. Checklist Audit Integritas Backtest MT5'
                  : '1. MT5 Backtest Integrity Audit Checklist'}
              </h2>
              <p className="text-xs text-[#BEB6CE] mt-1">
                {isId
                  ? 'Centang setiap standar pengujian yang telah dipenuhi oleh laporan Strategy Tester Anda.'
                  : 'Check each verification standard satisfied by your MT5 Strategy Tester report.'}
              </p>
            </div>
            <div className="text-right">
              <span className="block text-xs text-[#BEB6CE]">
                {isId ? 'Skor Integritas Pengujian' : 'Backtest Integrity Score'}
              </span>
              <span
                className={`font-mono text-2xl font-bold ${
                  auditScore >= 85
                    ? 'text-[#10B981]'
                    : auditScore >= 60
                    ? 'text-[#F59E0B]'
                    : 'text-[#EF4444]'
                }`}
              >
                {auditScore} / 100
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {EA_AUDIT_CRITERIA.map((item) => {
              const checked = checkedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCriterion(item.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                    checked
                      ? 'bg-[#0F1B1D] border-[#10B981]/50'
                      : 'bg-[#08050E] border-white/10 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {checked ? (
                      <CheckSquare className="w-5 h-5 text-[#10B981]" />
                    ) : (
                      <Square className="w-5 h-5 text-[#7E7494]" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-display font-bold text-sm text-[#F7F4EE]">
                        {isId ? item.title.id : item.title.en}
                      </span>
                      <span className="text-xs font-mono text-[#D4AF37] bg-[#191129] px-2 py-0.5 rounded">
                        +{item.weight} pts
                      </span>
                    </div>
                    <p className="text-xs text-[#BEB6CE] leading-relaxed">
                      {isId ? item.description.id : item.description.en}
                    </p>
                    <div className="text-[11px] font-mono text-[#A882DD] pt-1">
                      {item.mt5Setting}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Interactive Spread & Slippage Expectancy Stress-Tester */}
        <div className="lg:col-span-5 space-y-6">
          <div className="jgs-panel p-6 sm:p-7 space-y-5">
            <div className="border-b border-white/10 pb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                <Sliders className="w-3.5 h-3.5" />
                <span>
                  {isId ? 'SIMULATOR KETAHANAN FRIKSI' : 'FRICTION DEGRADATION SIMULATOR'}
                </span>
              </div>
              <h2 className="font-display text-xl font-bold text-[#F7F4EE] mt-1">
                {isId
                  ? '2. Uji Stres Pelebaran Spread & Slippage'
                  : '2. Spread Widening & Slippage Stress-Tester'}
              </h2>
              <p className="text-xs text-[#BEB6CE] mt-1">
                {isId
                  ? 'Simulasikan apakah sistem Anda tetap memiliki ekspektasi positif ketika spread live lebih lebar atau terjadi slippage.'
                  : 'Simulate whether your strategy retains positive expectancy when live spreads widen or execution slippage occurs.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="jgs-label">
                  {isId ? 'Win Rate Backtest (%)' : 'Backtest Win Rate (%)'}
                </label>
                <input
                  type="number"
                  min={5}
                  max={95}
                  value={winRatePct}
                  onChange={(e) => setWinRatePct(Number(e.target.value))}
                  className="jgs-input"
                />
              </div>
              <div>
                <label className="jgs-label">
                  {isId ? 'Jumlah Transaksi' : 'Total Sample Trades'}
                </label>
                <input
                  type="number"
                  min={20}
                  max={5000}
                  value={sampleTrades}
                  onChange={(e) => setSampleTrades(Number(e.target.value))}
                  className="jgs-input"
                />
              </div>
              <div>
                <label className="jgs-label">
                  {isId ? 'Rata-Rata Profit (Poin)' : 'Avg Win Distance (Pts)'}
                </label>
                <input
                  type="number"
                  min={10}
                  max={5000}
                  value={avgWinPoints}
                  onChange={(e) => setAvgWinPoints(Number(e.target.value))}
                  className="jgs-input"
                />
              </div>
              <div>
                <label className="jgs-label">
                  {isId ? 'Rata-Rata Rugi (Poin)' : 'Avg Loss Distance (Pts)'}
                </label>
                <input
                  type="number"
                  min={10}
                  max={5000}
                  value={avgLossPoints}
                  onChange={(e) => setAvgLossPoints(Number(e.target.value))}
                  className="jgs-input"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#F7F4EE]">
                  {isId
                    ? 'Tambahan Friksi Live (Spread + Slippage / Trade)'
                    : 'Added Live Friction (Extra Spread + Slippage / Trade)'}
                </span>
                <span className="font-mono font-bold text-[#D4AF37]">
                  +{extraFrictionPoints} pts
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={150}
                step={5}
                value={extraFrictionPoints}
                onChange={(e) => setExtraFrictionPoints(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[11px] text-[#BEB6CE] mt-1">
                <span>0 pts (Ideal)</span>
                <span>35 pts (Normal Live)</span>
                <span>100+ pts (News Volatility)</span>
              </div>
            </div>

            {/* Comparison Output */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-[#08050E] border border-white/10 space-y-1">
                <div className="text-xs text-[#BEB6CE]">
                  {isId ? 'Backtest Awal (Tanpa Friksi)' : 'Baseline Backtest'}
                </div>
                <div className="font-mono text-xl font-bold text-[#F7F4EE]">
                  PF: {stressTestResult.baseProfitFactor.toFixed(2)}
                </div>
                <div className="text-xs font-mono text-[#10B981]">
                  {stressTestResult.baseExpectancyPts >= 0 ? '+' : ''}
                  {stressTestResult.baseExpectancyPts} pts / trade
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-1 ${
                  stressTestResult.survivesFriction
                    ? 'bg-[#0F1B1D] border-[#10B981]/40'
                    : 'bg-[#1A0D16] border-[#EF4444]/50'
                }`}
              >
                <div className="text-xs text-[#BEB6CE]">
                  {isId
                    ? `Setelah Friksi (+${extraFrictionPoints} pts)`
                    : `Stressed (+${extraFrictionPoints} pts)`}
                </div>
                <div className="font-mono text-xl font-bold text-[#D4AF37]">
                  PF: {stressTestResult.stressedProfitFactor.toFixed(2)}
                </div>
                <div
                  className={`text-xs font-mono font-bold ${
                    stressTestResult.stressedExpectancyPts > 0
                      ? 'text-[#10B981]'
                      : 'text-[#EF4444]'
                  }`}
                >
                  {stressTestResult.stressedExpectancyPts >= 0 ? '+' : ''}
                  {stressTestResult.stressedExpectancyPts} pts / trade
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                stressTestResult.survivesFriction
                  ? 'bg-[#0F1B1D]/60 border-[#10B981]/30 text-[#F7F4EE]'
                  : 'bg-[#1A0D16]/70 border-[#EF4444]/40 text-[#F7F4EE]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {stressTestResult.survivesFriction ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#10B981]">
                      {isId
                        ? 'Sistem Tahan Terhadap Friksi Ini'
                        : 'Strategy Survives Tested Friction'}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-[#EF4444]">
                      {isId
                        ? 'Peringatan: Ekspektasi Runtuh Akibat Friksi!'
                        : 'Warning: Expectancy Collapses Under Friction!'}
                    </span>
                  </>
                )}
              </div>
              <p className="text-[#BEB6CE]">
                {stressTestResult.survivesFriction
                  ? isId
                    ? 'Rata-rata jarak profit strategi Anda cukup lebar untuk menyerap pelebaran spread dan slippage yang diuji. Lanjutkan pengujian pada akun demo/Cent.'
                    : 'Your average profit target is wide enough to absorb the tested spread and slippage costs. Proceed to forward demo/Cent validation.'
                  : isId
                  ? 'Strategi scalping dengan target poin terlalu tipis sering terlihat profit di backtest tetapi merugi di pasar nyata ketika ditambah spread dan slippage.'
                  : 'Strategies with overly tight point targets often appear profitable in synthetic backtests but turn negative once realistic live spread and slippage are applied.'}
              </p>
            </div>
          </div>

          <div className="jgs-panel p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span className="text-xs text-[#BEB6CE]">
                {isId
                  ? 'Lihat bagaimana JGS menyusun 11 metrik audit performa.'
                  : 'See how JGS structures the 11-metric performance schema.'}
              </span>
            </div>
            <Link
              href={l('/performance')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:underline shrink-0"
            >
              <span>{isId ? 'Buka Performa →' : 'Performance →'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Why Uncapped Martingale / Grid Blows Up 1,000 USC Accounts */}
      <div className="jgs-panel p-6 sm:p-8 border-[#EF4444]/40 bg-gradient-to-br from-[#1A0D16] via-jgs-plum-surface to-jgs-plum-deep space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#EF4444] font-bold">
              {isId
                ? 'BEDAH ANATOMI ROBOT MARTINGALE DI AKUN 1,000 USC ($10)'
                : 'MARTINGALE GRID BLOW-UP ANATOMY ON A 1,000 USC ($10) ACCOUNT'}
            </span>
            <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-1">
              {isId
                ? 'Mengapa Bot Martingale "Win Rate 99%" Hancur dalam 1 Hari Tren Emas'
                : 'Why "99% Win Rate" Martingale Bots Liquidate in One Gold Trend'}
            </h2>
          </div>
          <span className="rounded-full border border-[#EF4444]/50 bg-[#EF4444]/15 px-3 py-1 font-mono text-[10px] text-[#EF4444] font-bold">
            STOP OUT RISK: 100%
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#B8B0C8] leading-relaxed max-w-4xl">
          {isId
            ? 'Tabel berikut membedah skenario nyata ketika robot Grid/Martingale melawan tren XAUUSD sejauh $15 (1,500 points) pada akun Cent 1,000 USC tanpa Stop Loss:'
            : 'This breakdown illustrates what happens when a Martingale grid bot averages against a single $15 (1,500-point) XAUUSD trend on a 1,000 USC account without a Stop Loss:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { layer: 'Layer 1', lot: '0.01 lot', dist: '-$15 move', dd: '-150 USC', note: 'Masih aman' },
            { layer: 'Layer 2', lot: '0.02 lot', dist: '-$12 move', dd: '-240 USC', note: 'Floating -39%' },
            { layer: 'Layer 3', lot: '0.04 lot', dist: '-$9 move', dd: '-360 USC', note: 'Floating -75%' },
            { layer: 'Layer 4', lot: '0.08 lot', dist: '-$6 move', dd: '-480 USC', note: 'Akumulasi -1,230 USC' },
            { layer: 'STOP OUT', lot: 'Total 0.15', dist: 'Ekuitas <= 0', dd: '-100% MC', note: 'Saldo Habis Total' },
          ].map((row, idx) => (
            <div
              key={row.layer}
              className={`rounded-xl border p-3.5 space-y-1 ${
                idx === 4
                  ? 'border-[#EF4444] bg-[#EF4444]/20'
                  : 'border-white/10 bg-[#09060F]/80'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#D4AF37] font-bold">{row.layer}</span>
                <span className="text-[#BEB6CE]">{row.lot}</span>
              </div>
              <div className="font-mono text-base font-bold text-[#EF4444]">{row.dd}</div>
              <div className="text-[11px] text-[#B8B0C8]">{row.dist} • {row.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
