# FlozenAi — Design System

> **Version:** 1.0  
> **Direction:** Control Room (dark-first, precision industrial)  
> **Logo:** Geometric F mark in navy + "FLOZEN AI" wordmark with blue accent on "AI"

---

## 1. Brand Identity

### 1.1 Logo Analysis & Usage

The FlozenAi logo consists of:
- **Mark:** A geometric, angular "F" formed by two parallel strokes with a terminal cut — suggests speed, flow, and precision
- **Wordmark:** "FLOZEN" in wide-tracked navy caps, "AI" in a lighter electric blue
- **Feeling:** Engineering confidence, not startup friendliness

#### Logo Variants

| Variant | Usage | Background |
|---|---|---|
| Full lockup (mark + wordmark) | Headers, hero, about page | Dark or white only |
| Mark only | Favicon, small spaces, loading states | Any |
| Wordmark only | Footer, document headers | Light backgrounds |
| Reversed (white mark) | Dark backgrounds, overlays | Dark surfaces |

#### Clear Space
Maintain minimum clear space equal to the height of the "F" mark on all sides. Never place the logo on busy backgrounds or gradients.

#### Logo Don'ts
- Never rotate or skew the mark
- Never recolor the mark (navy or white only)
- Never stretch or distort proportions
- Never add drop shadows or glows to the logo
- Never use the logo smaller than 24px height

---

## 2. Color System

### 2.1 Primary Palette

```
--color-void:        #0B0C0F   /* Page background — darkest */
--color-surface-1:   #111318   /* Card backgrounds */
--color-surface-2:   #1A1C22   /* Raised elements, inputs */
--color-surface-3:   #242730   /* Hover states */
--color-border:      rgba(255,255,255,0.07)   /* Default borders */
--color-border-strong: rgba(255,255,255,0.13) /* Emphasized borders */
```

### 2.2 Brand Accent

```
--color-live:        #00E5A0   /* Primary accent — "running/active" green */
--color-live-dim:    rgba(0,229,160,0.12)   /* Accent backgrounds */
--color-live-border: rgba(0,229,160,0.25)   /* Accent borders */
```

The single green accent (`#00E5A0`) is the only accent color used across the entire site. It appears on:
- Active workflow node states
- Primary CTAs
- Status indicators (pulsing dot)
- Hovered nav items
- Metric highlights

### 2.3 Logo-Derived Blue

```
--color-logo-blue:   #1A6FD8   /* Matches "AI" in the logo wordmark */
--color-logo-navy:   #0F2A6B   /* Matches the mark and "FLOZEN" */
```

Logo blue is used sparingly — course badges, secondary tags, "AI-powered" labels. It is never used as a primary CTA color (that belongs to the green accent).

### 2.4 Semantic Colors

```
--color-alert:       #FF5C40   /* Errors, warnings, "urgent" states */
--color-amber:       #FFB830   /* Caution, "popular" badge, upgrade nudge */
--color-success:     #00E5A0   /* Same as live — consistent */
```

### 2.5 Typography Colors

```
--color-text-primary:   #F0EFEC   /* Headlines, primary text */
--color-text-secondary: #9A9AA5   /* Body text, descriptions */
--color-text-muted:     #5A5A65   /* Metadata, timestamps, placeholders */
--color-text-accent:    #00E5A0   /* Labels, highlights, "live" text */
```

### 2.6 Light Mode (if toggled)

```
--color-void:        #F5F4F1
--color-surface-1:   #FFFFFF
--color-surface-2:   #F0EFEA
--color-border:      rgba(0,0,0,0.08)
--color-text-primary: #0B0C0F
--color-text-secondary: #4A4A55
```

**Dark mode is the default.** Light mode is a toggle for users who prefer it — not co-equal.

---

## 3. Typography

### 3.1 Type Stack

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headlines | Syne | 700, 800 | Sharp, engineered feel |
| Body / UI | Plus Jakarta Sans | 400, 500 | Warm, readable, modern |
| Code / Data / Labels | DM Mono | 400, 500 | Technical credibility |
| Editorial accent | Instrument Serif (italic) | 400 | Used sparingly in pull quotes only |

```css
--font-display: 'Syne', sans-serif;
--font-body:    'Plus Jakarta Sans', sans-serif;
--font-mono:    'DM Mono', monospace;
--font-serif:   'Instrument Serif', serif;
```

### 3.2 Type Scale

