# Fiverr — гиг (EN)

Долгая игра: гиг бесплатен, но 30–90 дней до первого заказа, пока алгоритм не начнёт
показывать. Поэтому заводить надо **сейчас**, а рассчитывать на него — потом.

Замени `YOUR_GITHUB_USERNAME`, `YOUR_DEMO_BOT`, `YOUR_SITE`.

---

## Gig title

Fiverr режет заголовок, поэтому главные слова — в начало:

```
I will build a Telegram subscription bot with crypto USDT payments
```

## Category

`Programming & Tech → Chatbots → Telegram Bots`

## Search tags (5, максимум Fiverr)

```
telegram bot · crypto payment · usdt · subscription bot · python bot
```

## Gig description

```
SELL ACCESS TO YOUR TELEGRAM CHANNEL AND KEEP 100% OF IT

Most subscription platforms take a percentage of every sale and hold your payouts for
days. This bot does neither: your subscriber pays USDT straight into YOUR wallet, and
the bot only reads the blockchain to confirm it arrived. I never hold your money and I
never hold your keys.

WHAT IT DOES
✓ Shows your plans and issues an invoice with an exact amount
✓ Verifies the payment on-chain automatically (USDT TRC20, TON optional)
✓ Sends a single-use invite link that expires — a leaked link cannot be resold
✓ Tracks every subscription; renewing early stacks days instead of resetting them
✓ Reminds subscribers 3 days and 1 day before expiry
✓ Removes non-payers automatically — after a grace period, with safeguards so a paying
  member is never removed by mistake
✓ Admin panel inside the bot: revenue, subscriber list, who is lapsing, CSV export,
  manual grant / extend / revoke, broadcast, per-user audit log

READ THE CODE BEFORE YOU ORDER
The core is open source: github.com/YOUR_GITHUB_USERNAME/telegram-usdt-subscription-bot
53 unit tests, 56 end-to-end checks, and a self-test script that walks the full payment
path against a simulated blockchain — so the behaviour is verifiable, not just claimed.

Live demo: t.me/YOUR_DEMO_BOT

WHAT YOU NEED
• A private Telegram channel or group
• A TRON wallet address (any wallet — it stays yours)
• A VPS. A $5/month box runs this comfortably. No VPS? Ask and I will recommend one.

WHAT YOU GET
Deployed on your server, full source code, a configuration guide in plain English, and
a testnet rehearsal before a single real subscriber pays.

HOW I WORK
Async — written updates, no calls required. I reply within a few hours. Fixed scope,
fixed price, no hourly surprises.

Message me before ordering with your tier structure and I will confirm the price and
timeline in one reply.
```

## Packages

| | BASIC | STANDARD | PREMIUM |
|---|---|---|---|
| Name | Single tier | Full setup | Custom |
| Price | **$120** | **$300** | **$600** |
| Delivery | 3 days | 5 days | 10 days |
| Revisions | 1 | 2 | unlimited |
| Payment tiers | 1 | up to 3 | unlimited |
| USDT (TRC20) | ✓ | ✓ | ✓ |
| TON payments | — | — | ✓ |
| Admin panel | ✓ | ✓ | ✓ |
| CSV export | — | ✓ | ✓ |
| Renewal reminders | — | ✓ | ✓ |
| Referral programme | — | — | ✓ |
| Multiple channels | — | — | ✓ |
| Source code included | ✓ | ✓ | ✓ |
| Deploy on your server | — | ✓ | ✓ |
| Support after delivery | 3 days | 7 days | 30 days |

BASIC за $120 намеренно низкий — это вход для первых отзывов. Подними до $200 после
трёх заказов.

## Gig extras

| Extra | Price |
|---|---|
| Rush delivery (48h) | +$50 |
| Extra payment tier | +$30 |
| TON payments added | +$80 |
| Referral programme | +$120 |
| Extra channel | +$100 |
| 30 days of support | +$60 |
| Migration from a hosted platform | +$150 |

## FAQ (заполни все — Fiverr это ранжирует)

**Do you hold my money at any point?**
```
No. Payments go from your subscriber directly to your wallet. The bot only reads the
public blockchain to confirm a transfer arrived. It stores no private keys, so there is
nothing to steal and nobody to ask for a payout.
```

**What if a subscriber sends the wrong amount?**
```
Each invoice asks for a unique amount (39.004271 rather than 39.00) — that is how the
bot recognises who paid, since TRC20 transfers carry no comment field. If someone rounds
it, the payment is NOT auto-credited: it appears in your admin panel with the sender
address and transaction id, and you grant access with one command. The bot never guesses.
```

**Could it remove a subscriber who actually paid?**
```
Five separate safeguards stand in the way. A safe mode that removes nobody and only
reports is on by default; there is a grace period after expiry; anyone who paid inside
the protection window is never removed whatever the dates say; every action is
idempotent; and you can require admin confirmation for each removal. Every decision is
written to an audit log you can inspect per user.
```

**Do I need a server?**
```
Yes, and that is the point — it runs on YOUR infrastructure, so nobody can switch it
off but you. A $5/month VPS is plenty. Tell me if you do not have one and I will
recommend a provider and set it up.
```

**Will this get my channel banned?**
```
There is no rule in Telegram's Terms of Service or Bot Developer Terms prohibiting
crypto payment for channel access, and services doing exactly this have operated for
years. It is still a grey area: Telegram can act at its own discretion. If you want
zero platform risk, use Telegram's native Star Subscriptions instead — they are free,
and I will tell you so rather than sell you something you do not need.
```

**Can you work with my existing bot?**
```
Yes. Send me the repository or the code and I will tell you what is wrong and what it
costs to fix before changing anything. Diagnosis is free.
```

---

## Про фото и видео гига

Fiverr ранжирует гиги с видео заметно выше — но лицо в камере не требуется. Работает
**запись экрана**: сам бот в действии, 30–45 секунд, без тебя в кадре.

Что показать: `/start` → выбор тарифа → счёт с точной суммой → подтверждение → инвайт-ссылка
→ вход в канал → админка со статистикой. Текстовые подписи поверх, без озвучки.

Записать бесплатно: OBS Studio (Windows/Linux/Mac) или встроенная запись экрана на телефоне.

Для трёх картинок гига: скриншот экрана со счётом, скриншот админки со статистикой,
скриншот страницы GitHub с зелёными тестами. Последний важнее, чем кажется — это
единственное доказательство, которое конкуренты не подделывают.
