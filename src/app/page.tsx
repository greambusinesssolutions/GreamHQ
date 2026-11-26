import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import NumberStrip from "@/components/NumberStrip";
import Marquee from "@/components/Marquee";
import IndexRows from "@/components/IndexRows";
import CaseCard from "@/components/CaseCard";
import Quote from "@/components/Quote";
import SixSteps from "@/components/SixSteps";
import Faq from "@/components/Faq";
import StatusTag from "@/components/StatusTag";
import BusinessCheckForm from "@/components/BusinessCheckForm";
import { getExample, getFaqs, getInsights, getStats, getWork } from "@/lib/content";
import { site, whatsappHref } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import s from "./home.module.css";

export const metadata = pageMeta({
  title: "GREAM Business Solutions · Business systems and AI for growing businesses",
  description: "Stop losing customers between enquiry and payment. Systems and AI that work in the channels you already use, and keep getting better every month. Free 20-minute check.",
  path: "/",
});

const whatWeDo = [
  { title: "Never lose a customer", text: "Every enquiry answered and followed up, and every payment tracked, in one place.", href: "/what-we-do/never-lose-a-customer" },
  { title: "Reply faster, chase less", accent: "chase less", text: "AI team members that reply, follow up and check payments, day or night. Work that took hours, done in minutes, with your team approving what matters.", href: "/what-we-do/reply-faster" },
  { title: "Products that grow with you", text: "Start this week on a monthly plan. Built on modern AI, so it gets better every month without you lifting a finger.", href: "/products" },
  { title: "Grow with a long-term partner", text: "Ongoing improvement, new ideas and products built together, year after year.", href: "/what-we-do/long-term-partner" },
];

const points = [
  ["Fixed price", "The cost and result in writing first."],
  ["Yours to keep", "What we make is yours."],
  ["Straight answers", "We'll tell you if you don't need us."],
  ["Across time zones", "We work on your hours."],
];

const homeInsights = ["missed-enquiries-cost", "follow-up-gap", "paid-on-time"];

