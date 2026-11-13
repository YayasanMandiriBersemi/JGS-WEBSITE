import React from 'react';
import type { Metadata } from 'next';
import { OurStrategyHubView } from '@/components/about/AboutJgsView';
import { JgsVaultGatekeeper } from '@/components/account/JgsVaultGatekeeper';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/strategy',
    title:
      locale === 'id'
        ? 'Strategi Kami, Quant Lab, EA Testing Toolkit & Informasi Copy Trading'
        : 'Our Strategy, Quant Lab, EA Testing Toolkit & Copy Trading Disclosures',
    description:
      locale === 'id'
        ? 'Pelajari metodologi sistem berbasis aturan, alat uji kualitas backtest MT5, dan transparansi mekanisme High-Water Mark.'
        : 'Explore rule-based system methodology, MT5 backtest auditing tools, and High-Water Mark transparency.',
  });
}

export default async function StrategyPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = (isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE) as 'id' | 'en';

  return (
    <JgsVaultGatekeeper
      locale={locale}
      pillarTitleId="STRATEGI KAMI // QUANT LAB, EA & COPY TRADING"
      pillarTitleEn="OUR STRATEGY // QUANT LAB, EA & COPY TRADING"
      pillarSummaryId="Eksplorasi arsitektur JGS Cent Risk Guardian & JGS Micro-Systematic EA, simulator audit Strategy Tester MT5, serta simulasi skema Copy Trading High-Water Mark."
      pillarSummaryEn="Explore the JGS Cent Risk Guardian & JGS Micro-Systematic EA architectures, MT5 Strategy Tester audit toolkit, and High-Water Mark Copy Trading guide."
      previewHighlightsId={[
        'Pilar 1: JGS Cent Risk Guardian (Anti-Overlot EA)',
        'Pilar 2: JGS Micro-Systematic EA (ICT Session Filter)',
        'EA Testing Toolkit & Stress-Test Spread/Slippage',
        'Keterbukaan Skema Copy Trading Pra-Peluncuran',
      ]}
      previewHighlightsEn={[
        'Pillar 1: JGS Cent Risk Guardian (Protection EA)',
        'Pillar 2: JGS Micro-Systematic EA (Execution EA)',
        'EA Testing Toolkit & Spread Stress-Tester',
        'Pre-Launch Copy Trading & HWM Disclosures',
      ]}
    >
      <OurStrategyHubView />
    </JgsVaultGatekeeper>
  );
}
