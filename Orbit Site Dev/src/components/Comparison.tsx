import React from 'react';
import { motion } from 'motion/react';
import { Check, Minus } from 'lucide-react';

export const Comparison: React.FC = () => {
  const specs = [
    {
      parameter: 'Комиссионные отчисления',
      platforms: '15% — 22% с каждого входящего платежа',
      televault: '0% (только сетевой сбор блокчейна ~$0.10)',
    },
    {
      parameter: 'Хранение данных подписчиков',
      platforms: 'Закрытый сервер стороннего сервиса',
      televault: 'Изолированный PostgreSQL на вашем VPS',
    },
    {
      parameter: 'Срок вывода заработанных средств',
      platforms: 'От 3 до 14 рабочих дней, ручная модерация',
      televault: 'Мгновенно на ваш некастодиальный кошелек',
    },
    {
      parameter: 'Риск блокировки аккаунта',
      platforms: 'Высокий (блокировка сервисом по жалобам)',
      televault: 'Отсутствует (автономный инстанс)',
    },
    {
      parameter: 'Идентификация личности (KYC)',
      platforms: 'Обязательная верификация паспорта',
      televault: 'Полная анонимность владельца',
    },
  ];

  return (
    <section className="py-20 bg-[#05070D] border-b border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mb-12 space-y-2"
        >
          <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-tight">
            Сравнительный аудит
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Централизованные платформы против OrbitDev
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/5 bg-[#0C1220]/70 text-neutral-400 font-mono">
                  <th className="py-4 px-6 font-medium">Критерий</th>
                  <th className="py-4 px-6 font-medium text-neutral-400">Сторонние сервисы (Tribute, Paywall)</th>
                  <th className="py-4 px-6 font-medium text-[#38BDF8]">Инфраструктура OrbitDev</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {specs.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-medium text-white font-display text-sm">{row.parameter}</td>
                    <td className="py-4 px-6 text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Minus className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span>{row.platforms}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-200 bg-[#00A3FF]/[0.02]">
                      <div className="flex items-center gap-2 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                        <span className="text-white">{row.televault}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
