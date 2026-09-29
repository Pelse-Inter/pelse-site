// Vues d'ensemble du site, pour relecture.
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
fs.mkdirSync("apercu", { recursive: true });
const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"], protocolTimeout: 180000 });

const vues = [
  ["bureau",   { width: 1440, height: 900, deviceScaleFactor: 2 }, "/"],
  ["telephone",{ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, "/"],
  ["mentions", { width: 1440, height: 900, deviceScaleFactor: 2 }, "/mentions-legales/"],
];
for (const [nom, vp, url] of vues) {
  const p = await b.newPage();
  await p.setViewport(vp);
  await p.goto("http://localhost:4100" + url, { waitUntil: "networkidle0" });
  await p.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight) {
      scrollTo(0, y); await new Promise(r => setTimeout(r, 100));
    }
    scrollTo(0, 0);
  });
  await p.evaluate(() => Promise.all(Array.from(document.images).filter(i => !i.complete)
    .map(i => new Promise(r => { i.onload = i.onerror = r; }))));
  await p.evaluate(() => document.querySelectorAll("[data-reveal]").forEach(e => e.classList.add("vu")));
  await new Promise(r => setTimeout(r, 700));
  // `fullPage` avec une fenêtre de hauteur NORMALE. Agrandir la fenêtre à la
  // hauteur de la page semblait plus propre, mais l'en-tête collant se
  // recopiait alors à chaque écran : la capture montrait la page deux fois.
  await p.screenshot({ path: `apercu/${nom}.png`, fullPage: true });
  console.log(`✓ apercu/${nom}.png`);
  await p.close();
}
await b.close();
