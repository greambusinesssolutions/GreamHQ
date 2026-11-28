import { steps } from "@/data/steps";
import s from "./SixSteps.module.css";



export default function SixSteps() {
  return (
    <ol className={s.steps}>
      {steps.map(([h, p], i) => (
        <li key={h} className={`${s.step} ${i === steps.length - 1 ? s.last : ""}`}>
          <p className={`t-label ${s.n}`}>{`0${i + 1}`}</p>
          <h3 className={`t-title ${s.h}`}>{h}</h3>
          <p className="t-small muted">{p}</p>
        </li>
      ))}
    </ol>
  );
}
