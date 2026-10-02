import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, FaqList, Icon, PageHero, Photo, SectionHead } from "@/components/ui";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: { absolute: "Asphalt & Striping Prices in Lancaster, PA | Lines & Asphalt" },
  description:
    "What sealcoating, line striping, crack filling and pothole repair cost in Lancaster County, PA. Real price ranges, our $400 minimum and what moves the number.",
  alternates: { canonical: "/pricing/" },
};

const faqs = [
  { q: "Why is your minimum job $400?", a: "The crew, truck, equipment and material cost nearly the same for a small job as a large one. Below $400 the only way to make the job work is to cut something, such as coats, prep or material quality. The $400 floor protects the quality of the work." },
  { q: "Are these prices final?", a: "No. They are the ranges we use to plan jobs. The final price is a written quote after we look at your property or photos of it." },
  { q: "Do you charge for estimates?", a: "No. Estimates are free and there is no obligation." },
  { q: "Can I save money by bundling services?", a: "Yes. Mobilizing the crew and equipment is a fixed cost, so crack filling, sealcoating and striping done in one visit costs less than three separate visits." },
  { q: "Why not just pick the cheapest quote?", a: "Very low quotes usually mean thin sealer, one coat instead of two, skipped prep, or no insurance. A job that fails in a year costs more than a job done right. Our blog posts on cost explain the red flags." },
  { q: "Do you take payment after the work?", a: "We agree payment terms in the written quote. Ask us when you request the estimate." },
];

export default function Pricing() {
  const priced = services.filter((s) => s.price.rows.length > 2);
  return (
    <>
      <Breadcrumbs items={[{ name: "Pricing", href: "/pricing/" }]} />
      <PageHero
        eyebrow="Straight talk on price"
        title={<>What asphalt work costs in <mark className="hl">Lancaster County</mark></>}
        lead="Lancaster Lines & Asphalt publishes its price ranges because most people do not get a straight answer. Use them to plan, then ask for a written quote when you are ready."
        image="driveway-sealcoat-glossy-wet"
      >
        <Link href="/contact/" className="btn btn-yellow">Get a written quote</Link>
      </PageHero>

      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="reveal photo aspect-[4/3]"><Photo slug="driveway-sealcoat-orange-cones" /></div>
          <div>
            <p className="eyebrow reveal">The $400 minimum</p>
            <h2 className="reveal mt-4 text-[clamp(28px,3.4vw,40px)]">Why we have a floor</h2>
            <div className="mt-6 space-y-5 text-[17px] text-[#333]">
              <p className="reveal">Every job starts the same way. The crew loads the equipment, drives to your property, sets up, prepares the surface, does the work and cleans up. A small driveway takes a few hours of that, just like a larger one does.</p>
              <p className="reveal">When someone offers to do it for $99, something is missing. Usually it is sealer thickness, the second coat, prep, or insurance. We would rather tell you plainly that the minimum is $400 and make it worth it.</p>
              <p className="reveal">If your job is small, ask about bundling. Filling cracks, sealing and re-striping in a single visit spreads the same trip over more work.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow="By service" title="Lancaster Lines & Asphalt ranges, service by service" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {priced.map((s) => (
              <div key={s.slug} className="card card-flat reveal p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <Icon name={s.icon} size={56} />
                  <h3 className="text-[24px]">
                    <Link href={`/${s.slug}/`} className="hover:underline">{s.name}</Link>
                  </h3>
                </div>
                <dl className="mt-5">
                  {s.price.rows.map(([k, v]) => (
                    <div key={k} className="grid gap-1 border-t border-border py-3 sm:grid-cols-[1.2fr_1fr] sm:gap-4">
                      <dt className="text-[15px] text-muted">{k}</dt>
                      <dd className="font-display text-[18px] font-bold text-black sm:text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="What moves the number" title="Why quotes differ" />
          <ul className="grid gap-5 sm:grid-cols-2">
            {[
              ["Size and shape", "More square feet or linear feet means more material and time. Tight, irregular spaces take longer than open ones."],
              ["Condition", "Cracks, oil spots, weeds and soft base all add prep or repair before the main work."],
              ["Access", "Steep drives, tight turns and limited access slow equipment down."],
              ["Timing", "Early morning, night and weekend schedules for businesses can change the plan."],
              ["Bundling", "Doing several services in one visit lowers the cost of each."],
              ["Materials", "Cheaper sealer and thinner coats look fine for six weeks and fail by the next winter."],
            ].map(([t, d]) => (
              <li key={t} className="reveal card card-flat p-6">
                <span className="block h-2 w-10 bg-yellow" aria-hidden />
                <span className="mt-3 block font-display text-[20px] font-bold text-black">{t}</span>
                <span className="mt-1 block text-[15px] text-muted">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-black py-20 lg:py-28">
        <div className="wrap">
          <p className="eyebrow reveal">Read the details</p>
          <h2 className="reveal mt-4 max-w-3xl text-[clamp(30px,3.6vw,44px)]">The long answers, in plain English</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["/sealcoating-cost-lancaster-pa/", "How much does sealcoating cost in Lancaster, PA?"],
              ["/parking-lot-striping-cost/", "Parking lot striping cost: what businesses actually pay"],
              ["/crack-filling-cost-lancaster-county/", "Crack filling cost in Lancaster County"],
              ["/pothole-repair-cost-lancaster-pa/", "Pothole repair cost: what you will pay and why"],
            ].map(([href, t]) => (
              <li key={href} className="reveal">
                <Link href={href} className="group flex items-center justify-between gap-4 border-t border-white/15 py-5 font-display text-[20px] font-bold text-white hover:text-yellow">
                  {t}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform group-hover:translate-x-2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Pricing FAQ" title="Common questions" />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand title="Get your exact number." text="Send the address and a couple of photos. We will price it in writing, free." />
    </>
  );
}
