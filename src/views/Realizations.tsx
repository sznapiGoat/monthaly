import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { RealizationsGrid } from "@/components/FilterGrid";
import { PageIntro } from "@/components/PageIntro";
import { getContent } from "@/lib/content";
import { alternates, locales, pick, type Lang } from "@/lib/i18n";
import { container } from "@/lib/ui";

export const realizationsMeta = (lang: Lang): Metadata => {
  const t = pick(lang);
  return {
    title: t("Realizace montovaných hal", "Realizácie montovaných hál"),
    description: t(
      "Skladové, sportovní i víceúčelové montované haly, které už stojí. Rozměry, plocha a fotografie ze stavby i hotových hal.",
      "Skladové, športové aj viacúčelové montované haly, ktoré už stoja. Rozmery, plocha a fotografie zo stavby aj hotových hál.",
    ),
    alternates: alternates(lang, "/realizace"),
  };
};

export function Realizations({ lang }: { lang: Lang }) {
  const t = pick(lang);
  const { realizations, realizationCategories } = getContent(lang);
  const bySize = [...realizations].sort((a, b) => a.areaM2 - b.areaM2);
  const smallest = bySize[0];
  const largest = bySize[bySize.length - 1];
  const fmt = (n: number) => n.toLocaleString(locales[lang]);
  const pair = largest.slug === "skladove-haly-mosnov";

  return (
    <>
      <PageIntro
        lang={lang}
        crumbs={[{ label: t("Realizace", "Realizácie") }]}
        title={t("Podívejte se, co už stojí.", "Pozrite sa, čo už stojí.")}
        lead={t(
          `${realizations.length} realizací v Česku i na Slovensku, od kompaktní haly ${fmt(smallest.areaM2)} m² po ${pair ? "dvojici skladových hal" : "halu"} s ${fmt(largest.areaM2)} m². U každé najdete rozměry, plochu a fotografie.`,
          `${realizations.length} realizácií v Česku aj na Slovensku, od kompaktnej haly ${fmt(smallest.areaM2)} m² po ${pair ? "dvojicu skladových hál" : "halu"} s ${fmt(largest.areaM2)} m². Pri každej nájdete rozmery, plochu a fotografie.`,
        )}
      />
      <section className="py-14 md:py-20">
        <div className={container}>
          <RealizationsGrid lang={lang} realizations={realizations} categories={realizationCategories} />
        </div>
      </section>
      <CtaBand
        lang={lang}
        title={t("Podobný prostor pro vás?", "Podobný priestor pre vás?")}
        text={t(
          "Napište, která realizace se vám líbí a co potřebujete vy. Navrhneme řešení pro vaše místo a provoz.",
          "Napíšte, ktorá realizácia sa vám páči a čo potrebujete vy. Navrhneme riešenie pre vaše miesto a prevádzku.",
        )}
      />
    </>
  );
}
