import Link from "next/link";
import { bookHref } from "@/data/nav";
import s from "./MobileBar.module.css";

/** Under 640px: a fixed "Book a free business check" button at the bottom of every page. */
export default function MobileBar() {
  return (
    <Link className={`${s.bar} btn btn-primary`} href={bookHref}>
      Book a free business check <span className="arr" aria-hidden="true">→</span>
    </Link>
  );
}
