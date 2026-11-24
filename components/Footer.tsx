import { contactHref, contactLinkProps, hasWhatsApp, site } from "@/lib/site";
import { Mark } from "./icons";

export default function Footer() {
  const regNo = site.companyRegNo.trim();
  return (
    <footer className="foot dark" id="company" style={{ scrollMarginTop: 76 }}>
      <div className="wrap">
        <div className="foot-in">
          <div>
            <a className="brand" href="#top" style={{ color: "var(--ink-on-dark)" }} aria-label="GREAM Business Solutions, back to top">
              <Mark />
              <span className="wm">
                <b>GREAM</b>
                <small>Products · Solutions · Services</small>
              </span>
            </a>
            <p className="tag-l">Your Business. Greater Possibilities.</p>
          </div>
          <div>
            <h4>Solutions</h4>
            <ul>
              <li><a href="#solutions">Enquiry to sale</a></li>
              <li><a href="#solutions">Orders and payments</a></li>
              <li><a href="#solutions">Reporting</a></li>
              <li><a href="#custom">Custom work</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#how">How We Work</a></li>
              <li><a href="#packages">Packages</a></li>
              <li><a href="#questions">Questions</a></li>
            </ul>
          </div>
          <div>
            <h4>Talk to us</h4>
            <ul>
              <li><a href="#assessment">Free business check</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              {hasWhatsApp && (
                <li><a href={contactHref} {...contactLinkProps}>WhatsApp</a></li>
              )}
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>
            © {new Date().getFullYear()} GREAM Business Solutions
            {regNo && ` · ${regNo}`}
          </span>
          <span className="foot-legal">
            {site.privacyUrl && <a href={site.privacyUrl}>Privacy policy</a>}
            {site.termsUrl && <a href={site.termsUrl}>Terms of service</a>}
          </span>
        </div>
      </div>
    </footer>
  );
}
