import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { alternates, pick, type Lang } from "@/lib/i18n";
import { container } from "@/lib/ui";

export const adrMeta = (lang: Lang): Metadata => ({
  title: pick(lang)("Mimosoudní řešení spotřebitelských sporů", "Alternatívne riešenie spotrebiteľských sporov"),
  alternates: alternates(lang, "/mimosoudni-reseni-spotrebitelskych-sporu"),
});

export function Adr({ lang }: { lang: Lang }) {
  const t = pick(lang);
  return (
    <>
      <PageIntro
        lang={lang}
        crumbs={[{ label: t("Spotřebitelské spory", "Spotrebiteľské spory") }]}
        title={t("Mimosoudní řešení spotřebitelských sporů.", "Alternatívne riešenie spotrebiteľských sporov.")}
      />
      <section className="py-16 md:py-24">
        <div className={`${container} max-w-3xl text-[17px] leading-relaxed text-dim`}>
          <p>
            {t(
              "V případě, že dojde mezi námi a spotřebitelem ke vzniku spotřebitelského sporu z kupní smlouvy nebo ze smlouvy o poskytování služeb, který se nepodaří vyřešit vzájemnou dohodou, může spotřebitel podat návrh na mimosoudní řešení takového sporu určenému subjektu mimosoudního řešení spotřebitelských sporů, kterým je:",
              "Ak medzi nami a spotrebiteľom vznikne spotrebiteľský spor z kúpnej zmluvy alebo zo zmluvy o poskytovaní služieb, ktorý sa nepodarí vyriešiť vzájomnou dohodou, môže spotrebiteľ podať návrh na alternatívne riešenie takého sporu určenému subjektu, ktorým je:",
            )}
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
          {lang === "sk" && (
            <p className="mt-8">
              Spotrebiteľ zo Slovenska môže využiť aj európsku platformu na riešenie sporov online alebo sa obrátiť na Európske spotrebiteľské centrum.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
