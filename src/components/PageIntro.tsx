import { Breadcrumbs } from "@/components/Breadcrumbs";
import { container } from "@/lib/ui";

export function PageIntro({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-mist">
      <div className={`${container} pb-14 pt-8 md:pb-20`}>
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:items-end">
          <h1 className="font-serif text-[48px] leading-[1] text-ink sm:text-[64px] md:col-span-7 lg:text-[76px]">{title}</h1>
          {lead && <p className="text-[18px] leading-relaxed text-dim md:col-span-5">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
