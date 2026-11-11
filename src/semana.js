// Qué publicar en los próximos días, a partir de calendario.json
// Uso: node src/semana.js        -> próximos 7 días
//      node src/semana.js 14     -> próximos 14 días
// Escribe también PUBLICAR_ESTA_SEMANA.md con fechas, archivos y captions listos para copiar.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dias = parseInt(process.argv[2] || "7", 10);

const cal = JSON.parse(await fs.readFile(path.join(ROOT, "calendario.json"), "utf8"));
const hoy = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
hoy.setHours(0, 0, 0, 0);
const fin = new Date(hoy);
fin.setDate(fin.getDate() + dias);

const DIA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const ICON = { reel: "🎬", carousel: "🖼️", static: "📌", story: "⭕" };

const proximas = cal.publicaciones.filter((p) => {
  const d = new Date(p.fecha + "T00:00:00");
  return d >= hoy && d < fin && p.estado !== "publicado";
});

const caption = async (p) => {
  if (p.caption) return p.caption;
  if (p.caption_archivo) {
    try { return (await fs.readFile(path.join(ROOT, p.caption_archivo), "utf8")).trim(); } catch {}
  }
  return "(sin caption todavía)";
};

let md = `# Publicar: próximos ${dias} días\n\nGenerado el ${hoy.toLocaleDateString("es-ES")}. Programa cada pieza en Instagram (Opciones avanzadas → Programar) y cambia su "estado" a "programado" en calendario.json.\n`;
const resumen = [];

for (const p of proximas) {
  const d = new Date(p.fecha + "T00:00:00");
  const cuando = `${DIA[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1} · ${p.hora}`;
  const nombre = p.nombre || p.id;
  const aviso = p.estado === "por producir" ? " ⚠️ POR PRODUCIR" : p.estado === "programado" ? " ✅ ya programado" : "";
  resumen.push(`${ICON[p.formato] || "•"} ${cuando}  ${nombre}${aviso}`);
  md += `\n## ${ICON[p.formato] || ""} ${cuando} — ${nombre}${aviso}\n\n`;
  if (p.estado === "por producir") { md += `Este hueco necesita un reel nuevo. Pide el guion o publica un carrusel de reserva.\n`; continue; }
  md += `- Formato: ${p.formato}\n- Archivo: \`${p.archivo}\`${p.formato === "carousel" ? " (todas las imágenes, en orden)" : ""}\n${p.portada ? `- Portada del reel: \`${p.portada}\` (Editar portada → Añadir de la galería)\n` : ""}\nCaption:\n\n\`\`\`\n${await caption(p)}\n\`\`\`\n`;
}

if (!proximas.length) md += "\nNada pendiente en estos días.\n";
await fs.writeFile(path.join(ROOT, "PUBLICAR_ESTA_SEMANA.md"), md);
console.log(resumen.join("\n") || "Nada pendiente en estos días.");
console.log(`\nDetalle y captions en PUBLICAR_ESTA_SEMANA.md`);
