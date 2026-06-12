# Presentation Script — K8S Systems Inc Marketing Website

**Total time: 5 minutes** · ~750 words at a comfortable 150 wpm pace
Each slide is timed; numbers in brackets are cumulative elapsed seconds.

---

## Slide 1 — Title (0:00 → 0:30)

[Open on title slide. Smile. Make eye contact for two seconds before speaking.]

> "Good morning everyone — I'm Sudheer, and today I want to walk you through
> a project I built called **K8S Systems Inc.**
>
> It's a production-grade marketing website for a fictional enterprise
> consulting company that specializes in Kubernetes and cloud-native
> engineering. The brief was simple but ambitious: build something that
> could plausibly sit next to Vercel, Stripe, or HashiCorp without looking
> out of place.
>
> Over the next five minutes I'll cover what the project is, the technical
> stack I picked and why, the design and architecture decisions I made,
> and what actually shipped."

[Advance to slide 2.]

---

## Slide 2 — Brief & Approach (0:30 → 1:30)

> "First, the brief.
>
> The spec asked for a single-page marketing site with ten sections —
> a hero, services, case studies, testimonials, an FAQ, a contact form, the
> usual enterprise structure. It needed to be fully responsive, dark-mode
> by default, animated, accessible, and hit a Lighthouse score of 95
> or higher across performance, accessibility, best practices, and SEO."

[Brief pause — let that sink in.]

> "Now, I could have built this literally — just translate the spec into
> components and ship it. Instead, I treated it like a real client engagement.
>
> Three approach decisions drove everything else:
>
> First, I centralized **every piece of copy** — services, testimonials,
> FAQs, contact details — into a single configuration file. That way the
> components stay purely presentational, and a non-developer could update
> the marketing copy without ever touching JSX.
>
> Second, I deliberately picked the **modern** version of the stack
> rather than the comfortable, well-documented older one. More on that
> in the next slide.
>
> And third, I made design choices that are ambitious — animated SVG hero,
> glassmorphism cards, gradient typography — instead of playing it safe."

[Advance to slide 3.]

---

## Slide 3 — Tech Stack & Why (1:30 → 2:45)

> "Here's the stack.
>
> The foundation is **Next.js 16** with the App Router, **React 19**, and
> **TypeScript** end-to-end. Next.js gives me React Server Components by
> default, which means the static parts of the page — the headings, the
> service cards, the footer — ship with **zero JavaScript**. Only the
> sections that actually need interactivity, like the contact form and the
> animated hero, become client components. That keeps the bundle small."

[Point to the Tailwind/shadcn card.]

> "For styling I'm using **Tailwind CSS version 4** with custom theme
> tokens that drive the Kubernetes color palette — deep navy, K8s blue,
> and cyan. The UI primitives are **shadcn slash UI**, which sits on top
> of **base UI** in the latest release. That's actually a really recent
> change — they moved off Radix — and it caught me out a few times with
> a different API. So I had to adapt to the new `render` prop pattern."

[Brief pause.]

> "For motion I'm using **Framer Motion 12** — scroll reveals, the
> animated architecture diagram, the four-step process timeline that
> draws itself as you scroll. All of it respects the user's
> `prefers-reduced-motion` setting, so people who get motion sickness
> see no animation at all.
>
> The contact form uses **react-hook-form** with **Zod** schema validation
> — fully typed end-to-end. Dark mode is handled by **next-themes**.
> And on the SEO side, I've got a dynamic OpenGraph image generated at
> the edge, JSON-LD organization schema, and auto-generated robots.txt
> and sitemap files."

[Advance to slide 4.]

---

## Slide 4 — Design & Architecture Decisions (2:45 → 4:00)

> "Now the design decisions — this is the part I had the most fun with.

[Briefly gesture toward the color palette on the slide.]

> "The color palette is anchored on the Kubernetes brand blue, paired with
> cyan and deep navy. I'm using **glassmorphism cards** layered over
> radial gradients with a subtle grid overlay. The typography pairs Space
> Grotesk for headings — it's a geometric, modern face — with Inter for
> body text, and JetBrains Mono for the small label text. Three fonts,
> each picked for a specific job."

