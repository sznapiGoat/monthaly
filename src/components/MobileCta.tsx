"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/lib/company";
import { btn } from "@/lib/ui";

// Na mobilu je poptávka i telefon stále po ruce (zadání 11/2026). Lišta vyjede až po odscrollování úvodu,
// na stránce poptávky není. Lišta cookies (z-50) i mobilní menu (z-30) ji překryjí.
export function MobileCta() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/poptavka")) return null;

  return (
    <>
      {/* Místo pod patičkou, ať lišta nezakryje její konec. */}
      <div aria-hidden className="h-[calc(68px+env(safe-area-inset-bottom))] bg-night lg:hidden" />
      <div
        inert={!shown}
        className={`fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-6px_20px_rgb(22_26_45/0.08)] transition-transform duration-200 ease-out lg:hidden ${
          shown ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex gap-3">
          <Link href="/poptavka" className={`${btn.primary} flex-1 py-3`}>
            Nezávazná poptávka
          </Link>
          <a href={`tel:${company.phone}`} className={`${btn.ghost} py-3`}>
            Zavolat
          </a>
        </div>
      </div>
    </>
  );
}
