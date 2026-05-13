'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AutomationCard, AutomationProps } from './AutomationCard';

// Dummy data
const automations: AutomationProps[] = [
  {
    id: '1',
    title: 'Restaurant Automation',
    description: 'Automate all the restaurant business with automatic mail delivery to creating and deleting events on google calendars.',
    price: 4500,
    timeSaved: '30 hrs/mo',
    category: 'Business',
    tier: 'popular',
  },
  {
    id: '2',
    title: 'Booking Appointment Automation',
    description: 'Deploy a workflow on your website and book an appointment with clients just on a single visit on your website.',
    price: 3500,
    timeSaved: '12 hrs/mo',
    category: 'Service',
    tier: 'new',
  },
  {
    id: '3',
    title: 'Social Media Automation',
    description: 'Just paste the link of topic to automatically generate and post content across Facebook, Instagram, Twitter and LinkedIn.',
    price: 5500,
    timeSaved: '40 hrs/mo',
    category: 'Marketing',
  },
  {
    id: '4',
    title: 'WhatsApp Customer Service Agent',
    description: 'Automate your WhatsApp now, to chat with your clients using AI agent and confirm a deal in 2x speed.',
    price: 7500,
    timeSaved: '50 hrs/mo',
    category: 'AI Agent',
    tier: 'popular',
  },
  {
    id: '5',
    title: 'Lead Generation Agent',
    description: 'Automate and send personal mails to your clients today with 5x better lead generation.',
    price: 3000,
    timeSaved: '25 hrs/mo',
    category: 'Lead Gen',
  }
];

const CATEGORIES = ['All', 'Service', 'Marketing', 'AI Agent', 'Lead Gen', 'Business'];

interface AutomationGalleryProps {
  limit?: number;
  showFilters?: boolean;
  showHeader?: boolean;
  isPremiumPage?: boolean;
}

export const AutomationGallery = ({ limit, showFilters = true, showHeader = true, isPremiumPage = false }: AutomationGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const magnetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!magnetRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const resetMouse = () => setPosition({ x: 0, y: 0 });

  const filteredAutomations = automations.filter(
    (a) => activeCategory === 'All' || a.category === activeCategory
  );

  const displayAutomations = limit ? filteredAutomations.slice(0, limit) : filteredAutomations;

  return (
    <section className={`bg-[var(--color-void)] relative ${showHeader ? 'py-20 md:py-28' : 'pb-20 md:pb-28'}`}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Header & Tabs */}
        {showHeader && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12"
          >
            <div className="max-w-2xl">
              <h2 className="font-display font-extrabold text-[36px] md:text-[48px] text-[var(--color-text-primary)] mb-4">
                Top 5 Workflows. <br className="hidden md:block"/> Ready to deploy.
              </h2>
              <p className="text-[16px] text-[var(--color-text-secondary)]">
                Drop these into your n8n instance or let us build what you want.
              </p>
            </div>
            
            <Link href="/automations" className="group flex items-center gap-2 text-[15px] font-medium text-[var(--color-live)] whitespace-nowrap">
              View all workflows
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}

        {/* Filter Tabs / Menu Cards */}
        {showFilters && (
          <div className={`mb-12 ${isPremiumPage ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4' : 'flex overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 gap-2 scrollbar-hide'}`}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  isPremiumPage
                    ? `
                        relative flex flex-col items-center justify-center py-6 px-4 rounded-2xl border transition-all duration-300 overflow-hidden group
                        ${activeCategory === cat 
                          ? 'bg-[var(--color-surface-2)] border-[var(--color-logo-blue)] shadow-[0_10px_30px_rgba(0,195,255,0.15)] transform -translate-y-1' 
                          : 'bg-[var(--color-surface-1)] border-[var(--color-border)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-strong)]'
                        }
                      `
                    : `
                        px-5 py-2 rounded-full whitespace-nowrap text-[14px] font-medium transition-all duration-300
                        ${activeCategory === cat 
                          ? 'bg-[var(--color-live)] text-[var(--color-void)] shadow-[0_0_15px_rgba(0,229,160,0.3)]' 
                          : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text-primary)]'
                        }
                      `
                }
              >
                {isPremiumPage && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-logo-blue)]/5 opacity-0 transition-opacity ${activeCategory === cat ? 'opacity-100' : 'group-hover:opacity-100'}`} />
                    {activeCategory === cat && (
                      <motion.div layoutId="activeHighlight" className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-logo-blue)] to-[var(--color-live)]" />
                    )}
                    <span className={`text-[15px] font-display font-bold relative z-10 ${activeCategory === cat ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'}`}>
                      {cat}
                    </span>
                  </>
                )}
                {!isPremiumPage && cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {displayAutomations.map((auto) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={auto.id}
                className="w-full"
              >
                <AutomationCard automation={auto} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button (Bottom) */}
        {limit && (
           <div className="flex justify-center mt-16">
              <div 
                ref={magnetRef}
                onMouseMove={handleMouse}
                onMouseLeave={resetMouse}
              >
                <motion.div
                  animate={{ x: position.x, y: position.y }}
                  transition={{ type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.1 }}
                >
                  <Link href="/automations">
                    <button className="px-8 py-4 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-full text-[var(--color-text-primary)] font-bold flex items-center gap-3 transition-all hover:bg-[var(--color-surface-3)] hover:border-[var(--color-logo-blue)] shadow-[0_0_20px_rgba(0,195,255,0.1)] hover:shadow-[0_0_30px_rgba(0,195,255,0.3)] group transform active:scale-95">
                      Explore More Prebuilt Automations
                      <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform text-[var(--color-live)]" />
                    </button>
                  </Link>
                </motion.div>
              </div>
           </div>
        )}
        
      </div>
    </section>
  );
};
