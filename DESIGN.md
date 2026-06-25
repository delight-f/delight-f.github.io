---
name: Amnestic Anaesthesia
description: Professional multi-page static site for Dr Faraaz de Belder, specialist anaesthetist
colors:
  primary: "#167a6e"
  primary-dark: "#0e544b"
  accent: "#168a7a"
  accent-warm: "#e8835a"
  surface: "#fafafa"
  surface-card: "#f0f1f2"
  surface-dark: "#0f1419"
  text: "#16181a"
  text-muted: "#58636d"
  text-on-dark: "#e2e6ea"
  border: "#d6d9db"
  error: "#c94a4a"
  success: "#4a8c6f"
typography:
  display:
    fontFamily: '"Source Serif 4", Georgia, "Times New Roman", serif'
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: 0.875rem
    fontWeight: 600
    letterSpacing: 0.08em
    textTransform: uppercase
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
components:
  button-primary:
    backgroundColor: "{colors.accent-warm}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "8px 32px"
    typography: "{typography.body}"
    fontWeight: 500
  button-primary-hover:
    backgroundColor: "#be5533"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "8px 32px"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.accent-warm}"
    rounded: "{rounded.md}"
    border: "2px solid {colors.accent-warm}"
    padding: "8px 32px"
  nav-link:
    textColor: "{colors.text-on-dark}"
    typography: "{typography.label}"
    fontWeight: 500
    textTransform: none
  nav-link-active:
    textColor: "{colors.text-on-dark}"
    underlineColor: "{colors.accent}"
  input:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    typography: "{typography.body}"
  card:
    rounded: "{rounded.sm}"
    padding: "16px 0"
    borderBottom: "1px solid {colors.border}"
  social-link:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    size: "3rem"
  social-link-hover:
    backgroundColor: "#0077b5"
    textColor: "{colors.surface}"
---

# Design System: Amnestic Anaesthesia

## 1. Overview

**Creative North Star: "The Consultant's Desk"**

The design sits across a real desk in a real consulting room — not a showroom, not a hospital ward. The papers are arranged. The credentials are visible. The handshake comes next. Every decision lands on the spectrum between clinical precision (anaesthesia, evidence-based medicine) and human warmth (patient care, GP background).

The system explicitly rejects: generic medical templates, single-page scroll patterns, AI-template defaults (warm cream + terracotta), and cold institutional blue schemes. It is a doctor speaking directly to colleagues and patients, not a hospital marketing page.

**Key Characteristics:**
- Editorial confidence — content dictates layout, not templates
- Multi-page architecture with distinct URLs and purpose per page
- One CTA per page — frictionless conversion, no competing actions
- Restrained motion — hero photo fade-in, card hover zoom, nothing decorative
- Dark mode as first-class, not a bolt-on

## 2. Colors: The Teal & Coral Palette

A deliberate pairing that avoids the medical default of navy-blue-and-white. The teal-green (`#167a6e`) anchors the clinical side — authoritative, structured, trustworthy. The coral (`#e8835a`) introduces human warmth — approachable, confident, warm.

### Primary
- **Deep Teal** (`#167a6e`): Primary brand colour. Used for section headings, card titles, and the specialities border-top separator. Carries the clinical authority.
- **Dark Teal** (`#0e544b`): Navigation bar background. One step darker than primary for a solid fixed anchor at the top of every page.

### Accent
- **Teal Accent** (`#168a7a`): Links, focus rings, and interactive indicators. Slightly brighter than primary for affordance.
- **Coral** (`#e8835a`): Primary CTA buttons. The only warm accent — intentionally contrasts with the teal palette to signal action.
- **Coral Hover** (`#be5533`): Button hover state. Darker for interaction feedback.

### Neutral
- **Off-white** (`#fafafa`): Page backgrounds and section surfaces.
- **Card Surface** (`#f0f1f2`): Subtle card backgrounds for supporting elements.
- **Near-black** (`#16181a`): Body text — full readability without pure black (`#000`).
- **Muted Text** (`#58636d`): Secondary text, credentials, descriptions, copyright. Darkened to pass WCAG AA at small sizes.
- **Subtle Border** (`#d6d9db`): Dividers, hairline borders, card bottom edges.

### Dark Mode
Dark mode inverts surfaces while keeping the nav dark and the accent coral. Surface becomes a cool dark (`#121618`), text becomes warm light (`#d6dadd`), and the teal accent lightens (`#2ea99a`) for readability against dark backgrounds.

### Named Rules
**The One CTA Rule.** Coral is reserved exclusively for the primary call to action on each page. It appears once per page — on the home hero, on the contact form. Overuse would dilute its stopping power.

## 3. Typography

**Display Font:** Source Serif 4 (with Georgia, Times New Roman fallback)
**Body Font:** Work Sans (with -apple-system, BlinkMacSystemFont, Segoe UI fallback)
**Utility Font:** Work Sans, semibold at 0.875rem

**Character:** Source Serif 4 carries the precision — a structured serif designed for long-form reading, with optical sizes that keep it elegant at both 4rem display sizes and 1.5rem subheadings. Work Sans softens it with a humanist warmth that never veers into cold geometry. The pairing reads as a medical textbook written by someone who cares about the patient's name.

