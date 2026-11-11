// Renderiza los posts de content/*.json a PNG y crea la bandeja de revisión out/index.html
// Uso:  node src/render.js                 -> todos los JSON de content/
//       node src/render.js content/c02.json -> solo ese

import { createRequire } from "node:module";
// require() en vez de import: así también encuentra un Playwright instalado globalmente
const { chromium } = createRequire(import.meta.url)("playwright");
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { slideTypes } from "../templates/slides.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content");
const OUT = path.join(ROOT, "out");

const SIZES = {
  carousel: { w: 1080, h: 1350 },
  static: { w: 1080, h: 1350 },
  story: { w: 1080, h: 1920 },
};

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function slideHtml(post, slide, i, css) {
  const { w, h } = SIZES[post.format] || SIZES.carousel;
  const total = post.slides.length;
  const render = slideTypes[slide.type];
  if (!render) throw new Error(`[${post.id}] tipo de slide desconocido: ${slide.type}`);
  const bar =
    total > 1
      ? `<div class="bar">${Array.from({ length: total }, (_, k) => `<span class="${k <= i ? "on" : ""}"></span>`).join("")}</div>`
      : "";
  const n = String(i + 1).padStart(2, "0");
  const t = String(total).padStart(2, "0");
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
<body><div class="slide" style="--w:${w}px;--h:${h}px">
  <div class="head"><div class="brand">TEC SIN LÍO</div><div class="tag">${esc(post.tag || "DEV")}</div></div>
  ${slide.kicker ? `<div class="kicker">${esc(slide.kicker)}</div>` : ""}
  ${render(slide)}
  <div class="foot">${bar}<div class="foot-row"><span>DESARROLLO EXPLICADO FÁCIL</span><span>${total > 1 ? `${n}/${t}` : "@tecsinlio"}</span></div></div>
</div></body></html>`;
}

function captionText(post) {
  return `${post.caption || ""}\n\n${(post.hashtags || []).join(" ")}`.trim() + "\n";
}

function validate(post, file) {
  const errors = [];
  if (!post.id) errors.push("falta id");
  if (!SIZES[post.format]) errors.push(`format debe ser ${Object.keys(SIZES).join(" | ")}`);
  if (!Array.isArray(post.slides) || !post.slides.length) errors.push("faltan slides");
  if (post.format === "carousel" && post.slides?.length > 10) errors.push("Instagram admite máximo 10 slides por carrusel (sin contar vídeo)");
  if (post.format !== "carousel" && post.slides?.length > 1) errors.push("static/story llevan 1 slide");
  (post.slides || []).forEach((s, i) => {
    if (s.title && s.title.length > 60) errors.push(`slide ${i + 1}: título largo (${s.title.length} > 60)`);
  });
  if (errors.length) throw new Error(`${path.basename(file)}: ${errors.join("; ")}`);
}

async function main() {
  const css = await fs.readFile(path.join(ROOT, "templates/style.css"), "utf8");
  const args = process.argv.slice(2);
  const files = args.length
    ? args.map((f) => path.resolve(f))
    : (await fs.readdir(CONTENT)).filter((f) => f.endsWith(".json")).sort().map((f) => path.join(CONTENT, f));

  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const done = [];

  for (const file of files) {
    const post = JSON.parse(await fs.readFile(file, "utf8"));
    validate(post, file);
    const { w, h } = SIZES[post.format];
    await page.setViewportSize({ width: w, height: h });
    const dir = path.join(OUT, post.id);
    await fs.rm(dir, { recursive: true, force: true });
    await fs.mkdir(dir, { recursive: true });

    const images = [];
    for (const [i, slide] of post.slides.entries()) {
      await page.setContent(slideHtml(post, slide, i, css), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const name = `${String(i + 1).padStart(2, "0")}.png`;
      await page.screenshot({ path: path.join(dir, name), clip: { x: 0, y: 0, width: w, height: h } });
      // copia JPEG: es el formato que acepta la API de Instagram
      await page.screenshot({ path: path.join(dir, name.replace(".png", ".jpg")), type: "jpeg", quality: 92, clip: { x: 0, y: 0, width: w, height: h } });
      images.push(name);
    }
    await fs.writeFile(path.join(dir, "caption.txt"), captionText(post));
    if (post.story_sticker) await fs.writeFile(path.join(dir, "sticker.txt"), JSON.stringify(post.story_sticker, null, 2));
    done.push({ ...post, images });
    console.log(`✔ ${post.id} (${post.format}, ${images.length} ${images.length > 1 ? "imágenes" : "imagen"})`);
  }
  await browser.close();

  // Si solo se renderizó una parte, conserva el resto en la bandeja
  const all = [];
  for (const id of (await fs.readdir(OUT, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
    const fresh = done.find((p) => p.id === id);
    if (fresh) { all.push(fresh); continue; }
    const src = path.join(CONTENT, `${id}.json`);
    try {
      const post = JSON.parse(await fs.readFile(src, "utf8"));
      const images = (await fs.readdir(path.join(OUT, id))).filter((f) => f.endsWith(".png")).sort();
      all.push({ ...post, images });
    } catch { /* carpeta huérfana: se ignora */ }
  }
  await fs.writeFile(path.join(OUT, "index.html"), reviewPage(all));
  console.log(`\nBandeja de revisión: ${path.join(OUT, "index.html")}`);
}

function reviewPage(posts) {
  const card = (p) => `
  <article>
    <header><b>${esc(p.id.toUpperCase())}</b> · ${esc(p.format)} · ${esc(p.tag || "")} ${p.week ? `· semana ${esc(p.week)}` : ""}<h2>${esc(p.name || "")}</h2></header>
    <div class="strip">${p.images.map((img) => `<img loading="lazy" src="${esc(p.id)}/${img}" class="${p.format}">`).join("")}</div>
    <details open><summary>Caption</summary><pre>${esc(captionText(p))}</pre>
      <button onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent);this.textContent='Copiado ✔'">Copiar caption</button></details>
    ${p.story_sticker ? `<p class="note">Sticker: ${esc(JSON.stringify(p.story_sticker))}</p>` : ""}
    ${p.notes ? `<p class="note">Nota: ${esc(p.notes)}</p>` : ""}
  </article>`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tec Sin Lío · Para revisar</title>
<style>
body{margin:0;background:#0a111f;color:#e8eef7;font-family:Inter,system-ui,sans-serif;padding:24px}
h1{font-size:22px;margin:0 0 4px} .sub{color:#9fb0c8;margin:0 0 24px;font-size:14px}
article{background:#142237;border-radius:14px;padding:16px;margin-bottom:20px}
header{font-size:13px;color:#45dbe4} h2{margin:4px 0 12px;font-size:18px;color:#fff}
.strip{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px}
.strip img{height:320px;border-radius:8px;flex:none} .strip img.story{height:380px}
pre{white-space:pre-wrap;background:#0a111f;padding:12px;border-radius:8px;font-size:13px}
button{background:#45dbe4;color:#0a111f;border:0;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer}
summary{cursor:pointer;margin:8px 0} .note{color:#9fb0c8;font-size:13px}
</style></head><body>
<h1>Tec Sin Lío · Contenido para revisar</h1>
<p class="sub">${posts.length} piezas · generado ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}</p>
${posts.map(card).join("")}
</body></html>`;
}

main().catch((e) => { console.error("✘", e.message); process.exit(1); });
