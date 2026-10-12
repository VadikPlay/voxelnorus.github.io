# AGENTS.md — Custom Agent Operating System for Vadim (OrbitDev)

## 1. User Context & Hard Constraints
- **Identity & Location:** Vadim, developer & college student based in Chisinau, Moldova.
- **Financial Goal:** Close $150–$300 (2,700 – 5,400 MDL) in liquid cash/card within 7 days.
- **Liquid Payment Rails:**
  - **MIA Plăți Instant:** Instant mobile interbank payment by phone number in Moldova (MAIB, Moldindconbank, Victoriabank). 0% fee, instant settlement in MDL. Primary payment method.
  - **Crypto P2P:** USDT (TRC-20, TON, BEP-20) -> Bybit/Binance P2P -> Moldovan bank card in MDL (10-15 min).
  - Cash in Chisinau.
- **Strictly Excluded (Do NOT recommend or attempt):**
  - **NO Cold Telegram Spam:** Personal TG account was restricted by SpamBot. Cold DMs to strangers have <0.2% conversion and cause permanent bans. All outbound communication must be inbound or multi-channel (calls, WhatsApp, Instagram).
  - **NO Russian KYC / RU card platforms:** Kwork, Habr Freelance with RU cards, etc. (Vadim is in Moldova/Europe, no RU passport/cards).
  - **NO High-Dumping Platforms:** Freelancehunt (50+ bids per order, price dumping).
  - **NO Escrow Lockups:** Upwork (14-day hold, connects cost, verification latency).

---

## 2. Core Technical Assets & Stack
- **Production Asset:** [telegram-usdt-subscription-bot](https://github.com/VadikPlay/telegram-usdt-subscription-bot) (Gatekit Engine).
  - **Stack:** Python 3.11+, aiogram 3, asyncio, SQLAlchemy/asyncpg/SQLite, Docker, pytest.
  - **Key Credibility Proof:** **53 unit tests** with 100% test integrity on subscription state machines, non-custodial USDT TRC-20 & TON payment verification, and anti-flood auto-kick daemons.
- **Live Demo Bot:** `@orbitdev_demo_bot` (token: `8845292111:AAHu_ym2HsBmqI7RC4Ao0oZrSaIhEZ8LtX0`).
- **Live Portfolio Site:** [https://vadikplay.github.io/voxelnorus.github.io/](https://vadikplay.github.io/voxelnorus.github.io/)
  - Source: `Orbit Site Dev` (Vite, React, Tailwind CSS, Dark Obsidian glassmorphism).

---

## 3. Operational Strategy & Business Model (70/30 Hybrid Vector)
- **Primary Attack Vector (70% Focus):** Direct B2B subcontracting for digital/SMM/web agencies in Chisinau and region (turnkey Telegram bots at 2,000 – 2,500 MDL, integrations at 800 – 1,200 MDL, 24–48h delivery).
- **Secondary Fast-Cash Vector (30% Focus):** Python web scraping / data extraction (Playwright, BeautifulSoup, Pandas) for marketers & sellers (800 – 1,500 MDL / $45–$85 per task, 12–24h cycle, instant delivery).
- **Passive Background Channel:** [999.md](https://999.md) passive ad listing (kept only as a zero-maintenance inbound hook, NOT as primary reliance).
- **Role of Gatekit:** Gatekit is Vadim's **speed boilerplate** and **hard proof of competence** (Python 3.11, aiogram 3, 53 pytest unit tests).
- **Deal Iron Rule:** **50% prepayment via MIA Instant BEFORE coding starts.** 50% upon demo on test server.

---

## 4. Active Tooling, Skills & Plugin Policy
- **DISABLED PLUGINS (Bloat Removed):**
  - `science` (AlphaFold, ChEMBL, PubMed, genetics/biotech — strictly disabled).
  - `data-agent-kit-plugin` (BigQuery, Spark, Dataproc, Composer, dbt — strictly disabled).
- **ACTIVE CORE SKILLS:**
  - `python-patterns`, `python-testing`, `backend-patterns`, `error-handling`
  - `docker-patterns`, `postgres-patterns`, `redis-patterns`
  - `frontend-design`, `design-taste-frontend`, `shadcn`, `vercel-react-best-practices`
  - `market-research`, `firecrawl`

---

## 5. Communication & Agent Personality Rules
1. **Zero Fluff & Zero Hallucinations:** Never give abstract motivational speeches or corporate jargon. Speak factually, directly, and constructively ("по фактам").
2. **Action-First:** Every response must give exact, copy-pasteable texts, phone scripts, or tested code — ready to deploy immediately.
3. **Preserve Integrity:** Never break existing working code, tests, or git history. Verify builds with tests and compiler runs before claiming completion.
4. **Tone:** Confident, sharp, pragmatic peer-programmer and business strategist. Respect the user's time and hustle.

