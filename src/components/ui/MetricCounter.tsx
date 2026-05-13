'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface MetricCounterProps {
  endValue: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({ 
  endValue, 
  suffix = '', 
  label, 
  duration = 1.5 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // We only want to run the animation once when it comes into view
    if (!containerRef.current || hasAnimated) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        
        // Counter animation object
        const counter = { val: 0 };
        
        gsap.to(counter, {
          val: endValue,
          duration: duration,
          ease: 'power3.out', // Similar to easeOutQuart
          onUpdate: () => {
            if (numberRef.current) {
              // Format with commas, no decimals
              numberRef.current.innerHTML = Math.ceil(counter.val).toLocaleString('en-US');
            }
          }
        });
        
        // Unobserve after animating
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [endValue, duration, hasAnimated]);

  return (
    <div ref={containerRef} className="flex flex-col gap-1 items-start">
      <div className="flex items-baseline">
        <span 
          ref={numberRef} 
          className="font-display font-extrabold text-[40px] md:text-[48px] leading-none text-[var(--color-text-primary)]"
        >
          0
        </span>
        {suffix && (
          <span className="font-display font-medium text-[20px] ml-1 text-[var(--color-live)]">
            {suffix}
          </span>
        )}
      </div>
      <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </span>
    </div>
  );
};
