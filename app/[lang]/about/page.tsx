import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { PageHeader } from "@/components/PageHeader";
import { Portrait } from "@/components/Portrait";
import { ButtonLink } from "@/components/ui/Button";
import { alternates, getSite, hasLocale, localize } from "@/lib/i18n";
import { pastel } from "@/lib/pastels";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getSite(lang);
  return {
    title: t.pages.about.title,
    description: t.pages.about.description,
    alternates: alternates(lang, "/about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { about, person, skills, more, experience, ui } = getSite(lang);

  return (
    <>
      <PageHeader title={about.heading} lead={about.lead} />

      <div className="mx-auto grid w-full max-w-6xl gap-16 px-4 sm:px-6 lg:px-8">
        {/* Story + education */}
        <section aria-label={ui.about.story} className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside aria-labelledby="education-heading" data-tone="pastel" className="self-start rounded-[2rem] bg-sun p-7 text-ink sm:p-8">
            <h2 id="education-heading" className="text-sm font-semibold">
              {about.educationLabel}
            </h2>
            <p className="mt-2 font-display text-2xl leading-tight font-extrabold tracking-tight">{person.education.degree}</p>
            <p className="mt-2 text-lg">
              {person.education.school}, {person.education.schoolLocation}
            </p>
            <p className="mt-5 inline-flex rounded-full bg-ink px-4 py-1.5 font-display text-sm font-bold text-sun">
              {person.education.honours}
            </p>
          </aside>
        </section>

        {/* Experience */}
        <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-28">
          <h2 id="experience-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {experience.heading}
          </h2>
          <div className="mt-8">
            <ExperienceTimeline items={experience.items} lang={lang} newTab={ui.newTab} />
          </div>
        </section>

        {/* Skills */}
        <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-28">
          <h2 id="skills-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {skills.heading}
          </h2>
          <p className="mt-3 text-lg text-muted">{skills.intro}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {skills.groups.map((group, i) => (
              <div key={group.name} data-tone="pastel" className={`rounded-[2rem] p-7 text-ink ${pastel(i + 1)}`}>
                <h3 className="text-3xl font-extrabold tracking-tight">{group.name}</h3>
                <p className="mt-1 font-medium">{group.description}</p>
                <ul aria-label={`${group.name} ${ui.skillsSuffix}`} className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full bg-white/75 px-3.5 py-1.5 text-sm font-semibold">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section id="interests" aria-labelledby="interests-heading" className="grid scroll-mt-28 gap-8 lg:grid-cols-[20rem_1fr] lg:gap-12">
          <Portrait
            src={more.photo}
            alt={more.photoAlt}
            sizes="(min-width: 1024px) 20rem, 100vw"
            position="65% 45%"
            className="aspect-[4/5] max-h-[32rem] w-full sm:max-w-sm"
          />
          <div>
            <h2 id="interests-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {more.heading}
            </h2>
            <p className="mt-3 max-w-[40ch] font-display text-2xl leading-snug font-bold">{more.lead}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {more.items.map((item, i) => (
                <li key={item.title} data-tone="pastel" className={`rounded-[1.75rem] p-6 text-ink ${pastel(i + 2)}`}>
                  <h3 className="text-xl font-extrabold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={localize(lang, "/projects")}>{ui.about.seeProjects}</ButtonLink>
          <ButtonLink href={localize(lang, "/contact")} variant="outline">
            {ui.about.getInTouch}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
