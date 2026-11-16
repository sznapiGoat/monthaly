import { Img } from "@/components/Img";
import Link from "next/link";
import { HallCard, RealizationCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { clients, faq, getRealization, hallGroups, halls, realizations, rental, sales, steps } from "@/lib/data";
import { btn, container, link } from "@/lib/ui";

// Mozaika v pořadí skupin z rozcestníku: dvě velké dlaždice nahoře, pod nimi řady po třech.
// Když na poslední řadu zbydou dvě, jsou velké (7 typů: 2 + 3 + 2, s nůžkovými stany 2 + 3 + 3).
const mosaic = hallGroups.flatMap((g) => halls.filter((h) => h.group === g.id));
const isLarge = (i: number, n: number) => i < 2 || ((n - 2) % 3 === 2 && i >= n - 2);

// Tři poutáky z klientova zadání (11/2026). Banner 1: „od  “ místo „za  “, domluveno s klientem.
const banners = [
  { label: "Čas", title: "Chybí vám prostor? Vaše hala na míru bude stát už od  .", text: "Rychlé navýšení kapacity bez zbytečného čekání. Reagujeme okamžitě tam, kde ostatní teprve plánují." },
  { label: "Jednoduchost", title: "Nemusíte mít hotový projekt ani znát přesné rozměry.", text: "Stačí nám říct, co potřebujete zastřešit. Kompletní návrh, statické posouzení i projektovou dokumentaci vyřešíme za vás." },
  { label: "Jistota", title: "Rychlost bez kompromisů. Jistota ověřená statickým výpočtem.", text: "Každou halu dimenzujeme na reálné sněhové a větrné zatížení vaší lokality. Proto si můžeme dovolit garantovat nadstandardní záruku až  ." },
];

const purchase = {
  points: ["Návrh podle provozu a projektová dokumentace", "Statický výpočet pro sníh a vítr v místě stavby", "Dodávka a montáž vlastními lidmi", "Záruka až   u vybraných řešení"],
  photo: { src: "/foto/opatovice-2.webp", alt: "Montáž opláštění haly v Opatovicích nad Labem z pracovní plošiny" },
};

const featured = ["skladova-hala-lhotka-nad-becvou", "sportovni-hala-brno", "skladove-haly-mosnov"].map((s) => getRealization(s)!);
const rest = realizations.filter((r) => !featured.includes(r));

const h2 = "font-display text-[40px] leading-[0.95] text-ink sm:text-[51px]";
const lead = "mt-5 max-w-[60ch] text-[17px] leading-relaxed text-dim";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative isolate overflow-clip bg-night pt-[72px] text-white">
        <HeroSlideshow />

        <div className={`${container} flex min-h-[calc(100dvh-72px-64px)] flex-col justify-center py-16 md:min-h-[620px] lg:min-h-[680px]`}>
          <div className="max-w-[980px] [text-shadow:0_1px_2px_rgb(22_26_45/0.35),0_2px_28px_rgb(22_26_45/0.6)]">
            <h1 className="font-display">
              <span className="block text-[49px] leading-[0.93] sm:text-[67px] lg:text-[78px]">
                Montované haly <br className="max-[379px]:hidden lg:hidden" />
                <span className="whitespace-nowrap">na míru.</span>
              </span>
              <span className="mt-2 block text-[31px] leading-[0.99] text-white/90 sm:text-[42px] lg:text-[49px]">
                Od návrhu po montáž.
              </span>
            </h1>
            <p className="mt-7 max-w-[540px] text-[18px] leading-relaxed text-white/85">
              Jakýkoli rozměr, přesně podle vašeho provozu a bez kompromisů. Vlastní projektanti a montáž, kalkulaci pošleme do několika dnů.
            </p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Link href="/poptavka" className={btn.primary}>
                Nezávazná poptávka
              </Link>
              <Link href="/realizace" className="py-2 text-[15px] font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white">
                Prohlédnout realizace
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 bg-night/80">
          <ul className={`${container} grid text-[14px] sm:grid-cols-3 sm:text-[15px]`}>
            {[
              { href: "#otazky", strong: "Záruka až 6 let", rest: "u vybraných řešení" },
              { href: "/jak-pracujeme", strong: "Hala na klíč", rest: "už od 4 týdnů" },
              { href: "/jak-pracujeme", strong: "Počítané na sníh a vítr", rest: "ve vaší lokalitě" },
            ].map((t, i) => (
              <li key={t.strong} className={i > 0 ? "border-white/15 max-sm:border-t sm:border-l" : ""}>
                <Link href={t.href} className={`block py-4 text-white/70 hover:text-white sm:py-5 ${i === 0 ? "sm:pr-6" : "sm:px-6"}`}>
                  <span className="font-semibold text-white">{t.strong}</span> {t.rest}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Typy hal */}
      <section className="py-20 md:py-28">
        <div className={container}>
          <div>
            <h2 className={h2}>Jakou halu potřebujete?</h2>
            <p className={lead}>
              Vyberte typ haly a prohlédněte si možnosti. Konstrukci, opláštění a vybavení přizpůsobíme vašemu záměru a místu stavby.
            </p>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {mosaic.map((h, i) => {
              const large = isLarge(i, mosaic.length);
              // Na tabletu (2 sloupce) by lichá řada malých dlaždic nechala díru, poslední malá se roztáhne.
              const small = mosaic.filter((_, j) => !isLarge(j, mosaic.length));
              const lastOddSmall = !large && small.length % 2 === 1 && small.at(-1) === h;
              return (
                <li key={h.slug} className={large ? "sm:col-span-2 lg:col-span-3" : `lg:col-span-2 ${lastOddSmall ? "sm:col-span-2" : ""}`}>
                  <HallCard hall={h} large={large} sizes={large ? "(min-width: 1024px) 600px, 100vw" : lastOddSmall ? "(min-width: 1024px) 390px, 100vw" : "(min-width: 1024px) 390px, 50vw"} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Poutáky ze zadání */}
      <section aria-labelledby="poutaky" className="bg-brand py-20 text-white md:py-28">
        <div className={container}>
          <h2 id="poutaky" className="font-display text-[40px] leading-[0.95] sm:text-[51px]">
            Velké plány. <span className="text-azure-soft">Výjimečný prostor.</span>
          </h2>
          <ol className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
            {banners.map((b, i) => (
              <li key={b.label} className="border-t-[3px] border-azure pt-7">
                <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-azure">
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span> · {b.label}
                </p>
                <h3 className="mt-4 font-display text-[29px] leading-[1.08] sm:text-[33px]">{b.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-white/75">{b.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/poptavka" className={`${btn.primary} mt-14`}>
            Popsat svůj záměr
          </Link>
        </div>
      </section>

      {/* Pořízení haly. Pronájem jen malým řádkem: primární je prodej (zadání 11/2026). */}
      <section className="bg-mist py-20 md:py-28">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="sd-reveal relative aspect-[4/3] overflow-clip rounded-md bg-line lg:col-span-6">
            <Img src={purchase.photo.src} alt={purchase.photo.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div className="lg:col-span-6">
            <h2 className={h2}>Hala na míru, která zůstane vaše.</h2>
            <p className={lead}>Navrhneme ji podle provozu a místa stavby, připravíme dokumentaci a postavíme ji. Rozměr přizpůsobíme vám, ne katalogu.</p>
            <ul className="mt-7 border-t border-line text-[16px] text-ink">
              {purchase.points.map((pt) => (
                <li key={pt} className="border-b border-line py-3">
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-start gap-x-6 gap-y-3 sm:flex-row sm:items-center">
              <Link href="/poptavka" className={btn.dark}>
                Nezávazná poptávka
              </Link>
              <a href={`tel:${sales.phone}`} className="text-[15px] leading-snug text-dim hover:text-brand">
                <span className="font-semibold tabular-nums text-ink">{sales.phoneLabel}</span>
                <span className="block text-[14px]">{sales.name}, prodej</span>
              </a>
            </div>
            <p className="mt-8 text-[14px] leading-relaxed text-dim">
              Halu potřebujete jen na čas? Zeptejte se na pronájem:{" "}
              <a href={`tel:${rental.phone}`} className="whitespace-nowrap font-semibold text-ink hover:text-brand">
                {rental.name}, <span className="tabular-nums">{rental.phoneLabel}</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Realizace */}
      <section className="py-20 md:py-28">
        <div className={container}>
          <div>
            <h2 className={h2}>Haly, které už slouží.</h2>
            <p className={lead}>Konkrétní místa, skutečné projekty. U každé realizace najdete rozměry, plochu a fotografie ze stavby.</p>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <RealizationCard item={featured[0]} sizes="(min-width: 1024px) 700px, 100vw" />
            </div>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {featured.slice(1).map((r) => (
                <div key={r.slug}>
                  <RealizationCard item={r} sizes="(min-width: 1024px) 480px, 50vw" />
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-16 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {rest.map((r) => (
              <li key={r.slug}>
                <Link href={`/realizace/${r.slug}`} className="group flex items-center gap-5">
                  <span className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-md bg-mist">
                    <Img src={r.photos[0].src} alt="" fill sizes="112px" className="object-cover" />
                    <span className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-inset ring-azure transition-[box-shadow] group-hover:ring-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[23px] leading-[1.12] text-ink transition-colors group-hover:text-brand">
                      {r.place}
                      {r.country === "SK" && <span className="ml-2 text-[14px] font-medium text-dim">SK</span>}
                    </span>
                    <span className="mt-1 block text-[15px] tabular-nums text-dim">
                      {r.kind}, {r.area}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="flex items-center">
              <Link href="/realizace" className={link}>
                Všechny realizace s fotografiemi
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Zákazníci */}
      <section aria-labelledby="zakaznici" className="border-t border-line py-16 md:py-20">
        <div className={container}>
          <h2 id="zakaznici" className="font-display text-[31px] leading-[1.12] text-ink sm:text-[38px]">
            Haly stavíme pro firmy i instituce.
          </h2>
          <ul className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-4 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-8">
            {clients.map((c) => (
              <li key={c.name} className="flex justify-center">
                <Img src={c.logo} alt={c.name} width={200} height={133} className="h-auto w-[120px] opacity-80 sm:w-[150px]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Postup */}
      <section className="bg-mist py-20 md:py-28">
        <div className={container}>
          <div>
            <h2 className={h2}>Jak spolupráce probíhá</h2>
            <p className={lead}>Na kvalitě záleží. Od prvního návrhu až po montáž, v každé fázi víte, co bude následovat.</p>
          </div>
          <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
            {steps.map((s) => (
              <li key={s.title} className="relative pt-8">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
                <span aria-hidden className="absolute -top-[4px] left-0 h-[9px] w-[9px] rounded-full bg-azure" />
                <h3 className="text-[19px] font-bold leading-snug text-ink">{s.short}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-dim">{s.shortText}</p>
              </li>
            ))}
          </ol>
          <Link href="/jak-pracujeme" className={`${btn.ghost} mt-14`}>
            Celý postup podrobně
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="otazky" className="scroll-mt-[72px] py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className={h2}>Ještě než začneme.</h2>
            <p className={lead}>Nemusíte mít všechno vyřešené. Pro první rozhovor stačí váš záměr.</p>
            <Link href="/kontakt" className={`${link} mt-6 inline-block`}>
              Zeptejte se nás
            </Link>
          </div>
          <div className="lg:col-span-7">
            <Faq items={[0, 1, 2, 6].map((i) => faq[i])} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
