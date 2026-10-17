"use client";

import { useState } from "react";
import { HallCard, RealizationCard } from "@/components/Cards";
import {
  hallGroups,
  halls,
  realizationCategories,
  realizations,
  type HallGroup,
  type RealizationCategory,
} from "@/lib/data";

function Filters<T extends string>({
  options,
  value,
  onChange,
  allLabel,
  count,
}: {
  options: { id: T; label: string }[];
  value: T | "all";
  onChange: (v: T | "all") => void;
  allLabel: string;
  count: string;
}) {
  const all = [{ id: "all" as const, label: allLabel }, ...options];
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div role="group" aria-label="Filtr" className="-mx-1 flex flex-wrap gap-2">
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

export function HallsGrid() {
  const [group, setGroup] = useState<HallGroup | "all">("all");
  const list = group === "all" ? halls : halls.filter((h) => h.group === group);
  return (
    <>
      <h2 className="sr-only">Typy hal</h2>
      <Filters
        options={hallGroups}
        value={group}
        onChange={setGroup}
        allLabel="Všechny haly"
        count={`${list.length} ${plural(list.length, "typ haly", "typy hal", "typů hal")}`}
      />
      <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((h) => (
          <li key={h.slug}>
            <HallCard hall={h} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
          </li>
        ))}
      </ul>
    </>
  );
}

export function RealizationsGrid() {
  const [cat, setCat] = useState<RealizationCategory | "all">("all");
  const list = cat === "all" ? realizations : realizations.filter((r) => r.category === cat);
  return (
    <>
      <h2 className="sr-only">Seznam realizací</h2>
      <Filters
        options={realizationCategories}
        value={cat}
        onChange={setCat}
        allLabel="Všechny realizace"
        count={`${list.length} ${plural(list.length, "realizace", "realizace", "realizací")}`}
      />
      <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r, i) => (
          <li key={r.slug}>
            <RealizationCard item={r} eager={i < 3} />
          </li>
        ))}
      </ul>
    </>
  );
}
