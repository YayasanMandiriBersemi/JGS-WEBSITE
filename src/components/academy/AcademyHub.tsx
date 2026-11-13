'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Award, ChevronDown, Lock } from 'lucide-react';
import {
  ACADEMY_TRACKS,
  ACADEMY_LESSONS,
  getLocalizedTrack,
  getLocalizedLesson,
} from '@/lib/data/academy-lessons';
import { AcademyLobbyView } from '@/components/academy/AcademyLobbyView';
import { AcademyLmsCourseView } from '@/components/academy/AcademyLmsCourseView';
import { AcademyCertificationPortal } from '@/components/academy/AcademyCertificationPortal';
import {
  GlobalFloatingJessyDrawer,
  type JessyMood,
} from '@/components/academy/JessyBuddyAssistant';
import { useLocale } from '@/i18n/LocaleContext';
import {
  loadCompletedLessonSlugs,
  markLessonCompleted,
  loadCompletedCaseSlugs,
  markCaseTaskCompleted,
  loadStrategistSession,
  generateTenDigitGangId,
  loadAcademyExamState,
  type AcademyGraduationExamState,
} from '@/lib/storage/jgs-local-store';

type HubTopTab = 'lobby' | 'classroom' | 'certification';

export function AcademyHub() {
  const { locale, isId } = useLocale();
  const loc = locale === 'id' ? 'id' : 'en';
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<HubTopTab>('lobby');
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [completedCaseSlugs, setCompletedCaseSlugs] = useState<string[]>([]);
  const [activeTrackId, setActiveTrackId] = useState<string>(ACADEMY_TRACKS[0]?.id ?? 'track-01');
  const [activeLessonSlug, setActiveLessonSlug] = useState<string>(
    ACADEMY_LESSONS[0]?.slug ?? 'money-history-and-inflation'
  );
  const [activeSlide, setActiveSlide] = useState<number>(1);

  const [jessyMood, setJessyMood] = useState<JessyMood>('happy');
  const [jessyNote, setJessyNote] = useState<string | null>(null);
  const [jessyDrawerOpen, setJessyDrawerOpen] = useState(false);
  const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.jgsStudio = activeTab;
    }
    return () => {
      if (typeof document !== 'undefined') {
        delete document.body.dataset.jgsStudio;
      }
    };
  }, [activeTab]);

  const [examState, setExamState] = useState<AcademyGraduationExamState | null>(null);
  const [recipientName, setRecipientName] = useState<string>('Calon Strategis JGS');
  const [gangId, setGangId] = useState<string>('2702285126');

  useEffect(() => {
    setCompletedSlugs(loadCompletedLessonSlugs());
    setCompletedCaseSlugs(loadCompletedCaseSlugs());

    const session = loadStrategistSession();
    if (session?.displayName) {
      setRecipientName(session.displayName);
    }
    if (session?.gangId) {
      setGangId(session.gangId);
    } else {
      setGangId(generateTenDigitGangId('JGS-ACADEMY-GRAD'));
    }

    const savedExam = loadAcademyExamState();
    if (savedExam) {
      setExamState(savedExam);
      if (savedExam.recipientName) {
        setRecipientName(savedExam.recipientName);
      }
      if (savedExam.passed) {
        setJessyMood('cheering');
      }
    }
  }, []);

  useEffect(() => {
    const queryTab = searchParams.get('tab');
    if (queryTab === 'classroom' || queryTab === 'certification' || queryTab === 'lobby') {
      setActiveTab(queryTab);
    } else if (typeof window !== 'undefined' && window.location.hash === '#ujian-kelulusan') {
      setActiveTab('certification');
    }
  }, [searchParams]);

  function switchTopTab(nextTab: HubTopTab) {
    setActiveTab(nextTab);
    if (pathname) {
      router.replace(`${pathname}?tab=${nextTab}`, { scroll: false });
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const localizedTracks = useMemo(
    () => ACADEMY_TRACKS.map((track) => getLocalizedTrack(track, loc)),
    [loc]
  );

  const localizedLessons = useMemo(
    () => ACADEMY_LESSONS.map((lesson) => getLocalizedLesson(lesson, loc)),
    [loc]
  );

  const activeLesson = useMemo(() => {
    const bySlug = localizedLessons.find((item) => item.slug === activeLessonSlug);
    if (bySlug && bySlug.trackId === activeTrackId) return bySlug;
    return localizedLessons.find((item) => item.trackId === activeTrackId) ?? localizedLessons[0];
  }, [localizedLessons, activeLessonSlug, activeTrackId]);

  const activeTrack = useMemo(
    () =>
      localizedTracks.find((tr) => tr.id === activeLesson?.trackId) ??
      localizedTracks.find((tr) => tr.id === activeTrackId) ??
      localizedTracks[0],
    [localizedTracks, activeLesson?.trackId, activeTrackId]
  );

  const activeTrackLessons = useMemo(
    () => localizedLessons.filter((item) => item.trackId === activeTrack.id),
    [localizedLessons, activeTrack.id]
  );

  const totalLessons = localizedLessons.length;
  const completedCount = completedSlugs.length;
  const totalSksPossible = localizedLessons.reduce((acc, item) => acc + item.studio.sksCredits, 0);
  const totalSksEarned = localizedLessons
    .filter((item) => completedSlugs.includes(item.slug))
    .reduce((acc, item) => acc + item.studio.sksCredits, 0);
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isAllEligible = totalLessons > 0 && completedCount >= totalLessons;

  function handleEnterClassroom(trackId?: string, lessonSlug?: string) {
    const targetTrack = trackId ?? activeTrackId;
    setActiveTrackId(targetTrack);
    if (lessonSlug) {
      setActiveLessonSlug(lessonSlug);
    } else {
      const candidates = localizedLessons.filter((item) => item.trackId === targetTrack);
      const firstUnfinished =
        candidates.find((item) => !completedSlugs.includes(item.slug)) ?? candidates[0];
      if (firstUnfinished) {
        setActiveLessonSlug(firstUnfinished.slug);
      }
    }
    setActiveSlide(1);
    setJessyMood('explaining');
    setJessyNote(null);
    switchTopTab('classroom');
  }

  function scrollToClassroomTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleSetActiveSlide(slideNum: React.SetStateAction<number>) {
    setActiveSlide(slideNum);
    scrollToClassroomTop();
  }

  function handleSelectTrack(trackId: string) {
    setActiveTrackId(trackId);
    const candidates = localizedLessons.filter((item) => item.trackId === trackId);
    const firstUnfinished =
      candidates.find((item) => !completedSlugs.includes(item.slug)) ?? candidates[0];
    if (firstUnfinished) {
      setActiveLessonSlug(firstUnfinished.slug);
    }
    setActiveSlide(1);
    setJessyMood('explaining');
    setJessyNote(null);
    scrollToClassroomTop();
  }

  function handleSelectLesson(slug: string, trackId?: string) {
    if (trackId) setActiveTrackId(trackId);
    setActiveLessonSlug(slug);
    setActiveSlide(1);
    setJessyMood('explaining');
    setJessyNote(null);
    scrollToClassroomTop();
  }

  function handleCompleteModuleFull(slug: string) {
    setCompletedCaseSlugs(markCaseTaskCompleted(slug));
    setCompletedSlugs(markLessonCompleted(slug));
  }

  function handleJumpToSlide(slideNum: number) {
    switchTopTab('classroom');
    setActiveSlide(slideNum);
  }

  return (
    <div id="ujian-kelulusan" className="pb-28">
      {/* ============================================================
          PORTAL A: FULL-BLEED LUXURY WELCOME LOBBY + RELOCATED DOSSIER
          (Zero Cluttered Top Box Header Above Hero!)
          ============================================================ */}
      {activeTab === 'lobby' && (
        <AcademyLobbyView
          locale={loc}
          tracks={localizedTracks}
          lessons={localizedLessons}
          completedSlugs={completedSlugs}
          activePortal={activeTab}
          isExamUnlocked={isAllEligible || Boolean(examState?.passed)}
          onSwitchPortal={switchTopTab}
          onEnterClassroom={handleEnterClassroom}
          onOpenCertification={() => switchTopTab('certification')}
        />
      )}

      {/* ============================================================
          SINGLE SLIM 56PX STICKY STUDIO BAR + DISTRACTION-FREE WORKSPACE
          ============================================================ */}
      {activeTab !== 'lobby' && (
        <div>
          <div className="sticky top-16 z-30 min-h-[56px] border-b border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/95 backdrop-blur-md">
            <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  type="button"
                  onClick={() => switchTopTab('lobby')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-1.5 text-xs font-semibold text-[var(--text-ivory)] hover:border-[#D6A937] transition shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[var(--accent-gold)]" strokeWidth={1.6} />
                  <span className="hidden sm:inline">{isId ? 'Lobby Kampus' : 'Campus Lobby'}</span>
                </button>

                {activeTab === 'classroom' && (
                  <>
                    <select
                      aria-label={isId ? 'Pilih Semester' : 'Select Semester'}
                      value={activeTrack.id}
                      onChange={(e) => handleSelectTrack(e.target.value)}
                      className="hidden md:block max-w-[180px] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--text-ivory)]"
                    >
                      {localizedTracks.map((tr) => (
                        <option key={tr.id} value={tr.id}>
                          Sem {tr.trackNumber} ({tr.courseCode})
                        </option>
                      ))}
                    </select>

                    <select
                      aria-label={isId ? 'Pilih Modul' : 'Select Module'}
                      value={activeLesson.slug}
                      onChange={(e) => handleSelectLesson(e.target.value, activeTrack.id)}
                      className="max-w-[155px] sm:max-w-[260px] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--text-ivory)] truncate"
                    >
                      {activeTrackLessons.map((les) => (
                        <option key={les.slug} value={les.slug}>
                          {les.lessonNumber}, {les.title}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => setMobileSyllabusOpen((v) => !v)}
                      className="lg:hidden inline-flex items-center gap-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-2 py-1.5 text-[11px] font-bold text-[var(--text-ivory)] shrink-0"
                    >
                      <span>{isId ? 'Silabus' : 'Menu'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          mobileSyllabusOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border-subtle)]">
                  <span className="font-mono text-[11px] font-bold tabular-nums text-[var(--text-ivory)]">
                    {totalSksEarned} / {totalSksPossible} SKS
                  </span>
                  <div className="w-16 h-1.5 rounded-full bg-[var(--bg-surface-3)] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D6A937] to-[#10B981] transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setJessyDrawerOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#D6A937]/60 bg-[#D6A937]/10 px-2.5 py-1.5 text-xs font-bold text-[var(--accent-gold)] hover:bg-[#D6A937]/20 transition"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/jessy-waifu.png"
                    alt="Jessy Mentor"
                    className="h-4 w-4 rounded-full object-cover object-top"
                  />
                  <span>{isId ? 'Tanya Jessy' : 'Ask Jessy'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    switchTopTab(activeTab === 'certification' ? 'classroom' : 'certification')
                  }
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                    activeTab === 'certification'
                      ? 'jgs-tab-active border-[#D6A937]'
                      : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-ivory)] hover:border-[#D6A937]/60'
                  }`}
                >
                  {isAllEligible || examState?.passed ? (
                    <Award className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={1.6} />
                  ) : (
                    <Lock className="w-3.5 h-3.5" strokeWidth={1.6} />
                  )}
                  <span className="hidden sm:inline">
                    {activeTab === 'certification'
                      ? isId
                        ? 'Kembali ke Kelas'
                        : 'Classroom'
                      : isId
                      ? 'Sidang & Ijazah'
                      : 'Diploma'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
            {/* PORTAL B: PJJ UNIVERSITY CLASSROOM */}
            {activeTab === 'classroom' && (
              <AcademyLmsCourseView
                locale={loc}
                tracks={localizedTracks}
                lessons={localizedLessons}
                activeTrack={activeTrack}
                activeLesson={activeLesson}
                activeSlide={activeSlide}
                setActiveSlide={handleSetActiveSlide}
                completedSlugs={completedSlugs}
                completedCaseSlugs={completedCaseSlugs}
                jessyMood={jessyMood}
                jessyNote={jessyNote}
                onJessyReaction={(mood, note) => {
                  setJessyMood(mood);
                  setJessyNote(note);
                }}
                onSelectTrack={handleSelectTrack}
                onSelectLesson={handleSelectLesson}
                onCompleteModuleFull={handleCompleteModuleFull}
                onBackToLobby={() => switchTopTab('lobby')}
                onOpenCertification={() => switchTopTab('certification')}
                externalMobileSidebarOpen={mobileSyllabusOpen}
                onCloseMobileSidebar={() => setMobileSyllabusOpen(false)}
              />
            )}

            {/* PORTAL C: HARD-LOCKED FINAL EXAM & DUAL GRADUATION DOCUMENTS */}
            {activeTab === 'certification' && (
              <AcademyCertificationPortal
                locale={loc}
                tracks={localizedTracks}
                lessons={localizedLessons}
                completedSlugs={completedSlugs}
                examState={examState}
                onUpdateExamState={setExamState}
                recipientName={recipientName}
                setRecipientName={setRecipientName}
                gangId={gangId}
                onEnterModule={(tId, slug) => handleEnterClassroom(tId, slug)}
                onBackToLobby={() => switchTopTab('lobby')}
                onPassCelebrate={(msg) => {
                  setJessyMood('cheering');
                  setJessyNote(msg);
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          PORTALED BOTTOM-RIGHT FLOATING "BINGUNG? TANYA JESSY~" DRAWER
          ============================================================ */}
      <GlobalFloatingJessyDrawer
        locale={loc}
        currentLesson={activeLesson}
        activeSlideIndex={activeTab === 'classroom' ? activeSlide : undefined}
        moodOverride={jessyMood}
        warningMessage={jessyNote}
        onJumpToSlide={handleJumpToSlide}
        controlledOpen={jessyDrawerOpen}
        onControlledOpenChange={setJessyDrawerOpen}
        hideFloatingButton={activeTab === 'classroom'}
      />
    </div>
  );
}
