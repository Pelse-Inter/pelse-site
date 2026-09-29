// ============================================================
// UNE PAGE DÉPLACÉE (29/09/2026).
//
// Les pages légales vivent dans l'application, complètes (components/liens.ts).
// L'ancienne adresse sur pelse.fr reste valable : elle renvoie tout de suite
// vers la bonne, et garde un lien pour le cas où le renvoi automatique serait
// bloqué. Le site est un export statique : pas de redirection côté serveur.
// ============================================================
export default function Renvoi({ titre, vers }: { titre: string; vers: string }) {
  return (
    <main id="contenu" className="renvoi">
      <meta httpEquiv="refresh" content={`0; url=${vers}`} />
      <link rel="canonical" href={vers} />
      <h1>{titre}</h1>
      <p>Cette page se trouve dans l’application.</p>
      <a className="btn btn--plein" href={vers}>Ouvrir la page</a>
    </main>
  );
}
