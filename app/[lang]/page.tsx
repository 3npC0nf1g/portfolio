import Link from "next/link";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/Carousel";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { Portrait } from "@/components/Portrait";
import { ProjectSlide } from "@/components/ProjectCard";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { getSite, hasLocale, localize } from "@/lib/i18n";
import { pastel } from "@/lib/pastels";
import { resume } from "@/lib/resume";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { hero, home, projects, ui } = getSite(lang);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <PersonJsonLd lang={lang} />

      {/* Intro: big photo + violet card + quick facts */}
      <section aria-labelledby="hero-heading" className="grid gap-4 pt-6 sm:pt-8 lg:grid-cols-5">
        {hero.photo && (
          <Portrait
            src={hero.photo}
            alt={hero.photoAlt}
            priority
            sizes="(min-width: 1152px) 26rem, (min-width: 1024px) 40vw, 100vw"
            position="50% 25%"
            className="aspect-[4/5] sm:aspect-[4/3] lg:order-2 lg:col-span-2 lg:aspect-auto lg:min-h-[36rem]"
          />
        )}

        <div
          data-tone="primary"
          className="flex flex-col justify-center rounded-[2.5rem] bg-primary p-7 text-on-primary sm:p-12 lg:order-1 lg:col-span-3"
        >
          <p className="inline-flex items-center gap-2.5 self-start rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
            <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-sun" />
            {hero.status}
          </p>
          <h1 id="hero-heading" className="mt-6 text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] font-extrabold tracking-tight">
            {hero.greeting.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-4 font-display text-xl font-bold text-on-primary-muted sm:text-2xl">{hero.role}</p>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-on-primary-muted">{hero.short}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {resume && (
              <ButtonAnchor href={resume.href} download={resume.downloadName} variant="sun">
                {hero.resumeLabel}
                <span className="sr-only"> {ui.pdf}</span>
              </ButtonAnchor>
            )}
            <ButtonLink href={localize(lang, hero.primaryCta.href)} variant="on-primary">
              {hero.primaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 lg:order-3 lg:col-span-5 lg:grid-cols-4">
          {hero.facts.map((fact, i) => (
            <div key={fact.term} className={`rounded-[1.75rem] p-5 text-ink sm:p-6 ${pastel(i)}`}>
              <dt className="text-sm font-semibold">{fact.term}</dt>
              <dd className="mt-1 font-display text-base leading-snug font-bold sm:text-lg">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Projects carousel */}
      <section aria-labelledby="projects-heading" className="mt-20 sm:mt-24">
        <Carousel
          label={ui.carousel.label}
          labels={ui.carousel}
          slideNames={projects.items.map((p) => p.title)}
          header={
            <>
              <h2 id="projects-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                {home.projectsHeading}
              </h2>
              <Link
                href={localize(lang, "/projects")}
                className="mt-2 inline-flex min-h-11 items-center font-display font-bold text-link underline decoration-2 underline-offset-[6px] hover:decoration-4"
              >
                {home.projectsLink}
              </Link>
            </>
          }
        >
          {projects.items.map((project, i) => (
            <ProjectSlide key={project.slug} project={project} index={i} lang={lang} />
          ))}
        </Carousel>
      </section>

      {/* Call to action */}
      <section
        aria-labelledby="cta-heading"
        data-tone="pastel"
        className="mt-20 grid gap-6 rounded-[2.5rem] bg-sun p-8 text-ink sm:mt-24 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center"
      >
        <div>
          <h2 id="cta-heading" className="text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            {home.cta.heading}
          </h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed">{home.cta.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ButtonLink href={localize(lang, "/contact")} variant="primary">
            {home.cta.contactLabel}
          </ButtonLink>
          <ButtonLink href={localize(lang, "/about")} variant="white">
            {home.cta.aboutLabel}
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
