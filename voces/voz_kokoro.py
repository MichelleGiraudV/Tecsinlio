#!/usr/bin/env python3
"""Genera voz con Kokoro (local y gratis).
Muestras:  voz_kokoro.py prueba <carpeta_salida>
Reel:      voz_kokoro.py <textos.txt> <carpeta_salida> [voz]   -> 1.wav, 2.wav...
"""
import sys, os
import numpy as np, soundfile as sf
from kokoro import KPipeline

pipe = KPipeline(lang_code="e")  # español
import re
DICC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pronunciacion.txt")
def pronunciar(t):
    pares = []
    for l in open(DICC, encoding="utf-8"):
        if "=" in l and not l.strip().startswith("#"):
            a, b = l.split("=", 1); pares.append((a.strip(), b.strip()))
    for a, b in sorted(pares, key=lambda x: -len(x[0])):  # las más largas primero
        t = re.sub(r"(?<![\w.])" + re.escape(a) + r"(?![\w])", b, t, flags=re.I)
    return t
def decir(texto, voz, ruta, speed=1.0):
    texto = pronunciar(texto)
    trozos = [a for _, _, a in pipe(texto, voice=voz, speed=speed)]
    sf.write(ruta, np.concatenate(trozos), 24000)

if sys.argv[1] == "prueba":
    out = sys.argv[2]; os.makedirs(out, exist_ok=True)
    frase = "Eso es un Dockerfile. Describe cómo construir una imagen. Es un archivo de texto."
    for voz in ["ef_dora", "em_alex", "em_santa"]:
        decir(frase, voz, f"{out}/{voz}.wav"); print("✅", voz)
else:
    textos, out = sys.argv[1], sys.argv[2]
    voz = sys.argv[3] if len(sys.argv) > 3 else "ef_dora"
    os.makedirs(out, exist_ok=True)
    frases = [l.strip() for l in open(textos, encoding="utf-8") if l.strip()]
    for n, f in enumerate(frases, 1):
        decir(f, voz, f"{out}/{n}.wav"); print(f"✅ {n}.wav")
