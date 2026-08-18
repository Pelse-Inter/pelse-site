import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Pelse",
  description: "Éditeur, hébergeur et contact du site pelse.fr.",
  robots: { index: true, follow: true },
};

// ============================================================
// GABARIT. Aucun contenu juridique n'est inventé ici : une mention légale
// fausse engage plus qu'une mention absente. La structure est posée, les
// valeurs sont à remplir.
// ============================================================
export default function MentionsLegales() {
  return (
    <main id="contenu" className="legal">
      <h1>Mentions légales</h1>
      <p className="legal__maj">À compléter avant la mise en ligne.</p>

      <h2>Éditeur du site</h2>
      {/* TODO Simon — raison sociale exacte, forme juridique, capital social,
          adresse du siège, SIRET, RCS et ville d'immatriculation, numéro de
          TVA intracommunautaire, nom du directeur de la publication. */}
      <p>À compléter : raison sociale, forme juridique, adresse du siège, SIRET,
         RCS, TVA intracommunautaire, directeur de la publication.</p>

      <h2>Hébergeur</h2>
      <p>
        Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.<br />
        <a href="https://vercel.com">vercel.com</a>
      </p>
      {/* TODO Simon — vérifier l'adresse de Vercel au moment de la publication :
          elle a déjà changé une fois. */}

      <h2>Contact</h2>
      <p><a href="mailto:contact@pelse.fr">contact@pelse.fr</a></p>

      <h2>Propriété intellectuelle</h2>
      {/* TODO Simon — clause de propriété du contenu, des marques et du logo. */}
      <p>À compléter.</p>

      <h2>Signalement d’un contenu</h2>
      {/* TODO Simon — procédure de signalement (LCEN art. 6). */}
      <p>À compléter.</p>
    </main>
  );
}
