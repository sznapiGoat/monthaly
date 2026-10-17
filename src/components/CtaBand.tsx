import Link from "next/link";
import { company } from "@/lib/data";
import { btn, container } from "@/lib/ui";

export function CtaBand({
  title = (
    <>
      Dejme vašim plánům <span className="text-white/55">prostor.</span>
    </>
  ),
  text = "Řekněte nám, co potřebujete zastřešit. Pro první rozhovor stačí váš záměr, rozměry vyřešíme společně.",
  href = "/poptavka",
  cta = "Nezávazná poptávka",
}: {
  title?: React.ReactNode;
  text?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section className="bg-deep text-white">
      <div className={`${container} grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-24`}>
        <h2 className="reveal font-display text-[38px] leading-[1.02] sm:text-[50px] md:col-span-7 lg:text-[60px]">{title}</h2>
        <div className="reveal md:col-span-5 md:pb-2">
          <p className="max-w-md text-[17px] leading-relaxed text-white/75">{text}</p>
          <div className="mt-8 flex flex-col items-start gap-2">
            <Link href={href} className={`${btn.primary} whitespace-nowrap`}>
              {cta}
            </Link>
            <a href={`tel:${company.phone}`} className="py-2 text-[16px] font-semibold tabular-nums text-white/85 hover:text-white">
              nebo volejte {company.phoneIntl}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
