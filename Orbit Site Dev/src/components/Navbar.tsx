import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenOrder: (planTitle?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Архитектура', href: '#features' },
    { label: 'Интерфейс', href: '#simulator' },
    { label: 'Калькулятор', href: '#calculator' },
    { label: 'Тарифы', href: '#pricing' },
    { label: 'Спецификация', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-[#06080E]/90 backdrop-blur-md border-neutral-800/80 shadow-lg'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Pure Wordmark with Orbital Logo */}
        <a
          href="#"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight text-white hover:opacity-90 transition-opacity group"
        >
          <Logo size={36} className="group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(0,163,255,0.4)]" />
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-base font-bold tracking-tight text-white">OrbitDev</span>
            <span className="text-[10px] font-mono text-[#38BDF8] font-bold">.bot</span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors tracking-tight"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <span className="font-mono">t.me/orbitdev_bot</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-500" />
          </a>

          <button
            onClick={() => onOpenOrder('Pro Turnkey')}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-950 bg-white hover:bg-neutral-200 rounded transition-colors tracking-tight font-mono font-semibold"
          >
            Купить лицензию
          </button>
        </div>
      </div>
    </header>
  );
};
