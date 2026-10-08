import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  initialPrice?: number;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialPlan = 'Pro Turnkey',
  initialPrice = 450,
}) => {
  const [plan, setPlan] = useState(initialPlan);
  const [telegramUsername, setTelegramUsername] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  React.useEffect(() => {
    if (initialPlan) setPlan(initialPlan);
  }, [initialPlan]);

  const planPrices: Record<string, number> = {
    'Basic': 199,
    'Pro Turnkey': 450,
    'Enterprise': 990,
  };

  const currentPrice = planPrices[plan] || initialPrice;
  const finalPrice = discountApplied ? Math.round(currentPrice * 0.9) : currentPrice;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'VIP2027') {
      setDiscountApplied(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramUsername.trim()) return;
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="bg-[#0A0D15] border border-neutral-800 rounded-lg w-full max-w-md overflow-hidden shadow-2xl relative"
      >
        <div className="px-6 py-4 bg-[#0E121B] border-b border-neutral-800 flex items-center justify-between">
          <div className="font-mono text-xs text-white uppercase tracking-tight flex items-center gap-2">
            <span className="text-[#00A3FF] font-bold">ORBITDEV</span>
            <span className="text-neutral-500">·</span>
            <span>Оформление лицензии</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-10 h-10 bg-neutral-900 border border-neutral-700 text-white rounded-full flex items-center justify-center mx-auto">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Заявка зарегистрирована</h4>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  Специалист свяжется с вами в Telegram по аккаунту <span className="text-white font-mono">{telegramUsername}</span> для согласования реквизитов и передачи кода.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs font-semibold rounded transition-colors"
              >
                Закрыть окно
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-400 font-mono uppercase text-[11px]">
                  Выбранный тариф:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Basic', 'Pro Turnkey', 'Enterprise'] as const).map((pName) => (
                    <button
                      type="button"
                      key={pName}
                      onClick={() => setPlan(pName)}
                      className={`py-2 px-2 rounded text-center border font-mono transition-colors ${
                        plan === pName
                          ? 'bg-neutral-800 border-white text-white'
                          : 'bg-[#0E121C] border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div>{pName.split(' ')[0]}</div>
                      <div className="text-[10px] text-neutral-500">${planPrices[pName]}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0E121C] border border-neutral-800 p-3 rounded flex items-center justify-between font-mono">
                <span className="text-neutral-400">Сумма к оплате:</span>
                <span className="text-white font-bold">${finalPrice} USDT</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-mono uppercase text-[11px]">
                  Telegram @username для связи:*
                </label>
                <input
                  type="text"
                  required
                  placeholder="@username"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  className="w-full bg-[#0E121C] border border-neutral-800 focus:border-neutral-500 rounded py-2 px-3 text-white font-mono placeholder-neutral-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-mono uppercase text-[11px]">
                  Промокод:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="VIP2027"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-[#0E121C] border border-neutral-800 focus:border-neutral-500 rounded py-2 px-3 text-white font-mono uppercase placeholder-neutral-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-mono transition-colors"
                  >
                    Применить
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs font-semibold rounded transition-colors"
              >
                Подтвердить заказ (${finalPrice} USDT)
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
