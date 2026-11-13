import React from 'react';
import type { Metadata } from 'next';
import { TradingToolsHubView } from '@/components/about/AboutJgsView';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/tools',
    title:
      locale === 'id'
        ? 'Trading Tools Gratis, Cent Lab, Position Sizing, Drawdown & Jurnal'
        : 'Free Trading Tools, Cent Lab, Position Sizing, Drawdown & Journal',
    description:
      locale === 'id'
        ? 'Kalkulator ukuran lot berbasis spesifikasi simbol broker, konversi USD ke USC, simulator drawdown, dan jurnal trader gratis.'
        : 'Broker-specification position sizing calculator, USD to USC converter, drawdown simulator, and free trader journal.',
  });
}

export default function TradingToolsPage() {
  return <TradingToolsHubView />;
}
