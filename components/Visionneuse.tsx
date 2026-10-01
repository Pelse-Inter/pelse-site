"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ============================================================
// LA VISIONNEUSE — une capture, en grand (01/10/2026).
//
// Toutes les captures du site sont des liens `a[data-agrandir]` vers leur
// grande version (components/Capture.tsx). Ici, on intercepte le clic et on
// montre l'image par-dessus la page :
//   • ← → (ou un glissé au doigt) pour passer aux autres captures de la page ;
//   • Échap, la croix ou un appui à côté pour fermer ;
//   • la petite image, déjà chargée, s'affiche tout de suite — la grande la
//     remplace dès qu'elle arrive (jamais d'écran vide en 4G).
// Un clic avec Ctrl / ⌘ / le bouton du milieu garde son sens : nouvel onglet.
// ============================================================

type Vue = { liens: HTMLAnchorElement[]; i: number };

export default function Visionneuse() {
  const [vue, setVue] = useState<Vue | null>(null);
  const [chargee, setChargee] = useState(false);
  // Le ZOOM : au téléphone, une capture d'ordinateur tient en 374 px de large
  // — on la voit, on ne la lit pas. Un toucher sur l'image l'agrandit, et on
  // s'y promène au doigt ; un second toucher la remet entière.
  const [zoom, setZoom] = useState(false);
  const fermerRef = useRef<HTMLButtonElement>(null);
  const origine = useRef<HTMLElement | null>(null);
  const debutDoigt = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const surClic = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const lien = (e.target as Element | null)?.closest?.("a[data-agrandir]") as HTMLAnchorElement | null;
      if (!lien) return;
      e.preventDefault();
      const liens = [...document.querySelectorAll<HTMLAnchorElement>("a[data-agrandir]")];
      origine.current = lien;
      setChargee(false);
      setZoom(false);
      setVue({ liens, i: Math.max(0, liens.indexOf(lien)) });
    };
    document.addEventListener("click", surClic);
    return () => document.removeEventListener("click", surClic);
  }, []);

  const fermer = useCallback(() => {
    setVue(null);
    origine.current?.focus({ preventScroll: true });
  }, []);
  const aller = useCallback((pas: number) => {
    setChargee(false);
    setZoom(false);
    setVue((v) => (v ? { ...v, i: (v.i + pas + v.liens.length) % v.liens.length } : v));
  }, []);

  useEffect(() => {
    if (!vue) return;
    const html = document.documentElement;
    const avant = html.style.overflow;
    html.style.overflow = "hidden";
    fermerRef.current?.focus();
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      else if (e.key === "ArrowRight") aller(1);
      else if (e.key === "ArrowLeft") aller(-1);
    };
    document.addEventListener("keydown", surTouche);
    return () => { html.style.overflow = avant; document.removeEventListener("keydown", surTouche); };
  }, [vue, fermer, aller]);

  if (!vue) return null;
  const lien = vue.liens[vue.i];
  const petite = lien.querySelector("img");
  const alt = petite?.alt ?? "";
  const plusieurs = vue.liens.length > 1;

  return (
    <div className="visio" role="dialog" aria-modal="true" aria-label={alt}
         onClick={(e) => { if (e.target === e.currentTarget) fermer(); }}
         onTouchStart={(e) => { const t = e.touches[0]; debutDoigt.current = { x: t.clientX, y: t.clientY }; }}
         onTouchEnd={(e) => {
           const d = debutDoigt.current; debutDoigt.current = null;
           // Zoomé, le doigt se promène dans l'image : il ne change pas d'image.
           if (!d || !plusieurs || zoom || e.touches.length > 0) return;
           const t = e.changedTouches[0];
           const dx = t.clientX - d.x, dy = t.clientY - d.y;
           if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) aller(dx < 0 ? 1 : -1);
         }}>
      <figure className="visio__cadre" onClick={(e) => { if (e.target === e.currentTarget) fermer(); }}>
        <div className={"visio__image" + (zoom ? " visio__image--zoom" : "")} role="button" tabIndex={0}
             aria-label={zoom ? "Voir l’image entière" : "Zoomer"} aria-pressed={zoom}
             onClick={() => setZoom((z) => !z)}
             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setZoom((z) => !z); } }}>
          {/* La petite, déjà en cache : visible tout de suite. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {!chargee && petite && <img className="visio__img" src={petite.currentSrc || petite.src} alt="" aria-hidden="true" />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={lien.href} className={"visio__img" + (chargee ? "" : " visio__img--attente")} src={lien.href} alt={alt}
               width={Number(lien.dataset.largeur) || undefined} height={Number(lien.dataset.hauteur) || undefined}
               onLoad={() => setChargee(true)} />
        </div>
        <figcaption className="visio__legende">
          {alt}{plusieurs && <span className="visio__compte"> · {vue.i + 1} / {vue.liens.length}</span>}
          <span className="visio__aide">{zoom ? "Touchez l’image pour la voir entière" : "Touchez l’image pour zoomer"}</span>
        </figcaption>
      </figure>
      <button ref={fermerRef} type="button" className="visio__btn visio__fermer" aria-label="Fermer" onClick={fermer}>×</button>
      {plusieurs && (
        <>
          <button type="button" className="visio__btn visio__prec" aria-label="Capture précédente" onClick={() => aller(-1)}>‹</button>
          <button type="button" className="visio__btn visio__suiv" aria-label="Capture suivante" onClick={() => aller(1)}>›</button>
        </>
      )}
    </div>
  );
}
