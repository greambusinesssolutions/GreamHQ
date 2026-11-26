import { contactHref, contactLinkProps, hasWhatsApp, site } from "@/lib/site";
import { Mark } from "./icons";

const explore = [
  { href: "#solutions", label: "What we do" },
  { href: "#how", label: "How we work" },
  { href: "#packages", label: "Packages" },
  { href: "#questions", label: "Questions" },
];

export default function Footer() {
  const regNo = site.companyRegNo.trim();
  return (
    <footer className="foot dark">
      <div className="wrap">
        <div className="foot-in">
          <div>
            <a className="brand" href="#top" aria-label="GREAM Business Solutions, back to top">
              <Mark />
              <span className="wm">
                <b>GREAM</b>
                <small>Business Solutions</small>
              </span>
            </a>
            <p className="tag-l">Your Business. Greater Possibilities.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {explore.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Talk to us</h4>
            <ul>
              <li>
                <a href={site.calUrl}>Free business check</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              {hasWhatsApp && (
                <li>
                  <a href={contactHref} {...contactLinkProps}>
                    WhatsApp
                  </a>
                </li>
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
