import { Hall, hallMeta, hallParams } from "@/views/Hall";

export const dynamicParams = false;
export const generateStaticParams = hallParams;

export async function generateMetadata({ params }: PageProps<"/sk/haly/[slug]">) {
  return hallMeta("sk", (await params).slug);
}

export default async function Page({ params }: PageProps<"/sk/haly/[slug]">) {
  return <Hall lang="sk" slug={(await params).slug} />;
}
