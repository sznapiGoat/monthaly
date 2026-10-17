// Sezónní efekty v hero. Fotky jsou vždy skutečné realizace, sezóna přidává jen jemnou
// animaci kreslenou kódem. Pro jaro, léto a podzim zatím efekt není, mají připravené místo.
export type Season = "zima" | "jaro" | "leto" | "podzim";
export type SeasonSetting = Season | "normal";

const SETTINGS: SeasonSetting[] = ["zima", "jaro", "leto", "podzim", "normal"];

export function seasonFromDate(d: Date): Season {
  const m = d.getMonth(); // 0 = leden
  if (m === 11 || m <= 1) return "zima";
  if (m <= 4) return "jaro";
  if (m <= 7) return "leto";
  return "podzim";
}

const isSetting = (v: string | null | undefined): v is SeasonSetting => !!v && (SETTINGS as string[]).includes(v);

/**
 * Pořadí: ?sezona= v adrese (kvůli screenshotům do prezentace), pak NEXT_PUBLIC_SEZONA
 * pro celý web, jinak podle data. Vrací null, když se nemá zobrazit žádný efekt.
 */
export function resolveSeason(search: string, now = new Date()): Season | null {
  const fromUrl = new URLSearchParams(search).get("sezona");
  const fromEnv = process.env.NEXT_PUBLIC_SEZONA;
  const setting = isSetting(fromUrl) ? fromUrl : isSetting(fromEnv) ? fromEnv : seasonFromDate(now);
  return setting === "normal" ? null : setting;
}
