import React from 'react';

export const StaticWorkflowSVG = () => {
  return (
    <div className="w-full aspect-[2/1] md:aspect-[5/3] flex items-center justify-center relative overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 800 360" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Glows */}
        <circle cx="400" cy="180" r="140" fill="var(--color-logo-blue)" fillOpacity="0.05" filter="blur(40px)" />

        {/* Connection Lines (Solid Smoothstep style to match ReactFlow) */}
        <path d="M210 176 C245 176 245 66 280 66" stroke="var(--color-logo-blue)" strokeWidth="2" strokeOpacity="0.9" />
        <path d="M210 176 L280 176" stroke="var(--color-logo-blue)" strokeWidth="2" strokeOpacity="0.9" />
        <path d="M210 176 C245 176 245 286 280 286" stroke="var(--color-logo-blue)" strokeWidth="2" strokeOpacity="0.9" />
        
        <path d="M490 66 C525 66 525 121 560 121" stroke="var(--color-logo-blue)" strokeWidth="2" strokeOpacity="0.9" />
        <path d="M490 176 C525 176 525 121 560 121" stroke="var(--color-logo-blue)" strokeWidth="2" strokeOpacity="0.9" />
        
        <path d="M490 176 C525 176 525 231 560 231" stroke="var(--color-live)" strokeWidth="2" strokeOpacity="0.9" />
        <path d="M490 286 C525 286 525 231 560 231" stroke="var(--color-live)" strokeWidth="2" strokeOpacity="0.9" />

        {/* --- Column 1: Trigger Node --- */}
        <rect x="0" y="140" width="210" height="72" rx="16" fill="var(--color-surface-3)" stroke="var(--color-border-strong)" />
        <rect x="16" y="154" width="44" height="44" rx="12" fill="var(--color-logo-blue)" fillOpacity="0.1" stroke="var(--color-logo-blue)" strokeOpacity="0.2" />
        <circle cx="38" cy="176" r="5" fill="var(--color-logo-blue)" />
        <text x="74" y="167" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--color-text-muted)">WEBHOOK</text>
        <text x="74" y="186" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="var(--color-text-primary)">New Lead</text>
        {/* Source Handle */}
        <circle cx="210" cy="176" r="4" fill="var(--color-logo-blue)" />

        {/* --- Column 2: Action Nodes --- */}
        {/* Action 1 */}
        <rect x="280" y="30" width="210" height="72" rx="16" fill="var(--color-surface-3)" stroke="var(--color-border-strong)" />
        <rect x="296" y="44" width="44" height="44" rx="12" fill="#60A5FA" fillOpacity="0.1" />
        <circle cx="318" cy="66" r="5" fill="#60A5FA" />
        <text x="354" y="57" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--color-text-muted)">FORMATTER</text>
        <text x="354" y="76" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="var(--color-text-primary)">Parse Data</text>
        <circle cx="280" cy="66" r="4" fill="var(--color-border-strong)" />
        <circle cx="490" cy="66" r="4" fill="var(--color-border-strong)" />

        {/* Action 2 */}
        <rect x="280" y="140" width="210" height="72" rx="16" fill="var(--color-surface-3)" stroke="var(--color-border-strong)" />
        <rect x="296" y="154" width="44" height="44" rx="12" fill="#A855F7" fillOpacity="0.1" />
        <circle cx="318" cy="176" r="5" fill="#A855F7" />
        <text x="354" y="167" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--color-text-muted)">AI AGENT</text>
        <text x="354" y="186" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="var(--color-text-primary)">Analyze Intent</text>
        <circle cx="280" cy="176" r="4" fill="var(--color-border-strong)" />
        <circle cx="490" cy="176" r="4" fill="var(--color-border-strong)" />

        {/* Action 3 */}
        <rect x="280" y="250" width="210" height="72" rx="16" fill="var(--color-surface-3)" stroke="var(--color-border-strong)" />
        <rect x="296" y="264" width="44" height="44" rx="12" fill="#EAB308" fillOpacity="0.1" />
        <circle cx="318" cy="286" r="5" fill="#EAB308" />
        <text x="354" y="277" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--color-text-muted)">LOGIC</text>
        <text x="354" y="296" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="var(--color-text-primary)">Filter Spam</text>
        <circle cx="280" cy="286" r="4" fill="var(--color-border-strong)" />
        <circle cx="490" cy="286" r="4" fill="var(--color-border-strong)" />

        {/* --- Column 3: Output Nodes --- */}
        {/* Output 1 (Assign Rep) */}
        <rect x="560" y="85" width="210" height="72" rx="16" fill="var(--color-surface-3)" stroke="var(--color-border-strong)" />
        <rect x="576" y="99" width="44" height="44" rx="12" fill="#FF5C40" fillOpacity="0.1" />
        <circle cx="598" cy="121" r="5" fill="#FF5C40" />
        <text x="634" y="112" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--color-text-muted)">LOGIC</text>
        <text x="634" y="131" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="var(--color-text-primary)">Assign Rep</text>
        <circle cx="560" cy="121" r="4" fill="var(--color-border-strong)" />

        {/* Output 2 (Update CRM) */}
        <rect x="560" y="195" width="210" height="72" rx="16" fill="var(--color-surface-3)" stroke="var(--color-live)" strokeOpacity="0.3" />
        <rect x="576" y="209" width="44" height="44" rx="12" fill="var(--color-live)" fillOpacity="0.1" />
        <circle cx="598" cy="231" r="5" fill="var(--color-live)" />
        <text x="634" y="222" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--color-text-muted)">DATABASE</text>
        <text x="634" y="241" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="var(--color-text-primary)">Update CRM</text>
        <circle cx="560" cy="231" r="4" fill="var(--color-live)" />
        
        {/* Live processing particle indicators */}
        <circle cx="280" cy="66" r="3" fill="var(--color-logo-blue)" filter="blur(2px)" />
        <circle cx="560" cy="231" r="3" fill="var(--color-live)" filter="blur(2px)" />
      </svg>
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-logo-blue)]/10 blur-3xl pointer-events-none rounded-full" />
    </div>
  );
};
