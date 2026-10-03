import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "./JsonLd";
import LeadForm from "./LeadForm";
import { img, src as imgSrc, srcSm } from "@/lib/images";
import { abs, site } from "@/lib/site";
import type { Faq } from "@/content/services";
import { reviewMonth, type Review } from "@/content/reviews";
import type { Post } from "@/lib/posts";
import { formatDate, readMinutes } from "@/lib/posts";

/* ---------- Service icon (the client's own icon set in /public/icons) ---------- */
export function Icon({ name, size = 88, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/icons/${name}.png`} alt="" width={size} height={size} loading="lazy" decoding="async" className={className} style={{ width: size, height: size, objectFit: "contain" }} />
  );
}

/* ---------- Photo ---------- */
export function Photo({
  slug,
  small = false,
  className = "",
  priority = false,
  sizes,
  style,
}: {
  slug: string;
  small?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}) {
  const i = img(slug);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={small ? srcSm(slug) : imgSrc(slug)}
      alt={i.alt}
      width={small ? i.sw : i.w}
      height={small ? i.sh : i.h}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      sizes={sizes}
      className={className}
      style={style}
    />
  );
}

/* ---------- Breadcrumbs ---------- */
export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="wrap pt-6 text-[14px] text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((b, i) => (
            <li key={b.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-faint">/</span>}
              {i < all.length - 1 ? (
                <Link href={b.href} className="hover:text-black hover:underline">{b.name}</Link>
              ) : (
                <span aria-current="page" className="text-black">{b.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, item: abs(b.href) })),
        }}
      />
    </>
  );
}

/* ---------- Section head ---------- */
export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow reveal ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 className="reveal mt-4 text-[clamp(30px,3.6vw,44px)]">{title}</h2>
      {lead && <p className="reveal mt-5 text-[18px] text-muted">{lead}</p>}
    </div>
  );
}

/* ---------- FAQ ---------- */
export function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <>
      <div className="max-w-4xl">
        {faqs.map((f, i) => (
          <details key={f.q} className="faq" open={i === 0}>
            <summary>{f.q}</summary>
            <div>{f.a}</div>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </>
  );
}

/* ---------- CTA band (black, like the old site's closing band) ---------- */
export function CtaBand({ title = "Let's get your pavement done right.", text = `Call ${site.name} for a free estimate. Clear written price, and we usually reply within one business day.` }: { title?: string; text?: string }) {
  return (
    <section className="sec-black">
      <div className="wrap grid items-center gap-8 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div>
          <h2 className="reveal text-[clamp(30px,4vw,48px)]">{title}</h2>
          <p className="reveal mt-4 max-w-xl text-[18px] text-white/75">{text}</p>
        </div>
        <div className="reveal flex flex-wrap gap-4 lg:justify-end">
          <a href={`tel:${site.phoneTel}`} className="btn btn-outline-white">Call {site.phone}</a>
          <Link href="/contact/" className="btn btn-yellow">Request a free quote</Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Town chips ---------- */
export function TownChips({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((t) => (
        <li key={t.name}>
          {t.href ? (
            <Link href={t.href} className="chip">{t.name}</Link>
          ) : (
            <span className="chip chip-static">{t.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Google Business Profile badge ---------- */
export function GoogleBadge({ className = "" }: { className?: string }) {
  return (
    <a href={site.gbp.reviewsUrl} target="_blank" rel="noopener noreferrer" className={`card inline-flex items-center gap-3 px-4 py-3 ${className}`}>
      <Stars size={16} />
      <span className="text-[14px]">
        <strong className="font-display text-black">{site.rating.value} on Google</strong>
        <span className="text-muted"> &middot; {site.rating.count} reviews</span>
      </span>
    </a>
  );
}

/* ---------- Reviews ---------- */
export function Stars({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <span className={`inline-flex gap-0.5 text-yellow ${className}`} aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.5l7.1-.6z" /></svg>
      ))}
    </span>
  );
}

export function ReviewCard({ r }: { r: Review }) {
  const initial = r.name.trim().charAt(0).toUpperCase();
  return (
    <figure className="card card-flat flex h-full flex-col p-7">
      <figcaption className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-black font-display text-[20px] font-bold text-yellow" aria-hidden>{initial}</span>
        <span>
          <span className="block font-display text-[17px] font-bold text-black">{r.name}</span>
          <span className="block text-[14px] text-muted">{r.job} &middot; {reviewMonth(r.date)}</span>
        </span>
      </figcaption>
      <Stars className="mt-4" size={18} />
      <blockquote className="mt-3 text-[16px] leading-relaxed text-[#333]">{r.text}</blockquote>
      <p className="mt-auto pt-5 text-[13px] text-faint">
        <a href={site.gbp.reviewsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline">Google review of {site.name}</a>
      </p>
    </figure>
  );
}

/* ---------- Project card ---------- */
export function ProjectCard({ p }: { p: { slug: string; title: string; summary: string; hero: string; town: string; completed: string } }) {
  const meta = [p.town, p.completed].filter(Boolean).join(" · ");
  return (
    <Link href={`/projects/${p.slug}/`} className="card flex h-full flex-col overflow-hidden">
      <span className="block aspect-[4/3] overflow-hidden bg-grey-2">
        <Photo slug={p.hero} small className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
      </span>
      <span className="flex flex-1 flex-col p-6">
        {meta && <span className="eyebrow !text-[13px]">{meta}</span>}
        <span className="mt-3 block font-display text-[20px] font-bold leading-[1.2] text-black">{p.title}</span>
        <span className="mt-3 line-clamp-3 block text-[15px] text-muted">{p.summary}</span>
        <span className="more mt-auto pt-5 !text-[15px]">
          View project
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </span>
    </Link>
  );
}

/* ---------- Post card: title over the photo, like the old blog grid ---------- */
export function PostCard({ p }: { p: Post }) {
  return (
    <article className="h-full">
      <Link href={`/${p.slug}/`} className="post-tile">
        {p.image && <Photo slug={p.image} small />}
        <div>
          <h3 className="text-[22px] leading-[1.25] text-white">{p.title}</h3>
          <p className="mt-3 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-white/85">
            {formatDate(p.date)} &middot; {readMinutes(p.words)} min read
          </p>
        </div>
      </Link>
    </article>
  );
}

/* ---------- Lead section ---------- */
export function LeadSection({ title = "Get your free quote", text, defaultService }: { title?: string; text?: string; defaultService?: string }) {
  return (
    <section className="sec-grey py-20 lg:py-28" id="quote">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow reveal">Free estimate from {site.name}</p>
          <h2 className="reveal mt-4 text-[clamp(30px,3.6vw,44px)]">{title}</h2>
          <p className="reveal mt-5 max-w-lg text-[18px] text-muted">
            {text ?? "Tell us what you see and where the property is. We call back within one business day, look at the job, and give you a written price."}
          </p>
          <ol className="reveal mt-8 grid gap-5">
            {[
              "Send the form or call. Photos help but are not required.",
              "We visit or review your photos and measure the job.",
              "You get a clear written price. No obligation.",
            ].map((t, i) => (
              <li key={t} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center bg-yellow font-display text-[17px] font-bold text-black">{i + 1}</span>
                <span className="pt-1.5">{t}</span>
              </li>
            ))}
          </ol>
          <a href={`tel:${site.phoneTel}`} className="reveal mt-10 inline-block font-display text-[clamp(28px,3.4vw,40px)] font-bold text-black hover:underline">
            {site.phone}
          </a>
        </div>
        <div className="reveal card card-flat p-6 sm:p-9">
          <LeadForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Inner page hero ---------- */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  icon,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: string;
  icon?: string;
  children?: ReactNode;
}) {
  return (
    <section className="sec">
      <div className="wrap grid items-center gap-10 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-16">
        <div>
          {icon && <div className="rise mb-6"><Icon name={icon} size={80} /></div>}
          <p className="eyebrow rise">{eyebrow}</p>
          <h1 className="rise mt-4 text-[clamp(34px,4.4vw,58px)]" style={{ animationDelay: "80ms" }}>{title}</h1>
          {lead && (
            <p className="rise mt-6 max-w-xl text-[19px] text-muted" style={{ animationDelay: "160ms" }}>{lead}</p>
          )}
          {children && <div className="rise mt-8" style={{ animationDelay: "240ms" }}>{children}</div>}
        </div>
        {image && (
          <div className="rise relative" style={{ animationDelay: "200ms" }}>
            <div className="photo aspect-[5/4] lg:aspect-[4/3]">
              <Photo slug={image} priority />
            </div>
            <span aria-hidden className="pop absolute -bottom-6 -right-3 hidden h-[88px] w-[88px] rounded-full bg-yellow lg:block" />
          </div>
        )}
      </div>
    </section>
  );
}
