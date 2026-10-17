import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { RealizationsGrid } from "@/components/FilterGrid";
import { PageIntro } from "@/components/PageIntro";
import { realizations } from "@/lib/data";
import { container } from "@/lib/ui";

const bySize = [...realizations].sort((a, b) => a.areaM2 - b.areaM2);
const smallest = bySize[0];
const largest = bySize[bySize.length - 1];
const fmt = (n: number) => n.toLocaleString("cs-CZ");

export const metadata: Metadata = {
  title: "Realizace montovaných hal",
  description:
    "Skladové, sportovní i víceúčelové montované haly, které už stojí. Rozměry, plocha a fotografie ze stavby i hotových hal.",
  alternates: { canonical: "/realizace" },
};

export default function RealizacePage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Realizace" }]}
        title="Podívejte se, co už stojí."
        lead={`${realizations.length} realizací v Česku i na Slovensku, od kompaktní haly ${fmt(smallest.areaM2)} m² po ${largest.slug === "skladove-haly-mosnov" ? "dvojici skladových hal" : "halu"} s ${fmt(largest.areaM2)} m². U každé najdete rozměry, plochu a fotografie.`}
      />
      <section className="py-14 md:py-20">
        <div className={container}>
          <RealizationsGrid />
        </div>
      </section>
      <CtaBand
        title={
          <>
            Podobný prostor <span className="text-white/55">pro vás?</span>
          </>
        }
        text="Napište, která realizace se vám líbí a co potřebujete vy. Navrhneme řešení pro vaše místo a provoz."
      />
    </>
  );
}
