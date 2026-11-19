import { site } from "@/content/site";

export function Skills() {
  const { skills } = site;
  return (
    <section id="skills" aria-labelledby="skills-heading" data-tone="deep" className="bg-deep text-on-deep">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 id="skills-heading" className="text-5xl font-extrabold tracking-tight [font-stretch:85%] sm:text-6xl">
          {skills.heading}
        </h2>
        <p className="mt-3 text-lg text-on-deep-muted">{skills.intro}</p>
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-deep-line">
          {skills.groups.map((group, i) => (
            <div
              key={group.name}
              className={`${i > 0 ? "md:pl-8" : ""} ${i < skills.groups.length - 1 ? "md:pr-8" : ""}`}
            >
              <h3 className="text-4xl font-extrabold tracking-tight text-accent">{group.name}</h3>
              <p className="mt-1 text-on-deep-muted">{group.description}</p>
              <ul aria-label={`${group.name} skills`} className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-deep-line px-3.5 py-1.5 text-sm font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
