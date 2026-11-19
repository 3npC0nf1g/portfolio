import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProofBars } from "@/components/ProofBars";
import { ButtonLink } from "@/components/ui/Button";
import { Todo, isTodo } from "@/components/ui/Todo";
import { alternates, getSite, hasLocale, localize } from "@/lib/i18n";
import { pastel } from "@/lib/pastels";

const path = "/projects/voice-assistant";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/voice-assistant">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getSite(lang);
  const { caseStudy } = t;
  // Re-use the site-wide generated image (setting openGraph here replaces the inherited one).
  const ogImage = { url: `/${lang}/opengraph-image`, width: 1200, height: 630, alt: `${t.person.name}, ${t.person.role}` };
  return {
    title: caseStudy.title,
    description: caseStudy.metaDescription,
    alternates: alternates(lang, path),
    openGraph: {
      type: "article",
      locale: t.locale,
      url: localize(lang, path),
      title: `${caseStudy.title} | ${t.person.name}`,
      description: caseStudy.metaDescription,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
      title: `${caseStudy.title} | ${t.person.name}`,
      description: caseStudy.metaDescription,
    },
  };
}

function Text({ children }: { children: string }) {
  return isTodo(children) ? <Todo>{children}</Todo> : <>{children}</>;
}

function slug(s: string) {
  return `cs-${s.replace(/\W+/g, "-").toLowerCase()}`;
}

export default async function VoiceAssistantCaseStudy({ params }: PageProps<"/[lang]/projects/voice-assistant">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { caseStudy, proof, ui } = getSite(lang);
  const meta = [
    { term: ui.caseStudy.role, detail: caseStudy.role },
    { term: ui.caseStudy.when, detail: caseStudy.timeframe },
    { term: ui.caseStudy.status, detail: ui.caseStudy.live },
  ];

  return (
    <article aria-labelledby="case-title" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <header className="pt-10 pb-10 sm:pt-14">
        <Link
          href={localize(lang, "/projects")}
          className="inline-flex min-h-11 items-center rounded-full bg-lilac px-4 font-semibold text-ink hover:bg-sun"
        >
          {ui.caseStudy.back}
        </Link>
        <p className="mt-8 font-display text-lg font-bold text-link">{ui.caseStudy.label}</p>
        <h1
          id="case-title"
          className="mt-2 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] font-extrabold tracking-tight"
        >
          {caseStudy.title}
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted sm:text-xl">{caseStudy.lede}</p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {meta.map((m, i) => (
            <div key={m.term} className={`rounded-[1.75rem] p-5 text-ink ${pastel(i)}`} data-tone="pastel">
              <dt className="text-sm font-semibold">{m.term}</dt>
              <dd className="mt-1 font-medium">
                <Text>{m.detail}</Text>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-label={ui.caseStudy.glance} data-tone="primary" className="rounded-[2.5rem] bg-primary p-7 text-on-primary sm:p-12">
        <ProofBars proof={proof} />
      </section>

      <div className="mt-6 divide-y divide-line">
        {caseStudy.sections.map((section) => (
          <section
            key={section.heading}
            aria-labelledby={slug(section.heading)}
            className="grid gap-4 py-10 md:grid-cols-[16rem_1fr] md:gap-12 md:py-14"
          >
            <h2 id={slug(section.heading)} className="text-3xl font-extrabold tracking-tight">
              {section.heading}
            </h2>
            <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed">
              {section.body.map((p, i) => (
                <p key={i}>
                  <Text>{p}</Text>
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section
        aria-labelledby="cs-next"
        data-tone="pastel"
        className="flex flex-col gap-6 rounded-[2.5rem] bg-sun p-8 text-ink sm:p-12 md:flex-row md:items-center md:justify-between"
      >
        <h2 id="cs-next" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {ui.caseStudy.ctaHeading}
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={localize(lang, "/contact")}>{ui.caseStudy.contact}</ButtonLink>
          <ButtonLink href={localize(lang, "/projects")} variant="white">
            {ui.caseStudy.allProjects}
          </ButtonLink>
        </div>
      </section>
    </article>
  );
}
