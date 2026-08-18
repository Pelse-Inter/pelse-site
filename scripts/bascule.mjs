import puppeteer from "puppeteer-core";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox","--allow-file-access-from-files"] });
const p = await b.newPage();
await p.goto("file:///Users/simon/Downloads/Page%20d'accueil%20Pelse.html", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r => setTimeout(r, 2500));
for (const w of [760, 800, 860, 900, 940, 1000, 1060, 1120]) {
  await p.setViewport({ width: w, height: 900 });
  await new Promise(r => setTimeout(r, 350));
  const cote = await p.evaluate(() => {
    // Premier bloc de fonctionnalité : texte et image sur la même ligne ?
    const sec = document.querySelector("#fonctionnalites");
    const bloc = sec?.children[0];
    if (!bloc || bloc.children.length < 2) return null;
    const [a, c] = [bloc.children[0].getBoundingClientRect(), bloc.children[1].getBoundingClientRect()];
    return { cote: Math.abs(a.top - c.top) < 40, largeurImage: Math.round(c.width) };
  });
  console.log(`${w}px → côte à côte : ${cote?.cote} (image ${cote?.largeurImage}px)`);
}
await b.close();
