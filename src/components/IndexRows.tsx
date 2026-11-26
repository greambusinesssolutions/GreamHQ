import Link from "next/link";
import Accent from "./Accent";
import s from "./IndexRows.module.css";

export type IndexRow = { title: string; accent?: string; text: string; meta?: string; aside?: { label: string; text: string }; href?: string };

/** Numbered index rows that highlight on hover. Rows with an href are links. */
export default function IndexRows({ rows, size = "medium" }: { rows: IndexRow[]; size?: "large" | "medium" }) {
  const cls = [s.rows, size === "large" && s.large, rows.some((r) => r.aside) && s.withAside, rows.some((r) => r.href) && s.linked].filter(Boolean).join(" ");
  return (
    <ol className={cls}>
      {rows.map((r, i) => {
        const inner = (
          <>
            <span className="t-label">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className={`t-section ${s.title}`}><Accent text={r.title} accent={r.accent} /></span>
              {r.meta && <span className={`t-label ${s.meta}`}>{r.meta}</span>}
            </span>
            <span className={`t-small ${s.text}`}>{r.text}</span>
            {r.aside && (
              <span className={`t-small ${s.text}`}>
                <span className={`t-label ${s.asideLabel}`}>{r.aside.label}</span>
                {r.aside.text}
              </span>
            )}
            {r.href && <span className={s.go} aria-hidden="true">→</span>}
          </>
        );
        return (
          <li key={r.title}>
            {r.href ? <Link className={s.row} href={r.href}>{inner}</Link> : <div className={s.row}>{inner}</div>}
          </li>
        );
      })}
    </ol>
  );
}
