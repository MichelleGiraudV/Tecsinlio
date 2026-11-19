# Reel 05 · npm run dev vs npm run build (hecho: r05)

Duración: ~43 s · Tag: NPM · Vídeo: videos/r05-npm-dev-vs-build.mp4 (con música de fondo, sin voz).

## Escena 1 · La Duda
- **Título en pantalla:** ¿npm run dev o npm run build?
- **Voz:** "npm run dev, npm run build… Están en todos los proyectos. ¿Cuál uso y cuándo?"

## Escena 2 · Npm Run Dev
- **Título en pantalla:** Dev = cocina de prueba.
- **Voz:** "npm run dev es la cocina de prueba: levanta un servidor en tu ordenador y, cada vez que guardas, ves el cambio al momento."

## Escena 3 · Npm Run Build
- **Título en pantalla:** Build = plato empaquetado.
- **Voz:** "npm run build es el plato empaquetado: optimiza tu código y genera una carpeta lista para producción. No arranca nada, solo prepara."

## Escena 4 · De Dónde Salen
- **Título en pantalla:** Viven en package.json.
- **Voz:** "¿De dónde salen? De package.json. npm run y el nombre ejecuta ese script. Aquí, con Vite: dev, build y preview."

## Escena 5 · El Flujo
- **Título en pantalla:** Programas. Empaquetas. Publicas.
- **Voz:** "El flujo: programas con dev, empaquetas con build y publicas lo que sale del build. En producción, nunca dev."

## Escena 6 · Quédate Con Esto
- **Título en pantalla:** dev = programar. build = publicar.
- **Voz:** "dev para programar, build para publicar. Guárdalo y sígueme para más tec sin lío."

---
Notas técnicas revisadas: `npm run <nombre>` ejecuta el script de "scripts" en package.json. Con Vite: `vite` arranca el servidor de desarrollo, `vite build` genera `dist/`, `vite preview` sirve ese build en local para probarlo (no es para producción). La carpeta cambia según la herramienta: dist/ (Vite), build/ (Create React App), .next/ (Next.js).

Caption:
¿npm run dev o npm run build? 🤔

dev = cocina de prueba: servidor local y cambios al instante mientras programas.
build = plato empaquetado: código optimizado en una carpeta lista para producción.

Ambos salen de "scripts" en tu package.json.

💾 Guárdalo
💬 ¿Alguna vez subiste el modo dev a producción?

#tecsinlio #programacion #aprendeaprogramar #ingenieriadesoftware #tecnologia #npm #nodejs #javascript #desarrolloweb