import { getTeam } from "@/lib/content";
import s from "./TeamList.module.css";

/** The team, from content/team.json. Add a person by adding one entry there; photos go in public/team. */
export default function TeamList() {
  return (
    <ul className={s.list}>
      {getTeam().map((p) => (
        <li key={p.id} className={s.person}>
          {p.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={s.photo} src={p.photo} alt={`Portrait of ${p.name}`} width={400} height={500} loading="lazy" />
          ) : (
            <div className={`t-label ${s.photo}`}>[PHOTO]</div>
          )}
          <h3 className="t-title">{p.name}</h3>
          <p className={`t-small ${s.owns}`}>{p.owns}</p>
        </li>
      ))}
    </ul>
  );
}
