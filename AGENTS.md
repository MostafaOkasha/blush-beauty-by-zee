# AGENTS.md

Canonical instructions for coding agents (Codex, Claude Code and others) working in this repo. `CLAUDE.md` only
points here, so edit this file, not that one.

## What this is

The marketing site for **Blush Beauty by Zee**, a lip artistry (lip blush, dark lip neutralization, lip ombré) and
skin revision / camouflage studio in Orléans, Ottawa. It is the presentation, education and trust layer only:
booking, availability and payments stay on Square (link in `src/data/site.ts`).

**It is still a mockup.** Most images are AI-generated placeholders, and some copy (reviews, About story, credentials)
is marked `MOCK` in the source. All placeholder images must be swapped for the client's real photos and reels before
the site is used publicly. AI images must never be presented as real results.

- Live (Cloudflare Pages): https://blush-beauty-by-zee.pages.dev/
- Contact email shown on the site: `blushbeautybyzee@gmail.com` (in `src/data/site.ts`)
- The owner's name, Zheen, appears only on the About page (`src/pages/about.astro`). Do not add it anywhere else on the
  site (homepage, service pages, headers, footers, meta tags). Everywhere else use the brand name or a neutral voice.

## Prerequisites and setup

- Node.js 22 or newer (`.nvmrc` says `22`; `package.json` has `"engines": { "node": ">=22" }`). With nvm: `nvm use`.
- npm (a `package-lock.json` is committed; use npm, not yarn or pnpm).

```sh
npm install
npm run dev       # dev server at http://localhost:4321 with hot reload
npm run build     # static build into dist/
npm run preview   # serve dist/ locally to check the production build
npm run check     # astro check (type and template diagnostics)
```

## Stack

