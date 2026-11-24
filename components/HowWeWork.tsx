const steps = [
  ["Understand", "We learn how enquiries, customers, orders and payments are handled today."],
  ["Find the gaps", "We show you where opportunities are being lost and where work is unnecessarily manual."],
  ["Design", "We define the system, workflows and connections that fit your business."],
  ["Build and test", "We build it and test it before it reaches everyday use."],
  ["Get your team using it", "We train your team and help them adopt it."],
];

export default function HowWeWork() {
  return (
    <section className="sec" id="how" aria-labelledby="how-title" style={{ background: "var(--sage)" }}>
      <div className="wrap">
        <div className="how-head">
          <div>
            <p className="eyebrow">How we work</p>
            <h2 className="h-section" id="how-title">
              How we get it <em>working.</em>
            </h2>
          </div>
          <p className="lede">Six clear steps. You see progress throughout, not just at the end.</p>
        </div>
        <ol className="steps" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {steps.map(([h, p], i) => (
            <li key={h} className="step">
              <div className="top">
                <span className="ball">0{i + 1}</span>
                <span className="ln" aria-hidden="true" />
              </div>
              <div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            </li>
          ))}
          <li className="step last">
            <div className="top">
              <span className="ball">06</span>
            </div>
            <div>
              <h3 style={{ display: "flex", alignItems: "center" }}>
                Keep it working
                <svg className="loop" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M20 12a8 8 0 1 1-2.3-5.6" />
                  <path d="M20 4v5h-5" />
                </svg>
              </h3>
              <p>
                With a support plan, we stay after launch: fixing what breaks, tracking results and improving the system as
                your business changes.
              </p>
            </div>
          </li>
        </ol>
        <div className="how-note">
          <span className="ic" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 3h8l4 4v14H7z" />
              <path d="M15 3v4h4M10 12h6M10 16h6" />
            </svg>
          </span>
          <p>
            <b>Before anything starts, you will know the scope, deliverables, cost and timeline, in writing.</b> You see
            progress throughout, not just at the end.
          </p>
        </div>
      </div>
    </section>
  );
}
