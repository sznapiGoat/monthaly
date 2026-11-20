import { RootShell, rootMetadata } from "@/components/RootShell";

export { viewport } from "@/components/RootShell";
export const metadata = rootMetadata("sk");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="sk">{children}</RootShell>;
}
