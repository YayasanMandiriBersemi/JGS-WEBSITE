'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Lock,
  Award,
  CheckCircle2,
  Circle,
  Download,
  FileText,
  RotateCcw,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Crown,
} from 'lucide-react';
import {
  generateDynamicFinalExam,
  type AcademyTrack,
  type AcademyLesson,
  type DynamicExamQuestionItem,
} from '@/lib/data/academy-lessons';
import {
  downloadGraduationDiplomaPng,
  downloadAcademicTranscriptPng,
} from '@/lib/canvas/jgs-card-exporter';
import { JessyPortrait } from '@/components/academy/JessyBuddyAssistant';
import { GoldConfettiBurst, Tilt3DCard } from '@/components/ui/LuxuryMotion';
import { injectLiveIdrRates } from '@/lib/currency/live-idr';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';
import {
  saveAcademyExamState,
  loadModuleEssays,
  type AcademyGraduationExamState,
  type SemesterTranscriptGrade,
} from '@/lib/storage/jgs-local-store';
import { useLocale } from '@/i18n/LocaleContext';

interface AcademyCertificationPortalProps {
  locale: 'id' | 'en';
  tracks: AcademyTrack[];
  lessons: AcademyLesson[];
  completedSlugs: string[];
  examState: AcademyGraduationExamState | null;
  onUpdateExamState: (next: AcademyGraduationExamState | null) => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
  gangId: string;
  onEnterModule: (trackId: string, slug: string) => void;
  onBackToLobby: () => void;
  onPassCelebrate: (msg: string) => void;
}

