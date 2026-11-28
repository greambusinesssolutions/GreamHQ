import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import Subscribe from "../Subscribe";
import { bySlug, getInsights } from "@/lib/content";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import s from "../insights.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => getInsights().map((x) => ({ slug: x.slug }));
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const d = bySlug(getInsights(), slug, "insights").data;
  return pageMeta({ title: `${d.title} · GREAM Business Solutions`, description: d.summary, path: `/insights/${slug}` });
}

/** Article template: label, title, short answer box, body, related articles, newsletter. */
export default async function Article({ params }: Params) {
  const { slug } = await params;
  const all = getInsights();
  const { data: d, html } = bySlug(all, slug, "insights");
  const related = d.related.map((r) => all.find((x) => x.slug === r)).filter((x): x is (typeof all)[number] => !!x).slice(0, 3);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: d.title, description: d.summary, author: { "@type": "Organization", name: site.name }, publisher: { "@type": "Organization", name: site.name }, mainEntityOfPage: `${site.url}/insights/${slug}` }} />
      <article>
        <header className={`ledger-grid ${s.article}`}>
          <div className="wrap">
            <SectionHeading eyebrow={d.type} heading={d.title} level={1} size="display" id="art-h" />
            <aside className={s.answer} aria-label="The short answer">
              <p className={`t-label ${s.answerLabel}`}>The short answer</p>
              <p className="t-lede">{d.shortAnswer}</p>
            </aside>
          </div>
        </header>
        <div className="section tight-top">
          <div className="wrap"><div className={`t-body ${s.body}`} dangerouslySetInnerHTML={{ __html: html }} /></div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="section ground-sage" aria-labelledby="rel-h">
          <div className="wrap">
            <h2 className={`t-label ${s.latestLabel}`} id="rel-h">Related</h2>
            <div className={s.latest}>
              {related.map((x) => (
                <Link key={x.slug} className={`lift ${s.card}`} href={`/insights/${x.slug}`}>
                  <span className="t-label">{x.data.type}</span>
                  <span className="t-title">{x.data.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Subscribe />
    </>
  );
}
