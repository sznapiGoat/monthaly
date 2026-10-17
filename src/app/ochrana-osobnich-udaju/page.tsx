import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/data";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  alternates: { canonical: "/ochrana-osobnich-udaju" },
};

const sections = [
  {
    h: "Kdo údaje zpracovává",
    p: `${company.name}, IČ ${company.ico}, ${company.street}, ${company.city}. Kontakt pro dotazy k osobním údajům: ${company.email}.`,
  },
  {
    h: "Jaké údaje a proč",
    p: "Z poptávkového formuláře zpracováváme jméno, případně firmu, e-mail nebo telefon a údaje o plánované hale. Používáme je jen k tomu, abychom vám odpověděli a připravili nabídku. Právním základem je jednání o smlouvě na vaši žádost.",
  },
  {
    h: "Jak dlouho",
    p: "Poptávku uchováváme jen po dobu potřebnou k jejímu vyřízení. Pokud spolupráce vznikne, řídí se uchování smlouvou a zákonnými lhůtami.",
  },
  {
    h: "Komu je předáváme",
    p: "Poptávka se odesílá e-mailem přes zpracovatele, který zajišťuje doručení zpráv, a ukládá se v naší e-mailové schránce. Jiným subjektům údaje nepředáváme.",
  },
  {
    h: "Vaše práva",
    p: "Máte právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování a vznesení námitky. Můžete také podat stížnost u Úřadu pro ochranu osobních údajů.",
  },
  {
    h: "Cookies",
    p: "Tato ukázková verze nepoužívá analytické ani reklamní cookies. Před jejich zapnutím na ostrém webu se zobrazí lišta se souhlasem a tato informace se doplní.",
  },
];

export default function OchranaPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: "Ochrana osobních údajů" }]}
        title="Vaše údaje a tento web."
        lead="Co se děje s údaji, které vyplníte v poptávce."
      />
      <section className="py-16 md:py-24">
        <div className={`${container} max-w-3xl`}>
          {sections.map((s) => (
            <div key={s.h} className="border-b border-line py-8 first:pt-0">
              <h2 className="font-display text-[26px] leading-tight text-ink">{s.h}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-dim">{s.p}</p>
            </div>
          ))}
          <p className="mt-8 text-[14px] text-dim">
            Ukázkové znění pro koncept webu. Před spuštěním je potřeba ho potvrdit podle skutečného nastavení provozu.
          </p>
        </div>
      </section>
    </>
  );
}
