import { Contact, contactMeta } from "@/views/Contact";

export const metadata = contactMeta("sk");

export default function Page() {
  return <Contact lang="sk" />;
}