### Hierarchy
- **Display** (500 weight, `clamp(2.5rem, 5vw, 4rem)`, 1.2 line-height): The hero title "Amnestic Anaesthesia". Used on the home page only.
- **Headline** (500 weight, 2.5rem, 1.2 line-height): Section headings (About me, Training & experience, Get in touch). `text-wrap: balance` for even line lengths.
- **Title** (500 weight, 1.5rem, 1.2 line-height): Subheadings within sections (bio h3s, card titles). Teal colour.
- **Body** (400 weight, 1rem, 1.7 line-height): All body paragraphs. Max width 70ch on reading columns. `text-wrap: pretty` to reduce orphans.
- **Label** (600 weight, 0.875rem, 0.08em letter-spacing, uppercase): Credential group labels. Compact. Used sparingly.
- **Small** (400 weight, 0.875rem, 1.4 line-height): Secondary text, card descriptions, footer copyright. Muted colour.

## 4. Elevation

The system is intentionally flat. Depth is conveyed through tonal surface changes, not shadows. Cards and sections distinguish themselves through background colour shifts (off-white → card surface) rather than drop shadows.

### Shadow Vocabulary
- **Photo Shadow** (`0 4px 12px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.06)`): Applied exclusively to the hero circular photo. The only element with a visible shadow — it elevates the photo as the single anchor of trust on the home page.
- **Nav Shadow** (`--shadow-lg`): Applied to the mobile nav dropdown to separate it from the page content below. Functional, not decorative.

No shadows appear on cards, buttons, or any other surface. Flat-by-default is intentional.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The hero photo is the only element that earns a shadow — it's the doctor's presentation of self. Everything else relies on tonal background shifts for separation.

## 5. Components

### Buttons
- **Shape:** Gently curved edges (8px radius). 2px border on ghost variant.
- **Primary (Coral):** Coral background (`#e8835a`), white text, 500 weight. Hover shifts to a deeper coral (`#be5533`). Active state presses down 1px.
- **Ghost:** Transparent background, coral border and text. Hover fills with coral.
- **Width:** `inline-flex` by default, full-width on mobile (≤768px).
- **States:** `:focus-visible` shows a teal ring. Disabled state at 50% opacity, no pointer events.

### Navigation
- **Structure:** Fixed top bar, 3.5rem tall, dark teal (`#0e544b`). Horizontal links on desktop, hamburger drawer on mobile.
- **Links:** Work Sans, 1.125rem, 500 weight. White text at rest. Hover adds a subtle white background tint at 8% opacity.
- **Active state:** A teal (`#168a7a`) underline bar (1.2rem × 2px) centred below the link text. In mobile drawer, the underline is hidden — active state is text-only.
- **Mobile:** Hamburger toggle at 768px breakpoint. Dropdown drawer with stacked links. `aria-expanded` controlled by JavaScript.

### Cards (Qualification Cards)
- **Style:** Editorial, no card background. Transparent with a bottom hairline border (`1px solid #d6d9db`) on the body.
- **Image:** 3:2 aspect ratio, 4px corner rounding. Subtle zoom (scale 1.04) on hover. Image zoom disabled with `prefers-reduced-motion`.
- **Content:** Title in Source Serif 4, 1.25rem, teal. Description in Work Sans, 1rem, muted text.
- **Grid:** 3-column on desktop, 2-column on tablet (769-1024px), 1-column on mobile.

### Hero Section
- **Layout:** Two-column grid (1.1fr photo : 1.9fr content) on desktop, single column centred on mobile. Tablet transitions with reduced photo (18rem) and title (3rem).
- **Photo:** Circular, 26rem desktop / 14rem mobile. 1px border frame as an inner `::after` pseudoelement. Fades in on load with a subtle scale (0.6s ease-out).
- **Credentials:** Work Sans, 0.875rem, muted text, 0.03em letter-spacing. Dot-separated list of qualification codes.
- **CTA:** Single coral button — "Get in touch". One action per page.

### Form Inputs
- **Style:** White background, 1px solid `#d6d9db` border, 8px radius. 1rem Work Sans text.
- **Focus:** Teal border + 3px teal glow at 20% opacity. No outline (focus-visible outline is separate).
- **Error:** Red border (`#c94a4a`) + red glow. Error message below field in red.
- **Labels:** Work Sans, 1rem, 600 weight. Above the field. `for`/`id` association.
- **Textarea:** 10rem min-height, vertical resize only.

### Footer
- **Style:** Compact, single line. Email link, LinkedIn icon, copyright — all in one centred flex row. Collapses to stacked column on mobile.
- **Background:** Matches page surface (`#fafafa`). 1.5rem padding top and bottom.
- **Social link:** 2rem × 2rem in footer context (smaller than standalone use).

## 6. Do's and Don'ts

### Do:
- **Do** use the coral button exactly once per page — as the primary CTA.
- **Do** keep the hero photo as the only shadowed element on the page.
- **Do** maintain the teal-coral pairing; never add a third accent colour.
- **Do** use Source Serif 4 for all headings and Work Sans for all body copy.
- **Do** respect the multi-page architecture — each page has a distinct URL, purpose, and canonical.
- **Do** test dark mode — all surfaces and form inputs should invert properly.

### Don't:
- **Don't** use gradient text, glassmorphism, or decorative blurs.
- **Don't** add entrance animations or scroll-triggered reveals — the hero fade-in is the only motion.
- **Don't** place image borders or side-stripe accents on cards.
- **Don't** use the single-page scroll pattern — this was explicitly rejected in favour of multi-page.
- **Don't** expose the email address in plain text — contact is form-only.
- **Don't** add more than one CTA per page — competing actions reduce conversion.
- **Don't** use card grids with identical icon-heading-text patterns (the previous design had this; it was removed).
- **Don't** fall back to medical-template defaults (stock photos, blue-white schemes, clip-art caduceus).
