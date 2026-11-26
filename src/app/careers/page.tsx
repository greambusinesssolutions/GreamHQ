import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import StatusTag from "@/components/StatusTag";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Careers · GREAM Business Solutions",
  description: "Careers at GREAM Business Solutions are coming soon.",
  path: "/careers",
});

export default function Careers() {
  return (
    <section className="section ledger-grid" aria-labelledby="careers-h">
      <div className="wrap stack">
        <StatusTag status="Coming soon" />
        <div>
          <SectionHeading eyebrow="Careers" heading="Build what businesses run on." accent="run on." level={1} size="display" id="careers-h" />
        </div>
        <p className="t-lede">
          We&apos;re not hiring through this page yet. If you&apos;d like to work with us, email <a href="mailto:hello@greamhq.com">hello@greamhq.com</a> and tell us what you&apos;d own.
        </p>
        <p><Link className="text-link" href="/about">About the company →</Link></p>
      </div>
    </section>
  );
}
