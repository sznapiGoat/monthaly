import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Mimosoudní řešení spotřebitelských sporů",
  alternates: { canonical: "/mimosoudni-reseni-spotrebitelskych-sporu" },
};

export default function AdrPage() {
  return (
    <>
      <PageIntro crumbs={[{ label: "Spotřebitelské spory" }]} title="Mimosoudní řešení spotřebitelských sporů." />
      <section className="py-16 md:py-24">
        <div className={`${container} max-w-3xl text-[17px] leading-relaxed text-dim`}>
          <p>
            V případě, že dojde mezi námi a spotřebitelem ke vzniku spotřebitelského sporu z kupní smlouvy nebo ze smlouvy o poskytování
            služeb, který se nepodaří vyřešit vzájemnou dohodou, může spotřebitel podat návrh na mimosoudní řešení takového sporu určenému
            subjektu mimosoudního řešení spotřebitelských sporů, kterým je:
          </p>
          <address className="mt-8 border-l-[3px] border-azure pl-5 not-italic text-ink">
            Česká obchodní inspekce
            <br />
            Ústřední inspektorát, oddělení ADR
            <br />
            Gorazdova 1969/24
            <br />
            120 00 Praha 2
            <br />
            <a href="https://adr.coi.cz" className="font-semibold text-link underline underline-offset-4">
              adr.coi.cz
            </a>
          </address>
        </div>
      </section>
    </>
  );
}
