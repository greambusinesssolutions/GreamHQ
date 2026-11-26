import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Page not found · GREAM Business Solutions" };

export default function NotFound() {
  return (
    <section className="section ledger-grid" aria-labelledby="nf-h">
      <div className="wrap stack">
        <p className="t-label">404</p>
        <SectionHeading heading="This page has moved or never existed." accent="never existed." level={1} size="display" id="nf-h" />
        <p><Link className="btn btn-ink" href="/">Back to home <span className="arr" aria-hidden="true">→</span></Link></p>
      </div>
    </section>
  );
}
