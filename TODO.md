# Before you launch

Everything below lives in `content/site.ts` unless noted. Search that file for `TODO`.
Each unfilled item shows on the page as a dashed `[TODO]` box, so nothing slips through.

## Done
- [x] Photo (`public/steve.jpg`)
- [x] LinkedIn and GitHub links
- [x] Second photo (`public/steve-teuma-2.png`) in "More about me"
- [x] Resume (`public/steve-teuma-resume.pdf`), downloadable from the header, hero and Contact
- [x] Email: `contact.email.address` in site.ts, never shown as text on the page

## Voice assistant case study (`caseStudy` in site.ts)
- [ ] `role`: your role and team size
- [ ] `timeframe`: when and how long
- [ ] Problem: who the client was (or a general description), how orders came in, what made them slow
- [ ] Approach: what data RAG retrieves from, which backend systems you integrated, how you handle errors
- [ ] Stack: confirm languages, cloud and speech services
- [ ] Result: any other results you can share (volume, accuracy)
- [ ] What I would do next: your own next steps

## Projects
- [ ] Matching system and agent workflow cards: add `href` if you write them up (`projects.items`)
- [ ] Extra projects: add more entries to `projects.items`
- [ ] Testimonials: none yet. Ask before adding a section for them.

## Site
- [ ] `NEXT_PUBLIC_SITE_URL`: set in Vercel once your domain is live (see below)

---

# Deploy to Vercel

1. Push the repo to GitHub:
   ```sh
   git add -A && git commit -m "Portfolio site"
   gh repo create portfolio --private --source=. --push   # or create it on github.com and push
   ```
2. Go to https://vercel.com/new, sign in with GitHub and **Import** the repo.
   Framework preset: Next.js (detected automatically). Leave build settings as they are.
3. **Environment variables** (Project → Settings → Environment Variables), for Production:
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com` (skip until you have a domain; Vercel's URL is used meanwhile)
4. Click **Deploy**. Every push to `main` redeploys automatically.

# Connect a custom domain

1. Vercel → your project → **Settings → Domains** → add `yourdomain.com` (and `www.yourdomain.com`).
2. At your domain registrar, add the DNS records Vercel shows. Usually:
   - Apex `yourdomain.com`: **A** record → `76.76.21.21`
   - `www`: **CNAME** → `cname.vercel-dns.com`
   (Or switch the domain's nameservers to Vercel's, if you prefer Vercel to manage DNS.)
3. Wait for Vercel to show **Valid Configuration** (minutes to a few hours). HTTPS is issued automatically.
4. Pick one as primary (e.g. apex) and let Vercel redirect the other to it.
5. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in Vercel and **redeploy**, so the canonical URLs,
   sitemap, Open Graph image and JSON-LD use your domain.
6. Optional: submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

# Optional: turn on "Ask about Steve"

1. Create an API key at https://platform.claude.com (set a monthly spend limit there too).
2. In Vercel, add `ANTHROPIC_API_KEY` (mark it **Sensitive**) and `ASK_ENABLED=true`, then redeploy.
   The flag is read at build time, so a redeploy is needed to switch it on or off.
3. Optional: `ASK_MODEL`, `ASK_RATE_LIMIT` (per visitor per 10 min, default 10), `ASK_DAILY_CAP` (default 300).
4. Rate limiting is per server instance. For a strict global limit, swap `lib/rate-limit.ts` for Upstash Redis.
