import type { Locale } from '@/i18n/config';
import type {
  AcademyTrack,
  AcademyLesson,
} from './academy-types';
import { TRACKS_SEM_1_3, LESSONS_SEM_1_3 } from './academy-sem-1-3';
import { TRACKS_SEM_4_6, LESSONS_SEM_4_6 } from './academy-sem-4-6';
import { TRACKS_SEM_7_9, LESSONS_SEM_7_9 } from './academy-sem-7-9';
import { TRACKS_SEM_10_12, LESSONS_SEM_10_12 } from './academy-sem-10-12';
import { TRACKS_SEM_11_14, LESSONS_SEM_11_14 } from './academy-sem-11-14';
import { TRACKS_SEM_NEW_FOUR, LESSONS_SEM_NEW_FOUR } from './academy-sem-new-four';

export * from './academy-types';
export * from './academy-exam-engine';
export * from './academy-monographs';
export * from './academy-eli10-citations';
export * from './academy-essay-and-prose';

const RAW_TRACKS: AcademyTrack[] = [
  ...TRACKS_SEM_1_3,               // Sem 01, 02, 03
  TRACKS_SEM_4_6[0],               // Sem 04 (RSK-201)
  TRACKS_SEM_10_12[1],             // Sem 05 (PSY-202)
  TRACKS_SEM_4_6[1],               // Sem 06 (TEC-203)
  TRACKS_SEM_NEW_FOUR[0],          // Sem 07 (SNR-204)
  TRACKS_SEM_4_6[2],               // Sem 08 (WYC-301)
  ...TRACKS_SEM_7_9,               // Sem 09, 10, 11 (WAV-302, AMT-303, ICT-304)
  TRACKS_SEM_10_12[0],             // Sem 12 (KZN-401)
  TRACKS_SEM_11_14[0],             // Sem 13 (CNF-402)
  TRACKS_SEM_11_14[1],             // Sem 14 (EXE-403)
  TRACKS_SEM_NEW_FOUR[1],          // Sem 15 (STY-404)
  TRACKS_SEM_NEW_FOUR[2],          // Sem 16 (NWS-501)
  TRACKS_SEM_11_14[2],             // Sem 17 (MKT-502)
  TRACKS_SEM_11_14[3],             // Sem 18 (COT-503)
  TRACKS_SEM_10_12[2],             // Sem 19 (QNT-504)
  TRACKS_SEM_NEW_FOUR[3],          // Sem 20 (CMP-505)
];

// Normalize trackNumber strictly 01..20 so sidebar dropdown, lobby cards & classroom badge never drift
export const ACADEMY_TRACKS: AcademyTrack[] = RAW_TRACKS.map((tr, idx) => ({
  ...tr,
  trackNumber: String(idx + 1).padStart(2, '0'),
}));

const RAW_LESSONS: AcademyLesson[] = [
  ...LESSONS_SEM_1_3,              // 1.1..3.3 (9)
  ...LESSONS_SEM_4_6.slice(0, 3),  // 4.1..4.3 (3)
  ...LESSONS_SEM_10_12.slice(3, 6),// 5.1..5.3 (3)
  ...LESSONS_SEM_4_6.slice(3, 6),  // 6.1..6.3 (3)
  ...LESSONS_SEM_NEW_FOUR.slice(0, 3), // 7.1..7.3 (3)
  ...LESSONS_SEM_4_6.slice(6, 9),  // 8.1..8.3 (3)
  ...LESSONS_SEM_7_9,              // 9.1..11.3 (9)
  ...LESSONS_SEM_10_12.slice(0, 3),// 12.1..12.3 (3)
  ...LESSONS_SEM_11_14.slice(0, 6),// 13.1..14.3 (6)
  ...LESSONS_SEM_NEW_FOUR.slice(3, 9), // 15.1..16.3 (6)
  ...LESSONS_SEM_11_14.slice(6, 12),// 17.1..18.3 (6)
  ...LESSONS_SEM_10_12.slice(6, 9),// 19.1..19.3 (3)
  ...LESSONS_SEM_NEW_FOUR.slice(9, 12), // 20.1..20.3 (3)
];

const trackIndexLookup = new Map(ACADEMY_TRACKS.map((t, i) => [t.id, i + 1]));
const perTrackCounter: Record<string, number> = {};

export const ACADEMY_LESSONS: AcademyLesson[] = RAW_LESSONS.map((les) => {
  const semNum = trackIndexLookup.get(les.trackId) ?? 1;
  perTrackCounter[les.trackId] = (perTrackCounter[les.trackId] ?? 0) + 1;
  return {
    ...les,
    lessonNumber: `${semNum}.${perTrackCounter[les.trackId]}`,
  };
});

export function getLocalizedTrack(track: AcademyTrack, locale: Locale): AcademyTrack {
  if (locale !== 'id') return track;
  return {
    ...track,
    title: track.titleId ?? track.title,
    subtitle: track.subtitleId ?? track.subtitle,
    targetAudience: track.targetAudienceId ?? track.targetAudience,
    learningOutcome: track.learningOutcomeId ?? track.learningOutcome,
  };
}

export function getLocalizedLesson(lesson: AcademyLesson, locale: Locale): AcademyLesson {
  if (locale !== 'id') return lesson;
  return {
    ...lesson,
    title: lesson.titleId ?? lesson.title,
    summary: lesson.summaryId ?? lesson.summary,
    plainEnglishSections: lesson.plainEnglishSectionsId ?? lesson.plainEnglishSections,
    technicalSections: lesson.technicalSectionsId ?? lesson.technicalSections,
    microCapitalCaseStudy: lesson.microCapitalCaseStudyId ?? lesson.microCapitalCaseStudy,
    jeyStreetRule: lesson.jeyStreetRuleId ?? lesson.jeyStreetRule,
    quiz: lesson.quizId ?? lesson.quiz,
  };
}
