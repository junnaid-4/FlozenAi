import React from 'react';
import { Metadata } from 'next';
import { WorkflowGraph } from '@/components/workflow/WorkflowGraph';
import { Button } from '@/components/ui/Button';
import { CheckoutButton } from '@/components/ui/CheckoutButton';
import { Badge } from '@/components/ui/Badge';
import { Network, Zap, CheckCircle2, Clock, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Automation Workflow Details',
  description: 'Detailed view of the n8n automation workflow.',
};

// SSG Path Generation
export async function generateStaticParams() {
  return [
    { slug: 'lead-gen-crm-sync' },
    { slug: 'abandoned-cart-whatsapp' },
    { slug: 'customer-onboarding' },
    { slug: 'automated-invoice' }
  ];
}

export default function AutomationDetailPage() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
        <div className="max-w-2xl">
          <Badge variant="live" className="mb-4">E-commerce Category</Badge>
          <h1 className="font-display font-extrabold text-[36px] md:text-[48px] text-[var(--color-text-primary)] mb-4">
            Abandoned Cart WhatsApp Recovery
          </h1>
          <p className="text-[18px] text-[var(--color-text-secondary)] leading-relaxed">
            Detects abandoned carts in your Shopify store context and triggers a sequence of automated WhatsApp messages via Twilio to recover the sale before the lead goes cold.
          </p>
        </div>

        {/* Pricing / CTA Card */}
        <div className="w-full md:w-[320px] shrink-0 bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] rounded-2xl p-6 shadow-xl">
          <div className="mb-6 text-center">
            <span className="font-display font-bold text-[24px] text-[var(--color-text-primary)]">Monthly Subscription</span>
          </div>
          <CheckoutButton 
            productId="abandoned-cart-whatsapp"
            title="Abandoned Cart WhatsApp Recovery"
            price={4500}
            variant="primary" 
            size="lg" 
            label="Buy Automation" 
            className="w-full mb-4 shadow-[0_0_20px_rgba(0,229,160,0.2)]" 
          />
          <Button variant="ghost" size="md" label="Download Setup Guide" className="w-full flex items-center justify-center gap-2">
            
          </Button>
          <p className="text-[12px] text-[var(--color-text-muted)] text-center mt-4">
            Includes full JSON export and setup instructions.
          </p>
        </div>
      </div>

      {/* Stats / Integrations Row */}
      <div className="flex flex-wrap items-center gap-6 md:gap-12 py-8 border-y border-[var(--color-border)] mb-12 bg-[var(--color-surface-1)] px-8 rounded-[var(--radius-lg)]">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border-strong)]">
             <Network size={20} className="text-[#96BF48]" /> {/* Shopify Color mock */}
           </div>
           <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center border border-[var(--color-border-strong)] -ml-4 z-10">
             <Zap size={20} className="text-[#25D366]" /> {/* WhatsApp Color mock */}
           </div>
           <span className="font-mono text-[14px] text-[var(--color-text-primary)] ml-2">Shopify + Twilio</span>
        </div>
        
        <div className="h-8 w-[1px] bg-[var(--color-border)] hidden md:block" />
        
        <div className="flex items-center gap-2 text-[14px] font-mono text-[var(--color-text-secondary)]">
          <Clock size={16} />
          <span>Saves 20 hrs/mo</span>
        </div>

        <div className="flex items-center gap-2 text-[14px] font-mono text-[var(--color-text-secondary)]">
          <CheckCircle2 size={16} className="text-[var(--color-live)]" />
          <span>Fully Tested in Prod</span>
        </div>
      </div>

      {/* Diagram Section */}
      <div className="mb-16">
        <h2 className="font-display font-bold text-[24px] text-[var(--color-text-primary)] mb-6">Workflow Blueprint</h2>
        
        {/* We use our existing WorkflowGraph, wrapped to allow panning.
            Since our WorkflowGraph component currently disables zoom/pan to be a hero graphic,
            we could technically add a prop to enable it. For now, it renders the diagram. */}
        <div className="rounded-2xl border flex border-[var(--color-border-strong)] overflow-hidden shadow-2xl bg-[var(--color-void)] relative h-[500px]">
           {/* In a real scenario we'd pass interactive=true to WorkflowGraph to enable panning */}
           <WorkflowGraph />
        </div>
      </div>

    </div>
  );
}
