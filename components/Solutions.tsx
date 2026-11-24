"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Row = { k: string; v: string; small: string; chip: string; label: string };

function UiRows({ rows }: { rows: Row[] }) {
  return (
    <div className="ui">
      {rows.map((r) => (
        <div key={r.k + r.v} className="ui-row">
          <span className="k">{r.k}</span>
          <span className="v">
            {r.v}
            <small>{r.small}</small>
          </span>
          <span className={`chip ${r.chip}`}>{r.label}</span>
        </div>
      ))}
    </div>
  );
}

const tabs: { title: string; desc: string; stage: string; heading: string; body: ReactNode; cap: string }[] = [
  {
    title: "Capture every enquiry",
    desc: "Bring enquiries and customer details into one organised place, instead of searching through multiple channels.",
    stage: "Enquiry",
    heading: "Every enquiry, in one place.",
    body: (
      <UiRows
        rows={[
          { k: "WhatsApp", v: "Ngozi A.", small: "Bulk price for 20 cartons?", chip: "c-new", label: "New" },
          { k: "Instagram", v: "Tunde O.", small: "Do you deliver on weekends?", chip: "c-new", label: "New" },
          { k: "Email", v: "Harrow Dental", small: "Quote request for monthly supply", chip: "c-due", label: "Due today" },
          { k: "Website", v: "Ms Bello", small: "Call me back after 4pm", chip: "c-mute", label: "Scheduled" },
        ]}
      />
    ),
    cap: "Wherever a customer gets in touch, their details land in the same organised list, with nothing to copy across.",
  },
  {
    title: "Manage follow-ups",
    desc: "Know which customers need attention, which opportunities are active and what should happen next.",
    stage: "Follow-up",
    heading: "Everyone knows what happens next.",
    body: (
      <UiRows
        rows={[
          { k: "Today", v: "Send price list to Tunde O.", small: "Owner: Sales", chip: "c-due", label: "Due today" },
          { k: "Tomorrow", v: "Call Ms Bello back, after 4pm", small: "Owner: Front desk", chip: "c-mute", label: "Scheduled" },
          { k: "Thursday", v: "Quote reminder to Harrow Dental", small: "Sent automatically if no reply", chip: "c-mute", label: "Scheduled" },
          { k: "Done", v: "Ngozi A. replied and asked for an invoice", small: "Moved to orders", chip: "c-ok", label: "Done" },
        ]}
      />
    ),
    cap: "Follow-ups stop depending on memory. The right person is reminded at the right time.",
  },
  {
    title: "Track orders and payments",
    desc: "Organise orders, quotations, invoices and payment status, so you can see what has been paid and what is outstanding.",
    stage: "Orders and payments",
    heading: "See what is paid and what is outstanding.",
    body: (
      <UiRows
        rows={[
          { k: "Order 1042", v: "Ngozi A.", small: "Invoice sent Monday", chip: "c-ok", label: "Paid" },
          { k: "Order 1041", v: "Kemi B.", small: "Balance due Friday", chip: "c-part", label: "Part paid" },
          { k: "Quote Q-311", v: "Harrow Dental", small: "Waiting for approval", chip: "c-new", label: "Sent" },
          { k: "Order 1039", v: "Ade Stores", small: "Payment matched to order", chip: "c-ok", label: "Paid" },
        ]}
      />
    ),
    cap: "Quotes, orders, invoices and payment status, connected. No more “paid?” in the margin.",
  },
  {
    title: "Understand your sales",
    desc: "See your pipeline, completed sales and outstanding payments in one view.",
    stage: "Reporting",
    heading: "Your sales, at a glance.",
    body: (
      <>
        <div className="pipe" aria-label="Example pipeline">
          {[
            ["New", 12],
            ["Following up", 8],
            ["Ordered", 5],
            ["Paid", 4],
          ].map(([k, n]) => (
            <div key={k}>
              <b>{k}</b>
              <span>{n}</span>
            </div>
          ))}
        </div>
        <div className="ui">
          <div className="bars">
            <div className="bar">
              <span>Sales</span>
              <i style={{ width: "82%" }} />
            </div>
            <div className="bar">
              <span>Paid</span>
              <i className="g" style={{ width: "64%" }} />
            </div>
            <div className="bar">
              <span>Outstanding</span>
              <i className="l" style={{ width: "18%" }} />
            </div>
          </div>
        </div>
      </>
    ),
    cap: "Example figures. See your pipeline, completed sales and outstanding payments in one view, whenever you need them.",
  },
  {
    title: "Automate repetitive work",
    desc: "Reduce manual admin with connected workflows and automation, including AI where it genuinely helps.",
    stage: "Automation",
    heading: "Let the system do the repeat work.",
    body: (
      <div className="ui rule-ch">
        {[
          ["When", "A customer pays an invoice"],
          ["Then", "Mark the order as paid and send the receipt"],
          ["And", "Tell the dispatch team the order can go out"],
          ["AI helps", "Drafts replies to common questions, for your team to check and send"],
        ].map(([b, s]) => (
          <div key={b} className="rstep">
            <b>{b}</b>
            <span>{s}</span>
          </div>
        ))}
      </div>
    ),
    cap: "We use automation, and AI where it genuinely helps, to remove manual admin. A person stays in charge.",
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number, focus = false) {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent, i: number) {
    const n = tabs.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select((i + 1) % n, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select((i - 1 + n) % n, true);
    }
  }

  const tab = tabs[active];

  return (
    <section className="sec" id="solutions" aria-labelledby="sol-title">
      <div className="wrap">
        <div className="sol-head">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="h-section" id="sol-title">
              A clearer process from first contact to <em>payment.</em>
            </h2>
          </div>
          <p className="lede">
            We build one connected system for how enquiries become paying customers, fitted around how your business
            already runs. We don&apos;t assume every business needs the same thing. We start with what will make the biggest
            difference to yours.
          </p>
        </div>

        <div className="sol-grid">
          <div className="tabs" role="tablist" aria-label="What the system does">
            {tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.title}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={on}
                  aria-controls="sol-panel"
                  className={on ? "tab on" : "tab"}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  <span className="n">0{i + 1}</span>
                  <span>
                    <span className="tt" style={{ display: "block" }}>
                      {t.title}
                    </span>
                    <span className="td" style={{ display: "block" }} hidden={!on}>
                      {t.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="panel" role="tabpanel" id="sol-panel" aria-labelledby={`tab-${active}`}>
            <div className="panel-top">
              <span>Example view</span>
              <b>
                0{active + 1} · {tab.stage}
              </b>
            </div>
            <div className="tp">
              <h3>{tab.heading}</h3>
              {tab.body}
              <p className="panel-cap">{tab.cap}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
