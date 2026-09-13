# Lazyar Azad — Civil Engineer (Portfolio Site)

A single-page personal website built from the CV in this folder, in English, Kurdish
(Sorani) and Arabic. Static HTML, CSS and vanilla JavaScript — no build step, no
framework, no dependencies to install.

Live: https://meersalamali.github.io/CV_lazyar/ (once GitHub Pages is enabled)

## Run it

Apache (XAMPP) is already serving this folder:

```
http://localhost/CV_Lazyar/
```

If Apache is not running, start it from the XAMPP Control Panel. You can also just
double-click `index.html` — everything works from the file system too, since all paths
are relative.

## Files

```
index.html                 The whole page (all seven sections), in English
assets/css/styles.css      Design tokens, layout, dark + light themes, RTL, print styles
assets/js/main.js          Theme toggle, mobile nav, scroll-spy, reveals, counters
assets/js/i18n.js          Language switcher and translation engine
assets/js/lang/ckb.js      Kurdish (Sorani) translations
assets/js/lang/ar.js       Arabic translations
assets/img/                Portrait, favicon, social-share card
assets/cv/                 The CV PDF served by the "Download CV" buttons
robots.txt
```

The original CV files (`Lazyar_Azad_Professional_CV.pdf` and the two page PNGs) and the
source photo `IMG_3731.JPG` are untouched in the root. The portrait, touch icon and
social card in `assets/img/` were generated from `IMG_3731.JPG`.

## Sections

Hero → 01 What I do → 02 Professional experience → 03 Selected publications →
04 Honours & awards → 05 Skills → 06 Education & credentials → 07 Get in touch

## What's built in

- **Three languages.** English, Kurdish (Sorani) and Arabic, switched from the globe
  button in the header. Kurdish and Arabic render right-to-left. See *Languages* below.
- **Dark and light themes.** Follows the OS setting on first visit, then remembers the
  visitor's choice in `localStorage`. Applied before first paint, so there is no flash.
- **Responsive** from 360px to ultrawide; the nav becomes a slide-in drawer under 860px.
- **Accessible.** Skip link, visible focus rings, ARIA on the nav, theme toggle and
  skill meters, and `prefers-reduced-motion` support.
- **Works without JavaScript.** Animations are scoped to `html.js`, and the stats and
  skill bars ship with their real values in the markup. (Without JavaScript the page
  is English only.)
- **SEO ready.** Meta description, Open Graph and Twitter cards, `hreflang` alternates,
  and JSON-LD `Person` structured data.
- **Print stylesheet** — Ctrl+P produces a clean document.

## Languages

English is the source: it is the text in `index.html`. Every translatable element
carries a key, e.g. `<h2 data-i18n="exp.title">Professional experience</h2>`, and
attributes use `data-i18n-attr="aria-label:a11y.top"`. The Kurdish and Arabic text for
each key lives in `assets/js/lang/ckb.js` and `assets/js/lang/ar.js`.

**Links to a language.** Add `?lang=` to the address:

```
https://meersalamali.github.io/CV_lazyar/?lang=ckb    Kurdish
https://meersalamali.github.io/CV_lazyar/?lang=ar     Arabic
```

`?lang=ku` also works for Kurdish. Without a `?lang=`, the page opens in the visitor's
last choice, or English on a first visit.

**Changing a translation.** Edit the value for its key in `ckb.js` or `ar.js`. Values
are plain text; a few contain `<em>` or `<strong>` on purpose (`hero.role`,
`ft.credit`).

**Changing English text.** Edit `index.html` as normal, then update the same key in
both language files so the translations don't go stale.

**Adding new text.** Put `data-i18n="some.new.key"` on the element (wrap bare text in a
`<span>` if the element also contains an icon), then add `'some.new.key': '…'` to both
language files. A key missing from a language file falls back to English — nothing
breaks, it just shows English.

**Kept in English on purpose:** the two names (Lazyar Azad, Meer Salam Ali), software
names, publication and thesis titles, journal names, and certificate titles — these
are proper titles as issued or published. The downloadable CV PDF is English, and the
Kurdish and Arabic pages say so.

**Right-to-left styling.** The stylesheet uses logical properties (`margin-inline-start`,
`inset-inline-end`, …), so layouts mirror on their own. Anything direction-specific
that cannot be logical sits in the "Right-to-left" block near the end of `styles.css`.
Arabic script is cursive, so that block also removes letter-spacing for RTL.

## Editing content

All content lives in `index.html` as plain markup — no data files or templates. Common
edits:

| Change | Where |
| --- | --- |
| Phone / email | Search for `lazyarazad65@gmail.com` and `+9647701387187` (also in the JSON-LD block) |
| A job, publication or award | The matching `<section>` — each entry is one `<article>` — then its keys in `ckb.js` / `ar.js` |
| Skill levels | The `data-value` attribute on each `.meter` (and the inline `width` on its `.meter-fill`) |
| Hero counters | The `data-count` attributes in the `.stats` list |
| Brand colours | The `--accent` / `--brand` tokens at the top of `assets/css/styles.css` |

When you change a skill level, update both `data-value` on the `<li>` and the inline
`style="width:…"` on its `.meter-fill` — the inline width is what shows if JavaScript
is unavailable.

## Replacing the CV PDF

Drop the new file in `assets/cv/` and update the three `href="assets/cv/…"` links in
`index.html` (header, hero and the contact call-to-action).

## Publishing

The repo is set up for GitHub Pages: **Settings → Pages → Deploy from a branch →
`main` / `(root)`**. The canonical, Open Graph, `hreflang` and JSON-LD URLs already
point at `https://meersalamali.github.io/CV_lazyar/`. If the site moves to a custom
domain, search `index.html` and `assets/js/i18n.js` for that address and replace it.
