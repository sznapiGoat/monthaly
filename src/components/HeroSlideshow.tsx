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
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

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
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [running, index]);

  // Sníh. Jemný, pod 30 fps, na mobilu méně vloček.
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx || !running) {
      ctx?.clearRect(0, 0, el?.width ?? 0, el?.height ?? 0);
      return;
    }
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let flakes: { x: number; y: number; r: number; v: number; drift: number; phase: number; a: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? 55 : 120;
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.6,
        v: 16 + Math.random() * 30,
        drift: 4 + Math.random() * 10,
        phase: Math.random() * Math.PI * 2,
        a: 0.25 + Math.random() * 0.5,
      }));
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (last && now - last < 33) return;
      const dt = last ? Math.min((now - last) / 1000, 0.08) : 0;
      last = now;
      t += dt;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.v * dt;
        f.x += Math.sin(t * 0.8 + f.phase) * f.drift * dt;
        if (f.y > h + 4) {
          f.y = -4;
          f.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.a})`;
        ctx.fill();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, w, h);
    };
  }, [running]);

  const s = slides[index];

  return (
    <>
      <div ref={root} className="absolute inset-0 -z-10">
        {slides.map((sl, i) => (
          <div
            key={sl.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[1600ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={sl.src}
              alt={i === index ? sl.alt : ""}
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority={i === 0 ? "high" : "low"}
              style={{ objectPosition: sl.focus }}
              className={`object-cover ${i === index && !reduced ? "hero-zoom" : ""} ${userPaused ? "[animation-play-state:paused]" : ""}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/60 to-night/0 max-md:bg-gradient-to-b max-md:from-night/90 max-md:via-night/70 max-md:to-night/45" />
        <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-4 z-20 md:top-auto md:bottom-[84px]">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-end gap-5 px-5 sm:px-8 md:items-end md:justify-start md:gap-8 [&>*]:pointer-events-auto">
          <div className="flex items-center gap-1.5 md:gap-2" role="group" aria-label="Fotografie realizací">
            {slides.map((sl, i) => (
              <button
                key={sl.src}
                type="button"
                onClick={() => setIndex(i)}
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
