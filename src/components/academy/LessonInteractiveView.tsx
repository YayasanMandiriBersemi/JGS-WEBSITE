'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  AcademyLesson,
  ACADEMY_LESSONS,
  getLocalizedLesson,
} from '@/lib/data/academy-lessons';
import { DICTIONARY_TERMS } from '@/lib/data/dictionary-terms';
import {
  loadCompletedLessonSlugs,
  markLessonCompleted,
} from '@/lib/storage/jgs-local-store';
import { JeyStrategistCallout } from '@/components/brand/JeyStrategistCallout';
import { LessonDiagramGraphic } from '@/components/academy/Mt5VisualSimulatorPane';
import {
  InlineJessyBabyExplainBox,
  GlobalFloatingJessyDrawer,
} from '@/components/academy/JessyBuddyAssistant';
import { RichFormattedText } from '@/components/academy/AcademyExplorableWidgets';
import {
  Youtube as YoutubeIcon,
  ExternalLink as ExternalLinkIcon,
  Play as PlayIcon,
} from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Cpu,
  HelpCircle,
  ExternalLink,
  Landmark,
  Scale,
} from 'lucide-react';

interface LessonInteractiveViewProps {
  lesson: AcademyLesson;
}

export function LessonInteractiveView({ lesson: rawLesson }: LessonInteractiveViewProps) {
  const { locale, isId, l } = useLocale();
  const lesson = useMemo(() => getLocalizedLesson(rawLesson, locale), [rawLesson, locale]);

  const [mode, setMode] = useState<'PLAIN_ENGLISH' | 'TECHNICAL'>('PLAIN_ENGLISH');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [inlineVideoPlaying, setInlineVideoPlaying] = useState(false);

  useEffect(() => {
    const slugs = loadCompletedLessonSlugs();
    setIsCompleted(slugs.includes(lesson.slug));
    setSelectedOption(null);
    setQuizSubmitted(false);
    setInlineVideoPlaying(false);
  }, [lesson.slug]);

  const currentIndex = ACADEMY_LESSONS.findIndex((les) => les.slug === lesson.slug);
  const prevLesson =
    currentIndex > 0 ? getLocalizedLesson(ACADEMY_LESSONS[currentIndex - 1], locale) : null;
  const nextLesson =
    currentIndex < ACADEMY_LESSONS.length - 1
      ? getLocalizedLesson(ACADEMY_LESSONS[currentIndex + 1], locale)
      : null;

  function handleCheckAnswer() {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
    if (selectedOption === lesson.quiz.correctIndex) {
      markLessonCompleted(lesson.slug);
      setIsCompleted(true);
    }
  }

  const linkedTerms = DICTIONARY_TERMS.filter((t) => lesson.relatedTerms.includes(t.slug));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={l('/academy')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8B0C8] hover:text-[#D4AF37]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isId ? 'Kembali ke Kurikulum Academy' : 'Back to Academy Curriculum'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#10B981]/15 border border-[#10B981]/40 text-xs font-semibold text-[#10B981]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isId ? 'SELESAI' : 'COMPLETED'}
            </span>
          )}
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#191129] border border-[#D4AF37]/30 text-[#D4AF37]">
            {isId ? `MODUL ${lesson.lessonNumber}` : `LESSON ${lesson.lessonNumber}`} •{' '}
            {lesson.durationMinutes} {isId ? 'MENIT' : 'MIN'}
          </span>
        </div>
      </div>

        {/* Title & Mode Toggle Switch */}
      <div className="jgs-panel p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-[-0.025em] text-[var(--text-ivory)]">
            {lesson.title}
          </h1>
          <p className="text-base text-[var(--text-secondary)] mt-2.5 leading-relaxed">
            <RichFormattedText text={lesson.summary} />
          </p>
        </div>

        {/* Top-of-Page Learning Outcomes Promise Box */}
        <div className="rounded-xl border border-[#D6A937]/40 bg-[#D6A937]/10 p-4 sm:p-5 space-y-2.5">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#D6A937]">
            {isId ? 'Di kelas ini kamu akan belajar :' : 'In this class you will learn :'}
          </div>
          <ul className="space-y-1.5 text-sm text-[var(--text-ivory)] leading-relaxed">
            {(isId ? lesson.studio.learningOutcomesId : lesson.studio.learningOutcomesEn).map((lo, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-1" strokeWidth={1.8} />
                <span className="jgs-prose-justify">{lo}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 1. First Principles & Institutional Origin */}
        <div className="border-t border-[var(--border-subtle)] pt-5 space-y-3">
          <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
            {isId
              ? '1. FONDASI PRINSIP PERTAMA & SEJARAH KELAHIRAN KONSEP (DARI RITEL KE INSTITUSIONAL)'
              : '1. FIRST PRINCIPLES & HISTORICAL ORIGIN (RETAIL TO INSTITUTIONAL)'}
          </div>
          <p className="text-[16px] text-[var(--text-ivory)] jgs-prose-justify">
            <RichFormattedText text={isId ? lesson.studio.grassrootsWhatId : lesson.studio.grassrootsWhatEn} />
          </p>
          <p className="text-[15px] text-[var(--text-secondary)] jgs-prose-justify">
            <strong className="text-[var(--text-ivory)]">
              {isId ? 'Lintasan Sejarah: ' : 'Origin History: '}
            </strong>
            <RichFormattedText text={isId ? lesson.studio.grassrootsOriginId : lesson.studio.grassrootsOriginEn} />
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {lesson.studio.prerequisiteTerms.map((term) => (
              <div
                key={term.term}
                className="rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] p-3.5 space-y-1"
              >
                <div className="text-xs font-bold text-[var(--accent-gold)]">{term.term}</div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isId ? term.analogyId : term.analogyEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Plain-Language vs Technical Toggle */}
        <div className="bg-[#09060F] p-3.5 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-[#B8B0C8]">
            <span className="font-semibold text-[#F7F4EE]">
              {isId ? 'Mode Penjelasan: ' : 'Explanation Mode: '}
            </span>
            {isId
              ? 'Pilih antara penjelasan bahasa sederhana untuk pemula atau spesifikasi teknis.'
              : 'Switch anytime between beginner-friendly language and technical specifications.'}
          </div>
          <div className="inline-flex rounded-lg bg-[#191129] p-1 border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setMode('PLAIN_ENGLISH')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mode === 'PLAIN_ENGLISH'
                  ? 'bg-[#D4AF37] text-[#09060F]'
                  : 'text-[#B8B0C8] hover:text-[#F7F4EE]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isId ? 'Bahasa Sederhana' : 'Plain-Language Mode'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('TECHNICAL')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mode === 'TECHNICAL'
                  ? 'bg-[#A882DD] text-[#09060F]'
                  : 'text-[#B8B0C8] hover:text-[#F7F4EE]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{isId ? 'Mode Teknis & Rumus' : 'Technical & Quant Mode'}</span>
            </button>
          </div>
        </div>

        {/* Lesson Body Sections (Flowing Editorial Prose) */}
        {mode === 'PLAIN_ENGLISH' ? (
          <div className="space-y-6 border-t border-white/10 pt-5">
            {lesson.plainEnglishSections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="font-display text-lg font-bold text-[#F3E5AB]">{sec.heading}</h2>
                <p className="text-[16px] text-[#F7F4EE]/90 jgs-prose-justify">
                  <RichFormattedText text={sec.body} />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 border-t border-[#A882DD]/25 pt-5">
            {lesson.technicalSections.map((sec, idx) => (
              <div key={idx} className="space-y-2.5">
                <h2 className="font-display text-lg font-bold text-[#A882DD]">{sec.heading}</h2>
                <p className="text-[16px] text-[#F7F4EE]/90 jgs-prose-justify">
                  <RichFormattedText text={sec.body} />
                </p>
                {sec.formulaOrSpec && (
                  <div className="p-3.5 rounded-xl bg-[var(--bg-surface-2)] border border-[#D4AF37]/30 font-mono text-xs text-[#F3E5AB]">
                    {sec.formulaOrSpec}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Visual Studio Additions: Diagram, Baby-Language Explainer & Curated Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="jgs-panel p-4 space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-gold)]">
              {isId ? 'Ilustrasi Visual & Analogi Nyata' : 'Visual Concept & Real-Life Analogy'}
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-[var(--text-ivory)]">
                {isId ? lesson.studio.analogyHeadlineId : lesson.studio.analogyHeadlineEn}
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isId ? lesson.studio.analogyBodyId : lesson.studio.analogyBodyEn}
              </p>
            </div>
            <div className="jgs-chart-frame rounded-xl overflow-hidden">
              <LessonDiagramGraphic
                type={lesson.studio.diagramType}
                locale={isId ? 'id' : 'en'}
              />
            </div>
            <InlineJessyBabyExplainBox locale={isId ? 'id' : 'en'} lesson={lesson} />
          </div>

          <div className="jgs-panel p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#EF4444]">
                  <YoutubeIcon className="w-4 h-4" />
                  <span>{isId ? 'Video Referensi Terkurasi' : 'Curated Video Reference'}</span>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${lesson.studio.youtube.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--accent-gold)] hover:underline"
                >
                  <span>{isId ? 'Buka di YouTube' : 'Open on YouTube'}</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </div>

              {inlineVideoPlaying ? (
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#D6A937]/40">
                  <iframe
                    src={`https://www.youtube.com/embed/${lesson.studio.youtube.videoId}?autoplay=1&rel=0`}
                    title={lesson.studio.youtube.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-[var(--border-subtle)] group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${lesson.studio.youtube.videoId}/hqdefault.jpg`}
                    alt={lesson.studio.youtube.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition"
                  />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-4">
                    <button
                      type="button"
                      onClick={() => setInlineVideoPlaying(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D6A937] to-[#F3E5AB] text-[#17131D] shadow-xl hover:brightness-105 transition"
                    >
                      <PlayIcon className="w-4 h-4 fill-current" />
                      <span>{isId ? 'Putar Video di Sini' : 'Play Video Here'}</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="text-xs font-bold text-[var(--text-ivory)]">
                {lesson.studio.youtube.title}
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <strong className="text-[var(--accent-gold)]">
                  {isId ? 'Inti Video: ' : 'Key Takeaway: '}
                </strong>
                {isId ? lesson.studio.youtube.keyTakeawayId : lesson.studio.youtube.keyTakeawayEn}
              </div>
            </div>

            {lesson.studio.youtube.timestamps.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {lesson.studio.youtube.timestamps.map((ts) => (
                  <span
                    key={`${ts.time}-${ts.topicEn}`}
                    className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                  >
                    <strong className="font-mono text-[var(--accent-gold)]">{ts.time}</strong>
                    <span>{isId ? ts.topicId : ts.topicEn}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Academic Citation & Debate Synthesis (Clean Editorial Prose) */}
        <div className="border-t border-[var(--border-subtle)] pt-5 space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-[var(--accent-gold)]">
            <Landmark className="w-4 h-4" strokeWidth={1.5} />
            <span>
              {lesson.studio.citation.authors} ({lesson.studio.citation.year}) • {lesson.studio.citation.source}
            </span>
          </div>
          <div className="font-display font-bold text-lg text-[var(--text-ivory)]">
            &ldquo;{lesson.studio.citation.title}&rdquo;
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {isId ? lesson.studio.citation.keyInsightId : lesson.studio.citation.keyInsightEn}
          </p>
          <div className="border-l-2 border-[var(--border-subtle)] pl-4 py-1 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-ivory)]">
              <Scale className="w-3.5 h-3.5 text-[var(--accent-gold)]" strokeWidth={1.5} />
              <span>{isId ? lesson.studio.debate.topicId : lesson.studio.debate.topicEn}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--accent-gold)]">{isId ? 'Sintesis JGS: ' : 'JGS Synthesis: '}</strong>
              {isId ? lesson.studio.debate.jgsSynthesisId : lesson.studio.debate.jgsSynthesisEn}
            </p>
          </div>
        </div>

        {/* Micro-Capital Worked Example (Editorial Prose, Zero Box-on-Box Clutter) */}
        <div className="border-l-4 border-[#D4AF37] pl-5 py-1 space-y-2.5">
          <div className="text-xs font-mono font-bold text-[#D4AF37]">
            {isId ? 'STUDI KASUS MODAL MIKRO • ' : 'WORKED MICRO-CAPITAL CASE STUDY • '}
            {lesson.microCapitalCaseStudy.title}
          </div>
          <p className="text-sm sm:text-base text-[#F7F4EE] leading-relaxed">
            <strong>{isId ? 'Kesalahan Umum Tanpa Perhitungan: ' : 'Unchecked Risk Trap: '}</strong>
            {lesson.microCapitalCaseStudy.standardAccountOutcome}
          </p>
          <p className="text-sm sm:text-base text-[#F7F4EE] leading-relaxed">
            <strong className="text-[#10B981]">
              {isId ? 'Pendekatan Disiplin JGS: ' : 'Disciplined JGS Execution: '}
            </strong>
            {lesson.microCapitalCaseStudy.centAccountOutcome}
          </p>
        </div>

        {/* Jey's Street Rule */}
        <JeyStrategistCallout
          ruleText={lesson.jeyStreetRule}
          contextTag={
            isId ? `PRINSIP MODUL ${lesson.lessonNumber}` : `LESSON ${lesson.lessonNumber} PRINCIPLE`
          }
        />
      </div>

      {/* Linked Dictionary Glossary Pills */}
      {linkedTerms.length > 0 && (
        <div className="jgs-panel p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#B8B0C8]">
              {isId ? 'ISTILAH PENTING DALAM MODUL INI' : 'KEY TRADING TERMS IN THIS LESSON'}
            </span>
            <Link
              href={l('/dictionary')}
              className="text-xs font-semibold text-[#D4AF37] hover:underline inline-flex items-center gap-1"
            >
              <span>{isId ? 'Buka Kamus Lengkap' : 'Open Full Dictionary'}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {linkedTerms.map((term) => (
              <div
                key={term.slug}
                className="p-3.5 rounded-lg bg-[#09060F] border border-white/10 space-y-1"
              >
                <div className="text-xs font-bold text-[#D4AF37]">{term.term}</div>
                <p className="text-xs text-[#B8B0C8] leading-relaxed">{term.plainEnglish}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Comprehension Quiz */}
      <div className="jgs-panel p-6 sm:p-8 border-[#D4AF37]/40 space-y-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
          <HelpCircle className="w-4 h-4" />
          <span>
            {isId
              ? 'UJI PEMAHAMAN, PASTIKAN KONSEP SUDAH JELAS'
              : 'COMPREHENSION CHECKPOINT, VERIFY YOUR UNDERSTANDING'}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-[#F7F4EE]">{lesson.quiz.question}</h3>

        <div className="space-y-2.5">
          {lesson.quiz.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === lesson.quiz.correctIndex;
            let cardStyle = 'bg-[#09060F] border-white/10 text-[#B8B0C8] hover:border-white/30';

            if (quizSubmitted) {
              if (isCorrect) {
                cardStyle = 'bg-[#0F1B1D] border-[#10B981] text-[#F7F4EE]';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-[#1A0D16] border-[#EF4444] text-[#F7F4EE]';
              }
            } else if (isSelected) {
              cardStyle = 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F7F4EE]';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedOption(idx);
                  setQuizSubmitted(false);
                }}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 ${cardStyle}`}
              >
                <span>{opt}</span>
                {quizSubmitted && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            disabled={selectedOption === null}
            onClick={handleCheckAnswer}
            className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] disabled:opacity-40 text-[#09060F] font-semibold text-sm transition-all"
          >
            {isId
              ? 'Periksa Jawaban & Tandai Selesai'
              : 'Verify Answer & Mark Lesson Complete'}
          </button>

          {quizSubmitted && (
            <div
              className={`text-xs font-semibold ${
                selectedOption === lesson.quiz.correctIndex ? 'text-[#10B981]' : 'text-[#EF4444]'
              }`}
            >
              {selectedOption === lesson.quiz.correctIndex
                ? isId
                  ? 'Jawaban Tepat! Modul ditandai selesai.'
                  : 'Correct! Lesson marked as completed.'
                : isId
                ? 'Belum tepat. Baca penjelasan di bawah dan coba lagi.'
                : 'Not quite. Read the explanation below and try again.'}
            </div>
          )}
        </div>

        {quizSubmitted && (
          <div className="space-y-3 pt-2">
            <JeyStrategistCallout
              title={
                selectedOption === lesson.quiz.correctIndex
                  ? isId
                    ? 'Jey Co-Pilot • Pemahaman Tepat!'
                    : 'Jey Co-Pilot • Spot On!'
                  : isId
                  ? 'Jey Co-Pilot • Mari Kita Bedah Lagi'
                  : 'Jey Co-Pilot • Quick Review Tip'
              }
              contextTag={
                selectedOption === lesson.quiz.correctIndex
                  ? isId
                    ? 'MODUL LULUS'
                    : 'CHECKPOINT PASSED'
                  : isId
                  ? 'PETUNJUK JAWABAN'
                  : 'STUDY HINT'
              }
              variant={selectedOption === lesson.quiz.correctIndex ? 'gold' : 'purple'}
              ruleText={lesson.quiz.explanation}
              showAvatar={true}
            />
          </div>
        )}
      </div>

      {/* Bottom Lesson Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
        {prevLesson ? (
          <Link
            href={l(`/academy/${prevLesson.slug}`)}
            className="jgs-panel p-4 flex items-center gap-3 hover:border-[#D4AF37]/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <div>
              <div className="text-xs text-[#7D7490]">
                {isId ? 'Modul Sebelumnya' : 'Previous Lesson'}
              </div>
              <div className="text-sm font-bold text-[#F7F4EE]">{prevLesson.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={l(`/academy/${nextLesson.slug}`)}
            className="jgs-panel p-4 flex items-center justify-end gap-3 text-right hover:border-[#D4AF37]/40 transition-colors"
          >
            <div>
              <div className="text-xs text-[#7D7490]">
                {isId ? 'Modul Berikutnya' : 'Next Lesson'}
              </div>
              <div className="text-sm font-bold text-[#F7F4EE]">{nextLesson.title}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
          </Link>
        ) : (
          <Link
            href={l('/academy?tab=certification')}
            className="jgs-panel-interactive p-4 flex items-center justify-end gap-3 text-right border-[#D4AF37]/50"
          >
            <div>
              <div className="text-xs text-[#D4AF37] font-bold">
                {isId ? '20 Semester Selesai (120 SKS)' : '20 Semesters Complete (120 SKS)'}
              </div>
              <div className="text-sm font-bold text-[#F7F4EE]">
                {isId
                  ? 'Ikuti Ujian Kelulusan & Cetak Ijazah Resmi ->'
                  : 'Take Final Graduation Exam & Claim Diploma ->'}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
          </Link>
        )}
      </div>

      <GlobalFloatingJessyDrawer
        locale={isId ? 'id' : 'en'}
        currentLesson={lesson}
      />
    </div>
  );
}
