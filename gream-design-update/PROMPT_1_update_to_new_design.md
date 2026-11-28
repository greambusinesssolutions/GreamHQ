The site is already built from the GREAM Business Solutions designs. There's an updated version of the designs in gream-design-update/design-no-sample-data (seven .dc.html files, same pages). Update the built site to match them. Don't redesign or start over. Keep everything that already works.

1. Remove all sample data and leave empty slots, exactly as the new designs show:
   - Stats (projects, countries, clients staying, rating, result figures) show "—", with their labels kept.
   - Case studies: client names become "Client name: what changed", industry/country tags become "Industry · Country", results become "—" and "Result to come".
   - The logo strip shows "Client logo" in each slot.
   - The testimonial becomes a quote placeholder, with "Client name" and "Role, company".
   - Product prices become "From $— a month". The AI pilot line becomes "Pilots start from $— and take about — weeks." The referral share becomes "—% of paid invoices".
   - PaidUp's badge becomes "Early access", and its button becomes "Request access".
   - Keep every slot in the content files, so real data can be dropped in later without touching layout.
   - Keep Insights articles, example product screens and all other copy unchanged.

2. Add the phone improvements from the new designs:
   - Under 1000px: a "Menu" button in the header that opens a full-width panel with links to Home, What we do, Products, Work, Company, Partners and Insights, in large serif type.
   - Under 640px:
     - the header button text becomes "Book a check";
     - a fixed "Book a free business check →" button sits at the bottom of the screen on every page, and the page gets enough bottom padding so nothing is hidden behind it;
     - hero 46px, section headings 38px, section padding 64px top and bottom, large margins reduced to 44px;
     - stat strips two across;
     - the testimonial quote at 30px.

3. Add the motion from the new designs:
   - Hero headline rises in on load, with the content after it following 0.18s later.
   - The Home example ledger: rows slide in one after another, a pulsing green "live" dot, and status badges that pop gently every few seconds.
   - Sections fade and rise in on scroll (use scroll-driven animations where supported, with IntersectionObserver as the fallback).
   - Links, buttons and cards press in slightly when tapped.
   - Turn all motion off under prefers-reduced-motion.

Keep PREVIEW_MODE on. Test at 360, 768, 1100 and 1440px. Then give me the preview link and a short list of what changed, plus anything that still differs from the designs.
