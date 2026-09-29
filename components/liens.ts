// ============================================================
// Le seul lien entre le site et l'application : des adresses.
//
// Rassemblées ici pour qu'un changement de domaine se fasse à un endroit —
// et pour qu'on voie d'un coup d'œil tout ce qui sort du site.
// ============================================================
export const APP = "https://app.pelse.fr";
export const INSCRIPTION = `${APP}/inscription`;
export const CONTACT = "contact@pelse.fr";

// LES PAGES LÉGALES VIVENT DANS L'APPLICATION (29/09/2026). Elles y sont
// complètes (mentions, CGV, confidentialité) et lisent l'identité de
// l'éditeur à un seul endroit (lib/editeur.ts du dépôt de l'app). Le site en
// gardait des copies « À compléter » : deux versions d'un texte juridique
// finissent toujours par se contredire. Le site y renvoie.
export const MENTIONS = `${APP}/mentions-legales`;
export const CGV = `${APP}/cgv`;
export const CONFIDENTIALITE = `${APP}/confidentialite`;
