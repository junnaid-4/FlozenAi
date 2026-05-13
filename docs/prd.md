# FlozenAi — Product Requirements Document

> **Version:** 1.0  
> **Status:** Draft  
> **Last Updated:** 2025  
> **Owner:** FlozenAi (flozenai.co)

---

## 1. Product Overview

### 1.1 What is FlozenAi?

FlozenAi is a Pakistan-based automation business that sells two core products:

1. **n8n Automation Workflows** — Pre-built and custom automation workflows that replace manual repetitive tasks for businesses and freelancers.
2. **Automation Courses** — Paid educational content teaching people how to build their own n8n automations, starting from ₨999.

### 1.2 Mission

> "Make intelligent automation accessible to every Pakistani business — from solo freelancers to growing startups."

### 1.3 The Problem We Solve

| Pain Point | Who Feels It |
|---|---|
| Spending hours on repetitive manual tasks (data entry, follow-ups, reports) | SMBs, solopreneurs, freelancers |
| No access to affordable automation experts locally | Pakistani businesses |
| Wanting to learn automation but no quality local content | Aspiring automation builders |
| High cost of Western SaaS automation tools and consultants | Cost-conscious Pakistani teams |

### 1.4 The Solution

FlozenAi provides:
- **Ready-to-deploy n8n workflow packages** — buy once, run forever
- **Step-by-step courses** — learn to build and sell automations yourself
- **Custom automation builds** — for businesses that want bespoke solutions

---

## 2. Target Users

### 2.1 Primary Personas

**Persona A — The Overwhelmed Freelancer**
- Age: 22–32
- Role: Virtual assistant, digital marketer, content manager
- Pain: Manually doing tasks that could run automatically
- Goal: Save 10+ hours/week, scale their service offering
- Budget: ₨500–₨3,000 one-time per tool/course

**Persona B — The Small Business Owner**
- Age: 28–45
- Role: E-commerce store owner, agency founder, SaaS founder
- Pain: No technical team to build automations, expensive foreign agencies
- Goal: Automate lead gen, onboarding, reporting, CRM updates
- Budget: ₨5,000–₨30,000 per automation package

**Persona C — The Aspiring Automation Builder**
- Age: 18–28
- Role: Student, early-career developer, no-code enthusiast
- Pain: Wants to learn a marketable skill and build a freelance income stream
- Goal: Complete a course, build a portfolio, start selling automations
- Budget: ₨999–₨2,999 for course access

### 2.2 Non-Target Users (for now)
- Enterprise companies (complexity beyond current scope)
- Non-Urdu/English speaking audiences
- Users needing real-time 24/7 SaaS support

---

## 3. Product Goals & Success Metrics

### 3.1 Business Goals (6-month)

| Goal | Metric | Target |
|---|---|---|
| Drive automation sales | Revenue from workflow packages | ₨150,000/month |
| Grow course enrolments | Course purchases | 100 sales/month |
| Build audience | Email list size | 2,000 subscribers |
| Establish authority | Organic search traffic | 5,000 visits/month |

### 3.2 Website Goals

| Goal | KPI | Target |
|---|---|---|
| Convert visitors to buyers | Homepage → purchase conversion | ≥ 3% |
| Capture leads | Email opt-in rate | ≥ 8% |
| Reduce bounce | Time on site | ≥ 2 min avg |
| Mobile performance | Core Web Vitals (mobile) | LCP < 2.5s |

---

## 4. Website — Feature Requirements

### 4.1 Pages

#### Homepage (`/`)
- **Hero section** — Animated n8n workflow graph, headline, 2 CTAs
- **Proof bar** — Live counters: automations shipped, hours saved, clients
- **Automation gallery** — Filterable, expandable workflow cards with live diagram preview
- **Before/after results** — Scroll-animated comparison of manual vs automated
- **Course teaser** — Single strong CTA toward course page
- **Final CTA** — Urgency-driven, personal close

