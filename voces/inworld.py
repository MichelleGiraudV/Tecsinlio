#!/usr/bin/env python3
"""Genera la voz de un reel con Inworld TTS (voz Marta).
Uso:  INWORLD_API_KEY=xxx python3 voces/inworld.py voces/r05-paulina/textos.txt voces/r05-marta
Lee una frase por línea y crea 1.mp3, 2.mp3, ... en la carpeta de salida.
La clave NUNCA se guarda en el repo (es público)."""
import base64, json, os, sys, urllib.request, urllib.error

VOZ = os.environ.get("VOZ", "Marta")
MODELOS = [os.environ["MODELO"]] if os.environ.get("MODELO") else ["inworld-tts-2", "inworld-tts-1.5-max", "inworld-tts-1-max"]
key = os.environ.get("INWORLD_API_KEY")
if not key:
    sys.exit("Falta INWORLD_API_KEY (cópiala del portal de Inworld).")
textos, salida = sys.argv[1], sys.argv[2]
os.makedirs(salida, exist_ok=True)
frases = [l.strip() for l in open(textos, encoding="utf-8") if l.strip()]

def pedir(texto, modelo):
    body = json.dumps({"text": texto, "voiceId": VOZ, "modelId": modelo,
                       "audioConfig": {"audioEncoding": "MP3", "sampleRateHertz": 48000}}).encode()
    req = urllib.request.Request("https://api.inworld.ai/tts/v1/voice", data=body, method="POST",
                                 headers={"Authorization": f"Basic {key}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return base64.b64decode(json.load(r)["audioContent"])

modelo_ok = None
for n, frase in enumerate(frases, 1):
    for modelo in ([modelo_ok] if modelo_ok else MODELOS):
        try:
            audio = pedir(frase, modelo); modelo_ok = modelo; break
        except urllib.error.HTTPError as e:
            print(f"  {modelo}: error {e.code} {e.read()[:200]!r}")
    else:
        sys.exit("No se pudo generar la voz. Revisa la clave o el nombre de la voz.")
    open(os.path.join(salida, f"{n}.mp3"), "wb").write(audio)
    print(f"✅ {n}.mp3  ({modelo_ok})")
print(f"Listo: {len(frases)} frases con la voz {VOZ}, modelo {modelo_ok}")
