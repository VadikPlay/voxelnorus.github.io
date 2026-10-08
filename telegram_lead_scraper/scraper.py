import asyncio
import re
import csv
from telethon import TelegramClient
from telethon.tl.functions.contacts import SearchRequest
from telethon.tl.types import Channel

# ВАЖНО: Вставь свои данные! Получить их можно на https://my.telegram.org/auth
API_ID = 0  # Замени на свой api_id (целое число)
API_HASH = 'твой_api_hash'  # Замени на свой api_hash (строка)

# Ключевые слова для поиска каналов
SEARCH_KEYWORDS = [
    "Крипто сигналы", 
    "Трейдинг", 
    "VIP доступ",
    "Приватный клуб",
    "Схемы заработка",
    "Фитнес марафон"
]

async def extract_admins(client, channel):
    """Ищет юзернеймы админов в описании канала."""
    try:
        full_channel = await client.get_entity(channel)
        # Получаем полное описание канала
        full_info = await client(telethon.tl.functions.channels.GetFullChannelRequest(channel=full_channel))
        about = full_info.full_chat.about or ""
        
        # Ищем все @юзернеймы в описании
        usernames = re.findall(r'@([a-zA-Z0-9_]{5,32})', about)
        # Фильтруем (исключаем ботов)
        admins = [u for u in usernames if not u.lower().endswith('bot')]
        
        return list(set(admins)), about
    except Exception as e:
        return [], ""

async def main():
    if API_ID == 0 or API_HASH == 'твой_api_hash':
        print("❌ ОШИБКА: Пожалуйста, укажи API_ID и API_HASH в коде!")
        print("Получить их можно за 1 минуту тут: https://my.telegram.org/auth")
        return

    print("🚀 Запускаем снайперский парсер лидов...")
    client = TelegramClient('lead_scraper_session', API_ID, API_HASH)
    await client.start()
    
    all_leads = []
    
    for keyword in SEARCH_KEYWORDS:
        print(f"\n🔍 Ищу каналы по запросу: '{keyword}'...")
        try:
            # Ищем каналы глобальным поиском
            result = await client(SearchRequest(
                q=keyword,
                limit=15  # Берем топ-15 результатов по каждому слову
            ))
            
            for chat in result.chats:
                if isinstance(chat, Channel):
                    print(f"  [+] Найден канал: {chat.title} (@{chat.username or 'private'})")
                    
                    import telethon
                    admins, desc = await extract_admins(client, chat)
                    
                    if admins:
                        print(f"      🎯 НАЙДЕНЫ АДМИНЫ: {', '.join(admins)}")
                        for admin in admins:
                            all_leads.append({
                                'Keyword': keyword,
                                'Channel': chat.title,
                                'Channel_Link': f"https://t.me/{chat.username}" if chat.username else "Private",
                                'Admin_Username': f"@{admin}",
                            })
                    
            await asyncio.sleep(2) # Пауза, чтобы не словить бан от Телеграма
        except Exception as e:
            print(f"Ошибка при поиске '{keyword}': {e}")
            
    # Сохраняем в CSV
    if all_leads:
        with open('hot_leads.csv', 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['Keyword', 'Channel', 'Channel_Link', 'Admin_Username'])
            writer.writeheader()
            writer.writerows(all_leads)
        print(f"\n✅ УРА! Найдено {len(all_leads)} контактов админов.")
        print("Файл 'hot_leads.csv' успешно сохранен. Можно начинать рассылку!")
    else:
        print("\n⚠️ К сожалению, не удалось найти юзернеймы админов в описаниях каналов. Попробуй изменить ключевые слова.")
        
    await client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
