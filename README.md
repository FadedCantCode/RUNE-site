# rune-site

Landing page for the RUNE divergence-risk linter project. Static Next.js app, no
server-side API routes, no API keys involved. Links out to the project's GitHub repo.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

```bash
npm install -g vercel   # if you don't already have it
vercel
```

Follow the prompts. No environment variables are required for this site since it's
purely informational; it doesn't call any model APIs. (The actual linter and runtime
live in the main RUNE repo and run locally with your own API keys, by design, see that
repo's README for why live API calls were kept out of anything publicly deployed.)

## Updating content

- `app/page.tsx` assembles the sections.
- `components/Hero.tsx`, `HowItWorks.tsx`, `CorrelationExample.tsx`, `Status.tsx` hold
  the actual copy and data shown on the page.
- `Status.tsx` in particular should be kept honest: update the `items` array whenever
  something moves from "open question" to "validated" or vice versa. Don't let this
  page's claims drift ahead of what's actually been tested in the reference
  implementation.
