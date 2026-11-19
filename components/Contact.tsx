import { EmailButton } from "@/components/EmailButton";
import { ButtonAnchor } from "@/components/ui/Button";
import { Todo } from "@/components/ui/Todo";
import { site } from "@/content/site";
import { encodedEmail } from "@/lib/email";
import { resume } from "@/lib/resume";

export function Contact() {
  const { contact } = site;
  return (
    <section id="contact" aria-labelledby="contact-heading" data-tone="block" className="bg-block text-on-block">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <h2
            id="contact-heading"
            className="text-[clamp(3.5rem,11vw,7rem)] leading-[0.9] font-extrabold tracking-[-0.04em] [font-stretch:85%]"
          >
            {contact.heading}
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-on-block-muted">{contact.body}</p>
          <div className="mt-8">
            {resume ? (
              <ButtonAnchor href={resume.href} download={resume.downloadName} variant="accent">
                {resume.label}
              </ButtonAnchor>
            ) : (
              <Todo>[TODO] Resume PDF: add public/steve-teuma-resume.pdf</Todo>
            )}
          </div>
        </div>

        <ul className="divide-y divide-block-line self-end border-y border-block-line">
          <li className="py-5">
            <p className="text-sm font-medium text-on-block-muted">{contact.email.label}</p>
            {encodedEmail ? (
              <EmailButton
                encoded={encodedEmail}
                label={contact.email.buttonLabel}
                labels={contact.email.options}
                className="mt-1 inline-flex min-h-11 cursor-pointer items-center font-display text-xl font-bold underline decoration-accent decoration-2 underline-offset-[6px] hover:decoration-4 sm:text-2xl"
              />
            ) : (
              <p className="mt-2">
                <Todo>[TODO] Add your email in content/site.ts</Todo>
              </p>
            )}
          </li>
          {contact.links.map((link) => {
            const external = link.href?.startsWith("http");
            return (
              <li key={link.label} className="py-5">
                <p className="text-sm font-medium text-on-block-muted">{link.label}</p>
                {link.href ? (
                  <a
                    href={link.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-1 inline-flex min-h-11 items-center font-display text-xl font-bold break-all underline decoration-accent decoration-2 underline-offset-[6px] hover:decoration-4 sm:text-2xl"
                  >
                    {link.display}
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ) : (
                  <p className="mt-2">
                    <Todo>{link.display}</Todo>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
