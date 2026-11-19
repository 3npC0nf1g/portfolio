import Link from "next/link";
import { getSite, localize, type Locale } from "@/lib/i18n";

export function Footer({ lang }: { lang: Locale }) {
  const t = getSite(lang);
  const link = "inline-flex min-h-11 items-center px-2 font-semibold hover:text-fg hover:underline";
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          &copy; {t.copyrightYear} {t.person.name}, {t.person.location}
        </p>
        <ul className="flex flex-wrap gap-x-1">
          {t.contact.links.map(
            (l) =>
              l.href && (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {l.label}
                    <span className="sr-only"> {t.ui.newTab}</span>
                  </a>
                </li>
              ),
          )}
          <li>
            <Link href={localize(lang, "/contact")} className={link}>
              {t.nav.find((n) => n.href === "/contact")?.label}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
