import Image from "next/image";
import Link from "next/link";
import { HallCard, RealizationCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { UseCaseSwitcher } from "@/components/UseCaseSwitcher";
import { faq, getRealization, halls, realizations, steps } from "@/lib/data";
import { btn, container, link } from "@/lib/ui";

const featured = ["skladova-hala-lhotka-nad-becvou", "sportovni-hala-brno", "skladove-haly-mosnov"].map((s) => getRealization(s)!);
const rest = realizations.filter((r) => !featured.includes(r));

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image
          src="/foto/litvinov.webp"
          alt="Bílá montovaná skladová hala v Litvínově pod zataženou oblohou"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="-z-20 object-cover object-[70%_60%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/60 to-night/0 max-md:bg-gradient-to-b max-md:from-night/90 max-md:via-night/70 max-md:to-night/45" />

        <div className={`${container} flex min-h-[calc(100svh-72px-64px)] flex-col justify-center py-16 md:min-h-[640px] lg:min-h-[700px]`}>
          <div className="max-w-[720px]">
            <h1 className="font-serif">
              <span className="block text-[28px] leading-tight text-white/85 sm:text-[34px]">Naše haly jsou stavěné pro</span>
              <span className="mt-1 block text-[54px] leading-[0.98] sm:text-[78px] lg:text-[96px]">vysokou sněhovou zátěž.</span>
            </h1>
            <p className="mt-7 max-w-[520px] text-[18px] leading-relaxed text-white/80">
              Lehké montované haly s opláštěním z plachty nebo trapézového plechu pro skladování, výrobu, sport i letadla. Prodej i pronájem.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/poptavka" className={btn.primary}>
                Probrat můj projekt
              </Link>
              <Link href="/realizace" className={btn.ghostLight}>
                Prohlédnout realizace
              </Link>
            </div>
          </div>

          <div className="mt-14 flex items-end gap-4 self-start rounded-md bg-night/80 py-4 pl-4 pr-6 md:absolute md:bottom-28 md:right-8 md:mt-0 lg:right-[max(2rem,calc((100vw-1240px)/2+2rem))]">
            <span className="h-14 w-[3px] bg-azure" aria-hidden />
            <p className="leading-none">
              <span className="block text-[14px] text-white/90">Záruka až</span>
              <span className="mt-1 block font-serif text-[56px] leading-none">
                6 <span className="text-[28px]">let</span>
              </span>
              <span className="mt-2 block text-[12px] text-white/80">u vybraných řešení</span>
            </p>
          </div>
        </div>

        <div className="border-t border-white/15 bg-night/70">
          <ul className={`${container} grid grid-cols-3 text-center text-[13px] font-semibold sm:text-[15px]`}>
            {["Návrh na míru", "Dokumentace", "Dodávka a montáž"].map((t, i) => (
              <li key={t} className={i > 0 ? "border-l border-white/15" : ""}>
                <Link href="/jak-pracujeme" className="block px-2 py-5 text-white/85 hover:text-white">
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Typy hal */}
      <section className="py-20 md:py-28">
        <div className={container}>
          <div className="reveal grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="font-serif text-[44px] leading-[1.02] text-ink sm:text-[56px] md:col-span-7">Jakou halu potřebujete?</h2>
            <p className="text-[17px] leading-relaxed text-dim md:col-span-5">
              Vyberte typ haly a prohlédněte si možnosti. Konstrukci, opláštění a vybavení přizpůsobíme vašemu záměru a místu stavby.
            </p>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {halls.map((h) => (
              <li key={h.slug} className="reveal">
                <HallCard hall={h} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Využití */}
      <section className="bg-mist py-20 md:py-28">
        <div className={container}>
          <h2 className="reveal max-w-3xl font-serif text-[44px] leading-[1.02] text-ink sm:text-[56px]">
            Jeden partner. <span className="text-brand">Mnoho možností.</span>
          </h2>
          <div className="reveal mt-12">
            <UseCaseSwitcher />
          </div>
        </div>
      </section>

      {/* Realizace */}
      <section className="py-20 md:py-28">
        <div className={container}>
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-[44px] leading-[1.02] text-ink sm:text-[56px]">
              Haly, které
              <br />
              už slouží.
            </h2>
            <p className="max-w-sm text-[17px] leading-relaxed text-dim">
              Konkrétní místa, skutečné projekty. Každá realizace má rozměry, plochu a fotografie ze stavby.
            </p>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 lg:grid-cols-12">
            <div className="reveal lg:col-span-7">
              <RealizationCard item={featured[0]} sizes="(min-width: 1024px) 700px, 100vw" />
            </div>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {featured.slice(1).map((r) => (
                <div key={r.slug} className="reveal">
                  <RealizationCard item={r} sizes="(min-width: 1024px) 480px, 50vw" />
                </div>
              ))}
            </div>
          </div>

          <div className="reveal mt-16">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">Další realizace</caption>
              <thead>
                <tr className="border-b border-ink text-[12px] uppercase tracking-[0.1em] text-dim">
                  <th scope="col" className="py-3 pr-4 font-semibold">Další realizace</th>
                  <th scope="col" className="hidden py-3 pr-4 font-semibold sm:table-cell">Využití</th>
                  <th scope="col" className="hidden py-3 pr-4 font-semibold md:table-cell">Rozměry</th>
                  <th scope="col" className="py-3 text-right font-semibold">Plocha</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((r) => (
                  <tr key={r.slug} className="group border-b border-line">
                    <th scope="row" className="py-4 pr-4 font-normal">
                      <Link href={`/realizace/${r.slug}`} className="font-serif text-[24px] text-ink transition-colors group-hover:text-brand">
                        {r.place}
                      </Link>
                    </th>
                    <td className="hidden py-4 pr-4 text-dim sm:table-cell">{r.kind}</td>
                    <td className="hidden py-4 pr-4 tabular-nums text-dim md:table-cell">{r.dimensions}</td>
                    <td className="py-4 text-right font-semibold tabular-nums">{r.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/realizace" className={`${link} mt-8 inline-block`}>
              Všechny realizace s fotografiemi
            </Link>
          </div>
        </div>
      </section>

      {/* Postup */}
      <section className="bg-night py-20 text-white md:py-28">
        <div className={container}>
          <div className="reveal grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="font-serif text-[44px] leading-[1.02] sm:text-[56px] md:col-span-7">
              Dobrý výsledek.
              <br />
              <span className="text-white/60">Jasný postup.</span>
            </h2>
            <p className="text-[17px] leading-relaxed text-white/70 md:col-span-5">
              Od první konzultace k předání haly. V každé fázi společně upřesníme, co bude následovat.
            </p>
          </div>
          <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal relative border-t border-line-dark pt-8">
                <span aria-hidden className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-azure" />
                <p className="text-[13px] font-semibold text-white/50">Krok {i + 1}</p>
                <h3 className="mt-2 text-[19px] font-bold leading-snug">{s.short}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{s.shortText}</p>
              </li>
            ))}
          </ol>
          <Link href="/jak-pracujeme" className={`${btn.ghostLight} reveal mt-14`}>
            Jak spolupráce probíhá
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="reveal lg:col-span-5">
            <h2 className="font-serif text-[44px] leading-[1.02] text-ink sm:text-[56px]">
              Ještě než
              <br />
              začneme.
            </h2>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-dim">
              Nemusíte mít všechno vyřešené. Pro první rozhovor stačí váš záměr.
            </p>
            <Link href="/kontakt" className={`${link} mt-6 inline-block`}>
              Zeptejte se nás
            </Link>
          </div>
          <div className="reveal lg:col-span-7">
            <Faq items={faq.slice(0, 4)} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
