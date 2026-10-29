"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const slides = [
  { src: "/foto/litvinov.webp", alt: "Bílá montovaná skladová hala v Litvínově pod zataženou oblohou", place: "Litvínov", info: "Skladová hala · 900 m²", href: "/realizace/skladova-hala-litvinov", focus: "70% 60%" },
  { src: "/foto/lhotka.webp", alt: "Skladová hala s tmavým plechovým opláštěním v Lhotce nad Bečvou při západu slunce", place: "Lhotka nad Bečvou", info: "Skladová hala · 450 m²", href: "/realizace/skladova-hala-lhotka-nad-becvou", focus: "62% 55%" },
  { src: "/foto/mosnov.webp", alt: "Dvě bílé skladové haly v Mošnově", place: "Mošnov", info: "Dvě skladové haly · 2 × 960 m²", href: "/realizace/skladove-haly-mosnov", focus: "60% 55%" },
  { src: "/foto/opatovice.webp", alt: "Skladová hala v Opatovicích nad Labem", place: "Opatovice nad Labem", info: "Skladová hala · 800 m²", href: "/realizace/skladova-hala-opatovice", focus: "60% 55%" },
];

const SLIDE_MS = 7000;

export function HeroSlideshow() {
  // Předchozí fotka zůstává pod novou, dokud ji nová nepřejede.
  const [{ index, prev }, setSlide] = useState({ index: 0, prev: -1 });
  const go = (n: number) => setSlide((st) => (n === st.index ? st : { index: n, prev: st.index }));
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  const running = !userPaused && !reduced && visible;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (root.current) io.observe(root.current);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", update);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Přepínání fotek. Při pauze se interval zastaví a po spuštění běží od aktuální fotky.
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setSlide((st) => ({ index: (st.index + 1) % slides.length, prev: st.index })), SLIDE_MS);
    return () => clearTimeout(t);
  }, [running, index]);

  const s = slides[index];

  return (
    <>
      <div ref={root} className="absolute inset-0 -z-10">
        {slides.map((sl, i) => (
          <div
            key={i === index ? `${sl.src}-${index}-${prev}` : sl.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 overflow-hidden ${
              i === index ? `z-[2] ${prev >= 0 && !reduced ? "hero-wipe" : ""}` : i === prev ? "z-[1]" : "invisible"
            }`}
          >
            <Image
              src={sl.src}
              alt={i === index ? sl.alt : ""}
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority={i === 0 ? "high" : "low"}
              style={{ objectPosition: sl.focus }}
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-night/95 via-night/70 to-night/10 max-md:bg-gradient-to-b max-md:from-night/90 max-md:via-night/70 max-md:to-night/45" />
        {/* Horní přechod, aby byla průhledná hlavička čitelná i nad světlou oblohou. */}
        <div className="absolute inset-x-0 top-0 z-[3] h-48 bg-gradient-to-b from-night/80 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[88px] z-20 md:top-auto md:bottom-[84px]">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-end gap-5 px-5 sm:px-8 md:items-end md:justify-start md:gap-8 [&>*]:pointer-events-auto">
          <div className="flex items-center gap-1.5 md:gap-2" role="group" aria-label="Fotografie realizací">
            {slides.map((sl, i) => (
              <button
                key={sl.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Zobrazit ${sl.place}`}
                aria-current={i === index}
                className="group relative h-6 w-7 md:w-12"
              >
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 group-hover:bg-white/45">
                  <span
                    key={`${index}-${userPaused}-${visible}`}
                    className={`absolute inset-y-0 left-0 bg-azure ${i < index ? "w-full" : i === index ? (reduced ? "w-full" : "hero-progress") : "w-0"}`}
                    style={i === index && !reduced ? { animationDuration: `${SLIDE_MS}ms`, animationPlayState: running ? "running" : "paused" } : undefined}
                  />
                </span>
              </button>
            ))}
          </div>
          <Link href={s.href} className="group hidden text-[13px] leading-snug text-white/80 hover:text-white md:block" aria-live="polite">
            <span className="block font-semibold text-white">{s.place}</span>
            <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white">{s.info}</span>
          </Link>
          {!reduced && (
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-pressed={userPaused}
              className="text-[13px] font-semibold text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              {userPaused ? "Spustit" : "Pozastavit"}<span className="max-md:sr-only"> animace</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
