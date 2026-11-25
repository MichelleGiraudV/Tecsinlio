# Reel 10 · Del commit al deploy en Cloud Run (hecho: r10, voz Marta · Inworld)

Duración objetivo: 35-45 s · Tag: CLOUD · Une R07 (commit), R09 (GitHub Actions) y R01/R02 (Docker).

## Escena 1 · Hook
- **Título en pantalla:** Del commit a internet.
- **Visual:** `git commit` → 🌍 "mi-app.run.app".
- **Voz:** "Haces un commit… y unos minutos después tu app está en internet. ¿Cómo? Vamos paso a paso."

## Escena 2 · Tests
- **Título en pantalla:** 1 · Tests
- **Visual:** Pipeline de 4 pasos; se ilumina "Tests ✓" (GitHub Actions).
- **Voz:** "Primero, GitHub Actions ve tu push y pasa los tests. Si algo falla, se para aquí."

## Escena 3 · Imagen
- **Título en pantalla:** 2 · Imagen Docker
- **Visual:** `docker build` → imagen 📦 → Artifact Registry.
- **Voz:** "Después construye una imagen de Docker con tu app y la guarda en Artifact Registry, el almacén de imágenes."

## Escena 4 · Deploy
- **Título en pantalla:** 3 · Cloud Run
- **Visual:** `gcloud run deploy mi-app --image …` → URL https://mi-app-…run.app
- **Voz:** "Luego le dice a Cloud Run: despliega esta imagen. Cloud Run la arranca y te da una URL pública."

## Escena 5 · Escala
- **Título en pantalla:** 0 visitas = 0 copias
- **Visual:** Contador de copias: 0 → 1 → 3 según el tráfico.
- **Voz:** "Y lo mejor: si nadie la usa, se apaga sola. Si llega mucha gente, crea más copias automáticamente."

## Escena 6 · Cierre
- **Título en pantalla:** Commit → Tests → Imagen → Cloud Run
- **Voz:** "Commit, tests, imagen, Cloud Run. Guárdalo y sígueme para más tec sin lío."

---
Notas técnicas: el workflow de GitHub Actions se autentica en Google Cloud (recomendado: Workload Identity Federation, sin claves JSON), hace `docker build` + `docker push` a Artifact Registry (`REGION-docker.pkg.dev/PROYECTO/REPO/mi-app:SHA`) y `gcloud run deploy mi-app --image … --region …`. Cloud Run escala a cero por defecto (min-instances 0) y crea instancias según las peticiones.

Caption sugerido:
Haces commit… ¿y cómo llega tu app a internet? 🚀

1️⃣ GitHub Actions pasa los tests
2️⃣ Construye la imagen Docker → Artifact Registry
3️⃣ Cloud Run la despliega y te da una URL
⚡ 0 visitas = 0 copias encendidas

💾 Guárdalo
💬 ¿Dónde despliegas tú?

#tecsinlio #programacion #aprendeaprogramar #ingenieriadesoftware #tecnologia #cloudrun #googlecloud #cicd #docker
