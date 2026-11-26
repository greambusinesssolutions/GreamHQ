import SectionHeading from "@/components/SectionHeading";
import NumberStrip from "@/components/NumberStrip";
import CaseCard from "@/components/CaseCard";
import ShowMore from "@/components/ShowMore";
import DarkCta from "@/components/DarkCta";
import { getStats, getWork } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import s from "./work.module.css";

export const metadata = pageMeta({
  title: "Work · GREAM Business Solutions",
  description: "Real results, around the world: what we built, who for, and what changed.",
  path: "/work",
});

export default function Work() {
  const stats = getStats("work");
  // "Showing 9 of 142 projects": the total comes from the Work stat strip (content/stats.json).
  const total = stats.find((x) => /project/i.test(x.label))?.value ?? String(getWork().length);
  const work = [...getWork()].sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.order - b.data.order);
  return (
    <>
      <section className={`ledger-grid ${s.hero}`} aria-labelledby="work-h">
        <div className="wrap">
          <SectionHeading eyebrow="Work" heading="Real results, around the world." accent="around the world." level={1} size="display" id="work-h" />
          <p className={`t-lede ${s.lede}`}>What we built, who for, and what changed.</p>
          <NumberStrip items={stats} className={s.strip} />
        </div>
      </section>
      <section className="section tight-top" aria-label="Case studies">
        <div className="wrap">
          <p className={`t-label ${s.count}`}>Showing {Math.min(9, work.length)} of {total} projects · Featured first</p>
          <ShowMore initial={9} className={s.grid}>
            {work.map((w) => <CaseCard key={w.slug} entry={w} variant="grid" level={2} />)}
          </ShowMore>
        </div>
      </section>
      <DarkCta heading="Want results like these in your business?" accent="your business?" />
    </>
  );
}
