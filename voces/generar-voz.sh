#!/bin/bash
# Genera la voz oficial de un reel con Piper (local y gratis).
# Uso (desde la carpeta Tecsinlio): bash voces/generar-voz.sh voces/<id>/textos.txt voces/<id>
# textos.txt = una frase por escena, una por línea. Crea 1.wav, 2.wav, ...
VOZ="${VOZ:-es_AR-daniela-high}"
DIR="$HOME/.tecsinlio-tts"
PY="$DIR/venv/bin/python"
[ -x "$PY" ] || { echo "Falta Piper: ejecuta antes bash voces/instalar-voz-local.sh"; exit 1; }
"$PY" -m piper.download_voices --data-dir "$DIR/voices" "$VOZ" >/dev/null 2>&1
mkdir -p "$2"; n=1
while IFS= read -r t; do
  [ -z "$t" ] && continue
  "$PY" -m piper -m "$VOZ" --data-dir "$DIR/voices" -f "$2/$n.wav" -- "$t" >/dev/null 2>&1 && echo "✅ $n.wav" || echo "❌ $n"
  n=$((n+1))
done < "$1"
