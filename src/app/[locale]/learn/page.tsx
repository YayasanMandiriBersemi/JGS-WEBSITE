import React from 'react';
import type { Metadata } from 'next';
import { LearnHubView } from '@/components/about/AboutJgsView';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/learn',
    title:
      locale === 'id'
        ? 'Pusat Belajar Trading Gratis, JGS Academy, Kamus & Playground'
        : 'Free Trading Learning Center, JGS Academy, Dictionary & Playground',
    description:
      locale === 'id'
        ? 'Akses kurikulum JGS Academy, Kamus Trading Jey, dan Trading Playground secara gratis tanpa paywall.'
        : 'Access the JGS Academy curriculum, Trading Dictionary, and Historical Playground 100% free with no paywalls.',
  });
}

export default function LearnPage() {
  return <LearnHubView />;
}
