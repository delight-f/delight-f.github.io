# Tasks — amnestic.org Refresh Implementation Guide

All work goes in the `/refresh` directory. The production site is read-only reference.

---

## Phase 0 — Project Setup

### TASK-000: Scaffold the refresh directory

Create the file and folder structure under `/refresh`:

```
refresh/
├── index.html                          (single-page HTML)
├── favicon.ico                         (copy from root)
├── src/
│   └── assets/
│       ├── css/
│       │   └── styles.css              (all styles, single file)
│       ├── js/
│       │   └── main.js                 (all JS, single file)
│       └── images/
│           ├── me.jpg / me.webp        (hero photo)
│           ├── barts.png / barts.webp
│           ├── anaesthesia.jpg / anaesthesia.webp
│           ├── gp.jpg / gp.webp
│           ├── winch.png / winch.webp
│           ├── tropical.jpg / tropical.webp
│           └── geriatric.jpg / geriatric.webp
```

**Files to create:** directory tree, empty `styles.css`, empty `main.js`, skeleton `index.html` (just `<head>` with meta tags + empty `<body>`).

**Copy images** from the original production site's asset folder. Keep WebP + fallback format.

---

## Phase 1 — CSS Foundation

### TASK-001: Declare design tokens in `:root`

Open `src/assets/css/styles.css`. Add a `:root` block with every variable listed below. These are your single source of truth — never use raw values elsewhere.

**Colours:**
```css
--color-primary:       #1a3b4c;    /* Deep teal-navy */
--color-primary-dark:  #122a38;    /* Nav/surfaces */
--color-accent:        #c4956a;    /* Warm gold */
--color-accent-hover:  #b58454;    /* Hover state */
--color-surface:       #ffffff;
--color-surface-warm:  #f5f2ec;    /* Off-white sections */
--color-surface-card:  #ede9e0;    /* Card backgrounds */
--color-surface-dark:  #1c2632;    /* Contact section */
--color-text:          #1e2328;
--color-text-muted:    #5a6570;
--color-text-on-dark:  #c8cdd3;
--color-heading-dark:  #edf0f3;
--color-border:        #e5e0d6;
--color-border-dark:   rgba(255,255,255,0.08);
--color-error:         #c94a4a;
--color-success:       #4a8c6f;
```

**Typography:**
```css
--font-display: "IBM Plex Serif", Georgia, "Times New Roman", serif;
--font-body:    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--text-xs:      0.75rem;
--text-sm:      0.875rem;
--text-base:    1rem;
--text-lg:      1.125rem;
--text-xl:      1.25rem;
--text-2xl:     1.5rem;
--text-3xl:     2rem;
--text-4xl:     2.5rem;
--text-5xl:     3.5rem;
--line-height-body:   1.7;
--line-height-heading: 1.2;
--line-height-small:  1.4;
--weight-normal:   400;
--weight-medium:   500;
--weight-semibold: 600;
```

**Spacing:**
```css
--space-xs:  0.25rem;
--space-sm:  0.5rem;
--space-md:  1rem;
--space-lg:  1.5rem;
--space-xl:  2rem;
--space-2xl: 3rem;
--space-3xl: 4rem;
--space-4xl: 6rem;
--space-5xl: 8rem;
--section-py: var(--space-4xl);
--section-px: var(--space-2xl);
```

**Layout + Shadows + Radii:**
```css
--container-max:   72rem;
--container-narrow: 48rem;
--shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06);
--shadow-md: 0 4px 6px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.08);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08);
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-full: 9999px;
--transition-fast:  0.2s ease;
--transition-base:  0.3s ease;
```

**Check:** Every value uses a `--var()`. No raw hex, px, or colour values exist outside `:root`.

---

### TASK-002: Write CSS reset and base element styles

Below the `:root` block, add a modern CSS reset:

| Rule | What to do |
|---|---|
| `*, *::before, *::after` | `box-sizing: border-box; margin: 0; padding: 0` |
| `html` | `scroll-behavior: smooth` (but JS also handles this — fine as backup) |
| `body` | Font: `var(--font-body)`, size: `var(--text-base)`, colour: `var(--color-text)`, line-height: `var(--line-height-body)`, background: `var(--color-surface)`. Add `-webkit-font-smoothing: antialiased` |
| `img, picture, video, canvas, svg` | `display: block; max-width: 100%` |
| `input, button, textarea, select` | `font: inherit` — inherit font from body |
| `a` | `color: var(--color-accent); text-decoration: none` |
| `a:hover` | `color: var(--color-accent-hover)` |
| `a:focus-visible` | `outline: 2px solid var(--color-accent); outline-offset: 2px` |
| `h1, h2, h3, h4, h5, h6` | `font-family: var(--font-display); line-height: var(--line-height-heading); color: var(--color-text); text-wrap: balance` |
| `h1` | `font-size: var(--text-4xl)` |
| `h2` | `font-size: var(--text-3xl)` |
| `h3` | `font-size: var(--text-2xl)` |
| `p, ul, ol, dl` | `margin-bottom: var(--space-md)` |
| `::selection` | `background: var(--color-accent); color: var(--color-surface)` |
| `:focus-visible` (global) | `outline: 2px solid var(--color-accent); outline-offset: 2px` |

**Critical:** Do NOT use raw font sizes in the reset. Always reference `--text-*` tokens.

---

### TASK-003: Build layout utility classes

Add these CSS classes below the reset:

