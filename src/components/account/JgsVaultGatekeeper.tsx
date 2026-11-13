'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Award,
  Download,
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Sparkles,
  Users,
  Scale,
  ArrowRight,
  KeyRound,
  UserPlus,
} from 'lucide-react';
import {
  StrategistUserSession,
  loadStrategistSession,
  saveStrategistSession,
  generateTenDigitGangId,
  computeStrategistBelt,
  getLiveGangRoster,
  loadThemeMode,
  JgsThemeMode,
} from '@/lib/storage/jgs-local-store';
import {
  downloadGangIdCardPng,
  downloadTradingConstitutionPng,
} from '@/lib/canvas/jgs-card-exporter';

// ============================================================================
// 1. OFFICIAL COLLECTIBLE GANG ID CARD COMPONENT + BELT PROGRESSION (ENGINE 1)
// ============================================================================

interface JgsCollectibleGangCardProps {
  locale: 'id' | 'en';
  name: string;
  gangId: string;
  compact?: boolean;
}

export function JgsCollectibleGangCard({
  locale,
  name,
  gangId,
  compact = false,
}: JgsCollectibleGangCardProps) {
  const isId = locale === 'id';
  const [beltState, setBeltState] = useState(() => computeStrategistBelt());
  const [cardTheme, setCardTheme] = useState<JgsThemeMode>('dark');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setBeltState(computeStrategistBelt());
    setCardTheme(loadThemeMode());
    const onThemeChange = (e: Event) => {
      const custom = e as CustomEvent<JgsThemeMode>;
      if (custom.detail) setCardTheme(custom.detail);
    };
    window.addEventListener('jgs-theme-change', onThemeChange);
    return () => window.removeEventListener('jgs-theme-change', onThemeChange);
  }, []);

  const displayName = name.trim() || 'Asep Garpit';
  const cleanGangId = gangId.replace(/\D/g, '').slice(0, 10).padEnd(10, '0') || '2702285126';
  const rankText = isId ? beltState.labelId : beltState.labelEn;
  const progressPct = Math.min(100, Math.round((beltState.completedCount / 60) * 100));

  const beltBadgeStyle: Record<string, string> = {
    WHITE: 'border-white/30 bg-white/10 text-jgs-ivory',
    PURPLE: 'border-jgs-purple-light/50 bg-jgs-purple/25 text-jgs-purple-glow',
    GOLD: 'border-jgs-gold/60 bg-jgs-gold/20 text-jgs-gold',
    BLACK: 'border-jgs-gold bg-jgs-plum-deep text-jgs-gold shadow-gold-glow',
  };

  const handleDownloadPng = () => {
    setDownloading(true);
    try {
      downloadGangIdCardPng({
        fullName: displayName,
        gangId: cleanGangId,
        beltRank: beltState.rank,
        beltBadgeText: `${beltState.badgeText} • ${isId ? beltState.titleId : beltState.titleEn}`,
        division: '1,000 USC MICRO-CAPITAL STRATEGIST',
        variant: cardTheme,
      });
    } finally {
      setTimeout(() => setDownloading(false), 500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Official Collectible Card Frame (Centurion Obsidian/Gold vs Warm Ivory Heritage) */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 p-6 sm:p-7 shadow-gold-glow transition-all duration-300 ${
          cardTheme === 'light' ? 'jgs-centurion-ivory' : 'jgs-centurion-dark'
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(214,169,55,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(214,169,55,0.22) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-jgs-gold/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-jgs-purple/15 blur-2xl" />

        {/* Header Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-jgs-gold/25 pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] jgs-card-gold font-semibold">
              OFFICIAL MEMBER OF THE JEY GANG
            </p>
            <p className="font-mono text-[10px] jgs-card-muted mt-0.5">
              THE JEY GANG STRATEGIST • SMALL CAPITAL. SERIOUS STRATEGY.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            {/* Metallic EMV Chip Mini Emblem */}
            <div
              aria-hidden="true"
              className="hidden sm:flex w-10 h-7 rounded-md border border-jgs-gold/70 bg-gradient-to-br from-[#F3E5AB] via-[#D6A937] to-[#9A6B13] items-center justify-center shadow-sm"
            >
              <div className="w-4 h-4 border border-[#17131D]/35 rounded-xs" />
            </div>
            <div className="h-9 w-9 overflow-hidden rounded-full border border-jgs-gold/60 bg-jgs-plum-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/jey-mascot.png"
                alt="Jey Mascot Emblem"
                className="jgs-mascot-crop"
              />
            </div>
          </div>
        </div>

        {/* Center Main Statement */}
        <div className="relative z-10 my-6 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest font-semibold mb-1.5 border-jgs-gold/45 bg-jgs-gold/10 jgs-card-gold">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span>OFFICIAL MEMBER OF THE JEY GANG • {beltState.badgeText}</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold jgs-card-ink leading-tight tracking-tight">
            <span className="jgs-card-gold">{displayName}</span> is a part of the jey gang
          </h3>
          <p className="font-display italic text-sm sm:text-base jgs-card-muted">
            &ldquo;Here&apos;s where strategist champions are made.&rdquo;
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-jgs-gold/20 pt-4">
          <div className="rounded-xl border jgs-card-inset p-3">
            <span className="block font-mono text-[9px] uppercase tracking-widest jgs-card-muted">
              GANG MEMBER ID
            </span>
            <span className="mt-1 block font-mono text-sm font-bold jgs-card-gold tracking-wider">
              GANG MEMBER ID: #{cleanGangId}
            </span>
          </div>

          <div className="rounded-xl border jgs-card-inset p-3">
            <span className="block font-mono text-[9px] uppercase tracking-widest jgs-card-muted">
              RANK
            </span>
            <span
              className={`mt-1 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold ${
                beltBadgeStyle[beltState.rank] || beltBadgeStyle.WHITE
              }`}
            >
              {rankText}
            </span>
          </div>

          <div className="rounded-xl border jgs-card-inset p-3">
            <span className="block font-mono text-[9px] uppercase tracking-widest jgs-card-muted">
              DIVISION
            </span>
            <span className="mt-1 block font-mono text-[11px] font-semibold jgs-card-ink leading-snug">
              1,000 USC MICRO-CAPITAL STRATEGIST
            </span>
          </div>
        </div>
      </div>

      {/* Belt Progression Tracker & Download Bar */}
      {!compact && (
        <div className="rounded-xl border border-white/10 bg-jgs-plum-surface/75 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-jgs-gold block">
                {isId ? 'PROGRES SABUK STRATEGIST (ENGINE 1)' : 'STRATEGIST BELT PROGRESSION (ENGINE 1)'}
              </span>
              <p className="text-xs text-jgs-ivory-muted mt-0.5">
                {isId
                  ? `${beltState.titleId} • ${beltState.completedCount} modul selesai (Target sabuk berikutnya: ${beltState.nextBeltTargetLessons} modul)`
                  : `${beltState.titleEn} • ${beltState.completedCount} lessons completed (Next belt target: ${beltState.nextBeltTargetLessons} lessons)`}
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-jgs-gold">
              {progressPct}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-jgs-plum-deep border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-jgs-purple via-jgs-gold to-jgs-gold-light transition-all duration-500"
              style={{ width: `${Math.max(12, progressPct)}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-jgs-ivory-faint">
              <span>{isId ? 'Tema Kartu PNG:' : 'PNG Card Style:'}</span>
              <button
                type="button"
                onClick={() => setCardTheme('dark')}
                className={`px-2 py-0.5 rounded border text-[10px] ${
                  cardTheme === 'dark'
                    ? 'border-jgs-gold/60 bg-jgs-gold/15 text-jgs-gold'
                    : 'border-white/10 text-jgs-ivory-faint'
                }`}
              >
                Dark Vault
              </button>
              <button
                type="button"
                onClick={() => setCardTheme('light')}
                className={`px-2 py-0.5 rounded border text-[10px] ${
                  cardTheme === 'light'
                    ? 'border-jgs-gold/60 bg-jgs-gold/15 text-jgs-gold'
                    : 'border-white/10 text-jgs-ivory-faint'
                }`}
              >
                Warm Ivory
              </button>
            </div>

            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={downloading}
              className="inline-flex items-center gap-2 rounded-lg bg-jgs-gold px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-jgs-plum-deep hover:bg-jgs-gold-light transition-all shadow-gold-glow"
            >
              <Download className="w-3.5 h-3.5" />
              {downloading
                ? isId
                  ? 'Merender PNG 1080×1350...'
                  : 'Rendering 1080×1350 PNG...'
                : 'Download Gang ID Card (PNG)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 2. THE JEY GANG VAULT GATEKEEPER WRAPPER (FOR RISET, STRATEGI, PERFORMA)
// ============================================================================

interface JgsVaultGatekeeperProps {
  locale: 'id' | 'en';
  pillarTitleId: string;
  pillarTitleEn: string;
  pillarSummaryId: string;
  pillarSummaryEn: string;
  previewHighlightsId?: string[];
  previewHighlightsEn?: string[];
  children: React.ReactNode;
}

export function JgsVaultGatekeeper({
  locale,
  pillarTitleId,
  pillarTitleEn,
  pillarSummaryId,
  pillarSummaryEn,
  previewHighlightsId = [],
  previewHighlightsEn = [],
  children,
}: JgsVaultGatekeeperProps) {
  const isId = locale === 'id';
  const [session, setSession] = useState<StrategistUserSession | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [authTab, setAuthTab] = useState<'signup' | 'login'>('signup');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gangId, setGangId] = useState('2702285126');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setSession(loadStrategistSession());
    setGangId(generateTenDigitGangId());
    setHydrated(true);

    const handleSessionChange = () => {
      setSession(loadStrategistSession());
    };
    window.addEventListener('jgs-session-change', handleSessionChange);
    return () => window.removeEventListener('jgs-session-change', handleSessionChange);
  }, []);

  const handleRegenerateGangId = () => {
    setGangId(generateTenDigitGangId());
  };

  const handleInstantUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName =
      name.trim() ||
      (authTab === 'login' ? email.split('@')[0] || 'Asep Garpit' : '');
    const cleanEmail = email.trim();
    const cleanDigits = gangId.replace(/\D/g, '');

    if (authTab === 'signup' && cleanName.length < 2) {
      setErrorMsg(
        isId
          ? 'Masukkan Nama Lengkap atau Alias Strategist Anda (min. 2 karakter).'
          : 'Please enter your Full Name or Strategist Alias (min. 2 chars).'
      );
      return;
    }

    if (!cleanEmail.includes('@')) {
      setErrorMsg(
        isId
          ? 'Masukkan alamat email yang valid untuk menyimpan Gang ID Anda.'
          : 'Please enter a valid email address to link your Gang ID.'
      );
      return;
    }

    if (password.trim().length < 4) {
      setErrorMsg(
        isId
          ? 'Masukkan password minimal 4 karakter.'
          : 'Please enter a password of at least 4 characters.'
      );
      return;
    }

    const finalGangId =
      cleanDigits.length === 10 ? cleanDigits : generateTenDigitGangId();

    const newSession: StrategistUserSession = {
      id: `usr-${Date.now()}`,
      displayName: cleanName,
      email: cleanEmail,
      role: 'STRATEGIST',
      signedInAt: new Date().toISOString(),
      gangId: finalGangId,
      division: '1,000 USC MICRO-CAPITAL STRATEGIST',
    };

    saveStrategistSession(newSession);
    setSession(newSession);
  };

  if (!hydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="font-mono text-xs uppercase tracking-widest text-jgs-gold animate-pulse">
          {isId ? 'Memeriksa Akses The Jey Gang Vault...' : 'Verifying The Jey Gang Vault Access...'}
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div>
        <div className="border-b border-jgs-gold/20 bg-jgs-plum-surface/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                <Unlock className="w-3 h-3" />
                VAULT UNLOCKED
              </span>
              <span className="text-jgs-ivory font-medium">
                <strong className="text-jgs-gold">{session.displayName}</strong> is a part of the jey gang
              </span>
              <span className="hidden sm:inline font-mono text-[11px] text-jgs-ivory-faint">
                • GANG MEMBER ID: #{session.gangId || '2702285126'}
              </span>
            </div>
            <Link
              href={`/${locale}/account`}
              className="font-mono text-[11px] text-jgs-gold hover:underline flex items-center gap-1"
            >
              {isId ? 'Lihat & Unduh Kartu Gang Member ID →' : 'View & Download Gang Member ID Card →'}
            </Link>
          </div>
        </div>
        {children}
      </div>
    );
  }

  const highlights = isId ? previewHighlightsId : previewHighlightsEn;

  return (
    <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="rounded-3xl border-2 border-jgs-gold/40 bg-gradient-to-b from-jgs-plum-surface via-jgs-plum-deep to-jgs-plum-surface p-6 sm:p-10 lg:p-12 shadow-gold-glow relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-jgs-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-jgs-purple/15 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Vault Explanation & Blurred Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-jgs-gold/50 bg-jgs-gold/15 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-jgs-gold font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>EXCLUSIVE ACCESS // MEMBER OF THE JEY GANG</span>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-jgs-ivory-faint">
                {isId ? pillarTitleId : pillarTitleEn}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-jgs-ivory leading-tight">
                {isId
                  ? 'Halaman ini khusus untuk Member of The Jey Gang.'
                  : 'This page is exclusively for Members of The Jey Gang.'}
              </h1>
              <p className="text-sm sm:text-base text-jgs-ivory-muted leading-relaxed">
                {isId
                  ? 'Masukkan Gang Member ID Anda atau daftar gratis dalam 10 detik untuk membuka Riset Market, Strategi ICT/EA, dan Performa.'
                  : 'Enter your Gang Member ID or register free in 10 seconds to unlock Market Research, ICT/EA Strategy, and Performance.'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-jgs-plum-deep/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-jgs-gold">
                  {isId ? 'Ringkasan Modul di Dalam Vault Ini:' : 'Inside This Vault Module:'}
                </span>
                <span className="font-mono text-[10px] text-emerald-400">
                  100% FREE • ZERO PAYWALL
                </span>
              </div>
              <p className="text-xs sm:text-sm text-jgs-ivory-muted leading-relaxed">
                {isId ? pillarSummaryId : pillarSummaryEn}
              </p>
              {highlights.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-jgs-ivory bg-jgs-plum-surface/70 border border-white/5 rounded-lg p-2.5"
                    >
                      <ShieldCheck className="w-4 h-4 text-jgs-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-jgs-ivory-faint mb-2">
                {isId
                  ? 'PRATINJAU KARTU ANGGOTA RESMI ANDA (OTOMATIS TERBIT SAAT UNLOCK):'
                  : 'LIVE PREVIEW OF YOUR OFFICIAL COLLECTIBLE GANG ID CARD:'}
              </p>
              <JgsCollectibleGangCard
                locale={locale}
                name={name || 'Asep Garpit'}
                gangId={gangId}
                compact
              />
            </div>
          </div>

          {/* Right Column: Instant 10-Second Initiation / Login Box */}
          <div className="lg:col-span-5 rounded-2xl border border-jgs-gold/40 bg-jgs-plum-deep/90 p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-jgs-plum-surface p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setAuthTab('signup')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                  authTab === 'signup'
                    ? 'bg-jgs-gold text-jgs-plum-deep shadow-gold-glow'
                    : 'text-jgs-ivory-muted hover:text-jgs-ivory'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Join The Gang
              </button>
              <button
                type="button"
                onClick={() => setAuthTab('login')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                  authTab === 'login'
                    ? 'bg-jgs-gold text-jgs-plum-deep shadow-gold-glow'
                    : 'text-jgs-ivory-muted hover:text-jgs-ivory'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                Member Login
              </button>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-jgs-ivory">
                {authTab === 'signup'
                  ? isId
                    ? 'Inisiasi Anggota Baru (10 Detik)'
                    : '10-Second Gang Initiation (100% Free)'
                  : isId
                  ? 'Masuk dengan Akun The Jey Gang'
                  : 'Sign In to The Jey Gang Vault'}
              </h2>
              <p className="text-xs text-jgs-ivory-muted mt-1">
                {authTab === 'signup'
                  ? isId
                    ? 'Klaim Nomor Gang ID 10-Digit Anda untuk membuka seluruh Riset Market, Quant Lab, dan Audit Performa.'
                    : 'Claim your 10-Digit Gang Member ID to immediately unlock Market Research, Quant Lab, and Performance Audits.'
                  : isId
                  ? 'Masukkan email dan password Anda untuk membuka kunci halaman ini seketika.'
                  : 'Enter your email and password to unlock this vault page immediately.'}
              </p>
            </div>

            <form onSubmit={handleInstantUnlock} className="space-y-4">
              {authTab === 'signup' && (
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-jgs-ivory-muted mb-1.5">
                    {isId ? 'Nama Lengkap / Strategist Alias' : 'Full Name / Strategist Alias'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asep Garpit / Alfath Muhammad"
                    required
                    className="jgs-themed-input"
                  />
                </div>
              )}

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-jgs-ivory-muted mb-1.5">
                  {isId ? 'Alamat Email' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="strategist@jeygang.com"
                  required
                  className="jgs-themed-input"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-jgs-ivory-muted mb-1.5">
                  {isId ? 'Password Vault' : 'Vault Password'}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="jgs-themed-input"
                />
              </div>

              {authTab === 'signup' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-jgs-gold">
                      10-DIGIT GANG MEMBER ID
                    </label>
                    <button
                      type="button"
                      onClick={handleRegenerateGangId}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-jgs-gold hover:underline"
                    >
                      <RefreshCw className="w-3 h-3" />
                      {isId ? 'Acak ID Baru' : 'Roll New ID'}
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-jgs-gold">
                      #
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      value={gangId}
                      onChange={(e) => setGangId(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="2702285126"
                      className="jgs-themed-input pl-8 font-mono font-bold tracking-widest text-jgs-gold"
                    />
                  </div>
                  <p className="font-mono text-[10px] text-jgs-ivory-faint mt-1">
                    {isId
                      ? 'Gunakan ID otomatis di atas atau ketik 10 digit pilihan Anda.'
                      : 'Use the generated 10-digit serial above or type your custom 10 digits.'}
                  </p>
                </div>
              )}

              {errorMsg && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-jgs-gold py-3.5 px-5 font-mono text-xs font-bold uppercase tracking-widest text-jgs-plum-deep hover:bg-jgs-gold-light transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
              >
                <Unlock className="w-4 h-4" />
                {authTab === 'signup'
                  ? isId
                    ? 'Klaim Gang Member ID & Buka Akses ->'
                    : 'Claim Gang Member ID & Unlock Access ->'
                  : isId
                  ? 'Buka Akses Vault Sekarang ->'
                  : 'Unlock Vault Access ->'}
              </button>
            </form>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[11px] text-jgs-ivory-faint">
              <span>
                {isId ? 'Belajar & Kalkulator tetap bebas tanpa login:' : 'Learn & Calculators stay open without login:'}
              </span>
              <Link
                href={`/${locale}/academy`}
                className="font-mono text-jgs-gold hover:underline"
              >
                {isId ? 'Ke Academy →' : 'Go to Academy →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. ENGINE 2: "JGS PRE-FLIGHT CHECK" (KILLZONE CLOCK, ROLLOVER & CIRCUIT BREAKER)
// ============================================================================

export function JgsPreFlightCheckWidget({ locale }: { locale: 'id' | 'en' }) {
  const isId = locale === 'id';
  const [utcNow, setUtcNow] = useState<Date>(() => new Date());
  const [simHourUtc, setSimHourUtc] = useState<number | null>(null);
  const [equityUsc, setEquityUsc] = useState<number>(1000);
  const [contractChecked, setContractChecked] = useState<boolean>(true);
  const [consecutiveLosses, setConsecutiveLosses] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => setUtcNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const activeUtcHour =
    simHourUtc !== null
      ? simHourUtc
      : utcNow.getUTCHours() + utcNow.getUTCMinutes() / 60;

  const wibHour = Math.floor((activeUtcHour + 7) % 24);
  const estHour = Math.floor((activeUtcHour - 5 + 24) % 24);

  const sessionStatus = useMemo(() => {
    if (activeUtcHour >= 21 && activeUtcHour <= 22.5) {
      return {
        code: 'ROLLOVER_DANGER',
        badge: isId ? 'BAHAYA ROLLOVER & SPREAD MELAR' : 'ROLLOVER SPREAD WIDENING DANGER',
        color: 'text-red-400 border-red-500/40 bg-red-500/15',
        desc: isId
          ? 'Pukul 04:00–05:30 WIB (21:00–22:30 UTC) adalah pergantian hari server broker. Spread XAUUSD bisa melar 5x–10x lipat dan menyapu Stop Loss akun 1,000 USC tanpa harga bergerak!'
          : '21:00–22:30 UTC (04:00–05:30 WIB) is broker server rollover. XAUUSD spreads widen 5x–10x and can trigger your Stop Loss on a 1,000 USC account artificially.',
      };
    }
    if (activeUtcHour >= 7 && activeUtcHour <= 10) {
      return {
        code: 'LONDON_KILLZONE',
        badge: isId ? 'ICT LONDON KILLZONE AKTIF (14:00–17:00 WIB)' : 'ICT LONDON KILLZONE ACTIVE (02:00–05:00 EST)',
        color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/15',
        desc: isId
          ? 'Jendela waktu institusional optimal! Cari Liquidity Sweep terhadap High/Low sesi Asia, tunggu MSS, dan masuk di Fair Value Gap (FVG).'
          : 'Optimal institutional window! Watch for a Liquidity Sweep of the Asian High/Low, wait for MSS, and enter on the Fair Value Gap (FVG).',
      };
    }
    if (activeUtcHour >= 12 && activeUtcHour <= 15) {
      return {
        code: 'NY_KILLZONE',
        badge: isId ? 'ICT NEW YORK KILLZONE & SILVER BULLET (19:00–22:00 WIB)' : 'ICT NY KILLZONE & SILVER BULLET (07:00–10:00 EST)',
        color: 'text-jgs-gold border-jgs-gold/50 bg-jgs-gold/15',
        desc: isId
          ? 'Volatilitas XAUUSD tertinggi! Jendela 21:00–22:00 WIB (10:00–11:00 AM EST) adalah jam ICT Silver Bullet. Wajib disiplin lot Cent & Stop Loss!'
          : 'Peak XAUUSD volatility! 10:00–11:00 AM EST (21:00–22:00 WIB) is the ICT Silver Bullet window. Strict Cent lot sizing & Stop Loss required!',
      };
    }
    return {
      code: 'CONSOLIDATION',
      badge: isId ? 'FASE KONSOLIDASI / DI LUAR KILLZONE UTAMA' : 'CONSOLIDATION / OUTSIDE PRIMARY KILLZONE',
      color: 'text-jgs-ivory-muted border-white/20 bg-white/5',
      desc: isId
        ? 'Harga cenderung membangun likuiditas (Equal Highs / Equal Lows). Jangan memaksa entry di tengah range; tandai BSL & SSL untuk sesi London/NY.'
        : 'Price is typically building liquidity (Equal Highs / Equal Lows). Avoid forcing trades mid-range; mark BSL & SSL for London/NY.',
    };
  }, [activeUtcHour, isId]);

  const maxRiskPerTradeUsc = Math.round(equityUsc * 0.01 * 10) / 10;
  const maxDailyLossCapUsc = Math.round(equityUsc * 0.03 * 10) / 10;
  const isRevengeLocked = consecutiveLosses >= 2;
  const isAllReady =
    sessionStatus.code !== 'ROLLOVER_DANGER' && contractChecked && !isRevengeLocked;

  return (
    <div className="rounded-3xl border border-white/10 bg-jgs-plum-surface/80 p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-jgs-gold block">
            {isId ? 'ENGINE 2 // PROTOKOL SEBELUM BUKA MT5' : 'ENGINE 2 // PRE-MT5 SAFETY PROTOCOL'}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-jgs-ivory mt-1">
            {isId
              ? 'JGS Pre-Flight Check: Jam Killzone & Pemutus Arus Risiko'
              : 'JGS Pre-Flight Check: Killzone Clock & Risk Circuit Breaker'}
          </h3>
        </div>
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider ${
            isAllReady
              ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
              : 'border-red-500/40 bg-red-500/15 text-red-400'
          }`}
        >
          {isAllReady ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              {isId ? 'SIAP EKSEKUSI TERUKUR' : 'CLEARED FOR PRECISION ENTRY'}
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4" />
              {isId ? 'TAHAN ENTRY, PERIKSA PERINGATAN' : 'HOLD ENTRY, CHECK WARNINGS'}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: ICT Killzone & Rollover Clock */}
        <div className="rounded-2xl border border-white/10 bg-jgs-plum-deep/75 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-jgs-gold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {isId ? '1. JAM KILLZONE & ROLLOVER' : '1. KILLZONE & ROLLOVER CLOCK'}
            </span>
            <span className="font-mono text-xs text-jgs-ivory-muted">
              {String(wibHour).padStart(2, '0')}:00 WIB / {String(estHour).padStart(2, '0')}:00 EST
            </span>
          </div>

          <div className={`rounded-xl border p-3.5 ${sessionStatus.color}`}>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider">
              {sessionStatus.badge}
            </p>
            <p className="text-xs mt-1.5 leading-relaxed opacity-90">{sessionStatus.desc}</p>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-jgs-ivory-faint mb-1">
              <span>{isId ? 'Simulasikan Jam Pasar (WIB):' : 'Simulate Market Hour (WIB):'}</span>
              <button
                type="button"
                onClick={() => setSimHourUtc(null)}
                className="text-jgs-gold hover:underline"
              >
                {isId ? 'Reset Jam Live' : 'Reset to Live'}
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: '10:00 WIB (Asia)', utc: 3 },
                { label: '15:00 WIB (LDN)', utc: 8 },
                { label: '21:00 WIB (NY SB)', utc: 14 },
                { label: '04:30 WIB (Roll)', utc: 21.5 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSimHourUtc(preset.utc)}
                  className={`rounded-lg border px-2 py-1.5 font-mono text-[10px] transition-all ${
                    simHourUtc === preset.utc
                      ? 'border-jgs-gold bg-jgs-gold/20 text-jgs-gold font-bold'
                      : 'border-white/10 bg-jgs-plum-surface text-jgs-ivory-muted hover:text-jgs-ivory'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Contract Spec Verification & Daily Loss Circuit Breaker */}
        <div className="rounded-2xl border border-white/10 bg-jgs-plum-deep/75 p-5 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-jgs-gold flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            {isId ? '2. CIRCUIT BREAKER & KONTRAK EMAS' : '2. CIRCUIT BREAKER & GOLD CONTRACT'}
          </span>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-jgs-ivory-muted mb-1">
              {isId ? 'Saldo Akun Cent Saat Ini (USC):' : 'Current Cent Account Equity (USC):'}
            </label>
            <input
              type="number"
              min={100}
              step={100}
              value={equityUsc}
              onChange={(e) => setEquityUsc(Math.max(100, Number(e.target.value) || 1000))}
              className="jgs-themed-input font-mono text-jgs-gold font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-white/10 bg-jgs-plum-surface/70 p-2.5">
              <span className="block font-mono text-[9px] uppercase text-jgs-ivory-faint">
                {isId ? 'Batas Risiko / Trade (1%)' : 'Max Risk / Trade (1%)'}
              </span>
              <span className="font-mono text-sm font-bold text-emerald-400">
                {maxRiskPerTradeUsc} USC (${(maxRiskPerTradeUsc / 100).toFixed(2)})
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-jgs-plum-surface/70 p-2.5">
              <span className="block font-mono text-[9px] uppercase text-jgs-ivory-faint">
                {isId ? 'Stop Harian (3% Cap)' : 'Daily Stop Cap (3%)'}
              </span>
              <span className="font-mono text-sm font-bold text-jgs-gold">
                {maxDailyLossCapUsc} USC (${(maxDailyLossCapUsc / 100).toFixed(2)})
              </span>
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer rounded-xl border border-white/10 bg-jgs-plum-surface/50 p-3">
            <input
              type="checkbox"
              checked={contractChecked}
              onChange={(e) => setContractChecked(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-amber-400"
            />
            <span className="text-xs text-jgs-ivory leading-snug">
              {isId
                ? 'Saya sudah cek Contract Specification XAUUSDc di MT5 (1 oz Micro-Cent vs 100 oz Standard).'
                : 'I verified my broker MT5 XAUUSDc Contract Size (1 oz Micro-Cent vs 100 oz Standard).'}
            </span>
          </label>
        </div>

        {/* Card 3: Emotional Revenge Cooldown Lock */}
        <div className="rounded-2xl border border-white/10 bg-jgs-plum-deep/75 p-5 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-jgs-gold flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            {isId ? '3. DETEKTOR BALAS DENDAM (COOLDOWN)' : '3. REVENGE TRADING COOLDOWN LOCK'}
          </span>

          <p className="text-xs text-jgs-ivory-muted leading-relaxed">
            {isId
              ? 'Berapa kali Anda terkena Stop Loss berturut-turut hari ini? Aturan JGS: 2x Loss berturut-turut = Wajib tutup MT5.'
              : 'How many consecutive Stop Losses have you taken today? JGS Rule: 2 consecutive losses = Mandatory MT5 shutdown.'}
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setConsecutiveLosses(count)}
                className={`rounded-xl border py-2.5 font-mono text-xs font-bold transition-all ${
                  consecutiveLosses === count
                    ? count >= 2
                      ? 'border-red-500 bg-red-500/20 text-red-300'
                      : 'border-jgs-gold bg-jgs-gold/20 text-jgs-gold'
                    : 'border-white/10 bg-jgs-plum-surface text-jgs-ivory-muted'
                }`}
              >
                {count === 2 ? '2+ Loss' : `${count} Loss`}
              </button>
            ))}
          </div>

          <div
            className={`rounded-xl border p-3 text-xs leading-relaxed ${
              isRevengeLocked
                ? 'border-red-500/40 bg-red-500/15 text-red-300'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
            }`}
          >
            {isRevengeLocked
              ? isId
                ? 'LOCKED: Anda sudah 2x Loss berturut-turut. Tutup chart MT5 sekarang! Jangan balas dendam atau lipat lot. Evaluasi di Jurnal besok.'
                : 'LOCKED: You hit 2 consecutive losses. Close MT5 immediately! Do not revenge trade or double your lot size.'
              : isId
              ? 'Pikiran jernih. Eksekusi hanya jika harga menyapu likuiditas (BSL/SSL) dan membentuk FVG di jam Killzone.'
              : 'Mental state clear. Execute only if price sweeps liquidity (BSL/SSL) and forms an FVG inside a Killzone.'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. ENGINE 3: GENERATOR "MY $10 TRADING CONSTITUTION" (WALLPAPER PNG EXPORT)
// ============================================================================

export function JgsTradingConstitutionGenerator({ locale }: { locale: 'id' | 'en' }) {
  const isId = locale === 'id';
  const [strategistName, setStrategistName] = useState('Asep Garpit');
  const [gangId, setGangId] = useState('2702285126');
  const [capitalRule, setCapitalRule] = useState(
    '1,000 USC ($10) • Max 1% Risk (10 USC / $0.10) per Trade • 30 USC Daily Stop'
  );
  const [killzoneSession, setKillzoneSession] = useState(
    'London Killzone (14:00–17:00 WIB) & NY Silver Bullet (21:00–22:00 WIB)'
  );
  const [cooldownPledge, setCooldownPledge] = useState(
    '2x Loss Berturut-Turut = Langsung Tutup MT5 24 Jam (Anti Balas Dendam)'
  );
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const session = loadStrategistSession();
    if (session) {
      setStrategistName(session.displayName);
      if (session.gangId) setGangId(session.gangId);
    }
  }, []);

  const handleDownloadWallpaper = () => {
    setExporting(true);
    try {
      downloadTradingConstitutionPng({
        fullName: strategistName.trim() || 'Asep Garpit',
        gangId: gangId || '2702285126',
        startingCapitalLabel: capitalRule,
        maxRiskPerTradeLabel: killzoneSession,
        maxDailyLossesLabel: cooldownPledge,
        mandatorySetupRule:
          'Wajib tunggu Liquidity Sweep (BSL/SSL) + MSS + Fair Value Gap (FVG) di jam Killzone.',
        isId,
      });
    } finally {
      setTimeout(() => setExporting(false), 500);
    }
  };

  return (
    <div className="rounded-3xl border border-jgs-gold/35 bg-gradient-to-br from-jgs-plum-surface via-jgs-plum-deep to-jgs-plum-surface p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-jgs-gold block">
            {isId
              ? 'ENGINE 3 // KOMITMEN PRIBADI ANTI MARGIN CALL'
              : 'ENGINE 3 // PERSONAL ANTI-MARGIN-CALL PLEDGE'}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-jgs-ivory mt-1">
            {isId
              ? 'Generator "My $10 Trading Constitution" (Wallpaper PNG)'
              : '"My $10 Trading Constitution" Wallpaper Generator (PNG)'}
          </h3>
        </div>
        <button
          type="button"
          onClick={handleDownloadWallpaper}
          disabled={exporting}
          className="inline-flex items-center gap-2 rounded-xl bg-jgs-gold px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-jgs-plum-deep hover:bg-jgs-gold-light transition-all shadow-gold-glow"
        >
          <Download className="w-4 h-4" />
          {exporting
            ? isId
              ? 'Merender Wallpaper 1080×1920...'
              : 'Rendering 1080×1920 Wallpaper...'
            : isId
            ? 'Download Wallpaper Konstitusi (PNG)'
            : 'Download Constitution Wallpaper (PNG)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-jgs-ivory-muted mb-1">
                {isId ? 'Nama Strategist di Piagam' : 'Strategist Name on Charter'}
              </label>
              <input
                type="text"
                value={strategistName}
                onChange={(e) => setStrategistName(e.target.value)}
                className="jgs-themed-input"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-jgs-ivory-muted mb-1">
                10-DIGIT GANG MEMBER ID
              </label>
              <input
                type="text"
                maxLength={10}
                value={gangId}
                onChange={(e) => setGangId(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="jgs-themed-input font-mono text-jgs-gold"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-jgs-gold mb-1.5">
              {isId
                ? 'PASAL 1, PILIH MANDAT MODAL & RISIKO HARIAN:'
                : 'ARTICLE 1, SELECT CAPITAL & DAILY RISK MANDATE:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                '1,000 USC ($10) • Max 1% Risk (10 USC / $0.10) per Trade • 30 USC Daily Stop',
                '2,500 USC ($25) • Max 0.8% Risk (20 USC / $0.20) per Trade • 60 USC Daily Stop',
                '5,000 USC ($50) • Max 0.5% Risk (25 USC / $0.25) per Trade • 75 USC Daily Stop',
                '10,000 USC ($100) • Max 0.5% Risk (50 USC / $0.50) per Trade • 150 USC Daily Stop',
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCapitalRule(opt)}
                  className={`text-left rounded-xl border p-2.5 text-xs transition-all ${
                    capitalRule === opt
                      ? 'border-jgs-gold bg-jgs-gold/15 text-jgs-ivory font-semibold'
                      : 'border-white/10 bg-jgs-plum-deep/60 text-jgs-ivory-muted hover:text-jgs-ivory'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-jgs-gold mb-1.5">
              {isId
                ? 'PASAL 2, PILIH JENDELA WAKTU ICT KILLZONE:'
                : 'ARTICLE 2, SELECT ICT KILLZONE EXECUTION WINDOW:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'London Killzone (14:00–17:00 WIB) & NY Silver Bullet (21:00–22:00 WIB)',
                'Fokus Tunggal: ICT London Killzone (14:00–17:00 WIB) • Sweep Asian Range',
                'Fokus Tunggal: ICT New York Open & Silver Bullet (19:00–22:00 WIB)',
                'Hanya 1 Setup A+ per Hari (Sweep BSL/SSL + MSS + FVG di Discount/Premium)',
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setKillzoneSession(opt)}
                  className={`text-left rounded-xl border p-2.5 text-xs transition-all ${
                    killzoneSession === opt
                      ? 'border-jgs-gold bg-jgs-gold/15 text-jgs-ivory font-semibold'
                      : 'border-white/10 bg-jgs-plum-deep/60 text-jgs-ivory-muted hover:text-jgs-ivory'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-jgs-gold mb-1.5">
              {isId
                ? 'PASAL 3, SUMPAH PEMUTUS ARUS EMOSI (ANTI-MARTINGALE):'
                : 'ARTICLE 3, EMOTIONAL CIRCUIT BREAKER PLEDGE:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                '2x Loss Berturut-Turut = Langsung Tutup MT5 24 Jam (Anti Balas Dendam)',
                'Haram Geser Stop Loss atau Tambah Lot Saat Floating Minus (Zero Martingale)',
                '1x Target 2R Tercapai = Kunci Profit & Tutup Chart Hari Itu',
                'Wajib Catat Emosi & Screenshot FVG di JGS Journal Sebelum Buka Posisi Baru',
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCooldownPledge(opt)}
                  className={`text-left rounded-xl border p-2.5 text-xs transition-all ${
                    cooldownPledge === opt
                      ? 'border-jgs-gold bg-jgs-gold/15 text-jgs-ivory font-semibold'
                      : 'border-white/10 bg-jgs-plum-deep/60 text-jgs-ivory-muted hover:text-jgs-ivory'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border-2 border-jgs-gold/45 bg-jgs-plum-deep p-6 space-y-4 shadow-gold-glow">
          <div className="border-b border-jgs-gold/25 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-jgs-gold block">
              MY $10 TRADING CONSTITUTION // #{gangId || '2702285126'}
            </span>
            <h4 className="font-display text-xl font-bold text-jgs-ivory mt-1">
              <span className="text-jgs-gold">{strategistName || 'Asep Garpit'}</span> is a part of the jey gang
            </h4>
            <p className="font-display italic text-xs text-jgs-ivory-muted">
              &ldquo;Here&apos;s where strategist champions are made.&rdquo;
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="rounded-xl border border-white/10 bg-jgs-plum-surface/80 p-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-jgs-gold block">
                ARTICLE I • CAPITAL & RISK MANDATE
              </span>
              <p className="text-jgs-ivory mt-1 font-medium">{capitalRule}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-jgs-plum-surface/80 p-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-jgs-gold block">
                ARTICLE II • ICT KILLZONE & SETUP FILTER
              </span>
              <p className="text-jgs-ivory mt-1 font-medium">{killzoneSession}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-jgs-plum-surface/80 p-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-jgs-gold block">
                ARTICLE III • CIRCUIT BREAKER PLEDGE
              </span>
              <p className="text-jgs-ivory mt-1 font-medium">{cooldownPledge}</p>
            </div>
          </div>

          <p className="font-mono text-[10px] text-center text-jgs-ivory-faint pt-1">
            SMALL CAPITAL. SERIOUS STRATEGY. • PRECISION OVER PROMISES.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. LIVE COLLECTIVE MEMBER SHOWCASE ("WALL OF THE JEY GANG")
// ============================================================================

export function JgsLiveGangTicker({ locale }: { locale: 'id' | 'en' }) {
  const isId = locale === 'id';
  const [roster, setRoster] = useState(() => getLiveGangRoster());
  const [session, setSession] = useState<StrategistUserSession | null>(null);

  useEffect(() => {
    const sync = () => {
      setRoster(getLiveGangRoster());
      setSession(loadStrategistSession());
    };
    sync();
    window.addEventListener('jgs-session-change', sync);
    return () => window.removeEventListener('jgs-session-change', sync);
  }, []);

  return (
    <div className="rounded-3xl border border-jgs-gold/30 bg-jgs-plum-surface/75 p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-jgs-gold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            THE JEY GANG COLLECTIVE // WALL OF STRATEGISTS
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-jgs-ivory mt-1">
            {isId
              ? 'Gerakan Trader Mikro yang Menolak Judi & Sinyal Buta'
              : 'The Micro-Capital Movement Rejecting Gambling & Blind Signals'}
          </h3>
          <p className="text-xs sm:text-sm text-jgs-ivory-muted mt-1">
            &ldquo;Here&apos;s where strategist champions are made.&rdquo;
          </p>
        </div>

        <Link
          href={session ? `/${locale}/account` : `/${locale}/register`}
          className="inline-flex items-center gap-2 rounded-xl bg-jgs-gold px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-jgs-plum-deep hover:bg-jgs-gold-light transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4" />
          {session
            ? isId
              ? `GANG MEMBER ID: #${session.gangId || '2702285126'}`
              : `GANG MEMBER ID: #${session.gangId || '2702285126'}`
            : isId
            ? 'Klaim Gang Member ID Gratis'
            : 'Claim Free Gang Member ID'}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roster.slice(0, 6).map((member) => (
          <div
            key={member.gangId}
            className="rounded-2xl border border-white/10 bg-jgs-plum-deep/80 p-4 flex flex-col justify-between gap-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-jgs-gold/45"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-jgs-gold tracking-wider">
                GANG MEMBER ID: #{member.gangId}
              </span>
              <span className="rounded-md border border-jgs-gold/30 bg-jgs-gold/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-jgs-gold">
                {member.beltLabel}
              </span>
            </div>

            <div>
              <p className="font-display text-base font-bold text-jgs-ivory leading-snug">
                <span className="text-jgs-gold">{member.fullName}</span> is a part of the jey gang
              </p>
              <p className="font-display italic text-[11px] text-jgs-ivory-muted mt-0.5">
                &ldquo;Here&apos;s where strategist champions are made.&rdquo;
              </p>
            </div>

            <div className="border-t border-white/5 pt-2 flex items-center justify-between font-mono text-[10px] text-jgs-ivory-faint">
              <span>{member.joinedLabel}</span>
              <span>1,000 USC DIV</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
