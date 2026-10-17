"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/data";

export function Gallery({ photos, layout = "three" }: { photos: Photo[]; layout?: "three" | "two" | "feature" }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number, el: HTMLButtonElement) => {
    opener.current = el;
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = useCallback((d: number) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => opener.current?.focus();
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = photos[index];

  return (
    <>
      <ul className={layout === "feature" ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2" : layout === "two" ? "grid gap-3 sm:grid-cols-2" : "grid gap-3 sm:grid-cols-3"}>
        {photos.map((ph, i) => {
          const big = layout === "feature" && i === 0;
          return (
            <li key={ph.src} className={big ? "sm:col-span-2 lg:row-span-2" : ""}>
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="sd-reveal group relative block aspect-[4/3] h-full w-full overflow-clip rounded-md bg-mist outline-offset-4"
                aria-label={`Zvětšit fotografii: ${ph.alt}`}
              >
                <Image
                  src={ph.src}
                  alt={ph.alt}
                  fill
                  sizes={big ? "(min-width: 1024px) 820px, 100vw" : layout === "two" ? "(min-width: 1240px) 600px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 33vw, 100vw"}
                  className="object-cover"
                />
                <span className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-inset ring-azure transition-[box-shadow] group-hover:ring-4" />
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Fotogalerie"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-5 py-4 text-[14px] sm:px-8">
            <p className="truncate text-white/80">
              <span className="tabular-nums text-white">
                {index + 1} / {photos.length}
              </span>
              <span className="ml-3">{current?.alt}</span>
            </p>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="rounded-md border border-white/30 px-4 py-2 font-semibold hover:border-white"
            >
              Zavřít
            </button>
          </div>
          <div className="relative min-h-0 flex-1 px-2 sm:px-20">
            {current && <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />}
          </div>
          {photos.length > 1 && (
            <div className="flex justify-center gap-3 px-5 py-5">
              <button type="button" onClick={() => step(-1)} className="rounded-md border border-white/30 px-5 py-2.5 font-semibold hover:border-white">
                Předchozí
              </button>
              <button type="button" onClick={() => step(1)} className="rounded-md border border-white/30 px-5 py-2.5 font-semibold hover:border-white">
                Další
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
