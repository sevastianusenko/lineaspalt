import Link from "next/link";
import { Breadcrumbs, FaqList, LeadSection, PageHero, Photo, PostCard, SectionHead, Stars, TownSigns } from "./ui";
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
      <PageHero kicker={s.kicker} title={s.h1} lead={s.lead} image={s.hero}>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact/" className="btn btn-paint">Free quote</Link>
          <a href={`tel:${site.phoneTel}`} className="btn btn-ghost">Call {site.phone}</a>
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[16px] text-asphalt-300">
          <span className="inline-flex items-center gap-2"><Stars /> 5.0 on Google</span>
          <span>Fully insured</span>
          <span>Minimum job ${site.minJob}</span>
        </p>
      </PageHero>

      {/* Intro */}
      <section className="sec-dark grain py-16 lg:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="tag reveal">The short version</p>
            <h2 className="reveal mt-4 text-[clamp(38px,5vw,64px)]">What it is, and when it matters.</h2>
          </div>
          <div className="space-y-6 text-[19px] leading-[1.75] text-[#d9d9d4]">
            {s.intro.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? "text-[22px] text-line" : ""}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="sec-light grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="What is included" title={<>Every {s.name.toLowerCase()} job <span className="text-[#8a5c00]">covers this.</span></>} />
          <ul className="mt-12 grid gap-x-12 gap-y-0 md:grid-cols-2">
            {s.includes.map((it, i) => (
              <li key={it.t} className="reveal grid grid-cols-[64px_1fr] gap-4 border-t-[3px] border-ink/80 py-6">
                <span className="stencil text-[44px] leading-none text-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[28px]">{it.t}</h3>
                  <p className="mt-2 text-[17px] text-[#2b2e31]">{it.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Signs + photos */}
      <section className="sec-deep grain py-16 lg:py-24">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="tag reveal">Check your property</p>
            <h2 className="reveal mt-4 text-[clamp(38px,5vw,64px)]">{s.signs.title}</h2>
            <ul className="mt-8 grid gap-3">
              {s.signs.items.map((it) => (
                <li key={it} className="reveal flex items-start gap-4 border-b-2 border-white/10 pb-3 text-[18px]">
                  <span className="mt-[10px] h-[5px] w-[22px] shrink-0 bg-paint" aria-hidden />
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal grid grid-cols-2 gap-3">
            {s.gallery.slice(0, 4).map((g, i) => (
              <div key={g} className={`${i % 2 ? "translate-y-8" : ""} ${i % 2 ? "stall-r" : "stall"} aspect-[3/4] overflow-hidden bg-asphalt-700`}>
                <Photo slug={g} small className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="sec-yellow py-16 lg:py-24">
        <div className="wrap">
          <p className="tag reveal">How it goes</p>
          <h2 className="reveal mt-4 max-w-3xl text-[clamp(40px,6vw,80px)]">Our process, start to finish.</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {s.process.map((p, i) => (
              <li key={p.t} className="reveal border-t-[6px] border-black pt-4" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="stencil text-[64px] leading-none">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-[32px]">{p.t}</h3>
                <p className="mt-3 text-[17px] font-medium">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Price */}
      <section className="sec-light grain py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="tag reveal">Pricing</p>
            <h2 className="reveal mt-4 text-[clamp(38px,5vw,64px)]">What it costs.</h2>
            <p className="reveal mt-5 text-[19px] text-[#2b2e31]">{s.price.lead}</p>
            <p className="reveal mt-4 text-[16px] text-[#2b2e31]/80">{s.price.note}</p>
            <Link href="/pricing/" className="btn btn-ink reveal mt-8">Full pricing guide</Link>
          </div>
          <div className="reveal chamfer bg-ink p-6 text-line sm:p-9">
            <dl className="grid">
              {s.price.rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b-2 border-white/12 py-4 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[1.2fr_1fr] sm:items-baseline sm:gap-6">
                  <dt className="text-[17px] text-asphalt-300">{k}</dt>
                  <dd className="font-display text-[28px] font-extrabold uppercase leading-tight tracking-wide text-paint sm:text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {s.gallery.length > 4 && (
        <section className="sec-dark grain py-16 lg:py-24">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead tag="Our work" title={<>On real <span className="text-paint">properties.</span></>} />
              <Link href="/gallery/" className="btn btn-ghost reveal">Full gallery</Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {s.gallery.slice(0, 8).map((g, i) => (
                <div key={g} className="reveal aspect-[4/5] overflow-hidden bg-asphalt-800" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <Photo slug={g} small className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="sec-deep grain py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead tag="Questions" title={<>{s.name} <span className="text-paint">FAQ.</span></>} />
          <FaqList faqs={s.faqs} />
        </div>
      </section>

      {/* Related */}
      <section className="sec-dark grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="Keep going" title={<>Related <span className="text-paint">services.</span></>} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}/`} className="reveal group grid grid-cols-[110px_1fr] items-center gap-5 bg-asphalt-800 p-4 transition-transform hover:-translate-y-1 sm:grid-cols-[150px_1fr]">
                <span className="stall block aspect-[4/3] overflow-hidden bg-asphalt-700">
                  <Photo slug={r.hero} small className="h-full w-full object-cover" />
                </span>
                <span>
                  <span className="block font-display text-[30px] font-extrabold uppercase leading-none group-hover:text-paint">{r.name}</span>
                  <span className="mt-2 block text-[16px] text-asphalt-300">{r.short}</span>
                </span>
              </Link>
            ))}
          </div>

          {posts.length > 0 && (
            <>
              <h3 className="reveal mt-16 text-[40px]">Read before you decide</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {posts.slice(0, 3).map((p) => (
                  <div key={p.slug} className="reveal"><PostCard p={p} /></div>
                ))}
              </div>
            </>
          )}

          <h3 className="reveal mt-16 text-[40px]">Where we do this work</h3>
          <div className="reveal mt-6">
            <TownSigns items={core.map((t) => ({ name: t.name, href: t.path }))} />
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
