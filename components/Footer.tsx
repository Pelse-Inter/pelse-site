import Link from "next/link";
import { APP, CGV, CONFIDENTIALITE, CONTACT, MENTIONS } from "./liens";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="pied">
      <div className="in pied__in">
        <div className="pied__marque">
          <Logo taille={18} mot={false} />
          <span>© {new Date().getFullYear()} Pelse · Du dépannage à la facture, sans rien oublier.</span>
        </div>
        <nav className="pied__nav" aria-label="Liens utiles">
          <Link href="/visite/">Découvrir l’application</Link>
          <Link href="/faq/">Questions fréquentes</Link>
          <a href={APP}>Se connecter</a>
          <a href={MENTIONS}>Mentions légales</a>
          <a href={CGV}>CGV</a>
          <a href={CONFIDENTIALITE}>Confidentialité</a>
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
        </nav>
      </div>
    </footer>
  );
}
