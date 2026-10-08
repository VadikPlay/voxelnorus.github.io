import React, { useState } from 'react';
import { motion } from 'motion/react';

interface RoiCalculatorProps {
  onOpenOrder: (planTitle?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenOrder }) => {
  const [revenue, setRevenue] = useState<number>(10000);
  const [feePercent, setFeePercent] = useState<number>(15);

  // Core metrics calculation
  const monthlyLoss = Math.round(revenue * (feePercent / 100));
  const yearlySavings = monthlyLoss * 12;
  const botCost = 450; // Pro turnkey price
  const paybackDays = Math.max(1, Math.round(botCost / (monthlyLoss / 30)));

  const presets = [
    { label: '$2,500', val: 2500 },
    { label: '$5,000', val: 5000 },
    { label: '$10,000', val: 10000 },
    { label: '$25,000', val: 25000 },
    { label: '$50,000', val: 50000 },
  ];

  return (
    <section id="calculator" className="py-24 border-b border-neutral-900/80 bg-[#05070D] relative overflow-hidden">
      {/* Background ambient radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00A3FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto mb-14 space-y-2"
        >
          <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-tight">
            Калькулятор окупаемости
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Расчет издержек на комиссиях
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Сравнение потерь при стандартных комиссиях сервисов и владения собственной инфраструктурой.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-2xl p-6 sm:p-10 space-y-8"
        >
          {/* Slider & Presets */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <label htmlFor="roi-slider" className="text-xs font-mono text-neutral-400 uppercase">
                Ваш ежемесячный оборот в Telegram:
              </label>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums tracking-tight">
                ${revenue.toLocaleString()} <span className="text-xs text-neutral-500 font-normal">/ мес</span>
              </div>
            </div>

            <input
              id="roi-slider"
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded appearance-none cursor-pointer accent-[#00A3FF]"
            />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-1">
              <div className="flex gap-2">
                {presets.map((p) => (
                  <button
                    key={p.val}
                    onClick={() => setRevenue(p.val)}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      revenue === p.val
                        ? 'bg-[#00A3FF]/20 text-[#38BDF8] border border-[#00A3FF]/40'
                        : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Commission Rate Switcher */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span>Комиссия:</span>
                {[10, 15, 20].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setFeePercent(rate)}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      feePercent === rate
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#0A0E18]/80 border border-white/5 p-5 rounded-xl space-y-2">
              <div className="text-[11px] font-mono text-neutral-500 uppercase">
                Потери сторонним сервисам ({feePercent}%)
              </div>
              <div className="text-xs text-neutral-400">
                Вы отдаете сервисам:
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-300 tabular-nums">
                ${monthlyLoss.toLocaleString()}{' '}
                <span className="text-xs font-normal text-neutral-500">в месяц</span>
              </div>
            </div>

            <div className="bg-[#0A0E18]/80 border border-white/5 p-5 rounded-xl space-y-2">
              <div className="text-[11px] font-mono text-neutral-500 uppercase">
                Экономия при 0% комиссии
              </div>
              <div className="text-xs text-neutral-400">
                С нашим ботом вы экономите:
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#38BDF8] tabular-nums">
                ${yearlySavings.toLocaleString()}{' '}
                <span className="text-xs font-normal text-neutral-500">в год</span>
              </div>
            </div>
          </div>

          {/* Payback statement */}
          <div className="p-6 bg-[#0E1524]/70 border border-[#00A3FF]/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-[11px] font-mono text-neutral-400 uppercase">
                Окупаемость тарифа Pro Turnkey ($450)
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
                Бот окупается за {paybackDays} {paybackDays === 1 ? 'день' : paybackDays < 5 ? 'дня' : 'дней'}
              </div>
            </div>

            <button
              onClick={() => onOpenOrder('Pro Turnkey')}
              className="px-4 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs font-bold rounded transition-colors whitespace-nowrap shadow-md shadow-white/10"
            >
              Зафиксировать выгоду
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
