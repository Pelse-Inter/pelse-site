// ============================================================
// L'image de partage (Open Graph) — public/og.png, 1200 × 630.
//
// C'est elle qui s'affiche quand on colle pelse.fr ou pelse.fr/visite dans
// WhatsApp, un SMS ou un e-mail. Elle est rendue par un vrai navigateur, à
// partir de la vraie capture de l'accueil : le texte y est composé avec la
// police du site (sharp ne sait pas faire les accents proprement).
//
//   npm run og                                  (Chrome de macOS)
//   CHROME=/chemin/vers/chrome npm run og       (ailleurs)
// ============================================================
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b64 = (f) => fs.readFileSync(f).toString("base64");
const police = b64("public/fonts/inter-latin.woff2");
const capture = b64("public/captures/bureau-accueil-1600.webp");

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url(data:font/woff2;base64,${police}) format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; }
body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #f2f3f6; color: #18181b;
       font-family: Inter, sans-serif; -webkit-font-smoothing: antialiased; position: relative; }
.txt { position: absolute; left: 72px; top: 72px; width: 560px; }
.marque { display: flex; align-items: center; gap: 14px; font-size: 30px; font-weight: 700; letter-spacing: -.02em; }
.marque svg { width: 48px; height: 48px; }
.cap { display: inline-block; margin-top: 44px; padding: 6px 14px; border-radius: 999px; font-size: 18px; font-weight: 600;
       background: #dbe7ff; color: #1d5fd6; }
h1 { margin: 20px 0 0; font-size: 50px; line-height: 1.08; letter-spacing: -.03em; font-weight: 750; }
p { margin: 22px 0 0; font-size: 22px; line-height: 1.4; color: #5f6778; }
.ecran { position: absolute; left: 660px; top: 92px; width: 900px; border-radius: 18px; overflow: hidden; background: #fff;
         box-shadow: 0 2px 4px rgba(20,30,60,.05), 0 30px 70px rgba(20,30,60,.16); }
.ecran img { display: block; width: 100%; }
</style></head><body>
<div class="txt">
  <div class="marque"><svg viewBox="0 0 640 640"><rect width="640" height="640" rx="148" fill="#26292E"/>
    <path d="M205 135 H495 V540 H405 V225 H295 V465 H140 V375 H205 Z" fill="#fff"/></svg>Pelse</div>
  <span class="cap">Électricité · climatisation</span>
  <h1>Du dépannage à la facture, sans rien oublier.</h1>
  <p>Interventions, planning et terrain, au bureau comme sur le chantier.</p>
</div>
<div class="ecran"><img src="data:image/webp;base64,${capture}" alt=""></div>
</body></html>`;

const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: "load" });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: "public/og.png" });
await b.close();
console.log(`✓ public/og.png (${Math.round(fs.statSync("public/og.png").size / 1024)} Ko)`);
