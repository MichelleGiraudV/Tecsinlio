# Reel 06 · Volúmenes en Docker (hecho: r06, voz Kokoro ef_dora)

Duración objetivo: 30-40 s · Tag: DOCKER · Enlaza con Reel 01 (¿Qué es Docker?) y Reel 02 (Dockerfile).

## Escena 1 · Hook
- **Título en pantalla:** Borré el contenedor… ¿y mis datos?
- **Visual:** Terminal con `docker rm mi-db` y cara de pánico.
- **Voz:** "Borras un contenedor y, ¡puf!, tus datos desaparecen. ¿Te ha pasado?"

## Escena 2 · El problema
- **Título en pantalla:** Los contenedores son de usar y tirar
- **Visual:** Animación: un contenedor se crea, se rompe y se crea otro vacío.
- **Voz:** "Un contenedor está pensado para borrarse y volver a crearse. Lo que guarda dentro, se va con él."

## Escena 3 · La metáfora
- **Título en pantalla:** Volumen = disco duro externo
- **Visual:** Un pendrive/disco que se conecta al contenedor.
- **Voz:** "Un volumen es como un disco duro externo: lo conectas al contenedor y los datos viven fuera."

## Escena 4 · El comando
- **Título en pantalla:** -v nombre:ruta
- **Visual:** Pantalla con `docker run -d -e POSTGRES_PASSWORD=secreto -v datos:/var/lib/postgresql/data postgres:16`
- **Voz:** "Con -v le dices: guarda esta carpeta del contenedor en un volumen llamado 'datos'."

## Escena 5 · La prueba
- **Título en pantalla:** Borras, recreas… y siguen ahí
- **Visual:** `docker rm -f` + mismo `docker run` + los datos siguen. Después `docker volume ls` mostrando "datos".
- **Voz:** "Borras el contenedor, lo vuelves a crear con el mismo volumen… y tus datos siguen ahí. Con docker volume ls ves tus volúmenes."

## Escena 6 · Cierre + CTA
- **Título en pantalla:** Contenedor se va. Datos se quedan.
- **Visual:** Logo Tec Sin Lío.
- **Voz:** "El contenedor se va, los datos se quedan. Guárdalo para cuando montes tu base de datos."

---
Notas técnicas revisadas: `-v nombre:/ruta` crea un volumen con nombre (si no existe); la imagen oficial `postgres` exige `POSTGRES_PASSWORD` y guarda sus datos en `/var/lib/postgresql/data` (válido para postgres:16; desde postgres:18 la ruta recomendada cambia a `/var/lib/postgresql`). `docker volume ls` lista los volúmenes.

Caption sugerido:
Borras el contenedor y… ¿adiós datos? 😱

Un volumen es un disco externo para tu contenedor: los datos viven fuera y sobreviven aunque lo borres.

docker run -v datos:/ruta → y listo.

💾 Guárdalo
💬 ¿Ya usas volúmenes?

#tecsinlio #programacion #aprendeaprogramar #ingenieriadesoftware #tecnologia #docker #volumenes #devops #basesdedatos
