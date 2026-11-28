"use client";

// "How we work" as a full-width dark section: each of the six steps highlights
// as it reaches the middle of the screen. Copy as in the design (SixSteps).
import { useEffect, useRef, useState } from "react";
import s from "./StepsScroll.module.css";

export default function StepsScroll({ steps }: { steps: [string, string][] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setActive(-1);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ol className={`${s.steps} ${active === -1 ? s.still : ""}`}>
      {steps.map(([h, p], i) => (
        <li key={h} data-i={i} ref={(el) => { refs.current[i] = el; }} className={`${s.step} ${i === active ? s.on : ""} ${i === steps.length - 1 ? s.last : ""}`}>
          <span className={`t-label ${s.n}`}>{`0${i + 1}`}</span>
          <h3 className={`t-display ${s.h}`}>{h}</h3>
          <p className={`t-lede ${s.p}`}>{p}</p>
        </li>
      ))}
    </ol>
  );
}
