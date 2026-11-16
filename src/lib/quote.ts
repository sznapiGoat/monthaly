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

export const emptyQuote: QuoteInput = {
  typ: "nevim",
  zamer: "Pořízení haly",
  sirka: "",
  delka: "",
  vyska: "",
  misto: "",
  oplasteni: "Potřebuji poradit",
  vybaveni: [],
  termin: "Zatím bez konkrétního termínu",
  jmeno: "",
  firma: "",
  email: "",
  telefon: "",
  zprava: "",
  realizace: "",
  web: "",
};

// Technické provedení podle zadání (11/2026): nezateplené a zateplené haly. Stejné dělení je na /haly.
export const claddingGroups = [
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
];

// Do e-mailu jde hodnota i se skupinou, třeba „Zateplené: Sendvičové panely“ (sestavuje QuoteForm).
export const claddingAdvice = "Potřebuji poradit";
export const equipmentOptions = ["Vrata", "Personální dveře", "Okna a prosvětlení", "Osvětlení", "Větrání", "Vytápění", "Podlaha"];
export const timeOptions = [
  "Zatím bez konkrétního termínu",
  "Co nejdříve",
  "V následujících 3 měsících",
  "V následujících 6 měsících",
  "Později, nyní plánuji",
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(q: Pick<QuoteInput, "jmeno" | "email" | "telefon">) {
  const errors: Partial<Record<"jmeno" | "kontakt" | "email", string>> = {};
  if (q.jmeno.trim().length < 2) errors.jmeno = "Vyplňte prosím jméno a příjmení.";
  if (!q.email.trim() && !q.telefon.trim()) errors.kontakt = "Vyplňte e-mail nebo telefon, ať se vám můžeme ozvat.";
  if (q.email.trim() && !EMAIL.test(q.email.trim())) errors.email = "E-mail nemá správný tvar.";
  return errors;
}

export const area = (sirka: string, delka: string) => {
  const s = Number(sirka.replace(",", "."));
  const d = Number(delka.replace(",", "."));
  return s > 0 && d > 0 ? Math.round(s * d * 10) / 10 : null;
};
