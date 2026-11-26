import Link from "next/link";
import CaseVisual from "./CaseVisual";
import ExampleTag from "./ExampleTag";
import type { CaseStudy } from "@/lib/content";
import s from "./CaseCard.module.css";

type Props = { entry: CaseStudy; variant?: "featured" | "compact" | "grid"; dark?: boolean; level?: 2 | 3; home?: boolean };

/** Case study card: featured (home), compact (home, three across) or grid (Work page). */
export default function CaseCard({ entry, variant = "grid", dark = false, level = 3, home = false }: Props) {
  const c = entry.data;
  // The home page words some results and chats differently from the Work page (see the design).
  const result = (home && c.homeResult) || c.result;
  const href = `/work/${entry.slug}`;
  const H = level === 2 ? "h2" : "h3";
  const meta = variant === "grid" ? `${c.service} · ${c.industry} · ${c.region}` : `${c.industry} · ${c.region}`;

  if (variant === "compact") {
    return (
      <Link className={s.compact} href={href}>
        <span className="t-label">{meta}</span>
        {c.example && <ExampleTag />}
        <H className={`t-title ${s.compactTitle}`}>{c.title}</H>
        <span className="t-small muted"><b className={s.acc}>{result.value}</b> {result.label}</span>
      </Link>
    );
  }
  return (
    <Link className={`${s.card} ${variant === "featured" ? s.featured : ""} ${dark ? s.dark : ""}`} href={href}>
      <CaseVisual kind={c.visual} size={variant === "featured" ? "large" : "small"} chat={home ? c.homeChat : undefined} />
      <span className={s.body}>
        <span className={`t-label ${s.meta}`}>{meta}</span>
        {c.example && <ExampleTag className={s.tag} />}
        <H className="t-title">{c.title}</H>
        <span className={s.res}>
          <b className={`t-section ${s.big}`}>{result.value}</b>
          <span className={`t-small ${s.resLabel}`}>{result.label}</span>
        </span>
        {variant === "grid" && <span className={`t-small ${s.more}`}>Read the case →</span>}
      </span>
    </Link>
  );
}
