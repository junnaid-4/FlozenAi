'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 md:px-12 max-w-4xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-full mb-6">
          <ShieldCheck size={14} className="text-[var(--color-live)]" />
          <span className="font-mono text-[10px] text-[var(--color-live)] uppercase tracking-widest font-bold">Data Protection Protocol</span>
        </div>
        <h1 className="font-display font-extrabold text-[48px] md:text-[64px] leading-tight mb-6 text-[var(--color-text-primary)]">
          Privacy Policy
        </h1>
        <p className="text-[18px] text-[var(--color-text-secondary)] leading-relaxed">
          At FlozenAI, we prioritize the security and confidentiality of your data. This policy outlines how we collect, process, and protect your information across our automation platform and academy.
        </p>
      </motion.div>

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-12"
      >
        
        {/* Section 1 */}
        <motion.section variants={itemVariants} className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-logo-blue)]/10 flex items-center justify-center border border-[var(--color-logo-blue)]/20">
              <Eye size={20} className="text-[var(--color-logo-blue)]" />
            </div>
            <h2 className="font-display font-bold text-[24px] text-[var(--color-text-primary)]">Information Collection</h2>
          </div>
          <div className="space-y-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              We collect information that you voluntarily provide when you interact with our platform, such as when you:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enroll in our automation courses or masterclasses.</li>
              <li>Purchase or download automation blueprints.</li>
              <li>Subscribe to our "Accelerator" newsletter.</li>
              <li>Contact our support or sales teams.</li>
              <li>Interact with our AI chatbot assistant.</li>
            </ul>
            <p>
              This data may include your name, email address, phone number, professional background, and any specific automation goals you share with us.
            </p>
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section variants={itemVariants} className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-live)]/10 flex items-center justify-center border border-[var(--color-live)]/20">
              <Lock size={20} className="text-[var(--color-live)]" />
            </div>
            <h2 className="font-display font-bold text-[24px] text-[var(--color-text-primary)]">Data Processing & Usage</h2>
          </div>
          <div className="space-y-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              FlozenAI uses your information to deliver high-precision automation services and training. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Service Delivery:</strong> To process transactions and provide access to your purchased courses or workflows.</li>
              <li><strong>Communication:</strong> To send important updates regarding your account or the "Accelerator" weekly tips.</li>
              <li><strong>Improvement:</strong> To analyze user interactions and optimize our n8n automation engines.</li>
              <li><strong>Support:</strong> To respond to your queries sent via our contact forms or chatbot.</li>
            </ul>
            <p>
              We never sell your data to third-party advertisers. Your operational workflows are your intellectual property.
            </p>
          </div>
        </motion.section>

        {/* Section 3 */}
        <motion.section variants={itemVariants} className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-text-muted)]/10 flex items-center justify-center border border-[var(--color-border)]">
              <Globe size={20} className="text-[var(--color-text-muted)]" />
            </div>
            <h2 className="font-display font-bold text-[24px] text-[var(--color-text-primary)]">Third-Party Systems</h2>
          </div>
          <div className="space-y-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              To maintain a scalable infrastructure, we utilize select third-party partners. Each partner is vetted for security compliance:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Stripe:</strong> For secure payment processing. We do not store your credit card information.</li>
              <li><strong>Resend:</strong> For processing contact form submissions, email confirmations, and lead notifications.</li>
              <li><strong>n8n:</strong> For powering our backend automation logic.</li>
              <li><strong>Vercel:</strong> For secure hosting and global content delivery.</li>
            </ul>
          </div>
        </motion.section>

        {/* Section 4 */}
        <motion.section variants={itemVariants} className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#7000FF]/10 flex items-center justify-center border border-[#7000FF]/20">
              <FileText size={20} className="text-[#7000FF]" />
            </div>
            <h2 className="font-display font-bold text-[24px] text-[var(--color-text-primary)]">Your Rights & Control</h2>
          </div>
          <div className="space-y-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              You maintain full control over your personal data. You have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Request a copy of the data we hold about you.</li>
              <li>Request correction or deletion of your personal information.</li>
              <li>Opt-out of marketing communications at any time.</li>
            </ul>
            <p>
              To exercise these rights, please contact our data protocol lead at <span className="text-[var(--color-logo-blue)] font-bold">privacy@flozenai.co</span>.
            </p>
          </div>
        </motion.section>

        {/* Footer info */}
        <motion.div variants={itemVariants} className="text-center pt-12">
          <p className="text-[13px] text-[var(--color-text-muted)] font-mono uppercase tracking-[0.2em]">
            Last Updated: April 25, 2026
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
