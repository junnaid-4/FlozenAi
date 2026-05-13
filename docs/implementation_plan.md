# FlozenAI Website — Implementation Plan

> **Goal:** Build a premium, high-converting marketing website for FlozenAI — a Pakistan-based AI automation company selling n8n workflow packages and automation courses.  
> **Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · Framer Motion · React Flow · Supabase · Stripe · Vercel

---

## User Review Required

> [!IMPORTANT]
> **Payment Gateway:** Phase 1 uses Stripe (supports PKR). JazzCash/Easypaisa integration requires a registered Pakistani business account — confirm availability before Phase 2 begins.

> [!IMPORTANT]
> **Content Readiness:** The automation card grid requires real n8n workflow diagrams and actual listings. Confirm at least 5 automation packages are ready to populate before launch.

> [!WARNING]
> **Auth Scope:** Course access gating (NextAuth.js + Supabase) adds significant complexity. If the course page is an external platform (e.g., Teachable, Gumroad), replace with a redirect CTA and drop auth entirely for Phase 1.

> [!NOTE]
> **The workflow graph renderer (React Flow) is the most technically complex component.** It must be lazy-loaded and code-split to protect mobile performance. A static SVG fallback is required for all < 768px viewports.

---

## Proposed Changes

### Phase 0 — Project Scaffolding

#### [NEW] Next.js 15 App with Tailwind v4

```bash
npx create-next-app@latest flozenai --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Required additional packages:
```bash
npm install framer-motion @xyflow/react gsap
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
npm install @supabase/supabase-js prisma @prisma/client
npm install next-auth@beta resend
npm install lucide-react
npm install -D @types/node
```

---

### Phase 1 — Foundation & Design System

#### [MODIFY] `styles/globals.css`
Define all design tokens as CSS custom properties. Map to Tailwind via `@theme`. Include:
- Full color palette (void, surface-1/2/3, borders, live accent, logo blues, semantic, typography)
- Font stack registration
- `@keyframes` for `pulse-dot`, `edge-draw`, `entrance-fade`
- `prefers-reduced-motion` override block
- Dark/light mode class strategy (`html.dark` → default)

#### [NEW] `app/layout.tsx`
- Root layout with `<html lang="en" className="dark">`
- `next/font` self-hosting: Syne, Plus Jakarta Sans, DM Mono (eliminates Google Fonts DNS hit)
- Global metadata (title template, description, OG image)
- Dark/light class hydration (read `localStorage` before paint to avoid flash)

#### [NEW] `components/ui/Button.tsx`
Four variants: `primary | secondary | ghost | destructive`
- Primary: `bg-[--color-live]` · text `#0B0C0F` · no border
- Secondary: transparent · `text-[--color-live]` · live border
- Ghost: transparent · primary text · strong border
- Framer Motion `whileTap={{ scale: 0.98 }}`
- Loading state: spinner replaces text, button disabled not hidden
- Specific copy enforced via `label` prop

#### [NEW] `components/ui/Badge.tsx`
DM Mono, uppercase, 11px. Variants: `live | amber | muted | blue`

#### [NEW] `components/ui/MetricCounter.tsx`
GSAP count-up from 0 with `easeOutQuart`. Fires once on viewport entry via `IntersectionObserver`. Structure:
```
[Number in Syne 800 40px] [Unit suffix in color-live]
[Label in DM Mono 11px uppercase muted]
```

---

### Phase 2 — Layout Components

#### [NEW] `components/layout/Nav.tsx`
- Fixed top, `backdrop-blur(8px)` on scroll (glass nav — acceptable here)
- Logo left (full lockup on desktop, mark-only on mobile < 640px)
- Center links: `Automations · Courses · About · Contact`
- Right: Primary CTA button + Dark/Light toggle (sun/moon icon morph)
- Mobile: Hamburger → slide-down drawer with glass overlay
- Compresses height after 80px scroll

#### [NEW] `components/layout/Footer.tsx`
- Logo (wordmark variant) · Nav links · Social icons (Lucide)
- "Built with n8n" badge (DM Mono, muted)
- © FlozenAI + year (dynamic)
- No animations (footer never gets animated per motion rules)

---

### Phase 3 — Homepage Sections