#### Automation Store (`/automations`)
- Filter by category (Lead Gen, E-commerce, Comms, Finance, Custom)
- Each listing: name, connected services, time saved, price, workflow diagram preview
- Add to cart / Buy now (via payment gateway)
- Individual automation page with full node diagram, setup guide, use case

#### Courses (`/courses`)
- Course listing with tier progression (Starter → Builder → Pro)
- Curriculum breakdown per course
- Preview lesson (free)
- Pricing with value stacking
- Enrolment CTA

#### About (`/about`)
- Founder story (short, personal, credibility-building)
- FlozenAi's "why"
- What makes us different from generic SaaS tools

#### Blog / Resources (`/blog`) — Phase 2
- SEO content around automation, n8n, productivity
- Free workflow templates

#### Contact (`/contact`)
- Custom automation inquiry form
- WhatsApp CTA (important for PKR market)
- Expected response time

### 4.2 Core Components

| Component | Priority | Notes |
|---|---|---|
| n8n Workflow Renderer | P0 | Interactive node graph in hero — React Flow |
| Automation Card | P0 | Expandable, diagram preview, price, buy CTA |
| Scroll Counter | P0 | Metrics animate on viewport entry |
| Course Tier Card | P0 | Progression-style, not flat 3-column |
| Email Capture | P0 | Lead magnet — free workflow template |
| Payment Integration | P0 | Stripe or local PKR gateway |
| Dark/Light Toggle | P1 | Dark default |
| WhatsApp Float Button | P1 | Critical for Pakistani market |
| Blog / SEO templates | P2 | Phase 2 |

### 4.3 Payment & Purchasing
- Support PKR pricing prominently
- Payment options: Stripe (cards), JazzCash, Easypaisa (Phase 2)
- Instant delivery: automation files via download link after purchase
- Course access: gated behind account creation (simple email/password)

---

## 5. Content Requirements

### 5.1 Automation Listings
Each automation package must include:
- Clear title (e.g., "WhatsApp Lead Capture → Google Sheets → Email Follow-up")
- Services connected (icons)
- What it automates (plain language, not technical)
- Time saved per week (specific number)
- One-time price in ₨
- Setup difficulty (Beginner / Intermediate / Advanced)
- n8n workflow diagram (actual node graph, not mockup)
- Setup guide (PDF or in-app)

### 5.2 Course Content
Each course must include:
- Module list with time estimates
- One free preview lesson (minimum 10 minutes)
- Clear outcome statement ("After this course you can...")
- What tools are required (n8n — free, no other paid tools if possible)

---

## 6. Technical Constraints

- Website must score ≥ 90 on Lighthouse mobile
- All animations must respect `prefers-reduced-motion`
- Core workflow renderer must be code-split and lazy-loaded
- Forms must work without JavaScript (progressive enhancement)
- PKR currency displayed everywhere (no USD confusion)
- WhatsApp integration for support (not a full chat widget)

---

## 7. Out of Scope (v1)

- Mobile app
- SaaS platform (user accounts with automation builder)
- Affiliate program
- Live chat (WhatsApp replaces it)
- Subscription model (all one-time in v1)
- Non-English/Urdu interface

---

## 8. Launch Phases

### Phase 1 — MVP (Month 1–2)
- Homepage with hero, gallery, and 1 course CTA
- 5–10 automation listings live
- 1 course (Starter) available
- Email capture with free template lead magnet
- Stripe payment live

### Phase 2 — Growth (Month 3–4)
- Blog launched with 5 SEO articles
- JazzCash / Easypaisa payment
- 2nd course tier (Builder) live
- Automation request form
- Customer testimonials / case studies

### Phase 3 — Scale (Month 5–6)
- Custom automation booking flow
- Bundle deals and upsells
- Email automation for nurture sequences
- Referral / affiliate system

---

*Document maintained by FlozenAi. Questions → flozenai.co*
