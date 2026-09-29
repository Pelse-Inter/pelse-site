import { CadreBureau, CadreTelephone, Capture } from "@/components/Capture";
import { INSCRIPTION } from "@/components/liens";

// ============================================================
// Page d'accueil — reprise fidèle de la maquette.
//
// Deux écarts assumés par rapport au fichier de départ, tous deux demandés :
//
//  • le quatrième bloc parlait d'« affaires » (« Une affaire suit le chantier
//    de bout en bout »). Le mot n'existe plus dans l'application : c'est
//    « devis », et le matériel a ses propres listes. Le bloc parle donc
//    maintenant des LISTES DE MATÉRIEL, et un bloc « Devis » a pris la place
//    du premier cadre — l'accroche montrant déjà la liste des interventions,
//    la répéter juste en dessous n'apprenait rien.
//  • les boutons de la maquette étaient pilotés en JavaScript ; ce sont des
//    liens. Ils s'ouvrent dans un onglet, se copient, et marchent sans script.
// ============================================================
export default function Accueil() {
  return (
    <main id="contenu">
      {/* ---------- Accroche ---------- */}
      <section className="section section--accroche accroche">
        <div className="accroche__texte">
          <h1>Du dépannage à la facture, sans rien oublier.</h1>
          <p className="accroche__sous">
            Pelse organise les interventions, le planning et le terrain des petites
            entreprises d’électricité et de climatisation. De 1 à 10 personnes.
          </p>
          <div className="accroche__actions">
            <a className="btn btn--plein btn--grand" href={INSCRIPTION}>Essayer 7 jours gratuitement</a>
            <a className="btn btn--contour" href="#fonctionnalites">Voir comment ça marche</a>
          </div>
          <p className="accroche__mention">
            sans engagement · sans carte bancaire · résiliation en un clic
          </p>
        </div>

        <div className="accroche__visuel" data-reveal>
          <div className="cadre">
            <div className="cadre__image">
              <Capture
                nom="1-interventions-bureau"
                alt="Liste des interventions dans Pelse, groupée par date"
                prioritaire
                tailles="(max-width: 1168px) 100vw, 1072px"
              />
            </div>
          </div>
          <div className="cadre-mobile">
            <div className="cadre-mobile__image">
              <Capture
                nom="2-journee-technicien"
                alt="La journée d’un technicien sur mobile"
                largeurs={[750]}
                tailles="190px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Le problème ---------- */}
      <section className="section probleme" data-reveal>
        <h2>Vous connaissez déjà ces trois situations.</h2>
        <div className="grille-3">
          <div>
            <h3>Le dépannage noté sur un coin de bureau</h3>
            <p>On le retrouve trois semaines plus tard, quand le client rappelle.
               Entre-temps, personne ne savait qu’il existait.</p>
          </div>
          <div>
            <h3>Le matériel qu’on n’a pas commandé</h3>
            <p>Le chantier démarre lundi, le tableau n’est pas arrivé.
               Une journée perdue, un client qui attend.</p>
          </div>
          <div>
            <h3>« C’est quoi le code de la porte ? »</h3>
            <p>Le technicien est devant l’immeuble. Il appelle le bureau.
               Le bureau cherche. Tout le monde perd dix minutes.</p>
          </div>
        </div>
      </section>

      {/* ---------- Fonctionnalités ---------- */}
      <section id="fonctionnalites" className="section section--fonctions">

        <div className="fonction" data-reveal>
          <div className="fonction__texte">
            <p className="fonction__oeil">Devis</p>
            <h3>Aucun devis ne dort dans un tiroir</h3>
            <p>
              Les devis sont groupés par échéance, et ceux qui traînent passent en
              rouge avec le nombre de jours. Envoyé depuis trois semaines sans
              réponse ? Pelse vous dit de relancer. Rien ne se perd entre le
              rendez-vous et la signature.
            </p>
          </div>
          <div className="fonction__visuel">
            <CadreBureau nom="5-devis-retards" alt="Suivi des devis avec retards signalés" />
          </div>
        </div>

        <div className="fonction fonction--inverse" data-reveal>
          <div className="fonction__texte">
            <p className="fonction__oeil">Le terrain</p>
            <h3>Le technicien a tout dans la poche</h3>
            <p>
              Sa journée, les codes d’accès, l’itinéraire. Sur place, il saisit le
              travail fait, le matériel posé, les photos, et fait signer le client.
              Même sans réseau — tout se synchronise après.
            </p>
          </div>
          <div className="fonction__visuel fonction__visuel--tel">
            <CadreTelephone
              nom="3-fiche-technicien"
              alt="Fiche d’intervention mobile avec saisie et signature"
            />
          </div>
        </div>

        <div className="fonction" data-reveal>
          <div className="fonction__texte">
            <p className="fonction__oeil">Immeubles et syndics</p>
            <h3>Les codes d’accès au bon endroit</h3>
            <p>
              Chaque immeuble a sa fiche : codes d’accès, contacts, historique des
              interventions dans le bâtiment. Plus personne n’appelle le bureau
              depuis le trottoir.
            </p>
          </div>
          <div className="fonction__visuel">
            <CadreBureau nom="7-immeuble-digicode" alt="Fiche immeuble avec code d’accès et historique" />
          </div>
        </div>

        <div className="fonction fonction--inverse" data-reveal>
          <div className="fonction__texte">
            <p className="fonction__oeil">Matériel</p>
            <h3>Le matériel commandé avant que ça bloque</h3>
            <p>
              Une liste par chantier : ce qu’il faut, ce qui est commandé, ce qui est
              arrivé. On voit d’un coup d’œil ce qui manque encore — avant le lundi
              matin, pas devant le client.
            </p>
          </div>
          <div className="fonction__visuel">
            <CadreBureau nom="6-materiel" alt="Listes de matériel à commander" />
          </div>
        </div>

        <div className="fonction" data-reveal>
          <div className="fonction__texte">
            <p className="fonction__oeil">Cerfa 15497</p>
            <h3>Le Cerfa rempli tout seul</h3>
            <p>
              Pour les fluides frigorigènes, le Cerfa 15497 se remplit automatiquement
              à partir de l’intervention, se classe, et part chez le client.
              Fini le formulaire recopié le soir.
            </p>
            <p className="fonction__note">Concerne les entreprises de climatisation.</p>
          </div>
          <div className="fonction__visuel">
            <CadreBureau nom="4-cerfa-15497" alt="Fiche Cerfa 15497 remplie dans Pelse" />
          </div>
        </div>
      </section>

      {/* ---------- Ce qu'on ne fait pas ---------- */}
      <section className="section" data-reveal>
        <div className="pas-ca">
          <h2>Pelse ne fait ni devis chiffrés, ni facturation. C’est voulu.</h2>
          <p>
            Vous avez déjà un logiciel de facturation qui vous convient. On ne le
            remplace pas. Pelse s’occupe de tout ce qui se passe avant : le dépannage,
            le chantier, le terrain, le suivi — jusqu’au moment de facturer, sans rien
            avoir oublié en route.
          </p>
        </div>
      </section>

      {/* ---------- Tarif ---------- */}
      <section id="tarif" className="section" data-reveal>
        <div className="tarif">
          <div className="tarif__texte">
            <h2>Un seul tarif. Tout est inclus.</h2>
            <p className="tarif__intro">
              Pas de version limitée, pas d’options payantes, pas de surprise à la
              deuxième facture.
            </p>
            <div className="tarif__points">
              <p>Sans engagement.</p>
              <p>Résiliation en un clic, depuis l’application.</p>
              <p>Aucun commercial, aucun appel.</p>
            </div>
          </div>
          <div className="tarif__carte">
            <div className="tarif__prix">
              <span className="tarif__montant">20 €</span>
              <span className="tarif__unite">HT / mois</span>
            </div>
            <p className="tarif__precision">Par entreprise, jusqu’à 20 utilisateurs.</p>
            <ul className="tarif__inclus">
              <li>Interventions et planning</li>
              <li>Application mobile technicien, hors ligne</li>
              <li>Clients, immeubles et codes d’accès</li>
              <li>Devis, SAV et matériel</li>
              <li>Cerfa 15497 automatique</li>
            </ul>
            <a className="btn btn--plein btn--grand btn--bloc" href={INSCRIPTION}>
              Essayer 7 jours gratuitement
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Essai final ---------- */}
      <section id="essai" className="section section--essai essai" data-reveal>
        <h2>Essayez avec vos vraies interventions.</h2>
        <p>Sept jours. Sans carte bancaire. Si ça ne colle pas, vous fermez le compte vous-même.</p>
        <a className="btn btn--plein btn--xl" href={INSCRIPTION}>Essayer 7 jours gratuitement</a>
      </section>
    </main>
  );
}
