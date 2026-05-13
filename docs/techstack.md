# FlozenAi — Tech Stack

> **Version:** 1.0  
> **Philosophy:** Performance-first. Mobile-first. No overengineering.  
> **Constraint:** Must score ≥ 90 Lighthouse mobile. Must work on slow Pakistani 4G connections.

---

## 1. Architecture Overview

```
FlozenAi Website
├── Frontend          Next.js 15 (App Router) + TypeScript
├── Styling           Tailwind CSS v4 + CSS custom properties
├── Animation         Framer Motion (interactions) + CSS (effects)
├── Workflow Graph    React Flow (lazy-loaded, code-split)
├── Content           MDX for blog/course content (Phase 2)
├── Payments          Stripe (v1) + JazzCash (Phase 2)
├── Email             Resend (transactional) + ConvertKit (marketing)
├── Auth              NextAuth.js (course access gating)
├── Database          PlanetScale (MySQL) or Supabase (Postgres)
├── File Delivery     AWS S3 / Cloudflare R2 (automation file downloads)
├── Hosting           Vercel (Edge Functions, global CDN)
└── Analytics         Vercel Analytics + Plausible (privacy-first)
```

---

## 2. Frontend

### 2.1 Framework

**Next.js 15 — App Router**

```bash
npx create-next-app@latest flozenai --typescript --tailwind --app
```

Why Next.js 15:
- App Router = React Server Components by default (faster initial load, less JS sent)
- Built-in image optimization (`next/image`) — critical for logo + automation card images
- Edge runtime support for API routes
- File-based routing maps cleanly to `/automations/[slug]`, `/courses/[slug]`
- Vercel deployment is trivially zero-config

Key Next.js features in use:
- `generateStaticParams` — pre-render automation and course pages at build time
- `next/dynamic` — lazy-load React Flow workflow renderer
- `next/font` — self-host Syne, Plus Jakarta Sans, DM Mono (eliminates FOUT and Google DNS hit)
- `Suspense` boundaries — stream sections independently
- Metadata API — structured SEO per page without react-helmet

### 2.2 Language

**TypeScript (strict mode)**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

All component props, API responses, and content schemas typed. Zod for runtime validation of form inputs and API payloads.

### 2.3 Styling

**Tailwind CSS v4**

- Design tokens (`--color-live`, `--font-mono`, etc.) defined in CSS custom properties and mapped to Tailwind via `@theme`
- No component library (shadcn/ui optional for form primitives only)
- Dark mode: `class` strategy — toggle `dark` class on `<html>` element
- CSS custom properties handle the color switching — Tailwind is for layout/spacing

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-live: #00E5A0;
  --color-void: #0B0C0F;
  --font-display: 'Syne', sans-serif;
  --font-mono: 'DM Mono', monospace;
}
```

**What NOT to use for styling:**
- Styled-components (adds runtime JS overhead)
- Emotion (same issue)
- CSS Modules alone (no design token system)

---

## 3. Animation

### 3.1 Framer Motion

Used for: interactive components, spring-physics hover effects, page element entrances.

```bash
npm install framer-motion
```

Usage pattern — always use `motion` components only where animation is actually needed:

```tsx
// Automation card hover — spring physics
<motion.div
  whileHover={{ y: -2 }}
  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
