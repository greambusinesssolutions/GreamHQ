import { contactHref, contactLinkProps, hasWhatsApp } from "@/lib/site";
import { Arrow, ChatIcon } from "./icons";

const sources = ["WhatsApp", "Instagram", "Phone call", "Email", "Website"];

const facts = [
  ["Free check", "20 minutes, with an honest answer on whether we can help."],
  ["Fixed price", "Scope, cost and timeline agreed in writing first."],
  ["Yours to keep", "You own the system and your data."],
];

const stages = [
  { t: "Enquiry captured", s: "Ngozi A. asked about bulk prices on WhatsApp", tag: "Enquiry" },
  { t: "Reply sent, follow-up set", s: "Price list shared. Reminder booked for Thursday.", tag: "Reply" },
  { t: "Quote accepted, order confirmed", s: "Order details saved once, shared with the team", tag: "Order" },
  { t: "Invoice paid", s: "Payment matched to the order. Receipt sent.", tag: "Paid", ok: true },
  { t: "Numbers up to date", s: "Sales, income and what is owed, in one view", tag: "Clear" },
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">For small and growing businesses</p>
          <h1 className="h-display" id="hero-title">
            Stop losing customers between <em>enquiry</em> and <em>payment.</em>
          </h1>
          <p className="lede">
            Every enquiry is a potential customer. GREAM helps you bring enquiries, follow-ups, orders and payments into
            one organised system, so you always know who asked, what happens next and what has been paid.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#assessment">
              Book a free 20-minute business check <Arrow />
            </a>
            <a className="btn btn-line" href={contactHref} {...contactLinkProps}>
              <ChatIcon />
              <span>{hasWhatsApp ? "Speak with us on WhatsApp" : "Email us"}</span>
            </a>
          </div>
          <dl className="hero-facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>
                  <b>{k}</b>
                </dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="flow" aria-label="Example: one enquiry moving from first message to clear numbers">
          <div className="flow-head">
            <span>One enquiry, followed through</span>
            <span className="ex-badge">Example</span>
          </div>
          <p className="sources-lbl">Arrives from</p>
          <div className="sources" aria-hidden="true">
            {sources.map((s) => (
              <span key={s} className="src">
                {s}
              </span>
            ))}
          </div>
          <p className="merge">Into one record</p>
          <div className="rail-wrap">
            <span className="rail-line" aria-hidden="true" />
            <span className="dot" aria-hidden="true" />
            <ol className="rail">
              {stages.map((st, i) => (
                <li key={st.t} className="stage">
                  <span className="node">0{i + 1}</span>
                  <div>
                    <p className="t">{st.t}</p>
                    <p className="s">{st.s}</p>
                  </div>
                  <span className={st.ok ? "tag ok" : "tag"}>{st.tag}</span>
                </li>
              ))}
            </ol>
          </div>
          <figcaption className="flow-foot">One customer. One record. Nothing slips.</figcaption>
        </figure>
      </div>
    </section>
  );
}
