import type { MetadataRoute } from "next";
import { halls, realizations } from "@/lib/data";
import { absolute } from "@/lib/i18n";

// Každá stránka v obou jazycích, s odkazem na jazykovou verzi (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1],
    ["/haly", 0.8],
    ["/realizace", 0.8],
    ["/jak-pracujeme", 0.8],
    ["/kontakt", 0.8],
    ["/poptavka", 0.8],
    ...halls.map((h): [string, number] => [`/haly/${h.slug}`, 0.9]),
    ...realizations.map((r): [string, number] => [`/realizace/${r.slug}`, 0.6]),
  ];
  return pages.flatMap(([href, priority]) => {
    const languages = { "cs-CZ": absolute("cs", href), "sk-SK": absolute("sk", href) };
    return [
      { url: absolute("cs", href), priority, alternates: { languages } },
      // Slovenská verze je doplněk, vyhledávačům dáváme najevo nižší prioritu.
      { url: absolute("sk", href), priority: Math.round(priority * 0.7 * 10) / 10, alternates: { languages } },
    ];
  });
}
