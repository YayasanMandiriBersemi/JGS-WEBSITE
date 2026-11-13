'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  OnboardingDossier,
  loadOnboardingDossier,
  saveOnboardingDossier,
} from '@/lib/storage/jgs-local-store';
import { useLocale } from '@/i18n/LocaleContext';
import {
  Crown,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Calculator,
  BookOpen,
  Gamepad2,
} from 'lucide-react';
import { JeyStrategistCallout } from '@/components/brand/JeyStrategistCallout';
import { JgsTradingConstitutionGenerator } from '@/components/account/JgsVaultGatekeeper';

export function OnboardingWizard() {
  const { locale, isId, l } = useLocale();
  const loc = (locale === 'en' ? 'en' : 'id') as 'id' | 'en';
  const [capitalTier, setCapitalTier] = useState<OnboardingDossier['capitalTier']>('MICRO_10_25');
  const [experienceLevel, setExperienceLevel] =
    useState<OnboardingDossier['experienceLevel']>('BEGINNER');
  const [primaryInstrument, setPrimaryInstrument] =
    useState<OnboardingDossier['primaryInstrument']>('XAUUSD');
  const [primaryChallenge, setPrimaryChallenge] =
    useState<OnboardingDossier['primaryChallenge']>('SIZING');
  const [savedDossier, setSavedDossier] = useState<OnboardingDossier | null>(null);

  useEffect(() => {
    const existing = loadOnboardingDossier();
    if (existing) {
      setSavedDossier(existing);
      setCapitalTier(existing.capitalTier);
      setExperienceLevel(existing.experienceLevel);
      setPrimaryInstrument(existing.primaryInstrument);
      setPrimaryChallenge(existing.primaryChallenge);
    }
  }, []);

  function handleGenerateDossier(e: React.FormEvent) {
    e.preventDefault();

    const capitalMap: Record<OnboardingDossier['capitalTier'], number> = {
      DEMO: 25,
      MICRO_10_25: 25,
      BUILDER_25_100: 50,
      PLUS_100: 150,
    };

    const recommendedCapitalUsd = capitalMap[capitalTier];
    const recommendedCapitalUsc = recommendedCapitalUsd * 100;
    const recommendedRiskPercent = experienceLevel === 'BEGINNER' ? 0.75 : 1.0;
    const recommendedDailyLossCapPercent = 3.0;

    let recommendedTrackSlug = 'why-small-accounts-blow-up';
    let recommendedTrackTitle = isId
      ? 'Bab 01: Fondasi Modal Mikro & Spesifikasi Broker'
      : 'Track 01: Micro-Capital Foundations & Broker Specifications';
    let recommendedScenarioId = 'london-gold-sweep';

    if (primaryChallenge === 'EMOTION') {
      recommendedTrackSlug = 'circuit-breakers-and-daily-loss-limits';
      recommendedTrackTitle = isId
        ? 'Bab 03: Rekayasa Risiko & Circuit Breaker Harian'
        : 'Track 03: Risk Engineering & Daily Circuit Breakers';
      recommendedScenarioId = 'revenge-spiral-breaker';
    } else if (primaryChallenge === 'EXECUTION') {
      recommendedTrackSlug = 'anatomy-of-xauusd-gold';
      recommendedTrackTitle = isId
        ? 'Bab 02: Struktur Sesi Emas (XAUUSD) & Forex'
        : 'Track 02: Gold (XAUUSD) & Session Structure';
      recommendedScenarioId = 'cpi-news-whipsaw';
    } else if (primaryChallenge === 'EA_SETUP' || experienceLevel === 'ALGO_CURIOUS') {
      recommendedTrackSlug = 'how-expert-advisors-think-vs-martingale-danger';
      recommendedTrackTitle = isId
        ? 'Bab 04: Eksekusi MT5 & Literasi Algoritmik'
        : 'Track 04: MT5 Execution & Algorithmic Literacy';
      recommendedScenarioId = 'twenty-dollar-survival-test';
    }

    const jeyPersonalBrief = isId
      ? `Dengan titik awal sekitar $${recommendedCapitalUsd} USD (${recommendedCapitalUsc.toLocaleString()} USC), contoh batas risiko konservatif per transaksi adalah ${recommendedRiskPercent}% (${((recommendedCapitalUsc * recommendedRiskPercent) / 100).toFixed(0)} USC per trade) dengan batas kerugian harian (Daily Circuit Breaker) sebesar ${recommendedDailyLossCapPercent}%. Selalu periksa spesifikasi kontrak simbol broker Anda sebelum membuka posisi.`
      : `With a starting baseline around $${recommendedCapitalUsd} USD (${recommendedCapitalUsc.toLocaleString()} USC), a conservative sample single-trade risk cap is ${recommendedRiskPercent}% (${((recommendedCapitalUsc * recommendedRiskPercent) / 100).toFixed(0)} USC per trade) paired with a ${recommendedDailyLossCapPercent}% Daily Circuit Breaker. Always verify your broker’s symbol contract specifications before placing an order.`;

    const dossier: OnboardingDossier = {
      completedAt: new Date().toISOString(),
      capitalTier,
      experienceLevel,
      primaryInstrument,
      primaryChallenge,
      recommendedCapitalUsd,
      recommendedCapitalUsc,
      recommendedRiskPercent,
      recommendedDailyLossCapPercent,
      recommendedTrackSlug,
      recommendedTrackTitle,
      recommendedScenarioId,
      jeyPersonalBrief,
    };

    saveOnboardingDossier(dossier);
    setSavedDossier(dossier);
  }

  function handleReset() {
    setSavedDossier(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="jgs-panel p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#D6A937] bg-[#17131D] shrink-0">
          <img
            src="/images/jey-mascot.png"
            alt="Jey, Chief Risk Strategist"
            width={80}
            height={80}
            decoding="async"
            className="jgs-mascot-crop"
          />
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs text-[#D4AF37] font-semibold">
            <Crown className="w-3.5 h-3.5" />
            <span>
              {isId ? 'PANDUAN AWAL INTERAKTIF BERSAMA JEY' : 'INTERACTIVE ONBOARDING WITH JEY'}
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F7F4EE]">
            {isId
              ? 'Susun Rencana Belajar & Parameter Risiko Anda'
              : 'Build Your Personalized Strategy & Learning Plan'}
          </h1>
          <p className="text-sm text-[#B8B0C8] leading-relaxed">
            {isId
              ? 'Jawab 4 pertanyaan singkat mengenai rencana belajar, pengalaman, dan tantangan utama Anda. Jey akan menyusun rekomendasi modul dan kalkulator gratis yang paling tepat.'
              : 'Answer 4 straightforward questions about your starting goals, experience, and challenges. Jey will configure a tailored learning roadmap and free calculator setup.'}
          </p>
        </div>
      </div>

      {/* Diagnostic Form */}
      <form onSubmit={handleGenerateDossier} className="space-y-6">
        {/* Step 1: Capital Tier */}
        <div className="jgs-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#D4AF37] font-semibold">
              {isId ? 'LANGKAH 01 DARI 04 • SIMULASI MODAL' : 'STEP 01 OF 04 • STARTING CAPITAL TIER'}
            </span>
            <span className="text-xs text-[#BEB6CE]">
              {isId ? 'Pilih salah satu' : 'Select one'}
            </span>
          </div>
          <h2 className="font-display text-lg font-bold text-[#F7F4EE]">
            {isId
              ? 'Berapa ukuran modal yang ingin Anda pelajari atau simulasikan?'
              : 'How much capital are you planning to practice or study with?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'DEMO',
                title: isId ? '$0 (Fokus Simulasi)' : '$0 (Simulation First)',
                desc: isId
                  ? 'Saya ingin belajar konsep dasar tanpa mengeluarkan uang sepeser pun.'
                  : 'I want to learn core concepts in a risk-free simulation.',
              },
              {
                id: 'MICRO_10_25',
                title: '$10 – $25 Micro',
                desc: isId
                  ? '1.000 – 2.500 USC pada Akun Cent. Cocok untuk melatih disiplin ukuran lot.'
                  : '1,000 – 2,500 USC on a Cent Account. Ideal for practicing position sizing.',
              },
              {
                id: 'BUILDER_25_100',
                title: '$25 – $100 Builder',
                desc: isId
                  ? '2.500 – 10.000 USC. Fleksibilitas pembagian lot pada spesifikasi kontrak mikro.'
                  : '2,500 – 10,000 USC. Greater lot divisibility on micro-scaled specifications.',
              },
              {
                id: 'PLUS_100',
                title: '$100+ Strategist',
                desc: isId
                  ? '10.000+ USC atau sedang mempelajari sistem multi-posisi.'
                  : '10,000+ USC or studying systematic multi-position execution.',
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCapitalTier(item.id as OnboardingDossier['capitalTier'])}
                className={`text-left p-4 rounded-xl border transition-all ${
                  capitalTier === item.id
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F7F4EE]'
                    : 'bg-[#09060F] border-white/10 text-[#B8B0C8] hover:border-white/25'
                }`}
              >
                <div className="font-bold text-sm text-[#F3E5AB]">{item.title}</div>
                <p className="text-xs text-[#B8B0C8] mt-1 leading-relaxed">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Experience Level */}
        <div className="jgs-panel p-6 space-y-4">
          <span className="text-xs text-[#D4AF37] font-semibold">
            {isId ? 'LANGKAH 02 DARI 04 • PENGALAMAN SAAT INI' : 'STEP 02 OF 04 • CURRENT EXPERIENCE LEVEL'}
          </span>
          <h2 className="font-display text-lg font-bold text-[#F7F4EE]">
            {isId
              ? 'Di mana posisi perjalanan belajar trading Anda saat ini?'
              : 'Where are you right now on your trading journey?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'BEGINNER',
                title: isId ? 'Pemula Baru' : 'Complete Beginner',
                desc: isId
                  ? 'Istilah seperti pip, lot, spread, dan MT5 masih baru bagi saya.'
                  : 'Terms like pips, lots, spread, and MT5 are brand new to me.',
              },
              {
                id: 'TRIED_DEMO',
                title: isId ? 'Pernah Coba Demo / Akun Kecil' : 'Tried Demo / Small Account',
                desc: isId
                  ? 'Saya tahu cara membuka order di MT5, tetapi belum konsisten mengelola risiko.'
                  : 'I know how to place trades in MT5, but I want better risk consistency.',
              },
              {
                id: 'ACTIVE_MICRO',
                title: isId ? 'Trader Modal Mikro Aktif' : 'Active Micro-Trader',
                desc: isId
                  ? 'Saya sudah rutin trading Emas/FX dan membutuhkan kalkulator lot & jurnal.'
                  : 'I trade Gold/FX regularly and want tighter risk & journal tools.',
              },
              {
                id: 'ALGO_CURIOUS',
                title: isId ? 'Pembangun Sistem & EA' : 'MT5 & EA System Builder',
                desc: isId
                  ? 'Saya ingin mempelajari Expert Advisor (EA), backtest MT5, dan aturan kuantitatif.'
                  : 'I want to study Expert Advisors, MT5 backtesting, and quantitative rules.',
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setExperienceLevel(item.id as OnboardingDossier['experienceLevel'])
                }
                className={`text-left p-4 rounded-xl border transition-all ${
                  experienceLevel === item.id
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F7F4EE]'
                    : 'bg-[#09060F] border-white/10 text-[#B8B0C8] hover:border-white/25'
                }`}
              >
                <div className="font-bold text-sm text-[#F3E5AB]">{item.title}</div>
                <p className="text-xs text-[#B8B0C8] mt-1 leading-relaxed">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3 & Step 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="jgs-panel p-6 space-y-4">
            <span className="text-xs text-[#D4AF37] font-semibold">
              {isId ? 'LANGKAH 03 DARI 04 • FOKUS INSTRUMEN' : 'STEP 03 OF 04 • INSTRUMENT FOCUS'}
            </span>
            <h2 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId ? 'Instrumen apa yang paling ingin Anda pelajari?' : 'What markets interest you most?'}
            </h2>
            <div className="space-y-2.5">
              {[
                {
                  id: 'XAUUSD',
                  title: 'Spot Gold (XAUUSD)',
                  desc: isId
                    ? 'Volatilitas tinggi, membutuhkan ketelitian ukuran kontrak dan stop-loss struktural.'
                    : 'High volatility, clear London/NY session moves, requires careful contract sizing.',
                },
                {
                  id: 'FOREX_MAJORS',
                  title: 'Major Forex Pairs (EURUSD, GBPUSD, USDJPY)',
                  desc: isId
                    ? 'Likuiditas stabil dan spread rapat, sangat baik untuk mempelajari struktur.'
                    : 'Smooth liquidity, tight spreads, ideal for learning structure.',
                },
                {
                  id: 'BOTH',
                  title: isId ? 'Emas & Pasangan Forex Utama' : 'Both Gold & Major Forex',
                  desc: isId
                    ? 'Kombinasi lengkap instrumen utama.'
                    : 'Complete multi-asset micro-capital toolkit.',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setPrimaryInstrument(item.id as OnboardingDossier['primaryInstrument'])
                  }
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    primaryInstrument === item.id
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F7F4EE]'
                      : 'bg-[#09060F] border-white/10 text-[#B8B0C8] hover:border-white/25'
                  }`}
                >
                  <div className="font-bold text-sm text-[#F3E5AB]">{item.title}</div>
                  <div className="text-xs text-[#B8B0C8] mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="jgs-panel p-6 space-y-4">
            <span className="text-xs text-[#D4AF37] font-semibold">
              {isId ? 'LANGKAH 04 DARI 04 • TANTANGAN UTAMA' : 'STEP 04 OF 04 • PRIMARY OBSTACLE'}
            </span>
            <h2 className="font-display text-lg font-bold text-[#F7F4EE]">
              {isId
                ? 'Apa tantangan terbesar Anda saat ini?'
                : 'What is your #1 challenge right now?'}
            </h2>
            <div className="space-y-2.5">
              {[
                {
                  id: 'SIZING',
                  title: isId
                    ? 'Menghitung Ukuran Lot & Spesifikasi Kontrak'
                    : 'Calculating Lot Sizes & Stop Losses',
                  desc: isId
                    ? 'Saya ingin tahu cara menghitung ukuran lot yang aman untuk saldo kecil di MT5.'
                    : 'I want to know how to calculate safe lot sizes for my balance in MT5.',
                },
                {
                  id: 'EMOTION',
                  title: isId
                    ? 'FOMO & Emosi Saat Mengalami Kerugian'
                    : 'FOMO & Revenge Trading After a Loss',
                  desc: isId
                    ? 'Satu posisi rugi sering membuat saya ingin segera membalas pasar.'
                    : 'One losing trade tempts me to overtrade to win it back.',
                },
                {
                  id: 'EXECUTION',
                  title: isId
                    ? 'Terjebak Fakeout & Volatilitas Berita'
                    : 'Getting Caught in Fakeouts & News Spikes',
                  desc: isId
                    ? 'Harga sering menyentuh Stop-Loss sebelum bergerak ke arah analisis saya.'
                    : 'Price hits my Stop Loss wick and then moves in my direction.',
                },
                {
                  id: 'EA_SETUP',
                  title: isId
                    ? 'Memahami MT5 & Menguji Sistem EA Secara Aman'
                    : 'Understanding MT5 & Testing EAs Safely',
                  desc: isId
                    ? 'Saya ingin mempelajari EA dan backtest tanpa terjebak risiko Martingale.'
                    : 'I want to configure MT5 and audit EAs without Martingale traps.',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setPrimaryChallenge(item.id as OnboardingDossier['primaryChallenge'])
                  }
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    primaryChallenge === item.id
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F7F4EE]'
                      : 'bg-[#09060F] border-white/10 text-[#B8B0C8] hover:border-white/25'
                  }`}
                >
                  <div className="font-bold text-sm text-[#F3E5AB]">{item.title}</div>
                  <div className="text-xs text-[#B8B0C8] mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button type="submit" className="jgs-btn-gold text-sm px-8 py-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isId ? 'Buat Rekomendasi Jalur Belajar Saya' : 'Generate My Strategy Roadmap'}
            </span>
          </button>
          {savedDossier && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B8B0C8] hover:text-[#F7F4EE]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isId ? 'Sembunyikan Rekomendasi' : 'Hide Current Dossier'}</span>
            </button>
          )}
        </div>
      </form>

      {/* Output Strategy Dossier */}
      {savedDossier && (
        <div className="jgs-panel p-6 sm:p-8 border-[#10B981]/50 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs text-[#10B981] font-semibold">
                {isId
                  ? 'REKOMENDASI BELAJAR AKTIF • TERSIMPAN DI PERANGKAT ANDA'
                  : 'ACTIVE LEARNING ROADMAP • SAVED TO LOCAL PROFILE'}
              </span>
              <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-1">
                {isId
                  ? 'Contoh Parameter Risiko & Langkah Belajar Anda'
                  : 'Your Sample Risk Parameters & Learning Steps'}
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              {isId ? 'SIAP DIPELAJARI' : 'READY'}
            </span>
          </div>

          <JeyStrategistCallout
            title={isId ? 'CATATAN JEY UNTUK ANDA' : "JEY'S DIAGNOSTIC BRIEFING"}
            ruleText={savedDossier.jeyPersonalBrief}
            contextTag={isId ? 'PETA BELAJAR PERSONAL' : 'PERSONALIZED ROADMAP'}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 tabular-nums">
            <div className="bg-[#09060F] p-4 rounded-xl border border-white/10">
              <div className="text-xs text-[#BEB6CE]">
                {isId ? 'Contoh Satuan Saldo' : 'Sample Denomination'}
              </div>
              <div className="text-lg font-bold text-[#D4AF37] mt-1">
                {savedDossier.recommendedCapitalUsc.toLocaleString()} USC
              </div>
              <div className="text-xs text-[#B8B0C8]">
                (${savedDossier.recommendedCapitalUsd} USD Cent)
              </div>
            </div>
            <div className="bg-[#09060F] p-4 rounded-xl border border-white/10">
              <div className="text-xs text-[#BEB6CE]">
                {isId ? 'Contoh Risiko / Trade' : 'Sample Risk / Trade'}
              </div>
              <div className="text-lg font-bold text-[#10B981] mt-1">
                {savedDossier.recommendedRiskPercent}% (1R)
              </div>
              <div className="text-xs text-[#B8B0C8]">
                {(
                  (savedDossier.recommendedCapitalUsc * savedDossier.recommendedRiskPercent) /
                  100
                ).toFixed(0)}{' '}
                USC / Stop Loss
              </div>
            </div>
            <div className="bg-[#09060F] p-4 rounded-xl border border-white/10">
              <div className="text-xs text-[#BEB6CE]">
                {isId ? 'Batas Rugi Harian' : 'Daily Loss Lock'}
              </div>
              <div className="text-lg font-bold text-[#F59E0B] mt-1">
                -{savedDossier.recommendedDailyLossCapPercent}% Cap
              </div>
              <div className="text-xs text-[#B8B0C8]">
                {isId ? 'Berhenti jika tercapai' : 'Stop for the day if hit'}
              </div>
            </div>
            <div className="bg-[#09060F] p-4 rounded-xl border border-white/10">
              <div className="text-xs text-[#BEB6CE]">
                {isId ? 'Contoh Rasio R:R' : 'Sample Target R:R'}
              </div>
              <div className="text-lg font-bold text-[#F7F4EE] mt-1">1 : 2.0+</div>
              <div className="text-xs text-[#B8B0C8]">
                {isId ? 'Impas pada 33,3% win rate' : '33.3% breakeven win rate'}
              </div>
            </div>
          </div>

          {/* 3-Step Action Launchpad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <Link
              href={l(`/academy/${savedDossier.recommendedTrackSlug}`)}
              className="jgs-panel-interactive p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                  <BookOpen className="w-4 h-4" />
                  <span>{isId ? 'MODUL PRIORITAS' : 'PRIORITY LESSON'}</span>
                </div>
                <div className="font-display font-bold text-base text-[#F7F4EE] mt-2">
                  {savedDossier.recommendedTrackTitle}
                </div>
                <p className="text-xs text-[#B8B0C8] mt-1">
                  {isId
                    ? 'Mulai dari modul interaktif ini yang disesuaikan dengan profil Anda.'
                    : 'Start with this interactive lesson tailored to your diagnostic.'}
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-[#D4AF37] flex items-center gap-1">
                <span>{isId ? 'Baca Modul' : 'Read Lesson'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href={l('/calculators/cent')}
              className="jgs-panel-interactive p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#10B981]">
                  <Calculator className="w-4 h-4" />
                  <span>{isId ? 'KALKULATOR RISIKO' : 'SIZING LABORATORY'}</span>
                </div>
                <div className="font-display font-bold text-base text-[#F7F4EE] mt-2">
                  {isId
                    ? `Simulasikan ${savedDossier.recommendedCapitalUsc.toLocaleString()} USC di Cent Lab`
                    : `Configure ${savedDossier.recommendedCapitalUsc.toLocaleString()} USC Cent Sizer`}
                </div>
                <p className="text-xs text-[#B8B0C8] mt-1">
                  {isId
                    ? `Hitung ukuran lot berdasarkan spesifikasi simbol ${savedDossier.primaryInstrument} sebelum membuka MT5.`
                    : `Calculate exact lot size for ${savedDossier.primaryInstrument} symbol specs before opening MT5.`}
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-[#10B981] flex items-center gap-1">
                <span>{isId ? 'Buka Cent Lab' : 'Open Cent Calculator'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href={l('/playground')}
              className="jgs-panel-interactive p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#A882DD]">
                  <Gamepad2 className="w-4 h-4" />
                  <span>{isId ? 'LATIHAN SKENARIO' : 'PRACTICE SCENARIO'}</span>
                </div>
                <div className="font-display font-bold text-base text-[#F7F4EE] mt-2">
                  {isId
                    ? 'Uji Keputusan di Trading Playground'
                    : 'Test Your Decisions in the Playground'}
                </div>
                <p className="text-xs text-[#B8B0C8] mt-1">
                  {isId
                    ? 'Pelajari skenario historis candle demi candle tanpa risiko finansial.'
                    : 'Replay a historical setup bar-by-bar with zero financial risk.'}
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-[#A882DD] flex items-center gap-1">
                <span>{isId ? 'Buka Playground' : 'Launch Scenario'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

          <div className="pt-4">
            <JgsTradingConstitutionGenerator locale={loc} />
          </div>
        </div>
      )}
    </div>
  );
}
