import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingProps {
  onOpenOrder: (planTitle: string, price: number) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenOrder }) => {
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 199,
      description: 'Исходный код и документация по развертыванию на личном сервере.',
      features: [
        'Исходный код (TypeScript / Node.js)',
        'Схема базы данных PostgreSQL',
        'Интеграция официального CryptoBot API',
        'Модуль одноразовых инвайт-ссылок',
        'Демон автоматического кика',
      ],
      buttonText: 'Купить исходный код',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro Turnkey',
      price: 450,
      description: 'Установка под ключ на ваш VPS, 2 кассы, месяц поддержки.',
      badge: 'Хит продаж',
      features: [
        'Все компоненты тарифа Basic',
        'Установка под ключ на ваш сервер',
        '2 кассы: CryptoBot + USDT TRC-20 / TON',
        'Выделенный PostgreSQL с автобэкапами',
        '1 месяц гарантийной поддержки 24/7',
        'Сквозное тестирование сценариев',
      ],
      buttonText: 'Заказать под ключ',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 990,
      description: 'Whitelabel, реферальная система, кастомная доработка.',
      features: [
        'Все компоненты тарифа Pro Turnkey',
        'Whitelabel (полностью ваш брендинг)',
        'Реферальная система для партнеров',
        'Кастомная доработка логики и команд',
        'Мульти-канальная маршрутизация',
        'Приоритетный SLA разработчика',
      ],
      buttonText: 'Заказать Enterprise',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 border-b border-neutral-900/80 bg-[#05070D] relative overflow-hidden">
      {/* Background ambient radial */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[350px] bg-[#00A3FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto mb-16 space-y-2"
        >
          <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-tight">
            Лицензирование
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Трехуровневая модель владения
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Единоразовый платеж за программное обеспечение. Без ежемесячных комиссий.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => {
            const isPro = plan.popular;

            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`relative rounded-xl flex flex-col justify-between p-7 transition-all ${
                  isPro
                    ? 'glass-panel border-[#00A3FF]/40 shadow-2xl shadow-[#00A3FF]/10 ring-1 ring-[#00A3FF]/30 lg:-translate-y-1'
                    : 'glass-panel glass-panel-hover'
                }`}
              >
                {/* Pro Badge */}
                {isPro && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white font-mono text-[10px] font-bold px-3 py-0.5 rounded uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white tracking-tight font-display">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 min-h-[34px] leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-white/5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-white tabular-nums tracking-tight">
                        ${plan.price}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">единоразово</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-mono text-neutral-500 uppercase">
                      Комплектация:
                    </div>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenOrder(plan.name, plan.price)}
                  className={`w-full py-3 px-4 rounded text-xs font-semibold font-mono transition-colors flex items-center justify-center gap-2 ${
                    isPro
                      ? 'bg-white hover:bg-neutral-200 text-neutral-950 font-bold shadow-lg shadow-white/10'
                      : 'bg-neutral-800/80 hover:bg-neutral-700 text-white'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
