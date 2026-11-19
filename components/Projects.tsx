import Link from "next/link";
import { Todo } from "@/components/ui/Todo";
import { site } from "@/content/site";

export function Projects() {
  const { projects } = site;
  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 id="projects-heading" className="text-5xl font-extrabold tracking-tight [font-stretch:85%] sm:text-6xl">
          {projects.heading}
        </h2>
        <p className="mt-3 text-lg text-muted">{projects.intro}</p>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.items.map((project) => {
            const titleId = `project-${project.title.replace(/\W+/g, "-").toLowerCase()}`;
            const external = project.href?.startsWith("http");
            return (
              <li key={project.title}>
                <article
                  aria-labelledby={titleId}
                  className="flex h-full flex-col rounded-2xl border border-line bg-canvas p-6 sm:p-7"
                >
                  {project.role && (
                    <p className="mb-3 inline-flex self-start rounded-full bg-[var(--brand-ink)] px-3 py-1 font-display text-sm font-bold text-[var(--brand-blush)]">
                      {project.role}
                    </p>
                  )}
                  <h3 id={titleId} className="text-2xl leading-tight font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
                  {project.outcome && <p className="mt-3 font-semibold">{project.outcome}</p>}
                  <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-surface px-3 py-1 text-sm font-medium">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    {project.href ? (
                      <Link
                        href={project.href}
                        aria-describedby={titleId}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex min-h-11 items-center font-display font-bold text-link underline decoration-2 underline-offset-[6px] hover:decoration-4"
                      >
                        {project.linkLabel}
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </Link>
                    ) : (
                      <p className="text-muted">
                        <Todo>[TODO] Add a link or write-up</Todo>
                      </p>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
