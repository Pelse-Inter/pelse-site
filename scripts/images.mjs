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

const SOURCE = process.env.CAPTURES_SRC ?? "/Users/simon/Projets/pelse/captures";
const CIBLE = "public/captures";

// Recadrages préalables, exprimés dans les pixels de l'original.
// Le Cerfa est capturé dans la visionneuse PDF du navigateur : on garde la
// FEUILLE et on jette l'habillage sombre de Chrome, qui n'est pas notre
// application et qui jurerait sur une page claire.
const RECADRAGE = {
  "4-cerfa-15497": { left: 950, top: 108, width: 1534, height: 906 },
};

const PLAN = [
  ["1-interventions-bureau", [1600, 800]],
  ["4-cerfa-15497",          [1600, 800]],
  ["5-devis-retards",        [1600, 800]],
  ["6-materiel",             [1600, 800]],
  ["7-immeuble-digicode",    [1600, 800]],
  ["2-journee-technicien",   [750]],
  ["3-fiche-technicien",     [750]],
];

fs.mkdirSync(CIBLE, { recursive: true });
const dimensions = {};
let total = 0;

for (const [nom, largeurs] of PLAN) {
  const src = path.join(SOURCE, `${nom}.png`);
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

// ---------- Image de partage (Open Graph) ----------
// 1200 × 630 imposé par les réseaux. La capture est plus haute que ce format :
// on recadre le HAUT, là où se trouvent le titre et le planning. Un recadrage
// centré couperait l'en-tête, c'est-à-dire ce qui identifie l'application.
{
  const src = path.join(SOURCE, "8-tableau-de-bord.png");
  await sharp(src).resize({ width: 1200 })
    .extract({ left: 0, top: 0, width: 1200, height: 630 })
    .png({ compressionLevel: 9 }).toFile("public/og.png");
  const o = fs.statSync("public/og.png").size;
  total += o;
  console.log(`✓ og.png${" ".repeat(31)} ${String(Math.round(o / 1024)).padStart(4)} Ko  (1200 × 630)`);
}

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
