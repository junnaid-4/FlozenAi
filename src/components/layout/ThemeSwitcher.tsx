'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, Theme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES: { id: Theme; name: string; accent: string; type: 'dark' | 'light' }[] = [
  // SAPPHIRE LUXE
  { id: 'sapphire-luxe-light', name: 'Sapphire Luxe', accent: '#4C8DFF', type: 'light' },
  { id: 'sapphire-luxe-dark', name: 'Sapphire Luxe', accent: '#4C8DFF', type: 'dark' },
  
  // EMERALD EXECUTIVE
  { id: 'emerald-executive-light', name: 'Emerald Executive', accent: '#34D399', type: 'light' },
  { id: 'emerald-executive-dark', name: 'Emerald Executive', accent: '#10B981', type: 'dark' },
  
  // TITANIUM ELITE
  { id: 'titanium-elite-light', name: 'Titanium Elite', accent: '#CBD5E1', type: 'light' },
  { id: 'titanium-elite-dark', name: 'Titanium Elite', accent: '#94A3B8', type: 'dark' },
  
  // ROYAL VIOLET
  { id: 'royal-violet-light', name: 'Royal Violet', accent: '#C4B5FD', type: 'light' },
  { id: 'royal-violet-dark', name: 'Royal Violet', accent: '#A78BFA', type: 'dark' },
  
  // CHAMPAGNE GOLD
  { id: 'champagne-gold-light', name: 'Champagne Gold', accent: '#E7C55B', type: 'light' },
  { id: 'champagne-gold-dark', name: 'Champagne Gold', accent: '#D4AF37', type: 'dark' },
  
  // ARCTIC BLUE
  { id: 'arctic-blue-light', name: 'Arctic Blue', accent: '#60A5FA', type: 'light' },
  { id: 'arctic-blue-dark', name: 'Arctic Blue', accent: '#60A5FA', type: 'dark' },
  
  // COPPER LUXE
  { id: 'copper-luxe-light', name: 'Copper Luxe', accent: '#FDBA74', type: 'light' },
  { id: 'copper-luxe-dark', name: 'Copper Luxe', accent: '#F59E0B', type: 'dark' },
  
  // CYBER CYAN
  { id: 'cyber-cyan-light', name: 'Cyber Cyan', accent: '#67E8F9', type: 'light' },
  { id: 'cyber-cyan-dark', name: 'Cyber Cyan', accent: '#06B6D4', type: 'dark' },
  
  // SAGE INTELLIGENCE
  { id: 'sage-intelligence-light', name: 'Sage Intelligence', accent: '#8FD6A3', type: 'light' },
  { id: 'sage-intelligence-dark', name: 'Sage Intelligence', accent: '#7FA38B', type: 'dark' },
  
  // RUBY NOIR
  { id: 'ruby-noir-light', name: 'Ruby Noir', accent: '#FCA5A5', type: 'light' },
  { id: 'ruby-noir-dark', name: 'Ruby Noir', accent: '#EF4444', type: 'dark' },
];

export const ThemeSwitcher = () => {
  const { theme, setTheme, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'dark' | 'light'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredThemes = THEMES.filter((t) => activeTab === 'all' || t.type === activeTab);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: 'var(--surface-v2)' }}
        className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--color-text-primary)] hover:border-[var(--color-live)] hover:text-[var(--color-live)] transition-all shadow-lg"
      >
        <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-current" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{ backgroundColor: 'var(--surface)' }}
            className="absolute right-0 mt-4 w-[calc(100vw-3rem)] sm:w-72 max-w-72 border border-[var(--color-live)]/20 rounded-[20px] sm:rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.7)] overflow-hidden z-[100] p-3 sm:p-4"
          >
            {/* Header Tabs - Exactly as Screenshot */}
            <div 
              style={{ backgroundColor: 'var(--surface-v2)' }}
              className="p-1 rounded-[22px] flex items-center mb-4 border border-black/5"
            >
              {(['all', 'dark', 'light'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-[13px] font-bold rounded-[18px] transition-all relative ${
                    activeTab === tab ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabBackground"
                      className="absolute inset-0 bg-[var(--color-live)] shadow-[0_4px_15px_var(--glow)] rounded-[18px]"
                    />
                  )}
                  <span className="relative z-10 capitalize">{tab}</span>
                </button>
              ))}
            </div>

            {/* Theme List */}
            <div 
              data-lenis-prevent
              className="max-h-[250px] sm:max-h-[400px] overflow-y-auto pr-1 custom-scrollbar-thin"
            >
              <div className="flex flex-col gap-1.5">
                {filteredThemes.map((t) => (
                  <button
                    key={`${t.id}-${t.type}`}
                    onClick={() => {
                      setTheme(t.id);
                      // Removed setIsOpen(false) to keep menu open on selection
                    }}
                    className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 rounded-[18px] sm:rounded-[24px] transition-all group relative ${
                      theme === t.id 
                        ? 'bg-[var(--color-live)]/10 border border-[var(--color-live)]/30' 
                        : 'hover:bg-[var(--color-surface-3)] border border-transparent'
                    }`}
                  >
                    {/* Large Color Dot */}
                    <div 
                      className="w-5 h-5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: t.accent }}
                    />

                    <span className={`text-[13px] sm:text-[14px] font-semibold flex-1 text-left ${
                      theme === t.id ? 'text-[var(--color-live)]' : 'text-[var(--color-text-primary)]'
                    }`}>
                      {t.name}
                      <span className="ml-2 text-[10px] opacity-40 font-normal uppercase tracking-tighter">
                        {t.type}
                      </span>
                    </span>

                    {/* Active Indicator Dot */}
                    {theme === t.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-live)] shadow-[0_0_8px_var(--color-live)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar-thin::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb {
          background: var(--color-live-dim);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
