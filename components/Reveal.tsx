"use client";

import { useEffect } from "react";

// ============================================================
// L'apparition au défilement de la maquette (`data-reveal`), en léger.
//
// Un IntersectionObserver, une classe posée une fois, et l'observation
// s'arrête : un bloc déjà apparu n'a plus rien à surveiller. Pas de listener
// de scroll, donc rien qui tourne pendant qu'on lit.
//
// La classe `js` sur <html> est posée ICI et pas dans le HTML : sans
// JavaScript, elle n'existe jamais et le CSS laisse tout visible. C'est
// l'ordre correct — cacher d'abord et révéler ensuite ferait disparaître la
// page entière chez qui bloque les scripts.
//
// `prefers-reduced-motion` est traité en CSS, pas ici : si quelqu'un change ce
// réglage pendant la visite, la page suit sans avoir à être rechargée.
// ============================================================
export default function Reveal() {
  useEffect(() => {
    const html = document.documentElement;
    const cibles = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!cibles.length) return;

    html.classList.add("js");

    // Réglage système : on ne cache rien du tout.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cibles.forEach((el) => el.classList.add("vu"));
      return;
    }

    const obs = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("vu");
          obs.unobserve(e.target);
        }
      },
      // Déclenché un peu avant l'entrée réelle : l'animation a fini quand le
      // bloc arrive vraiment sous les yeux, au lieu de commencer sous eux.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    cibles.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
