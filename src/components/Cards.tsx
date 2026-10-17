import Image from "next/image";
import Link from "next/link";
import type { Hall, Realization } from "@/lib/data";

export function RealizationCard({ item, sizes, eager }: { item: Realization; sizes?: string; eager?: boolean }) {
  return (
    <Link href={`/realizace/${item.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-mist">
        <Image
          src={item.photos[0].src}
          alt={item.photos[0].alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes={sizes ?? "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
        <span className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-inset ring-azure transition-[box-shadow] group-hover:ring-4" />
        {item.country === "SK" && (
          <span className="absolute left-3 top-3 rounded-sm bg-white px-2 py-1 text-[12px] font-semibold text-ink">Slovensko</span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[28px] leading-tight text-ink transition-colors group-hover:text-brand">{item.place}</h3>
        {item.area && <span className="shrink-0 text-[14px] font-semibold tabular-nums text-ink">{item.area}</span>}
      </div>
      <p className="mt-1 text-[14px] text-dim">
        {item.kind}
        {item.dimensions ? ` · ${item.dimensions}` : item.notes[0] ? ` · ${item.notes[0]}` : ""}
      </p>
    </Link>
  );
}

export function HallCard({ hall, sizes }: { hall: Hall; sizes?: string }) {
  return (
    <Link href={`/haly/${hall.slug}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-mist">
        <Image
          src={hall.photos[0].src}
          alt={hall.photos[0].alt}
          fill
          sizes={sizes ?? "(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
        <span className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-inset ring-azure transition-[box-shadow] group-hover:ring-4" />
      </div>
      <h3 className="mt-4 text-[18px] font-bold text-ink transition-colors group-hover:text-brand">{hall.name}</h3>
      <p className="mt-1 text-[15px] leading-snug text-dim">{hall.short}</p>
    </Link>
  );
}
