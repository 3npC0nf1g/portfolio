# Steve Teuma, portfolio

Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Every page is static except the optional chat API.

## Edit content
All English copy, links and placeholders live in **`content/site.ts`**; the French version is
**`content/site.fr.ts`** (same shape; the build fails if a field is missing). Shared values
(photos, links, email, resume) are only set in `site.ts`. Open items are listed in **`TODO.md`**.

## Pages and languages
Every page exists in English and French: `/en`, `/en/about`, `/en/projects`,
`/en/projects/voice-assistant`, `/en/contact` (and the same under `/fr`). Visiting `/` sends
people to French if their browser prefers it, otherwise English (`proxy.ts`). The EN/FR button
in the header switches to the same page in the other language.

## Change colors and fonts
Design tokens are at the top of **`app/globals.css`** (`:root`, the dark-mode block and `@theme`).
Fonts are loaded in `app/[lang]/layout.tsx` (Gabarito for headings, Figtree for body).

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
app/[lang]/     pages (home, about, projects, case study, contact), layout, OG image
app/            icon, sitemap, robots, /api/ask
proxy.ts        language redirect for "/"
components/     page sections + ui/ primitives
content/        site.ts (English) and site.fr.ts (French)
lib/            OG font, chat prompt, rate limiter
scripts/        Lighthouse, a11y and screenshot helpers
```

## Optional chat
"Ask about Steve" is off unless `ASK_ENABLED=true` and `ANTHROPIC_API_KEY` are set at build time.
It answers only from `content/site.ts` (see `lib/ask.ts`). See `.env.example` and `TODO.md`.
