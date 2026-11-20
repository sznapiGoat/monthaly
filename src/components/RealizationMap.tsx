import Link from "next/link";
import { company, type Realization } from "@/lib/data";
import { localize, pick, type Lang } from "@/lib/i18n";
import { czPath, mapBox, project, skPath } from "@/lib/map-shapes";

// Popisky, které by vpravo narazily na sousední bod nebo popisek, jdou jinam.
const labelSide: Record<string, "left" | "below"> = {
  Veselíčko: "left",
  Líbeznice: "left",
  Brno: "left",
  "Opatovice nad Labem": "below",
  "Lhotka nad Bečvou": "below",
};
const seat = project([49.195, 16.608]);

/** Statická mapa ČR a SR s body realizací. Bez cizích služeb, cookies a JavaScriptu. */
export function RealizationMap({ lang, realizations }: { lang: Lang; realizations: Realization[] }) {
  const t = pick(lang);
  const points = realizations.map((r) => ({ ...r, ...project(r.coords) }));

  return (
    <div>
      <svg
        viewBox={`0 0 ${mapBox.width} ${mapBox.height}`}
        className="h-auto w-full"
        role="group"
        aria-label={t("Mapa realizací v Česku a na Slovensku", "Mapa realizácií v Česku a na Slovensku")}
      >
        <path d={czPath} className="fill-mist stroke-line" strokeWidth={2} strokeLinejoin="round" />
        <path d={skPath} className="fill-mist stroke-line" strokeWidth={2} strokeLinejoin="round" />

        <g aria-hidden="true">
          <circle cx={seat.x} cy={seat.y} r={20} className="fill-none stroke-brand" strokeWidth={3} />
        </g>

        {points.map((p) => {
          const side = labelSide[p.place] ?? "right";
          return (
            <Link key={p.slug} href={localize(lang, `/realizace/${p.slug}`)} aria-label={p.title} className="group">
              <circle cx={p.x} cy={p.y} r={22} className="fill-transparent" />
              <circle
                cx={p.x}
                cy={p.y}
                r={9}
                className="origin-center fill-azure stroke-brand transition-transform duration-150 ease-out [transform-box:fill-box] group-hover:scale-[1.4]"
                strokeWidth={3}
              />
              <text
                x={side === "left" ? p.x - (p.place === "Brno" ? 30 : 18) : side === "below" ? p.x : p.x + 18}
                y={side === "below" ? p.y + 36 : p.y + 7}
                textAnchor={side === "left" ? "end" : side === "below" ? "middle" : "start"}
                className="fill-ink text-[21px] font-semibold max-sm:hidden group-hover:fill-link"
              >
                {p.place}
              </text>
            </Link>
          );
        })}

        <text x={seat.x} y={seat.y + 46} textAnchor="middle" className="fill-dim text-[18px] max-sm:hidden" aria-hidden="true">
          {t("sídlo", "sídlo")}
        </text>
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
