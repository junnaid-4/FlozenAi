# FlozenAI Website — Task List

> **Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · Framer Motion · React Flow · Supabase · Stripe · Vercel  
> **Status:** Phase 7 Complete | Moving to Phase 8 (QA & Launch)

---

## Phase 0 — Project Scaffolding

- `[x]` Run `npx create-next-app@latest ./ --typescript --tailwind --app --src-dir --import-alias "@/*" --use-npm --yes`
- `[x]` Install animation packages: `framer-motion @xyflow/react gsap`
- `[x]` Install payment packages: `stripe @stripe/stripe-js @stripe/react-stripe-js`
- `[x]` Install backend packages: `@supabase/supabase-js prisma @prisma/client next-auth@beta resend`
- `[x]` Install UI utilities: `lucide-react`
- `[x]` Install dev tools: `eslint prettier husky lint-staged vitest @testing-library/react`
- `[x]` Create `.env.local` placeholders
- `[x]` Initialize Prisma (Schema defined)
- `[x]` Commit initial scaffold to git

---

## Phase 1 — Design System Foundation

- `[x]` **Logo Asset Preparation**
  - `[x]` Create `public/logo/` directory
  - `[x]` Process attached logo into variants: `logo-full.svg`, `logo-mark.svg`, `logo-wordmark.svg`
- `[x]` **`styles/globals.css`**
  - `[x]` Define all CSS custom properties (colors, fonts, spacing tokens)
  - `[x]` Add `@theme` block for Tailwind v4 mapping
  - `[x]` Add `@keyframes`: `pulse-dot`, `edge-draw`, `entrance-fade`
  - `[x]` Add `prefers-reduced-motion` override block
  - `[x]` Set `color-scheme: dark` on `:root` (prevents light flash)
- `[x]` **`app/layout.tsx`**
  - `[x]` Set `<html lang="en" className="dark">`
  - `[x]` Self-host fonts via `next/font`: Syne · Plus Jakarta Sans · DM Mono
  - `[x]` Add global metadata (title template, description, OG defaults)
  - `[x]` Add dark/light class hydration from `localStorage` (inline script, no flash)
- `[x]` **`components/ui/Button.tsx`** — 4 variants (primary/secondary/ghost/destructive) + loading state + Framer tap animation
- `[x]` **`components/ui/Badge.tsx`** — DM Mono · 4 color variants
- `[x]` **`components/ui/MetricCounter.tsx`** — GSAP count-up · IntersectionObserver · fires once

---

## Phase 2 — Layout Components

- `[x]` **`components/layout/Nav.tsx`**
  - `[x]` Fixed top with backdrop-blur on scroll
  - `[x]` Logo variants: full lockup (desktop) · mark-only (< 640px)
  - `[x]` Center navigation links
  - `[x]` Right: Primary CTA + dark/light toggle (sun/moon icon morph)
  - `[x]` Mobile: hamburger → slide-down drawer (glass overlay)
  - `[x]` Height compression after 80px scroll
- `[x]` **`components/layout/Footer.tsx`**
  - `[x]` Logo (wordmark variant) · nav links · social icons
  - `[x]` "Built with n8n" DM Mono badge
  - `[x]` Dynamic year

---

## Phase 3 — Homepage Sections

### Hero
- `[x]` **`components/layout/HeroSection.tsx`**
  - `[x]` Eyebrow label in DM Mono green
  - `[x]` Headline in Syne 800, 52–64px
  - `[x]` Sub-headline in Plus Jakarta Sans 18px, muted
  - `[x]` Two CTA buttons with correct specific copy
  - `[x]` Stagger entrance animation (opacity + translateY 16px)
