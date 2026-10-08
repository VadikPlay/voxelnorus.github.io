import requests
import sys
import os

API_KEY = "sk_live_DB83EX38H3V7gkaz5Il_zLgULAcjlRvT"
URL = "https://geaix.com/v1/chat/completions"

# Цвета для красивого вывода в терминале
CYAN = "\033[96m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RESET = "\033[0m"
RED = "\033[91m"

# Включаем поддержку цветов в Windows CMD
os.system('color')

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

clear_screen()
print(f"{CYAN}======================================================{RESET}")
print(f"{CYAN}   🚀 AI TERMINAL CHAT (GEAIX PROXY)                {RESET}")
print(f"{CYAN}======================================================{RESET}")
print("Доступные флагманские модели:")
print(f"[{GREEN}1{RESET}] claude-opus-5-5 (Anthropic)")
print(f"[{GREEN}2{RESET}] gpt-6-astra (OpenAI)")
print(f"{CYAN}======================================================{RESET}")

choice = input(f"{YELLOW}Выберите модель (1 или 2): {RESET}").strip()
model = "claude-opus-5-5" if choice == "1" else "gpt-6-astra"

print(f"\n{GREEN}✅ Успешно подключено к: {model}{RESET}")
print("Для выхода напишите 'exit'. Для отправки многострочного текста пишите в одну строку.\n")

history = [
    {"role": "system", "content": "You are a helpful, top-tier AI assistant."}
]

while True:
    try:
        user_msg = input(f"{YELLOW}Ты:{RESET} ")
        if user_msg.lower() in ['exit', 'quit']:
            break
        if not user_msg.strip():
            continue

        history.append({"role": "user", "content": user_msg})

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        data = {
            "model": model,
            "messages": history
        }

        # Отправляем запрос
        response = requests.post(URL, headers=headers, json=data)
        
        if response.status_code == 200:
            reply = response.json()["choices"][0]["message"]["content"]
            history.append({"role": "assistant", "content": reply})
            print(f"\n{CYAN}{model}:{RESET}\n{reply}\n")
        else:
            print(f"\n{RED}❌ Ошибка API ({response.status_code}): {response.text}{RESET}\n")
            history.pop() # Удаляем последнее сообщение, раз произошла ошибка
            
    except KeyboardInterrupt:
        break
    except Exception as e:
        print(f"\n{RED}❌ Критическая ошибка: {e}{RESET}\n")

print(f"\n{GREEN}Чат завершен. Хорошего дня!{RESET}")
