'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className = '', showText = true, size = 'md' }: LogoProps) => {
  const dimensions = {
    sm: { width: 24, height: 24, fontSize: 'text-lg' },
    md: { width: 32, height: 32, fontSize: 'text-2xl' },
    lg: { width: 40, height: 40, fontSize: 'text-3xl' },
  };

  const { width, height, fontSize } = dimensions[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Logo Mark */}
      <div className="relative flex items-center justify-center">
        <svg 
          width={width} 
          height={height} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_var(--glow)]"
        >
          {/* Bottom/Main shape - uses text color for primary brand identity */}
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            d="M12 36L26 12H40L36 19H26L20 29H30L26 36H12Z" 
            fill="currentColor" 
            className="text-[var(--color-text-primary)]"
          />
          {/* Top accent shape - dynamic theme color */}
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            d="M24 19L30 8H40L34 19H24Z" 
            fill="currentColor" 
            className="text-[var(--color-logo-blue)]"
          />
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <div className={`flex font-display font-black ${fontSize} tracking-tight select-none`}>
          <span className="text-[var(--color-text-primary)] transition-colors duration-300">FLOZEN</span>
          <span className="text-[var(--color-logo-blue)] transition-colors duration-300">AI</span>
        </div>
      )}
    </div>
  );
};
