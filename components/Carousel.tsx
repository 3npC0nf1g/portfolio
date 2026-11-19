"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal carousel built on native scroll snapping.
 * Swipe on touch, scroll with a trackpad, use the arrow buttons, or focus the
 * track and use the arrow keys. Respects prefers-reduced-motion.
 */
export function Carousel({
  label,
  labels,
  header,
  children,
}: {
  label: string;
  labels: { previous: string; next: string; scroll: string };
  header?: ReactNode;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function step(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * amount, behavior: reduce ? "auto" : "smooth" });
  }

  const arrow =
    "grid size-12 place-items-center rounded-full border-2 border-fg text-fg transition-colors hover:bg-fg hover:text-canvas disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-fg";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>{header}</div>
        <div className="flex gap-2">
          <button type="button" className={arrow} onClick={() => step(-1)} disabled={atStart}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            <span className="sr-only">{labels.previous}</span>
          </button>
          <button type="button" className={arrow} onClick={() => step(1)} disabled={atEnd}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span className="sr-only">{labels.next}</span>
          </button>
        </div>
      </div>
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={`${label}, ${labels.scroll}`}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {children}
      </ul>
    </div>
  );
}
