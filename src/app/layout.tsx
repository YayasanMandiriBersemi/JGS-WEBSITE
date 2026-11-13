import type { Metadata } from 'next';
import { headers, cookies } from 'next/headers';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LocaleProvider } from '@/i18n/LocaleContext';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  isValidLocale,
  buildLocalizedMetadata,
} from '@/i18n/config';

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const rawLocale =
    headerStore.get('x-jgs-locale') ?? cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return buildLocalizedMetadata({
    locale,
    path: '/',
    titleId: 'THE JEY GANG STRATEGIST (JGS), Mulai dari paham. Bukan dari modal.',
    titleEn: 'THE JEY GANG STRATEGIST (JGS), Start with understanding. Not account size.',
    descriptionId:
      'Belajar memahami market, mengelola risiko, dan membangun strategi trading melalui edukasi dan tools gratis. Small Capital. Serious Strategy.',
    descriptionEn:
      'Learn to understand markets, manage risk, and develop trading strategies through free education and practical tools. Small Capital. Serious Strategy.'
  });
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const rawLocale =
    headerStore.get('x-jgs-locale') ?? cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[var(--bg-canvas)] text-[var(--text-ivory)] antialiased selection:bg-[#D4AF37] selection:text-[#08050E] flex flex-col min-h-screen">
        <LocaleProvider initialLocale={locale}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#D4AF37] focus:text-[#08050E] focus:font-sans focus:text-xs focus:font-bold"
          >
            {locale === 'id' ? 'Lewati ke konten utama' : 'Skip to main content'}
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
