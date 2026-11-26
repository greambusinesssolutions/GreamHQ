import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { site } from "@/data/site";
import s from "./Footer.module.css";

const whatWeDo = [
  { href: "/what-we-do/never-lose-a-customer", label: "Never lose a customer" },
  { href: "/what-we-do/reply-faster", label: "Reply faster, chase less" },
  { href: "/products", label: "Products" },
  { href: "/partners", label: "Partnerships" },
];

const company = [
  { href: "/about", label: "About" },
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
            <p className={`t-small muted ${s.intro}`}>One useful idea a month.</p>
            <NewsletterForm id="footer-nl" />
          </div>
        </div>
        <div className={`t-caption ${s.base}`}>
          <span>© {site.name}</span>
          <span className={s.legal}>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms</Link>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
