import type { Metadata } from "next";
import Link from "next/link";
import { Photo, SectionHead, ReviewCard, Stars, PostCard, LeadSection, TownSigns, FaqList } from "@/components/ui";
import PriceCalc from "@/components/PriceCalc";
import { services, bySlug } from "@/content/services";
import { towns } from "@/content/towns";
import { reviews } from "@/content/reviews";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { allImages } from "@/lib/images";

export const metadata: Metadata = {
  title: { absolute: "Line Striping & Asphalt Maintenance in Lancaster, PA" },
  description:
    "Line striping, sealcoating, crack filling and pothole repair in Lancaster, PA. Locally owned, 5.0 on Google. Free estimates: 717-808-1600.",
  alternates: { canonical: "/" },
};

const marquee = ["Line striping", "Sealcoating", "Crack filling", "Pothole repair", "ADA markings", "Fire lanes", "Parking lots", "Driveways"];

const rows = [
  { slug: "line-striping-service-lancaster-pa", n: "01", name: "Line striping", copy: "Stalls, arrows, stencils, fire lanes and ADA markings for lots and floors.", photo: "retail-lot-fresh-yellow-stripes" },
  { slug: "sealcoating-lancaster-pa", n: "02", name: "Sealcoating", copy: "Two coats, hand-cut edges and real prep, for driveways and commercial lots.", photo: "driveway-sealcoat-orange-cones" },
  { slug: "crack-filling-lancaster-pa", n: "03", name: "Crack filling", copy: "Hot rubber sealant that stays flexible, so water stays out all winter.", photo: "hot-pour-crack-sealing-melter" },
  { slug: "pothole-repair-lancaster-pa", n: "04", name: "Pothole repair", copy: "Square cut, base checked, hot mix compacted in lifts. Repairs that stay put.", photo: "private-lane-fresh-asphalt" },
  { slug: "ada-parking-lot-striping-lancaster-pa", n: "05", name: "ADA and fire lanes", copy: "Accessible stalls, aisles and curbs measured against the standard before we paint.", photo: "ada-stall-white-outline-brick-building" },
];

const work = [
  { slug: "warehouse-floor-line-marking-yellow-red", span: "col-span-2 row-span-2" },
  { slug: "driveway-sealcoat-fall-tree", span: "" },
  { slug: "ada-blue-symbol-night-striping", span: "" },
  { slug: "retail-lot-yellow-stalls-ada-curb", span: "" },
  { slug: "hot-pour-crack-sealing-crew", span: "" },
  { slug: "driveway-sealcoat-glossy-wet", span: "" },
  { slug: "reserved-stencil-night", span: "" },
  { slug: "church-lot-ada-hatched-stalls", span: "" },
  { slug: "lot-arrows-white-center-line", span: "" },
];

const homeFaqs = [
  { q: "What is your minimum job?", a: "$400. Crew, equipment and travel cost the same for a small job as a large one. If your job is small, ask about bundling services into one visit." },
  { q: "How much does a driveway sealcoat cost?", a: "Most driveways run $400 to $700, depending on size and condition. Crack filling is priced separately when needed. You get a written price after we see or measure the driveway." },
  { q: "Do you work on commercial and residential properties?", a: "Both. We do driveways for homeowners and parking lots, warehouse floors and fire lanes for businesses, churches, schools, HOAs and property managers." },
  { q: "How far do you travel?", a: "About 40 miles from Lancaster. That covers the whole county and parts of Lebanon, Berks and York counties for larger commercial jobs." },
  { q: "Are you insured?", a: "Yes. We are fully insured for residential and commercial work." },
  { q: "When is the best time to sealcoat or stripe?", a: "Late spring through early fall, whenever the surface is above about 50 degrees F and dry. Crack filling is best in fall, before winter." },
];

