'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  label: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, label, className, disabled, ...props }, ref) => {
    
    let variantStyles = '';
    switch (variant) {
      case 'primary':
        variantStyles = 'bg-[var(--color-live)] text-white border-none font-bold shadow-[var(--button-glow)] hover:shadow-[0_0_40px_var(--glow)] transition-all duration-300';
        break;
      case 'secondary':
        variantStyles = 'bg-transparent text-[var(--color-live)] border border-[var(--color-live-border)] font-medium';
        break;
      case 'ghost':
        variantStyles = 'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-strong)] font-medium hover:bg-[var(--color-surface-3)]';
        break;
      case 'destructive':
        variantStyles = 'bg-[var(--color-alert)]/15 text-[var(--color-alert)] border border-[var(--color-alert)]/30 font-medium hover:bg-[var(--color-alert)]/25';
        break;
    }

    let sizeStyles = '';
    switch (size) {
      case 'sm':
        sizeStyles = 'h-8 px-3.5 text-[13px] rounded-[var(--radius-md)]';
        break;
      case 'md':
        sizeStyles = 'h-10 px-5 text-[14px] rounded-[var(--radius-md)] min-w-[160px]';
        break;
      case 'lg':
        sizeStyles = 'h-12 px-7 text-[15px] rounded-[var(--radius-md)] min-w-[160px]';
        break;
    }
    
    // Specifically override min-w for non-primary buttons if needed, but keeping it simple based on rules
    if (variant !== 'primary') {
      sizeStyles = sizeStyles.replace('min-w-[160px]', '');
    }

    const combinedClasses = `relative inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-live)] focus:ring-offset-2 focus:ring-offset-[var(--color-void)] disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${sizeStyles} ${className || ''}`;

    // Remove the onClick from motion props to avoid type conflicts if present
    const { onClick, ...restMotionProps } = props as HTMLMotionProps<"button">;

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={combinedClasses}
        disabled={disabled || isLoading}
        onClick={onClick as any}
        {...restMotionProps}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          label
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
