import { Quote, quoteMeta } from "@/views/Quote";

export const metadata = quoteMeta("sk");

export default function Page() {
  return <Quote lang="sk" />;
}
