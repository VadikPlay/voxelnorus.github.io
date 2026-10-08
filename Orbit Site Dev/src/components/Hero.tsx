import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { BotSimulator } from './BotSimulator';

interface HeroProps {
  onOpenOrder: (planTitle?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end cinematic parallax response
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Card tilt transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const cardTranslateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const cardTranslateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  // Ambient backdrop displacement transforms
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-32 pb-20 md:pt-36 md:pb-24 border-b border-neutral-900 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Mouse-Following Glow Beacon */}
      <motion.div
        style={{
          x: bgTranslateX,
          y: bgTranslateY,
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#00A3FF]/12 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Direct Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Live Infrastructure Status Ticker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A0E18] border border-neutral-800 text-[11px] font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A3FF]" />
              </span>
              <span className="text-white font-semibold">ORBITDEV CORE</span>
              <span className="text-neutral-700">·</span>
              <span className="text-neutral-400">POSTGRESQL 16</span>
              <span className="text-neutral-700">·</span>
              <span className="text-[#38BDF8] font-semibold">0% FEES</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] max-w-2xl">
              Собственный Telegram-бот для платных каналов. Без комиссий.
            </h1>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
              Прямой прием платежей в USDT (CryptoBot и TRC-20), выделенная база данных PostgreSQL и автоматическая выдача 1-разовых инвайтов. Полный контроль над подписчиками без сторонних сервисов-посредников.
            </p>

            {/* Micro Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300 pt-1 font-mono">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>0% комиссии платформе</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>База PostgreSQL на вашем VPS</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>Некастодиальные выплаты</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenOrder('Pro Turnkey')}
                className="px-5 py-3 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 rounded transition-all duration-150 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] font-mono"
              >
                <span>Развернуть под ключ ($450)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="#calculator"
                className="px-5 py-3 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded transition-colors text-center font-mono"
              >
                Рассчитать окупаемость
              </a>
            </div>

            <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Оплата через любого проверенного Гаранта (Escrow)</span>
            </div>
          </motion.div>

          {/* Right Column: 3D Mouse Parallax Simulator */}
          <div className="lg:col-span-5" id="simulator">
            <motion.div
              style={{
                rotateX,
                rotateY,
                x: cardTranslateX,
                y: cardTranslateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative will-change-transform"
            >
              {/* Subtle ambient rim glow underneath the card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#00A3FF]/25 via-[#0051FF]/15 to-transparent rounded-2xl blur-lg opacity-70 pointer-events-none" />

              {/* The Actual Simulator Component */}
              <div className="relative">
                <BotSimulator />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
