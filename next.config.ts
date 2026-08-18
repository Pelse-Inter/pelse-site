import type { NextConfig } from "next";

// ============================================================
// Site vitrine — EXPORT STATIQUE.
//
// Aucun code serveur, aucune variable d'environnement, aucune base. Le site
// est un dossier de fichiers ; Vercel le sert tel quel. C'est ce qui garantit
// qu'il ne peut rien casser dans l'application, et qu'il reste en ligne même
// si l'application, elle, tombe.
//
// `images.unoptimized` : l'optimiseur d'images de Next demande un serveur.
// Les captures sont donc préparées à l'avance (npm run images) et servies en
// <img srcset>, ce qui revient au même pour le visiteur et ne coûte rien.
// ============================================================
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Chaque page devient un dossier avec son index.html : /cgv/ plutôt que
  // /cgv.html. Les URL restent propres et sans extension.
  trailingSlash: true,
};

export default nextConfig;
