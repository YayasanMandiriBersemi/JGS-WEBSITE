import React from 'react';
import type { Metadata } from 'next';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/onboarding',
    title:
      locale === 'id'
        ? 'Panduan Awal Bersama Jey, Rencana Belajar Trading Personal'
        : 'Interactive Onboarding with Jey, Personalized Learning Roadmap',
    description:
      locale === 'id'
        ? 'Susun jalur belajar dan contoh parameter risiko Anda bersama Jey secara gratis.'
        : 'Configure your personalized learning path and sample risk parameters with Jey.',
  });
}

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
