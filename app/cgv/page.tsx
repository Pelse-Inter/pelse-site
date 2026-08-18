import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Pelse",
  description: "Conditions générales de vente et d’utilisation du service Pelse.",
  robots: { index: true, follow: true },
};

// ============================================================
// GABARIT. Des CGV inventées seraient pires qu'aucune : elles vous
// engageraient sur des clauses que vous n'avez pas choisies. Structure seule.
// ============================================================
export default function Cgv() {
  return (
    <main id="contenu" className="legal">
      <h1>Conditions générales de vente</h1>
      <p className="legal__maj">À compléter avant la mise en ligne.</p>

      <h2>1. Objet et champ d’application</h2>
      {/* TODO Simon */}<p>À compléter.</p>

      <h2>2. Description du service</h2>
      {/* TODO Simon — périmètre exact : gestion d'interventions ; ni devis
          chiffrés, ni facturation. */}<p>À compléter.</p>

      <h2>3. Essai gratuit</h2>
      {/* TODO Simon — 7 jours, sans carte bancaire, ce qu'il advient des
          données à l'issue de l'essai si aucun abonnement n'est souscrit. */}
      <p>À compléter.</p>

      <h2>4. Prix et paiement</h2>
      {/* TODO Simon — 20 € HT par mois et par entreprise, jusqu'à 10
          utilisateurs ; TVA applicable ; prestataire de paiement (Stripe) ;
          date de prélèvement ; conséquence d'un impayé. */}<p>À compléter.</p>

      <h2>5. Durée, résiliation</h2>
      {/* TODO Simon — sans engagement, résiliation depuis l'application,
          effet de la résiliation, récupération des données. */}<p>À compléter.</p>

      <h2>6. Disponibilité et maintenance</h2>
      {/* TODO Simon */}<p>À compléter.</p>

      <h2>7. Responsabilité</h2>
      {/* TODO Simon */}<p>À compléter.</p>

      <h2>8. Données personnelles</h2>
      <p>Voir la <a href="/confidentialite/">politique de confidentialité</a>.</p>

      <h2>9. Droit applicable et litiges</h2>
      {/* TODO Simon — droit français, médiation de la consommation le cas
          échéant, juridiction compétente. */}<p>À compléter.</p>
    </main>
  );
}
