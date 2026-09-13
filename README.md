# Lazyar Azad — Civil Engineer (Portfolio Site)

A single-page personal website built from the CV in this folder. Static HTML, CSS and
vanilla JavaScript — no build step, no framework, no dependencies to install.

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
index.html                 The whole page (all seven sections)
assets/css/styles.css      Design tokens, layout, dark + light themes, print styles
assets/js/main.js          Theme toggle, mobile nav, scroll-spy, reveals, counters
assets/img/                Portrait, favicon, social-share card
assets/cv/                 The CV PDF served by the "Download CV" buttons
robots.txt
```

The three original CV files (`Lazyar_Azad_Professional_CV.pdf` and the two page PNGs)
are untouched in the root. The portrait and the social card were generated from
page 1 of that PDF.

## Sections

Hero → 01 What I do → 02 Professional experience → 03 Selected publications →
04 Honours & awards → 05 Skills → 06 Education & credentials → 07 Get in touch

## What's built in

- **Dark and light themes.** Follows the OS setting on first visit, then remembers the
  visitor's choice in `localStorage`. Applied before first paint, so there is no flash.
- **Responsive** from 360px to ultrawide; the nav becomes a slide-in drawer under 860px.
- **Accessible.** Skip link, visible focus rings, ARIA on the nav, theme toggle and
  skill meters, and `prefers-reduced-motion` support.
- **Works without JavaScript.** Animations are scoped to `html.js`, and the stats and
  skill bars ship with their real values in the markup.
- **SEO ready.** Meta description, Open Graph and Twitter cards, and JSON-LD `Person`
  structured data.
- **Print stylesheet** — Ctrl+P produces a clean document.

## Editing content

All content lives in `index.html` as plain markup — no data files or templates. Common
edits:

| Change | Where |
| --- | --- |
| Phone / email | Search for `lazyarazad65@gmail.com` and `+9647701387187` (also in the JSON-LD block) |
| A job, publication or award | The matching `<section>` — each entry is one `<article>` |
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

It is a static site, so it can go anywhere — GitHub Pages, Netlify, Cloudflare Pages, or
any shared host. Upload the folder as-is. One thing to change first: `og:image` and
`twitter:image` in `<head>` are relative paths; social platforms need absolute URLs, so
set them to `https://yourdomain.com/assets/img/og-image.jpg` once you have a domain.
