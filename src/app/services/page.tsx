import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, Icon, PageHero, SectionHead } from "@/components/ui";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: { absolute: "Asphalt & Line Striping Services in Lancaster, PA | Lines & Asphalt" },
  description:
    "Line striping, ADA and fire lane markings, sealcoating, crack filling and pothole repair in Lancaster County, PA. Free estimates: 717-808-1600.",
  alternates: { canonical: "/services/" },
};

const groups = [
  { key: "striping", title: "Pavement markings", eyebrow: "Paint the lines", text: "Layouts, re-striping, accessible stalls, fire lanes and floors." },
  { key: "protection", title: "Protect the surface", eyebrow: "Seal it", text: "Sealcoating, crack filling and planned maintenance that make pavement last." },
  { key: "repair", title: "Repair the damage", eyebrow: "Fix it", text: "Potholes and failed spots, repaired from the base up." },
] as const;

export default function Services() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }]} />
      <PageHero
        eyebrow="Featured services"
        title={<>We provide the <mark className="hl">best services</mark></>}
        lead="Lancaster Lines & Asphalt is one local crew for the whole job: fill the cracks, fix the holes, seal the surface, paint the lines. Residential and commercial, anywhere within about 40 miles of Lancaster."
        image="retail-lot-restriped-blue-ada"
      >
        <div className="flex flex-wrap gap-4">
          <Link href="/contact/" className="btn btn-yellow">Free quote</Link>
          <Link href="/pricing/" className="btn btn-outline">See pricing</Link>
        </div>
      </PageHero>

      {groups.map((g, gi) => {
        const list = services.filter((s) => s.group === g.key);
        return (
          <section key={g.key} className={`${gi % 2 === 0 ? "sec-grey" : "sec"} py-20 lg:py-28`}>
            <div className="wrap">
              <SectionHead eyebrow={g.eyebrow} title={g.title} lead={g.text} />
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {list.map((s, i) => (
                  <Link key={s.slug} href={`/${s.slug}/`} className="card reveal flex flex-col items-center p-10 text-center" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                    <span className="icon-tile"><Icon name={s.icon} size={88} /></span>
                    <span className="mt-4 block font-display text-[24px] font-bold text-black">{s.name}</span>
                    <span className="mt-3 block text-[16px] text-muted">{s.short}</span>
                    <span className="mt-5 block text-[14px] text-faint">From {s.price.rows.find(([k]) => /minimum/i.test(k))?.[1] ?? "$400"}</span>
                    <span className="more mt-5">
                      Learn more
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="sec-black py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow reveal">Order matters</p>
            <h2 className="reveal mt-4 text-[clamp(30px,3.6vw,44px)]">Do it in this order</h2>
            <p className="reveal mt-5 max-w-md text-[18px] text-white/75">Each step protects the next one. Doing them out of order wastes money, which is why we plan a lot as a package.</p>
          </div>
          <ol className="grid gap-4">
            {[
              ["Fill the cracks", "Water in a crack is what makes potholes. Hot rubber goes in first."],
              ["Repair the holes", "Cut, rebuild the base, and compact hot mix. No loose patch."],
              ["Seal the surface", "Two coats protect the pavement around the repairs."],
              ["Paint the lines", "Striping goes on cured sealer, so it looks sharp and lasts."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal grid grid-cols-[48px_1fr] gap-5 border-t border-white/15 pt-5">
                <span className="grid h-12 w-12 place-items-center bg-yellow font-display text-[20px] font-bold text-black">{i + 1}</span>
                <span>
                  <span className="block font-display text-[22px] font-bold text-white">{t}</span>
                  <span className="mt-1 block text-[16px] text-white/75">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Not sure what your lot needs?" text="Send a few photos or ask for a visit. We will tell you what is worth doing and what is not." />
    </>
  );
}
