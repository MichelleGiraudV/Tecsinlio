// Plantillas de slide. Cada tipo recibe el objeto del JSON y devuelve el HTML del cuerpo.
// Tipos: cover, point, list, flow, close, glossary, meme, quiz, poll

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// `código` dentro de un texto -> resaltado cian; saltos de línea respetados
const rich = (s = "") =>
  esc(s).replace(/`([^`]+)`/g, '<span style="color:var(--cyan);font-family:DejaVu Sans Mono,monospace">$1</span>').replace(/\n/g, "<br>");

const codeBlock = (code) => {
  if (!code) return "";
  const multi = code.includes("\n");
  // en YAML/Dockerfile resalta la clave antes de ":" o la instrucción en mayúsculas
  const html = esc(code)
    .split("\n")
    .map((l) => l.replace(/^(\s*-?\s*)([A-Za-z_-]+:|[A-Z]{2,}\b)/, '$1<span class="k">$2</span>'))
    .join("\n");
  return `<div class="code${multi ? " block" : ""}">${html}</div>`;
};

export const slideTypes = {
  cover: (s) => `
    <div class="body">
      <div class="title xl">${rich(s.title)}</div>
      ${s.box ? `<div class="box">${rich(s.box)}</div>` : ""}
      ${s.text ? `<div class="text">${rich(s.text)}</div>` : ""}
    </div>`,

  point: (s) => `
    <div class="body">
      <div class="title${(s.title || "").length > 22 ? " long" : ""}">${rich(s.title)}</div>
      ${s.box ? `<div class="box">${rich(s.box)}</div>` : ""}
      ${codeBlock(s.code)}
      ${s.text ? `<div class="text">${rich(s.text)}</div>` : ""}
    </div>`,

  list: (s) => `
    <div class="body">
      <div class="title${(s.title || "").length > 22 ? " long" : ""}">${rich(s.title)}</div>
      <div class="list">
        ${(s.items || [])
          .map(
            (it, i) => `
          <div class="row${it.k && it.k.length > 9 ? " stack" : ""}${s.highlight === i ? " hi" : ""}">
            ${it.k ? `<div class="k${it.k.length > 9 ? " wide" : ""}">${esc(it.k)}</div>` : ""}
            <div class="v">${rich(it.v)}</div>
          </div>`
          )
          .join("")}
      </div>
      ${s.text ? `<div class="text">${rich(s.text)}</div>` : ""}
    </div>`,

  flow: (s) => `
    <div class="body">
      <div class="title${(s.title || "").length > 22 ? " long" : ""}">${rich(s.title)}</div>
      <div class="flow">
        ${(s.steps || [])
          .map(
            (st, i) =>
              `${i ? '<div class="arrow"></div>' : ""}<div class="box">${esc(st.k)}${st.v ? `<small>${esc(st.v)}</small>` : ""}</div>`
          )
          .join("")}
      </div>
      ${s.text ? `<div class="text">${rich(s.text)}</div>` : ""}
    </div>`,

  close: (s) => `
    <div class="body">
      <div class="title${(s.title || "").length > 22 ? " long" : ""}">${rich(s.title)}</div>
      ${s.text ? `<div class="text">${rich(s.text)}</div>` : ""}
      <div class="cta">${rich(s.cta || "Guárdalo y compártelo")}</div>
    </div>`,

  glossary: (s) => `
    <div class="body">
      <div class="text muted">Glosario</div>
      <div class="box" style="font-size:84px;padding:40px 72px">${esc(s.term)}</div>
      <div class="text" style="font-size:42px">${rich(s.definition)}</div>
      ${s.example ? codeBlock(s.example) : ""}
    </div>`,

  meme: (s) => `
    <div class="body">
      ${s.top ? `<div class="code" style="font-size:44px;text-align:center">${rich(s.top)}</div>` : ""}
      <div class="title xl">${rich(s.punch)}</div>
      ${s.text ? `<div class="text muted">${rich(s.text)}</div>` : ""}
    </div>`,

  quiz: (s) => `
    <div class="body">
      <div class="title">${rich(s.question)}</div>
      <div class="options">${(s.options || []).map((o) => `<div class="opt">${esc(o)}</div>`).join("")}</div>
      <div class="text muted">Responde en el sticker de la historia</div>
    </div>`,

  poll: (s) => slideTypes.quiz(s),
};
