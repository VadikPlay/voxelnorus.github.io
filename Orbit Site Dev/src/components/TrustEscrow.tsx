import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export const TrustEscrow: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Регистрация бота в @BotFather',
      time: '2 минуты',
      desc: 'Создаете бота в Telegram и получаете API-токен. Все права на бота остаются у вас.',
    },
    {
      num: '02',
      title: 'Аренда чистого VPS ($3–$5/мес)',
      time: '5 минут',
      desc: 'Предоставляем список надежных зарубежных хостингов с оплатой криптой без паспорта.',
    },
    {
      num: '03',
      title: 'Развертывание и настройка базы',
      time: 'до 2 часов',
      desc: 'Инженер разворачивает Docker, PostgreSQL, подключает ваши кассы и настраивает каналы.',
    },
    {
      num: '04',
      title: 'Тестовый платеж и запуск',
      time: '10 минут',
      desc: 'Проводим сквозной платеж на 1 USDT, проверяем выдачу инвайта и передаем админ-права.',
    },
  ];

  return (
    <section className="py-24 border-b border-neutral-900/80 bg-[#05070D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-14 space-y-2">
          <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-tight">
            Регламент безопасности
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Сделка через гаранта и регламент запуска
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Никаких переводов вслепую. Прозрачная процедура передачи исходного кода и запуска.
          </p>
        </div>

        {/* 4-Step Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {steps.map((s) => (
            <div
              key={s.num}
              className="glass-panel glass-panel-hover p-5 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
                  <span className="text-[#38BDF8] font-bold">ШАГ {s.num}</span>
                  <span>{s.time}</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1.5 font-display">{s.title}</div>
                <p className="text-xs text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Escrow Guarantee Card */}
        <div className="glass-panel rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-[#00A3FF]/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/30 flex items-center justify-center text-[#38BDF8] shrink-0 mt-1 shadow-md shadow-[#00A3FF]/10">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white font-display">
                Поддержка безопасной сделки (Escrow / Garant)
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                Мы поддерживаем проведение сделки через любого авторитетного гаранта профильных форумов или крипто-эскроу. Средства выплачиваются разработчику только после того, как вы лично примете работу на своем VPS сервере.
              </p>
            </div>
          </div>

          <div className="shrink-0 font-mono text-xs text-[#38BDF8] border border-[#00A3FF]/30 px-3.5 py-1.5 rounded-md bg-[#00A3FF]/5">
            ESCROW_VERIFIED: TRUE
          </div>
        </div>
      </div>
    </section>
  );
};
