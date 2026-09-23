# Contra — профиль (EN)

Free-план, 0% комиссии с фрилансера. Важно: на бесплатном тарифе заказчик видит доп.
сбор $15–29 при платеже свыше $500 — учитывай при назывании цены.

Contra ближе к «портфолио-платформе», чем к бирже: заказы приходят не из потока заявок,
а через поиск по профилю. Поэтому здесь важнее заполненность, а не активность.

Замени `YOUR_GITHUB_USERNAME`, `YOUR_TELEGRAM`, `YOUR_SITE`, `YOUR_DEMO_BOT`.

---

## Headline

```
Telegram bots & crypto payment automation · Python
```

## Bio

```
I build the part of Telegram where money moves: paid channels, subscription access,
on-chain payment verification, and the automation around them.

My work is verifiable rather than described. The core project is open source —
github.com/YOUR_GITHUB_USERNAME/telegram-usdt-subscription-bot — a non-custodial
subscription bot that takes USDT directly to the owner's wallet, manages channel access
and removes lapsed members without ever risking a paying one. 53 unit tests, 56
end-to-end checks, and a self-test that simulates the entire payment path so the
behaviour can be checked before anyone commits money to it.

Two things I do differently:

Everything ships on the client's own infrastructure with the source handed over. I do
not host your bot and I do not keep the keys, which means firing me breaks nothing.

I will tell you when you do not need me. My own project's README explains which
customers should use Telegram's free native subscriptions instead. Recommending the
cheaper option costs me a sale and earns the next three.

Async by default: written updates, no calls required.
```

## Services

**1 — Telegram paid-subscription bot**
```
$250–450 · 3–5 days
Sell access to a private channel with crypto payment straight to your wallet. Invite
links, expiry tracking, renewal reminders, safe removal of non-payers, admin panel with
CSV export. Deployed on your server, source handed over.
```

**2 — Custom Telegram bot or automation**
```
$500–800 · 1–3 weeks
Your own monetisation logic: trials, discounts, referral programmes, tiered access,
several channels in one bot, integrations with a CRM or Google Sheets.
```

**3 — Data collection & monitoring**
```
$150–500 · 2–7 days
Parsers for web and Telegram, scheduled monitoring with alerts into Telegram, Slack,
email or a spreadsheet. Public data only — no auth bypass, no legal exposure for you.
```

**4 — Fix or take over an existing bot**
```
From $80 · diagnosis free
I read the code and logs, tell you the cause and the price before touching anything,
fix it, and write a test so the same bug cannot come back. If rewriting is cheaper than
fixing, I will say so instead of billing hours.
```

## Skills

```
Python · Telegram Bot Development · aiogram · asyncio · Crypto Payments · USDT · TRON ·
TON · Web Scraping · Data Extraction · API Integration · Automation · n8n · Docker ·
Linux · PostgreSQL · SQLAlchemy · pytest
```

## Project entry (портфолио внутри Contra)

```
Title: Gatekit — non-custodial Telegram subscription bot
Role: Sole developer
Year: 2026
Link: YOUR_SITE/p/gatekit.html

A self-hosted bot that sells access to a private Telegram channel and takes USDT
payment directly into the owner's wallet — no processor, no revenue share, no custody.

The hard problem: a TRC20 transfer carries no memo field, so two subscribers sending
39.00 USDT to the same wallet are indistinguishable on-chain. Solved with unique
amounts — every invoice asks for 39.00xxxx where the final digits identify it. Under a
cent of variance, 9999 slots, no custody required.

The interesting failure: testing against the live TronGrid API revealed that exceeding
its anonymous rate limit returns HTTP 200 with an "Error" field rather than a 429 —
which a naive client reads as "no payments arrived". The client now throttles itself and
raises instead of reporting an empty result. There is a regression test for it.

Verification: 53 unit tests, 56 end-to-end checks. The matching engine and access rules
are pure functions with no database, network or clock inside them, which is why they can
be tested exhaustively.
```

---

## Тактика на Contra

- Contra не даёт потока заявок — это витрина. Заполни на 100%, включая аватар и все четыре услуги, и возвращайся раз в месяц обновить проекты.
- Ссылку на профиль Contra кидай как второе доказательство рядом с GitHub, когда заказчик просит «покажи, что делал».
- Из-за сбора с заказчика при платежах свыше $500 крупные заказы лучше вести через LaborX (escrow, 0% с заказчика) или напрямую с предоплатой.
