import Link from "next/link";
import { localize, pick, type Lang } from "@/lib/i18n";
import { btn, container } from "@/lib/ui";

export function NotFound({ lang }: { lang: Lang }) {
  const t = pick(lang);
  return (
    <section className={`${container} flex min-h-[60vh] flex-col justify-center py-24`}>
      <p className="text-[15px] font-semibold text-link">{t("Chyba 404", "Chyba 404")}</p>
      <h1 className="mt-3 max-w-3xl font-display text-[49px] leading-[0.93] text-ink sm:text-[67px]">
        {t("Tahle stránka tu nestojí.", "Táto stránka tu nestojí.")}
      </h1>
      <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-dim">
        {t(
          "Možná se přesunula při přechodu na nový web. Zkuste přehled hal nebo realizací.",
          "Možno sa presunula pri prechode na nový web. Skúste prehľad hál alebo realizácií.",
        )}
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href={localize(lang, "/haly")} className={btn.dark}>
          {t("Naše haly", "Naše haly")}
        </Link>
        <Link href={localize(lang, "/realizace")} className={btn.ghost}>
          {t("Realizace", "Realizácie")}
        </Link>
      </div>
    </section>
  );
}