#### [NEW] `components/layout/HeroSection.tsx`
**Left column:**
- Eyebrow label: DM Mono green · e.g., `// AI-POWERED AUTOMATION`
- Headline: Syne 800, 52–64px, 2 lines max, tracking -0.02em
- Sub-headline: Plus Jakarta Sans 18px, muted, 1.7 line-height
- Two CTAs: `[Browse Automations]` (primary) · `[Start Learning →]` (secondary)
- Framer Motion stagger entrance on load (opacity + translateY 16px)

**Right column (or center on wide):**
- `<WorkflowGraph />` lazy-loaded via `next/dynamic`
- `<StaticWorkflowSVG />` placeholder during load + on mobile
- Sequential node entrance animation on mount (80ms stagger per node)

#### [NEW] `components/workflow/WorkflowGraph.tsx`
React Flow with:
- Custom node types: `TriggerNode · ActionNode · OutputNode`
- Node anatomy: 64×48px · surface-2 bg · live border on active · DM Mono 10px label
- Edge animation: SVG `stroke-dashoffset` in `--color-live` at 60%
- Status bar: 36px · pulsing dot · DM Mono 11px run status
- NO pannable/zoomable on hero — fixed layout only

#### [NEW] `components/workflow/StaticWorkflowSVG.tsx`
Inline SVG, ~2KB. Exact visual match of the workflow graph for:
- Mobile (< 768px) — replaces React Flow entirely
- Server-side render placeholder
- Fallback if WebGL/JS fails

#### [NEW] `components/ProofBar.tsx`
Full-width dark surface. 4x `<MetricCounter />` in a responsive flex row:
- Automations Shipped · Hours Saved · Active Clients · Courses Taught
- Source: API route `/api/stats` with 1-hour cache header (pulls from Supabase counts)

#### [NEW] `components/automation/AutomationGallery.tsx`
- Section title + category filter tabs (Lead Gen · E-commerce · Comms · Finance · Custom)
- 3-col grid desktop · 2-col tablet · 1-col mobile
- Each `<AutomationCard />` expandable
- "View all →" link to `/automations`

#### [NEW] `components/automation/AutomationCard.tsx`
Structure:
```
Top bar: [ServiceIcon] → [ServiceIcon] → [ServiceIcon]
Title: Plus Jakarta Sans 500, 16px
Description: 2 lines max, secondary text
Stats row: Time saved badge · Difficulty badge
Price: Syne 700, 22px, ₨ prefix
CTA: [Buy this automation] (primary button)
```
Expand state: card grows via Framer Motion `AnimatePresence` to show workflow diagram preview + full description + buy CTA.
Hover: `translateY(-2px)` spring · border highlight to `--color-live-border`

#### [NEW] `components/BeforeAfterSection.tsx`
Scrollytelling with sticky anchor:
- Left (sticky, `top: 80px`): manual process panel — greyed out, repetitive-task list
- Right (scrolling): automation steps reveal one-by-one as user scrolls
- Metric counters animate when each step appears
- Framer Motion `useInView` + GSAP ScrollTrigger for step reveals
- Desktop only: mobile shows a flat before/after comparison card

#### [NEW] `components/course/CourseTeaserSection.tsx`
- Headline + 2-tier pricing cards (`Starter ₨999 · Builder ₨2,499`)
- Skill progression path: visual arrow connecting starter → builder → pro
- Single strong enrolment CTA

#### [NEW] `components/course/PricingCard.tsx`
Structure per design spec (not a feature table):
```
[TIER LABEL — DM Mono caps]
[₨999 — Syne 800, 32px]
[one-time · instant access — DM Mono, muted]
[──── What you build ────]
[✓ n8n fundamentals]
[✓ 3 real automations]
[✓ Community access]
[₨ value unlocked: ~15,000]
[Enrol Now →]
```
Featured tier: `border-width: 1.5px · --color-live`

#### [NEW] `components/FinalCTASection.tsx`
Dark surface. Personal founder message + 1 primary CTA. No countdown timers.

#### [NEW] `components/WhatsAppFloat.tsx`
Fixed bottom-right. `pointer-events: all`. Always visible on mobile. WhatsApp deep link to business number. `z-index: 50`.

---

### Phase 4 — Inner Pages