```css
--text-xs:   11px   /* Mono labels, badges, timestamps */
--text-sm:   13px   /* Secondary body, captions */
--text-base: 16px   /* Primary body text */
--text-md:   18px   /* Sub-headings, card titles */
--text-lg:   22px   /* Section headers */
--text-xl:   32px   /* Page-level headlines */
--text-2xl:  48px   /* Hero section */
--text-3xl:  64px   /* Maximum display use */
```

### 3.3 Type Rules

- Headlines: Syne 700–800, tracking `-0.02em` to `-0.03em`
- Body: Plus Jakarta Sans 400, `line-height: 1.7`
- Mono labels: DM Mono 400–500, tracking `+0.08em`, `text-transform: uppercase` for category labels only
- Never use system fonts for visible UI
- Never mix more than 3 fonts on a single page

---

## 4. Spacing & Grid

### 4.1 Base Unit

`4px` is the base. All spacing uses multiples of 4.

```
4px   — micro gaps (icon-to-text)
8px   — tight internal padding
12px  — component internal gaps
16px  — standard padding
24px  — card padding
32px  — component-to-component
48px  — section sub-spacing
64px  — section gaps (mobile)
96px  — section gaps (desktop)
128px — hero vertical padding
```

### 4.2 Grid

- **Desktop:** 12-column, 1280px max-width, 24px gutters
- **Tablet:** 8-column, 768px–1024px, 20px gutters
- **Mobile:** 4-column, full-width, 16px gutters

### 4.3 Border Radius

```
--radius-sm:  4px    /* Badges, pills, small elements */
--radius-md:  8px    /* Buttons, inputs, small cards */
--radius-lg:  12px   /* Cards, panels */
--radius-xl:  16px   /* Large containers */
--radius-full: 9999px /* Fully rounded pills */
```

---

## 5. Component System

### 5.1 Workflow Node (Hero Component)

The animated n8n-style workflow graph is the signature UI element.

**Node anatomy:**
- Container: 64×48px, `border-radius: 8px`, `border: 1px solid --color-border-strong`
- Background: `--color-surface-2`
- Active state: `border-color: --color-live`, `background: --color-live-dim`
- Icon: emoji or SVG, 20px centered
- Label: DM Mono 10px, muted, below node

**Edge anatomy:**
- Line: 1px solid `--color-border-strong`
- Animated state: SVG stroke-dashoffset animation in `--color-live` at 60% opacity
- Arrowhead: 5px triangle, same color as line

**Status bar:**
- Height: 36px, padding: 0 16px
- `border-top: 1px solid --color-border`
- Status dot: 6px circle, pulses via `opacity` keyframe (not `scale` — causes layout shift)
- Text: DM Mono 11px

### 5.2 Automation Cards

```
Structure:
├── Top bar (service icons connected by arrow)
├── Title (Plus Jakarta Sans 500, 16px)
├── Description (2 lines max, secondary text)
├── Stats row (time saved + difficulty badge)
├── Price (Syne 700, 22px, in ₨)
└── CTA button
```

**Expand state:** Card grows to show workflow diagram preview + full description + buy button.

### 5.3 Buttons

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--color-live` | `#0B0C0F` | None | Main CTA |
| Secondary | Transparent | `--color-live` | `1px --color-live-border` | Secondary action |
| Ghost | Transparent | Primary text | `1px --color-border-strong` | Tertiary action |
| Destructive | `--color-alert` at 15% | `--color-alert` | `1px --color-alert` at 30% | Danger actions |

**Button sizing:**
- Small: `height: 32px`, padding: `0 14px`, font: 13px
- Default: `height: 40px`, padding: `0 20px`, font: 14px
- Large: `height: 48px`, padding: `0 28px`, font: 15px

**Button rules:**
- Never use generic "Get Started" copy — be specific ("Buy Automation" / "Enrol Now")
- Primary button always has `min-width: 160px`
- Loading state: spinner replaces text, button disabled but not hidden

### 5.4 Pricing Cards

Not a standard 3-column feature table. Structure:

```
┌─────────────────────────────┐
│ [TIER LABEL in mono caps]   │
│                             │
│ ₨999                        │  ← Syne 800, 32px
│ one-time · instant access   │  ← DM Mono, muted
│                             │
│ ───── What you build ────── │
│ ✓ n8n fundamentals         │
│ ✓ 3 real automations        │
│ ✓ Community access          │
│                             │
│ ₨ value unlocked: ~15,000   │  ← value framing
│                             │
│ [Enrol Now →]               │
└─────────────────────────────┘
```

Featured tier: `border-width: 1.5px`, `border-color: --color-live`

