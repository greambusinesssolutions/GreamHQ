The GREAM Business Solutions site is visually clean but feels flat and static. Make it feel alive, as if the business is working in front of the visitor, while keeping the current design system exactly: the same fonts (Instrument Serif, Instrument Sans, IBM Plex Mono), the same colours (deep green #0d2b23, cream #f1f3ef, vermilion #c9431f/#b23a1a), the same grid, and plenty of white space. No gradients-for-decoration, no glassmorphism, no emoji, no stock "AI" visuals. Motion should feel calm, precise and purposeful, like a well-made financial product, not a template.

1. Hero, a live product moment: replace the static example ledger with a looping animated scene (around 8 to 10 seconds per loop):
   - a WhatsApp-style enquiry arrives;
   - a reply is drafted and approved;
   - a payment link is sent;
   - the payment lands, and the row turns PAID with an amount that counts up.
   Keep it labelled "Example". Pause it when off-screen.

2. A money-at-risk calculator on Home, placed after "Four ways we help you grow":
   - Inputs: two sliders, enquiries per month and average sale value (with a currency switch for $, £ and ₦), plus a "share that never gets a reply" slider defaulting to 20%.
   - Output: a large serif figure showing estimated revenue at risk per month, animating as the sliders move, with one line of explanation and a "Book a free business check →" button.
   - Label it clearly as an estimate.

3. Change the pace of the page. Break up the repeated label + heading + grid rhythm:
   - one full-width dark green section with very large type, for the "How we work" steps, where each step highlights as it scrolls into view;
   - one bold vermilion band for the final call to action;
   - one oversized number or statement moment.

4. Make the case-study cards live: replace the abstract grey bars with small animated product scenes in the same style. For example, a balance clearing to zero, a reminder going out and getting a reply, or a chat bubble exchange that types out. Play them only on hover (desktop) or when in view (phone).

5. Add hover and touch states everywhere:
   - cards lift slightly with a soft shadow;
   - arrows slide 4px;
   - list rows highlight;
   - nav links get an underline that draws in;
   - buttons get a subtle fill shift.

6. Subtle depth:
   - a faint grid or ledger-line texture that drifts very slowly behind the hero;
   - numbers count up the first time they appear (skip "—" placeholders);
   - section headings reveal line by line.

Rules:
- Use CSS and small vanilla JS or the site's existing framework only. No heavy animation libraries unless already installed.
- Keep it fast: Lighthouse performance above 90 on mobile, animations on transform and opacity only.
- Respect prefers-reduced-motion with a static but still well-composed version.
- Everything must work and look intentional on phone (360px) as well as desktop.
- Don't change any copy except where a new section needs a short label.

Keep PREVIEW_MODE on. When done, give me the preview link, plus a short list of each change and where to see it.
