'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, FileText, Send, Database, Clock, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MetricCounter } from '@/components/ui/MetricCounter';

const automatedSteps = [
  {
    icon: Database,
    title: 'Lead Captured',
    description: 'Webhook instantly receives payload from Facebook or web form.',
    time: '0 mins',
  },
  {
    icon: FileText,
    title: 'Data Enriched & Formatted',
    description: 'AI parses the raw data and structures it for your CRM.',
    time: '2 secs',
  },
  {
    icon: Send,
    title: 'CRM Synced & Email Sent',
    description: 'HubSpot is updated and a personalized welcome email is dispatched.',
    time: '5 secs',
  }
];

export const BeforeAfterSection = () => {
  return (
    <section className="py-20 md:py-32 bg-[var(--color-surface-1)] border-b border-[var(--color-border)] relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <Badge variant="blue" className="mb-4">The Old Way vs. The Flozen Way</Badge>
          <h2 className="font-display font-extrabold text-[32px] md:text-[44px] text-[var(--color-text-primary)]">
            Stop pasting data between tabs.
          </h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-start gap-12 lg:gap-24">
          
          {/* Left Panel: The Old Way (Sticky) */}
          <div className="flex-1 sticky top-[100px]">
            <div className="p-8 border border-[var(--color-alert)]/30 bg-[var(--color-alert)]/5 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[var(--color-alert)]" />
                <h3 className="font-display font-bold text-[24px] text-[var(--color-alert)]">The Old Way</h3>
              </div>
              
              <div className="space-y-6 relative border-l-2 border-[var(--color-alert)]/20 ml-3 pl-8">
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--color-void)] border-2 border-[var(--color-alert)]/50 -left-[41px] top-1" />
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Download CSV</h4>
                  <p className="text-[14px] text-[var(--color-text-secondary)]">Export leads from Facebook Ads manager.</p>
                </div>
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--color-void)] border-2 border-[var(--color-alert)]/50 -left-[41px] top-1" />
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Clean Data</h4>
                  <p className="text-[14px] text-[var(--color-text-secondary)]">Fix formatting issues in Excel manually.</p>
                </div>
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--color-void)] border-2 border-[var(--color-alert)]/50 -left-[41px] top-1" />
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Upload to CRM</h4>
                  <p className="text-[14px] text-[var(--color-text-secondary)]">Import into HubSpot, map fields, check for dupes.</p>
                </div>
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-[var(--color-void)] border-2 border-[var(--color-alert)]/50 -left-[41px] top-1" />
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Send Emails</h4>
                  <p className="text-[14px] text-[var(--color-text-secondary)]">Manually trigger welcome sequence for new list.</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-alert)]/20 flex flex-col">
                <span className="text-[12px] text-[var(--color-text-muted)] font-mono uppercase tracking-wider mb-2">Time Wasted</span>
                <span className="font-display font-bold text-[36px] text-[var(--color-alert)] leading-none flex items-baseline gap-2">
                  45 <span className="text-[18px]">mins/day</span>
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center shrink-0 w-12 sticky top-[240px]">
            <ArrowRight size={32} className="text-[var(--color-text-muted)]" />
          </div>

          {/* Right Panel: The Flozen Way (Scrolling) */}
          <div className="flex-1 space-y-32 pb-32">
            {automatedSteps.map((step, idx) => (
               <StepReveal key={idx} step={step} index={idx} total={automatedSteps.length} />
            ))}
          </div>

        </div>

        {/* Mobile Layout (Flat) */}
        <div className="flex flex-col md:hidden gap-8">
          <div className="p-6 border border-[var(--color-alert)]/30 bg-[var(--color-alert)]/5 rounded-2xl relative overflow-hidden">
            <h3 className="font-display font-bold text-[20px] text-[var(--color-alert)] mb-4">Manual Context Switching</h3>
            <p className="text-[var(--color-text-muted)] text-[14px] leading-relaxed">
              Exporting CSVs, cleaning data in Excel, importing to CRMs, and manually triggering emails takes ~45 minutes out of your day.
            </p>
          </div>
          
          <div className="flex justify-center">
            <ArrowRight size={24} className="text-[var(--color-text-muted)] rotate-90" />
          </div>

          <div className="p-6 border-2 border-[var(--color-live)] bg-[var(--color-surface-card)] rounded-2xl relative shadow-[0_0_30px_rgba(0,229,160,0.1)] overflow-hidden">
            <div className="absolute inset-0 bg-[var(--color-live)]/5 backdrop-blur-[2px]"></div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 mb-4 rounded-full border border-[var(--color-live)]/30 bg-[var(--color-live)]/10 font-label-caps text-[12px] font-bold tracking-widest text-[var(--color-live)] shadow-[0_0_10px_rgba(0,229,160,0.2)]">
                PROCESS
              </div>
              <h3 className="font-display font-bold text-[20px] text-[var(--color-text-primary)] mb-4">The Flozen Way</h3>
              <div className="space-y-4">
                 {automatedSteps.map((step, idx) => (
                   <div key={idx} className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-[var(--color-live)]/20 border border-[var(--color-live)]/50 flex items-center justify-center shrink-0">
                       <step.icon size={16} className="text-[var(--color-live)]" />
                     </div>
                     <div>
                       <h4 className="font-bold text-[14px] text-[var(--color-text-primary)]">{step.title}</h4>
                       <p className="text-[12px] text-[var(--color-text-secondary)]">{step.description}</p>
                     </div>
                   </div>
                 ))}
                 <div className="mt-6 pt-4 border-t border-[var(--color-live)]/20">
                   <span className="text-[12px] text-[var(--color-live)] font-mono uppercase tracking-wider mb-1 block">Execution Time</span>
                   <span className="font-display font-bold text-[28px] text-[var(--color-live)] drop-shadow-[0_0_8px_rgba(0,229,160,0.5)]">5 secs</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// Sub-component for individual scrolling steps
const StepReveal = ({ step, index, total }: { step: any, index: number, total: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0.3, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col justify-center min-h-[30vh]"
    >
      <div className={`p-8 rounded-2xl border transition-colors duration-500 ${isInView ? 'bg-[var(--color-surface-2)] border-[var(--color-live-border)] shadow-[0_0_40px_rgba(0,229,160,0.05)]' : 'bg-transparent border-[var(--color-border)]'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isInView ? 'bg-[var(--color-surface-3)]' : 'bg-transparent'}`}>
              <step.icon size={24} className={isInView ? 'text-[var(--color-live)]' : 'text-[var(--color-text-muted)]'} />
            </div>
            <span className="font-mono text-[var(--color-text-muted)] text-[12px]">Step 0{index + 1}</span>
          </div>
          {index === total - 1 && isInView && (
            <Badge variant="live">
              <span className="flex items-center gap-1.5 focus:outline-none">
                <Zap size={12} className="text-[var(--color-live)]" /> Automated
              </span>
            </Badge>
          )}
        </div>
        
        <h3 className="font-display font-bold text-[24px] text-[var(--color-text-primary)] mb-3">{step.title}</h3>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed mb-6">{step.description}</p>
        
        <div className={`flex items-center gap-2 font-mono text-[13px] transition-colors duration-500 ${isInView ? 'text-[var(--color-live)]' : 'text-[var(--color-text-muted)]'}`}>
          <Clock size={14} />
          <span>{step.time}</span>
        </div>
      </div>
    </motion.div>
  );
};
