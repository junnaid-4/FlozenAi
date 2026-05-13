'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AutomationGallery } from '@/components/automation/AutomationGallery';
import { Webhook, Zap, Settings, ArrowRight, Activity, Download, Database, ToggleRight, ShieldCheck, FileJson, Server, CheckCircle2, Headphones, ChevronDown, MessageSquare, Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const FAQ_ITEMS = [
  {
    q: "Do I need n8n cloud to use these?",
    a: "No, you can use our workflows on any n8n instance—whether it's self-hosted, n8n Cloud, or a third-party hosting provider."
  },
  {
    q: "How do I deploy the workflow after purchase?",
    a: "You'll instantly receive a secure JSON file. Simply open your n8n workspace, click 'Import from File' (or just paste the JSON code), and the entire workflow will populate instantly."
  },
  {
    q: "What if an API changes and breaks the flow?",
    a: "We maintain our premium workflows. If a major platform (like Google or Stripe) changes their API causing a break, we release an updated JSON file to all previous buyers."
  },
  {
    q: "Can I modify the workflow after buying?",
    a: "Absolutely. Once you import it into your n8n instance, you have 100% ownership and can tweak nodes, add new branches, or change logic as needed."
  }
];



import dynamic from 'next/dynamic';
import { StaticWorkflowSVG } from '@/components/workflow/StaticWorkflowSVG';

// Lazy load the customized automations diagram
const WorkflowGraph = dynamic(
  () => import('@/components/workflow/AutomationsWorkflowGraph').then(mod => mod.AutomationsWorkflowGraph),
  {
    ssr: false,
    loading: () => <StaticWorkflowSVG />
  }
);

export default function AutomationsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--color-void)] pt-24 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-[var(--color-logo-blue)]/10 rounded-full blur-[120px]" />
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-[var(--color-live)]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* 1. HERO SECTION */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="relative pt-12 pb-20 md:pt-20 md:pb-28">
          
          <div className="max-w-4xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center">
                <Webhook size={18} className="text-[var(--color-live)]" />
              </div>
              <span className="text-[13px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">The Automation Library</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-extrabold text-[48px] md:text-[72px] leading-[1.05] text-[var(--color-text-primary)] tracking-tight mb-8"
            >
              Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-logo-blue)] to-[#00E5A0]">Intelligence</span> <br className="hidden md:block" />
              in Seconds.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[18px] md:text-[20px] text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-12"
            >
              Stop wasting capital on manual data entry. Browse our curated library of production-ready, highly tested AI & n8n workflows built to scale your operations instantly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 md:gap-8"
            >
              <div className="flex items-center gap-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-full px-5 py-2.5">
                <div className="w-2 h-2 rounded-full bg-[var(--color-live)] animate-pulse" />
                <span className="text-[13px] font-mono text-[var(--color-text-primary)]">Plug & Play Logic</span>
              </div>
              <div className="flex items-center gap-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-full px-5 py-2.5">
                <Zap size={14} className="text-[#FFD700]" />
                <span className="text-[13px] font-mono text-[var(--color-text-primary)]">Instant ROI</span>
              </div>
              <div className="flex items-center gap-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-full px-5 py-2.5">
                <Activity size={14} className="text-[var(--color-logo-blue)]" />
                <span className="text-[13px] font-mono text-[var(--color-text-primary)]">Enterprise Grade</span>
              </div>
            </motion.div>
          </div>

          {/* Exact Landing Page Diagram - Absolutely Positioned so text wrapping doesn't change */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block absolute top-[15%] right-0 w-[450px] xl:w-[500px] 2xl:w-[600px] z-20 origin-top-right transform scale-[0.8] xl:scale-90 2xl:scale-100"
          >
             <WorkflowGraph />
          </motion.div>

        </div>
      </div>

      {/* 2. HOW IT WORKS */}
      <section className="py-20 border-t border-[var(--color-border)]/10 bg-[var(--color-surface-1)] relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-[32px] md:text-[40px] text-[var(--color-text-primary)] mb-4">Zero to Deployed in 3 Steps</h2>
            <p className="text-[16px] text-[var(--color-text-secondary)]">Our workflows are designed for instant integration. No complex coding required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Download, title: "1. Select & Purchase", desc: "Choose the workflow that fits your needs and instantly download the secure JSON file." },
              { icon: Database, title: "2. Import to n8n", desc: "Open your n8n workspace and simply paste or import the JSON. The nodes will populate instantly." },
              { icon: ToggleRight, title: "3. Connect & Activate", desc: "Add your API credentials to the nodes, map your specific fields, and flip the switch to live." }
            ].map((step, i) => (
              <div key={i} className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-[24px] p-8 relative overflow-hidden group">
                <div className="w-14 h-14 bg-[var(--color-surface-3)] rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-border-strong)] group-hover:border-[var(--color-logo-blue)] transition-colors">
                  <step.icon size={24} className="text-[var(--color-logo-blue)]" />
                </div>
                <h3 className="font-display font-bold text-[20px] text-[var(--color-text-primary)] mb-3">{step.title}</h3>
                <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed">{step.desc}</p>
                
                {/* Subtle bg glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--color-logo-blue)]/5 blur-2xl rounded-full group-hover:bg-[var(--color-logo-blue)]/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AUTOMATION LIBRARY */}
      <div className="relative z-10 border-t border-[var(--color-border)]/10 bg-[var(--color-void)]">
        <div className="container mx-auto px-6 md:px-12 pt-20 pb-8 md:pb-12">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-6 bg-[var(--color-live)] rounded-full" />
             <h2 className="font-display font-bold text-[32px] md:text-[40px] text-[var(--color-text-primary)]">The Vault</h2>
          </div>
          <p className="text-[16px] text-[var(--color-text-secondary)] max-w-2xl">Browse our collection of highly tested, modular n8n workflows.</p>
        </div>
        <AutomationGallery showHeader={false} isPremiumPage={true} />
      </div>

      {/* 4. ENTERPRISE FEATURES */}
      <section className="py-24 border-t border-[var(--color-border)]/10 bg-[var(--color-surface-1)] relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-bold text-[36px] md:text-[48px] text-[var(--color-text-primary)] mb-6">Engineered for <br/>Scale & Reliability</h2>
              <p className="text-[18px] text-[var(--color-text-secondary)] mb-10 leading-relaxed">
                These aren't just basic scripts. Every workflow in our library is built with enterprise-grade error handling and modularity, ensuring they won't break when you need them most.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Built-in Error Handling", desc: "Workflows include fallback routes and error catching so data is never lost." },
                  { icon: FileJson, title: "Clean JSON Architecture", desc: "Easily readable node structures with internal notes explaining logic paths." },
                  { icon: Server, title: "Scalable execution", desc: "Designed to handle high volumes of webhook payloads without timing out." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-[var(--color-void)] rounded-full flex items-center justify-center border border-[var(--color-border)]">
                      <feature.icon size={20} className="text-[var(--color-live)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[18px] text-[var(--color-text-primary)] mb-1">{feature.title}</h4>
                      <p className="text-[15px] text-[var(--color-text-secondary)]">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual Abstract representation of an enterprise stack */}
            <div className="relative h-[500px] w-full rounded-3xl border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="w-full h-full flex flex-col items-center justify-center gap-6 relative z-10">
                 {/* Fake dashboard visual */}
                 <div className="w-3/4 h-16 bg-[var(--color-surface-3)] rounded-xl border border-[var(--color-border)] flex items-center px-6 gap-4 shadow-2xl animate-pulse">
                   <div className="w-3 h-3 rounded-full bg-[var(--color-live)]" />
                   <div className="h-2 w-1/3 bg-[var(--color-border-strong)] rounded-full" />
                 </div>
                 <div className="w-3/4 h-16 bg-[var(--color-surface-3)] rounded-xl border border-[var(--color-border)] flex items-center px-6 gap-4 shadow-2xl opacity-80">
                   <div className="w-3 h-3 rounded-full bg-[#FFB830]" />
                   <div className="h-2 w-1/2 bg-[var(--color-border-strong)] rounded-full" />
                 </div>
                 <div className="w-3/4 h-16 bg-[var(--color-surface-3)] rounded-xl border border-[var(--color-border)] flex items-center px-6 gap-4 shadow-2xl opacity-60">
                   <div className="w-3 h-3 rounded-full bg-[var(--color-logo-blue)]" />
                   <div className="h-2 w-1/4 bg-[var(--color-border-strong)] rounded-full" />
                 </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-2)] via-transparent to-transparent z-20" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOM SOLUTIONS CTA */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-logo-blue)]/5" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto bg-[var(--color-surface-1)] border border-[var(--color-logo-blue)]/30 rounded-[32px] p-10 md:p-16 text-center shadow-[0_0_80px_rgba(0,195,255,0.1)]">
            <div className="w-16 h-16 mx-auto bg-[var(--color-logo-blue)]/10 rounded-2xl flex items-center justify-center mb-6">
              <Settings size={32} className="text-[var(--color-logo-blue)]" />
            </div>
            <h2 className="font-display font-bold text-[32px] md:text-[48px] text-[var(--color-text-primary)] mb-4">Can't find what you need?</h2>
            <p className="text-[18px] text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
              Every business is unique. If you have a specific tech stack or complex logic requirements, our team will design, build, and deploy a bespoke n8n workflow tailored exactly to your operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="primary" 
                label="Request Custom Build" 
                className="w-full sm:w-auto h-14 px-8 text-[16px] shadow-[0_0_30px_rgba(0,195,255,0.3)]" 
                onClick={() => router.push('/contact')}
              />
              <Button 
                variant="secondary" 
                label="Chat on WhatsApp" 
                className="w-full sm:w-auto h-14 px-8 text-[16px]" 
                onClick={() => window.open('https://wa.me/923027421230', '_blank')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-24 border-t border-[var(--color-border)]/10 bg-[var(--color-void)] relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-[36px] text-[var(--color-text-primary)] mb-4">Frequently Asked Questions</h2>
              <p className="text-[16px] text-[var(--color-text-secondary)]">Everything you need to know about our workflow library.</p>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <div 
                  key={i} 
                  className={`bg-[var(--color-surface-2)] border rounded-2xl overflow-hidden transition-colors ${openFaqIndex === i ? 'border-[var(--color-logo-blue)]/50' : 'border-[var(--color-border)]'}`}
                >
                  <button 
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-left"
                  >
                    <span className="font-bold text-[16px] md:text-[18px] text-[var(--color-text-primary)] pr-8">{item.q}</span>
                    <ChevronDown size={20} className={`shrink-0 text-[var(--color-text-muted)] transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180 text-[var(--color-logo-blue)]' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="p-6 pt-0 text-[15px] text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)]/50 mt-2 pt-4">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center flex items-center justify-center gap-2 text-[14px] text-[var(--color-text-muted)]">
               <Headphones size={16} />
               <span>Still have questions? <Link href="/contact" className="text-[var(--color-logo-blue)] hover:underline">Contact our support team</Link>.</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
