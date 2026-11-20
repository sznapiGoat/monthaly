import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { NotFound } from "@/views/NotFound";

// Adresa mimo obě jazykové větve (dva kořenové layouty, proto globální 404).
export const metadata: Metadata = { title: "Stránka nenalezena | MontHaly" };

export default function GlobalNotFound() {
  return (
    <RootShell lang="cs">
      <NotFound lang="cs" />
    </RootShell>
  );
}
