import type { ReactNode } from "react";

/** Title block at the top of inner pages (About, Projects, Contact). */
export function PageHeader({ title, lead, children }: { title: string; lead?: string; children?: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16 lg:px-8">
      <h1 className="text-[clamp(2.75rem,8vw,5rem)] leading-[0.95] font-extrabold tracking-tight">{title}</h1>
      {lead && <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted sm:text-xl">{lead}</p>}
      {children}
    </div>
  );
}
