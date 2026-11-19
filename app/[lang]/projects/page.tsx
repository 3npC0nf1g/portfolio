import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { alternates, getSite, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getSite(lang);
  return {
    title: t.pages.projects.title,
    description: t.pages.projects.description,
    alternates: alternates(lang, "/projects"),
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { projects } = getSite(lang);
  return (
    <>
      <PageHeader title={projects.heading} lead={projects.intro} />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-6 md:grid-cols-2">
          {projects.items.map((project, i) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={i} lang={lang} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
