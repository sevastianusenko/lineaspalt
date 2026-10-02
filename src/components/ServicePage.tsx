import Link from "next/link";
import { Breadcrumbs, FaqList, Icon, LeadSection, PageHero, Photo, PostCard, SectionHead, Stars, TownChips } from "./ui";
import JsonLd from "./JsonLd";
import { bySlug, type Service } from "@/content/services";
import { towns } from "@/content/towns";
import { getPost } from "@/lib/posts";
import { abs, site } from "@/lib/site";
import { businessId } from "@/lib/schema";

export default function ServicePage({ s }: { s: Service }) {
  const related = s.related.map(bySlug).filter(Boolean) as Service[];
  const posts = s.posts.map(getPost).filter(Boolean) as NonNullable<ReturnType<typeof getPost>>[];
  const core = towns.filter((t) => t.tier === "core").slice(0, 14);
  const url = abs(`/${s.slug}/`);

  return (
    <>
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }, { name: s.name, href: `/${s.slug}/` }]} />
      <PageHero eyebrow={s.kicker} title={s.h1} lead={s.lead} image={s.hero} icon={s.icon}>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact/" className="btn btn-yellow">Free quote</Link>
          <a href={`tel:${site.phoneTel}`} className="btn btn-outline">Call {site.phone}</a>
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-muted">
          <span className="inline-flex items-center gap-2"><Stars size={16} /> 5.0 on Google</span>
          <span>Fully insured</span>
          <span>Minimum job ${site.minJob}</span>
        </p>
      </PageHero>

      {/* Intro */}
      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow reveal">The short version</p>
            <h2 className="reveal mt-4 text-[clamp(28px,3.4vw,40px)]">What it is, and when it matters</h2>
          </div>
          <div className="space-y-6 text-[18px] leading-[1.8] text-[#333]">
            {s.intro.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? "text-[20px] text-black" : ""}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="sec py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow="What is included" title={<>Every {s.name.toLowerCase()} job <mark className="hl">covers this</mark></>} />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {s.includes.map((it, i) => (
              <li key={it.t} className="card card-flat reveal p-7" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
                <span className="grid h-10 w-10 place-items-center bg-yellow font-display text-[16px] font-bold text-black">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[21px]">{it.t}</h3>
                <p className="mt-2 text-[16px] text-muted">{it.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Signs + photos */}
      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow reveal">Check your property</p>
            <h2 className="reveal mt-4 text-[clamp(28px,3.4vw,40px)]">{s.signs.title}</h2>
            <ul className="mt-8 grid gap-3">
              {s.signs.items.map((it) => (
                <li key={it} className="reveal flex items-start gap-4 text-[17px]">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-yellow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0a0500" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {s.gallery.slice(0, 4).map((g, i) => (
              <div key={g} className={`photo aspect-[3/4] ${i % 2 ? "translate-y-8" : ""}`}>
                <Photo slug={g} small />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="sec-black py-20 lg:py-28">
        <div className="wrap">
          <p className="eyebrow reveal">How it goes</p>
          <h2 className="reveal mt-4 max-w-3xl text-[clamp(30px,3.6vw,44px)]">Our process, start to finish</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {s.process.map((p, i) => (
              <li key={p.t} className="reveal border-t-4 border-yellow pt-5" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="font-display text-[15px] font-bold text-yellow">Step {i + 1}</span>
                <h3 className="mt-2 text-[22px]">{p.t}</h3>
                <p className="mt-3 text-[16px] text-white/75">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Price */}
      <section className="sec py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow reveal">Pricing</p>
            <h2 className="reveal mt-4 text-[clamp(28px,3.4vw,40px)]">What it costs</h2>
            <p className="reveal mt-5 text-[18px] text-muted">{s.price.lead}</p>
            <p className="reveal mt-4 text-[16px] text-faint">{s.price.note}</p>
            <Link href="/pricing/" className="btn btn-outline reveal mt-8">Full pricing guide</Link>
          </div>
          <div className="reveal card card-flat p-6 sm:p-9">
            <dl className="grid">
              {s.price.rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-border py-4 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[1.2fr_1fr] sm:items-baseline sm:gap-6">
                  <dt className="text-[16px] text-muted">{k}</dt>
                  <dd className="font-display text-[20px] font-bold text-black sm:text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {s.gallery.length > 4 && (
        <section className="sec-grey py-20 lg:py-28">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead eyebrow="Our work" title="On real properties" />
              <Link href="/gallery/" className="btn btn-outline reveal">Full gallery</Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {s.gallery.slice(0, 8).map((g, i) => (
                <div key={g} className="reveal photo aspect-[4/5]" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <Photo slug={g} small className="transition-transform duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="sec py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Questions" title={<>{s.name} FAQ</>} />
          <FaqList faqs={s.faqs} />
        </div>
      </section>

      {/* Related */}
      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Keep going" title="Related services" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}/`} className="card reveal grid grid-cols-[88px_1fr] items-center gap-5 p-5">
                <span className="icon-tile !h-[88px] !w-[88px]"><Icon name={r.icon} size={72} /></span>
                <span>
                  <span className="block font-display text-[21px] font-bold text-black">{r.name}</span>
                  <span className="mt-1 block text-[15px] text-muted">{r.short}</span>
                </span>
              </Link>
            ))}
          </div>

          {posts.length > 0 && (
            <>
              <h3 className="reveal mt-16 text-[28px]">Read before you decide</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {posts.slice(0, 3).map((p) => (
                  <div key={p.slug} className="reveal"><PostCard p={p} /></div>
                ))}
              </div>
            </>
          )}

          <h3 className="reveal mt-16 text-[28px]">Where we do this work</h3>
          <div className="reveal mt-6">
            <TownChips items={core.map((t) => ({ name: t.name, href: t.path }))} />
          </div>
        </div>
      </section>

      <LeadSection title={`Get a ${s.name.toLowerCase()} quote`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: s.name,
          serviceType: s.schemaType,
          description: s.metaDescription,
          url,
          provider: { "@id": businessId },
          areaServed: { "@type": "AdministrativeArea", name: "Lancaster County, PA" },
        }}
      />
    </>
  );
}
