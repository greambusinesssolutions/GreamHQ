import { getClients } from "@/lib/content";
import ExampleTag from "./ExampleTag";
import s from "./Marquee.module.css";

const style = { serif: s.serif, "serif-italic": s.serifItalic, sans: s.sans, "sans-caps": s.sansCaps, mono: s.mono };

/** Client-name marquee. Stops (and wraps) when the visitor prefers reduced motion. */
export default function Marquee() {
  const clients = getClients();
  const example = clients.some((c) => c.example);
  return (
    <section className={s.wrap} aria-label={example ? "Illustrative example client names" : "Clients we've worked with"}>
      {example && <p className={s.label}><ExampleTag label="Illustrative example names" /></p>}
      <ul className="sr-only">{clients.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
      <div className={s.track} aria-hidden="true">
        {clients.map((c) => <span key={c.id} className={`${s.m} ${style[c.style]}`}>{c.name}</span>)}
        {clients.map((c) => <span key={`d-${c.id}`} className={`${s.m} ${s.dup} ${style[c.style]}`}>{c.name}</span>)}
      </div>
    </section>
  );
}
