# MontHaly: web montovaných hal

Koncept nového webu pro MontHaly s.r.o. (mont-haly.cz). Next.js 16, Tailwind 4, statické stránky a jedna API routa pro poptávku.

## Spuštění

```bash
npm install
npm run dev
```

## Obsah

Všechen obsah (typy hal, realizace, kontakty, FAQ, postup) je v `src/lib/data.ts`. Novou realizaci přidáte jedním záznamem v poli `realizations` a třemi fotkami ve `public/foto/` (webp, 1600 × 1200).

## Poptávkový formulář

Formulář posílá data na `/api/poptavka`. Bez nastavených proměnných běží v ukázkovém režimu a nic neodesílá.

| Proměnná | K čemu |
|---|---|
| `RESEND_API_KEY` | klíč k Resend pro odesílání e-mailů |
| `POPTAVKA_TO` | kam poptávky chodí, víc adres oddělte čárkou |
| `POPTAVKA_FROM` | odesílatel, např. `MontHaly web <web@mont-haly.cz>` (doména musí být ověřená v Resend) |

Po úspěšném odeslání se do `window.dataLayer` zapíše událost `generate_lead`, na kterou jde navázat konverze v Google Ads přes GTM.

## Cookies a měření

Lišta se souhlasem je v `src/components/CookieConsent.tsx`. Google Tag Manager se načte jen po kliknutí na „Přijmout vše“ a jen když je nastavené `NEXT_PUBLIC_GTM_ID` (např. `GTM-XXXXXXX`). Volbu jde změnit odkazem „Nastavení cookies“ v patičce.

## Sezónní efekt v hero

Fotky v hero jsou vždy skutečné realizace. Sezóna přidává jen jemnou animaci kreslenou kódem (`src/components/SeasonalEffect.tsx`, logika v `src/lib/season.ts`).

- Podle data: prosinec až únor zima (sníh), březen až květen jaro (okvětní lístky), červen až srpen léto (světelné odlesky), září až listopad podzim (listí).
- Pro náhled jiné sezóny: `/?sezona=zima|jaro|leto|podzim|normal`.
- Pro celý web: `NEXT_PUBLIC_SEZONA=zima|jaro|leto|podzim|normal` (`normal` efekt vypne).
- Při pauze animací a při omezení pohybu v systému efekt neběží.

## Slovenská verze

Česká verze je v `src/app/(cs)`, slovenská v `src/app/(sk)/sk` (dva kořenové layouty, `<html lang>` podle jazyka). Obsah stránek je ve sdílených komponentách v `src/views`, trasy jsou jen tenké obaly.

- Texty komponent: `t("česky", "slovensky")` přímo v kódu (`pick` z `src/lib/i18n.ts`), obě verze vedle sebe.
- Obsah (haly, realizace, FAQ, postup): české texty v `src/lib/data.ts`, slovenské překlady v `src/lib/data-sk.ts` podle slugu. Komponenty berou obsah přes `getContent(lang)`. Nová realizace bez slovenského překladu se na SK ukáže česky.
- Odkazy se píšou česky a převádí je `localize(lang, href)`: `/realizace` → `/sk/realizacie`, `/poptavka` → `/sk/dopyt`, `/jak-pracujeme` → `/sk/ako-pracujeme`.
- Canonical, hreflang a sitemapa obsahují obě verze. Slovenské poptávky mají v předmětu e-mailu `[SK]`.
- Doména mont-haly.sk (rozhodnuto 11/2026): obě domény v jednom projektu na Vercelu. Po nastavení `NEXT_PUBLIC_SK_URL=https://www.mont-haly.sk` a novém nasazení se na mont-haly.sk stránky berou ze slovenské větve bez `/sk` v adrese (rewrite v `next.config.ts`), `mont-haly.cz/sk/...` se trvale přesměruje na mont-haly.sk a odkazy, canonical i hreflang vedou na doménu. Bez proměnné běží slovenská verze pod `/sk` (náhled).
- DNS pro mont-haly.sk při spuštění: A/AAAA (případně CNAME pro www) na Vercel jako u .cz, zrušit webový alias .sk → .cz u Českého hostingu. Záznamy pošty se nemění.

## Spuštění na ostré doméně

| Proměnná | K čemu |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | adresa webu, výchozí `https://www.mont-haly.cz` |
| `SITE_LIVE=1` | povolí indexaci. Bez ní má web `noindex` a robots.txt vše zakazuje |

Přesměrování ze starých adres WordPressu (`/montovane-haly-2/...`, staré slugy realizací) jsou v `next.config.ts`.
