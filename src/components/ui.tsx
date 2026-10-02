import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "./JsonLd";
import LeadForm from "./LeadForm";
import { img, src as imgSrc, srcSm } from "@/lib/images";
import { abs, site } from "@/lib/site";
import type { Faq } from "@/content/services";
import type { Review } from "@/content/reviews";
import type { Post } from "@/lib/posts";
import { formatDate, readMinutes } from "@/lib/posts";

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
      <nav aria-label="Breadcrumb" className="wrap pt-6 text-[15px] text-asphalt-300">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((b, i) => (
            <li key={b.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-paint">/</span>}
              {i < all.length - 1 ? (
                <Link href={b.href} className="hover:text-paint">{b.name}</Link>
              ) : (
                <span aria-current="page" className="text-line">{b.name}</span>
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
  tag,
  title,
  lead,
  align = "left",
  className = "",
}: {
  tag?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {tag && <p className={`tag reveal ${align === "center" ? "justify-center" : ""}`}>{tag}</p>}
      <h2 className="reveal mt-4 text-[clamp(40px,6vw,76px)]">{title}</h2>
      {lead && <p className="reveal mt-5 text-[19px] opacity-80">{lead}</p>}
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

/* ---------- CTA band ---------- */
export function CtaBand({ title = "Ready for lines that stay sharp?", text = "Free estimate. Clear written price. We usually reply within one business day." }: { title?: string; text?: string }) {
  return (
    <section className="sec-yellow relative overflow-hidden">
      <div className="double-line on-yellow" aria-hidden />
      <div className="wrap grid items-center gap-8 py-14 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div>
          <h2 className="reveal text-[clamp(44px,7vw,92px)]">{title}</h2>
          <p className="reveal mt-4 max-w-xl text-[19px] font-medium">{text}</p>
        </div>
        <div className="reveal grid gap-4 lg:justify-items-end">
          <a href={`tel:${site.phoneTel}`} className="font-display text-[clamp(40px,6vw,64px)] font-extrabold leading-none tracking-[0.02em]">
            {site.phone}
          </a>
          <Link href="/contact/" className="btn btn-ink">Request a free quote</Link>
        </div>
      </div>
      <div className="double-line on-yellow" aria-hidden />
    </section>
  );
}

/* ---------- Road-sign town links ---------- */
export function TownSigns({ items, dim = false }: { items: { name: string; href?: string }[]; dim?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((t) => (
        <li key={t.name}>
          {t.href ? (
            <Link href={t.href} className={`road-sign ${dim ? "dim" : ""}`}>{t.name}</Link>
          ) : (
            <span className="road-sign dim opacity-80">{t.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Reviews ---------- */
export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-paint ${className}`} aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.5l7.1-.6z" /></svg>
      ))}
    </span>
  );
}

export function ReviewCard({ r, light = false }: { r: Review; light?: boolean }) {
  return (
    <figure className={`h-full ${light ? "bg-white text-ink" : "bg-asphalt-800 text-line"} border-t-[6px] border-paint p-6 sm:p-7`}>
      <Stars />
      <blockquote className="mt-4 text-[17px] leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
      <figcaption className="mt-5 border-t-2 border-current/10 pt-4">
        <span className="block font-display text-[22px] font-bold uppercase tracking-[0.03em]">{r.name}</span>
        <span className="text-[14px] opacity-70">{r.job} &middot; Google review</span>
      </figcaption>
    </figure>
  );
}

/* ---------- Post card ---------- */
export function PostCard({ p, featured = false }: { p: Post; featured?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col bg-asphalt-800 transition-transform hover:-translate-y-1">
      <Link href={`/${p.slug}/`} className="absolute inset-0 z-10" aria-label={p.title} />
      {p.image && (
        <div className={`overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
          <Photo slug={p.image} small className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="stencil text-[14px] tracking-[0.16em] text-paint">{p.categoryName}</p>
        <h3 className={`mt-2 ${featured ? "text-[34px]" : "text-[28px]"} leading-[1.02]`}>{p.title}</h3>
        <p className="mt-3 line-clamp-3 text-[16px] text-asphalt-300">{p.description}</p>
        <p className="mt-auto pt-5 text-[14px] text-asphalt-300">
          {formatDate(p.date)} &middot; {readMinutes(p.words)} min read
        </p>
      </div>
    </article>
  );
}

/* ---------- Lead section ---------- */
export function LeadSection({ title = "Get your free quote", text, defaultService }: { title?: string; text?: string; defaultService?: string }) {
  return (
    <section className="sec-dark grain py-16 lg:py-24" id="quote">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="tag reveal">Free estimate</p>
          <h2 className="reveal mt-4 text-[clamp(44px,6.5vw,84px)]">{title}</h2>
          <p className="reveal mt-5 max-w-lg text-[19px] opacity-80">
            {text ?? "Tell us what you see and where the property is. We call back within one business day, look at the job, and give you a written price."}
          </p>
          <ul className="reveal mt-8 grid gap-4">
            <li className="flex items-start gap-4">
              <span className="stencil grid h-10 w-10 shrink-0 place-items-center bg-paint text-[20px] text-black">1</span>
              <span>Send the form or call. Photos help but are not required.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="stencil grid h-10 w-10 shrink-0 place-items-center bg-paint text-[20px] text-black">2</span>
              <span>We visit or review your photos and measure the job.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="stencil grid h-10 w-10 shrink-0 place-items-center bg-paint text-[20px] text-black">3</span>
              <span>You get a clear written price. The minimum job is ${site.minJob}.</span>
            </li>
          </ul>
          <a href={`tel:${site.phoneTel}`} className="reveal mt-10 inline-block font-display text-[48px] font-extrabold leading-none tracking-[0.02em] text-paint hover:text-paint-hot">
            {site.phone}
          </a>
        </div>
        <div className="reveal chamfer bg-asphalt-800 p-6 sm:p-9">
          <LeadForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Inner page hero ---------- */
export function PageHero({
  kicker,
  title,
  lead,
  image,
  children,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="sec-deep grain relative overflow-hidden">
      <div className="wrap grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-20">
        <div>
          <p className="tag rise">{kicker}</p>
          <h1 className="rise mt-4 text-[clamp(46px,7.4vw,104px)]" style={{ animationDelay: "80ms" }}>{title}</h1>
          {lead && (
            <p className="rise mt-6 max-w-xl text-[20px] text-asphalt-300" style={{ animationDelay: "160ms" }}>{lead}</p>
          )}
          {children && <div className="rise mt-8" style={{ animationDelay: "240ms" }}>{children}</div>}
        </div>
        {image && (
          <div className="rise relative" style={{ animationDelay: "200ms" }}>
            <div className="stall relative aspect-[5/4] overflow-hidden bg-asphalt-700 lg:aspect-[4/4]">
              <Photo slug={image} priority className="h-full w-full object-cover" />
            </div>
            <span aria-hidden className="absolute -bottom-3 left-[8%] right-[-2%] h-[7px] bg-paint" style={{ clipPath: "polygon(2% 0,100% 0,98% 100%,0 100%)" }} />
          </div>
        )}
      </div>
      <div className="double-line" aria-hidden />
    </section>
  );
}
