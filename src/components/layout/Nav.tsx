'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { useTheme } from '@/context/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Logo } from '@/components/ui/Logo';

export const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll for height compression and blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Automations', href: '/automations' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex items-center transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'h-16 backdrop-blur-md bg-[var(--color-surface-1)]/80 border-b border-[var(--color-border)] shadow-lg' 
          : 'h-20 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-full">
        {/* Logo Section */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="hidden sm:block">
            <Magnetic strength={0.3}>
              <Logo size="md" />
            </Magnetic>
          </div>
          <div className="sm:hidden">
            <Logo size="sm" showText={false} />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span
                  className={`text-[14px] font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-[var(--color-logo-blue)]' 
                      : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-logo-blue)] rounded-full"
                  />
                )}
                {!isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-logo-blue)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: CTA & Theme Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeSwitcher />
          <Button 
            variant="primary" 
            size="sm" 
            label="Start Building" 
            onClick={() => router.push('/contact')}
          />
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeSwitcher />
          <button
            className="p-2 text-[var(--color-text-primary)] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[var(--color-void)] border-b border-[var(--color-border)] p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[18px] font-medium transition-colors ${
                      isActive ? 'text-[var(--color-logo-blue)]' : 'text-[var(--color-text-primary)]'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-[var(--color-border)]">
              <Button 
                variant="primary" 
                size="md" 
                label="Start Building" 
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/contact');
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
