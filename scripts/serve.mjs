import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const R = process.argv[2], P = Number(process.argv[3]);
const T = {".html":"text/html;charset=utf-8",".css":"text/css",".js":"text/javascript",".webp":"image/webp",".png":"image/png",".woff2":"font/woff2",".xml":"application/xml",".txt":"text/plain",".svg":"image/svg+xml"};
http.createServer((q,s)=>{
  let f = path.join(R, decodeURIComponent(q.url.split("?")[0]));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f,"index.html");
  if (!fs.existsSync(f)) { f = f + ".html"; }
  if (!fs.existsSync(f)) { s.writeHead(404); return s.end("404"); }
  s.writeHead(200,{ "content-type": T[path.extname(f)] ?? "application/octet-stream" });
  fs.createReadStream(f).pipe(s);
}).listen(P, ()=>console.log("http://localhost:"+P));
