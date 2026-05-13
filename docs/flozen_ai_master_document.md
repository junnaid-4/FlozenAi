# FlozenAI — Master Strategy & Reference Document

> **Compiled from:** `prd.md` · `design.md` · `techstack.md` · `trends.md` · `deep-research-report.md`  
> **Date:** April 2026  
> **Status:** Final consolidated reference for website build

---

## 1. Product Overview

FlozenAI is a **Pakistan-based AI automation business** offering two core products:

1. **n8n Automation Workflows** — Pre-built and custom workflow packages that replace manual tasks for businesses and freelancers
2. **Automation Courses** — Step-by-step educational content starting at ₨999

### Mission
> "Make intelligent automation accessible to every Pakistani business — from solo freelancers to growing startups."

### The Problem We Solve

| Pain Point | Who Feels It |
|---|---|
| Hours lost on repetitive manual tasks | SMBs, solopreneurs, freelancers |
| No access to affordable automation experts locally | Pakistani businesses |
| Wanting to learn automation but no quality local content | Aspiring automation builders |
| High cost of Western SaaS tools & consultants | Cost-conscious teams |

---

## 2. Target Audience

### Persona A — The Overwhelmed Freelancer
- Age: 22–32 · VA, digital marketer, content manager
- Goal: Save 10+ hours/week, scale service offering
- Budget: ₨500–₨3,000 one-time

### Persona B — The Small Business Owner
- Age: 28–45 · E-commerce / agency / SaaS founder
- Goal: Automate lead gen, onboarding, reporting, CRM
- Budget: ₨5,000–₨30,000 per package

### Persona C — The Aspiring Automation Builder
- Age: 18–28 · Student, early-career developer, no-code enthusiast
- Goal: Learn a marketable skill, start selling automations
- Budget: ₨999–₨2,999 for course access

---

## 3. Website Goals & KPIs

| Goal | KPI | Target |
|---|---|---|
| Convert visitors to buyers | Homepage conversion rate | ≥ 3% |
| Capture leads | Email opt-in rate | ≥ 8% |
| Reduce bounce | Avg. time on site | ≥ 2 min |
| Mobile performance | Lighthouse mobile score | ≥ 90 |
| LCP | Largest Contentful Paint | < 2.5s |

---

## 4. Site Structure (Pages)

### Phase 1 (MVP)
| Page | Path | Priority |
|---|---|---|
| Homepage | `/` | P0 |
| Automation Store | `/automations` | P0 |
| Courses | `/courses` | P0 |
| Contact | `/contact` | P0 |
| About | `/about` | P1 |

### Phase 2
- Blog / Resources (`/blog`) — SEO content, free templates

### Homepage Section Flow
```
[NAV] Logo · Links center · CTA right · Dark/Light toggle
  ↓
[HERO] Animated n8n workflow graph · Headline · 2 CTAs
  ↓
[PROOF BAR] Automations Shipped · Hours Saved · Active Clients · Courses Taught
  ↓
[AUTOMATION GALLERY] Filterable card grid with expandable previews
  ↓
[BEFORE / AFTER] Scrollytelling: manual vs. automated (sticky left panel)
  ↓
[COURSES TEASER] Tier pricing cards · Skill progression visual · Enrolment CTA
  ↓
[FINAL CTA] Personal founder close · 1 primary CTA (no fake countdown)
  ↓
[FOOTER] Logo · Links · Built with n8n badge · Social icons
```

---

## 5. Design System

### 5.1 Brand Identity
- **Mark:** Angular geometric "F" — suggests speed, flow, precision
- **Wordmark:** "FLOZEN" in wide-tracked navy caps · "AI" in electric blue
- **Feel:** Engineering confidence, not startup friendliness
- **Direction:** "Control Room" — dark-first, precision industrial

### 5.2 Color System

```css
/* Backgrounds */
--color-void:        #0B0C0F   /* Page background */
--color-surface-1:   #111318   /* Card backgrounds */
--color-surface-2:   #1A1C22   /* Raised elements, inputs */
--color-surface-3:   #242730   /* Hover states */
--color-border:      rgba(255,255,255,0.07)
--color-border-strong: rgba(255,255,255,0.13)

/* Brand Accent — ONLY accent color */
--color-live:        #00E5A0   /* Primary CTAs, active nodes, highlights */
--color-live-dim:    rgba(0,229,160,0.12)
--color-live-border: rgba(0,229,160,0.25)

/* Logo blues — used sparingly */
--color-logo-blue:   #1A6FD8   /* "AI" wordmark match */
--color-logo-navy:   #0F2A6B   /* Mark and "FLOZEN" match */

/* Semantic */
--color-alert:       #FF5C40
--color-amber:       #FFB830

/* Typography */
--color-text-primary:   #F0EFEC
--color-text-secondary: #9A9AA5
--color-text-muted:     #5A5A65
--color-text-accent:    #00E5A0
```

**Dark mode is default.** Light mode is a toggle, not co-equal.

### 5.3 Typography

| Role | Font | Weight |
|---|---|---|
| Display / Headlines | Syne | 700, 800 |
| Body / UI | Plus Jakarta Sans | 400, 500 |
| Code / Data / Labels | DM Mono | 400, 500 |
| Editorial (pull quotes only) | Instrument Serif italic | 400 |

**Type Scale:** 11px → 13px → 16px → 18px → 22px → 32px → 48px → 64px

### 5.4 Spacing
Base unit: **4px**. All spacing in multiples of 4. Grid: 12-col / 1280px max-width.

### 5.5 Border Radius
```
--radius-sm: 4px   --radius-md: 8px   --radius-lg: 12px
--radius-xl: 16px  --radius-full: 9999px
```

---

## 6. Key UI Components

