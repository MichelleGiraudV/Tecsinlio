#!/bin/bash
# Instala Kokoro en el Mac (una sola vez) y crea muestras en voces/pruebas-kokoro/.
# Uso (desde la carpeta Tecsinlio): bash voces/instalar-kokoro.sh
DIR="$HOME/.tecsinlio-kokoro"
PY=""
for p in python3.12 python3.11 python3.10 /opt/homebrew/bin/python3.12 python3; do
  command -v $p >/dev/null 2>&1 || continue
  $p -c 'import sys; exit(0 if (3,10)<=sys.version_info[:2]<(3,13) else 1)' 2>/dev/null && { PY=$p; break; }
done
if [ -z "$PY" ]; then
  echo "Kokoro necesita Python 3.10–3.12. Instálalo con:  brew install python@3.12   y vuelve a ejecutar este script."; exit 1
fi
command -v espeak-ng >/dev/null 2>&1 || { echo "Instalando espeak-ng (lo necesita el español)…"; brew install espeak-ng || exit 1; }
[ -x "$DIR/venv/bin/python" ] || $PY -m venv "$DIR/venv" || exit 1
echo "Instalando Kokoro (la primera vez tarda unos minutos)…"
"$DIR/venv/bin/pip" install -q --upgrade pip "kokoro>=0.9.4" soundfile || exit 1
"$DIR/venv/bin/python" voces/voz_kokoro.py prueba voces/pruebas-kokoro
ls voces/pruebas-kokoro
