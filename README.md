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

### Sample content

Client names, numbers, quotes, prices and case studies come from the designs and ship as they are. Each one lives in a content file, so replacing it needs no code changes.

## Settings

Set these in Vercel → Settings → Environment Variables (defaults in `src/data/site.ts`):

| Variable | What it does |
|---|---|
| `FORM_ENDPOINT_CHECK` | Where the free business check form sends answers (Formspree) |
| `FORM_ENDPOINT_PARTNER` | Partner application form |
| `NEWSLETTER_ENDPOINT` | Newsletter sign-up |
| `BOOKING_URL` | Booking page opened at step 4 of the business check |
| `PREVIEW_MODE` | Off by default: the site is public. Set to `true` for a private preview: every page is `noindex, nofollow`, `robots.txt` blocks all crawlers and no sitemap is published. |

A form with no endpoint opens the visitor's email app addressed to hello@greamhq.com.

## Run it locally

```sh
npm install
npm run dev                     # http://localhost:3000
npm run build                   # static site in out/
```

## Publish

Every push builds a Vercel preview, and that preview URL is where the new site is reviewed.

`main` deploys greamhq.com. Leave greamhq.com unchanged until the team says to switch.

## Illustrative examples

Sample clients, figures, quotes, products and prices from the designs carry `example: true` in their content file, which shows an "Illustrative example" label on the page. When a real, approved case, figure or price replaces one, delete that line and the label disappears.
