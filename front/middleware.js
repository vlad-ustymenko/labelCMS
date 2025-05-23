import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = "en";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Пропускаємо _next, api, файли
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Отримуємо cookie локалі
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;

  // Якщо шлях вже містить локаль (наприклад /uk або /en)
  const pathnameIsLocale =
    pathname.startsWith("/en") || pathname.startsWith("/uk");

  if (pathnameIsLocale) {
    // Якщо є локаль в URL — оновлюємо cookie
    const response = NextResponse.next();
    const localeFromUrl = pathname.split("/")[1];

    // Встановлюємо cookie локалі на 1 рік
    response.cookies.set("NEXT_LOCALE", localeFromUrl, {
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  }

  // Якщо корінь '/' і немає локалі в URL
  if (pathname === "/") {
    const locale = localeCookie || DEFAULT_LOCALE;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
}
