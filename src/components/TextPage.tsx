import SectionHeading from "./SectionHeading";
import { getTextPage } from "@/lib/content";

/** A plain text page (privacy, terms) rendered from content/pages/<slug>.md. */
export default function TextPage({ slug }: { slug: string }) {
  const { data, html } = getTextPage(slug);
  return (
    <section className="section ledger-grid" aria-labelledby="tp-h">
      <div className="wrap stack">
        <SectionHeading eyebrow="Legal" heading={data.title} level={1} size="display" id="tp-h" />
        <div className="t-body text-page" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
}
