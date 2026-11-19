import { site, type Site } from "@/content/site";
import { siteFr } from "@/content/site.fr";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

const content: Record<Locale, Site> = { en: site, fr: siteFr };

/** Site content in the given language. */
export const getSite = (lang: Locale): Site => content[lang];

/**
 * Prefix an internal page path with the language: "/projects" -> "/fr/projects".
 * External URLs, anchors and files (anything with a dot, like /resume.pdf) are left alone.
 */
export function localize(lang: Locale, href: string): string {
  if (!href.startsWith("/") || /\.[a-z0-9]+$/i.test(href.split("#")[0])) return href;
  const [path, hash] = href.split("#");
  const localized = path === "/" ? `/${lang}` : `/${lang}${path}`;
  return hash ? `${localized}#${hash}` : localized;
}

/** hreflang alternates for a page path, for search engines. */
export function alternates(lang: Locale, path: string) {
  return {
    canonical: localize(lang, path),
    languages: {
      en: localize("en", path),
      fr: localize("fr", path),
      "x-default": localize(defaultLocale, path),
    },
  };
}
