import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { HallsGrid } from "@/components/FilterGrid";
import { PageIntro } from "@/components/PageIntro";
import { faq } from "@/lib/data";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Montované haly: sklady, výroba, sport, zemědělství",
  description:
    "Osm typů montovaných hal od skladových a výrobních po jízdárny, hangáry, párty stany a membránová zastřešení. Návrh na míru podle využití a místa stavby.",
  alternates: { canonical: "/haly" },
};

export default function HalyPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Naše haly" }]}
        title="Jaký prostor potřebujete?"
        lead="Vyberte podle využití. Konkrétní konstrukci, opláštění a vybavení přizpůsobíme vašemu záměru a místu stavby."
      />

      <section className="py-14 md:py-20">
        <div className={container}>
          <HallsGrid />
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[38px] leading-[1.02] text-ink sm:text-[44px]">
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