export default function Home() {
  const posts = getPosts().slice(0, 3);
  const core = towns.filter((t) => t.tier === "core");
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="sec-deep grain relative overflow-hidden">
        <div className="wrap grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24 lg:pt-16">
          <div className="relative z-10">
            <p className="tag rise">Locally owned &middot; {site.region}</p>
            <h1 className="rise mt-5 text-[clamp(54px,6.9vw,102px)] leading-[0.92]" style={{ animationDelay: "90ms" }}>
              Straight lines.
              <br />
              <span className="text-paint">Sealed</span> surfaces.
            </h1>
            <p className="rise mt-7 max-w-xl text-[clamp(18px,2vw,22px)] text-asphalt-300" style={{ animationDelay: "180ms" }}>
              Line striping, sealcoating, crack filling and pothole repair for homes and businesses within 40 miles of Lancaster, PA. Clean work, honest prices, and a crew that shows up.
            </p>
            <div className="rise mt-9 flex flex-wrap gap-4" style={{ animationDelay: "260ms" }}>
              <Link href="/contact/" className="btn btn-paint">Free quote</Link>
              <a href={`tel:${site.phoneTel}`} className="btn btn-ghost">Call {site.phone}</a>
            </div>
            <dl className="rise mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t-2 border-white/15 pt-6 sm:grid-cols-3" style={{ animationDelay: "340ms" }}>
              <div>
                <dt className="flex items-center gap-2"><Stars /></dt>
                <dd className="mt-1 font-display text-[26px] font-bold uppercase leading-none tracking-wide">5.0 on Google</dd>
                <dd className="text-[14px] text-asphalt-300">{site.rating.count} reviews</dd>
              </div>
              <div>
                <dt className="stencil text-[14px] tracking-[0.16em] text-paint">Estimates</dt>
                <dd className="mt-1 font-display text-[26px] font-bold uppercase leading-none tracking-wide">Free</dd>
                <dd className="text-[14px] text-asphalt-300">Written price</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="stencil text-[14px] tracking-[0.16em] text-paint">Coverage</dt>
                <dd className="mt-1 font-display text-[26px] font-bold uppercase leading-none tracking-wide">Fully insured</dd>
                <dd className="text-[14px] text-asphalt-300">Homes and businesses</dd>
              </div>
            </dl>
          </div>

          <div className="relative h-[420px] sm:h-[520px] lg:h-[640px]" aria-hidden={false}>
            <div className="trio">
              {[
                { s: "warehouse-floor-line-marking-yellow-red", d: 150 },
                { s: "retail-lot-yellow-stalls-ada-curb", d: 280 },
                { s: "driveway-sealcoat-glossy-wet", d: 410 },
              ].map((p) => (
                <div key={p.s} className="stall-p rise" style={{ animationDelay: `${p.d}ms` }}>
                  <Photo slug={p.s} priority className="" />
                </div>
              ))}
            </div>
            {/* painted center line that draws on load */}
            <div className="dash-line dash-grow pointer-events-none absolute -bottom-3 left-[-4%] w-[108%]" aria-hidden />
          </div>
        </div>
        <div className="double-line" aria-hidden />
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <section className="sec-yellow overflow-hidden py-4" aria-label="Services at a glance">
        <div className="marquee" aria-hidden>
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center font-display text-[30px] font-extrabold uppercase tracking-[0.06em] sm:text-[38px]">
              {m}
              <span className="mx-6 inline-block h-[10px] w-[44px] bg-black sm:mx-8" />
            </span>
          ))}
        </div>
        <p className="sr-only">Line striping, sealcoating, crack filling, pothole repair, ADA markings, fire lanes.</p>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="sec-dark grain py-20 lg:py-28">
        <div className="wrap">
          <SectionHead tag="What we do" title={<>Five jobs. <span className="text-paint">Done in the right order.</span></>} lead="Most pavement problems are solved by doing the same few things well: fill the cracks, fix the holes, seal the surface, paint the lines. One crew handles all of it." />
          <ul className="mt-14 border-t-2 border-white/15">
            {rows.map((r) => {
              const s = bySlug(r.slug)!;
              return (
                <li key={r.slug} className="reveal group relative border-b-2 border-white/15">
                  <Link href={`/${r.slug}/`} className="grid items-center gap-6 py-8 sm:grid-cols-[90px_1fr_240px] lg:grid-cols-[120px_1fr_300px] lg:py-10" aria-label={s.name}>
                    <span className="stencil text-[clamp(44px,6vw,84px)] leading-none text-paint/90 transition-colors group-hover:text-paint-hot">{r.n}</span>
                    <span>
                      <span className="block font-display text-[clamp(38px,5.2vw,68px)] font-extrabold uppercase leading-[0.95] transition-colors group-hover:text-paint">{r.name}</span>
                      <span className="mt-3 block max-w-xl text-[18px] text-asphalt-300">{r.copy}</span>
                      <span className="mt-4 inline-flex items-center gap-3 font-display text-[19px] font-bold uppercase tracking-[0.08em] text-paint">
                        See details
                        <svg width="30" height="14" viewBox="0 0 30 14" fill="currentColor" className="transition-transform group-hover:translate-x-2" aria-hidden><path d="M0 5h22V0l8 7-8 7V9H0z" /></svg>
                      </span>
                    </span>
                    <span className="stall-r relative hidden aspect-[3/2] overflow-hidden bg-asphalt-700 sm:block">
                      <Photo slug={r.photo} small className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="reveal mt-8 text-[18px] text-asphalt-300">
            Also: <Link href="/fire-lane-marking-lancaster-pa/" className="text-paint underline underline-offset-4">fire lane marking</Link>,{" "}
            <Link href="/warehouse-floor-line-marking-lancaster-pa/" className="text-paint underline underline-offset-4">warehouse floor marking</Link>,{" "}
            <Link href="/driveway-sealcoating-lancaster-pa/" className="text-paint underline underline-offset-4">driveway sealcoating</Link> and{" "}
            <Link href="/parking-lot-maintenance-lancaster-pa/" className="text-paint underline underline-offset-4">parking lot maintenance plans</Link>.{" "}
            <Link href="/services/" className="text-paint underline underline-offset-4">View all {services.length} services</Link>.
          </p>
        </div>
      </section>

      {/* ---------------- FULL-BLEED PRICE TALK ---------------- */}
      <section className="relative isolate overflow-hidden">
        <Photo slug="driveway-sealcoat-autumn-garage" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/80 to-black/30" />
        <div className="wrap py-24 lg:py-36">
          <p className="tag reveal">No guessing</p>
          <h2 className="reveal mt-4 max-w-4xl text-[clamp(48px,8vw,116px)]">
            You get the price <span className="text-paint">in writing</span> before we touch the surface.
          </h2>
          <div className="mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {[
              ["$400", "Our minimum job. Crew, equipment and travel cost the same on a small job."],
              ["$400 to $700", "What most residential driveways cost to sealcoat in Lancaster County."],
              ["$4 to $6", "Per stall to re-stripe a lot over existing lines. New layouts run $8 to $12."],
            ].map(([big, small]) => (
              <div key={big} className="reveal border-t-[6px] border-paint pt-4">
                <p className="font-display whitespace-nowrap text-[clamp(38px,3.8vw,50px)] font-extrabold leading-none text-paint">{big}</p>
                <p className="mt-3 text-[17px] text-line/85">{small}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing/" className="btn btn-paint reveal mt-12">See the full pricing guide</Link>
        </div>
      </section>

      {/* ---------------- WORK ---------------- */}
      <section className="sec-deep grain py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead tag="Recent work" title={<>Real jobs. <span className="text-paint">Real Lancaster County lots.</span></>} />
            <Link href="/gallery/" className="btn btn-ghost reveal">See all {allImages().length} photos</Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-[repeat(3,minmax(0,260px))]">
            {work.map((w, i) => (
              <Link key={w.slug} href="/gallery/" className={`reveal group relative block overflow-hidden bg-asphalt-800 ${w.span} ${i === 0 ? "aspect-[4/5] md:aspect-auto" : "aspect-[4/5] md:aspect-auto"}`} style={{ transitionDelay: `${i * 50}ms` }}>
                <Photo slug={w.slug} small={i !== 0} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 h-[6px] origin-left scale-x-0 bg-paint transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="sec-light grain py-20 lg:py-28">
        <div className="wrap">
          <SectionHead tag="How it works" title={<>Three steps. <span className="text-[#8a5c00]">No runaround.</span></>} />
          <ol className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-0">
            {[
              ["Call or send the form", "Tell us where the property is and what you see. Photos are welcome. We reply within one business day."],
              ["We look and quote", "We visit the property or review your photos, measure, and give you a clear written price. No obligation."],
              ["The crew shows up", "On time, in order: fill, patch, seal, stripe. We clean up and walk the job with you at the end."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal relative lg:px-8 lg:first:pl-0 lg:last:pr-0" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="flex items-center gap-4">
                  <span className="stencil text-[88px] leading-none text-ink">{String(i + 1).padStart(2, "0")}</span>
                  {i < 2 && (
                    <svg className="hidden flex-1 lg:block" height="22" viewBox="0 0 300 22" preserveAspectRatio="none" aria-hidden>
                      <path d="M0 11 H270" stroke="#0e1012" strokeWidth="6" strokeDasharray="30 18" fill="none" />
                      <path d="M268 0 L298 11 L268 22Z" fill="#0e1012" />
                    </svg>
                  )}
                </div>
                <h3 className="mt-4 text-[38px]">{t}</h3>
                <p className="mt-3 max-w-sm text-[18px] text-[#2b2e31]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <section className="sec-dark grain py-20 lg:py-28">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="tag reveal">Customer reviews</p>
              <p className="reveal mt-4 font-display text-[clamp(110px,16vw,210px)] font-extrabold leading-[0.8] text-paint">5.0</p>
              <Stars className="reveal mt-4 scale-125 origin-left" />
              <p className="reveal mt-4 text-[19px] text-asphalt-300">Based on {site.rating.count} Google reviews. Every one comes from a real job in Lancaster County.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {reviews.slice(0, 5).map((r, i) => (
                <div key={r.name} className={`reveal h-full ${i === 0 ? "sm:col-span-2" : ""}`} style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
                  <ReviewCard r={r} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CALC ---------------- */}
      <section className="sec-deep grain py-20 lg:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead tag="Plan your budget" title={<>Know the <span className="text-paint">ballpark</span> before you call.</>} lead="Pick a service, enter the size, and see the range we typically charge in Lancaster County. It is built from the same numbers we use on real quotes." />
            <p className="reveal mt-6 text-[17px] text-asphalt-300">
              Want to know why we price the way we do? Read{" "}
              <Link href="/sealcoating-cost-lancaster-pa/" className="text-paint underline underline-offset-4">what sealcoating really costs</Link> and{" "}
              <Link href="/parking-lot-striping-cost/" className="text-paint underline underline-offset-4">what lots pay for striping</Link>.
            </p>
          </div>
          <div className="reveal"><PriceCalc /></div>
        </div>
      </section>

      {/* ---------------- AREAS ---------------- */}
      <section className="sec-light grain py-20 lg:py-28">
        <div className="wrap">
          <SectionHead tag="Service area" title={<>Within <span className="text-[#8a5c00]">40 miles</span> of Lancaster.</>} lead="Pick your town for local details, or call and we will tell you if we cover you." />
          <div className="reveal mt-10">
            <TownSigns items={core.map((t) => ({ name: t.name, href: t.path }))} />
          </div>
          <p className="reveal mt-8 text-[18px]">
            Larger commercial jobs in{" "}
            {towns.filter((t) => t.tier === "extended").map((t, i, a) => (
              <span key={t.slug}>
                <Link href={t.path} className="font-semibold underline underline-offset-4">{t.name}</Link>
                {i < a.length - 2 ? ", " : i === a.length - 2 ? " and " : ""}
              </span>
            ))}{" "}
            are welcome too. <Link href="/service-areas/" className="font-semibold underline underline-offset-4">See every service area</Link>.
          </p>
        </div>
      </section>

      {/* ---------------- BLOG ---------------- */}
      <section className="sec-dark grain py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead tag="From the blog" title={<>Straight answers <span className="text-paint">about asphalt.</span></>} />
            <Link href="/blog/" className="btn btn-ghost reveal">All articles</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p, i) => (
              <div key={p.slug} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}><PostCard p={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="sec-deep grain py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead tag="Questions" title={<>Quick <span className="text-paint">answers.</span></>} />
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      <LeadSection />
    </>
  );
}
