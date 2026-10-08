import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'А это безопасно?',
      answer:
        'Да. Программный комплекс разворачивается на вашем личном виртуальном сервере (VPS). Все платежные адреса и сид-фразы принадлежат исключительно вам. Исходный код поставляется в открытом виде (без обфускации), что позволяет провести независимый аудит на отсутствие бэкдоров и скрытых перенаправлений.',
    },
    {
      question: 'Нужно ли мне разбираться в коде?',
      answer:
        'Нет. В тарифах Pro Turnkey и Enterprise наши инженеры полностью выполняют установку: регистрацию бота в Telegram, развертывание изолированной базы данных PostgreSQL, подключение платежных шлюзов и настройку прав администратора в закрытых каналах. Вы получаете готовый рабочий продукт.',
    },
    {
      question: 'Что если Telegram обновит API?',
      answer:
        'Архитектура бота базируется на стабильных версиях официального Telegram Bot API с поддержкой обратной совместимости. Для клиентов тарифа Pro предоставляется 1 месяц технической поддержки и регулярные обновления, а для тарифа Enterprise — персональный SLA на 6 месяцев.',
    },
    {
      question: 'Как принимается крипта?',
      answer:
        'Поддерживаются два независимых шлюза: 1) CryptoBot API (внутриклиентские инвойсы USDT/TON/BTC с мгновенным подтверждением через вебхуки); 2) Прямые переводы USDT (TRC-20, TON, BEP-20) на некастодиальный кошелек с проверкой через блокчейн-эксплореры.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 border-b border-neutral-900/80 bg-[#05070D]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto mb-14 space-y-2"
        >
          <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-tight">
            Спецификация
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Часто задаваемые вопросы
          </h2>
        </motion.div>

        {/* Shadcn Accordion with Glass Styling */}
        <div className="divide-y divide-white/5 border-y border-white/5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-4">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left flex items-center justify-between gap-4 py-2 text-sm sm:text-base font-medium text-white hover:text-[#38BDF8] transition-colors font-display"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#38BDF8]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
