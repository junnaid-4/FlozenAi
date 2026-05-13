'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, Zap, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      tools: formData.get('tools') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Col: Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="live" className="mb-6">Available for Projects</Badge>
          <h1 className="font-display font-extrabold text-[40px] md:text-[56px] text-[var(--color-text-primary)] mb-6 leading-tight">
            Let's build your next automation.
          </h1>
          <p className="text-[18px] text-[var(--color-text-secondary)] leading-relaxed mb-10">
            Tell us about the manual tasks eating up your team's time. We will scope out a custom n8n workflow and get back to you with a roadmap.
          </p>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] flex items-center justify-center shrink-0">
                <Clock size={18} className="text-[var(--color-logo-blue)]" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Response Time</h4>
                <p className="text-[14px] text-[var(--color-text-secondary)]">Expect an email reply within 24 hours.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] flex items-center justify-center shrink-0">
                <MessageSquare size={18} className="text-[#25D366]" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--color-text-primary)] mb-1">Direct Dealing</h4>
                <p className="text-[14px] text-[var(--color-text-secondary)] mb-3">Message us directly on WhatsApp for urgent queries.</p>
                <a 
                  href="https://wa.me/923027421230" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#25D366] hover:text-[#1ebd59] transition-colors"
                >
                  Direct WhatsApp <Zap size={14} />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] flex items-center justify-center shrink-0">
                <Globe size={18} className="text-[var(--color-logo-blue)]" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--color-text-primary)] mb-1">FlozenAI Community</h4>
                <p className="text-[14px] text-[var(--color-text-secondary)] mb-3">Join our community to get daily automation tips.</p>
                <a 
                  href="https://chat.whatsapp.com/F2Z0TMgZ1w9Bss36v1pluv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-logo-blue)] hover:text-[#00D0DD] transition-colors"
                >
                  Join Community <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Col: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-live-dim)] flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-[var(--color-live)]" />
                </div>
                <h3 className="font-display font-bold text-[24px] text-[var(--color-text-primary)] mb-2">Request Received!</h3>
                <p className="text-[var(--color-text-secondary)]">
                  We've received your details and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[13px] font-medium text-[var(--color-text-secondary)] pl-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required 
                    className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-live)] transition-colors"
                    placeholder="Ali Khan"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[13px] font-medium text-[var(--color-text-secondary)] pl-1">Work Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required 
                    className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-live)] transition-colors"
                    placeholder="ali@company.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="tools" className="text-[13px] font-medium text-[var(--color-text-secondary)] pl-1">Tools you use (e.g. Shopify, Gmail, HubSpot)</label>
                  <input 
                    type="text" 
                    id="tools" 
                    name="tools"
                    required 
                    className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-live)] transition-colors"
                    placeholder="Stripe, Slack, Airtable"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="problem" className="text-[13px] font-medium text-[var(--color-text-secondary)] pl-1">Describe the manual process you want to automate</label>
                  <textarea 
                    id="problem" 
                    name="message"
                    required 
                    rows={4}
                    className="w-full bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-live)] transition-colors resize-none"
                    placeholder="Every time a user pays on Stripe, I have to manually export a PDF..."
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    label={isSubmitting ? "Sending..." : "Submit Inquiry"} 
                    className="w-full"
                  />
                </div>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
