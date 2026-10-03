import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, LeadSection, PageHero, Photo, ReviewCard, SectionHead, Stars } from "@/components/ui";
import { featured } from "@/content/reviews";
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
        eyebrow="About us"
        title={<>About <mark className="hl">Lancaster Lines &amp; Asphalt</mark></>}
        lead="A trusted asphalt maintenance company based in Lancaster County, proudly serving local businesses, property managers and homeowners across South Central Pennsylvania."
        image="driveway-sealcoat-orange-cones"
      >
        <div className="flex flex-wrap gap-4">
          <Link href="/contact/" className="btn btn-yellow">Free quote</Link>
          <Link href="/gallery/" className="btn btn-outline">See our work</Link>
        </div>
      </PageHero>

      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow reveal">Who we are</p>
            <h2 className="reveal mt-4 text-[clamp(28px,3.4vw,40px)]">Locally owned. Owner on the job.</h2>
          </div>
          <div className="space-y-6 text-[18px] leading-[1.8] text-[#333]">
            <p className="reveal text-[20px] text-black">
              We specialize in line striping, sealcoating, crack filling and pothole repair, delivering durable, professional results that make your surfaces safer, cleaner and longer lasting.
            </p>
            <p className="reveal">
              Our reviews keep naming {site.owner}, the owner, because he is the person who answers the phone, looks at your property, writes the quote and runs the crew. That is on purpose. When the person who quotes the job also does it, there is nobody to pass the blame to and nobody who forgot what was promised.
            </p>
            <p className="reveal">
              We work within about 40 miles of Lancaster, on everything from a two-car driveway to a 200-space parking lot.
            </p>
          </div>
        </div>
      </section>

      <section className="sec py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow={`How ${site.name} works`} title="Four things we hold to" align="center" />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["We show up", "On the day we said, at the time we said. If the weather will ruin the job, we call and reschedule instead of doing it wrong."],
              ["The price is in writing", "You get a clear quote before work starts, and the invoice matches it. No surprises."],
              ["We tell you when not to", "If sealcoating will not help, if new asphalt needs a year to cure, or if a patch will not hold, we say so, even when it costs us the job."],
              ["We clean up", "Cones, tape and equipment go with us. We walk the finished job with you before we leave."],
            ].map(([t, d], i) => (
              <li key={t} className="card card-flat reveal p-7" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-yellow font-display text-[20px] font-bold text-black">{i + 1}</span>
                <h3 className="mt-5 text-[21px]">{t}</h3>
                <p className="mt-2 text-[15px] text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap">
          <SectionHead title="We deliver exceptional results for" align="center" />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="reveal card card-flat overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden"><Photo slug="retail-lot-restriped-blue-ada" className="h-full w-full object-cover" /></div>
              <div className="p-8">
                <h3 className="text-[26px]">Commercial</h3>
                <p className="mt-3 text-[16px] text-muted">
                  We partner with businesses, property managers, churches, schools and HOAs for parking lot striping, ADA-compliant markings, fire lane painting and regular upkeep. Safety, compliance and a polished first impression, scheduled around your hours.
                </p>
                <Link href="/parking-lot-striping-lancaster-pa/" className="btn btn-black mt-6">Get in touch</Link>
              </div>
            </div>
            <div className="reveal card card-flat overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden"><Photo slug="driveway-sealcoat-fall-tree" className="h-full w-full object-cover" /></div>
              <div className="p-8">
                <h3 className="text-[26px]">Residential</h3>
                <p className="mt-3 text-[16px] text-muted">
                  Homeowners across Lancaster trust us for reliable, affordable asphalt care. Driveway sealcoating, crack filling and patching that protect your surface from weather damage and improve curb appeal. We work with precision and respect for your property.
                </p>
                <Link href="/driveway-sealcoating-lancaster-pa/" className="btn btn-black mt-6">Get in touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow={`${site.name} on Google`} title={<>5.0 on Google, {site.rating.count} reviews</>} />
            <div className="reveal flex flex-wrap items-center gap-4"><Stars size={28} /><a href={site.gbp.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Leave a Google review</a></div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featured.slice(0, 3).map((r) => (
              <div key={r.name} className="reveal"><ReviewCard r={r} /></div>
            ))}
          </div>
        </div>
      </section>

      <LeadSection />
    </>
  );
}
