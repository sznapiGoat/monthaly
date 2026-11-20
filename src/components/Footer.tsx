import { Img } from "@/components/Img";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { getContent } from "@/lib/content";
import { localize, pick, type Lang } from "@/lib/i18n";
import { container } from "@/lib/ui";

const heading = "text-[16px] font-semibold text-white";

export function Footer({ lang }: { lang: Lang }) {
  const t = pick(lang);
  const l = (href: string) => localize(lang, href);
  const { company, hallGroups, halls, sales } = getContent(lang);

  return (
    <footer className="bg-night text-white/75">
      <div className={`${container} grid gap-12 py-16 md:grid-cols-12 md:py-20`}>
        <div className="md:col-span-4">
          <Link href={l("/")} aria-label={t("MontHaly, úvodní stránka", "MontHaly, úvodná stránka")} className="inline-block">
            <Img src="/logo-light.svg" alt="MontHaly s.r.o." width={192} height={40} className="h-10 w-auto" />
          </Link>
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed">
            {t("Montované haly na míru od prvního návrhu po montáž.", "Montované haly na mieru od prvého návrhu po montáž.")}
          </p>
          <address className="mt-6 text-[14px] not-italic leading-relaxed text-white/60">
            {company.name}
            <br />
            {company.street}, {company.city}
            <br />
            {t("IČ", "IČO")} {company.ico} · DIČ {company.dic}
          </address>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{t("Naše haly", "Naše haly")}</h2>
          <ul className="mt-5 space-y-2.5 text-[15px]">
            {hallGroups.flatMap((g) => halls.filter((h) => h.group === g.id)).map((h) => (
              <li key={h.slug}>
                <Link href={l(`/haly/${h.slug}`)} className="hover:text-white">
                  {h.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className={heading}>MontHaly</h2>
          <ul className="mt-5 space-y-2.5 text-[15px]">
            <li>
              <Link href={l("/realizace")} className="hover:text-white">{t("Realizace", "Realizácie")}</Link>
            </li>
            <li>
              <Link href={l("/jak-pracujeme")} className="hover:text-white">{t("Jak pracujeme", "Ako pracujeme")}</Link>
            </li>
            <li>
              <Link href={l("/kontakt")} className="hover:text-white">Kontakt</Link>
            </li>
            <li>
              <Link href={l("/poptavka")} className="hover:text-white">{t("Nezávazná poptávka", "Nezáväzný dopyt")}</Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{t("Jsme vám k dispozici", "Sme vám k dispozícii")}</h2>
          <a
            href={`tel:${company.phone}`}
            className="mt-5 block font-display text-[29px] leading-[0.9] tabular-nums text-white hover:text-azure-soft"
          >
            {company.phoneIntl}
          </a>
          <a href={`mailto:${company.email}`} className="mt-3 block text-[15px] hover:text-white">
            {company.email}
          </a>
          <p className="mt-1 text-[14px] text-white/55">
            {sales.name}, {sales.role.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className={`${container} flex flex-col gap-3 py-6 text-[14px] text-white/60 sm:flex-row sm:items-center sm:justify-between`}>
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={l("/ochrana-osobnich-udaju")} className="hover:text-white">
              {t("Ochrana osobních údajů", "Ochrana osobných údajov")}
            </Link>
            <Link href={l("/mimosoudni-reseni-spotrebitelskych-sporu")} className="hover:text-white">
              {t("Spotřebitelské spory", "Spotrebiteľské spory")}
            </Link>
            <CookieSettingsButton className="text-left hover:text-white" label={t("Nastavení cookies", "Nastavenie cookies")} />
            <span>{t("Ukázková verze webu", "Ukážková verzia webu")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
