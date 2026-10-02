import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { towns } from "@/content/towns";
import { Stars } from "./ui";

export default function Footer() {
  const core = towns.filter((t) => t.tier === "core").slice(0, 12);
  return (
    <footer className="sec-grey pb-24 lg:pb-0">
      <div className="h-[6px] w-full bg-yellow" aria-hidden />
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <Link href="/" className="inline-block" aria-label={`${site.name}, home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-horizontal.png" alt={site.name} width={244} height={67} className="h-[64px] w-auto" loading="lazy" />
          </Link>
          <p className="mt-5 font-display text-[18px] font-bold text-black">{site.name}</p>
          <p className="mt-2 max-w-sm text-[16px] text-muted">{site.tagline}</p>

          <address className="mt-6 grid gap-1 text-[16px] not-italic text-[#333]">
            <span className="font-display text-[14px] font-bold text-black">Location</span>
            <span>{site.address.line}</span>
            <span className="mt-3 font-display text-[14px] font-bold text-black">Phone</span>
            <a href={`tel:${site.phoneTel}`} className="font-display text-[22px] font-bold text-black hover:underline">{site.phone}</a>
            <span className="mt-3 font-display text-[14px] font-bold text-black">Email</span>
            <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
          </address>

          <a href={site.gbp.url} target="_blank" rel="noopener noreferrer" className="card mt-6 inline-flex items-center gap-3 px-4 py-3">
            <Stars size={16} />
            <span className="text-[14px]">
              <strong className="font-display text-black">{site.rating.value} on Google</strong>
              <span className="text-muted"> &middot; {site.name}</span>
            </span>
          </a>
        </div>

        <div>
          <h3 className="mb-5 text-[17px]">Services</h3>
          <ul className="grid gap-2.5 text-[16px] text-[#333]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`} className="hover:text-black hover:underline">{s.name}</Link>
              </li>
            ))}
            <li><Link href="/pricing/" className="font-bold text-black hover:underline">Pricing guide</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[17px]">Where we work</h3>
          <ul className="grid gap-2.5 text-[16px] text-[#333]">
            {core.map((t) => (
              <li key={t.slug}>
                <Link href={t.path} className="hover:text-black hover:underline">{t.name}, PA</Link>
              </li>
            ))}
            <li><Link href="/service-areas/" className="font-bold text-black hover:underline">All service areas</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[17px]">Company</h3>
          <ul className="grid gap-2.5 text-[16px] text-[#333]">
            <li><Link href="/about/" className="hover:text-black hover:underline">About {site.name}</Link></li>
            <li><Link href="/gallery/" className="hover:text-black hover:underline">Our work</Link></li>
            <li><Link href="/blog/" className="hover:text-black hover:underline">Blog</Link></li>
            <li><Link href="/contact/" className="hover:text-black hover:underline">Contact</Link></li>
            <li><a href={site.gbp.reviewUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline">Leave a Google review</a></li>
            <li><Link href="/privacy-policy/" className="hover:text-black hover:underline">Privacy policy</Link></li>
            <li><Link href="/terms/" className="hover:text-black hover:underline">Terms</Link></li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-sm hover:bg-yellow" aria-label={`${site.name} on Facebook`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.8v8h3.2z" /></svg>
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-sm hover:bg-yellow" aria-label={`${site.name} on Instagram`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
            </a>
            <a href={site.gbp.url} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-sm hover:bg-yellow" aria-label={`${site.name} on Google Maps`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="wrap flex flex-col gap-2 py-6 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.legalName}. {site.category} in {site.address.locality}, PA. Fully insured. Free estimates.</p>
          <p>
            Website designed &amp; developed by{" "}
            <a href="https://seva-web-studio.com/" rel="noopener" className="font-bold text-black underline underline-offset-4 hover:no-underline">
              Seva Web Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
