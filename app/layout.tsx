import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const SITE = "https://pelse.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Pelse — Gestion d’interventions pour l’électricité et la climatisation",
  description:
    "Du dépannage à la facture, sans rien oublier. Pelse organise les interventions, "
    + "le planning et le terrain des petites entreprises d’électricité et de climatisation. "
    + "7 jours d’essai gratuit, sans carte bancaire.",
  applicationName: "Pelse",
  authors: [{ name: "Pelse" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE,
    siteName: "Pelse",
    title: "Pelse — Du dépannage à la facture, sans rien oublier.",
    description:
      "La gestion d’interventions des petites entreprises d’électricité et de climatisation. "
      + "7 jours d’essai gratuit, sans carte bancaire.",
    images: [{
      url: "/og.png", width: 1200, height: 630,
      alt: "L’accueil de Pelse : la semaine de l’équipe, un technicien par ligne, un jour par colonne.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pelse — Du dépannage à la facture, sans rien oublier.",
    description: "Gestion d’interventions pour les petites entreprises d’électricité et de climatisation.",
    images: ["/og.png"],
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* La police est chargée dès la première image : elle décide de la
            mise en page, l'attendre après le CSS ferait clignoter le texte. */}
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <a className="saut" href="#contenu">Aller au contenu</a>
        <Header />
        {children}
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
