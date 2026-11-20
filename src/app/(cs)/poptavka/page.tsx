import { Quote, quoteMeta } from "@/views/Quote";

export const metadata = quoteMeta("cs");

export default function Page() {
  return <Quote lang="cs" />;
}
