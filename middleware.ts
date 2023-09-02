import { NextRequest, NextResponse } from "next/server";

import langParser from "accept-language-parser";

export const defaultLocale = "en";
export const locales = ["en","tr"] as const;
export type ValidLocale = typeof locales[number];

type PathnameLocale = {
  pathname: string;
  locale?: never;
};
type ISOLocale = {
  pathname?: never;
  locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

export const getLocale = ({ pathname, locale }: LocaleSource) => {
  if (locale) {
    const localePart = locale.toLowerCase();
    return localePart
  } else {
    const pathnamePart = pathname!.toLowerCase();
    return pathnamePart.split("/")[1];
  }
}; 

const findBestMatchingLocale = (acceptLangHeader: string) => {
    const parsedLangs = langParser.parse(acceptLangHeader);
    for (let i = 0; i < parsedLangs.length; i++) {
      const parsedLang = parsedLangs[i];
        const matchedLanguage = locales.find((locale) => {
          const localePart = getLocale({ locale });
          return parsedLang.code === localePart;
        });
        if (matchedLanguage) {
          return matchedLanguage;
        }
    }
    return defaultLocale;
  };

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const localePart = getLocale({ locale: defaultLocale });

const pathnameIsMissingValidLocale = locales.every((locale) => {
    const localePart = getLocale({ locale });
    return !pathname.startsWith(`/${localePart}`);
  });

  if (pathnameIsMissingValidLocale) {
    const matchedLocale = findBestMatchingLocale(
      request.headers.get("Accept-Language") || defaultLocale
    );
    if (matchedLocale !== defaultLocale) {
      const matchedLocalePart = getLocale({ locale: matchedLocale });
      return NextResponse.redirect(
        new URL(
          `/${matchedLocalePart}${pathname}`,
          request.url
        )
      );
    } else {
      return NextResponse.rewrite(
        new URL(
          `/${localePart}${pathname}`,
          request.url
        )
      );
    }
  }
}

export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
    ],
  };