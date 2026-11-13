import React from 'react';
import type { Metadata } from 'next';
import { QuantLabDocs } from '@/components/quant/QuantLabDocs';
import { JgsVaultGatekeeper } from '@/components/account/JgsVaultGatekeeper';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/quant-lab',
    title:
      locale === 'id'
        ? 'JGS Quant Lab, Dokumentasi Arsitektur Expert Advisor (EA) MT5'
        : 'JGS Quant Lab, MT5 Expert Advisor (EA) Architecture Documentation',
    description:
      locale === 'id'
        ? 'Dokumentasi alur eksekusi OnTick() deterministik, parameter pengaman risiko, dan checklist persiapan VPS/MT5.'
        : 'Documentation on deterministic OnTick() execution pipelines, risk guard parameters, and VPS/MT5 deployment checklists.',
  });
}

export default async function QuantLabPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = (isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE) as 'id' | 'en';

  return (
    <JgsVaultGatekeeper
      locale={locale}
      pillarTitleId="JGS QUANT LAB // BONGKAR MITOS ROBOT & ARSITEKTUR EA"
      pillarTitleEn="JGS QUANT LAB // EXPERT ADVISOR ARCHITECTURE"
      pillarSummaryId="Bedah jujur mengapa robot Martingale/Grid tanpa batas menghancurkan akun 1,000 USC, plus spesifikasi 2 sistem EA internal JGS: JGS Cent Risk Guardian & JGS Micro-Systematic EA."
      pillarSummaryEn="Honest breakdown of why uncapped Martingale/Grid bots destroy 1,000 USC accounts, plus specs of JGS's 2 core EA pillars: Risk Guardian & Micro-Systematic EA."
      previewHighlightsId={[
        'JGS Cent Risk Guardian (Auto-Cut Daily Loss & Spread Guard)',
        'JGS Micro-Systematic EA (ICT Session & Hard SL Execution)',
        'Pipeline OnTick() MQL5 Deterministik 5 Tahap',
        'Checklist Interaktif Setup VPS & Terminal MT5',
      ]}
      previewHighlightsEn={[
        'JGS Cent Risk Guardian (Protection EA)',
        'JGS Micro-Systematic EA (Execution EA)',
        '5-Stage Deterministic MQL5 OnTick() Pipeline',
        'Interactive MT5 & VPS Pre-Flight Checklist',
      ]}
    >
      <QuantLabDocs />
    </JgsVaultGatekeeper>
  );
}
