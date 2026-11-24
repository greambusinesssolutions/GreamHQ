"use client";

import { useState } from "react";

const faqs = [
  ["Do I need to be technical?", "No. If you can describe how your business runs, that is enough."],
  ["What if my team doesn't like change?", "We build around how they work today and train them. Change stays small and clearly useful."],
  ["What if I've tried tools before?", "Tell us what happened. It helps us avoid the same problem."],
  ["What happens after it's built?", "We don't disappear. With a support plan, we stay, keep it running and keep improving it."],
  ["How much does it cost?", "It depends on what you need. After the free check you get a fixed price, in writing."],
  ["Who owns the system?", "You do. Your data and everything we build for you belong to your business."],
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sec" id="questions" aria-labelledby="faq-title" style={{ paddingTop: 40 }}>
      <div className="wrap faq-grid">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="h-section" id="faq-title">
            Questions owners <em>ask us.</em>
          </h2>
        </div>
        <div className="faqs">
          {faqs.map(([q, a], i) => {
            const on = open === i;
            return (
              <div key={q} className={on ? "fq open" : "fq"}>
                <h3 style={{ margin: 0 }}>
                  <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? null : i)}>
                    {q}
                    <span className="pm" aria-hidden="true">
                      {on ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <p className="ans" id={`faq-${i}`} hidden={!on}>
                  {a}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
