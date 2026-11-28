"use client";

// Counts a number up the first time it scrolls into view. Placeholders ("—") and
// values without a number are shown as they are.
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const m = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value);

  useEffect(() => {
    if (!m || !inView || reduce || !ref.current) return;
    const [, pre, num, post] = m;
    const target = Number(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] ?? "").length;
    const el = ref.current;
    const c = animate(0, target, {
      duration: 1.4,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => (el.textContent = pre + v.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + post),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return <span ref={ref}>{value}</span>;
}
