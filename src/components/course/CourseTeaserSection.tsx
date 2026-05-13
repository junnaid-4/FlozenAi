'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PricingCard } from './PricingCard';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const CourseTeaserSection = () => {
  const router = useRouter();

  return (
    <section className="py-20 md:py-32 bg-[var(--color-void)] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="amber" className="mb-4">Flozen Accelerator</Badge>
          <h2 className="font-display font-extrabold text-[36px] md:text-[48px] text-[var(--color-text-primary)] mb-4">
            Learn to build it yourself.
          </h2>
          <p className="text-[18px] text-[var(--color-text-secondary)] leading-relaxed">
            Stop paying $5000+ for custom systems. We give you the exact blueprints and training to become an n8n automation expert in weeks.
          </p>
        </motion.div>

        {/* Skill Progression Path Visual */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden md:flex items-center justify-center gap-4 mb-16 max-w-4xl mx-auto px-12"
        >
           <div className="flex flex-col items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center border border-[var(--color-border)]">
               <span className="font-mono text-xs text-[var(--color-text-muted)]">01</span>
             </div>
             <span className="text-[12px] text-[var(--color-text-muted)] font-medium uppercase tracking-wider">Beginner</span>
           </div>
           <motion.div 
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
             style={{ originX: 0 }}
             className="h-[1px] flex-1 bg-gradient-to-r from-[var(--color-border)] via-[var(--color-border-strong)] to-[var(--color-live-border)]" 
           />
           <div className="flex flex-col items-center gap-2">
             <div className="w-12 h-12 rounded-full bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border-strong)]">
               <BookOpen size={16} className="text-[var(--color-logo-blue)]" />
             </div>
             <span className="text-[12px] text-[var(--color-text-primary)] font-medium uppercase tracking-wider">Architect</span>
           </div>
           <motion.div 
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 1, ease: "circOut" }}
             style={{ originX: 0 }}
             className="h-[1px] flex-1 bg-gradient-to-r from-[var(--color-live-border)] to-[var(--color-live)]" 
           />
           <div className="flex flex-col items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-[var(--color-live-dim)] flex items-center justify-center border border-[var(--color-live)] shadow-[0_0_15px_rgba(0,229,160,0.3)]">
               <span className="font-mono text-xs text-[var(--color-live)] font-bold">PRO</span>
             </div>
             <span className="text-[12px] text-[var(--color-live)] font-medium uppercase tracking-wider">Expert</span>
           </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PricingCard 
              title="Prompt Engineering Masterclass"
              price={2000}
              valueUnlocked="15,000"
              outcomes={[
                "Master AI communication with 6-8 modules in just 3-4 hours.",
                "Learn essential skills for building and managing Agentic AI.",
                "Divided into 2 sessions for maximum retention."
              ]}
              onClick={() => router.push('/courses')}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <PricingCard 
              title="n8n Automation Course"
              price={9999}
              featured={true}
              valueUnlocked="85,000+"
              ctaText="Enroll in Automation Course"
              outcomes={[
                "Most demanding AI skill in 2026 with full certification.",
                "8-month comprehensive curriculum condensed into 1 month.",
                "Master production-ready complex automated sequences.",
                "Access to Flozen internal automation blueprints."
              ]}
              onClick={() => router.push('/courses')}
            />
          </motion.div>
        </div>

        {/* Catch-all Enrolment CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <Button 
            variant="ghost" 
            size="lg" 
            label="View full curriculum" 
            className="group"
            onClick={() => router.push('/courses')}
          />
        </motion.div>
        
      </div>
      
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-live)]/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/3" />
    </section>
  );
};