#### [NEW] `app/(site)/automations/page.tsx`
Full listings page. Same `<AutomationGallery />` component with all filters exposed. Heading + filter bar + grid + pagination.

#### [NEW] `app/(site)/automations/[slug]/page.tsx`
Individual automation page:
- Full n8n node diagram (React Flow, interactive, pannable)
- Services connected (icons)
- What it automates (plain language)
- Time saved per week (specific)
- Price in ₨ + Buy CTA
- Setup guide download (post-purchase)
- `generateStaticParams` for SSG

#### [NEW] `app/(site)/courses/page.tsx`
Course listing with tier progression (Starter → Builder → Pro). Curriculum breakdown, preview lesson link, pricing.

#### [NEW] `app/(site)/courses/[slug]/page.tsx`
Individual course page. Module list, free preview CTA, enrolment CTA, outcome statement.

#### [NEW] `app/(site)/about/page.tsx`
Founder story (short, personal). FlozenAI "why". Differentiators vs. generic SaaS tools. No stock images — real photo or custom illustration.

#### [NEW] `app/(site)/contact/page.tsx`
- Custom automation inquiry form (validated with Zod, submitted to Resend)
- WhatsApp CTA prominently placed
- Expected response time
- No chatbot widget

---

### Phase 5 — Backend & Integrations

#### [NEW] `app/api/webhooks/stripe/route.ts`
Handle `checkout.session.completed`:
1. Verify Stripe webhook signature
2. Record purchase in Supabase `purchases` table
3. Generate signed R2 URL (24h expiry)
4. Send purchase confirmation email via Resend

#### [NEW] `app/api/purchase/route.ts`
Create Stripe Checkout session for automation or course purchase. Returns `sessionUrl`.

#### [NEW] `app/api/subscribe/route.ts`
Submit email to ConvertKit API. Deliver free workflow template. Returns 200 on success.

#### [NEW] `app/api/stats/route.ts`
Query Supabase for aggregate counts (purchases, clients). Return with `Cache-Control: s-maxage=3600`. Used by `<ProofBar />`.

#### [NEW] `lib/stripe.ts · lib/resend.ts · lib/supabase.ts · lib/r2.ts`
Singleton clients. No re-initialization per request.

#### [NEW] `prisma/schema.prisma`
```sql
users, purchases, products, downloads
```

---

### Phase 6 — SEO & Performance

#### [MODIFY] Every `page.tsx`
Use Next.js Metadata API for:
- Unique `<title>` per page
- `<meta name="description">`
- Open Graph (`og:title`, `og:description`, `og:image`)
- Canonical URL
- `robots` directive

#### [NEW] `public/og/og-default.png`
Open Graph default image: FlozenAI logo on dark background (1200×630).

#### Performance checklist:
- `next/image` with `width`/`height` on every image (prevents CLS)
- React Flow loaded via `next/dynamic({ ssr: false })`
- Fonts via `next/font` (self-hosted, no Google Fonts DNS)
- No render-blocking scripts
- `prefers-reduced-motion` CSS override + JS detection
- Static SVG fallback for mobile workflow graph
- Plausible analytics script: `<script defer>` (non-blocking)

---

## Verification Plan

### Automated Tests
```bash
# Lint & type check
npm run lint && npx tsc --noEmit

# Unit tests (components)
npx vitest run

# Lighthouse CI
npx lighthouse https://flozenai.co --output json --chrome-flags="--headless"
```

### Manual Verification
- [ ] Dark/light toggle works, preference persists on refresh (no flash on load)
- [ ] Workflow graph animates on page load; static SVG shows on mobile < 768px
- [ ] Proof counters animate exactly once on scroll enter, never on re-scroll
- [ ] Automation card expands and collapses smoothly via `AnimatePresence`
- [ ] Before/After scrollytelling works; sticky left panel holds position
- [ ] WhatsApp float button opens correct link on mobile
- [ ] Stripe checkout completes → email arrives with correct download link
- [ ] All CTAs use specific copy (no "Get Started" anywhere)
- [ ] Lighthouse mobile score ≥ 90
- [ ] LCP < 2.5s on mobile throttled (Fast 3G preset in DevTools)
- [ ] `prefers-reduced-motion` disables all animations

---

*FlozenAI Implementation Plan v1.0*
