import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="bg-[#0A0D15] border border-neutral-800 rounded-lg w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
      >
        <div className="px-6 py-4 bg-[#0E121B] border-b border-neutral-800 flex items-center justify-between">
          <div className="font-mono text-xs text-white uppercase tracking-tight">
            Политика суверенности данных
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-neutral-300 leading-relaxed font-sans">
          <div className="font-bold text-white font-mono uppercase text-xs">
            1. Автономность выполнения
          </div>
          <p>
            OrbitDev предоставляет исходный код и установочные скрипты для запуска на персональном сервере заказчика. Мы не выступаем кастодиалом, шлюзом-посредником или оператором персональных данных.
          </p>

          <div className="font-bold text-white font-mono uppercase text-xs">
            2. Прямой поток средств
          </div>
          <p>
            Все транзакции направляются строго на некастодиальные адреса заказчика. Разработчик не имеет доступа к кошелькам и приватным ключам.
          </p>

          <div className="font-bold text-white font-mono uppercase text-xs">
            3. Изоляция базы данных
          </div>
          <p>
            База данных PostgreSQL функционирует внутри закрытого окружения VPS заказчика. Реестр подписчиков никогда не передается на сторонние сервера аналитики.
          </p>
        </div>

        <div className="px-6 py-3 bg-[#0E121B] border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs rounded transition-colors"
          >
            Закрыть
          </button>
        </div>
      </motion.div>
    </div>
  );
};
