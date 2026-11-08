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
        <div className="mt-10 md:mt-14">
          <h1 className="max-w-4xl font-display text-[45px] leading-[0.93] text-ink sm:text-[60px] lg:text-[71px]">{title}</h1>
          {lead && <p className="mt-5 max-w-[60ch] text-[18px] leading-relaxed text-dim">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
