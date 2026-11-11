"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

type Choice = "all" | "necessary";

const KEY = "cookie-consent";
const OPEN_EVENT = "cookie-consent:open";
const CHANGE_EVENT = "cookie-consent:change";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const read = (): Choice | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
};

// GTM se načte až po souhlasu. Bez NEXT_PUBLIC_GTM_ID se nenačítá nic.
function loadGtm() {
  if (!gtmId || document.getElementById("gtm")) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.id = "gtm";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(s);
}

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener(CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CHANGE_EVENT, cb);
  };
};

export function CookieConsent() {
  // Na serveru volba neexistuje, lišta se vykreslí až v prohlížeči.
  const choice = useSyncExternalStore(subscribe, read, () => "pending" as const);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    if (choice === "all") loadGtm();
  }, [choice]);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (next: Choice) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    // Odvolaný souhlas: už načtený GTM odstraní až nové načtení stránky.
    if (next === "necessary" && document.getElementById("gtm")) location.reload();
    window.dispatchEvent(new Event(CHANGE_EVENT));
    setReopened(false);
  };

  if (!reopened && choice !== null) return null;

  return (
    <div
      role="region"
      aria-label="Souhlas s cookies"
      className="fixed inset-x-3 bottom-3 z-50 rounded-md border border-line bg-white p-5 text-ink shadow-[0_8px_30px_rgb(22_26_45/0.18)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-[420px]"
    >
      <p className="text-[15px] leading-relaxed text-dim">
        Nezbytné cookies potřebuje web ke svému fungování. Analytické a reklamní použijeme jen s vaším souhlasem.{" "}
        <Link href="/ochrana-osobnich-udaju#cookies" className="font-semibold text-link underline underline-offset-4">
          Více informací
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => decide("necessary")}
          className="rounded-md border border-line px-4 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-brand"
        >
          Jen nezbytné
        </button>
        <button
          type="button"
          onClick={() => decide("all")}
          className="rounded-md bg-brand px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-deep"
        >
          Přijmout vše
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Nastavení cookies
    </button>
  );
}
