import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import IndexRows from "@/components/IndexRows";
import DarkCta from "@/components/DarkCta";
import { getProducts, getSolutions } from "@/lib/content";
import { bookHref } from "@/data/nav";
import { pageMeta } from "@/lib/seo";
import s from "./products.module.css";

export const metadata = pageMeta({
  title: "Products and solutions · GREAM Business Solutions",
  description: "Products you can start this week, and proven solutions we set up around your business. What you use keeps improving every month.",
  path: "/products",
});

export default function Products() {
  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="prod-h">
        <div className="wrap">
          <SectionHeading eyebrow="Products and solutions" heading="Ready to use. Gets better every month." accent="Gets better every month." level={1} size="display" id="prod-h" />
          <p className={`t-lede ${s.lede}`}>Products you can start this week, and proven solutions we set up around your business. Either way, you&apos;re not starting from scratch, and what you use keeps improving.</p>
        </div>
      </section>

      <section className={`section ${s.listSection}`} aria-labelledby="list-h">
        <div className="wrap">
          <div className="head-row">
            <SectionHeading eyebrow="Products" heading="Start this week. Improve every month." accent="Improve every month." id="list-h" />
            <p className={`t-body muted ${s.side}`}>Simple monthly plans. Cancel any time. Your data stays yours.</p>
          </div>
          <div className={s.grid}>{getProducts().map((p) => <ProductCard key={p.slug} entry={p} />)}</div>
        </div>
      </section>

      <section className="section ground-sage" aria-labelledby="sol-h">
        <div className="wrap">
          <div className="head-split">
            <SectionHeading eyebrow="Solutions" heading="Proven answers, fitted to you." accent="fitted to you." id="sol-h" />
            <p className="t-lede">Each one has worked for businesses like yours. We set it up around how you run, so you see results in weeks.</p>
          </div>
          <IndexRows rows={getSolutions().map((x) => ({ title: x.title, meta: x.audience, text: x.outcome, href: bookHref }))} />
        </div>
      </section>

      <section className="section" aria-labelledby="which-h">
        <div className={`wrap cols-2 ${s.center}`}>
          <SectionHeading eyebrow="Not sure which?" heading="Product, solution or partnership?" accent="partnership?" id="which-h" />
          <div className={s.choices}>
            <div className={s.choice}><p className={s.choiceTitle}>Product</p><p className={`t-small muted ${s.choiceText}`}>When it already does what you need. Start today.</p></div>
            <div className={s.choice}><p className={s.choiceTitle}>Solution</p><p className={`t-small muted ${s.choiceText}`}>When you need it fitted to how you run.</p></div>
            <div className={s.choice}><p className={s.choiceTitle}>Partnership</p><p className={`t-small muted ${s.choiceText}`}>When you want something new, built together. <Link href="/partners">See partnerships →</Link></p></div>
          </div>
        </div>
      </section>

      <DarkCta heading="Find the right fit for your business." accent="your business." />
    </>
  );
}
