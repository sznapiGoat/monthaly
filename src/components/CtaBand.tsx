import Link from "next/link";
import { company } from "@/lib/data";
import { btn, container } from "@/lib/ui";

export function CtaBand({
  title = "Pošlete nám svůj záměr.",
  text = "Řekněte nám, co potřebujete zastřešit. Pro první rozhovor stačí váš záměr, rozměry vyřešíme společně.",
  href = "/poptavka",
  cta = "Nezávazná poptávka",
}: {
  title?: React.ReactNode;
  text?: string;
  href?: string;
  cta?: string;
}) {
  // Plná světle modrá z logomanuálu s tmavým textem (bílý by měl kontrast jen 2,4 : 1).
  return (
    <section className="bg-azure text-night">
      <div className={`${container} grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-24`}>
        <h2 className="font-display text-[42px] leading-[0.92] sm:text-[56px] md:col-span-7 lg:text-[67px]">{title}</h2>
        <div className="md:col-span-5 md:pb-2">
          <p className="max-w-md text-[17px] leading-relaxed text-night/80">{text}</p>
          <div className="mt-8 flex flex-col items-start gap-2">
            <Link href={href} className={`${btn.dark} whitespace-nowrap`}>
              {cta}
            </Link>
            <a href={`tel:${company.phone}`} className="py-2 text-[16px] font-semibold tabular-nums text-night/85 hover:text-night">
              nebo volejte {company.phoneIntl}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
