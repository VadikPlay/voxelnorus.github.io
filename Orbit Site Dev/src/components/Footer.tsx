import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="bg-[#05060A] text-neutral-500 text-xs py-14">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div className="flex items-center gap-3">
            <Logo size={42} className="drop-shadow-[0_0_10px_rgba(0,163,255,0.4)]" />
            <div>
              <div className="font-mono font-bold text-white tracking-wider text-sm flex items-center gap-1.5">
                <span>ORBITDEV SYSTEMS</span>
                <span className="text-[10px] text-[#38BDF8]">CORE</span>
              </div>
              <div className="text-neutral-500 text-xs mt-0.5">
                Автономная инфраструктура монетизации для Telegram
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-neutral-400 font-mono text-xs">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Telegram
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Политика конфиденциальности
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-600">
          <div>© 2027 OrbitDev Systems. All rights reserved.</div>
          <div>PostgreSQL 16 · MTProto TLS · Non-custodial</div>
        </div>
      </div>
    </footer>
  );
};
