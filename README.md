# GREAM Business Solutions website

Next.js (App Router), exported as static HTML and hosted on Vercel at greamhq.com.
Design system: GREAM · The Ledger system (`src/styles/tokens.json`).

## Edit content

Everything a client sees lives in `content/`. Each folder or file is checked against a schema at build time, so a typo fails the build and names the file.

| To add or change | Edit |
|---|---|
| A case study | Add one Markdown file to `content/work/` |
| A product | Add one Markdown file to `content/products/` |
| An insight (article) | Add one Markdown file to `content/insights/` |
| A service page | `content/services/<slug>.md` |
| Solutions, FAQs, partner models, number strips, client names, team | The JSON files in `content/` |
| Privacy policy, terms | `content/pages/` |

### Sample data and placeholders

Client names, numbers, quotes, prices and case studies copied from the designs are **sample data**, marked `sample: true`. Placeholders are written `[IN SQUARE BRACKETS]` or `[TO WRITE: …]`.

**Production builds refuse to run while any remain** (`scripts/check-content.mjs`). Preview builds show them, with a "Preview build" bar at the top. Replace sample content with real, approved content and remove `sample: true`.

## Settings

Set these in Vercel → Settings → Environment Variables (defaults in `src/data/site.ts`):

| Variable | What it does |
|---|---|
| `FORM_ENDPOINT_CHECK` | Where the free business check form sends answers (Formspree) |
| `FORM_ENDPOINT_PARTNER` | Partner application form |
| `NEWSLETTER_ENDPOINT` | Newsletter sign-up |
| `BOOKING_URL` | Booking page opened at step 4 of the business check |
| `PREVIEW_MODE` | `true` by default: private preview. Every page is `noindex, nofollow`, `robots.txt` blocks all crawlers and no sitemap is published. Set to `false` to go public. |

A form with no endpoint opens the visitor's email app addressed to hello@greamhq.com.

## Run it locally

```sh
npm install
npm run dev                     # http://localhost:3000
npm run build                   # static site in out/, then the content check
CONTENT_STRICT=1 npm run build  # the production check, locally
```

## Publish

Every push builds a Vercel preview, and that preview URL is where the new site is reviewed.

`main` deploys greamhq.com. Leave greamhq.com unchanged until the team says to switch. Production builds also run the sample-data check above.
