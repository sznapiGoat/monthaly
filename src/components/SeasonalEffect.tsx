"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { resolveSeason, type Season } from "@/lib/season";

/** Jemný sníh. Pod 30 fps, na mobilu méně vloček, při pauze se plátno vyčistí. */
function Snowfall({ running }: { running: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    if (!running) {
      ctx.clearRect(0, 0, el.width, el.height);
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
      flakes = Array.from({ length: w < 768 ? 55 : 120 }, () => ({
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

  return <canvas ref={canvas} aria-hidden data-season="zima" className="pointer-events-none absolute inset-0 h-full w-full" />;
}

const noop = () => () => {};

export function SeasonalEffect({ running }: { running: boolean }) {
  // Sezónu určujeme až v prohlížeči: stránky jsou statické a datum i ?sezona= se liší podle návštěvy.
  const search = useSyncExternalStore(noop, () => window.location.search, () => null);
  const season: Season | null = search === null ? null : resolveSeason(search);

  // Další sezóny (jaro, léto, podzim) se doplní sem.
  if (season === "zima") return <Snowfall running={running} />;
  return null;
}
