import { site } from "@/content/site";

export function About() {
  const { about, person } = site;
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-canvas">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-8">
        <div>
          <h2 id="about-heading" className="text-lg font-bold text-link">
            {about.heading}
          </h2>
          <p className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{about.lead}</p>
        </div>
        <div>
          <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div data-tone="accent" className="mt-10 rounded-2xl bg-accent p-6 text-on-accent sm:p-8">
            <p className="text-sm font-medium">{about.educationLabel}</p>
            <p className="mt-2 font-display text-2xl leading-tight font-extrabold tracking-tight">
              {person.education.degree}
            </p>
            <p className="mt-2 text-lg">
              {person.education.school}, {person.education.schoolLocation}
            </p>
            <p className="mt-5 inline-flex rounded-full bg-[var(--brand-ink)] px-4 py-1.5 font-display text-sm font-bold text-accent">
              {person.education.honours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
