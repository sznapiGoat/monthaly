import type { Metadata, Viewport } from "next";
import { Manrope, Red_Hat_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { company } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Nadpisy: geometrický řez ladí s logem MontHaly. latin-ext kvůli českým znakům.
const display = Red_Hat_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Montované haly na míru | MontHaly",
    template: "%s | MontHaly",
  },
  description:
    "Montované haly pro sklady, výrobu, sport i zemědělství. Prodej i pronájem, návrh na míru, dokumentace a montáž. Prohlédněte si skutečné realizace.",
  applicationName: "MontHaly",
  appleWebApp: { title: "MontHaly" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "MontHaly",
    images: [{ url: "/foto/litvinov.webp", width: 1600, height: 1200 }],
  },
  // Ukázková verze se nesmí dostat do vyhledávačů vedle ostrého webu.
  robots: process.env.SITE_LIVE === "1" ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0e326b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  url: siteUrl,
  telephone: company.phoneIntl,
  email: company.email,
  image: `${siteUrl}/foto/litvinov.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: "623 00",
    addressLocality: "Brno",
    addressCountry: "CZ",
  },
  vatID: company.dic,
  areaServed: ["CZ", "SK"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={`${display.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
        >
          Přejít k obsahu
        </a>
        <Header />
        <main id="obsah">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
