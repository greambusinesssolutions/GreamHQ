/* Site settings. Endpoints and the booking page come from environment variables
   (set them in Vercel → Settings → Environment Variables); the values after ?? are
   the fallbacks used when a variable is not set. An empty endpoint makes that form
   open the visitor's email app addressed to `email`. */
const env = process.env;

export const site = {
  name: "GREAM Business Solutions",
  url: "https://www.greamhq.com",
  email: "hello@greamhq.com",
  tagline: "Your Business. Greater Possibilities.",
  descriptor: "Products · Solutions · Services",
  bookingUrl: env.BOOKING_URL ?? "https://cal.com/greamhq/business-check",
  endpoints: {
    check: env.FORM_ENDPOINT_CHECK ?? "https://formspree.io/f/maeovrbp",
    partner: env.FORM_ENDPOINT_PARTNER ?? "",
    newsletter: env.NEWSLETTER_ENDPOINT ?? "",
  },
  // WhatsApp: digits with country code; the number is never shown on the page.
  whatsapp: "2349019291681",
  whatsappMessage: "Hi, I'd like to find out more about a free business check.",
};

/** Private preview: noindex on every page, robots.txt blocks everything, no sitemap.
    The site is public: set PREVIEW_MODE=true (Vercel → Environment Variables) to hide it again. */
export const previewMode = env.PREVIEW_MODE === "true";


export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
export { nav, bookHref } from "./nav";
