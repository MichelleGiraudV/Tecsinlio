# Reel 08 · Pull Request (martes 15/12 · 19:00)

Duración objetivo: 35-40 s · Tag: GIT · Sigue al Reel 07 (commit, rama y merge).

## Escena 1 · Hook
- **Título en pantalla:** ¿Merge directo a main? Espera.
- **Visual:** Rama a punto de unirse a main, aparece una señal de "STOP".
- **Voz:** "Terminaste tu rama. ¿La juntas sin más con main? Mejor pide permiso primero: eso es un pull request."

## Escena 2 · La metáfora
- **Título en pantalla:** PR = entregar para corregir
- **Visual:** Un trabajo entregado al profe con correcciones en rojo.
- **Voz:** "Un pull request es como entregar un trabajo para que lo corrijan antes de publicarlo."

## Escena 3 · Abrirlo
- **Título en pantalla:** Subes la rama y lo abres
- **Visual:** `git push -u origin nueva-funcion` → botón de GitHub "Compare & pull request".
- **Voz:** "Subes tu rama a GitHub y abres el pull request: aquí están mis cambios, ¿los revisas?"

## Escena 4 · La revisión
- **Título en pantalla:** Revisan y prueban
- **Visual:** Comentario en una línea de código + checks verdes (tests).
- **Voz:** "Tu equipo lee el código, deja comentarios, y los tests se ejecutan solos."

## Escena 5 · El merge
- **Título en pantalla:** Aprobado → merge
- **Visual:** "✓ Approved" → botón "Merge pull request" → la rama se une a main.
- **Voz:** "Si todo está bien, lo aprueban y se hace el merge con main."

## Escena 6 · Cierre + CTA
- **Título en pantalla:** Propones. Revisan. Juntas.
- **Visual:** Tres tarjetas.
- **Voz:** "Pull request: propones, revisan, juntas. Guárdalo y sígueme para más tec sin lío."

---
Notas técnicas revisadas: `git push -u origin <rama>` sube la rama y la enlaza con el remoto. En GitHub aparece el botón "Compare & pull request" (también: `gh pr create`). Los checks son workflows de GitHub Actions configurados en el repo; "Merge pull request" junta la rama con la base (normalmente main). En GitLab se llama "merge request".

Caption sugerido:
¿Haces merge directo a main? 😬

Un pull request es entregar tu trabajo para que lo revisen antes de publicarlo.
Subes tu rama → abres el PR → revisan y pasan los tests → merge.

💾 Guárdalo
💬 ¿Cuántos approves pide tu equipo?

#tecsinlio #programacion #aprendeaprogramar #ingenieriadesoftware #tecnologia #git #github #pullrequest #codereview