```css
.container {
    width: 100%;
    max-width: var(--container-max);
    margin: 0 auto;
    padding-left: var(--section-px);
    padding-right: var(--section-px);
}
.container--narrow { max-width: var(--container-narrow); }

.grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
}
.grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
}

.section { padding-top: var(--section-py); padding-bottom: var(--section-py); }
.section--warm { background-color: var(--color-surface-warm); }
.section--dark { background-color: var(--color-surface-dark); color: var(--color-text-on-dark); }
.section--dark h1, .section--dark h2, .section--dark h3,
.section--dark h4, .section--dark h5, .section--dark h6 {
    color: var(--color-heading-dark);
}

.section__header { text-align: center; margin-bottom: var(--space-3xl); }
.section__label {
    display: block; font-family: var(--font-body);
    font-size: var(--text-sm); font-weight: var(--weight-semibold);
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--color-accent); margin-bottom: var(--space-sm);
}
.section__title { font-size: var(--text-4xl); margin-bottom: 0; }

.skip-link {
    background: var(--color-surface); color: var(--color-text);
    font-weight: var(--weight-semibold); left: var(--space-md);
    padding: var(--space-sm) var(--space-md); position: absolute;
    top: -100%; z-index: 10000; text-decoration: none;
    border-radius: var(--radius-sm);
}
.skip-link:focus { top: var(--space-md); }

.sr-only {
    border: 0; clip: rect(0,0,0,0); height: 1px; margin: -1px;
    overflow: hidden; padding: 0; position: absolute; width: 1px;
}
```

**Responsive (at bottom of layout section):**
```css
@media screen and (max-width: 768px) {
    :root {
        --text-5xl: 2.5rem; --text-4xl: 2rem;
        --text-3xl: 1.5rem; --text-2xl: 1.25rem;
        --section-py: var(--space-3xl);
        --section-px: var(--space-lg);
    }
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
    .grid-3 { grid-template-columns: 1fr 1fr; }
}
```

---

## Phase 2 — Global Components

### TASK-004: Add Google Fonts to `<head>`

In `index.html`, add inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Serif:wght@500&display=swap" rel="stylesheet" />
```

Also add the `@import` in `styles.css` as a fallback (it won't duplicate requests thanks to the preconnect hints):

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Serif:wght@500&display=swap");
```

---

### TASK-005: Build navigation — HTML

In `index.html`, add this nav structure right after the skip-link:

```html
<nav class="nav" role="navigation" aria-label="Main navigation">
    <div class="container">
        <button type="button" class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
        </button>
        <ul class="nav__list" role="list">
            <li><a href="#top" class="nav__link nav__link--active" aria-current="page">Home</a></li>
            <li><a href="#work" class="nav__link">About</a></li>
            <li><a href="#portfolio" class="nav__link">Qualifications</a></li>
            <li><a href="#contact" class="nav__link">Contact</a></li>
        </ul>
    </div>
</nav>
```

**Why:** The first `<li>` has `nav__link--active` and `aria-current="page"` server-side as a default, so the nav always starts with a highlighted link.

---

### TASK-006: Build navigation — CSS

```css
.nav {
    position: fixed; top: 0; left: 0; width: 100%;
    z-index: 10000;
    background-color: var(--color-primary-dark);
    height: 3.5rem; line-height: 3.5rem;
}
.nav .container {
    display: flex; align-items: center;
    justify-content: space-between; height: 100%;
}
.nav__list {
    display: flex; gap: var(--space-xs);
    list-style: none; padding: 0; margin: 0;
}
.nav__link {
    display: block; padding: 0 var(--space-lg);
    color: var(--color-text-on-dark); text-decoration: none;
    font-family: var(--font-body); font-weight: var(--weight-medium);
    font-size: var(--text-sm); border-radius: var(--radius-sm);
    transition: color var(--transition-fast), background-color var(--transition-fast);
    position: relative;
}
.nav__link:hover, .nav__link:focus-visible { color: var(--color-accent); background-color: rgba(255,255,255,0.05); }
.nav__link--active { color: var(--color-accent); }
.nav__link--active::after {
    content: ""; position: absolute; bottom: 0.6rem; left: 50%;
    transform: translateX(-50%); width: 0.4rem; height: 0.4rem;
    border-radius: 50%; background-color: var(--color-accent);
}

/* Hamburger: hidden on desktop */
.nav__toggle {
    display: none; background: none; border: 0; cursor: pointer;
    padding: var(--space-sm); color: var(--color-text-on-dark);
    width: 2.5rem; height: 2.5rem;
}
.nav__toggle svg { width: 1.5rem; height: 1.5rem; fill: currentColor; display: block; }

/* Add focus-visible to nav toggle (critical for keyboard users) */
.nav__toggle:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
```

**Mobile overrides (at bottom of nav CSS):**
```css
@media screen and (max-width: 768px) {
    .nav { height: 3rem; line-height: 3rem; }
    .nav__toggle { display: block; }
    .nav__list {
        display: none; position: absolute; top: 3rem; left: 0;
        width: 100%; flex-direction: column;
        background-color: var(--color-primary-dark);
        gap: 0; padding: var(--space-sm) 0;
        box-shadow: var(--shadow-lg);
    }
    .nav__list--open { display: flex; }
    .nav__link {
        padding: var(--space-sm) var(--space-lg);
        line-height: 1.5; border-radius: 0;
    }
    .nav__link--active::after { display: none; }
}
```

---

### TASK-007: Build button system — CSS

```css
.btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--space-sm); padding: var(--space-sm) var(--space-xl);
    font-family: var(--font-body); font-weight: var(--weight-medium);
    font-size: var(--text-base); line-height: 1.5;
    text-decoration: none; border: 2px solid transparent;
    border-radius: var(--radius-md); cursor: pointer;
    transition: background-color var(--transition-fast),
                color var(--transition-fast),
                box-shadow var(--transition-fast),
                transform var(--transition-fast);
}
.btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

.btn--primary {
    background-color: var(--color-accent); color: var(--color-surface);
    border-color: var(--color-accent);
}
.btn--primary:hover { background-color: var(--color-accent-hover); border-color: var(--color-accent-hover); }
.btn--primary:active { transform: scale(0.98); }

.btn--ghost {
    background-color: transparent; color: var(--color-accent);
    border-color: var(--color-accent);
}
.btn--ghost:hover { background-color: rgba(196, 149, 106, 0.1); }

.btn:disabled, .btn[aria-disabled="true"] {
    opacity: 0.5; cursor: not-allowed; pointer-events: none;
}

@media screen and (max-width: 768px) {
    .btn { width: 100%; justify-content: center; }
}
```

