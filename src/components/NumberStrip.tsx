import CountUp from "./motion/CountUp";
import s from "./NumberStrip.module.css";

/** The large serif number strip under a hero. */
export default function NumberStrip({ items, className = "" }: { items: { value: string; label: string; suffix?: string }[]; className?: string }) {
  return (
    <dl className={`${s.strip} ${className}`}>
      {items.map((x) => (
        <div className={s.item} key={x.label}>
          <dt className="t-label">{x.label}</dt>
          <dd className={`t-section ${s.num}`}><CountUp value={x.value} />{x.suffix && <span className={s.suffix}>{x.suffix}</span>}</dd>
        </div>
      ))}
    </dl>
  );
}
