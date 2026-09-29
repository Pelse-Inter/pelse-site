// Compare le site construit à la maquette, aux trois largeurs du protocole.
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MAQUETTE = "file:///Users/simon/Downloads/Page%20d'accueil%20Pelse.html";
const SITE = "http://localhost:4100/";
fs.mkdirSync("comparaison", { recursive: true });
const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox","--allow-file-access-from-files"], protocolTimeout: 180000 });
for (const [nom, url] of [["site", SITE], ["maquette", MAQUETTE]]) {
  for (const l of [380, 768, 1280]) {
    const p = await b.newPage();
    await p.setViewport({ width: l, height: 900, deviceScaleFactor: 1 });
    await p.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));
    // Faire défiler toute la page : sans cela le chargement différé ne se
    // déclenche jamais et la capture montre des cadres vides.
    await p.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const pas = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += pas) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await p.evaluate(() => Promise.all(
      Array.from(document.images).filter(i => !i.complete)
        .map(i => new Promise(r => { i.onload = i.onerror = r; }))));
    await new Promise(r => setTimeout(r, 600));
    // Tout révéler : on compare la mise en page, pas l'état d'une animation.
    await p.evaluate(() => document.querySelectorAll("[data-reveal]").forEach(e => {
      e.classList.add("vu"); e.style.opacity = "1"; e.style.transform = "none";
    }));
    await new Promise(r => setTimeout(r, 400));
    await p.screenshot({ path: `comparaison/${nom}-${l}.png`, fullPage: true });
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    console.log(`${nom.padEnd(9)} ${l}px → hauteur ${h}px`);
    await p.close();
  }
}
await b.close();
