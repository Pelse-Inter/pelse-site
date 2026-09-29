// Contrôles du protocole qui se mesurent : requêtes tierces, poids, liens.
import puppeteer from "puppeteer-core";
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"], protocolTimeout: 120000 });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
const req = [];
p.on("request", r => req.push(r.url()));
let poids = 0;
p.on("response", async r => { try { poids += (await r.buffer()).length; } catch {} });
await p.goto("http://localhost:4100/", { waitUntil: "networkidle0" });
await new Promise(r => setTimeout(r, 800));

const tiers = req.filter(u => !u.startsWith("http://localhost:4100") && !u.startsWith("data:"));
console.log("Requêtes vers un autre domaine :", tiers.length === 0 ? "aucune ✓" : tiers);
console.log(`Poids au premier chargement : ${Math.round(poids / 1024)} Ko (cible < 1500)`);

const liens = await p.evaluate(() => [...document.querySelectorAll("a[href]")].map(a => a.getAttribute("href")));
console.log("Liens sortants :", [...new Set(liens.filter(h => h.startsWith("http")))]);
console.log("Liens internes :", [...new Set(liens.filter(h => h.startsWith("/")))]);

const a11y = await p.evaluate(() => ({
  lang: document.documentElement.lang,
  titre: document.title,
  h1: document.querySelectorAll("h1").length,
  imagesSansAlt: [...document.images].filter(i => !i.alt).length,
  description: document.querySelector('meta[name="description"]')?.content?.slice(0, 60),
  og: document.querySelector('meta[property="og:image"]')?.content,
}));
console.log("Page :", JSON.stringify(a11y, null, 1));
await b.close();
