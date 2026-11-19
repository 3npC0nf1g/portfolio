import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:px-6 lg:px-8">
        <p>
          &copy; {site.copyrightYear} {site.person.name}, {site.person.location}
        </p>
      </div>
    </footer>
  );
}
