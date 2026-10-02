import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { towns } from "@/content/towns";

export default function Footer() {
  const core = towns.filter((t) => t.tier === "core").slice(0, 12);
  return (
    <footer className="sec-deep grain pb-24 lg:pb-0">
      <div className="double-line" aria-hidden />
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-mark.webp" alt={`${site.name} logo`} width={150} height={140} className="h-auto w-[132px]" loading="lazy" />
          <p className="mt-6 max-w-sm text-[17px] text-asphalt-300">
            Locally owned asphalt maintenance and line striping. Sealcoating, crack filling, pothole repair and pavement markings within about 40 miles of Lancaster, PA.
          </p>
          <ul className="mt-6 grid gap-1 text-[17px]">
            <li>
              <a href={`tel:${site.phoneTel}`} className="font-display text-[30px] font-extrabold tracking-wide text-paint hover:text-paint-hot">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-paint">{site.email}</a>
            </li>
            <li className="text-asphalt-300">{site.region}</li>
          </ul>
          <dl className="mt-5 grid max-w-xs grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[15px] text-asphalt-300">
            {site.hours.map((h) => (
              <div key={h.days} className="contents">
                <dt>{h.days}</dt>
                <dd>{h.open} to {h.close}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="tag mb-5 !text-[17px]">Services</h3>
          <ul className="grid gap-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`} className="hover:text-paint">{s.name}</Link>
              </li>
            ))}
            <li><Link href="/pricing/" className="text-paint hover:text-paint-hot">Pricing guide</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="tag mb-5 !text-[17px]">Where we work</h3>
          <ul className="grid gap-2.5">
            {core.map((t) => (
              <li key={t.slug}>
                <Link href={t.path} className="hover:text-paint">{t.name}, PA</Link>
              </li>
            ))}
            <li><Link href="/service-areas/" className="text-paint hover:text-paint-hot">All service areas</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="tag mb-5 !text-[17px]">Company</h3>
          <ul className="grid gap-2.5">
            <li><Link href="/about/" className="hover:text-paint">About us</Link></li>
            <li><Link href="/gallery/" className="hover:text-paint">Our work</Link></li>
            <li><Link href="/blog/" className="hover:text-paint">Blog</Link></li>
            <li><Link href="/contact/" className="hover:text-paint">Contact</Link></li>
            <li><Link href="/privacy-policy/" className="hover:text-paint">Privacy policy</Link></li>
            <li><Link href="/terms/" className="hover:text-paint">Terms</Link></li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center bg-asphalt-700 hover:bg-paint hover:text-black" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.8v8h3.2z" /></svg>
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center bg-asphalt-700 hover:bg-paint hover:text-black" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-[15px] text-asphalt-300 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.legalName}. Fully insured. Free estimates.</p>
          <p>
            Website designed &amp; developed by{" "}
            <a href="https://seva-web-studio.com/" rel="noopener" className="text-paint underline underline-offset-4 hover:text-paint-hot">
              Seva Web Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
