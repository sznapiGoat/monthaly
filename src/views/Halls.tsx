import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { HallCard } from "@/components/Cards";
import { PageIntro } from "@/components/PageIntro";
import { getContent } from "@/lib/content";
import type { HallGroup } from "@/lib/data";
import { alternates, pick, type Lang } from "@/lib/i18n";
import { quoteOptions } from "@/lib/quote";
import { container } from "@/lib/ui";

export const hallsMeta = (lang: Lang): Metadata => {
  const t = pick(lang);
  return {
    title: t("Montované haly: sklady, výroba, sport, zemědělství", "Montované haly: sklady, výroba, šport, poľnohospodárstvo"),
    description: t(
      "Montované haly podle účelu: skladování a výroba, sport a jezdectví, zemědělství, hangáry a stany. Jakýkoli rozměr na míru podle využití a místa stavby.",
      "Montované haly podľa účelu: skladovanie a výroba, šport a jazdectvo, poľnohospodárstvo, hangáre a stany. Akýkoľvek rozmer na mieru podľa využitia a miesta stavby.",
    ),
    alternates: alternates(lang, "/haly"),
  };
};

// Sloupce podle počtu hal ve skupině, ať v řadě nezůstává prázdné místo.
const cols: Record<number, string> = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" };

export function Halls({ lang }: { lang: Lang }) {
  const t = pick(lang);
  const { faq, hallGroups, halls } = getContent(lang);
  const { claddingGroups } = quoteOptions(lang);
  const byGroup = (id: HallGroup) => halls.filter((h) => h.group === id);

  return (
    <>
      <PageIntro
        lang={lang}
        crumbs={[{ label: t("Naše haly", "Naše haly") }]}
        title={t("Jaký prostor potřebujete?", "Aký priestor potrebujete?")}
        lead={t(
          "Vyberte podle využití. Konkrétní konstrukci, opláštění a vybavení přizpůsobíme vašemu záměru a místu stavby.",
          "Vyberte podľa využitia. Konkrétnu konštrukciu, opláštenie a vybavenie prispôsobíme vášmu zámeru a miestu stavby.",
        )}
      />

      <section className="py-14 md:py-20">
        <div className={`${container} grid gap-16 md:gap-20`}>
          {hallGroups.map((g) => (
            <section key={g.id} aria-labelledby={`skupina-${g.id}`}>
              <div className="flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h2 id={`skupina-${g.id}`} className="font-display text-[31px] leading-[1.12] text-ink sm:text-[38px]">
                  {g.label}
                </h2>
                <p className="text-[15px] text-dim">{g.text}</p>
              </div>
              <ul className={`mt-8 grid gap-x-6 gap-y-12 ${cols[Math.min(byGroup(g.id).length, 3)]}`}>
                {byGroup(g.id).map((h, _, list) => (
                  <li key={h.slug}>
                    <HallCard
                      lang={lang}
                      hall={h}
                      wide={list.length === 1}
                      sizes={
                        list.length === 1
                          ? "(min-width: 1280px) 1180px, 100vw"
                          : list.length === 2
                            ? "(min-width: 1280px) 580px, (min-width: 640px) 50vw, 100vw"
                            : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      }
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      {/* Technické provedení podle zadání: nezateplené / zateplené. */}
      <section aria-labelledby="provedeni" className="bg-mist py-20 md:py-24">
        <div className={container}>
          <h2 id="provedeni" className="font-display text-[40px] leading-[0.95] text-ink sm:text-[51px]">
            {t("Zateplená, nebo bez zateplení?", "Zateplená, alebo bez zateplenia?")}
          </h2>
          <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-dim">
            {t(
              "Každý typ haly dodáme v provedení, které odpovídá provozu. Který se hodí právě vám, doporučíme při návrhu.",
              "Každý typ haly dodáme v prevedení, ktoré zodpovedá prevádzke. Ktoré sa hodí práve vám, odporučíme pri návrhu.",
            )}
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
            {claddingGroups.map((g) => (
              <div key={g.label} className="rounded-md border border-line bg-white p-7 sm:p-8">
                <h3 className="font-display text-[29px] leading-[1.12] text-ink sm:text-[33px]">
                  {g.label} haly
                </h3>
                <ul className="mt-5 border-t border-line">
                  {g.items.map((i) => (
                    <li key={i.name} className="border-b border-line py-4 last:border-b-0">
                      <span className="block text-[17px] font-semibold text-ink">{i.name}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-dim">{i.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[42px] leading-[0.92] text-ink sm:text-[49px]">
              {t("Ještě nevíte, která je ta pravá?", "Ešte neviete, ktorá je tá pravá?")}
            </h2>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-dim">
              {t(
                "Popište, co chcete zastřešit. Probereme vhodnou velikost, varianty opláštění a přípravu místa.",
                "Opíšte, čo chcete zastrešiť. Prejdeme vhodnú veľkosť, varianty opláštenia a prípravu miesta.",
              )}
            </p>
          </div>
          <div className="lg:col-span-7">
            <Faq items={faq.slice(2)} />
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
