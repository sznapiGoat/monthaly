import { pick, type Lang } from "./i18n";

export type QuoteInput = {
  typ: string;
  zamer: string;
  sirka: string;
  delka: string;
  vyska: string;
  misto: string;
  oplasteni: string;
  vybaveni: string[];
  termin: string;
  jmeno: string;
  firma: string;
  email: string;
  telefon: string;
  zprava: string;
  realizace: string;
  web: string; // past na roboty, člověk pole nevidí
};

// Volby formuláře v jazyce stránky. Do e-mailu jde vybraný text, takže slovenská poptávka přijde se slovenskými hodnotami.
export const quoteOptions = (lang: Lang) => {
  const t = pick(lang);
  return {
    purposes: t(["Pořízení haly", "Pronájem"], ["Kúpa haly", "Prenájom"]),
    // Technické provedení podle zadání (11/2026): nezateplené a zateplené haly. Stejné dělení je na /haly.
    claddingGroups: t(
      [
        {
          label: "Nezateplené",
          items: [
            { name: "Plachtové", text: "Opláštění z technické plachty. Lehká a rychle postavená varianta." },
            { name: "Plechové", text: "Opláštění z trapézového plechu. Pevné a odolné." },
          ],
        },
        {
          label: "Zateplené",
          items: [
            { name: "Sendvičové panely", text: "Pro vytápěné provozy, výrobu a zázemí." },
            { name: "Thermo plachty", text: "Plachtová hala se zateplením." },
            { name: "Nafukovací dvouplášťové", text: "Dvě vrstvy plachty a mezi nimi izolující vzduch." },
          ],
        },
      ],
      [
        {
          label: "Nezateplené",
          items: [
            { name: "Plachtové", text: "Opláštenie z technickej plachty. Ľahký a rýchlo postavený variant." },
            { name: "Plechové", text: "Opláštenie z trapézového plechu. Pevné a odolné." },
          ],
        },
        {
          label: "Zateplené",
          items: [
            { name: "Sendvičové panely", text: "Pre vykurované prevádzky, výrobu a zázemie." },
            { name: "Termo plachty", text: "Plachtová hala so zateplením." },
            { name: "Nafukovacie dvojplášťové", text: "Dve vrstvy plachty a medzi nimi izolujúci vzduch." },
          ],
        },
      ],
    ),
    // Do e-mailu jde hodnota i se skupinou, třeba „Zateplené: Sendvičové panely“ (sestavuje QuoteForm).
    claddingAdvice: t("Potřebuji poradit", "Potrebujem poradiť"),
    equipment: t(
      ["Vrata", "Personální dveře", "Okna a prosvětlení", "Osvětlení", "Větrání", "Vytápění", "Podlaha"],
      ["Brány", "Dvere pre personál", "Okná a presvetlenie", "Osvetlenie", "Vetranie", "Vykurovanie", "Podlaha"],
    ),
    times: t(
      ["Zatím bez konkrétního termínu", "Co nejdříve", "V následujících 3 měsících", "V následujících 6 měsících", "Později, nyní plánuji"],
      ["Zatiaľ bez konkrétneho termínu", "Čo najskôr", "V nasledujúcich 3 mesiacoch", "V nasledujúcich 6 mesiacoch", "Neskôr, teraz plánujem"],
    ),
  };
};

export const emptyQuote = (lang: Lang): QuoteInput => {
  const o = quoteOptions(lang);
  return {
    typ: "nevim",
    zamer: o.purposes[0],
    sirka: "",
    delka: "",
    vyska: "",
    misto: "",
    oplasteni: o.claddingAdvice,
    vybaveni: [],
    termin: o.times[0],
    jmeno: "",
    firma: "",
    email: "",
    telefon: "",
    zprava: "",
    realizace: "",
    web: "",
  };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(q: Pick<QuoteInput, "jmeno" | "email" | "telefon">, lang: Lang) {
  const t = pick(lang);
  const errors: Partial<Record<"jmeno" | "kontakt" | "email", string>> = {};
  if (q.jmeno.trim().length < 2) errors.jmeno = t("Vyplňte prosím jméno a příjmení.", "Vyplňte, prosím, meno a priezvisko.");
  if (!q.email.trim() && !q.telefon.trim()) errors.kontakt = t("Vyplňte e-mail nebo telefon, ať se vám můžeme ozvat.", "Vyplňte e-mail alebo telefón, aby sme sa vám mohli ozvať.");
  if (q.email.trim() && !EMAIL.test(q.email.trim())) errors.email = t("E-mail nemá správný tvar.", "E-mail nemá správny tvar.");
  return errors;
}

export const area = (sirka: string, delka: string) => {
  const s = Number(sirka.replace(",", "."));
  const d = Number(delka.replace(",", "."));
  return s > 0 && d > 0 ? Math.round(s * d * 10) / 10 : null;
};
