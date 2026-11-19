#!/bin/bash
# Uso: bash voces/generar-voz-kokoro.sh voces/<id>/textos.txt voces/<id> [voz]
"$HOME/.tecsinlio-kokoro/venv/bin/python" voces/voz_kokoro.py "$1" "$2" "${3:-ef_dora}"
