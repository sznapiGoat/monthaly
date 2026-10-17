"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/lib/data";
import { btn, container } from "@/lib/ui";

const nav = [
  { href: "/haly", label: "Naše haly" },
  { href: "/realizace", label: "Realizace" },
  { href: "/jak-pracujeme", label: "Jak pracujeme" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Při přechodu na jinou stránku menu zavřít.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Na úvodce je hlavička nad tmavým hero průhledná. Jakmile hero odjede pod hlavičku, přepne se na bílou.
  const isHome = pathname === "/";
  const [heroUnder, setHeroUnder] = useState(true);
  useEffect(() => {
    const hero = isHome ? document.getElementById("hero") : null;
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setHeroUnder(e.isIntersecting), { rootMargin: "-72px 0px 0px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, [isHome]);
  const clear = isHome && heroUnder && !open;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`${isHome ? "fixed inset-x-0" : "sticky"} top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
          clear ? "border-white/15 bg-transparent" : "border-line bg-white"
        }`}
      >
        <div className={`${container} flex h-[72px] items-center justify-between gap-6`}>
          <Link
            href="/"
            aria-label="MontHaly, úvodní stránka"
            className="shrink-0"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
              }
            }}
          >
            <span className="relative block">
              <Image
                src="/logo.svg"
                alt="MontHaly s.r.o."
                width={192}
                height={40}
                loading="eager"
                className={`h-8 w-auto transition-opacity duration-300 sm:h-10 ${clear ? "opacity-0" : "opacity-100"}`}
              />
              {isHome && (
                <Image
                  src="/logo-light.svg"
                  alt=""
                  aria-hidden
                  width={192}
                  height={40}
                  loading="eager"
                  className={`absolute inset-0 h-8 w-auto transition-opacity duration-300 sm:h-10 ${clear ? "opacity-100" : "opacity-0"}`}
                />
              )}
            </span>
          </Link>

          <nav aria-label="Hlavní navigace" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative py-2 text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-[1px] after:h-[2px] after:origin-left after:bg-azure after:transition-transform ${
                      clear
                        ? "text-white/85 after:scale-x-0 hover:text-white"
                        : isActive(item.href)
                          ? "text-brand after:scale-x-100"
                          : "text-ink/80 after:scale-x-0 hover:text-brand"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={`tel:${company.phone}`}
              className={`text-[15px] font-semibold tabular-nums transition-colors ${clear ? "text-white hover:text-azure-soft" : "text-ink hover:text-brand"}`}
            >
              {company.phoneIntl}
            </a>
            <Link href="/poptavka" className={`${clear ? btn.primary : btn.dark} px-5 py-2.5 text-[14px]`}>
              Nezávazná poptávka
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a href={`tel:${company.phone}`} className={`whitespace-nowrap rounded-md px-2 py-2 text-[15px] font-semibold tabular-nums transition-colors max-[359px]:hidden ${clear ? "text-white" : "text-brand"}`}>
              {company.phoneLabel}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-md transition-colors ${clear ? "text-white" : "text-ink"}`}
            >
              <span className="relative block h-3.5 w-6">
                <span className={`absolute left-0 h-[2px] w-6 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-[2px] w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-[2px] w-6 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[73px] z-30 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobilní navigace" className={`${container} flex min-h-full flex-col py-6`}>
            <ul className="divide-y divide-line border-y border-line">
              {[{ href: "/", label: "Úvod" }, ...nav].map((item) => {
                const active = item.href === "/" ? pathname === "/" : isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={`block py-4 font-display text-[26px] leading-tight ${active ? "text-brand" : "text-ink"}`}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto space-y-3 pt-10">
              <Link href="/poptavka" className={`${btn.dark} w-full`}>
                Nezávazná poptávka
              </Link>
              <a href={`tel:${company.phone}`} className={`${btn.ghost} w-full tabular-nums`}>
                Zavolat {company.phoneIntl}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
