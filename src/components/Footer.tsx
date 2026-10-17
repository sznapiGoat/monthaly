import Image from "next/image";
import Link from "next/link";
import { company, halls } from "@/lib/data";
import { container } from "@/lib/ui";

const heading = "text-[13px] font-semibold uppercase tracking-[0.12em] text-white";

export function Footer() {
  return (
    <footer className="bg-night text-white/75">
      <div className={`${container} grid gap-12 py-16 md:grid-cols-12 md:py-20`}>
        <div className="md:col-span-4">
          <Link href="/" aria-label="MontHaly, úvodní stránka" className="inline-block">
            <Image src="/logo-light.svg" alt="MontHaly s.r.o." width={192} height={40} className="h-10 w-auto" />
          </Link>
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed">
            Montované haly na míru. Od prvního návrhu po montáž. Prodej, pronájem a projektování.
          </p>
          <address className="mt-6 text-[14px] not-italic leading-relaxed text-white/60">
            {company.name}
            <br />
            {company.street}, {company.city}
            <br />
            IČ {company.ico} · DIČ {company.dic}
          </address>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>Naše haly</h2>
          <ul className="mt-5 space-y-2.5 text-[15px]">
            {halls.map((h) => (
              <li key={h.slug}>
                <Link href={`/haly/${h.slug}`} className="hover:text-white">
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
              <Link href="/realizace" className="hover:text-white">Realizace</Link>
            </li>
            <li>
              <Link href="/jak-pracujeme" className="hover:text-white">Jak pracujeme</Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-white">Kontakt</Link>
            </li>
            <li>
              <Link href="/poptavka" className="hover:text-white">Nezávazná poptávka</Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>Jsme vám k dispozici</h2>
          <a
            href={`tel:${company.phone}`}
            className="mt-5 block font-display text-[26px] leading-none tabular-nums text-white hover:text-azure-soft"
          >
            {company.phoneIntl}
          </a>
          <a href={`mailto:${company.email}`} className="mt-3 block text-[15px] hover:text-white">
            {company.email}
          </a>
          <p className="mt-1 text-[14px] text-white/55">Roman Chalupka, prodej hal</p>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className={`${container} flex flex-col gap-3 py-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between`}>
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/ochrana-osobnich-udaju" className="hover:text-white">
              Ochrana osobních údajů
            </Link>
            <Link href="/mimosoudni-reseni-spotrebitelskych-sporu" className="hover:text-white">
              Spotřebitelské spory
            </Link>
            <span>Ukázková verze webu</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
