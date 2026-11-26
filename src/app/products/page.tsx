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
  description: "Products you can subscribe to today, and proven solutions we set up around your business. Both get you results faster than starting from scratch.",
  path: "/products",
});

export default function Products() {
  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="prod-h">
        <div className="wrap">
          <SectionHeading eyebrow="Products and solutions" heading="Ready to use. Ready to grow with." accent="Ready to grow with." level={1} size="display" id="prod-h" />
          <p className={`t-lede ${s.lede}`}>Products you can subscribe to today, and proven solutions we set up around your business. Both get you results faster than starting from scratch.</p>
        </div>
      </section>

      <section className={`section ${s.listSection}`} aria-labelledby="list-h">
        <div className="wrap">
          <div className="head-row">
            <SectionHeading eyebrow="Products" heading="Subscribe and start this week." accent="this week." id="list-h" />
            <p className={`t-body muted ${s.side}`}>Simple monthly plans. Cancel any time. Your data stays yours.</p>
          </div>
          <div className={s.grid}>{getProducts().map((p) => <ProductCard key={p.slug} entry={p} />)}</div>
        </div>
      </section>

      <section className="section ground-sage" aria-labelledby="sol-h">
        <div className="wrap">
          <div className="head-split">
            <SectionHeading eyebrow="Solutions" heading="Proven answers, set up for you." accent="set up for you." id="sol-h" />
            <p className="t-lede">Each solution has worked for businesses like yours. We fit it to how you run, and you see results in weeks, not months.</p>
          </div>
          <IndexRows rows={getSolutions().map((x) => ({ title: x.title, meta: x.audience, text: x.outcome, href: bookHref }))} />
        </div>
      </section>

      <section className="section" aria-labelledby="which-h">
        <div className={`wrap cols-2 ${s.center}`}>
          <SectionHeading eyebrow="Not sure which?" heading="Product, solution or something new?" accent="something new?" id="which-h" />
          <div className={s.choices}>
            <div className={s.choice}><p className={s.choiceTitle}>Choose a product</p><p className={`t-small muted ${s.choiceText}`}>When it already does what you need. Start today.</p></div>
            <div className={s.choice}><p className={s.choiceTitle}>Choose a solution</p><p className={`t-small muted ${s.choiceText}`}>When you need it fitted to how your business runs.</p></div>
            <div className={s.choice}><p className={s.choiceTitle}>Build something new</p><p className={`t-small muted ${s.choiceText}`}>When nothing fits yet. <Link href="/partners">Or build a product with us →</Link></p></div>
          </div>
        </div>
      </section>

      <DarkCta heading="Find the right fit for your business." accent="your business." />
    </>
  );
}
