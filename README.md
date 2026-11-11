# Tec Sin Lío · Generador de contenido

Crea carruseles, posts estáticos e historias con el estilo de la cuenta y los deja listos para revisar.

```
Tema ─► Agente guionista ─► Agente revisor ─► JSON ─► Render (PNG) ─► Bandeja de revisión ─► Tú apruebas
```

## Puesta en marcha (5 min)

```bash
npm install
npx playwright install chromium
npm run render            # renderiza todo lo que hay en content/
open out/index.html       # bandeja de revisión
```

## Crear contenido nuevo

```bash
export ANTHROPIC_API_KEY=sk-ant-...
export ANTHROPIC_MODEL=claude-sonnet-4-5    # o el modelo que uses

node src/generate.js "Variables de entorno"                    # elige el formato solo
node src/generate.js "Variables de entorno" --format carousel  # forzar formato
npm run weekly                                                 # 1 carrusel + 1 estático + 1 historia
```

Cada pieza nueva se guarda en `content/<id>.json` con `"status": "pendiente"` y una nota del revisor.

## Automático cada semana (GitHub Actions)

1. Sube esta carpeta a un repo de GitHub.
2. En **Settings → Secrets and variables → Actions**:
   - Secret `ANTHROPIC_API_KEY`
   - Variable `ANTHROPIC_MODEL` (opcional)
3. En **Settings → Actions → General**, activa "Allow GitHub Actions to create and approve pull requests".
4. Cada lunes se abre una **Pull Request** con el contenido nuevo y un artefacto `para-revisar` con las imágenes.
   - Revisa → edita el JSON si hace falta → merge = aprobado.
   - También puedes lanzarlo a mano desde la pestaña Actions con un tema concreto.

## Estructura

| Carpeta / archivo | Qué es |
| --- | --- |
| `content/*.json` | Una pieza por archivo (c = carrusel, e = estático, s = historia) |
| `templates/style.css` | Colores y tipografía (copiados del reel 02) |
| `templates/slides.js` | Plantilla de cada tipo de slide |
| `src/render.js` | JSON → PNG + `out/index.html` |
| `src/generate.js` | Tema → JSON con Claude (guionista + revisor) |
| `topics.md` | Tus ideas pendientes; el modo semanal las prioriza |

## Tipos de slide

| Tipo | Para qué | Campos |
| --- | --- | --- |
| `cover` | Portada | `title`, `box?`, `text?` |
| `point` | Una idea + comando | `title`, `box?`, `code?`, `text?` |
| `list` | Varias filas tipo FROM / COPY / RUN | `title`, `items[{k,v}]` |
| `flow` | Cajas con flechas | `title`, `steps[{k,v?}]` |
| `close` | Cierre con CTA | `title`, `text?`, `cta` |
| `glossary` | Post de glosario | `term`, `definition`, `example?` |
| `meme` | Post de humor | `top`, `punch`, `text?` |
| `quiz` | Historia con pregunta | `question`, `options[2]` |

Todos aceptan `kicker` (la línea cian de arriba, p. ej. `"02 / LA RECETA"`).

Tamaños: carrusel y estático 1080×1350 (4:5) · historia 1080×1920 (9:16).

## Siguientes fases

- **Reels**: mismo JSON → vídeo con Remotion + voz TTS.
- **Temas reales**: leer preguntas de Reddit y Stack Overflow, y comentarios de tus posts.
- **Publicar**: Instagram Graph API al hacer merge (cuenta Business o Creator).

## Modo sin API (el que usas): tarea programada de Claude

No necesitas `ANTHROPIC_API_KEY`. Cada lunes por la mañana una tarea programada de Claude:

1. Lee `REGLAS.md`, `topics.md` y lo que ya hay en `content/`.
2. Escribe 3 piezas nuevas (1 carrusel + 1 estático + 1 historia) y las revisa.
3. Las renderiza y deja aquí `content/<id>.json` y `out/<id>/*.png` con `out/index.html` actualizado.

Tú solo:
- Abres `out/index.html` y revisas.
- Si algo no te gusta, editas el JSON y ejecutas `npm run render` (o se lo pides a Claude).
- Publicas en Instagram y pones `"status": "publicado"` en el JSON.

Requisito: el Mac encendido y la app de Claude abierta a la hora de la tarea.

## Calendario de publicación

- `calendario.json` = qué se publica y cuándo (fecha, hora, archivo, caption, estado).
- `npm run semana` → lista lo de los próximos 7 días y crea `PUBLICAR_ESTA_SEMANA.md` con archivos y captions listos para copiar.
- Programa cada pieza en Instagram (al publicar: **Opciones avanzadas → Programar**) y cambia su `estado` a `programado` (o `publicado`).
- Los vídeos están en `videos/`.
