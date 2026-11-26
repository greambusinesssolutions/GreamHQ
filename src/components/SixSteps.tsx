import s from "./SixSteps.module.css";

// The six-step process, as worded in the website copy deck.
const steps = [
  ["Find the cost", "We measure what missed customers, late payments and lost hours cost you."],
  ["Agree the result", "You get a fixed price and a clear result, in writing."],
  ["Design", "We plan what will change, and how your team will use it."],
  ["Make it work", "It's built and tested before your team relies on it."],
  ["Get your team using it", "Training, and help until it becomes how you work."],
  ["Keep getting better", "Every month it improves, and so do your numbers."],
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
