"use client";

// Home hero: a looping example of the business working (about 9.5s per loop).
// An enquiry arrives on WhatsApp, a reply is drafted and approved, a payment link
// goes out, the payment lands and the amount counts up to PAID. Pauses off-screen.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, animate, domAnimation, m, useInView, useReducedMotion } from "motion/react";
import StatusTag from "../StatusTag";
import s from "./HeroScene.module.css";

export type SceneCopy = { label: string; customer: string; message: string; reply: string; approved: string; linkSent: string; order: string; currency: string; amount: number };

// Step timings in ms: 1 enquiry, 2 typing, 3 reply + approved, 4 link sent, 5 paid, then loop.
const TIMES = [600, 1700, 3000, 4800, 6600];
const LOOP = 9500;
const ease = [0.2, 0.7, 0.2, 1] as const;

export default function HeroScene({ copy }: { copy: SceneCopy }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 5 : 0);
  const [loop, setLoop] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const on = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  useEffect(() => {
    if (reduce) return setStep(5);
    if (!inView || !visible) return;
    setStep(0);
    const timers = TIMES.map((t, i) => setTimeout(() => setStep(i + 1), t));
    timers.push(setTimeout(() => setLoop((n) => n + 1), LOOP));
    return () => timers.forEach(clearTimeout);
  }, [inView, visible, loop, reduce]);

  const fmt = (n: number) => `${copy.currency}${Math.round(n).toLocaleString("en-GB")}`;
  const amountRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = amountRef.current;
    if (!el) return;
    if (step < 5 || reduce) return void (el.textContent = fmt(step >= 5 ? copy.amount : 0));
    const c = animate(0, copy.amount, { duration: 1.2, ease, onUpdate: (v) => (el.textContent = fmt(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, reduce]);

  const show = (n: number) => step >= n;
  const enter = reduce ? false : { opacity: 0, y: 12 };

  return (
    <LazyMotion features={domAnimation} strict>
      <figure ref={ref} className={s.scene} aria-label="Example: an enquiry answered, approved and paid">
        <div className={s.head}>
          <span className="t-label"><i className={s.dot} aria-hidden="true" />{copy.label}</span>
          <span className={`t-label ${s.ex}`}>Example</span>
        </div>
        <div className={s.chat} aria-hidden="true">
          <p className={`t-label ${s.from}`}>{copy.customer}</p>
          <AnimatePresence initial={false}>
            {show(1) && (
              <m.p key={`in-${loop}`} className={`${s.bubble} ${s.in}`} initial={enter} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
                {copy.message}
              </m.p>
            )}
            {step === 2 && (
              <m.p key={`typing-${loop}`} className={`${s.bubble} ${s.out} ${s.typing}`} initial={enter} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <i /><i /><i />
              </m.p>
            )}
            {show(3) && (
              <m.div key={`out-${loop}`} className={s.outWrap} initial={enter} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
                <p className={`${s.bubble} ${s.out}`}>{copy.reply}</p>
                <p className={`t-label ${s.approved}`}>{copy.approved}</p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
        <div className={s.rows}>
          <div className={`t-small ${s.row} ${show(4) ? s.on : ""}`}>
            <span>{copy.linkSent}</span>
            <span className={s.muted}>{copy.order}</span>
            <StatusTag status="Sent" />
          </div>
          <div className={`t-small ${s.row} ${show(5) ? s.on : ""}`}>
            <span>Payment received</span>
            <span ref={amountRef} className={s.amount}>{fmt(reduce ? copy.amount : 0)}</span>
            <span className={`${s.tagSwap} ${show(5) ? s.paid : ""}`}>
              <span className={s.waiting}><StatusTag status="Due" /></span>
              <span className={s.done}><StatusTag status="Paid" /></span>
            </span>
          </div>
        </div>
        <p className="sr-only">
          {copy.customer}: {copy.message} Reply: {copy.reply} {copy.approved}. {copy.linkSent}. Paid {fmt(copy.amount)}.
        </p>
      </figure>
    </LazyMotion>
  );
}
