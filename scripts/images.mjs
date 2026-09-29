// ============================================================
// Prépare les captures pour le web : WebP, deux largeurs, dimensions connues.
//
//   npm run images
//
// Les originaux (2880 × 1800 et 1170 × 2532) pèsent 2,3 Mo à eux seuls. Sur un
// téléphone en 4G au bord d'une route — la situation de nos visiteurs — c'est
// la différence entre une page qui s'affiche et une page qu'on ferme.
//
//   • bureau : 1600 px et 800 px, le navigateur choisit via `srcset` ;
//   • mobile : 750 px, la largeur réelle d'affichage.
//
// `sharp` est un outil de CONSTRUCTION : il ne part pas dans le site. Le
// résultat est versionné, donc personne n'a besoin de le réinstaller pour
// déployer. (macOS ne sait pas écrire de WebP avec `sips` : essayé, refusé.)
// ============================================================
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE = process.env.CAPTURES_SRC ?? "../pelse/captures-site";
const CIBLE = "public/captures";

// Recadrages préalables, exprimés dans les pixels de l'original.
// Le Cerfa est capturé dans la visionneuse PDF du navigateur : on garde la
// FEUILLE et on jette l'habillage sombre de Chrome, qui n'est pas notre
// application et qui jurerait sur une page claire.
const RECADRAGE = {
  // Les PDF sont des feuilles A4 entières : on garde le HAUT (en-tête, client,
  // travail), là où se lit ce que le document apporte.
  "doc-rapport": { left: 0, top: 0, width: 2480, height: 2200 },
  "doc-cerfa":   { left: 0, top: 0, width: 2480, height: 2200 },
};

// Les captures de l'application d'aujourd'hui (29/09/2026), sur la démo
// fictive « Moreau Élec ». Chaque nom du site pointe vers le fichier que
// produit, dans le dépôt de l'app, `node scripts/demo/captures.mjs <dossier>`.
const ORIGINES = {
  "bureau-accueil": "1-bureau/01-accueil",               "bureau-planning": "1-bureau/02-planning-semaine",
  "bureau-interventions": "1-bureau/05-interventions",   "bureau-fiche": "1-bureau/06-intervention-en-cours",
  "bureau-devis": "1-bureau/10-devis",                   "bureau-sav": "1-bureau/13-sav",
  "bureau-materiel": "1-bureau/15-materiel",             "bureau-clients": "1-bureau/16-clients",
  "bureau-immeuble": "1-bureau/19-immeuble-acces",       "bureau-cerfa": "1-bureau/21-cerfa-fiche",
  "bureau-import": "1-bureau/22-import-clients",
  "theme-sombre": "4-themes/bureau-accueil-sombre",      "theme-beige": "4-themes/bureau-accueil-beige",
  "tel-accueil": "2-mobile-dirigeant/01-accueil",        "tel-devis": "2-mobile-dirigeant/04-devis",
  "tel-tech-liste": "3-mobile-technicien/01-mes-interventions",
  "tel-tech-acces": "3-mobile-technicien/02-fiche-acces-digicode",
  "tel-tech-planning": "3-mobile-technicien/03-planning",
  "tel-tech-encours": "3-mobile-technicien/06-intervention-en-cours",
  "tel-tech-chantier": "3-mobile-technicien/07-chantier-journal",
  "doc-rapport": "5-pdf/rapport-intervention",           "doc-cerfa": "5-pdf/cerfa-15497",
};
// Bureau : 1600 et 800 px (srcset). Téléphone : 750 px, sa largeur réelle
// d'affichage. Documents : 900 px.
const largeurs = (nom) => (nom.startsWith("tel-") ? [750] : nom.startsWith("doc-") ? [900] : [1600, 800]);
const PLAN = Object.keys(ORIGINES).map((n) => [n, largeurs(n)]);

fs.rmSync(CIBLE, { recursive: true, force: true });
fs.mkdirSync(CIBLE, { recursive: true });
const dimensions = {};
let total = 0;

for (const [nom, largeurs] of PLAN) {
  const src = path.join(SOURCE, `${ORIGINES[nom]}.png`);
  const coupe = RECADRAGE[nom];
  const base = () => (coupe ? sharp(src).extract(coupe) : sharp(src));
  const meta = coupe
    ? { width: coupe.width, height: coupe.height }
    : await sharp(src).metadata();
  for (const l of largeurs) {
    const dest = path.join(CIBLE, `${nom}-${l}.webp`);
    await base().resize({ width: l }).webp({ quality: 82 }).toFile(dest);
    const o = fs.statSync(dest).size;
    total += o;
    console.log(`✓ ${path.basename(dest).padEnd(38)} ${String(Math.round(o / 1024)).padStart(4)} Ko`);
  }
  // Écrites dans le HTML pour réserver la place AVANT le chargement : sans
  // width/height, la page saute au moment où l'image arrive.
  dimensions[nom] = { w: largeurs[0], h: Math.round((largeurs[0] * meta.height) / meta.width) };
}

// L'image de partage (Open Graph) est rendue par scripts/og.mjs : elle porte
// du texte, que sharp ne sait pas composer proprement.

// ---------- Favicon ----------
// Le logo de Pelse est un carré anthracite au P blanc. On le dessine ici
// plutôt que de dépendre d'un fichier : c'est la même forme que dans l'app,
// et elle tient en dix lignes.
{
  // Le VRAI symbole, repris de l'application — même tracé, même marque.
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="512" height="512">
    <rect width="640" height="640" rx="148" fill="#26292E"/>
    <path d="M205 135 H495 V540 H405 V225 H295 V465 H140 V375 H205 Z" fill="#FFFFFF"/>
  </svg>`);
  await sharp(svg).png().toFile("public/icon.png");
  await sharp(svg).resize(180, 180).png().toFile("public/apple-icon.png");
  console.log("✓ icon.png + apple-icon.png (symbole Pelse)");
}

fs.writeFileSync("app/captures-dimensions.json", JSON.stringify(dimensions, null, 2) + "\n");
console.log(`\nTotal images : ${Math.round(total / 1024)} Ko`);
