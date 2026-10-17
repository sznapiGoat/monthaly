"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cases = [
  {
    label: "Skladování a výroba",
    title: "Prostor, který drží krok s provozem.",
    text: "Zboží, stroje i každodenní pohyb techniky. Návrh vychází z toho, jak bude váš provoz skutečně fungovat.",
    photo: { src: "/foto/skladove-haly.webp", alt: "Dlouhá bílá skladová hala s paletami před vjezdem" },
    links: [
      { href: "/haly/skladove-haly", label: "Skladové haly" },
      { href: "/haly/vyrobni-haly", label: "Výrobní haly" },
    ],
  },
  {
    label: "Sport a jezdectví",
    title: "Více prostoru pro každý trénink.",
    text: "Od sportovní plochy po jízdárnu. Společně vyřešíme rozměry, světlo, vstupy i zázemí pro uživatele.",
    photo: { src: "/foto/jezdecke-haly-1.webp", alt: "Parkurový skok v kryté jízdárně" },
    links: [
      { href: "/haly/sportovni-haly", label: "Sportovní haly" },
      { href: "/haly/jezdecke-haly", label: "Jezdecké haly" },
    ],
  },
  {
    label: "Zemědělství",
    title: "Zázemí pro práci v každé sezóně.",
    text: "Zastřešení pro techniku, zásoby i chov. Důležité jsou podmínky na místě a požadavky vašeho hospodářství.",
    photo: { src: "/foto/zemedelske-haly-2.webp", alt: "Zemědělská hala se žlutým opláštěním a otevřenou stájí" },
    links: [{ href: "/haly/zemedelske-haly", label: "Zemědělské haly" }],
  },
  {
    label: "Hangáry a další využití",
    title: "Prostor i pro neobvyklé zadání.",
    text: "Zázemí pro letadla, společenské akce i otevřené plochy. Probereme vhodnou konstrukci a rozsah zastřešení.",
    photo: { src: "/foto/letecke-hangary-2.webp", alt: "Malé letadlo zaparkované v montovaném hangáru" },
    links: [
      { href: "/haly/letecke-hangary", label: "Letecké hangáry" },
      { href: "/haly/party-stany", label: "Párty stany" },
      { href: "/haly/membranova-zastreseni", label: "Membránová zastřešení" },
    ],
  },
];

export function UseCaseSwitcher() {
  const [active, setActive] = useState(0);
  const c = cases[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <p className="text-[15px] text-dim" id="use-label">
          K čemu má vaše hala sloužit?
        </p>
        <div role="tablist" aria-labelledby="use-label" className="mt-4 border-t border-line">
          {cases.map((item, i) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              id={`use-tab-${i}`}
              aria-selected={i === active}
              aria-controls="use-panel"
              onClick={() => setActive(i)}
              className={`group flex w-full items-center justify-between gap-4 border-b border-line py-5 text-left font-display text-[23px] leading-tight transition-colors sm:text-[26px] ${
                i === active ? "text-brand" : "text-ink/65 hover:text-ink"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className={`h-[2px] shrink-0 bg-azure transition-all duration-300 ${i === active ? "w-10" : "w-0 group-hover:w-4"}`}
              />
            </button>
          ))}
        </div>
        <p className="mt-6 text-[15px] text-dim">
          Ještě nemáte jasno?{" "}
          <Link href="/kontakt" className="font-semibold text-link underline decoration-link/30 underline-offset-4 hover:decoration-link">
            Pomůžeme vám s výběrem.
          </Link>
        </p>
      </div>

      <div id="use-panel" role="tabpanel" aria-labelledby={`use-tab-${active}`} className="lg:col-span-7">
        <div className="sd-parallax relative aspect-[16/10] overflow-clip rounded-md bg-line">
          {cases.map((item, i) => (
            <Image
              key={item.photo.src}
              src={item.photo.src}
              alt={i === active ? item.photo.alt : ""}
              aria-hidden={i !== active}
              fill
              sizes="(min-width: 1024px) 680px, 100vw"
              className={`object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <h3 className="mt-8 font-display text-[30px] leading-tight text-ink sm:text-[34px]">{c.title}</h3>
        <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-dim">{c.text}</p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {c.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="font-semibold text-link underline decoration-link/30 underline-offset-4 hover:decoration-link">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
