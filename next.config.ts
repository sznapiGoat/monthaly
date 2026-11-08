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
  ["/montovane-haly-2/membranova-zastreseni", "/haly/membranova-zastreseni"],
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

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  // AVIF je o pětinu až třetinu menší než WebP; prohlížeče bez podpory dostanou WebP.
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return legacy.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
