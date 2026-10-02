"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [openAt, setOpenAt] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Menu is "open" only for the page it was opened on, so navigating closes it.
  const open = openAt === pathname;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled || open ? "shadow-[0_6px_24px_-12px_rgba(0,0,0,.25)]" : ""}`}>
        <div className="wrap flex h-[84px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-horizontal.png" alt={`${site.name}, home`} width={244} height={67} className="h-[52px] w-auto sm:h-[60px]" />
          </Link>

          <nav aria-label="Main" className="hidden h-full items-stretch lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center px-5 font-display text-[16px] font-bold transition-colors ${isActive(n.href) ? "bg-yellow text-black" : "text-ink hover:bg-grey"}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={`tel:${site.phoneTel}`} className="btn btn-outline btn-sm hidden md:inline-flex">
              Call Now: {site.phone}
            </a>
            <Link href="/contact/" className="btn btn-yellow btn-sm hidden sm:inline-flex">
              Free Quote
            </Link>
            <button
              type="button"
              className="grid h-12 w-12 place-items-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpenAt(open ? null : pathname)}
            >
              <span className="relative block h-[18px] w-7">
                <span className={`absolute left-0 top-0 h-[3px] w-full bg-black transition-transform ${open ? "translate-y-[7.5px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[7.5px] h-[3px] w-full bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-[15px] h-[3px] w-full bg-black transition-transform ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 top-[84px] bottom-0 z-40 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Mobile" className="wrap flex flex-col py-4">
            {[{ href: "/", label: "Home" }, ...nav].map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className="rise flex items-center justify-between border-b border-border py-4 font-display text-[26px] font-bold text-ink"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {n.label}
                {isActive(n.href) && <span className="h-3 w-3 bg-yellow" aria-hidden />}
              </Link>
            ))}
            <div className="mt-8 grid gap-3">
              <a href={`tel:${site.phoneTel}`} className="btn btn-black">Call {site.phone}</a>
              <Link href="/contact/" className="btn btn-yellow">Get a free quote</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
