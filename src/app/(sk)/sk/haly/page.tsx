import { Halls, hallsMeta } from "@/views/Halls";

export const metadata = hallsMeta("sk");

export default function Page() {
  return <Halls lang="sk" />;
}
