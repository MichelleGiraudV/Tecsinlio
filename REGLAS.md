# Reglas de Tec Sin Lío (las usa la tarea semanal de Claude)

Cuenta de Instagram que explica desarrollo de software en español, estilo "para dummies".
Público: gente que empieza a programar o devs junior. Tono cercano, frases cortas, cero jerga sin explicar.

## Reglas de contenido
- Un concepto por pieza. Siempre una metáfora sencilla o un ejemplo real.
- Siempre que aplique, un comando o snippet REAL que funcione si se copia tal cual.
- Títulos de slide: máximo 6 palabras (máx. 40 caracteres). Textos: máximo 2 líneas (máx. 90 caracteres).
- Último slide de un carrusel: tipo "close", idea de 3 palabras + CTA (guardar o comentar).
- Caption: hook en la primera línea, 3-5 líneas, 1-3 emojis, CTA final. Hashtags: 8-10, siempre #tecsinlio.
- Tag (etiqueta superior): una palabra en mayúsculas: DOCKER, GIT, CI/CD, CLOUD, GLOSARIO, QUIZ…
- Orden de aprendizaje: Docker → Git → CI/CD → Cloud. Enlaza con lo ya publicado y no repitas temas.
- Prioriza las ideas de topics.md.

## Cómo elegir formato
- Lista de comandos, pasos o checklist → "carousel" (6-9 slides, máx. 10)
- Una palabra o definición → "static" con slide "glossary"
- Algo con humor → "static" con slide "meme"
- Pregunta a la audiencia → "story" con slide "quiz" (+ story_sticker)

## Cupo semanal
1 carrusel + 1 estático + 1 historia.

## Formato del JSON (content/<id>.json)
id: c01, c02… (carrusel) · e01… (estático) · s01… (historia). Usa el siguiente número libre.

{"id","name","format":"carousel|static|story","tag","week"?,"status":"pendiente","notes":"nota del revisor",
 "caption","hashtags":[...],"slides":[...],"story_sticker"?:{"type":"quiz","question","options","correct"}}

Tipos de slide (todos admiten "kicker", la línea cian de arriba, p. ej. "02 / LA RECETA"):
- cover:    {type, title, box?, text?}
- point:    {type, title, box?, code?, text?}   (code admite \n)
- list:     {type, title, items:[{k, v}], text?}
- flow:     {type, title, steps:[{k, v?}]}       (3-5 pasos)
- close:    {type, title, text?, cta}
- glossary: {type, term, definition, example?}
- meme:     {type, top, punch, text?}
- quiz:     {type, question, options:[2 opciones]}
En los textos, `backticks` = código resaltado en cian.

## Revisión antes de entregar
1. Todo lo técnico es correcto y los comandos funcionan tal cual.
2. Cumple los límites de longitud.
3. Se entiende sin conocimientos previos.
Si algo queda dudoso, escríbelo en "notes" empezando por "⚠️".

## Calendario
- calendario.json es la fuente de verdad. Ritmo: martes 19:00 reel, jueves 14:00 carrusel, sábado 11:00 estático o historia.
- Las piezas nuevas se añaden en el siguiente hueco libre de su formato, después de la última fecha.
- Los huecos "por producir" son reels que Miguel debe grabar: escribe su guion en guiones/<fecha>-<tema>.md (6 escenas: título, visual, voz).

## Voz de los reels
- Voz oficial (desde R08, 25 nov 2026): **Marta, de Inworld TTS**. Referencia: voces/voz-referencia-r02.mp3.
- Generarla en la Terminal del Mac (la clave INWORLD_API_KEY está en ~/.zshrc de Miguel; NUNCA en el repo, que es público): frases de cada escena, una por línea, en voces/<id>/textos.txt y luego
  `python3 voces/inworld.py voces/<id>/textos.txt voces/<id>` → crea 1.mp3, 2.mp3…
- Palabras técnicas: escribirlas en textos.txt tal cual (Marta las lee bien); voces/pronunciacion.txt solo aplica a Kokoro.
- El vídeo (escenas animadas + voz + música de fondo de R05 al 12 %) lo monta Claude: cada escena dura 0,3 s + su frase + 0,35 s (la última, +1,1 s).
- Plan B (gratis y local, si Inworld deja de funcionar): Kokoro `ef_dora` → `bash voces/generar-voz-kokoro.sh voces/<id>/textos.txt voces/<id> ef_dora`.
- Descartadas: Daniela (Piper), Mónica, Paulina, la voz del R01.
