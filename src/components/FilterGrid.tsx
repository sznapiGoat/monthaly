"use client";

import { useState } from "react";
import { RealizationCard } from "@/components/Cards";
import type { Realization, RealizationCategory } from "@/lib/data";
import { pick, type Lang } from "@/lib/i18n";

function Filters<T extends string>({
  options,
  value,
  onChange,
  allLabel,
  count,
  groupLabel,
}: {
  options: { id: T; label: string }[];
  value: T | "all";
  onChange: (v: T | "all") => void;
  allLabel: string;
  count: string;
  groupLabel: string;
}) {
  const all = [{ id: "all" as const, label: allLabel }, ...options];
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div role="group" aria-label={groupLabel} className="-mx-1 flex flex-wrap gap-2">
        {all.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className={`mx-1 rounded-md border px-4 py-2 text-[14px] font-semibold transition-colors ${
              value === o.id ? "border-brand bg-brand text-white" : "border-line text-ink hover:border-brand"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p className="text-[14px] text-dim" aria-live="polite">
        {count}
      </p>
    </div>
  );
}

const plural = (n: number, one: string, few: string, many: string) => (n === 1 ? one : n >= 2 && n <= 4 ? few : many);

// Seznam a kategorie přicházejí ze serveru už v jazyce stránky.
export function RealizationsGrid({
  lang,
  realizations,
  categories,
}: {
  lang: Lang;
  realizations: Realization[];
  categories: { id: RealizationCategory; label: string }[];
}) {
  const t = pick(lang);
  const [cat, setCat] = useState<RealizationCategory | "all">("all");
  const list = cat === "all" ? realizations : realizations.filter((r) => r.category === cat);
  return (
    <>
      <h2 className="sr-only">{t("Seznam realizací", "Zoznam realizácií")}</h2>
      <Filters
        options={categories}
        value={cat}
        onChange={setCat}
        allLabel={t("Všechny realizace", "Všetky realizácie")}
        groupLabel={t("Filtr", "Filter")}
        count={`${list.length} ${t(plural(list.length, "realizace", "realizace", "realizací"), plural(list.length, "realizácia", "realizácie", "realizácií"))}`}
      />
      <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r, i) => (
          <li key={r.slug}>
            <RealizationCard lang={lang} item={r} eager={i < 3} />
          </li>
        ))}
      </ul>
    </>
  );
}
