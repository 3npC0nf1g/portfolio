"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = { label: string; href: string };
type Labels = {
  mainNav: string;
  menu: string;
  close: string;
  resume: string;
  pdfDownload: string;
  switchTo: string;
  switchToName: string;
};

/**
 * Floating rounded nav bar. Highlights the current page, has an EN/FR switch
 * that keeps you on the same page, and collapses to a menu on phones.
 */
export function SiteHeader({
  name,
  lang,
  otherLang,
  home,
  nav,
  resume,
  labels,
}: {
  name: string;
  lang: string;
  otherLang: string;
  home: string;
  nav: NavItem[];
  resume: { href: string; downloadName: string } | null;
  labels: Labels;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === home ? pathname === home : pathname.startsWith(href));
  // Same page in the other language: /en/projects -> /fr/projects
  const switchHref = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${otherLang}`);

  const resumeButton = resume && (
    <a
      href={resume.href}
      download={resume.downloadName}
      className="inline-flex min-h-11 items-center rounded-full bg-sun px-5 font-display text-sm font-bold text-ink hover:bg-primary hover:text-on-primary"
    >
      {labels.resume}
      <span className="sr-only"> {labels.pdfDownload}</span>
    </a>
  );

  const languageSwitch = (
    <Link
      href={switchHref}
      hrefLang={otherLang}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-line px-3 font-display text-sm font-bold hover:border-fg"
    >
      {labels.switchTo}
      <span lang={otherLang} className="sr-only">
        , {labels.switchToName}
      </span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-line bg-surface/90 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-2 pr-2 pl-3 sm:pl-5">
          <Link href={home} className="flex min-h-11 items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-primary text-xs text-on-primary">
              ST
            </span>
            <span className="hidden min-[400px]:inline">{name}</span>
            <span className="sr-only min-[400px]:hidden">{name}</span>
          </Link>

          <nav aria-label={labels.mainNav} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-muted hover:bg-lilac hover:text-ink aria-[current=page]:bg-lilac aria-[current=page]:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {languageSwitch}
            <div className="hidden sm:block">{resumeButton}</div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-11 items-center rounded-full bg-lilac px-4 font-display text-sm font-bold text-ink md:hidden"
            >
              {open ? labels.close : labels.menu}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label={labels.mainNav} className="border-t border-line p-3 md:hidden">
            <ul className="grid gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-12 items-center rounded-2xl px-4 font-display text-lg font-bold hover:bg-lilac hover:text-ink aria-[current=page]:bg-lilac aria-[current=page]:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {resume && <li className="pt-2 sm:hidden">{resumeButton}</li>}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
