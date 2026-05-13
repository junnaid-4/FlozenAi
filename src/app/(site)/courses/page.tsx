'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Webhook, Bot, Plus, Minus, Cpu, X, User, Mail, Phone, Calendar, Send, Globe, MessageSquare, ChevronDown, Search, Database } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Magnetic } from '@/components/ui/Magnetic';
import { ALL_COUNTRIES } from '@/data/countries';

// --- FAQ Data ---
const faqs = [
  {
    question: "What prerequisites are required?",
    answer: "No prior coding experience is strictly required, though a basic understanding of APIs and JSON will accelerate your progress. We start from the absolute fundamentals of node-based logic before moving into complex automated sequences."
  },
  {
    question: "Is n8n better than Zapier or Make?",
    answer: "In this academy, we focus on engineering principles rather than tool tribalism. However, n8n offers superior node-level control, self-hosting capabilities, and complex branching logic that makes it the preferred engine for enterprise-grade automation systems we teach here."
  },
  {
    question: "Do I get access to updates?",
    answer: "Yes, once you enroll in the Pro Bundle, you receive lifetime access to the curriculum, including all future module additions, blueprint updates, and integration templates."
  }
];

export default function CoursesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1); // Open the second one by default to match screenshot
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<{ id: string, title: string, price: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnrollClick = (pkg: { id: string, title: string, price: number }) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCheckout = (productId: string, title: string, price: number) => {
    router.push('/contact');
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 md:px-12 flex flex-col items-center">

      {/* 1. Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mb-24"
      >
        <h1 className="font-display font-extrabold text-[48px] md:text-[64px] leading-tight mb-6">
          <span className="text-[var(--color-text-muted)] opacity-30 block">Learn to Build the Future</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-logo-blue)] to-[#00F0FF]">Automation Academy</span>
        </h1>
        <p className="text-[18px] text-[var(--color-text-secondary)]">
          Master the tools of modern engineering. Transform complex workflows into scalable, automated engines.
        </p>
      </motion.div>

      {/* 2. Featured Engine */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl rounded-3xl overflow-hidden border border-[var(--color-border-strong)] flex flex-col md:flex-row shadow-2xl mb-32 bg-[var(--color-surface-1)]"
      >
        {/* Left Side: Content */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
          {/* subtle glow */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-logo-blue)]/5 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-surface-3)] border border-[var(--color-border-strong)] rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-logo-blue)] animate-glow" />
              <span className="font-mono text-[10px] text-[var(--color-logo-blue)] uppercase tracking-widest font-bold">Featured Engine</span>
            </div>

            <h2 className="font-display font-bold text-[36px] text-[var(--color-text-primary)] leading-tight mb-2">n8n Automation Course</h2>
            <h3 className="font-display font-bold text-[24px] text-transparent bg-clip-text bg-gradient-to-r from-[#B400FF] to-[#7000FF] mb-6">
              Master the Most Demanding AI Skill in 2026
            </h3>

            <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-8">
              This automation course is designed to provide you the most demanding AI skill in 2026 in the best possible way with our certifications. This course is divided into 8 months and covered in one month.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { title: "8 Month Curriculum", desc: "Condensed into one intensive month." },
                { title: "Certifications", desc: "Earn recognized industry credentials." },
                { title: "Advanced Nodes", desc: "Master complex branching and logic." },
                { title: "Error Handling", desc: "Build resilient flows that auto-recover." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-[var(--color-live)] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[14px] text-[var(--color-text-primary)]">{item.title}</h4>
                    <p className="text-[12px] text-[var(--color-text-muted)]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <Button
                label="Enroll Now"
                variant="primary"
                className="font-bold shadow-[var(--button-glow)]"
                onClick={() => handleEnrollClick({ id: 'course_academy_pro', title: 'Automation Academy Pro', price: 9999 })}
              />
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-[28px] text-[var(--color-text-primary)]">9999</span>
                <span className="font-mono text-[12px] text-[var(--color-text-muted)]">PKR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="flex-1 bg-[var(--color-void)] border-l border-[var(--color-border)] p-10 flex items-center justify-center relative overflow-hidden hidden md:flex">
          {/* Subtle Grid & Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--color-live)]/10 blur-[100px] -translate-y-1/2 rounded-full pointer-events-none" />

          {/* Node Graph Mockup */}
          <div className="relative z-10 w-full max-w-md">
            {/* Edge line */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
              <path d="M 0 180 C 150 180, 150 32, 200 32" stroke="var(--color-logo-blue)" strokeWidth="2" fill="none" strokeOpacity="0.4" />
              <path d="M 0 180 C 150 180, 150 106, 200 106" stroke="#7000FF" strokeWidth="2" fill="none" strokeOpacity="0.4" />
              <path d="M 0 180 L 200 180" stroke="#EAB308" strokeWidth="2" fill="none" strokeOpacity="0.4" />
              <path d="M 0 180 C 150 180, 150 254, 200 254" stroke="#10B981" strokeWidth="2" fill="none" strokeOpacity="0.4" />
              <path d="M 0 180 C 150 180, 150 328, 200 328" stroke="#FF5C40" strokeWidth="2" fill="none" strokeOpacity="0.4" />

              {/* Middle Glowing Dot */}
              <g className="animate-glow" style={{ '--glow-color': 'var(--color-live)' } as React.CSSProperties}>
                <circle cx="100" cy="180" r="18" stroke="var(--color-live)" strokeWidth="2" fill="var(--color-surface-1)" />
                <circle cx="100" cy="180" r="3" fill="var(--color-live)" />
              </g>
            </svg>

            <div className="flex flex-col gap-6 pl-12 relative">

              {/* Node 1 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative bg-[var(--color-surface-2)]/80 backdrop-blur border border-[var(--color-border-strong)] rounded-lg p-2.5 flex items-center gap-4 w-60 shadow-2xl ml-8"
              >
                <div className="absolute -left-1.5 top-1/2 w-3 h-3 -translate-y-1/2 bg-[var(--color-logo-blue)] rounded-full animate-glow" style={{ '--glow-color': 'var(--color-logo-blue)' } as React.CSSProperties} />
                <div className="w-9 h-9 rounded bg-[var(--color-logo-blue)]/10 flex items-center justify-center">
                  <Webhook size={18} className="text-[var(--color-logo-blue)]" />
                </div>
                <div>
                  <div className="font-mono text-[8px] text-[var(--color-text-muted)] uppercase tracking-widest">Webhook Trigger</div>
                  <div className="font-display font-medium text-[12px] text-[var(--color-text-primary)]">Stripe API</div>
                </div>
              </motion.div>

              {/* Node 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative bg-[var(--color-surface-2)]/80 backdrop-blur border border-[#7000FF]/30 rounded-lg p-2.5 flex items-center gap-4 w-60 shadow-2xl ml-8"
              >
                <div className="absolute -left-1.5 top-1/2 w-3 h-3 -translate-y-1/2 bg-[#7000FF] rounded-full animate-glow" style={{ '--glow-color': '#7000FF' } as React.CSSProperties} />
                <div className="w-9 h-9 rounded bg-[#7000FF]/10 flex items-center justify-center">
                  <Bot size={18} className="text-[#A855F7]" />
                </div>
                <div>
                  <div className="font-mono text-[8px] text-[var(--color-text-muted)] uppercase tracking-widest">AI Agent</div>
                  <div className="font-display font-medium text-[12px] text-[var(--color-text-primary)]">Process Data</div>
                </div>
              </motion.div>

              {/* Node 3 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative bg-[var(--color-surface-2)]/80 backdrop-blur border border-[#EAB308]/30 rounded-lg p-2.5 flex items-center gap-4 w-60 shadow-2xl ml-8"
              >
                <div className="absolute -left-1.5 top-1/2 w-3 h-3 -translate-y-1/2 bg-[#EAB308] rounded-full animate-glow" style={{ '--glow-color': '#EAB308' } as React.CSSProperties} />
                <div className="w-9 h-9 rounded bg-[#EAB308]/10 flex items-center justify-center">
                  <Cpu size={18} className="text-[#EAB308]" />
                </div>
                <div>
                  <div className="font-mono text-[8px] text-[var(--color-text-muted)] uppercase tracking-widest">Logic Engine</div>
                  <div className="font-display font-medium text-[12px] text-[var(--color-text-primary)]">Filter & Route</div>
                </div>
              </motion.div>

              {/* Node 4 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative bg-[var(--color-surface-2)]/80 backdrop-blur border border-[#10B981]/30 rounded-lg p-2.5 flex items-center gap-4 w-60 shadow-2xl ml-8"
              >
                <div className="absolute -left-1.5 top-1/2 w-3 h-3 -translate-y-1/2 bg-[#10B981] rounded-full animate-glow" style={{ '--glow-color': '#10B981' } as React.CSSProperties} />
                <div className="w-9 h-9 rounded bg-[#10B981]/10 flex items-center justify-center">
                  <Database size={18} className="text-[#10B981]" />
                </div>
                <div>
                  <div className="font-mono text-[8px] text-[var(--color-text-muted)] uppercase tracking-widest">Database Sync</div>
                  <div className="font-display font-medium text-[12px] text-[var(--color-text-primary)]">Update Records</div>
                </div>
              </motion.div>

              {/* Node 5 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative bg-[var(--color-surface-2)]/80 backdrop-blur border border-[#FF5C40]/30 rounded-lg p-2.5 flex items-center gap-4 w-60 shadow-2xl ml-8"
              >
                <div className="absolute -left-1.5 top-1/2 w-3 h-3 -translate-y-1/2 bg-[#FF5C40] rounded-full animate-glow" style={{ '--glow-color': '#FF5C40' } as React.CSSProperties} />
                <div className="w-9 h-9 rounded bg-[#FF5C40]/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-[#FF5C40]" />
                </div>
                <div>
                  <div className="font-mono text-[8px] text-[var(--color-text-muted)] uppercase tracking-widest">Notify User</div>
                  <div className="font-display font-medium text-[12px] text-[var(--color-text-primary)]">Message Dispatch</div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 3. Engineered Training Tiers */}
      <div ref={pricingRef} className="w-full max-w-6xl mb-32 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-extrabold text-[36px] md:text-[48px] text-[var(--color-text-muted)] opacity-20 mb-2 leading-tight">Engineered Training Tiers</h2>
          <p className="text-[16px] text-[var(--color-text-secondary)]">Select the operational scale that fits your deployment needs.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {/* Card 1: Prompt Engineering */}
          <SpotlightCard className="rounded-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-2xl p-8 flex flex-col pt-12 relative overflow-hidden"
            >
              <div className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Masterclass</div>
              <div className="font-display font-bold text-[36px] text-[var(--color-text-primary)] mb-4 flex items-baseline gap-2">
                2000 <span className="text-[14px] font-mono text-[var(--color-text-muted)] font-normal">PKR</span>
              </div>
              <p className="text-[13px] text-[var(--color-text-secondary)] mb-8">This 3-4 hours master class covers all prompt engineering skills across 6-8 modules in 2 sessions.</p>

              <div className="flex flex-col gap-4 mb-12 flex-1">
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[var(--color-live)]" /><span className="text-[13px] text-[var(--color-text-secondary)]">2 Intensive Sessions</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[var(--color-live)]" /><span className="text-[13px] text-[var(--color-text-secondary)]">6-8 Modules</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[var(--color-live)]" /><span className="text-[13px] text-[var(--color-text-secondary)]">Master AI Communication</span></div>
              </div>

              <Button
                label="Enroll Now"
                variant="ghost"
                className="w-full text-xs font-mono tracking-widest uppercase border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
                onClick={() => handleEnrollClick({ id: 'course_prompt_masterclass', title: 'Prompt Engineering Masterclass', price: 2000 })}
              />
            </motion.div>
          </SpotlightCard>

          {/* Card 2: Vibe Coding */}
          <SpotlightCard className="rounded-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[var(--color-surface-1)] border border-[#00F0FF]/30 shadow-[0_0_30px_rgba(0,240,255,0.05)] rounded-2xl p-8 flex flex-col pt-12 relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[var(--color-live)] text-[var(--color-void)] font-mono text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-b-lg shadow-[0_0_15px_var(--color-live)]">
                Popular Course
              </div>

              <div className="font-mono text-[10px] text-[var(--color-live)] font-bold uppercase tracking-widest mb-2">Vibe Through AI Tools</div>
              <div className="font-display font-bold text-[36px] text-[var(--color-text-primary)] mb-4 flex items-baseline gap-2">
                8999 <span className="text-[14px] font-mono text-[var(--color-text-muted)] font-normal">PKR</span>
              </div>
              <p className="text-[13px] text-[var(--color-text-secondary)] mb-8">Covering vibe coding from scratch to advanced level using Antigravity, VS Code, and more.</p>

              <div className="flex flex-col gap-4 mb-12 flex-1">
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[var(--color-live)]" /><span className="text-[13px] text-[var(--color-text-primary)]">1 Month Full Training</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[var(--color-live)]" /><span className="text-[13px] text-[var(--color-text-primary)]">Master Modern IDEs</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[var(--color-live)]" /><span className="text-[13px] text-[var(--color-text-primary)]">Project Based Learning</span></div>
              </div>

              <Button
                label="Deploy Skills"
                variant="primary"
                className="w-full bg-[#00F0FF] hover:bg-[#00D0DD] text-[var(--color-void)] font-bold text-sm shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                onClick={() => handleEnrollClick({ id: 'course_vibe_coding', title: 'Vibe Through AI Tools', price: 8999 })}
              />
            </motion.div>
          </SpotlightCard>

          {/* Card 3: Content Creation */}
          <SpotlightCard className="rounded-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-2xl p-8 flex flex-col pt-12 relative overflow-hidden"
            >
              <div className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-2">Upcoming</div>
              <div className="font-display font-bold text-[36px] text-[var(--color-text-primary)] mb-4">Upcoming</div>
              <p className="text-[13px] text-[var(--color-text-secondary)] mb-8">Content Creation through AI. Master editing, voiceovers, and AI film making with 5x speed.</p>

              <div className="flex flex-col gap-4 mb-12 flex-1">
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[var(--color-live)]" /><span className="text-[13px] text-[var(--color-text-secondary)]">Influencer Focused</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[var(--color-live)]" /><span className="text-[13px] text-[var(--color-text-secondary)]">Automated Editing</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[var(--color-live)]" /><span className="text-[13px] text-[var(--color-text-secondary)]">AI Film Making (Soon)</span></div>
              </div>

              <Button
                label="Get Notified"
                variant="ghost"
                className="w-full text-xs font-mono tracking-widest uppercase border-[var(--color-border)] hover:bg-[var(--color-surface-2)]"
                onClick={() => router.push('/contact')}
              />
            </motion.div>
          </SpotlightCard>

        </div>
      </div>

      {/* 4. Core Engineers */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-3xl p-10 md:p-14 flex flex-col items-center mb-32 shadow-xl"
      >
        <h2 className="font-display font-extrabold text-[32px] text-[var(--color-text-primary)] mb-12">Core Engineers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Engineer 1 */}
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 border-[var(--color-logo-blue)]/50 relative">
              <Image src="/founder/harris.jpg" alt="Harris Saddique" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[18px] text-[var(--color-text-primary)]">Harris Saddique</h3>
              <div className="font-mono text-[11px] text-[var(--color-logo-blue)] mb-3 uppercase tracking-widest">Lead System Architect</div>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                Former infrastructure lead. Specializes in high-throughput automation engines and creating fault-tolerant data pipelines that operate at massive scale.
              </p>
            </div>
          </div>

          {/* Engineer 2 */}
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 border-[#7000FF]/50 relative bg-[var(--color-surface-3)] flex items-center justify-center">
              <Image src="/founder/junaid-new.png" alt="Junaid Khan" fill className="object-cover object-[46%_center]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[18px] text-[var(--color-text-primary)]">Junaid Khan</h3>
              <div className="font-mono text-[11px] text-[#7000FF] font-black mb-3 uppercase tracking-widest">Co-Founder & AI Specialist</div>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                Pioneer in mapping LLM capabilities to standard business logic. Builds the connective tissue between raw AI power and structured outputs.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 5. System Queries (FAQ) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl"
      >
        <h2 className="font-display font-extrabold text-[36px] md:text-[48px] text-[var(--color-text-muted)] opacity-20 mb-12 text-center leading-tight">System Queries (FAQ)</h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${isOpen ? 'bg-[var(--color-surface-2)] border-[var(--color-live)]/30 shadow-[var(--button-glow)]/10' : 'bg-[var(--color-surface-1)] border-[var(--color-border-strong)] hover:border-[var(--color-border-hover)]'
                  }`}
                onClick={() => setOpenFaq(isOpen ? null : index)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className={`font-display font-bold text-[16px] ${isOpen ? 'text-[var(--color-live)]' : 'text-[var(--color-text-primary)]'}`}>
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 transition-colors duration-300 ${isOpen ? 'text-[var(--color-live)]' : 'text-[var(--color-text-muted)]'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 6. Enrollment Modal */}
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pkg={selectedPackage}
      />

    </div>
  );
}

// --- Internal Modal Component ---
const EnrollmentModal = ({ isOpen, onClose, pkg }: { isOpen: boolean, onClose: () => void, pkg: any }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+92',
    country: 'Pakistan',
    age: '',
    background: 'Beginner',
    message: '',
    phoneLen: 10
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState('');
  const [showCountryList, setShowCountryList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = ALL_COUNTRIES.filter(c =>
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dynamic Phone Validation
    if (formData.phone.length < (formData.phoneLen - 2)) {
      setPhoneError(`Phone number too short for ${formData.country}`);
      return;
    }
    setPhoneError('');

    setStatus('loading');

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          packageTitle: pkg?.title,
          packagePrice: pkg?.price,
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({
            name: '', email: '', phone: '', countryCode: '+92',
            country: 'Pakistan', age: '', background: 'Beginner', message: '', phoneLen: 10
          });
        }, 4000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
          <div className="fixed inset-0 z-[100] overflow-y-auto custom-scrollbar flex justify-center py-10 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-[var(--color-void)]/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden h-fit"
            >
              {/* Header */}
              <div className="p-8 pb-4 flex items-center justify-between border-b border-[var(--color-border)]/10 bg-[var(--color-surface-1)]">
                <div>
                  <h3 className="text-[26px] font-display font-bold text-[var(--color-text-primary)]">Initialize Enrollment</h3>
                  <p className="text-[14px] text-[var(--color-text-secondary)]">Academy Tier: <span className="text-[var(--color-logo-blue)] font-bold">{pkg?.title}</span></p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-[var(--color-surface-2)] rounded-full transition-colors">
                  <X size={24} className="text-[var(--color-text-muted)]" />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-8 pt-6">
              {status === 'success' ? (
                <div className="py-20 flex flex-col items-center text-center animate-in fade-in zoom-in">
                  <div className="w-24 h-24 rounded-full bg-[var(--color-live-dim)] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(0,229,160,0.3)] border-2 border-[var(--color-live)]/20">
                    <CheckCircle2 size={48} className="text-[var(--color-live)]" />
                  </div>
                  <h4 className="text-[28px] font-display font-bold text-[var(--color-text-primary)] mb-4">Lead Captured Successfully</h4>
                  <p className="text-[20px] text-[var(--color-live)] font-bold tracking-tight">Soon you will be contacted.</p>
                  <p className="text-[14px] text-[var(--color-text-muted)] max-w-sm mt-6">Our admissions team has been notified. Check your WhatsApp shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] pl-1">Identiy / Full Name</label>
                      <div className="relative group">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-logo-blue)] transition-colors" />
                        <input
                          required
                          type="text"
                          placeholder="Legal Name"
                          className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl py-3 pl-11 pr-4 text-[14px] focus:outline-none focus:border-[var(--color-logo-blue)] focus:ring-4 focus:ring-[var(--color-logo-blue)]/5 transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] pl-1">Communication / Email</label>
                      <div className="relative group">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-logo-blue)] transition-colors" />
                        <input
                          required
                          type="email"
                          placeholder="Contact Email"
                          className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl py-3 pl-11 pr-4 text-[14px] focus:outline-none focus:border-[var(--color-logo-blue)] focus:ring-4 focus:ring-[var(--color-logo-blue)]/5 transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative">
                      <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] pl-1">Origin / Country</label>
                      <div
                        onClick={() => setShowCountryList(!showCountryList)}
                        className="relative group cursor-pointer"
                      >
                        <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-logo-blue)]" />
                        <div className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl py-3 pl-11 pr-10 text-[14px] flex items-center justify-between">
                          <span className={formData.country ? 'text-white' : 'text-gray-500'}>
                            {formData.country || 'Select Country'}
                          </span>
                          <ChevronDown size={16} className={`text-[var(--color-text-muted)] transition-transform ${showCountryList ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {/* Custom Country Dropdown */}
                      <AnimatePresence>
                        {showCountryList && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowCountryList(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute top-full left-0 right-0 z-20 mt-2 bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[300px]"
                            >
                              <div className="p-3 border-b border-[var(--color-border)]/10 bg-[var(--color-surface-2)]">
                                <div className="relative">
                                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                  <input
                                    autoFocus
                                    placeholder="Search country..."
                                    className="w-full bg-transparent border-none py-1 pl-8 text-[13px] focus:outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="overflow-y-auto custom-scrollbar flex-1 bg-[var(--color-surface-1)]">
                                {filteredCountries.map((c, idx) => (
                                  <div
                                    key={`${c.name}-${idx}`}
                                    onClick={() => {
                                      setFormData({
                                        ...formData,
                                        country: c.country,
                                        countryCode: c.code,
                                        phoneLen: (c as any).len || 10
                                      });
                                      setShowCountryList(false);
                                      setSearchQuery('');
                                    }}
                                    className="px-4 py-2.5 text-[14px] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-white cursor-pointer flex items-center justify-between transition-colors border-b border-white/5 last:border-0"
                                  >
                                    <span>{c.country}</span>
                                    <span className="text-[11px] font-mono text-[var(--color-logo-blue)]">{c.code}</span>
                                  </div>
                                ))}
                                {filteredCountries.length === 0 && (
                                  <div className="px-4 py-8 text-center text-[12px] text-[var(--color-text-muted)]">No matches found.</div>
                                )}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] pl-1">Connect / WhatsApp</label>
                      <div className="flex gap-2">
                        <div className="w-24 shrink-0 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl py-3 px-3 text-center text-[14px] font-bold text-[var(--color-logo-blue)] flex items-center justify-center">
                          {formData.countryCode}
                        </div>
                        <div className="relative flex-1">
                          <input
                            required
                            type="tel"
                            maxLength={formData.phoneLen}
                            placeholder={`${formData.phoneLen} Digits`}
                            className={`w-full bg-[var(--color-surface-2)] border rounded-2xl py-3 px-4 text-[14px] focus:outline-none focus:ring-4 transition-all ${phoneError ? 'border-red-500/50 focus:ring-red-500/5' : 'border-[var(--color-border)] focus:border-[var(--color-logo-blue)] focus:ring-[var(--color-logo-blue)]/5'}`}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[var(--color-text-muted)]">
                            {formData.phone.length} / {formData.phoneLen}
                          </div>
                        </div>
                      </div>
                      {phoneError && <p className="text-[10px] text-red-500 pl-1 animate-pulse">{phoneError}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] pl-1">Demographics / Age</label>
                      <div className="relative group">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-logo-blue)]" />
                        <input
                          required
                          type="number"
                          placeholder="Student Age"
                          className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl py-3 pl-11 pr-4 text-[14px] focus:outline-none focus:border-[var(--color-logo-blue)] transition-all"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] pl-1">Proficiency / Skill</label>
                      <div className="relative">
                        <select
                          className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl py-3 px-4 text-[14px] appearance-none focus:outline-none focus:border-[var(--color-logo-blue)] transition-all"
                          value={formData.background}
                          onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Professional</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)] pl-1">Personal Goals / Message</label>
                    <div className="relative group">
                      <MessageSquare size={16} className="absolute left-4 top-4 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-logo-blue)]" />
                      <textarea
                        rows={3}
                        placeholder="What do you hope to achieve with AI automation?"
                        className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl py-4 pl-11 pr-4 text-[14px] focus:outline-none focus:border-[var(--color-logo-blue)] transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full h-14 bg-[var(--color-live)] text-[var(--color-void)] font-bold text-[16px] rounded-2xl shadow-[var(--button-glow)] mt-4 hover:translate-y-[-2px] active:scale-[0.98] transition-all"
                    label="Initialize Academic Path"
                    isLoading={status === 'loading'}
                  />

                  {status === 'error' && (
                    <p className="text-center text-red-400 text-[12px] font-medium animate-bounce">System synchronization error. Please retry.</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
