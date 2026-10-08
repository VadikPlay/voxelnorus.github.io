/**
 * TeleVault — Autonomous Telegram Subscription & Direct Crypto Payment Infrastructure
 * Production-ready landing page with minimal engineering aesthetics and high conversion architecture.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Comparison } from './components/Comparison';
import { FeaturesBento } from './components/FeaturesBento';
import { TechStack } from './components/TechStack';
import { TrustEscrow } from './components/TrustEscrow';
import { RoiCalculator } from './components/RoiCalculator';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { PrivacyModal } from './components/PrivacyModal';

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('Pro Turnkey');
  const [selectedPrice, setSelectedPrice] = useState<number>(450);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleOpenOrder = (planName: string = 'Pro Turnkey', price: number = 450) => {
    setSelectedPlan(planName);
    setSelectedPrice(price);
    setOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#06080E] text-neutral-100 selection:bg-[#00A3FF] selection:text-neutral-950 flex flex-col font-sans">
      {/* 1. Header & Navigation */}
      <Navbar onOpenOrder={handleOpenOrder} />

      {/* Main Semantic Content */}
      <main className="flex-1">
        {/* 2. Hero Section (with Live Subscriber & Admin Simulator) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Hero onOpenOrder={handleOpenOrder} />
        </motion.div>

        {/* 3. Architectural Comparison: SaaS Platforms vs TeleVault */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Comparison />
        </motion.div>

        {/* 4. Core Features Bento-Grid (Cards 1-4) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <FeaturesBento />
        </motion.div>

        {/* 5. Engineering Transparency: Docker, PostgreSQL Schema, Anti-Flood Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <TechStack />
        </motion.div>

        {/* 6. Security & Escrow Guarantee: 4-Step 2-Hour Launch Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <TrustEscrow />
        </motion.div>

        {/* 7. ROI Calculator: Direct interactive payback demonstration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <RoiCalculator onOpenOrder={handleOpenOrder} />
        </motion.div>

        {/* 8. Pricing: Three-tier model (Basic, Pro Turnkey, Enterprise) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Pricing onOpenOrder={handleOpenOrder} />
        </motion.div>

        {/* 9. FAQ Accordion: Technical and operational answers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Faq />
        </motion.div>
      </main>

      {/* 10. Minimalist Footer */}
      <Footer onOpenPrivacy={() => setPrivacyModalOpen(true)} />

      {/* Interactive Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialPlan={selectedPlan}
        initialPrice={selectedPrice}
      />

      {/* Privacy & Security Policy Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
