import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, PageHero, Photo, SectionHead } from "@/components/ui";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: { absolute: "Asphalt & Line Striping Services in Lancaster, PA" },
  description:
    "Line striping, ADA and fire lane markings, sealcoating, crack filling and pothole repair in Lancaster County, PA. Free estimates: 717-808-1600.",
  alternates: { canonical: "/services/" },
};

const groups = [
  { key: "striping", title: "Pavement markings", tag: "Paint the lines", text: "Layouts, re-striping, accessible stalls, fire lanes and floors." },
  { key: "protection", title: "Protect the surface", tag: "Seal it", text: "Sealcoating, crack filling and planned maintenance that make pavement last." },
  { key: "repair", title: "Repair the damage", tag: "Fix it", text: "Potholes and failed spots, repaired from the base up." },
] as const;

export default function Services() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }]} />
      <PageHero
        kicker="Everything for your pavement"
        title="Asphalt maintenance and line striping services"
        lead="One local crew for the whole job: fill the cracks, fix the holes, seal the surface, paint the lines. Residential and commercial, anywhere within about 40 miles of Lancaster."
        image="retail-lot-restriped-blue-ada"
      >
        <div className="flex flex-wrap gap-4">
          <Link href="/contact/" className="btn btn-paint">Free quote</Link>
          <Link href="/pricing/" className="btn btn-ghost">See pricing</Link>
        </div>
      </PageHero>

      {groups.map((g, gi) => {
        const list = services.filter((s) => s.group === g.key);
        const light = gi === 1;
        return (
          <section key={g.key} className={`${light ? "sec-light" : gi === 0 ? "sec-dark" : "sec-deep"} grain py-16 lg:py-24`}>
            <div className="wrap">
              <SectionHead tag={g.tag} title={g.title} lead={g.text} />
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {list.map((s, i) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}/`}
                    className={`reveal group flex flex-col ${light ? "bg-white text-ink" : "bg-asphalt-800 text-line"} transition-transform hover:-translate-y-1`}
                    style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                  >
                    <span className="block aspect-[16/11] overflow-hidden bg-asphalt-700">
                      <Photo slug={s.hero} small className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </span>
                    <span className="flex flex-1 flex-col p-6">
                      <span className="font-display text-[36px] font-extrabold uppercase leading-none group-hover:text-paint">{s.name}</span>
                      <span className={`mt-3 text-[17px] ${light ? "text-[#2b2e31]" : "text-asphalt-300"}`}>{s.short}</span>
                      <span className={`mt-auto inline-flex items-center gap-3 pt-5 font-display text-[18px] font-bold uppercase tracking-[0.08em] ${light ? "text-[#8a5c00]" : "text-paint"}`}>
                        Details and pricing
                        <svg width="26" height="12" viewBox="0 0 30 14" fill="currentColor" className="transition-transform group-hover:translate-x-2" aria-hidden><path d="M0 5h22V0l8 7-8 7V9H0z" /></svg>
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="sec-yellow py-16 lg:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="tag reveal">Order matters</p>
            <h2 className="reveal mt-4 text-[clamp(40px,6vw,80px)]">Do it in this order.</h2>
          </div>
          <ol className="grid gap-5">
            {[
              ["Fill the cracks", "Water in a crack is what makes potholes. Hot rubber goes in first."],
              ["Repair the holes", "Cut, rebuild the base, and compact hot mix. No loose patch."],
              ["Seal the surface", "Two coats protect the pavement around the repairs."],
              ["Paint the lines", "Striping goes on cured sealer, so it looks sharp and lasts."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal grid grid-cols-[56px_1fr] gap-4 border-t-[4px] border-black pt-4">
                <span className="stencil text-[44px] leading-none">{i + 1}</span>
                <span>
                  <span className="block font-display text-[32px] font-extrabold uppercase leading-none">{t}</span>
                  <span className="mt-1 block text-[17px] font-medium">{d}</span>
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
