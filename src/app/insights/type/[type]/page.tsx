import Link from "next/link";
import type { Metadata } from "next";
import InsightsHero from "../../InsightsHero";
import Subscribe from "../../Subscribe";
import { getInsights } from "@/lib/content";
import { types } from "../../types";
import { pageMeta } from "@/lib/seo";
import s from "../../insights.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => types.map((t) => ({ type: t.slug }));
type Params = { params: Promise<{ type: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { type } = await params;
  const t = types.find((x) => x.slug === type)!;
  return pageMeta({ title: `${t.label} · Insights · GREAM Business Solutions`, description: `${t.label} from GREAM Business Solutions: practical thinking for growing businesses.`, path: `/insights/type/${type}` });
}

export default async function InsightType({ params }: Params) {
  const { type } = await params;
  const t = types.find((x) => x.slug === type)!;
  const items = getInsights().filter((x) => x.data.type === t.type);
  return (
    <>
      <InsightsHero current={type} />
      <section className="section tight-top" aria-label={t.label}>
        <div className="wrap">
          {items.length ? (
            <div className={s.latest}>
              {items.map((x) => (
                <Link key={x.slug} className={`lift ${s.card}`} href={`/insights/${x.slug}`}>
                  <span className="t-label">{x.data.type}</span>
                  <span className="t-title">{x.data.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className={`t-lede ${s.empty}`}>Nothing here yet. <Link href="/insights">See all insights →</Link></p>
          )}
        </div>
      </section>
      <Subscribe />
    </>
  );
}
