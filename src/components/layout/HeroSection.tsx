'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SplitText } from '@/components/ui/SplitText';
import { Magnetic } from '@/components/ui/Magnetic';
import { StaticWorkflowSVG } from '@/components/workflow/StaticWorkflowSVG';

// Lazy load the React Flow diagram to save main bundle size
// Use our SVG fallback while loading or for SSR
const WorkflowGraph = dynamic(
  () => import('@/components/workflow/WorkflowGraph').then(mod => mod.WorkflowGraph),
  {
    ssr: false,
    loading: () => <StaticWorkflowSVG />
  }
);

export const HeroSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Each blob moves at a different speed for layered depth
  const glowY1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const glowX1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const glowScale1 = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowX2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const glowScale2 = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  const glowY3 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const glowOpacity3 = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0]);

  return (
    <section ref={sectionRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-x-hidden">
      {/* Immersive Hero Background Glows — Parallax */}
      <motion.div style={{ y: glowY1, x: glowX1, scale: glowScale1 }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-live)]/20 rounded-full blur-[120px] z-0 pointer-events-none" />
      <motion.div style={{ y: glowY2, x: glowX2, scale: glowScale2 }} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-live-dim)] rounded-full blur-[100px] z-0 pointer-events-none" />
      <motion.div style={{ y: glowY3, opacity: glowOpacity3 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-live)]/10 rounded-full blur-[80px] z-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left: Copy & CTAs */}
          <div className="flex flex-col items-start max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Badge variant="live" className="mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--color-logo-blue)] animate-glow" />
                Stop doing manual work
              </Badge>
            </motion.div>

            <h1 className="font-display font-extrabold text-[40px] leading-[1.1] md:text-[52px] lg:text-[64px] tracking-tight text-[var(--color-text-primary)] mb-6">
              <SplitText delay={0.15}>Automate your workflow.</SplitText>
              <br className="hidden md:block" />
              <span className="text-[var(--color-text-secondary)]">
                <SplitText delay={0.6}>Reclaim your time.</SplitText>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
              className="text-[18px] text-[var(--color-text-muted)] leading-relaxed mb-10 max-w-lg"
            >
              We build n8n automations that handle the boring stuff, so you and your team can focus on what actually matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Magnetic strength={0.35} className="w-full sm:w-auto">
                <Button 
                  variant="primary" 
                  size="lg" 
                  label="Browse Automations" 
                  className="w-full sm:w-auto hover:translate-y-[-2px] transition-all duration-300" 
                  onClick={() => router.push('/automations')}
                />
              </Magnetic>
              <Magnetic strength={0.25} className="w-full sm:w-auto">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  label="View the Courses" 
                  className="w-full sm:w-auto" 
                  onClick={() => router.push('/courses')}
                />
              </Magnetic>
            </motion.div>
          </div>

          {/* Right: Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth ease out
            className="w-full"
          >
            {/* The SVG gets loaded on SSR, then swaps to the interactive ReactFlow graph on client */}
            <div className="md:block hidden">
               <WorkflowGraph />
            </div>
            
            {/* We force the SVG fallback for mobile aggressively according to the PRD requirement. Note: A better approach uses the window width to avoid loading ReactFlow at all on mobile, but CSS hiding handles the immediate visual requirement. */}
            <div className="md:hidden block">
              <StaticWorkflowSVG />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
