import Image from "next/image";
import Link from "next/link";
import { HallCard, RealizationCard } from "@/components/Cards";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { faq, getRealization, halls, realizations, steps } from "@/lib/data";
import { btn, container, link } from "@/lib/ui";

// Mozaika: hlavní obory nahoře, vizuálně nejsilnější fotky na konci.
const mosaic = ["skladove-haly", "vyrobni-haly", "sportovni-haly", "zemedelske-haly", "jezdecke-haly", "letecke-hangary", "party-stany", "membranova-zastreseni"].map(
  (s) => halls.find((h) => h.slug === s)!,
);

const offers = [
  {
    title: "Pořízení haly",
    text: "Hala zůstane vaše. Navrhneme ji podle provozu a místa stavby, připravíme dokumentaci a postavíme ji.",
    points: ["Návrh podle provozu a projektová dokumentace", "Dodávka a montáž", "Záruka až 6 let u vybraných řešení"],
    photo: { src: "/foto/vyrobni-haly.webp", alt: "Zateplená výrobní hala z tmavých sendvičových panelů" },
    href: "/poptavka",
    cta: "Poptat pořízení",
    primary: true,
  },
  {
    title: "Pronájem",
    text: "Když halu potřebujete jen na čas, třeba na sezónu nebo na akci. Možnosti pronájmu ověříme podle typu haly a termínu.",
    points: ["Dočasné zastřešení bez pořízení haly", "Možnosti ověříme podle typu a termínu", "Pronájem: Ing. Romana Chalupková, +420 724 323 672"],
    photo: { src: "/foto/party-stany-1.webp", alt: "Bílý párty stan s obloukovými okny na trávníku" },
    href: "/poptavka?zamer=pronajem",
    cta: "Poptat pronájem",
    primary: false,
  },
];

const featured = ["skladova-hala-lhotka-nad-becvou", "sportovni-hala-brno", "skladove-haly-mosnov"].map((s) => getRealization(s)!);
const rest = realizations.filter((r) => !featured.includes(r));

const h2 = "font-display text-[36px] leading-[1.06] text-ink sm:text-[46px]";
const lead = "mt-5 max-w-[60ch] text-[17px] leading-relaxed text-dim";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative isolate overflow-clip bg-night pt-[72px] text-white">
        <HeroSlideshow />

        <div className={`${container} flex min-h-[calc(100dvh-72px-64px)] flex-col justify-center py-16 md:min-h-[620px] lg:min-h-[680px]`}>
          <div className="max-w-[980px]">
            <h1 className="font-display">
              <span className="block text-[44px] font-bold leading-[1.04] sm:text-[60px] lg:text-[70px]">
                Montované haly <br className="max-[379px]:hidden lg:hidden" />
                <span className="whitespace-nowrap">na míru.</span>
              </span>
              <span className="mt-2 block text-[28px] font-medium leading-[1.1] text-white/75 sm:text-[38px] lg:text-[44px]">
                Od návrhu po montáž.
              </span>
            </h1>
            <p className="mt-7 max-w-[540px] text-[18px] leading-relaxed text-white/85">
              Sklady, výroba, sport i zemědělství. Vlastní projektanti, prodej i pronájem. Kalkulaci pošleme do několika dnů.
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
              { href: "/jak-pracujeme", strong: "Konstrukce na zátěž", rest: "sněhu a větru v místě stavby" },
              { href: "/jak-pracujeme", strong: "Záruka až 6 let", rest: "u vybraných řešení" },
              { href: "/realizace", strong: "Realizace v ČR", rest: "i na Slovensku" },
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
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {mosaic.map((h, i) => {
              const large = i < 2 || i > 5;
              return (
                <li key={h.slug} className={large ? "sm:col-span-2" : undefined}>
                  <HallCard hall={h} large={large} sizes={large ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 290px, 50vw"} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Koupě a pronájem */}
      <section className="bg-mist py-20 md:py-28">
        <div className={container}>
          <div>
            <h2 className={h2}>Koupit, nebo pronajmout?</h2>
            <p className={lead}>Halu můžete pořídit natrvalo, nebo si ji pronajmout na dobu, kdy ji potřebujete.</p>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-8">
            {offers.map((o) => (
              <article key={o.title} className="flex flex-col">
                <div className="sd-reveal relative aspect-[16/10] overflow-clip rounded-md bg-line">
                  <Image src={o.photo.src} alt={o.photo.alt} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
                </div>
                <h3 className="mt-7 font-display text-[28px] leading-tight text-ink sm:text-[32px]">{o.title}</h3>
                <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-dim">{o.text}</p>
                <ul className="mt-6 border-t border-line text-[16px] text-ink">
                  {o.points.map((pt) => (
                    <li key={pt} className="border-b border-line py-3">
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link href={o.href} className={o.primary ? btn.dark : btn.ghost}>
                    {o.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Realizace */}
      <section className="py-20 md:py-28">
        <div className={container}>
          <div>
            <h2 className={h2}>Haly, které už slouží.</h2>
            <p className={lead}>Konkrétní místa, skutečné projekty. U každé realizace najdete rozměry, plochu a fotografie ze stavby.</p>
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
                    <Image src={r.photos[0].src} alt="" fill sizes="112px" className="object-cover" />
                    <span className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-inset ring-azure transition-[box-shadow] group-hover:ring-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[21px] leading-tight text-ink transition-colors group-hover:text-brand">
                      {r.place}
                      {r.country === "SK" && <span className="ml-2 text-[14px] font-medium text-dim">SK</span>}
                    </span>
                    <span className="mt-1 block text-[14px] tabular-nums text-dim">
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

      {/* Postup */}
      <section className="bg-mist py-20 md:py-28">
        <div className={container}>
          <div>
            <h2 className={h2}>
              Jak stavba probíhá
            </h2>
            <p className={lead}>Od první konzultace k předání haly. V každé fázi společně upřesníme, co bude následovat.</p>
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
            Jak spolupráce probíhá
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className={h2}>Ještě než začneme.</h2>
            <p className={lead}>Nemusíte mít všechno vyřešené. Pro první rozhovor stačí váš záměr.</p>
            <Link href="/kontakt" className={`${link} mt-6 inline-block`}>
              Zeptejte se nás
            </Link>
          </div>
          <div className="lg:col-span-7">
            <Faq items={faq.slice(0, 4)} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
