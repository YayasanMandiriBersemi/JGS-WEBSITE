import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AcademyHub } from '@/components/academy/AcademyHub';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/academy',
    title:
      locale === 'id'
        ? 'JGS Academy 3.0, 7 Semester Kurikulum Industri Finansial & Kuantitatif Gratis'
        : 'JGS Academy 3.0, 7-Semester Financial & Quantitative Curriculum',
    description:
      locale === 'id'
        ? 'Orientasi murid baru bersama Jessy, kelas slide interaktif, grafik TradingView 600px, simulator MT5, dan Ijazah Resmi JGS.'
        : 'Warm orientation with Jessy, interactive presentation slides, 600px live charts, MT5 simulator, and Official JGS Diploma.',
  });
}

export default function AcademyPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm text-[var(--text-secondary)]">
          Memuat JGS Academy Studio...
        </div>
      }
    >
      <AcademyHub />
    </Suspense>
  );
}
