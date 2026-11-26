import Link from "next/link";
import Accent from "./Accent";
import { site } from "@/data/site";
import { bookHref } from "@/data/nav";
import s from "./DarkCta.module.css";

type Props = { eyebrow?: string; heading: string; accent?: string; text?: string; button?: string; href?: string; id?: string };

/** Dark closing call to action on the ledger grid. Holds the screen's one Vermilion button. */
export default function DarkCta({ eyebrow = "Your next step", heading, accent, text, button = "Book a free business check", href = bookHref, id = "next-step" }: Props) {
  return (
    <section className="section dark ledger-grid" id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={`t-display ${s.h}`} id={`${id}-h`}><Accent text={heading} accent={accent} /></h2>
        {text && <p className={`t-lede ${s.txt}`}>{text}</p>}
        <div className={`actions ${s.row}`}>
          <Link className="btn btn-primary" href={href}>
            {button} <span className="arr" aria-hidden="true">→</span>
          </Link>
          <a className={s.mail} href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </section>
  );
}
