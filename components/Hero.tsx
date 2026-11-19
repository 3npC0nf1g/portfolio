import Image from "next/image";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Todo } from "@/components/ui/Todo";
import { site } from "@/content/site";
import { resume } from "@/lib/resume";

function Portrait() {
  const { hero } = site;
  return (
    // Tilted photo with a flat blush block behind it.
    <div className="relative mx-auto w-44 sm:w-56 lg:mx-0 lg:w-full lg:max-w-sm">
      <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-[2rem] bg-accent" />
      <div className="relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[2rem] border-4 border-on-block bg-block">
        {hero.photo ? (
          <Image
            src={hero.photo}
            alt={hero.photoAlt}
            fill
            priority
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 14rem, 11rem"
            className="object-cover object-[50%_30%]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
            <span aria-hidden="true" className="font-display text-6xl font-extrabold sm:text-8xl">
              ST
            </span>
            <span className="rounded border-2 border-dashed border-current px-2 py-0.5 text-xs font-medium">
              [TODO] Add your photo
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const { hero } = site;
  return (
    <section aria-labelledby="hero-heading" data-tone="block" className="bg-block text-on-block">
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-14 sm:px-6 sm:pt-12 sm:pb-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
          {/* Photo first on mobile (top of the page), on the right on desktop. */}
          <div className="lg:order-2">
            <Portrait />
          </div>

          <div className="lg:order-1">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-block-line px-4 py-1.5 text-sm font-medium">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
              {hero.status}
            </p>
            <h1
              id="hero-heading"
              className="mt-6 text-[clamp(3rem,9.5vw,6.75rem)] leading-[0.92] font-extrabold tracking-[-0.04em] [font-stretch:85%]"
            >
              {hero.greeting.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-4 font-display text-2xl font-semibold text-on-block-muted sm:text-3xl">{hero.role}</p>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-on-block-muted">{hero.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {resume ? (
                <ButtonAnchor href={resume.href} download={resume.downloadName} variant="accent">
                  {hero.resumeLabel}
                  <span className="sr-only"> (PDF)</span>
                </ButtonAnchor>
              ) : (
                <Todo className="self-start">[TODO] Add public/steve-teuma-resume.pdf for the resume button</Todo>
              )}
              <ButtonLink href={hero.primaryCta.href} variant="on-block">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="on-block">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>

        <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-block-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {hero.facts.map((fact) => (
            <div key={fact.term}>
              <dt className="text-sm text-on-block-muted">{fact.term}</dt>
              <dd className="mt-1 font-display text-lg leading-snug font-semibold">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