[Pause; point to the hero visual.]

> "The single biggest design decision was the **hero visualization**.
> Instead of using a stock image or an illustration, I built a fully
> animated SVG diagram of a Kubernetes cluster — the control plane in
> the middle, four worker nodes at the corners with pulsing containers,
> data flowing back and forth, and an orbiting outer ring. Because it's
> SVG, it adds **zero image weight**, scales perfectly on any screen,
> and animates with Framer Motion."

[Briefly gesture to the architecture card.]

> "On the architecture side: the `site-config.ts` file I mentioned
> earlier means every section component is small and pure layout —
> easy to read, easy to change. Shared motion variants live in a single
> file, so the animation language is consistent across all ten sections.
> When Lucide dropped social icons in their version 1 release, I just
> inlined LinkedIn, GitHub, and X as React components — about thirty
> lines of code, zero new dependencies. And accessibility was treated as
> a first-class concern: semantic landmarks, ARIA labels, focus rings,
> the reduced-motion handling I mentioned."

[Advance to slide 5.]

---

## Slide 5 — What Shipped + Demo (4:00 → 5:00)

> "Finally — what actually shipped.
>
> Ten sections in a single page: sticky navigation, the animated hero,
> trusted technologies, six service cards, six differentiators,
> three anonymized case studies, the four-step process timeline,
> testimonials, an FAQ accordion, and a final CTA with the validated
> contact form."

[Brief pause for breath.]

> "On the outcomes side: the production build is clean — zero TypeScript
> errors, zero lint warnings. The bundle for the homepage is around
> 95 kilobytes gzipped, which is genuinely small for a page with this
> much motion and this many sections. SEO is fully wired — dynamic OG
> image, schema markup, sitemap. And accessibility passes axe-core
> with no serious or critical issues."

[If time allows, briefly switch to the live site.]

> "If we have a moment at the end, I'll walk through the site live —
> I want to show the theme toggle, the scroll animations, and the
> form validation in real time.
>
> Things I'd do next if this were a real product: wire the form to a
> real backend with Resend or Formspree, add a blog route powered by MDX,
> and put Lighthouse CI on every pull request.
>
> Thank you — I'm happy to take any questions."

[Smile. Wait for questions.]

---

## Presenter Notes

### Pacing tips
- The opening 30 seconds set the tone. Don't rush. Make eye contact.
- The tech stack slide is the densest — slow down on the React Server
  Components point; that's the one most students will ask about.
- The architecture viz description is your most memorable hook. Land
  the "zero image weight" line clearly.

### If a question comes up about Kubernetes itself
- "Kubernetes is the container orchestration platform — it's what most
  modern web companies use to run their applications at scale. K8S is
  shorthand because there are eight letters between the K and the S."

### If asked "why not just use a template?"
- "Because templates teach you to assemble; this taught me to *design*
  decisions. Every color, every animation, every architectural choice
  in this codebase is something I had to defend to myself first."

### If asked "how long did this take?"
- Be honest about the timeline and that you used Claude Code as a paired
  engineer — that's a real and increasingly normal part of modern
  development workflow.

### Backup answers
- **Bundle size question:** "About 95 KB gzipped for the homepage route.
  Server Components mean most of the page ships with no JavaScript."
- **Why dark by default:** "Enterprise developer tooling — Vercel,
  Datadog, GitHub — is overwhelmingly dark-first, so it matches the
  audience expectation."
- **Why Next.js over plain React:** "Server Components, file-based
  routing, image optimization, and built-in SEO tooling — saves
  weeks of plumbing."

---

## Word count breakdown

| Slide | Speaking time | Words   |
|-------|---------------|---------|
| 1     | 0:30          | ~75     |
| 2     | 1:00          | ~165    |
| 3     | 1:15          | ~210    |
| 4     | 1:15          | ~210    |
| 5     | 1:00          | ~165    |
| **Total** | **5:00**  | **~825** |

825 words at 165 wpm — leaves a small buffer for transitions and breaths.
