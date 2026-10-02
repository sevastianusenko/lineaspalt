import type { Metadata } from "next";
import Link from "next/link";
import PriceCalc from "@/components/PriceCalc";
import { Breadcrumbs, CtaBand, FaqList, PageHero, SectionHead } from "@/components/ui";
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
        kicker="Straight talk on price"
        title="What asphalt work costs in Lancaster County"
        lead="We publish our ranges because most people do not get a straight answer. Use the quick check below, then ask for a written quote when you are ready."
        image="driveway-sealcoat-glossy-wet"
      >
        <Link href="/contact/" className="btn btn-paint">Get a written quote</Link>
      </PageHero>

      <section className="sec-dark grain py-16 lg:py-24">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <PriceCalc />
          <div>
            <p className="tag reveal">The $400 minimum</p>
            <h2 className="reveal mt-4 text-[clamp(38px,5vw,64px)]">Why we have a floor.</h2>
            <div className="mt-6 space-y-5 text-[18px] text-[#d9d9d4]">
              <p className="reveal">Every job starts the same way. The crew loads the equipment, drives to your property, sets up, prepares the surface, does the work and cleans up. A small driveway takes a few hours of that, just like a larger one does.</p>
              <p className="reveal">When someone offers to do it for $99, something is missing. Usually it is sealer thickness, the second coat, prep, or insurance. We would rather tell you plainly that the minimum is $400 and make it worth it.</p>
              <p className="reveal">If your job is small, ask about bundling. Filling cracks, sealing and re-striping in a single visit spreads the same trip over more work.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-light grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="By service" title={<>Typical ranges, <span className="text-[#8a5c00]">service by service.</span></>} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {priced.map((s) => (
              <div key={s.slug} className="reveal bg-ink p-6 text-line sm:p-8">
                <h3 className="text-[34px]">
                  <Link href={`/${s.slug}/`} className="hover:text-paint">{s.name}</Link>
                </h3>
                <dl className="mt-5">
                  {s.price.rows.map(([k, v]) => (
                    <div key={k} className="grid gap-1 border-t-2 border-white/12 py-3 sm:grid-cols-[1.2fr_1fr] sm:gap-4">
                      <dt className="text-[16px] text-asphalt-300">{k}</dt>
                      <dd className="font-display text-[24px] font-extrabold uppercase leading-tight tracking-wide text-paint sm:text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-deep grain py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead tag="What moves the number" title={<>Why quotes <span className="text-paint">differ.</span></>} />
          </div>
          <ul className="grid gap-5">
            {[
              ["Size and shape", "More square feet or linear feet means more material and time. Tight, irregular spaces take longer than open ones."],
              ["Condition", "Cracks, oil spots, weeds and soft base all add prep or repair before the main work."],
              ["Access", "Steep drives, tight turns and limited access slow equipment down."],
              ["Timing", "Early morning, night and weekend schedules for businesses can change the plan."],
              ["Bundling", "Doing several services in one visit lowers the cost of each."],
              ["Materials", "Cheaper sealer and thinner coats look fine for six weeks and fail by the next winter."],
            ].map(([t, d]) => (
              <li key={t} className="reveal grid grid-cols-[18px_1fr] gap-4">
                <span className="mt-3 h-[5px] w-[18px] bg-paint" aria-hidden />
                <span>
                  <span className="block font-display text-[28px] font-extrabold uppercase leading-none">{t}</span>
                  <span className="mt-1 block text-[17px] text-asphalt-300">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-yellow py-16 lg:py-24">
        <div className="wrap">
          <p className="tag reveal">Read the details</p>
          <h2 className="reveal mt-4 max-w-3xl text-[clamp(38px,5.5vw,70px)]">The long answers, in plain English.</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["/sealcoating-cost-lancaster-pa/", "How much does sealcoating cost in Lancaster, PA?"],
              ["/parking-lot-striping-cost/", "Parking lot striping cost: what businesses actually pay"],
              ["/crack-filling-cost-lancaster-county/", "Crack filling cost in Lancaster County"],
              ["/pothole-repair-cost-lancaster-pa/", "Pothole repair cost: what you will pay and why"],
            ].map(([href, t]) => (
              <li key={href} className="reveal">
                <Link href={href} className="group flex items-center justify-between gap-4 border-t-[4px] border-black py-4 font-display text-[28px] font-extrabold uppercase leading-tight hover:underline">
                  {t}
                  <svg width="30" height="14" viewBox="0 0 30 14" fill="currentColor" className="shrink-0 transition-transform group-hover:translate-x-2" aria-hidden><path d="M0 5h22V0l8 7-8 7V9H0z" /></svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-deep grain py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead tag="Pricing FAQ" title={<>Common <span className="text-paint">questions.</span></>} />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand title="Get your exact number." text="Send the address and a couple of photos. We will price it in writing, free." />
    </>
  );
}
