import type { Metadata } from "next";
import Link from "next/link";
import { Photo, SectionHead, ReviewCard, Stars, PostCard, LeadSection, TownChips, FaqList, Icon, GoogleBadge, ProjectCard } from "@/components/ui";
import PriceCalc from "@/components/PriceCalc";
import { services } from "@/content/services";
import { towns } from "@/content/towns";
import { featured } from "@/content/reviews";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";
import { allImages } from "@/lib/images";

export const metadata: Metadata = {
  title: { absolute: "Lancaster Lines & Asphalt | Line Striping & Sealcoating, Lancaster PA" },
  description:
    "Lancaster Lines & Asphalt: line striping, sealcoating, crack filling and pothole repair in Lancaster, PA. Locally owned, 5.0 on Google. Free estimates: 717-808-1600.",
  alternates: { canonical: "/" },
};

const core3 = [
  { icon: "striper", name: "Striping", copy: "Clean, accurate lines for parking lots, roads, fire lanes, ADA compliance and more.", href: "/line-striping-service-lancaster-pa/" },
  { icon: "coating", name: "Protection", copy: "Sealcoating, crack filling and surface coating to protect and extend pavement life.", href: "/sealcoating-lancaster-pa/" },
  { icon: "repair", name: "Repair", copy: "Pothole patching and surface restoration for damaged asphalt.", href: "/pothole-repair-lancaster-pa/" },
];

