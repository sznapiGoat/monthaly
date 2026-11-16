import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { HallCard } from "@/components/Cards";
import { PageIntro } from "@/components/PageIntro";
import { faq, hallGroups, halls, type HallGroup } from "@/lib/data";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Montované haly: sklady, výroba, sport, zemědělství",
  description:
    "Montované haly podle účelu: skladování a výroba, sport a jezdectví, zemědělství, hangáry a stany. Jakýkoli rozměr na míru podle využití a místa stavby.",
  alternates: { canonical: "/haly" },
};

const byGroup = (id: HallGroup) => halls.filter((h) => h.group === id);
// Sloupce podle počtu hal ve skupině, ať v řadě nezůstává prázdné místo.
const cols: Record<number, string> = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" };

export default function HalyPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Naše haly" }]}
        title="Jaký prostor potřebujete?"
        lead="Vyberte podle využití. Konkrétní konstrukci, opláštění a vybavení přizpůsobíme vašemu záměru a místu stavby."
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
                      hall={h}
                      wide={list.length === 1}
                      sizes={list.length === 1 ? "(min-width: 1280px) 1180px, 100vw" : list.length === 2 ? "(min-width: 1280px) 580px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[42px] leading-[0.92] text-ink sm:text-[49px]">
              Ještě nevíte, která je ta pravá?
            </h2>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-dim">
              Popište, co chcete zastřešit. Probereme vhodnou velikost, varianty opláštění a přípravu místa.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Faq items={faq.slice(2)} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
