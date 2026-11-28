import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CaseCard from "@/components/CaseCard";
import Quote from "@/components/Quote";
import DarkCta from "@/components/DarkCta";
import { bySlug, getWork } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import s from "../work.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => getWork().map((w) => ({ slug: w.slug }));
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = bySlug(getWork(), slug, "work").data;
  return pageMeta({ title: `${c.client}: ${c.result.value} ${c.result.label} · GREAM Business Solutions`, description: c.title, path: `/work/${slug}` });
}

/** Case study template, driven by content/work/<slug>.md. */
export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const all = getWork();
  const { data: c, html } = bySlug(all, slug, "work");
  const related = all.filter((w) => w.slug !== slug).sort((a, b) => Number(b.data.service === c.service) - Number(a.data.service === c.service)).slice(0, 3);

  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="case-h">
        <div className="wrap">
          <SectionHeading eyebrow={`Work · ${c.service}`} heading={c.title} level={1} size="display" id="case-h" />
          <dl className={s.facts}>
            {[["Client", c.client], ["Industry", c.industry], ["Region", c.region], ["What we did", c.service]].map(([k, v]) => (
              <div className={s.fact} key={k}><dt className="t-label">{k}</dt><dd className="t-body">{v}</dd></div>
            ))}
          </dl>
          <p className={s.result}>
            <b className={`t-display ${s.resultValue}`}>{c.result.value}</b>
            <span className="t-lede">{c.result.label}</span>
          </p>
        </div>
      </section>

      <section className="section tight-top" aria-label="The story">
        <div className="wrap">
          <div className={s.blocks}>
            <div className={s.block}><h2 className="t-label">The problem</h2><p className="t-lede">{c.problem}</p></div>
            <div className={s.block}><h2 className="t-label">What changed</h2><p className="t-lede">{c.changed}</p></div>
          </div>
          <div className={`t-body ${s.prose}`} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>

      {c.quote && (
        <section className="section ground-sage" aria-label={`What ${c.client} says`}>
          <div className="wrap"><Quote {...c.quote} /></div>
        </section>
      )}

      <section className="section" aria-labelledby="rel-h">
        <div className="wrap">
          <SectionHeading eyebrow="Related work" heading="More results like this." accent="like this." id="rel-h" className="head-block" />
          <div className={s.related}>{related.map((w) => <CaseCard key={w.slug} entry={w} variant="grid" />)}</div>
        </div>
      </section>

      <DarkCta heading="Want results like these in your business?" accent="your business?" />
    </>
  );
}
