"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company } from "@/lib/company";
import { localize, locales, pick, type Lang } from "@/lib/i18n";
import { area, emptyQuote, quoteOptions, validateContact, type QuoteInput } from "@/lib/quote";
import { btn } from "@/lib/ui";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const pill = (on: boolean) =>
  `cursor-pointer select-none rounded-md border px-4 py-2.5 text-[15px] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-azure ${
    on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand"
  }`;

const input =
  "mt-2 block w-full scroll-mt-32 rounded-md border border-line bg-white px-4 py-3 text-[16px] text-ink placeholder:text-dim/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-azure/40";

const label = "block text-[15px] font-semibold text-ink";

// Jen názvy hal ze serveru, celý obsah webu do prohlížeče nepatří.
export function QuoteForm({ lang, halls }: { lang: Lang; halls: { slug: string; name: string }[] }) {
  const t = pick(lang);
  const l = (href: string) => localize(lang, href);
  const { purposes, claddingGroups, claddingAdvice, equipment, times } = quoteOptions(lang);
  const stepNames = t(["Využití haly", "Vaše představa", "Kontakt"], ["Využitie haly", "Vaša predstava", "Kontakt"]);
  const getHall = (slug: string) => halls.find((h) => h.slug === slug);
  const params = useSearchParams();
  const [q, setQ] = useState<QuoteInput>(() => {
    const typ = params.get("typ");
    const empty = emptyQuote(lang);
    return {
      ...empty,
      typ: typ && getHall(typ) ? typ : empty.typ,
      zamer: params.get("zamer") === "pronajem" ? purposes[1] : empty.zamer,
      realizace: params.get("realizace")?.slice(0, 160) ?? "",
    };
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [demo, setDemo] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  // Fokus na nadpis jen při změně kroku, ne při načtení. Porovnání místo příznaku vydrží i dvojí běh efektu ve Strict Mode.
  const shown = useRef({ step, status });

  useEffect(() => {
    if (shown.current.step === step && shown.current.status === status) return;
    shown.current = { step, status };
    const el = heading.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [step, status]);

  const set = <K extends keyof QuoteInput>(k: K, v: QuoteInput[K]) => setQ((prev) => ({ ...prev, [k]: v }));
  const toggleEquip = (v: string) =>
    set("vybaveni", q.vybaveni.includes(v) ? q.vybaveni.filter((x) => x !== v) : [...q.vybaveni, v]);

  const hallName = getHall(q.typ)?.name ?? t("Potřebuji poradit s výběrem", "Potrebujem poradiť s výberom");
  const plocha = area(q.sirka, q.delka);
  const dims = [q.sirka && `${q.sirka} m`, q.delka && `${q.delka} m`, q.vyska && `${q.vyska} m`].filter(Boolean).join(" × ");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    const errs = validateContact(q, lang);
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
        body: JSON.stringify({ ...q, lang }),
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
        <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 font-display text-[42px] leading-[0.92] text-ink outline-none sm:text-[51px]">
          {t("Děkujeme, poptávka je u nás.", "Ďakujeme, dopyt je u nás.")}
        </h2>
        <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-dim">
          {t(
            "Projdeme vaše zadání a ozveme se, abychom doplnili, co ještě chybí. Přesnou kalkulaci pošleme do několika dnů podle složitosti haly.",
            "Prejdeme vaše zadanie a ozveme sa, aby sme doplnili, čo ešte chýba. Presnú kalkuláciu pošleme do niekoľkých dní podľa zložitosti haly.",
          )}
        </p>
        {demo && (
          <p className="mt-6 max-w-xl border-l-[3px] border-line pl-4 text-[14px] leading-relaxed text-dim">
            {t(
              "Toto je ukázková verze webu, poptávka se proto nikam neodeslala. V ostrém provozu dorazí e-mailem na",
              "Toto je ukážková verzia webu, dopyt sa preto nikam neodoslal. V ostrej prevádzke príde e-mailom na",
            )}{" "}
            {company.email}.
          </p>
        )}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={l("/realizace")} className={btn.dark}>
            {t("Prohlédnout realizace", "Pozrieť realizácie")}
          </Link>
          <a href={`tel:${company.phone}`} className={btn.ghost}>
            {t("Zavolat", "Zavolať")} {company.phoneIntl}
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
            {t("Inspirace", "Inšpirácia")}: <span className="font-semibold text-ink">{q.realizace}</span>
          </p>
        )}

        <div className="mt-10">
          {step === 0 && (
            <fieldset>
              <legend className="contents">
                <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 font-display text-[33px] leading-[1.12] text-ink outline-none sm:text-[42px]">
                  {t("K čemu má hala sloužit?", "Na čo má hala slúžiť?")}
                </h2>
              </legend>
              <p className="mt-3 text-[16px] text-dim">{t("Vyberte nejbližší využití. Detaily spolu probereme.", "Vyberte najbližšie využitie. Detaily spolu prejdeme.")}</p>
              <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {[...halls.map((h) => ({ value: h.slug, label: h.name })), { value: "nevim", label: claddingAdvice }].map((o) => (
                  <label key={o.value} className={`${pill(q.typ === o.value)} flex items-center py-3.5`}>
                    <input type="radio" name="typ" value={o.value} checked={q.typ === o.value} onChange={() => set("typ", o.value)} className="sr-only" />
                    {o.label}
                  </label>
                ))}
              </div>
              <fieldset className="mt-10">
                <legend className={label}>{t("O co máte zájem?", "O čo máte záujem?")}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {purposes.map((o) => (
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
              <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 font-display text-[33px] leading-[1.12] text-ink outline-none sm:text-[42px]">
                {t("Jak má váš prostor vypadat?", "Ako má váš priestor vyzerať?")}
              </h2>
              <p className="mt-3 text-[16px] text-dim">{t("Vyplňte, co už víte. Všechna pole v tomto kroku jsou volitelná.", "Vyplňte, čo už viete. Všetky polia v tomto kroku sú nepovinné.")}</p>

              <fieldset className="mt-8">
                <legend className={label}>{t("Orientační rozměry", "Orientačné rozmery")}</legend>
                <div className="mt-1 grid grid-cols-3 gap-3">
                  {(
                    [
                      ["sirka", t("Šířka", "Šírka"), "15"],
                      ["delka", t("Délka", "Dĺžka"), "30"],
                      ["vyska", t("Výška", "Výška"), "5"],
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
                {t("Místo stavby", "Miesto stavby")}
                <input
                  name="misto"
                  autoComplete="address-level2"
                  value={q.misto}
                  onChange={(e) => set("misto", e.target.value)}
                  placeholder={t("Obec nebo město", "Obec alebo mesto")}
                  maxLength={160}
                  className={input}
                />
                <span className="mt-2 block text-[14px] font-normal text-dim">{t("Místo ovlivňuje sněhovou a větrnou zátěž i přípravu dodávky.", "Miesto ovplyvňuje snehovú a veternú záťaž aj prípravu dodávky.")}</span>
              </label>

              <fieldset className="mt-8">
                <legend className={label}>{t("Představa o opláštění", "Predstava o opláštení")}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  <label className={pill(q.oplasteni === claddingAdvice)}>
                    <input type="radio" name="oplasteni" value={claddingAdvice} checked={q.oplasteni === claddingAdvice} onChange={() => set("oplasteni", claddingAdvice)} className="sr-only" />
                    {claddingAdvice}
                  </label>
                </div>
                {claddingGroups.map((g) => (
                  <div key={g.label} className="mt-4">
                    <p className="text-[13px] font-semibold text-dim">{g.label}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {g.items.map((i) => {
                        const v = `${g.label}: ${i.name}`;
                        return (
                          <label key={v} className={pill(q.oplasteni === v)}>
                            <input type="radio" name="oplasteni" value={v} checked={q.oplasteni === v} onChange={() => set("oplasteni", v)} className="sr-only" />
                            {i.name}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </fieldset>

              <fieldset className="mt-8">
                <legend className={label}>{t("Co by mělo být součástí?", "Čo by malo byť súčasťou?")}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {equipment.map((o) => (
                    <label key={o} className={pill(q.vybaveni.includes(o))}>
                      <input type="checkbox" name="vybaveni" value={o} checked={q.vybaveni.includes(o)} onChange={() => toggleEquip(o)} className="sr-only" />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={`${label} mt-8`}>
                {t("Představa o termínu", "Predstava o termíne")}
                <select name="termin" value={q.termin} onChange={(e) => set("termin", e.target.value)} className={input}>
                  {times.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 ref={heading} tabIndex={-1} className="scroll-mt-28 font-display text-[33px] leading-[1.12] text-ink outline-none sm:text-[42px]">
                {t("Jak se vám můžeme ozvat?", "Ako sa vám môžeme ozvať?")}
              </h2>
              <p className="mt-3 text-[16px] text-dim">{t("Vyplňte jméno a alespoň jeden kontakt: e-mail nebo telefon.", "Vyplňte meno a aspoň jeden kontakt: e-mail alebo telefón.")}</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <label className={label}>
                  {t("Jméno a příjmení", "Meno a priezvisko")} <span className="text-link">*</span>
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
                    placeholder={t("vas@email.cz", "vas@email.sk")}
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
                  {t("Telefon", "Telefón")}
                  <input
                    type="tel"
                    name="telefon"
                    autoComplete="tel"
                    value={q.telefon}
                    onChange={(e) => set("telefon", e.target.value)}
                    placeholder={t("+420", "+421")}
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
                {t("Co je ještě dobré vědět?", "Čo je ešte dobré vedieť?")}
                <textarea
                  name="zprava"
                  rows={5}
                  value={q.zprava}
                  onChange={(e) => set("zprava", e.target.value)}
                  maxLength={1500}
                  placeholder={t("Co budete v hale dělat, co je pro vás důležité nebo jaké máte otázky.", "Čo budete v hale robiť, čo je pre vás dôležité alebo aké máte otázky.")}
                  className={`${input} resize-y`}
                />
              </label>

              <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                {t("Nevyplňujte", "Nevypĺňajte")}
                <input name="web" tabIndex={-1} autoComplete="off" value={q.web} onChange={(e) => set("web", e.target.value)} />
              </label>

              <p className="mt-6 text-[14px] text-dim">
                {t("Údaje použijeme jen pro odpověď na vaši poptávku.", "Údaje použijeme len na odpoveď na váš dopyt.")}{" "}
                <Link href={l("/ochrana-osobnich-udaju")} className="font-semibold text-link underline underline-offset-4">
                  {t("Jak pracujeme s údaji", "Ako pracujeme s údajmi")}
                </Link>
                .
              </p>
            </div>
          )}
        </div>

        {status === "error" && !Object.keys(errors).length && (
          <p role="alert" className="mt-8 border-l-[3px] border-[#b42318] pl-4 text-[15px] text-ink">
            {t("Poptávku se teď nepodařilo odeslat. Zkuste to prosím znovu, nebo zavolejte na", "Dopyt sa teraz nepodarilo odoslať. Skúste to, prosím, znova alebo zavolajte na")}{" "}
            <a href={`tel:${company.phone}`} className="font-semibold text-link underline">
              {company.phoneIntl}
            </a>
            .
          </p>
        )}

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="px-1 py-3 text-[15px] font-semibold text-dim hover:text-ink">
              {t("Zpět", "Späť")}
            </button>
          ) : (
            <span />
          )}
          <button type="submit" disabled={status === "sending"} className={`${btn.primary} min-w-[180px] disabled:opacity-60`}>
            {step < 2 ? t("Pokračovat", "Pokračovať") : status === "sending" ? t("Odesílám…", "Odosielam…") : t("Odeslat poptávku", "Odoslať dopyt")}
          </button>
        </div>
      </form>

      <aside className="lg:col-span-4" aria-label={t("Shrnutí poptávky", "Zhrnutie dopytu")}>
        <div className="lg:sticky lg:top-24">
          <h2 className="font-display text-[29px] leading-[1.12] text-ink">{t("Vaše hala", "Vaša hala")}</h2>
          <dl className="mt-5 border-t border-ink text-[15px]">
            <div className="border-b border-line py-3.5">
              <dt className="text-[13px] text-dim">{t("Využití", "Využitie")}</dt>
              <dd className="mt-0.5 font-semibold text-ink">
                {hallName}
                <span className="font-normal text-dim"> · {q.zamer === purposes[1] ? t("pronájem", "prenájom") : t("pořízení", "kúpa")}</span>
              </dd>
            </div>
            <div className="border-b border-line py-3.5">
              <dt className="text-[13px] text-dim">{t("Rozměry", "Rozmery")}</dt>
              <dd className="mt-0.5 font-semibold tabular-nums text-ink">{dims || t("Probereme společně", "Prejdeme spoločne")}</dd>
            </div>
            <div className="border-b border-line py-3.5">
              <dt className="text-[13px] text-dim">{t("Místo", "Miesto")}</dt>
              <dd className="mt-0.5 font-semibold text-ink">{q.misto || t("Zatím neuvedeno", "Zatiaľ neuvedené")}</dd>
            </div>
            <div className="border-b border-line py-3.5">
              <dt className="text-[13px] text-dim">{t("Vybavení", "Vybavenie")}</dt>
              <dd className="mt-0.5 font-semibold text-ink">{q.vybaveni.join(", ") || t("Upřesníme při konzultaci", "Upresníme pri konzultácii")}</dd>
            </div>
          </dl>
          {plocha ? (
            <>
              <p className="mt-6 font-display text-[49px] leading-[0.9] tabular-nums text-brand">
                {plocha.toLocaleString(locales[lang])} <span className="text-[24px]">m²</span>
              </p>
              <p className="mt-2 text-[13px] text-dim">{t("Orientační půdorysná plocha", "Orientačná pôdorysná plocha")}</p>
            </>
          ) : (
            <p className="mt-6 text-[14px] text-dim">{t("Plocha se spočítá po zadání šířky a délky.", "Plocha sa vypočíta po zadaní šírky a dĺžky.")}</p>
          )}

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-[14px] text-dim">{t("Raději zavoláte?", "Radšej zavoláte?")}</p>
            <a href={`tel:${company.phone}`} className="mt-1 block font-display text-[29px] leading-[1.12] tabular-nums text-ink hover:text-brand">
              {company.phoneIntl}
            </a>
            <p className="text-[14px] text-dim">{t("Roman Chalupka, prodej hal", "Roman Chalupka, predaj hál")}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
