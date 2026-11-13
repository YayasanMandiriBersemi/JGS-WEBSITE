'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Globe,
  Sun,
  Moon,
  Crown,
  GraduationCap,
  Award,
  BookOpen,
  Compass,
  Calculator,
  Crosshair,
  ShieldCheck,
  Gamepad2,
  NotebookPen,
  Newspaper,
  Cpu,
  FlaskConical,
  BarChart3,
  Users,
  Landmark,
} from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import { stripLocalePrefix } from '@/i18n/config';
import {
  JgsThemeMode,
  loadThemeMode,
  saveThemeMode,
  loadStrategistSession,
  StrategistUserSession,
} from '@/lib/storage/jgs-local-store';
import { LiveKursPill } from '@/components/market/LiveKursPill';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';

interface NavSubItem {
  href: string;
  labelId: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
  memberOnly?: boolean;
}

interface MainNavItem {
  key: string;
  href: string;
  labelId: string;
  labelEn: string;
  matchPrefixes: string[];
  children?: NavSubItem[];
}

const MAIN_NAV_ITEMS: MainNavItem[] = [
  {
    key: 'learn',
    href: '/academy?tab=lobby',
    labelId: 'JGS Academy',
    labelEn: 'JGS Academy',
    matchPrefixes: ['/learn', '/academy', '/dictionary', '/onboarding'],
    children: [
      {
        href: '/academy?tab=lobby',
        labelId: 'Kampus & Silabus 20 Semester',
        labelEn: 'Campus & 20-Semester Catalog',
        icon: GraduationCap,
      },
      {
        href: '/academy?tab=classroom',
        labelId: 'Ruang Kuliah Interaktif (PJJ)',
        labelEn: 'PJJ Interactive Classroom',
        icon: Compass,
      },
      {
        href: '/academy?tab=certification',
        labelId: '8 Rank Legenda & Ijazah Resmi',
        labelEn: '8 Legend Ranks & Official Diploma',
        icon: Award,
      },
      {
        href: '/dictionary',
        labelId: 'Ensiklopedia Kamus Trading',
        labelEn: 'Trading Dictionary Encyclopedia',
        icon: BookOpen,
      },
    ],
  },
  {
    key: 'tools',
    href: '/tools',
    labelId: 'Kalkulator & Jurnal',
    labelEn: 'Calculators & Journal',
    matchPrefixes: ['/tools', '/calculators', '/playground', '/journal'],
    children: [
      {
        href: '/journal',
        labelId: 'Kalender Jurnal & Audit Trader',
        labelEn: 'Visual PnL Calendar & Audit',
        icon: NotebookPen,
      },
      {
        href: '/calculators/cent',
        labelId: 'Cent Lab ($10 = 1.000 USC)',
        labelEn: 'Cent Lab ($10 = 1,000 USC)',
        icon: Calculator,
      },
      {
        href: '/calculators/position-size',
        labelId: 'Kalkulator Lot & Risiko',
        labelEn: 'Position Size & Risk Calculator',
        icon: Crosshair,
      },
      {
        href: '/calculators/drawdown',
        labelId: 'Simulator Drawdown',
        labelEn: 'Drawdown Simulator',
        icon: ShieldCheck,
      },
      {
        href: '/playground',
        labelId: 'Trading Playground',
        labelEn: 'Trading Playground',
        icon: Gamepad2,
      },
    ],
  },
  {
    key: 'research-strategy',
    href: '/signals',
    labelId: 'Riset & Strategi',
    labelEn: 'Research & Strategy',
    matchPrefixes: [
      '/signals',
      '/research',
      '/brokers',
      '/strategy',
      '/quant-lab',
      '/ea-testing',
      '/performance',
      '/copy-trading',
    ],
    children: [
      {
        href: '/signals',
        labelId: 'Sinyal Trading Live (Scalping, Intraday & Swing)',
        labelEn: 'Live Trading Signals (Scalping, Intraday & Swing)',
        icon: Newspaper,
      },
      {
        href: '/research?tab=fundamental',
        labelId: 'Radar Bias Fundamental Live',
        labelEn: 'Live Fundamental Bias Radar',
        icon: Globe,
      },
      {
        href: '/research?tab=news',
        labelId: 'Berita Pasar (News WIB) & Kompas Buy/Sell',
        labelEn: 'Market News (WIB) & Buy/Sell Compass',
        icon: Users,
      },
      {
        href: '/research?tab=calendar',
        labelId: 'Kalender Ekonomi Dunia Live',
        labelEn: 'Live World Economic Calendar',
        icon: FlaskConical,
      },
      {
        href: '/research?tab=cot',
        labelId: 'Data Posisi Retail vs Institusi (COT)',
        labelEn: 'Retail vs Institutional COT Positioning',
        icon: BarChart3,
      },
      {
        href: '/brokers',
        labelId: 'Rekomendasi & Tutorial Broker (Akun Cent & MT5)',
        labelEn: 'Broker & MT5 Tutorial (Cent Account & MT5)',
        icon: Landmark,
      },
    ],
  },
  {
    key: 'about',
    href: '/about',
    labelId: 'Tentang JGS',
    labelEn: 'About JGS',
    matchPrefixes: ['/about', '/community'],
  },
];

