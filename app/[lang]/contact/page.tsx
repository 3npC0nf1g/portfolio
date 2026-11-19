import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmailButton } from "@/components/EmailButton";
import { PageHeader } from "@/components/PageHeader";
import { ButtonAnchor } from "@/components/ui/Button";
import { Todo } from "@/components/ui/Todo";
import { alternates, getSite, hasLocale } from "@/lib/i18n";
import { encodedEmail } from "@/lib/email";
import { pastel } from "@/lib/pastels";
import { resume } from "@/lib/resume";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getSite(lang);
  return {
    title: t.pages.contact.title,
    description: t.pages.contact.description,
    alternates: alternates(lang, "/contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { contact, person, ui } = getSite(lang);
  const linkStyle =
    "mt-2 inline-flex min-h-11 items-center font-display text-2xl font-extrabold underline decoration-2 underline-offset-[6px] hover:decoration-4";

  return (
    <>
      <PageHeader title={contact.heading} lead={contact.body} />
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <section aria-labelledby="email-heading" data-tone="primary" className="rounded-[2rem] bg-primary p-7 text-on-primary sm:col-span-2">
          <h2 id="email-heading" className="text-sm font-semibold text-on-primary-muted">
            {contact.email.label}
          </h2>
          <p className="mt-1 max-w-[30ch] font-display text-lg font-bold">{ui.contact.emailBlurb}</p>
          <div className="mt-4">
            {encodedEmail ? (
              <EmailButton
                encoded={encodedEmail}
                label={contact.email.buttonLabel}
                labels={{ ...contact.email.options, menu: ui.contact.emailMenu }}
                className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-sun px-6 font-display font-bold text-ink hover:bg-white"
              />
            ) : (
              <Todo>[TODO] Add your email in content/site.ts</Todo>
            )}
          </div>
        </section>

        {contact.links.map((link, i) => (
          <section key={link.label} aria-labelledby={`contact-${i}`} data-tone="pastel" className={`rounded-[2rem] p-7 text-ink ${pastel(i + 1)}`}>
            <h2 id={`contact-${i}`} className="text-sm font-semibold">
              {link.label}
            </h2>
            {link.href ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                {link.display}
                <span className="sr-only"> {ui.newTab}</span>
              </a>
            ) : (
              <p className="mt-2">
                <Todo>{link.display}</Todo>
              </p>
            )}
          </section>
        ))}

        <section aria-labelledby="resume-heading" data-tone="pastel" className="rounded-[2rem] bg-sky p-7 text-ink sm:col-span-2 lg:col-span-2">
          <h2 id="resume-heading" className="text-sm font-semibold">
            {ui.contact.resumeTitle}
          </h2>
          <p className="mt-1 font-display text-lg font-bold">{ui.contact.resumeBlurb}</p>
          <div className="mt-4">
            {resume ? (
              <ButtonAnchor href={resume.href} download={resume.downloadName} variant="primary">
                {resume.label}
              </ButtonAnchor>
            ) : (
              <Todo>[TODO] Resume PDF: add public/steve-teuma-resume.pdf</Todo>
            )}
          </div>
        </section>

        <section aria-labelledby="location-heading" data-tone="pastel" className="rounded-[2rem] bg-lilac p-7 text-ink sm:col-span-2 lg:col-span-2">
          <h2 id="location-heading" className="text-sm font-semibold">
            {ui.contact.basedIn}
          </h2>
          <p className="mt-2 font-display text-2xl font-extrabold">{person.location}</p>
          <p className="mt-1">{ui.contact.languages}</p>
        </section>
      </div>
    </>
  );
}
