"use client";

// Scroll reveal fallback for browsers without CSS scroll-driven animations:
// sections after the hero fade and rise in once, as they enter the viewport.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("reveal-js");
    const els = document.querySelectorAll("main section:not(:first-of-type) > .wrap > *");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("revealed"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => (el.getBoundingClientRect().top < innerHeight ? el.classList.add("revealed") : io.observe(el)));
    return () => io.disconnect();
  }, [path]);
  return null;
}
