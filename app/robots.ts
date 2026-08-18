import type { MetadataRoute } from "next";

// `force-static` : en export statique, Next exige de dire explicitement
// que la route ne dépend de rien. Elle devient robots.txt dans /out.
export const dynamic = "force-static";

// Rien à cacher : un site vitrine existe pour être trouvé.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://pelse.fr/sitemap.xml",
  };
}
