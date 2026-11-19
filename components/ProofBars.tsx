import type { Site } from "@/content/site";

/**
 * Before/after bars for the voice-assistant case study.
 * Bars are drawn to scale in minutes. They are decorative (aria-hidden):
 * every value is also written out as text next to its label.
 * Meant to sit inside a violet (data-tone="primary") card.
 */
export function ProofBars({ proof }: { proof: Site["proof"] }) {
  const max = Math.max(...proof.rows.map((r) => r.minutes));
  const ticks = Array.from({ length: max + 1 }, (_, i) => i);

  return (
    <figure>
      <figcaption>
        <h2 className="font-sans text-base font-semibold text-on-primary-muted">{proof.caption}</h2>
      </figcaption>
      <ul className="mt-8 space-y-7">
        {proof.rows.map((row) => (
          <li key={row.label} className="grid gap-2 md:grid-cols-[14rem_1fr] md:items-center md:gap-6">
            <p className="flex items-baseline justify-between gap-3 md:block">
              <span className="font-medium">{row.label}</span>
              <span className="font-display text-xl font-extrabold whitespace-nowrap md:mt-1 md:block md:text-2xl">
                {row.display}
              </span>
            </p>
            <div aria-hidden="true" className="h-10 w-full md:h-12">
              <div
                className="bar-grow h-full rounded-full bg-sun"
                style={{ width: `${(row.minutes / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-3 md:ml-[calc(14rem+1.5rem)]">
        <div className="relative h-6 border-t-2 border-primary-line text-xs text-on-primary-muted">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute top-1 -translate-x-1/2 whitespace-nowrap first:translate-x-0 last:-translate-x-full"
              style={{ left: `${(t / max) * 100}%` }}
            >
              {t === max ? `${t} min` : t}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