| Component | Description |
|---|---|
| **Workflow Node Graph** | React Flow, animated n8n-style nodes · lazy-loaded · static SVG fallback on mobile |
| **Automation Card** | Expandable · diagram preview · connected service icons · time saved · PKR price · buy CTA |
| **Pricing Card** | Outcome-framed ("₨ value unlocked: ~15,000") · not a feature table |
| **Proof Counter** | Count-up from 0 on viewport entry · GSAP easeOutQuart |
| **Before/After Scrollytelling** | Sticky left (manual process) · scroll reveals automation steps on right |
| **Email Capture** | Lead magnet — free workflow template |
| **WhatsApp Float Button** | Always visible on mobile — critical for PKR market |
| **Dark/Light Toggle** | Sun/moon icon · localStorage persisted · no flash |

---

## 7. Motion Principles

| Element | Animation | Trigger |
|---|---|---|
| Hero workflow graph | Sequential node entrance + edge draw | Page load |
| Status dot | Opacity pulse loop (2s) | Always |
| Section headlines | `translateY(16px→0)` + opacity | Scroll enter (once) |
| Metric counters | Count up from 0 | Scroll enter (once) |
| Automation cards | `translateY(-2px)` + border highlight | Hover |
| CTA button | `scale(0.98)` | Active/press |

**Never animate:** Looping BG gradients/orbs · infinite typewriter text · page-wide parallax · modal entrances · footer elements

**Timing reference:**
- Hover/focus: 100–150ms ease-out
- Card expand: 200–250ms spring
- Section entrance: 300–400ms, stagger 40ms
- Workflow node sequence: 500ms total, 80ms/node stagger

---

## 8. Tech Stack

```
Frontend:     Next.js 15 (App Router) + TypeScript (strict)
Styling:      Tailwind CSS v4 + CSS custom properties
Animation:    Framer Motion (interactions) + CSS (effects) + GSAP (counters/SVG)
Workflow:     React Flow (lazy-loaded, code-split)
Content:      MDX for blog/course (Phase 2)
Payments:     Stripe v1 (PKR supported) + JazzCash/Easypaisa Phase 2
Email:        Resend (transactional) + ConvertKit (marketing)
Auth:         NextAuth.js v5 (course access gating)
Database:     Supabase (PostgreSQL) + Prisma ORM
File Delivery: Cloudflare R2 (signed URLs, 24h expiry)
Hosting:      Vercel (Edge Functions, global CDN)
Analytics:    Vercel Analytics + Plausible (privacy-first)
```

### Project Structure
```
flozenai/
├── app/
│   ├── (site)/
│   │   ├── page.tsx              # Homepage
│   │   ├── automations/
│   │   │   ├── page.tsx          # Automation store
│   │   │   └── [slug]/page.tsx   # Individual automation
│   │   ├── courses/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── api/
│   │   ├── webhooks/stripe/route.ts
│   │   ├── purchase/route.ts
│   │   └── subscribe/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/                       # Button, Badge, Input primitives
│   ├── workflow/                 # WorkflowGraph, WorkflowNode, StaticSVG
│   ├── automation/               # AutomationCard, AutomationGallery
│   ├── course/                   # CourseCard, PricingTier
│   └── layout/                   # Nav, Footer, HeroSection
├── lib/
│   ├── stripe.ts · resend.ts · supabase.ts · r2.ts
├── content/
│   ├── automations/              # MDX content
│   └── courses/                  # MDX content
├── public/
│   ├── logo/                     # SVG variants
│   └── og/                       # Open Graph images
└── styles/globals.css
```

### Performance Budget
| Metric | Target |
|---|---|
| Lighthouse Mobile | ≥ 90 |
| LCP | < 2.5s |
| Total JS (initial) | < 150KB gzipped |
| React Flow bundle | < 200KB (lazy) |
| CLS | < 0.1 |

---

## 9. Design Trends — Apply vs. Avoid

### ✅ Apply
- Dark mode as default (Control Room theme)
- Bento grid layouts (results + features sections)
- Interactive node/flow graphs (hero + automation pages)
- Monospaced accents (DM Mono for all data labels)
- Spring physics for all interactions (Framer Motion)
- Scroll-based section reveals (once, staggered)
- Scrollytelling (before/after section)
- Value-anchored pricing (PKR value framing)
- Real-time-feeling proof counters

### ⚠️ Use Selectively
- Glassmorphism — tooltips and mobile nav ONLY
- Custom cursor states — desktop only, crosshair on graph
- AI output simulation — terminal-style log, NOT typewriter hero

### ❌ Never Use
- Purple/generic gradients on white backgrounds
- Floating blob/orb backgrounds
- Infinite logo carousels ("Trusted By")
- Auto-playing hero video
- "Get Started" CTA copy
- Lottie animations for decorative elements
- Generic feature grids with 12 icons
- Chatbot widget — use WhatsApp instead

---

## 10. CTA Copy Guide

| ❌ Generic | ✅ FlozenAI Specific |
|---|---|
| Get Started | Buy this automation |
| Sign Up | Enrol in the course |
| Learn More | See the workflow |
| Try it Free | Save 10h this week |

---

## 11. Launch Phases

### Phase 1 — MVP (Month 1–2)
- Homepage: hero, gallery, 1 course CTA
- 5–10 automation listings live
- 1 course (Starter) available
- Email capture with free template lead magnet
- Stripe payment live

### Phase 2 — Growth (Month 3–4)
- Blog: 5 SEO articles
- JazzCash / Easypaisa payment
- 2nd course tier (Builder)
- Automation request form
- Customer testimonials / case studies

### Phase 3 — Scale (Month 5–6)
- Custom automation booking flow
- Bundle deals and upsells
- Email nurture sequences
- Referral / affiliate system

---

*FlozenAI Master Document — compiled April 2026*
