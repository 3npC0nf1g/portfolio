import Link from "next/link";
import { Todo, isTodo } from "@/components/ui/Todo";
import type { ExperienceItem } from "@/content/site";
import { localize, type Locale } from "@/lib/i18n";
import { pastel } from "@/lib/pastels";

function Text({ children }: { children: string }) {
  return isTodo(children) ? <Todo>{children}</Todo> : <>{children}</>;
}

/** Vertical timeline of roles, most recent first. */
export function ExperienceTimeline({ items, lang, newTab }: { items: ExperienceItem[]; lang: Locale; newTab: string }) {
  return (
    <ol className="relative ml-3 border-l-2 border-line sm:ml-4">
      {items.map((item, i) => {
        const external = item.link?.href.startsWith("http");
        return (
          <li key={`${item.company}-${item.role}`} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
            <span
              aria-hidden="true"
              className={`absolute top-1 -left-[0.6rem] size-[1.1rem] rounded-full border-4 border-canvas ${i === 0 ? "bg-primary" : "bg-muted"}`}
            />
            <p className="text-sm font-semibold text-muted">
              <Text>{item.dates}</Text>
            </p>
            <h3 className="mt-1 text-2xl leading-tight font-extrabold tracking-tight">
              {item.role} <span className="text-link">· {item.company}</span>
            </h3>
            <p className="mt-2 flex flex-wrap gap-2">
              <span data-tone="pastel" className={`rounded-full px-3 py-1 text-sm font-semibold text-ink ${pastel(i)}`}>
                {item.type}
              </span>
              {item.location && <span className="rounded-full border border-line px-3 py-1 text-sm font-medium">{item.location}</span>}
            </p>
            <ul className="mt-4 max-w-[64ch] list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-line">
              {item.points.map((point) => (
                <li key={point}>
                  <Text>{point}</Text>
                </li>
              ))}
            </ul>
            {item.link && (
              <Link
                href={localize(lang, item.link.href)}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-3 inline-flex min-h-11 items-center font-display font-bold text-link underline decoration-2 underline-offset-[6px] hover:decoration-4"
              >
                {item.link.label}
                {external && <span className="sr-only"> {newTab}</span>}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
}
