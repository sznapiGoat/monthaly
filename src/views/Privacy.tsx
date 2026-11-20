import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { company } from "@/lib/data";
import { alternates, pick, type Lang } from "@/lib/i18n";
import { container } from "@/lib/ui";

export const privacyMeta = (lang: Lang): Metadata => ({
  title: pick(lang)("Ochrana osobních údajů", "Ochrana osobných údajov"),
  alternates: alternates(lang, "/ochrana-osobnich-udaju"),
});

export function Privacy({ lang }: { lang: Lang }) {
  const t = pick(lang);
  const sections = t(
    [
      {
        h: "Kdo údaje zpracovává",
        p: `${company.name}, IČ ${company.ico}, ${company.street}, ${company.city}. Kontakt pro dotazy k osobním údajům: ${company.email}.`,
      },
      {
        h: "Jaké údaje a proč",
        p: "Z poptávkového formuláře zpracováváme jméno, případně firmu, e-mail nebo telefon a údaje o plánované hale. Používáme je jen k tomu, abychom vám odpověděli a připravili nabídku. Právním základem je jednání o smlouvě na vaši žádost.",
      },
      {
        h: "Jak dlouho",
        p: "Poptávku uchováváme jen po dobu potřebnou k jejímu vyřízení. Pokud spolupráce vznikne, řídí se uchování smlouvou a zákonnými lhůtami.",
      },
      {
        h: "Komu je předáváme",
        p: "Poptávka se odesílá e-mailem přes zpracovatele, který zajišťuje doručení zpráv, a ukládá se v naší e-mailové schránce. Jiným subjektům údaje nepředáváme.",
      },
      {
        h: "Vaše práva",
        p: "Máte právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování a vznesení námitky. Můžete také podat stížnost u Úřadu pro ochranu osobních údajů.",
      },
      {
        h: "Cookies",
        p: "Nezbytné úložiště v prohlížeči používáme jen k zapamatování vaší volby ohledně cookies. Analytické a reklamní nástroje třetích stran, které měří návštěvnost a účinnost reklamy, se načtou pouze s vaším souhlasem. Volbu můžete kdykoli změnit odkazem Nastavení cookies v patičce webu.",
      },
    ],
    [
      {
        h: "Kto údaje spracúva",
        p: `${company.name}, IČO ${company.ico}, ${company.street}, ${company.city}, Česká republika. Kontakt pre otázky k osobným údajom: ${company.email}.`,
      },
      {
        h: "Aké údaje a prečo",
        p: "Z formulára dopytu spracúvame meno, prípadne firmu, e-mail alebo telefón a údaje o plánovanej hale. Používame ich len na to, aby sme vám odpovedali a pripravili ponuku. Právnym základom je rokovanie o zmluve na vašu žiadosť.",
      },
      {
        h: "Ako dlho",
        p: "Dopyt uchovávame len počas doby potrebnej na jeho vybavenie. Ak spolupráca vznikne, uchovávanie sa riadi zmluvou a zákonnými lehotami.",
      },
      {
        h: "Komu ich odovzdávame",
        p: "Dopyt sa odosiela e-mailom cez spracovateľa, ktorý zabezpečuje doručenie správ, a ukladá sa v našej e-mailovej schránke. Iným subjektom údaje neodovzdávame.",
      },
      {
        h: "Vaše práva",
        p: "Máte právo na prístup k údajom, ich opravu, vymazanie, obmedzenie spracúvania a namietanie. Sťažnosť môžete podať na Úrade na ochranu osobných údajov Slovenskej republiky alebo na českom Úrade pro ochranu osobních údajů.",
      },
      {
        h: "Cookies",
        p: "Nevyhnutné úložisko v prehliadači používame len na zapamätanie vašej voľby týkajúcej sa cookies. Analytické a reklamné nástroje tretích strán, ktoré merajú návštevnosť a účinnosť reklamy, sa načítajú iba s vaším súhlasom. Voľbu môžete kedykoľvek zmeniť odkazom Nastavenie cookies v pätičke webu.",
      },
    ],
  );

  return (
    <>
      <PageIntro
        lang={lang}
        crumbs={[{ label: t("Ochrana osobních údajů", "Ochrana osobných údajov") }]}
        title={t("Vaše údaje a tento web.", "Vaše údaje a tento web.")}
        lead={t("Co se děje s údaji, které vyplníte v poptávce.", "Čo sa deje s údajmi, ktoré vyplníte v dopyte.")}
      />
      <section className="py-16 md:py-24">
        <div className={`${container} max-w-3xl`}>
          {sections.map((s) => (
            <div key={s.h} id={s.h === "Cookies" ? "cookies" : undefined} className="scroll-mt-28 border-b border-line py-8 first:pt-0">
              <h2 className="font-display text-[29px] leading-[1.12] text-ink">{s.h}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-dim">{s.p}</p>
            </div>
          ))}
          <p className="mt-8 text-[14px] text-dim">
            {t(
              "Ukázkové znění pro koncept webu. Před spuštěním je potřeba ho potvrdit podle skutečného nastavení provozu.",
              "Ukážkové znenie pre koncept webu. Pred spustením ho treba potvrdiť podľa skutočného nastavenia prevádzky.",
            )}
          </p>
        </div>
      </section>
    </>
  );
}
