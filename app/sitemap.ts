import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { localize, locales } from "@/lib/i18n";

const pages = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/projects", priority: 0.8 },
  { path: "/projects/voice-assistant", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
];

/** Every page in English and French, each listing its other-language version. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${site.url}${localize(lang, path)}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localize(l, path)}`])),
      },
    })),
  );
}
