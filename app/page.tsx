import Link from "next/link";
import { Document, Ecran, Telephone } from "@/components/Capture";
import { INSCRIPTION } from "@/components/liens";

// ============================================================
// Page d'accueil — refonte du 29/09/2026.
//
// Direction retenue par le dirigeant : « feuilles blanches » (le site
// ressemble à l'application), et les fonctionnalités racontées comme le
// PARCOURS D'UNE INTERVENTION, étape par étape, avec les couleurs que ces
// étapes portent dans l'app (à traiter orange, planifié marine, en cours ciel,
// terminée vert, à facturer gris).
//
// Chaque phrase dit ce que fait l'application AUJOURD'HUI — rien d'annoncé.
// Les boutons sont des liens : ils s'ouvrent dans un onglet, se copient, et
// marchent sans script.
// ============================================================
export default function Accueil() {
  return (
    <main id="contenu" className="main--fin">
      {/* ---------- Accroche ---------- */}
      <section className="in accroche">
        <span className="cap cap--bleu">Électricité · climatisation</span>
        <h1>Du dépannage à la facture, sans rien oublier.</h1>
        <p className="accroche__sous">
          Les interventions, le planning et le terrain des petites entreprises.
          Qui fait quoi cette semaine, ce qui traîne, ce qui reste à facturer —
          d’un coup d’œil, au bureau comme sur le chantier.
        </p>
        <div className="accroche__actions">
          <a className="btn btn--plein" href={INSCRIPTION}>Essayer 7 jours gratuitement</a>
          <Link className="btn btn--doux" href="/visite/">Découvrir l’application</Link>
        </div>
        <p className="accroche__mention"><span>Sans engagement</span> · <span>sans carte bancaire</span> · <span>jusqu’à 20 utilisateurs</span></p>
        <div className="vitrine" data-reveal>
          <Ecran nom="bureau-accueil" prioritaire tailles="(max-width: 1180px) 100vw, 1120px"
                 alt="L’accueil de Pelse sur ordinateur : la semaine de l’équipe, un technicien par ligne, un jour par colonne" />
          <Telephone nom="tel-accueil" alt="L’accueil de Pelse au téléphone : la journée de l’équipe, jour par jour" />
        </div>
      </section>

      {/* ---------- Le problème ---------- */}
      <section className="in section" data-reveal>
        <span className="cap cap--rouge">En retard <b>3</b></span>
        <h2>Vous connaissez déjà ces trois situations.</h2>
        <div className="feuilles">
          <div className="feuille">
            <span className="cap cap--orange">À traiter</span>
            <h3>Le dépannage noté sur un coin de bureau</h3>
            <p>On le retrouve trois semaines plus tard, quand le client rappelle. Entre-temps, personne ne savait qu’il existait.</p>
          </div>
          <div className="feuille">
            <span className="cap cap--jaune">À commander</span>
            <h3>Le matériel qu’on n’a pas commandé</h3>
            <p>Le chantier démarre lundi, le tableau n’est pas arrivé. Une journée perdue, un client qui attend.</p>
          </div>
          <div className="feuille">
            <span className="cap cap--ciel">Sur place</span>
            <h3>« C’est quoi le code de la porte ? »</h3>
            <p>Le technicien est devant l’immeuble. Il appelle le bureau, le bureau cherche. Tout le monde perd dix minutes.</p>
          </div>
        </div>
      </section>

      {/* ---------- Le parcours d'une intervention ---------- */}
      <section id="parcours" className="in section">
        <span className="cap cap--marine">Le parcours</span>
        <h2>Pelse suit chaque intervention, de l’appel à la facture.</h2>
        <p className="section__intro">
          Cinq étapes, et à chacune l’application vous dit ce qui attend un geste de vous. La couleur est rare :
          quand elle apparaît, c’est qu’il y a quelque chose à faire.
        </p>
        <div className="rail" aria-hidden="true">
          <span className="cap cap--orange">À traiter</span><span className="fl" />
          <span className="cap cap--marine">Planifié</span><span className="fl" />
          <span className="cap cap--ciel">En cours</span><span className="fl" />
          <span className="cap cap--vert">Terminée ✓</span><span className="fl" />
          <span className="cap cap--gris">À facturer</span>
        </div>

        <div className="etape" data-reveal>
          <div className="etape__txt">
            <span className="cap cap--orange">À traiter</span><span className="etape__num">1 / 5</span>
            <h3>Le dépannage ne reste plus sur un coin de bureau</h3>
            <p>Un appel, une intervention. Tant qu’elle n’a pas de date, elle reste en tête de l’accueil — avec les devis à faire et les SAV à rappeler.</p>
            <p>Les listes se rangent par date : aujourd’hui, en retard, demain, cette semaine, à planifier.</p>
          </div>
          <Ecran nom="bureau-interventions" alt="La liste des interventions, groupée par date" />
        </div>

        <div className="etape etape--inv" data-reveal>
          <div className="etape__txt">
            <span className="cap cap--marine">Planifié</span><span className="etape__num">2 / 5</span>
            <h3>Qui fait quoi cette semaine, et où il reste de la place</h3>
            <p>Le planning pose chaque intervention à son heure, une couleur par technicien. Les congés et les réunions y comptent, les chantiers s’étalent sur leurs jours.</p>
            <p>Votre agenda habituel s’y abonne, en lecture seule.</p>
          </div>
          <Ecran nom="bureau-planning" alt="Le planning de la semaine, une couleur par technicien" />
        </div>

        <div className="etape" data-reveal>
          <div className="etape__txt">
            <span className="cap cap--ciel">En cours</span><span className="etape__num">3 / 5</span>
            <h3>Sur place, le technicien a tout dans la poche</h3>
            <p>Sa journée, l’itinéraire, le digicode, le téléphone du gardien. Il saisit le travail, le matériel, les photos et la signature du client — même sans réseau.</p>
            <p>Son téléphone le prévient quand on lui donne une intervention ou qu’on la déplace. Il ne voit que les siennes, jamais les prix.</p>
          </div>
          <div className="etape__tels">
            <Telephone nom="tel-tech-liste" alt="La journée d’un technicien sur son téléphone" />
            <Telephone nom="tel-tech-acces" alt="La fiche d’intervention avec le digicode, l’étage et le stationnement" />
          </div>
        </div>

        <div className="etape etape--inv" data-reveal>
          <div className="etape__txt">
            <span className="cap cap--vert">Terminée ✓</span><span className="etape__num">4 / 5</span>
            <h3>Le rapport part tout seul. Le Cerfa aussi.</h3>
            <p>Le rapport d’intervention signé, en PDF, envoyé au client. En climatisation, le Cerfa 15497 se remplit à partir de l’intervention, sur le formulaire officiel.</p>
          </div>
          <div className="etape__docs">
            <Document nom="doc-rapport" alt="Un rapport d’intervention en PDF" />
            <Document nom="doc-cerfa" alt="Le Cerfa 15497 rempli par Pelse" />
          </div>
        </div>

        <div className="etape" data-reveal>
          <div className="etape__txt">
            <span className="cap cap--gris">À facturer</span><span className="etape__num">5 / 5</span>
            <h3>Rien n’arrive à la facture en retard</h3>
            <p>Ce qui est terminé attend d’être facturé, compté sur l’accueil. Les devis ont leur responsable et leur échéance ; celui qui traîne passe au rouge.</p>
            <p>Le matériel a sa liste : à commander, commandé, reçu.</p>
          </div>
          <Ecran nom="bureau-devis" alt="Les devis groupés par étape, avec leurs échéances" />
        </div>
      </section>

      {/* ---------- Ce qu'on ne fait pas ---------- */}
      <section className="in section" data-reveal>
        <div className="pas-ca">
          <div>
            <span className="cap cap--gris">C’est voulu</span>
            <h2>Pelse ne fait ni devis chiffrés, ni factures.</h2>
          </div>
          <p>
            Vous avez déjà un logiciel de facturation qui vous convient. On ne le remplace pas : Pelse s’occupe de tout
            ce qui se passe avant — le dépannage, le chantier, le terrain, le suivi — jusqu’au moment de facturer, sans
            rien avoir oublié en route.
          </p>
        </div>
      </section>

      {/* ---------- Tarif ---------- */}
      <section id="tarif" className="in section" data-reveal>
        <span className="cap cap--vert">Tarif</span>
        <h2>Un seul tarif. Tout est inclus.</h2>
        <p className="section__intro">Pas de version limitée, pas de prix par technicien, pas d’option payante.</p>
        <div className="tarif">
          <div className="feuille">
            <h3 style={{ margin: 0 }}>Ce qui est compris</h3>
            <ul className="liste">
              <li>Interventions, planning et semaine de l’équipe</li>
              <li>Application technicien, même hors connexion</li>
              <li>Clients, immeubles et codes d’accès</li>
              <li>Devis, SAV et matériel</li>
              <li>Rapports PDF signés et Cerfa 15497</li>
              <li>Import de vos clients depuis Excel</li>
            </ul>
          </div>
          <div className="feuille">
            <div className="tarif__prix">20 € <small>HT / mois</small></div>
            <p className="tarif__precision">Par entreprise, jusqu’à 20 utilisateurs.</p>
            <a className="btn btn--plein btn--bloc" href={INSCRIPTION}>Essayer 7 jours gratuitement</a>
            <p className="tarif__note">Sans engagement, résiliation en un clic depuis l’application.</p>
          </div>
        </div>
      </section>

      {/* ---------- Dernier appel ---------- */}
      <section className="fin" data-reveal>
        <h2>Essayez avec vos vraies interventions.</h2>
        <p>Sept jours. Sans carte bancaire. Si ça ne colle pas, vous fermez le compte vous-même.</p>
        <a className="btn" href={INSCRIPTION}>Essayer 7 jours gratuitement</a>
        <br />
        <Link className="fin__lien" href="/visite/">Ou faites d’abord le tour de l’application →</Link>
      </section>
    </main>
  );
}
