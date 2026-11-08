import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Img } from "@/components/Img";
import { PageIntro } from "@/components/PageIntro";
import { faq } from "@/lib/data";
import { btn, container, link } from "@/lib/ui";

// Bez konkrétních částek: klient ceny nezveřejňuje (konkurence, příliš mnoho proměnných).
// Stránka odpovídá na dotaz „montované haly cena“ tím, co cenu ovlivňuje, a vede k poptávce.
const factors = [
  {
    title: "Rozměry a výška",
    text: "Plocha je základ, cenu ale stejně silně mění výška a rozpětí bez podpěr. Široká hala bez sloupů uprostřed potřebuje mohutnější konstrukci než dvě menší vedle sebe.",
  },
  {
    title: "Místo stavby: sníh a vítr",
    text: "Konstrukci počítáme na zatížení sněhem a větrem v obci, kde má hala stát. Hala na horách nebo na otevřené pláni je jiná stavba než stejná hala v nížině uvnitř areálu.",
  },
  {
    title: "Účel a provoz",
    text: "Sklad, výroba, jízdárna nebo hangár mají jiné nároky na světlou výšku, šířku vjezdů a pohyb techniky uvnitř. Návrh vychází z toho, jak se bude hala skutečně používat.",
  },
  {
    title: "Opláštění",
    text: "Plachtové, plechové, zateplené nebo kombinované. Liší se cenou, životností i tím, jak drží teplo. Pro sezónní sklad stačí něco jiného než pro dílnu, kde se pracuje celý rok.",
  },
  {
    title: "Vrata, dveře a vybavení",
    text: "Počet a velikost vrat, personální dveře, prosvětlení, větrání, vytápění. Každá položka se do nabídky přidává zvlášť, takže platíte jen za to, co opravdu potřebujete.",
  },
  {
    title: "Podklad a kotvení",
    text: "Záleží na tom, jestli je na pozemku hotová zpevněná plocha, nebo se podklad teprve připravuje. Podle podloží a zatížení se volí i způsob kotvení.",
  },
  {
    title: "Dokumentace a povolení",
    text: "Rozsah projektové dokumentace závisí na záměru a na tom, co bude vyžadovat stavební úřad. Potřebné podklady si potvrdíme na začátku, aby nepřekvapily později.",
  },
  {
    title: "Doprava, montáž a termín",
    text: "Vzdálenost, přístup techniky na pozemek a požadovaný termín. Když se dá montáž naplánovat s rezervou, je příprava jednodušší.",
  },
];

const needs = [
  { k: "K čemu má hala sloužit", v: "Co v ní bude a jak se bude prostor používat." },
  { k: "Přibližná velikost", v: "Orientační rozměry, nebo jen co se má dovnitř vejít." },
  { k: "Obec, kde má hala stát", v: "Kvůli zatížení sněhem a větrem, kotvení a dopravě." },
  { k: "Fotky nebo nákres pozemku", v: "Pomohou s podkladem, přístupem techniky a umístěním vjezdů." },
];

export const metadata: Metadata = {
  title: "Kolik stojí montovaná hala a co ovlivňuje cenu",
  description:
    "Co rozhoduje o ceně montované haly: rozměry, zatížení sněhem a větrem, opláštění, vybavení, podklad i dokumentace. Přesnou kalkulaci pošleme do několika dnů.",
  alternates: { canonical: "/cena-montovane-haly" },
};

export default function CenaPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Co ovlivňuje cenu haly" }]}
        title="Kolik stojí montovaná hala?"
        lead="Dvě haly se stejnou plochou se mohou cenou výrazně lišit. Proto ceník neuvádíme. Tady je, co o ceně rozhoduje, a přesnou kalkulaci vám pošleme do několika dnů podle složitosti haly."
      />

      <section className="py-20 md:py-28">
        <div className={`${container} grid gap-14 lg:grid-cols-12`}>
          <ul className="lg:col-span-7">
            {factors.map((f) => (
              <li key={f.title} className="border-t border-line py-8 first:border-t-0 first:pt-0">
                <h2 className="font-display text-[29px] leading-[1.12] text-ink sm:text-[33px]">{f.title}</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-dim">{f.text}</p>
              </li>
            ))}
          </ul>
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-clip rounded-md bg-mist">
                <Img
                  src="/foto/vyrobni-haly.webp"
                  alt="Zateplená výrobní hala z tmavých sendvičových panelů"
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-8 font-display text-[31px] leading-[1.12] text-ink sm:text-[36px]">Proč ceník nemáme</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-dim">
                Orientační cena za metr čtvereční by vám řekla málo. Rozdíl mezi plachtovým skladem v nížině a zateplenou dílnou na horách je
                větší než rozdíl v ploše. Raději vám spočítáme konkrétní halu.
              </p>
              <Link href="/realizace" className={`${link} mt-5 inline-block`}>
                Prohlédněte si skutečné realizace
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-night text-white">
        <div className={`${container} grid gap-12 py-20 md:py-24 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[38px] leading-[0.94] sm:text-[47px]">Co pošlete, to spočítáme</h2>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-white/70">
              Pro kalkulaci nepotřebujete projekt. Stačí pár údajů, zbytek doladíme společně.
            </p>
            <Link href="/poptavka" className={`${btn.primary} mt-8`}>
              Nezávazná poptávka
            </Link>
          </div>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {needs.map((n) => (
              <div key={n.k} className="border-t border-line-dark pt-5">
                <dt className="text-[18px] font-bold">{n.k}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-white/65">{n.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[42px] leading-[0.92] text-ink sm:text-[49px]">Časté otázky k ceně</h2>
          </div>
          <div className="lg:col-span-7">
            <Faq items={[0, 3, 4, 5, 6].map((i) => faq[i])} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
