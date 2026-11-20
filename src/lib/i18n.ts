import { siteUrl } from "./site";

export type Lang = "cs" | "sk";

/** Text v jazyce stránky: `t("česky", "slovensky")`. Obě verze leží vedle sebe, ať se snadno kontrolují a upravují. */
export const pick =
  (lang: Lang) =>
  <T,>(cs: T, sk: T): T =>
    lang === "sk" ? sk : cs;

// Slovenská verze běží pod /sk se slovenskými adresami. Kde je slovo v obou jazycích stejné, zůstává (haly, kontakt).
const skSegments: Record<string, string> = {
  realizace: "realizacie",
  "jak-pracujeme": "ako-pracujeme",
  poptavka: "dopyt",
  "ochrana-osobnich-udaju": "ochrana-osobnych-udajov",
  "mimosoudni-reseni-spotrebitelskych-sporu": "alternativne-riesenie-sporov",
};

// Až pojede slovenská verze na vlastní doméně, nastaví se NEXT_PUBLIC_SK_URL (např. https://www.mont-haly.sk)
// a adresy budou bez /sk. Do té doby je slovenská verze na stejné doméně pod /sk.
const skUrl = process.env.NEXT_PUBLIC_SK_URL;
const skBase = skUrl ? "" : "/sk";

/** Česká adresa (`/realizace/x?typ=y#z`) převedená do jazyka stránky. */
export function localize(lang: Lang, href: string): string {
  if (lang === "cs" || !href.startsWith("/")) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? "" : href.slice(cut);
  const [, first = "", ...more] = path.split("/");
  const mapped = [skSegments[first] ?? first, ...more].filter(Boolean).join("/");
  return `${skBase}${mapped ? `/${mapped}` : skBase ? "" : "/"}${rest}`;
}

/** Plná adresa stránky v daném jazyce, pro canonical, hreflang, sitemapu a strukturovaná data. */
export function absolute(lang: Lang, href: string): string {
  const local = localize(lang, href);
  const origin = lang === "sk" && skUrl ? skUrl : siteUrl;
  return `${origin}${local === "/" ? "" : local}`;
}

/** Odkaz na tutéž stránku v druhém jazyce. Na jiné doméně musí být plný. */
export function switchHref(to: Lang, csHref: string): string {
  return to === "sk" && skUrl ? absolute("sk", csHref) : to === "cs" && skUrl ? absolute("cs", csHref) : localize(to, csHref);
}

/** Canonical a hreflang pro stránku zadanou českou adresou. */
export const alternates = (lang: Lang, csHref: string) => ({
  canonical: absolute(lang, csHref),
  languages: { "cs-CZ": absolute("cs", csHref), "sk-SK": absolute("sk", csHref), "x-default": absolute("cs", csHref) },
});

/** Opak `localize`: z adresy v prohlížeči zjistí českou adresu stránky (pro přepínač jazyka). */
export function toCs(lang: Lang, pathname: string): string {
  if (lang === "cs") return pathname;
  const path = skBase && (pathname === skBase || pathname.startsWith(`${skBase}/`)) ? pathname.slice(skBase.length) : pathname;
  const [, first = "", ...more] = path.split("/");
  const back = Object.entries(skSegments).find(([, sk]) => sk === first)?.[0] ?? first;
  return `/${[back, ...more].filter(Boolean).join("/")}`;
}

export const locales = { cs: "cs-CZ", sk: "sk-SK" } as const;
