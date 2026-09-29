import type { Metadata } from "next";
import Renvoi from "@/components/Renvoi";
import { CONFIDENTIALITE } from "@/components/liens";

export const metadata: Metadata = { title: "Politique de confidentialité — Pelse", robots: { index: false, follow: true } };

// Le texte vit dans l'application (voir components/Renvoi.tsx).
export default function Page() {
  return <Renvoi titre="Politique de confidentialité" vers={CONFIDENTIALITE} />;
}