const homeFaqs = [
  { q: "What is your minimum job?", a: "$400. Crew, equipment and travel cost the same for a small job as a large one. If your job is small, ask about bundling services into one visit." },
  { q: "How much does a driveway sealcoat cost?", a: "Most driveways run $400 to $700, depending on size and condition. Crack filling is priced separately when needed. You get a written price after we see or measure the driveway." },
  { q: "Do you work on commercial and residential properties?", a: "Both. We do driveways for homeowners and parking lots, warehouse floors and fire lanes for businesses, churches, schools, HOAs and property managers." },
  { q: "How far do you travel?", a: "About 40 miles from Lancaster. That covers the whole county and parts of Lebanon, Berks and York counties for larger commercial jobs." },
  { q: "Are you insured?", a: "Yes. We are fully insured for residential and commercial work." },
  { q: "When is the best time to sealcoat or stripe?", a: "Late spring through early fall, whenever the surface is above about 50 degrees F and dry. Crack filling is best in fall, before winter." },
];

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function Home() {
  const posts = getPosts().slice(0, 6);
  const projects = getProjects().slice(0, 4);
  const core = towns.filter((t) => t.tier === "core");
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="sec relative overflow-hidden">
        <div className="wrap grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-24 lg:pt-16">
          <div>
            <p className="eyebrow rise">{site.name} &middot; Locally owned in {site.region}</p>
            <h1 className="rise mt-5 text-[clamp(36px,4.8vw,62px)]" style={{ animationDelay: "80ms" }}>
              Asphalt maintenance &amp; line striping experts in <mark className="hl">Lancaster, PA</mark>
            </h1>
            <p className="rise mt-6 max-w-xl text-[19px] text-muted" style={{ animationDelay: "160ms" }}>
              Lancaster Lines &amp; Asphalt provides professional sealcoating, crack filling, striping and pothole repair for residential and commercial clients within 40 miles of Lancaster.
            </p>
            <div className="rise mt-9 flex flex-wrap gap-4" style={{ animationDelay: "240ms" }}>
              <Link href="/contact/" className="btn btn-yellow">Free Quote <Arrow /></Link>
              <a href={`tel:${site.phoneTel}`} className="btn btn-outline">Call {site.phone}</a>
            </div>
            <dl className="rise mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-7" style={{ animationDelay: "320ms" }}>
              <div>
                <dt className="flex items-center gap-2"><Stars size={18} /></dt>
                <dd className="mt-1 font-display text-[17px] font-bold text-black"><a href={site.gbp.url} target="_blank" rel="noopener noreferrer" className="hover:underline">5.0 on Google</a></dd>
                <dd className="text-[14px] text-muted">{site.rating.count} reviews</dd>
              </div>
              <div>
                <dt className="text-[14px] text-muted">Estimates</dt>
                <dd className="mt-1 font-display text-[17px] font-bold text-black">Free, in writing</dd>
                <dd className="text-[14px] text-muted">Minimum job ${site.minJob}</dd>
              </div>
              <div>
                <dt className="text-[14px] text-muted">Coverage</dt>
                <dd className="mt-1 font-display text-[17px] font-bold text-black">Fully insured</dd>
                <dd className="text-[14px] text-muted">Homes and businesses</dd>
              </div>
            </dl>
          </div>

          {/* photo collage with rounded corners and the yellow circle, like the old site */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="rise photo aspect-square" style={{ animationDelay: "150ms" }}><Photo slug="warehouse-floor-line-marking-yellow-red" small priority /></div>
              <div className="rise photo aspect-square" style={{ animationDelay: "230ms" }}><Photo slug="retail-lot-yellow-stalls-ada-curb" small priority /></div>
              <div className="rise photo hidden row-span-2 sm:block" style={{ animationDelay: "310ms" }}><Photo slug="hot-pour-crack-sealing-melter" priority /></div>
              <div className="rise photo col-span-2 aspect-[2/1.1]" style={{ animationDelay: "390ms" }}><Photo slug="driveway-sealcoat-glossy-wet" priority /></div>
            </div>
            <span aria-hidden className="pop absolute -bottom-10 -right-6 hidden h-[110px] w-[110px] rounded-full bg-yellow sm:block lg:-right-10" />
          </div>
        </div>
      </section>

      {/* ---------------- CORE SERVICES: black band, white cards overlapping ---------------- */}
      <section className="sec-black pt-16 lg:pt-20">
        <div className="wrap text-center">
          <p className="eyebrow reveal justify-center">{site.name}</p>
          <h2 className="reveal mt-4 text-[clamp(30px,3.6vw,44px)]">Our core services</h2>
          <p className="reveal mx-auto mt-4 max-w-2xl text-[18px] text-white/75">
            {site.name} provides complete asphalt care for both residential and commercial properties, including:
          </p>
        </div>
        <div className="wrap mt-12 grid gap-6 md:grid-cols-3 translate-y-16">
          {core3.map((c, i) => (
            <Link key={c.name} href={c.href} className="card reveal flex flex-col items-center p-10 text-center" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="icon-tile"><Icon name={c.icon} size={88} /></span>
              <h3 className="mt-4 text-[24px]">{c.name}</h3>
              <p className="mt-3 text-[16px] text-muted">{c.copy}</p>
              <span className="more mt-6">Learn more <Arrow /></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="sec pb-20 pt-32 lg:pb-24 lg:pt-36">
        <div className="wrap flex flex-wrap justify-center gap-4">
          <Link href="/services/" className="btn btn-black">View all {services.length} services</Link>
          <Link href="/contact/" className="btn btn-outline">Contact us now</Link>
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section className="sec pb-20 lg:pb-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Why choose us" title={<>Why choose <mark className="hl">Lancaster Lines &amp; Asphalt</mark></>} lead={`${site.name} is more than a service. We are your trusted pavement partner, delivering clean, durable results on every job, whether it is a small driveway or a large commercial lot.`} />
            <ul className="mt-8 grid gap-4">
              {["Trusted by homeowners and businesses", "Fast and reliable", "Quality guaranteed", "5-star reputation"].map((t) => (
                <li key={t} className="reveal flex items-center gap-4 font-display text-[18px] font-bold text-black">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-yellow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/about/" className="btn btn-outline reveal mt-9">About the company</Link>
          </div>
          <div className="reveal photo aspect-[4/3]">
            <Photo slug="driveway-sealcoat-fall-tree" />
          </div>
        </div>
      </section>

      {/* ---------------- SOLID WORK ---------------- */}
      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="reveal photo aspect-[4/3] lg:order-none">
            <Photo slug="warehouse-red-yellow-lines-close" />
          </div>
          <div>
            <SectionHead title={<>Solid work. <mark className="hl">Zero stress.</mark></>} />
            <div className="reveal mt-6 space-y-4 text-[18px] text-muted">
              <p>Tired of waiting, guessing, or calling companies that do not show up?</p>
              <p>At {site.name} we believe in showing up, finishing strong, and leaving your surface better than new.</p>
              <p className="font-display text-[18px] font-bold text-black">No confusion. No mess. No excuses.</p>
              <p>Just straight answers, clean work, and real results.</p>
            </div>
            <Link href="/contact/" className="btn btn-black reveal mt-8">Get started</Link>
          </div>
        </div>
      </section>

      {/* ---------------- HOW WE WORK ---------------- */}
      <section className="sec py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow={`Working with ${site.name} is easy`} title="How we work" align="center" />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["Get in touch", "Request a free estimate by phone or online. We will schedule a quick site visit or review photos."],
              ["Get a quote", "We provide a clear, no-obligation quote based on your project size, condition, and goals."],
              ["Get it done", "Our crew arrives on time, does clean professional work, and leaves your pavement looking new."],
            ].map(([t, d], i) => (
              <li key={t} className="card card-flat reveal p-10 text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-yellow font-display text-[24px] font-bold text-black">{i + 1}</span>
                <h3 className="mt-6 text-[24px]">{t}</h3>
                <p className="mt-3 text-[16px] text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Customer reviews" title={<>What customers say about {site.name}</>} align="center" />
          <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
            <div className="reveal card card-flat p-8 text-center lg:sticky lg:top-28">
              <p className="font-display text-[26px] font-bold text-black">EXCELLENT</p>
              <Stars className="mt-2 justify-center" size={28} />
              <p className="mt-3 text-[15px] text-muted">Based on <strong className="text-black">{site.rating.count} reviews</strong></p>
              <p className="mt-1 font-display text-[22px] font-bold text-black">Google</p>
              <a href={site.gbp.reviewsUrl} target="_blank" rel="noopener noreferrer" className="more mt-4 !text-[14px]">Read all reviews on Google</a>
              <a href={site.gbp.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm mt-4 w-full">Leave a review</a>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {featured.map((r, i) => (
                <div key={r.name} className="reveal" style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
                  <ReviewCard r={r} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section className="sec py-20 lg:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead eyebrow="Straight talk on price" title={<>You get the price <mark className="hl">in writing</mark> before we start.</>} lead={`Pick a service, enter the size, and see the range ${site.name} typically charges in Lancaster County. It is built from the same numbers we use on real quotes.`} />
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                ["$400", "Minimum job"],
                ["$400 to $700", "Most driveways, sealcoated"],
                ["$4 to $6", "Per stall to re-stripe"],
              ].map(([big, small]) => (
                <div key={big} className="reveal border-t-4 border-yellow pt-3">
                  <dt className="font-display text-[26px] font-bold text-black">{big}</dt>
                  <dd className="text-[15px] text-muted">{small}</dd>
                </div>
              ))}
            </dl>
            <Link href="/pricing/" className="more reveal mt-8">Full pricing guide <Arrow /></Link>
          </div>
          <div className="reveal"><PriceCalc /></div>
        </div>
      </section>

      {/* ---------------- WORK ---------------- */}
      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow={`${site.name} projects`} title="Our latest projects" lead="Real jobs with photos: what the property needed, how we did it and what the owner should expect afterward." />
            <div className="reveal flex flex-wrap gap-3">
              <Link href="/projects/" className="btn btn-outline">All projects</Link>
              <Link href="/gallery/" className="btn btn-outline">{allImages().length} photos</Link>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
              <div key={p.slug} className="reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}><ProjectCard p={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- AREAS ---------------- */}
      <section className="sec py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Service area" title={<>Within <mark className="hl">40 miles</mark> of Lancaster</>} lead={`${site.name} works across Lancaster County and the surrounding area. Pick your town for local details, or call and we will tell you if we cover you.`} />
          <div className="reveal mt-10">
            <TownChips items={core.map((t) => ({ name: t.name, href: t.path }))} />
          </div>
          <p className="reveal mt-8 text-[17px] text-muted">
            Larger commercial jobs in{" "}
            {towns.filter((t) => t.tier === "extended").map((t, i, a) => (
              <span key={t.slug}>
                <Link href={t.path} className="font-semibold text-black underline decoration-yellow decoration-[3px] underline-offset-4">{t.name}</Link>
                {i < a.length - 2 ? ", " : i === a.length - 2 ? " and " : ""}
              </span>
            ))}{" "}
            are welcome too. <Link href="/service-areas/" className="font-semibold text-black underline decoration-yellow decoration-[3px] underline-offset-4">See every service area</Link>.
          </p>
        </div>
      </section>

      {/* ---------------- BLOG ---------------- */}
      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow={`From the ${site.name} blog`} title="Straight answers about asphalt" />
            <Link href="/blog/" className="btn btn-outline reveal">All articles</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <div key={p.slug} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}><PostCard p={p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="sec py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead eyebrow="Questions" title={<>Quick answers from {site.short}</>} />
            <GoogleBadge className="reveal mt-8" />
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>

      <LeadSection />
    </>
  );
}
