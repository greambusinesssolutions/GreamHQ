import s from "./StatusTag.module.css";

// One set of eight statuses in five families. The word always says it too, never colour alone.
const family: Record<string, keyof typeof s> = {
  new: "new", sent: "new",
  draft: "neutral", scheduled: "neutral", assigned: "neutral", automatic: "neutral", "coming soon": "neutral",
  due: "due", "due today": "due", "part paid": "due", "early access": "due",
  overdue: "overdue",
  paid: "paid", done: "paid", live: "paid",
};

export default function StatusTag({ status }: { status: string }) {
  return <span className={`${s.tag} ${s[family[status.toLowerCase()] ?? "neutral"]}`}>{status}</span>;
}
