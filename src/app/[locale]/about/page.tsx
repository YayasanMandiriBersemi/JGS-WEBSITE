import React from 'react';
import type { Metadata } from 'next';
import { AboutJgsView } from '@/components/about/AboutJgsView';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/about',
    title:
      locale === 'id'
        ? 'Tentang JGS, Piagam Ekosistem Edukasi & Teknologi Trading Gratis'
        : 'About JGS, Free Trading Education & FinTech Ecosystem Charter',
    description:
      locale === 'id'
        ? 'Pelajari misi THE JEY GANG STRATEGIST (JGS), komitmen edukasi 100% gratis tanpa paywall, dan transparansi model bisnis.'
        : 'Read the mission of THE JEY GANG STRATEGIST (JGS), our 100% free education charter, and business model transparency.',
  });
}

export default function AboutPage() {
  return <AboutJgsView />;
}
