/* ===== GREAM site settings: edit these values ===== */
export const site = {
  email: "hello@greamhq.com",
  // WhatsApp number, digits only with country code, e.g. "2348012345678". Empty = buttons use email.
  whatsappNumber: "",
  // Company registration number for the footer, e.g. "RC 1234567". Empty = hidden.
  companyRegNo: "",
  // Links to your published privacy policy and terms. Empty = links hidden.
  privacyUrl: "",
  termsUrl: "",
  // Booking page (adds step 4, "Choose a time"). Empty = thank-you screen says you'll email to agree a time.
  bookingUrl: "",
  // Where form answers are sent, e.g. a Formspree or Basin endpoint.
  // Empty = the form opens the visitor's email app with their answers addressed to `email`.
  formEndpoint: "",
};
/* ================================================== */

const waDigits = site.whatsappNumber.replace(/\D/g, "");
export const hasWhatsApp = waDigits.length > 0;
export const contactHref = hasWhatsApp ? `https://wa.me/${waDigits}` : `mailto:${site.email}`;
export const contactLinkProps = hasWhatsApp ? { target: "_blank", rel: "noopener" } : {};
