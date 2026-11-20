import { Realization, realizationMeta, realizationParams } from "@/views/Realization";

export const dynamicParams = false;
export const generateStaticParams = realizationParams;

export async function generateMetadata({ params }: PageProps<"/sk/realizacie/[slug]">) {
  return realizationMeta("sk", (await params).slug);
}

export default async function Page({ params }: PageProps<"/sk/realizacie/[slug]">) {
  return <Realization lang="sk" slug={(await params).slug} />;
}
