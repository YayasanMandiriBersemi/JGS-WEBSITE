import React from 'react';
import type { Metadata } from 'next';
import { CopyTradingGuide } from '@/components/copy-trading/CopyTradingGuide';
import { JgsVaultGatekeeper } from '@/components/account/JgsVaultGatekeeper';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/copy-trading',
    title:
      locale === 'id'
        ? 'Informasi Copy Trading, Simulasi High-Water Mark & Risiko, JGS'
        : 'Copy Trading Information, High-Water Mark Simulator & Risk Disclosures, JGS',
    description:
      locale === 'id'
        ? 'Penjelasan transparan mekanisme penyalinan posisi, risiko eksekusi, kompatibilitas spesifikasi broker, dan simulasi High-Water Mark 30% (Status Pra-Peluncuran).'
        : 'Transparent guide to trade replication mechanics, execution risks, broker compatibility, and the proposed 30% High-Water Mark fee model (Pre-Launch State).',
  });
}

export default async function CopyTradingPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = (isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE) as 'id' | 'en';

  return (
    <JgsVaultGatekeeper
      locale={locale}
      pillarTitleId="EDUKASI COPY TRADING // SKEMA HIGH-WATER MARK 30%"
      pillarTitleEn="COPY TRADING EDUCATION // 30% HIGH-WATER MARK MODEL"
      pillarSummaryId="Panduan transparan (Pra-Peluncuran, tanpa penerimaan deposit) tentang cara kerja proporsional lot Cent-to-Cent dan simulasi biaya High-Water Mark 30% atas profit bersih baru."
      pillarSummaryEn="Transparent Pre-Launch guide (no active deposits or execution) on Cent-to-Cent proportional lot scaling and the proposed 30% High-Water Mark net-new-profit model."
      previewHighlightsId={[
        'Status Pra-Peluncuran (Deposit & Eksekusi Belum Aktif)',
        'Simulator Scaling Lot Proporsional Cent-to-Cent',
        'Simulator Biaya High-Water Mark 30% Interaktif',
        'Keterbukaan Risiko Slippage & Kesiapan Pribadi',
      ]}
      previewHighlightsEn={[
        'Pre-Launch Informational State (No Deposits)',
        'Cent-to-Cent Proportional Lot Scaling Simulator',
        'Interactive 30% High-Water Mark Fee Simulator',
        'Execution Slippage & Readiness Checklist',
      ]}
    >
      <CopyTradingGuide />
    </JgsVaultGatekeeper>
  );
}
