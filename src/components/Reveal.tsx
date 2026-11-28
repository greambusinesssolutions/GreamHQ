"use client";

// Scroll motion that CSS can't do on its own:
// 1. Section headings reveal line by line: words are wrapped, grouped into lines by
//    their position, and each line follows the one before by 110ms.
// 2. A fallback block reveal for browsers without CSS scroll-driven animations.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function splitWords(el: HTMLElement) {
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const p of parts) {
          if (!p) continue;
          if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
          else {
            const w = document.createElement("span");
            w.className = "w";
            w.textContent = p;
            frag.appendChild(w);
          }
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) walk(child);
    }
  };
  walk(el);
  let line = -1;
  let top = -Infinity;
  el.querySelectorAll<HTMLElement>(".w").forEach((w) => {
    if (w.offsetTop > top + 4) (line += 1), (top = w.offsetTop);
    w.style.setProperty("--l", String(line));
  });
}

export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const reveal = (els: Element[], onShow: (el: Element) => void) => {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && (onShow(e.target), io.unobserve(e.target))),
        { rootMargin: "0px 0px -10% 0px" },
      );
      els.forEach((el) => io.observe(el));
      return io;
    };

    const headings = Array.from(document.querySelectorAll<HTMLElement>("main section:not(:first-of-type) h2:is(.t-section, .t-display)")).filter((h) => !h.dataset.split);
    headings.forEach((h) => {
      h.dataset.split = "1";
      splitWords(h);
      h.classList.add("split-heading");
    });
    const ios = [reveal(headings, (h) => h.classList.add("shown"))];

    if (!CSS.supports("animation-timeline: view()")) {
      document.documentElement.classList.add("reveal-js");
      const blocks = Array.from(document.querySelectorAll("main section:not(:first-of-type) > .wrap > :not(h2, :has(h2))"));
      ios.push(reveal(blocks, (b) => b.classList.add("revealed")));
    }
    return () => ios.forEach((io) => io.disconnect());
  }, [path]);
  return null;
}
