import Link from "next/link";
import { Todo } from "@/components/ui/Todo";
import type { Project } from "@/content/site";
import { getSite, localize, type Locale } from "@/lib/i18n";
import { pastel } from "@/lib/pastels";

/**
 * Compact pastel card for the home-page carousel. The title is the link
 * (to the project's spot on /projects); the whole card is clickable.
 */
export function ProjectSlide({ project, index, lang }: { project: Project; index: number; lang: Locale }) {
  const t = getSite(lang);
  return (
    <li className="w-[82%] shrink-0 snap-start sm:w-[22rem]">
      <article
        data-tone="pastel"
        className={`group relative flex h-full min-h-[17rem] flex-col rounded-[2rem] p-7 text-ink transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${pastel(index)}`}
      >
        {project.role && (
          <p className="mb-3 inline-flex self-start rounded-full bg-ink px-3 py-1 font-display text-xs font-bold text-white">
            {project.role}
          </p>
        )}
        <h3 className="text-2xl leading-tight font-extrabold tracking-tight">
          <Link
            href={localize(lang, `/projects#${project.slug}`)}
            className="-my-2 inline-block py-2 underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-current after:absolute after:inset-0 after:rounded-[2rem]"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed">{project.short}</p>
        <ul aria-label={t.ui.technologies} className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag} className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}

/** Full project card for the /projects page. */
export function ProjectCard({ project, index, lang }: { project: Project; index: number; lang: Locale }) {
  const t = getSite(lang);
  const titleId = `project-${project.slug}`;
  const isExternal = Boolean(project.href?.startsWith("http"));
  return (
    <article
      id={project.slug}
      aria-labelledby={titleId}
      className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[2rem] border border-line bg-surface"
    >
      <div data-tone="pastel" className={`px-7 pt-7 pb-6 text-ink sm:px-8 ${pastel(index)}`}>
        {project.role && (
          <p className="mb-3 inline-flex rounded-full bg-ink px-3 py-1 font-display text-xs font-bold text-white">
            {project.role}
          </p>
        )}
        <h2 id={titleId} className="text-3xl leading-tight font-extrabold tracking-tight">
          {project.title}
        </h2>
        <p className="mt-2 font-medium">{project.short}</p>
      </div>
      <div className="flex flex-1 flex-col px-7 pt-6 pb-7 sm:px-8">
        <p className="leading-relaxed text-muted">{project.summary}</p>
        {project.outcome && <p className="mt-4 font-display text-lg font-bold">{project.outcome}</p>}
        <ul aria-label={t.ui.technologies} className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line px-3 py-1 text-sm font-medium">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          {project.href ? (
            <Link
              href={localize(lang, project.href)}
              aria-describedby={titleId}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-display font-bold text-on-primary hover:bg-ink"
            >
              {project.linkLabel}
              {isExternal && <span className="sr-only"> {t.ui.newTab}</span>}
            </Link>
          ) : (
            <p className="text-muted">
              <Todo>{t.ui.addLinkTodo}</Todo>
            </p>
          )}
          {project.secondaryLink && (
            <a
              href={project.secondaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby={titleId}
              className="inline-flex min-h-12 items-center rounded-full border-2 border-current px-6 font-display font-bold hover:bg-fg hover:text-canvas"
            >
              {project.secondaryLink.label}
              <span className="sr-only"> {t.ui.newTab}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
