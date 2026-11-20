import type { NextConfig } from "next";

// Adresy současného webu (WordPress) a kam vedou na novém. 301 zachová pozice ve vyhledávání.
const legacy: [string, string][] = [
  ["/montovane-haly-2", "/haly"],
  ["/montovane-haly-2/multifunkcni-sportovni-haly", "/haly/sportovni-haly"],
  ["/montovane-haly-2/skladove-haly", "/haly/skladove-haly"],
  ["/montovane-haly-2/vyrobni-haly", "/haly/vyrobni-haly"],
  ["/montovane-haly-2/jezdecke-haly", "/haly/jezdecke-haly"],
  ["/montovane-haly-2/letecke-hangary", "/haly/letecke-hangary"],
  ["/montovane-haly-2/zemedelske-haly", "/haly/zemedelske-haly"],
  ["/montovane-haly-2/party-stany", "/haly/party-stany"],
  // Membránová zastřešení klient v zadání (11/2026) zrušil, stará i nová adresa vedou na rozcestník.
  ["/montovane-haly-2/membranova-zastreseni", "/haly"],
  ["/haly/membranova-zastreseni", "/haly"],
  ["/realizace/skladova-hala-zakamenne", "/realizace/hala-zakamenne"],
  ["/realizace/skladova-montovana-hala-25x35x6-m-brno", "/realizace/sportovni-hala-brno"],
  ["/realizace/skladova-montovana-hala-lhotka-nad-becvou", "/realizace/skladova-hala-lhotka-nad-becvou"],
  ["/realizace/skladova-montovana-hala-steti", "/realizace/skladova-hala-steti"],
  ["/realizace/velkokapacitni-skladova-hala-mosnov", "/realizace/skladove-haly-mosnov"],
  ["/nova-stranka", "/"],
];

// Základní bezpečnostní hlavičky. Plná CSP pro skripty zatím ne: kolidovala by s inline skripty Next.js a s GTM.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

// Slovenská verze na vlastní doméně (mont-haly.sk). Zapíná se proměnnou NEXT_PUBLIC_SK_URL=https://www.mont-haly.sk,
// do té doby běží jen pod /sk na české doméně. Obě domény jsou v jednom projektu na Vercelu.
const skUrl = process.env.NEXT_PUBLIC_SK_URL?.replace(/\/$/, "");
const skHost = skUrl ? `(www\\.)?${new URL(skUrl).hostname.replace(/^www\./, "").replace(/\./g, "\\.")}` : null;

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  // Dva kořenové layouty (čeština a slovenština), neznámé adresy proto chytá app/global-not-found.tsx.
  experimental: { globalNotFound: true },
  poweredByHeader: false,
  // AVIF je o pětinu až třetinu menší než WebP; prohlížeče bez podpory dostanou WebP.
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 85] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      // Slovenské stránky mají jedinou adresu: mont-haly.cz/sk/realizacie → mont-haly.sk/realizacie.
      ...(skUrl
        ? [
            { source: "/sk", destination: skUrl, permanent: true },
            { source: "/sk/:path*", destination: `${skUrl}/:path*`, permanent: true },
          ]
        : []),
    ];
  },
  async rewrites() {
    if (!skHost) return [];
    // Na mont-haly.sk se stránky berou ze slovenské větve (/sk/...). Soubory s tečkou (fotky, logo, sitemap) a _next/api zůstávají společné.
    const has = [{ type: "host" as const, value: skHost }];
    return {
      beforeFiles: [
        { source: "/:path((?!_next/|api/)[^.]*)", has, destination: "/sk/:path" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
