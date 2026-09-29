import type { Metadata } from "next";
import { CONTACT, INSCRIPTION } from "../../components/liens";

export const metadata: Metadata = {
  title: "Questions fréquentes — Pelse",
  description: "Tarif, essai, appareils, techniciens, données : les réponses courtes aux questions qu'on nous pose.",
  robots: { index: true, follow: true },
};

// ============================================================
// LA FAQ (29/09/2026). L'application y renvoie (lib/support.mjs, `faq`) :
// elle vit ici, hors de l'app, pour rester lisible même si l'app est en panne.
//
// ⚠ CHAQUE RÉPONSE EST VÉRIFIÉE DANS LE CODE DE L'APPLICATION, pas écrite de
// mémoire. Le jour où Stripe passe en réel (carte enregistrée à
// l'inscription), la réponse « L'essai » change le même jour que la page
// d'accueil — voir docs/avant-la-vente.md dans le dépôt de l'app.
//
// Pas de script : des <details> natifs, qui s'ouvrent au doigt et se lisent
// sans JavaScript.
// ============================================================

type QR = { q: string; r: React.ReactNode };

const THEMES: { titre: string; questions: QR[] }[] = [
  {
    titre: "Tarif et essai",
    questions: [
      { q: "Combien ça coûte ?",
        r: <>Un seul tarif : 20 € HT par mois et par entreprise, tout compris, jusqu’à 20 utilisateurs. Pas de prix par technicien, pas d’option payante.</> },
      { q: "Comment se passe l’essai ?",
        r: <>Sept jours pour tout essayer, sans carte bancaire. <a href={INSCRIPTION}>Créez votre compte</a> en une minute.</> },
      { q: "Et à la fin de l’essai, si je ne m’abonne pas ?",
        r: <>Votre compte passe en lecture seule : rien n’est effacé, vous consultez toujours vos interventions, vos clients et vos documents. Vous vous abonnez quand vous voulez, et tout redevient modifiable.</> },
      { q: "Suis-je engagé ?",
        r: <>Non. L’abonnement est sans engagement, et se résilie en un clic depuis l’application.</> },
    ],
  },
  {
    titre: "Ce que fait Pelse",
    questions: [
      { q: "Pelse fait-il mes factures ?",
        r: <>Non, et c’est voulu. Pelse suit l’intervention du dépannage jusqu’au moment où elle est « à facturer » : rien ne s’oublie en route. Vous gardez votre logiciel de facturation habituel ; Pelse ne le remplace pas.</> },
      { q: "Et les devis ?",
        r: <>Pelse suit vos devis comme une démarche commerciale : rendez-vous à prendre, devis à faire, envoyé, à relancer, accepté. Il ne chiffre rien : le montant reste dans votre logiciel de devis.</> },
      { q: "Je fais de la climatisation : le Cerfa 15497 est-il inclus ?",
        r: <>Oui. Si votre entreprise fait de la climatisation, le Cerfa 15497 se remplit à partir de l’intervention, sur le formulaire officiel, et se classe tout seul.</> },
      { q: "Puis-je reprendre mes clients depuis Excel ?",
        r: <>Oui. Vous importez votre fichier Excel ; un fichier d’exemple montre les colonnes attendues. Un fichier réimporté complète les fiches existantes au lieu de les dupliquer.</> },
      { q: "Le planning se voit-il dans mon agenda ?",
        r: <>Oui, en abonnement de calendrier (Google Agenda, Apple Calendrier, Outlook), en lecture seule : on consulte dans son agenda, on modifie dans Pelse.</> },
    ],
  },
  {
    titre: "L’équipe",
    questions: [
      { q: "Que voit un technicien ?",
        r: <>Ses interventions, et seulement les siennes. Il lit la fiche du client et de l’immeuble où il va — téléphone du gardien, digicode, stationnement — sans appeler le bureau. Il ne voit ni les prix, ni les devis, ni le travail des autres techniciens.</> },
      { q: "Quels rôles puis-je donner ?",
        r: <>Quatre : dirigeant, secrétaire, chef d’équipe et technicien. Chacun voit ce qui le concerne ; le chef d’équipe prépare les chantiers et commande le matériel, sans accès à la facturation.</> },
      { q: "Mes techniciens n’ont pas toujours de réseau.",
        r: <>Pas de problème : le technicien consulte ses interventions et saisit son travail, son matériel et ses photos sans réseau. Tout part dès que le téléphone retrouve une connexion.</> },
    ],
  },
  {
    titre: "Appareils",
    questions: [
      { q: "Sur quels appareils ça marche ?",
        r: <>Sur ordinateur, et sur téléphone Android comme iPhone, depuis le navigateur. Sur téléphone, Pelse s’installe sur l’écran d’accueil comme une application : un QR code, dans les réglages de l’équipe, y mène chaque technicien.</> },
      { q: "Faut-il passer par l’App Store ou le Play Store ?",
        r: <>Non, pas pour l’instant : l’installation depuis le navigateur suffit, et donne la même application.</> },
    ],
  },
  {
    titre: "Vos données",
    questions: [
      { q: "Où sont mes données ?",
        r: <>En Europe : la base de données est hébergée dans l’Union européenne, et l’application tourne depuis Paris. Chaque entreprise est cloisonnée : aucune ne voit les données d’une autre.</> },
      { q: "Puis-je récupérer mes données ?",
        r: <>Oui, à tout moment : Réglages ▸ Export des données vous donne un fichier ZIP de tableaux lisibles dans Excel. Vos données restent les vôtres.</> },
    ],
  },
];

export default function Faq() {
  return (
    <main id="contenu" className="legal faq">
      <h1>Questions fréquentes</h1>
      <p className="legal__maj">Les réponses courtes. Une question qui n’y est pas ? Écrivez-nous.</p>

      {THEMES.map((t) => (
        <section key={t.titre}>
          <h2>{t.titre}</h2>
          {t.questions.map((x) => (
            <details key={x.q} className="faq__q">
              <summary>{x.q}</summary>
              <p>{x.r}</p>
            </details>
          ))}
        </section>
      ))}

      <h2>Nous écrire</h2>
      <p>
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a> — réponse sous 48 h maximum.
      </p>
    </main>
  );
}
