"use client";

// Shows the first `initial` items with a "Show more work" button. Without JavaScript every item stays visible.
import { Children, useEffect, useState, type ReactNode } from "react";

export default function ShowMore({ initial, className, children, label = "Show more work" }: { initial: number; className?: string; children: ReactNode; label?: string }) {
  const items = Children.toArray(children);
  const [limit, setLimit] = useState(items.length);
  useEffect(() => setLimit(initial), [initial]);
  return (
    <>
      <div className={className}>{items.slice(0, limit)}</div>
      {limit < items.length && (
        <div className="show-more">
          <button type="button" className="btn btn-line" onClick={() => setLimit((l) => l + initial)}>{label}</button>
        </div>
      )}
    </>
  );
}
