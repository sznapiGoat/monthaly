"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { resolveSeason, type Season } from "@/lib/season";

type Kind = "dot" | "leaf";

type Look = {
  kind: Kind;
  count: [desktop: number, mobile: number];
  size: [min: number, max: number];
  speed: [min: number, max: number]; // px/s, záporná = stoupá
  drift: [min: number, max: number]; // rozkmit do stran
  colors: string[];
  alpha: [min: number, max: number];
};

// Počty jsou záměrně nízké: efekt má jen naznačit roční období, ne zakrýt halu.
const LOOKS: Record<Season, Look> = {
  zima: { kind: "dot", count: [110, 50], size: [1, 2.8], speed: [16, 46], drift: [4, 14], colors: ["255,255,255"], alpha: [0.6, 0.95] },
  podzim: { kind: "leaf", count: [16, 8], size: [10, 16], speed: [26, 46], drift: [18, 40], colors: ["217,130,43", "196,86,31", "224,165,38", "168,69,26"], alpha: [0.75, 0.95] },
  jaro: { kind: "leaf", count: [24, 10], size: [5, 8], speed: [14, 28], drift: [14, 30], colors: ["255,170,196", "255,196,214", "244,143,177"], alpha: [0.8, 0.95] },
  leto: { kind: "dot", count: [36, 16], size: [0.8, 2], speed: [-10, -4], drift: [6, 16], colors: ["255,246,213"], alpha: [0.15, 0.55] },
};

const rand = ([a, b]: [number, number]) => a + Math.random() * (b - a);

/** Částice na plátně. Pod 30 fps, na mobilu méně kusů, při pauze se plátno vyčistí. */
function Particles({ season, running }: { season: Season; running: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    if (!running) {
      ctx.clearRect(0, 0, el.width, el.height);
      return;
    }
    const look = LOOKS[season];
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let t = 0;
    let items: { x: number; y: number; s: number; v: number; drift: number; phase: number; a: number; c: string; rot: number; spin: number }[] = [];

    const spawn = (anywhere: boolean) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : look.speed[0] < 0 ? h + 8 : -8,
      s: rand(look.size),
      v: rand(look.speed),
      drift: rand(look.drift),
      phase: Math.random() * Math.PI * 2,
      a: rand(look.alpha),
      c: look.colors[Math.floor(Math.random() * look.colors.length)],
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 2.4,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      items = Array.from({ length: w < 768 ? look.count[1] : look.count[0] }, () => spawn(true));
    };

    const drawLeaf = (s: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(s * 0.7, 0, 0, s);
      ctx.quadraticCurveTo(-s * 0.7, 0, 0, -s);
      ctx.fill();
      // Žilka a stopka, aby byl list poznat i v pohybu.
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.8);
      ctx.lineTo(0, s * 1.25);
      ctx.lineWidth = Math.max(0.6, s * 0.08);
      ctx.strokeStyle = "rgba(90,40,10,0.35)";
      ctx.stroke();
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (last && now - last < 33) return;
      const dt = last ? Math.min((now - last) / 1000, 0.08) : 0;
      last = now;
      t += dt;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < items.length; i++) {
        const p = items[i];
        p.y += p.v * dt;
        p.x += Math.sin(t * 0.8 + p.phase) * p.drift * dt;
        p.rot += p.spin * dt;
        if (p.y > h + 10 || p.y < -10) items[i] = spawn(false);
        if (look.kind === "dot") {
          // V létě částice jemně pulzují, jako odlesky ve slunci.
          const a = season === "leto" ? p.a * (0.6 + 0.4 * Math.sin(t * 1.5 + p.phase)) : p.a;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.c},${a})`;
          ctx.fill();
          // Jemný tmavý obrys: bílé vločky jsou vidět i na světlé obloze a bílé hale.
          if (season === "zima") {
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = `rgba(22,26,45,${a * 0.35})`;
            ctx.stroke();
          }
        } else {
          // List se při pádu natáčí a „převrací“ (zúžení podle kosinu), aby nepadal jako placka.
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.scale(1, 0.35 + 0.65 * Math.abs(Math.cos(t * 1.6 + p.phase)));
          ctx.fillStyle = `rgba(${p.c},${p.a})`;
          drawLeaf(p.s);
          ctx.restore();
        }
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
  }, [season, running]);

  return <canvas ref={canvas} aria-hidden data-season={season} className="pointer-events-none absolute inset-0 z-[4] h-full w-full" />;
}

const noop = () => () => {};

export function SeasonalEffect({ running }: { running: boolean }) {
  // Sezónu určujeme až v prohlížeči: stránky jsou statické a datum i ?sezona= se liší podle návštěvy.
  const search = useSyncExternalStore(noop, () => window.location.search, () => null);
  const season = search === null ? null : resolveSeason(search);
  return season ? <Particles season={season} running={running} /> : null;
}
