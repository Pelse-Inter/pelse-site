import type { Metadata } from "next";
import { Document, Ecran, Telephone, type Nom } from "@/components/Capture";
import { INSCRIPTION } from "@/components/liens";

export const metadata: Metadata = {
  title: "Découvrir l’application — Pelse",
  description: "Le tour de Pelse, écran par écran : l’accueil, le planning, les interventions, les devis, le technicien sur son téléphone, les rapports et le Cerfa.",
  alternates: { canonical: "/visite/" },
  openGraph: {
    title: "Découvrir Pelse, écran par écran",
    description: "L’application de gestion d’interventions des petites entreprises d’électricité et de climatisation.",
    url: "/visite/",
  },
  robots: { index: true, follow: true },
};

// ============================================================
// LA VISITE — l'application, écran par écran (29/09/2026).
//
// Demandé par le dirigeant : « comment je peux la partager rapidement sans
// avoir à partager capture par capture ? ». Une page, un lien : pelse.fr/visite.
// Elle se lit au téléphone de haut en bas, et chaque écran dit en une phrase
// ce qu'il apporte.
//
// Toutes les captures viennent de la démonstration FICTIVE « Moreau Élec » :
// aucune donnée de client réel.
// ============================================================

type Planche = { nom: Nom; titre: string; texte: string; alt: string };

const BUREAU: Planche[] = [
  { nom: "bureau-accueil", titre: "L’accueil", alt: "L’accueil : la semaine de l’équipe",
    texte: "La semaine de l’équipe : un technicien par ligne, un jour par colonne. Dessous, ce qui est à traiter, planifié, en cours, à facturer." },
  { nom: "bureau-planning", titre: "Le planning", alt: "Le planning de la semaine",
    texte: "Chaque intervention à son heure, une couleur par technicien ; les devis et les SAV y ont leur bloc. On déplace d’un glisser ; les congés et les réunions comptent." },
  { nom: "bureau-interventions", titre: "Les interventions", alt: "La liste des interventions",
    texte: "Groupées par date : aujourd’hui, en retard, demain, cette semaine, à planifier. Le client, l’adresse, le numéro, sur chaque ligne." },
  { nom: "bureau-fiche", titre: "Une intervention", alt: "La fiche d’une intervention",
    texte: "Tout sur une page : le client, le travail à faire, le temps passé, le matériel, les photos, le rapport." },
  { nom: "bureau-devis", titre: "Les devis", alt: "La liste des devis",
    texte: "Du rendez-vous à l’acceptation, chaque devis a son étape, son responsable et son échéance. Ce qui traîne passe au rouge." },
  { nom: "bureau-sav", titre: "Le SAV", alt: "La liste des SAV",
    texte: "Vérification, attente fournisseur, remplacement : chaque retour client suivi jusqu’au bout." },
  { nom: "bureau-materiel", titre: "Le matériel", alt: "Le matériel à commander",
    texte: "À commander, commandé, reçu. La commande se prépare par fournisseur, en un geste." },
  { nom: "bureau-immeuble", titre: "Les immeubles", alt: "La fiche d’un immeuble",
    texte: "Le digicode, l’étage, le stationnement, le gardien : ce qu’on cherche en arrivant, au même endroit." },
  { nom: "bureau-clients", titre: "Les clients", alt: "La liste des clients",
    texte: "Le répertoire, avec ce qui est en cours et à facturer chez chacun. Il s’importe depuis Excel." },
  { nom: "bureau-cerfa", titre: "Le Cerfa 15497", alt: "Une fiche Cerfa 15497",
    texte: "Pour la climatisation : la fiche se remplit depuis l’intervention, sur le formulaire officiel, et se signe." },
];

const TELEPHONE: Planche[] = [
  { nom: "tel-accueil", titre: "Le dirigeant", alt: "L’accueil au téléphone",
    texte: "La journée de chaque technicien, jour par jour, et ce qui est à traiter." },
  { nom: "tel-tech-liste", titre: "Le technicien", alt: "Les interventions du technicien",
    texte: "Ses interventions seulement, avec l’itinéraire et l’appel à un geste. Son téléphone le prévient quand on lui en donne une, ou qu’on la déplace." },
  { nom: "tel-tech-acces", titre: "Sur place", alt: "La fiche avec les codes d’accès",
    texte: "Le digicode et le gardien, sans appeler le bureau." },
  { nom: "tel-tech-encours", titre: "Le travail fait", alt: "Une intervention en cours",
    texte: "Travail, matériel, photos, signature — même sans réseau." },
];

