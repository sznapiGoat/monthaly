import Link from "next/link";
import { absolute, localize, pick, type Lang } from "@/lib/i18n";

// Adresy se zadávají česky, převod do jazyka stránky dělá komponenta.
type Crumb = { href?: string; label: string };

export function Breadcrumbs({ lang, items, tone = "light" }: { lang: Lang; items: Crumb[]; tone?: "light" | "dark" }) {
  const t = pick(lang);
  const all: Crumb[] = [{ href: "/", label: t("Úvod", "Úvod") }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absolute(lang, c.href) } : {}),
    })),
  };
  const muted = tone === "dark" ? "text-white/55" : "text-dim";
  const strong = tone === "dark" ? "text-white" : "text-ink";

  return (
    <nav aria-label={t("Drobečková navigace", "Omrvinková navigácia")} className="text-[13px]">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${muted}`}>
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href && i < all.length - 1 ? (
              <Link href={localize(lang, c.href)} className={`transition-colors ${tone === "dark" ? "hover:text-white" : "hover:text-ink"}`}>
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={strong}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