---

### TASK-008: Build waveform divider — CSS

This is the signature visual element — a subtle animated ECG-like waveform between sections.

```css
.divider {
    display: block; width: 100%; height: 3rem;
    overflow: hidden; line-height: 0;
}
.divider__svg {
    width: 200%; height: 100%; display: block;
    animation: divider-pan 8s linear infinite;
}
.divider__svg .waveform-path {
    fill: none; stroke: var(--color-accent);
    stroke-width: 2; opacity: 0.15;
}

@keyframes divider-pan {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
    .divider__svg { animation: none; }
    .divider .waveform-path { opacity: 0.1; }
}

@media screen and (max-width: 768px) {
    .divider { height: 1.5rem; }
    .divider__svg { animation: none; }
    .divider .waveform-path { opacity: 0.08; }
}
```

**HTML to insert between sections** (after hero, after about, after qualifications):

```html
<div class="divider" aria-hidden="true">
    <svg class="divider__svg" preserveAspectRatio="none" viewBox="0 0 2400 48" xmlns="http://www.w3.org/2000/svg">
        <path class="waveform-path" d="M0 24 Q 150 0, 300 24 T 600 24 T 900 24 T 1200 24 T 1500 24 T 1800 24 T 2100 24 T 2400 24" />
        <path class="waveform-path" d="M0 24 Q 150 48, 300 24 T 600 24 T 900 24 T 1200 24 T 1500 24 T 1800 24 T 2100 24 T 2400 24" opacity="0.5" />
    </svg>
</div>
```

---

## Phase 3 — Page Sections

### TASK-009: Build hero section — HTML + CSS

**HTML structure** (inside `<main id="main-content">`):

```html
<section class="hero animate-in" id="top">
    <div class="container hero__container">
        <div class="hero__photo">
            <picture>
                <source srcset="src/assets/images/me.webp" type="image/webp" />
                <img fetchpriority="high" src="src/assets/images/me.jpg" width="320" height="320" alt="Dr Faraaz Richard de Belder" />
            </picture>
        </div>
        <div class="hero__content">
            <h1 class="hero__title">Amnestic Anaesthesia</h1>
            <p class="hero__credentials">Dr Faraaz Richard de Belder<br />MBBS FANZCA FRACGP DipPHRM DIMC DTM&amp;H DGM DRCOG</p>
            <p class="hero__tagline">Delivering quality anaesthesia, retrieval and critical care medicine.</p>
            <a href="#contact" class="btn btn--primary">Get in touch</a>
        </div>
    </div>
</section>
```

**CSS:**

```css
.hero {
    padding-top: calc(var(--section-py) + 3.5rem); /* offset for fixed nav */
    padding-bottom: var(--section-py);
    background-color: var(--color-surface);
}
.hero__container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-3xl);
    align-items: center;
}
.hero__photo {
    width: 100%; max-width: 20rem;
    border-radius: var(--radius-full);
    overflow: hidden; aspect-ratio: 1 / 1;
    box-shadow: var(--shadow-lg); margin: 0 auto;
}
.hero__photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero__content { max-width: 45rem; }
.hero__title {
    font-family: var(--font-display); font-size: var(--text-5xl);
    font-weight: var(--weight-medium);
    line-height: var(--line-height-heading); color: var(--color-text);
    margin-bottom: var(--space-md); text-wrap: balance;
}
.hero__credentials {
    font-family: var(--font-body); font-size: var(--text-sm);
    color: var(--color-text-muted); text-transform: uppercase;
    letter-spacing: 0.08em; margin-bottom: var(--space-lg);
    line-height: var(--line-height-small);
    overflow-wrap: break-word;  /* prevents long credential string from overflowing */
}
.hero__tagline {
    font-size: var(--text-lg); color: var(--color-text);
    margin-bottom: var(--space-xl); max-width: 40rem;
}

@media screen and (max-width: 768px) {
    .hero { padding-top: calc(var(--section-py) + 3rem); text-align: center; }
    .hero__container { grid-template-columns: 1fr; gap: var(--space-xl); }
    .hero__photo { max-width: 14rem; }
    .hero__title { font-size: var(--text-4xl); }
    .hero__content { max-width: 100%; }
    .hero__tagline { margin-left: auto; margin-right: auto; }
}
```

---

### TASK-010: Build about section — HTML + CSS

**HTML structure:**

