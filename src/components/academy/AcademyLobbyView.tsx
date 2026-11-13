'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  ArrowRight,
  Lock,
  CheckCircle2,
  Award,
  BookOpen,
  Compass,
  FileText,
} from 'lucide-react';
import type { AcademyTrack, AcademyLesson } from '@/lib/data/academy-lessons';
import { loadThemeMode, type JgsThemeMode } from '@/lib/storage/jgs-local-store';
import { MotionReveal, SpotlightCard } from '@/components/ui/LuxuryMotion';
import { MythologicalRankShowcase } from '@/components/account/MythologicalRankShowcase';

interface AcademyLobbyViewProps {
  locale: 'id' | 'en';
  tracks: AcademyTrack[];
  lessons: AcademyLesson[];
  completedSlugs: string[];
  activePortal: 'lobby' | 'classroom' | 'certification';
  isExamUnlocked: boolean;
  onSwitchPortal: (nextTab: 'lobby' | 'classroom' | 'certification') => void;
  onEnterClassroom: (trackId?: string, lessonSlug?: string) => void;
  onOpenCertification: () => void;
}

interface AcademicYearFilter {
  id: string;
  labelId: string;
  labelEn: string;
  trackIds: string[];
}

const YEAR_FILTERS: AcademicYearFilter[] = [
  {
    id: 'year-1',
    labelId: 'Tahap I (Sem 1-5): Fondasi Uang, Makro, MT5, Sabuk 1.000 USC & Mentalitas',
    labelEn: 'Stage I (Sem 1-5): Money Physics, Macro, MT5, 1,000 USC Risk & Psychology',
    trackIds: ['track-01', 'track-02', 'track-03', 'track-04', 'track-11'],
  },
  {
    id: 'year-2',
    labelId: 'Tahap II (Sem 6-10): Struktur Pasar, Zona SNR, Wyckoff, Elliott & Order Flow',
    labelEn: 'Stage II (Sem 6-10): Market Structure, SNR Zones, Wyckoff, Waves & Volume Flow',
    trackIds: ['track-05', 'track-07-snr', 'track-06', 'track-07', 'track-08'],
  },
  {
    id: 'year-3',
    labelId: 'Tahap III (Sem 11-15): ICT Bank Flow, Kaizen, Konfirmasi & Gaya Eksekusi',
    labelEn: 'Stage III (Sem 11-15): ICT Smart Money, Kaizen, Confirmation, Entry & Execution Style',
    trackIds: ['track-09', 'track-10', 'track-11-conf', 'track-12-entry', 'track-15-style'],
  },
  {
    id: 'year-4',
    labelId: 'Tahap IV (Sem 16-20): News Makro, Multi-Pair Cent, COT, Quant & Komprehensif',
    labelEn: 'Stage IV (Sem 16-20): High-Impact News, Multi-Pair Cent, COT, Quant & Capstone',
    trackIds: ['track-16-news', 'track-13-pairs', 'track-14-cot', 'track-12', 'track-20-comp'],
  },
];

