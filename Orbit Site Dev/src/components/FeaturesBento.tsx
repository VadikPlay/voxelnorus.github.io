import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export const FeaturesBento: React.FC = () => {
  return (
    <section id="features" className="py-24 border-b border-neutral-900/80 bg-[#05070D] relative overflow-hidden">
      {/* Background ambient radial for glass depth */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[350px] bg-[#00A3FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mb-14 space-y-2"
        >
          <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-tight">
            Спецификация ядра
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Четыре модуля автономной работы
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Никаких внешних серверов: весь стек работает на вашем личном VPS.
          </p>
        </motion.div>

        {/* Bento Grid with Dark Obsidian Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Card 1: Прямые крипто-платежи */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="lg:col-span-7 glass-panel glass-panel-hover rounded-xl p-7 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>01</span>
                <span className="text-[#38BDF8]">PAYMENT_GATEWAY</span>
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight font-display">
                Прямые крипто-платежи
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Интеграция официального <strong className="text-white">CryptoBot API</strong> и прямых смарт-кошельков <strong className="text-white">USDT (TRC-20, TON, BEP-20)</strong>. Средства зачисляются сразу на ваш личный кошелек без задержек и комиссий сервиса.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                CryptoBot Webhooks
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                USDT TRC-20 / TON
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                0% комиссии платформе
              </span>
            </div>
          </motion.article>

          {/* Card 2: Ваша база данных */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 glass-panel glass-panel-hover rounded-xl p-7 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>02</span>
                <span className="text-[#38BDF8]">DATA_STORAGE</span>
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight font-display">
                Ваша база данных
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Выделенный сервер <strong className="text-white">PostgreSQL</strong>. База подписчиков и история транзакций принадлежат только вам. Защита от утечки контактов конкурентам.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Экспорт дампа в CSV/SQL в 1 клик</span>
              <span className="text-neutral-500">PostgreSQL 16</span>
            </div>
          </motion.article>

          {/* Card 3: Защита от блокировок */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-5 glass-panel glass-panel-hover rounded-xl p-7 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>03</span>
                <span className="text-[#38BDF8]">SECURITY</span>
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight font-display">
                Защита от блокировок
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Полная анонимность. Бот работает на независимом зарубежном VPS без привязки к вашему паспорту или банковским картам. Никаких внезапных блокировок баланса.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Zero-KYC инфраструктура</span>
            </div>
          </motion.article>

          {/* Card 4: Мгновенные инвайты */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-7 glass-panel glass-panel-hover rounded-xl p-7 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>04</span>
                <span className="text-[#38BDF8]">ACCESS_CYCLE</span>
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight font-display">
                Мгновенные инвайты
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Генерация строго одноразовых ссылок (<code className="font-mono text-neutral-300 text-xs">member_limit: 1</code>). Ссылка деактивируется после входа. Бот напоминает о продлении за 3 дня и 1 день, а при неоплате своевременно исключает пользователя из канала.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                1-разовые токены
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                Авто-напоминания
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                Точный автокик
              </span>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
