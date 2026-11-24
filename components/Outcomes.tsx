import { Arrow } from "./icons";

const rows = [
  ["Customers", "Enquiries scattered across channels", "Enquiries organised in one place"],
  ["Customers", "Forgotten follow-ups", "Clear follow-up actions"],
  ["Sales", "Unclear sales pipeline", "Visibility into customer progress"],
  ["Operations", "Orders tracked manually", "Organised order management"],
  ["Payments", "Difficult payment reconciliation", "Clear payment status"],
  ["Performance", "Manual reporting", "Information you can access when you need it"],
  ["Admin", "The same details typed again and again", "Repetitive work handled automatically"],
];

const srOnly = { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" } as const;

export default function Outcomes() {
  return (
    <section className="sec" id="outcomes" aria-labelledby="chg-title" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="chg-head">
          <div>
            <p className="eyebrow">What changes</p>
            <h2 className="h-section" id="chg-title">
              What changes for <em>your business?</em>
            </h2>
          </div>
          <p className="lede">
            Better customer management, a more organised sales process, smoother operations, clear visibility and less
            repetitive admin. Here is what that looks like day to day.
          </p>
        </div>
        <div className="tbl" role="table" aria-label="Before and after">
          <div className="tr th" role="row">
            <div role="columnheader">Outcome</div>
            <div role="columnheader">Without an organised process</div>
            <div role="columnheader">
              <span style={srOnly}>to</span>
            </div>
            <div role="columnheader">With the right system</div>
          </div>
          {rows.map(([o, b, a]) => (
            <div key={b} className="tr" role="row">
              <div className="o" role="cell">
                {o}
              </div>
              <div className="b" role="cell">
                {b}
              </div>
              <div className="x" role="cell" aria-hidden="true">
                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M0 6h20M15 1l5 5-5 5" />
                </svg>
              </div>
              <div className="a" role="cell">
                {a}
              </div>
            </div>
          ))}
        </div>
        <div className="chg-close">
          <p>Your team spends less time chasing information, and more time serving customers and running the business.</p>
          <a className="btn btn-ink" href="#assessment">
            See what would change for you <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
