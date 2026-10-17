import Link from "next/link";
import { siteUrl } from "@/lib/site";

type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all: Crumb[] = [{ href: "/", label: "Úvod" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${siteUrl}${c.href}` } : {}),
    })),
  };
  const muted = tone === "dark" ? "text-white/55" : "text-dim";
  const strong = tone === "dark" ? "text-white" : "text-ink";

  return (
    <nav aria-label="Drobečková navigace" className="text-[13px]">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${muted}`}>
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className={`transition-colors ${tone === "dark" ? "hover:text-white" : "hover:text-ink"}`}>
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
