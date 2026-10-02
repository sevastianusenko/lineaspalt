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
    const on = () => setScrolled(window.scrollY > 24);
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

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${scrolled || open ? "bg-asphalt-950/95 backdrop-blur" : "bg-asphalt-950"}`}
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-mark.webp" alt="" width={56} height={52} className="h-[52px] w-auto" />
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-[26px] font-extrabold uppercase tracking-[0.03em] text-paint">Lancaster</span>
            <span className="block font-display text-[15px] font-bold uppercase tracking-[0.22em] text-line">Lines &amp; Asphalt</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => {
            const active = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative px-3.5 py-2 font-display text-[19px] font-bold uppercase tracking-[0.05em] transition-colors hover:text-paint ${active ? "text-paint" : "text-line"}`}
              >
                {n.label}
                {active && <span className="absolute inset-x-3.5 -bottom-0.5 h-[4px] bg-paint" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${site.phoneTel}`} className="hidden font-display text-[24px] font-extrabold tracking-[0.03em] text-line hover:text-paint md:block">
            {site.phone}
          </a>
          <Link href="/contact/" className="btn btn-paint hidden !px-5 !py-3.5 !text-[17px] sm:inline-flex">
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
              <span className={`absolute left-0 top-0 h-[4px] w-full bg-paint transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-[4px] w-full bg-paint transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] h-[4px] w-full bg-paint transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      <div className="double-line" aria-hidden />
    </header>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 top-[87px] bottom-0 z-40 overflow-y-auto bg-asphalt-950 lg:hidden">
          <nav aria-label="Mobile" className="wrap flex flex-col py-6">
            {[{ href: "/", label: "Home" }, ...nav].map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className="rise flex items-baseline gap-4 border-b-2 border-white/10 py-4 font-display text-[40px] font-extrabold uppercase leading-none tracking-[0.01em] text-line active:text-paint"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="stencil text-[18px] text-paint">{String(i + 1).padStart(2, "0")}</span>
                {n.label}
              </Link>
            ))}
            <div className="mt-8 grid gap-3">
              <a href={`tel:${site.phoneTel}`} className="btn btn-paint">Call {site.phone}</a>
              <Link href="/contact/" className="btn btn-ghost">Get a free quote</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
