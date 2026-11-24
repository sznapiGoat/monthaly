import Link from "next/link";
import type { testimonials } from "@/lib/data";
import { localize, pick, type Lang } from "@/lib/i18n";
import { container } from "@/lib/ui";

type Item = (typeof testimonials)[number];

/** Hodnocení zákazníků: první velké, ostatní pod sebou vedle. Citace jsou česky i na SK verzi (lang="cs"). */
export function Testimonials({ lang, items, title }: { lang: Lang; items: Item[]; title?: string }) {
  const t = pick(lang);
  const [main, ...rest] = items;
  const who = (i: Item) => (
    <span className="block text-[14px] not-italic text-dim">
      <span className="font-semibold text-ink">{i.name}</span>, {i.company}
      {i.slug && (
        <>
          {" · "}
          <Link href={localize(lang, `/realizace/${i.slug}`)} className="font-semibold text-link underline decoration-link/30 underline-offset-4 hover:decoration-link">
            {t("realizace", "realizácia")}
          </Link>
        </>
      )}
    </span>
  );

  return (
    <section aria-labelledby="hodnoceni" className="border-t border-line py-20 md:py-28">
      <div className={container}>
        <h2 id="hodnoceni" className="font-display text-[40px] leading-[0.95] text-ink sm:text-[51px]">
          {title ?? t("Co říkají zákazníci", "Čo hovoria zákazníci")}
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="border-t-[3px] border-azure pt-8 lg:col-span-7">
            <blockquote lang="cs" className="font-display text-[27px] leading-[1.25] text-ink sm:text-[33px]">
              „{main.text}“
            </blockquote>
            <figcaption className="mt-6">{who(main)}</figcaption>
          </figure>
          <div className="grid content-start gap-8 lg:col-span-5">
            {rest.map((i) => (
              <figure key={i.name} className="border-t border-line pt-6">
                <blockquote lang="cs" className="text-[17px] leading-relaxed text-ink">
                  „{i.text}“
                </blockquote>
                <figcaption className="mt-3">{who(i)}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
