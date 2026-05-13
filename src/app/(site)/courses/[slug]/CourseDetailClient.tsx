'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Play, CheckCircle2, Lock } from 'lucide-react';

export default function CourseDetailClient() {
  const router = useRouter();

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        
        {/* Left Column: Video Preview & Modules */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Header */}
          <div>
            <Badge variant="amber" className="mb-4">Flozen Accelerator</Badge>
            <h1 className="font-display font-extrabold text-[36px] md:text-[48px] text-[var(--color-text-primary)] mb-4">
              The Builder Track
            </h1>
            <p className="text-[18px] text-[var(--color-text-secondary)] leading-relaxed">
              Master advanced API logic, webhooks, and regex formatting to build enterprise-grade automations from scratch.
            </p>
          </div>

          {/* Video Player Mockup */}
          <div className="aspect-video w-full rounded-[24px] bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] relative overflow-hidden group cursor-pointer shadow-xl">
             <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-void)]/80 to-transparent z-10" />
             {/* Thumbnail placeholder */}
             <div className="absolute inset-0 bg-[var(--color-logo-blue)]/5" />
             
             <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
               <div className="w-16 h-16 rounded-full bg-[var(--color-live)] flex items-center justify-center shadow-[0_0_30px_rgba(0,229,160,0.4)] group-hover:scale-110 transition-transform">
                 <Play size={24} className="text-[var(--color-void)] ml-1" />
               </div>
               <span className="mt-4 font-mono text-[13px] text-white tracking-widest uppercase">Preview Lesson</span>
             </div>
          </div>

          {/* Module List */}
          <div>
            <h3 className="font-display font-bold text-[24px] text-[var(--color-text-primary)] mb-6">Curriculum</h3>
            
            <div className="space-y-4">
              {[
                { title: 'Module 1: Webhook Architecture', time: '45 mins', unlocked: true },
                { title: 'Module 2: Regex & Data Parsing', time: '1 hr 15 mins', unlocked: false },
                { title: 'Module 3: Custom API Integrations', time: '2 hrs', unlocked: false },
                { title: 'Module 4: Error Handling & Retries', time: '50 mins', unlocked: false },
              ].map((mod, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-border-strong)] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-surface-3)] flex items-center justify-center">
                      <span className="font-mono text-[12px] text-[var(--color-text-muted)]">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[15px] text-[var(--color-text-primary)]">{mod.title}</h4>
                      <span className="text-[13px] text-[var(--color-text-secondary)] flex items-center gap-2 mt-1">
                        <Play size={12} /> {mod.time}
                      </span>
                    </div>
                  </div>
                  <div>
                    {mod.unlocked ? (
                      <Badge variant="live">Preview</Badge>
                    ) : (
                      <Lock size={16} className="text-[var(--color-text-muted)]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-[var(--color-live-border)] bg-[var(--color-surface-2)] p-8 shadow-[0_0_40px_rgba(0,229,160,0.05)]">
            <h2 className="font-display font-bold text-[24px] text-[var(--color-text-primary)] mb-2">Enrollment</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-bold text-[40px] text-[var(--color-text-primary)] leading-none">₨ 2,499</span>
            </div>
            
            <Button 
              variant="primary" 
              size="lg" 
              label="Enroll Now" 
              className="w-full mb-6" 
              onClick={() => router.push('/contact')}
            />
            
            <p className="text-[13px] font-mono text-[var(--color-text-secondary)] mb-6 text-center">
              Lifetime access + updates
            </p>

            <div className="space-y-4 pt-6 border-t border-[var(--color-border)]">
              {[
                "15+ hours of video content",
                "Downloadable workflow templates",
                "Private Discord community access",
                "1-on-1 troubleshooting (1 month)"
              ].map((perk, i) => (
                <div key={i} className="flex items-start gap-3 text-[14px] text-[var(--color-text-secondary)]">
                  <CheckCircle2 size={16} className="text-[var(--color-live)] mt-0.5 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
