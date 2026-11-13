'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  BookOpen,
  Cpu,
  GraduationCap,
  FileText,
  Youtube,
  Play,
  ExternalLink,
  Calculator,
  RefreshCw,
  Award,
  RotateCw,
  ListChecks,
  FlaskConical,
  PenTool,
  AlertTriangle,
  Lock,
  Sparkles,
} from 'lucide-react';
import {
  generateModuleCaseChallenge,
  buildDeepModuleLecture,
  buildOneMinutePlainSummary,
  getModuleEssayExam,
  evaluateModuleEssay,
  type AcademyTrack,
  type AcademyLesson,
  type EssayEvaluationResult,
} from '@/lib/data/academy-lessons';
import { getModuleEpiphany } from '@/lib/data/academy-epiphanies';
import { LiveKursPill } from '@/components/market/LiveKursPill';
import { injectLiveIdrRates } from '@/lib/currency/live-idr';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';
import {
  loadModuleEssays,
  saveModuleEssaySubmission,
} from '@/lib/storage/jgs-local-store';
import { LessonDiagramGraphic } from '@/components/academy/Mt5VisualSimulatorPane';
import {
  JessyPortrait,
  type JessyMood,
} from '@/components/academy/JessyBuddyAssistant';
import {
  RichFormattedText,
  EditorialPhotoPlate,
  ExplorableConceptSandbox,
  HotspotDiagramViewer,
  ChartDetectiveMiniChallenge,
} from '@/components/academy/AcademyExplorableWidgets';
import { GuidedWalkthroughLab } from '@/components/academy/GuidedWalkthroughLab';
import { GoldConfettiBurst } from '@/components/ui/LuxuryMotion';
import { useLocale } from '@/i18n/LocaleContext';

interface AcademyLmsCourseViewProps {
  locale: 'id' | 'en';
  tracks: AcademyTrack[];
  lessons: AcademyLesson[];
  activeTrack: AcademyTrack;
  activeLesson: AcademyLesson;
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
  completedSlugs: string[];
  completedCaseSlugs: string[];
  jessyMood: JessyMood;
  jessyNote: string | null;
  onJessyReaction: (mood: JessyMood, note: string) => void;
  onSelectTrack: (trackId: string) => void;
  onSelectLesson: (slug: string, trackId?: string) => void;
  onCompleteModuleFull: (slug: string) => void;
  onBackToLobby: () => void;
  onOpenCertification: () => void;
  externalMobileSidebarOpen?: boolean;
  onCloseMobileSidebar?: () => void;
}

type ActivityNumber = 1 | 2 | 3 | 4;

function normalizeActivity(slideNum: number): ActivityNumber {
  if (slideNum <= 1) return 1;
  if (slideNum === 2) return 2;
  if (slideNum === 3 || slideNum === 5 || slideNum === 6) return 3;
  return 4;
}

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

