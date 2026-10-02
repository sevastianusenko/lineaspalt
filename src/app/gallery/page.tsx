import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/ui";
import { allImages, categories, type Img } from "@/lib/images";

export const metadata: Metadata = {
  title: { absolute: "Our Work: Striping and Sealcoating Photos | Lines & Asphalt" },
  description:
    "Photos of real jobs across Lancaster County, PA: parking lot striping, ADA stalls, driveway sealcoating, hot pour crack filling and warehouse floor marking.",
  alternates: { canonical: "/gallery/" },
};

// Interleave categories so the first screen shows variety, not 20 driveways in a row.
function interleave(items: Img[]): Img[] {
  const buckets = categories.map((c) => items.filter((i) => i.cat === c.key));
  const out: Img[] = [];
  for (let n = 0; out.length < items.length; n++) {
    for (const b of buckets) if (b[n]) out.push(b[n]);
  }
  return out;
}

export default function GalleryPage() {
  const items = interleave(allImages());
  return (
    <>
      <Breadcrumbs items={[{ name: "Our work", href: "/gallery/" }]} />
      <PageHero
        kicker="Gallery"
        title="Real jobs. Real lots. Real lines."
        lead={`${items.length} photos from our own jobs across Lancaster County: striping, ADA stalls, sealcoating, crack filling and floors.`}
        image="warehouse-floor-line-marking-yellow-red"
      >
        <Link href="/contact/" className="btn btn-paint">Start your project</Link>
      </PageHero>
      <section className="sec-dark grain py-14 lg:py-20">
        <div className="wrap">
          <Gallery items={items} cats={categories} />
        </div>
      </section>
      <CtaBand title="Want yours to look like this?" />
    </>
  );
}
