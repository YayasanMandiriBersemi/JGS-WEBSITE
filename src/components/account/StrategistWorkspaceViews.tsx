'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  loadStrategistSession,
  saveStrategistSession,
  loadOnboardingDossier,
  loadCompletedLessonSlugs,
  loadRiskPresets,
  loadJournalEntries,
  generateTenDigitGangId,
  StrategistUserSession,
  OnboardingDossier,
  SavedRiskRulePreset,
} from '@/lib/storage/jgs-local-store';
import { ACADEMY_LESSONS } from '@/lib/data/academy-lessons';
import { JeyStrategistCallout } from '@/components/brand/JeyStrategistCallout';
import {
  JgsCollectibleGangCard,
  JgsLiveGangTicker,
  JgsTradingConstitutionGenerator,
} from '@/components/account/JgsVaultGatekeeper';
import { MythologicalRankShowcase } from '@/components/account/MythologicalRankShowcase';
import { useLocale } from '@/i18n/LocaleContext';
import {
  UserCheck,
  LogOut,
  Database,
  Compass,
  BookOpen,
  Calculator,
  NotebookPen,
  Crown,
  Lock,
  Unlock,
  ArrowRight,
  AlertTriangle,
  ShieldCheck,
  Users,
  RefreshCw,
} from 'lucide-react';

