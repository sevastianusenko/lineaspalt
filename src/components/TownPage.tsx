import Link from "next/link";
import { Breadcrumbs, FaqList, LeadSection, PageHero, Photo, ReviewCard, SectionHead, Stars, TownSigns } from "./ui";
import JsonLd from "./JsonLd";
import { towns, townFaqs, type Town } from "@/content/towns";
import { reviews } from "@/content/reviews";
import { abs, site } from "@/lib/site";
import { businessId } from "@/lib/schema";

const seasons = [
  ["Spring", "Look and repair", "Walk the property after winter. Potholes and open cracks get fixed first, then sealcoating once temperatures are steady."],
  ["Summer", "Seal and stripe", "Warm, dry days are the best window for sealcoating and line striping. Commercial lots are scheduled around business hours."],
  ["Fall", "Fill the cracks", "A crack open going into November is a bigger problem by April. Hot pour filling before winter keeps water out."],
  ["Winter", "Stopgap repairs", "Cold patch can hold a dangerous hole together until hot mix is available again in spring."],
];

export default function TownPage({ t }: { t: Town }) {
  const faqs = townFaqs(t);
  const url = abs(t.path);
  const nearby = t.nearby.map((n) => {
    const m = towns.find((x) => x.name.toLowerCase() === n.toLowerCase());
    return { name: n, href: m?.path };
  });
  const svc = [
    { href: "/sealcoating-lancaster-pa/", name: "Sealcoating", d: `Protects ${t.name} driveways and lots from water, sun, salt and oil. Two coats and hand-cut edges.` },
    { href: "/crack-filling-lancaster-pa/", name: "Crack filling", d: "Hot rubber sealant before winter, so freeze and thaw has nothing to work on." },
    { href: "/pothole-repair-lancaster-pa/", name: "Pothole repair", d: "Square cut, base checked, hot mix compacted in lifts." },
    { href: "/parking-lot-striping-lancaster-pa/", name: "Parking lot striping", d: "New layouts and re-striping with ADA stalls, fire lanes, arrows and stencils." },
    { href: "/ada-parking-lot-striping-lancaster-pa/", name: "ADA markings", d: "Accessible stalls, access aisles and symbols measured to the standard." },
    { href: "/driveway-sealcoating-lancaster-pa/", name: "Driveway work", d: "Most driveways are $400 to $700, with a written price before we start." },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Service areas", href: "/service-areas/" }, { name: `${t.name}, PA`, href: t.path }]} />
      <PageHero
        kicker={t.tier === "core" ? `We work in ${t.name}, PA` : `Commercial work in ${t.name}, PA`}
        title={<>Sealcoating, striping &amp; repair in {t.name}, PA</>}
        lead={`Lancaster Lines & Asphalt serves ${t.name} and ${t.area}. Driveways, parking lots and floors, handled by one local crew.`}
        image={t.photo}
      >
        <div className="flex flex-wrap gap-4">
          <Link href="/contact/" className="btn btn-paint">Free estimate</Link>
          <a href={`tel:${site.phoneTel}`} className="btn btn-ghost">Call {site.phone}</a>
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[16px] text-asphalt-300">
          <span className="inline-flex items-center gap-2"><Stars /> 5.0 on Google</span>
          <span>Fully insured</span>
          <span>Free on-site estimates</span>
        </p>
      </PageHero>

      <section className="sec-dark grain py-16 lg:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="tag reveal">Your local crew</p>
            <h2 className="reveal mt-4 text-[clamp(38px,5vw,64px)]">Asphalt work in {t.name}.</h2>
          </div>
          <div className="space-y-6 text-[19px] leading-[1.75] text-[#d9d9d4]">
            {t.intro.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? "text-[22px] text-line" : ""}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-light grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="What we do" title={<>Services in <span className="text-[#8a5c00]">{t.name}.</span></>} />
          <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
            {svc.map((s, i) => (
              <li key={s.name} className="reveal border-t-[3px] border-ink/80">
                <Link href={s.href} className="group grid grid-cols-[64px_1fr] gap-4 py-6">
                  <span className="stencil text-[44px] leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-[30px] font-extrabold uppercase leading-none group-hover:text-[#8a5c00]">{s.name}</span>
                    <span className="mt-2 block text-[17px] text-[#2b2e31]">{s.d}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-deep grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="Who we work with" title={<>Properties we service in <span className="text-paint">{t.name}.</span></>} />
          <ul className="mt-12 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {t.props.map(([title, d]) => (
              <li key={title} className="reveal bg-asphalt-950 p-7">
                <h3 className="text-[30px] text-paint">{title}</h3>
                <p className="mt-3 text-[17px] text-asphalt-300">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-yellow py-16 lg:py-24">
        <div className="wrap">
          <p className="tag reveal">Year-round</p>
          <h2 className="reveal mt-4 max-w-3xl text-[clamp(40px,6vw,76px)]">What we do in {t.name} each season.</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {seasons.map(([s, h, d], i) => (
              <li key={s} className="reveal border-t-[6px] border-black pt-4" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="stencil text-[22px] tracking-[0.14em]">{s}</span>
                <h3 className="mt-1 text-[32px]">{h}</h3>
                <p className="mt-3 text-[17px] font-medium">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-dark grain py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="tag reveal">About the area</p>
            <h2 className="reveal mt-4 text-[clamp(38px,5vw,64px)]">Working in {t.name}, PA.</h2>
            <div className="mt-8 space-y-6 text-[18px] leading-[1.75] text-[#d9d9d4]">
              {t.about.map((p, i) => (
                <p key={i} className="reveal">{p}</p>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="stall relative aspect-[4/5] overflow-hidden bg-asphalt-700">
              <Photo slug={t.photo} small className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-10 text-[34px]">Also serving nearby</h3>
            <div className="mt-5"><TownSigns items={nearby} dim /></div>
          </div>
        </div>
      </section>

      <section className="sec-light grain py-16 lg:py-24">
        <div className="wrap">
          <SectionHead tag="Reviews" title={<>What customers <span className="text-[#8a5c00]">say.</span></>} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.slice(1, 4).map((r) => (
              <div key={r.name} className="reveal"><ReviewCard r={r} light /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-deep grain py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead tag={`${t.name}, PA`} title={<>Questions about <span className="text-paint">{t.name}.</span></>} />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <LeadSection title={`Free estimate in ${t.name}`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: `Asphalt sealcoating, striping and repair in ${t.name}, PA`,
          serviceType: "Asphalt maintenance and line striping",
          url,
          provider: { "@id": businessId },
          areaServed: { "@type": "City", name: `${t.name}, PA` },
        }}
      />
    </>
  );
}
