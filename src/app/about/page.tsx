import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import NumberStrip from "@/components/NumberStrip";
import IndexRows from "@/components/IndexRows";
import TeamList from "@/components/TeamList";
import StatusTag from "@/components/StatusTag";
import DarkCta from "@/components/DarkCta";
import { getStats } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import s from "./about.module.css";

export const metadata = pageMeta({
  title: "About GREAM Business Solutions · We build what businesses run on",
  description: "GREAM Business Solutions is a company, not an agency: we own products, form long-term partnerships and are judged on results, not hours.",
  path: "/about",
});

const beliefs = [
  { title: "Outcomes over hours", text: "We measure success by what changes in your business, not by the time we spend." },
  { title: "What we make for you is yours", text: "Your systems and your data belong to you." },
  { title: "We tell you if you don't need us", text: "Honest advice comes before any sale." },
  { title: "Think beyond what exists", text: "We look past how things have always been done to find what works better." },
  { title: "Build, don't just discuss", text: "You see working results early, then they keep getting better." },
];

const comparison = [
  ["Who owns the products", "Owns none. Sells time on someone else's.", "We own and run our own products, and what we build for you is yours."],
  ["How long we stay", "Moves on to the next client after launch.", "We stay as a long-term partner: measuring, supporting and improving."],
  ["What we're judged on", "Hours worked and delivering the brief.", "Results: what changes for your business."],
];

const arms = [
  { name: "GREAM Business Solutions", state: "Now", text: "Works with businesses today: products, solutions and long-term partnerships that help them stop losing customers and get paid on time." },
  { name: "GREAM Labs", state: "Exploring", text: "Explores what comes next, so the businesses we serve are ready for it." },
  { name: "More to come", state: "Next", text: "New arms will follow, each built around a problem worth solving.", future: true },
];

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

      <section className="section" aria-labelledby="story-h">
        <div className="wrap cols-2">
          <SectionHeading eyebrow="Our story" heading="One builder, then a company." accent="a company." id="story-h" />
          <div className={`t-lede ${s.story}`}>
            <p>GREAMHQ began with one person building for businesses around the world, fixing what was lost between the first message and the payment, one business at a time.</p>
            <p>The work grew, and so did what we could offer. Today it is a company with its own products, solutions set up around how businesses run, and partners who build with us for the long term.</p>
          </div>
        </div>
      </section>

      <section className="section dark ledger-grid" aria-labelledby="arms-h">
        <div className="wrap">
          <div className="head-split">
            <SectionHeading eyebrow="How we're organised" heading="One company, built to grow arms." accent="grow arms." id="arms-h" />
            <p className="t-lede">GREAMHQ is the parent company. Each arm has one focus, and shares the same standards.</p>
          </div>
          <div className={s.tree}>
            <div className={s.parent}>
              <p className={`t-section ${s.parentName}`}>GREAMHQ</p>
              <p className="t-label">Parent company</p>
            </div>
            <ul className={s.arms}>
              {arms.map((a) => (
                <li key={a.name} className={`${s.arm} ${a.future ? s.future : ""}`}>
                  <p className={`t-label ${s.armState}`}>{a.state}</p>
                  <h3 className={`t-title ${s.armName}`}>{a.name}</h3>
                  <p className={`t-small ${s.armText}`}>{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="believe-h">
        <div className="wrap">
          <SectionHeading eyebrow="What we believe" heading="Five things we hold to, every time." accent="every time." id="believe-h" className="head-block" />
          <IndexRows rows={beliefs} />
        </div>
      </section>

      <section className="section ground-sage" aria-labelledby="agency-h">
        <div className="wrap">
          <SectionHeading eyebrow="Not another agency" heading="A company, not an agency." accent="not an agency." id="agency-h" className="head-block" />
          <div className={s.scroll}>
            <table className={`t-body ${s.table}`}>
              <caption className="sr-only">How GREAM Business Solutions differs from a typical agency</caption>
              <thead>
                <tr>
                  <td />
                  <th scope="col" className="t-label">A typical agency</th>
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
            <p className="t-lede">You speak directly to the people doing the work. We don&apos;t use titles: each of us is known by what we own.</p>
          </div>
          <TeamList />
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

      <DarkCta heading="Build what comes next with us." accent="with us." />
    </>
  );
}
