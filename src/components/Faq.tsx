import { faq } from "@/lib/data";

export function Faq({ items = faq }: { items?: typeof faq }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-[17px] font-semibold text-ink transition-colors hover:text-brand">
            <span>{f.q}</span>
            <span
              aria-hidden
              className="relative mt-1.5 block h-3.5 w-3.5 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-[2px] before:w-full before:-translate-y-1/2 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-full after:w-[2px] after:-translate-x-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <p className="max-w-2xl pb-6 pr-10 text-[16px] leading-relaxed text-dim">{f.a}</p>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
