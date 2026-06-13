# amnestic.org

Professional site for Dr Faraaz de Belder, specialist anaesthetist.

## Optimisation summary — 13 June 2026

Code improvements by [delight-f](https://github.com/delight-f).

- **Component structure:** Monolithic HTML split into 7 reusable partials under `src/partials/`
- **CSS modularisation:** Single 1300-line stylesheet refactored into 5 organised files with CSS custom properties for centralised theming. 12-column grid defined once rather than duplicated across 4 breakpoints
- **JavaScript weight reduction:** jQuery 3.6.0 and 4 utility plugins (~90 KB) replaced with vanilla JS (~700 bytes)
- **Icon footprint:** Font Awesome full library (~150 KB with webfonts) replaced with 4 inline SVG icons (~2 KB)
- **Accessibility:** Contact form labels, `autocomplete`, `aria-required`, and `:focus-visible` styles added
- **SEO:** Open Graph and Twitter Card meta tags added for social link previews
- **Content:** Two typos corrected; LinkedIn profile link added
- **Mobile:** Hero photo scales responsively on small viewports

### Licence

Content &copy; Faraaz de Belder. Original design by [HTML5 UP](http://html5up.net) (CCA 3.0).
