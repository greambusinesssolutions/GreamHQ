import Link from "next/link";
import StatusTag from "./StatusTag";
import type { Product } from "@/lib/content";
import s from "./ProductCard.module.css";

export default function ProductCard({ entry }: { entry: Product }) {
  const p = entry.data;
  return (
    <article className={s.card}>
      <div className={s.top}>
        <span className="t-label">{p.audience}</span>
        <StatusTag status={p.status} />
      </div>
      <h3 className={`t-section ${s.name}`}>{p.name}</h3>
      <p className="t-body muted">{p.summary}</p>
      {p.ai && <p className={`t-label ${s.ai}`}>Powered by AI that gets smarter every month.</p>}
      <div className={s.foot}>
        <span className={`t-small ${s.price}`}>{p.price}</span>
        <Link className={`t-small ${s.link}`} href={`/products/${entry.slug}`}>
          {p.cta}<span className="sr-only">: {p.name}</span>&nbsp;→
        </Link>
      </div>
    </article>
  );
}
