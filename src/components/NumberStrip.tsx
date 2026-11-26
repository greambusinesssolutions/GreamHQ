import ExampleTag from "./ExampleTag";
import s from "./NumberStrip.module.css";

/** The large serif number strip under a hero. */
export default function NumberStrip({ items, className = "", example = false }: { items: { value: string; label: string; suffix?: string }[]; className?: string; example?: boolean }) {
  return (
    <div className={className}>
    <dl className={s.strip}>
      {items.map((x) => (
        <div className={s.item} key={x.label}>
          <dt className="t-label">{x.label}</dt>
          <dd className={`t-section ${s.num}`}>{x.value}{x.suffix && <span className={s.suffix}>{x.suffix}</span>}</dd>
        </div>
      ))}
    </dl>
    {example && <p className={s.note}><ExampleTag label="Illustrative example figures" /></p>}
    </div>
  );
}
