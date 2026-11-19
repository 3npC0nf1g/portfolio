import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { AskSteve } from "@/components/AskSteve";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import { askEnabled } from "@/lib/ask";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.meta.title,
    template: `%s | ${site.person.name}`,
  },
  description: site.meta.description,
  authors: [{ name: site.person.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.person.name,
    title: site.meta.title,
    description: site.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2b36e8" },
    { media: "(prefers-color-scheme: dark)", color: "#2530c9" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          data-tone="accent"
          className="fixed top-3 left-3 z-50 inline-flex min-h-11 -translate-y-24 items-center rounded-full bg-accent px-5 font-semibold text-on-accent focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Optional chat. Off unless ASK_ENABLED=true and ANTHROPIC_API_KEY are set at build time. */}
        {askEnabled() && <AskSteve name={site.person.name} />}
      </body>
    </html>
  );
}
