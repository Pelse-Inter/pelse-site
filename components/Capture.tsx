import dims from "@/app/captures-dimensions.json";

// ============================================================
// Une capture d'écran, dans son cadre blanc.
//
// `width` et `height` sont TOUJOURS écrits : le navigateur réserve la place
// avant que l'image arrive, et la page ne saute pas sous le doigt de celui qui
// a commencé à lire. C'est la moitié du score de stabilité visuelle.
//
// `srcset` propose deux largeurs pour les captures de bureau ; le navigateur
// prend celle qui convient à l'écran et à la connexion. Un téléphone télécharge
// 20 Ko là où il en aurait pris 55.
// ============================================================
type Nom = keyof typeof dims;

export function Capture({
  nom, alt, prioritaire = false, largeurs = [1600, 800], tailles,
}: {
  nom: Nom;
  alt: string;
  /** La première image visible : chargée tout de suite, pas en différé. */
  prioritaire?: boolean;
  largeurs?: number[];
  /** Indication de la largeur d'affichage, pour que `srcset` choisisse juste. */
  tailles?: string;
}) {
  const d = dims[nom];
  const src = `/captures/${nom}-${largeurs[0]}.webp`;
  const srcSet = largeurs.map((l) => `/captures/${nom}-${l}.webp ${l}w`).join(", ");
  return (
    <img
      src={src}
      srcSet={largeurs.length > 1 ? srcSet : undefined}
      sizes={tailles}
      width={d.w}
      height={d.h}
      alt={alt}
      loading={prioritaire ? "eager" : "lazy"}
      // `fetchPriority` sur la première image : elle démarre avant les
      // polices et les scripts, c'est elle qu'on attend en ouvrant la page.
      fetchPriority={prioritaire ? "high" : undefined}
      decoding={prioritaire ? "sync" : "async"}
    />
  );
}

/** Capture d'un écran de bureau, dans un cadre clair. */
export function CadreBureau({
  nom, alt, prioritaire = false, tailles = "(max-width: 900px) 100vw, 700px",
}: {
  nom: Nom; alt: string; prioritaire?: boolean; tailles?: string;
}) {
  return (
    <div className="cadre cadre--fonction">
      <div className="cadre__image">
        <Capture nom={nom} alt={alt} prioritaire={prioritaire} tailles={tailles} />
      </div>
    </div>
  );
}

/** Capture d'un téléphone, dans un cadre aux angles très arrondis. */
export function CadreTelephone({ nom, alt }: { nom: Nom; alt: string }) {
  return (
    <div className="cadre cadre--tel">
      <div className="cadre__image">
        <Capture nom={nom} alt={alt} largeurs={[750]} tailles="270px" />
      </div>
    </div>
  );
}
