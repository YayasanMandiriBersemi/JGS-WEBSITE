'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Globe } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

export function Footer() {
  const { locale, isId, l, switchLocale } = useLocale();

  return (
    <footer className="jgs-footer-surface border-t border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 space-y-12">
        {/* Top Positioning & CTA Row (Hidden inside Classroom LMS) */}
        <div className="jgs-footer-cta flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[var(--border-subtle)]">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
              THE JEY GANG STRATEGIST (JGS)
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[var(--text-ivory)] tracking-[-0.03em]">
              {isId
                ? 'Mulai dari paham. Bukan dari modal.'
                : 'Start with understanding. Not account size.'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {isId
                ? 'Ekosistem edukasi trading dan teknologi manajemen risiko gratis. Tanpa biaya langganan, tanpa paywall, dan tanpa klaim performa palsu.'
                : 'A free trading education and risk-management technology ecosystem. No subscription fees, no paywalls, and zero fabricated performance claims.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={l('/academy')} className="jgs-btn-gold text-sm">
              <span>{isId ? 'Mulai Belajar' : 'Start Learning'}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
            <Link href={l('/brokers')} className="jgs-btn-outline text-sm">
              <span>{isId ? 'Rekomendasi Broker & MT5' : 'Broker Guide & MT5'}</span>
            </Link>
          </div>
        </div>

        {/* 5-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Column 1: Brand Summary & Language Switcher */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#D6A937]/60 bg-[#17131D]">
                <img
                  src="/images/jey-mascot.png"
                  alt="JGS Mascot"
                  width={44}
                  height={44}
                  decoding="async"
                  className="jgs-mascot-crop"
                />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[var(--text-ivory)] tracking-tight">
                  THE JEY GANG STRATEGIST
                </div>
                <div className="font-mono text-xs text-[var(--accent-gold)]">
                  Small Capital. Serious Strategy.
                </div>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              {isId
                ? 'Seluruh kurikulum JGS Academy, kamus trading, kalkulator ukuran posisi, simulator drawdown, panduan broker, dan riset market dapat diakses secara terbuka tanpa kewajiban deposit.'
                : 'Every JGS Academy module, trading dictionary entry, position sizing calculator, drawdown simulator, broker guide, and market research note is openly accessible with zero deposit obligation.'}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <Globe className="w-4 h-4 text-[var(--accent-gold)]" strokeWidth={1.5} />
              <span className="text-xs text-[var(--text-secondary)]">
                {isId ? 'Bahasa:' : 'Language:'}
              </span>
              <button
                type="button"
                onClick={() => switchLocale('id')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  locale === 'id'
                    ? 'bg-[#D6A937] text-[#17131D]'
                    : 'bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-ivory)]'
                }`}
              >
                Bahasa Indonesia
              </button>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  locale === 'en'
                    ? 'bg-[#D6A937] text-[#17131D]'
                    : 'bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-ivory)]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Column 2: Learn */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-[var(--text-ivory)]">
              {isId ? 'Belajar' : 'Learn'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={l('/learn')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Pusat Edukasi' : 'Learning Hub'}
                </Link>
              </li>
              <li>
                <Link href={l('/academy')} className="hover:text-[var(--text-ivory)] transition-colors">
                  JGS Academy
                </Link>
              </li>
              <li>
                <Link href={l('/dictionary')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Kamus Trading' : 'Trading Dictionary'}
                </Link>
              </li>
              <li>
                <Link href={l('/brokers')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Rekomendasi & Tutorial Broker' : 'Broker Guide & MT5 Setup'}
                </Link>
              </li>
              <li>
                <Link href={l('/onboarding')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Panduan Pemula' : 'Beginner Guide'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trading Tools */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-[var(--text-ivory)]">
              {isId ? 'Kalkulator & Tools' : 'Trading Tools'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={l('/calculators/cent')} className="hover:text-[var(--text-ivory)] transition-colors">
                  Cent Lab
                </Link>
              </li>
              <li>
                <Link
                  href={l('/calculators/position-size')}
                  className="hover:text-[var(--text-ivory)] transition-colors"
                >
                  {isId ? 'Kalkulator Ukuran Posisi' : 'Position Sizing Calculator'}
                </Link>
              </li>
              <li>
                <Link
                  href={l('/calculators/drawdown')}
                  className="hover:text-[var(--text-ivory)] transition-colors"
                >
                  {isId ? 'Simulator Drawdown' : 'Drawdown Simulator'}
                </Link>
              </li>
              <li>
                <Link href={l('/playground')} className="hover:text-[var(--text-ivory)] transition-colors">
                  Trading Playground
                </Link>
              </li>
              <li>
                <Link href={l('/journal')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Jurnal Trader' : 'Trader Journal'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Research, Strategy & Transparency */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-[var(--text-ivory)]">
              {isId ? 'Riset, Strategi & Transparansi' : 'Research, Strategy & Transparency'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={l('/signals')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Live Signal Scanner (12 Pair)' : 'Live Signal Scanner (12 Pairs)'}
                </Link>
              </li>
              <li>
                <Link href={l('/research')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Radar Fundamental, COT & Riset' : 'Macro Bias, COT & Research'}
                </Link>
              </li>
              <li>
                <Link href={l('/quant-lab')} className="hover:text-[var(--text-ivory)] transition-colors">
                  Quant Lab
                </Link>
              </li>
              <li>
                <Link href={l('/ea-testing')} className="hover:text-[var(--text-ivory)] transition-colors">
                  EA Testing Toolkit
                </Link>
              </li>
              <li>
                <Link href={l('/performance')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Transparansi Performa' : 'Performance Transparency'}
                </Link>
              </li>
              <li>
                <Link href={l('/copy-trading')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Informasi Copy Trading' : 'Copy Trading Information'}
                </Link>
              </li>
              <li>
                <Link href={l('/about')} className="hover:text-[var(--text-ivory)] transition-colors">
                  {isId ? 'Tentang JGS' : 'About JGS'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Risk & Pre-Launch Regulatory Disclosure */}
        <div className="space-y-3 text-xs text-[var(--text-muted)] leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-[var(--text-ivory)]">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" strokeWidth={1.5} />
            <span>
              {isId
                ? 'Pernyataan Risiko & Transparansi Layanan'
                : 'Risk Disclosure & Service Transparency Notice'}
            </span>
          </div>
          <p>
            {isId
              ? 'Perdagangan instrumen dengan daya ungkit (leverage) seperti Forex dan Emas (XAUUSD) memiliki risiko kerugian finansial yang tinggi dan belum tentu sesuai untuk setiap individu. THE JEY GANG STRATEGIST (JGS) menyediakan materi edukasi, riset pasar, dan alat bantu perhitungan risiko secara gratis, bukan nasihat investasi personal atau ajakan untuk melakukan deposit pada pialang tertentu. Layanan copy trading berbasis biaya performa masih berada dalam tahap pra-peluncuran (belum dibuka untuk publik) serta tunduk pada peninjauan hukum dan ketentuan platform terkait.'
              : 'Trading leveraged instruments such as Foreign Exchange (Forex) and Spot Gold (XAUUSD) carries a high level of financial risk and may not be suitable for every individual. THE JEY GANG STRATEGIST (JGS) provides free educational materials, market research, and risk-calculation tools, and nothing published on this platform constitutes personalized investment advice or a solicitation to deposit funds with any broker. Any planned performance-fee copy trading service remains in pre-launch status (not open for public execution) and is subject to legal review and applicable platform/broker rules.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <span>
              © {new Date().getFullYear()} THE JEY GANG STRATEGIST (JGS). Small Capital. Serious Strategy.
            </span>
            <span className="font-semibold text-[var(--accent-gold)]">
              {isId ? 'Edukasi & Tools 100% Gratis' : '100% Free Education & Tools'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