export function AcademyLobbyView({
  locale,
  tracks,
  lessons,
  completedSlugs,
  activePortal,
  isExamUnlocked,
  onSwitchPortal,
  onEnterClassroom,
  onOpenCertification,
}: AcademyLobbyViewProps) {
  const isId = locale === 'id';
  const [selectedIcebreaker, setSelectedIcebreaker] = useState<number | null>(null);
  const [activeYearId, setActiveYearId] = useState<string>('year-1');
  const [themeMode, setThemeMode] = useState<JgsThemeMode>('dark');

  useEffect(() => {
    setThemeMode(loadThemeMode());
    const syncTheme = () => setThemeMode(loadThemeMode());
    window.addEventListener('jgs-theme-change', syncTheme);
    return () => window.removeEventListener('jgs-theme-change', syncTheme);
  }, []);

  const isLightTheme = themeMode === 'light';
  const totalModules = lessons.length;
  const completedCount = completedSlugs.length;
  const totalSksEarned = lessons
    .filter((l) => completedSlugs.includes(l.slug))
    .reduce((acc, item) => acc + item.studio.sksCredits, 0);
  const totalSksPossible = lessons.reduce((acc, item) => acc + item.studio.sksCredits, 0);
  const isAllComplete = totalModules > 0 && completedCount >= totalModules;

  const icebreakers = [
    {
      btnId: 'Jessy, aku mulai dari nol mutlak di dunia finansial',
      btnEn: 'Jessy, I am starting from absolute zero in global finance',
      replyId:
        'Justru di sini tempat paling tepat. Di JGS Academy setiap materi dimulai dari prinsip pertama: apa itu uang fiat, mengapa modal $10 dikonversi ke 1.000 USC, hingga peta aliran likuiditas institusi, tanpa lompat langsung ke istilah rumit.',
      replyEn:
        'You are in the right sanctuary. Every course launches from first principles, from monetary mechanics and $10 = 1,000 USC sizing cleanly up to institutional order flow.',
      action: () => onEnterClassroom('track-01'),
      ctaId: 'Masuk Semester 01 (FIN-101) ->',
      ctaEn: 'Enter Semester 01 (FIN-101) ->',
    },
    {
      btnId: 'Bantu aku sembuh dari kebiasaan Margin Call modal kecil',
      btnEn: 'Help me permanently eliminate micro-capital Margin Calls',
      replyId:
        'Mayoritas pemula bukan kurang cerdas, tetapi salah menanggung kontrak 100 oz pada saldo $10. Di Semester 04 kita membedah konversi 1 oz XAUUSDc Cent dan pembulatan Floor 1% (10 USC per setup) agar saldo belajar punya 100 nyawa terukur.',
      replyEn:
        'Micro blowups come from 100 oz contracts crushing $10 equity. Semester 04 teaches exact 1 oz Cent calibration and 1% (10 USC) Floor Rounding for 100 measured practice runs.',
      action: () => onEnterClassroom('track-04'),
      ctaId: 'Buka Semester 04: Matematika Risiko $10 ->',
      ctaEn: 'Open Semester 04: $10 Risk Math ->',
    },
    {
      btnId: 'Bagaimana cara lulus ujian esai & meraih Ijazah JGS?',
      btnEn: 'How do I pass the module essays and unlock the Official Diploma?',
      replyId:
        'Setiap modul ditutup oleh kuis konsep dan ujian esai pemahaman yang menilai analisis sebab-akibat serta disiplin risiko 1.000 USC-mu. Setelah 60 modul (120 SKS) dan Ujian Akhir tuntas minimal 80%, Ijazah & Transkrip resmi bertanda tangan Founder Jahseya Mochtar Mawardi siap kamu cetak.',
      replyEn:
        'Each module closes with an analytical essay evaluated across four institutional rubric pillars. Finishing all 60 modules (120 Credits) and scoring >=80% on the Dynamic Final Exam unlocks Founder-signed Diploma & Transcript exports.',
      action: onOpenCertification,
      ctaId: 'Lihat Status Kelulusan & Syarat 120 SKS ->',
      ctaEn: 'Inspect Graduation Checklist & 120 SKS ->',
    },
  ];

  const activeReply = selectedIcebreaker !== null ? icebreakers[selectedIcebreaker] : null;
  const activeYear = YEAR_FILTERS.find((y) => y.id === activeYearId) ?? YEAR_FILTERS[0];
  const visibleTracks = tracks.filter((tr) => activeYear.trackIds.includes(tr.id));

  function scrollToDossier() {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('kurikulum-dossier');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div>
      {/* =====================================================================
          SECTION 3.1: FULL-BLEED ARCHITECTURAL LUXURY HERO (NO OUTER BOX!)
          ===================================================================== */}
      <section className="relative overflow-hidden py-24 md:py-32 border-b border-[#D6A937]/15">
        <div
          aria-hidden="true"
          className="jgs-ambient-pulse pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] w-[620px] rounded-full bg-purple-royal/20 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-1/4 h-[260px] w-[380px] rounded-full bg-[#D6A937]/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#D6A937] font-semibold">
            THE JEY GANG STRATEGIST • PRIVATE FINANCIAL &amp; QUANTITATIVE INSTITUTION
          </p>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.025em] text-center max-w-5xl mx-auto leading-[1.06] mt-6 text-[var(--text-ivory)]">
            {isId ? (
              <>
                Kuasai Industri Pasar Finansial.
                <br />
                <span className="bg-gradient-to-r from-[#D6A937] via-[#F4DF9E] to-[#C59B27] bg-clip-text text-transparent">
                  Dari Ritel Menuju Eksekusi Institusional.
                </span>
              </>
            ) : (
              <>
                Master Financial Markets.
                <br />
                <span className="bg-gradient-to-r from-[#D6A937] via-[#F4DF9E] to-[#C59B27] bg-clip-text text-transparent">
                  From Retail Foundations to Institutional Precision.
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto text-center mt-6 leading-relaxed opacity-85 text-[var(--text-secondary)]">
            {isId
              ? 'Kurikulum universitas 20 semester (60 Modul • 120 SKS) berbasis literatur ilmiah, zona SNR, konfirmasi anti-fakeout, berita makro, dan playbook modal kecil 1.000 USC. Ditempa dari nol bersama Jessy dan disahkan dengan Ijazah Resmi.'
              : 'A 20-semester institutional university curriculum (60 Modules • 120 Credits) grounded in peer-reviewed finance, SNR structure, anti-fakeout confirmation, macro events, and $10 = 1,000 USC execution, verified through formal certification.'}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => onEnterClassroom('track-01')}
              className="jgs-btn-gold text-sm sm:text-base px-7 py-4"
            >
              <GraduationCap className="w-5 h-5" strokeWidth={1.5} />
              <span>
                {isId ? 'Masuk Ruang Kuliah (Semester 01) ->' : 'Enter Classroom (Semester 01) ->'}
              </span>
            </button>

            <button
              type="button"
              onClick={scrollToDossier}
              className="jgs-btn-outline text-sm sm:text-base px-7 py-4"
            >
              <span>{isId ? 'Eksplorasi Silabus 20 Semester' : 'Explore 20-Semester Syllabus'}</span>
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div className="space-y-1">
              <div className="font-mono text-sm sm:text-base font-bold text-[var(--accent-gold)] tracking-wider">
                20 SEMESTER
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                {isId ? '120 SKS Kurikulum Terstruktur' : '120 Credits Structured'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-sm sm:text-base font-bold text-[var(--text-ivory)] tracking-wider">
                60 MODUL INTI
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                {isId ? '3 Mode Baca & Praktek Terpandu' : '3 Reading Modes & Guided Labs'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-sm sm:text-base font-bold text-[var(--text-ivory)] tracking-wider">
                1.000 USC LAB
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                {isId ? 'Standar Risiko Mikro $10 Kontrak 1 Oz' : '$10 Risk Calibration'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-sm sm:text-base font-bold text-[var(--accent-gold)] tracking-wider">
                IJAZAH &amp; TRANSKRIP
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                {isId ? 'Disahkan Jahseya Mochtar Mawardi' : 'Signed by Founder'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3.2: "JESSY", PRIVATE ACADEMIC CONCIERGE & STUDY PARTNER
          ===================================================================== */}
      <section className="py-16 md:py-24 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            className={`rounded-3xl border p-6 sm:p-10 lg:p-12 transition-colors duration-200 ${
              isLightTheme
                ? 'bg-white text-[#17131D] border-[#E5DEC9] shadow-xl'
                : 'bg-[#16121E] text-[#F3EFF8] border-[#D6A937]/25 shadow-2xl'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 lg:gap-12">
              {/* Left Portrait (5/12) */}
              <div className="w-full md:w-5/12 flex flex-col justify-between space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-[#D6A937]/50 bg-[#120E18] aspect-[4/5] shadow-2xl">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-[#D6A937] z-10"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-[#D6A937] z-10"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/jessy-waifu.png"
                    alt="Jessy, Senior Academic Tutor & Essay Examiner JGS Academy"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-[#120E18]/90 border border-[#D6A937]/50 px-3.5 py-2 text-center">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F3E5AB]">
                      JESSY • SENIOR ACADEMIC TUTOR &amp; ESSAY EXAMINER
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Orientation Prose (7/12) */}
              <div className="w-full md:w-7/12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div
                    className={`font-mono text-xs uppercase tracking-[0.2em] font-semibold ${
                      isLightTheme ? 'text-[#9A6B13]' : 'text-[#D6A937]'
                    }`}
                  >
                    {isId ? 'PRIVATE ACADEMIC CONCIERGE' : 'PRIVATE ACADEMIC CONCIERGE'}
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl font-bold leading-snug tracking-[-0.025em]">
                    &ldquo;
                    {isId
                      ? 'Di sini kamu tidak sekadar menghafal istilah, aku akan memastikan kamu benar-benar paham cara pasar bekerja.'
                      : 'Here you do not merely memorize terminology, I ensure you genuinely understand how markets allocate risk and liquidity.'}
                    &rdquo;
                  </h2>

                  <div
                    className={`space-y-3 text-sm sm:text-base leading-relaxed ${
                      isLightTheme ? 'text-[#574E63]' : 'text-[#C6BDD4]'
                    }`}
                  >
                    <p>
                      {isId
                        ? 'Selamat datang di ruang studi pribadi kita. Aku Jessy, tutor pendamping yang membimbing langkahmu dari nol hingga terampil membela argumen di depan data kuantitatif. Mengapa sembilan dari sepuluh akun kecil kandas di minggu pertama? Bukan karena kurang bakat, melainkan karena langsung menyentuh kontrak 100 oz Standar pada modal $10 tanpa membaca mekanisme likuiditas.'
                        : 'Welcome to our private study chamber. I am Jessy, guiding you from basic monetary physics, through 1 oz Cent contracts (1,000 USC), straight into institutional order flow and essay verification.'}
                    </p>
                    <p>
                      {isId
                        ? 'Bersamaku, tiap modul dibedah memakai bahasa yang jernih namun tetap bertumpu pada riset jurnal universitas serta metodologi ICT. Di setiap akhir modul aku juga akan membaca langsung esai analitismu, bukan sekadar mengklik tebak-tebakan pilihan ganda.'
                        : 'Every chapter bridges lucid peer mentorship with peer-reviewed citations and mandatory analytical essays before your credits are certified.'}
                    </p>
                  </div>
                </div>

                {/* 3 Sleek Dialogue Prompts */}
                <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
                  <div
                    className={`font-mono text-[11px] font-bold uppercase tracking-widest ${
                      isLightTheme ? 'text-[#9A6B13]' : 'text-[#D6A937]'
                    }`}
                  >
                    {isId ? 'PILIH TOPIK DISKUSI BERSAMA JESSY:' : 'SELECT CONCIERGE DIALOGUE:'}
                  </div>
                  <div className="space-y-2">
                    {icebreakers.map((item, idx) => {
                      const active = selectedIcebreaker === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedIcebreaker(idx)}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                            active
                              ? 'bg-[#D6A937] text-[#17131D] border-[#D6A937] font-bold shadow-md'
                              : isLightTheme
                              ? 'bg-[#F8F5EE] text-[#17131D] border-[#D5CBB8] hover:border-[#9A6B13]'
                              : 'bg-[#120E18] text-[#F3EFF8] border-[#D6A937]/25 hover:border-[#D6A937]'
                          }`}
                        >
                          {isId ? item.btnId : item.btnEn}
                        </button>
                      );
                    })}
                  </div>

                  {activeReply && (
                    <div
                      className={`rounded-2xl border p-4 space-y-2 transition-all ${
                        isLightTheme
                          ? 'bg-[#F6F3EC] border-[#9A6B13]/40 text-[#17131D]'
                          : 'bg-[#120E18] border-[#D6A937]/45 text-[#F3E5AB]'
                      }`}
                    >
                      <p className="text-xs sm:text-sm leading-relaxed">
                        <strong>Jessy:</strong> &ldquo;{isId ? activeReply.replyId : activeReply.replyEn}&rdquo;
                      </p>
                      <button
                        type="button"
                        onClick={activeReply.action}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold hover:underline ${
                          isLightTheme ? 'text-[#047857]' : 'text-[#10B981]'
                        }`}
                      >
                        <span>{isId ? activeReply.ctaId : activeReply.ctaEn}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3.3 (RELOCATED DOWN HERE): RELOCATED CATALOG HEADER + DOSSIER
          ===================================================================== */}
      <section id="kurikulum-dossier" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          {/* Curriculum Overline, Editorial Serif Title & Portal Switcher */}
          <div className="space-y-6 border-b border-[var(--border-subtle)] pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-4xl">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-gold)]">
                  JGS ACADEMY 5.5 • KURIKULUM UNIVERSITAS 20 SEMESTER (120 SKS)
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.025em] text-[var(--text-ivory)] leading-[1.12]">
                  {isId
                    ? 'Ensiklopedia Pasar Finansial & Eksekusi Praktis: Dari Pemula Hingga Institusional'
                    : 'Financial Markets & Practical Execution Encyclopedia: From First Principles to Institutional Precision'}
                </h2>
              </div>

              {/* Live SKS Progress Readout */}
              <div className="shrink-0 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-5 py-3.5 space-y-1.5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  {isId ? 'Progres SKS Anda' : 'Your SKS Progress'}
                </div>
                <div className="font-mono text-base font-bold text-[var(--accent-gold)] tabular-nums">
                  {totalSksEarned} / {totalSksPossible} SKS{' '}
                  <span className="text-xs text-[var(--text-secondary)] font-normal">
                    ({completedCount}/{totalModules} {isId ? 'Modul' : 'Modules'})
                  </span>
                </div>
              </div>
            </div>

            {/* Segmented Portal Mode Switcher Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <button
                type="button"
                onClick={() => onSwitchPortal('lobby')}
                className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition ${
                  activePortal === 'lobby'
                    ? 'jgs-tab-active border-[#D6A937] shadow-md'
                    : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/60'
                }`}
              >
                <Compass className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>{isId ? 'I. Katalog Kurikulum (20 Semester)' : 'I. Curriculum Dossier (20 Semesters)'}</span>
              </button>

              <button
                type="button"
                onClick={() => onSwitchPortal('classroom')}
                className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition ${
                  activePortal === 'classroom'
                    ? 'jgs-tab-active border-[#D6A937] shadow-md'
                    : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/60'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>{isId ? 'II. Ruang Kuliah PJJ (LMS)' : 'II. PJJ Classroom (LMS)'}</span>
              </button>

              <button
                type="button"
                onClick={() => onSwitchPortal('certification')}
                className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition ${
                  activePortal === 'certification'
                    ? 'jgs-tab-active border-[#D6A937] shadow-md'
                    : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/60'
                }`}
              >
                {isExamUnlocked ? (
                  <Award className="w-4 h-4 shrink-0 text-[#10B981]" strokeWidth={1.5} />
                ) : (
                  <Lock className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                )}
                <span>{isId ? 'III. Sidang Sertifikasi & Ijazah' : 'III. Certification & Diploma'}</span>
              </button>
            </div>
          </div>

          {/* 4 Horizontal Faculty Filter Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {YEAR_FILTERS.map((yr) => {
              const active = yr.id === activeYear.id;
              return (
                <button
                  key={yr.id}
                  type="button"
                  onClick={() => setActiveYearId(yr.id)}
                  className={`text-left px-4 py-3.5 rounded-xl border text-xs font-semibold leading-snug transition-all ${
                    active
                      ? 'jgs-tab-active border-[#D6A937] shadow-md'
                      : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/50'
                  }`}
                >
                  {isId ? yr.labelId : yr.labelEn}
                </button>
              );
            })}
          </div>

          {/* MasterClass / Stripe Press Horizontal Architectural Dossier Rows */}
          <div className="divide-y divide-[#D6A937]/20 border-t border-b border-[#D6A937]/20">
            {visibleTracks.map((track, trIdx) => {
              const trackLessons = lessons.filter((item) => item.trackId === track.id);
              const doneCount = trackLessons.filter((item) =>
                completedSlugs.includes(item.slug)
              ).length;
              const leadCitation = trackLessons[0]?.studio.citation;

              return (
                <MotionReveal key={track.id} delay={trIdx * 0.05} as="article" className="py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Chapter Overview (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--accent-gold)] font-bold">
                        <span>{track.courseCode} • {track.sksCredits} SKS</span>
                        <span className="text-[var(--text-muted)]">•</span>
                        <span className="text-[var(--text-secondary)] font-normal">
                          {doneCount}/{trackLessons.length} {isId ? 'Modul Tuntas' : 'Modules Cleared'}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-ivory)] leading-snug">
                        {track.title}
                      </h3>

                      <div className="rounded-xl border border-[#D6A937]/30 bg-[#D6A937]/10 px-4 py-3 space-y-1.5">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                          {isId
                            ? 'Di semester ini kamu akan belajar tentang :'
                            : 'In this semester you will learn about :'}
                        </div>
                        <p className="text-sm sm:text-base text-[var(--text-ivory)] jgs-prose-justify leading-relaxed">
                          {track.subtitle}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2 border-l-2 border-[#D6A937]/40 pl-4">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                          {isId ? 'CAPAIAN KOMPETENSI (LEARNING OUTCOME)' : 'LEARNING OUTCOME'}
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--text-ivory)] leading-relaxed">
                          {track.learningOutcome}
                        </p>
                        {leadCitation && (
                          <p className="font-mono text-[11px] text-[var(--accent-gold)] pt-0.5">
                            {isId ? 'Referensi Ilmiah: ' : 'Academic Anchor: '}
                            {leadCitation.authors} ({leadCitation.year}), {leadCitation.source}
                          </p>
                        )}
                        <p className="font-mono text-[11px] text-[var(--text-muted)] pt-0.5">
                          {isId ? track.academicSummaryId : track.academicSummaryEn}
                        </p>
                      </div>
                    </div>

                    {/* Right Module Chapter Rows (5 cols) */}
                    <div className="lg:col-span-5 space-y-3">
                      <SpotlightCard className="p-0 overflow-hidden">
                        <div className="divide-y divide-[var(--border-subtle)]">
                          {trackLessons.map((les) => {
                            const done = completedSlugs.includes(les.slug);
                            return (
                              <button
                                key={les.slug}
                                type="button"
                                onClick={() => onEnterClassroom(track.id, les.slug)}
                                className="w-full text-left px-5 py-4 hover:bg-[var(--bg-surface-2)] transition flex items-start justify-between gap-3 group"
                              >
                                <div className="flex items-start gap-3 min-w-0">
                                  <CheckCircle2
                                    strokeWidth={1.5}
                                    className={`w-4 h-4 shrink-0 mt-1 ${
                                      done ? 'text-[#10B981]' : 'text-[var(--text-muted)] opacity-50'
                                    }`}
                                  />
                                  <div className="min-w-0 space-y-0.5">
                                    <div className="font-mono text-[10px] font-bold text-[var(--accent-gold)]">
                                      MODUL {les.lessonNumber} • {les.studio.sksCredits} SKS
                                    </div>
                                    <div className="text-sm font-semibold text-[var(--text-ivory)] group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                                      {les.title}
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight
                                  strokeWidth={1.5}
                                  className="w-4 h-4 shrink-0 mt-1 text-[var(--text-muted)] group-hover:text-[var(--accent-gold)] group-hover:translate-x-0.5 transition-all"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </SpotlightCard>

                      <button
                        type="button"
                        onClick={() => onEnterClassroom(track.id)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold border border-[#D6A937]/40 bg-[var(--bg-surface-1)] text-[var(--text-ivory)] hover:bg-[#D6A937] hover:text-[#17131D] transition"
                      >
                        <span>{isId ? 'Masuk Ruang Kuliah ->' : 'Enter Classroom ->'}</span>
                      </button>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>

          {/* 8 Ancient Mythological Rank Showcase */}
          <MythologicalRankShowcase
            completedSlugsOverride={completedSlugs}
            examPassedOverride={isExamUnlocked}
            locale={locale}
            compact
          />

          {/* Hard-Locked Official Diploma & Transcript Architectural Footer Band */}
          <div className="rounded-3xl border border-[#D6A937]/35 bg-[var(--bg-surface-1)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                {isAllComplete ? (
                  <Award className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <Lock className="w-4 h-4" strokeWidth={1.5} />
                )}
                <span>
                  {isAllComplete
                    ? isId
                      ? `SIAP SIDANG UJIAN AKHIR (${totalModules}/${totalModules} MODUL & ESAI TUNTAS)`
                      : `ELIGIBLE FOR FINAL GRADUATION EXAM (${totalModules}/${totalModules} COMPLETE)`
                    : isId
                      ? `IJAZAH & TRANSKRIP TERKUNCI KETAT • ${completedCount}/${totalModules} MODUL (${totalSksEarned}/${totalSksPossible} SKS)`
                      : `STRICTLY HARD-LOCKED • ${completedCount}/${totalModules} MODULES`}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-[var(--text-ivory)]">
                {isId
                  ? 'Ijazah Kelulusan Resmi & Transkrip Akademik 20 Semester (1920x1350)'
                  : 'Official JGS Diploma & 20-Semester Academic Transcript (1920x1350)'}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {isId
                  ? `Seluruh ${totalModules} Modul beserta Ujian Esai Pemahaman wajib tuntas 100% sebelum Sidang Ujian Akhir dibuka. Kedua dokumen memuat Gang Member ID, Rank Mitologi Kuno, IPK (GPA 4.00), stempel emas, dan tanda tangan Founder Jahseya Mochtar Mawardi.`
                  : `Complete 100% of all ${totalModules} Modules & Analytical Essay Exams before entering the Final Graduation Exam to unlock Founder-signed 1920×1350 Diploma & Transcript exports.`}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenCertification}
                className={isAllComplete ? 'jgs-btn-gold text-xs sm:text-sm' : 'jgs-btn-outline text-xs sm:text-sm'}
              >
                <FileText className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  {isAllComplete
                    ? isId
                      ? 'Masuk Ruang Ujian Akhir ->'
                      : 'Enter Final Exam ->'
                    : isId
                      ? `Cek Checklist ${totalSksPossible} SKS`
                      : `View ${totalSksPossible} SKS Checklist`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
