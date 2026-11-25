import { Img } from "@/components/Img";
import Link from "next/link";
import type { Hall, Realization } from "@/lib/data";
import { localize, type Lang } from "@/lib/i18n";

// stretch: na lg fotka vyplní výšku buňky mřížky (velká karta vedle sloupce menších).
export function RealizationCard({
  lang,
  item,
  sizes,
  eager,
  stretch,
  ratio = "aspect-[4/3]",
}: {
  lang: Lang;
  item: Realization;
  sizes?: string;
  eager?: boolean;
  stretch?: boolean;
  ratio?: string;
}) {
  return (
    <Link href={localize(lang, `/realizace/${item.slug}`)} className={`group ${stretch ? "flex h-full flex-col" : "block"}`}>
      <div className={`sd-reveal relative overflow-clip rounded-md bg-mist ${ratio} ${stretch ? "lg:aspect-auto lg:min-h-0 lg:flex-1" : ""}`}>
        <Img
          src={item.photos[0].src}
          alt={item.photos[0].alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes={sizes ?? "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
        <span className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-inset ring-azure transition-[box-shadow] group-hover:ring-4" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[27px] leading-[1.12] text-ink transition-colors group-hover:text-brand">{item.place}
          {item.country === "SK" && <span className="ml-2 text-[14px] font-medium text-dim">SK</span>}
        </h3>
        {item.area && <span className="shrink-0 text-[14px] font-semibold tabular-nums text-ink">{item.area}</span>}
      </div>
      <p className="mt-1 text-[15px] text-dim">
        {item.kind}
        {item.dimensions ? ` · ${item.dimensions}` : item.notes[0] ? ` · ${item.notes[0]}` : ""}
      </p>
    </Link>
  );
}

// wide: jediná hala ve skupině rozcestníku, přes celou šířku.
export function HallCard({ lang, hall, sizes, large, wide }: { lang: Lang; hall: Hall; sizes?: string; large?: boolean; wide?: boolean }) {
  return (
    <Link href={localize(lang, `/haly/${hall.slug}`)} className="group block">
      <div className={`sd-reveal relative overflow-clip rounded-md bg-mist ${wide ? "aspect-[3/2] sm:aspect-[21/9]" : large ? "aspect-[3/2] lg:aspect-[16/9]" : "aspect-[3/2]"}`}>
        <Img
          src={hall.photos[0].src}
          alt={hall.photos[0].alt}
          fill
          sizes={sizes ?? "(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
        <span className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-inset ring-azure transition-[box-shadow] group-hover:ring-4" />
      </div>
      <h3 className={`mt-4 font-bold text-ink transition-colors group-hover:text-brand ${large || wide ? "text-[21px]" : "text-[18px]"}`}>{hall.name}</h3>
      <p className="mt-1 text-[15px] leading-snug text-dim">{hall.short}</p>
    </Link>
  );
}
