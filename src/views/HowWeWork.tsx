import type { Metadata } from "next";
import { Img } from "@/components/Img";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { PageIntro } from "@/components/PageIntro";
import { getContent } from "@/lib/content";
import { alternates, localize, pick, type Lang } from "@/lib/i18n";
import { btn, container, link } from "@/lib/ui";

export const howWeWorkMeta = (lang: Lang): Metadata => {
  const t = pick(lang);
  return {
    title: t("Jak pracujeme: od zadání po předání haly", "Ako pracujeme: od zadania po odovzdanie haly"),
    description: t(
      "Postup spolupráce při stavbě montované haly: zadání, návrh a nabídka, dokumentace a montáž, předání a další péče.",
      "Postup spolupráce pri stavbe montovanej haly: zadanie, návrh a ponuka, dokumentácia a montáž, odovzdanie a ďalšia starostlivosť.",
    ),
    alternates: alternates(lang, "/jak-pracujeme"),
  };
};

export function HowWeWork({ lang }: { lang: Lang }) {
  const t = pick(lang);
  const l = (href: string) => localize(lang, href);
  const { faq, steps } = getContent(lang);

  // Shrnuto z textů MontHaly: co pomůže k první nabídce.
  const needs = t(
    [
      { k: "Účel haly", v: "Co v ní bude a jak se bude prostor používat. Podle toho volíme konstrukci a opláštění." },
      { k: "Přibližná velikost", v: "Orientační rozměry, nebo jen co se má dovnitř vejít. S přesnými rozměry pomůžeme." },
      { k: "Obec, kde má hala stát", v: "Místo ovlivňuje zatížení sněhem a větrem, kotvení i dopravu." },
      { k: "Fotky nebo nákres pozemku", v: "Pomohou s přístupem techniky, podkladem a umístěním vjezdů." },
    ],
    [
      { k: "Účel haly", v: "Čo v nej bude a ako sa bude priestor používať. Podľa toho volíme konštrukciu a opláštenie." },
      { k: "Približná veľkosť", v: "Orientačné rozmery, alebo len čo sa má dovnútra zmestiť. S presnými rozmermi pomôžeme." },
      { k: "Obec, kde má hala stáť", v: "Miesto ovplyvňuje zaťaženie snehom a vetrom, kotvenie aj dopravu." },
      { k: "Fotky alebo nákres pozemku", v: "Pomôžu s prístupom techniky, podkladom a umiestnením vjazdov." },
    ],
  );

  return (
    <>
      <PageIntro
        lang={lang}
        crumbs={[{ label: t("Jak pracujeme", "Ako pracujeme") }]}
        title={
          <>
            {t("Dobrý výsledek", "Dobrý výsledok")}
            <br />
            {t("má jasný postup.", "má jasný postup.")}
          </>
        }
        lead={t(
          "Od první představy k hotové hale. V každé fázi společně vyjasníme rozhodnutí, která ovlivní její využití, cenu i přípravu.",
          "Od prvej predstavy k hotovej hale. V každej fáze spoločne vyjasníme rozhodnutia, ktoré ovplyvnia jej využitie, cenu aj prípravu.",
        )}
      />

      <section className="py-20 md:py-28">
        <div className={`${container} grid gap-14 lg:grid-cols-12`}>
          <ol className="relative lg:col-span-7">
            <span aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-line" />
            {steps.map((s) => (
              <li key={s.title} className="relative pb-16 last:pb-0">
                <div className="relative pl-14">
                  <span aria-hidden className="absolute left-0 top-2 flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 border-azure bg-white">
                    <span className="h-[7px] w-[7px] rounded-full bg-azure" />
                  </span>
                  <h2 className="font-display text-[33px] leading-[1.12] text-ink sm:text-[42px]">{s.title}</h2>
                  <p className="mt-4 text-[17px] leading-relaxed text-dim">{s.text}</p>
                  <p className="mt-5 border-l-[3px] border-azure pl-4 text-[15px] font-semibold text-ink">{s.note}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-clip rounded-md bg-mist">
                <Img
                  src="/foto/veselicko-1.webp"
                  alt={t("Montážníci při stavbě ocelové konstrukce haly ve Veselíčku", "Montážnici pri stavbe oceľovej konštrukcie haly vo Veselíčku")}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-8 font-display text-[31px] leading-[1.12] text-ink sm:text-[36px]">
                {t("Společně vybereme, co má smysl.", "Spoločne vyberieme, čo má zmysel.")}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-dim">
                {t(
                  "Při výběru nemusíte znát všechny technické možnosti. Obchodní oddělení a projektanti vám pomohou propojit zamýšlený provoz s konkrétním řešením haly.",
                  "Pri výbere nemusíte poznať všetky technické možnosti. Obchodné oddelenie a projektanti vám pomôžu prepojiť plánovanú prevádzku s konkrétnym riešením haly.",
                )}
              </p>
              <Link href={l("/kontakt")} className={`${link} mt-5 inline-block`}>
                {t("Poznejte své kontakty", "Spoznajte svoje kontakty")}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-night text-white">
        <div className={`${container} grid gap-12 py-20 md:py-24 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[38px] leading-[0.94] sm:text-[47px]">{t("Co od vás potřebujeme", "Čo od vás potrebujeme")}</h2>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-white/70">
              {t(
                "Pro první nabídku nemusíte mít projekt. Stačí pár údajů, zbytek doladíme společně.",
                "Na prvú ponuku nemusíte mať projekt. Stačí pár údajov, zvyšok doladíme spoločne.",
              )}
            </p>
            <Link href={l("/poptavka")} className={`${btn.primary} mt-8`}>
              {t("Nezávazná poptávka", "Nezáväzný dopyt")}
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
            <h2 className="font-display text-[42px] leading-[0.92] text-ink sm:text-[49px]">{t("Na co se často ptáte", "Na čo sa často pýtate")}</h2>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-dim">
              {t(
                "Cena, termíny i příprava pozemku mají souvislosti. Probereme je s vámi předem.",
                "Cena, termíny aj príprava pozemku majú súvislosti. Prejdeme ich s vami vopred.",
              )}
            </p>
          </div>
          <div className="lg:col-span-7">
            <Faq items={faq} />
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
