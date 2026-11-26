import s from "./Quote.module.css";

export default function Quote({ text, name, role, since }: { text: string; name: string; role: string; since?: string }) {
  return (
    <figure className={s.q}>
      <blockquote className={`t-section ${s.quote}`}>“{text}”</blockquote>
      <figcaption className={s.who}>
        <p className={`t-body ${s.name}`}>{name}</p>
        <p className="t-small muted">{role}</p>
        {since && (
          <>
            <p className={`t-label ${s.sinceLabel}`}>Client for</p>
            <p className={`t-section ${s.since}`}>{since}</p>
          </>
        )}
      </figcaption>
    </figure>
  );
}
