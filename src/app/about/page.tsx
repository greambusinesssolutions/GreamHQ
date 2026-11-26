import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import NumberStrip from "@/components/NumberStrip";
import IndexRows from "@/components/IndexRows";
import DarkCta from "@/components/DarkCta";
import { getStats } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import s from "./about.module.css";

export const metadata = pageMeta({
  title: "About us · GREAM Business Solutions",
  description: "GREAM Business Solutions helps businesses around the world stop losing customers, get paid on time and see how they are really doing, through products, solutions and long-term partnerships.",
  path: "/about",
});

const directions = [
  { label: "Products", title: "Start this week", text: "Ready-made products for the problems every growing business has." },
  { label: "Solutions", title: "Fitted to you", text: "Proven answers, set up around how your business runs." },
  { label: "Partnerships", title: "Grow together", text: "Long-term partners who build products and grow with you." },
];

const promises = [
  { title: "Results, not hours", text: "We measure success by what changes in your business." },
  { title: "What we make is yours", text: "Your systems and your data belong to you." },
  { title: "We tell you if you don't need us", text: "Honest advice comes before any sale." },
  { title: "Fresh thinking", text: "We look beyond how things have always been done to find what works better." },
  { title: "Progress you can see", text: "You see working results early, then they keep getting better." },
];

const comparison = [
  ["What it sells", "Hours and projects", "Results, products and partnerships"],
  ["After launch", "Moves on to the next client", "Stays, measures and keeps improving"],
  ["Judged on", "Delivering the brief", "What changes for your business"],
];

const team = [
  { title: "Product and engineering", text: "Turns how your business works into products and tools that people enjoy using." },
  { title: "Design and experience", text: "Makes every screen, message and step clear for your customers and your team." },
  { title: "Reliability and support", text: "Keeps everything running, safe and improving long after launch." },
  { title: "Growth and partnerships", text: "Finds where we can help most, and builds partnerships that last." },
];

/** About page, built from design/About.dc.html. */
export default function About() {
  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="about-h">
        <div className="wrap">
          <SectionHeading eyebrow="About us" heading="We build what businesses run on." accent="run on." level={1} size="display" id="about-h" />
          <p className={`t-lede ${s.lede}`}>
            GREAM Business Solutions helps businesses around the world stop losing customers, get paid on time and see how they are really doing, through products, solutions and long-term partnerships.
          </p>
          <NumberStrip items={getStats("about")} className={s.strip} />
        </div>
      </section>

      <section className="section" aria-labelledby="why-h">
        <div className="wrap cols-2">
          <SectionHeading eyebrow="Why we exist" heading="Built from real business problems." accent="business problems." id="why-h" />
          <div className={`t-lede ${s.story}`}>
            <p>Across every market we work in, we saw the same thing. Customers lost between the first message and the payment. Teams chasing information instead of serving people. Owners unable to see how their business was really doing.</p>
            <p>So we focus on fixing exactly that, with products you can start using this week, solutions set up around how you work, and partners who stay for the long run.</p>
          </div>
        </div>
      </section>

      <section className="section dark ledger-grid" aria-labelledby="going-h">
        <div className="wrap">
          <p className="eyebrow">Where we&apos;re going</p>
          <h2 className="t-display" id="going-h">Every ambitious business, in any market, running as well as <em>the best in the world.</em></h2>
          <div className={s.directions}>
            {directions.map((d, i) => (
              <article key={d.label} className={i === 0 ? s.first : undefined}>
                <p className={`t-label ${s.dirLabel}`}>{d.label}</p>
                <h3 className="t-title">{d.title}</h3>
                <p className="t-small muted">{d.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="count-h">
        <div className="wrap">
          <SectionHeading eyebrow="What you can count on" heading="Five promises, every time." accent="every time." id="count-h" className="head-block" />
          <IndexRows rows={promises} />
        </div>
      </section>

      <section className="section ground-sage" aria-labelledby="choose-h">
        <div className="wrap">
          <SectionHeading eyebrow="Why businesses choose us" heading="More than a supplier." accent="supplier." id="choose-h" className="head-block" />
          <div className={s.scroll}>
            <table className={`t-body ${s.table}`}>
              <caption className="sr-only">How GREAM Business Solutions differs from a typical supplier</caption>
              <thead>
                <tr>
                  <td />
                  <th scope="col" className="t-label">A typical supplier</th>
                  <th scope="col" className={`t-label ${s.us}`}>GREAM Business Solutions</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([k, them, us]) => (
                  <tr key={k}>
                    <th scope="row" className="t-label">{k}</th>
                    <td className={s.them}>{them}</td>
                    <td className={s.ours}>{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="team-h">
        <div className="wrap">
          <div className={`head-split ${s.teamHead}`}>
            <SectionHeading eyebrow="The team" heading="The people behind the work." accent="the work." id="team-h" />
            <p className="t-lede">A focused team that works across time zones and uses the best tools available, including AI, to move faster without cutting corners. You speak directly to the people doing the work.</p>
          </div>
          <IndexRows rows={team} />
        </div>
      </section>

      <section className="section tight-top" aria-label="Partners">
        <div className="wrap">
          <Link className={s.linkCard} href="/partners">
            <span className="t-label">Partners</span>
            <span className="t-section">Build products and grow with us</span>
            <span className={s.linkGo}>Become a partner →</span>
          </Link>
        </div>
      </section>

      <DarkCta heading="Build what comes next with us." accent="with us." />
    </>
  );
}