export function CommunityView() {
  const { locale, isId, l } = useLocale();
  const loc = (locale === 'en' ? 'en' : 'id') as 'id' | 'en';

  const charterArticles = isId
    ? [
        {
          code: 'PASAL 01',
          title: 'Mengukur Keberhasilan dalam R-Multiple, Bukan Pamer Nominal Uang',
          detail:
            'Baik menggunakan Akun Cent 1,000 USC ($10) maupun akun $25,000, diskusi dan evaluasi di komunitas The Jey Gang selalu menggunakan satuan R-Multiple (+2.2R, -1.0R) dan persentase risiko.',
        },
        {
          code: 'PASAL 02',
          title: 'Wajib Menggunakan Stop-Loss & Konfirmasi ICT (BSL/SSL + MSS + FVG)',
          detail:
            'Setiap transaksi manual maupun algoritmik yang didiskusikan wajib memiliki titik invalidasi struktural (Stop-Loss), jam Killzone yang jelas, dan perhitungan lot sebelum entry.',
        },
        {
          code: 'PASAL 03',
          title: 'Disiplin Batas Kerugian Harian (Daily Circuit Breaker 3%)',
          detail:
            'Ketika mengalami 2x Loss berturut-turut (20 USC pada akun 1,000 USC), protokol kami adalah menutup MT5 selama 24 jam, mencatat jurnal, dan beristirahat.',
        },
        {
          code: 'PASAL 04',
          title: 'Kejujuran Data Tanpa Janji Profit Pasti',
          detail:
            'Tidak ada anggota atau pengajar yang boleh menjanjikan keuntungan pasti atau mempromosikan bot Martingale tanpa batas. Setup gagal dibedah secara jujur di Ruang Otopsi.',
        },
      ]
    : [
        {
          code: 'ARTICLE 01',
          title: 'We Measure in R-Multiples, Never Ego Dollars',
          detail:
            'Whether trading a 1,000 USC ($10) Cent Account or a $25,000 account, setups in The Jey Gang are evaluated in R-Multiples (+2.2R, -1.0R) and Risk %.',
        },
        {
          code: 'ARTICLE 02',
          title: 'Defined Stop Losses & ICT Confirmation (BSL/SSL + MSS + FVG)',
          detail:
            'Every manual or algorithmic trade discussed must define its structural invalidation point (Stop Loss), Killzone window, and verified lot size before entry.',
        },
        {
          code: 'ARTICLE 03',
          title: 'Respecting Daily Circuit Breakers (3% Daily Cap)',
          detail:
            'When a trader hits 2 consecutive losses (20 USC on a 1,000 USC account), protocol is to close MT5 for 24 hours, log the journal, and step away.',
        },
        {
          code: 'ARTICLE 04',
          title: 'Anti-Hype Data Honesty & Transparent Audits',
          detail:
            'No member or educator may promise guaranteed returns or promote uncapped Martingale grid bots. Failed setups are dissected honestly in the Autopsy Room.',
        },
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div className="jgs-panel p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-jgs-gold">
          <Users className="w-4 h-4" />
          <span>
            {isId
              ? 'THE JEY GANG COLLECTIVE & PIAGAM DISIPLIN RISIKO'
              : 'THE JEY GANG COLLECTIVE & RISK DISCIPLINE CHARTER'}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-jgs-ivory">
          {isId
            ? 'Gerakan Trader Mikro yang Menolak Judi & Sinyal Buta'
            : 'A Micro-Capital Movement Rejecting Gambling & Blind Signals'}
        </h1>
        <p className="text-sm sm:text-base text-jgs-ivory-muted max-w-3xl leading-relaxed">
          {isId
            ? 'Komunitas THE JEY GANG STRATEGIST dibangun untuk trader yang memperlakukan modal $10 (1,000 USC) dengan disiplin ICT/SMC dan ketelitian matematika yang sama seriusnya dengan institusi.'
            : 'THE JEY GANG STRATEGIST collective is built for traders who treat a $10 (1,000 USC) balance with the same ICT/SMC discipline and mathematical rigor as an institution.'}
        </p>
      </div>

      {/* Live Collective Member Showcase ("Wall of The Jey Gang") */}
      <JgsLiveGangTicker locale={loc} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {charterArticles.map((item) => (
          <div key={item.code} className="jgs-panel p-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-jgs-gold font-bold">{item.code}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="font-display text-xl font-bold text-jgs-ivory">{item.title}</h2>
            <p className="text-sm text-jgs-ivory-muted leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* Engine 3: My $10 Trading Constitution Wallpaper Generator */}
      <JgsTradingConstitutionGenerator locale={loc} />

      <JeyStrategistCallout
        ruleText={
          isId
            ? 'Di The Jey Gang, kami jauh lebih menghargai trader yang berhenti sesuai batas kerugian hariannya (20-30 USC) daripada spekulan yang mempertaruhkan seluruh saldo akunnya dalam satu candle berita.'
            : 'In The Jey Gang, we respect a trader who stops at their planned daily loss limit (20-30 USC) far more than a gambler who risks their entire account on a single news candle.'
        }
        contextTag={isId ? 'BUDAYA KOMUNITAS' : 'COLLECTIVE CULTURE'}
      />
    </div>
  );
}

export function AccountView() {
  const { locale, isId, l } = useLocale();
  const loc = (locale === 'en' ? 'en' : 'id') as 'id' | 'en';
  const [session, setSession] = useState<StrategistUserSession | null>(null);
  const [dossier, setDossier] = useState<OnboardingDossier | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [presets, setPresets] = useState<SavedRiskRulePreset[]>([]);
  const [journalCount, setJournalCount] = useState<number>(0);

  useEffect(() => {
    const sync = () => {
      setSession(loadStrategistSession());
      setDossier(loadOnboardingDossier());
      setCompletedLessons(loadCompletedLessonSlugs());
      setPresets(loadRiskPresets());
      setJournalCount(loadJournalEntries().length);
    };
    sync();
    window.addEventListener('jgs-session-change', sync);
    return () => window.removeEventListener('jgs-session-change', sync);
  }, []);

  function handleSignOut() {
    saveStrategistSession(null);
    setSession(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="jgs-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-jgs-gold bg-jgs-purple/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jey-mascot.png"
              alt="Strategist Avatar"
              width={56}
              height={56}
              decoding="async"
              className="jgs-mascot-crop"
            />
          </div>
          <div>
            <span className="text-xs text-jgs-gold font-semibold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              {session
                ? isId
                  ? `OFFICIAL MEMBER OF THE JEY GANG • GANG MEMBER ID: #${session.gangId || '2702285126'}`
                  : `OFFICIAL MEMBER OF THE JEY GANG • GANG MEMBER ID: #${session.gangId || '2702285126'}`
                : isId
                ? 'RUANG KERJA TAMU LOKAL (BELUM KLAIM GANG MEMBER ID)'
                : 'LOCAL GUEST WORKSPACE (GANG MEMBER ID NOT CLAIMED YET)'}
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-jgs-ivory">
              {session
                ? `${session.displayName} is a part of the jey gang`
                : isId
                ? 'Profil Tamu JGS'
                : 'Guest Strategist Profile'}
            </h1>
            <p className="text-xs text-jgs-ivory-muted">
              {session
                ? `"Here's where strategist champions are made." • ${session.email}`
                : isId
                ? 'Klaim 10-Digit Gang Member ID gratis Anda untuk membuka Riset Market, Strategi ICT/EA, dan Performa.'
                : 'Claim your free 10-Digit Gang Member ID to unlock Market Research, ICT/EA Strategy, and Performance Vaults.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="jgs-btn-outline text-xs py-2 px-4"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>{isId ? 'Keluar' : 'Sign Out'}</span>
            </button>
          ) : (
            <Link href={l('/register')} className="jgs-btn-gold text-xs py-2.5 px-5">
              <span>{isId ? 'Klaim Gang Member ID Gratis ->' : 'Claim Free Gang Member ID ->'}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Official Collectible Gang ID Card + Mythological Progression + PNG Download */}
      <JgsCollectibleGangCard
        locale={loc}
        name={session?.displayName || 'Asep Garpit'}
        gangId={session?.gangId || '2702285126'}
      />

      {/* 8-Stage Ancient Mythological Rank Showcase */}
      <div className="jgs-panel p-6 sm:p-8">
        <MythologicalRankShowcase locale={loc} completedSlugsOverride={completedLessons} />
      </div>

      {/* Vault Access Status Bar */}
      <div className="rounded-2xl border border-jgs-gold/30 bg-jgs-plum-surface/75 p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-jgs-gold">
            {session ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4" />}
            <span>
              {session
                ? isId
                  ? 'STATUS VAULT: TERBUKA PENUH (RISET, QUANT LAB, & AUDIT PERFORMA)'
                  : 'VAULT STATUS: FULLY UNLOCKED (RESEARCH, QUANT LAB, & PERFORMANCE)'
                : isId
                ? 'STATUS VAULT: TERKUNCI, DAFTAR GRATIS 10 DETIK UNTUK MEMBUKA'
                : 'VAULT STATUS: LOCKED, REGISTER FREE IN 10 SECONDS TO UNLOCK'}
            </span>
          </div>
          <p className="text-xs text-jgs-ivory-muted">
            {isId
              ? 'Gunakan akses anggota Anda untuk menjelajahi 3 pilar eksklusif The Jey Gang di bawah ini:'
              : 'Use your collective membership to explore the 3 exclusive Jey Gang Vault pillars below:'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={l('/research')} className="jgs-btn-outline text-xs py-2 px-3.5">
            {isId ? 'Riset Market' : 'Market Research'}
          </Link>
          <Link href={l('/quant-lab')} className="jgs-btn-outline text-xs py-2 px-3.5">
            Quant Lab & EA
          </Link>
          <Link href={l('/performance')} className="jgs-btn-outline text-xs py-2 px-3.5">
            {isId ? 'Audit Performa' : 'Performance Audit'}
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link href={l('/onboarding')} className="jgs-panel-interactive p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-jgs-gold">
            <span>{isId ? 'PETA BELAJAR' : 'ONBOARDING PLAN'}</span>
            <Compass className="w-4 h-4" />
          </div>
          <div className="font-display text-xl font-bold text-jgs-ivory">
            {dossier
              ? `${dossier.recommendedCapitalUsc.toLocaleString()} USC`
              : isId
              ? '1,000 USC ($10)'
              : '1,000 USC ($10)'}
          </div>
          <p className="text-xs text-jgs-ivory-muted">
            {dossier
              ? `${isId ? 'Risiko' : 'Risk'}: ${dossier.recommendedRiskPercent}% • ${
                  dossier.primaryInstrument
                }`
              : isId
              ? 'Klik untuk menyusun rencana belajar'
              : 'Click to complete the 4-step guide'}
          </p>
        </Link>

        <Link href={l('/academy')} className="jgs-panel-interactive p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
            <span>{isId ? 'PROGRES ACADEMY' : 'ACADEMY PROGRESS'}</span>
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="font-display text-xl font-bold text-jgs-ivory">
            {completedLessons.length} / {ACADEMY_LESSONS.length}{' '}
            {isId ? 'Modul' : 'Modules'}
          </div>
          <p className="text-xs text-jgs-ivory-muted">
            {Math.round((completedLessons.length / ACADEMY_LESSONS.length) * 100)}%{' '}
            {isId ? 'kurikulum selesai (Sabuk Strategist)' : 'curriculum completed'}
          </p>
        </Link>

        <Link href={l('/calculators/cent')} className="jgs-panel-interactive p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-jgs-purple-glow">
            <span>{isId ? 'PRESET KALKULATOR' : 'SAVED RISK PRESETS'}</span>
            <Calculator className="w-4 h-4" />
          </div>
          <div className="font-display text-xl font-bold text-jgs-ivory">
            {presets.length} {isId ? 'Tersimpan' : 'Saved'}
          </div>
          <p className="text-xs text-jgs-ivory-muted">
            {isId ? 'Konfigurasi ukuran lot di Cent Lab' : 'Saved Cent Lab sizing configurations'}
          </p>
        </Link>

        <Link href={l('/journal')} className="jgs-panel-interactive p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-jgs-gold-light">
            <span>{isId ? 'CATATAN JURNAL' : 'JOURNAL ENTRIES'}</span>
            <NotebookPen className="w-4 h-4" />
          </div>
          <div className="font-display text-xl font-bold text-jgs-ivory">
            {journalCount} {isId ? 'Transaksi' : 'Trades'}
          </div>
          <p className="text-xs text-jgs-ivory-muted">
            {isId
              ? 'Catatan disiplin & ekspektasi R'
              : 'Logged in your local Trader Journal'}
          </p>
        </Link>
      </div>

      {/* Engine 3: My $10 Trading Constitution */}
      <JgsTradingConstitutionGenerator locale={loc} />

      <div className="jgs-panel p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-jgs-gold">
          <Database className="w-4 h-4" />
          <span>
            {isId
              ? 'ARSITEKTUR PENYIMPANAN LOKAL & PRIVASI'
              : 'LOCAL-FIRST STORAGE & PRIVACY ARCHITECTURE'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-jgs-ivory-muted leading-relaxed">
          {isId
            ? 'Kartu Gang ID 10-Digit, progres Sabuk Strategist, preset kalkulator, dan catatan Jurnal Trader Anda disimpan secara aman di perangkat Anda (localStorage).'
            : 'Your 10-Digit Gang ID card, Strategist Belt progress, calculator presets, and Trader Journal entries are stored securely in your browser (localStorage).'}
        </p>
      </div>
    </div>
  );
}

export function LoginView() {
  const { locale, isId, l } = useLocale();
  const loc = (locale === 'en' ? 'en' : 'id') as 'id' | 'en';
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gangId, setGangId] = useState('2702285126');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setGangId(generateTenDigitGangId());
  }, []);

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage(
        isId
          ? 'Masukkan alamat email yang valid (contoh: trader@example.com).'
          : 'Please enter a valid email address (e.g. strategist@example.com).'
      );
      return;
    }
    if (password.length < 4) {
      setErrorMessage(
        isId
          ? 'Kata sandi minimal 4 karakter.'
          : 'Passphrase must be at least 4 characters long.'
      );
      return;
    }

    const nameFromEmail = cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    const cleanDigits = gangId.replace(/\D/g, '');
    saveStrategistSession({
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      displayName: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      role: 'STRATEGIST',
      signedInAt: new Date().toISOString(),
      gangId: cleanDigits.length === 10 ? cleanDigits : generateTenDigitGangId(),
      division: '1,000 USC MICRO-CAPITAL STRATEGIST',
    });
    router.push(l('/account'));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 jgs-panel p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-jgs-gold bg-jgs-purple/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jey-mascot.png"
              alt="Jey Mascot"
              width={48}
              height={48}
              decoding="async"
              className="jgs-mascot-crop"
            />
          </div>
          <div>
            <div className="text-xs text-jgs-gold font-semibold flex items-center gap-1">
              <Crown className="w-3.5 h-3.5" />
              <span>EXCLUSIVE ACCESS // MEMBER OF THE JEY GANG</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-jgs-ivory">
              {isId ? 'Masuk ke Member of The Jey Gang' : 'Sign In as Member of The Jey Gang'}
            </h1>
          </div>
        </div>

        <p className="text-xs text-jgs-ivory-muted leading-relaxed">
          {isId
            ? 'Masukkan Gang Member ID Anda atau daftar gratis dalam 10 detik untuk membuka Riset Market, Strategi ICT/EA, dan Performa.'
            : 'Enter your Gang Member ID or register free in 10 seconds to unlock Market Research, ICT/EA Strategy, and Performance.'}
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-xs text-red-300 flex items-start gap-2"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="jgs-label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="strategist@example.com"
              className="jgs-input"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="jgs-label">
              {isId ? 'Kata Sandi Vault' : 'Vault Passphrase'}
            </label>
            <input
              id="login-password"
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="jgs-input"
            />
          </div>

          <div>
            <label htmlFor="login-gang-id" className="jgs-label font-mono text-[11px] uppercase tracking-wider">
              {isId ? '10-DIGIT GANG MEMBER ID (Opsional)' : '10-DIGIT GANG MEMBER ID (Optional)'}
            </label>
            <input
              id="login-gang-id"
              type="text"
              maxLength={10}
              value={gangId}
              onChange={(e) => setGangId(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="jgs-input font-mono text-jgs-gold font-bold tracking-widest"
            />
          </div>

          <button type="submit" className="jgs-btn-gold w-full py-3 text-sm">
            <Unlock className="w-4 h-4" />
            <span>{isId ? 'Buka Kunci Vault & Masuk ->' : 'Unlock Vault & Sign In ->'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-jgs-ivory-muted">
          <span>{isId ? 'Belum punya Gang Member ID?' : 'Need a Gang Member ID?'}</span>
          <Link href={l('/register')} className="text-jgs-gold hover:underline font-semibold">
            {isId ? 'Klaim Gang Member ID Gratis →' : 'Claim Free Gang Member ID →'}
          </Link>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-4">
        <p className="font-mono text-xs uppercase tracking-widest text-jgs-gold">
          {isId ? 'PRATINJAU KARTU KOLEKTIBEL RESMI:' : 'OFFICIAL COLLECTIBLE CARD PREVIEW:'}
        </p>
        <JgsCollectibleGangCard
          locale={loc}
          name={email ? email.split('@')[0] : 'Asep Garpit'}
          gangId={gangId}
        />
      </div>
    </div>
  );
}

export function RegisterView() {
  const { locale, isId, l } = useLocale();
  const loc = (locale === 'en' ? 'en' : 'id') as 'id' | 'en';
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gangId, setGangId] = useState('2702285126');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setGangId(generateTenDigitGangId());
  }, []);

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    const cleanName = displayName.trim();
    const cleanEmail = email.trim();
    const cleanDigits = gangId.replace(/\D/g, '');

    if (cleanName.length < 2) {
      setErrorMessage(
        isId ? 'Nama lengkap / alias minimal 2 karakter.' : 'Full name / alias must be at least 2 characters.'
      );
      return;
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage(
        isId ? 'Masukkan alamat email yang valid.' : 'Please enter a valid email address.'
      );
      return;
    }
    if (password.length < 4) {
      setErrorMessage(
        isId
          ? 'Kata sandi minimal 4 karakter.'
          : 'Passphrase must be at least 4 characters.'
      );
      return;
    }

    saveStrategistSession({
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      displayName: cleanName,
      role: 'STRATEGIST',
      signedInAt: new Date().toISOString(),
      gangId: cleanDigits.length === 10 ? cleanDigits : generateTenDigitGangId(),
      division: '1,000 USC MICRO-CAPITAL STRATEGIST',
    });
    router.push(l('/account'));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 jgs-panel p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-jgs-gold bg-jgs-purple/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jey-mascot.png"
              alt="Jey Mascot"
              width={48}
              height={48}
              decoding="async"
              className="jgs-mascot-crop"
            />
          </div>
          <div>
            <div className="text-xs text-jgs-gold font-semibold flex items-center gap-1">
              <Crown className="w-3.5 h-3.5" />
              <span>OFFICIAL MEMBER OF THE JEY GANG (100% FREE)</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-jgs-ivory">
              {isId ? 'Klaim Gang Member ID Gratis' : 'Claim Free Gang Member ID'}
            </h1>
          </div>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-xs text-red-300 flex items-start gap-2"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="reg-name" className="jgs-label">
              {isId ? 'Nama Lengkap / Strategist Alias' : 'Full Name / Strategist Alias'}
            </label>
            <input
              id="reg-name"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Asep Garpit / Alfath Muhammad"
              className="jgs-input"
            />
          </div>

          <div>
            <label htmlFor="reg-email" className="jgs-label">
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="strategist@example.com"
              className="jgs-input"
            />
          </div>

          <div>
            <label htmlFor="reg-pass" className="jgs-label">
              {isId ? 'Kata Sandi Vault (Min. 4 Karakter)' : 'Vault Passphrase (Min. 4 Characters)'}
            </label>
            <input
              id="reg-pass"
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="jgs-input"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="reg-gang-id" className="jgs-label mb-0 font-mono text-[11px] uppercase tracking-wider text-jgs-gold">
                10-DIGIT GANG MEMBER ID
              </label>
              <button
                type="button"
                onClick={() => setGangId(generateTenDigitGangId())}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-jgs-gold hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                {isId ? 'Acak ID Baru' : 'Roll New ID'}
              </button>
            </div>
            <input
              id="reg-gang-id"
              type="text"
              inputMode="numeric"
              maxLength={10}
              required
              value={gangId}
              onChange={(e) => setGangId(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="2702285126"
              className="jgs-input font-mono font-bold tracking-widest text-jgs-gold"
            />
          </div>

          <button type="submit" className="jgs-btn-gold w-full py-3.5 text-sm">
            <span>
              {isId
                ? 'Klaim Gang Member ID & Buka Akses ->'
                : 'Claim Gang Member ID & Unlock Access ->'}
            </span>
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-jgs-ivory-muted">
          <span>{isId ? 'Sudah punya Gang Member ID?' : 'Already a Member of The Jey Gang?'}</span>
          <Link href={l('/login')} className="text-jgs-gold hover:underline font-semibold">
            {isId ? 'Masuk →' : 'Sign In →'}
          </Link>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-4">
        <p className="font-mono text-xs uppercase tracking-widest text-jgs-gold">
          {isId
            ? 'PRATINJAU KARTU ANGGOTA RESMI ANDA (SIAP UNDUH PNG):'
            : 'LIVE PREVIEW OF YOUR COLLECTIBLE GANG ID CARD (PNG READY):'}
        </p>
        <JgsCollectibleGangCard
          locale={loc}
          name={displayName || 'Asep Garpit'}
          gangId={gangId}
        />
      </div>
    </div>
  );
}
