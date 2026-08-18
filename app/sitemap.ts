import type { MetadataRoute } from "next";

// `force-static` : même raison que robots.ts — en export statique, la route
// doit déclarer qu'elle ne dépend d'aucune requête.
export const dynamic = "force-static";

const SITE = "https://pelse.fr";

// Quatre pages, écrites à la main : une génération automatique n'apporterait
// rien tant qu'il n'y a pas de contenu qui bouge.
export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date();
  return [
    { url: `${SITE}/`,                  lastModified: maj, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/mentions-legales/`, lastModified: maj, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE}/cgv/`,              lastModified: maj, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE}/confidentialite/`,  lastModified: maj, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
