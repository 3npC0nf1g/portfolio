import Link from "next/link";
import { site } from "@/content/site";

// Shown for unknown pages. Not-found pages don't receive the language, so this uses English
// with a link to each language's home page.
export default function NotFound() {
  const { notFound } = site.ui;
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">{notFound.title}</h1>
      <p className="mt-4 text-lg text-muted">{notFound.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/en" className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display font-bold text-on-primary hover:bg-ink">
          {notFound.home}
        </Link>
        <Link href="/fr" lang="fr" hrefLang="fr" className="inline-flex min-h-12 items-center rounded-full border-2 border-current px-6 font-display font-bold hover:bg-fg hover:text-canvas">
          Accueil en français
        </Link>
      </div>
    </div>
  );
}
