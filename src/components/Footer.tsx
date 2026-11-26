import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { site } from "@/data/site";
import s from "./Footer.module.css";

// Footer link names as worded in the home design.
const whatWeDo = [
  { href: "/what-we-do/business-systems", label: "Never lose a customer" },
  { href: "/what-we-do/ai-agents", label: "Reply faster, chase less" },
  { href: "/what-we-do/custom-software", label: "Tools that fit" },
  { href: "/what-we-do/products-built-together", label: "Products, built together" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products and solutions" },
  { href: "/work", label: "Work" },
  { href: "/partners", label: "Partners" },
  { href: "/insights", label: "Insights" },
];

export default function Footer() {
  return (
    <footer className={`dark ${s.foot}`}>
      <div className="wrap">
        <div className={s.grid}>
          <div>
            <p className={`t-title ${s.tag}`}>{site.tagline}</p>
            <p className="t-label">{site.descriptor}</p>
          </div>
          <nav aria-label="What we do">
            <p className={`t-label ${s.h}`}>What we do</p>
            <ul className={s.list}>
              {whatWeDo.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className={`t-label ${s.h}`}>Company</p>
            <ul className={s.list}>
              {company.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={`t-label ${s.h}`}>Newsletter</p>
            <p className={`t-small muted ${s.intro}`}>One useful idea, once a month.</p>
            <NewsletterForm id="footer-nl" button="Subscribe →" />
          </div>
        </div>
        <div className={`t-caption ${s.base}`}>
          <span>© {site.name}</span>
          <span className={s.legal}>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
