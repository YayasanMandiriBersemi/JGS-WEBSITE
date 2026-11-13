'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/i18n/LocaleContext';
import {
  JgsPreFlightCheckWidget,
  JgsTradingConstitutionGenerator,
} from '@/components/account/JgsVaultGatekeeper';
import { JgsIctExecutionBlueprint } from '@/components/academy/JgsIctBlueprintModule';
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Calculator,
  Cpu,
  ShieldCheck,
  Users,
  Sparkles,
  Scale,
  Gamepad2,
  NotebookPen,
  FlaskConical,
  AlertTriangle,
} from 'lucide-react';

export function AboutJgsView() {
  const { isId, l } = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Hero / Mission */}
      <div className="jgs-panel p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
            <span>
              {isId
                ? 'TENTANG THE JEY GANG STRATEGIST (JGS)'
                : 'ABOUT THE JEY GANG STRATEGIST (JGS)'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#F7F4EE]">
            Small Capital. <span className="text-[#D4AF37]">Serious Strategy.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#BEB6CE] leading-relaxed">
            {isId
              ? 'THE JEY GANG STRATEGIST (JGS) adalah ekosistem edukasi trading dan teknologi finansial yang 100% gratis. Misi kami adalah membuat pengetahuan pasar yang terukur, literasi spesifikasi kontrak broker, dan alat manajemen risiko dapat diakses oleh siapa saja, tanpa biaya keanggotaan, tanpa paywall, dan tanpa paksaan deposit.'
              : 'THE JEY GANG STRATEGIST (JGS) is a 100% free trading education and financial technology ecosystem. Our mission is to make structured market literacy, broker contract-specification awareness, and quantitative risk-management tools accessible to retail traders, with zero membership fees, zero paywalls, and no forced broker deposits.'}
          </p>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <div className="relative w-56 h-56 rounded-2xl overflow-hidden border border-[#D6A937]/45 bg-[#08050E]">
            <Image
              src="/images/jey-mascot.png"
              alt="Jey, Chief Risk Strategist Mascot"
              fill
              sizes="224px"
              className="jgs-mascot-crop"
            />
          </div>
        </div>
      </div>

      {/* 100% Free Ecosystem Charter & Business Model Transparency */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 jgs-panel p-6 sm:p-8 space-y-5">
          <h2 className="font-display text-2xl font-bold text-[#F7F4EE]">
            {isId
              ? 'Piagam Ekosistem Gratis JGS (Tanpa Paywall)'
              : 'The JGS Free Ecosystem Charter (Zero Paywalls)'}
          </h2>
          <p className="text-sm sm:text-base text-[#BEB6CE] leading-relaxed">
            {isId
              ? 'Kami percaya bahwa pemula dan trader bermodal kecil tidak seharusnya menghabiskan modal mereka untuk membeli kelas mahal, grup sinyal VIP, atau indikator berbayar.'
              : 'We believe beginners and micro-capital traders should never deplete their starting capital paying for courses, VIP signal groups, or locked calculators.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {(isId
              ? [
                  'Tanpa keanggotaan berbayar (No paid memberships)',
                  'Tanpa biaya langganan edukasi (No subscription fees)',
                  'Tanpa paywall pada modul & kamus (No paywalls)',
                  'Akses gratis ke seluruh kalkulator risiko',
                  'Akses gratis ke riset market JGS Intelligence',
                  'Tanpa paksaan registrasi atau deposit broker',
                ]
              : [
                  'No paid memberships',
                  'No subscription fees for education',
                  'No paywalls on lessons or dictionary',
                  'Free access to all risk calculators',
                  'Free access to JGS Intelligence market research',
                  'No forced registration or broker deposits',
                ]
            ).map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#08050E] border border-white/10 text-xs sm:text-sm text-[#F7F4EE]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 jgs-panel p-6 sm:p-8 border-[#D4AF37]/35 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-xs font-semibold text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>
              {isId ? 'Transparansi Model Bisnis' : 'Business Model Transparency'}
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-[#F7F4EE]">
            {isId
              ? 'Bagaimana JGS Berencana Menghasilkan Pendapatan?'
              : 'How Does JGS Plan to Monetize?'}
          </h2>
          <p className="text-sm text-[#BEB6CE] leading-relaxed">
            {isId
              ? 'Monetisasi utama yang direncanakan adalah layanan copy trading opsional berbasis kinerja (performance-based copy trading). Biaya kinerja yang diusulkan adalah 30% dari keuntungan bersih baru yang memenuhi syarat (eligible net new profits), tunduk pada tinjauan hukum, aturan biaya broker/platform, dan mekanisme High-Water Mark (HWM) yang jelas.'
              : 'Our planned primary monetization is an optional performance-based copy trading service. The proposed performance fee is 30% of eligible net new profits, subject to legal review, broker/platform fee rules, and a clearly defined High-Water Mark (HWM) mechanism.'}
          </p>
          <p className="text-xs text-[#F3E5AB] bg-[#08050E] p-3.5 rounded-xl border border-white/10 leading-relaxed">
            {isId
              ? 'PENTING: Layanan copy trading saat ini BELUM siap untuk peluncuran publik. Kami tidak mengaktifkan deposit, pembayaran langganan, atau eksekusi copy trading.'
              : 'IMPORTANT: Copy trading is NOT ready for public launch. We do not activate deposits, subscription payments, or copy trading execution functionality.'}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link href={l('/copy-trading')} className="jgs-btn-gold text-xs">
              <span>
                {isId ? 'Pelajari Ketentuan Copy Trading' : 'Read Copy Trading Disclosures'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href={l('/performance')} className="jgs-btn-outline text-xs">
              <span>{isId ? 'Skema 11 Metrik Performa' : '11-Metric Performance Schema'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The 4 Personas We Serve */}
      <section className="space-y-5">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F7F4EE]">
          {isId
            ? 'Dirancang untuk Empat Profil Pengguna'
            : 'Designed for Four Distinct User Personas'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              code: 'A',
              title: isId ? 'Pemula dari Nol' : 'Curious Beginner',
              desc: isId
                ? 'Baru mengenal trading, membutuhkan penjelasan sederhana, dan ingin belajar dari nol tanpa membayar atau deposit.'
                : 'New to trading, needs simple plain-language explanations, and wants to learn without paying or depositing.',
              href: '/academy',
              cta: isId ? 'Mulai di Academy' : 'Start in Academy',
            },
            {
              code: 'B',
              title: isId ? 'Trader Modal Mikro ($10–$100)' : 'Micro-Capital Trader',
              desc: isId
                ? 'Menggunakan saldo kecil ($10–$100), tertarik pada akun Cent, dan membutuhkan kalkulator manajemen modal yang presisi.'
                : 'Uses small balances ($10–$100), interested in Cent accounts, and needs strict money-management calculators.',
              href: '/calculators/cent',
              cta: isId ? 'Buka Cent Lab' : 'Open Cent Lab',
            },
            {
              code: 'C',
              title: isId ? 'Pembangun Sistem & EA' : 'System Builder',
              desc: isId
                ? 'Tertarik pada MT5, Expert Advisor (EA), strategi algoritmik berbasis aturan, serta audit pengujian backtest.'
                : 'Interested in MT5, Expert Advisors (EA), rule-based algorithmic strategies, and quantitative backtest auditing.',
              href: '/quant-lab',
              cta: isId ? 'Jelajahi Quant Lab' : 'Explore Quant Lab',
            },
            {
              code: 'D',
              title: isId ? 'Calon Pengikut Copy Trading' : 'Potential Copy Follower',
              desc: isId
                ? 'Memahami risiko trading, menginginkan transparansi performa terverifikasi, serta rincian biaya HWM dan kompatibilitas broker.'
                : 'Understands trading risks, demands verified performance transparency, and requires clear HWM cost and broker compatibility disclosures.',
              href: '/copy-trading',
              cta: isId ? 'Baca Info Copy Trading' : 'Read Copy Disclosures',
            },
          ].map((p) => (
            <div
              key={p.code}
              className="jgs-panel p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4AF37]/20 text-xs font-bold text-[#D4AF37]">
                  {p.code}
                </span>
                <h3 className="font-display text-lg font-bold text-[#F7F4EE]">{p.title}</h3>
                <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">{p.desc}</p>
              </div>
              <Link
                href={l(p.href)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline pt-2"
              >
                <span>{p.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function LearnHubView() {
  const { isId, l } = useLocale();

  const modules = [
    {
      icon: BookOpen,
      title: isId ? 'JGS Academy (12 Modul Terstruktur)' : 'JGS Academy (12 Structured Modules)',
      desc: isId
        ? 'Jalur belajar bertahap untuk Pemula, Menengah, dan Pembangun Sistem dengan penjelasan Bahasa Sederhana dan Mode Teknis.'
        : 'Step-by-step learning paths for Beginner, Intermediate, and System Builder tiers with Plain-Language and Technical modes.',
      href: '/academy',
      badge: isId ? 'Kurikulum Utama' : 'Core Curriculum',
    },
    {
      icon: Scale,
      title: isId ? 'Kamus Trading Jey' : "Jey's Trading Dictionary",
      desc: isId
        ? 'Kamus istilah trading dan kuantitatif yang dapat dicari, lengkap dengan ilustrasi skema visual dan contoh akun Cent.'
        : 'Searchable trading and quantitative glossary with visual schematic diagrams and concrete Cent account examples.',
      href: '/dictionary',
      badge: isId ? 'Referensi Istilah' : 'Glossary',
    },
    {
      icon: Gamepad2,
      title: isId ? 'Trading Playground Historis' : 'Historical Trading Playground',
      desc: isId
        ? 'Latih keputusan Buy, Sell, atau Wait pada skenario grafik historis dengan evaluasi kualitas keputusan instan.'
        : 'Practice Buy, Sell, or Wait decisions on historical chart scenarios with instant decision-quality feedback.',
      href: '/playground',
      badge: isId ? 'Simulasi Bebas Risiko' : 'Risk-Free Simulator',
    },
    {
      icon: Sparkles,
      title: isId ? 'Panduan Awal Bersama Jey' : 'Interactive Onboarding with Jey',
      desc: isId
        ? 'Jawab 4 pertanyaan singkat untuk mendapatkan rekomendasi modul belajar dan parameter risiko yang sesuai.'
        : 'Answer 4 brief questions to generate a tailored learning roadmap and sample risk parameters.',
      href: '/onboarding',
      badge: isId ? 'Mulai dari Sini' : 'Start Here',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="jgs-panel p-6 sm:p-8 space-y-3">
        <span className="text-xs font-semibold text-[#D4AF37]">
          {isId ? 'PILAR 01 • PUSAT BELAJAR GRATIS' : 'PILLAR 01 • FREE LEARNING CENTER'}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE]">
          {isId
            ? 'Belajar Cara Kerja Market & Manajemen Risiko Tanpa Biaya'
            : 'Learn Market Structure & Risk Management for Free'}
        </h1>
        <p className="text-sm sm:text-base text-[#BEB6CE] max-w-3xl leading-relaxed">
          {isId
            ? 'Pilih modul belajar di bawah ini. Seluruh materi terbuka tanpa registrasi dan tanpa paywall.'
            : 'Select any learning module below. Every resource is open without registration or paywalls.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={l(m.href)}
              className="jgs-panel p-6 flex flex-col justify-between space-y-5 hover:border-[#D4AF37]/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-royal/35 text-[#D4AF37]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-semibold text-[#F3E5AB]">
                    {m.badge}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-[#F7F4EE] group-hover:text-[#F3E5AB]">
                  {m.title}
                </h2>
                <p className="text-sm text-[#BEB6CE] leading-relaxed">{m.desc}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                <span>{isId ? 'Buka Modul' : 'Open Module'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function TradingToolsHubView() {
  const { locale, isId, l } = useLocale();
  const loc = (locale === 'en' ? 'en' : 'id') as 'id' | 'en';

  const tools = [
    {
      icon: Calculator,
      title: isId ? 'Cent Lab & Konversi USD ↔ USC' : 'Cent Lab & USD ↔ USC Converter',
      desc: isId
        ? 'Konversi satuan saldo USD ke USC, hitung estimasi margin, dan bandingkan ketahanan modal akun Cent vs Standar.'
        : 'Convert USD to USC balances, estimate margin requirements, and compare Cent vs. Standard account survivability.',
      href: '/calculators/cent',
      badge: 'USC ↔ USD',
    },
    {
      icon: Scale,
      title: isId
        ? 'Kalkulator Position Sizing Spesifikasi Broker'
        : 'Broker-Spec Position Sizing Calculator',
      desc: isId
        ? 'Hitung ukuran lot berdasarkan ekuitas, jarak stop-loss, ukuran tick, nilai tick, dan lot minimum broker, dengan penolakan otomatis jika melampaui batas risiko.'
        : 'Compute exact lot volume from equity, stop-loss distance, tick size, tick value, and minimum lot, with automatic rejection when minimum lot exceeds risk.',
      href: '/calculators/position-size',
      badge: isId ? 'Akurasi Spesifikasi' : 'Broker Spec Engine',
    },
    {
      icon: ShieldCheck,
      title: isId ? 'Simulator Drawdown & Rasio R:R' : 'Drawdown & Asymmetric R:R Simulator',
      desc: isId
        ? 'Simulasikan kekalahan beruntun, kurva pemulihan drawdown non-linear, dan batas penghentian kerugian harian (circuit breaker).'
        : 'Simulate consecutive loss streaks, nonlinear drawdown recovery curves, and daily loss circuit-breaker limits.',
      href: '/calculators/drawdown',
      badge: isId ? 'Pertahanan Modal' : 'Capital Defense',
    },
    {
      icon: NotebookPen,
      title: isId ? 'Jurnal Trader JGS' : 'JGS Trader Journal',
      desc: isId
        ? 'Catat entry dan exit, audit kepatuhan 4 aturan risiko, lacak kondisi emosi, dan ekspor data ke CSV dengan aman.'
        : 'Log entry and exit records, audit 4-rule risk adherence, track emotional notes, and export safe CSV ledgers.',
      href: '/journal',
      badge: isId ? 'Evaluasi Disiplin' : 'Discipline Ledger',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="jgs-panel p-6 sm:p-8 space-y-3">
        <span className="text-xs font-semibold text-[#D4AF37]">
          {isId ? 'PILAR 02 • TRADING TOOLS GRATIS' : 'PILLAR 02 • FREE TRADING TOOLS'}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE]">
          {isId
            ? 'Kalkulator Risiko, Spesifikasi Kontrak & Jurnal Trading'
            : 'Risk Calculators, Broker Contract Sizers & Trader Journal'}
        </h1>
        <p className="text-sm sm:text-base text-[#BEB6CE] max-w-3xl leading-relaxed">
          {isId
            ? 'Seluruh kalkulator memperhitungkan spesifikasi simbol broker secara eksplisit dan dapat digunakan secara gratis tanpa login.'
            : 'All calculators explicitly respect broker-specific symbol specifications and are 100% free with no login required.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={l(t.href)}
              className="jgs-panel p-6 flex flex-col justify-between space-y-5 hover:border-[#D4AF37]/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-royal/35 text-[#D4AF37]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-semibold text-[#F3E5AB]">
                    {t.badge}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-[#F7F4EE] group-hover:text-[#F3E5AB]">
                  {t.title}
                </h2>
                <p className="text-sm text-[#BEB6CE] leading-relaxed">{t.desc}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                <span>{isId ? 'Buka Kalkulator' : 'Launch Tool'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Full Pre-Flight Check & Personal Constitution Generator live inside Tools Hub */}
      <JgsPreFlightCheckWidget locale={loc} />
      <JgsTradingConstitutionGenerator locale={loc} />
    </div>
  );
}

export function OurStrategyHubView() {
  const { locale, isId, l } = useLocale();
  const loc = (locale === 'en' ? 'en' : 'id') as 'id' | 'en';

  const items = [
    {
      icon: Cpu,
      title: isId ? 'JGS Quant Lab, Arsitektur Sistem MT5' : 'JGS Quant Lab, MT5 System Architecture',
      desc: isId
        ? 'Dokumentasi alur eksekusi OnTick() deterministik, parameter pengaman risiko, dan alasan teknis mengapa kami menolak martingale tanpa batas.'
        : 'Documentation on deterministic OnTick() execution pipelines, risk guard parameters, and why we reject uncapped martingale grids.',
      href: '/quant-lab',
      badge: 'MQL5 & VPS',
    },
    {
      icon: FlaskConical,
      title: isId ? 'EA Testing Toolkit, Audit Backtest' : 'EA Testing Toolkit, Backtest Auditor',
      desc: isId
        ? 'Checklist interaktif audit kualitas backtest Strategy Tester MT5 dan simulator uji stres pelebaran spread serta slippage.'
        : 'Interactive MT5 Strategy Tester backtest quality checklist and live spread/slippage expectancy stress-tester.',
      href: '/ea-testing',
      badge: isId ? 'Alat Uji Sistem' : 'System Testing',
    },
    {
      icon: Users,
      title: isId
        ? 'Informasi Copy Trading & Simulasi High-Water Mark'
        : 'Copy Trading Disclosures & High-Water Mark Simulator',
      desc: isId
        ? 'Penjelasan lengkap cara kerja replikasi proporsional, risiko eksekusi, kompatibilitas spesifikasi broker, dan simulasi biaya kinerja 30% berbasis High-Water Mark (Status Pra-Peluncuran).'
        : 'Complete guide to proportional replication, execution risks, broker specification compatibility, and the proposed 30% High-Water Mark fee model (Pre-Launch State).',
      href: '/copy-trading',
      badge: isId ? 'Pra-Peluncuran' : 'Pre-Launch Info',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="jgs-panel p-6 sm:p-8 space-y-3">
        <span className="text-xs font-semibold text-[#D4AF37]">
          {isId ? 'PILAR 04 • STRATEGI & SISTEM KAMI' : 'PILLAR 04 • OUR STRATEGY & SYSTEMS'}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE]">
          {isId
            ? 'Metodologi Berbasis Aturan, Pengujian Kuantitatif & Transparansi Risiko'
            : 'Rule-Based Methodology, Quantitative Testing & Risk Transparency'}
        </h1>
        <p className="text-sm sm:text-base text-[#BEB6CE] max-w-3xl leading-relaxed">
          {isId
            ? 'Pelajari bagaimana sistem JGS dirancang, diuji terhadap friksi pasar nyata, dan didokumentasikan secara terbuka.'
            : 'Explore how JGS trading systems are engineered, stress-tested against real market friction, and openly documented.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={l(item.href)}
              className="jgs-panel p-6 flex flex-col justify-between space-y-5 hover:border-[#D4AF37]/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-royal/35 text-[#D4AF37]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-semibold text-[#F3E5AB]">
                    {item.badge}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-[#F7F4EE] group-hover:text-[#F3E5AB]">
                  {item.title}
                </h2>
                <p className="text-sm text-[#BEB6CE] leading-relaxed">{item.desc}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                <span>{isId ? 'Pelajari Selengkapnya' : 'Explore Section'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Detailed 4-Step Interactive ICT Execution Blueprint */}
      <JgsIctExecutionBlueprint locale={loc} />
    </div>
  );
}