- `[x]` **`components/workflow/StaticWorkflowSVG.tsx`** — Inline SVG ~2KB, exact visual of workflow graph
- `[x]` **`components/workflow/WorkflowGraph.tsx`**
  - `[x]` React Flow with 3 custom node types (TriggerNode · ActionNode · OutputNode)
  - `[x]` Node anatomy: 64×48px, correct styling
  - `[x]` SVG edge animation via `stroke-dashoffset`
  - `[x]` Status bar with pulsing dot
  - `[x]` Sequential entrance: 80ms/node stagger
  - `[x]` Fixed layout (no pan/zoom on hero)
  - `[x]` Lazy-load via `next/dynamic({ ssr: false })`
  - `[x]` StaticWorkflowSVG as loading placeholder

### Proof Bar
- `[x]` **`components/ProofBar.tsx`**
  - `[x]` 4 × MetricCounter in responsive flex row
  - `[x]` Wire to `/api/stats` route (with 1-hour cache)

### Automation Gallery
- `[x]` **`components/automation/AutomationCard.tsx`**
  - `[x]` Top bar: connected service icons
  - `[x]` Title · description (2 lines) · stats row · PKR price
  - `[x]` Buy CTA with specific copy ("Buy this automation")
  - `[x]` Expand state: AnimatePresence grow + workflow diagram preview
  - `[x]` Hover: spring translateY(-2px) + live border highlight
  - `[x]` Depth effect on desktop: `perspective(800px) rotateX/Y` on hover
- `[x]` **`components/automation/AutomationGallery.tsx`**
  - `[x]` Category filter tabs (Lead Gen · E-commerce · Comms · Finance · Custom)
  - `[x]` 3-col/2-col/1-col responsive grid
  - `[x]` "View all →" link

### Before / After
- `[x]` **`components/BeforeAfterSection.tsx`**
  - `[x]` Sticky left panel (position: sticky, top: 80px) — manual process
  - `[x]` Scrolling right: automation steps reveal on scroll via `useInView`
  - `[x]` Metric counters animate per step reveal
  - `[x]` Mobile fallback: flat before/after comparison card

### Courses Teaser
- `[x]` **`components/course/PricingCard.tsx`**
  - `[x]` Outcome-framed structure (not feature table)
  - `[x]` Featured tier: 1.5px live border
  - `[x]` Value framing: "₨ value unlocked: ~15,000"
- `[x]` **`components/course/CourseTeaserSection.tsx`**
  - `[x]` 2 pricing cards (Starter ₨999 · Builder ₨2,499)
  - `[x]` Skill progression path visual
  - `[x]` Single enrolment CTA

### Final Sections
- `[x]` **`components/FinalCTASection.tsx`** — Personal founder message · 1 primary CTA · no countdown
- `[x]` **`components/WhatsAppFloat.tsx`** — Fixed bottom-right · always visible mobile · correct WhatsApp deep link

### Homepage Assembly
- `[x]` **`app/(site)/page.tsx`** — Assemble all sections in order with scroll reveal wrappers

---

## Phase 4 — Inner Pages

- `[x]` **`app/(site)/automations/page.tsx`** — Full gallery with all filters + pagination
- `[x]` **`app/(site)/automations/[slug]/page.tsx`**
  - `[x]` Full interactive React Flow diagram (pannable)
  - `[x]` All content fields (services, time saved, price, guide download)
  - `[x]` `generateStaticParams` for SSG
- `[x]` **`app/(site)/courses/page.tsx`** — Course listings with tier progression
- `[x]` **`app/(site)/courses/[slug]/page.tsx`** — Module list · preview lesson · enrolment CTA
- `[x]` **`app/(site)/about/page.tsx`** — Founder story · differentiators · real photo (no stock)
- `[x]` **`app/(site)/contact/page.tsx`**
  - `[x]` Custom automation inquiry form with Zod validation
  - `[x]` WhatsApp CTA button
  - `[x]` Expected response time shown

---

## Phase 5 — Backend & Integrations

