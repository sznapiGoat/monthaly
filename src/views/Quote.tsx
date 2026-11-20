import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuoteForm } from "@/components/QuoteForm";
import { getContent } from "@/lib/content";
import { alternates, pick, type Lang } from "@/lib/i18n";
import { container } from "@/lib/ui";

export const quoteMeta = (lang: Lang): Metadata => {
  const t = pick(lang);
  return {
    title: t("Nezávazná poptávka montované haly", "Nezáväzný dopyt na montovanú halu"),
    description: t(
      "Popište svůj záměr ve třech krocích: využití, orientační rozměry a kontakt. Přesnou kalkulaci pošleme do několika dnů podle složitosti haly.",
      "Opíšte svoj zámer v troch krokoch: využitie, orientačné rozmery a kontakt. Presnú kalkuláciu pošleme do niekoľkých dní podľa zložitosti haly.",
    ),
    alternates: alternates(lang, "/poptavka"),
  };
};

export function Quote({ lang }: { lang: Lang }) {
  const t = pick(lang);
  const { halls } = getContent(lang);

  return (
    <>
      <section className="border-b border-line bg-mist">
        <div className={`${container} pb-12 pt-8 md:pb-16`}>
          <Breadcrumbs lang={lang} items={[{ label: t("Nezávazná poptávka", "Nezáväzný dopyt") }]} />
          <div className="mt-10 md:mt-14">
            <h1 className="font-display text-[45px] leading-[0.93] text-ink sm:text-[60px] lg:text-[67px]">
              {t("Jakou halu máte v plánu?", "Akú halu máte v pláne?")}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[18px] leading-relaxed text-dim">
              {t(
                "Nemusíte znát přesné rozměry. Napište, co má být uvnitř. Tři krátké kroky a přesnou kalkulaci vám pošleme do několika dnů.",
                "Nemusíte poznať presné rozmery. Napíšte, čo má byť vnútri. Tri krátke kroky a presnú kalkuláciu vám pošleme do niekoľkých dní.",
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className={container}>
          {/* Jen názvy hal, celý obsah webu do prohlížeče nepatří. */}
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <QuoteForm lang={lang} halls={halls.map(({ slug, name }) => ({ slug, name }))} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
