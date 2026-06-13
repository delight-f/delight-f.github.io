# amnestic.org — optimisation summary

This document summarises all changes made to the site since the original
HTML5 UP template was deployed. Every change was driven by the goal of
improving performance, accessibility, maintainability, and search
visibility without altering the visual design or content.

---

## Performance

| Change | Before | After | Impact |
|---|---|---|---|
| **JavaScript** | jQuery 3.6.0 + 4 utility plugins (~90 KB, 5 files) | Vanilla JS single file (~700 bytes) | ~99 % reduction in JS payload. No framework parse/execute overhead. |
| **Icons** | Font Awesome 5.15.4 full library (~150 KB with CSS + webfonts) | 3 inline SVG icons (~2 KB) | No render-blocking font requests. Zero external dependencies for icons. |
| **Images** | 7 photos at 4000+ px resolution (~2.4 MB total) | Resized to max 800 px, converted to WebP with JPEG/PNG fallback (~610 KB total) | ~75 % reduction in image weight. `loading="lazy"` on below-fold images. `fetchpriority="high"` on hero photo. Descriptive `alt` text added. |
| **CSS** | Single 1300-line file with hardcoded colours and grid duplicated 4× across breakpoints | Single `styles.css` with CSS custom properties, deduplicated grid, 5-file split merged back into 1 (~40 KB) | Critical request chain reduced from 6 files to 2 (HTML + CSS). All colours and spacing centralised in `:root` variables. |
| **Favicon** | 25+ PNG/ICO files across root directory (apple, android, ms icons + manifest + browserconfig) | Single `favicon.ico` (16×16, 1.2 KB) | Eliminated ~400 KB of unused icon variants. |
| **Critical path** | 6 sequential CSS loads in Lighthouse waterfall (~462 ms) | Single CSS load (~150 ms estimated) | ~300 ms improvement on first visit. |

---

## Accessibility

| Change | Details |
|---|---|
| **Form labels** | Every field has an explicit `<label for="...">` with `.sr-only` for screen readers. |
| **Keyboard navigation** | `:focus-visible` styles on all form inputs. Skip-to-main-content link as first focusable element. |
| **ARIA attributes** | `aria-required="true"` on required fields. `aria-label` on all 6 portfolio image wrapper links. |
| **Autocomplete** | `autocomplete="name"` and `autocomplete="email"` on relevant form fields. |
| **Zoom** | Removed `user-scalable=no` from viewport meta tag — users can now pinch-zoom on mobile. |
| **Colour contrast** | Body text darkened from `#888` to `#595959` to meet WCAG AA (4.5:1 ratio). |
| **Section IDs** | Verified all nav anchor links (`#work`, `#portfolio`, `#contact`) match target `id` attributes. |

---

## SEO and structured data

| Change | Details |
|---|---|
| **Meta descriptions** | Unified `meta description`, `og:description`, and `twitter:description` to the full credential string (MBBS FANZCA FRACGP DipPHRM DIMC DTM&amp;H DGM DRCOG). |
| **Open Graph** | Added `og:title`, `og:type`, `og:url`, `og:image`, `og:description`. |
| **Canonical URL** | Added `<link rel="canonical" href="https://www.amnestic.org/">`. |
| **Author** | Added `<meta name="author" content="Dr Faraaz de Belder">`. |
| **JSON-LD** | Added Physician structured data block with name, URL, job title, description, address (Sunshine Coast QLD), and medical specialties (Anesthesiology, GeneralPractice, EmergencyMedicine). |
| **robots.txt** | Created permissive robots.txt with sitemap reference. |
| **sitemap.xml** | Created single-URL sitemap for `https://www.amnestic.org/`. |

---

## Code quality and maintainability

| Change | Details |
|---|---|
| **Component structure** | Monolithic HTML was split into 7 partials during development, then consolidated back into `index.html` when the partials proved unnecessary for a single-page site. |
| **CSS custom properties** | All colours, fonts, spacing, and shadows extracted into `:root` variables. A site-wide colour change is now a one-line edit. |
| **Grid deduplication** | The 12-column grid system was defined once at the base level. Breakpoint-specific column classes were declared in their respective `@media` blocks without duplicating the structural grid CSS. |
| **Vendor prefixes** | Retained where needed for cross-browser compatibility (-moz-, -webkit-, -ms-). |
| **File structure** | Clean root directory with only source files. No build artifacts, temp scripts, or node_modules left in the repository. |

---

## Contact form

| Change | Details |
|---|---|
| **Submission method** | Switched from native page-reload POST to fetch-based AJAX submission with inline validation. |
| **Spam protection** | Added honeypot field (`_gotcha`) — silently discards submissions from automated bots. |
| **Validation** | Client-side validation with red border highlighting on empty required fields and invalid email format. Error styles clear on input. |
| **Success feedback** | Inline success message replaces the form after submission. Submit button disabled during transit. |
| **Endpoint** | Corrected Formspree endpoint from `mbjnkqka` to `mbjnkkaq`. |
| **Styling** | All form inputs on the dark contact section changed to white backgrounds for better contrast and visibility. |

---

## Visual corrections

| Change | Details |
|---|---|
| **Card heights** | Qualification cards in the portfolio section now share equal height via `display: flex; height: 100%`. |
| **Mobile nav** | Shortened "My medical experience" to "Experience" and reduced mobile link padding from 0.75em to 0.5em to prevent nav item wrapping. |
| **Hero photo** | Added aspect-ratio-aware sizing for responsive scaling on mobile (`50vw` capped at `15em`). |
| **Icons** | Replaced handwritten SVG approximations with Font Awesome 6.7.2 source paths. Fixed incorrect `viewBox` on stethoscope icon (was `512` instead of `576`). |
| **Content typos** | Corrected "Specalist" → "Specialist" and "Memebership" → "Membership". |
| **LinkedIn** | Added working LinkedIn profile link with branded icon in the contact section. |
| **HTML5 UP credit** | Retained in footer as required under CCA 3.0 license. |

---

## Rationale

All changes were made to the **minimum viable degree** — no new frameworks,
no over-engineering, no visual redesign. The site still looks and feels
the same as the original HTML5 UP template. What changed is the code
beneath: faster to load, easier to maintain, accessible to more users,
and discoverable by search engines.

Content &copy; Faraaz de Belder. Original design by [HTML5 UP](http://html5up.net) (CCA 3.0).
