import time
import re
import csv
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

# Ключевые слова для поиска на TGStat
KEYWORDS = ["крипта", "трейдинг", "VIP", "сигналы"]

def init_driver():
    """Инициализация браузера с обходом Cloudflare"""
    print("🚀 Запуск браузера (эмуляция реального пользователя)...")
    options = uc.ChromeOptions()
    # Чтобы видеть, что происходит, headless отключен
    # options.add_argument('--headless') 
    
    driver = uc.Chrome(options=options, version_main=154)
    driver.set_window_size(1280, 1024)
    return driver

def scrape_tgstat(driver):
    all_leads = []
    
    for keyword in KEYWORDS:
        print(f"\n🔍 Ищем каналы по слову: {keyword}")
        url = f"https://tgstat.ru/search?q={keyword}"
        driver.get(url)
        
        # Ждем 10 секунд, чтобы пройти проверку Cloudflare
        print("⏳ Ждем прохождения защиты Cloudflare...")
        time.sleep(10) 
        
        try:
            # Ждем появления карточек каналов
            WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".card"))
            )
        except Exception as e:
            print("⚠️ Не удалось загрузить каналы (возможно, капча). Пропускаем.")
            continue
            
        html = driver.page_source
        with open('debug.html', 'w', encoding='utf-8') as f:
            f.write(html)
            
        soup = BeautifulSoup(html, 'html.parser')
        
        # Ищем все карточки каналов
        channels = soup.find_all('div', class_='card')
        
        for card in channels[:10]:  # Берем первые 10 с каждой страницы
            try:
                title_tag = card.find('h4')
                if not title_tag:
                    continue
                    
                title = title_tag.text.strip()
                link = card.find('a')['href'] if card.find('a') else ""
                
                # Ищем описание, где обычно прячут контакты админа
                desc_tag = card.find('div', class_='font-14')
                desc = desc_tag.text if desc_tag else ""
                
                # Вытаскиваем @юзернеймы с помощью регулярки
                usernames = re.findall(r'@([a-zA-Z0-9_]{5,32})', desc)
                admins = [u for u in usernames if not u.lower().endswith('bot')]
                
                if admins:
                    print(f"  [+] Найден канал: {title}")
                    print(f"      🎯 Админы: {', '.join(admins)}")
                    for admin in admins:
                        all_leads.append({
                            'Keyword': keyword,
                            'Channel': title,
                            'TGStat_Link': link,
                            'Admin_Username': f"@{admin}"
                        })
            except Exception as e:
                continue
        break # Debug: only run first keyword
                
    return all_leads

def main():
    driver = None
    try:
        driver = init_driver()
        leads = scrape_tgstat(driver)
        
        if leads:
            print(f"\n✅ Успешно найдено {len(leads)} лидов. Сохраняем в CSV...")
            with open('tgstat_leads.csv', 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=['Keyword', 'Channel', 'TGStat_Link', 'Admin_Username'])
                writer.writeheader()
                writer.writerows(leads)
            print("📁 Файл tgstat_leads.csv сохранен!")
        else:
            print("\n⚠️ Лиды не найдены.")
            
    except Exception as e:
        print(f"❌ Критическая ошибка: {e}")
    finally:
        if driver:
            driver.quit()
            print("🛑 Браузер закрыт.")

if __name__ == '__main__':
    main()
