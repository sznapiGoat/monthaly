import { getHall } from "@/lib/data";
import { area, emptyQuote, validateContact, type QuoteInput } from "@/lib/quote";

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const q: QuoteInput = {
    ...emptyQuote,
    typ: clip(body.typ, 60),
    zamer: clip(body.zamer, 60),
    sirka: clip(body.sirka, 10),
    delka: clip(body.delka, 10),
    vyska: clip(body.vyska, 10),
    misto: clip(body.misto, 160),
    oplasteni: clip(body.oplasteni, 60),
    vybaveni: Array.isArray(body.vybaveni) ? body.vybaveni.slice(0, 10).map((v) => clip(v, 40)) : [],
    termin: clip(body.termin, 60),
    jmeno: clip(body.jmeno, 120),
    firma: clip(body.firma, 150),
    email: clip(body.email, 180),
    telefon: clip(body.telefon, 35),
    zprava: clip(body.zprava, 1500),
    realizace: clip(body.realizace, 160),
    web: clip(body.web, 200),
  };

  // Robot vyplnil skryté pole. Tváříme se, že je vše v pořádku.
  if (q.web) return Response.json({ ok: true });

  const errors = validateContact(q);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const typLabel = getHall(q.typ)?.name ?? "Potřebuje poradit s výběrem";
  const plocha = area(q.sirka, q.delka);
  const rows: [string, string][] = [
    ["Typ haly", typLabel],
    ["Zájem o", q.zamer],
    ["Rozměry", [q.sirka && `šířka ${q.sirka} m`, q.delka && `délka ${q.delka} m`, q.vyska && `výška ${q.vyska} m`].filter(Boolean).join(", ") || "neuvedeno"],
    ["Plocha", plocha ? `${plocha} m²` : "neuvedeno"],
    ["Místo stavby", q.misto || "neuvedeno"],
    ["Opláštění", q.oplasteni],
    ["Vybavení", q.vybaveni.join(", ") || "neuvedeno"],
    ["Termín", q.termin],
    ...(q.realizace ? ([["Inspirace realizací", q.realizace]] as [string, string][]) : []),
    ["Jméno", q.jmeno],
    ["Firma", q.firma || "neuvedeno"],
    ["E-mail", q.email || "neuvedeno"],
    ["Telefon", q.telefon || "neuvedeno"],
    ["Zpráva", q.zprava || "bez zprávy"],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.POPTAVKA_TO;

  // Bez nastaveného klíče a příjemce běží formulář v ukázkovém režimu a nic neodesílá.
  if (!apiKey || !to) {
    console.info("[poptavka] ukázkový režim, e-mail se neodesílá:", Object.fromEntries(rows));
    return Response.json({ ok: true, demo: true });
  }

  const html = `<h2 style="font-family:sans-serif">Nová poptávka z webu</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#4f5f6f;vertical-align:top">${escape(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.POPTAVKA_FROM ?? "MontHaly web <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: q.email || undefined,
      subject: `Poptávka: ${typLabel}${q.misto ? `, ${q.misto}` : ""} (${q.jmeno})`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[poptavka] odeslání selhalo", res.status, await res.text());
    return Response.json({ ok: false, error: "Poptávku se nepodařilo odeslat." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
