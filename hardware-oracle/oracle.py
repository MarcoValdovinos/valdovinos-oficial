import json
import hashlib
import time
import urllib.request
import random
from datetime import datetime, timezone

API_URL = "https://sycro-valdovinos.vercel.app/api/sign"

def leer_obd2():
    print("🔍 Leyendo telemetría del vehículo...")
    return {
        "velocidad_kmh": random.randint(0, 120),
        "rpm": random.randint(800, 3500),
        "temperatura_motor": random.randint(70, 95),
        "nivel_combustible": f"{random.randint(10, 100)}%",
        "ubicacion_gps": {"lat": 19.2826, "lon": -99.6557}
    }

def crear_manifiesto_pcs(datos_obd):
    timestamp = datetime.now(timezone.utc).isoformat() + "Z"
    data_string = json.dumps(datos_obd, sort_keys=True)
    content_hash = hashlib.sha256(data_string.encode()).hexdigest()

    return {
        "protocol": "https://sycro-valdovinos.vercel.app/pcs/0.1",
        "work_id": f"VEHICULO-{int(time.time())}",
        "version": "v1.0",
        "timestamp": timestamp,
        "content_hash": content_hash,
        "contributions": [
            {
                "entity_type": "human",
                "entity_id": "did:ens:marcovaldovinos.eth",
                "contribution_type": "ideation",
                "consent_given": True
            },
            {
                "entity_type": "ai_agent",
                "entity_id": "agent:hardware-oracle:v1",
                "contribution_type": "generation",
                "consent_given": True
            }
        ],
        "telemetry_data": datos_obd,
        "limitations_and_disputes": "Datos crudos generados por el Oráculo. No certifican legalidad vehicular."
    }

def enviar_a_vercel(manifiesto):
    print("🚀 Enviando a Vercel para firma criptográfica...")
    payload = {
        "document": json.dumps(manifiesto),
        "user": "MarcoValdovinos"
    }
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    try:
        with urllib.request.urlopen(req) as response:
            resultado = json.loads(response.read().decode())
            print("\n✅ ¡SELLO KRONOS GENERADO!")
            print(f"📜 Folio: {resultado.get('folio')}")
            print(f"🔐 Hash SHA-256: {resultado.get('hash')}")
            print(f"⚛️ Firma MCP: {resultado.get('signature')}")
    except Exception as e:
        print(f"\n❌ Error conectando a Vercel: {e}")

if __name__ == "__main__":
    print("🔱 INICIANDO NODO ORÁCULO ARKHÉ ZERO 🔱")
    datos = leer_obd2()
    print(f"📊 Telemetría capturada: {datos['velocidad_kmh']} km/h, {datos['rpm']} RPM")
    manifiesto = crear_manifiesto_pcs(datos)
    print(f"🔗 Hash local: {manifiesto['content_hash'][:16]}...")
    enviar_a_vercel(manifiesto)