- `[x]` Run `npx prisma migrate dev` against Supabase
- `[x]` **`lib/stripe.ts`** — Singleton Stripe client
- `[x]` **`lib/resend.ts`** — Singleton Resend client
- `[x]` **`lib/supabase.ts`** — Singleton Supabase client (anon + service)
- `[x]` **`lib/r2.ts`** — Cloudflare R2 S3-compatible client
- `[x]` **`app/api/purchase/route.ts`** — Create Stripe Checkout session
- `[x]` **`app/api/webhooks/stripe/route.ts`**
  - `[x]` Verify webhook signature
  - `[x]` Record purchase in Supabase
  - `[x]` Generate signed R2 URL
  - `[x]` Send purchase email via Resend
- `[x]` **`app/api/subscribe/route.ts`** — Submit email to ConvertKit · deliver free template
- `[x]` **`app/api/stats/route.ts`** — Aggregate counts from Supabase · 1h cache header
- `[x]` **NextAuth.js v5 setup** (only if auth scope is confirmed)
  - `[x]` Credentials + magic link providers
  - `[x]` Middleware for `/courses/*` protection

---

## Phase 6 — Content & SEO

- `[ ]` Add Metadata API to every `page.tsx` (title · description · OG · canonical)
- `[ ]` Create `public/og/og-default.png` — FlozenAI logo on dark background (1200×630)
- `[ ]` Add Plausible analytics script to `layout.tsx` (`defer`, non-blocking)
- `[ ]` Add Vercel Analytics (`@vercel/analytics`)
- `[ ]` Create `public/robots.txt` and `app/sitemap.ts`

---

## Phase 7 — Mobile & Accessibility

- `[x]` Verify workflow graph replaced by StaticWorkflowSVG on all < 768px viewports
- `[x]` Disable all hover effects on touch devices
- `[x]` Cap hero font size at 40px on mobile
- `[x]` Single-column card grid on mobile
- `[x]` WhatsApp float always visible on mobile
- `[x]` All `<img>` / `next/image` have `alt` text
- `[x]` All interactive elements keyboard accessible (Tab + Enter)
- `[x]` `prefers-reduced-motion`: animations disabled globally
- `[x]` Colour contrast: all text on dark surfaces meets WCAG AA (4.5:1)
- `[x]` Form inputs work without JavaScript (progressive enhancement)

---

## Phase 8 — QA & Launch

- `[ ]` Run `npx tsc --noEmit` — zero TypeScript errors
- `[ ]` Run `npm run lint` — zero ESLint errors
- `[ ]` Run Lighthouse on mobile throttle — score ≥ 90
- `[ ]` Verify LCP < 2.5s (Fast 3G preset)
- `[ ]` Verify CLS < 0.1
- `[ ]` Test Stripe purchase flow end-to-end (test mode)
- `[ ]` Test email delivery via Resend (purchase confirmation + subscribe)
- `[ ]` Test dark/light toggle persistence (no flash on refresh)
- `[ ]` Test ProofBar counters animate once on scroll, never replay
- `[ ]` Test automation card expand/collapse on mobile + desktop
- `[ ]` Test WhatsApp float link on real mobile device
- `[ ]` Test contact form submission + auto-reply email
- `[ ]` Test all CTAs — confirm no "Get Started" copy anywhere
- `[ ]` Deploy to Vercel — configure env vars in dashboard
- `[ ]` Set up Cloudflare DNS for `flozenai.co`
- `[ ]` Enable HSTS + force HTTPS
- `[ ]` Enable Cloudflare Speed Brain + early hints

---

## Phase 9 — Phase 2 Backlog (Post-Launch)

- `[ ]` Blog with 5 SEO articles (MDX setup)
- `[ ]` JazzCash / Easypaisa payment integration
- `[ ]` 2nd course tier (Builder) content + page
- `[ ]` Customer testimonials / case studies section
- `[ ]` Automation request custom booking form
- `[ ]` Email nurture sequence in ConvertKit
- `[ ]` Bundle deals and upsell flows