```html
<section class="about section animate-in" id="work">
    <div class="container">
        <div class="section__header">
            <span class="section__label">About</span>
            <h2 class="section__title">Background</h2>
        </div>

        <div class="bio">
            <div class="bio__text">
                <h3>Anaesthetist &amp; Retrieval Physician</h3>
                <p>Faraaz is a Queensland-trained specialist anaesthetist who places modern, evidence-based practice at the centre of his care...</p>
                <h3>Training &amp; Background</h3>
                <p>Faraaz graduated in 2012 from the University of London with two Distinctions, four Merits, and a Prize for Academic Excellence...</p>
                <h3>Qualifications &amp; Appointments</h3>
                <p>In addition to his Fellowships, Faraaz holds five postgraduate diplomas...</p>
                <h3>Regional &amp; Remote Care</h3>
                <p>After choosing to specialise in anaesthesia, Faraaz was accepted into the Queensland Central Rotation...</p>
                <p>Faraaz brings a holistic approach to patient care, shaped by his background in general practice...</p>
            </div>

            <aside class="bio__fact-panel">
                <!-- 5 fact items with icon + label + value -->
                <div class="fact">
                    <span class="fact__icon" aria-hidden="true"><!-- SVG icon --></span>
                    <div class="fact__content">
                        <span class="fact__label">Qualification</span>
                        <span class="fact__value">MBBS, FANZCA, FRACGP</span>
                    </div>
                </div>
                <!-- Repeat for: Postgraduate Diplomas (5), Academic Role (Senior Lecturer, Griffith), Aeromedical Role (RFDS Consultant), Year Graduated (2012) -->
            </aside>
        </div>

        <!-- Feature cards -->
        <div class="feature-grid">
            <div class="feature-card animate-in animate-in--delay-1">
                <span class="feature-card__icon" aria-hidden="true"><!-- SVG --></span>
                <h3 class="feature-card__title">Specialist Anaesthetist</h3>
                <p class="feature-card__body">Australian-trained consultant anaesthetist...</p>
            </div>
            <div class="feature-card animate-in animate-in--delay-2">
                <span class="feature-card__icon" aria-hidden="true"><!-- SVG --></span>
                <h3 class="feature-card__title">Prehospital &amp; Retrieval Medicine</h3>
                <p class="feature-card__body">Experienced specialist in both aeromedical and ground...</p>
            </div>
            <div class="feature-card animate-in animate-in--delay-3">
                <span class="feature-card__icon" aria-hidden="true"><!-- SVG --></span>
                <h3 class="feature-card__title">Specialist General Practitioner</h3>
                <p class="feature-card__body">Specialist qualifications from both Australia and the UK...</p>
            </div>
        </div>
    </div>
</section>
```

**CSS:**

```css
.about { background-color: var(--color-surface-warm); }

.bio {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-3xl);
    margin-bottom: var(--space-4xl);
}

.bio__text {
    max-width: 38rem;  /* limits line length for reading comfort */
}
.bio__text h3 {
    font-family: var(--font-display); font-size: var(--text-2xl);
    color: var(--color-primary); margin-top: var(--space-xl);
    margin-bottom: var(--space-sm);
}
.bio__text h3:first-child { margin-top: 0; }
.bio__text p { margin-bottom: var(--space-lg); }

.bio__fact-panel {
    background-color: var(--color-surface-card);
    border-radius: var(--radius-lg); padding: var(--space-xl);
    box-shadow: var(--shadow-sm); align-self: start;
    position: sticky; top: calc(3.5rem + var(--space-xl));
}

.fact {
    display: flex; align-items: flex-start; gap: var(--space-md);
    padding: var(--space-md) 0;
    border-bottom: 1px solid var(--color-border);
}
.fact:last-child { border-bottom: 0; padding-bottom: 0; }
.fact__icon { flex-shrink: 0; width: 1.25rem; height: 1.25rem; display: flex; align-items: center; justify-content: center; color: var(--color-accent); margin-top: 0.15em; }
.fact__icon svg { width: 100%; height: 100%; fill: currentColor; display: block; }
.fact__content { flex: 1; }
.fact__label { font-size: var(--text-sm); color: var(--color-text-muted); display: block; margin-bottom: var(--space-xs); }
.fact__value { font-weight: var(--weight-semibold); color: var(--color-text); font-size: var(--text-base); }

.feature-grid { margin-top: var(--space-2xl); }
.feature-card {
    background-color: var(--color-surface); border-radius: var(--radius-lg);
    padding: var(--space-2xl) var(--space-xl);
    border-top: 4px solid var(--color-accent);
    box-shadow: var(--shadow-md);
    transition: box-shadow var(--transition-base), transform var(--transition-base);
    display: flex; flex-direction: column; align-items: center; text-align: center;
}
.feature-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.feature-card__icon { width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; color: var(--color-accent); margin: 0 auto var(--space-md); }
.feature-card__icon svg { width: 100%; height: 100%; fill: currentColor; display: block; }
.feature-card__title { font-family: var(--font-display); font-size: var(--text-xl); margin-bottom: var(--space-sm); }
.feature-card__body {
    font-size: var(--text-base);  /* was 0.875rem in v1 — readability fix */
    color: var(--color-text-muted);
    line-height: var(--line-height-small);
    text-align: center;
    max-width: 38ch;
}

@media screen and (max-width: 768px) {
    .bio { grid-template-columns: 1fr; gap: var(--space-xl); }
    .bio__fact-panel { position: static; top: auto; }
    .feature-card { padding: var(--space-lg); }
}
```

**Important:** All `<img>` in feature cards MUST use `alt=""` (decorative) since the card text already describes the content. Do NOT repeat text in alt attributes.

---

### TASK-011: Build qualifications section — HTML + CSS

**HTML structure:**

```html
<section class="qualifications section animate-in" id="portfolio">
    <div class="container">
        <div class="section__header">
            <span class="section__label">Qualifications</span>
            <h2 class="section__title">Qualifications &amp; training</h2>
        </div>

        <div class="grid-3">
            <div class="qual-card animate-in animate-in--delay-1">
                <span class="qual-card__image">
                    <picture>
                        <source srcset="src/assets/images/barts.webp" type="image/webp" />
                        <img loading="lazy" src="src/assets/images/barts.png" alt="" />
                    </picture>
                </span>
                <div class="qual-card__body">
                    <h3 class="qual-card__title">Undergraduate Training</h3>
                    <p class="qual-card__description">Graduated from the prestigious University of London in 2012...</p>
                </div>
            </div>
            <!-- Repeat for remaining 5 cards: Specialist Anaesthesia, GP, Retrieval, Tropical Medicine, Additional -->
        </div>
    </div>
</section>
```

**Critical:** All 6 `<img>` elements in qual cards must have `alt=""` (empty/decorative). The images are visual accents — the card text provides the information. **Do NOT repeat text from the card body in the alt attribute.**

