# Blush Beauty by Zee

Website for Blush Beauty by Zee, a lip artistry and skin revision / camouflage studio in Orléans, Ottawa.
Booking, availability and payments stay on Square; this site is the presentation, education and trust layer.

**Live:** https://blush-beauty-by-zee.pages.dev/

> **This is still a mockup.** Most photos are AI-generated placeholders and some copy (reviews, About story) is demo
> content marked `MOCK` in the source. Swap in the client's real photos and reels, and real copy, before using the site
> publicly. See "Swapping placeholder images" in [AGENTS.md](AGENTS.md) for where each image lives and what size it
> should be.

## Quick start

Needs Node.js 22+ (`nvm use` picks it up from `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the built site locally
```

## Deploy

Hosted on Cloudflare Pages (project `blush-beauty-by-zee`, set in `wrangler.toml`).

```sh
npx wrangler login   # once
npm run deploy       # build + upload dist/ to Cloudflare Pages
```

Deploy from `main`. You need access to the Cloudflare account that owns the project; otherwise create your own Pages
project and change `name` in `wrangler.toml`.

## Stack

Astro (static output), GSAP for a small desktop-only parallax, self-hosted fonts (Bodoni Moda, Montserrat, Ms Madi),
Cloudflare Pages with security headers in `public/_headers`.

## Working with an AI coding agent

Instructions for Codex, Claude Code and similar tools live in [AGENTS.md](AGENTS.md) (`CLAUDE.md` just points to it).
It covers the project layout, design tokens, motion rules, image swapping, deploying and the rules agents should
follow. Keep it up to date when you change how the project works.

Contact email shown on the site: blushbeautybyzee@gmail.com.
