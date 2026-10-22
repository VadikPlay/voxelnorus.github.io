---
name: prompt-refine-and-execute
description: Intercepts raw, fast, or ambiguous user requests, refines them into crisp engineering specifications, asks targeted clarifying questions to eliminate ambiguity, and executes end-to-end with automated verification.
---

# Prompt Refine & Execute (PRE Engine)

## Purpose & Philosophy
When Vadim sends a raw, rapid, voice-to-text, or colloquial instruction, never make blind assumptions or jump straight into messy coding. 

This skill enforces a 3-stage high-efficiency cycle:
1. **Refine & Restructure (Реконструкция запроса)**: Translate the prompt into an exact, unambiguous technical specification with a clear Definition of Done (DoD).
2. **Clarify (Уточняющие вопросы)**: Ask 1–3 razor-sharp, high-leverage questions (with recommended defaults) to lock down architectural and business choices.
3. **Execute & Verify (Автономное исполнение и тесты)**: Build, execute, run tests in the terminal, and deliver tested, copy-paste ready results.

---

## The 3-Stage Workflow

```
[Raw User Prompt] 
       │
       ▼
[Stage 1: Refactor Prompt]
  ├─ Core Goal (Что должно работать)
  ├─ Technical Scope & Stack (Файлы, стек, библиотеки)
  ├─ Hard Constraints (Сохранение тестов, без спама/блокировок)
  └─ Definition of Done (DoD)
       │
       ▼
[Stage 2: Targeted Clarifications]
  ├─ Ask 1-3 multiple-choice/structured questions (use ask_question or bullet points)
  └─ Provide "(Recommended)" defaults so the user can just say "1" or "дальше"
       │
       ▼
[Stage 3: Autonomous Execution & Verification]
  ├─ Implement files / edit existing code
  ├─ Run terminal checks / pytest / python verification
  └─ Deliver zero-fluff, copy-paste ready result with status footer
```

---

## Stage 1: Refactor & Restructure (Реконструкция)

Immediately parse the user's intent and output a compact specification block:

```markdown
### 🎯 Реконструкция задачи
* **Цель**: [Одно емкое предложение — что создаем/чиним]
* **Затронутые файлы**: [Кликабельные ссылки на файлы]
* **Стек / Инструменты**: [Python, aiogram 3, SQLite, httpx, etc.]
* **Критерий готовности (DoD)**: [Конкретный тест/команда/файл, подтверждающий успех]
```

---

## Stage 2: Targeted Clarifications (Вопросы на уточнение)

### Rules for Clarifying:
* **Max 1–3 questions.** Never overwhelm the user with a questionnaire.
* **Never ask trivial questions.** If the answer is obvious from context or best practices, pick the best practice and state your assumption.
* **Always provide recommendations.** Prefix the smartest option with `(Рекомендуется)`.
* **Use `ask_question` tool** when an interactive modal is appropriate, or output numbered options so the user can simply reply `1`, `2`, or `делай по дефолту`.

### Focus Areas for Questions:
1. **Edge Cases**: Что делать при ошибке сети / пустом ответе / бане сайта?
2. **Data Format / Schema**: Какие колонки нужны в выгрузке / какие поля сохранять в БД?
3. **UX / Flow**: Нужна ли кнопка / команда / уведомление пользователю?
4. **Environment**: Запуск локально в фоне или подготовка под VPS?

---

## Stage 3: Autonomous Execution & Deep Verification

Once the user confirms or if the task is already unambiguous:
1. **Write/Edit Code**: Use precise file edits. Never break existing tests or working functionality.
2. **Run Deep Verification**: Execute the script/tests directly in the PowerShell terminal:
   ```powershell
   pytest -v tests/
   python -X utf8 script.py
   ```
3. **Inspect Output**: Check return codes, null values, exceptions, and stdout.
4. **Deliver**:
   * Direct, factual delivery.
   * Clickable file links.
   * Exact copy-paste scripts or ready assets.
   * Claude-style usage footer with timestamp.

---

## Quick Example in Action

**User:** *«Сделай парсер автотоваров с 999 и чтоб слало в тг»*

**Agent Response:**
```markdown
### 🎯 Реконструкция задачи
* **Цель**: Создать фоновый парсер раздела автотоваров на 999.md и настроить отправку новых объявлений в Telegram-канал/чат.
* **Стек**: `httpx`, `BeautifulSoup4`, `aiogram 3`, SQLite (дедупликация).
* **DoD**: Скрипт опрашивает категорию, отфильтровывает дубли через БД и успешно отправляет тестовое уведомление в Telegram.

### ❓ Уточнения перед стартом:
1. **Куда слать объявления?**
   - A) (Рекомендуется) В существующий тестовый канал через бота `@orbitdev_demo_bot`
   - B) В личные сообщения конкретному Telegram ID
2. **Интервал опроса:**
   - A) (Рекомендуется) Раз в 60 секунд (безопасно от блокировок 999.md)
   - B) Раз в 15-30 секунд (быстрее, но выше риск рейтлимита)

Ответь `1A, 2A` или напиши свои правки, и я сразу приступаю к коду.
```