export function AcademyLmsCourseView({
  locale,
  tracks,
  lessons,
  activeTrack,
  activeLesson,
  activeSlide,
  setActiveSlide,
  completedSlugs,
  completedCaseSlugs,
  jessyMood,
  jessyNote,
  onJessyReaction,
  onSelectTrack,
  onSelectLesson,
  onCompleteModuleFull,
  onOpenCertification,
  externalMobileSidebarOpen = false,
  onCloseMobileSidebar,
}: AcademyLmsCourseViewProps) {
  const isId = locale === 'id';
  const { l } = useLocale();
  const { usdIdrRate, formatUsdToIdr } = useLiveCurrency();

  const activeActivity = normalizeActivity(activeSlide);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isSidebarVisible = mobileSidebarOpen || externalMobileSidebarOpen;
  const [lectureStyle, setLectureStyle] = useState<'INTI_AWAM' | 'PEER_MENTOR' | 'INSTITUTIONAL'>('PEER_MENTOR');
  const [flippedFlashcards, setFlippedFlashcards] = useState<Record<string, boolean>>({});
  const [readSlugs, setReadSlugs] = useState<Record<string, boolean>>({});
  const [playingVideoSlug, setPlayingVideoSlug] = useState<string | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);

  // Part A: 2 Dynamic Checkpoints (Dynamic Math Case + Conceptual Quiz)
  const [caseSeeds, setCaseSeeds] = useState<Record<string, number>>({});
  const [caseSelected, setCaseSelected] = useState<Record<string, number>>({});
  const [quizAnswer, setQuizAnswer] = useState<Record<string, number | null>>({});
  const [partASubmitted, setPartASubmitted] = useState<Record<string, boolean>>({});
  const [showCaseHint, setShowCaseHint] = useState(false);

  // Part B: Mandatory Analytical Essay Exam + 4-Pillar Rubric
  const [essayDrafts, setEssayDrafts] = useState<Record<string, string>>({});
  const [essayResults, setEssayResults] = useState<Record<string, EssayEvaluationResult>>({});
  const [readProgress, setReadProgress] = useState<number>(0);

  useEffect(() => {
    setPlayingVideoSlug(null);
    setShowCaseHint(false);
    setFlippedFlashcards({});
    setReadProgress(0);
  }, [activeLesson.slug]);

  useEffect(() => {
    if (typeof window === 'undefined' || activeActivity !== 1) return;
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)));
      setReadProgress(pct);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeActivity, activeLesson.slug]);

  // Restore saved essay submissions on mount
  useEffect(() => {
    const saved = loadModuleEssays();
    const textMap: Record<string, string> = {};
    Object.values(saved).forEach((entry) => {
      if (entry.text) textMap[entry.slug] = entry.text;
    });
    if (Object.keys(textMap).length > 0) {
      setEssayDrafts((prev) => ({ ...textMap, ...prev }));
    }
  }, []);

  useEffect(() => {
    setCaseSeeds((prev) => {
      if (prev[activeLesson.slug]) return prev;
      const randomNonce = Math.floor(10000 + Math.random() * 89999);
      return { ...prev, [activeLesson.slug]: randomNonce };
    });
  }, [activeLesson.slug]);

  const semesterLessons = useMemo(
    () => lessons.filter((item) => item.trackId === activeTrack.id),
    [lessons, activeTrack.id]
  );

  const activeIndex = useMemo(
    () => lessons.findIndex((item) => item.slug === activeLesson.slug),
    [lessons, activeLesson.slug]
  );

  const nextLesson =
    activeIndex >= 0 && activeIndex < lessons.length - 1 ? lessons[activeIndex + 1] : null;

  const isModuleCompleted = completedSlugs.includes(activeLesson.slug);
  const currentCaseSeed = caseSeeds[activeLesson.slug] ?? 42109;

  const deepLectureSections = useMemo(
    () =>
      buildDeepModuleLecture(
        activeLesson,
        activeTrack,
        isId,
        lectureStyle === 'INSTITUTIONAL' ? 'INSTITUTIONAL' : 'PEER_MENTOR'
      ),
    [activeLesson, activeTrack, isId, lectureStyle]
  );

  const oneMinuteCards = useMemo(
    () => buildOneMinutePlainSummary(activeLesson, isId),
    [activeLesson, isId]
  );

  const moduleEpiphany = useMemo(() => {
    const raw = getModuleEpiphany(activeLesson.slug, isId);
    return {
      headline: injectLiveIdrRates(raw.headline, usdIdrRate),
      myth: injectLiveIdrRates(raw.myth, usdIdrRate),
      reality: injectLiveIdrRates(raw.reality, usdIdrRate),
      microExample: injectLiveIdrRates(raw.microExample, usdIdrRate),
      takeaway: injectLiveIdrRates(raw.takeaway, usdIdrRate),
    };
  }, [activeLesson.slug, isId, usdIdrRate]);

  const dynamicCase = useMemo(
    () =>
      generateModuleCaseChallenge(
        activeLesson.studio.caseTask.formulaKind,
        currentCaseSeed,
        isId
      ),
    [activeLesson.studio.caseTask.formulaKind, currentCaseSeed, isId]
  );

  const conceptQuiz = useMemo(() => activeLesson.quiz, [activeLesson]);
  const essayConfig = useMemo(
    () => getModuleEssayExam(activeLesson, activeTrack, isId),
    [activeLesson, activeTrack, isId]
  );

  const pickedCaseOpt = caseSelected[activeLesson.slug];
  const pickedQuizOpt = quizAnswer[activeLesson.slug] ?? null;
  const isPartASubmitted = Boolean(partASubmitted[activeLesson.slug]);
  const caseCorrect = isPartASubmitted && pickedCaseOpt === dynamicCase.correctIndex;
  const quizCorrect = isPartASubmitted && pickedQuizOpt === conceptQuiz.correctIndex;
  const partAPassed = caseCorrect && quizCorrect;

  const currentEssayText = essayDrafts[activeLesson.slug] ?? '';
  const currentWordCount = useMemo(() => countWords(currentEssayText), [currentEssayText]);
  const currentEssayResult = essayResults[activeLesson.slug] ?? null;
  const savedEssaysSnapshot = useMemo(() => loadModuleEssays(), [activeLesson.slug, currentEssayResult]);
  const storedEssayPassed = Boolean(savedEssaysSnapshot[activeLesson.slug]?.passed);
  const essayPassed = Boolean(currentEssayResult?.passed || storedEssayPassed);

  const isFullyPassed = partAPassed && essayPassed;

  function goToActivity(act: ActivityNumber) {
    setActiveSlide(act);
    setMobileSidebarOpen(false);
    onCloseMobileSidebar?.();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function toggleFlashcard(termKey: string) {
    setFlippedFlashcards((prev) => ({ ...prev, [termKey]: !prev[termKey] }));
  }

  function handleRandomizeCaseNumbers() {
    const newSeed = Math.floor(10000 + Math.random() * 89999);
    setCaseSeeds((prev) => ({ ...prev, [activeLesson.slug]: newSeed }));
    setCaseSelected((prev) => {
      const next = { ...prev };
      delete next[activeLesson.slug];
      return next;
    });
    setPartASubmitted((prev) => ({ ...prev, [activeLesson.slug]: false }));
  }

  function handleCheckPartA() {
    if (pickedCaseOpt === undefined || pickedQuizOpt === null) return;
    setPartASubmitted((prev) => ({ ...prev, [activeLesson.slug]: true }));

    const cOk = pickedCaseOpt === dynamicCase.correctIndex;
    const qOk = pickedQuizOpt === conceptQuiz.correctIndex;

    if (cOk && qOk && essayPassed) {
      onCompleteModuleFull(activeLesson.slug);
      setConfettiKey((k) => k + 1);
      onJessyReaction(
        'cheering',
        isId
          ? `Lulus sempurna! Bagian A dan Ujian Esai Modul ${activeLesson.lessonNumber} terverifikasi. ${activeLesson.studio.sksCredits} SKS masuk transkrip.`
          : `Module ${activeLesson.lessonNumber} cleared! Both Checkpoints and Analytical Essay passed.`
      );
    } else if (cOk && qOk) {
      onJessyReaction(
        'explaining',
        isId
          ? 'Bagian A (Kuis & Hitungan Dinamis) sudah 100% tepat! Sekarang selesaikan Ujian Esai di Bagian B untuk mengklaim 2 SKS.'
          : 'Part A Checkpoints are 100% right! Complete Part B Analytical Essay below to unlock credits.'
      );
    } else {
      onJessyReaction(
        'warning',
        isId
          ? 'Ada jawaban di Bagian A yang masih meleset, tinjau pembahasannya di bawah lalu perbaiki.'
          : 'Review Part A feedback below where an option missed and adjust.'
      );
    }
  }

  function handleEvaluateEssay() {
    const result = evaluateModuleEssay(currentEssayText, essayConfig, isId);
    setEssayResults((prev) => ({ ...prev, [activeLesson.slug]: result }));

    saveModuleEssaySubmission({
      slug: activeLesson.slug,
      text: currentEssayText,
      score: result.score,
      gradeLabel: result.gradeLabel,
      passed: result.passed,
      submittedAt: new Date().toISOString(),
    });

    if (result.passed) {
      if (partAPassed) {
        onCompleteModuleFull(activeLesson.slug);
        setConfettiKey((k) => k + 1);
        onJessyReaction(
          'cheering',
          isId
            ? `Luar biasa! Esaimu meraih skor ${result.score}/100 (${result.gradeLabel}) dan Bagian A tepat. ${activeLesson.studio.sksCredits} SKS resmi masuk transkrip.`
            : `Brilliant! Essay scored ${result.score}/100 (${result.gradeLabel}) with Part A cleared. ${activeLesson.studio.sksCredits} Credits recorded.`
        );
      } else {
        onJessyReaction(
          'happy',
          isId
            ? `Esaimu lulus (${result.score}/100 • ${result.gradeLabel})! Jangan lupa selesaikan 2 soal Bagian A di atas untuk mengklaim ${activeLesson.studio.sksCredits} SKS.`
            : `Essay passed (${result.score}/100 • ${result.gradeLabel})! Check Part A above to complete SKS.`
        );
      }
    } else {
      onJessyReaction('warning', result.feedback);
    }
  }

  const totalSksEarned = lessons
    .filter((item) => completedSlugs.includes(item.slug))
    .reduce((acc, item) => acc + item.studio.sksCredits, 0);
  const totalSksPossible = lessons.reduce((acc, item) => acc + item.studio.sksCredits, 0);
  const progressPct = Math.round((completedSlugs.length / Math.max(1, lessons.length)) * 100);

  const videoId = activeLesson.studio.youtube.videoId;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const isPlayingHere = playingVideoSlug === activeLesson.slug;

  const activityItems: {
    num: ActivityNumber;
    labelId: string;
    labelEn: string;
    icon: React.ReactNode;
  }[] = [
    {
      num: 1,
      labelId: '01. Diktat Kuliah Mendalam (Teori & Jurnal)',
      labelEn: '01. Deep Institutional Lecture (Theory & Paper)',
      icon: <FileText className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />,
    },
    {
      num: 2,
      labelId: '02. Video Perkuliahan (Bahasa Indonesia)',
      labelEn: '02. Curated Video Lecture',
      icon: <Youtube className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />,
    },
    {
      num: 3,
      labelId: '03. Praktek Terpandu 3 Langkah (+ Live Chart Opsional)',
      labelEn: '03. 3-Step Guided Trade Walkthrough (+ Live Chart)',
      icon: <FlaskConical className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />,
    },
    {
      num: 4,
      labelId: `04. Kuis Konsep & Ujian Esai Pemahaman (${activeLesson.studio.sksCredits} SKS)`,
      labelEn: `04. Concept Quiz & Essay Exam (${activeLesson.studio.sksCredits} SKS)`,
      icon: <ListChecks className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />,
    },
  ];

  // =========================================================================
  // ACTIVITY 01: DEEP INSTITUTIONAL LECTURE PROSE + EXPLORABLE EXPLANATIONS
  // =========================================================================
  const scrollToSection = (secNum: string) => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(`sec-${secNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderActivity1Reading = () => (
    <article className="jgs-panel">
      {/* Sticky Reading Progress Bar & Quick Chapter Jump Pills */}
      <div className="sticky top-[120px] z-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/95 backdrop-blur-md">
        <div className="h-1 w-full bg-[var(--bg-surface-3)]">
          <div
            className="h-full bg-gradient-to-r from-[#D6A937] to-[#10B981] transition-all duration-150"
            style={{ width: `${readProgress}%` }}
          />
        </div>
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2">
          {lectureStyle === 'INTI_AWAM' ? (
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.6} />
              <span>{isId ? 'MODE 1: INTI RANGKUMAN BAHASA AWAM (1 MENIT)' : 'MODE 1: 1-MINUTE PLAIN SUMMARY'}</span>
            </span>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                ['01', isId ? '01 Pengantar' : '01 Intro'],
                ['02', isId ? '02 Mekanisme' : '02 Mechanics'],
                ['03', isId ? '03 Peta Visual' : '03 Visuals'],
                ['04', isId ? `04 Modal ${formatUsdToIdr(10)}` : '04 $10 Case'],
                ['05', isId ? '05 Bukti Jurnal' : '05 Papers'],
              ].map(([num, label]) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => scrollToSection(num)}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-1 font-mono text-[10px] font-semibold text-[var(--text-secondary)] hover:border-[#D6A937] hover:text-[var(--text-ivory)] transition"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)] tabular-nums">
            {lectureStyle === 'INTI_AWAM' ? '5 Poin Inti' : `${readProgress}% ${isId ? 'dibaca' : 'read'}`}
          </span>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto py-10 sm:py-12 px-5 sm:px-8 space-y-10">
        {/* Clean Editorial Chapter Header */}
        <header className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--accent-gold)]">
            <span>
              {activeTrack.courseCode} • SEMESTER {activeTrack.trackNumber} • MODUL{' '}
              {activeLesson.lessonNumber} ({activeLesson.studio.sksCredits} SKS)
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <LiveKursPill compact />
              <Link
                href={l(`/academy/${activeLesson.slug}`)}
                className="inline-flex items-center gap-1 hover:underline"
              >
                <span>{isId ? 'Tautan Permanen' : 'Permalink'}</span>
                <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-[-0.025em] text-[var(--text-ivory)] leading-[1.14]">
            {activeLesson.lessonNumber} • {activeLesson.title}
          </h1>

          <p className="text-[16.5px] jgs-prose-justify text-[var(--text-secondary)]">
            <RichFormattedText text={activeLesson.summary} />
          </p>

          {/* 3-Mode Reading Switcher */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLectureStyle('INTI_AWAM')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                lectureStyle === 'INTI_AWAM'
                  ? 'jgs-tab-active border-[#D6A937]'
                  : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{isId ? 'Mode 1: Inti Rangkuman (Bahasa Awam 1 Menit)' : 'Mode 1: 1-Minute Plain Summary'}</span>
            </button>
            <button
              type="button"
              onClick={() => setLectureStyle('PEER_MENTOR')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                lectureStyle === 'PEER_MENTOR'
                  ? 'jgs-tab-active border-[#D6A937]'
                  : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{isId ? 'Mode 2: Mentor Sebaya' : 'Mode 2: Peer Mentor'}</span>
            </button>
            <button
              type="button"
              onClick={() => setLectureStyle('INSTITUTIONAL')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                lectureStyle === 'INSTITUTIONAL'
                  ? 'jgs-tab-active border-[#D6A937]'
                  : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{isId ? 'Mode 3: Diktat Akademik & Jurnal Universitas' : 'Mode 3: Academic Monograph & Journals'}</span>
            </button>
          </div>
        </header>

        {/* Top-of-Lesson Learning Outcomes Banner ("Di kelas ini kamu akan belajar :") */}
        <div className="rounded-2xl border border-[#D6A937]/40 bg-[#D6A937]/10 p-5 sm:p-6 space-y-3">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#D6A937]">
            {isId ? 'Di kelas ini kamu akan belajar :' : 'In this class you will learn :'}
          </div>
          <ul className="space-y-2 text-[15px] text-[var(--text-ivory)] leading-relaxed">
            {(isId ? activeLesson.studio.learningOutcomesId : activeLesson.studio.learningOutcomesEn).map(
              (lo, loIdx) => (
                <li key={loIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-1" strokeWidth={1.8} />
                  <span className="jgs-prose-justify">
                    <RichFormattedText text={lo} isId={isId} />
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* "MOMEN OHHH TERNYATA GITU YAA!" MODULE EPIPHANY CARD (ALL 3 READING MODES) */}
        <div className="rounded-2xl border-2 border-[#D6A937]/60 bg-gradient-to-br from-[#1C1528] via-[#15111E] to-[#120E19] p-5 sm:p-6 space-y-3.5 text-[#F7F4EE] shadow-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D6A937]/50 bg-[#D6A937]/15 px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#F3E5AB]">
            <Sparkles className="w-3.5 h-3.5 text-[#D6A937]" />
            <span>
              {isId
                ? 'MOMEN "OHHH TERNYATA GITU YAA!" : BONGKAR RAHASIA DAPUR PASAR'
                : 'AHA MOMENT : MARKET MECHANICS REVEALED'}
            </span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-bold text-[#F3E5AB] leading-snug">
            {moduleEpiphany.headline}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="rounded-xl border border-[#EF4444]/35 bg-[#EF4444]/10 p-3.5 space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FCA5A5]">
                {isId ? 'ANGGAPAN UMUM PEMULA' : 'COMMON BEGINNER MYTH'}
              </div>
              <p className="jgs-prose-justify text-[#F4EFF9]">{moduleEpiphany.myth}</p>
            </div>

            <div className="rounded-xl border border-[#10B981]/35 bg-[#10B981]/10 p-3.5 space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#6EE7B7]">
                {isId ? 'KENYATAAN SEBENARNYA DI PASAR' : 'HOW MARKETS ACTUALLY DELIVER'}
              </div>
              <p className="jgs-prose-justify text-[#F4EFF9]">{moduleEpiphany.reality}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs sm:text-sm space-y-1">
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#D6A937]">
              {isId ? `CONTOH NYATA MODAL ${formatUsdToIdr(10)} (1.000 USC)` : `REAL $10 / ${formatUsdToIdr(10)} EXAMPLE`}
            </div>
            <p className="jgs-prose-justify text-[#E6E0F0]">{moduleEpiphany.microExample}</p>
          </div>

          <div className="font-mono text-xs font-bold text-[#10B981]">
            {isId ? 'Inti Rahasia: ' : 'Key Takeaway: '}
            <span className="text-[#F7F4EE] font-sans font-semibold">{moduleEpiphany.takeaway}</span>
          </div>
        </div>

        {/* MODE 1 vs MODE 2/3 BODY */}
        {lectureStyle === 'INTI_AWAM' ? (
          <div className="space-y-4">
            {oneMinuteCards.map((card) => (
              <div
                key={card.step}
                className={`rounded-2xl border p-5 sm:p-6 space-y-2 ${
                  card.step === 3
                    ? 'border-[#D6A937] bg-[#D6A937]/10 shadow-md'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/70'
                }`}
              >
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-gold)]">
                  {card.label}
                </div>
                <p className="text-[16px] jgs-prose-justify text-[var(--text-ivory)]">
                  <RichFormattedText text={card.body} isId={isId} />
                </p>
              </div>
            ))}

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setLectureStyle('PEER_MENTOR')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D6A937]/50 bg-[var(--bg-surface-2)] text-xs font-bold text-[var(--accent-gold)] hover:bg-[#D6A937] hover:text-[#17131D] transition"
              >
                <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>{isId ? 'Baca Penjelasan Lengkapnya di Mode 2 ->' : 'Read Full Lesson in Mode 2 ->'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Explicit INTI DAGING Highlight Callout */}
            <div className="rounded-2xl border-l-4 border-[#D6A937] bg-[#D6A937]/10 p-5 sm:p-6 space-y-1.5">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
                {isId ? 'INTI DAGING (ATURAN PRAKTIS MODUL INI)' : 'CORE MEAT (PRACTICAL MODULE RULE)'}
              </div>
              <p className="text-[16px] font-semibold jgs-prose-justify text-[var(--text-ivory)]">
                <RichFormattedText text={activeLesson.jeyStreetRule} isId={isId} />
              </p>
            </div>

            {/* Render All 5 Rich Analytical Sections in Flowing Crisp Sans-Serif Textbook Prose */}
            {deepLectureSections.map((sec) => (
          <section
            key={sec.sectionNumber}
            id={`sec-${sec.sectionNumber}`}
            className="scroll-mt-28 space-y-5 border-b border-[var(--border-subtle)] pb-10 last:border-b-0 last:pb-0"
          >
            <h2 className="font-display text-2xl sm:text-[26px] font-bold tracking-[-0.025em] text-[var(--text-ivory)] leading-snug">
              {sec.title}
            </h2>

            {/* Curated Real Web Editorial Photojournalism Plate (Section 01) */}
            {sec.photoUrl && (
              <EditorialPhotoPlate
                photoUrl={sec.photoUrl}
                caption={sec.photoCaption ?? activeLesson.title}
                isId={isId}
                cluster={sec.photoCluster}
              />
            )}

            <div className="space-y-4 text-[16.5px] jgs-prose-justify text-[var(--text-secondary)]">
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="jgs-prose-justify">
                  <RichFormattedText text={para} isId={isId} />
                </p>
              ))}
            </div>

            {/* Clean Numbered Breakdown List (Replaces Unreadable Wall-of-Text Joins!) */}
            {sec.numberedItems && sec.numberedItems.length > 0 && (
              <ol className="space-y-3 pt-1">
                {sec.numberedItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/70 p-4 text-[15px] leading-[1.7] text-[var(--text-secondary)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D6A937]/15 border border-[#D6A937]/40 font-mono text-xs font-bold text-[var(--accent-gold)]">
                        {idx + 1}
                      </span>
                      <div className="space-y-1">
                        <div className="font-display font-bold text-[var(--text-ivory)] text-sm sm:text-[15px]">
                          {item.heading}
                        </div>
                        <p>
                          <RichFormattedText text={item.body} />
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {/* Discrete Learning Outcome Bullet List (LO1 / LO2 / LO3) */}
            {sec.learningOutcomes && sec.learningOutcomes.length > 0 && (
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4 sm:p-5 space-y-2.5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
                  {isId ? 'CAPAIAN KOMPETENSI MODUL (LEARNING OUTCOMES)' : 'MODULE LEARNING OUTCOMES'}
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-ivory)] leading-relaxed">
                  {sec.learningOutcomes.map((lo, loIdx) => (
                    <li key={loIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span>
                        <RichFormattedText text={lo} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Brilliant.org-Inspired Interactive Explorable Concept Sandbox (Section 02) */}
            {sec.sandboxKind && <ExplorableConceptSandbox kind={sec.sandboxKind} isId={isId} />}

            {/* 3 Interactive Tap-to-Flip Flashcards (Section 01 Only) */}
            {sec.flashcards && sec.flashcards.length > 0 && (
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-gold)] uppercase tracking-widest">
                  <span>
                    {isId
                      ? 'KARTU KONSEP PRASYARAT (KETUK UNTUK MEMBALIK)'
                      : 'PREREQUISITE CONCEPT FLASHCARDS (TAP TO FLIP)'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 jgs-perspective-1000">
                  {sec.flashcards.map((fc) => {
                    const flipped = Boolean(flippedFlashcards[fc.term]);
                    return (
                      <button
                        key={fc.term}
                        type="button"
                        onClick={() => toggleFlashcard(fc.term)}
                        className={`text-left rounded-2xl border p-4 min-h-[124px] flex flex-col justify-between transition-all duration-300 ${
                          flipped
                            ? 'bg-[var(--bg-surface-2)] border-[#D6A937] shadow-md'
                            : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] hover:border-[#D6A937]/60'
                        }`}
                      >
                        {!flipped ? (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-gold)]">
                                {isId ? 'ISTILAH INTI' : 'TERM'}
                              </span>
                              <RotateCw className="w-3.5 h-3.5 text-[var(--text-muted)]" strokeWidth={1.5} />
                            </div>
                            <div className="font-display font-bold text-base text-[var(--text-ivory)] leading-snug py-2">
                              {fc.term}
                            </div>
                            <span className="text-[11px] font-mono text-[var(--text-muted)]">
                              {isId ? 'Ketuk untuk definisi ->' : 'Tap to flip ->'}
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)] truncate">
                                {fc.term}
                              </span>
                              <RotateCw className="w-3 h-3 text-[var(--accent-gold)] shrink-0" strokeWidth={1.5} />
                            </div>
                            <p className="text-xs text-[var(--text-ivory)] leading-relaxed pt-1.5">
                              <RichFormattedText text={fc.definition} />
                            </p>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Topic-Specific Academic Anatomy Comparison Table (Section 03) */}
            {sec.tableHeaders && sec.tableRows && (
              <div className="pt-2 overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)]">
                      {sec.tableHeaders.map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-gold)]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                    {sec.tableRows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="px-4 py-3.5 align-top font-semibold text-[var(--text-ivory)] leading-relaxed">
                          <RichFormattedText text={row[0]} />
                        </td>
                        <td className="px-4 py-3.5 align-top leading-relaxed">
                          <RichFormattedText text={row[1]} />
                        </td>
                        <td className="px-4 py-3.5 align-top font-mono text-xs text-[var(--accent-gold)] leading-relaxed">
                          <RichFormattedText text={row[2]} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Interactive 4-Pin Hotspot Visual Schematic (Section 03) */}
            {sec.hasSvgDiagram &&
              (sec.hotspots ? (
                <HotspotDiagramViewer
                  diagramType={activeLesson.studio.diagramType}
                  locale={locale}
                  hotspots={sec.hotspots}
                  caption={sec.svgCaption}
                />
              ) : (
                <figure className="pt-2 space-y-2.5">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <LessonDiagramGraphic type={activeLesson.studio.diagramType} locale={locale} />
                  </div>
                  {sec.svgCaption && (
                    <figcaption className="text-center font-mono text-xs text-[var(--text-muted)]">
                      {sec.svgCaption}
                    </figcaption>
                  )}
                </figure>
              ))}

            {/* 15-Second Interactive Chart Detective Check (Section 04) */}
            {sec.detectivePuzzle && (
              <ChartDetectiveMiniChallenge puzzle={sec.detectivePuzzle} isId={isId} />
            )}

            {/* Clean Worked Formula Specification Line */}
            {sec.formulaBox && (
              <div className="border-l-2 border-[#D6A937] pl-5 py-1.5 font-mono text-xs sm:text-sm text-[var(--text-ivory)] leading-relaxed">
                <RichFormattedText text={sec.formulaBox} />
              </div>
            )}

            {/* Academic Citation Footnote + Editorial Jessy Sign-off */}
            {sec.citationFooter && (
              <div className="pt-2 space-y-6">
                <div className="border-t border-[var(--border-subtle)] pt-4 font-mono text-xs text-[var(--text-muted)] leading-relaxed">
                  <span className="font-bold text-[var(--text-ivory)]">
                    {isId ? 'Sitasi Pustaka (APA): ' : 'Academic Reference (APA): '}
                  </span>
                  {sec.citationFooter}
                </div>

                {sec.jessySignOff && (
                  <div className="flex items-start gap-4 border-l-2 border-[#D6A937]/60 pl-5 py-1">
                    <JessyPortrait mood="happy" size={48} />
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                        {isId ? 'CATATAN PENUTUP JESSY' : 'JESSY CLOSING NOTE'}
                      </div>
                      <p className="text-sm sm:text-base text-[var(--text-ivory)] leading-relaxed">
                        &ldquo;<RichFormattedText text={sec.jessySignOff} />&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
            ))}
          </div>
        )}

        {/* Bottom Activity Transition Control */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {readSlugs[activeLesson.slug]
              ? isId
                ? 'Status: Diktat telah diselesaikan.'
                : 'Status: Chapter reading marked complete.'
              : isId
                ? 'Selesai membaca? Lanjutkan ke Video Perkuliahan.'
                : 'Finished reading? Proceed to Video Lecture.'}
          </span>
          <button
            type="button"
            onClick={() => {
              setReadSlugs((prev) => ({ ...prev, [activeLesson.slug]: true }));
              goToActivity(2);
            }}
            className="jgs-btn-gold text-sm"
          >
            <span>
              {isId
                ? 'Tandai Selesai Baca & Lanjut ke Video Kuliah ->'
                : 'Mark Reading Done & Watch Video ->'}
            </span>
          </button>
        </div>
      </div>
    </article>
  );

  // =========================================================================
  // ACTIVITY 02: CURATED INDONESIAN VIDEO LECTURE
  // =========================================================================
  const renderActivity2Video = () => (
    <article className="jgs-panel p-6 sm:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#EF4444]">
              <Youtube className="w-4 h-4" strokeWidth={1.5} />
              <span>{isId ? 'AKTIVITAS 02 • VIDEO PERKULIAHAN (INDONESIA)' : 'ACTIVITY 02 • VIDEO LECTURE'}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[var(--text-ivory)]">
              {activeLesson.studio.youtube.title}
            </h2>
          </div>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-gold)] hover:underline"
          >
            <span>{isId ? 'Tonton di YouTube ↗' : 'Watch on YouTube ↗'}</span>
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        </div>

        {!isPlayingHere ? (
          <div className="rounded-2xl border border-[#D6A937]/40 bg-[#14101A] overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-6 relative bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                alt={activeLesson.studio.youtube.title}
                className="w-full h-full min-h-[250px] object-cover"
              />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/85 border border-[#D6A937]/50 text-[11px] font-mono font-bold text-[#F3E5AB]">
                {activeLesson.studio.youtube.channelName}
              </span>
            </div>

            <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-4 text-[#F7F4EE]">
              <div className="space-y-3">
                <p className="text-sm text-[#E5DFF0] leading-relaxed">
                  <strong className="text-[#D6A937]">
                    {isId ? 'Poin Kunci Kuliah: ' : 'Key Lecture Takeaway: '}
                  </strong>
                  {isId
                    ? activeLesson.studio.youtube.keyTakeawayId
                    : activeLesson.studio.youtube.keyTakeawayEn}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeLesson.studio.youtube.timestamps.map((ts) => (
                    <span
                      key={`${ts.time}-${ts.topicEn}`}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#BEB6CE]"
                    >
                      <strong className="font-mono text-[#D6A937]">{ts.time}</strong>
                      <span>{isId ? ts.topicId : ts.topicEn}</span>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPlayingVideoSlug(activeLesson.slug)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#D6A937] to-[#F3E5AB] text-[#17131D] hover:brightness-105 transition"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isId ? 'Putar Video di Kelas' : 'Play Video In Class'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-[#D6A937]/45 bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={activeLesson.studio.youtube.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <button
              type="button"
              onClick={() => setPlayingVideoSlug(null)}
              className="text-xs font-semibold text-[var(--accent-gold)] hover:underline"
            >
              {isId ? '<- Tutup Player & Kembali ke Kartu Pratinjau' : '<- Close Video Player'}
            </button>
          </div>
        )}

        {/* Jessy's 3 Structured Video Takeaways Underneath Player */}
        <div className="rounded-2xl border border-[#D6A937]/30 bg-[var(--bg-surface-2)] p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <JessyPortrait mood="explaining" size={38} />
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)] block">
                {isId ? 'CATATAN JESSY DARI VIDEO KULIAH INI' : "JESSY'S 3 STRUCTURED VIDEO TAKEAWAYS"}
              </span>
              <h3 className="font-display font-bold text-sm text-[var(--text-ivory)]">
                {isId
                  ? '3 Poin Kunci yang Wajib Kamu Bawa ke Praktik MT5'
                  : '3 Key Insights to Bring Straight Into MT5 Practice'}
              </h3>
            </div>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
            <li className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-3.5 space-y-1">
              <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)]">01 • CORE IDEA</span>
              <p className="text-[var(--text-ivory)]">
                {isId
                  ? activeLesson.studio.youtube.keyTakeawayId
                  : activeLesson.studio.youtube.keyTakeawayEn}
              </p>
            </li>
            <li className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-3.5 space-y-1">
              <span className="font-mono text-[10px] font-bold text-[var(--accent-gold)]">
                02 • {activeLesson.studio.youtube.timestamps[0]?.time ?? 'KEY MOMENT'}
              </span>
              <p className="text-[var(--text-ivory)]">
                {activeLesson.studio.youtube.timestamps[0]
                  ? isId
                    ? activeLesson.studio.youtube.timestamps[0].topicId
                    : activeLesson.studio.youtube.timestamps[0].topicEn
                  : isId
                  ? 'Amati perubahan struktur dan konfirmasi waktu sebelum eksekusi.'
                  : 'Verify session liquidity and structural confirmation prior to clicking.'}
              </p>
            </li>
            <li className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-3.5 space-y-1">
              <span className="font-mono text-[10px] font-bold text-[#10B981]">03 • 1.000 USC RULE</span>
              <p className="text-[var(--text-ivory)]">{activeLesson.jeyStreetRule}</p>
            </li>
          </ol>
        </div>

        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goToActivity(1)}
            className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-ivory)]"
          >
            {isId ? '<- Kembali ke Diktat' : '<- Back to Reading'}
          </button>
          <button type="button" onClick={() => goToActivity(3)} className="jgs-btn-gold text-sm">
            <span>{isId ? 'Lanjut ke Laboratorium Pasar ->' : 'Next: Market Lab ->'}</span>
          </button>
        </div>
      </div>
    </article>
  );

  // =========================================================================
  // ACTIVITY 03: 3-STEP GUIDED TRADE WALKTHROUGH (+ OPTIONAL 600PX CHART)
  // =========================================================================
  const renderActivity3Lab = () => (
    <article className="jgs-panel p-6 sm:p-8 space-y-6">
      <GuidedWalkthroughLab lesson={activeLesson} isId={isId} />

      <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => goToActivity(2)}
          className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-ivory)]"
        >
          {isId ? '<- Kembali ke Video' : '<- Back to Video'}
        </button>
        <button type="button" onClick={() => goToActivity(4)} className="jgs-btn-gold text-sm">
          <span>{isId ? 'Lanjut ke Kuis & Ujian Esai (2 SKS) ->' : 'Next: Quiz & Essay Exam ->'}</span>
        </button>
      </div>
    </article>
  );

  // =========================================================================
  // ACTIVITY 04: 2 CHECKPOINTS (PART A) + MANDATORY ESSAY EXAM (PART B)
  // =========================================================================
  const renderActivity4Assessment = () => (
    <article className="jgs-panel p-6 sm:p-8 space-y-8 border-[#D6A937]/40">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Status Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
          <div className="flex items-center gap-3.5">
            <JessyPortrait
              mood={isModuleCompleted || isFullyPassed ? 'cheering' : 'explaining'}
              size={60}
            />
            <div className="space-y-1">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                {isId
                  ? `AKTIVITAS 04 • KUIS KONSEP & UJIAN ESAI PEMAHAMAN (${activeLesson.studio.sksCredits} SKS)`
                  : `ACTIVITY 04 • CONCEPT QUIZ & MANDATORY ESSAY EXAM (${activeLesson.studio.sksCredits} SKS)`}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {isModuleCompleted
                  ? isId
                    ? `Modul ${activeLesson.lessonNumber} LULUS resmi (${activeLesson.studio.sksCredits} SKS tercatat). Kamu tetap dapat menyempurnakan atau berlatih ulang di bawah.`
                    : `Module ${activeLesson.lessonNumber} PASSED (${activeLesson.studio.sksCredits} Credits recorded).`
                  : isId
                    ? 'Wajib menuntaskan Bagian A (2 Soal Dinamis) DAN Bagian B (Ujian Esai Pemahaman >= 75/100) untuk meraih 2 SKS!'
                    : 'Must pass BOTH Part A (2 Checkpoints) AND Part B (Analytical Essay >= 75/100) to unlock SKS credits!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span
              className={`px-3 py-1 rounded-full border ${
                partAPassed
                  ? 'border-[#10B981]/50 text-[#10B981]'
                  : 'border-[var(--border-subtle)] text-[var(--text-muted)]'
              }`}
            >
              Part A: {partAPassed ? 'OK' : 'Pending'}
            </span>
            <span
              className={`px-3 py-1 rounded-full border ${
                essayPassed
                  ? 'border-[#10B981]/50 text-[#10B981]'
                  : 'border-[var(--border-subtle)] text-[var(--text-muted)]'
              }`}
            >
              Part B Essay: {essayPassed ? 'Passed' : '>= 75'}
            </span>
          </div>
        </div>

        {/* PART A: 2 CONCEPTUAL & DYNAMIC MATH CHECKPOINTS */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[var(--text-ivory)]">
              {isId
                ? 'Bagian A: 2 Evaluasi Cepat Konsep & Hitungan Dinamis'
                : 'Part A, 2 Quick Conceptual & Dynamic Math Checkpoints'}
            </h2>
            <button
              type="button"
              onClick={handleRandomizeCaseNumbers}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--text-ivory)] hover:border-[#D6A937] transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#D6A937]" strokeWidth={1.5} />
              <span>{isId ? 'Acak Angka Kasus Baru' : 'New Numbers'}</span>
            </button>
          </div>

          {/* Checkpoint 1: Dynamic Numerical Case */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[var(--accent-gold)]">
                <Calculator className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>
                  {isId
                    ? `SOAL 1/2 • KASUS HITUNGAN DINAMIS (#${currentCaseSeed})`
                    : `CHECKPOINT 1/2 • DYNAMIC MATH CASE (#${currentCaseSeed})`}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setShowCaseHint(!showCaseHint)}
                className="text-[11px] font-semibold text-[#10B981] hover:underline"
              >
                {showCaseHint
                  ? isId
                    ? 'Tutup Petunjuk Rumus'
                    : 'Hide Hint'
                  : isId
                    ? 'Lihat Petunjuk Rumus'
                    : 'Show Hint'}
              </button>
            </div>

            <p className="text-sm sm:text-base font-bold text-[var(--text-ivory)] leading-snug">
              {dynamicCase.prompt}
            </p>

            {showCaseHint && (
              <div className="border-l-2 border-[#10B981] pl-3.5 py-1 text-xs text-[var(--text-secondary)]">
                {isId ? activeLesson.studio.caseTask.hintId : activeLesson.studio.caseTask.hintEn}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {dynamicCase.options.map((opt, idx) => {
                const picked = pickedCaseOpt === idx;
                const isRight = idx === dynamicCase.correctIndex;
                let cls =
                  'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/60';
                if (isPartASubmitted) {
                  if (isRight) cls = 'bg-[#10B981]/15 border-[#10B981] text-[#10B981] font-semibold';
                  else if (picked) cls = 'bg-[#EF4444]/15 border-[#EF4444] text-[#EF4444]';
                } else if (picked) {
                  cls = 'jgs-tab-active border-[#D6A937]';
                }
                return (
                  <button
                    key={`case-${currentCaseSeed}-${idx}`}
                    type="button"
                    onClick={() => {
                      setCaseSelected((prev) => ({ ...prev, [activeLesson.slug]: idx }));
                      setPartASubmitted((prev) => ({ ...prev, [activeLesson.slug]: false }));
                    }}
                    className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start gap-2.5 ${cls}`}
                  >
                    <span className="font-mono font-bold shrink-0">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {isPartASubmitted && (
              <p className="text-xs text-[var(--text-secondary)] pt-1">
                <strong className={caseCorrect ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                  {isId ? 'Pembahasan: ' : 'Solution: '}
                </strong>
                {dynamicCase.explanation}
              </p>
            )}
          </div>

          {/* Checkpoint 2: Conceptual Question */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-5 space-y-3">
            <div className="font-mono text-[11px] font-bold text-[#B99AE8]">
              {isId ? 'SOAL 2/2 • UJI PEMAHAMAN KONSEP INTI' : 'CHECKPOINT 2/2 • CORE CONCEPT QUIZ'}
            </div>
            <p className="text-sm sm:text-base font-bold text-[var(--text-ivory)]">
              {conceptQuiz.question}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {conceptQuiz.options.map((opt, optIdx) => {
                const selected = pickedQuizOpt === optIdx;
                const isRightOpt = optIdx === conceptQuiz.correctIndex;
                let cls =
                  'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/60';
                if (isPartASubmitted) {
                  if (isRightOpt) cls = 'bg-[#10B981]/15 border-[#10B981] text-[#10B981] font-semibold';
                  else if (selected) cls = 'bg-[#EF4444]/15 border-[#EF4444] text-[#EF4444]';
                } else if (selected) {
                  cls = 'jgs-tab-active border-[#D6A937]';
                }
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => {
                      setQuizAnswer((prev) => ({ ...prev, [activeLesson.slug]: optIdx }));
                      setPartASubmitted((prev) => ({ ...prev, [activeLesson.slug]: false }));
                    }}
                    className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start gap-2.5 ${cls}`}
                  >
                    <span className="font-mono font-bold shrink-0">
                      {String.fromCharCode(65 + optIdx)}.
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {isPartASubmitted && (
              <p className="text-xs text-[var(--text-secondary)] pt-1">
                <strong className={quizCorrect ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                  Jessy:{' '}
                </strong>
                {conceptQuiz.explanation}
              </p>
            )}
          </div>

          <div>
            <button
              type="button"
              disabled={pickedCaseOpt === undefined || pickedQuizOpt === null}
              onClick={handleCheckPartA}
              className="jgs-btn-outline text-xs sm:text-sm disabled:opacity-45 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)]" strokeWidth={1.5} />
              <span>{isId ? 'Periksa Jawaban Bagian A' : 'Check Part A Answers'}</span>
            </button>
          </div>
        </section>

        {/* PART B: MANDATORY ANALYTICAL ESSAY EXAMINATION + 4-PILLAR RUBRIC */}
        <section className="space-y-5 border-t border-[var(--border-subtle)] pt-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
              <PenTool className="w-4 h-4" strokeWidth={1.5} />
              <span>
                {isId
                  ? 'BAGIAN B, UJIAN ESAI PEMAHAMAN & STUDI KASUS (SYARAT MUTLAK SKS)'
                  : 'PART B, MANDATORY ANALYTICAL ESSAY EXAM (SKS REQUIREMENT)'}
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[var(--text-ivory)]">
              {isId ? 'Pembelaan Argumen Analitis Strategist' : 'Strategist Analytical Defense'}
            </h2>
          </div>

          {/* Real-World Dilemma Prompt */}
          <div className="border-l-2 border-[#D6A937] pl-5 py-1.5 text-sm sm:text-base text-[var(--text-ivory)] leading-relaxed">
            <RichFormattedText text={essayConfig.prompt} />
          </div>

          {/* Essay Editor with Live Word Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor={`essay-${activeLesson.slug}`} className="text-[var(--text-secondary)]">
                {isId
                  ? 'Tulis analisis lengkapmu di sini (hindari 1 kalimat pendek atau pengulangan kata):'
                  : 'Write your structured analytical response below:'}
              </label>
              <span
                className={`font-bold tabular-nums ${
                  currentWordCount >= essayConfig.minimumWords
                    ? 'text-[#10B981]'
                    : 'text-[var(--accent-gold)]'
                }`}
              >
                {currentWordCount} / {essayConfig.minimumWords} {isId ? 'kata min.' : 'min words'}
              </span>
            </div>

            <textarea
              id={`essay-${activeLesson.slug}`}
              rows={6}
              value={currentEssayText}
              onChange={(e) =>
                setEssayDrafts((prev) => ({ ...prev, [activeLesson.slug]: e.target.value }))
              }
              placeholder={
                isId
                  ? 'Contoh struktur argumen terbaik: Pertama, jelaskan mengapa ritel gagal di kasus ini secara mekanisme institusional... Kedua, hubungkan dengan pembatasan risiko 1% = 10 USC pada akun Cent 1.000 USC (1 oz)... Ketiga, nyatakan keputusan eksekusi konkretmu...'
                  : 'Structure clearly: (1) Explain why retail fails from institutional mechanics... (2) Connect position risk to 1% = 10 USC on 1 oz Cent... (3) State your disciplined execution rule...'
              }
              className="jgs-input text-sm sm:text-base leading-relaxed resize-y"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleEvaluateEssay}
              className="jgs-btn-gold text-sm"
            >
              <PenTool className="w-4 h-4" strokeWidth={1.5} />
              <span>
                {isId ? 'Serahkan Esai untuk Diuji Jessy' : 'Submit Essay for Jessy Grading'}
              </span>
            </button>

            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              {isId ? 'Syarat lulus esai: Skor >= 75 / 100 (Mutu B+)' : 'Pass threshold: >= 75 / 100'}
            </span>
          </div>

          {/* Interactive Essay Grading Report Card from Jessy */}
          {currentEssayResult && (
            <div className="rounded-2xl border border-[#D6A937]/40 bg-[var(--bg-surface-2)] p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
                <div className="flex items-center gap-3">
                  <JessyPortrait
                    mood={currentEssayResult.passed ? 'cheering' : 'warning'}
                    size={52}
                  />
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                      {isId ? 'RAPOR PENILAIAN 4 PILAR JESSY' : '4-PILLAR ESSAY RUBRIC REPORT CARD'}
                    </div>
                    <div className="font-display font-bold text-xl text-[var(--text-ivory)]">
                      {isId ? 'Skor Esai: ' : 'Essay Score: '}
                      <span className="font-mono font-bold text-[var(--accent-gold)]">
                        {currentEssayResult.score}/100
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`px-4 py-1.5 rounded-full font-mono text-xs font-bold border ${
                    currentEssayResult.passed
                      ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]'
                      : 'border-[#EF4444] bg-[#EF4444]/15 text-[#EF4444]'
                  }`}
                >
                  {isId ? 'MUTU: ' : 'GRADE: '}
                  {currentEssayResult.gradeLabel}
                </div>
              </div>

              {/* 4 Rubric Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentEssayResult.pillars.map((pil) => {
                  const pct = Math.round((pil.score / pil.max) * 100);
                  return (
                    <div key={pil.key} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--text-secondary)]">{pil.label}</span>
                        <span className="font-mono font-bold text-[var(--text-ivory)]">
                          {pil.score} / {pil.max}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[var(--bg-surface-1)] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D6A937] to-[#10B981] transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coaching Feedback */}
              <div className="flex items-start gap-2.5 text-sm text-[var(--text-ivory)] leading-relaxed pt-1">
                {!currentEssayResult.passed ? (
                  <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0 mt-1" strokeWidth={1.5} />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-1" strokeWidth={1.5} />
                )}
                <p>{currentEssayResult.feedback}</p>
              </div>

              {/* STRICT ANTI-LEAK GATE: Reveal Benchmark ONLY if passed (score >= 75); show 3 Guided Hints if < 75 */}
              {currentEssayResult.passed ? (
                <div className="border-t border-[#10B981]/30 pt-4 space-y-2">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#10B981]">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>
                      {isId
                        ? 'JAWABAN BENCHMARK CHIEF STRATEGIST (TERBUKA SETELAH LULUS)'
                        : 'CHIEF STRATEGIST BENCHMARK ANSWER (UNLOCKED ON PASS)'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    <RichFormattedText text={essayConfig.benchmarkAnswer} />
                  </p>
                </div>
              ) : (
                <div className="border-t border-[var(--border-subtle)] pt-4 space-y-3">
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                    <Lock className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>
                      {isId
                        ? 'BENCHMARK TERKUNCI (< 75), GUNAKAN 3 PETUNJUK BERPIKIR TERPANDU INI'
                        : 'BENCHMARK LOCKED (< 75), USE THESE 3 GUIDED THINKING HINTS'}
                    </span>
                  </div>
                  <ol className="space-y-2 text-xs sm:text-sm text-[var(--text-ivory)] leading-relaxed">
                    {essayConfig.guidanceHints.map((hint, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-3"
                      >
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D6A937]/15 border border-[#D6A937]/40 font-mono text-[11px] font-bold text-[var(--accent-gold)]">
                          {hIdx + 1}
                        </span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </section>

        {/* MODULE PASSING & NEXT MODULE ADVANCEMENT */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goToActivity(3)}
            className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-ivory)]"
          >
            {isId ? '<- Kembali ke Laboratorium Pasar' : '<- Back to Market Lab'}
          </button>

          {(isFullyPassed || isModuleCompleted) && (
            <button
              type="button"
              onClick={() => {
                if (!isModuleCompleted) {
                  onCompleteModuleFull(activeLesson.slug);
                }
                if (nextLesson) {
                  onSelectLesson(nextLesson.slug, nextLesson.trackId);
                  goToActivity(1);
                } else {
                  onOpenCertification();
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#10B981] text-[#09120F] shadow-md hover:brightness-105 transition"
            >
              {nextLesson ? (
                <span>
                  {isId
                    ? `LULUS MODUL (2 SKS) • Lanjut Modul ${nextLesson.lessonNumber} ->`
                    : `PASSED (2 SKS) • Next Module ${nextLesson.lessonNumber} ->`}
                </span>
              ) : (
                <>
                  <Award className="w-4 h-4" strokeWidth={1.5} />
                  <span>{isId ? `LULUS ${lessons.length} MODUL • Buka Ujian Ijazah ->` : 'Enter Final Exam ->'}</span>
                </>
              )}
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <div className="space-y-5 relative">
      <GoldConfettiBurst triggerKey={confettiKey} />
      {/* Focused University PJJ Studio Split-Screen Grid (No duplicate header) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <aside
          className={`${
            isSidebarVisible ? 'block' : 'hidden lg:block'
          } w-full lg:w-80 shrink-0 lg:sticky lg:top-[136px] jgs-panel p-4 space-y-4 lg:max-h-[calc(100vh-9.5rem)] lg:overflow-y-auto`}
        >
          <div className="space-y-2 pb-3 border-b border-[var(--border-subtle)]">
            <label
              htmlFor="pjj-semester-select"
              className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-gold)]"
            >
              <GraduationCap className="w-4 h-4" strokeWidth={1.5} />
              <span>{isId ? 'PILIH SEMESTER KULIAH' : 'SELECT SEMESTER'}</span>
            </label>
            <select
              id="pjj-semester-select"
              value={activeTrack.id}
              onChange={(e) => {
                const chosenTrackId = e.target.value;
                const firstMod = lessons.find((item) => item.trackId === chosenTrackId);
                onSelectTrack(chosenTrackId);
                if (firstMod) onSelectLesson(firstMod.slug, chosenTrackId);
                goToActivity(1);
              }}
              className="jgs-input text-xs font-semibold py-2 px-3"
            >
              {tracks.map((tr) => (
                <option key={tr.id} value={tr.id}>
                  Sem {tr.trackNumber} ({tr.courseCode}), {' '}
                  {tr.title.replace(/^Semester \d+\s*\([^)]+\):\s*/i, '')}
                </option>
              ))}
            </select>

            <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D6A937] to-[#10B981] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {semesterLessons.map((les) => {
              const done = completedSlugs.includes(les.slug);
              const caseDone = completedCaseSlugs.includes(les.slug);
              const isCurrent = les.slug === activeLesson.slug;

              return (
                <div
                  key={les.slug}
                  className={`rounded-xl border transition ${
                    isCurrent
                      ? 'border-[#D6A937]/60 bg-[var(--bg-surface-2)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface-1)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectLesson(les.slug, activeTrack.id);
                      goToActivity(1);
                    }}
                    className="w-full p-3 text-left flex items-start gap-2.5"
                  >
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" strokeWidth={1.5} />
                    ) : (
                      <Circle className="w-4 h-4 opacity-50 shrink-0 mt-0.5" strokeWidth={1.5} />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[var(--text-ivory)] leading-snug">
                        {les.lessonNumber}, {les.title}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5">
                        {les.studio.sksCredits} SKS
                        {done || caseDone ? (isId ? ' • Selesai' : ' • Done') : ''}
                      </div>
                    </div>
                  </button>

                  {isCurrent && (
                    <div className="px-2 pb-2.5 pt-1 border-t border-[var(--border-subtle)] space-y-1">
                      {activityItems.map((act) => {
                        const isActActive = activeActivity === act.num;
                        return (
                          <button
                            key={act.num}
                            type="button"
                            onClick={() => goToActivity(act.num)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2 transition ${
                              isActActive
                                ? 'jgs-tab-active font-bold shadow-sm'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-3)]/60'
                            }`}
                          >
                            {act.icon}
                            <span className="leading-snug flex-1">
                              {isId ? act.labelId : act.labelEn}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Workspace Stage */}
        <div className="flex-1 min-w-0">
          {activeActivity === 1 && renderActivity1Reading()}
          {activeActivity === 2 && renderActivity2Video()}
          {activeActivity === 3 && renderActivity3Lab()}
          {activeActivity === 4 && renderActivity4Assessment()}
        </div>
      </div>
    </div>
  );
}
