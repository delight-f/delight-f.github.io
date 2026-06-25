# Amnestic Anaesthesia — amnestic.org

Modernised professional website for Dr Faraaz de Belder, specialist anaesthetist, GP, and retrieval physician serving the Sunshine Coast and regional Queensland.

## Modernisation (June 2026)

The site was modernised from a single-page scroll (2019-era template) to a **multi-page static site** with four focused pages:

| Page | URL | Purpose |
|------|-----|---------|
| **Home** | `/` | Compressed hero: credentials, tagline, 3 speciality CTAs |
| **About** | `/about` | Editorial bio with full background and training |
| **Experience** | `/qualifications` | All 6 qualification cards in an editorial grid |
| **Contact** | `/contact` | Simplified form (Name, Email, Message) + direct email |

### Design

- **Typography:** Newsreader (serif display) + Figtree (sans body) with Figtree Semi-Condensed for utility labels
- **Colour:** Teal-green (#167a6e) primary with coral (#e8835a) accent
- **Layout:** CSS Grid, single breakpoint at 768px, dark mode via `prefers-color-scheme`
- **Motion:** Hero photo fade-in, qualification card image zoom on hover, `prefers-reduced-motion` respected
- **Accessibility:** Skip links, focus-visible outlines, ARIA landmarks, semantic HTML, form validation

### Architecture

- Static HTML + vanilla CSS + vanilla JS. No build step, no framework.
- Formspree for contact form handling.
- Hosted on GitHub Pages via `www.amnestic.org`.

### Files

```
/
├── index.html
├── about.html
├── qualifications.html
├── contact.html
├── favicon.ico
├── CNAME
├── robots.txt
├── sitemap.xml
└── src/
    ├── assets/
    │   ├── css/styles.css
    │   ├── js/main.js
    │   └── images/          (14 images)
```

### Previous work

This modernisation supersedes the `/refresh` single-page prototype. The `refresh 2/` workspace directory is retained locally but not deployed.
