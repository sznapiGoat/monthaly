import type { Metadata, Viewport } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { seasonScript } from "@/lib/season";
import { Header } from "@/components/Header";
import { company } from "@/lib/data";
import { absolute, alternates, pick, type Lang } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import "@/app/globals.css";

// Nadpisy: patkový řez podle konceptu klienta. Cormorant z konceptu má v češtině vadné háčky (ž, ě), EB Garamond je kreslí správně.
const display = EB_Garamond({
  // Jen řez 600, který nadpisy používají: písma se před vykreslením stahuje co nejméně.
  subsets: ["latin", "latin-ext"],
  weight: "600",
  variable: "--font-display-face",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
  // Text těla se vykreslí náhradním písmem s upravenými metrikami, stahování nesmí brzdit písmo nadpisu.
  preload: false,
});

export const rootMetadata = (lang: Lang): Metadata => {
  const t = pick(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("Montované haly na míru | MontHaly", "Montované haly na mieru | MontHaly"),
      template: "%s | MontHaly",
    },
    description: t(
      "Montované haly na míru pro sklady, výrobu, sport i zemědělství. Jakýkoli rozměr, návrh, dokumentace a montáž. Prohlédněte si skutečné realizace.",
      "Montované haly na mieru pre sklady, výrobu, šport aj poľnohospodárstvo. Akýkoľvek rozmer, návrh, dokumentácia a montáž. Pozrite si skutočné realizácie.",
    ),
    alternates: alternates(lang, "/"),
    applicationName: "MontHaly",
    appleWebApp: { title: "MontHaly" },
    openGraph: {
      type: "website",
      locale: t("cs_CZ", "sk_SK"),
      siteName: "MontHaly",
      images: [{ url: "/foto/hero/steti.webp", width: 1600, height: 1200 }],
    },
    // Ukázková verze se nesmí dostat do vyhledávačů vedle ostrého webu.
    robots: process.env.SITE_LIVE === "1" ? { index: true, follow: true } : { index: false, follow: false },
  };
};

export const viewport: Viewport = {
  themeColor: "#2b3254",
};

const jsonLd = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  url: absolute(lang, "/"),
  telephone: company.phoneIntl,
  email: company.email,
  image: `${siteUrl}/foto/hero/steti.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: "623 00",
    addressLocality: "Brno",
    addressCountry: "CZ",
  },
  vatID: company.dic,
  areaServed: ["CZ", "SK"],
});

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${display.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: seasonScript }} />
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
        >
          {pick(lang)("Přejít k obsahu", "Prejsť na obsah")}
        </a>
        <Header lang={lang} />
        <main id="obsah">{children}</main>
        <Footer lang={lang} />
        <MobileCta lang={lang} />
        <CookieConsent lang={lang} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }} />
      </body>
    </html>
  );
}
