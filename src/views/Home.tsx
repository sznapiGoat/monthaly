import { Img } from "@/components/Img";
import Link from "next/link";
import { HallCard, RealizationCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { getContent } from "@/lib/content";
import { localize, pick, type Lang } from "@/lib/i18n";
import { btn, container, link } from "@/lib/ui";

// Mozaika v pořadí skupin z rozcestníku: dvě velké dlaždice nahoře, pod nimi řady po třech.
// Když na poslední řadu zbydou dvě, jsou velké (7 typů: 2 + 3 + 2, s nůžkovými stany 2 + 3 + 3).
const isLarge = (i: number, n: number) => i < 2 || ((n - 2) % 3 === 2 && i >= n - 2);

const h2 = "font-display text-[40px] leading-[0.95] text-ink sm:text-[51px]";
const lead = "mt-5 max-w-[60ch] text-[17px] leading-relaxed text-dim";

export function Home({ lang }: { lang: Lang }) {
  const t = pick(lang);
  const l = (href: string) => localize(lang, href);
  const { clients, faq, getRealization, hallGroups, halls, realizations, rental, sales, steps } = getContent(lang);

  const mosaic = hallGroups.flatMap((g) => halls.filter((h) => h.group === g.id));

  // Tři poutáky z klientova zadání (11/2026). Banner 1: „od 4 týdnů“ místo „za 4 týdny“, domluveno s klientem.
  const banners = [
    {
      label: t("Čas", "Čas"),
      order: "",
      title: t("Chybí vám prostor? Vaše hala na míru bude stát už od 4 týdnů.", "Chýba vám priestor? Vaša hala na mieru bude stáť už od 4 týždňov."),
      text: t(
        "Rychlé navýšení kapacity bez zbytečného čekání. Reagujeme okamžitě tam, kde ostatní teprve plánují.",
        "Rýchle navýšenie kapacity bez zbytočného čakania. Reagujeme okamžite tam, kde ostatní ešte len plánujú.",
      ),
    },
    {
      label: t("Jednoduchost", "Jednoduchosť"),
      order: "",
      title: t("Nemusíte mít hotový projekt ani znát přesné rozměry.", "Nemusíte mať hotový projekt ani poznať presné rozmery."),
      text: t(
        "Stačí nám říct, co potřebujete zastřešit. Kompletní návrh, statické posouzení i projektovou dokumentaci vyřešíme za vás.",
        "Stačí nám povedať, čo potrebujete zastrešiť. Kompletný návrh, statické posúdenie aj projektovú dokumentáciu vyriešime za vás.",
      ),
    },
    {
      label: t("Jistota", "Istota"),
      order: "[[data-sezona=zima]_&]:order-first",
      title: t("Rychlost bez kompromisů. Jistota ověřená statickým výpočtem.", "Rýchlosť bez kompromisov. Istota overená statickým výpočtom."),
      text: t(
        "Každou halu dimenzujeme na reálné sněhové a větrné zatížení vaší lokality. Proto si můžeme dovolit garantovat nadstandardní záruku až 6 let.",
        "Každú halu dimenzujeme na reálne snehové a veterné zaťaženie vašej lokality. Preto si môžeme dovoliť garantovať nadštandardnú záruku až 6 rokov.",
      ),
    },
  ];

  const purchase = {
    points: t(
      ["Návrh podle provozu a projektová dokumentace", "Statický výpočet pro sníh a vítr v místě stavby", "Dodávka a montáž vlastními lidmi", "Záruka až 6 let u vybraných řešení"],
      ["Návrh podľa prevádzky a projektová dokumentácia", "Statický výpočet na sneh a vietor v mieste stavby", "Dodávka a montáž vlastnými ľuďmi", "Záruka až 6 rokov pri vybraných riešeniach"],
    ),
    photo: {
      src: "/foto/opatovice-2.webp",
      alt: t("Montáž opláštění haly v Opatovicích nad Labem z pracovní plošiny", "Montáž opláštenia haly v Opatoviciach nad Labem z pracovnej plošiny"),
    },
  };

  const featured = ["skladova-hala-lhotka-nad-becvou", "sportovni-hala-brno", "skladove-haly-mosnov"].map((s) => getRealization(s)!);
  // Pod třemi hlavními jen výběr, celý seznam je na stránce Realizace.
  const rest = realizations.filter((r) => !featured.some((f) => f.slug === r.slug)).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative isolate overflow-clip bg-night pt-[72px] text-white">
        <HeroSlideshow lang={lang} />

        <div className={`${container} flex min-h-[calc(100dvh-72px-64px)] flex-col justify-center py-16 md:min-h-[620px] lg:min-h-[680px]`}>
          <div className="max-w-[980px] [text-shadow:0_1px_2px_rgb(22_26_45/0.35),0_2px_28px_rgb(22_26_45/0.6)]">
            <h1 className="font-display">
              <span className="block text-[49px] leading-[0.93] sm:text-[67px] lg:text-[78px]">
                Montované haly <br className="max-[379px]:hidden lg:hidden" />
                <span className="whitespace-nowrap">{t("na míru.", "na mieru.")}</span>
              </span>
              <span className="mt-2 block text-[31px] leading-[0.99] text-white/90 sm:text-[42px] lg:text-[49px]">
                {t("Od návrhu po montáž.", "Od návrhu po montáž.")}
              </span>
            </h1>
            <p className="mt-7 max-w-[540px] text-[18px] leading-relaxed text-white/85">
              {t(
                "Jakýkoli rozměr, přesně podle vašeho provozu a bez kompromisů. Vlastní projektanti a montáž, kalkulaci pošleme do několika dnů.",
                "Akýkoľvek rozmer, presne podľa vašej prevádzky a bez kompromisov. Vlastní projektanti a montáž, kalkuláciu pošleme do niekoľkých dní.",
              )}
            </p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Link href={l("/poptavka")} className={btn.primary}>
                {t("Nezávazná poptávka", "Nezáväzný dopyt")}
              </Link>
              <Link href={l("/realizace")} className="py-2 text-[15px] font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white">
                {t("Prohlédnout realizace", "Pozrieť realizácie")}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 bg-night/80">
          <ul className={`${container} grid text-[14px] sm:grid-cols-3 sm:text-[15px]`}>
            {[
              { href: "#otazky", strong: t("Záruka až 6 let", "Záruka až 6 rokov"), rest: t("u vybraných řešení", "pri vybraných riešeniach") },
              { href: l("/jak-pracujeme"), strong: t("Hala na klíč", "Hala na kľúč"), rest: t("už od 4 týdnů", "už od 4 týždňov") },
              { href: l("/jak-pracujeme"), strong: t("Počítané na sníh a vítr", "Počítané na sneh a vietor"), rest: t("ve vaší lokalitě", "vo vašej lokalite") },
            ].map((item, i) => (
              <li key={item.strong} className={i > 0 ? "border-white/15 max-sm:border-t sm:border-l" : ""}>
                <Link href={item.href} className={`block py-4 text-white/70 hover:text-white sm:py-5 ${i === 0 ? "sm:pr-6" : "sm:px-6"}`}>
                  <span className="font-semibold text-azure">{item.strong}</span> {item.rest}
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
            <h2 className={h2}>{t("Jakou halu potřebujete?", "Akú halu potrebujete?")}</h2>
            <p className={lead}>
              {t(
                "Vyberte typ haly a prohlédněte si možnosti. Konstrukci, opláštění a vybavení přizpůsobíme vašemu záměru a místu stavby.",
                "Vyberte typ haly a pozrite si možnosti. Konštrukciu, opláštenie a vybavenie prispôsobíme vášmu zámeru a miestu stavby.",
              )}
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
                  <HallCard
                    lang={lang}
                    hall={h}
                    large={large}
                    sizes={large ? "(min-width: 1024px) 600px, 100vw" : lastOddSmall ? "(min-width: 1024px) 390px, 100vw" : "(min-width: 1024px) 390px, 50vw"}
                  />
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
            {t("Velké plány. Výjimečný prostor.", "Veľké plány. Výnimočný priestor.")}
          </h2>
          <ol className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
            {banners.map((b) => (
              <li key={b.label} className={`border-t-[3px] border-azure pt-7 ${b.order}`}>
                <p className="text-[15px] font-semibold text-azure">{b.label}</p>
                <h3 className="mt-4 font-display text-[29px] leading-[1.08] sm:text-[33px]">{b.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-white/75">{b.text}</p>
              </li>
            ))}
          </ol>
          <Link href={l("/poptavka")} className={`${btn.primary} mt-14`}>
            {t("Nezávazná poptávka", "Nezáväzný dopyt")}
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
            <h2 className={h2}>{t("Hala na míru, která zůstane vaše.", "Hala na mieru, ktorá zostane vaša.")}</h2>
            <p className={lead}>
              {t(
                "Navrhneme ji podle provozu a místa stavby, připravíme dokumentaci a postavíme ji. Rozměr přizpůsobíme vám, ne katalogu.",
                "Navrhneme ju podľa prevádzky a miesta stavby, pripravíme dokumentáciu a postavíme ju. Rozmer prispôsobíme vám, nie katalógu.",
              )}
            </p>
            <ul className="mt-7 border-t border-line text-[16px] text-ink">
              {purchase.points.map((pt) => (
                <li key={pt} className="border-b border-line py-3">
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-start gap-x-6 gap-y-3 sm:flex-row sm:items-center">
              <Link href={l("/poptavka")} className={btn.primary}>
                {t("Nezávazná poptávka", "Nezáväzný dopyt")}
              </Link>
              <a href={`tel:${sales.phone}`} className="text-[15px] leading-snug text-dim hover:text-brand">
                <span className="font-semibold tabular-nums text-ink">{sales.phoneLabel}</span>
                <span className="block text-[14px]">
                  {sales.name}, {t("prodej", "predaj")}
                </span>
              </a>
            </div>
            <p className="mt-8 text-[14px] leading-relaxed text-dim">
              {t("Halu potřebujete jen na čas? Zeptejte se na pronájem:", "Halu potrebujete len na čas? Opýtajte sa na prenájom:")}{" "}
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
            <h2 className={h2}>{t("Haly, které už slouží.", "Haly, ktoré už slúžia.")}</h2>
            <p className={lead}>
              {t(
                "Konkrétní místa, skutečné projekty. U každé realizace najdete rozměry, plochu a fotografie ze stavby.",
                "Konkrétne miesta, skutočné projekty. Pri každej realizácii nájdete rozmery, plochu a fotografie zo stavby.",
              )}
            </p>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <RealizationCard lang={lang} item={featured[0]} sizes="(min-width: 1024px) 700px, 100vw" />
            </div>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {featured.slice(1).map((r) => (
                <div key={r.slug}>
                  <RealizationCard lang={lang} item={r} sizes="(min-width: 1024px) 480px, 50vw" />
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-16 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {rest.map((r) => (
              <li key={r.slug}>
                <Link href={l(`/realizace/${r.slug}`)} className="group flex items-center gap-5">
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
              <Link href={l("/realizace")} className={link}>
                {t("Všechny realizace s fotografiemi", "Všetky realizácie s fotografiami")}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Zákazníci */}
      <section aria-labelledby="zakaznici" className="border-t border-line py-16 md:py-20">
        <div className={container}>
          <h2 id="zakaznici" className="font-display text-[31px] leading-[1.12] text-ink sm:text-[38px]">
            {t("Haly stavíme pro firmy i instituce.", "Haly staviame pre firmy aj inštitúcie.")}
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
            <h2 className={h2}>{t("Jak spolupráce probíhá", "Ako spolupráca prebieha")}</h2>
            <p className={lead}>
              {t(
                "Na kvalitě záleží. Od prvního návrhu až po montáž, v každé fázi víte, co bude následovat.",
                "Na kvalite záleží. Od prvého návrhu až po montáž, v každej fáze viete, čo bude nasledovať.",
              )}
            </p>
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
          <Link href={l("/jak-pracujeme")} className={`${btn.ghost} mt-14`}>
            {t("Celý postup podrobně", "Celý postup podrobne")}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="otazky" className="scroll-mt-[72px] py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className={h2}>{t("Ještě než začneme.", "Ešte než začneme.")}</h2>
            <p className={lead}>{t("Nemusíte mít všechno vyřešené. Pro první rozhovor stačí váš záměr.", "Nemusíte mať všetko vyriešené. Na prvý rozhovor stačí váš zámer.")}</p>
            <Link href={l("/kontakt")} className={`${link} mt-6 inline-block`}>
              {t("Zeptejte se nás", "Opýtajte sa nás")}
            </Link>
          </div>
          <div className="lg:col-span-7">
            <Faq items={[0, 1, 2, 6].map((i) => faq[i])} />
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
