import requests
import json
import sys

def check_openai(api_key):
    print("Testing OpenAI API...")
    headers = {"Authorization": f"Bearer {api_key}"}
    
    # Check Models
    resp = requests.get("https://api.openai.com/v1/models", headers=headers)
    if resp.status_code == 200:
        print("✅ OpenAI API is VALID.")
        models = [m["id"] for m in resp.json()["data"]]
        print(f"Доступные модели (всего {len(models)}):")
        print(", ".join(sorted(models)[:15]) + " ...и другие")
    else:
        print(f"❌ Ошибка OpenAI: {resp.status_code} - {resp.text}")

def check_anthropic(api_key):
    print("Testing Anthropic API...")
    headers = {
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01"
    }
    # Anthropic doesn't have a direct "list models" endpoint that is widely used, 
    # so we test by listing models or making a tiny request
    resp = requests.get("https://api.anthropic.com/v1/models", headers=headers)
    if resp.status_code == 200:
        print("✅ Anthropic API is VALID.")
        models = [m["id"] for m in resp.json()["data"]]
        print(f"Доступные модели: {', '.join(models)}")
    else:
        print(f"❌ Ошибка Anthropic: {resp.status_code} - {resp.text}")

def check_gemini(api_key):
    print("Testing Gemini API...")
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
    resp = requests.get(url)
    if resp.status_code == 200:
        print("✅ Gemini API is VALID.")
        models = [m["name"] for m in resp.json()["models"]]
        print(f"Доступные модели: {', '.join([m.split('/')[-1] for m in models if 'gemini' in m.lower()])}")
    else:
        print(f"❌ Ошибка Gemini: {resp.status_code} - {resp.text}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python test_api.py <provider> <key>")
        sys.exit(1)
        
    provider = sys.argv[1].lower()
    key = sys.argv[2]
    
    if provider == "openai":
        check_openai(key)
    elif provider == "anthropic":
        check_anthropic(key)
    elif provider in ["gemini", "google"]:
        check_gemini(key)
    else:
        print("Unknown provider. Please specify openai, anthropic, or gemini.")
