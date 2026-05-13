'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  // Always start with loading=true on both server and client to avoid hydration mismatch
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check sessionStorage only on client after mount
    const hasLoaded = sessionStorage.getItem('flozen-loaded');
    if (hasLoaded) {
      // Skip splash entirely
      setIsLoading(false);
      return;
    }

    // Show splash
    setShouldShow(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('flozen-loaded', '1');
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // If we're not showing the splash (already loaded before), render children immediately
  if (!isLoading && !shouldShow) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && shouldShow ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: 'var(--color-void)' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo Text — Letter by Letter */}
          <motion.div
            className="flex gap-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
          >
            {['F', 'L', 'O', 'Z', 'E', 'N'].map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                transition={{ type: 'spring' as const, damping: 12, stiffness: 100 }}
                className="font-display font-extrabold text-5xl md:text-7xl tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              variants={{
                hidden: { y: 30, opacity: 0, scale: 0.5 },
                visible: { y: 0, opacity: 1, scale: 1 },
              }}
              transition={{ type: 'spring' as const, damping: 12, stiffness: 100 }}
              className="font-display font-extrabold text-5xl md:text-7xl tracking-tight"
              style={{ color: 'var(--color-live)' }}
            >
              AI
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Automation Engineering
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            className="mt-8 h-[2px] rounded-full"
            style={{ background: 'var(--color-live)' }}
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Ambient Glow */}
          <div
            className="absolute w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
            style={{ background: 'var(--color-live)' }}
          />
        </motion.div>
      ) : children}
    </AnimatePresence>
  );
}
