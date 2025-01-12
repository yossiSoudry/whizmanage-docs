// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/lib/i18n/config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // אם זה הדף הראשי, לא נבצע ניתוב מחדש
  if (pathname === '/') {
    return NextResponse.next()
  }

  // רק עבור /docs נבצע ניתוב לפי שפה
  if (pathname.startsWith('/docs')) {
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`)
    )

    if (pathnameIsMissingLocale) {
      const locale = request.cookies.get('NEXT_LOCALE')?.value || i18n.defaultLocale
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, request.url)
      )
    }
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}