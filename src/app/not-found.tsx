import Link from "next/link";
import { btn, container } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className={`${container} flex min-h-[60vh] flex-col justify-center py-24`}>
      <p className="text-[15px] font-semibold text-link">Chyba 404</p>
      <h1 className="mt-3 max-w-3xl font-display text-[44px] leading-[1.04] text-ink sm:text-[60px]">Tahle stránka tu nestojí.</h1>
      <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-dim">
        Možná se přesunula při přechodu na nový web. Zkuste přehled hal nebo realizací.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/haly" className={btn.dark}>
          Naše haly
        </Link>
        <Link href="/realizace" className={btn.ghost}>
          Realizace
        </Link>
      </div>
    </section>
  );
}
