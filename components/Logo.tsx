// ============================================================
// Le logo de Pelse — le VRAI, celui de l'application.
//
// Un seul tracé SVG en `currentColor` : il suit la couleur du texte, se
// redimensionne sans jamais devenir flou, et pèse quelques octets. La
// géométrie est reprise telle quelle de l'app (app/pelse-logo.tsx), pour que
// le site et le logiciel montrent exactement la même marque.
//
// Un seul tracé et non des rectangles juxtaposés : des bords partagés
// laisseraient un fin liseré d'anticrénelage entre les formes.
//
// Tout le site passe par ici. Le jour où la marque évolue, c'est ce fichier
// et lui seul.
// ============================================================
export function Marque({ taille = 26 }: { taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 640 640" fill="currentColor"
         aria-hidden="true" focusable="false">
      <path d="M205 135 H495 V540 H405 V225 H295 V465 H140 V375 H205 Z" />
    </svg>
  );
}

/** Marque + mot « Pelse ». `taille` est celle du symbole, en pixels. */
export default function Logo({ taille = 26, mot = true }: { taille?: number; mot?: boolean }) {
  return (
    <span className="logo" style={{ ["--logo-taille" as string]: `${taille}px` }}>
      <Marque taille={taille} />
      {mot && <span className="logo__mot">Pelse</span>}
    </span>
  );
}
