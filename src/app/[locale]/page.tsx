import React from 'react';
import type { Metadata } from 'next';
import { EditorialHomepage } from '@/components/home/EditorialHomepage';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/',
    title:
      locale === 'id'
        ? 'THE JEY GANG STRATEGIST (JGS), Mulai dari paham. Bukan dari modal.'
        : 'THE JEY GANG STRATEGIST (JGS), Start with understanding. Not account size.',
    description:
      locale === 'id'
        ? 'Belajar memahami market, mengelola risiko, dan membangun strategi trading melalui edukasi dan tools gratis. Small Capital. Serious Strategy.'
        : 'Learn to understand markets, manage risk, and develop trading strategies through free education and practical tools. Small Capital. Serious Strategy.',
  });
}

export default function LocalizedHomePage() {
  return <EditorialHomepage />;
}
