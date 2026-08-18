import Link from "next/link";
import { CONTACT } from "./liens";

export default function Footer() {
  return (
    <footer className="pied">
      <div className="pied__in">
        <div className="pied__marque">
          <span className="pied__p" aria-hidden="true">P</span>
          <span className="pied__copy">© {new Date().getFullYear()} Pelse</span>
        </div>
        <nav className="pied__nav" aria-label="Liens légaux">
          <Link href="/mentions-legales/">Mentions légales</Link>
          <Link href="/cgv/">CGV</Link>
          <Link href="/confidentialite/">Confidentialité</Link>
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
        </nav>
      </div>
    </footer>
  );
}
