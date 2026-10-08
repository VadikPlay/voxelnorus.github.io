import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Check, 
  RotateCcw, 
  Database, 
  Shield, 
  Users, 
  CreditCard, 
  Send, 
  Download,
  Key,
  Layers
} from 'lucide-react';

type Mode = 'subscriber' | 'admin';
type SubStep = 'start' | 'plan' | 'invoice' | 'confirmed';

export const BotSimulator: React.FC = () => {
  const [mode, setMode] = useState<Mode>('subscriber');
  const [subStep, setSubStep] = useState<SubStep>('start');
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number; period: string }>({
    name: 'Standard Pass',
    price: 35,
    period: '30 дней',
  });
  const [adminBroadcastSuccess, setAdminBroadcastSuccess] = useState(false);

  const resetSimulation = () => {
    setSubStep('start');
    setAdminBroadcastSuccess(false);
  };

  return (
    <div className="glass-panel border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] rim-light-top">
      {/* Top Bar Switcher: Subscriber Mode vs Admin Console */}
      <div className="bg-[#0B101D]/80 backdrop-blur-md px-4 py-2.5 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 p-0.5 bg-neutral-900 border border-neutral-800 rounded">
          <button
            onClick={() => setMode('subscriber')}
            className={`px-3 py-1 text-xs font-mono transition-colors rounded ${
              mode === 'subscriber'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Клиентский интерфейс
          </button>
          <button
            onClick={() => setMode('admin')}
            className={`px-3 py-1 text-xs font-mono transition-colors rounded ${
              mode === 'admin'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Панель управления (/admin)
          </button>
        </div>

        <button
          onClick={resetSimulation}
          className="text-neutral-500 hover:text-neutral-300 p-1.5 rounded transition-colors text-xs flex items-center gap-1"
          title="Сброс симулятора"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Simulator Body */}
      {mode === 'subscriber' ? (
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs font-sans bg-[#07090F]">
          {/* User Command */}
          <div className="flex justify-end">
            <div className="bg-neutral-800 border border-neutral-700 text-neutral-100 px-3 py-1.5 rounded font-mono text-xs">
              /start
            </div>
          </div>

          {/* Bot Initial Response */}
          <div className="flex justify-start">
            <div className="bg-[#0E121C] border border-neutral-800 text-neutral-300 p-4 rounded max-w-[92%] space-y-2">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="font-mono text-white text-xs tracking-tight font-bold">OrbitDev Gateway</span>
                <span className="font-mono text-[10px] text-emerald-400">STATUS: ACTIVE</span>
              </div>
              <p className="text-neutral-300 leading-relaxed text-xs">
                Автоматизированный шлюз доступа в закрытый канал. Платежи принимаются напрямую в USDT через децентрализованный смарт-шлюз без удержания комиссий третьими сторонами.
              </p>
              <div className="text-[11px] font-mono text-neutral-500 pt-1">
                PostgreSQL isolation: true · MTProto TLS: v7.2
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {subStep === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2 pt-1"
              >
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Доступные периоды подписки:
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { name: 'Standard Pass', price: 35, period: '30 дней' },
                    { name: 'Quarterly Pass', price: 89, period: '90 дней' },
                    { name: 'Lifetime Pass', price: 199, period: 'Бессрочно' },
                  ].map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setSelectedPlan(p);
                        setSubStep('plan');
                      }}
                      className="p-3 bg-[#0E121C] hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 rounded flex items-center justify-between transition-colors text-left group"
                    >
                      <div>
                        <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-500">{p.period}</div>
                      </div>
                      <div className="text-right font-mono text-xs font-semibold text-white">
                        {p.price} USDT
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {subStep === 'plan' && (
              <motion.div
                key="plan"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3 pt-1"
              >
                <div className="bg-[#0E121C] border border-neutral-800 p-3.5 rounded space-y-1.5 font-mono text-xs">
                  <div className="text-neutral-400">Сформирован счет:</div>
                  <div className="flex justify-between items-center text-white">
                    <span>{selectedPlan.name} ({selectedPlan.period})</span>
                    <span className="font-bold text-emerald-400">{selectedPlan.price} USDT</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase">
                    Выберите протокол оплаты:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSubStep('invoice')}
                      className="p-3 bg-[#111724] hover:bg-[#161F31] border border-neutral-800 hover:border-neutral-600 rounded text-left transition-colors"
                    >
                      <div className="font-mono text-xs font-semibold text-white">CryptoBot API</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Внутриклиентский инвойс</div>
                    </button>

                    <button
                      onClick={() => setSubStep('invoice')}
                      className="p-3 bg-[#111724] hover:bg-[#161F31] border border-neutral-800 hover:border-neutral-600 rounded text-left transition-colors"
                    >
                      <div className="font-mono text-xs font-semibold text-white">USDT TRC-20</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Прямой смарт-адрес</div>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSubStep('start')}
                  className="font-mono text-[11px] text-neutral-500 hover:text-neutral-300"
                >
                  ← Назад к выбору тарифа
                </button>
              </motion.div>
            )}

            {subStep === 'invoice' && (
              <motion.div
                key="invoice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="bg-[#0E121C] border border-neutral-800 p-4 rounded space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-neutral-400">Хэш инвойса: #INV-928194</span>
                    <span className="text-amber-400">AWAITING_PAYMENT</span>
                  </div>
                  <div className="text-xs text-neutral-300">
                    Сумма к оплате: <span className="font-mono font-bold text-white">{selectedPlan.price} USDT</span>
                  </div>
                  <div className="font-mono text-[11px] bg-neutral-900 border border-neutral-800 p-2.5 rounded text-neutral-300 break-all select-all">
                    TXN_ADDRESS: TYm8q...k92Pz81Xb
                  </div>
                </div>

                <button
                  onClick={() => setSubStep('confirmed')}
                  className="w-full py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs font-semibold rounded transition-colors"
                >
                  Симулировать успешную транзакцию
                </button>
              </motion.div>
            )}

            {subStep === 'confirmed' && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                <div className="bg-[#0E1618] border border-emerald-500/30 p-4 rounded space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                    <Check className="w-4 h-4" />
                    <span>Транзакция верифицирована (1/1 подтверждений)</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Сгенерирована одноразовая ссылка на вход. Ссылка деактивируется сразу после добавления в канал:
                  </p>
                  <div className="bg-neutral-950 border border-neutral-800 p-2.5 rounded font-mono text-xs text-emerald-300 truncate">
                    https://t.me/+inv_single_use_4810ac9f
                  </div>
                </div>

                <div className="bg-[#0E121C] border border-neutral-800 p-3 rounded font-mono text-[11px] text-neutral-400 space-y-1">
                  <div>POSTGRES_RECORD: ID #41829 | EXPIRE: +30 DAYS</div>
                  <div>AUTOKICK_DAEMON: SCHEDULED</div>
                </div>

                <button
                  onClick={resetSimulation}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs rounded transition-colors"
                >
                  Начать сценарий заново
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Admin Console View */
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs font-mono bg-[#07090F]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div>
              <div className="text-white font-semibold font-mono">ORBITDEV ADMIN CONSOLE</div>
              <div className="text-neutral-500 text-[11px]">PostgreSQL 16.2 · Uptime: 99.98%</div>
            </div>
            <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] rounded">
              ROOT_ACCESS
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#0E121C] border border-neutral-800 p-3 rounded">
              <div className="text-neutral-500 text-[10px]">АКТИВНЫХ ПОДПИСОК</div>
              <div className="text-lg font-bold text-white tabular-nums mt-1">1,428</div>
            </div>
            <div className="bg-[#0E121C] border border-neutral-800 p-3 rounded">
              <div className="text-neutral-500 text-[10px]">ОБОРОТ ЗА МЕСЯЦ</div>
              <div className="text-lg font-bold text-emerald-400 tabular-nums mt-1">$49,980</div>
            </div>
            <div className="bg-[#0E121C] border border-neutral-800 p-3 rounded">
              <div className="text-neutral-500 text-[10px]">КОМИССИЯ СЕРВИСАМ</div>
              <div className="text-lg font-bold text-white tabular-nums mt-1">$0.00</div>
            </div>
          </div>

          {/* Admin Action Modules */}
          <div className="space-y-2">
            <div className="text-neutral-400 text-[11px] uppercase">Управление системой:</div>

            <div className="bg-[#0E121C] border border-neutral-800 p-3.5 rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Экспорт клиентской базы (PostgreSQL dump)</span>
                <button
                  onClick={() => alert('Полный дамп базы (CSV/SQL) сохранен на диск.')}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded flex items-center gap-1.5 transition-colors text-[11px]"
                >
                  <Download className="w-3 h-3" />
                  <span>Выгрузить CSV</span>
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Экспорт ID пользователей, юзернеймов, дат оплаты и сумм. Никаких закрытых данных.
              </p>
            </div>

            <div className="bg-[#0E121C] border border-neutral-800 p-3.5 rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Рассылка по активным подписчикам</span>
                <button
                  onClick={() => {
                    setAdminBroadcastSuccess(true);
                    setTimeout(() => setAdminBroadcastSuccess(false), 3000);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-neutral-200 text-neutral-950 rounded flex items-center gap-1.5 transition-colors text-[11px] font-semibold"
                >
                  <Send className="w-3 h-3" />
                  <span>Тест рассылки</span>
                </button>
              </div>
              {adminBroadcastSuccess && (
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] rounded">
                  Сообщение успешно доставлено 1,428 пользователям без превышения Telegram rate-limits.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Simulator Footer Status */}
      <div className="bg-[#0E121B] px-4 py-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>INDEPENDENT VPS ENGINE</span>
        </div>
        <span>0% PLATFORM FEE</span>
      </div>
    </div>
  );
};
