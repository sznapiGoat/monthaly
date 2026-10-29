import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RealizationCard } from "@/components/Cards";
import { Gallery } from "@/components/Gallery";
import { getHall, getRealization, realizations, similarRealizations } from "@/lib/data";
import { btn, container, link } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return realizations.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/realizace/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getRealization(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/realizace/${item.slug}` },
    openGraph: { images: [{ url: item.photos[0].src }] },
  };
}

export default async function RealizationPage({ params }: PageProps<"/realizace/[slug]">) {
  const { slug } = await params;
  const item = getRealization(slug);
  if (!item) notFound();

  const idx = realizations.indexOf(item);
  const next = realizations[(idx + 1) % realizations.length];
  const hall = getHall(item.hallType);
  const query = new URLSearchParams({ typ: item.hallType, realizace: item.title }).toString();

  const specs = [
    { k: "Místo", v: item.country === "SK" ? `${item.place}, Slovensko` : item.place },
    { k: "Využití", v: item.kind },
    ...(item.dimensions ? [{ k: "Rozměry", v: item.dimensions }] : []),
    ...(item.area ? [{ k: "Půdorysná plocha", v: item.area }] : []),
  ];

  return (
    <>
      <section className="bg-mist">
        <div className={`${container} pt-8`}>
          <Breadcrumbs items={[{ href: "/realizace", label: "Realizace" }, { label: item.place }]} />
        </div>
        <div className={`${container} pb-12 pt-10 md:pt-14`}>
          <h1 className="max-w-4xl font-display text-[40px] leading-[1.04] text-ink sm:text-[54px] lg:text-[64px]">{item.title}</h1>
          <dl className="mt-10 grid grid-cols-2 border-t border-ink md:grid-cols-4">
            {specs.map((s) => (
              <div key={s.k} className="border-b border-line py-4 pr-4">
                <dt className="text-[13px] text-dim">{s.k}</dt>
                <dd className="mt-1 text-[18px] font-semibold tabular-nums text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="relative aspect-[16/9] max-h-[78vh] w-full overflow-clip bg-night md:aspect-[21/9]">
          <Image src={item.photos[0].src} alt={item.photos[0].alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
        </div>

        <div className={`${container} mt-16 grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <h2 className="font-display text-[34px] leading-[1.05] text-ink sm:text-[40px]">O realizaci</h2>
            <p className="mt-6 text-[18px] leading-relaxed text-ink">{item.summary}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-dim">
              Uvedené rozměry vycházejí z prezentace realizace. Světlé rozměry, vybavení a rozsah nové dodávky se stanovují pro každý projekt samostatně.
            </p>
            {hall && (
              <p className="mt-6 text-[15px] text-dim">
                Typ haly:{" "}
                <Link href={`/haly/${hall.slug}`} className={link}>
                  {hall.name}
                </Link>
              </p>
            )}
          </div>
          <ul className="self-end border-t border-line lg:col-span-5 lg:col-start-8">
            {item.notes.map((n) => (
              <li key={n} className="border-b border-line py-4 text-[17px] text-ink">
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${container} mt-20`}>
          <h2 className="font-display text-[34px] leading-[1.05] text-ink sm:text-[40px]">Podívejte se blíž</h2>
          <div className="mt-10">
            <Gallery photos={item.photos.slice(1)} layout="two" />
          </div>
        </div>
      </section>

      <section className="bg-night text-white">
        <div className={`${container} grid gap-8 py-16 md:grid-cols-12 md:items-center md:py-20`}>
          <div className="md:col-span-8">
            <h2 className="font-display text-[30px] leading-tight sm:text-[36px]">Podobný prostor pro váš záměr?</h2>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/70">
              Napište nám, co vás na této realizaci zaujalo. Navrhneme řešení pro vaše podmínky.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href={`/poptavka?${query}`} className={btn.primary}>
              Chci podobnou halu
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className={container}>
          <h2 className="font-display text-[34px] leading-[1.05] text-ink sm:text-[40px]">Podobné realizace</h2>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {similarRealizations(item).map((r) => (
              <li key={r.slug}>
                <RealizationCard item={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav aria-label="Další realizace" className="border-y border-line">
        <div className={`${container} flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between`}>
          <Link href="/realizace" className={link}>
            Zpět na všechny realizace
          </Link>
          <Link href={`/realizace/${next.slug}`} className="group flex items-center gap-6 sm:text-right">
            <span>
              <span className="block text-[14px] text-dim">Další realizace</span>
              <span className="mt-1 block font-display text-[26px] leading-tight text-ink transition-colors group-hover:text-brand">{next.place}</span>
            </span>
            <span aria-hidden className="h-[2px] w-12 bg-azure transition-all group-hover:w-20" />
          </Link>
        </div>
      </nav>
    </>
  );
}