export default function Home() {
  const work = getWork();
  const featured = work.filter((w) => w.data.featured).slice(0, 2);
  const compact = work.filter((w) => !w.data.featured).slice(0, 3);
  // Only a real, approved quote goes here. Until there is one, the section carries the promise instead.
  const quoted = work.find((w) => w.data.quote && !w.data.sample);
  const all = getInsights();
  const insights = homeInsights.map((slug) => all.find((x) => x.slug === slug)).filter((x): x is (typeof all)[number] => !!x);
  const ledger = getExample("home-ledger");

  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="hero-title">
        <div className="wrap">
          <p className="eyebrow">Business systems and AI for growing businesses</p>
          <h1 className="t-display" id="hero-title">
            Stop losing customers between <em>enquiry</em> and <em>payment.</em>
          </h1>
          <div className={s.heroGrid}>
            <div>
              <p className="t-lede">
                Every missed message, forgotten follow-up and late payment is money leaving your business. We stop the leaks with systems and AI that work in the channels you already use, and keep getting better every month.
              </p>
              <div className={`actions ${s.heroActions}`}>
                <Link className="btn btn-primary" href="#contact">Find out what it&apos;s costing you <span className="arr" aria-hidden="true">→</span></Link>
                <Link className="btn btn-line" href="/work">See our work</Link>
              </div>
              <p className={`t-small muted ${s.heroNote}`}>Free 20-minute check. You&apos;ll leave knowing your number, whether you work with us or not.</p>
            </div>
            <figure className={s.ledger} aria-label="Example: a live ledger of enquiries moving to payment">
              <div className={s.ledgerHead}><span className="t-label">{ledger.label}</span></div>
              {ledger.rows.map((r) => (
                <div className={`t-small ${s.ledgerRow}`} key={r.who}>
                  <span>{r.who}</span><span className={s.ledgerWhat}>{r.what}</span><StatusTag status={r.status} />
                </div>
              ))}
              <figcaption className={`t-caption ${s.ledgerCap}`}>One customer. One record. Nothing slips.</figcaption>
            </figure>
          </div>
          <NumberStrip items={getStats("home")} className={s.strip} />
        </div>
      </section>

      <Marquee label="Trusted by businesses across [REGIONS]" />

      <section className="section" id="what-we-do" aria-labelledby="wwd-h">
        <div className="wrap">
          <div className="head-split">
            <SectionHeading eyebrow="What we do" heading="Four ways we help you grow." accent="grow." id="wwd-h" />
            <p className="t-lede">We start with what it&apos;s costing you, then fix the part that pays back fastest.</p>
          </div>
          <IndexRows size="large" rows={whatWeDo} />
        </div>
      </section>

      <section className="section tight-top" aria-labelledby="work-h">
        <div className="wrap">
          <div className="head-row">
            <SectionHeading eyebrow="Selected work" heading="Results you can measure." accent="measure." id="work-h" />
            <Link className="text-link" href="/work">All work →</Link>
          </div>
          <div className={s.featured}>
            {featured.map((w, i) => <CaseCard key={w.slug} entry={w} variant="featured" dark={i === 0} />)}
          </div>
          <div className={s.compact}>
            {compact.map((w) => <CaseCard key={w.slug} entry={w} variant="compact" />)}
          </div>
        </div>
      </section>

      <section className="section ground-sage" aria-label={quoted ? "What a client says" : "Our promise"}>
        <div className="wrap">
          {quoted?.data.quote ? (
            <Quote {...quoted.data.quote} />
          ) : (
            <p className={`t-display ${s.promise}`}>Most things you buy get older. <em>What we build for you gets better.</em></p>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="how-h">
        <div className="wrap">
          <SectionHeading eyebrow="How we work" heading="From first call to results, in plain sight." accent="in plain sight." id="how-h" className="head-block" />
          <SixSteps />
        </div>
      </section>

      <section className="section dark" id="company" aria-labelledby="company-h">
        <div className="wrap cols-2">
          <SectionHeading eyebrow="Company" heading="People who care how your business runs." accent="business runs." id="company-h" />
          <div>
            <p className={`t-lede ${s.companyText}`}>
              A focused team working with businesses across [REGIONS]. You speak to the people doing the work, and they&apos;re still here when it&apos;s time to improve it.
            </p>
            <Link className={`text-link ${s.aboutLink}`} href="/about">About us →</Link>
            <dl className={s.promises}>
              {points.map(([k, v]) => (
                <div className={s.point} key={k}><dt className={`t-label ${s.pl}`}>{k}</dt><dd className="t-small muted">{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className={s.partner} aria-labelledby="partner-h">
        <div className={`wrap ${s.partnerIn}`}>
          <div className={s.partnerText}>
            <SectionHeading eyebrow="Partner programme" heading="Build products and grow, together." accent="together." id="partner-h" />
            <p className={`t-lede ${s.partnerLede}`}>Introduce businesses, deliver alongside us, offer what we make under your own brand, or build a product with us, all on clear terms in writing.</p>
          </div>
          <Link className="btn btn-line" href="/partners">Become a partner <span className="arr" aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="section" aria-labelledby="ins-h">
        <div className="wrap">
          <div className="head-row">
            <SectionHeading eyebrow="Insights" heading="Thinking for growing businesses." accent="growing businesses." id="ins-h" />
            <Link className="text-link" href="/insights">All insights →</Link>
          </div>
          <div className={s.insights}>
            {insights.map((x) => (
              <Link className={s.insight} key={x.slug} href={`/insights/${x.slug}`}>
                <span className="t-label">{x.data.type}</span>
                <span className="t-title">{x.data.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight-top" aria-labelledby="faq-h">
        <div className="wrap cols-2">
          <SectionHeading eyebrow="Questions" heading="Questions owners ask us." accent="ask us." id="faq-h" />
          <Faq items={getFaqs(["pricing", "gets-better", "channels", "data-safe", "change-how-we-work", "ownership", "regions"])} />
        </div>
      </section>

      <section className="section dark ledger-grid" id="contact" aria-labelledby="contact-h">
        <div className="wrap">
          <p className="eyebrow">Your next step</p>
          <h2 className="t-display" id="contact-h">Let&apos;s find what it&apos;s <em>costing you.</em></h2>
          <div className={s.contactGrid}>
            <div className={s.contactAside}>
              <p className="t-lede">Twenty minutes. A real number. An honest answer about whether we can help.</p>
              <p className={`t-small ${s.alt}`}>
                Rather talk first? <a href={whatsappHref} target="_blank" rel="noopener">Message us on WhatsApp</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </div>
            <BusinessCheckForm endpoint={site.endpoints.check} email={site.email} bookingUrl={site.bookingUrl} />
          </div>
        </div>
      </section>
    </>
  );
}
