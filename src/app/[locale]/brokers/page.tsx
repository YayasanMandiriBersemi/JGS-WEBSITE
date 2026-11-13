import React from 'react';
import type { Metadata } from 'next';
import { BrokerRecommendationHub } from '@/components/brokers/BrokerRecommendationHub';
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
    pathname: '/brokers',
    title:
      locale === 'id'
        ? 'Rekomendasi & Tutorial Broker Akun Cent ($10 / 1.000 USC) | THE JEY GANG STRATEGIST'
        : 'Broker Guide, Cent Accounts & MT5 Setup | THE JEY GANG STRATEGIST',
    description:
      locale === 'id'
        ? 'Perbandingan lengkap broker Akun Cent ($10 = 1.000 USC), Raw ECN, regulasi lokal BI/OJK/Bappebti 2026, simulasi ketahanan multi-pair, jadwal spread WIB, dan tutorial setup MT5 5 langkah.'
        : 'Quantitative comparison of Cent Accounts ($10 = 1,000 USC), Raw ECN brokers, multi-pair survival math, 24h WIB spreads, and a 5-step MT5 walkthrough.',
  });
}

export default function BrokersPage() {
  return <BrokerRecommendationHub />;
}
