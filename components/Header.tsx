import Link from "next/link";
import { APP, INSCRIPTION } from "./liens";
import Logo from "./Logo";

// L'en-tête colle en haut : sur une page longue, le bouton d'essai ne doit
// jamais être à trois écrans de distance. Au téléphone, il ne garde que
// « Découvrir » et « Essayer » : la barre ne touche jamais les bords.
export default function Header() {
  return (
    <header className="entete">
      <div className="in entete__in">
        <Link href="/" className="logo" aria-label="Pelse — accueil">
          <Logo taille={22} />
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          <Link className="nav__lien nav__lien--toujours" href="/visite/">Découvrir</Link>
          <a className="nav__lien" href="/#parcours">Fonctionnalités</a>
          <a className="nav__lien" href="/#tarif">Tarif</a>
          <Link className="nav__lien nav__lien--large" href="/faq/">Questions</Link>
          <a className="nav__lien nav__lien--large" href={APP}>Se connecter</a>
          <a className="btn btn--plein" href={INSCRIPTION}>Essayer</a>
        </nav>
      </div>
    </header>
  );
}
