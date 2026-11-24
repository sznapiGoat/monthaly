"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SeasonalEffect } from "@/components/SeasonalEffect";
import { localize, pick, type Lang } from "@/lib/i18n";

type Slide = {
  src: string;
  alt: string;
  place: string;
  info: string;
  href: string;
  focus: string;
  video?: string;
  ms?: number;
};

/** Video snímku: hraje jen když je snímek aktivní a prezentace běží, při pauze stojí. */
function HeroVideo({
  slide,
  active,
  running,
}: {
  slide: Slide;
  active: boolean;
  running: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active && running) v.play().catch(() => {});
    else v.pause();
  }, [active, running]);
  useEffect(() => {
    if (active && ref.current) ref.current.currentTime = 0;
  }, [active]);
  return (
    <video
      ref={ref}
      src={slide.video}
      poster={slide.src}
      muted
      playsInline
      preload="auto"
      aria-label={active ? slide.alt : undefined}
      aria-hidden={!active}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: slide.focus }}
    />
  );
}

const slidesFor = (lang: Lang) => {
  const t = pick(lang);
  return [
    // Zesvětlené kopie (public/foto/hero): zvednuté stíny a víc světla na obloze.
    {
      src: "/foto/hero/steti.webp",
      alt: t(
        "Skladová hala ve Štětí podél železniční vlečky",
        "Skladová hala v Štětí pozdĺž železničnej vlečky",
      ),
      place: "Štětí",
      info: t("Skladová hala · 1 125 m²", "Skladová hala · 1 125 m²"),
      href: "/realizace/skladova-hala-steti",
      focus: "60% 55%",
    },
    // Časosběr montáže ze zálohy nelpet.cz, zrychlený 6,5× na 15 s. Hraje jen jako aktivní snímek.
    {
      src: "/foto/hero/montaz-poster.webp",
      video: "/foto/hero/montaz.mp4",
      ms: 14900,
      alt: t(
        "Časosběrné video montáže skladové haly v zimě",
        "Časozberné video montáže skladovej haly v zime",
      ),
      place: t("Montáž haly", "Montáž haly"),
      info: t("Od konstrukce po hotovou halu", "Od konštrukcie po hotovú halu"),
      href: "/jak-pracujeme",
      focus: "50% 50%",
    },
    {
      src: "/foto/hero/zemedelske-haly-2.webp",
      alt: t(
        "Zemědělská hala se žlutým opláštěním a otevřenou stájí",
        "Poľnohospodárska hala so žltým opláštením a otvorenou maštaľou",
      ),
      place: t("Zemědělské haly", "Poľnohospodárske haly"),
      info: t("Hala s otevřenou stájí", "Hala s otvorenou maštaľou"),
      href: "/haly/zemedelske-haly",
      focus: "55% 50%",
    },
    {
      src: "/foto/hero/litvinov.webp",
      alt: t(
        "Bílá skladová hala v Litvínově na mokrém asfaltu",
        "Biela skladová hala v Litvínove na mokrom asfalte",
      ),
      place: "Litvínov",
      info: t("Skladová hala · 900 m²", "Skladová hala · 900 m²"),
      href: "/realizace/skladova-hala-litvinov",
      focus: "70% 55%",
    },
    {
      src: "/foto/hero/jezdecke-haly.webp",
      alt: t(
        "Jezdecká hala s obloukovými okny v čelní stěně",
        "Jazdecká hala s oblúkovými oknami v čelnej stene",
      ),
      place: t("Jezdecké haly", "Jazdecké haly"),
      info: t("Hala s obloukovými okny", "Hala s oblúkovými oknami"),
      href: "/haly/jezdecke-haly",
      focus: "45% 50%",
    },
  ].map((s): Slide => ({ ...s, href: localize(lang, s.href) }));
};

const SLIDE_MS = 7000;

