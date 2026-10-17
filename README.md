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

## Sezónní efekt v hero

Fotky v hero jsou vždy skutečné realizace. Sezóna přidává jen jemnou animaci kreslenou kódem (`src/components/SeasonalEffect.tsx`, logika v `src/lib/season.ts`).

- Výchozí je teď zimní verze (`DEFAULT_SETTING` v `src/lib/season.ts`). Po zimě přepnout na `"auto"`, pak se sezóna řídí datem (prosinec až únor zima). Jaro, léto a podzim zatím efekt nemají, mají připravené místo.
- Pro screenshoty: `/?sezona=zima` nebo `/?sezona=normal`.
- Pro celý web: `NEXT_PUBLIC_SEZONA=zima|jaro|leto|podzim|normal`.

## Spuštění na ostré doméně

| Proměnná | K čemu |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | adresa webu, výchozí `https://www.mont-haly.cz` |
| `SITE_LIVE=1` | povolí indexaci. Bez ní má web `noindex` a robots.txt vše zakazuje |

Přesměrování ze starých adres WordPressu (`/montovane-haly-2/...`, staré slugy realizací) jsou v `next.config.ts`.
