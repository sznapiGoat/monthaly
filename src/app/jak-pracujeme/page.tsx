import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { PageIntro } from "@/components/PageIntro";
import { steps } from "@/lib/data";
import { container, link } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Jak pracujeme: od zadání po předání haly",
  description:
    "Postup spolupráce při stavbě montované haly: zadání, návrh a nabídka, dokumentace a montáž, předání a další péče.",
  alternates: { canonical: "/jak-pracujeme" },
};

export default function JakPracujemePage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Jak pracujeme" }]}
        title={
          <>
            Dobrý výsledek
            <br />
            má jasný postup.
          </>
        }
        lead="Od první představy k hotové hale. V každé fázi společně vyjasníme rozhodnutí, která ovlivní její využití, cenu i přípravu."
      />

      <section className="py-20 md:py-28">
        <div className={container}>
          <ol className="relative mx-auto max-w-4xl">
            <span aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-line md:left-[calc(30%+11px)]" />
            {steps.map((s, i) => (
              <li key={s.title} className="reveal relative grid gap-4 pb-16 last:pb-0 md:grid-cols-[30%_1fr] md:gap-0">
                <p className="pl-12 text-[15px] font-semibold text-dim md:pl-0 md:pr-10 md:pt-2 md:text-right">Krok {i + 1}</p>
                <div className="relative pl-12">
                  <span aria-hidden className="absolute left-0 top-2 flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 border-azure bg-white">
                    <span className="h-[7px] w-[7px] rounded-full bg-azure" />
                  </span>
                  <h2 className="font-serif text-[36px] leading-tight text-ink sm:text-[44px]">{s.title}</h2>
                  <p className="mt-4 text-[17px] leading-relaxed text-dim">{s.text}</p>
                  <p className="mt-5 border-l-[3px] border-azure pl-4 text-[15px] font-semibold text-ink">{s.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-mist">
        <div className={`${container} grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md lg:col-span-6">
            <Image
              src="/foto/veselicko-1.webp"
              alt="Montážníci při stavbě ocelové konstrukce haly ve Veselíčku"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="reveal lg:col-span-5 lg:col-start-8">
            <h2 className="font-serif text-[40px] leading-[1.05] text-ink sm:text-[52px]">Společně vybereme, co má smysl.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-dim">
              Při výběru nemusíte znát všechny technické možnosti. Obchodní oddělení a projektanti vám pomohou propojit zamýšlený provoz s
              konkrétním řešením haly.
            </p>
            <Link href="/kontakt" className={`${link} mt-6 inline-block`}>
              Poznejte své kontakty
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="reveal lg:col-span-5">
            <h2 className="font-serif text-[44px] leading-[1.02] text-ink sm:text-[52px]">Na co se často ptáte</h2>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-dim">
              Cena, termíny i příprava pozemku mají souvislosti. Probereme je s vámi předem.
            </p>
          </div>
          <div className="reveal lg:col-span-7">
            <Faq />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
