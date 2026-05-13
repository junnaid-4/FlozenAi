'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Network, Search, HandHeart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { LinkedinIcon, GithubIcon, InstagramIcon } from '@/components/ui/Icons';
import { Magnetic } from '@/components/ui/Magnetic';

export default function AboutPage() {
  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
  const [reviewForm, setReviewForm] = React.useState({
    name: '',
    email: '',
    course: 'Vibe Coding',
    review: '',
    rating: 5
  });
  const [reviewStatus, setReviewStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [hoverRating, setHoverRating] = React.useState(0);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewStatus('submitting');

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewForm),
      });

      if (res.ok) {
        setReviewStatus('success');
        console.log('Review submitted successfully!');
        setTimeout(() => {
          setIsReviewModalOpen(false);
          setReviewStatus('idle');
          setReviewForm({ name: '', email: '', course: 'Vibe Coding', review: '', rating: 5 });
        }, 2000);
      } else {
        const errorData = await res.json();
        console.error('Submission failed:', errorData);
        setReviewStatus('error');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setReviewStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-24"
      >
        <Badge variant="blue" className="mb-6">Our Story</Badge>
        <h1 className="font-display font-extrabold text-[40px] md:text-[56px] text-[var(--color-text-primary)] mb-6 leading-tight">
          We got tired of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-logo-blue)] to-[#FFB830]">broken systems.</span>
        </h1>
        <p className="text-[18px] text-[var(--color-text-secondary)] leading-relaxed">
          FlozenAI was built from the frustration of seeing incredible Pakistani businesses held back by manual data entry, forgotten follow-ups, and disconnected tools.
        </p>
      </motion.div>

      {/* Social Links Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-8 mb-24 -mt-12"
      >
        <Magnetic strength={0.3}>
          <Link 
            href="https://www.linkedin.com/company/flozenai/" 
            target="_blank" 
            className="flex items-center gap-3 px-8 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-full hover:border-[#0077b5] hover:bg-[#0077b5]/5 hover:text-[#0077b5] transition-all group shadow-xl hover:shadow-[#0077b5]/25"
          >
            <LinkedinIcon size={22} />
            <span className="font-bold text-[14px] uppercase tracking-wider">LinkedIn Page</span>
          </Link>
        </Magnetic>

        <Magnetic strength={0.3}>
          <Link 
            href="https://www.instagram.com/flozenai/" 
            target="_blank" 
            className="flex items-center gap-3 px-8 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-full hover:border-[#E4405F] hover:bg-[#E4405F]/5 hover:text-[#E4405F] transition-all group shadow-xl hover:shadow-[#E4405F]/25"
          >
            <InstagramIcon size={22} />
            <span className="font-bold text-[14px] uppercase tracking-wider">Instagram</span>
          </Link>
        </Magnetic>
      </motion.div>

      {/* Founders Section */}
      <div className="mb-24 pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-extrabold text-[36px] text-[var(--color-text-primary)] mb-4">Meet the Engineers</h2>
          <p className="text-[16px] text-[var(--color-text-secondary)]">The architects behind FlozenAI's robust automation engines.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Harris Saddique */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-3xl p-8 shadow-xl flex flex-col items-center text-center"
          >
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,195,255,0.2)] border-2 border-[var(--color-logo-blue)] mb-6">
               <Image 
                 src="/founder/harris.jpg" 
                 alt="Harris Saddique - Founder" 
                 fill 
                 className="object-cover hover:scale-105 transition-transform duration-500" 
                 priority
               />
            </div>
            
            <h3 className="font-display font-bold text-[28px] text-[var(--color-text-primary)] mb-1">Harris Saddique</h3>
            <div className="font-mono text-[12px] text-[var(--color-logo-blue)] mb-4 uppercase tracking-widest bg-[var(--color-logo-blue)]/10 px-4 py-1 rounded-full">Founder / Lead Architect</div>
            
            <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-6 flex-1">
              I spent years working with agencies and e-commerce brands, watching brilliant founders waste 4+ hours a day on tasks a computer should do in seconds. When I discovered advanced logic routing, everything changed.
            </p>

            <div className="flex items-center gap-4 mt-auto">
              <Link href="https://www.linkedin.com/in/haris-saddique-049189357/" target="_blank" className="p-3 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-full hover:border-[#0077b5] hover:text-[#0077b5] transition-colors text-[var(--color-text-muted)]">
                <LinkedinIcon size={20} />
              </Link>
              <Link href="https://github.com/Haris444504" target="_blank" className="p-3 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-full hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] transition-colors text-[var(--color-text-muted)]">
                <GithubIcon size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Junaid Khan */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-3xl p-8 shadow-xl flex flex-col items-center text-center"
          >
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-[0_0_30px_rgba(112,0,255,0.2)] border-2 border-[#7000FF] mb-6">
               <Image 
                 src="/founder/junaid-new.png" 
                 alt="Junaid Khan - Co-Founder" 
                 fill 
                 className="object-cover object-[46%_center] hover:scale-105 transition-transform duration-500" 
                 priority
               />
            </div>
            
            <h3 className="font-display font-bold text-[28px] text-[var(--color-text-primary)] mb-1">Junaid Khan</h3>
            <div className="font-mono text-[12px] text-[#7000FF] mb-4 uppercase tracking-widest bg-[#7000FF]/10 px-4 py-1 rounded-full">Co-Founder</div>
            
            <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-6 flex-1">
              Passionate about integrating AI capabilities into standard business logic. Junaid ensures our automations aren't just fast, but dynamically intelligent, building the connective tissue between raw AI power and structured outputs.
            </p>

            <div className="flex items-center gap-4 mt-auto">
              <Link href="https://www.linkedin.com/in/junaid-khan-oct05/" target="_blank" className="p-3 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-full hover:border-[#0077b5] hover:text-[#0077b5] transition-colors text-[var(--color-text-muted)]">
                <LinkedinIcon size={20} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Differentiators */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-[var(--color-surface-1)] rounded-3xl p-8 md:p-16 border border-[var(--color-border)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-live)]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="font-display font-bold text-[32px] text-[var(--color-text-primary)]">Why work with FlozenAI?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { icon: Network, title: "No-BS Infrastructure", desc: "We rely strictly on established, battle-tested APIs. No brittle hacks or scrapers that break every Tuesday.", color: "var(--color-logo-blue)" },
            { icon: Search, title: "Total Transparency", desc: "When you buy a workflow or course from us, you own the code. No vendor lock-in. No hidden retainer fees.", color: "#FF5C40" },
            { icon: HandHeart, title: "Empowerment First", desc: "Our ultimate goal is to teach you how to build these systems yourself through the Flozen Accelerator.", color: "var(--color-live)" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--color-surface-2)] p-8 rounded-2xl border border-[var(--color-border-strong)]"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-[20px] text-[var(--color-text-primary)] mb-3">{item.title}</h3>
              <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reviews Section */}
      <div className="mt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <Badge variant="blue" className="mb-4">Community</Badge>
            <h2 className="font-display font-extrabold text-[32px] md:text-[42px] text-[var(--color-text-primary)] mb-2">
              Student Success Stories.
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)]">Mastering Vibe Coding & Agentic AI with FlozenAI.</p>
          </div>
          <button 
            onClick={() => setIsReviewModalOpen(true)}
            className="px-6 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-xl text-[13px] font-bold uppercase tracking-wider text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-void)] transition-all duration-300 shadow-lg"
          >
            Add Your Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Muhammad Abbas", role: "Vibe Coding", rating: 5, text: "The Vibe Coding course is a game changer. I went from zero to deploying complex AI-driven apps in days." },
            { name: "Usman Farhan", role: "Masterclass", rating: 5, text: "The Prompt Engineering Masterclass opened my eyes to the real power of Agentic AI logic. Essential for any dev." },
            { name: "Abdullah Bhatti", role: "Vibe Coding", rating: 4, text: "Finally, a guide that actually covers the advanced side of Vibe Coding. The blueprints are worth every rupee." },
            { name: "Ammar Haider", role: "Masterclass", rating: 3, text: "High-level prompt engineering made simple. It's transformed how my team builds automation workflows." },
            { name: "Alishba", role: "Vibe Coding", rating: 5, text: "Mastered Vibe Coding in a week. The best investment I've made in my technical career so far." },
            { name: "Fiza", role: "Masterclass", rating: 4, text: "Clear, concise, and incredibly practical. The sessions are packed with insights you won't find anywhere else." }
          ].map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group h-full"
            >
              {/* Card Glow/Shadow - Adaptive */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[var(--color-logo-blue)]/50 to-[#7000FF]/50 rounded-[24px] opacity-0 group-hover:opacity-40 blur-[4px] transition-opacity duration-500" />
              
              <div className="relative h-full bg-[var(--color-surface-1)]/40 backdrop-blur-xl border border-white/10 p-8 rounded-[23px] flex flex-col overflow-hidden shadow-2xl">
                {/* Specular Gloss Shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                
                {/* Background Quote Decoration */}
                <div className="absolute top-4 right-6 font-display text-[80px] leading-none text-[var(--color-text-primary)]/5 select-none pointer-events-none italic font-black">
                  “
                </div>

                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, starIdx) => (
                    <svg key={starIdx} className={`w-3.5 h-3.5 ${starIdx < review.rating ? 'text-[#FFB830]' : 'text-[var(--color-text-muted)]/20'} fill-current`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-10 relative z-10 flex-1 font-medium">
                  "{review.text}"
                </p>

                <div className="mt-auto flex items-center gap-4 relative z-10 pt-6 border-t border-[var(--color-border)]/30 h-14">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-logo-blue)] to-[#7000FF] flex items-center justify-center font-bold text-[13px] text-white shrink-0 shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex flex-col justify-center h-full">
                    <span className="block font-bold text-[14px] text-[var(--color-text-primary)] leading-tight mb-0.5">
                      {review.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-logo-blue)]" />
                      <span className="text-[10px] text-[var(--color-logo-blue)] font-mono uppercase tracking-widest font-black opacity-80">
                        {review.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[var(--color-void)]/90 backdrop-blur-sm"
            onClick={() => setIsReviewModalOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] rounded-3xl p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="mb-8">
              <h2 className="font-display font-black text-[24px] md:text-[32px] text-[var(--color-text-primary)] leading-tight">Share Your Experience</h2>
              <p className="text-[13px] md:text-[14px] text-[var(--color-text-secondary)] mt-2">Your feedback helps us build better blueprints.</p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-5 md:space-y-6 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] md:text-[12px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Name</label>
                  <input 
                    required
                    type="text" 
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                    placeholder="Your Name"
                    className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[var(--color-logo-blue)] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] md:text-[12px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Course</label>
                  <select 
                    value={reviewForm.course}
                    onChange={(e) => setReviewForm({...reviewForm, course: e.target.value})}
                    className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[var(--color-logo-blue)] transition-colors appearance-none"
                  >
                    <option value="Vibe Coding">Vibe Coding</option>
                    <option value="Masterclass">Masterclass</option>
                    <option value="n8n Academy">n8n Academy</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] md:text-[12px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Email</label>
                <input 
                  required
                  type="email" 
                  value={reviewForm.email}
                  onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                  placeholder="name@email.com"
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[var(--color-logo-blue)] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] md:text-[12px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Rating</label>
                <div 
                  className="flex gap-2 md:gap-3 bg-[var(--color-surface-2)] p-3 md:p-4 rounded-xl border border-[var(--color-border)] justify-center"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                      className="transition-all duration-200 active:scale-90 focus:outline-none"
                    >
                      <svg 
                        className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-200 ${(hoverRating || reviewForm.rating) >= star ? 'text-[#FFB830] drop-shadow-[0_0_8px_rgba(255,184,48,0.4)]' : 'text-white/5'} fill-current`} 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] md:text-[12px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Your Review</label>
                <textarea 
                  required
                  rows={3}
                  value={reviewForm.review}
                  onChange={(e) => setReviewForm({...reviewForm, review: e.target.value})}
                  placeholder="How was your experience?"
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[var(--color-logo-blue)] transition-colors resize-none"
                />
              </div>

              <button 
                disabled={reviewStatus === 'submitting'}
                className="w-full py-4 bg-[var(--color-logo-blue)] text-[var(--color-void)] font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-2 shadow-xl"
              >
                {reviewStatus === 'submitting' ? 'Submitting...' : reviewStatus === 'success' ? 'Thank You! ✨' : 'Post Review'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
