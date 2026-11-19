import Link from "next/link";
import { site } from "@/content/site";
import { resume } from "@/lib/resume";

export function Header() {
  return (
    <header data-tone="block" className="sticky top-0 z-40 bg-block text-on-block">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-h-11 items-center font-display text-lg font-extrabold tracking-tight">
          {site.person.name}
        </Link>
        <nav aria-label="Main">
          {/* Small screens: only the resume button (or Contact if there's no resume yet). */}
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const isContact = item.label === "Contact";
              const pill = isContact && !resume;
              return (
                <li key={item.href} className={pill ? "" : "hidden md:block"}>
                  <Link
                    href={item.href}
                    className={
                      pill
                        ? "ml-2 inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-display text-sm font-bold text-on-accent hover:bg-white"
                        : "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-on-block-muted hover:text-on-block hover:underline hover:underline-offset-4"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {resume && (
              <li>
                <a
                  href={resume.href}
                  download={resume.downloadName}
                  className="ml-2 inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-display text-sm font-bold text-on-accent hover:bg-white"
                >
                  Resume<span className="sr-only"> (PDF download)</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
