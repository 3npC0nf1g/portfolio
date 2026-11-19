import Image from "next/image";
import { site } from "@/content/site";

export function MoreAboutMe() {
  const { more } = site;
  return (
    <section id="more" aria-labelledby="more-heading" data-tone="accent" className="bg-accent text-on-accent">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[20rem_1fr] lg:gap-16 lg:px-8">
        {/* Tilted the opposite way from the hero portrait, on an ultramarine block. */}
        <div className="relative mx-auto w-56 sm:w-64 lg:w-full">
          <div aria-hidden="true" className="absolute inset-0 -translate-x-3 translate-y-3 -rotate-3 rounded-[2rem] bg-[var(--brand-ultramarine)]" />
          <div className="relative aspect-[4/5] rotate-2 overflow-hidden rounded-[2rem] border-4 border-[var(--brand-ink)] bg-[var(--brand-ink)]">
            <Image
              src={more.photo}
              alt={more.photoAlt}
              fill
              sizes="(min-width: 1024px) 20rem, 16rem"
              className="object-cover object-[65%_45%]"
            />
          </div>
        </div>

        <div>
          <h2 id="more-heading" className="text-lg font-bold">
            {more.heading}
          </h2>
          <p className="mt-3 max-w-[28ch] font-display text-4xl leading-[1.05] font-extrabold tracking-tight [font-stretch:85%] sm:text-5xl">
            {more.lead}
          </p>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {more.items.map((item) => (
              <li key={item.title} className="border-t-2 border-[var(--brand-ink)] pt-4">
                <h3 className="text-2xl font-extrabold tracking-tight">{item.title}</h3>
                <p className="mt-2 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