**CSS:**

```css
.qualifications { background-color: var(--color-surface); }

.qual-card {
    display: flex; flex-direction: column;
    background-color: var(--color-surface-card);
    border-radius: var(--radius-lg); overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.qual-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

.qual-card__image {
    display: block; width: 100%; aspect-ratio: 3 / 2;
    overflow: hidden; background-color: var(--color-surface);
}
.qual-card__image img, .qual-card__image picture { width: 100%; height: 100%; object-fit: cover; display: block; }

.qual-card__body {
    padding: var(--space-lg); flex: 1;
    display: flex; flex-direction: column;
}
.qual-card__title {
    font-family: var(--font-display); font-size: var(--text-xl);
    color: var(--color-primary); margin-bottom: var(--space-sm);
    text-decoration: none;
}
.qual-card__description {
    font-size: var(--text-sm); color: var(--color-text-muted);
    line-height: var(--line-height-small); flex: 1;
}

@media screen and (max-width: 768px) {
    .qual-card__body { padding: var(--space-md); }
}
```

---

### TASK-012: Build contact section — HTML + CSS

**HTML structure:**

```html
<section class="contact section animate-in" id="contact">
    <div class="container container--narrow">
        <div class="section__header">
            <span class="section__label">Contact</span>
            <h2 class="section__title">Get in touch</h2>
        </div>

        <p class="contact__intro">Have a question or want to discuss a referral? Send me a message and I'll respond as soon as possible.</p>

        <form id="contact-form" class="contact-form" action="https://formspree.io/f/mbjnkkaq" method="post" novalidate>
            <div class="form__honeypot">
                <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
            </div>
            <div id="form-error-banner" class="form-error-banner" role="alert">Something went wrong. Please try again or email me directly.</div>

            <div class="form__group">
                <label for="contact-name" class="form__label">Name</label>
                <input type="text" name="name" id="contact-name" class="form__input" placeholder="Your name" autocomplete="name" required aria-required="true" />
                <span class="form__error" role="alert" aria-live="polite"></span>
            </div>
            <!-- Repeat similarly for: Email (type="email", autocomplete="email"), Subject, Message (textarea) -->

            <div class="form__actions">
                <button type="submit" class="btn btn--primary">Send Message</button>
                <button type="reset" class="btn btn--ghost">Clear Form</button>
            </div>
        </form>

        <div id="form-success" class="form-success" role="status" aria-live="polite">
            <span class="form-success__icon" aria-hidden="true"><!-- checkmark SVG --></span>
            <h3 class="form-success__title">Thank you</h3>
            <p class="form-success__text">Your message has been sent. I will respond as soon as possible.</p>
        </div>

        <div class="contact__social">
            <a href="https://www.linkedin.com/in/dr-faraaz-richard-de-belder-8855243a9/" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                <svg viewBox="0 0 448 512" fill="currentColor"><!-- LinkedIn path --></svg>
            </a>
        </div>

        <footer class="contact__footer">
            <p class="footer__copyright">&copy; Faraaz de Belder 2026. All rights reserved. Design: <a href="http://html5up.net">HTML5 UP</a>.</p>
        </footer>
    </div>
</section>
```

**CSS:**

```css
.contact { background-color: var(--color-surface-dark); color: var(--color-text-on-dark); }
.contact .section__title { color: var(--color-heading-dark); }

.contact__intro { text-align: center; max-width: 36rem; margin: 0 auto var(--space-3xl); color: var(--color-text-on-dark); }
.contact-form { max-width: 36rem; margin: 0 auto; }
.contact-form .form__group { margin-bottom: var(--space-lg); }
.contact-form .form__label { display: block; font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-heading-dark); margin-bottom: var(--space-xs); }
.contact-form .form__input {
    width: 100%; padding: var(--space-sm) var(--space-md);
    font-family: var(--font-body); font-size: var(--text-base);
    color: var(--color-text); background-color: var(--color-surface);
    border: 1px solid var(--color-border-dark);
    border-radius: var(--radius-md);
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.contact-form .form__input::placeholder { color: var(--color-text-muted); }
.contact-form .form__input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(196,149,106,0.2); }
.contact-form .form__textarea { min-height: 10rem; resize: vertical; }
.contact-form .form__actions { display: flex; gap: var(--space-md); margin-top: var(--space-xl); }
.contact-form .form__honeypot { position: absolute; left: -9999px; opacity: 0; height: 0; overflow: hidden; }

.form-success { display: none; text-align: center; padding: var(--space-3xl) var(--space-xl); max-width: 36rem; margin: 0 auto; }
.form-success--visible { display: block; }
.form-success__icon { width: 3rem; height: 3rem; color: var(--color-success); margin: 0 auto var(--space-lg); }
.form-success__icon svg { width: 100%; height: 100%; fill: currentColor; display: block; }
.form-success__title { font-family: var(--font-display); font-size: var(--text-2xl); color: var(--color-heading-dark); margin-bottom: var(--space-sm); }
.form-success__text { color: var(--color-text-on-dark); }

.contact__social { text-align: center; margin-top: var(--space-3xl); }
.social-link { display: inline-flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; border-radius: var(--radius-md); color: var(--color-text-on-dark); background-color: rgba(255,255,255,0.08); transition: background-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast); text-decoration: none; }
.social-link:hover { background-color: #0077b5; color: var(--color-surface); transform: translateY(-2px); }
.social-link svg { width: 1.5rem; height: 1.5rem; fill: currentColor; display: block; }

.contact__footer { text-align: center; margin-top: var(--space-3xl); padding-top: var(--space-xl); border-top: 1px solid var(--color-border-dark); }
.footer__copyright { font-size: var(--text-sm); color: var(--color-text-muted); }
.footer__copyright a { color: var(--color-text-on-dark); text-decoration: underline; }
.footer__copyright a:hover { color: var(--color-accent); }

@media screen and (max-width: 768px) {
    .contact-form .form__actions { flex-direction: column; }
    .contact-form .btn { width: 100%; }
}
```

