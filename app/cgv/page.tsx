import type { Metadata } from "next";
import Renvoi from "@/components/Renvoi";
import { CGV } from "@/components/liens";

export const metadata: Metadata = { title: "Conditions générales de vente — Pelse", robots: { index: false, follow: true } };

// Le texte vit dans l'application (voir components/Renvoi.tsx).
export default function Page() {
  return <Renvoi titre="Conditions générales de vente" vers={CGV} />;
}