### 5.5 Metric / Proof Counter

```
Structure:
├── Number (Syne 800, 40–48px, --color-text-primary)
├── Unit suffix (Syne 500, 20px, --color-live)
└── Label (DM Mono 11px, --color-text-muted, uppercase)
```

Animation: `requestAnimationFrame` count-up from 0, `easeOutQuart`, triggers once on viewport entry.

---

## 6. Iconography

- **Style:** Outline icons, 1.5px stroke, rounded caps
- **Library:** Lucide Icons (matches clean engineering aesthetic)
- **Sizes:** 16px (inline), 20px (UI), 24px (feature icons), 32px (large callouts)
- **Color:** Always inherit from text color — never hardcode icon colors separately

Service/app icons (used in automation cards):
- Use official brand SVG icons where available
- Fallback: square with 2-letter abbrev in DM Mono

---

## 7. Motion Principles

### 7.1 Core Rules

1. **One orchestrated entrance per section** — not scattered micro-animations everywhere
2. **Animations should communicate function** — node graph animation shows data flowing, not just "looking cool"
3. **Never animate on mobile by default** — detect connection speed + `prefers-reduced-motion`
4. **Spring physics > easing curves** — use Framer Motion spring config for all interactive elements

### 7.2 Timing Reference

```
Micro (hover, focus):    100–150ms, ease-out
Standard (card expand):  200–250ms, spring
Page element entrance:   300–400ms, stagger 40ms between items
Scroll counter:          800ms–1200ms, easeOutQuart
Workflow node sequence:  500ms total, 80ms per node stagger
```

### 7.3 What Gets Animated

| Element | Animation | Trigger |
|---|---|---|
| Hero workflow graph | Sequential node entrance + edge draw | Page load |
| Status indicator dot | Opacity pulse (1 → 0.3 → 1), 2s loop | Always |
| Section headlines | `translateY(16px) → 0`, `opacity 0 → 1` | Scroll enter |
| Metric counters | Count up from 0 | Scroll enter (once) |
| Automation cards | `translateY(-2px)` + border highlight | Hover |
| CTA button | Scale(0.98) | Active/press |
| Dark/light toggle | Icon morph | Click |

### 7.4 What Never Gets Animated

- Looping background gradients or orbs
- Text that types and re-types infinitely
- Page-wide parallax (causes mobile jank)
- Modal entrances (should be instant)
- Footer elements

---

## 8. Homepage Layout — Section Structure

```
[NAV] Logo left · Links center · CTA right · Dark toggle
  |
[HERO]
  Eyebrow label (DM Mono, green)
  Headline (Syne 800, 52–64px, 2 lines)
  Sub-headline (Plus Jakarta, 18px, muted)
  Two CTAs: [Browse Automations] [Start Learning →]
  Workflow graph (React Flow, animated, right or center)
  |
[PROOF BAR]
  Full-width, dark surface, 4 counters side by side
  Automations Shipped · Hours Saved · Active Clients · Courses Taught
  |
[AUTOMATION GALLERY]
  Section title + category filter tabs
  3-column grid of automation cards (2 on tablet, 1 on mobile)
  "View all" link
  |
[BEFORE / AFTER]
  Scrollytelling: left = painful manual, right = automated
  Counters animate as user scrolls through
  |
[COURSES TEASER]
  Headline + 2-tier pricing cards
  Skill progression path visual
  Single strong enrolment CTA
  |
[FINAL CTA SECTION]
  Dark section, personal founder line
  Headline + 1 primary CTA
  (No fake countdown timers)
  |
[FOOTER]
  Logo · Links · Built with n8n badge · Social icons
```

---

## 9. Dark / Light Mode Strategy

- **Default:** Dark (Control Room)
- **Toggle:** Top-right of nav, sun/moon icon swap
- **Persistence:** localStorage preference saved
- **System preference:** Respected on first visit, overridable
- **No flash:** CSS `color-scheme` property set on `:root` before paint

---

## 10. Responsive Breakpoints

```
Mobile:  < 640px
Tablet:  640px – 1024px
Desktop: 1024px – 1280px
Wide:    > 1280px (max-width cap at 1280px for content)
```

**Mobile-specific rules:**
- Workflow graph replaced with static SVG diagram on mobile
- All hover effects disabled (touch devices have no hover)
- Font sizes capped at 40px maximum even for hero
- Card grid collapses to single column
- WhatsApp float button visible at all times

---

*FlozenAi Design System v1.0 — Internal reference document*
