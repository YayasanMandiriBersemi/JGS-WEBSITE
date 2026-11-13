import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { LiveIntelligenceHub } from '@/components/research/LiveIntelligenceHub';
import { MarketResearchHub } from '@/components/research/MarketResearchHub';
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
    pathname: '/research',
    title:
      locale === 'id'
        ? 'Riset & Strategi Pasar Live: Sinyal, Fundamental, CFTC COT & Broker | THE JEY GANG STRATEGIST'
        : 'Live Market Intelligence Hub: Signals, Macro Bias, CFTC COT & Brokers | THE JEY GANG STRATEGIST',
    description:
      locale === 'id'
        ? 'Pusat intelijen pasar JGS: scanner 12 pasangan live setiap 10 detik, radar fundamental suku bunga, komparasi Retail vs Institusi CFTC COT, panduan broker Cent, dan arsip riset kuantitatif.'
        : 'All-in-one JGS Live Intelligence Hub combining 12-pair setups, central bank macro scores, Retail vs Institutional CFTC COT divergence alerts, Cent brokers, and quantitative research archive.',
  });
}

export default function ResearchPage() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<div className="min-h-screen" />}>
        <LiveIntelligenceHub initialTab="fundamental" />
      </Suspense>
      <div className="border-t border-[var(--border-subtle)] pt-4">
        <MarketResearchHub />
      </div>
    </div>
  );
}
