'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  calculateBrokerSymbolPositionSize,
  AccountDenomination,
} from '@/lib/math/cent-calculator';
import { useLocale } from '@/i18n/LocaleContext';
import { LiveKursPill } from '@/components/market/LiveKursPill';
import {
  Lock,
  Unlock,
  CheckCircle2,
  XOctagon,
  ShieldCheck,
  Calculator,
  AlertTriangle,
  Crosshair,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface IctGateCheckItem {
  id: string;
  tag: string;
  labelId: string;
  labelEn: string;
  descId: string;
  descEn: string;
}

const PRE_ENTRY_ICT_CHECKS: IctGateCheckItem[] = [
  {
    id: 'killzone',
    tag: 'STEP 01 // TIME BEFORE PRICE',
    labelId: 'Berada di Jam ICT Killzone / Silver Bullet (London 14–17 WIB atau NY 19–22 WIB)',
    labelEn: 'Inside Active ICT Killzone / Silver Bullet Window (London or NY Session)',
    descId: 'Bukan jam tidur Asia dan bukan jam spread melar Rollover (04:00–05:30 WIB).',
    descEn: 'Not stagnant Asian chop and not broker rollover widening hours (21:00–22:30 UTC).',
  },
  {
    id: 'liquidity',
    tag: 'STEP 02 // LIQUIDITY SWEEP',
    labelId: 'Harga Sudah Menyapu Likuiditas (BSL di Equal Highs / SSL di Equal Lows)',
    labelEn: 'Clean Liquidity Sweep Completed (BSL Above Highs or SSL Below Lows)',
    descId: 'Pastikan kamu masuk SETELAH stop-loss ritel tersapu (Judas Swing selesai).',
    descEn: 'Verify you are entering AFTER retail stops have been swept, not chasing a breakout.',
  },
  {
    id: 'mss',
    tag: 'STEP 03 // DISPLACEMENT & MSS',
    labelId: 'Ada Pergeseran Struktur Jelas (Market Structure Shift / MSS) dengan Body Candle Tegas',
    labelEn: 'Confirmed Market Structure Shift (MSS) Backed by Strong Displacement Candle',
    descId: 'Candle penutup menembus struktur terdekat dengan tenaga institusional.',
    descEn: 'Energetic displacement candle closed decisively past the prior swing pivot.',
  },
  {
    id: 'fvg',
    tag: 'STEP 04 // FVG & DISCOUNT/PREMIUM',
    labelId: 'Entry di Fair Value Gap (FVG) / Order Block Zona Discount (Buy) atau Premium (Sell)',
    labelEn: 'Entry Placed Inside Fair Value Gap (FVG) / Order Block in Discount or Premium Array',
    descId: 'Stop Loss diletakkan secara struktural di balik swing FVG/OB yang valid.',
    descEn: 'Stop Loss placed structurally behind the invalidating swing anchor.',
  },
];

export function PositionSizeGatekeeperView() {
  const { isId, l } = useLocale();

  // ICT Gatekeeper Checkboxes
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  // Focused Broker Symbol Position Sizer State
  const [equity, setEquity] = useState<number>(1000);
  const [accountDenomination, setAccountDenomination] =
    useState<AccountDenomination>('USC');
  const [riskPercentage, setRiskPercentage] = useState<number>(1.0);
  const [stopLossDistance, setStopLossDistance] = useState<number>(5.0);
  const [tickSize, setTickSize] = useState<number>(0.01);
  const [tickValuePerLot, setTickValuePerLot] = useState<number>(1.0);
  const [minimumLot, setMinimumLot] = useState<number>(0.01);
  const [maximumLot, setMaximumLot] = useState<number>(100.0);
  const [volumeStep, setVolumeStep] = useState<number>(0.01);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const gateUnlocked = checkedIds.length === PRE_ENTRY_ICT_CHECKS.length;

  const sizingResult = useMemo(
    () =>
      calculateBrokerSymbolPositionSize({
        equity,
        accountDenomination,
        riskPercentage,
        stopLossDistance,
        tickSize,
        tickValuePerLot,
        minimumLot,
        maximumLot,
        volumeStep,
        leverage: 500,
        contractUnitsPerLot: accountDenomination === 'USC' ? 1 : 100,
        referencePrice: 2650,
      }),
    [
      equity,
      accountDenomination,
      riskPercentage,
      stopLossDistance,
      tickSize,
      tickValuePerLot,
      minimumLot,
      maximumLot,
      volumeStep,
    ]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-jgs-gold">
            <Crosshair className="w-4 h-4" />
            <span>
              {isId
                ? 'KALKULATOR LOT PRESISI + PRE-ENTRY ICT GATEKEEPER'
                : 'PRECISION LOT SIZER + PRE-ENTRY ICT CONFIRMATION GATEKEEPER'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-jgs-ivory">
            {isId
              ? 'Verifikasi Setup ICT/SMC & Hitung Ukuran Lot Aman Sebelum Entry'
              : 'Verify Your ICT Setup & Compute Exact Broker Lot Size Before Entry'}
          </h1>
          <p className="text-sm sm:text-base text-jgs-ivory-muted leading-relaxed">
            {isId
              ? 'Berbeda dari halaman Cent Lab (konversi USD↔USC & simulasi drawdown), halaman ini mewajibkanmu meloloskan 4 gerbang konfirmasi ICT/SMC terlebih dahulu sebelum tiket eksekusi MT5 dibuka.'
              : 'Distinct from Cent Lab (USD↔USC conversion & drawdown simulator), this terminal requires passing all 4 ICT/SMC institutional checks before unlocking your MT5 execution ticket.'}
          </p>
          <div className="pt-1">
            <LiveKursPill />
          </div>
        </div>

        <Link href={l('/calculators/cent')} className="jgs-btn-outline text-xs shrink-0">
          <Calculator className="w-4 h-4 text-jgs-gold" />
          <span>{isId ? 'Buka JGS Cent Lab Lengkap' : 'Open Full JGS Cent Lab'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Grid: Left Gatekeeper + Inputs, Right Locked/Unlocked Execution Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          {/* Module 1: Pre-Entry ICT Confirmation Gatekeeper */}
          <div className="rounded-2xl border border-jgs-gold/35 bg-jgs-plum-surface/85 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-jgs-gold block">
                  {isId ? 'TAHAP 1 // GERBANG DISIPLIN ICT/SMC' : 'PHASE 1 // ICT/SMC CONFIRMATION GATE'}
                </span>
                <h2 className="font-display text-xl font-bold text-jgs-ivory">
                  {isId ? 'Pre-Entry ICT Confirmation Gatekeeper' : 'Pre-Entry ICT Confirmation Gatekeeper'}
                </h2>
              </div>
              <span
                className={`rounded-full border px-3 py-1 font-mono text-[11px] font-bold ${
                  gateUnlocked
                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                    : 'border-amber-400/40 bg-amber-500/10 text-amber-300'
                }`}
              >
                {checkedIds.length} / 4 {isId ? 'TERKONFIRMASI' : 'CONFIRMED'}
              </span>
            </div>

            <div className="space-y-3">
              {PRE_ENTRY_ICT_CHECKS.map((chk) => {
                const isChecked = checkedIds.includes(chk.id);
                return (
                  <label
                    key={chk.id}
                    className={`flex items-start gap-3.5 rounded-xl border p-4 cursor-pointer transition-all ${
                      isChecked
                        ? 'border-emerald-500/45 bg-emerald-950/20'
                        : 'border-white/10 bg-jgs-plum-deep/75 hover:border-jgs-gold/35'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCheck(chk.id)}
                      className="mt-1 h-4 w-4 accent-amber-400 shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="block font-mono text-[10px] font-bold text-jgs-gold">
                        {chk.tag}
                      </span>
                      <p className="text-sm font-semibold text-jgs-ivory leading-snug">
                        {isId ? chk.labelId : chk.labelEn}
                      </p>
                      <p className="text-xs text-jgs-ivory-muted leading-relaxed">
                        {isId ? chk.descId : chk.descEn}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Module 2: Exact Broker Symbol Specification Inputs */}
          <div className="rounded-2xl border border-white/10 bg-jgs-plum-surface/80 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-jgs-gold block">
                  {isId ? 'TAHAP 2 // PARAMETER SPESIFIKASI SIMBOL MT5' : 'PHASE 2 // MT5 SYMBOL SPECIFICATIONS'}
                </span>
                <h2 className="font-display text-xl font-bold text-jgs-ivory">
                  {isId ? 'Input Risiko & Spesifikasi Kontrak Broker' : 'Risk & Broker Contract Specification Inputs'}
                </h2>
              </div>
              <div className="inline-flex rounded-lg bg-jgs-plum-deep p-1 border border-white/10">
                {(['USC', 'USD'] as AccountDenomination[]).map((denom) => (
                  <button
                    key={denom}
                    type="button"
                    onClick={() => {
                      setAccountDenomination(denom);
                      if (denom === 'USC' && equity < 100) setEquity(equity * 100);
                      if (denom === 'USD' && equity >= 500) setEquity(Math.max(10, equity / 100));
                    }}
                    className={`px-3 py-1 rounded font-mono text-xs font-bold transition-all ${
                      accountDenomination === denom
                        ? 'bg-jgs-gold text-jgs-plum-deep'
                        : 'text-jgs-ivory-muted'
                    }`}
                  >
                    {denom}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="jgs-label">
                  {isId ? `Ekuitas (${accountDenomination})` : `Equity (${accountDenomination})`}
                </label>
                <input
                  type="number"
                  min={1}
                  step="any"
                  value={equity}
                  onChange={(e) => setEquity(Math.max(1, Number(e.target.value) || 0))}
                  className="jgs-input font-mono font-bold text-jgs-gold"
                />
              </div>

              <div>
                <label className="jgs-label">
                  {isId ? 'Batas Risiko (%)' : 'Risk Limit (%)'}
                </label>
                <input
                  type="number"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(Math.max(0.1, Number(e.target.value) || 0))}
                  className="jgs-input font-mono"
                />
              </div>

              <div>
                <label className="jgs-label">
                  {isId ? 'Jarak Stop Loss (Harga)' : 'Stop-Loss Distance (Price)'}
                </label>
                <input
                  type="number"
                  min={0.0001}
                  step="any"
                  value={stopLossDistance}
                  onChange={(e) => setStopLossDistance(Math.max(0.0001, Number(e.target.value) || 0.1))}
                  className="jgs-input font-mono"
                />
              </div>

              <div>
                <label className="jgs-label">Tick Size (e.g. 0.01)</label>
                <input
                  type="number"
                  min={0.00001}
                  step="any"
                  value={tickSize}
                  onChange={(e) => setTickSize(Math.max(0.00001, Number(e.target.value) || 0.01))}
                  className="jgs-input font-mono"
                />
              </div>

              <div>
                <label className="jgs-label">
                  {isId ? `Tick Value / 1.00 Lot (${accountDenomination})` : `Tick Value / Lot (${accountDenomination})`}
                </label>
                <input
                  type="number"
                  min={0.0001}
                  step="any"
                  value={tickValuePerLot}
                  onChange={(e) => setTickValuePerLot(Math.max(0.0001, Number(e.target.value) || 1))}
                  className="jgs-input font-mono"
                />
              </div>

              <div>
                <label className="jgs-label">Minimum Lot</label>
                <input
                  type="number"
                  min={0.001}
                  step={0.01}
                  value={minimumLot}
                  onChange={(e) => setMinimumLot(Math.max(0.001, Number(e.target.value) || 0.01))}
                  className="jgs-input font-mono"
                />
              </div>

              <div>
                <label className="jgs-label">Maximum Lot</label>
                <input
                  type="number"
                  min={0.01}
                  step="any"
                  value={maximumLot}
                  onChange={(e) => setMaximumLot(Math.max(0.01, Number(e.target.value) || 100))}
                  className="jgs-input font-mono"
                />
              </div>

              <div>
                <label className="jgs-label">Volume Step</label>
                <input
                  type="number"
                  min={0.001}
                  step={0.01}
                  value={volumeStep}
                  onChange={(e) => setVolumeStep(Math.max(0.001, Number(e.target.value) || 0.01))}
                  className="jgs-input font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Execution Output Gated by Strict Risk Math + 4 ICT Checks */}
        <div className="lg:col-span-5 rounded-3xl border-2 border-jgs-gold/40 bg-gradient-to-b from-jgs-plum-surface via-jgs-plum-deep to-jgs-plum-surface p-6 sm:p-7 space-y-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-jgs-gold font-bold">
              MT5 EXECUTION TICKET
            </span>
            {gateUnlocked && sizingResult.isExecutable ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 font-mono text-[10px] font-bold text-emerald-400">
                <Unlock className="w-3 h-3" />
                UNLOCKED & SAFE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 font-mono text-[10px] font-bold text-red-400">
                <Lock className="w-3 h-3" />
                {!sizingResult.isExecutable ? 'REJECTED BY RISK CAP' : 'LOCKED BY ICT GATE'}
              </span>
            )}
          </div>

          {/* 1. Strict Risk Engine Check First */}
          {!sizingResult.isExecutable ? (
            <div className="rounded-2xl border border-red-500/45 bg-red-950/30 p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-red-400">
                <XOctagon className="w-5 h-5 shrink-0" />
                <span>
                  {isId
                    ? 'TRADE DITOLAK, RISIKO MELEBIHI BATAS!'
                    : 'TRADE REJECTED: EXCEEDS REQUESTED RISK LIMIT'}
                </span>
              </div>
              <p className="text-xs text-jgs-ivory leading-relaxed">
                {sizingResult.rejectionOrStatusExplanation}
              </p>
              <div className="rounded-xl border border-red-500/30 bg-jgs-plum-deep/80 p-3 font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-jgs-ivory-faint">Raw Calculated Volume:</span>
                  <span className="text-red-300">{sizingResult.rawIdealLotSize.toFixed(4)} lot</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-jgs-ivory-faint">Broker Min Lot Risk:</span>
                  <span className="text-red-400 font-bold">
                    {sizingResult.minimumLotRiskPercentage}% (vs cap {riskPercentage}%)
                  </span>
                </div>
              </div>
            </div>
          ) : !gateUnlocked ? (
            <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-5 space-y-3 text-center">
              <Lock className="w-8 h-8 text-jgs-gold mx-auto" />
              <h3 className="font-display text-lg font-bold text-jgs-ivory">
                {isId
                  ? 'Tiket Lot Terkunci Menunggu Konfirmasi ICT'
                  : 'Execution Lot Ticket Locked Pending ICT Checks'}
              </h3>
              <p className="text-xs text-jgs-ivory-muted leading-relaxed">
                {isId
                  ? `Matematika lot sudah aman untuk risiko ${riskPercentage}%, tetapi kamu baru mencentang ${checkedIds.length}/4 konfirmasi ICT di sebelah kiri. Selesaikan semua 4 syarat (Killzone, Sweep, MSS, FVG) untuk membuka angka lot pastimu.`
                  : `Sizing math is valid for ${riskPercentage}% risk, but only ${checkedIds.length}/4 ICT checks are confirmed. Check all 4 conditions (Killzone, Sweep, MSS, FVG) to reveal your final executable volume.`}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/25 p-6 text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                {isId ? '4/4 KONFIRMASI ICT LOLOS • LOT TERVERIFIKASI' : '4/4 ICT CHECKS PASSED • VERIFIED VOLUME'}
              </div>
              <div className="font-display text-5xl font-bold text-jgs-gold">
                {sizingResult.approvedLotSize?.toFixed(2)}{' '}
                <span className="text-xl text-jgs-ivory">Lots</span>
              </div>
              <p className="font-mono text-xs text-emerald-300">
                Actual Risk: {sizingResult.actualRiskAmount?.toFixed(2)} {accountDenomination} (
                {sizingResult.actualRiskPercentage}%)
              </p>
            </div>
          )}

          {/* Breakdown Metrics */}
          <div className="space-y-2.5 text-xs font-mono border-t border-white/10 pt-4">
            <div className="flex justify-between">
              <span className="text-jgs-ivory-faint">Max Risk Budget:</span>
              <span className="text-jgs-ivory font-bold">
                {sizingResult.maxAllowedRiskAmount.toFixed(2)} {accountDenomination} ($
                {sizingResult.maxAllowedRiskUsdEquivalent.toFixed(2)} USD)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-jgs-ivory-faint">Stop-Loss Distance (Ticks):</span>
              <span className="text-jgs-ivory">{sizingResult.stopLossTicks.toFixed(1)} ticks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-jgs-ivory-faint">Estimated Required Margin:</span>
              <span className="text-jgs-ivory">
                {sizingResult.estimatedMarginRequired
                  ? `${sizingResult.estimatedMarginRequired.toFixed(2)} ${accountDenomination}`
                  : 'N/A (Rejected)'}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-jgs-plum-deep/80 p-3.5 text-[11px] text-jgs-ivory-muted flex items-start gap-2">
            <Clock className="w-4 h-4 text-jgs-gold shrink-0 mt-0.5" />
            <span>
              {isId
                ? 'Ingat aturan JGS: Jika ukuran lot mentok di bawah Minimum Lot 0.01, JANGAN pernah dinaikkan manual. Batalkan entry atau pindah ke akun Cent 1 oz.'
                : 'JGS Rule: If valid volume falls below Broker Minimum Lot, NEVER round up manually. Skip the trade or switch to a Cent account.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
