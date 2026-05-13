'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Briefcase, Building2, CheckCircle2, Calculator, ArrowRight, Webhook, Bot, Utensils, Calendar, Globe, Share2, Target, MessageSquare, Database, Sparkles, Mail, LayoutTemplate, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { motion } from 'framer-motion';
import { FinalCTASection } from '@/components/FinalCTASection';

const solutions = [
  {
    icon: Target,
    title: 'Lead Generation Agent',
    description: 'Automate and send personal mails to your clients today with 5x better lead generation.',
    color: '#FFB830',
    features: [
      'Personalized Cold Emailing',
      '5x Lead Velocity',
      'Success Tracking'
    ],
    nodes: [
      { id: '1', title: 'Database', label: 'Leads Scraped', icon: Briefcase, color: '#FFB830' },
      { id: '2', title: 'Data Tool', label: 'Enrich Data', icon: Activity, color: 'var(--color-logo-blue)' },
      { id: '3', title: 'AI Writer', label: 'Personalize', icon: Sparkles, color: 'var(--color-live-dim)' },
      { id: '4', title: 'Mail Bot', label: 'Send Outbound', icon: Mail, color: '#FF5C40' }
    ]
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Customer Service Agent',
    description: 'Automate your WhatsApp now, to chat with your clients using AI agent and confirm a deal in 2x speed.',
    color: '#25D366',
    features: [
      '24/7 AI Support',
      'Instant Deal Closure',
      'Automated Catalog'
    ],
    nodes: [
      { id: '1', title: 'WhatsApp', label: 'Client Inquiry', icon: MessageSquare, color: '#25D366' },
      { id: '2', title: 'AI Brain', label: 'NLP Analysis', icon: Bot, color: 'var(--color-logo-blue)' },
      { id: '3', title: 'Database', label: 'Fetch Catalog', icon: Database, color: '#FFB830' },
      { id: '4', title: 'AI Agent', label: 'Close & Deal', icon: Target, color: 'var(--color-live)' }
    ]
  },
  {
    icon: Calendar,
    title: 'Booking Appointment Automation',
    description: 'Deploy a workflow on your website and book an appointment with clients just on a single visit on your website.',
    color: 'var(--color-logo-blue)',
    features: [
      'One-Click Booking',
      'Automated Scheduling',
      'Instant Sync'
    ],
    nodes: [
      { id: '1', title: 'Website', label: 'User Visit', icon: Globe, color: 'var(--color-live)' },
      { id: '2', title: 'Agent', label: 'Collect Info', icon: MessageSquare, color: '#FFB830' },
      { id: '3', title: 'n8n Logic', label: 'Schedule Meet', icon: Calendar, color: 'var(--color-logo-blue)' },
      { id: '4', title: 'Notify', label: 'Send Alert', icon: Webhook, color: 'var(--color-live-dim)' }
    ]
  }
];

