import type { Metadata } from "next";
import { Img } from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RealizationCard } from "@/components/Cards";
import { Faq } from "@/components/Faq";
import { Gallery } from "@/components/Gallery";
import { getContent } from "@/lib/content";
import { halls } from "@/lib/data";
import { alternates, localize, pick, type Lang } from "@/lib/i18n";
import { btn, container, link } from "@/lib/ui";

export const hallParams = () => halls.map((h) => ({ slug: h.slug }));

export const hallMeta = (lang: Lang, slug: string): Metadata => {
  const hall = getContent(lang).getHall(slug);
  if (!hall) return {};
  return {
    title: `${hall.name} ${pick(lang)("na míru", "na mieru")}`,
    description: hall.lead,
    alternates: alternates(lang, `/haly/${hall.slug}`),
    openGraph: { images: [{ url: hall.photos[0].src }] },
  };
};

export function Hall({ lang, slug }: { lang: Lang; slug: string }) {
  const t = pick(lang);
  const l = (href: string) => localize(lang, href);
  const { faq, getHall, getRealization, halls } = getContent(lang);
  const hall = getHall(slug);
  if (!hall) notFound();

  const idx = halls.indexOf(hall);
  const next = halls[(idx + 1) % halls.length];
  const related = hall.related.map((s) => getRealization(s)!).filter(Boolean);
  const [hero, ...more] = hall.photos;

  return (
    <>
      <section className="bg-mist">
        <div className={`${container} pt-8`}>
          <Breadcrumbs lang={lang} items={[{ href: "/haly", label: t("Naše haly", "Naše haly") }, { label: hall.name }]} />
        </div>
        <div className={`${container} grid gap-10 pb-14 pt-10 md:pb-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pt-14`}>
          <div className="lg:col-span-5">
            <h1 className="font-display text-[45px] leading-[0.93] text-ink sm:text-[56px] lg:text-[60px]">{hall.name}</h1>
            <p className="mt-3 font-display text-[25px] leading-[1.23] text-ink sm:text-[29px]">{hall.tagline}</p>
            <p className="mt-6 text-[18px] leading-relaxed text-dim">{hall.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={l(`/poptavka?typ=${hall.slug}`)} className={btn.primary}>
                {t("Poptat tuto halu", "Dopytovať túto halu")}
              </Link>
              <Link href={l("/kontakt")} className={btn.ghost}>
                {t("Chci se poradit", "Chcem sa poradiť")}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-clip rounded-md lg:col-span-7">
            <Img src={hero.src} alt={hero.alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={container}>
          <h2 className="max-w-2xl font-display text-[38px] leading-[0.94] text-ink sm:text-[49px]">
            {t("Řešení začíná u vašeho provozu.", "Riešenie začína pri vašej prevádzke.")}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="border-t-[3px] border-azure pt-8 md:col-span-6">
              <h3 className="font-display text-[33px] leading-[1.12] text-ink sm:text-[40px]">{hall.features[0].title}</h3>
              <p className="mt-4 max-w-[46ch] text-[18px] leading-relaxed text-dim">{hall.features[0].text}</p>
            </div>
            <div className="grid gap-8 md:col-span-6">
              {hall.features.slice(1).map((f) => (
                <div key={f.title} className="border-t border-line pt-6">
                  <h3 className="text-[19px] font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-dim">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-y border-line py-6 md:flex-row md:items-center md:gap-10">
            <p className="shrink-0 text-[14px] font-semibold text-dim">{t("Typické využití", "Typické využitie")}</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[17px] text-ink">
              {hall.uses.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className={container}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-[38px] leading-[0.94] text-ink sm:text-[45px]">
              {hall.name} {t("v obrazech", "v obrazoch")}
            </h2>
            <p className="text-[14px] text-dim">{t("Kliknutím fotografii zvětšíte.", "Kliknutím fotografiu zväčšíte.")}</p>
          </div>
          <div className="mt-10">
            <Gallery lang={lang} photos={more} layout="two" />
          </div>
          <p className="mt-4 text-[13px] text-dim">
            {t(
              "Fotografie z nabídky MontHaly. Konkrétní provedení se řídí návrhem a nabídkou.",
              "Fotografie z ponuky MontHaly. Konkrétne prevedenie sa riadi návrhom a ponukou.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-night text-white">
        <div className={`${container} grid gap-8 py-16 md:grid-cols-12 md:items-center md:py-20`}>
          <div className="md:col-span-8">
            <h2 className="font-display text-[33px] leading-[1.12] sm:text-[40px]">{hall.prompt.title}</h2>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/70">{hall.prompt.text}</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href={l(`/poptavka?typ=${hall.slug}`)} className={btn.primary}>
              {t("Poptat tuto halu", "Dopytovať túto halu")}
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 md:py-28">
          <div className={container}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-[38px] leading-[0.94] text-ink sm:text-[45px]">{t("Z praxe", "Z praxe")}</h2>
              <Link href={l("/realizace")} className={link}>
                {t("Všechny realizace", "Všetky realizácie")}
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <RealizationCard lang={lang} item={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={`py-20 md:py-28 ${related.length ? "bg-mist" : ""}`}>
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[38px] leading-[0.94] text-ink sm:text-[45px]">{t("Časté otázky", "Časté otázky")}</h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-dim">
              {t("Na co se zákazníci ptají, než pošlou poptávku.", "Na čo sa zákazníci pýtajú, než pošlú dopyt.")}
            </p>
          </div>
          <div className="lg:col-span-7">
            <Faq items={[0, 2, 3, 4, 6].map((i) => faq[i])} />
          </div>
        </div>
      </section>

      <nav aria-label={t("Další typ haly", "Ďalší typ haly")} className="border-t border-line">
        <Link href={l(`/haly/${next.slug}`)} className={`${container} group flex items-center justify-between gap-6 py-10`}>
          <span>
            <span className="block text-[14px] text-dim">{t("Další typ haly", "Ďalší typ haly")}</span>
            <span className="mt-1 block font-display text-[33px] leading-[1.12] text-ink transition-colors group-hover:text-brand">{next.name}</span>
          </span>
          <span aria-hidden className="h-[2px] w-12 bg-azure transition-all group-hover:w-20" />
        </Link>
      </nav>
    </>
  );
}
