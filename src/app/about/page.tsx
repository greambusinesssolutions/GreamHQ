import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import IndexRows from "@/components/IndexRows";
import StatusTag from "@/components/StatusTag";
import DarkCta from "@/components/DarkCta";
import { pageMeta } from "@/lib/seo";
import s from "./about.module.css";

export const metadata = pageMeta({
  title: "About GREAM Business Solutions · We build what businesses run on",
  description: "GREAM Business Solutions helps businesses around the world stop losing customers, get paid on time and see how they're really doing, with products, solutions and partnerships that get better over time.",
  path: "/about",
});

const directions = [
  ["Products", "Start this week."],
  ["Solutions", "Fitted to you."],
  ["Partnerships", "Grow together."],
];

const promises = [
  { title: "Results, not hours", text: "We're priced on what changes for you." },
  { title: "What we make is yours", text: "Your system and your data belong to you." },
  { title: "We'll tell you if you don't need us", text: "Honest advice comes before any sale." },
  { title: "It gets better", text: "We keep improving what we've built." },
  { title: "Progress you can see", text: "Early and often." },
];

const comparison = [
  ["Charges for", "Hours", "The result"],
  ["After it's built", "Moves on", "Keeps improving it"],
  ["Over time", "It gets older", "It gets better"],
];

const team = [
  { title: "Product and engineering", text: "Turns how your business works into products and tools that people enjoy using." },
  { title: "Design and experience", text: "Makes every screen, message and step clear for your customers and your team." },
  { title: "Reliability and support", text: "Keeps everything running, safe and improving long after it's up and running." },
  { title: "Growth and partnerships", text: "Finds where we can help most, and builds partnerships that last." },
];

export default function About() {
  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="about-h">
        <div className="wrap">
          <SectionHeading eyebrow="About us" heading="We build what businesses run on." accent="run on." level={1} size="display" id="about-h" />
          <p className={`t-lede ${s.lede}`}>
            GREAM Business Solutions helps businesses around the world stop losing customers, get paid on time and see how they&apos;re really doing, with products, solutions and partnerships that get better over time.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="why-h">
        <div className="wrap cols-2">
          <SectionHeading eyebrow="Why we exist" heading="Built from real business problems." accent="business problems." id="why-h" />
          <p className="t-lede">
            In every market we work in, we saw the same leaks: customers lost between the first message and the payment, teams chasing information, owners who couldn&apos;t see the whole picture. So we fix exactly that, and we keep making it better.
          </p>
        </div>
      </section>

      <section className="section dark ledger-grid" aria-labelledby="going-h">
        <div className="wrap">
          <p className="eyebrow">Where we&apos;re going</p>
          <h2 className="t-display" id="going-h">Every ambitious business, in any market, running as well as <em>the best in the world.</em></h2>
          <ul className={s.directions}>
            {directions.map(([k, v], i) => (
              <li key={k} className={i === 0 ? s.first : undefined}>
                <p className={`t-label ${s.dirLabel}`}>{k}</p>
                <h3 className="t-title">{v}</h3>
              </li>
            ))}
          </ul>
          <p className={`t-lede ${s.closing}`}>As AI and the technology around it improve, so does everything we&apos;ve built for you.</p>
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
            <p className="t-lede">A focused team working across time zones, using the best tools available to move faster without cutting corners. You speak directly to the people doing the work.</p>
          </div>
          <IndexRows rows={team} />
        </div>
      </section>

      <section className="section tight-top" aria-label="Work with us">
        <div className={`wrap ${s.links}`}>
          <Link className={s.linkCard} href="/partners">
            <span className="t-label">Partners</span>
            <span className="t-section">Build products and grow with us</span>
            <span className={s.linkGo}>Become a partner →</span>
          </Link>
          <Link className={s.linkCard} href="/careers">
            <span className={s.cardTop}><span className="t-label">Careers</span><StatusTag status="Coming soon" /></span>
            <span className="t-section">Build what businesses run on</span>
            <span className={s.linkGo}>See careers →</span>
          </Link>
        </div>
      </section>

      <DarkCta heading="Let's build what comes next, together." accent="together." />
    </>
  );
}