export function AcademyCertificationPortal({
  locale,
  tracks,
  lessons,
  completedSlugs,
  examState,
  onUpdateExamState,
  recipientName,
  setRecipientName,
  gangId,
  onEnterModule,
  onBackToLobby,
  onPassCelebrate,
}: AcademyCertificationPortalProps) {
  const isId = locale === 'id';
  const { l } = useLocale();
  const { usdIdrRate } = useLiveCurrency();

  const totalModules = lessons.length;
  const completedCount = completedSlugs.length;
  const totalSksPossible = lessons.reduce((acc, item) => acc + item.studio.sksCredits, 0);
  const earnedSks = lessons
    .filter((item) => completedSlugs.includes(item.slug))
    .reduce((acc, item) => acc + item.studio.sksCredits, 0);

  // STRICT HARD-LOCK: Must complete 100% of all 36 modules! Zero shortcuts!
  const isEligibleForExam = totalModules > 0 && completedCount >= totalModules;

  const firstUnfinished = useMemo(
    () => lessons.find((item) => !completedSlugs.includes(item.slug)) ?? null,
    [lessons, completedSlugs]
  );

  const [examNonce, setExamNonce] = useState<number>(202604);
  const [confettiKey, setConfettiKey] = useState<number>(0);
  const [specimenView, setSpecimenView] = useState<'DIPLOMA' | 'TRANSCRIPT'>('DIPLOMA');
  const [specimenName, setSpecimenName] = useState<string>('Asep Garpit');
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [submittedResult, setSubmittedResult] = useState<{
    passed: boolean;
    scorePercent: number;
    correctCount: number;
    wrongIds: string[];
  } | null>(null);

  useEffect(() => {
    setExamNonce(Math.floor(100000 + Math.random() * 899999));
  }, []);

  const dynamicExamQuestions: DynamicExamQuestionItem[] = useMemo(() => {
    const raw = generateDynamicFinalExam(isId, examNonce);
    return raw.map((q) => ({
      ...q,
      prompt: injectLiveIdrRates(q.prompt, usdIdrRate),
      options: q.options.map((opt) => injectLiveIdrRates(opt, usdIdrRate)),
      explanation: injectLiveIdrRates(q.explanation, usdIdrRate),
    }));
  }, [isId, examNonce, usdIdrRate]);

  function handleReshuffleExam() {
    setExamNonce(Math.floor(100000 + Math.random() * 899999));
    setExamAnswers({});
    setSubmittedResult(null);
  }

  function handleSubmitDynamicExam(e: React.FormEvent) {
    e.preventDefault();
    if (!isEligibleForExam) return;

    let correctCount = 0;
    const wrongIds: string[] = [];
    const savedEssays = loadModuleEssays();

    const semesterGrades: SemesterTranscriptGrade[] = dynamicExamQuestions.map((q, idx) => {
      const matchedTrack = tracks[idx];
      const trackEssayScores = matchedTrack
        ? lessons
            .filter((item) => item.trackId === matchedTrack.id)
            .map((item) => savedEssays[item.slug]?.score)
            .filter((val): val is number => typeof val === 'number')
        : [];
      const avgEssayForSem =
        trackEssayScores.length > 0
          ? trackEssayScores.reduce((s, v) => s + v, 0) / trackEssayScores.length
          : null;

      const correct = examAnswers[q.id] === q.correctIndex;
      if (correct) {
        correctCount += 1;
      } else {
        wrongIds.push(q.id);
      }

      // Dynamic course grade computed from actual semester essay mastery + exam verification
      const examPortion = correct ? 96 : 78;
      const scorePercent =
        avgEssayForSem !== null
          ? Math.round(examPortion * 0.6 + avgEssayForSem * 0.4)
          : examPortion;
      const letterGrade =
        scorePercent >= 93
          ? 'A'
          : scorePercent >= 88
            ? 'A-'
            : scorePercent >= 82
              ? 'B+'
              : 'B';

      return {
        code: q.semesterCode,
        title: matchedTrack?.title ?? q.semesterTitle,
        sks: matchedTrack?.sksCredits ?? 6,
        scorePercent,
        letterGrade,
      };
    });

    const totalQ = dynamicExamQuestions.length;
    const scorePercent = Math.round((correctCount / totalQ) * 100);
    const passed = scorePercent >= 80;

    setSubmittedResult({ passed, scorePercent, correctCount, wrongIds });

    if (passed) {
      const avgGpa =
        semesterGrades.reduce((sum, g) => {
          const pts =
            g.letterGrade === 'A'
              ? 4.0
              : g.letterGrade === 'A-'
                ? 3.7
                : g.letterGrade === 'B+'
                  ? 3.3
                  : 3.0;
          return sum + pts;
        }, 0) / Math.max(1, semesterGrades.length);

      const gpa = Number(avgGpa.toFixed(2));
      const honorsLabel =
        scorePercent >= 95
          ? 'SUMMA CUM LAUDE'
          : scorePercent >= 88
            ? 'MAGNA CUM LAUDE'
            : 'CUM LAUDE STRATEGIST';

      const cleanName = recipientName.trim() || (isId ? 'Alumni Strategis JGS' : 'JGS Graduate');
      const randFour = String(1000 + Math.floor(Math.random() * 8999));
      const yr = new Date().getFullYear();

      const saved: AcademyGraduationExamState = {
        passed: true,
        scorePercent,
        correctCount,
        totalQuestions: totalQ,
        recipientName: cleanName,
        passedAt: new Date().toISOString(),
        diplomaNumber: `JGS-DIP-${yr}-${randFour}`,
        transcriptSerial: `JGS-TRN-${yr}-${randFour}`,
        gpa,
        honorsLabel,
        semesterGrades,
      };

      saveAcademyExamState(saved);
      onUpdateExamState(saved);
      setConfettiKey((k) => k + 1);
      onPassCelebrate(
        isId
          ? `SELAMAT!! IPK ${gpa.toFixed(2)}/4.00 (${honorsLabel})! Kedua Dokumen Resmi: Ijazah & Transkrip 20 Semester sudah terbuka untuk dicetak!`
          : `CONGRATULATIONS!! GPA ${gpa.toFixed(2)}/4.00 (${honorsLabel})! Official 20-Semester Diploma & Transcript unlocked!`
      );
    }
  }

  function handleRetakeReset() {
    saveAcademyExamState(null);
    onUpdateExamState(null);
    handleReshuffleExam();
  }

  const formattedDate = useMemo(() => {
    const dt = examState?.passedAt ? new Date(examState.passedAt) : new Date();
    return dt.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }, [examState?.passedAt, isId]);

  const resolvedTranscriptGrades: SemesterTranscriptGrade[] = useMemo(() => {
    if (examState?.semesterGrades && examState.semesterGrades.length === 12) {
      return examState.semesterGrades;
    }
    return tracks.map((tr) => ({
      code: tr.courseCode,
      title: tr.title,
      sks: tr.sksCredits,
      scorePercent: 95,
      letterGrade: 'A',
    }));
  }, [examState?.semesterGrades, tracks]);

  function handleDownloadDiploma() {
    if (!examState?.passed) return;
    downloadGraduationDiplomaPng({
      recipientName: recipientName.trim() || examState.recipientName,
      gangId,
      scorePercent: examState.scorePercent,
      gradeLabel: examState.honorsLabel ?? 'CUM LAUDE STRATEGIST',
      diplomaNumber: examState.diplomaNumber,
      issuedDate: formattedDate,
      isId,
    });
  }

  function handleDownloadTranscript() {
    if (!examState?.passed) return;
    downloadAcademicTranscriptPng({
      recipientName: recipientName.trim() || examState.recipientName,
      gangId,
      gpa: examState.gpa ?? 3.92,
      honorsLabel: examState.honorsLabel ?? 'CUM LAUDE STRATEGIST',
      transcriptSerial:
        examState.transcriptSerial ?? examState.diplomaNumber.replace('DIP', 'TRN'),
      issuedDate: formattedDate,
      semesterGrades: resolvedTranscriptGrades,
      isId,
    });
  }

  return (
    <section className="space-y-6">
      {/* Top Guided Header Card with Jessy & Jey */}
      <div className="jgs-panel p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-[var(--border-subtle)] pb-6">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
            <div className="flex items-center -space-x-3 shrink-0">
              <JessyPortrait mood={examState?.passed ? 'cheering' : 'happy'} size={76} />
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#D6A937] bg-[#17131D] shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jey-mascot.png"
                  alt="Jey Mascot of The Jey Gang Strategist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <GoldConfettiBurst triggerKey={confettiKey} />
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                {examState?.passed ? (
                  <Award className="w-3.5 h-3.5" />
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
                <span>
                  {isId
                    ? 'PORTAL SERTIFIKASI & SIDANG KELULUSAN • ZERO SKIP POLICY'
                    : 'CAPSTONE CERTIFICATION PORTAL • STRICT ZERO-SKIP GATE'}
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-ivory)]">
                {isId
                  ? 'Ujian Akhir Dinamis 20 Semester, Ijazah Resmi & Transkrip Akademik'
                  : 'Anti-Cheat 20-Semester Final Exam, Official Diploma & Academic Transcript'}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {isId
                  ? `Syarat Mutlak Kelulusan: Tuntaskan 100% seluruh ${totalModules} Modul (${totalSksPossible} SKS) + Tugas Kasus Dinamis -> Lulus Ujian Dinamis ${dynamicExamQuestions.length} Soal >= 80%.`
                  : `Strict Requirement: Complete 100% of all ${totalModules} Modules (${totalSksPossible} Credits) + Case Assignments -> Score >= 80% on Randomized ${dynamicExamQuestions.length}-Question Final Exam.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToLobby}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--text-ivory)] hover:border-[#D6A937]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#D6A937]" />
            <span>{isId ? 'Kembali ke Kampus' : 'Back to Campus'}</span>
          </button>
        </div>

        {/* ============================================================
            DEMO MODEL SPECIMEN PREVIEW (SHOWN BEFORE 100% COMPLETION)
            ============================================================ */}
        {!examState?.passed && (
          <div className="rounded-3xl border border-[#D6A937]/40 bg-[var(--bg-surface-2)]/70 p-5 sm:p-7 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D6A937]/60 bg-[#D6A937]/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
                  <span>
                    {isId
                      ? `SPECIMEN PREVIEW: SELESAIKAN ${totalModules} MODUL UNTUK UNDUH RESMI`
                      : `SPECIMEN PREVIEW: COMPLETE ${totalModules} MODULES FOR OFFICIAL DOWNLOAD`}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-ivory)]">
                  {isId
                    ? 'Pratinjau Model Ijazah Resmi & Transkrip 20 Semester (Contoh Nama)'
                    : 'Interactive Demo Specimen: Official Diploma & 20-Semester Transcript'}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSpecimenView('DIPLOMA')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                    specimenView === 'DIPLOMA'
                      ? 'jgs-tab-active border-[#D6A937]'
                      : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  {isId ? 'Pratinjau Model Ijazah' : 'Preview Diploma Specimen'}
                </button>
                <button
                  type="button"
                  onClick={() => setSpecimenView('TRANSCRIPT')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                    specimenView === 'TRANSCRIPT'
                      ? 'jgs-tab-active border-[#D6A937]'
                      : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  {isId
                    ? `Pratinjau Model Transkrip (${tracks.length} Sem)`
                    : `Preview Transcript (${tracks.length} Sem)`}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-6 space-y-1">
                <label
                  htmlFor="jgs-specimen-name-input"
                  className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent-gold)]"
                >
                  {isId
                    ? 'Uji Nama di Contoh Specimen (Default: Asep Garpit)'
                    : 'Test Your Name on Specimen Preview'}
                </label>
                <input
                  id="jgs-specimen-name-input"
                  type="text"
                  value={specimenName}
                  onChange={(e) => setSpecimenName(e.target.value)}
                  className="jgs-themed-input w-full px-3.5 py-2 rounded-xl text-sm font-semibold"
                />
              </div>
              <div className="sm:col-span-6 flex items-center justify-end">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] text-xs font-mono text-[var(--text-muted)]">
                  <Lock className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>
                    {isId
                      ? `Unduh PNG HD Terkunci (${completedCount}/${totalModules} Modul)`
                      : `HD PNG Download Locked (${completedCount}/${totalModules} Modules)`}
                  </span>
                </span>
              </div>
            </div>

            {specimenView === 'DIPLOMA' ? (
              <Tilt3DCard maxTilt={3}>
                <div className="jgs-centurion-dark rounded-2xl border-2 border-[#D6A937]/70 p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D6A937]/25 pb-3">
                    <div className="jgs-card-gold text-[11px] font-mono tracking-[0.18em] uppercase">
                      SPECIMEN // THE JEY GANG STRATEGIST ACADEMY • {totalSksPossible} SKS
                    </div>
                    <div className="jgs-card-muted text-[11px] font-mono">
                      SERIAL: JGS-DIP-2026-884129 • GANG ID: #0109200426
                    </div>
                  </div>

                  <div className="text-center space-y-2.5 py-2">
                    <div className="jgs-card-gold text-[11px] font-bold uppercase tracking-[0.24em]">
                      {isId
                        ? `IJAZAH KELULUSAN RESMI (${tracks.length} SEMESTER & EKSEKUSI PRESISI)`
                        : `OFFICIAL DIPLOMA (${tracks.length} SEMESTERS • QUANTITATIVE STRATEGY)`}
                    </div>
                    <p className="jgs-card-muted text-xs">
                      {isId ? 'Dianugerahkan secara sah kepada:' : 'Officially conferred upon:'}
                    </p>
                    <div className="jgs-card-gold font-display text-2xl sm:text-4xl font-extrabold tracking-[-0.02em]">
                      {specimenName.trim() || 'Asep Garpit'}
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-xs font-mono text-[#10B981]">
                      <span>SCORE 96/100 ({tracks.length}/{tracks.length}) • SUMMA CUM LAUDE • IPK 3.98</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#D6A937]/25 pt-4">
                    <div className="flex items-center gap-3">
                      <svg
                        viewBox="0 0 36 36"
                        className="w-12 h-12 rounded-lg bg-[#F7F4EE] p-1 shrink-0"
                        role="img"
                        aria-label="JGS Verification Seal QR Code"
                      >
                        <rect x="2" y="2" width="10" height="10" fill="#14101A" />
                        <rect x="4" y="4" width="6" height="6" fill="#F7F4EE" />
                        <rect x="5" y="5" width="4" height="4" fill="#14101A" />
                        <rect x="24" y="2" width="10" height="10" fill="#14101A" />
                        <rect x="26" y="4" width="6" height="6" fill="#F7F4EE" />
                        <rect x="27" y="5" width="4" height="4" fill="#14101A" />
                        <rect x="2" y="24" width="10" height="10" fill="#14101A" />
                        <rect x="4" y="26" width="6" height="6" fill="#F7F4EE" />
                        <rect x="5" y="27" width="4" height="4" fill="#14101A" />
                        <rect x="15" y="4" width="4" height="4" fill="#14101A" />
                        <rect x="16" y="13" width="6" height="6" fill="#14101A" />
                        <rect x="24" y="16" width="8" height="4" fill="#14101A" />
                        <rect x="16" y="24" width="6" height="8" fill="#14101A" />
                        <rect x="26" y="26" width="6" height="6" fill="#D6A937" />
                      </svg>
                      <div className="text-left text-[11px]">
                        <div className="jgs-card-gold font-bold uppercase tracking-wider">
                          {isId ? 'Verifikasi Digital' : 'Digital Verify'}
                        </div>
                        <div className="jgs-card-muted font-mono">SPECIMEN MODEL</div>
                      </div>
                    </div>

                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D6A937] to-[#8C6214] border-2 border-[#14101A] shadow-xl flex flex-col items-center justify-center text-[#14101A] shrink-0">
                      <Crown className="w-4 h-4" strokeWidth={1.75} />
                      <span className="font-mono text-[8px] font-bold">{totalSksPossible} SKS</span>
                    </div>

                    <div className="text-center space-y-1">
                      <svg
                        viewBox="0 0 220 56"
                        className="w-36 h-10 mx-auto"
                        role="img"
                        aria-label="Signature Specimen of Jahseya Mochtar Mawardi"
                      >
                        <path
                          d="M 18 42 C 28 12, 42 8, 40 38 C 39 48, 25 50, 34 36 C 52 24, 68 20, 74 36 C 80 44, 96 14, 108 34 C 118 42, 134 22, 152 34 C 166 42, 184 26, 206 30"
                          fill="none"
                          stroke="#F3E5AB"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="jgs-card-gold text-[11px] font-bold tracking-wider">
                        JAHSEYA MOCHTAR MAWARDI
                      </div>
                      <div className="jgs-card-muted text-[9px] uppercase tracking-wider">
                        Founder &amp; Chief Strategist, JGS
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            ) : (
              <div className="rounded-2xl border border-[#10B981]/45 bg-[#120E19] text-[#F7F4EE] p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="font-mono text-[10px] font-bold text-[#10B981]">
                      SPECIMEN TRANSKRIP AKADEMIK {tracks.length} SEMESTER
                    </div>
                    <div className="text-sm font-bold text-[#F3E5AB]">
                      {specimenName.trim() || 'Asep Garpit'} • ID #0109200426
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-sm font-bold text-[#10B981]">IPK SPECIMEN: 3.94 / 4.00</div>
                    <div className="text-[10px] text-[#B8AFC7]">TOTAL {totalSksPossible} SKS</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {tracks.map((tr, idx) => (
                    <div
                      key={tr.id}
                      className="rounded-xl border border-white/10 bg-[#1B1526] px-3.5 py-2.5 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] font-bold text-[#D6A937]">
                          {tr.courseCode} • {tr.sksCredits} SKS
                        </div>
                        <div className="text-xs text-[#F3EFF8] truncate">
                          {tr.title.replace(/^Semester \d+\s*\([^)]+\):\s*/i, '')}
                        </div>
                      </div>
                      <span className="font-display text-sm font-bold text-[#10B981] shrink-0">
                        {idx % 3 === 0 ? 'A-' : 'A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            GATE 1: STRICT HARD-LOCK READINESS CHECKLIST (IF < 60/60)
            ============================================================ */}
        {!isEligibleForExam && !examState?.passed && (
          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-[#EF4444]/40 bg-[#1A0D16] p-6 space-y-4 text-[#F7F4EE]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-[#EF4444] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-[#EF4444]">
                      {isId
                        ? `UJIAN AKHIR & IJAZAH TERKUNCI (${completedCount}/${totalModules} MODUL • ${earnedSks}/${totalSksPossible} SKS)`
                        : `FINAL EXAM & DIPLOMA HARD-LOCKED (${completedCount}/${totalModules} MODULES • ${earnedSks}/${totalSksPossible} CREDITS)`}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E5DFF0] leading-relaxed">
                      {isId
                        ? 'Tidak ada tombol loncat ujian atau pratinjau tanpa belajar. Selesaikan seluruh Tugas Studi Kasus Dinamis & Kuis Evaluasi pada modul yang masih kosong di daftar Semester di bawah ini!'
                        : 'Zero exam shortcuts or preview bypasses exist. Complete every remaining Dynamic Case Assignment & Quiz across all Semesters below to unlock your anti-cheat Final Exam!'}
                    </p>
                  </div>
                </div>

                {firstUnfinished && (
                  <button
                    type="button"
                    onClick={() => onEnterModule(firstUnfinished.trackId, firstUnfinished.slug)}
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#D6A937] to-[#F3E5AB] text-[#17131D] shadow-lg hover:brightness-105 transition"
                  >
                    <span>
                      {isId
                        ? `Lanjutkan Modul ${firstUnfinished.lessonNumber} ->`
                        : `Resume Module ${firstUnfinished.lessonNumber} ->`}
                    </span>
                  </button>
                )}
              </div>

              <div className="w-full h-2.5 rounded-full bg-black/50 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D6A937] to-[#10B981] transition-all duration-500"
                  style={{
                    width: `${Math.round((completedCount / Math.max(1, totalModules)) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* 12-Semester Readiness Audit Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tracks.map((tr) => {
                const trLessons = lessons.filter((item) => item.trackId === tr.id);
                const trDone = trLessons.filter((item) =>
                  completedSlugs.includes(item.slug)
                ).length;
                const trComplete = trDone === trLessons.length;

                return (
                  <div
                    key={tr.id}
                    className={`rounded-2xl border p-4 space-y-3 ${
                      trComplete
                        ? 'border-[#10B981]/45 bg-[#10B981]/10'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface-2)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--accent-gold)]">
                        {tr.courseCode} • {tr.sksCredits} SKS
                      </span>
                      <span
                        className={`text-[11px] font-mono font-bold ${
                          trComplete ? 'text-[#10B981]' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {trDone}/{trLessons.length}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[var(--text-ivory)]">{tr.title}</div>

                    <div className="space-y-1.5">
                      {trLessons.map((les) => {
                        const done = completedSlugs.includes(les.slug);
                        return (
                          <button
                            key={les.slug}
                            type="button"
                            onClick={() => onEnterModule(tr.id, les.slug)}
                            className="w-full text-left flex items-center justify-between gap-2 text-xs py-1 hover:text-[var(--accent-gold)] transition"
                          >
                            <span className="inline-flex items-center gap-1.5 truncate">
                              {done ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
                              )}
                              <span
                                className={
                                  done
                                    ? 'text-[var(--text-secondary)] truncate'
                                    : 'text-[var(--text-ivory)] font-semibold truncate'
                                }
                              >
                                {les.lessonNumber} {les.title}
                              </span>
                            </span>
                            {!done && <ArrowRight className="w-3 h-3 shrink-0 text-[#D6A937]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================
            GATE 2: PASSED, DUAL GRADUATION DOCUMENTS STUDIO (1920x1350)
            ============================================================ */}
        {examState?.passed && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#10B981]/45 bg-[#10B981]/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-mono text-xs font-bold text-[#10B981]">
                    LULUS RESMI • IPK / GPA {(examState.gpa ?? 3.92).toFixed(2)} / 4.00 •{' '}
                    {examState.honorsLabel ?? 'CUM LAUDE STRATEGIST'}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-ivory)]">
                    {isId
                      ? 'Ijazah Kelulusan & Transkrip Akademik 20 Semester milikmu telah diterbitkan sah dengan tanda tangan Founder Jahseya Mochtar Mawardi.'
                      : 'Both your Official Graduation Diploma and 20-Semester Academic Transcript are officially issued and ready for HD PNG download.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRetakeReset}
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-ivory)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isId ? 'Ulangi Ujian Dinamis' : 'Retake Dynamic Exam'}</span>
              </button>
            </div>

            {/* Editable Student Legal Name & Dual HD PNG Action Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              <div className="lg:col-span-4 space-y-1.5">
                <label
                  htmlFor="jgs-grad-legal-name"
                  className="block text-xs font-semibold text-[var(--text-secondary)]"
                >
                  {isId ? 'Nama Resmi Pada Ijazah & Transkrip' : 'Official Student Name on Documents'}
                </label>
                <input
                  id="jgs-grad-legal-name"
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="jgs-themed-input w-full px-4 py-2.5 rounded-xl text-sm font-medium"
                />
              </div>

              <div className="lg:col-span-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleDownloadDiploma}
                  className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#D6A937] to-[#F3E5AB] text-[#17131D] shadow-lg hover:brightness-105 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isId ? 'Unduh Ijazah Resmi (PNG 1920×1350)' : 'Download Official Diploma PNG'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadTranscript}
                  className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#10B981] text-[#09120F] shadow-lg hover:brightness-105 transition"
                >
                  <FileText className="w-4 h-4" />
                  <span>
                    {isId
                      ? 'Unduh Transkrip 20 Semester (PNG 1920x1350)'
                      : 'Download 20-Sem Transcript PNG'}
                  </span>
                </button>

                <Link
                  href={l('/account')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--text-ivory)] hover:border-[#D6A937]"
                >
                  <span>{isId ? 'Kartu Gang ->' : 'Gang ID ->'}</span>
                </Link>
              </div>
            </div>

            {/* DOCUMENT 1 LIVE PREVIEW CARD: OFFICIAL DIPLOMA (3D Tilt Specular Preview) */}
            <Tilt3DCard maxTilt={5}>
              <div className="jgs-centurion-dark rounded-2xl border-2 border-[#D6A937]/75 p-6 sm:p-10 shadow-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D6A937]/25 pb-4">
                  <div className="jgs-card-gold text-xs font-mono tracking-[0.2em] uppercase">
                    DOCUMENT 1 // THE JEY GANG STRATEGIST ACADEMY • {totalSksPossible} SKS
                  </div>
                  <div className="jgs-card-muted text-[11px] font-mono">
                    SERIAL: {examState.diplomaNumber} • GANG MEMBER ID: #{gangId}
                  </div>
                </div>

                <div className="text-center space-y-3 py-2">
                  <div className="jgs-card-gold text-xs uppercase tracking-[0.26em]">
                    {isId
                      ? 'IJAZAH KELULUSAN RESMI (20 SEMESTER INDUSTRI FINANSIAL & EKSEKUSI PRESISI)'
                      : 'OFFICIAL DIPLOMA OF FINANCIAL & QUANTITATIVE MASTERY (20 SEMESTERS)'}
                  </div>
                  <p className="jgs-card-muted text-xs">
                    {isId ? 'Dianugerahkan secara sah kepada:' : 'Officially conferred upon:'}
                  </p>
                  <div className="jgs-card-gold font-display text-2xl sm:text-4xl font-extrabold tracking-[-0.02em]">
                    {recipientName.trim() || examState.recipientName}
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-xs font-mono text-[#10B981]">
                    <span>
                      SCORE {examState.scorePercent}/100 ({examState.correctCount}/
                      {examState.totalQuestions}) • {examState.honorsLabel ?? 'CUM LAUDE STRATEGIST'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#D6A937]/25 pt-5">
                  <div className="text-center sm:text-left text-xs">
                    <div className="jgs-card-gold text-[10px] uppercase tracking-widest">
                      {isId ? 'Tanggal Terbit' : 'Issued Date'}
                    </div>
                    <div className="jgs-card-ink font-semibold">{formattedDate}</div>
                  </div>

                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D6A937] to-[#8C6214] border-2 border-[#14101A] shadow-xl flex flex-col items-center justify-center text-[#14101A] shrink-0">
                    <Crown className="w-5 h-5" strokeWidth={1.75} />
                    <span className="font-mono text-[9px] font-bold tracking-wider">{totalSksPossible} SKS</span>
                  </div>

                  <div className="text-center space-y-1">
                    <svg
                      viewBox="0 0 220 56"
                      className="w-44 h-12 mx-auto"
                      role="img"
                      aria-label="Signature of Jahseya Mochtar Mawardi"
                    >
                      <path
                        d="M 18 42 C 28 12, 42 8, 40 38 C 39 48, 25 50, 34 36 C 52 24, 68 20, 74 36 C 80 44, 96 14, 108 34 C 118 42, 134 22, 152 34 C 166 42, 184 26, 206 30"
                        fill="none"
                        stroke="#F3E5AB"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="jgs-card-gold text-xs font-bold tracking-wider">
                      JAHSEYA MOCHTAR MAWARDI
                    </div>
                    <div className="jgs-card-muted text-[10px] uppercase tracking-wider">
                      Founder &amp; Chief Strategist, The Jey Gang Strategist
                    </div>
                  </div>
                </div>
              </div>
            </Tilt3DCard>

            {/* DOCUMENT 2 LIVE PREVIEW TABLE: 20-SEMESTER ACADEMIC TRANSCRIPT */}
            <div className="rounded-2xl border border-[#10B981]/50 bg-[#120E19] text-[#F7F4EE] p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="font-mono text-[11px] font-bold text-[#10B981]">
                    DOCUMENT 2 // TRANSKRIP NILAI AKADEMIK 20 SEMESTER
                  </div>
                  <div className="text-sm font-bold text-[#F3E5AB]">
                    {recipientName.trim() || examState.recipientName} • ID #{gangId}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-base font-bold text-[#10B981]">
                    IPK / GPA: {(examState.gpa ?? 3.92).toFixed(2)} / 4.00
                  </div>
                  <div className="text-[11px] text-[#B8AFC7]">
                    {totalSksPossible} SKS • {examState.transcriptSerial ?? 'JGS-TRN-2026'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resolvedTranscriptGrades.map((row) => (
                  <div
                    key={row.code}
                    className="rounded-xl border border-white/10 bg-[#1B1526] px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] font-bold text-[#D6A937]">
                        {row.code} • {row.sks} SKS
                      </div>
                      <div className="text-xs text-[#F3EFF8] truncate">
                        {row.title.replace(/^Semester \d+\s*\([^)]+\):\s*/i, '')}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display text-lg font-bold text-[#10B981]">
                        {row.letterGrade}
                      </span>
                      <span className="block font-mono text-[10px] text-[#B8AFC7]">
                        {row.scorePercent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            GATE 3: UNLOCKED DYNAMIC ANTI-CHEATING 12-SEMESTER EXAM FORM
            ============================================================ */}
        {isEligibleForExam && !examState?.passed && (
          <form onSubmit={handleSubmitDynamicExam} className="space-y-5">
            <div className="rounded-xl border border-[#10B981]/40 bg-[#10B981]/10 p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-[var(--text-ivory)]">
                <strong className="text-[#10B981]">
                  {isId ? `SYARAT ${totalSksPossible} SKS TERPENUHI! ` : `${totalSksPossible} CREDITS VERIFIED! `}
                </strong>
                {isId
                  ? `Ujian Dinamis Anti-Nyontek Sesi #${examNonce} siap dikerjakan (${dynamicExamQuestions.length} Soal acak lintas Semester FIN-101 s/d CMP-505 • Minimal Lulus >= 80%).`
                  : `Randomized Final Exam Session #${examNonce} unlocked (${dynamicExamQuestions.length} dynamic questions across FIN-101 to CMP-505 • >= 80% passing threshold).`}
              </div>

              <button
                type="button"
                onClick={handleReshuffleExam}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--text-ivory)] hover:border-[#D6A937]"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#D6A937]" />
                <span>{isId ? 'Acak Soal Ujian Baru' : 'Reshuffle Exam Numbers'}</span>
              </button>
            </div>

            {dynamicExamQuestions.map((q, idx) => {
              const picked = examAnswers[q.id];
              const isWrong = submittedResult && submittedResult.wrongIds.includes(q.id);
              return (
                <div
                  key={`${examNonce}-${q.id}`}
                  className={`p-4 sm:p-5 rounded-xl border space-y-3 ${
                    isWrong
                      ? 'bg-[#EF4444]/10 border-[#EF4444]/40'
                      : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-[var(--accent-gold)]">
                      SOAL {idx + 1} / {dynamicExamQuestions.length} • {q.semesterCode}, {' '}
                      {q.semesterTitle}
                    </span>
                    {isWrong && (
                      <button
                        type="button"
                        onClick={() => onEnterModule(tracks[idx]?.id ?? 'track-01', q.reviewSlug)}
                        className="text-[11px] font-semibold text-[#EF4444] hover:underline"
                      >
                        {isId ? 'Buka Ulang Kuliah Modul ->' : 'Review Module ->'}
                      </button>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-[var(--text-ivory)]">{q.prompt}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const selected = picked === optIdx;
                      return (
                        <button
                          key={`${q.id}-opt-${optIdx}`}
                          type="button"
                          onClick={() =>
                            setExamAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                          }
                          className={`text-left p-3.5 rounded-xl border text-xs font-medium transition flex items-start gap-2.5 ${
                            selected
                              ? 'jgs-tab-active border-[#D6A937]'
                              : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[#D6A937]/50'
                          }`}
                        >
                          <span className="font-mono font-bold shrink-0">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {submittedResult && (
                    <p className="text-xs text-[var(--text-secondary)]">
                      <strong className="text-[var(--accent-gold)]">
                        {isId ? 'Penjelasan: ' : 'Explanation: '}
                      </strong>
                      {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}

            {submittedResult && !submittedResult.passed && (
              <div className="p-4 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 text-xs sm:text-sm text-[#EF4444]">
                {isId
                  ? `Nilai Ujian ${submittedResult.scorePercent}% (${submittedResult.correctCount}/${dynamicExamQuestions.length} benar). Kelulusan mewajibkan >= 80% (minimal ${Math.ceil(dynamicExamQuestions.length * 0.8)}/${dynamicExamQuestions.length} benar). Klik "Acak Soal Ujian Baru" atau tinjau soal merah di atas!`
                  : `Score ${submittedResult.scorePercent}% (${submittedResult.correctCount}/${dynamicExamQuestions.length}). Minimum passing grade is >= 80% (${Math.ceil(dynamicExamQuestions.length * 0.8)}/${dynamicExamQuestions.length}).`}
              </div>
            )}

            <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
              <div className="space-y-1 flex-1 min-w-[220px]">
                <label
                  htmlFor="jgs-exam-legal-input"
                  className="block text-xs font-semibold text-[var(--text-secondary)]"
                >
                  {isId
                    ? 'Nama Lengkap Resmi Untuk Ijazah & Transkrip'
                    : 'Official Full Name For Diploma & Transcript'}
                </label>
                <input
                  id="jgs-exam-legal-input"
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="jgs-themed-input w-full px-4 py-2.5 rounded-xl text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={Object.keys(examAnswers).length < dynamicExamQuestions.length}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D6A937] to-[#F3E5AB] text-[#17131D] disabled:opacity-45 disabled:cursor-not-allowed shadow-lg hover:brightness-105 transition"
              >
                <Award className="w-4 h-4" />
                <span>
                  {isId
                    ? `Kirim Ujian ${tracks.length} Semester & Verifikasi Kelulusan`
                    : `Submit ${tracks.length}-Semester Exam & Verify`}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