export default function Visite() {
  return (
    <main id="contenu" className="main--fin">
      <section className="in visite-tete">
        <span className="cap cap--bleu">La visite</span>
        <h1>Pelse, écran par écran.</h1>
        <p>
          Ce que voient le bureau, le dirigeant et le technicien, tel quel. Les données sont celles d’une entreprise
          de démonstration, inventée. Touchez une capture pour la voir en grand.
        </p>
        <nav className="sommaire" aria-label="Aller à">
          <a className="cap cap--marine" href="#bureau">Au bureau</a>
          <a className="cap cap--ciel" href="#telephone">Au téléphone</a>
          <a className="cap cap--vert" href="#documents">Les documents</a>
          <a className="cap cap--gris" href="#themes">Les thèmes</a>
        </nav>
      </section>

      <section id="bureau" className="in vue">
        <span className="cap cap--marine">Au bureau</span>
        <h2>Sur l’ordinateur</h2>
        <p className="vue__intro">Le dirigeant, la secrétaire et le chef d’équipe voient toute l’activité, et d’abord ce qui attend un geste.</p>
        <div className="planches">
          {BUREAU.map((p, i) => (
            <figure key={p.nom} className="planche" data-reveal>
              <Ecran nom={p.nom} alt={p.alt} prioritaire={i === 0} tailles="(max-width: 860px) 100vw, 570px" />
              <figcaption><b>{p.titre}.</b> {p.texte}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="telephone" className="in vue">
        <span className="cap cap--ciel">Au téléphone</span>
        <h2>Dans la poche</h2>
        <p className="vue__intro">
          Le même compte, sur téléphone. Le technicien ne voit que ses interventions — ni prix, ni devis, ni le travail des
          autres. Pelse s’installe sur l’écran d’accueil comme une application.
        </p>
        <div className="planches planches--tel">
          {TELEPHONE.map((p) => (
            <figure key={p.nom} className="planche" data-reveal>
              <Telephone nom={p.nom} alt={p.alt} />
              <figcaption><b>{p.titre}.</b> {p.texte}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="documents" className="in vue">
        <span className="cap cap--vert">Les documents</span>
        <h2>Ce que reçoit le client</h2>
        <p className="vue__intro">Produits par l’application à la fin de l’intervention, sans rien recopier.</p>
        <div className="planches planches--doc">
          <figure className="planche" data-reveal>
            <Document nom="doc-rapport" alt="Un rapport d’intervention en PDF" />
            <figcaption><b>Le rapport d’intervention.</b> Signé sur place, en PDF, à votre logo.</figcaption>
          </figure>
          <figure className="planche" data-reveal>
            <Document nom="doc-cerfa" alt="Le Cerfa 15497 rempli" />
            <figcaption><b>Le Cerfa 15497.</b> Le formulaire officiel, rempli.</figcaption>
          </figure>
        </div>
      </section>

      <section id="themes" className="in vue">
        <span className="cap cap--gris">Les thèmes</span>
        <h2>Clair, beige ou sombre</h2>
        <p className="vue__intro">Chacun choisit le sien, et la couleur des boutons.</p>
        <div className="planches">
          <figure className="planche" data-reveal>
            <Ecran nom="theme-beige" alt="L’accueil en thème beige" tailles="(max-width: 860px) 100vw, 570px" />
            <figcaption><b>Beige.</b> Plus doux pour les longues journées au bureau.</figcaption>
          </figure>
          <figure className="planche" data-reveal>
            <Ecran nom="theme-sombre" alt="L’accueil en thème sombre" tailles="(max-width: 860px) 100vw, 570px" />
            <figcaption><b>Sombre.</b> Pour le soir, ou par goût.</figcaption>
          </figure>
        </div>
      </section>

      <section className="fin">
        <h2>Le plus simple, c’est d’essayer.</h2>
        <p>Sept jours, sans carte bancaire, avec vos vraies interventions.</p>
        <a className="btn" href={INSCRIPTION}>Essayer 7 jours gratuitement</a>
      </section>
    </main>
  );
}
