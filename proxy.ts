import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "fr"];

/** Pick French if the browser prefers it over English, otherwise English. */
function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => locales.includes(r.lang))?.lang ?? "en";
}

/** Send visitors without a language in the URL (e.g. "/" or "/about") to /en/... or /fr/... */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals, the API, generated images, sitemap/robots and any file with an extension.
  matcher: ["/((?!_next|api|icon|opengraph-image|sitemap\\.xml|robots\\.txt|.*\\..*).*)"],
};
