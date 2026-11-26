import JsonLd from "./JsonLd";
import { faqLd } from "@/lib/seo";
import s from "./Faq.module.css";

/** FAQ accordion with <details>/<summary>, plus FAQPage structured data. */
export default function Faq({ items, openFirst = true }: { items: { question: string; answer: string }[]; openFirst?: boolean }) {
  return (
    <div className={s.faq}>
      <JsonLd data={faqLd(items)} />
      {items.map((f, i) => (
        <details className={s.item} key={f.question} open={openFirst && i === 0}>
          <summary className={s.q}>
            <span className={`t-title ${s.qt}`}>{f.question}</span>
            <span className={s.pm} aria-hidden="true" />
          </summary>
          <p className={`t-body muted ${s.a}`}>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
