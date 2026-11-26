import { Arrow } from "./icons";

const packages = [
  {
    level: 1,
    kicker: "Package 01",
    name: "Starter",
    pitch: "Fix the one thing costing you the most.",
    best: "A business with one clear bottleneck, such as slow replies or unpaid invoices.",
    items: [
      "A close look at the one workflow to fix",
      "That workflow organised and automated, for example enquiry capture, follow-up reminders or invoice chasing",
      "Set up inside the tools you already use, where possible",
      "Team training and a simple how-to guide",
      "Fixes after launch, as agreed in your scope",
    ],
    support: "Handover and training",
  },
  {
    level: 2,
    mid: true,
    kicker: "Package 02 · The core system",
    name: "Standard",
    pitch: "Connect your enquiries, orders and payments.",
    best: "Businesses losing track somewhere between first enquiry and final payment.",
    items: [
      "Every enquiry captured in one place, from every channel",
      "Automatic follow-up reminders and a clear sales pipeline",
      "Quotes, orders and invoices connected, so details are typed once",
      "Payment status for every customer, at a glance",
      "Team training and a full handover",
    ],
    support: "Handover and training. Support plan optional.",
  },
  {
    level: 3,
    kicker: "Package 03",
    name: "Full System",
    pitch: "Standard, plus a live view of your numbers and ongoing support.",
    best: "Growing businesses that want clear numbers and a partner who keeps improving the system.",
    items: [
      "Everything in Standard",
      "Live dashboards for sales, income, expenses and what you're owed",
      "Reporting you can trust, without the spreadsheet hunt",
      "A monthly support plan: fixes, results tracking and improvements",
      "Changes to the system as your business grows",
    ],
    support: "Monthly support included",
  },
];

const custom = [
  ["Custom software and internal tools", "Built around a process no off-the-shelf app handles well."],
  ["Connecting the apps you already use", "So information moves between them without retyping."],
  ["AI assistants for everyday tasks", "Drafting, sorting and answering, with a person in charge."],
  ["Data, dashboards and reporting", "One trusted view across sales, operations and finance."],
  ["Digital products for your customers", "Portals, ordering and booking tools that carry your brand."],
];

export default function Packages() {
  return (
    <section className="sec" id="packages" aria-labelledby="pk-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow">Ways to start</p>
            <h2 className="h-section" id="pk-title">
              Choose where <em>to start.</em>
            </h2>
          </div>
          <p className="lede">
            Start small or connect everything at once. After your free check, we&apos;ll recommend the package that fits, and
            tell you if you need less.
          </p>
        </div>
        <div className="pks">
          {packages.map((p) => (
            <article key={p.name} className={p.mid ? "pk mid" : "pk"}>
              <div className="lvl" aria-hidden="true">
                {[1, 2, 3].map((n) => (
                  <i key={n} className={n <= p.level ? "on" : undefined} />
                ))}
              </div>
              <p className="pk-k">{p.kicker}</p>
              <h3>{p.name}</h3>
              <p className="pitch">{p.pitch}</p>
              <p className="best">
                <b>Best for</b>
                {p.best}
              </p>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <dl className="pk-support">
                <dt>Support</dt>
                <dd>{p.support}</dd>
              </dl>
            </article>
          ))}
        </div>

        <div className="pk-foot">
          <p>
            <b>Fixed scope, fixed price, fixed timeline.</b> Agreed in writing before work begins. Not sure which fits? The
            free check will tell you.
          </p>
          <a className="btn btn-ink" href="#assessment">
            Find the right starting point <Arrow />
          </a>
        </div>

        <div className="custom dark" id="custom">
          <div>
            <p className="pk-k">
              Custom work
            </p>
            <h3 className="cu-t">Need something a package doesn&apos;t cover?</h3>
            <p className="cu-p">
              Some problems don&apos;t fit a package. We also design and build custom systems for businesses with bigger or
              more specific needs. Same approach: we learn the business first, then agree the scope and a fixed price in
              writing.
            </p>
            <a className="btn btn-line" href="#assessment">
              Talk to us about custom work <Arrow />
            </a>
          </div>
          <ul className="cu-list">
            {custom.map(([s, t], i) => (
              <li key={s}>
                <b>0{i + 1}</b>
                <span>
                  <strong>{s}</strong>
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
