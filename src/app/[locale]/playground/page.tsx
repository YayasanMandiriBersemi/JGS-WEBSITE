import React from 'react';
import type { Metadata } from 'next';
import { PlaygroundSimulator } from '@/components/playground/PlaygroundSimulator';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/playground',
    title:
      locale === 'id'
        ? 'JGS Trading Playground, Simulasi Skenario Market Historis'
        : 'JGS Trading Playground, Historical Market Scenario Simulator',
    description:
      locale === 'id'
        ? 'Latih keputusan Buy, Sell, atau Wait pada skenario edukasi historis tanpa risiko uang sungguhan.'
        : 'Practice Buy, Sell, or Wait decisions on historical educational scenarios with zero real-money risk.',
  });
}

export default function PlaygroundPage() {
  return <PlaygroundSimulator />;
}
