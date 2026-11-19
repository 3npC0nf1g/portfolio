import type { Metadata, Viewport } from "next";
import { Figtree, Gabarito } from "next/font/google";
import { notFound } from "next/navigation";
import { AskSteve } from "@/components/AskSteve";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { askEnabled } from "@/lib/ask";
import { alternates, getSite, hasLocale, localize, locales } from "@/lib/i18n";
import { resume } from "@/lib/resume";
import "../globals.css";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getSite(lang);
  return {
    metadataBase: new URL(t.url),
    title: { default: t.meta.title, template: `%s | ${t.person.name}` },
    description: t.meta.description,
    authors: [{ name: t.person.name }],
    alternates: alternates(lang, "/"),
    openGraph: {
      type: "website",
      locale: t.locale,
      alternateLocale: lang === "en" ? "fr_CA" : "en_CA",
      url: localize(lang, "/"),
      siteName: t.person.name,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaff" },
    { media: "(prefers-color-scheme: dark)", color: "#14122a" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getSite(lang);
  const otherLang = lang === "en" ? "fr" : "en";

  return (
    <html lang={lang} className={`${gabarito.variable} ${figtree.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          data-tone="pastel"
          className="fixed top-3 left-3 z-50 inline-flex min-h-11 -translate-y-24 items-center rounded-full bg-sun px-5 font-semibold text-ink focus:translate-y-0"
        >
          {t.ui.skipToContent}
        </a>
        <SiteHeader
          name={t.person.name}
          lang={lang}
          otherLang={otherLang}
          home={localize(lang, "/")}
          nav={t.nav.map((item) => ({ label: item.label, href: localize(lang, item.href) }))}
          resume={resume}
          labels={{
            mainNav: t.ui.mainNav,
            menu: t.ui.menu,
            close: t.ui.close,
            resume: t.ui.resume,
            pdfDownload: t.ui.pdfDownload,
            switchTo: t.ui.language.switchTo,
            switchToName: t.ui.language.switchToName,
          }}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
        {/* Optional chat. Off unless ASK_ENABLED=true and ANTHROPIC_API_KEY are set at build time. */}
        {askEnabled() && <AskSteve name={t.person.name} />}
      </body>
    </html>
  );
}
