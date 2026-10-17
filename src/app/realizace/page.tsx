import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { RealizationsGrid } from "@/components/FilterGrid";
import { PageIntro } from "@/components/PageIntro";
import { container } from "@/lib/ui";

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
        lead="Skladovací prostory, sportoviště i víceúčelové haly. U každé realizace najdete rozměry, plochu a fotografie."
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
