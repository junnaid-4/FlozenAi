import React from 'react';

export type BadgeVariant = 'live' | 'amber' | 'muted' | 'blue';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'muted', children, className = '', ...props }) => {
  let variantStyles = '';
  switch (variant) {
    case 'live':
      variantStyles = 'bg-[var(--color-live-dim)] text-[var(--color-live)] border border-[var(--color-live-border)]';
      break;
    case 'amber':
      variantStyles = 'bg-[var(--color-amber)]/10 text-[var(--color-amber)] border border-[var(--color-amber)]/20';
      break;
    case 'muted':
      variantStyles = 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]';
      break;
    case 'blue':
      variantStyles = 'bg-[var(--color-logo-blue)]/10 text-[var(--color-logo-blue)] border border-[var(--color-logo-blue)]/20';
      break;
  }

  const baseStyles = 'inline-flex items-center gap-2 px-2 py-0.5 rounded-[var(--radius-sm)] font-mono text-[11px] uppercase tracking-wider font-medium whitespace-nowrap';

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </span>
  );
};
