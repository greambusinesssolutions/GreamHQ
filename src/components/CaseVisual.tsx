import StatusTag from "./StatusTag";
import s from "./CaseVisual.module.css";

/** Decorative illustration for a case card: bars, a chat exchange or a small ledger. */
export default function CaseVisual({ kind, size = "small" }: { kind: "bars" | "chat" | "ledger"; size?: "large" | "small" }) {
  return (
    <div className={`${s.vis} ${s[kind]} ${size === "large" ? s.large : ""}`} aria-hidden="true">
      {kind === "bars" && (<><i className={s.bar} /><i className={s.bar} /><i className={s.bar} /></>)}
      {kind === "chat" && (
        <>
          <span className={`${s.bubble} ${s.in}`}>Is Friday still free?</span>
          <span className={`${s.bubble} ${s.out}`}>Yes, booked for 2:30 PM.</span>
        </>
      )}
      {kind === "ledger" && (
        <>
          <span className={s.line}><span>Order 1042</span><StatusTag status="Paid" /></span>
          <span className={s.line}><span>Order 1041</span><StatusTag status="Part paid" /></span>
          <span className={s.line}><span>Quote Q-311</span><StatusTag status="Sent" /></span>
        </>
      )}
    </div>
  );
}
