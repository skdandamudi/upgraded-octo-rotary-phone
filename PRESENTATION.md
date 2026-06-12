<!--
Marp presentation. To render:
  npm i -g @marp-team/marp-cli
  marp PRESENTATION.md --pdf        # → PRESENTATION.pdf
  marp PRESENTATION.md --pptx       # → PRESENTATION.pptx
  marp PRESENTATION.md --html       # → PRESENTATION.html
Or open in VS Code with the "Marp for VS Code" extension and use the preview.
-->

---
marp: true
theme: default
size: 16:9
paginate: true
backgroundColor: "#0B1220"
color: "#F8FAFC"
style: |
  section {
    font-family: 'Inter', system-ui, sans-serif;
    padding: 64px 72px;
    background-image:
      radial-gradient(60% 40% at 0% 0%, rgba(50,108,229,0.25), transparent 70%),
      radial-gradient(50% 35% at 100% 100%, rgba(6,182,212,0.18), transparent 70%);
  }
  h1, h2, h3 { color: #F8FAFC; letter-spacing: -0.02em; font-weight: 700; }
  h1 { font-size: 56px; line-height: 1.05; }
  h2 { font-size: 40px; margin-top: 0; }
  h3 { font-size: 24px; color: #06B6D4; margin-bottom: 8px; }
  .eyebrow {
    color: #06B6D4; font-family: ui-monospace, monospace;
    text-transform: uppercase; letter-spacing: 0.18em;
    font-size: 14px; margin-bottom: 8px;
  }
  .grad {
    background: linear-gradient(120deg, #FFFFFF 0%, #BFDBFE 40%, #06B6D4 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  ul { line-height: 1.55; }
  code { background: rgba(255,255,255,0.08); color: #BFDBFE; padding: 1px 6px; border-radius: 4px; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  .card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; padding: 20px 22px;
  }
  .muted { color: #94A3B8; }
  footer { color: #94A3B8; font-size: 14px; }
  section::after { color: #94A3B8; }
---

<div class="eyebrow">Capstone Project · 2026</div>

# <span class="grad">K8S Systems Inc</span><br/>Marketing Website

### Kubernetes. DevOps. Cloud Excellence.

<br/>

A premium, production-ready single-page marketing site for an enterprise
Kubernetes consulting brand — built end-to-end in Next.js with modern
animations, dark mode, and full SEO.

<br/>

**Sudheer Dandamudi** · Course Name · Instructor Name

---

## The Brief & Approach

<div class="cols">
<div class="card">

### The Ask

Build a marketing site for a fictional Kubernetes / DevOps consulting firm
that could plausibly compete with **Vercel**, **HashiCorp**, **Datadog**,
and **Stripe** on visual quality and engineering polish.

- Single-page layout, 10 sections
- Dark theme, animated, accessible
- Lighthouse 95+ across the board
- Production-grade code, not a mockup

</div>
<div class="card">

### My Approach

- Treat the spec as a real client brief — make ambitious design choices,
  not just literal-spec compliance
- Centralize all copy in one config file → presentational components stay
  small and easy to scan
- Pick the **modern** version of the stack (Next 16, React 19, Tailwind v4,
  shadcn-on-base-ui) instead of the comfortable old one
- Document trade-offs as I go

</div>
</div>

---

## Tech Stack — and *why*

<div class="cols">
<div class="card">

### Framework & UI

- **Next.js 16 (App Router)** — RSC by default; only sections that need
  interactivity become client components (smaller JS payload)
- **React 19** + **TypeScript 5** end-to-end
- **Tailwind CSS v4** — `@theme inline` tokens drive the K8S palette
  (deep navy, K8s blue, cyan)
- **shadcn/ui on `@base-ui/react`** — modern primitives with the `render`
  prop pattern instead of legacy `asChild`

</div>
<div class="card">

### Motion, Forms, SEO

- **Framer Motion 12** — scroll-reveal, staggered hero, animated
  architecture viz, `prefers-reduced-motion` respected
- **react-hook-form + zod** — typed, validated contact form
- **next-themes** — `dark` default, no flash on load
- **Dynamic OG image** + JSON-LD `Organization` schema + auto
  `robots.ts` / `sitemap.ts`
- **`pnpm`** for fast, deterministic installs

</div>
</div>

<span class="muted">Stack size after gzip: ~95 KB for the home page route.</span>

---

## Design & Architecture Decisions

<div class="cols">
<div class="card">

### Design Language

- **Palette**: deep navy `#0B1220`, K8s blue `#326CE5`, cyan `#06B6D4` —
  pulled from the Kubernetes brand and tightened for enterprise feel
- **Glassmorphism cards** + radial gradient backdrops + subtle grid
  overlay — premium, never cluttered
- **Typography stack**: Space Grotesk for headings (geometric, modern),
  Inter for body (highly legible), JetBrains Mono for eyebrows / labels
- **Custom SVG architecture viz** in the hero — animated K8s control
  plane, worker nodes, pulsing data flows. No image weight; scales
  perfectly on any screen

</div>
<div class="card">

### Architecture Decisions

- **`lib/site-config.ts`** holds every piece of copy → components are
  pure layout; copy changes don't touch JSX
- **`RevealOnScroll`** + shared `motion.ts` variants → consistent motion
  language across 10 sections without per-component boilerplate
- **Brand icons inlined** as React components — Lucide v1 dropped social
  icons, so `LinkedIn`/`GitHub`/`X` live in `src/components/brand-icons.tsx`
- **A11y by default**: semantic landmarks, `aria-labelledby`, focus rings,
  `prefers-reduced-motion`, JSON-LD for crawlers

</div>
</div>

---

## What Shipped + Live Demo

<div class="cols">
<div class="card">

### Page Sections (in order)

1. **Sticky Nav** — glass on scroll, mobile sheet menu, theme toggle
2. **Hero** — animated K8s architecture viz + 4 hero stats
3. **Trusted Technologies** — 12 tools, hover-animated
4. **Services** — 6 cards (Kubernetes, DevOps, Platform Eng…)
5. **Why Us** — 6 differentiators
6. **Case Studies** — 3 anonymized customer outcomes
7. **Delivery Process** — 4-step animated timeline
8. **Testimonials** — 3 enterprise quotes
9. **FAQ** — 6 questions, accordion
10. **Final CTA + Contact** — validated form, contact info, footer

</div>
<div class="card">

### Outcomes

- ✅ **Build:** zero TS errors, zero lint warnings
- ✅ **Bundle:** ~95 KB gzip, fonts subset & swap
- ✅ **SEO:** OG image, JSON-LD schema, sitemap, robots
- ✅ **A11y:** axe clean, full keyboard nav, reduced-motion aware

### Demo

```bash
pnpm dev    # http://localhost:3000
```

### Next Steps

- Wire contact form to a real backend (Resend)
- Add `/blog` route + MDX content pipeline
- Analytics + Lighthouse CI on each PR

</div>
</div>

<span class="muted">Code: `github.com/astropulse/k8s-systems-site` — built with Claude Code as a paired engineer.</span>
