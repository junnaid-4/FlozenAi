'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ArrowRight, Zap, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { StaticWorkflowSVG } from '@/components/workflow/StaticWorkflowSVG';
import { CheckoutButton } from '@/components/ui/CheckoutButton';

export interface AutomationProps {
  id: string;
  title: string;
  description: string;
  price: number;
  timeSaved: string;
  category: string;
  tier?: 'popular' | 'new';
}

export const AutomationCard: React.FC<{ automation: AutomationProps }> = ({ automation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse move handler for 3D depth effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Only apply on desktop
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-5 to 5 degrees)
    setRotation({
      x: ((y - centerY) / centerY) * -5,
      y: ((x - centerX) / centerX) * 5
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <SpotlightCard className="rounded-2xl">
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative bg-[var(--color-surface-2)] border rounded-2xl overflow-hidden transition-[border-color,box-shadow,transform] duration-300 ease-out flex flex-col justify-between
        ${isHovered ? 'border-[var(--color-live-border)] shadow-[0_8px_30px_rgba(0,229,160,0.06)] z-10' : 'border-[var(--color-border)] shadow-none z-0'}
      `}
      style={{ 
        transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(${isHovered ? '-2px' : '0px'})`,
        transformStyle: 'preserve-3d' 
      }}
    >
      <div className="p-6 md:p-8 flex flex-col h-full cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        {/* Top Bar */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border-strong)]">
              <Network size={20} className="text-[var(--color-logo-blue)]" />
            </div>
            {/* Dummy second icon */}
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border-strong)] -ml-4 z-10">
              <Zap size={20} className="text-[#FFB830]" />
            </div>
          </div>
          {automation.tier && (
            <Badge variant={automation.tier === 'popular' ? 'amber' : 'live'}>
              {automation.tier}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-display font-bold text-[22px] text-[var(--color-text-primary)] mb-3 line-clamp-1">
            {automation.title}
          </h3>
          <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-6 line-clamp-2">
            {automation.description}
          </p>
          
          {/* Stats Row */}
          <div className="flex items-center gap-4 text-[13px] font-mono text-[var(--color-text-muted)] mt-auto pt-4 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock size={14} />
              <span>Saves {automation.timeSaved}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 size={14} className="text-[var(--color-live)]" />
              <span>Tested</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Preview Area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[var(--color-surface-1)] border-t border-[var(--color-border)]"
          >
            <div className="p-4 relative">
               <div className="text-[11px] font-mono uppercase text-[var(--color-text-muted)] tracking-wider mb-2 ml-2">Workflow Preview</div>
               {/* Clean, unscaled preview container */}
               <div className="w-full relative rounded-xl overflow-hidden bg-[var(--color-surface-2)]/30 border border-[var(--color-border)]">
                 <StaticWorkflowSVG />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase Footer */}
      <div className="p-6 md:px-8 border-t border-[var(--color-border-strong)] bg-[var(--color-void)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto text-center sm:text-left">
           <span className="font-display font-bold text-[18px] text-[var(--color-text-primary)] tracking-wide">Monthly Subscription</span>
        </div>
        <div className="w-full sm:w-auto">
          <CheckoutButton 
            productId={automation.id}
            title={automation.title}
            price={automation.price}
            variant="primary" 
            size="md" 
            label="Get Automation" 
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </motion.div>
    </SpotlightCard>
  );
};
