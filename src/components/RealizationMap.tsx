import Link from "next/link";
import { company, type Realization } from "@/lib/data";
import { localize, pick, type Lang } from "@/lib/i18n";
import { czPath, mapBox, project, skPath } from "@/lib/map-shapes";

const seat = project([49.195, 16.608]);

/** Statická mapa ČR a SR s body realizací. Bez cizích služeb, cookies a JavaScriptu.
 *  Bodů je hodně, název místa se proto ukáže až po najetí nebo fokusu; všechna místa jsou i v seznamu pod mapou. */
export function RealizationMap({ lang, realizations }: { lang: Lang; realizations: Realization[] }) {
  const t = pick(lang);
  const points = realizations.map((r) => ({ ...r, ...project(r.coords) }));

  return (
    <div>
      <svg
        viewBox={`0 0 ${mapBox.width} ${mapBox.height}`}
        className="h-auto w-full overflow-visible"
        role="group"
        aria-label={t("Mapa realizací v Česku a na Slovensku", "Mapa realizácií v Česku a na Slovensku")}
      >
        <path d={czPath} className="fill-mist stroke-line" strokeWidth={2} strokeLinejoin="round" />
        <path d={skPath} className="fill-mist stroke-line" strokeWidth={2} strokeLinejoin="round" />

        <g aria-hidden="true">
          <circle cx={seat.x} cy={seat.y} r={20} className="fill-none stroke-brand" strokeWidth={3} />
          <text x={seat.x} y={seat.y + 46} textAnchor="middle" className="fill-dim text-[18px] max-sm:hidden">
            {t("sídlo", "sídlo")}
          </text>
        </g>

        {points.map((p) => {
          // U východního okraje by popisek přetekl, proto jde doleva.
          const left = p.x > mapBox.width - 220;
          return (
            <Link key={p.slug} href={localize(lang, `/realizace/${p.slug}`)} aria-label={p.title} className="group outline-none">
              <circle cx={p.x} cy={p.y} r={18} className="fill-transparent" />
              <circle
                cx={p.x}
                cy={p.y}
                r={8}
                className="origin-center fill-azure stroke-brand transition-transform duration-150 ease-out [transform-box:fill-box] group-hover:scale-[1.5] group-focus-visible:scale-[1.5]"
                strokeWidth={3}
              />
              <text
                x={left ? p.x - 18 : p.x + 18}
                y={p.y + 7}
                textAnchor={left ? "end" : "start"}
                className="pointer-events-none fill-ink stroke-white text-[22px] font-semibold opacity-0 transition-opacity duration-150 [paint-order:stroke] [stroke-width:6px] group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:hidden"
              >
                {p.place}
              </text>
            </Link>
          );
        })}
      </svg>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
        {realizations.map((r) => (
          <li key={r.slug}>
            <Link href={localize(lang, `/realizace/${r.slug}`)} className="text-ink underline decoration-line underline-offset-4 hover:decoration-link">
              {r.place}
              {r.country === "SK" && <span className="text-dim"> (SK)</span>}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-2 text-[13px] text-dim">
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <circle cx="10" cy="10" r="7.5" className="fill-none stroke-brand" strokeWidth={2} />
        </svg>
        {t("Sídlo firmy", "Sídlo firmy")}: {company.street}, {company.city}
      </p>
    </div>
  );
}
