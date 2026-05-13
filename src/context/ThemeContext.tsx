'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 
  | 'sapphire-luxe-light' | 'sapphire-luxe-dark'
  | 'emerald-executive-light' | 'emerald-executive-dark'
  | 'titanium-elite-light' | 'titanium-elite-dark'
  | 'royal-violet-light' | 'royal-violet-dark'
  | 'champagne-gold-light' | 'champagne-gold-dark'
  | 'arctic-blue-light' | 'arctic-blue-dark'
  | 'copper-luxe-light' | 'copper-luxe-dark'
  | 'cyber-cyan-light' | 'cyber-cyan-dark'
  | 'sage-intelligence-light' | 'sage-intelligence-dark'
  | 'ruby-noir-light' | 'ruby-noir-dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('sapphire-luxe-dark');
  const [mounted, setMounted] = useState(false);

  const applyThemeToDocument = (themeToApply: Theme) => {
    document.documentElement.setAttribute('data-theme', themeToApply);
    if (themeToApply.endsWith('-light')) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('flozen-theme') as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
      applyThemeToDocument(savedTheme);
    } else {
      // Auto-detect system preference and default to arctic themes
      const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = isSystemDark ? 'arctic-blue-dark' : 'arctic-blue-light';
      setThemeState(defaultTheme);
      applyThemeToDocument(defaultTheme);
      // We don't save to localStorage automatically so it tracks system changes until user explicitly sets one
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('flozen-theme', newTheme);
    applyThemeToDocument(newTheme);
  };

  const isDark = !theme.endsWith('-light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      <div className={!mounted ? 'invisible' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
