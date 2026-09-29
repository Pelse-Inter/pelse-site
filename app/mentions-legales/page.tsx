import type { Metadata } from "next";
import Renvoi from "@/components/Renvoi";
import { MENTIONS } from "@/components/liens";

export const metadata: Metadata = { title: "Mentions légales — Pelse", robots: { index: false, follow: true } };

// Le texte vit dans l'application (voir components/Renvoi.tsx).
export default function Page() {
  return <Renvoi titre="Mentions légales" vers={MENTIONS} />;
}
