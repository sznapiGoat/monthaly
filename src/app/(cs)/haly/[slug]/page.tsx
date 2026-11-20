import { Hall, hallMeta, hallParams } from "@/views/Hall";

export const dynamicParams = false;
export const generateStaticParams = hallParams;

export async function generateMetadata({ params }: PageProps<"/haly/[slug]">) {
  return hallMeta("cs", (await params).slug);
}

export default async function Page({ params }: PageProps<"/haly/[slug]">) {
  return <Hall lang="cs" slug={(await params).slug} />;
}
