"use client";

// Money-at-risk estimate: enquiries a month × share that never gets a reply × average sale.
// The result is the page's oversized number, animating as the sliders move.
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { bookHref } from "@/data/nav";
import s from "./RiskCalculator.module.css";

const currencies = {
  "$": { min: 10, max: 5000, step: 10, start: 250 },
  "£": { min: 10, max: 5000, step: 10, start: 200 },
  "₦": { min: 5000, max: 2000000, step: 5000, start: 150000 },
} as const;
type Cur = keyof typeof currencies;

const money = (cur: Cur, n: number) => `${cur}${Math.round(n).toLocaleString("en-GB")}`;

export default function RiskCalculator() {
  const id = useId();
  const reduce = useReducedMotion();
  const [cur, setCur] = useState<Cur>("$");
  const [enquiries, setEnquiries] = useState(120);
  const [sale, setSale] = useState<number>(currencies["$"].start);
  const [share, setShare] = useState(20);
  const out = useRef<HTMLSpanElement>(null);
  const last = useRef(0);
  const missed = Math.round(enquiries * (share / 100));
  const risk = enquiries * (share / 100) * sale;

  useEffect(() => {
    const el = out.current;
    if (!el) return;
    if (reduce) return void ((el.textContent = money(cur, risk)), (last.current = risk));
    const c = animate(last.current, risk, { duration: 0.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => ((el.textContent = money(cur, v)), (last.current = v)) });
    return () => c.stop();
  }, [risk, cur, reduce]);

  function switchCur(c: Cur) {
    setCur(c);
    setSale(currencies[c].start);
    last.current = 0;
  }

  const range = currencies[cur];
  const slider = (label: string, value: number, set: (n: number) => void, min: number, max: number, step: number, shown: string) => (
    <div className={s.field}>
      <div className={s.top}>
        <label className="t-label" htmlFor={`${id}-${label}`}>{label}</label>
        <output className={s.value} htmlFor={`${id}-${label}`}>{shown}</output>
      </div>
      <input
        id={`${id}-${label}`} className={s.range} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(Number(e.target.value))}
        style={{ ["--fill" as string]: `${((value - min) / (max - min)) * 100}%` }}
      />
    </div>
  );

  return (
    <div className={s.calc}>
      <div className={s.inputs}>
        {slider("Enquiries you get each month", enquiries, setEnquiries, 10, 1000, 10, enquiries.toLocaleString("en-GB"))}
        <div className={s.curRow}>
          <span className="t-label">Currency</span>
          <div className={s.curs} role="radiogroup" aria-label="Currency">
            {(Object.keys(currencies) as Cur[]).map((c) => (
              <button key={c} type="button" role="radio" aria-checked={cur === c} className={cur === c ? s.curOn : s.cur} onClick={() => switchCur(c)}>{c}</button>
            ))}
          </div>
        </div>
        {slider("What an average sale is worth", sale, setSale, range.min, range.max, range.step, money(cur, sale))}
        {slider("Share that never gets a reply", share, setShare, 0, 60, 1, `${share}%`)}
        <p className={`t-caption ${s.hint}`}>Not sure? Leave it at 20%. Finding your real share is part of the free check.</p>
      </div>
      <div className={s.result}>
        <p className="t-label">Estimated revenue at risk each month</p>
        <p className={`t-display ${s.figure}`} aria-live="polite"><span ref={out}>{money(cur, risk)}</span></p>
        <p className={`t-body ${s.year}`}>That&apos;s about <b>{money(cur, risk * 12)}</b> a year.</p>
        <p className={`t-small ${s.working}`}>
          <b>{missed.toLocaleString("en-GB")}</b> of your {enquiries.toLocaleString("en-GB")} enquiries a month get no reply. At {money(cur, sale)} each, that&apos;s {money(cur, risk)} that could be walking away every month.
        </p>
        <p className={`t-caption ${s.note}`}>A rough estimate, assuming each unanswered enquiry would have bought once. On the free check we work out your real number together.</p>
        <Link className="btn btn-primary" href={bookHref}>Find out your real number <span className="arr" aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
