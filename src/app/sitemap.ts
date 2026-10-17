import type { MetadataRoute } from "next";
import { halls, realizations } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/haly", "/realizace", "/jak-pracujeme", "/kontakt", "/poptavka"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, priority: p === "" ? 1 : 0.8 })),
    ...halls.map((h) => ({ url: `${siteUrl}/haly/${h.slug}`, priority: 0.9 })),
    ...realizations.map((r) => ({ url: `${siteUrl}/realizace/${r.slug}`, priority: 0.6 })),
  ];
}
