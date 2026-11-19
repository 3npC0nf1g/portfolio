"use client";

import { Children, useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

type Labels = { previous: string; next: string; scroll: string; goTo: string };

/**
 * Horizontal carousel built on native scroll snapping.
 *
 * Ways to move it: swipe (touch), trackpad scroll, click-and-drag with a mouse,
 * the arrow buttons, the dots, or focus the track and use the arrow keys.
 * A drag never counts as a click on a card. Respects prefers-reduced-motion.
 */
export function Carousel({
  label,
  labels,
  slideNames,
  header,
  children,
}: {
  label: string;
  labels: Labels;
  /** One name per slide, for the dots' accessible labels. */
  slideNames: string[];
  header?: ReactNode;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // `first` = the left-most card on screen (used by the arrows).
  // `active` = the dot to highlight (the last one once you've reached the end).
  const [first, setFirst] = useState(0);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const count = Children.count(children);

  const slides = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 4;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setAtStart(start);
    setAtEnd(end);
    // Active slide = the one whose left edge is closest to the track's left edge.
    const items = Array.from(el.children) as HTMLElement[];
    const trackLeft = el.getBoundingClientRect().left;
    const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    let best = 0;
    let bestDistance = Infinity;
    items.forEach((item, i) => {
      const d = Math.abs(item.getBoundingClientRect().left - trackLeft - padding);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    setFirst(best);
    setActive(end ? items.length - 1 : best);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const frame = requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function goTo(index: number) {
    const el = trackRef.current;
    const target = slides()[Math.max(0, Math.min(index, count - 1))];
    if (!el || !target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const left = target.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft - padding;
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }

  // Mouse drag-to-scroll. Touch and trackpads already scroll natively.
  function onPointerDown(e: PointerEvent<HTMLUListElement>) {
    if (e.pointerType !== "mouse" || e.button !== 0 || !trackRef.current) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
  }

  function onPointerMove(e: PointerEvent<HTMLUListElement>) {
    const el = trackRef.current;
    const d = drag.current;
    if (!el || !d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      el.style.scrollSnapType = "none"; // let it follow the mouse freely
      setDragging(true);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  }

  function endDrag() {
    const el = trackRef.current;
    const d = drag.current;
    drag.current = null;
    if (!el || !d?.moved) return;
    // Swallow the click some browsers fire at the end of a drag, but only that one:
    // Safari fires none, so the flag is cleared right after this event either way.
    suppressClick.current = true;
    setTimeout(() => (suppressClick.current = false), 0);
    setDragging(false);
    el.style.scrollSnapType = "";
    update();
    // Settle on the nearest card.
    requestAnimationFrame(() => {
      const items = slides();
      const trackLeft = el.getBoundingClientRect().left;
      const nearest = items.reduce(
        (best, item, i) => {
          const dist = Math.abs(item.getBoundingClientRect().left - trackLeft);
          return dist < best.dist ? { i, dist } : best;
        },
        { i: 0, dist: Infinity },
      );
      goTo(nearest.i);
    });
  }

  const arrow =
    "grid size-12 place-items-center rounded-full border-2 border-fg text-fg transition-colors hover:bg-fg hover:text-canvas disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-fg";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>{header}</div>
        <div className="flex gap-2">
          <button type="button" className={arrow} onClick={() => goTo(first - 1)} disabled={atStart}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            <span className="sr-only">{labels.previous}</span>
          </button>
          <button type="button" className={arrow} onClick={() => goTo(first + 1)} disabled={atEnd}>
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
        className={`no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0 ${
          dragging ? "cursor-grabbing select-none" : "md:cursor-grab"
        }`}
      >
        {children}
      </ul>

      {/* Dots: where you are, and a quick way to jump. */}
      <div className="mt-4 flex justify-center gap-1">
        {slideNames.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => goTo(i)}
            aria-current={i === active ? "true" : undefined}
            className="group grid size-11 place-items-center rounded-full"
          >
            <span
              aria-hidden="true"
              className={`block h-2.5 rounded-full transition-all duration-200 motion-reduce:transition-none ${
                i === active ? "w-7 bg-primary" : "w-2.5 bg-line group-hover:bg-muted"
              }`}
            />
            <span className="sr-only">
              {labels.goTo} {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
