import { getSite, localize, type Locale } from "@/lib/i18n";

/** schema.org Person, built only from content/site.ts. Unfilled links are left out. */
export function PersonJsonLd({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  const sameAs = site.contact.links
    .filter((l) => l.href?.startsWith("http"))
    .map((l) => l.href as string);
  const email = site.contact.links.find((l) => l.href?.startsWith("mailto:"))?.href;

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.person.name,
    jobTitle: site.person.jobTitle,
    description: site.meta.description,
    url: `${site.url}${localize(lang, "/")}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.person.city,
      addressCountry: site.person.country,
    },
    knowsAbout: site.skills.groups.flatMap((g) => g.items),
    knowsLanguage: ["English", "French"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: site.person.education.school,
      address: { "@type": "PostalAddress", addressLocality: "Mons", addressCountry: "BE" },
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: `${site.person.education.degree}, ${site.person.education.honours}`,
    },
    ...(sameAs.length ? { sameAs } : {}),
    ...(email ? { email } : {}),
    ...(site.hero.photo ? { image: `${site.url}${site.hero.photo}` } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