---

## Phase 4 — JavaScript Behaviours

### TASK-013: Write main.js — hamburger toggle + smooth scroll

Open `src/assets/js/main.js`. Wrap everything in an IIFE:

```js
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        // --- Hamburger toggle ---
        var toggle = document.querySelector(".nav__toggle");
        var navList = document.querySelector(".nav__list");

        if (toggle && navList) {
            toggle.addEventListener("click", function () {
                var isOpen = navList.classList.toggle("nav__list--open");
                toggle.setAttribute("aria-expanded", isOpen);
            });

            // Close nav when a link is clicked (mobile)
            navList.addEventListener("click", function (e) {
                if (e.target.closest(".nav__link")) {
                    navList.classList.remove("nav__list--open");
                    toggle.setAttribute("aria-expanded", "false");
                }
            });
        }

        // --- Smooth scroll for nav links and .btn links ---
        var scrollLinks = document.querySelectorAll('.nav__link[href^="#"], .btn[href^="#"]');

        Array.prototype.forEach.call(scrollLinks, function (link) {
            link.addEventListener("click", function (e) {
                var targetId = this.getAttribute("href");
                if (targetId && targetId.charAt(0) === "#") {
                    var target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        var nav = document.querySelector(".nav");
                        var navHeight = nav ? nav.offsetHeight : 0;
                        var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                        window.scrollTo({ top: targetTop, behavior: "smooth" });
                    }
                }
            });
        });

        // --- (continue in next tasks) ---
    });
})();
```

---

### TASK-014: Write contact form submission logic

Inside the same `DOMContentLoaded` handler, add:

```js
// --- Contact form: enhanced UX ---
var form = document.getElementById("contact-form");
var success = document.getElementById("form-success");
var errorBanner = document.getElementById("form-error-banner");

if (form && success) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors(form);

        // Honeypot check
        var honeypot = form.querySelector('[name="_gotcha"]');
        if (honeypot && honeypot.value) {
            success.classList.add("form-success--visible");
            form.style.display = "none";
            return;
        }

        // Validate required fields
        var valid = true;
        var fields = form.querySelectorAll("[required]");
        fields.forEach(function (f) {
            var group = f.closest(".form__group");
            var errorEl = group ? group.querySelector(".form__error") : null;
            if (!f.value.trim()) {
                if (group) group.classList.add("form__group--error");
                if (errorEl) errorEl.textContent = "This field is required.";
                valid = false;
            } else {
                if (group) group.classList.remove("form__group--error");
                if (errorEl) errorEl.textContent = "";
            }
        });

        // Validate email format
        var email = form.querySelector('[name="email"]');
        if (email && email.value) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                var emailGroup = email.closest(".form__group");
                var emailError = emailGroup ? emailGroup.querySelector(".form__error") : null;
                if (emailGroup) emailGroup.classList.add("form__group--error");
                if (emailError) emailError.textContent = "Please enter a valid email address.";
                valid = false;
            }
        }

        if (!valid) return;

        // Loading state
        var btn = form.querySelector('[type="submit"]');
        if (btn) { btn.classList.add("btn--loading"); btn.disabled = true; }

        if (errorBanner) errorBanner.classList.remove("form-error-banner--visible");

        // Send via fetch
        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
        })
        .then(function (r) {
            if (btn) { btn.classList.remove("btn--loading"); btn.disabled = false; }
            if (r.ok) {
                success.classList.add("form-success--visible");
                form.style.display = "none";
            } else {
                showFormError();
            }
        })
        .catch(function () {
            if (btn) { btn.classList.remove("btn--loading"); btn.disabled = false; }
            showFormError();
        });
    });

    // Clear errors on input
    form.querySelectorAll("input, textarea").forEach(function (el) {
        el.addEventListener("input", function () {
            var group = this.closest(".form__group");
            if (group) group.classList.remove("form__group--error");
            var errorEl = group ? group.querySelector(".form__error") : null;
            if (errorEl) errorEl.textContent = "";
            if (errorBanner) errorBanner.classList.remove("form-error-banner--visible");
        });
    });
}

function clearErrors(form) {
    form.querySelectorAll(".form__group--error").forEach(function (g) { g.classList.remove("form__group--error"); });
    form.querySelectorAll(".form__error").forEach(function (e) { e.textContent = ""; });
    if (errorBanner) errorBanner.classList.remove("form-error-banner--visible");
}

function showFormError() {
    if (errorBanner) {
        errorBanner.classList.add("form-error-banner--visible");
        errorBanner.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}
```

---

### TASK-015: Add Intersection Observer — nav active state

Inside the same handler:

```js
// --- Scroll-driven nav highlighting ---
var sections = document.querySelectorAll("#top, #work, #portfolio, #contact");
var navLinks = document.querySelectorAll(".nav__link");

if (sections.length && navLinks.length) {
    var navObserverOptions = { root: null, rootMargin: "-20% 0px -65% 0px", threshold: 0 };

    var navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = "#" + entry.target.id;
                Array.prototype.forEach.call(navLinks, function (link) {
                    link.classList.remove("nav__link--active");
                    link.removeAttribute("aria-current");
                    if (link.getAttribute("href") === id) {
                        link.classList.add("nav__link--active");
                        link.setAttribute("aria-current", "page");
                    }
                });
            }
        });
    }, navObserverOptions);

    Array.prototype.forEach.call(sections, function (section) {
        navObserver.observe(section);
    });
}
```

---

### TASK-016: Add Intersection Observer — entrance animations

Inside the same handler:

