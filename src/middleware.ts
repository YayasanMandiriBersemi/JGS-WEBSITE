import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  isValidLocale
} from './i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, Next.js internals, and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // If the URL already starts with /id or /en, sync cookie and set x-jgs-locale header
  if (isValidLocale(firstSegment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-jgs-locale', firstSegment);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });

    const currentCookie = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
    if (currentCookie !== firstSegment) {
      response.cookies.set(LOCALE_COOKIE_NAME, firstSegment, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax'
      });
    }
    return response;
  }

  // Otherwise, resolve preferred locale from NEXT_LOCALE cookie (defaulting to 'id')
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const preferredLocale = isValidLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname =
    pathname === '/' ? `/${preferredLocale}` : `/${preferredLocale}${pathname}`;

  const redirectResponse = NextResponse.redirect(targetUrl, 307);
  redirectResponse.cookies.set(LOCALE_COOKIE_NAME, preferredLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  });
  return redirectResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
};
