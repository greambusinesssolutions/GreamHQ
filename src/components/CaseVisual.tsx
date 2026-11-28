"use client";

// Small product scenes for case cards. They play on hover (mouse) or while in view
// (touch screens); under reduced motion each shows its finished state.
import { useEffect, useRef, useState } from "react";
import StatusTag from "./StatusTag";
import s from "./CaseVisual.module.css";

type Props = { kind: "bars" | "chat" | "ledger"; size?: "large" | "small"; chat?: readonly [string, string] };

export default function CaseVisual({ kind, size = "small", chat = ["Is Friday still free?", "Yes, booked for 2:30 PM."] }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!matchMedia("(hover: none)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${s.vis} ${s[kind]} ${size === "large" ? s.large : ""} ${inView ? s.play : ""}`} aria-hidden="true">
      {kind === "bars" && (
        <>
          <i className={s.bar} /><i className={s.bar} /><i className={`${s.bar} ${s.owed}`} />
          <span className={s.balance}>
            <span className={s.balLabel}>Balance</span>
            <span className={s.swap}><b className={s.from}>$1,240</b><b className={s.to}>$0</b></span>
            <span className={s.swap}><span className={s.from}><StatusTag status="Overdue" /></span><span className={s.to}><StatusTag status="Paid" /></span></span>
          </span>
        </>
      )}
      {kind === "chat" && (
        <>
          <span className={`${s.bubble} ${s.in}`}>{chat[0]}</span>
          <span className={`${s.bubble} ${s.out} ${s.typing}`}><i /><i /><i /></span>
          <span className={`${s.bubble} ${s.out} ${s.reply}`}>{chat[1]}</span>
        </>
      )}
      {kind === "ledger" && (
        <>
          <span className={s.line}><span>Reminder sent · Order 1041</span><span className={s.swap}><span className={s.from}><StatusTag status="Sent" /></span><span className={s.to}><StatusTag status="Paid" /></span></span></span>
          <span className={`${s.bubble} ${s.in} ${s.answer}`}>Paid the balance just now, thanks.</span>
          <span className={s.line}><span>Order 1042</span><StatusTag status="Paid" /></span>
        </>
      )}
    </div>
  );
}