```js
// --- Scroll-triggered entrance animations ---
var animTargets = document.querySelectorAll(".animate-in");

if (animTargets.length) {
    var animObserverOptions = { root: null, rootMargin: "0px 0px -80px 0px", threshold: 0 };

    var animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in--visible");
                animObserver.unobserve(entry.target);
            }
        });
    }, animObserverOptions);

    Array.prototype.forEach.call(animTargets, function (el) {
        animObserver.observe(el);
    });
}
```

---

### TASK-017: Entrance animation CSS

Add to `styles.css` at the bottom of the file:

```css
/* Default state (hidden before animation) */
.animate-in {
    opacity: 0;
    transform: translateY(1.25rem);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
/* Visible state (triggered by Intersection Observer) */
.animate-in--visible { opacity: 1; transform: translateY(0); }

/* Staggered delays for grid children */
.animate-in--delay-1 { transition-delay: 0.1s; }
.animate-in--delay-2 { transition-delay: 0.2s; }
.animate-in--delay-3 { transition-delay: 0.3s; }
.animate-in--delay-4 { transition-delay: 0.4s; }
.animate-in--delay-5 { transition-delay: 0.5s; }
.animate-in--delay-6 { transition-delay: 0.6s; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
    .animate-in { opacity: 1; transform: none; transition: none; }
}
```

Also add form-specific animation CSS:

```css
/* Loading spinner on submit button */
.btn--loading { position: relative; color: transparent !important; pointer-events: none; }
.btn--loading::after {
    content: ""; position: absolute;
    width: 1rem; height: 1rem;
    border: 2px solid var(--color-surface);
    border-top-color: transparent; border-radius: 50%;
    animation: btn-spinner 0.6s linear infinite;
}
@keyframes btn-spinner { to { transform: rotate(360deg); } }

/* Success message fade-in */
.form-success { opacity: 0; transform: translateY(0.5rem); transition: opacity 0.4s ease-out, transform 0.4s ease-out; }
.form-success--visible { opacity: 1; transform: translateY(0); }

/* Error styling */
.form__error { display: block; font-size: var(--text-sm); color: var(--color-error); margin-top: var(--space-xs); min-height: 1.25rem; }
.form__group--error .form__input { border-color: var(--color-error); }
.form__group--error .form__input:focus { border-color: var(--color-error); box-shadow: 0 0 0 3px rgba(201,74,74,0.2); }
.form-error-banner { display: none; background-color: rgba(201,74,74,0.1); border: 1px solid var(--color-error); border-radius: var(--radius-md); padding: var(--space-md); margin-bottom: var(--space-lg); color: var(--color-error); font-size: var(--text-sm); text-align: center; }
.form-error-banner--visible { display: block; }
```

---

## Phase 5 — Dark Mode

### TASK-018: Implement `prefers-color-scheme: dark`

Add at the very end of `styles.css`:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --color-surface: #1a1f24;
        --color-surface-warm: #22282e;
        --color-surface-card: #2a3036;
        --color-text: #e0e3e6;
        --color-text-muted: #9ca3af;
        --color-border: #2e353c;
        --color-border-dark: rgba(255,255,255,0.1);
    }

    .hero { background-color: var(--color-surface); }
    .about { background-color: var(--color-surface-warm); }
    .qualifications { background-color: var(--color-surface); }
    .feature-card { background-color: var(--color-surface-card); }
    .bio__fact-panel { background-color: var(--color-surface-card); }
    .qual-card { background-color: var(--color-surface-card); }
    .nav { background-color: var(--color-primary-dark); } /* stays same */

    .contact-form .form__input {
        background-color: var(--color-surface);
        color: var(--color-text);
        border-color: var(--color-border);
    }
    .contact-form .form__input::placeholder { color: var(--color-text-muted); }
    .contact-form .form__input:focus {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(196,149,106,0.3);
    }

    .divider .waveform-path { opacity: 0.2; }
    .social-link { background-color: rgba(255,255,255,0.1); }
    .form__group--error .form__input { border-color: var(--color-error); }
    .form-error-banner { background-color: rgba(201,74,74,0.15); }
}
```

**Test:** Toggle system dark mode. Verify all text is readable. Check contrast: body text `#e0e3e6` on `#1a1f24` (~8.5:1 ✅). Accent `#c4956a` on `#1a1f24` (~4.8:1 — OK for large text).

---

## Phase 6 — Meta + SEO

### TASK-019: Write complete `<head>` meta

Ensure `index.html` `<head>` contains all of these:

```html
<title>Amnestic Anaesthesia — Dr Faraaz de Belder</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Dr Faraaz de Belder MBBS FANZCA FRACGP DipPHRM DIMC DTM&amp;H DGM DRCOG — delivering quality anaesthesia, retrieval and critical care medicine in Queensland, Australia." />
<link rel="canonical" href="https://www.amnestic.org/" />
<meta name="author" content="Dr Faraaz de Belder" />
<link rel="icon" href="/favicon.ico" />

<!-- Open Graph -->
<meta property="og:title" content="Amnestic Anaesthesia — Dr Faraaz de Belder, Specialist Anaesthetist" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.amnestic.org" />
<meta property="og:image" content="https://www.amnestic.org/src/assets/images/me.jpg" />
<meta property="og:description" content="Dr Faraaz de Belder MBBS FANZCA FRACGP DipPHRM DIMC DTM&amp;H DGM DRCOG — delivering quality anaesthesia, retrieval and critical care medicine in Queensland, Australia." />

<!-- JSON-LD Physician Schema -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr Faraaz de Belder",
    "url": "https://www.amnestic.org",
    "jobTitle": "Specialist Anaesthetist",
    "description": "Dr Faraaz de Belder MBBS FANZCA FRACGP DipPHRM DIMC DTM&amp;H DGM DRCOG — delivering quality anaesthesia, retrieval and critical care medicine in Queensland, Australia.",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sunshine Coast",
        "addressRegion": "QLD",
        "addressCountry": "AU"
    },
    "medicalSpecialty": ["Anesthesiology", "GeneralPractice", "EmergencyMedicine"]
}
</script>
```

