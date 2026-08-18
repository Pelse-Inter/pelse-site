import Link from "next/link";
import { APP, INSCRIPTION } from "./liens";

// L'en-tête colle en haut : sur une page longue, le bouton d'essai ne doit
// jamais être à trois écrans de distance.
export default function Header() {
  return (
    <header className="entete">
      <div className="entete__in">
        <Link href="/" className="marque" aria-label="Pelse — accueil">
          <span className="marque__p" aria-hidden="true">P</span>
          <span className="marque__nom">Pelse</span>
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          {/* Ancre plutôt que bouton JavaScript : le lien se copie, s'ouvre
              dans un onglet, et fonctionne sans script. */}
          <a className="btn btn--fantome" href="/#tarif">Tarif</a>
          <a className="btn btn--fantome" href={APP}>Se connecter</a>
          <a className="btn btn--plein" href={INSCRIPTION}>Essayer gratuitement</a>
        </nav>
      </div>
    </header>
  );
}
