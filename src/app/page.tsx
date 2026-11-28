import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import NumberStrip from "@/components/NumberStrip";
import Marquee from "@/components/Marquee";
import IndexRows from "@/components/IndexRows";
import CaseCard from "@/components/CaseCard";
import Quote from "@/components/Quote";
import HeroScene, { type SceneCopy } from "@/components/motion/HeroScene";
import RiskCalculator from "@/components/motion/RiskCalculator";
import StepsScroll from "@/components/motion/StepsScroll";
import { steps } from "@/data/steps";
import Faq from "@/components/Faq";
import BusinessCheckForm from "@/components/BusinessCheckForm";
import { getExample, getFaqs, getInsights, getServices, getStats, getWork } from "@/lib/content";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import s from "./home.module.css";

export const metadata = pageMeta({
  title: "GREAM Business Solutions · Stop losing customers between enquiry and payment",
  description: "We help growing businesses answer every enquiry, follow up every lead and see every payment, so nothing slips between the first message and the money in the bank.",
  path: "/",
});

export default function Home() {
  const services = getServices();
  const work = getWork();
  const featured = work.filter((w) => w.data.featured).slice(0, 2);
  const compact = work.filter((w) => !w.data.featured).slice(0, 3);
  const quoted = work.find((w) => w.data.quote);
  // The three insights the home design shows, in its order.
  const all = getInsights();
  const insights = ["what-growing-businesses-run-on", "what-an-ai-agent-should-do", "stop-losing-enquiries"].map((slug) => all.find((x) => x.slug === slug)).filter((x): x is (typeof all)[number] => !!x);

  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="hero-title">
        <div className="wrap">
          <p className="eyebrow">Fewer missed customers · Faster replies · Payments you can see</p>
          <h1 className="t-display" id="hero-title">
            Stop losing customers between <em>enquiry</em> and <em>payment.</em>
          </h1>
          <div className={s.heroGrid}>
            <div>
              <p className="t-lede">
                We help growing businesses answer every enquiry, follow up every lead and see every payment, so nothing slips between the first message and the money in the bank.
              </p>
              <div className={`actions ${s.heroActions}`}>
                <Link className="btn btn-primary" href="#contact">Book a free business check <span className="arr" aria-hidden="true">→</span></Link>
                <Link className="btn btn-line" href="/work">See our work</Link>
              </div>
            </div>
            <HeroScene copy={getExample("home-scene") as SceneCopy} />
          </div>
          <NumberStrip items={getStats("home")} className={s.strip} />
        </div>
      </section>

      <Marquee />

      <section className="section" id="what-we-do" aria-labelledby="wwd-h">
        <div className="wrap">
          <div className="head-split">
            <SectionHeading eyebrow="What we do" heading="Four ways we help you grow." accent="grow." id="wwd-h" />
            <p className="t-lede">We start with how your business really runs, then build what makes the biggest difference.</p>
          </div>
          <IndexRows size="large" rows={services.map((x) => ({ title: x.data.title, accent: x.data.titleAccent, text: x.data.summary, href: `/what-we-do/${x.slug}` }))} />
        </div>
      </section>

      <section className="section tight-top" aria-labelledby="risk-h">
        <div className="wrap">
          <div className="head-split">
            <SectionHeading eyebrow="Money at risk · Estimate" heading="What are unanswered enquiries costing you?" accent="costing you?" id="risk-h" />
            <p className="t-lede">Move the sliders to match your business. You&apos;ll see roughly how much slips away each month when enquiries go unanswered.</p>
          </div>
          <RiskCalculator />
        </div>
      </section>

      <section className="section tight-top" aria-labelledby="work-h">
        <div className="wrap">
          <div className="head-row">
            <SectionHeading eyebrow="Selected work" heading="Results, already in production." accent="in production." id="work-h" />
            <Link className="text-link" href="/work">All work →</Link>
          </div>
          <div className={s.featured}>
            {featured.map((w, i) => <CaseCard key={w.slug} entry={w} variant="featured" dark={i === 0} home />)}
          </div>
          <div className={s.compact}>
            {compact.map((w) => <CaseCard key={w.slug} entry={w} variant="compact" home />)}
          </div>
        </div>
      </section>

      {quoted?.data.quote && (
        <section className="section ground-sage" aria-label="What a client says">
          <div className="wrap"><Quote {...quoted.data.quote} /></div>
        </section>
      )}

      <section className="section dark" aria-labelledby="how-h">
        <div className="wrap">
          <SectionHeading eyebrow="How we work" heading="Six clear steps. You see progress throughout." accent="throughout." id="how-h" className="head-block" />
          <StepsScroll steps={steps} />
        </div>
      </section>

      <section className="section dark" id="company" aria-labelledby="company-h">
        <div className="wrap cols-2">
          <SectionHeading eyebrow="Company" heading="People who care how your business runs." accent="business runs." id="company-h" />
          <div>
            <p className={`t-lede ${s.companyText}`}>
              A team working with clients across Africa, Europe, North America and the Middle East. You speak to the people doing the work, and they are still here after launch.
            </p>
            <Link className={`text-link ${s.aboutLink}`} href="/about">About us →</Link>
            <dl className={s.promises}>
              {[
                ["Fixed price", "Scope, cost and timeline in writing first."],
                ["Yours to keep", "What we make for you is yours."],
                ["Straight answers", "We tell you if you don't need us."],
                ["Across time zones", "Remote by design, on your hours."],
              ].map(([k, v]) => (
                <div className={s.promise} key={k}><dt className={`t-label ${s.pl}`}>{k}</dt><dd className="t-small muted">{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className={s.partner} aria-labelledby="partner-h">
        <div className={`wrap ${s.partnerIn}`}>
          <div className={s.partnerText}>
            <SectionHeading eyebrow="Partner programme" heading="Build products and grow, together." accent="together." id="partner-h" />
            <p className={`t-lede ${s.partnerLede}`}>Referral, delivery, white-label, technology and product partnerships, with clear terms in writing and a long-term view.</p>
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
                <span className="t-title">{x.data.homeTitle ?? x.data.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight-top" aria-labelledby="faq-h">
        <div className="wrap cols-2">
          <SectionHeading eyebrow="Questions" heading="Questions buyers ask us." accent="ask us." id="faq-h" />
          <Faq items={getFaqs(["where-clients", "what-agent", "cost", "product-with-us", "ownership"])} />
        </div>
      </section>

      <section className={`section ${s.band}`} id="contact" aria-labelledby="contact-h">
        <div className="wrap">
          <p className="eyebrow">Your next step</p>
          <h2 className="t-display" id="contact-h">Let&apos;s find what&apos;s costing you <em>customers.</em></h2>
          <div className={s.contactForm}>
            <BusinessCheckForm endpoint={site.endpoints.check} email={site.email} bookingUrl={site.bookingUrl} />
          </div>
          <p className={s.contactMail}><a href={`mailto:${site.email}`}>{site.email}</a></p>
        </div>
      </section>
    </>
  );
}
