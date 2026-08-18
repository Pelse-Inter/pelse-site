import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité — Pelse",
  description: "Comment Pelse traite les données personnelles.",
  robots: { index: true, follow: true },
};

// ============================================================
// GABARIT. Deux faits sont déjà vrais et écrits comme tels — ce site ne pose
// aucun traceur, et l'application héberge en Europe. Le reste est à compléter.
// ============================================================
export default function Confidentialite() {
  return (
    <main id="contenu" className="legal">
      <h1>Confidentialité</h1>
      <p className="legal__maj">À compléter avant la mise en ligne.</p>

      <h2>Ce site</h2>
      <p>
        Ce site ne dépose aucun cookie, n’utilise aucun outil de mesure d’audience
        et ne charge aucun script d’un autre domaine. Rien n’est à accepter,
        rien n’est à refuser : il n’y a rien à consentir.
      </p>

      <h2>L’application</h2>
      {/* TODO Simon — responsable de traitement, finalités, base légale,
          catégories de données (clients, interventions, photos, signatures),
          durées de conservation, sous-traitants (Supabase, Vercel, Stripe,
          Resend) et localisation de l'hébergement (Union européenne),
          droits d'accès / rectification / effacement / portabilité et
          l'adresse pour les exercer, réclamation auprès de la CNIL. */}
      <p>À compléter.</p>

      <h2>Contact</h2>
      <p><a href="mailto:contact@pelse.fr">contact@pelse.fr</a></p>
    </main>
  );
}
