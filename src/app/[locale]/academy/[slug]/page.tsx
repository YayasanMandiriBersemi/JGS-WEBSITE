import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ACADEMY_LESSONS,
  getLocalizedLesson,
} from '@/lib/data/academy-lessons';
import { LessonInteractiveView } from '@/components/academy/LessonInteractiveView';
import {
  buildLocalizedMetadata,
  isValidLocale,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from '@/i18n/config';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    ACADEMY_LESSONS.map((lesson) => ({
      locale,
      slug: lesson.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  const rawLesson = ACADEMY_LESSONS.find((l) => l.slug === resolvedParams.slug);
  if (!rawLesson) {
    return buildLocalizedMetadata({
      locale,
      pathname: `/academy/${resolvedParams.slug}`,
      title: 'JGS Academy',
      description: 'JGS Academy Lesson',
    });
  }
  const localized = getLocalizedLesson(rawLesson, locale);
  return buildLocalizedMetadata({
    locale,
    pathname: `/academy/${resolvedParams.slug}`,
    title: `${localized.title}, JGS Academy`,
    description: localized.summary,
  });
}

export default async function AcademyLessonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lesson = ACADEMY_LESSONS.find((l) => l.slug === resolvedParams.slug);
  if (!lesson) {
    notFound();
  }
  return <LessonInteractiveView lesson={lesson} />;
}
