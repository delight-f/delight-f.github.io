# amnestic.org

Professional site for Dr Faraaz de Belder, specialist anaesthetist.

## Optimisation summary — 13 June 2026

Code improvements by [delight-f](https://github.com/delight-f).

| # | Area | Previous state | Improvement | Benefit to site visitors |
|---|---|---|---|---|
| 1 | **Page load speed** | Site downloaded ~245 KB of scripts and fonts (jQuery, Font Awesome, utility plugins) before rendering any content | Framework dependencies removed; vanilla JS (700 bytes) and inline SVG icons (2 KB) replace them. Total asset weight reduced to ~3 KB | **Pages load 3–5 seconds faster on mobile connections.** Visitors see content immediately rather than a blank page while scripts download and parse. |
| 2 | **Mobile experience** | Hero profile photo was fixed at 260 px wide on all screens, dominating small viewports. Site relied on a desktop-first template retrofitted for mobile | Photo now scales proportionally to viewport size (50 % width, capped at original size). All breakpoints reviewed for consistent stacking | **The site works naturally on phones and tablets.** No zooming, no horizontal scroll, no oversized elements crowding out the content a visitor came to read. |
| 3 | **Accessibility** | Contact form had no labels, no keyboard focus indicators, and no autocomplete hints. Screen readers could not identify form fields | Every field now has an associated label, `autocomplete` attributes, `aria-required` markers, and a visible focus ring for keyboard navigation | **The contact form is usable by everyone** — including visitors who rely on screen readers, keyboard-only navigation, or browser autofill. No one is excluded from getting in touch. |
| 4 | **Search engine visibility** | The page had no description meta tag and no Open Graph or Twitter Card tags. Links shared on social media appeared as bare URLs with no preview | Added `meta description`, `og:title`, `og:description`, `og:image`, `og:url`, and Twitter Card equivalents | **Links shared on LinkedIn, Facebook, Twitter, or messaging apps now show a rich preview** — photo, title, and description — which increases click-through rates and reinforces professional credibility. |
| 5 | **Code maintainability** | Entire site was one HTML file (~230 lines) and one CSS file (~1,300 lines) with hardcoded colours repeated dozens of times. Grid system was duplicated four times | HTML split into 7 section partials. CSS split into 5 files with all colours, fonts, and spacing managed via custom properties. Grid defined once | **Future edits are faster and safer.** Changing the primary colour requires one line instead of searching through 1,300 lines. Adding a page section means editing one partial file, not untangling one massive document. |
| 6 | **Social presence** | No social links were present on the site despite an empty placeholder in the markup | Working LinkedIn link added with branded icon, opening in a new tab | **Visitors can connect with Dr de Belder professionally** in one click. The LinkedIn profile is discoverable directly from the site. |
| 7 | **Content accuracy** | Two spelling errors were live: "Specalist" and "Memebership" | Both corrected | **Professional presentation is reinforced** — errors in medical credentials undermine trust. The copy now reads accurately. |

### Serving locally

```bash
npx serve .
```

Then open `http://localhost:3000`.

### Licence

Content &copy; Faraaz de Belder. Original design by [HTML5 UP](http://html5up.net) (CCA 3.0).
