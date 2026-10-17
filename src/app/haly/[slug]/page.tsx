import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RealizationCard } from "@/components/Cards";
import { Gallery } from "@/components/Gallery";
import { getHall, getRealization, halls } from "@/lib/data";
import { btn, container, link } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return halls.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/haly/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const hall = getHall(slug);
  if (!hall) return {};
  return {
    title: `${hall.name} na míru`,
    description: hall.lead,
    alternates: { canonical: `/haly/${hall.slug}` },
    openGraph: { images: [{ url: hall.photos[0].src }] },
  };
}

export default async function HallPage({ params }: PageProps<"/haly/[slug]">) {
  const { slug } = await params;
  const hall = getHall(slug);
  if (!hall) notFound();

  const idx = halls.indexOf(hall);
  const next = halls[(idx + 1) % halls.length];
  const related = hall.related.map((s) => getRealization(s)!).filter(Boolean);
  const [hero, ...more] = hall.photos;

  return (
    <>
      <section className="bg-mist">
        <div className={`${container} pt-8`}>
          <Breadcrumbs items={[{ href: "/haly", label: "Naše haly" }, { label: hall.name }]} />
        </div>
        <div className={`${container} grid gap-10 pb-14 pt-10 md:pb-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pt-14`}>
          <div className="lg:col-span-5">
            <h1 className="font-display text-[40px] leading-[1.04] text-ink sm:text-[50px] lg:text-[54px]">
              {hall.title[0]}
              <br />
              <span className="text-brand">{hall.title[1]}</span>
            </h1>
            <p className="mt-6 text-[18px] leading-relaxed text-dim">{hall.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/poptavka?typ=${hall.slug}`} className={btn.dark}>
                Poptat tuto halu
              </Link>
              <Link href="/kontakt" className={btn.ghost}>
                Chci se poradit
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md lg:col-span-7">
            <Image src={hero.src} alt={hero.alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={container}>
          <h2 className="reveal max-w-2xl font-display text-[34px] leading-[1.05] text-ink sm:text-[44px]">
            Řešení začíná u vašeho provozu.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="reveal border-t-[3px] border-azure pt-8 md:col-span-6">
              <h3 className="font-display text-[30px] leading-tight text-ink sm:text-[36px]">{hall.features[0].title}</h3>
              <p className="mt-4 max-w-[46ch] text-[18px] leading-relaxed text-dim">{hall.features[0].text}</p>
            </div>
            <div className="grid gap-8 md:col-span-6">
              {hall.features.slice(1).map((f) => (
                <div key={f.title} className="reveal border-t border-line pt-6">
                  <h3 className="text-[19px] font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-dim">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal mt-16 flex flex-col gap-4 border-y border-line py-6 md:flex-row md:items-center md:gap-10">
            <p className="shrink-0 text-[14px] font-semibold text-dim">Typické využití</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[17px] text-ink">
              {hall.uses.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className={container}>
          <div className="reveal flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-[34px] leading-[1.05] text-ink sm:text-[40px]">{hall.name} v obrazech</h2>
            <p className="text-[14px] text-dim">Kliknutím fotografii zvětšíte.</p>
          </div>
          <div className="reveal mt-10">
            <Gallery photos={more} layout="two" />
          </div>
          <p className="mt-4 text-[13px] text-dim">Fotografie z nabídky MontHaly. Konkrétní provedení se řídí návrhem a nabídkou.</p>
        </div>
      </section>

      <section className="bg-night text-white">
        <div className={`${container} grid gap-8 py-16 md:grid-cols-12 md:items-center md:py-20`}>
          <div className="md:col-span-8">
            <h2 className="font-display text-[30px] leading-tight sm:text-[36px]">{hall.prompt.title}</h2>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/70">{hall.prompt.text}</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href={`/poptavka?typ=${hall.slug}`} className={btn.primary}>
              Poptat tuto halu
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 md:py-28">
          <div className={container}>
            <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-[34px] leading-[1.05] text-ink sm:text-[40px]">Z praxe</h2>
              <Link href="/realizace" className={link}>
                Všechny realizace
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="reveal">
                  <RealizationCard item={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <nav aria-label="Další typ haly" className={`border-t border-line ${related.length ? "" : "mt-0"}`}>
        <Link href={`/haly/${next.slug}`} className={`${container} group flex items-center justify-between gap-6 py-10`}>
          <span>
            <span className="block text-[14px] text-dim">Další typ haly</span>
            <span className="mt-1 block font-display text-[30px] leading-tight text-ink transition-colors group-hover:text-brand">{next.name}</span>
          </span>
          <span aria-hidden className="h-[2px] w-12 bg-azure transition-all group-hover:w-20" />
        </Link>
      </nav>

    </>
  );
}