- [Astro](https://astro.build) 7, static output (`astro.config.mjs`). No server code, no database, no env vars.
- [GSAP](https://gsap.com) 3 with ScrollTrigger, desktop only, for a light hero parallax.
- Fonts self-hosted through Fontsource and imported in `src/layouts/Base.astro`.
- Hosting: Cloudflare Pages, configured by `wrangler.toml`.

## Project structure

```
astro.config.mjs        Astro config (static output; assetsInlineLimit: 0, see "Security headers")
wrangler.toml           Cloudflare Pages project name and output dir (dist/)
public/
  _headers              Security headers (CSP etc.) and cache rules for Cloudflare Pages
  favicon.svg
src/
  layouts/Base.astro    <html> shell: fonts, header/nav, footer, floating "Book now", meta tags
  pages/
    index.astro         Homepage
    about.astro         About page (the only place the owner's name appears)
    results.astro       Results gallery (before/healed sliders)
    faq.astro           FAQ page
    services/index.astro    Services overview
    services/[slug].astro   One page per service, generated from src/data/services.ts
  components/
    Placeholder.astro   Wrapper for a temporary AI image (marks it with data-placeholder-image)
    PhotoSlot.astro     Empty labelled frame for a photo/video that must be real
    Compare.astro       Before / healed drag slider
  data/
    site.ts             Square booking URL, Instagram URL, homepage service list and prices, FAQs, reviews, contact
    services.ts         Service page content and the before/healed image pairs
  scripts/
    home-motion.ts      Header state, scroll reveals, compare slider (vanilla JS, IntersectionObserver)
    hero-parallax.ts    GSAP parallax, lazy-loaded on wide screens only
  styles/global.css     All design tokens and most styles
  assets/
    chat_gpt_images/    AI placeholder images (+ README.md mapping each file to where it is used)
    art/                Abstract brand art rendered by scripts/render-art.mjs (not used on the homepage)
scripts/render-art.mjs  `npm run render-art`; uses Playwright to render brand art
docs/placeholder-prompts.md  Prompts the placeholder images were generated from
```

`dist/`, `.astro/`, `.wrangler/`, `node_modules/` and `.env*` are git-ignored.

## Conventions

### Content

- Text content and links live in `src/data/site.ts` and `src/data/services.ts`; prefer editing data there over
  hard-coding in pages.
- Prices in `src/data/site.ts` are a dated snapshot and must match live Square before launch.
- No fake reviews, AI before/afters presented as real, invented credentials or guaranteed outcomes. Anything marked
  `MOCK` in comments is demo content to be replaced.
- Lip and skin services get equal weight.
- Canadian spelling is used in copy ("colour").

### Fonts

Defined as CSS variables in `src/styles/global.css`:

- `--font-display`: Bodoni Moda (headings, `.display`). Uses a low optical size (`font-variation-settings: 'opsz' 16`)
  so it stays sturdy at large sizes.
- `--font-body`: Montserrat (body text).
- `--font-script`: Ms Madi (decorative script accents only).

To add a weight or style, import it from the Fontsource package in `src/layouts/Base.astro`. Do not load fonts from
Google Fonts or any CDN: the CSP blocks it.

### Colours and tokens

Use the custom properties at the top of `src/styles/global.css` rather than new hex values: `--plum-900/800/700`,
`--berry`, `--berry-2`, `--pink`, `--pink-2`, `--pink-deep`, `--blush`, `--blush-2`, `--cream`, `--ink`, `--muted`,
`--line`, plus layout tokens `--radius`, `--gutter`, `--header-h`, `--section-y` and the easing `--ease-out`.

### Motion

- Motion is enhancement only. Every page must work with JavaScript off and with `prefers-reduced-motion: reduce`.
- Scroll reveals: add `data-reveal` to an element. `src/scripts/home-motion.ts` fades it up with IntersectionObserver
  and CSS transitions (opacity/transform only), staggering siblings. Skipped entirely under reduced motion.
- Phones get no scroll-linked animation (no pinning, no scrubbing). GSAP ScrollTrigger is dynamically imported only
  when `(min-width: 980px) and (pointer: fine)` matches and reduced motion is off (`hero-parallax.ts`).
- CSS animations sit inside `@media (prefers-reduced-motion: no-preference)` blocks. Keep new ones there.
- If you add GSAP effects, follow the same pattern: lazy import, wide-screen and no-reduced-motion guard, and the page
  must look complete without them.

### Images

- Import images from `src/assets/` and render them with Astro's `<Image>` (or `<Placeholder>` / `getImage`), so they
  are resized and converted to WebP at build time. Do not put photos in `public/`.
- Only imported files get deployed; extra files in `src/assets/` cost nothing.

### Security headers

`public/_headers` sets a strict Content-Security-Policy (`script-src 'self'`, `font-src 'self'`, `img-src 'self' data:`).
That means: no inline scripts, no third-party scripts, fonts, images or embeds (e.g. an Instagram or YouTube iframe)
unless you also update the CSP deliberately. `assetsInlineLimit: 0` in `astro.config.mjs` keeps Vite from inlining
scripts for the same reason.

## Swapping placeholder images

All placeholders are in `src/assets/chat_gpt_images/`; its `README.md` lists every file, the prompt it came from and
where it is used. Find every spot still waiting for a real photo with:

```sh
grep -rn 'data-photo-slot\|replaceWith=\|data-placeholder-image\|chat_gpt_images' src
```

Easiest way to swap: put the real photo in `src/assets/photos/` (create it), then change the `import` line that points
at the placeholder. Keep the same aspect ratio so layouts don't shift; Astro handles resizing and WebP. Aim for at
least the pixel sizes below (larger is fine). Real photos can stay as JPG.

| Section | Placeholder file(s) | Imported in | Aspect / size |
| --- | --- | --- | --- |
| Homepage hero, tablet/desktop | `H02-hero-partial-face.png` | `src/pages/index.astro` (`heroWide`) | 16:9 landscape, 1672×941 |
| Homepage hero, phones | `H03-hero-vertical.png` | `src/pages/index.astro` (`heroTall`) | 9:16 portrait, 941×1672 |
| Homepage lip service cards | `H05-lip-portrait.png`, `L03-deep-skin-lips.png`, `R25-reel-treatment.png` | `src/pages/index.astro` | 4:5 portrait, 1122×1402 |
| Homepage skin service cards | `S02-stretch-marks-arm.png`, `S06-scar-arm.png`, `S08-vitiligo-hand.png`, `H13-shoulder-skin.png` | `src/pages/index.astro` | currently mixed (cards crop with CSS); 4:5 portrait at 1122×1402 or larger is safest |
| Results before/healed slider (homepage, Results page, service pages) | `R11-blush-*`, `R12-neutralization-*`, `R13-ombre-*`, `R18-scar-*` (`-before.png` + `-healed.png`) | `src/data/services.ts` (`pairs`) | 16:10 landscape, 1586×992 |
| "The artist" section portrait (homepage) and About page portrait | `R01-artist-portrait.png` | `src/pages/index.astro`, `src/pages/about.astro` | 4:5 portrait, 1122×1402 |
| Studio / consultation inset, About and Services pages | `R23-reel-consultation.png`, `R24-reel-pigment-prep.png`, `H11-tools-flat-lay.png` | `index.astro`, `about.astro`, `services/index.astro` | R23/R24: 3:4 portrait, 1086×1448; H11: 3:2 landscape, 1536×1024 |
| Reel row (four vertical cards linking to Instagram) | `R23-…`, `R24-…`, `R25-reel-treatment.png`, `R30-reel-healed.png` | `src/pages/index.astro` (`reels`) | 3:4 portrait, 1086×1448 |
| Closing "next step" background, service pages | `H16-footer-lips.png` | `services/index.astro`, `services/[slug].astro` | 16:9 landscape, 1672×941 |
| Service page hero images | `H05-…`, `L03-…`, `H01-lip-macro.png`, `S02-…`, `S06-…`, `S08-…`, `H13-…` | `src/data/services.ts` | currently mixed (cropped with CSS); match the file you replace, at least as large |

Notes:

- **Before/healed pairs must be pixel-aligned**: same framing, same crop, same size, so only the treated area changes
  as the slider moves. Each pair is one entry in `pairs` in `src/data/services.ts` (`before`, `after`, `key`, `brief`,
  `sessions`, `stage`). Add a pair there and include it in `comparePairs` in `index.astro` to show it on the homepage.
- The reel row is currently hidden (`SHOW_RETIRED = false` in `index.astro`, along with the specialties, approach and
  colour sections). Reels are still images linking to Instagram; real videos are not wired up yet and an embed would
  need a CSP change.
- `<Placeholder ... replaceWith="R07">` wraps an AI image and records which real shot should replace it. When you
  swap in a real photo you can replace `<Placeholder>` with a plain `<Image>`.
- `<PhotoSlot brief="R.." label="...">` is an empty labelled frame; replace it with an `<Image>` of the real photo.
- Update `src/assets/chat_gpt_images/README.md` when you remove or replace a placeholder, and delete placeholder files
  once nothing imports them.
- Write real `alt` text for real photos. Don't use the owner's name in alt text outside the About page.

## Deploying

Deploys go to the Cloudflare Pages project named `blush-beauty-by-zee` (see `wrangler.toml`).

```sh
npx wrangler login     # once, opens a browser to sign in to Cloudflare
npm run deploy         # astro build && wrangler pages deploy dist
```

- Deploy from `main`. A deploy from another branch becomes a preview deploy, not production; add `--branch main` to
  the wrangler command if you really need to publish from elsewhere.
- You need access to the Cloudflare account that owns the existing project. If you don't have it, either ask the
  current owner to add you to that Cloudflare account, or create your own Pages project and change the name in
  `wrangler.toml` (`name = "..."`). The `deploy` script in `package.json` reads the project from `wrangler.toml`;
  if you pass `--project-name` there, update that too.
- Never commit Cloudflare API tokens, account IDs or `.env` files. `wrangler login` stores credentials outside the
  repo.

## Rules for agents

1. Run `npm run build` (and ideally `npm run check`) before committing; don't commit a broken build.
2. Never commit secrets, tokens, account IDs, `.env` files, `dist/` or `node_modules/`.
3. Keep changes small and focused; one topic per branch.
4. Work on a branch and open a pull request to `main`. Don't push straight to `main`.
5. Respect the content rules above: no fake reviews or results, owner's name only on the About page, contact email
   `blushbeautybyzee@gmail.com` only.
6. Keep the site working with JavaScript off and with reduced motion. Don't add third-party scripts, fonts or embeds
   without updating `public/_headers` on purpose.
7. Check layout at phone width (about 375px) as well as desktop when you change markup or CSS.
