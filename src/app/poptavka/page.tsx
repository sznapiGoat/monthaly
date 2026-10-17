import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuoteForm } from "@/components/QuoteForm";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Nezávazná poptávka montované haly",
  description:
    "Popište svůj záměr ve třech krocích: využití, orientační rozměry a kontakt. Přesnou kalkulaci pošleme do několika dnů podle složitosti haly.",
  alternates: { canonical: "/poptavka" },
};

export default function PoptavkaPage() {
  return (
    <>
      <section className="border-b border-line bg-mist">
        <div className={`${container} pb-12 pt-8 md:pb-16`}>
          <Breadcrumbs items={[{ label: "Nezávazná poptávka" }]} />
          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:items-end">
            <h1 className="font-serif text-[48px] leading-[1] text-ink sm:text-[64px] md:col-span-7 lg:text-[72px]">
              Jakou halu máte v plánu?
            </h1>
            <p className="text-[18px] leading-relaxed text-dim md:col-span-5">
              Tři krátké kroky, rozměry stačí orientační. Přesnou kalkulaci vám pošleme do několika dnů podle složitosti haly.
            </p>
          </div>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className={container}>
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <QuoteForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
