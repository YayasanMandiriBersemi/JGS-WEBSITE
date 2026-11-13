'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { JeyStrategistCallout } from '@/components/brand/JeyStrategistCallout';
import { simulateHighWaterMarkFeeSchedule } from '@/lib/math/cent-calculator';
import { useLocale } from '@/i18n/LocaleContext';
import {
  Users,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Lock,
  Landmark,
  FileWarning,
  Sliders,
} from 'lucide-react';

export function CopyTradingGuide() {
  const { isId, l } = useLocale();

  // 1. Proportional Equity Lot Scaling Simulator State
  const [followerUsd, setFollowerUsd] = useState<number>(50);
  const [masterUsc, setMasterUsc] = useState<number>(10000);
  const [masterLot, setMasterLot] = useState<number>(0.4);

  // 2. Interactive High-Water Mark (HWM) 30% Fee Simulator State
  const [initialEquityUsd, setInitialEquityUsd] = useState<number>(100);
  const [p1ReturnUsd, setP1ReturnUsd] = useState<number>(20); // Period 1: +$20 profit (New High -> Fee applies)
  const [p2ReturnUsd, setP2ReturnUsd] = useState<number>(-15); // Period 2: -$15 drawdown (Below HWM -> $0 Fee)
  const [p3ReturnUsd, setP3ReturnUsd] = useState<number>(10); // Period 3: +$10 partial recovery (Still below HWM -> $0 Fee)
  const [p4ReturnUsd, setP4ReturnUsd] = useState<number>(18); // Period 4: +$18 surpasses HWM -> Fee only on net new high!

  // 3. Readiness Checklist State
  const [checkedQuestions, setCheckedQuestions] = useState<number[]>([]);

  const followerUsc = followerUsd * 100;
  const equityRatio = followerUsc / Math.max(100, masterUsc);
  const rawFollowerCentLot = masterLot * equityRatio;
  const isBelowMinLot = rawFollowerCentLot < 0.01;
  const executableFollowerCentLot = isBelowMinLot
    ? null
    : Number((Math.floor((rawFollowerCentLot + 1e-9) * 100) / 100).toFixed(2));

  const hwmSimulation = useMemo(
    () =>
      simulateHighWaterMarkFeeSchedule({
        initialEquity: initialEquityUsd,
        feeRatePercent: 30,
        periodNetReturnsBeforeFee: [
          {
            periodLabel: isId ? 'Periode 1 (Profit Awal)' : 'Period 1 (Initial Gain)',
            netProfitOrLoss: p1ReturnUsd,
          },
          {
            periodLabel: isId ? 'Periode 2 (Drawdown)' : 'Period 2 (Drawdown)',
            netProfitOrLoss: p2ReturnUsd,
          },
          {
            periodLabel: isId
              ? 'Periode 3 (Pemulihan Sebagian)'
              : 'Period 3 (Partial Recovery)',
            netProfitOrLoss: p3ReturnUsd,
          },
          {
            periodLabel: isId ? 'Periode 4 (Rekor Profit Baru)' : 'Period 4 (New Equity Peak)',
            netProfitOrLoss: p4ReturnUsd,
          },
        ],
      }),
    [initialEquityUsd, p1ReturnUsd, p2ReturnUsd, p3ReturnUsd, p4ReturnUsd, isId]
  );

  const readinessQuestions = useMemo(
    () =>
      isId
        ? [
            'Saya memahami bahwa performa masa lalu tidak menjamin hasil di masa depan dan setiap strategi pasti mengalami fase kerugian (drawdown).',
            'Saya memahami bahwa kompatibilitas spesifikasi broker (denominasi USC vs USD, ukuran kontrak simbol, nilai tick, dan lot minimum) wajib sesuai agar skala lot proporsional akurat.',
            'Saya memahami bahwa perbedaan spread, latensi jaringan, dan slippage dapat membuat harga eksekusi akun Follower sedikit berbeda dari akun Master.',
            'Saya memahami mekanisme High-Water Mark (HWM) di mana usulan biaya kinerja 30% hanya berlaku pada rekor keuntungan bersih tertinggi baru yang memenuhi syarat.',
            'Saya memahami bahwa layanan Copy Trading JGS saat ini BELUM dibuka untuk publik dan masih dalam tahap persiapan teknis serta tinjauan hukum.',
          ]
        : [
            'I understand that past trading performance never guarantees future results and that every strategy experiences drawdown periods.',
            'I understand that broker specification compatibility (USC vs. USD denomination, symbol contract size, tick value, and minimum lot) must align for accurate proportional scaling.',
            'I understand that spread differences, network latency, and slippage can cause Follower execution prices to differ from the Master account.',
            'I understand the High-Water Mark (HWM) mechanism where the proposed 30% performance fee applies strictly to eligible net new profit highs.',
            'I understand that JGS Copy Trading is NOT yet open for public launch and remains subject to technical verification and legal review.',
          ],
    [isId]
  );

  function toggleQuestion(idx: number) {
    setCheckedQuestions((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  }

  const allReady = checkedQuestions.length === readinessQuestions.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* =====================================================================
          PRE-LAUNCH & LEGAL REVIEW NOTICE BANNER
         ===================================================================== */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#1D160B] via-[#150E23] to-[#110B1C] border-2 border-[#F59E0B]/60 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B] text-xs font-bold text-[#F59E0B]">
            <Lock className="w-4 h-4" />
            <span>
              {isId
                ? 'STATUS: DOKUMENTASI PRA-PELUNCURAN • BELUM DIBUKA UNTUK PUBLIK'
                : 'STATUS: PRE-LAUNCH DOCUMENTATION • NOT OPEN FOR PUBLIC LAUNCH'}
            </span>
          </div>
          <span className="text-xs font-semibold text-[#F3E5AB]">
            {isId
              ? 'Deposit, Pembayaran & Eksekusi Copy Dinonaktifkan'
              : 'Deposits, Payments & Copy Execution Disabled'}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE]">
          {isId
            ? 'Informasi Copy Trading, Risiko Eksekusi & Mekanisme High-Water Mark'
            : 'Copy Trading Information, Execution Risks & High-Water Mark Mechanics'}
        </h1>

        <p className="text-sm sm:text-base text-[#F7F4EE]/90 max-w-4xl leading-relaxed">
          {isId
            ? 'Seluruh edukasi, kamus, riset, dan kalkulator di JGS gratis tanpa syarat. Monetisasi utama yang direncanakan di masa mendatang adalah layanan copy trading opsional berbasis bagi hasil (usulan biaya kinerja 30% dari profit bersih baru yang memenuhi syarat, tunduk pada tinjauan hukum, aturan biaya platform/broker, dan mekanisme High-Water Mark yang jelas). Saat ini layanan copy trading BELUM tersedia untuk publik.'
            : 'All education, dictionary terms, market research, and calculators on JGS are unconditionally free. Our planned primary monetization is an optional performance-based copy trading service (proposed 30% performance fee on eligible net new profits, subject to legal review, broker/platform fee rules, and a clearly defined High-Water Mark mechanism). Copy trading is currently NOT ready for public launch.'}
        </p>
      </div>

      {/* =====================================================================
          8 REQUIRED COPY TRADING DISCLOSURE PILLARS
         ===================================================================== */}
      <section className="space-y-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Landmark className="w-4 h-4" />
            {isId
              ? '8 PILAR TRANSPARANSI & KETENTUAN COPY TRADING'
              : '8 PILLARS OF COPY TRADING TRANSPARENCY & DISCLOSURE'}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F7F4EE] mt-1">
            {isId
              ? 'Penjelasan Lengkap Cara Kerja, Risiko, Kompatibilitas Broker & Biaya'
              : 'Complete Breakdown of Mechanics, Risks, Broker Compatibility & Fees'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. How Copying Works */}
          <div className="jgs-panel p-6 space-y-2.5">
            <div className="text-xs font-bold text-[#D4AF37]">
              {isId ? '01. Cara Kerja Penyalinan Posisi' : '01. How Copying Works'}
            </div>
            <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId
                ? 'Replikasi Proporsional Berdasarkan Rasio Ekuitas'
                : 'Proportional Replication by Equity Ratio'}
            </h3>
            <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
              {isId
                ? 'Saat akun Master membuka atau menutup posisi, sistem platform copy trading milik broker menyalin instruksi tersebut ke akun Follower secara proporsional terhadap rasio ekuitas (Follower_Equity / Master_Equity), sehingga persentase risiko relatif tetap selaras.'
                : 'When the Master account opens or closes a position, the broker platform’s copy engine replicates the order onto the Follower account proportionally to the equity ratio (Follower_Equity / Master_Equity), aligning relative risk exposure.'}
            </p>
          </div>

          {/* 2. Strategy Characteristics */}
          <div className="jgs-panel p-6 space-y-2.5">
            <div className="text-xs font-bold text-[#D4AF37]">
              {isId ? '02. Karakteristik Strategi' : '02. Strategy Characteristics'}
            </div>
            <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId
                ? 'Berbasis Aturan, Stop-Loss Server & Circuit Breaker Harian'
                : 'Rule-Based Execution, Server-Side Stops & Daily Circuit Breakers'}
            </h3>
            <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
              {isId
                ? 'Strategi JGS dirancang menggunakan struktur sesi likuiditas pada XAUUSD dan pasangan mata uang utama. Setiap posisi wajib memiliki Stop-Loss di sisi server, dilarang menggunakan penggandaan lot martingale tanpa batas, dan dibatasi oleh penghentian kerugian harian.'
                : 'JGS strategies are engineered around session liquidity structure on XAUUSD and major FX pairs. Every position carries a hard server-side Stop-Loss, avoids uncapped martingale lot multiplication, and enforces a daily drawdown circuit breaker.'}
            </p>
          </div>

          {/* 3. Potential Risks */}
          <div className="jgs-panel p-6 space-y-2.5">
            <div className="text-xs font-bold text-[#EF4444]">
              {isId ? '03. Potensi Risiko Trading & Eksekusi' : '03. Potential Trading & Execution Risks'}
            </div>
            <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId
                ? 'Risiko Kerugian Pasar, Slippage, Latensi & Pelebaran Spread'
                : 'Market Loss Risk, Slippage, Latency & Spread Divergence'}
            </h3>
            <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
              {isId
                ? 'Copy trading memiliki risiko kehilangan sebagian atau seluruh modal. Selain risiko arah pasar, akun Follower dapat mengalami harga eksekusi (fill price) yang sedikit berbeda dari akun Master akibat latensi antrian order, pelebaran spread saat berita, atau keterbatasan likuiditas.'
                : 'Copy trading involves the risk of partial or total capital loss. Beyond directional market risk, Follower accounts can experience different fill prices than the Master account due to order-queue latency, news spread widening, or liquidity depth.'}
            </p>
          </div>

          {/* 4. Broker Compatibility */}
          <div className="jgs-panel p-6 space-y-2.5">
            <div className="text-xs font-bold text-[#D4AF37]">
              {isId ? '04. Kompatibilitas Spesifikasi Broker' : '04. Broker Specification Compatibility'}
            </div>
            <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId
                ? 'Kesesuaian Denominasi (USC/USD), Ukuran Kontrak & Lot Minimum'
                : 'Matching Denomination (USC/USD), Contract Size & Minimum Lot'}
            </h3>
            <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
              {isId
                ? 'Denominasi Cent (1 USD = 100 USC) tidak otomatis berarti ukuran kontrak 100x lebih kecil di semua broker. Agar penyalinan proporsional tidak meleset atau terblokir oleh batas lot minimum 0,01, akun Follower wajib menggunakan jenis akun dan spesifikasi kontrak simbol yang kompatibel dengan akun Master.'
                : 'Cent denomination (1 USD = 100 USC) does not automatically mean contract size is 100x smaller across all brokers. To prevent proportional scaling distortion or 0.01 minimum-lot rejection, Follower accounts must match the Master account’s symbol contract specification.'}
            </p>
          </div>

          {/* 5. Proposed 30% Performance Fee Methodology */}
          <div className="jgs-panel p-6 space-y-2.5">
            <div className="text-xs font-bold text-[#10B981]">
              {isId
                ? '05. Metodologi Biaya Kinerja (Usulan 30%)'
                : '05. Proposed 30% Performance Fee Methodology'}
            </div>
            <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId
                ? 'Hanya dari Keuntungan Bersih Baru (Tanpa Biaya Langganan)'
                : 'Charged Only on Eligible Net New Profits (Zero Subscriptions)'}
            </h3>
            <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
              {isId
                ? 'Tidak ada biaya pendaftaran, biaya bulanan, atau biaya manajemen tetap. Usulan biaya kinerja sebesar 30% hanya dikenakan apabila akun Follower mencetak keuntungan bersih baru di atas puncak High-Water Mark sebelumnya, sesuai aturan platform broker dan tinjauan hukum.'
                : 'There are no sign-up fees, monthly subscriptions, or fixed management fees. The proposed 30% performance fee applies only when the Follower account generates net new profits above its prior High-Water Mark peak, subject to broker platform rules and legal review.'}
            </p>
          </div>

          {/* 6. High-Water Mark (HWM) Protection */}
          <div className="jgs-panel p-6 space-y-2.5">
            <div className="text-xs font-bold text-[#10B981]">
              {isId ? '06. Mekanisme High-Water Mark (HWM)' : '06. High-Water Mark (HWM) Mechanism'}
            </div>
            <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId
                ? 'Perlindungan agar Pemulihan Drawdown Tidak Dikenakan Biaya Ganda'
                : 'Ensuring Drawdown Recovery Is Never Double-Charged'}
            </h3>
            <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
              {isId
                ? 'Jika akun Anda mengalami penurunan (drawdown) setelah mencetak puncak ekuitas, Anda TIDAK dikenakan biaya kinerja sebesar apa pun saat akun sedang pulih kembali menuju puncak lama tersebut. Biaya 30% hanya dihitung atas selisih profit yang melampaui puncak HWM terakhir.'
                : 'If your account experiences a drawdown after reaching an equity peak, you pay ZERO performance fees while recovering back to that previous peak. The 30% fee is calculated strictly on the incremental profit above the prior HWM.'}
            </p>
          </div>

          {/* 7. Realized vs Unrealized Profit */}
          <div className="jgs-panel p-6 space-y-2.5">
            <div className="text-xs font-bold text-[#A882DD]">
              {isId
                ? '07. Perlakuan Profit Terealisasi vs Mengambang (Unrealized)'
                : '07. Realized vs. Unrealized Profit Accounting'}
            </div>
            <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId
                ? 'Perhitungan Berbasis Ekuitas Bersih pada Akhir Periode / Penutupan'
                : 'Net Equity Valuation Accounting for Open Floating Positions'}
            </h3>
            <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
              {isId
                ? 'Evaluasi kinerja tidak boleh hanya melihat Balance tertutup sambil mengabaikan kerugian mengambang (unrealized loss). Perhitungan biaya kinerja pada platform broker mengacu pada Net Equity (atau posisi yang telah terealisasi penuh pada saat kristalisasi biaya) sesuai ketentuan teknis platform.'
                : 'Performance evaluation must never count closed Balance gains while ignoring open unrealized losses. Fee crystallization on supported broker platforms is governed by Net Equity (or fully closed realized positions at settlement) per platform rules.'}
            </p>
          </div>

          {/* 8. Withdrawal & Termination Mechanisms */}
          <div className="jgs-panel p-6 space-y-2.5">
            <div className="text-xs font-bold text-[#A882DD]">
              {isId
                ? '08. Mekanisme Penarikan Dana & Penghentian (Termination)'
                : '08. Withdrawal & Termination Mechanisms'}
            </div>
            <h3 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId
                ? 'Kendali Penuh di Akun Broker Pribadi Anda Setiap Saat'
                : 'Full Custody & Instant Disconnection Control'}
            </h3>
            <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
              {isId
                ? 'JGS tidak pernah menerima atau memegang dana deposit Anda. Dana tetap berada di akun broker atas nama Anda sendiri. Ketika layanan diluncurkan nanti, Follower dapat menghentikan penyalinan (unsubscribe), memasang batas ekuitas maksimum, atau menarik dana kapan saja melalui dashboard broker.'
                : 'JGS never holds or takes custody of client funds. Capital remains in your own personal broker account. Once launched, Followers can disconnect copying, enforce a hard equity stop, or withdraw funds at any time directly through their broker.'}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE HIGH-WATER MARK (HWM) 30% PERFORMANCE FEE SIMULATOR
         ===================================================================== */}
      <section className="jgs-panel p-6 sm:p-8 border-[#D4AF37]/40 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
              <Sliders className="w-4 h-4" />
              {isId
                ? 'SIMULATOR INTERAKTIF HIGH-WATER MARK (USULAN BIAYA 30%)'
                : 'INTERACTIVE HIGH-WATER MARK (30% PROPOSED FEE) SIMULATOR'}
            </span>
            <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-1">
              {isId
                ? 'Uji Bagaimana High-Water Mark Melindungi Anda Saat Drawdown & Pemulihan'
                : 'Simulate How High-Water Mark Protects Followers Across Drawdowns'}
            </h2>
            <p className="text-xs sm:text-sm text-[#BEB6CE] mt-1 max-w-3xl">
              {isId
                ? 'Ubah angka hasil bersih di setiap periode untuk melihat bagaimana biaya 30% HANYA dikenakan ketika ekuitas melampaui rekor tertinggi bersih sebelumnya (High-Water Mark).'
                : 'Adjust the net return in each period below to see how the 30% fee is charged ONLY when equity surpasses the previous highest net peak (High-Water Mark).'}
            </p>
          </div>
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#08050E] border border-white/10 text-[#F3E5AB]">
            Fee = max(0, Ending_Equity - Prior_HWM) × 30%
          </div>
        </div>

        {/* Inputs for Initial Equity + 4 Periods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="p-3.5 rounded-xl bg-[#08050E] border border-white/10">
            <label className="jgs-label">
              {isId ? 'Modal Awal ($)' : 'Initial Equity ($)'}
            </label>
            <input
              type="number"
              min={10}
              step={10}
              value={initialEquityUsd}
              onChange={(e) => setInitialEquityUsd(Number(e.target.value))}
              className="jgs-input"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-[#08050E] border border-white/10">
            <label className="jgs-label">
              {isId ? 'Periode 1 Profit/Rugi ($)' : 'Period 1 PnL ($)'}
            </label>
            <input
              type="number"
              step={5}
              value={p1ReturnUsd}
              onChange={(e) => setP1ReturnUsd(Number(e.target.value))}
              className="jgs-input"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-[#08050E] border border-white/10">
            <label className="jgs-label">
              {isId ? 'Periode 2 Profit/Rugi ($)' : 'Period 2 PnL ($)'}
            </label>
            <input
              type="number"
              step={5}
              value={p2ReturnUsd}
              onChange={(e) => setP2ReturnUsd(Number(e.target.value))}
              className="jgs-input"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-[#08050E] border border-white/10">
            <label className="jgs-label">
              {isId ? 'Periode 3 Profit/Rugi ($)' : 'Period 3 PnL ($)'}
            </label>
            <input
              type="number"
              step={5}
              value={p3ReturnUsd}
              onChange={(e) => setP3ReturnUsd(Number(e.target.value))}
              className="jgs-input"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-[#08050E] border border-white/10">
            <label className="jgs-label">
              {isId ? 'Periode 4 Profit/Rugi ($)' : 'Period 4 PnL ($)'}
            </label>
            <input
              type="number"
              step={5}
              value={p4ReturnUsd}
              onChange={(e) => setP4ReturnUsd(Number(e.target.value))}
              className="jgs-input"
            />
          </div>
        </div>

        {/* HWM Schedule Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono tabular-nums">
            <thead>
              <tr className="border-b border-white/15 text-[#D4AF37]">
                <th className="py-3 pr-3 font-sans">
                  {isId ? 'Periode Evaluasi' : 'Evaluation Period'}
                </th>
                <th className="py-3 px-3">
                  {isId ? 'Ekuitas Awal' : 'Starting Equity'}
                </th>
                <th className="py-3 px-3">
                  {isId ? 'Hasil Trading' : 'Trading PnL'}
                </th>
                <th className="py-3 px-3">
                  {isId ? 'HWM Sebelumnya' : 'Prior HWM'}
                </th>
                <th className="py-3 px-3">
                  {isId ? 'Profit Baru > HWM' : 'Eligible Profit > HWM'}
                </th>
                <th className="py-3 px-3">
                  {isId ? 'Biaya 30%' : '30% Performance Fee'}
                </th>
                <th className="py-3 pl-3">
                  {isId ? 'Ekuitas Akhir & HWM Baru' : 'Ending Equity & New HWM'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {hwmSimulation.periods.map((row) => (
                <tr key={row.periodIndex} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 pr-3 font-sans font-semibold text-[#F7F4EE]">
                    {row.periodLabel}
                  </td>
                  <td className="py-3.5 px-3 text-[#BEB6CE]">
                    ${row.startingEquity.toFixed(2)}
                  </td>
                  <td
                    className={`py-3.5 px-3 font-bold ${
                      row.netProfitOrLoss >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                    }`}
                  >
                    {row.netProfitOrLoss >= 0 ? '+' : ''}${row.netProfitOrLoss.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 text-[#F3E5AB]">
                    ${row.highWaterMarkBefore.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 text-[#F7F4EE]">
                    ${row.eligibleNewProfitAboveHwm.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-[#D4AF37]">
                    ${row.performanceFeeCharged.toFixed(2)}
                  </td>
                  <td className="py-3.5 pl-3 text-[#10B981] font-bold">
                    ${row.endingEquityAfterFee.toFixed(2)}{' '}
                    <span className="text-[11px] font-normal text-[#BEB6CE]">
                      (HWM: ${row.highWaterMarkAfter.toFixed(2)})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#08050E] border border-white/10">
            <div className="text-xs text-[#BEB6CE]">
              {isId ? 'Ekuitas Bersih Akhir Follower' : 'Follower Final Net Equity'}
            </div>
            <div className="font-mono text-2xl font-bold text-[#10B981] mt-1">
              ${hwmSimulation.finalNetEquity.toFixed(2)}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#08050E] border border-white/10">
            <div className="text-xs text-[#BEB6CE]">
              {isId ? 'Total Biaya Kinerja (30% di atas HWM)' : 'Total Performance Fees (30% > HWM)'}
            </div>
            <div className="font-mono text-2xl font-bold text-[#D4AF37] mt-1">
              ${hwmSimulation.totalFeesCharged.toFixed(2)}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#08050E] border border-white/10">
            <div className="text-xs text-[#BEB6CE]">
              {isId ? 'Rekor High-Water Mark Saat Ini' : 'Current High-Water Mark Peak'}
            </div>
            <div className="font-mono text-2xl font-bold text-[#F3E5AB] mt-1">
              ${hwmSimulation.finalHighWaterMark.toFixed(2)}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE PROPORTIONAL EQUITY LOT SCALING SIMULATOR
         ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 jgs-panel p-6 space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
            <Scale className="w-4 h-4" />
            <span>
              {isId
                ? 'KALKULATOR SKALA LOT PROPORSIONAL'
                : 'PROPORTIONAL EQUITY LOT SCALING CALCULATOR'}
            </span>
          </div>
          <h2 className="font-display text-xl font-bold text-[#F7F4EE]">
            {isId
              ? 'Simulasi Sinkronisasi Lot Master ke Follower'
              : 'Simulate Master-to-Follower Lot Synchronization'}
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="copy-follower-usd" className="jgs-label">
                {isId
                  ? 'Modal Akun Follower Anda (USD → Dikonversi ke USC)'
                  : 'Your Follower Balance (USD → Converted to USC)'}
              </label>
              <input
                id="copy-follower-usd"
                type="number"
                min={10}
                step={5}
                value={followerUsd}
                onChange={(e) => setFollowerUsd(Number(e.target.value))}
                className="jgs-input"
              />
              <div className="text-xs font-mono text-[#D4AF37] mt-1">
                {isId ? 'Saldo Akun Cent Follower:' : 'Follower Cent Balance:'}{' '}
                {followerUsc.toLocaleString()} USC
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="copy-master-usc" className="jgs-label">
                  {isId ? 'Ekuitas Akun Master (USC)' : 'Master Account Equity (USC)'}
                </label>
                <input
                  id="copy-master-usc"
                  type="number"
                  min={1000}
                  step={1000}
                  value={masterUsc}
                  onChange={(e) => setMasterUsc(Number(e.target.value))}
                  className="jgs-input"
                />
              </div>
              <div>
                <label htmlFor="copy-master-lot" className="jgs-label">
                  {isId ? 'Volume Order Master (Lot)' : 'Master Trade Volume (Lots)'}
                </label>
                <input
                  id="copy-master-lot"
                  type="number"
                  min={0.05}
                  step={0.05}
                  value={masterLot}
                  onChange={(e) => setMasterLot(Number(e.target.value))}
                  className="jgs-input"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono text-xs tabular-nums pt-2">
            <div className="p-3.5 rounded-xl bg-[#09060F] border border-white/10">
              <div className="text-[#BEB6CE] text-[11px]">
                {isId ? 'Rasio Ekuitas' : 'Equity Ratio'}
              </div>
              <div className="text-base font-bold text-[#F7F4EE] mt-1">
                {(equityRatio * 100).toFixed(1)}%
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#09060F] border border-white/10">
              <div className="text-[#BEB6CE] text-[11px]">
                {isId ? 'Lot Ideal Follower' : 'Ideal Follower Lot'}
              </div>
              <div className="text-base font-bold text-[#A882DD] mt-1">
                {rawFollowerCentLot.toFixed(3)} Lot
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#09060F] border border-white/10">
              <div className="text-[#BEB6CE] text-[11px]">
                {isId ? 'Lot Dieksekusi MT5' : 'MT5 Executed Lot'}
              </div>
              <div
                className={`text-base font-bold mt-1 ${
                  executableFollowerCentLot === null ? 'text-[#EF4444]' : 'text-[#10B981]'
                }`}
              >
                {executableFollowerCentLot === null
                  ? isId
                    ? 'DITOLAK (< 0.01)'
                    : 'REJECTED (< 0.01)'
                  : `${executableFollowerCentLot.toFixed(2)} Lot`}
              </div>
            </div>
          </div>
        </div>

        {/* Right: 5-Question Copy Trading Risk Readiness Assessment */}
        <div className="lg:col-span-6 jgs-panel p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-[#D4AF37]">
                {isId
                  ? 'VERIFIKASI PEMAHAMAN RISIKO CALON FOLLOWER'
                  : 'FOLLOWER RISK LITERACY CHECKLIST'}
              </span>
              <h2 className="font-display text-xl font-bold text-[#F7F4EE] mt-0.5">
                {isId
                  ? '5 Poin Kesiapan Pemahaman Risiko Copy Trading'
                  : '5-Point Copy Trading Risk Readiness Assessment'}
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#191129] text-[#F3E5AB]">
              {checkedQuestions.length} / {readinessQuestions.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {readinessQuestions.map((q, idx) => {
              const isChecked = checkedQuestions.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleQuestion(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-[#0F1B1D] border-[#10B981] text-[#F7F4EE]'
                      : 'bg-[#09060F] border-white/10 text-[#B8B0C8] hover:border-white/30'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isChecked ? 'text-[#10B981]' : 'text-[#7E7494]'
                    }`}
                  />
                  <span>{q}</span>
                </button>
              );
            })}
          </div>

          {allReady ? (
            <div className="p-4 rounded-xl bg-[#0F1B1D] border border-[#10B981] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#10B981] font-medium">
                {isId
                  ? 'Pemahaman Risiko Terverifikasi. Layanan Copy Trading tetap dinonaktifkan hingga peluncuran resmi dan verifikasi telemetri selesai.'
                  : 'Risk Literacy Verified. Live copy-trading execution remains disabled until official launch and verified telemetry activation.'}
              </div>
              <Link href={l('/performance')} className="jgs-btn-gold text-xs shrink-0">
                <span>{isId ? 'Lihat Skema 11 Metrik' : 'Inspect 11-Metric Schema'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="text-xs text-[#BEB6CE] flex items-center gap-1.5">
              <FileWarning className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>
                {isId
                  ? 'Centang kelima pernyataan pemahaman risiko di atas.'
                  : 'Check all 5 risk disclosures above to complete your literacy review.'}
              </span>
            </div>
          )}
        </div>
      </div>

      <JeyStrategistCallout
        ruleText={
          isId
            ? 'Copy trading bukanlah pengganti pemahaman risiko. Bahkan ketika mengikuti strategi otomatis, Anda tetap memegang kendali penuh sebagai manajer risiko atas modal Anda sendiri.'
            : 'Copy trading is not a substitute for understanding risk. Even when following a systematic strategy, you remain the Chief Risk Officer of your own capital.'
        }
        contextTag={isId ? 'PIAGAM COPY TRADING JGS' : 'COPY TRADING CHARTER'}
      />
    </div>
  );
}
