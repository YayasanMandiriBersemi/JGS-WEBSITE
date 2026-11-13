import React from 'react';
import type { Metadata } from 'next';
import { TraderJournalWorkspace } from '@/components/journal/TraderJournalWorkspace';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/journal',
    title:
      locale === 'id'
        ? 'Jurnal Trader JGS, Catatan Transaksi, Risiko & Evaluasi Emosi'
        : 'JGS Trader Journal, Trade Notes, Risk Tracking & Emotional Audit',
    description:
      locale === 'id'
        ? 'Catat entry dan exit, lacak kepatuhan aturan risiko, dan evaluasi ekspektasi R Anda secara gratis.'
        : 'Log entry and exit records, track risk-rule adherence, and audit your R-expectancy for free.',
  });
}

export default function JournalPage() {
  return <TraderJournalWorkspace />;
}
