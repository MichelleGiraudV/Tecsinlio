// Genera contenido nuevo con Claude: tema -> formato -> JSON -> revisión -> content/<id>.json
//
// Uso:
//   node src/generate.js "Variables de entorno"              -> elige el formato solo
//   node src/generate.js "Variables de entorno" --format static
//   node src/generate.js --weekly                            -> propone y crea 1 carrusel + 1 estático + 1 historia
//
// Necesita: ANTHROPIC_API_KEY  (opcional: ANTHROPIC_MODEL)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content");
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5"; // cámbialo por el modelo que tengas disponible
const KEY = process.env.ANTHROPIC_API_KEY;

const PREFIX = { carousel: "c", static: "e", story: "s" };

// ---------- Reglas de la cuenta (las mismas que en el doc "Plantillas y reglas") ----------
const RULES = `
Eres el guionista de "Tec Sin Lío", una cuenta de Instagram que explica desarrollo de software en español, estilo "para dummies".
Público: gente que empieza a programar o devs junior. Tono cercano, frases cortas, cero jerga sin explicar. Español de España neutro.

Reglas:
- Un concepto por pieza. Siempre una metáfora sencilla o un ejemplo real.
- Siempre que aplique, un comando o snippet REAL que funcione si se copia tal cual.
- Títulos de slide: máximo 6 palabras (máx. 40 caracteres). Textos: máximo 2 líneas (máx. 90 caracteres).
- El último slide de un carrusel es tipo "close" y termina con una idea de 3 palabras + CTA (guardar, comentar).
- Caption: hook en la primera línea, 3-5 líneas, 1-3 emojis, CTA final. Hashtags: 8-10, siempre incluye #tecsinlio.
- Tag (etiqueta superior): una palabra en mayúsculas: DOCKER, GIT, CI/CD, CLOUD, GLOSARIO, QUIZ, etc.

Cómo elegir formato:
- Lista de comandos, pasos o checklist -> "carousel" (6-9 slides)
- Una palabra o definición -> "static" con slide "glossary"
- Algo con humor -> "static" con slide "meme"
- Pregunta a la audiencia -> "story" con slide "quiz" (añade story_sticker)

Tipos de slide y sus campos:
- cover:    {type, kicker, title, box?, text?}
- point:    {type, kicker, title, box?, code?, text?}       (code admite saltos de línea \\n)
- list:     {type, kicker, title, items:[{k, v}], text?}     (k corto, p.ej. un comando; v explicación)
- flow:     {type, kicker, title, steps:[{k, v?}]}           (3-5 pasos)
- close:    {type, title, text?, cta}
- glossary: {type, term, definition, example?}
- meme:     {type, top, punch, text?}
- quiz:     {type, question, options:[2 opciones]}
En los textos puedes marcar código inline con \`backticks\`.

Formato de salida: SOLO un objeto JSON, sin texto alrededor:
{"name","format":"carousel|static|story","tag","caption","hashtags":[...],"slides":[...], "story_sticker"?: {"type":"quiz","question","options","correct"}}
`;

async function claude(system, user, maxTokens = 4000) {
  if (!KEY) throw new Error("Falta ANTHROPIC_API_KEY");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content.map((c) => c.text || "").join("");
}

// Extrae el primer objeto/array JSON de la respuesta (por si viene con ```json alrededor)
const parseJson = (txt) => {
  const clean = txt.replace(/```(?:json)?/g, "");
  const i = clean.search(/[[{]/);
  const close = clean[i] === "{" ? "}" : "]";
  return JSON.parse(clean.slice(i, clean.lastIndexOf(close) + 1));
};

async function existing() {
  const files = (await fs.readdir(CONTENT)).filter((f) => f.endsWith(".json"));
  return Promise.all(files.map(async (f) => JSON.parse(await fs.readFile(path.join(CONTENT, f), "utf8"))));
}

async function nextId(format) {
  const p = PREFIX[format];
  const nums = (await existing()).map((x) => x.id).filter((id) => id?.startsWith(p)).map((id) => parseInt(id.slice(1), 10) || 0);
  return p + String(Math.max(0, ...nums) + 1).padStart(2, "0");
}

// ---------- Agente 1: guionista ----------
async function write(topic, format) {
  const ask = `Tema: ${topic}\n${format ? `Formato obligatorio: ${format}` : "Elige tú el formato más adecuado según las reglas."}`;
  return parseJson(await claude(RULES, ask));
}

// ---------- Agente 2: revisor ----------
async function review(post) {
  const sys = `${RULES}\nAhora eres el REVISOR técnico. Comprueba: (1) que todo lo técnico es correcto y los comandos funcionan tal cual, (2) que cumple los límites de longitud, (3) que se entiende sin conocimientos previos.
Devuelve SOLO JSON: {"ok": true|false, "notes": "qué cambiaste o qué debe mirar el humano (1-2 frases)", "post": <el post corregido completo>}`;
  const out = parseJson(await claude(sys, JSON.stringify(post)));
  return out;
}

async function create(topic, format) {
  console.log(`✍️  Escribiendo: ${topic}${format ? ` (${format})` : ""}`);
  const draft = await write(topic, format);
  console.log(`🔍 Revisando…`);
  const { ok, notes, post } = await review(draft);
  const final = post || draft;
  if (!PREFIX[final.format]) throw new Error(`Formato inválido devuelto: ${final.format}`);
  final.id = await nextId(final.format);
  final.status = "pendiente";
  final.notes = `${ok ? "Revisor OK" : "⚠️ Revisor con dudas"}: ${notes || "-"}`;
  final.topic = topic;
  const file = path.join(CONTENT, `${final.id}.json`);
  await fs.writeFile(file, JSON.stringify(final, null, 2));
  console.log(`✔ ${final.id} → ${path.relative(ROOT, file)}  (${final.notes})`);
  return final;
}

// ---------- Modo semanal: propone temas sin repetir ----------
async function weekly() {
  const done = (await existing()).map((p) => `${p.id}: ${p.name || p.topic}`).join("\n");
  let backlog = "";
  try { backlog = await fs.readFile(path.join(ROOT, "topics.md"), "utf8"); } catch {}
  const sys = `${RULES}\nAhora eres el EDITOR. Propón temas para esta semana.`;
  const ask = `Ya publicado o preparado (no repetir):\n${done}\n\nIdeas pendientes del autor (priorízalas si encajan):\n${backlog || "(ninguna)"}\n
Devuelve SOLO JSON: [{"topic": "...", "format": "carousel"}, {"topic": "...", "format": "static"}, {"topic": "...", "format": "story"}]
Los temas deben seguir el orden lógico de aprendizaje (Docker -> Git -> CI/CD -> Cloud) y enlazar con lo ya publicado.`;
  const plan = parseJson(await claude(sys, ask, 1000));
  console.log("📅 Plan de la semana:", plan.map((p) => `${p.format}: ${p.topic}`).join(" | "));
  for (const p of plan) await create(p.topic, p.format);
}

const args = process.argv.slice(2);
const fmtIdx = args.indexOf("--format");
const format = fmtIdx >= 0 ? args[fmtIdx + 1] : undefined;
const topic = args.filter((a, i) => !a.startsWith("--") && !(fmtIdx >= 0 && i === fmtIdx + 1)).join(" ").trim();

(async () => {
  if (args.includes("--weekly")) return weekly();
  if (!topic) {
    console.log('Uso: node src/generate.js "tema" [--format carousel|static|story]  |  node src/generate.js --weekly');
    process.exit(1);
  }
  await create(topic, format);
})().catch((e) => { console.error("✘", e.message); process.exit(1); });
