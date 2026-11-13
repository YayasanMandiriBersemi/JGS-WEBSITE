'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  QUANT_PIPELINE_STAGES,
  QUANT_PARAMETER_SPECS,
  MT5_SETUP_STEPS,
} from '@/lib/data/quant-docs';
import { loadMt5Checklist, saveMt5Checklist } from '@/lib/storage/jgs-local-store';
import { JeyStrategistCallout } from '@/components/brand/JeyStrategistCallout';
import { useLocale } from '@/i18n/LocaleContext';
import {
  Cpu,
  ShieldAlert,
  CheckSquare,
  Square,
  Server,
  Terminal,
  Activity,
  ArrowRight,
  FlaskConical,
} from 'lucide-react';

export function QuantLabDocs() {
  const { isId, l } = useLocale();
  const [checkedSteps, setCheckedSteps] = useState<string[]>(['mt5-step-1']);

  useEffect(() => {
    setCheckedSteps(loadMt5Checklist(['mt5-step-1']));
  }, []);

  function toggleStep(id: string) {
    setCheckedSteps((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveMt5Checklist(next);
      return next;
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="jgs-panel p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Cpu className="w-4 h-4" />
            <span>
              {isId
                ? 'JGS QUANT LAB • BONGKAR MITOS ROBOT & ARSITEKTUR EA MT5'
                : 'JGS QUANT LAB • MT5 EXPERT ADVISOR ARCHITECTURE'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE]">
            {isId
              ? 'Bongkar Mitos Robot: Rekayasa Algoritmik Tanpa Martingale.'
              : 'Debunking Bot Myths: Transparent Algorithmic Engineering Without Martingale.'}
          </h1>
          <p className="text-sm sm:text-base text-[#B8B0C8] leading-relaxed">
            {isId
              ? 'Pelajari bagaimana sistem berbasis aturan memproses setiap tick harga di dalam MetaTrader 5, menerapkan pembatas kerugian harian (circuit breaker), dan perbedaan dua pilar sistem EA JGS.'
              : 'Understand how rule-based Expert Advisors process ticks inside MetaTrader 5, enforce daily equity circuit breakers, and how our two core EA pillars protect 1,000 USC capital.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link href={l('/ea-testing')} className="jgs-btn-gold text-xs">
            <FlaskConical className="w-4 h-4" />
            <span>{isId ? 'Buka EA Testing Toolkit' : 'Open EA Testing Toolkit'}</span>
          </Link>
          <Link href={l('/performance')} className="jgs-btn-outline text-xs">
            <Activity className="w-4 h-4 text-[#D4AF37]" />
            <span>{isId ? 'Lihat Skema Performa' : 'Inspect Performance Schema'}</span>
          </Link>
        </div>
      </div>

      {/* Two Core JGS EA Pillars */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="jgs-panel p-6 sm:p-7 border-emerald-500/35 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
              {isId ? 'PILAR EA 01 // PROTEKSI MODAL' : 'EA PILLAR 01 // PROTECTION EA'}
            </span>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
              CONCEPT & CODE BLUEPRINT
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-[#F7F4EE]">
            JGS Cent Risk Guardian (Protection EA)
          </h2>
          <p className="text-sm text-[#B8B0C8] leading-relaxed">
            {isId
              ? 'Bukan robot pencetak uang instan, melainkan "Rem Darurat Otomatis" di terminal MT5 Anda. EA ini menjaga akun 1,000 USC agar tidak pernah melebihi batas risiko saat trader sedang emosional atau salah hitung lot.'
              : 'Not a magic money printer, but an automated emergency brake on your MT5 terminal. It guards 1,000 USC accounts from emotional over-sizing or miscalculated lots.'}
          </p>
          <ul className="space-y-2 text-xs text-[#F7F4EE] border-t border-white/10 pt-3">
            <li>• {isId ? 'Auto-Close & Lock MT5 jika Daily Drawdown menyentuh -3% (30 USC)' : 'Auto-Close & Lock terminal if Daily Drawdown hits -3% (30 USC)'}</li>
            <li>• {isId ? 'Tolak order otomatis jika Spread melar (saat Rollover 04:00 WIB / News)' : 'Reject execution when Spread spikes (Rollover / High-Impact News)'}</li>
            <li>• {isId ? 'Paksa pengecekan Contract Size 1 oz Cent vs 100 oz Standard' : 'Enforces 1 oz Cent vs 100 oz Standard contract validation'}</li>
          </ul>
        </div>

        <div className="jgs-panel p-6 sm:p-7 border-[#D4AF37]/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
              {isId ? 'PILAR EA 02 // EKSEKUSI SISTEMATIS' : 'EA PILLAR 02 // EXECUTION EA'}
            </span>
            <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#D4AF37]">
              ZERO MARTINGALE • FIXED SL
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-[#F7F4EE]">
            JGS Micro-Systematic EA (Execution EA)
          </h2>
          <p className="text-sm text-[#B8B0C8] leading-relaxed">
            {isId
              ? 'Mesin eksekusi berbasis aturan mekanikal yang hanya beroperasi pada jendela Killzone London/New York, memvalidasi sapuan likuiditas + pergeseran struktur, dan membatasi risiko tetap 0.5%–1% per posisi.'
              : 'A strictly rule-based execution engine operating only inside London/New York Killzones, validating liquidity sweeps + structure shifts with fixed 0.5%–1% risk and hard Stop Loss.'}
          </p>
          <ul className="space-y-2 text-xs text-[#F7F4EE] border-t border-white/10 pt-3">
            <li>• {isId ? '1 Posisi Aktif per Setup (Haram Averaging / Grid / Lipat Lot)' : 'Single Position per Setup (Strictly Zero Grid / Zero Martingale)'}</li>
            <li>• {isId ? 'Hard Stop-Loss tertanam di sisi server broker sejak detik entry' : 'Server-side Hard Stop-Loss attached at the exact moment of entry'}</li>
            <li>• {isId ? 'Filter Waktu Institusi (London 14–17 WIB & NY Silver Bullet 21–22 WIB)' : 'Institutional Time Filter (London & NY Killzone Windows)'}</li>
          </ul>
        </div>
      </section>

      {/* 5-Stage OnTick() Execution Pipeline */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-[#D4AF37]">
            {isId ? 'ALUR EKSEKUSI MQL5 DETERMINISTIK' : 'DETERMINISTIC MQL5 PIPELINE'}
          </span>
          <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-0.5">
            {isId
              ? 'Bagaimana Sistem Mengevaluasi Setiap Perubahan Harga (Tick)'
              : 'How a Defensive Expert Advisor Evaluates Every Price Tick'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {QUANT_PIPELINE_STAGES.map((stage) => (
            <div key={stage.step} className="jgs-panel p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#D4AF37] font-bold">{stage.step}</span>
                  <span className="px-2 py-0.5 rounded bg-[#191129] text-[#A882DD]">
                    {stage.latencyTarget}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-[#F7F4EE]">{stage.title}</h3>
                <p className="text-xs text-[#B8B0C8] leading-relaxed">{stage.description}</p>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs font-mono text-[#10B981]">
                Guard: {stage.safeguardImplemented}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parameter Reference Dictionary Table */}
      <section className="jgs-panel p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A882DD]">
              <Terminal className="w-3.5 h-3.5" />
              {isId ? 'SPESIFIKASI PARAMETER INPUT MQL5' : 'MQL5 INPUT PARAMETER SPECIFICATION'}
            </span>
            <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-0.5">
              {isId
                ? 'Penjelasan Parameter Input EA dalam Bahasa Sederhana'
                : 'EA Input Parameters Explained in Plain Language'}
            </h2>
          </div>
          <span className="text-xs text-[#BEB6CE]">
            {isId
              ? 'Contoh Konfigurasi: Akun Cent 2.500 – 10.000 USC'
              : 'Sample Baseline: 2,500 – 10,000 USC Cent Account'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/15 font-semibold text-[#D4AF37]">
                <th className="py-3 pr-4">
                  {isId ? 'Nama Parameter' : 'Parameter Name'}
                </th>
                <th className="py-3 px-3">
                  {isId ? 'Contoh Nilai Awal' : 'Sample Default'}
                </th>
                <th className="py-3 px-3">
                  {isId ? 'Rentang Konservatif' : 'Conservative Range'}
                </th>
                <th className="py-3 px-3">
                  {isId ? 'Fungsi Utama' : 'Plain-Language Function'}
                </th>
                <th className="py-3 pl-3">
                  {isId ? 'Peringatan Risiko' : 'Risk Warning'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {QUANT_PARAMETER_SPECS.map((param) => (
                <tr key={param.parameterName} className="hover:bg-[#191129]/40">
                  <td className="py-3.5 pr-4 font-mono font-bold text-[#F3E5AB]">
                    {param.parameterName}
                    <span className="block text-[11px] text-[#7E7494] font-normal">
                      type: {param.dataType}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[#10B981] font-semibold">
                    {param.defaultCentValue}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[#F7F4EE]">{param.safeMicroRange}</td>
                  <td className="py-3.5 px-3 text-[#B8B0C8] leading-relaxed">
                    {param.plainEnglishPurpose}
                  </td>
                  <td className="py-3.5 pl-3 text-[#F59E0B] leading-relaxed">
                    {param.misconfigurationWarning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive MT5 & VPS Setup Checklist */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 jgs-panel p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                <Server className="w-3.5 h-3.5" />
                {isId
                  ? 'DAFTAR PERIKSA KONFIGURASI TERMINAL'
                  : 'STEP-BY-STEP DEPLOYMENT VERIFICATION'}
              </span>
              <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-0.5">
                {isId
                  ? 'Checklist Interaktif Persiapan MT5 & VPS'
                  : 'Interactive MT5 & VPS Pre-Flight Checklist'}
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded bg-[#191129] text-[#D4AF37]">
              {checkedSteps.length} / {MT5_SETUP_STEPS.length}{' '}
              {isId ? 'Diverifikasi' : 'Verified'}
            </span>
          </div>

          <div className="space-y-3">
            {MT5_SETUP_STEPS.map((item) => {
              const isChecked = checkedSteps.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleStep(item.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-[#0F1B1D] border-[#10B981]/50'
                      : 'bg-[#09060F] border-white/10 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="mt-0.5 text-[#D4AF37] shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-[#10B981]" />
                    ) : (
                      <Square className="w-5 h-5 text-[#7E7494]" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-display font-bold text-sm sm:text-base text-[#F7F4EE]">
                        Step 0{item.stepNumber}: {item.title}
                      </span>
                      <span className="text-xs font-mono text-[#A882DD] bg-[#191129] px-2 py-0.5 rounded">
                        {item.locationInMt5}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#B8B0C8] leading-relaxed">
                      {item.instructions}
                    </p>
                    <div className="text-xs font-mono text-[#10B981] pt-1">
                      Check: {item.verificationCheck}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Anti-Martingale Security Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="jgs-panel p-6 border-[#EF4444]/40 bg-[#1A0D16] space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#EF4444] font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>
                {isId
                  ? 'KEBIJAKAN KESELAMATAN RISIKO ALGORITMIK'
                  : 'ALGORITHMIC RISK SAFETY POLICY'}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#F7F4EE]">
              {isId
                ? 'Mengapa JGS Menolak Sistem Grid & Martingale Tanpa Batas'
                : 'Why JGS Rejects Uncapped Grid & Martingale Systems'}
            </h3>
            <p className="text-xs sm:text-sm text-[#B8B0C8] leading-relaxed">
              {isId
                ? 'Banyak bot komersial yang dipasarkan di media sosial menggunakan metode averaging Martingale tersembunyi: saat posisi mengalami kerugian, bot menghapus Stop-Loss dan melipatgandakan ukuran lot (2x, 4x, 8x) sambil berharap harga berbalik.'
                : 'Many commercial bots marketed on social media rely on hidden Martingale averaging: when a position loses, they omit a Stop Loss and multiply lot sizes (2x, 4x, 8x) hoping for a price reversal.'}
            </p>
            <p className="text-xs sm:text-sm text-[#F7F4EE] leading-relaxed">
              {isId
                ? 'Pola tersebut menciptakan kurva Balance yang tampak mulus sementara waktu, tetapi menyimpan risiko likuidasi total saat terjadi tren satu arah yang kuat. Setiap arsitektur sistem JGS mewajibkan Stop-Loss di sisi server dan batas kerugian harian (Daily Equity Lock).'
                : 'That pattern creates a deceptively smooth Balance line temporarily while accumulating severe tail risk during sustained one-way trends. Every JGS system design enforces a server-side Stop Loss and a hard Daily Equity Lock.'}
            </p>
            <Link
              href={l('/academy/how-expert-advisors-think-vs-martingale-danger')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:underline pt-1"
            >
              <span>
                {isId ? 'Baca Modul 4.2 Lengkap di Academy' : 'Read Full Lesson 4.2 in Academy'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <JeyStrategistCallout
            ruleText={
              isId
                ? 'Jangan pernah mengaktifkan Expert Advisor pada akun live sebelum Anda mengaudit parameter MaxSpreadPoints, MagicNumber, spesifikasi kontrak simbol, dan DailyMaxDrawdownPct.'
                : 'Never enable an Expert Advisor on a live account until you have audited its MaxSpreadPoints, MagicNumber, symbol contract specifications, and DailyMaxDrawdownPct inputs.'
            }
            contextTag={isId ? 'PRINSIP QUANT LAB' : 'QUANT DIRECTIVE'}
          />
        </div>
      </section>
    </div>
  );
}
