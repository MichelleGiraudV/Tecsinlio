#!/bin/bash
# Instala Piper (voz local, gratis, sin internet al generar) y crea muestras de voces en español.
# Uso: bash voces/instalar-voz-local.sh   (desde la carpeta Tecsinlio)
DIR="$HOME/.tecsinlio-tts"          # fuera del repo
OUT="$(pwd)/voces/pruebas-local"
FRASE="Eso es un Dockerfile. Describe cómo construir una imagen. Es un archivo de texto."
mkdir -p "$DIR/voices" "$OUT"
if [ ! -x "$DIR/venv/bin/python" ]; then
  python3 -m venv "$DIR/venv" || exit 1
fi
"$DIR/venv/bin/pip" install -q --upgrade pip piper-tts || exit 1
PY="$DIR/venv/bin/python"
for v in es_ES-sharvard-medium es_ES-davefx-medium es_ES-mls_10246-low es_ES-mls_9972-low es_AR-daniela-high es_MX-claude-high es_MX-ald-medium; do
  "$PY" -m piper.download_voices --data-dir "$DIR/voices" "$v" >/dev/null 2>&1 || { echo "⚠️  no se pudo bajar $v"; continue; }
  if [ "$v" = "es_ES-sharvard-medium" ]; then
    for s in 0 1; do
      "$PY" -m piper -m "$v" --data-dir "$DIR/voices" -s $s -f "$OUT/$v-$s.wav" -- "$FRASE" >/dev/null 2>&1 && echo "✅ $v-$s"
    done
  else
    "$PY" -m piper -m "$v" --data-dir "$DIR/voices" -f "$OUT/$v.wav" -- "$FRASE" >/dev/null 2>&1 && echo "✅ $v"
  fi
done
ls "$OUT"