export function Navbar() {
  const pathname = usePathname() || '/';
  const { locale, isId, l, switchLocale } = useLocale();
  const { formatUsdToIdr } = useLiveCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);
  const [themeMode, setThemeMode] = useState<JgsThemeMode>('dark');
  const [session, setSession] = useState<StrategistUserSession | null>(null);

  useEffect(() => {
    const initialTheme = loadThemeMode();
    setThemeMode(initialTheme);
    saveThemeMode(initialTheme);

    setSession(loadStrategistSession());

    function handleThemeSync() {
      setThemeMode(loadThemeMode());
    }
    function handleSessionSync() {
      setSession(loadStrategistSession());
    }
    window.addEventListener('jgs-theme-change', handleThemeSync);
    window.addEventListener('jgs-session-change', handleSessionSync);
    return () => {
      window.removeEventListener('jgs-theme-change', handleThemeSync);
      window.removeEventListener('jgs-session-change', handleSessionSync);
    };
  }, []);

  function toggleTheme() {
    const next: JgsThemeMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(next);
    saveThemeMode(next);
  }

  const barePath = stripLocalePrefix(pathname);

  return (
    <header className="jgs-navbar-surface sticky top-0 z-[90] border-b border-white/10 bg-[#0D0A12]/95 backdrop-blur-xl transition-colors duration-200">
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2 xl:gap-4">
          {/* Brand Identity */}
          <Link
            href={l('/')}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#D6A937]/60 bg-[#17131D] shrink-0 transition-transform duration-300 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/jey-mascot.png"
                alt="Jey Mascot of The Jey Gang Strategist"
                width={40}
                height={40}
                decoding="async"
                className="jgs-mascot-crop"
              />
            </div>
            <div className="shrink-0">
              <div className="font-display font-extrabold text-xs sm:text-sm xl:text-[15px] tracking-wide text-[#F7F4EE] flex items-center gap-1.5 whitespace-nowrap">
                <span>THE JEY GANG</span>
                <span className="text-[#D6A937]">STRATEGIST</span>
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] text-[#F3E5AB]/90 whitespace-nowrap">
                Small Capital. Serious Strategy.
              </div>
            </div>
          </Link>

          {/* Clean Top-Level Navigation (Zero Top-Bar Padlocks) */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label={isId ? 'Navigasi Utama' : 'Primary Navigation'}
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = item.matchPrefixes.some(
                (prefix) => barePath === prefix || barePath.startsWith(`${prefix}/`)
              );
              const label = isId ? item.labelId : item.labelEn;

              if (!item.children) {
                return (
                  <Link
                    key={item.key}
                    href={l(item.href)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-[#D6A937] bg-white/[0.07]'
                        : 'text-[#BEB6CE] hover:text-[#F7F4EE] hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{label}</span>
                  </Link>
                );
              }

              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setOpenDropdownKey(item.key)}
                  onMouseLeave={() => setOpenDropdownKey(null)}
                >
                  <Link
                    href={l(item.href)}
                    onFocus={() => setOpenDropdownKey(item.key)}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-[#D6A937] bg-white/[0.07]'
                        : 'text-[#BEB6CE] hover:text-[#F7F4EE] hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 opacity-75 transition-transform duration-200 ${
                        openDropdownKey === item.key ? 'rotate-180 text-[#D6A937]' : ''
                      }`}
                    />
                  </Link>

                  {openDropdownKey === item.key && (
                    <div className="absolute left-0 top-full pt-2 w-80 sm:w-96 z-[100]">
                      <div className="jgs-nav-dropdown rounded-xl bg-[#16121F]/95 backdrop-blur-xl border border-[#D6A937]/30 shadow-2xl p-2.5 space-y-1">
                        {item.children.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.href}
                              href={l(sub.href)}
                              onClick={() => setOpenDropdownKey(null)}
                              className="group flex items-start justify-between gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/[0.06] transition-all duration-200"
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <Icon className="w-4 h-4 text-[#D6A937] shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-[#F7F4EE] group-hover:text-[#D6A937] leading-snug transition-colors">
                                  {sub.href === '/calculators/cent'
                                    ? isId
                                      ? `Cent Lab ($10 = 1.000 USC • Live ${formatUsdToIdr(10)})`
                                      : `Cent Lab ($10 = 1,000 USC • Live ${formatUsdToIdr(10)})`
                                    : isId
                                      ? sub.labelId
                                      : sub.labelEn}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {sub.memberOnly && !session && (
                                  <span className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider bg-[#D6A937]/15 text-[#D6A937] border border-[#D6A937]/30">
                                    MEMBER
                                  </span>
                                )}
                                <ArrowRight className="w-3.5 h-3.5 text-[#D6A937] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Cluster: Live Kurs Pill, Dual-Theme Switcher, Language Switcher (ID | EN), & Member Button */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <div className="hidden 2xl:block">
              <LiveKursPill compact />
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              title={
                themeMode === 'dark'
                  ? isId
                    ? 'Beralih ke Mode Cerah (Warm Ivory)'
                    : 'Switch to Warm Ivory Light Mode'
                  : isId
                  ? 'Beralih ke Mode Gelap (Midnight Vault)'
                  : 'Switch to Midnight Vault Dark Mode'
              }
              aria-label={isId ? 'Ganti Tema Warna' : 'Toggle Color Theme'}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#0E0B14] border border-white/15 text-xs font-semibold text-[#F7F4EE] hover:border-[#D6A937] transition-all duration-200 active:scale-[0.98]"
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#D6A937]" />
                  <span className="hidden xl:inline">{isId ? 'Ivory' : 'Ivory'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#B99AE8]" />
                  <span className="hidden xl:inline">{isId ? 'Vault' : 'Dark'}</span>
                </>
              )}
            </button>

            <div
              role="group"
              aria-label={isId ? 'Pilih Bahasa' : 'Select Language'}
              className="inline-flex items-center rounded-xl bg-[#0E0B14] border border-white/15 p-1"
            >
              <Globe className="w-3.5 h-3.5 text-[#D6A937] ml-1.5 mr-1" />
              <button
                type="button"
                onClick={() => switchLocale('id')}
                aria-pressed={locale === 'id'}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  locale === 'id'
                    ? 'bg-[#D6A937] text-[#17131D]'
                    : 'text-[#BEB6CE] hover:text-[#F7F4EE]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                aria-pressed={locale === 'en'}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  locale === 'en'
                    ? 'bg-[#D6A937] text-[#17131D]'
                    : 'text-[#BEB6CE] hover:text-[#F7F4EE]'
                }`}
              >
                EN
              </button>
            </div>

            {session ? (
              <Link
                href={l('/account')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D6A937]/15 border border-[#D6A937]/50 text-[#D6A937] font-mono text-xs font-bold hover:bg-[#D6A937]/25 transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>#{session.gangId ?? '2702285126'}</span>
              </Link>
            ) : (
              <Link
                href={l('/register')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D6A937] text-[#17131D] font-semibold text-xs hover:bg-[#F3E5AB] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Be a Part of The Collective</span>
              </Link>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isId ? 'Ganti Tema Warna' : 'Toggle Color Theme'}
              className="p-2 rounded-xl bg-[#0E0B14] border border-white/15 text-[#D6A937]"
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div
              role="group"
              aria-label={isId ? 'Pilih Bahasa' : 'Select Language'}
              className="inline-flex sm:hidden items-center rounded-xl bg-[#0E0B14] border border-white/15 p-1"
            >
              <button
                type="button"
                onClick={() => switchLocale('id')}
                aria-pressed={locale === 'id'}
                className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                  locale === 'id' ? 'bg-[#D6A937] text-[#17131D]' : 'text-[#BEB6CE]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                aria-pressed={locale === 'en'}
                className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                  locale === 'en' ? 'bg-[#D6A937] text-[#17131D]' : 'text-[#BEB6CE]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl bg-[#0E0B14] border border-white/15 text-[#F7F4EE]"
              aria-label={isId ? 'Buka Menu Navigasi' : 'Toggle Navigation Menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Compact Mobile Navigation Overlay (Never shifts page content) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-b border-white/10 bg-[#17131D]/95 backdrop-blur-xl px-4 sm:px-6 py-5 space-y-5 shadow-2xl">
          <div className="space-y-4">
            {MAIN_NAV_ITEMS.map((item) => {
              const label = isId ? item.labelId : item.labelEn;
              return (
                <div key={item.key} className="space-y-1.5">
                  <Link
                    href={l(item.href)}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between font-display font-bold text-sm text-[#D6A937] uppercase tracking-wider"
                  >
                    <span>{label}</span>
                  </Link>
                  {item.children && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {item.children.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <Link
                            key={sub.href}
                            href={l(sub.href)}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-[#0E0B14] border border-white/5 text-sm font-medium text-[#F7F4EE] hover:border-[#D6A937]/40"
                          >
                            <span className="inline-flex items-center gap-2 truncate">
                              <Icon className="w-4 h-4 text-[#D6A937] shrink-0" />
                              <span className="truncate">
                                {sub.href === '/calculators/cent'
                                  ? `Cent Lab ($10 = ${formatUsdToIdr(10)})`
                                  : isId
                                    ? sub.labelId
                                    : sub.labelEn}
                              </span>
                            </span>
                            {sub.memberOnly && !session && (
                              <span className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold bg-[#D6A937]/15 text-[#D6A937] shrink-0">
                                MEMBER
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <Link
              href={l(session ? '/account' : '/register')}
              onClick={() => setMobileOpen(false)}
              className="jgs-btn-gold text-sm w-full sm:w-auto"
            >
              <Crown className="w-4 h-4" />
              <span>
                {session
                  ? `GANG MEMBER ID #${session.gangId ?? '2702285126'}`
                  : 'Be a Part of The Collective ->'}
              </span>
            </Link>
            <Link
              href={l('/academy')}
              onClick={() => setMobileOpen(false)}
              className="jgs-btn-outline text-sm w-full sm:w-auto"
            >
              <span>{isId ? 'Mulai Belajar Gratis' : 'Start Learning Free'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
