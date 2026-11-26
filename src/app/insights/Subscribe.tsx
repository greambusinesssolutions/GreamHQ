import NewsletterForm from "@/components/NewsletterForm";
import s from "./insights.module.css";

export default function Subscribe() {
  return (
    <section className="section dark ledger-grid" id="subscribe" aria-labelledby="sub-h">
      <div className={`wrap ${s.subscribe}`}>
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2 className="t-section" id="sub-h">One useful idea, <em>once a month.</em></h2>
          <p className={`t-body muted ${s.subText}`}>Guides and real lessons. No spam.</p>
        </div>
        <NewsletterForm id="insights-nl" primary />
      </div>
    </section>
  );
}
