import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Copy, Check, Server, Cpu, Activity, Play, RotateCcw } from 'lucide-react';

export const TechStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'docker' | 'schema' | 'guard' | 'logs'>('docker');
  const [copied, setCopied] = useState(false);
  const [isStreamingLogs, setIsStreamingLogs] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] [DOCKER] Starting orbitdev_core_1 ... done',
    '[INIT] [POSTGRES] Connection pool established (5432/orbitdev, max_conn: 30)',
    '[INIT] [REDIS] Connected to redis://localhost:6379/0 (queue: autokick_tasks)',
    '[SYSTEM] [WATCHDOG] Daemon thread started (check_interval: 60s)',
    '[CRYPTOBOT] Webhook listener active on https://api.yourdomain.com/tg/webhook',
    '[NETWORK] MTProto TLS certificate verified (Telegram DC4)',
    '[HEARTBEAT] System nominal. Memory: 42MB / 1024MB | CPU: 0.2%'
  ]);

  // Periodic subtle live log simulation for high-end devfeel
  useEffect(() => {
    if (!isStreamingLogs || activeTab !== 'logs') return;

    const interval = setInterval(() => {
      const now = new Date().toTimeString().split(' ')[0];
      const randomEvents = [
        `[${now}] [WATCHDOG] Heartbeat OK. Latency to Telegram Bot API: 14ms`,
        `[${now}] [POSTGRES] Routine vacuum and index check completed in 4ms`,
        `[${now}] [RATE_LIMIT] Redis queue depth: 0 tasks (no throttling required)`,
        `[${now}] [GATEWAY] Polling CryptoBot invoice updates: 0 pending`,
      ];
      const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      setLogs(prev => [...prev.slice(-12), event]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isStreamingLogs, activeTab]);

  const snippets = {
    docker: `version: '3.8'

services:
  orbitdev-core:
    image: node:22-alpine
    restart: always
    environment:
      - DATABASE_URL=postgresql://orbit:secret@postgres:5432/orbitdev
      - CRYPTOBOT_TOKEN=\${CRYPTOBOT_API_KEY}
      - TRON_WALLET_ADDRESS=\${TRC20_PAYMENT_WALLET}
      - ADMIN_TELEGRAM_ID=\${OWNER_ID}
    depends_on:
      - postgres
      - redis
    ports:
      - "127.0.0.1:3000:3000"

  postgres:
    image: postgres:16-alpine
    restart: always
    volumes:
      - ./data/pg:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: orbitdev

  redis:
    image: redis:7-alpine
    restart: always # Rate-limit & Flood-Wait queue`,

    schema: `-- PostgreSQL 16 Data Schema (Zero External Telemetry)
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  username VARCHAR(64),
  first_joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  plan_code VARCHAR(32) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(16) DEFAULT 'active',
  invite_hash VARCHAR(128) UNIQUE NOT NULL
);

CREATE TABLE transactions (
  tx_id VARCHAR(128) PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  amount_usdt NUMERIC(10, 2) NOT NULL,
  network VARCHAR(16) NOT NULL, -- TRC20 | CRYPTOBOT | TON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`,

    guard: `// Flood-Wait & Fault-Tolerance Daemon
export async function executeAutoKick(channelId: string, expiredUsers: User[]) {
  for (const user of expiredUsers) {
    try {
      // Automatic kick with rate-limit queue
      await telegramQueue.add(async () => {
        await bot.api.banChatMember(channelId, user.id);
        await bot.api.unbanChatMember(channelId, user.id); // revoke invite
      });
      await db.subscriptions.updateStatus(user.id, 'revoked');
    } catch (err: any) {
      if (err.error_code === 429) {
        await sleep(err.parameters.retry_after * 1000);
      } else {
        await notifyAdminWatchdog(\`Warning: kick failed for \${user.id}\`, err);
      }
    }
  }
}`
  };

  const copyCode = () => {
    if (activeTab === 'logs') {
      navigator.clipboard.writeText(logs.join('\n'));
    } else {
      navigator.clipboard.writeText(snippets[activeTab]);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 border-b border-neutral-900 bg-[#06080E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Tech Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono text-[#00A3FF] uppercase tracking-tight">
              Инженерная прозрачность
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              Открытая архитектура. Без скрытого кода и обфускации.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Покупая лицензию, вы получаете чистый исходный код на TypeScript с настроенным <strong className="text-neutral-200">Docker Compose</strong>. Никаких внешних серверов авторизации — всё разворачивается внутри изолированного контура на вашем сервере.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-[#0A0D15] border border-neutral-800 rounded-lg flex items-start gap-3">
                <Server className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white">Docker Compose в 1 команду</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Развертывание Node.js 22, PostgreSQL 16 и Redis занимает меньше 3 минут.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-[#0A0D15] border border-neutral-800 rounded-lg flex items-start gap-3">
                <Cpu className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white">Redis Queue для защиты от флуд-лимитов</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    При массовом автокике (200+ юзеров) бот соблюдает лимиты Telegram API без блокировок.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-[#0A0D15] border border-neutral-800 rounded-lg flex items-start gap-3">
                <Activity className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white">Watchdog-мониторинг для владельца</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    При сбоях хостинга или задержках бот мгновенно отправляет тихий системный алерт вам в Telegram.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Inspector with Live Logs */}
          <div className="lg:col-span-7">
            <div className="bg-[#090C14] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
              {/* Tab Bar */}
              <div className="bg-[#0D111A] px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 mr-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  </div>
                  <div className="flex gap-1 font-mono text-xs flex-wrap">
                    <button
                      onClick={() => setActiveTab('docker')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeTab === 'docker' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'
                      }`}
                    >
                      docker-compose.yml
                    </button>
                    <button
                      onClick={() => setActiveTab('schema')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeTab === 'schema' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'
                      }`}
                    >
                      schema.sql
                    </button>
                    <button
                      onClick={() => setActiveTab('guard')}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeTab === 'guard' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'
                      }`}
                    >
                      autokick.ts
                    </button>
                    <button
                      onClick={() => setActiveTab('logs')}
                      className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
                        activeTab === 'logs' ? 'bg-neutral-800 text-[#00A3FF]' : 'text-neutral-500 hover:text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>live_daemon.log</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={copyCode}
                  className="p-1.5 text-neutral-500 hover:text-white transition-colors text-xs flex items-center gap-1 shrink-0"
                  title="Скопировать фрагмент"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="font-mono text-[10px] hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code / Logs Display */}
              <div className="p-4 overflow-x-auto text-xs font-mono bg-[#07090F] text-neutral-300 leading-relaxed h-[360px] overflow-y-auto">
                {activeTab === 'logs' ? (
                  <div className="space-y-1.5">
                    {logs.map((log, index) => (
                      <div
                        key={index}
                        className={`font-mono text-xs ${
                          log.includes('OK') || log.includes('nominal')
                            ? 'text-emerald-400'
                            : log.includes('INIT')
                            ? 'text-[#00A3FF]'
                            : 'text-neutral-400'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                    <div className="text-[11px] text-neutral-600 animate-pulse pt-1">
                      ... listening on port 3000 (daemon status: nominal)
                    </div>
                  </div>
                ) : (
                  <pre>{snippets[activeTab]}</pre>
                )}
              </div>

              {/* Footer status */}
              <div className="bg-[#0B0E17] px-4 py-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                <span>NODE.JS 22 · POSTGRESQL 16 · STRICT TYPESCRIPT</span>
                <span className="text-[#00A3FF]">ZERO_OBFUSCATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
