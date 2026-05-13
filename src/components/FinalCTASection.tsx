'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const FinalCTASection = () => {
  const router = useRouter();
  const magnetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!magnetRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const resetMouse = () => setPosition({ x: 0, y: 0 });

  return (
    <section className="py-20 md:py-32 bg-[var(--color-surface-1)] border-t border-[var(--color-border)] relative transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-[24px] p-8 md:p-16 relative overflow-hidden transition-colors duration-300"
        >
          
          {/* Subtle background gradient inside card */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-logo-blue)]/5 via-transparent to-[var(--color-live)]/5" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-16">
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display font-extrabold text-[36px] md:text-[48px] text-[var(--color-text-primary)] mb-6 leading-tight">
                Ready to reclaim your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-logo-blue)] to-[var(--color-live)]">time?</span>
              </h2>
              <p className="text-[16px] md:text-[18px] text-[var(--color-text-secondary)] leading-relaxed mb-8">
                "We built FlozenAI because Pakistani businesses deserve scalable systems, not manual grind. Let's fix your broken workflows today."
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <div 
                  ref={magnetRef}
                  onMouseMove={handleMouse}
                  onMouseLeave={resetMouse}
                  className="w-full sm:w-auto"
                >
                  <motion.div
                    animate={{ x: position.x, y: position.y }}
                    transition={{ type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.1 }}
                  >
                    <Button 
                      variant="primary" 
                      size="lg" 
                      label="Browse Automations" 
                      className="w-full sm:w-auto shadow-[0_0_25px_rgba(0,229,160,0.4)] hover:shadow-[0_0_35px_rgba(0,229,160,0.6)] transition-all duration-300 transform active:scale-95" 
                      onClick={() => router.push('/automations')}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Founder Avatar */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[var(--color-surface-3)] border-4 border-[var(--color-void)] shadow-2xl relative overflow-hidden mb-4">
                 <Image 
                   src="/founder/harris.jpg" 
                   alt="Harris Saddique" 
                   fill 
                   className="object-cover" 
                 />
              </div>
              <div className="text-center">
                <span className="block font-bold text-[var(--color-text-primary)]">Harris Saddique</span>
                <span className="text-[13px] font-mono text-[var(--color-text-muted)]">Automation Architect</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
