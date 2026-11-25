# Reel 09 · GitHub Actions (hecho: r09, voz Marta · Inworld)

Duración objetivo: 35-40 s · Tag: CI/CD · Sigue al Reel 08 (pull request: "los tests se ejecutan solos" → aquí se ve quién los ejecuta). Enlaza con Reel 03 (CI/CD).

## Escena 1 · Hook
- **Título en pantalla:** ¿Quién revisa tu código? Un robot.
- **Visual:** `git push` → aparece un robot 🤖 junto al repo.
- **Voz:** "Subes código a GitHub. ¿Quién comprueba que no has roto nada? Un robot: GitHub Actions."

## Escena 2 · La metáfora
- **Título en pantalla:** Un ayudante dentro de tu repo
- **Visual:** Tarjeta "CUANDO pasa algo → HACE tareas" (push → tests, PR → revisar, merge → desplegar).
- **Voz:** "GitHub Actions es como un ayudante que vive en tu repositorio: cuando pasa algo, hace las tareas por ti."

## Escena 3 · Dónde vive
- **Título en pantalla:** Un archivo YAML
- **Visual:** Árbol de carpetas: `.github/workflows/tests.yml` resaltado.
- **Voz:** "Le das las órdenes con un archivo YAML, dentro de la carpeta punto github, workflows."

## Escena 4 · Cómo se lee
- **Título en pantalla:** on = cuándo · steps = qué
- **Visual:**
  ```yaml
  name: Tests
  on: push
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
        - run: npm ci
        - run: npm test
  ```
  Resaltar `on: push` (cuándo) y `steps` (qué).
- **Voz:** "On dice cuándo arranca, por ejemplo, con cada push. Y los steps dicen qué hace: instalar y pasar los tests."

## Escena 5 · El resultado
- **Título en pantalla:** ✓ verde o ✗ roja
- **Visual:** Lista de pasos que se van marcando (checkout ✓, setup-node ✓, npm ci ✓, npm test ✓) → check verde en el commit; variante con ✗ roja.
- **Voz:** "Haces push, GitHub enciende una máquina, ejecuta los pasos y te pone un check verde… o una cruz roja si algo falla."

## Escena 6 · Cierre + CTA
- **Título en pantalla:** Push. Robot. Check.
- **Visual:** Tres tarjetas: Push (tú subes) · Robot (GitHub Actions trabaja) · Check (ves si todo va bien).
- **Voz:** "Haces push, el robot trabaja, tú ves el check. Guárdalo y sígueme para más tec sin lío."

---
Notas técnicas revisadas: los workflows viven en `.github/workflows/*.yml`. `on` define los eventos que lo disparan (push, pull_request, workflow_dispatch…). Cada job corre en un runner (`runs-on: ubuntu-latest` = máquina virtual de GitHub, nueva en cada ejecución). `actions/checkout` descarga el código; `actions/setup-node` instala Node; `npm ci` instala dependencias exactas del package-lock. El resultado aparece como check (✓/✗) en el commit y en el PR. En repos públicos los runners de GitHub son gratis; en privados hay minutos gratis al mes.

Caption sugerido:
¿Quién revisa tu código cuando haces push? 🤖

GitHub Actions = un ayudante que vive en tu repo.
📁 .github/workflows/tests.yml
⏰ on → cuándo arranca
🛠️ steps → qué hace
✅ check verde = todo bien · ❌ cruz roja = algo falla

💾 Guárdalo
💬 ¿Qué automatizas tú con Actions?

#tecsinlio #programacion #aprendeaprogramar #ingenieriadesoftware #tecnologia #githubactions #github #cicd #devops
