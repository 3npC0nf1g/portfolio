import type { Metadata } from "next";
import Link from "next/link";
import { ProofBars } from "@/components/ProofBars";
import { ButtonLink } from "@/components/ui/Button";
import { Todo, isTodo } from "@/components/ui/Todo";
import { site } from "@/content/site";

const { caseStudy } = site;
const path = "/work/voice-assistant";
// Re-use the site-wide generated image (setting openGraph here replaces the inherited one).
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.person.name}, ${site.person.role}` };

export const metadata: Metadata = {
  title: caseStudy.title,
  description: caseStudy.metaDescription,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    url: path,
    title: `${caseStudy.title} | ${site.person.name}`,
    description: caseStudy.metaDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
    title: `${caseStudy.title} | ${site.person.name}`,
    description: caseStudy.metaDescription,
  },
};

function Text({ children }: { children: string }) {
  return isTodo(children) ? <Todo>{children}</Todo> : <>{children}</>;
}

function slug(s: string) {
  return `cs-${s.replace(/\W+/g, "-").toLowerCase()}`;
}

export default function VoiceAssistantCaseStudy() {
  const meta = [
    { term: "Role", detail: caseStudy.role },
    { term: "When", detail: caseStudy.timeframe },
    { term: "Status", detail: "Live in production" },
  ];

  return (
    <article aria-labelledby="case-title">
      <header className="bg-canvas">
        <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-14 sm:px-6 sm:pt-12 sm:pb-20 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center font-medium text-link underline underline-offset-4"
          >
            Back to all projects
          </Link>
          <p className="mt-8 text-lg font-bold text-link">Case study</p>
          <h1
            id="case-title"
            className="mt-2 max-w-4xl text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] [font-stretch:85%]"
          >
            {caseStudy.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted sm:text-xl">{caseStudy.lede}</p>
          <dl className="mt-10 grid gap-x-10 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
            {meta.map((m) => (
              <div key={m.term}>
                <dt className="font-display font-bold">{m.term}</dt>
                <dd className="mt-1 text-muted">
                  <Text>{m.detail}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section aria-label="Result at a glance" data-tone="block" className="bg-block text-on-block">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <ProofBars />
        </div>
      </section>

      <div className="bg-canvas">
        <div className="mx-auto w-full max-w-6xl divide-y divide-line px-4 sm:px-6 lg:px-8">
          {caseStudy.sections.map((section) => (
            <section
              key={section.heading}
              aria-labelledby={slug(section.heading)}
              className="grid gap-4 py-12 md:grid-cols-[16rem_1fr] md:gap-12 md:py-16"
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
      </div>

      <section aria-labelledby="cs-next" data-tone="deep" className="bg-deep text-on-deep">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <h2 id="cs-next" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Want to build something like this?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#contact" variant="accent">
              Get in touch
            </ButtonLink>
            <ButtonLink href="/#projects" variant="on-block">
              See all projects
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
