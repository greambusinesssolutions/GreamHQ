# GREAM Business Solutions website

Next.js site, exported as static files and hosted on GitHub Pages.

## Edit the site

- **Contact details, WhatsApp, form, booking and legal links:** `lib/site.ts`
- **Page sections:** `components/` (one file per section, in page order in `app/page.tsx`)
- **Styles:** `app/globals.css`

## Run it locally

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

## Publish

Push to `main`. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the site and deploys it to GitHub Pages
(Settings → Pages → Source must be **GitHub Actions**).
