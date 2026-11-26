import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { types } from "./types";
import s from "./insights.module.css";

export default function InsightsHero({ current }: { current?: string }) {
  return (
    <section className={`ledger-grid ${s.hero}`} aria-labelledby="ins-h">
      <div className="wrap">
        <SectionHeading eyebrow="Insights" heading="Practical thinking for growing businesses." accent="growing businesses." level={1} size="display" id="ins-h" />
        <nav className={s.filters} aria-label="Insight types">
          <Link className={s.filter} href="/insights" aria-current={!current ? "page" : undefined}>All</Link>
          {types.map((t) => (
            <Link key={t.slug} className={s.filter} href={`/insights/type/${t.slug}`} aria-current={current === t.slug ? "page" : undefined}>{t.label}</Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
