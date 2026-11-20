"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company } from "@/lib/company";
import { localize, pick, type Lang } from "@/lib/i18n";
import { btn } from "@/lib/ui";

// Na mobilu je poptávka i telefon stále po ruce (zadání 11/2026). Lišta vyjede až po odscrollování úvodu,
// na stránce poptávky není. Lišta cookies (z-50) i mobilní menu (z-30) ji překryjí.
export function MobileCta({ lang }: { lang: Lang }) {
  const t = pick(lang);
  const quote = localize(lang, "/poptavka");
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  // Značka 480 px od začátku stránky: lišta se ukáže, až značka odjede nad okraj obrazovky. Bez posluchače scrollu.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  if (pathname.startsWith(quote)) return null;

  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute left-0 top-[480px] h-px w-px" />
      {/* Místo pod patičkou, ať lišta nezakryje její konec. */}
      <div aria-hidden className="h-[calc(68px+env(safe-area-inset-bottom))] bg-night lg:hidden" />
      <div
        inert={!shown}
        className={`fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-6px_20px_rgb(22_26_45/0.08)] transition-transform duration-200 ease-out lg:hidden ${
          shown ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex gap-3">
          <Link href={quote} className={`${btn.primary} flex-1 py-3`}>
            {t("Nezávazná poptávka", "Nezáväzný dopyt")}
          </Link>
          <a href={`tel:${company.phone}`} className={`${btn.ghost} py-3`}>
            {t("Zavolat", "Zavolať")}
          </a>
        </div>
      </div>
    </>
  );
}
