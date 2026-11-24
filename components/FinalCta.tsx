import { contactHref, contactLinkProps, hasWhatsApp, site } from "@/lib/site";
import { Arrow } from "./icons";

export default function FinalCta() {
  return (
    <section className="final dark" aria-labelledby="final-title">
      <div className="big-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="wrap final-grid" style={{ position: "relative" }}>
        <div>
          <p className="eyebrow">Your next step</p>
          <h2 className="h-display" id="final-title">
            Let&apos;s find what is costing your business customers and revenue.
          </h2>
          <p className="lede">
            In 20 minutes we&apos;ll talk through how enquiries and sales work in your business today, spot any gaps, and
            tell you honestly whether GREAM can help.
          </p>
        </div>
        <div className="final-side">
          <a className="btn btn-primary" href="#assessment">
            Book a free 20-minute business check <Arrow />
          </a>
          <a className="btn btn-line" href={contactHref} {...contactLinkProps}>
            <span>{hasWhatsApp ? "Speak with us on WhatsApp" : "Email us"}</span>
          </a>
          <p className="fine">
            No obligation to go further. Or email{" "}
            <a className="mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
