import Link from "next/link";
import { site } from "@/lib/site";

export default function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px bg-black lg:hidden" role="region" aria-label="Quick contact">
      <a href={`tel:${site.phoneTel}`} className="flex items-center justify-center gap-2 bg-paint py-4 font-display text-[20px] font-extrabold uppercase tracking-[0.06em] text-black">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" /></svg>
        Call now
      </a>
      <Link href="/contact/" className="flex items-center justify-center bg-asphalt-950 py-4 font-display text-[20px] font-extrabold uppercase tracking-[0.06em] text-paint">
        Free quote
      </Link>
    </div>
  );
}
