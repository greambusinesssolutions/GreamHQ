"use client";

import { useState } from "react";
import { Arrow } from "./icons";

const questions = [
  "Is there one place where you can see every enquiry, wherever it arrived?",
  "Does every interested customer get followed up, without relying on someone remembering?",
  "Can you see right now which enquiries are still active?",
  "Can you see what has been sold, what has been paid and what is still owed?",
  "Do you know how much of your team's week goes on chasing information?",
];

type Answer = "yes" | "ns";

function verdictFor(answers: Record<number, Answer>) {
  const vals = Object.values(answers);
  const answered = vals.length;
  const unsure = vals.filter((v) => v === "ns").length;
  const tally = answered ? `${answered} of ${questions.length} answered · ${unsure} not sure` : "";
  let verdict = "If any answer is “I'm not sure”, that is where we start.";
  if (unsure === 1) verdict = "One “I'm not sure”. That is where we start.";
  else if (unsure > 1) verdict = `${unsure} answers of “I'm not sure”. That is where we start.`;
  else if (answered === questions.length)
    verdict = "Sounds well organised. A free check can confirm it, and we'll tell you honestly if you don't need us.";
  return { tally, verdict };
}

export default function SelfCheck() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const { tally, verdict } = verdictFor(answers);

  return (
    <section className="sec dark" id="check" aria-labelledby="diag-title">
      <div className="wrap diag-grid">
        <div className="diag-intro">
          <p className="eyebrow">A two-minute self-check</p>
          <h2 className="h-section" id="diag-title">
            How many potential customers are slipping through <em>the cracks?</em>
          </h2>
          <p className="lede">
            You spend time and money attracting customers. What happens after they get in touch? Answer honestly. Nobody
            sees this but you.
          </p>
        </div>
        <div>
          <div className="qs">
            {questions.map((q, i) => (
              <div key={i} className="qrow" role="group" aria-labelledby={`dq${i}`}>
                <span className="n">0{i + 1}</span>
                <div>
                  <p className="qt" id={`dq${i}`}>
                    {q}
                  </p>
                  <div className="qbtns">
                    {(
                      [
                        ["yes", "Yes"],
                        ["ns", "I'm not sure"],
                      ] as const
                    ).map(([v, label]) => {
                      const on = answers[i] === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          className={`qb${v === "ns" ? " ns" : ""}${on ? " on" : ""}`}
                          aria-pressed={on}
                          onClick={() => setAnswers((a) => ({ ...a, [i]: v }))}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="verdict" aria-live="polite">
            <p className="tally">{tally}</p>
            <p className="big">{verdict}</p>
            <p className="lede">
              You don&apos;t necessarily need more people or more software. You need the right systems working together.
            </p>
            <a className="btn btn-primary" href="#assessment">
              Book a free 20-minute business check <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