export default function SolutionsPage() {
  const router = useRouter();
  
  // Calculator State
  const [hours, setHours] = useState(40);
  const [rate, setRate] = useState(25);
  const weeksPerYear = 52;
  const projectedSavings = hours * rate * weeksPerYear;

  return (
    <div className="pt-32 flex flex-col items-center">
      
      {/* 1. Page Header */}
      <div className="text-center max-w-4xl px-6 md:px-12 mb-20">
        <h1 className="font-display font-extrabold text-[40px] md:text-[64px] leading-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-text-muted)] block">Engineered Solutions</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-logo-blue)] to-[#00F0FF]">For Every Industry</span>
        </h1>
        <p className="text-[18px] md:text-[20px] text-[var(--color-text-secondary)] mx-auto max-w-2xl leading-relaxed mb-4">
          Precision automation workflows tailored to your operational layer. Deploy intelligent bots, sync data in real-time, and scale your infrastructure.
        </p>
        <p className="text-[14px] font-mono text-[var(--color-logo-blue)] uppercase tracking-wider font-bold">
          These are our top 3 workflows, but we will also build custom workflows for you.
        </p>
      </div>

      {/* 2. Solutions Workflows List (Replacing Grid) */}
      <div className="w-full max-w-6xl px-6 md:px-12 mb-32 flex flex-col gap-16">
        {solutions.map((solution, idx) => {
          const Icon = solution.icon;
          const isEven = idx % 2 === 0;
          
          return (
            <div key={idx} className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
              
              {/* Content Panel */}
              <SpotlightCard className="flex-1 w-full rounded-[32px]">
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-[32px] p-10 md:p-14 relative overflow-hidden group hover:border-[var(--color-logo-blue)] transition-all duration-500 shadow-xl h-full"
              >
                 <div 
                    className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
                    style={{ backgroundColor: solution.color }}
                  />
                 <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border backdrop-blur-md"
                  style={{ backgroundColor: `${solution.color}15`, borderColor: `${solution.color}30`, color: solution.color }}
                 >
                  <Icon size={28} />
                 </div>

                 <h2 className="font-display font-bold text-[32px] md:text-[36px] text-[var(--color-text-primary)] mb-4 leading-tight">{solution.title}</h2>
                 <p className="text-[16px] md:text-[18px] text-[var(--color-text-secondary)] leading-relaxed mb-10">
                  {solution.description}
                 </p>

                 <div className="space-y-5 mb-10">
                  {solution.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-4">
                      <CheckCircle2 size={24} className="text-[var(--color-live)] shrink-0" />
                      <span className="text-[16px] text-[var(--color-text-primary)] font-medium">{feature}</span>
                    </div>
                  ))}
                 </div>
                 
                 <Button onClick={() => router.push('/contact')} variant="ghost" label="Explore Blueprint" className="w-full md:w-auto flex items-center justify-between gap-4 group-hover:bg-[var(--color-surface-2)] mt-auto">
                   <span className="flex items-center w-full justify-between">
                     Explore Blueprint <ArrowRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-logo-blue)] transition-colors ml-4" />
                   </span>
                 </Button>
              </motion.div>
              </SpotlightCard>

              {/* Visual Nodes Panel */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full flex items-center justify-center p-8 relative min-h-[400px]"
              >
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] rounded-[32px]" />
                 <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] blur-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-20" style={{ backgroundColor: solution.color }} />
                 
                 <motion.div 
                   className="relative z-10 w-full max-w-sm flex flex-col gap-6"
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: true, margin: "-10%" }}
                   variants={{
                     hidden: { opacity: 0 },
                     visible: {
                       opacity: 1,
                       transition: {
                         staggerChildren: 0.15,
                         delayChildren: 0.3
                       }
                     }
                   }}
                 >
                    {/* Vertical Connector Line */}
                    <motion.div 
                      variants={{
                        hidden: { scaleY: 0, opacity: 0 },
                        visible: { scaleY: 1, opacity: 1, transition: { duration: 1, ease: "circOut" } }
                      }}
                      className="absolute left-[-5px] top-[10%] bottom-[10%] w-[2px] border-l-2 border-dashed z-0 origin-top" 
                      style={{ borderColor: `${solution.color}40` }} 
                    />

                    {solution.nodes.map((node, nIdx) => {
                       const NodeIcon = node.icon;
                       return (
                         <motion.div 
                           key={nIdx}
                           variants={{
                             hidden: { opacity: 0, y: 40, scale: 0.95 },
                             visible: { 
                               opacity: 1, 
                               y: 0, 
                               scale: 1,
                               transition: { 
                                 type: "spring", 
                                 stiffness: 80, 
                                 damping: 15,
                                 mass: 1
                               }
                             }
                           }}
                           style={{ willChange: "transform, opacity" }}
                           className="relative bg-[var(--color-surface-2)]/90 backdrop-blur-xl border border-[var(--color-border-strong)] rounded-xl p-4 flex items-center gap-5 w-full shadow-2xl transition-transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-10"
                         >
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[10px] w-[12px] h-[12px] rounded-full border-2 border-[var(--color-surface-2)] animate-pulse" style={{ backgroundColor: node.color, boxShadow: `0 0 12px 2px ${node.color}` }} />
                            
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border" style={{ backgroundColor: `${node.color}15`, borderColor: `${node.color}30`, color: node.color }}>
                               <NodeIcon size={24} />
                            </div>
                            <div>
                              <div className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">{node.title}</div>
                              <div className="font-display font-bold text-[16px] text-[var(--color-text-primary)]">{node.label}</div>
                            </div>
                         </motion.div>
                       )
                    })}
                 </motion.div>
              </motion.div>
            </div>
          )
        })}

        {/* View More Button */}
        <div className="flex justify-center mt-8">
           <Button 
            onClick={() => router.push('/automations')} 
            variant="ghost" 
            label="View All 3+ Prebuilt Automations" 
            className="group py-4 px-8 border border-[var(--color-border-strong)] hover:border-[var(--color-logo-blue)]"
           >
             <span className="flex items-center gap-3">
               View All 3+ Prebuilt Automations <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
             </span>
           </Button>
        </div>
      </div>

      {/* 3. Calculate ROI Section */}
      <div className="w-full flex justify-center px-6 md:px-12 mb-32">
        <div className="w-full max-w-5xl bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative z-10 max-w-lg mb-10 md:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-surface-3)] border border-[var(--color-border-strong)] rounded-full mb-6">
              <Calculator size={14} className="text-[var(--color-logo-blue)]" />
              <span className="font-mono text-[10px] text-[var(--color-logo-blue)] uppercase tracking-widest font-bold">ROI Calculator</span>
            </div>
            <h2 className="font-display font-bold text-[36px] text-[var(--color-text-primary)] mb-4 leading-tight">
              Calculate System ROI
            </h2>
            <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Estimate hours saved and revenue recovered by deploying FlozenAI infrastructure in your business. Input your current manual tasks to see the potential delta.
            </p>
            <Button onClick={() => router.push('/contact')} variant="primary" label="Book Consultation" className="shadow-[var(--button-glow)] bg-[var(--color-logo-blue)] text-[var(--color-void)]  font-bold" />
          </div>

          <div className="relative z-10 w-full max-w-sm">
            <div className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-2xl p-6 shadow-2xl">
               {/* Hours Slider */}
               <div className="flex justify-between items-center mb-4">
                 <span className="text-[14px] text-[var(--color-text-secondary)]">Manual Hours/Week</span>
                 <span className="font-mono text-[16px] font-bold text-[var(--color-text-primary)]">{hours} hrs</span>
               </div>
               <input 
                 type="range" 
                 min="5" 
                 max="160" 
                 step="5"
                 value={hours} 
                 onChange={(e) => setHours(parseInt(e.target.value))}
                 className="w-full h-2 bg-[var(--color-surface-3)] rounded-full mb-8 appearance-none cursor-pointer accent-[var(--color-logo-blue)]"
               />

               {/* Rate Slider */}
               <div className="flex justify-between items-center mb-4">
                 <span className="text-[14px] text-[var(--color-text-secondary)]">Hourly Cost</span>
                 <span className="font-mono text-[16px] font-bold text-[var(--color-text-primary)]">${rate}</span>
               </div>
               <input 
                 type="range" 
                 min="10" 
                 max="150" 
                 step="5"
                 value={rate} 
                 onChange={(e) => setRate(parseInt(e.target.value))}
                 className="w-full h-2 bg-[var(--color-surface-3)] rounded-full mb-8 appearance-none cursor-pointer accent-[#FFB830]"
               />

               {/* Savings Result */}
               <div className="pt-6 border-t border-[var(--color-border-strong)] flex items-end justify-between">
                 <div>
                   <div className="text-[12px] text-[var(--color-text-muted)] font-mono uppercase tracking-widest mb-1">Projected Savings</div>
                   <div className="font-display font-extrabold text-[32px] text-[var(--color-live)]">${projectedSavings.toLocaleString()}<span className="text-[16px] text-[var(--color-text-muted)] font-medium">/yr</span></div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Final CTA */}
      <div className="w-full">
        <FinalCTASection />
      </div>

    </div>
  );
}
