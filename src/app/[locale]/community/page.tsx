import React from 'react';
import type { Metadata } from 'next';
import { CommunityView } from '@/components/account/StrategistWorkspaceViews';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/community',
    title:
      locale === 'id'
        ? 'Komunitas JGS & Piagam Disiplin Risiko'
        : 'JGS Community & Risk Discipline Charter',
    description:
      locale === 'id'
        ? 'Standar disiplin risiko komunitas JGS: pengukuran berbasis R-Multiple, kewajiban Stop-Loss, dan kejujuran data.'
        : 'JGS community risk discipline standards: R-Multiple measurement, mandatory Stop-Losses, and anti-hype honesty.',
  });
}

export default function CommunityPage() {
  return <CommunityView />;
}
