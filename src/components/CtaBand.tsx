import Link from "next/link";
import { company } from "@/lib/data";
import { localize, pick, type Lang } from "@/lib/i18n";
import { btn, container } from "@/lib/ui";

export function CtaBand({
  lang,
  title,
  text,
  href = "/poptavka",
  cta,
}: {
  lang: Lang;
  title?: React.ReactNode;
  text?: string;
  href?: string;
  cta?: string;
}) {
  const t = pick(lang);
  title ??= t("Pošlete nám svůj záměr.", "Pošlite nám svoj zámer.");
  text ??= t(
    "Řekněte nám, co potřebujete zastřešit. Pro první rozhovor stačí váš záměr, rozměry vyřešíme společně.",
    "Povedzte nám, čo potrebujete zastrešiť. Na prvý rozhovor stačí váš zámer, rozmery vyriešime spoločne.",
  );
  cta ??= t("Nezávazná poptávka", "Nezáväzný dopyt");
  // Plná světle modrá z logomanuálu s tmavým textem (bílý by měl kontrast jen 2,4 : 1).
  return (
    <section className="bg-azure text-night">
      <div className={`${container} grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-24`}>
        <h2 className="font-display text-[42px] leading-[0.92] sm:text-[56px] md:col-span-7 lg:text-[67px]">{title}</h2>
        <div className="md:col-span-5 md:pb-2">
          <p className="max-w-md text-[17px] leading-relaxed text-night/80">{text}</p>
          <div className="mt-8 flex flex-col items-start gap-2">
            <Link href={localize(lang, href)} className={`${btn.dark} whitespace-nowrap`}>
              {cta}
            </Link>
            <a href={`tel:${company.phone}`} className="py-2 text-[16px] font-semibold tabular-nums text-night/85 hover:text-night">
              {t("nebo volejte", "alebo volajte")} {company.phoneIntl}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
