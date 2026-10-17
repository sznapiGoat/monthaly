"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, getHall, halls } from "@/lib/data";
import {
  area,
  claddingOptions,
  emptyQuote,
  equipmentOptions,
  timeOptions,
  validateContact,
  type QuoteInput,
} from "@/lib/quote";
import { btn } from "@/lib/ui";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const stepNames = ["Využití haly", "Vaše představa", "Kontakt"];

const pill = (on: boolean) =>
  `cursor-pointer select-none rounded-md border px-4 py-2.5 text-[15px] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-azure ${
    on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand"
  }`;

const input =
  "mt-2 block w-full scroll-mt-32 rounded-md border border-line bg-white px-4 py-3 text-[16px] text-ink placeholder:text-dim/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-azure/40";

const label = "block text-[15px] font-semibold text-ink";

export function QuoteForm() {
  const params = useSearchParams();
  const [q, setQ] = useState<QuoteInput>(() => {
    const typ = params.get("typ");
    return {
      ...emptyQuote,
      typ: typ && getHall(typ) ? typ : emptyQuote.typ,
      zamer: params.get("zamer") === "pronajem" ? "Pronájem" : emptyQuote.zamer,
      realizace: params.get("realizace")?.slice(0, 160) ?? "",
    };
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [demo, setDemo] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = heading.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [step, status]);

  const set = <K extends keyof QuoteInput>(k: K, v: QuoteInput[K]) => setQ((prev) => ({ ...prev, [k]: v }));
  const toggleEquip = (v: string) =>
    set("vybaveni", q.vybaveni.includes(v) ? q.vybaveni.filter((x) => x !== v) : [...q.vybaveni, v]);

  const hallName = getHall(q.typ)?.name ?? "Potřebuji poradit s výběrem";
  const plocha = area(q.sirka, q.delka);
  const dims = [q.sirka && `${q.sirka} m`, q.delka && `${q.delka} m`, q.vyska && `${q.vyska} m`].filter(Boolean).join(" × ");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    const errs = validateContact(q);
    setErrors(errs);
    if (Object.keys(errs).length) {
      // Na mobilu je první chyba často nad okrajem obrazovky, proto na ni skočit.
      const field = errs.jmeno ? "jmeno" : "email";
      const el = e.currentTarget.elements.namedItem(field);
      if (el instanceof HTMLElement) el.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/poptavka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(q),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        return;
      }
      setDemo(Boolean(data.demo));
      setStatus("done");
      // Konverze pro Google Ads a Analytics. Jakmile se na web připojí GTM, převezme ji.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead", hall_type: q.typ, lead_area_m2: plocha ?? undefined });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border-t-[3px] border-azure pt-10" role="status">
        <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 font-display text-[38px] leading-[1.02] text-ink outline-none sm:text-[46px]">
          Děkujeme, poptávka je u nás.
        </h2>
        <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-dim">
          Projdeme vaše zadání a ozveme se, abychom doplnili, co ještě chybí. Přesnou kalkulaci pošleme do několika dnů podle složitosti
          haly.
        </p>
        {demo && (
          <p className="mt-6 max-w-xl border-l-[3px] border-line pl-4 text-[14px] leading-relaxed text-dim">
            Toto je ukázková verze webu, poptávka se proto nikam neodeslala. V ostrém provozu dorazí e-mailem na {company.email}.
          </p>
        )}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/realizace" className={btn.dark}>
            Prohlédnout realizace
          </Link>
          <a href={`tel:${company.phone}`} className={btn.ghost}>
            Zavolat {company.phoneIntl}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <form onSubmit={submit} noValidate className="lg:col-span-8">
        <ol className="grid grid-cols-3 gap-3" aria-label="Postup">
          {stepNames.map((n, i) => (
            <li key={n} aria-current={i === step ? "step" : undefined}>
              <span className={`block h-[3px] rounded-full transition-colors ${i <= step ? "bg-azure" : "bg-line"}`} />
              <span className={`mt-3 block text-[13px] font-semibold sm:text-[14px] ${i === step ? "text-ink" : "text-dim"}`}>
                {i + 1}. {n}
              </span>
            </li>
          ))}
        </ol>

        {q.realizace && (
          <p className="mt-8 border-l-[3px] border-azure pl-4 text-[15px] text-dim">
            Inspirace: <span className="font-semibold text-ink">{q.realizace}</span>
          </p>
        )}

        <div className="mt-10">
          {step === 0 && (
            <fieldset>
              <legend className="contents">
                <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 font-display text-[30px] leading-tight text-ink outline-none sm:text-[38px]">
                  K čemu má hala sloužit?
                </h2>
              </legend>
              <p className="mt-3 text-[16px] text-dim">Vyberte nejbližší využití. Detaily spolu probereme.</p>
              <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {[...halls.map((h) => ({ value: h.slug, label: h.name })), { value: "nevim", label: "Potřebuji poradit" }].map((o) => (
                  <label key={o.value} className={`${pill(q.typ === o.value)} flex items-center py-3.5`}>
                    <input type="radio" name="typ" value={o.value} checked={q.typ === o.value} onChange={() => set("typ", o.value)} className="sr-only" />
                    {o.label}
                  </label>
                ))}
              </div>
              <fieldset className="mt-10">
                <legend className={label}>O co máte zájem?</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Pořízení haly", "Pronájem"].map((o) => (
                    <label key={o} className={pill(q.zamer === o)}>
                      <input type="radio" name="zamer" value={o} checked={q.zamer === o} onChange={() => set("zamer", o)} className="sr-only" />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            </fieldset>
          )}

          {step === 1 && (
            <div>
              <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 font-display text-[30px] leading-tight text-ink outline-none sm:text-[38px]">
                Jak má váš prostor vypadat?
              </h2>
              <p className="mt-3 text-[16px] text-dim">Vyplňte, co už víte. Všechna pole v tomto kroku jsou volitelná.</p>

              <fieldset className="mt-8">
                <legend className={label}>Orientační rozměry</legend>
                <div className="mt-1 grid grid-cols-3 gap-3">
                  {(
                    [
                      ["sirka", "Šířka", "15"],
                      ["delka", "Délka", "30"],
                      ["vyska", "Výška", "5"],
                    ] as const
                  ).map(([k, l, ph]) => (
                    <label key={k} className="block text-[14px] text-dim">
                      {l}
                      <span className="relative block">
                        <input
                          name={k}
                          inputMode="decimal"
                          value={q[k]}
                          onChange={(e) => set(k, e.target.value.replace(/[^\d.,]/g, "").slice(0, 7))}
                          placeholder={ph}
                          className={`${input} pr-10 tabular-nums`}
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-dim">m</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={`${label} mt-8`}>
                Místo stavby
                <input
                  name="misto"
                  autoComplete="address-level2"
                  value={q.misto}
                  onChange={(e) => set("misto", e.target.value)}
                  placeholder="Obec nebo město"
                  maxLength={160}
                  className={input}
                />
                <span className="mt-2 block text-[14px] font-normal text-dim">Místo ovlivňuje sněhovou a větrnou zátěž i přípravu dodávky.</span>
              </label>

              <fieldset className="mt-8">
                <legend className={label}>Představa o opláštění</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {claddingOptions.map((o) => (
                    <label key={o} className={pill(q.oplasteni === o)}>
                      <input type="radio" name="oplasteni" value={o} checked={q.oplasteni === o} onChange={() => set("oplasteni", o)} className="sr-only" />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-8">
                <legend className={label}>Co by mělo být součástí?</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {equipmentOptions.map((o) => (
                    <label key={o} className={pill(q.vybaveni.includes(o))}>
                      <input type="checkbox" name="vybaveni" value={o} checked={q.vybaveni.includes(o)} onChange={() => toggleEquip(o)} className="sr-only" />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={`${label} mt-8`}>
                Představa o termínu
                <select name="termin" value={q.termin} onChange={(e) => set("termin", e.target.value)} className={input}>
                  {timeOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 font-display text-[30px] leading-tight text-ink outline-none sm:text-[38px]">
                Jak se vám můžeme ozvat?
              </h2>
              <p className="mt-3 text-[16px] text-dim">Vyplňte jméno a alespoň jeden kontakt: e-mail nebo telefon.</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <label className={label}>
                  Jméno a příjmení <span className="text-link">*</span>
                  <input
                    name="jmeno"
                    autoComplete="name"
                    value={q.jmeno}
                    onChange={(e) => set("jmeno", e.target.value)}
                    maxLength={120}
                    aria-invalid={Boolean(errors.jmeno)}
                    aria-describedby={errors.jmeno ? "err-jmeno" : undefined}
                    className={input}
                  />
                  {errors.jmeno && (
                    <span id="err-jmeno" className="mt-2 block text-[14px] font-medium text-[#b42318]">
                      {errors.jmeno}
                    </span>
                  )}
                </label>
                <label className={label}>
                  Firma <span className="font-normal text-dim">(nepovinné)</span>
                  <input name="firma" autoComplete="organization" value={q.firma} onChange={(e) => set("firma", e.target.value)} maxLength={150} className={input} />
                </label>
                <label className={label}>
                  E-mail
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={q.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="vas@email.cz"
                    maxLength={180}
                    aria-invalid={Boolean(errors.email || errors.kontakt)}
                    aria-describedby={errors.email ? "err-email" : errors.kontakt ? "err-kontakt" : undefined}
                    className={input}
                  />
                  {errors.email && (
                    <span id="err-email" className="mt-2 block text-[14px] font-medium text-[#b42318]">
                      {errors.email}
                    </span>
                  )}
                </label>
                <label className={label}>
                  Telefon
                  <input
                    type="tel"
                    name="telefon"
                    autoComplete="tel"
                    value={q.telefon}
                    onChange={(e) => set("telefon", e.target.value)}
                    placeholder="+420"
                    maxLength={35}
                    aria-invalid={Boolean(errors.kontakt)}
                    aria-describedby={errors.kontakt ? "err-kontakt" : undefined}
                    className={input}
                  />
                </label>
              </div>
              {errors.kontakt && (
                <p id="err-kontakt" className="mt-3 text-[14px] font-medium text-[#b42318]">
                  {errors.kontakt}
                </p>
              )}

              <label className={`${label} mt-6`}>
                Co je ještě dobré vědět?
                <textarea
                  name="zprava"
                  rows={5}
                  value={q.zprava}
                  onChange={(e) => set("zprava", e.target.value)}
                  maxLength={1500}
                  placeholder="Co budete v hale dělat, co je pro vás důležité nebo jaké máte otázky."
                  className={`${input} resize-y`}
                />
              </label>

              <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                Nevyplňujte
                <input name="web" tabIndex={-1} autoComplete="off" value={q.web} onChange={(e) => set("web", e.target.value)} />
              </label>

              <p className="mt-6 text-[14px] text-dim">
                Údaje použijeme jen pro odpověď na vaši poptávku.{" "}
                <Link href="/ochrana-osobnich-udaju" className="font-semibold text-link underline underline-offset-4">
                  Jak pracujeme s údaji
                </Link>
                .
              </p>
            </div>
          )}
        </div>

        {status === "error" && !Object.keys(errors).length && (
          <p role="alert" className="mt-8 border-l-[3px] border-[#b42318] pl-4 text-[15px] text-ink">
            Poptávku se teď nepodařilo odeslat. Zkuste to prosím znovu, nebo zavolejte na{" "}
            <a href={`tel:${company.phone}`} className="font-semibold text-link underline">
              {company.phoneIntl}
            </a>
            .
          </p>
        )}

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="px-1 py-3 text-[15px] font-semibold text-dim hover:text-ink">
              Zpět
            </button>
          ) : (
            <span />
          )}
          <button type="submit" disabled={status === "sending"} className={`${btn.dark} min-w-[180px] disabled:opacity-60`}>
            {step < 2 ? "Pokračovat" : status === "sending" ? "Odesílám…" : "Odeslat poptávku"}
          </button>
        </div>
      </form>

      <aside className="lg:col-span-4" aria-label="Shrnutí poptávky">
        <div className="lg:sticky lg:top-24">
          <h2 className="font-display text-[26px] leading-tight text-ink">Vaše hala</h2>
          <dl className="mt-5 border-t border-ink text-[15px]">
            <div className="border-b border-line py-3.5">
              <dt className="text-[13px] text-dim">Využití</dt>
              <dd className="mt-0.5 font-semibold text-ink">
                {hallName}
                <span className="font-normal text-dim"> · {q.zamer === "Pronájem" ? "pronájem" : "pořízení"}</span>
              </dd>
            </div>
            <div className="border-b border-line py-3.5">
              <dt className="text-[13px] text-dim">Rozměry</dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-ink">{dims || "Probereme společně"}</dd>
            </div>
            <div className="border-b border-line py-3.5">
              <dt className="text-[13px] text-dim">Místo</dt>
              <dd className="mt-0.5 font-semibold text-ink">{q.misto || "Zatím neuvedeno"}</dd>
            </div>
            <div className="border-b border-line py-3.5">
              <dt className="text-[13px] text-dim">Vybavení</dt>
              <dd className="mt-0.5 font-semibold text-ink">{q.vybaveni.join(", ") || "Upřesníme při konzultaci"}</dd>
            </div>
          </dl>
          {plocha ? (
            <>
              <p className="mt-6 font-display text-[44px] leading-none tabular-nums text-brand">
                {plocha.toLocaleString("cs-CZ")} <span className="text-[24px]">m²</span>
              </p>
              <p className="mt-2 text-[13px] text-dim">Orientační půdorysná plocha</p>
            </>
          ) : (
            <p className="mt-6 text-[14px] text-dim">Plocha se spočítá po zadání šířky a délky.</p>
          )}

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-[14px] text-dim">Raději zavoláte?</p>
            <a href={`tel:${company.phone}`} className="mt-1 block font-display text-[26px] leading-tight tabular-nums text-ink hover:text-brand">
              {company.phoneIntl}
            </a>
            <p className="text-[14px] text-dim">Roman Chalupka, prodej hal</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
