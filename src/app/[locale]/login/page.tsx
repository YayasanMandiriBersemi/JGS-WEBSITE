import React from 'react';
import type { Metadata } from 'next';
import { LoginView } from '@/components/account/StrategistWorkspaceViews';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/login',
    title:
      locale === 'id'
        ? 'Masuk ke Profil Lokal (Opsional), JGS'
        : 'Sign In to Local Profile (Optional), JGS',
    description:
      locale === 'id'
        ? 'Masuk ke profil lokal JGS Anda. Seluruh edukasi dan kalkulator dapat diakses gratis tanpa login.'
        : 'Sign in to your local JGS profile. All education and calculators are accessible for free without login.',
  });
}

export default function LoginPage() {
  return <LoginView />;
}
