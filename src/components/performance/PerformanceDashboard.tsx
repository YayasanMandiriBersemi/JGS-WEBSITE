'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getDefaultTelemetrySystemState } from '@/lib/telemetry/telemetry-provider';
import { JeyStrategistCallout } from '@/components/brand/JeyStrategistCallout';
import { useLocale } from '@/i18n/LocaleContext';
import {
  Unplug,
  Eye,
  AlertTriangle,
  ArrowRight,
  Database,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface TransparencyMetricSpec {
  number: string;
  key: string;
  name: { id: string; en: string };
  preLaunchState: { id: string; en: string };
  formulaOrFormat: string;
  definition: { id: string; en: string };
  whyItMatters: { id: string; en: string };
}

const ELEVEN_REQUIRED_METRICS: TransparencyMetricSpec[] = [
  {
    number: '01',
    key: 'balance',
    name: { id: 'Balance (Saldo Tertutup)', en: 'Balance (Closed Realized Balance)' },
    preLaunchState: {
      id: 'Menunggu Akun Master Live Terverifikasi',
      en: 'Awaiting Verified Live Master Account',
    },
    formulaOrFormat: 'Initial_Deposit + Σ(Closed_Net_PnL)',
    definition: {
      id: 'Total modal di akun yang hanya memperhitungkan posisi yang sudah ditutup sepenuhnya.',
      en: 'Total capital in the account accounting only for positions that have been fully closed.',
    },
    whyItMatters: {
      id: 'Balance saja tidak cukup; harus selalu dibaca bersama Equity agar tidak menyembunyikan posisi rugi yang masih terbuka.',
      en: 'Balance alone is incomplete; it must always be read alongside Equity so open underwater positions are never hidden.',
    },
  },
  {
    number: '02',
    key: 'equity',
    name: { id: 'Equity (Ekuitas Real-Time)', en: 'Equity (Real-Time Floating Value)' },
    preLaunchState: {
      id: 'Menunggu Akun Master Live Terverifikasi',
      en: 'Awaiting Verified Live Master Account',
    },
    formulaOrFormat: 'Balance + Floating_Profit - Floating_Loss',
    definition: {
      id: 'Nilai akun sebenarnya secara real-time jika seluruh posisi terbuka ditutup pada detik ini.',
      en: 'The true liquidation value of the account in real time if all open positions were closed immediately.',
    },
    whyItMatters: {
      id: 'Mendeteksi strategi grid/martingale yang menahan kerugian mengambang (floating loss) besar.',
      en: 'Exposes grid/martingale strategies that hold large unhedged floating losses.',
    },
  },
  {
    number: '03',
    key: 'net-return',
    name: { id: 'Net Return (Imbal Hasil Bersih)', en: 'Net Return (Time-Weighted Net Return)' },
    preLaunchState: {
      id: 'Belum Dipublikasikan (Pra-Peluncuran)',
      en: 'Unpublished (Pre-Launch State)',
    },
    formulaOrFormat: '((Ending_Equity - Starting_Equity - Net_Deposits) / Starting_Equity) × 100%',
    definition: {
      id: 'Persentase pertumbuhan bersih setelah dikurangi seluruh biaya komisi, spread, dan swap.',
      en: 'Net percentage growth after deducting all broker commissions, spreads, and overnight swaps.',
    },
    whyItMatters: {
      id: 'Mencegah klaim profit kotor yang mengabaikan biaya transaksi dan deposit tambahan.',
      en: 'Prevents inflated gross return claims that ignore transaction costs or mid-period deposits.',
    },
  },
  {
    number: '04',
    key: 'max-equity-drawdown',
    name: {
      id: 'Maximum Equity Drawdown (Penurunan Ekuitas Maksimum)',
      en: 'Maximum Equity Drawdown (Peak-to-Trough)',
    },
    preLaunchState: {
      id: 'Menunggu Audit Telemetri Live',
      en: 'Awaiting Live Telemetry Audit',
    },
    formulaOrFormat: 'Max((Peak_Equity - Trough_Equity) / Peak_Equity) × 100%',
    definition: {
      id: 'Persentase penurunan terbesar dari puncak ekuitas tertinggi ke titik terendah sebelum mencetak puncak baru.',
      en: 'Largest percentage drop from an equity peak to a subsequent trough before a new peak is achieved.',
    },
    whyItMatters: {
      id: 'Ukuran risiko historis paling penting untuk menilai seberapa besar tekanan modal yang pernah dialami strategi.',
      en: 'The single most important risk metric for evaluating the deepest historical capital stress experienced.',
    },
  },
  {
    number: '05',
    key: 'trading-history',
    name: {
      id: 'Trading History (Riwayat Transaksi Lengkap)',
      en: 'Trading History (Complete Ledger)',
    },
    preLaunchState: {
      id: '0 Transaksi Publik (Pra-Peluncuran)',
      en: '0 Public Trades (Pre-Launch State)',
    },
    formulaOrFormat: 'Ticket | Symbol | Type | Volume | Open/Close Price | SL/TP | Net PnL',
    definition: {
      id: 'Catatan kronologis setiap posisi yang dieksekusi, termasuk waktu buka/tutup, ukuran lot, SL/TP, dan hasil bersih.',
      en: 'Chronological ledger of every executed position including timestamps, volume, SL/TP levels, and net outcome.',
    },
    whyItMatters: {
      id: 'Memungkinkan verifikasi bahwa setiap posisi menggunakan Stop-Loss dan tidak melakukan penggandaan lot martingale.',
      en: 'Allows independent verification that every trade carried a Stop-Loss and avoided martingale lot doubling.',
    },
  },
  {
    number: '06',
    key: 'profit-factor',
    name: { id: 'Profit Factor (Faktor Profit)', en: 'Profit Factor (Gross Win / Loss Ratio)' },
    preLaunchState: {
      id: 'Menunggu Sampel >= 100 Transaksi',
      en: 'Awaiting >= 100-Trade Live Sample',
    },
    formulaOrFormat: 'Σ(Gross_Profit_of_Winners) / |Σ(Gross_Loss_of_Losers)|',
    definition: {
      id: 'Perbandingan total uang yang dihasilkan dari transaksi menang dibagi total uang yang hilang pada transaksi kalah.',
      en: 'Ratio of gross profit generated by winning trades divided by gross loss incurred on losing trades.',
    },
    whyItMatters: {
      id: 'Nilai di atas 1,50 pada sampel besar menunjukkan efisiensi ekspektasi positif setelah biaya.',
      en: 'A value above 1.50 over a large sample indicates healthy positive expectancy after costs.',
    },
  },
  {
    number: '07',
    key: 'trading-frequency',
    name: {
      id: 'Trading Frequency (Frekuensi & Durasi Transaksi)',
      en: 'Trading Frequency & Holding Duration',
    },
    preLaunchState: {
      id: 'Menunggu Data Operasional Live',
      en: 'Awaiting Live Operational Data',
    },
    formulaOrFormat: 'Avg_Trades_Per_Week | Avg_Holding_Time_Minutes',
    definition: {
      id: 'Rata-rata jumlah transaksi per minggu serta rata-rata durasi penahanan posisi (intraday vs swing).',
      en: 'Average number of executed trades per week and average position holding duration.',
    },
    whyItMatters: {
      id: 'Membantu calon pengikut memahami apakah strategi bersifat scalping cepat (sensitif slippage) atau intraday terstruktur.',
      en: 'Helps prospective followers understand whether the strategy is latency-sensitive scalping or structured intraday.',
    },
  },
  {
    number: '08',
    key: 'exposure',
    name: {
      id: 'Exposure (Eksposur Margin & Konsentrasi Simbol)',
      en: 'Exposure (Margin Usage & Symbol Concentration)',
    },
    preLaunchState: {
      id: '0,0% Eksposur Aktif (Pra-Peluncuran)',
      en: '0.0% Active Exposure (Pre-Launch)',
    },
    formulaOrFormat: '(Used_Margin / Equity) × 100% | Allocation_By_Symbol',
    definition: {
      id: 'Persentase ekuitas yang sedang digunakan sebagai margin aktif serta distribusi eksposur per instrumen.',
      en: 'Percentage of equity currently committed as active margin and breakdown by traded symbol.',
    },
    whyItMatters: {
      id: 'Menunjukkan apakah strategi menggunakan leverage secara konservatif atau membebani margin secara berlebihan.',
      en: 'Reveals whether the strategy uses leverage conservatively or over-encumbers free margin.',
    },
  },
  {
    number: '09',
    key: 'trading-costs',
    name: {
      id: 'Trading Costs (Biaya Spread, Komisi & Swap)',
      en: 'Trading Costs (Spread, Commission & Swap)',
    },
    preLaunchState: {
      id: 'Menunggu Pelaporan Broker Live',
      en: 'Awaiting Live Broker Cost Audit',
    },
    formulaOrFormat: 'Σ(Commission + Swap + Estimated_Spread_Cost)',
    definition: {
      id: 'Rincian transparan seluruh biaya friksi broker yang memotong hasil kotor.',
      en: 'Transparent breakdown of all broker friction costs deducted from gross trading performance.',
    },
    whyItMatters: {
      id: 'Menunjukkan dampak biaya eksekusi nyata dan mengapa pemilihan spesifikasi akun broker sangat krusial.',
      en: 'Demonstrates the real impact of execution friction and why broker account specification selection matters.',
    },
  },
  {
    number: '10',
    key: 'verification-source',
    name: {
      id: 'Verification Source (Sumber Verifikasi Independen)',
      en: 'Verification Source (Independent Audit Feed)',
    },
    preLaunchState: {
      id: 'Belum Terhubung (Status Pra-Peluncuran)',
      en: 'Not Connected (Pre-Launch State)',
    },
    formulaOrFormat: 'Read-Only MT5 Investor Feed / Third-Party Verification Link',
    definition: {
      id: 'Identitas server broker dan tautan verifikasi pihak ketiga (read-only) yang mengonfirmasi keaslian data.',
      en: 'Broker server identity and independent third-party read-only verification link confirming data authenticity.',
    },
    whyItMatters: {
      id: 'Menjamin bahwa angka performa berasal langsung dari server eksekusi, bukan input manual atau tangkapan layar.',
      en: 'Guarantees performance figures originate directly from the execution server rather than manual entry or screenshots.',
    },
  },
  {
    number: '11',
    key: 'reporting-period',
    name: {
      id: 'Reporting Period (Periode Pelaporan & Durasi)',
      en: 'Reporting Period (Start Date, End Date & Duration)',
    },
    preLaunchState: {
      id: 'Pra-Peluncuran, Belum Dimulai',
      en: 'Pre-Launch, Not Yet Commenced',
    },
    formulaOrFormat: 'YYYY-MM-DD (Inception) -> YYYY-MM-DD (Latest Sync)',
    definition: {
      id: 'Rentang tanggal kalender lengkap sejak akun audit dimulai hingga sinkronisasi terakhir.',
      en: 'Complete calendar date range from account audit inception through the most recent telemetry sync.',
    },
    whyItMatters: {
      id: 'Mencegah pemilihan periode pendek yang menguntungkan saja (cherry-picking) dan memperlihatkan ketahanan lintas bulan.',
      en: 'Prevents cherry-picking short winning windows and demonstrates multi-month durability.',
    },
  },
];

export function PerformanceDashboard() {
  const { isId, l } = useLocale();
  const telemetry = getDefaultTelemetrySystemState();
  const [inspectSandbox, setInspectSandbox] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* NON-NEGOTIABLE PRE-LAUNCH / DISCONNECTED STATUS BANNER */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#1D160B] via-[#150E23] to-[#110B1C] border-2 border-[#F59E0B]/60 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B] text-xs font-bold text-[#F59E0B]">
            <Unplug className="w-4 h-4" />
            <span>
              {isId
                ? 'STATUS SISTEM: PRA-PELUNCURAN • BELUM ADA FEED LIVE YANG DIHUBUNGKAN'
                : `SYSTEM STATUS: ${telemetry.statusHeadline}`}
            </span>
          </div>
          <span className="text-xs font-mono text-[#B8B0C8]">
            Protocol: {telemetry.adapterProtocol}
          </span>
        </div>

        <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#F7F4EE]">
          {isId
            ? 'Pusat Transparansi Performa JGS, Skema Audit 11 Metrik'
            : 'JGS Performance Transparency Center, 11-Metric Audit Schema'}
        </h1>

        <p className="text-sm sm:text-base text-[#F7F4EE]/90 leading-relaxed max-w-4xl">
          {isId
            ? 'JGS berkomitmen untuk tidak pernah menampilkan statistik palsu, klaim backtest yang disamarkan sebagai hasil live, atau tangkapan layar yang dipotong. Halaman ini menyiapkan arsitektur 11 metrik transparansi wajib yang akan diisi secara otomatis ketika akun master live telah diverifikasi secara independen.'
            : telemetry.statusDescription}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setInspectSandbox(!inspectSandbox)}
            className="jgs-btn-gold text-xs"
          >
            <Eye className="w-4 h-4" />
            <span>
              {inspectSandbox
                ? isId
                  ? 'Sembunyikan Diagram Edukasi'
                  : 'Hide Educational Telemetry Inspector'
                : isId
                ? 'Buka Simulasi Edukasi Cara Membaca Balance vs Equity'
                : 'Open Educational Metric Sandbox (Learn How to Audit Statements)'}
            </span>
          </button>
          <Link href={l('/copy-trading')} className="jgs-btn-outline text-xs">
            <span>
              {isId
                ? 'Baca Ketentuan Copy Trading & High-Water Mark'
                : 'Read Copy Trading & High-Water Mark Disclosures'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* =====================================================================
          THE 11 REQUIRED PERFORMANCE TRANSPARENCY METRICS (PRE-LAUNCH SCHEMA)
         ===================================================================== */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
              <Database className="w-4 h-4" />
              {isId
                ? 'SKEMA 11 METRIK TRANSPARANSI WAJIB'
                : '11 REQUIRED PERFORMANCE TRANSPARENCY METRICS'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F7F4EE] mt-1">
              {isId
                ? 'Standar Pelaporan Lengkap Tanpa Rekayasa Data'
                : 'Complete Institutional Reporting Schema (Zero Fabricated Data)'}
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F1B1D] border border-[#10B981]/40 text-xs font-semibold text-[#10B981]">
            <CheckCircle2 className="w-4 h-4" />
            {isId ? '11 / 11 Spesifikasi Metrik Siap' : '11 / 11 Metric Specifications Prepared'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ELEVEN_REQUIRED_METRICS.map((item) => (
            <div
              key={item.key}
              className="jgs-panel p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#D4AF37]">
                    #{item.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 text-[11px] font-semibold text-amber-300">
                    {isId ? item.preLaunchState.id : item.preLaunchState.en}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
                  {isId ? item.name.id : item.name.en}
                </h3>

                <div className="p-2.5 rounded-lg bg-[#08050E] border border-white/10 font-mono text-xs text-[#F3E5AB] break-words">
                  {item.formulaOrFormat}
                </div>

                <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
                  {isId ? item.definition.id : item.definition.en}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-[#F7F4EE]/85 leading-relaxed">
                <strong className="text-[#D4AF37] block mb-0.5">
                  {isId ? 'Mengapa Metrik Ini Wajib:' : 'Why This Metric Is Required:'}
                </strong>
                {isId ? item.whyItMatters.id : item.whyItMatters.en}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Optional Watermarked Educational Sandbox Mode */}
      {inspectSandbox && (
        <section className="jgs-panel p-6 sm:p-8 border-2 border-[#A882DD]/50 space-y-6 relative overflow-hidden">
          <div className="p-3.5 rounded-xl bg-[#A882DD]/20 border border-[#A882DD] flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#F7F4EE]">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F3E5AB]" />
              {isId
                ? 'DIAGRAM EDUKASI, CONTOH SIMULASI UNTUK BELAJAR MEMBACA KURVA BALANCE VS EQUITY (BUKAN PERFORMA LIVE JGS)'
                : 'EDUCATIONAL DIAGRAM, SIMULATED FOR LEARNING METRIC LITERACY ONLY (NOT LIVE JGS PERFORMANCE)'}
            </span>
            <span>{isId ? 'Contoh Saldo: 5.000 USC' : 'Sample Baseline: 5,000 USC'}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 bg-[#09060F] border border-white/10 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[#F3E5AB]">
                  {isId
                    ? 'CARA MEMBANDINGKAN BALANCE (EMAS) VS FLOATING EQUITY (HIJAU)'
                    : 'HOW TO READ BALANCE (GOLD) VS. FLOATING EQUITY (GREEN)'}
                </span>
                <span className="text-[#7E7494]">
                  {isId ? 'Ilustrasi Edukasi' : 'Educational Diagram'}
                </span>
              </div>

              <div className="grid grid-cols-8 gap-2 pt-4 items-end h-44 font-mono text-[10px]">
                {telemetry.sandboxEquityPoints.map((pt) => {
                  const balHeight = Math.round(((pt.balanceUsc - 4500) / 1800) * 120);
                  const eqHeight = Math.round(((pt.equityUsc - 4500) / 1800) * 120);
                  return (
                    <div key={pt.sessionLabel} className="flex flex-col items-center gap-1.5">
                      <div className="flex items-end gap-1 h-32">
                        <div
                          className="w-3 bg-[#D4AF37] rounded-t"
                          style={{ height: `${balHeight}px` }}
                          title={`Balance: ${pt.balanceUsc} USC`}
                        />
                        <div
                          className="w-3 bg-[#10B981] rounded-t"
                          style={{ height: `${eqHeight}px` }}
                          title={`Equity: ${pt.equityUsc} USC`}
                        />
                      </div>
                      <span className="text-[#B8B0C8]">{pt.sessionLabel}</span>
                      <span className="text-[#7E7494]">-{pt.drawdownPct}%</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-[#B8B0C8] pt-2 border-t border-white/10">
                <strong className="text-[#F3E5AB]">
                  {isId ? 'Apa yang harus diperhatikan:' : 'What to look for:'}
                </strong>{' '}
                {isId
                  ? 'Perhatikan bagaimana batang Equity (hijau) bergerak sejajar dengan batang Balance (emas). Pada strategi martingale berbahaya, batang Balance tampak naik sementara batang Equity jatuh dalam.'
                  : 'Notice how the green Equity bars stay closely aligned with the gold Balance bars. When an uncapped Martingale strategy trades, the gold Balance bars rise while the green Equity bars plunge.'}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
                {isId
                  ? '3 Prinsip Audit Rekam Jejak Trading'
                  : '3 Principles for Auditing Any Track Record'}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#B8B0C8]">
                <li className="p-3 rounded-lg bg-[#09060F] border border-white/10">
                  <strong className="text-[#D4AF37]">
                    {isId ? '1. Wajib Verifikasi Read-Only:' : '1. Require Read-Only Verification:'}
                  </strong>{' '}
                  {isId
                    ? 'Jangan pernah mempercayai file PDF statis atau tangkapan layar ponsel yang dapat diedit.'
                    : 'Never rely on static PDF exports or cropped mobile screenshots.'}
                </li>
                <li className="p-3 rounded-lg bg-[#09060F] border border-white/10">
                  <strong className="text-[#D4AF37]">
                    {isId ? '2. Bandingkan Equity vs Balance:' : '2. Compare Equity vs. Balance:'}
                  </strong>{' '}
                  {isId
                    ? 'Pastikan floating drawdown selalu terkendali dan tidak menyembunyikan posisi mengambang.'
                    : 'Ensure floating drawdown remains bounded and never hides underwater positions.'}
                </li>
                <li className="p-3 rounded-lg bg-[#09060F] border border-white/10">
                  <strong className="text-[#D4AF37]">
                    {isId ? '3. Periksa Periode & Biaya:' : '3. Inspect Period & Costs:'}
                  </strong>{' '}
                  {isId
                    ? 'Periksa apakah Net Return sudah memperhitungkan komisi, swap, dan spread selama beberapa bulan.'
                    : 'Verify that Net Return accounts for commissions, swaps, and spreads across multiple months.'}
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Verification Pipeline Architecture */}
      <section className="space-y-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4" />
            {isId ? 'INFRASTRUKTUR ANTI-REKAYASA DATA' : 'ANTI-FABRICATION INFRASTRUCTURE'}
          </span>
          <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-0.5">
            {isId
              ? 'Bagaimana JGS Memverifikasi Telemetri Broker Sebelum Menampilkan Angka'
              : 'How JGS Verifies Broker Telemetry Before Any Number Is Displayed'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {telemetry.verificationSteps.map((step) => (
            <div key={step.stepNumber} className="jgs-panel p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#D4AF37] font-bold">STAGE 0{step.stepNumber}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] ${
                    step.status === 'READY_IN_ARCHITECTURE'
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                  }`}
                >
                  {step.status.replace(/_/g, ' ')}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#F7F4EE]">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#B8B0C8] leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <JeyStrategistCallout
        ruleText={
          isId
            ? 'Jika sebuah platform menjanjikan grafik keuntungan fantastis pada hari pertama tanpa sumber verifikasi read-only dari server broker, mereka sedang menjual ilusi. Di JGS, kami menampilkan status PRA-PELUNCURAN secara jujur sampai data audit live terverifikasi sepenuhnya.'
            : 'If a platform shows you a glowing chart on Day 1 without a verified read-only broker feed, they are selling an illusion. At JGS, we display our PRE-LAUNCH status honestly until live audit telemetry is independently verified.'
        }
        contextTag={isId ? 'MANDAT KEJUJURAN DATA' : 'HONESTY MANDATE'}
      />
    </div>
  );
}
