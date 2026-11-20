// Obsah webu v jazyce stránky. Česky rovnou z data.ts, slovensky stejná data s překlady z data-sk.ts.
import * as cs from "./data";
import { skContactRoles, skFaq, skHallGroups, skHalls, skRealizationCategories, skRealizations, skSteps } from "./data-sk";
import type { Lang } from "./i18n";

const withAlts = (photos: cs.Photo[], alts: string[]) => photos.map((ph, i) => ({ ...ph, alt: alts[i] ?? ph.alt }));

const skHallList: cs.Hall[] = cs.halls.map((h) => {
  const t = skHalls[h.slug];
  return t ? { ...h, ...t, photos: withAlts(h.photos, t.alts) } : h;
});

// Na slovenské verzi jdou slovenské realizace první (doporučení schválené klientem 11/2026).
const skRealizationList: cs.Realization[] = cs.realizations
  .map((r) => {
    const t = skRealizations[r.slug];
    return t ? { ...r, ...t, photos: withAlts(r.photos, t.alts) } : r;
  })
  .sort((a, b) => Number(b.country === "SK") - Number(a.country === "SK"));

const skContacts = cs.contacts.map((c) => ({ ...c, role: skContactRoles[c.role] ?? c.role }));

const content = {
  cs: {
    halls: cs.halls,
    hallGroups: cs.hallGroups,
    realizations: cs.realizations,
    realizationCategories: cs.realizationCategories,
    faq: cs.faq,
    steps: cs.steps,
    contacts: cs.contacts,
  },
  sk: {
    halls: skHallList,
    hallGroups: cs.hallGroups.map((g) => ({ ...g, ...skHallGroups[g.id] })),
    realizations: skRealizationList,
    realizationCategories: cs.realizationCategories.map((c) => ({ ...c, label: skRealizationCategories[c.id] })),
    faq: skFaq,
    steps: skSteps,
    contacts: skContacts,
  },
};

export function getContent(lang: Lang) {
  const c = content[lang];
  const getHall = (slug: string) => c.halls.find((h) => h.slug === slug);
  const getRealization = (slug: string) => c.realizations.find((x) => x.slug === slug);
  return {
    ...c,
    clients: cs.clients,
    company: cs.company,
    sales: c.contacts.find((x) => x.kind === "sales")!,
    rental: c.contacts.find((x) => x.kind === "rental")!,
    getHall,
    getRealization,
    /** Podobné realizace: nejdřív stejná kategorie, pak nejbližší plochou. */
    similarRealizations: (item: cs.Realization, count = 3) =>
      c.realizations
        .filter((r) => r.slug !== item.slug)
        .sort(
          (a, b) =>
            Number(b.category === item.category) - Number(a.category === item.category) || Math.abs(a.areaM2 - item.areaM2) - Math.abs(b.areaM2 - item.areaM2),
        )
        .slice(0, count),
  };
}

export type Content = ReturnType<typeof getContent>;
