# tasks.md — amnestic.org optimisation

Single-page static site. HTML5UP Stellar template. jQuery + Scrollex + Skel. Hosted at `https://amnestic.org`.

---

## A. Images

- Convert all `/src/assets/images/` JPGs and PNGs to WebP (AVIF fallback)
- Add `width`, `height`, `alt`, `srcset`, `sizes` to every `<img>`
- `me.jpg` (hero): `fetchpriority="high"`, no lazy load
- All below-fold images: `loading="lazy"`
- Target: under 100 KB per image after compression

## B. JavaScript

- Audit all `<script>` tags; add `defer` to any that don't need to block rendering
- Assess whether jQuery can be replaced with vanilla JS (smooth scroll, sticky nav, Scrollex reveal). If yes, remove jQuery entirely
- Inline critical above-fold CSS; load rest of `main.css` asynchronously via `<link rel="preload" as="style">`
- Add `<link rel="preconnect">` for any third-party domains loaded at startup

## C. SEO and meta

- Unify `meta description` and `og:description` — they currently differ (one omits the postgraduate diplomas)
- Add `<link rel="canonical" href="https://www.amnestic.org/">`
- Add `meta name="author"`
- Change Twitter card from `summary` to `summary_large_image`; add `twitter:image` pointing to `me.jpg`
- Add Physician JSON-LD block: `name`, `url`, `jobTitle`, `description`, `address` (Sunshine Coast QLD), `medicalSpecialty` (Anesthesiology, General Practice, Emergency Medicine)
- Create `robots.txt` (permissive) and `sitemap.xml` (single URL) at site root

## D. Accessibility

- Add descriptive `alt` text to all six portfolio images (`barts.png`, `anaesthesia.jpg`, `gp.jpg`, `winch.png`, `tropical.jpg`, `geriatric.jpg`); add `aria-label` to their `<a href="#">` wrappers
- Add explicit `<label for="...">` to all contact form fields (Name, Email, Subject, Message)
- Add skip-to-main-content link as first focusable element
- Remove `user-scalable=no` from viewport meta tag
- Verify WCAG AA contrast (4.5:1) for body text
- Confirm nav anchor links (`#work`, `#portfolio`, `#contact`) have matching `id` on target sections

## E. Security headers

Run `curl -I https://amnestic.org` and add any missing:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy`: allow self-hosted assets + LinkedIn; nonce-based if inline scripts required

Implement via `_headers` (Netlify/Cloudflare Pages), `netlify.toml`, Nginx config, or `.htaccess` depending on hosting environment — confirm before editing.

## F. Caching and compression

- Confirm Brotli/gzip is active: `curl -H "Accept-Encoding: br,gzip" -I https://amnestic.org`
- Set `Cache-Control`:
  - HTML: `no-cache` + `ETag`
  - CSS/JS: `max-age=31536000, immutable` (with cache-busting filenames or query strings)
  - Images: `max-age=2592000`
- Confirm server version header is suppressed

## G. Favicon and manifest

- Create: `favicon.ico` (32×32), `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180×180)
- Create `site.webmanifest`: `name`, `short_name`, `icons`, `theme_color: #1b1f22`, `display: browser`
- Add `<link rel="manifest">` and `<meta name="theme-color" content="#1b1f22">` to `<head>`

## H. Contact form

- Identify form `action` and submission handler — if unset, implement Formspree or equivalent
- Requirements: honeypot spam protection, fetch-based submission (no page reload), inline client-side validation, success confirmation message
- Add `autocomplete="name"` and `autocomplete="email"` to relevant fields

## I. Redirects and URL hygiene

- Confirm canonical domain (www vs non-www); implement 301 from the other
- Confirm HTTP → HTTPS 301 is active
- Confirm all internal asset paths match the canonical domain

## J. Mobile

- Touch targets: nav links, form submit button, portfolio image links — minimum 44×44 px
- Portfolio images must not overflow at 375 px viewport width
- (Viewport `user-scalable=no` fix is covered under D — do not duplicate the change)
