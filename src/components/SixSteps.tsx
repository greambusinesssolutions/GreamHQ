import s from "./SixSteps.module.css";

// The six-step delivery process: one list everywhere (design system README).
const steps = [
  ["Understand", "How your business runs today."],
  ["Find the gaps", "Where customers and time are lost."],
  ["Design", "What will change, and how it works for your team."],
  ["Build and test", "So it works from day one."],
  ["Get your team using it", "Training and adoption."],
  ["Keep it working", "Support and improvement after launch."],
];

export default function SixSteps() {
  return (
    <ol className={s.steps}>
      {steps.map(([h, p], i) => (
        <li key={h} className={`${s.step} ${i === steps.length - 1 ? s.last : ""}`}>
          <p className={`t-label ${s.n}`}>0{i + 1}</p>
          <h3 className={`t-title ${s.h}`}>{h}</h3>
          <p className="t-small muted">{p}</p>
        </li>
      ))}
    </ol>
  );
}