export function HeroSlideshow({ lang }: { lang: Lang }) {
  const t = pick(lang);
  const slides = slidesFor(lang);
  // Předchozí fotka zůstává pod novou, dokud ji nová nepřejede.
  const [{ index, prev }, setSlide] = useState({ index: 0, prev: -1 });
  const go = (n: number) =>
    setSlide((st) => (n === st.index ? st : { index: n, prev: st.index }));
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  const running = !userPaused && !reduced && visible;
  const slideMs = slides[index].ms ?? SLIDE_MS;
  // Další fotka se začne stahovat až po načtení stránky, aby nebrzdila první vykreslení.
  const [preloadNext, setPreloadNext] = useState(false);
  useEffect(() => {
    const start = () => setTimeout(() => setPreloadNext(true), 1500);
    if (document.readyState === "complete") {
      const t = start();
      return () => clearTimeout(t);
    }
    let t: ReturnType<typeof setTimeout> | undefined;
    const onLoad = () => (t = start());
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
    };
  }, []);

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
    const timer = setTimeout(
      () =>
        setSlide((st) => ({
          index: (st.index + 1) % slides.length,
          prev: st.index,
        })),
      slideMs,
    );
    return () => clearTimeout(timer);
  }, [running, index, slides.length, slideMs]);

  const s = slides[index];

  return (
    <>
      <div ref={root} className="absolute inset-0 -z-10">
        {slides.map((sl, i) => {
          // Ve stránce je jen aktuální, předchozí a (po načtení stránky) další fotka.
          if (
            i !== index &&
            i !== prev &&
            !(preloadNext && i === (index + 1) % slides.length)
          )
            return null;
          return (
            <div
              key={i === index ? `${sl.src}-${index}-${prev}` : sl.src}
              aria-hidden={i !== index}
              className={`absolute inset-0 overflow-hidden ${
                i === index
                  ? `z-[2] ${prev >= 0 && !reduced ? "hero-wipe" : ""}`
                  : i === prev
                    ? "z-[1]"
                    : "invisible"
              }`}
            >
              {sl.video ? (
                <HeroVideo slide={sl} active={i === index} running={running} />
              ) : (
                <Image
                  src={sl.src}
                  alt={i === index ? sl.alt : ""}
                  fill
                  sizes="100vw"
                  quality={85}
                  loading="eager"
                  fetchPriority={i === index && prev < 0 ? "high" : "low"}
                  style={{
                    objectPosition: sl.focus,
                    transformOrigin: sl.focus,
                    animationPlayState:
                      i === index && !running ? "paused" : undefined,
                  }}
                  // Aktuální fotka se pomalu přibližuje, předchozí zůstává přiblížená, ať pod přejezdem neposkočí.
                  className={`object-cover ${i === index ? "hero-zoom" : i === prev ? "hero-zoomed" : ""}`}
                />
              )}
            </div>
          );
        })}
        {/* Měkký ovál za textem: text je čitelný, okraje fotky a obloha zůstávají světlé. */}
        <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_62%_58%_at_28%_56%,rgb(22_26_45/0.62),rgb(22_26_45/0.28)_55%,transparent_100%)] max-md:bg-[radial-gradient(ellipse_95%_60%_at_40%_52%,rgb(22_26_45/0.62),rgb(22_26_45/0.3)_60%,transparent_100%)]" />
        {/* Horní přechod, aby byla průhledná hlavička čitelná i nad světlou oblohou. */}
        <div className="absolute inset-x-0 top-0 z-[3] h-32 bg-gradient-to-b from-night/45 to-transparent" />
        {/* Roční období: zima sníh, jaro lístky, léto odlesky, podzim listí. Při pauze a omezení pohybu stojí. */}
        <SeasonalEffect running={running} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[88px] z-20 md:top-auto md:bottom-[84px]">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-end gap-5 px-5 sm:px-8 md:items-end md:justify-start md:gap-8 [&>*]:pointer-events-auto">
          <div
            className="flex items-center gap-1.5 md:gap-2"
            role="group"
            aria-label={t("Fotografie realizací", "Fotografie realizácií")}
          >
            {slides.map((sl, i) => (
              <button
                key={sl.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`${t("Zobrazit", "Zobraziť")} ${sl.place}`}
                aria-current={i === index}
                className="group relative h-11 w-11 md:h-6 md:w-12"
              >
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 group-hover:bg-white/45">
                  <span
                    key={`${index}-${userPaused}-${visible}`}
                    className={`absolute inset-0 origin-left bg-azure ${i < index ? "" : i === index ? (reduced ? "" : "hero-progress") : "scale-x-0"}`}
                    style={
                      i === index && !reduced
                        ? {
                            animationDuration: `${sl.ms ?? SLIDE_MS}ms`,
                            animationPlayState: running ? "running" : "paused",
                          }
                        : undefined
                    }
                  />
                </span>
              </button>
            ))}
          </div>
          <Link
            href={s.href}
            className="group hidden text-[13px] leading-snug text-white/80 hover:text-white md:block"
            aria-live="polite"
          >
            <span className="block font-semibold text-white">{s.place}</span>
            <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white">
              {s.info}
            </span>
          </Link>
          {!reduced && (
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-pressed={userPaused}
              className="text-[13px] font-semibold text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              {userPaused
                ? t("Spustit", "Spustiť")
                : t("Pozastavit", "Pozastaviť")}
              <span className="max-md:sr-only">
                {" "}
                {t("animace", "animácie")}
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
