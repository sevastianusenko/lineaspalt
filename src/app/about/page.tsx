import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, LeadSection, PageHero, Photo, ReviewCard, SectionHead } from "@/components/ui";
import { reviews } from "@/content/reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Lancaster Lines & Asphalt | Locally Owned Pavement Crew" },
  description:
    "Locally owned asphalt maintenance and line striping company serving homeowners, businesses and property managers across Lancaster County, PA.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", href: "/about/" }]} />
      <PageHero
        kicker="About us"
        title="A local crew that shows up and does it right"
        lead="Lancaster Lines & Asphalt maintains and marks pavement for homeowners, businesses, churches, schools and property managers across Lancaster County."
        image="driveway-sealcoat-orange-cones"
      >
        <div className="flex flex-wrap gap-4">
          <Link href="/contact/" className="btn btn-paint">Free quote</Link>
          <Link href="/gallery/" className="btn btn-ghost">See our work</Link>
        </div>
      </PageHero>

      <section className="sec-dark grain py-16 lg:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="tag reveal">Who we are</p>
            <h2 className="reveal mt-4 text-[clamp(38px,5vw,64px)]">Locally owned. Owner on the job.</h2>
          </div>
          <div className="space-y-6 text-[19px] leading-[1.75] text-[#d9d9d4]">
            <p className="reveal text-[22px] text-line">
              Lancaster Lines &amp; Asphalt is a trusted asphalt maintenance company based in Lancaster County, serving local businesses, property managers and homeowners across South Central Pennsylvania.
            </p>
            <p className="reveal">
              We specialize in line striping, sealcoating, crack filling and pothole repair. The goal is simple: make surfaces safer, cleaner and longer lasting, with results you can see from the street.
            </p>
            <p className="reveal">
              Our reviews keep naming {site.owner}, the owner, because he is the person who answers the phone, looks at your property, writes the quote and runs the crew. That is on purpose. When the person who quotes the job also does it, there is nobody to pass the blame to and nobody who forgot what was promised.
            </p>
          </div>
        </div>
      </section>

      <section className="sec-light grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="How we work" title={<>Four things <span className="text-[#8a5c00]">we hold to.</span></>} />
          <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
            {[
              ["We show up", "On the day we said, at the time we said. If the weather will ruin the job, we call and reschedule instead of doing it wrong."],
              ["The price is in writing", "You get a clear quote before work starts, and the invoice matches it. Our minimum is $400 and we tell you why."],
              ["We tell you when not to", "If sealcoating will not help, if new asphalt needs a year to cure, or if a patch will not hold, we say so, even when it costs us the job."],
              ["We clean up", "Cones, tape and equipment go with us. We walk the finished job with you before we leave."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal grid grid-cols-[64px_1fr] gap-4 border-t-[3px] border-ink/80 py-6">
                <span className="stencil text-[44px] leading-none">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-[30px] font-extrabold uppercase leading-none">{t}</span>
                  <span className="mt-2 block text-[17px] text-[#2b2e31]">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-deep grain py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="tag">Commercial</p>
            <h2 className="mt-4 text-[clamp(38px,5vw,64px)]">For businesses and property managers</h2>
            <p className="mt-5 text-[18px] text-[#d9d9d4]">
              We partner with businesses, property managers, churches, schools and HOAs for parking lot striping, ADA-compliant markings, fire lane painting and ongoing upkeep. Safety, compliance and a clean first impression, scheduled around your hours.
            </p>
            <Link href="/parking-lot-striping-lancaster-pa/" className="btn btn-paint mt-7">Commercial striping</Link>
            <div className="stall mt-10 aspect-[4/3] overflow-hidden bg-asphalt-700">
              <Photo slug="retail-lot-restriped-blue-ada" small className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="reveal lg:mt-24">
            <p className="tag">Residential</p>
            <h2 className="mt-4 text-[clamp(38px,5vw,64px)]">For homeowners</h2>
            <p className="mt-5 text-[18px] text-[#d9d9d4]">
              Driveway sealcoating, crack filling and patching that protect your surface from weather damage and improve curb appeal. We work with precision and respect for your property, every step of the way.
            </p>
            <Link href="/driveway-sealcoating-lancaster-pa/" className="btn btn-paint mt-7">Driveway sealcoating</Link>
            <div className="stall-r mt-10 aspect-[4/3] overflow-hidden bg-asphalt-700">
              <Photo slug="driveway-sealcoat-fall-tree" small className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="sec-dark grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="Reviews" title={<>5.0 on Google, <span className="text-paint">{site.rating.count} reviews.</span></>} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.name} className="reveal"><ReviewCard r={r} /></div>
            ))}
          </div>
        </div>
      </section>

      <LeadSection />
    </>
  );
}
