import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import StatusTag from "@/components/StatusTag";
import ExampleTag from "@/components/ExampleTag";
import DarkCta from "@/components/DarkCta";
import JsonLd from "@/components/JsonLd";
import { bySlug, getProducts } from "@/lib/content";
import { site } from "@/data/site";
import { bookHref } from "@/data/nav";
import { pageMeta } from "@/lib/seo";
import s from "../products.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => getProducts().map((p) => ({ slug: p.slug }));
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(getProducts(), slug, "products").data;
  return pageMeta({ title: `${p.name} · GREAM Business Solutions`, description: p.summary, path: `/products/${slug}` });
}

/** One page per product, driven by content/products/<slug>.md. */
export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const { data: p, html } = bySlug(getProducts(), slug, "products");
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.summary, brand: { "@type": "Organization", name: site.name }, url: `${site.url}/products/${slug}` }} />
      <section className={`ledger-grid ${s.detailHero}`} aria-labelledby="p-h">
        <div className="wrap">
          <div className={s.detailTop}><span className="t-label">Products · {p.audience}</span><StatusTag status={p.status} />{p.example && <ExampleTag label="Illustrative example product" />}</div>
          <SectionHeading heading={p.name} level={1} size="display" id="p-h" />
          <p className={`t-lede ${s.lede}`}>{p.summary}</p>
          <div className={s.meta}>
            <p className="t-body"><span className="t-label">Price</span><br />{p.price}</p>
            <p className="t-body"><span className="t-label">Status</span><br />{p.status}</p>
          </div>
          <div className={`actions ${s.detailActions}`}>
            <Link className="btn btn-ink" href={bookHref}>{p.cta} <span className="arr" aria-hidden="true">→</span></Link>
            <Link className="btn btn-line" href="/products">All products</Link>
          </div>
        </div>
      </section>
      <section className="section" aria-label={`About ${p.name}`}>
        <div className="wrap"><div className={`t-lede ${s.prose}`} dangerouslySetInnerHTML={{ __html: html }} /></div>
      </section>
      <DarkCta heading={`Not sure ${p.name} is the right fit?`} accent="the right fit?" text="Book a free 20-minute business check. We'll tell you honestly what will make the biggest difference." />
    </>
  );
}
