import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface PricingCardProps {
  title: string;
  price: number;
  featured?: boolean;
  valueUnlocked: string;
  outcomes: string[];
  ctaText?: string;
  onClick?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  featured = false,
  valueUnlocked,
  outcomes,
  ctaText = "Start learning now",
  onClick
}) => {
  return (
    <div className={`
      relative rounded-2xl p-8 flex flex-col h-full bg-[var(--color-surface-2)]
      ${featured 
        ? 'border-[1.5px] border-[var(--color-live)] shadow-[0_0_40px_rgba(0,229,160,0.1)] z-10 scale-[1.02]' 
        : 'border border-[var(--color-border)] z-0'}
    `}>
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Badge variant="live">Most Popular: Builder</Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h3 className="font-display font-bold text-[22px] text-[var(--color-text-primary)] mb-2">
          {title}
        </h3>
        <div className="flex items-end gap-2 mb-2">
          <span className="font-display font-bold text-[40px] text-[var(--color-text-primary)] leading-none">
            ₨{price.toLocaleString()}
          </span>
        </div>
        <p className="text-[13px] font-mono text-[var(--color-text-muted)] flex items-center gap-1.5 mt-4 pt-4 border-t border-[var(--color-border)]">
          <Target size={14} className="text-[var(--color-live)]" />
          Value Unlocked: ~₨{valueUnlocked} in dev costs
        </p>
      </div>

      {/* Outcomes (Not Features) */}
      <div className="flex-1">
        <p className="text-[14px] font-medium text-[var(--color-text-primary)] mb-4">
          What you will achieve:
        </p>
        <ul className="space-y-4">
          {outcomes.map((outcome, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-[var(--color-surface-3)] flex items-center justify-center shrink-0">
                <CheckCircle2 size={12} className={featured ? 'text-[var(--color-live)]' : 'text-[var(--color-logo-blue)]'} />
              </div>
              <span className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                {outcome}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Action */}
      <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
        <Button 
          variant={featured ? 'primary' : 'ghost'} 
          className="w-full" 
          label={ctaText} 
          onClick={onClick}
        />
      </div>
    </div>
  );
};
