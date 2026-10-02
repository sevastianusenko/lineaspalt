import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { Breadcrumbs, FaqList, SectionHead, TownSigns } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { towns } from "@/content/towns";
import { abs, site } from "@/lib/site";
import { businessId } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Contact Lancaster Lines & Asphalt | Free Estimates, 717-808-1600" },
  description:
    "Call 717-808-1600 or send the form for a free estimate on line striping, sealcoating, crack filling or pothole repair in Lancaster County, PA.",
  alternates: { canonical: "/contact/" },
};

const faqs = [
  { q: "Do you work with both residential and commercial clients?", a: "Yes. We handle everything from small driveways to large parking lots and commercial facilities." },
  { q: "When is the best time to schedule work?", a: "Spring through early fall gives the best conditions. We work as long as temperatures are above about 50 degrees F and the surface is dry." },
  { q: "Do I need to prepare anything before your crew arrives?", a: "Please clear vehicles and debris from the work area. We handle surface cleaning and prep before beginning." },
  { q: "Are you insured?", a: "Yes. We are fully insured for residential and commercial projects." },
  { q: "How long does a typical job take?", a: "Most residential projects take one day. Larger commercial jobs may take one to three days, depending on size and weather." },
  { q: "How soon can I drive on the surface after sealcoating?", a: "Typically 24 to 48 hours, depending on weather. We tell you the exact time when we finish." },
];

export default function Contact() {
  const core = towns.filter((t) => t.tier === "core");
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact/" }]} />
      <section className="sec-deep grain">
        <div className="wrap grid gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <p className="tag rise">Contact us today</p>
            <h1 className="rise mt-4 text-[clamp(50px,8vw,110px)]" style={{ animationDelay: "80ms" }}>Free estimates. Fast reply.</h1>
            <p className="rise mt-6 max-w-lg text-[20px] text-asphalt-300" style={{ animationDelay: "160ms" }}>
              Sealcoating, crack filling, striping and pothole repair. Tell us what you see. We reply within one business day.
            </p>
            <ul className="rise mt-10 grid gap-6" style={{ animationDelay: "240ms" }}>
              <li>
                <span className="stencil text-[14px] tracking-[0.16em] text-paint">Call</span>
                <a href={`tel:${site.phoneTel}`} className="block font-display text-[clamp(44px,6vw,68px)] font-extrabold leading-none tracking-[0.02em] hover:text-paint">{site.phone}</a>
              </li>
              <li>
                <span className="stencil text-[14px] tracking-[0.16em] text-paint">Email</span>
                <a href={`mailto:${site.email}`} className="block text-[22px] hover:text-paint">{site.email}</a>
              </li>
              <li>
                <span className="stencil text-[14px] tracking-[0.16em] text-paint">Service area</span>
                <span className="block text-[20px]">{site.region}, and about 40 miles around</span>
              </li>
              <li>
                <span className="stencil text-[14px] tracking-[0.16em] text-paint">Hours</span>
                <dl className="mt-1 grid max-w-xs grid-cols-[auto_1fr] gap-x-6 text-[18px]">
                  {site.hours.map((h) => (
                    <div key={h.days} className="contents"><dt className="text-asphalt-300">{h.days}</dt><dd>{h.open} to {h.close}</dd></div>
                  ))}
                </dl>
              </li>
            </ul>
          </div>
          <div className="rise chamfer bg-asphalt-800 p-6 sm:p-9" style={{ animationDelay: "200ms" }}>
            <h2 className="text-[40px]">Send us a message</h2>
            <p className="mb-6 mt-2 text-[17px] text-asphalt-300">Have a question or need a quote? Fill out the form and we will get back to you.</p>
            <LeadForm />
          </div>
        </div>
        <div className="double-line" aria-hidden />
      </section>

      <section className="sec-light grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="Areas we serve" title={<>Lancaster County <span className="text-[#8a5c00]">and 40 miles around.</span></>} lead="We provide asphalt maintenance, sealcoating, line striping and pothole repair across Lancaster County and the communities around it." />
          <div className="reveal mt-10"><TownSigns items={core.map((t) => ({ name: t.name, href: t.path }))} /></div>
        </div>
      </section>

      <section className="sec-deep grain py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead tag="Before you call" title={<>More useful <span className="text-paint">information.</span></>} />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: abs("/contact/"),
          name: "Contact Lancaster Lines & Asphalt",
          about: { "@id": businessId },
        }}
      />
    </>
  );
}
