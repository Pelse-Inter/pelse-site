import type { MetadataRoute } from "next";

// `force-static` : même raison que robots.ts — en export statique, la route
// doit déclarer qu'elle ne dépend d'aucune requête.
export const dynamic = "force-static";

const SITE = "https://pelse.fr";

// Trois pages : l'accueil, la visite, la FAQ. Les pages légales vivent dans
// l'application (app.pelse.fr) — leurs anciennes adresses ici ne font que
// renvoyer, elles n'ont pas à être indexées.
export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date();
  return [
    { url: `${SITE}/`,        lastModified: maj, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/visite/`, lastModified: maj, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/faq/`,    lastModified: maj, changeFrequency: "monthly", priority: 0.6 },
  ];
}
