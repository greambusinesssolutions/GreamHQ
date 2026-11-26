import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Page not found · GREAM Business Solutions" };

export default function NotFound() {
  return (
    <section className="section ledger-grid" aria-labelledby="nf-h">
      <div className="wrap stack">
        <p className="t-label">404</p>
        <SectionHeading heading="This page isn't here." accent="isn't here." level={1} size="display" id="nf-h" />
        <p className="t-lede">The link may be old, or the page may have moved.</p>
        <p><Link className="btn btn-ink" href="/">Go to the home page <span className="arr" aria-hidden="true">→</span></Link></p>
      </div>
    </section>
  );
}
