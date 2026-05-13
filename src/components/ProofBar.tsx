'use client';

import React from 'react';
import { MetricCounter } from '@/components/ui/MetricCounter';
import { motion } from 'framer-motion';

// Dummy initial stats, would ideally come via /api/stats route
const stats = [
  { value: 12000, suffix: '+', label: 'Hours Saved' },
  { value: 50, suffix: '', label: 'Workflows Built' },
  { value: 1000, suffix: '+', label: 'Community Members' },
  { value: 100, suffix: '%', label: 'No-Code' },
];

export const ProofBar = () => {
  return (
    <section className="border-y border-[var(--color-border-strong)] bg-[var(--color-surface-1)] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)] [&>div:nth-child(even)]:border-none md:[&>div]:border-l md:first:[&>div]:border-l-0"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              className={`flex justify-center md:justify-center ${i > 1 ? 'pt-8 md:pt-0' : ''}`}
            >
              <MetricCounter 
                endValue={stat.value} 
                suffix={stat.suffix} 
                label={stat.label} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