>
```

```tsx
// Section entrance — scroll triggered
<motion.section
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
```

**Important:** `viewport={{ once: true }}` — animations fire once, never replay on re-scroll.

### 3.2 GSAP

Used ONLY for: the scroll-triggered metric counter animation and the hero workflow graph sequential entrance (where Spring physics isn't sufficient for SVG path drawing).

```bash
npm install gsap
```

Keep GSAP usage isolated to 2–3 components. Do not use GSAP for hover states or simple transitions — Framer Motion handles those.

### 3.3 CSS Animations

Status dot pulse, border shimmer on active nodes, and loading skeleton states — all via CSS `@keyframes`. Zero JS overhead.

```css
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.status-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}
```

### 3.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Also detect in JS and pass `reduceMotion` prop to Framer Motion components.

---

## 4. Workflow Graph Renderer

**React Flow**

The n8n-style interactive node graph in the hero and on automation pages.

```bash
npm install @xyflow/react
```

**Critical:** React Flow is ~200KB. Never include it in the initial bundle.

```tsx
// Lazy load with next/dynamic
const WorkflowGraph = dynamic(
  () => import('@/components/WorkflowGraph'),
  {
    loading: () => <StaticWorkflowSVG />, // Static SVG placeholder
    ssr: false,  // React Flow uses browser APIs
  }
);
```

**Mobile strategy:** On screen width < 768px, render `<StaticWorkflowSVG />` only — skip React Flow entirely. Static SVG is ~2KB vs 200KB.

Custom node types for FlozenAi:
```tsx
const nodeTypes = {
  triggerNode: TriggerNode,
  actionNode: ActionNode,
  outputNode: OutputNode,
}
```

---

## 5. Payments

### 5.1 Phase 1 — Stripe

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

- Stripe Checkout (hosted) for simplicity in Phase 1
- PKR currency supported by Stripe
- Webhook handler at `/api/webhooks/stripe` — triggers file delivery email on `checkout.session.completed`
- No PCI scope — Stripe handles all card data

### 5.2 Phase 2 — JazzCash / Easypaisa

- JazzCash API (REST) for mobile wallet payments
- Easypaisa OTC for cash payment option
- Both are critical for the Pakistani market where credit card penetration is low

---

## 6. Email

### 6.1 Transactional — Resend

```bash
npm install resend
```

Used for:
- Purchase confirmation + download link
- Course access credentials
- Contact form auto-reply
- Password reset (when auth is added)

```ts
// Example: post-purchase email
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'hello@flozenai.co',
  to: customer.email,
  subject: 'Your FlozenAi automation is ready',
  react: PurchaseConfirmationEmail({ downloadUrl, automationName }),
});
```

### 6.2 Marketing — ConvertKit (Kit)

- Lead capture → ConvertKit form API
- Free workflow template delivery automated in ConvertKit
- Nurture sequence for course upsell

---

## 7. Database

### 7.1 Supabase (recommended)

- PostgreSQL — mature, typed, great DX
- Row Level Security for course access gating
- Real-time (if needed for live stats)
- Built-in Auth (can replace NextAuth.js)
- Generous free tier for Phase 1

Schema overview:
```sql
users (id, email, created_at)
purchases (id, user_id, product_id, product_type, stripe_session_id, created_at)
products (id, slug, name, type: 'automation'|'course', price_pkr, active)
downloads (id, purchase_id, file_url, expires_at)
```

### 7.2 ORM — Prisma

```bash
npm install prisma @prisma/client
```

Type-safe database queries. Schema defined in `prisma/schema.prisma`. Migration-based schema management.

---

## 8. Authentication

**NextAuth.js v5 (Auth.js)**

```bash
npm install next-auth@beta
```

- Email + password (Credentials provider)
- Magic link login (Email provider via Resend)
- Session stored in JWT (no database session for Phase 1)
- Middleware protects `/dashboard/*` and `/courses/*` routes

---

## 9. File Delivery

**Cloudflare R2** (preferred over AWS S3 — no egress fees)

- Automation `.zip` files stored in R2
- Signed URLs generated post-purchase (expires in 24h)
- Download tracked in `downloads` table

```ts
// Generate signed URL after purchase
const signedUrl = await r2.getSignedUrl({
  Bucket: 'flozenai-automations',
  Key: `automations/${product.slug}.zip`,
  Expires: 86400, // 24 hours
});
```

---

## 10. Infrastructure & Hosting

### 10.1 Vercel

- Zero-config Next.js deployment
- Edge Functions for API routes (low latency)
- Preview deployments on every PR
- Built-in CDN (critical for Pakistan — use nearest edge node)
- Environment variables managed in Vercel dashboard

### 10.2 Domain & DNS

- Cloudflare for DNS (not just proxy) — improves resolution speed
- Enable Cloudflare's "Speed Brain" and early hints
- HSTS enabled, force HTTPS

### 10.3 CDN Strategy

- Static assets: Vercel CDN (automatic)
- Images: `next/image` with WebP conversion + lazy loading
- Fonts: Self-hosted via `next/font` (eliminates Google Fonts external request)
- Heavy libraries (React Flow): loaded client-side, cached by browser after first load

---

## 11. Analytics

### 11.1 Vercel Analytics

Built-in, zero-config. Tracks Web Vitals (LCP, FID, CLS) and page views.

### 11.2 Plausible Analytics

- Privacy-first (GDPR compliant, no cookie banner needed)
- Lightweight script (~1KB vs GA's 45KB)
- Track: page views, CTA clicks, form submissions, purchase events

```html
<script defer data-domain="flozenai.co" src="https://plausible.io/js/script.js"></script>
```

### 11.3 Custom Events

```ts
// Track automation purchase click
plausible('Automation Purchase', {
  props: { name: automation.name, price: automation.price }
});
```

**Do not use:** Google Analytics 4 (heavy, adds GDPR complexity, not worth it at this stage).

---

## 12. Development Tooling

```bash
# Linting + formatting
npm install -D eslint eslint-config-next prettier

# Pre-commit hooks
npm install -D husky lint-staged

# Component development
npm install -D @storybook/nextjs  # Optional, useful for design system

# Testing
npm install -D vitest @testing-library/react
```

### Directory Structure

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
│   ├── ui/                       # Primitives: Button, Badge, Input
│   ├── workflow/                 # WorkflowGraph, WorkflowNode, StaticSVG
│   ├── automation/               # AutomationCard, AutomationGallery
│   ├── course/                   # CourseCard, PricingTier
│   └── layout/                   # Nav, Footer, HeroSection
├── lib/
│   ├── stripe.ts
│   ├── resend.ts
│   ├── supabase.ts
│   └── r2.ts
├── content/
│   ├── automations/              # MDX files for automation content
│   └── courses/                  # MDX files for course content
├── public/
│   ├── logo/                     # SVG variants of FlozenAi logo
│   └── og/                       # Open Graph images
└── styles/
    └── globals.css
```

---

## 13. Performance Budget

| Metric | Target | How |
|---|---|---|
| Lighthouse Mobile | ≥ 90 | Code split, lazy load, self-hosted fonts |
| LCP | < 2.5s | Hero image preloaded, no render-blocking scripts |
| Total JS (initial) | < 150KB gzipped | No heavy libs in initial bundle |
| React Flow loaded | < 200KB | Only when needed, after hero paint |
| First paint | < 1.5s | Static HTML shell from RSC |
| CLS | < 0.1 | Font `size-adjust`, image `width/height` always set |

---

## 14. Environment Variables

```env
# .env.local
NEXT_PUBLIC_APP_URL=https://flozenai.co

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Supabase
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...

# Resend
RESEND_API_KEY=re_...

# Cloudflare R2
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=flozenai-automations

# ConvertKit
CONVERTKIT_API_KEY=...
CONVERTKIT_FORM_ID=...
```

---

## 15. What to Avoid

| Avoid | Reason |
|---|---|
| Next.js Pages Router | App Router is the standard now |
| Redux / Zustand | Overkill — React state + URL params are enough |
| Three.js in hero | 300KB+ cost, kills mobile performance |
| GraphQL | REST + Prisma is simpler for this scale |
| Prisma Accelerate (Phase 1) | Adds cost, not needed yet |
| Google Analytics 4 | Heavy, GDPR overhead, Plausible is better |
| Vercel Postgres | Use Supabase — better DX and more features |
| CSS-in-JS (styled-components) | Runtime overhead, conflicts with RSC |

---

*FlozenAi Tech Stack v1.0 — update when packages change*
