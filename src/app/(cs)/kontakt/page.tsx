import { Contact, contactMeta } from "@/views/Contact";

export const metadata = contactMeta("cs");

export default function Page() {
  return <Contact lang="cs" />;
}
