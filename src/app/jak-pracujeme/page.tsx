import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { PageIntro } from "@/components/PageIntro";
import { steps } from "@/lib/data";
import { btn, container, link } from "@/lib/ui";

// Shrnuto z textů MontHaly: co pomůže k první nabídce.
const needs = [
  { k: "Účel haly", v: "Co v ní bude a jak se bude prostor používat. Podle toho volíme konstrukci a opláštění." },
  { k: "Přibližná velikost", v: "Orientační rozměry, nebo jen co se má dovnitř vejít. S přesnými rozměry pomůžeme." },
  { k: "Obec, kde má hala stát", v: "Místo ovlivňuje zatížení sněhem a větrem, kotvení i dopravu." },
  { k: "Fotky nebo nákres pozemku", v: "Pomohou s přístupem techniky, podkladem a umístěním vjezdů." },
];

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
        <div className={`${container} grid gap-14 lg:grid-cols-12`}>
          <ol className="relative lg:col-span-7">
            <span aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-line" />
            {steps.map((s) => (
              <li key={s.title} className="relative pb-16 last:pb-0">
                <div className="relative pl-14">
                  <span aria-hidden className="absolute left-0 top-2 flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 border-azure bg-white">
                    <span className="h-[7px] w-[7px] rounded-full bg-azure" />
                  </span>
                  <h2 className="font-display text-[30px] leading-tight text-ink sm:text-[38px]">{s.title}</h2>
                  <p className="mt-4 text-[17px] leading-relaxed text-dim">{s.text}</p>
                  <p className="mt-5 border-l-[3px] border-azure pl-4 text-[15px] font-semibold text-ink">{s.note}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-clip rounded-md bg-mist">
                <Image
                  src="/foto/veselicko-1.webp"
                  alt="Montážníci při stavbě ocelové konstrukce haly ve Veselíčku"
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-8 font-display text-[28px] leading-tight text-ink sm:text-[32px]">Společně vybereme, co má smysl.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-dim">
                Při výběru nemusíte znát všechny technické možnosti. Obchodní oddělení a projektanti vám pomohou propojit zamýšlený provoz s
                konkrétním řešením haly.
              </p>
              <Link href="/kontakt" className={`${link} mt-5 inline-block`}>
                Poznejte své kontakty
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-night text-white">
        <div className={`${container} grid gap-12 py-20 md:py-24 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[34px] leading-[1.05] sm:text-[42px]">Co od vás potřebujeme</h2>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-white/70">
              Pro první nabídku nemusíte mít projekt. Stačí pár údajů, zbytek doladíme společně.
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
            <h2 className="font-display text-[38px] leading-[1.02] text-ink sm:text-[44px]">Na co se často ptáte</h2>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-dim">
              Cena, termíny i příprava pozemku mají souvislosti. Probereme je s vámi předem.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Faq />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
