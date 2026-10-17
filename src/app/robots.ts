import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Dokud běží ukázková verze, vyhledávače sem nepouštíme. Po spuštění na mont-haly.cz stačí nastavit SITE_LIVE=1.
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_LIVE !== "1") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
