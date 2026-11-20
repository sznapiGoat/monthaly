import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { RealizationMap } from "@/components/RealizationMap";
import { company, contacts, rental, sales } from "@/lib/data";
import { btn, container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Prodej montovaných hal na míru: Roman Chalupka, +420 727 882 623, info@mont-haly.cz. MontHaly s.r.o., Pavlovská 21, Brno.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  const team = contacts.filter((c) => c.kind === "team");

  return (
    <>
      <PageIntro
        crumbs={[{ label: "Kontakt" }]}
        title="Promluvme si o vaší hale."
        lead="Ozvěte se přímo. Pro první rozhovor nepotřebujete hotový projekt."
      />

      <section className="py-20 md:py-24">
        <div className={container}>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="text-[15px] font-semibold text-link">{sales.role}</p>
              <h2 className="mt-2 font-display text-[42px] leading-[1.05] text-ink sm:text-[54px]">{sales.name}</h2>
              <a href={`tel:${sales.phone}`} className="mt-6 block text-[30px] font-semibold tabular-nums text-ink hover:text-brand sm:text-[34px]">
                {sales.phoneLabel}
              </a>
              <a href={`mailto:${company.email}`} className="mt-1 block text-[18px] text-dim hover:text-brand">
                {company.email}
              </a>
            </div>
            <p className="text-[14px] leading-relaxed text-dim md:col-span-5 md:border-l md:border-line md:pl-8">
              Halu potřebujete jen na čas? Pronájem:{" "}
              <span className="whitespace-nowrap text-ink">{rental.name}</span>,{" "}
              <a href={`tel:${rental.phone}`} className="whitespace-nowrap tabular-nums text-ink hover:text-brand">
                {rental.phoneLabel}
              </a>
            </p>
          </div>

          <table className="mt-20 w-full text-left text-[16px]">
            <caption className="mb-4 text-left font-display text-[29px] text-ink">Projekce a kancelář</caption>
            <tbody className="border-t border-ink">
              {team.map((c) => (
                <tr key={c.name} className="border-b border-line">
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    {c.name}
                  </th>
                  <td className="hidden py-4 pr-4 text-dim sm:table-cell">{c.role}</td>
                  <td className="py-4 text-right">
                    <a href={`tel:${c.phone}`} className="tabular-nums text-ink hover:text-brand">
                      {c.phoneLabel}
                    </a>
                    <span className="block text-[13px] text-dim sm:hidden">{c.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <h2 className="font-display text-[38px] leading-[1.12] text-ink sm:text-[45px]">Kde už naše haly stojí.</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-dim">
              Stavíme po celém Česku i na Slovensku, ze sídla v Brně. Kliknutím na místo otevřete detail realizace.
            </p>
            <Link href="/realizace" className="mt-6 inline-block text-[15px] font-semibold text-link underline decoration-link/30 underline-offset-4 hover:decoration-link">
              Všechny realizace
            </Link>
          </div>
          <div className="lg:col-span-8">
            <RealizationMap />
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className={`${container} grid gap-12 py-20 md:py-24 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <h2 className="font-display text-[38px] leading-[1.12] text-ink sm:text-[45px]">{company.name}</h2>
            <dl className="mt-8 grid gap-x-8 gap-y-6 text-[16px] sm:grid-cols-2">
              <div>
                <dt className="text-[13px] text-dim">Sídlo</dt>
                <dd className="mt-1 text-ink">
                  {company.street}
                  <br />
                  {company.city}, {company.country}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Pavlovsk%C3%A1+21%2C+623+00+Brno"
                    className="mt-2 block text-[15px] font-semibold text-link underline decoration-link/30 underline-offset-4 hover:decoration-link"
                  >
                    Otevřít v mapách
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-dim">IČ / DIČ</dt>
                <dd className="mt-1 tabular-nums text-ink">
                  {company.ico} / {company.dic}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-dim">Obchodní rejstřík</dt>
                <dd className="mt-1 text-ink">{company.register}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-dim">Datová schránka</dt>
                <dd className="mt-1 text-ink">{company.dataBox}</dd>
              </div>
            </dl>
          </div>
          <div className="border-t-[3px] border-azure pt-8 lg:col-span-5 lg:col-start-8">
            <h2 className="font-display text-[33px] leading-[1.12] text-ink">Raději všechno sepíšete?</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-dim">
              Poptávka vás provede třemi kroky: využití, orientační rozměry a kontakt. Na jejím základě připravíme kalkulaci.
            </p>
            <Link href="/poptavka" className={`${btn.primary} mt-8`}>
              Nezávazná poptávka
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
