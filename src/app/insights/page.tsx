import Link from "next/link";
import InsightsHero from "./InsightsHero";
import Subscribe from "./Subscribe";
import { getInsights } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import s from "./insights.module.css";

export const metadata = pageMeta({
  title: "Insights · GREAM Business Solutions",
  description: "Practical thinking for growing businesses: guides, reports and lessons from real projects.",
  path: "/insights",
});

export default function Insights() {
  const all = getInsights();
  const featured = all.find((x) => x.data.featured) ?? all[0];
  const rest = all.filter((x) => x !== featured);
  const side = rest.slice(0, 3);
  const latest = rest.slice(3);
  return (
    <>
      <InsightsHero />
      {featured && (
        <section className="section tight-top" aria-label="Featured">
          <div className={`wrap ${s.top}`}>
            <Link className={`dark ledger-grid ${s.feature}`} href={`/insights/${featured.slug}`}>
              <span className={`t-label ${s.featureKind}`}>Featured {featured.data.type.toLowerCase()}</span>
              <span className="t-section">{featured.data.title}</span>
              <span className="t-body muted">{featured.data.summary}</span>
              <span className={s.featureGo}>Read the {featured.data.type.toLowerCase()} →</span>
            </Link>
            <div className={s.list}>
              {side.map((x) => (
                <Link key={x.slug} className={s.item} href={`/insights/${x.slug}`}>
                  <span className="t-label">{x.data.type}</span>
                  <span className="t-title">{x.data.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {latest.length > 0 && (
        <section className="section ground-sage" aria-labelledby="latest-h">
          <div className="wrap">
            <h2 className={`t-label ${s.latestLabel}`} id="latest-h">Latest</h2>
            <div className={s.latest}>
              {latest.map((x) => (
                <Link key={x.slug} className={s.card} href={`/insights/${x.slug}`}>
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
