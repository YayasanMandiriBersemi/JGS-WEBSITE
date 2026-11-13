'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculateRiskMetrics } from '@/lib/math/risk-engine';
import { JeyStrategistCallout } from '@/components/brand/JeyStrategistCallout';
import { useLocale } from '@/i18n/LocaleContext';
import { LiveKursPill } from '@/components/market/LiveKursPill';
import { ShieldCheck, TrendingDown, Calculator, ArrowRight } from 'lucide-react';

export function RiskManagementCalculator() {
  const { isId, l } = useLocale();
  const [accountBalance, setAccountBalance] = useState<number>(2500);
  const [accountUnit, setAccountUnit] = useState<'USC' | 'USD'>('USC');
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [stopLossPoints, setStopLossPoints] = useState<number>(250);
  const [rewardToRiskRatio, setRewardToRiskRatio] = useState<number>(2.0);
  const [dailyMaxLossPercent, setDailyMaxLossPercent] = useState<number>(3.0);
  const [pointValuePerMinLot, setPointValuePerMinLot] = useState<number>(0.01);

  const metrics = calculateRiskMetrics({
    accountBalance,
    accountUnit,
    riskPercent,
    stopLossPoints,
    rewardToRiskRatio,
    dailyMaxLossPercent,
    pointValuePerMinLot
  });

  const dynamicJeyCallout = useMemo(() => {
    if (metrics.isRejectedBelowMinLot) {
      return {
        title: isId ? 'Jey Co-Pilot • Peringatan Lot Minimum' : 'Jey Co-Pilot • Min Lot Alert',
        tag: isId ? 'GUNAKAN AKUN CENT (USC)' : 'SWITCH TO CENT (USC)',
        text: isId
          ? `Ukuran lot ideal (${metrics.rawIdealLotSize} lot) lebih kecil dari batas minimum broker 0.01 lot. Jangan paksakan entry di akun USD standar, gunakan akun Cent (USC) agar batas risiko ${riskPercent}% tetap terjaga.`
          : `Your ideal volume (${metrics.rawIdealLotSize} lot) is smaller than the broker's 0.01 minimum lot. Do not force the trade on a Standard USD account, switch to USC.`
      };
    }
    if (riskPercent <= 1.5) {
      return {
        title: isId ? 'Jey Co-Pilot • Kurva Pertahanan' : 'Jey Co-Pilot • Defense Curve',
        tag: isId ? 'ZONA AMAN DRAWDOWN' : 'DRAWDOWN SAFE ZONE',
        text: isId
          ? `Dengan risiko ${riskPercent}% per posisi dan rasio 1:${rewardToRiskRatio}, kamu hanya membutuhkan win rate di atas ${metrics.breakevenWinRatePercent}% untuk bertumbuh secara konsisten tanpa takut kehabisan modal.`
          : `At ${riskPercent}% risk per trade and a 1:${rewardToRiskRatio} R:R ratio, you only need a win rate above ${metrics.breakevenWinRatePercent}% to grow steadily.`
      };
    }
    return {
      title: isId ? 'Jey Co-Pilot • Peringatan Drawdown' : 'Jey Co-Pilot • Drawdown Caution',
      tag: isId ? 'JAGA DI BAWAH 2% / TRADE' : 'KEEP RISK UNDER 2%',
      text: isId
        ? 'Jaga batas drawdown maksimum akunmu di bawah 15%. Saat drawdown menembus 30%–50%, matematika pemulihan modal akan berbalik melawanmu.'
        : 'Keep your maximum account drawdown above the 15% waterline. Below 30% drawdown, recovery math starts fighting against you.'
    };
  }, [metrics, riskPercent, rewardToRiskRatio, isId]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6A937]">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {isId
                ? 'JGS LAB REKAYASA RISIKO & SIMULATOR DRAWDOWN'
                : 'JGS RISK & DRAWDOWN ENGINEERING LAB'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE]">
            {isId
              ? 'Simulator Drawdown, Rasio R:R & Batas Kerugian Harian'
              : 'Drawdown Recovery Simulator, Asymmetric R:R & Daily Loss Lock'}
          </h1>
          <p className="text-sm sm:text-base text-[#BEB6CE] leading-relaxed">
            {isId
              ? 'Visualisasikan berapa persen profit yang dibutuhkan untuk memulihkan akun dari penurunan (drawdown), hitung win rate impas (breakeven), dan tentukan batas berhenti trading harian.'
              : 'Visualize the exact percentage gain required to recover from account drawdowns, compute your breakeven win rate, and set your daily loss circuit breaker.'}
          </p>
          <div className="pt-1">
            <LiveKursPill />
          </div>
        </div>

        <Link href={l('/tools/cent-lab')} className="jgs-btn-outline text-xs shrink-0">
          <Calculator className="w-4 h-4 text-[#D6A937]" />
          <span>{isId ? 'Buka Cent Lab Dual-Mode' : 'Open Dual-Mode Cent Lab'}</span>
        </Link>
      </div>

      {/* Main Sizer + Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-5 rounded-2xl bg-[#17131D] border border-white/[0.08] p-6 sm:p-7 space-y-5">
          <h2 className="font-display text-lg font-bold text-[#F7F4EE] border-b border-white/[0.07] pb-3">
            {isId ? '1. Parameter Risiko & Target R:R' : '1. Risk & Reward Parameters'}
          </h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label htmlFor="risk-unit" className="jgs-label text-xs">
                {isId ? 'Satuan Akun' : 'Account Unit'}
              </label>
              <select
                id="risk-unit"
                value={accountUnit}
                onChange={(e) => setAccountUnit(e.target.value as 'USC' | 'USD')}
                className="jgs-input"
              >
                <option value="USC">USC (Cent)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="risk-balance" className="jgs-label text-xs">
                {isId ? `Ekuitas Akun (${accountUnit})` : `Account Equity (${accountUnit})`}
              </label>
              <input
                id="risk-balance"
                type="number"
                min={10}
                step={100}
                value={accountBalance}
                onChange={(e) => setAccountBalance(Number(e.target.value))}
                className="jgs-input font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="risk-pct" className="jgs-label text-xs">
                {isId ? 'Risiko per Trade (%)' : 'Risk Per Trade (%)'}
              </label>
              <input
                id="risk-pct"
                type="number"
                min={0.25}
                max={10}
                step={0.25}
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                className="jgs-input font-mono"
              />
            </div>
            <div>
              <label htmlFor="daily-cap-pct" className="jgs-label text-xs">
                {isId ? 'Batas Rugi Harian (%)' : 'Daily Loss Lock (%)'}
              </label>
              <input
                id="daily-cap-pct"
                type="number"
                min={1}
                max={20}
                step={0.5}
                value={dailyMaxLossPercent}
                onChange={(e) => setDailyMaxLossPercent(Number(e.target.value))}
                className="jgs-input font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="risk-sl" className="jgs-label text-xs">
                {isId ? 'Jarak Stop Loss (Poin MT5)' : 'Stop Loss Distance (MT5 Points)'}
              </label>
              <input
                id="risk-sl"
                type="number"
                min={10}
                max={5000}
                step={10}
                value={stopLossPoints}
                onChange={(e) => setStopLossPoints(Number(e.target.value))}
                className="jgs-input font-mono"
              />
            </div>
            <div>
              <label htmlFor="risk-pt-val" className="jgs-label text-xs">
                {isId
                  ? `Nilai Poin / 0.01 Lot (${accountUnit})`
                  : `Point Value / 0.01 Lot (${accountUnit})`}
              </label>
              <input
                id="risk-pt-val"
                type="number"
                min={0.001}
                step={0.01}
                value={pointValuePerMinLot}
                onChange={(e) => setPointValuePerMinLot(Number(e.target.value))}
                className="jgs-input font-mono"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0E0B14] space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="risk-rr" className="text-xs font-medium text-[#BEB6CE]">
                {isId
                  ? `Target Rasio Reward:Risk (1 : ${rewardToRiskRatio})`
                  : `Target Reward-to-Risk Ratio (1 : ${rewardToRiskRatio})`}
              </label>
              <span className="text-xs font-mono text-[#10B981]">
                TP: {metrics.takeProfitPoints} pts
              </span>
            </div>
            <input
              id="risk-rr"
              type="range"
              min={1.0}
              max={5.0}
              step={0.25}
              value={rewardToRiskRatio}
              onChange={(e) => setRewardToRiskRatio(Number(e.target.value))}
              className="w-full accent-[#D6A937] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#8E84A4]">
              <span>1:1 (50% BE)</span>
              <span>1:2 (33.3% BE)</span>
              <span>1:3 (25% BE)</span>
              <span>1:5 (16.7% BE)</span>
            </div>
          </div>
        </div>

        {/* Right Computed Metrics */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono tabular-nums">
            <div
              className={`rounded-2xl p-5 border ${
                metrics.isRejectedBelowMinLot
                  ? 'border-[#EF4444]/60 bg-[#17131D]'
                  : 'border-white/[0.07] bg-[#17131D]'
              }`}
            >
              <div className="text-[11px] text-[#8E84A4] uppercase">
                {isId ? 'Ukuran Lot Valid' : 'Approved Volume'}
              </div>
              {metrics.approvedLotSizeOrNull !== null ? (
                <>
                  <div className="text-2xl font-bold text-[#D6A937] mt-1">
                    {metrics.approvedLotSizeOrNull.toFixed(2)}{' '}
                    <span className="text-xs font-normal text-[#BEB6CE]">
                      {accountUnit === 'USC' ? 'Cent' : 'Std'}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#BEB6CE] mt-1">
                    SL {metrics.stopLossPoints} {isId ? 'poin' : 'pts'}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-base font-bold text-[#EF4444] mt-1">
                    {isId ? 'DITOLAK (< 0.01 Lot)' : 'REJECTED (< 0.01 Lot)'}
                  </div>
                  <div className="text-[11px] text-[#F3E5AB] mt-1">
                    {isId
                      ? `Ideal ${metrics.rawIdealLotSize} lot < 0.01. Beralih ke USC!`
                      : `Ideal ${metrics.rawIdealLotSize} lot < 0.01. Switch to USC!`}
                  </div>
                </>
              )}
            </div>

            <div className="rounded-2xl p-5 bg-[#17131D] border border-white/[0.07]">
              <div className="text-[11px] text-[#8E84A4] uppercase">
                {isId ? 'Risiko 1R per Trade' : '1R Monetary Risk'}
              </div>
              <div className="text-2xl font-bold text-[#EF4444] mt-1">
                -{metrics.riskAmountInUnit.toFixed(2)} {accountUnit}
              </div>
              <div className="text-[11px] text-[#BEB6CE] mt-1">
                {metrics.riskPercent}% {isId ? 'dari' : 'of'} {accountBalance.toLocaleString()}{' '}
                {accountUnit}
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-[#17131D] border border-white/[0.07]">
              <div className="text-[11px] text-[#8E84A4] uppercase">
                {isId
                  ? `Target Profit (+${metrics.rewardToRiskRatio}R)`
                  : `Target Reward (+${metrics.rewardToRiskRatio}R)`}
              </div>
              <div className="text-2xl font-bold text-[#10B981] mt-1">
                +{metrics.projectedRewardInUnit.toFixed(2)} {accountUnit}
              </div>
              <div className="text-[11px] text-[#BEB6CE] mt-1">
                TP +{metrics.takeProfitPoints} {isId ? 'poin' : 'points'}
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-[#17131D] border border-white/[0.07]">
              <div className="text-[11px] text-[#8E84A4] uppercase">
                {isId ? 'Win Rate Impas (BE)' : 'Breakeven Win Rate'}
              </div>
              <div className="text-2xl font-bold text-[#F7F4EE] mt-1">
                {metrics.breakevenWinRatePercent}%
              </div>
              <div className="text-[11px] text-[#10B981] mt-1">
                {isId
                  ? `Win > ${metrics.breakevenWinRatePercent}% = Profit`
                  : `Win > ${metrics.breakevenWinRatePercent}% = Profitable`}
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-[#17131D] border border-white/[0.07]">
              <div className="text-[11px] text-[#8E84A4] uppercase">
                {isId ? 'Ekspektasi @ 45% Win' : 'Expectancy @ 45% Win'}
              </div>
              <div
                className={`text-2xl font-bold mt-1 ${
                  metrics.expectedValueAt45PercentWinRateR > 0
                    ? 'text-[#10B981]'
                    : 'text-[#EF4444]'
                }`}
              >
                {metrics.expectedValueAt45PercentWinRateR > 0 ? '+' : ''}
                {metrics.expectedValueAt45PercentWinRateR}R
              </div>
              <div className="text-[11px] text-[#BEB6CE] mt-1">
                {isId ? 'Nilai ekspektasi per posisi' : 'Mathematical edge per setup'}
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-[#17131D] border border-white/[0.07]">
              <div className="text-[11px] text-[#8E84A4] uppercase">
                {isId ? 'Rem Darurat Harian' : 'Daily Circuit Breaker'}
              </div>
              <div className="text-2xl font-bold text-[#D6A937] mt-1">
                {metrics.maxTradesBeforeDailyLock}x {isId ? 'Loss' : 'Losses'}
              </div>
              <div className="text-[11px] text-[#BEB6CE] mt-1">
                {isId ? 'Maks' : 'Max'} -{metrics.dailyLossCapInUnit.toFixed(0)} {accountUnit} /{' '}
                {isId ? 'hari' : 'day'}
              </div>
            </div>
          </div>

          {/* Consecutive Loss Streak Comparison */}
          <div className="rounded-2xl bg-[#17131D] border border-white/[0.08] p-6 space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D6A937]">
                {isId
                  ? 'Uji Ketahanan Kekalahan Beruntun (Losing Streak)'
                  : 'Losing Streak Stress-Tester'}
              </span>
              <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
                {isId
                  ? `Aturan Risiko ${metrics.riskPercent}% Anda vs Risiko Agresif 5%`
                  : `Your ${metrics.riskPercent}% Risk Rule vs. 5% Over-Risking`}
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs tabular-nums">
                <thead>
                  <tr className="border-b border-white/10 text-[#8E84A4]">
                    <th className="py-2 pr-3">{isId ? 'Loss Beruntun' : 'Streak'}</th>
                    <th className="py-2 px-3">
                      {isId ? `Ekuitas Anda (${metrics.riskPercent}%)` : `Your Equity (${metrics.riskPercent}%)`}
                    </th>
                    <th className="py-2 px-3">{isId ? 'Drawdown Anda' : 'Your Drawdown'}</th>
                    <th className="py-2 px-3">
                      {isId ? 'Ekuitas Agresif (5%)' : 'Aggressive Equity (5%)'}
                    </th>
                    <th className="py-2 pl-3">
                      {isId ? 'Drawdown (5%)' : 'Aggressive Drawdown'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {metrics.streakSimulation.slice(0, 6).map((row) => (
                    <tr key={row.lossNumber}>
                      <td className="py-2 pr-3 text-[#BEB6CE]">
                        {isId ? `Loss #${row.lossNumber}` : `Loss #${row.lossNumber}`}
                      </td>
                      <td className="py-2 px-3 text-[#F7F4EE] font-semibold">
                        {row.remainingBalanceFixedPercent.toLocaleString()} {accountUnit}
                      </td>
                      <td className="py-2 px-3 text-[#10B981]">-{row.drawdownFixedPercent}%</td>
                      <td className="py-2 px-3 text-[#BEB6CE]">
                        {row.remainingBalanceAggressive5Percent.toLocaleString()} {accountUnit}
                      </td>
                      <td className="py-2 pl-3 text-[#EF4444]">
                        -{row.drawdownAggressive5Percent}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Nonlinear Drawdown Recovery Curve Visualizer */}
      <div className="rounded-2xl bg-[#17131D] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#EF4444]">
              <TrendingDown className="w-4 h-4" />
              {isId
                ? 'MATEMATIKA PEMULIHAN DRAWDOWN NON-LINEAR'
                : 'NONLINEAR DRAWDOWN RECOVERY MATHEMATICS'}
            </div>
            <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-1">
              {isId
                ? 'Mengapa Drawdown Dalam Sangat Sulit Dipulihkan Secara Matematis'
                : 'Why Deep Drawdowns Are Mathematically Lethal'}
            </h2>
            <p className="text-sm text-[#BEB6CE] mt-1 max-w-2xl">
              {isId
                ? 'Rugi 10% hanya butuh profit +11,1% untuk kembali impas. Namun rugi 50% membutuhkan profit +100%, dan rugi 80% membutuhkan profit +400% hanya untuk kembali ke modal awal.'
                : 'Losing 10% requires only +11.1% to recover. Losing 50% requires +100% to recover. Losing 80% requires +400% just to return to breakeven.'}
            </p>
          </div>
          <Link href={l('/journal')} className="jgs-btn-outline text-xs self-start">
            <span>{isId ? 'Catat Disiplin di Jurnal Trader' : 'Audit Discipline in Journal'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono tabular-nums">
          {metrics.drawdownRecoveryTable.map((pt) => {
            const badgeColor =
              pt.severityZone === 'SAFE_BUFFER'
                ? 'border-[#10B981]/35 bg-[#0E0B14] text-[#10B981]'
                : pt.severityZone === 'CAUTION_ZONE'
                  ? 'border-[#D6A937]/35 bg-[#0E0B14] text-[#D6A937]'
                  : 'border-[#EF4444]/40 bg-[#0E0B14] text-[#EF4444]';

            return (
              <div key={pt.drawdownPercent} className={`p-4 rounded-xl border ${badgeColor}`}>
                <div className="text-[11px] uppercase opacity-85">
                  -{pt.drawdownPercent}% Drawdown
                </div>
                <div className="text-xl font-bold text-[#F7F4EE] mt-1">
                  +{pt.requiredGainPercentToRecover}%
                </div>
                <div className="text-[10px] text-[#BEB6CE] mt-1">
                  {isId
                    ? `Profit wajib dari sisa ${pt.remainingCapitalPercent}%`
                    : `Gain needed on remaining ${pt.remainingCapitalPercent}%`}
                </div>
              </div>
            );
          })}
        </div>

        <JeyStrategistCallout
          title={dynamicJeyCallout.title}
          contextTag={dynamicJeyCallout.tag}
          ruleText={dynamicJeyCallout.text}
          showAvatar={true}
        />
      </div>
    </div>
  );
}
