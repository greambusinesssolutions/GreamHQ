"use client";

// Sticky business-check button on phones. Hidden while another Vermilion button or
// the business check form is on screen, so there is only one per screen.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookHref } from "@/data/nav";
import s from "./MobileBar.module.css";

export default function MobileBar() {
  const [hidden, setHidden] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setHidden(seen.size > 0);
    });
    document.querySelectorAll("main .btn-primary, #contact").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  return (
    <div className={`${s.bar} ${hidden ? s.hidden : ""}`}>
      <Link className="btn btn-primary" href={bookHref}>
        Book a free business check
      </Link>
    </div>
  );
}
