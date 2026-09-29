import dims from "@/app/captures-dimensions.json";

// ============================================================
// Une capture d'écran de l'application, dans son cadre.
//
// `width` et `height` sont TOUJOURS écrits : le navigateur réserve la place
// avant que l'image arrive, et la page ne saute pas sous le doigt de celui qui
// a commencé à lire.
//
// `srcset` propose deux largeurs pour les captures de bureau ; le navigateur
// prend celle qui convient à l'écran et à la connexion.
//
// Toutes viennent de la démonstration FICTIVE « Moreau Élec » (dépôt de
// l'app, scripts/demo) : aucune donnée de client réel.
// ============================================================
export type Nom = keyof typeof dims;

export function Capture({
  nom, alt, prioritaire = false, tailles,
}: {
  nom: Nom;
  alt: string;
  /** La première image visible : chargée tout de suite, pas en différé. */
  prioritaire?: boolean;
  /** Indication de la largeur d'affichage, pour que `srcset` choisisse juste. */
  tailles?: string;
}) {
  const d = dims[nom];
  const bureau = nom.startsWith("bureau-") || nom.startsWith("theme-");
  const largeurs = bureau ? [1600, 800] : [d.w];
  const src = `/captures/${nom}-${largeurs[0]}.webp`;
  const srcSet = largeurs.map((l) => `/captures/${nom}-${l}.webp ${l}w`).join(", ");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={largeurs.length > 1 ? srcSet : undefined}
      sizes={tailles}
      width={d.w}
      height={d.h}
      alt={alt}
      loading={prioritaire ? "eager" : "lazy"}
      fetchPriority={prioritaire ? "high" : undefined}
      decoding={prioritaire ? "sync" : "async"}
    />
  );
}

/** Un écran d'ordinateur. */
export function Ecran({ nom, alt, prioritaire = false, tailles = "(max-width: 900px) 100vw, 700px" }: {
  nom: Nom; alt: string; prioritaire?: boolean; tailles?: string;
}) {
  return <div className="ecran"><Capture nom={nom} alt={alt} prioritaire={prioritaire} tailles={tailles} /></div>;
}

/** Un téléphone : cadre sombre, angles très arrondis. */
export function Telephone({ nom, alt, prioritaire = false }: { nom: Nom; alt: string; prioritaire?: boolean }) {
  return <div className="tel"><Capture nom={nom} alt={alt} prioritaire={prioritaire} tailles="260px" /></div>;
}

/** Un document PDF produit par l'application (le haut de la feuille). */
export function Document({ nom, alt }: { nom: Nom; alt: string }) {
  return <div className="doc"><Capture nom={nom} alt={alt} tailles="400px" /></div>;
}
