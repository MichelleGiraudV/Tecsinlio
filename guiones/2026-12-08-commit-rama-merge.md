# Reel 07 · Commit, rama y merge (hecho: r07, voz Kokoro ef_dora)

Duración objetivo: 35-40 s · Tag: GIT · Primer reel de Git (después del bloque Docker).

## Escena 1 · Hook
- **Título en pantalla:** Commit, rama, merge… ¿qué?
- **Visual:** Las tres palabras apareciendo con signos de interrogación.
- **Voz:** "Commit, rama, merge… Si Git te suena a chino, en treinta segundos lo entiendes."

## Escena 2 · Commit
- **Título en pantalla:** Commit = guardar partida
- **Visual:** Línea de tiempo con puntos (fotos) y mensajes: "Crea la web", "Añade menú".
- **Voz:** "Un commit es como guardar la partida: una foto de tu código en ese momento, con un mensaje."

## Escena 3 · Rama
- **Título en pantalla:** Rama = camino paralelo
- **Visual:** De la línea main sale una rama "nueva-funcion" con sus propios commits.
- **Voz:** "Una rama es un camino paralelo: pruebas cosas sin tocar el código principal."

## Escena 4 · Merge
- **Título en pantalla:** Merge = juntar caminos
- **Visual:** La rama vuelve y se une a main.
- **Voz:** "Cuando tu cambio funciona, haces merge: juntas tu rama con la principal."

## Escena 5 · Los comandos
- **Título en pantalla:** En la terminal
- **Visual:**
  ```
  git switch -c nueva-funcion
  git add .
  git commit -m "Añade login"
  git switch main
  git merge nueva-funcion
  ```
- **Voz:** "En la terminal: git switch crea tu rama, git commit guarda, y git merge la junta con main."

## Escena 6 · Cierre + CTA
- **Título en pantalla:** Guarda. Separa. Junta.
- **Visual:** Commit / Rama / Merge en tres tarjetas.
- **Voz:** "Commit guarda, rama separa, merge junta. Guárdalo y sígueme para más tec sin lío."

---
Notas técnicas revisadas: `git switch -c <rama>` crea la rama y se cambia a ella (Git ≥ 2.23; equivalente antiguo: `git checkout -b`). `git add .` prepara los cambios, `git commit -m` los guarda. Para hacer merge te colocas en la rama destino (`git switch main`) y ejecutas `git merge <rama>`.

Caption sugerido:
Commit, rama, merge… ¿Git te suena a chino? 🤯

Commit = guardar partida.
Rama = camino paralelo para probar sin miedo.
Merge = juntar tu rama con la principal.

💾 Guárdalo
💬 ¿Cuál te costó más entender?

#tecsinlio #programacion #aprendeaprogramar #ingenieriadesoftware #tecnologia #git #github #controldeversiones #desarrolloweb
