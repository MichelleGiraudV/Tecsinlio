# Reel 11 · ¿Qué es serverless? (hecho: r11, voz Marta · Inworld)

Duración objetivo: 35-45 s · Tag: CLOUD · Sigue a R10 (Cloud Run).

## Escena 1 · Hook
- **Título en pantalla:** ¿Sin servidor? 🤔
- **Visual:** "SERVER~~LESS~~" con servidores apareciendo detrás.
- **Voz:** "Serverless significa sin servidor… pero sí hay servidores. Entonces, ¿qué es?"

## Escena 2 · Metáfora
- **Título en pantalla:** Taxi, no coche.
- **Visual:** 🚗 Coche propio (pagas siempre) vs 🚕 Taxi (pagas el viaje).
- **Voz:** "Es como coger un taxi en vez de comprarte un coche: lo usas cuando lo necesitas y pagas solo el viaje."

## Escena 3 · Reparto
- **Título en pantalla:** Tú: código. Ellos: lo demás.
- **Visual:** Dos columnas: TÚ (código) · PROVEEDOR (máquinas, parches, escalar).
- **Voz:** "Tú subes tu código. El proveedor se encarga de las máquinas, las actualizaciones y de escalar."

## Escena 4 · Escala sola
- **Título en pantalla:** 0 → 1.000
- **Visual:** Peticiones 0 → copias 0 · peticiones 1.000 → copias varias.
- **Voz:** "Si no hay peticiones, no hay nada encendido. Si llegan mil, arranca más copias él solo."

## Escena 5 · Ojo
- **Título en pantalla:** Cold start ❄️
- **Visual:** Primera petición ⏳ 1,2 s · siguientes ⚡ 40 ms. Logos en texto: Cloud Run · AWS Lambda · Cloud Functions.
- **Voz:** "Ojo: la primera petición puede tardar un poco más; se llama cold start. Ejemplos: Cloud Run o AWS Lambda."

## Escena 6 · Cierre
- **Título en pantalla:** Tu código. Sus servidores.
- **Voz:** "Tú pones el código, ellos ponen los servidores. Guárdalo y sígueme para más tec sin lío."

---
Notas técnicas: "serverless" = no gestionas servidores; el proveedor aprovisiona, parchea y escala; normalmente se paga por uso (peticiones/tiempo de CPU). Cold start: latencia extra al arrancar una instancia desde cero; se mitiga con instancias mínimas (que tienen coste). Ejemplos: Google Cloud Run y Cloud Run functions (antes Cloud Functions), AWS Lambda, Azure Functions. Las cifras de la escena 5 son ilustrativas.

Caption sugerido:
Serverless = sin servidor… ¿seguro? 🤔

Sí hay servidores, pero no son tu problema:
🚕 Como un taxi: lo usas y pagas el viaje
⚡ Escala solo (de 0 a miles)
❄️ Ojo con el cold start

💾 Guárdalo
💬 ¿Usas Lambda, Cloud Run o algo más?

#tecsinlio #programacion #aprendeaprogramar #ingenieriadesoftware #tecnologia #serverless #cloud #cloudrun #aws