---

## Phase 7 — HTML Structure Final Assembly

### TASK-020: Assemble the complete page

The `<body>` should have this exact structure, top to bottom:

```
1. <a href="#main-content" class="skip-link">Skip to main content</a>
2. <nav class="nav"> ... </nav>
3. <main id="main-content">
   a. <section class="hero animate-in" id="top"> ... </section>
   b. <div class="divider" aria-hidden="true"> ... </div>
   c. <section class="about section animate-in" id="work"> ... </section>
   d. <div class="divider" aria-hidden="true"> ... </div>
   e. <section class="qualifications section animate-in" id="portfolio"> ... </section>
   f. <div class="divider" aria-hidden="true"> ... </div>
   g. <section class="contact section animate-in" id="contact"> ... </section>
4. <script src="src/assets/js/main.js"></script>
```

**Checklist before declaring done:**
- [ ] Skip-link is the first focusable element
- [ ] All `id` attributes on sections match nav `href` values (`#top`, `#work`, `#portfolio`, `#contact`)
- [ ] All images have `alt` (hero: descriptive portrait alt; qual cards: `alt=""` decorative)
- [ ] No `href="#"` dead links anywhere
- [ ] Form action URL is correct (Formspree endpoint `mbjnkkaq`)
- [ ] GSAP/loading spinner only uses CSS — no external animation libraries

---

## Phase 8 — QA + Polish

### TASK-021: Run accessibility checks

1. **Keyboard navigation:** Tab through the entire page. Every interactive element (nav links, hamburger, buttons, form inputs) must receive focus in logical order.
2. **Skip link:** Press Tab on page load — "Skip to main content" must appear.
3. **Focus visibility:** Every focused element must have a visible `:focus-visible` ring.
4. **Screen reader:** Use VoiceOver (Mac) or NVDA (Windows). Verify:
   - Nav landmark is announced
   - Section headings are announced
   - Form labels are read when inputs are focused
   - Error messages are announced (they have `role="alert"` already)
5. **Contrast:** Check dark mode text contrast. Minimum 4.5:1 for normal text, 3:1 for large text.

**Fix any violations found.**

---

### TASK-022: Run visual QA

| Check | What to look for |
|---|---|
| **Desktop (1920px)** | Full layout, 3-column grids, hero 2-column |
| **Laptop (1366px)** | Same as desktop, no overflow |
| **Tablet (768–1024px)** | Grid-3 collapses to 2 columns, nav still horizontal |
| **Mobile (360–428px)** | Single column, hamburger visible, credentials don't overflow, form full-width |
| **Dark mode** | Toggle system theme. All sections switch correctly. No unreadable text. |
| **Waveform divider** | Visible between sections. Subtle pan on desktop. |
| **Form** | Submit → loading spinner → success message (or error if offline). |
| **Animations** | Sections fade in on scroll. Delays stagger correctly. |
| **Reduced motion** | Enable in OS settings. No animations should play. |

---

### TASK-023: Performance verification

Open DevTools → Lighthouse → run audit on the local file or deployed URL.

**Targets:**
- Performance score: ≥ 95
- Accessibility score: 100
- No render-blocking resources beyond HTML and CSS
- No layout shift during load
- WebP images used where available

---

## Quick Reference: File Responsibility

| File | What goes in it |
|---|---|
| `index.html` | All HTML content, meta tags, JSON-LD, Google Fonts `<link>`, `<script>` tag for `main.js` |
| `src/assets/css/styles.css` | All CSS: tokens, reset, layout, nav, buttons, divider, all sections, animations, dark mode |
| `src/assets/js/main.js` | All JS: hamburger toggle, smooth scroll, form submission, Intersection Observers (nav + animations) |
| `src/assets/images/` | WebP + fallback images only |

**No inline styles, no `<style>` blocks in HTML, no multiple CSS/JS files.**

---

## Task Summary

| # | Task | Est. | Key Files |
|---|---|---|---|
| 000 | Scaffold directory | 15min | Directory tree |
| 001 | Design tokens in `:root` | 30min | `styles.css` |
| 002 | CSS reset + base styles | 30min | `styles.css` |
| 003 | Layout utility classes | 30min | `styles.css` |
| 004 | Google Fonts | 10min | `index.html`, `styles.css` |
| 005 | Nav HTML | 20min | `index.html` |
| 006 | Nav CSS | 30min | `styles.css` |
| 007 | Button system CSS | 20min | `styles.css` |
| 008 | Waveform divider | 20min | `styles.css`, `index.html` |
| 009 | Hero section | 45min | `index.html`, `styles.css` |
| 010 | About section | 1hr | `index.html`, `styles.css` |
| 011 | Qualifications section | 45min | `index.html`, `styles.css` |
| 012 | Contact section | 1hr | `index.html`, `styles.css` |
| 013 | JS: hamburger + smooth scroll | 30min | `main.js` |
| 014 | JS: form submission | 30min | `main.js` |
| 015 | JS: nav active state (IO) | 20min | `main.js` |
| 016 | JS: entrance animations (IO) | 20min | `main.js` |
| 017 | Animation CSS | 15min | `styles.css` |
| 018 | Dark mode CSS | 30min | `styles.css` |
| 019 | Meta + SEO | 15min | `index.html` |
| 020 | Final HTML assembly | 30min | `index.html` |
| 021 | Accessibility QA | 30min | All files |
| 022 | Visual QA | 30min | All files |
| 023 | Performance audit | 15min | — |

**Total estimated: 10–12 hours (spread across 2–3 days)**
