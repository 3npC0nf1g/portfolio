# Steve Teuma, portfolio

Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Every page is static except the optional chat API.

## Edit content
All copy, links and placeholders live in **`content/site.ts`**. Components only read from it.
Open items are listed in **`TODO.md`**.

## Change colors and fonts
Design tokens are at the top of **`app/globals.css`** (`:root`, the dark-mode block and `@theme`).
Fonts are loaded in `app/layout.tsx` (Space Grotesk for headings, DM Sans for body).

## Commands
```sh
npm run dev         # local dev server
npm run build       # production build
npm start           # serve the build on http://localhost:3100
npm run lint
npm run lighthouse  # needs `npm start` running; fails if any score is below 95
node scripts/a11y-check.mjs   # keyboard focus + 44px touch targets (needs `npm start`)
node scripts/shot.mjs / 360 light out.png   # screenshot for review
```

## Structure
```
app/            routes, metadata, OG image, icon, sitemap, robots, /api/ask
components/     page sections + ui/ primitives
content/site.ts all copy
lib/            OG font, chat prompt, rate limiter
scripts/        Lighthouse, a11y and screenshot helpers
```

## Optional chat
"Ask about Steve" is off unless `ASK_ENABLED=true` and `ANTHROPIC_API_KEY` are set at build time.
It answers only from `content/site.ts` (see `lib/ask.ts`). See `.env.example` and `TODO.md`.
