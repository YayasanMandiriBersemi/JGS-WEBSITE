import React from 'react';
import type { Metadata } from 'next';
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';
import { JgsVaultGatekeeper } from '@/components/account/JgsVaultGatekeeper';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/performance',
    title:
      locale === 'id'
        ? 'Pusat Transparansi Performa, Skema Audit 11 Metrik JGS'
        : 'Performance Transparency Center, JGS 11-Metric Audit Schema',
    description:
      locale === 'id'
        ? 'Arsitektur 11 metrik transparansi performa (Balance, Equity, Max Drawdown, Profit Factor, Biaya Trading) dalam status pra-peluncuran yang jujur.'
        : '11-metric performance transparency schema (Balance, Equity, Max Drawdown, Profit Factor, Trading Costs) in an honest pre-launch state.',
  });
}

export default async function PerformancePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = (isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE) as 'id' | 'en';

  return (
    <JgsVaultGatekeeper
      locale={locale}
      pillarTitleId="TRANSPARANSI PERFORMA // SKEMA AUDIT 11 METRIK"
      pillarTitleEn="PERFORMANCE AUDIT // 11-METRIC TRANSPARENCY SCHEMA"
      pillarSummaryId="Standar pelaporan performa jujur JGS dalam status Pra-Peluncuran: memisahkan Balance vs Equity secara real-time, Max Drawdown historis, biaya komisi/swap, dan proteksi zero fake backtest."
      pillarSummaryEn="JGS's honest pre-launch performance schema: separating Balance vs Equity in real time, historical Max Drawdown, commission/swap costs, and zero fake data."
      previewHighlightsId={[
        'Status Pra-Peluncuran Jujur (Tanpa Data Palsu)',
        '11 Metrik Wajib Audit Independen',
        'Pemisahan Balance vs Floating Equity',
        'Log Biaya Spread, Komisi & Swap Transparan',
      ]}
      previewHighlightsEn={[
        'Honest Pre-Launch State (Zero Fabricated Results)',
        '11 Mandatory Independent Audit Metrics',
        'Closed Balance vs. Floating Equity Separation',
        'Transparent Spread, Commission & Swap Cost Tracking',
      ]}
    >
      <PerformanceDashboard />
    </JgsVaultGatekeeper>
  );
}
