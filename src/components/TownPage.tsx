import Link from "next/link";
import { Breadcrumbs, FaqList, Icon, LeadSection, PageHero, Photo, ProjectCard, ReviewCard, SectionHead, Stars, TownChips } from "./ui";
import JsonLd from "./JsonLd";
import { towns, townFaqs, type Town } from "@/content/towns";
import { featured } from "@/content/reviews";
import { projectsForTown } from "@/lib/projects";
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
  const projects = projectsForTown(t.slug);
  const url = abs(t.path);
  const nearby = t.nearby.map((n) => {
    const m = towns.find((x) => x.name.toLowerCase() === n.toLowerCase());
    return { name: n, href: m?.path };
  });
  const svc = [
    { href: "/sealcoating-lancaster-pa/", icon: "sealing", name: "Sealcoating & asphalt sealing", d: `Protects ${t.name} driveways and lots from water, sun, salt and oil. Two coats and hand-cut edges.` },
    { href: "/crack-filling-lancaster-pa/", icon: "crack", name: "Crack filling & sealing", d: "Hot rubber sealant before winter, so freeze and thaw has nothing to work on." },
    { href: "/pothole-repair-lancaster-pa/", icon: "repair", name: "Asphalt & pothole repair", d: "Square cut, base checked, hot mix compacted in lifts." },
    { href: "/parking-lot-striping-lancaster-pa/", icon: "striper", name: "Parking lot striping & line painting", d: "New layouts and re-striping with ADA stalls, fire lanes, arrows and stencils." },
    { href: "/ada-parking-lot-striping-lancaster-pa/", icon: "ada", name: "ADA markings", d: "Accessible stalls, access aisles and symbols measured to the standard." },
    { href: "/driveway-sealcoating-lancaster-pa/", icon: "coating", name: "Driveway sealing", d: "Two coats, hand-cut edges and a free written price before we start." },
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Service areas", href: "/service-areas/" }, { name: `${t.name}, PA`, href: t.path }]} />
      <PageHero
        eyebrow={t.tier === "core" ? `We work in ${t.name}, PA` : `Commercial work in ${t.name}, PA`}
        title={<>Sealcoating, striping &amp; repair in <mark className="hl">{t.name}, PA</mark></>}
        lead={`Lancaster Lines & Asphalt serves ${t.name} and ${t.area}. Driveways, parking lots and floors, handled by one local crew.`}
        image={t.photo}
      >
        <div className="flex flex-wrap gap-4">
          <Link href="/contact/" className="btn btn-yellow">Free estimate</Link>
          <a href={`tel:${site.phoneTel}`} className="btn btn-outline">Call {site.phone}</a>
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-muted">
          <span className="inline-flex items-center gap-2"><Stars size={16} /> 5.0 on Google</span>
          <span>Fully insured</span>
          <span>Free on-site estimates</span>
        </p>
      </PageHero>

      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow reveal">Your local crew</p>
            <h2 className="reveal mt-4 text-[clamp(28px,3.4vw,40px)]">{site.name} in {t.name}</h2>
          </div>
          <div className="space-y-6 text-[18px] leading-[1.8] text-[#333]">
            {t.intro.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? "text-[20px] text-black" : ""}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sec py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow={`What ${site.name} does`} title={<>Our services in <mark className="hl">{t.name}</mark></>} />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {svc.map((s, i) => (
              <li key={s.name} className="reveal" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
                <Link href={s.href} className="card flex h-full flex-col items-center p-8 text-center">
                  <span className="icon-tile"><Icon name={s.icon} size={80} /></span>
                  <span className="mt-3 block font-display text-[22px] font-bold text-black">{s.name}</span>
                  <span className="mt-2 block text-[15px] text-muted">{s.d}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Who we work with" title={<>Properties {site.short} services in {t.name}</>} />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.props.map(([title, d]) => (
              <li key={title} className="card card-flat reveal p-7">
                <h3 className="text-[21px]">{title}</h3>
                <p className="mt-2 text-[16px] text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec-black py-20 lg:py-28">
        <div className="wrap">
          <p className="eyebrow reveal">Year-round</p>
          <h2 className="reveal mt-4 max-w-3xl text-[clamp(30px,3.6vw,44px)]">What {site.name} does in {t.name} each season</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {seasons.map(([s, h, d], i) => (
              <li key={s} className="reveal border-t-4 border-yellow pt-5" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="font-display text-[15px] font-bold text-yellow">{s}</span>
                <h3 className="mt-1 text-[22px]">{h}</h3>
                <p className="mt-3 text-[16px] text-white/75">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="eyebrow reveal">About the area</p>
            <h2 className="reveal mt-4 text-[clamp(28px,3.4vw,40px)]">Working in {t.name}, PA</h2>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.8] text-[#333]">
              {t.about.map((p, i) => (
                <p key={i} className="reveal">{p}</p>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="photo aspect-[4/5]">
              <Photo slug={t.photo} small />
            </div>
            <h3 className="mt-10 text-[24px]">Also serving nearby</h3>
            <div className="mt-5"><TownChips items={nearby} /></div>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="sec-grey py-20 lg:py-28">
          <div className="wrap">
            <SectionHead eyebrow="Our work here" title={<>{site.short} projects in {t.name}</>} />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {projects.slice(0, 3).map((p) => (
                <div key={p.slug} className="reveal"><ProjectCard p={p} /></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec-grey py-20 lg:py-28">
        <div className="wrap">
          <SectionHead eyebrow={`${site.name} reviews`} title="What customers say" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featured.slice(0, 3).map((r) => (
              <div key={r.name} className="reveal"><ReviewCard r={r} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow={`${t.name}, PA`} title={<>Questions about {site.short} in {t.name}</>} />
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
