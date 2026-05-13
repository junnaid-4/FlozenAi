'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Play, ArrowRight } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';
import { Logo } from '@/components/ui/Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (result.success || response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-void)] pt-10 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4 sm:gap-6 col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
              Empowering Pakistani businesses and freelancers with practical AI automations that actually work.
            </p>
            <p className="text-[12px] text-[var(--color-text-muted)] font-mono uppercase tracking-tight">
              &copy; {currentYear} FlozenAI LLC.
            </p>
          </div>

          {/* Links: Platform */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-[16px] text-[var(--color-text-primary)] mb-2">Platform</h4>
            <Link href="/automations" className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-live)] transition-colors">
              Automation Gallery
            </Link>
            <Link href="/courses" className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-live)] transition-colors">
              Accelerator Courses
            </Link>
            <a href="https://www.linkedin.com/in/flozen-ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] text-[var(--color-text-secondary)] hover:text-[#0A66C2] transition-colors group">
              <LinkedinIcon size={16} className="group-hover:scale-110 transition-transform" />
              LinkedIn
            </a>
            <a href="https://www.instagram.com/flozenai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] text-[var(--color-text-secondary)] hover:text-[#E4405F] transition-colors group">
              <InstagramIcon size={16} className="group-hover:scale-110 transition-transform" />
              Instagram
            </a>
          </div>

          {/* Links: Company */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-[16px] text-[var(--color-text-primary)] mb-2">Company</h4>
            <Link href="/about" className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-live)] transition-colors">
              About the Founder
            </Link>
            <Link href="/contact" className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-live)] transition-colors">
              Contact Us
            </Link>
            <a href="https://chat.whatsapp.com/F2Z0TMgZ1w9Bss36v1pluv" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-live)] transition-colors">
              WhatsApp Community
            </a>
            <Link href="/privacy-policy" className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-live)] transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Subscribe Col */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <h4 className="font-display font-semibold text-[16px] text-[var(--color-text-primary)] mb-2">Build faster</h4>
            <p className="text-[13px] text-[var(--color-text-secondary)] mb-2">
              Join 1,000+ builders getting one practical automation tip every Tuesday.
            </p>
            <form className="relative flex flex-col gap-2" onSubmit={handleSubscribe}>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com" 
                  className={`w-full bg-[var(--color-surface-2)] border rounded-[var(--radius-md)] py-2.5 pl-4 pr-10 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 transition-colors ${
                    status === 'success' ? 'border-[var(--color-live)] ring-[var(--color-live)]' : 'border-[var(--color-border)] focus:ring-[var(--color-live)] focus:border-[var(--color-live)]'
                  }`}
                  required
                  disabled={status === 'loading' || status === 'success'}
                />
                <button 
                  type="submit" 
                  className={`absolute right-2 transition-colors ${
                    status === 'loading' ? 'animate-pulse text-[var(--color-text-muted)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-live)]'
                  }`}
                  aria-label="Subscribe"
                  disabled={status === 'loading' || status === 'success'}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              
              {status === 'success' && (
                <p className="text-[11px] text-[var(--color-live)] font-medium animate-in fade-in slide-in-from-top-1">
                  System Initialized. Check your inbox next Tuesday.
                </p>
              )}
              {status === 'error' && (
                <p className="text-[11px] text-red-400 font-medium animate-in fade-in slide-in-from-top-1">
                  Transmission failed. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>

      </div>
    </footer>
  );
};
