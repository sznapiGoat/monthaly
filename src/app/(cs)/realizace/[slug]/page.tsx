import { Realization, realizationMeta, realizationParams } from "@/views/Realization";

export const dynamicParams = false;
export const generateStaticParams = realizationParams;

export async function generateMetadata({ params }: PageProps<"/realizace/[slug]">) {
  return realizationMeta("cs", (await params).slug);
}

export default async function Page({ params }: PageProps<"/realizace/[slug]">) {
  return <Realization lang="cs" slug={(await params).slug} />;
}
