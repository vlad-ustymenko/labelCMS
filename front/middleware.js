import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = "uk";
const SUPPORTED_LOCALES = ["uk", "en"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Пропускаємо _next, api, файли
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const pathnameIsLocale = SUPPORTED_LOCALES.includes(firstSegment);

  if (pathnameIsLocale) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", firstSegment, {
      maxAge: 60 * 60 * 24 * 365, // 1 рік
    });
    return response;
  }

  // Якщо корінь '/' — редірект на локаль з cookie або за замовчуванням
  if (pathname === "/" || !pathnameIsLocale) {
    const locale = localeCookie || DEFAULT_LOCALE;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
}
