import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="sec">
      <div className="wrap py-24 lg:py-36">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-[clamp(40px,6vw,84px)]">
          Dead <mark className="hl">end.</mark>
        </h1>
        <p className="mt-6 max-w-xl text-[19px] text-muted">
          That page is not on the map. It may have moved when we rebuilt the site. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-yellow">Home</Link>
          <Link href="/services/" className="btn btn-outline">Services</Link>
          <Link href="/contact/" className="btn btn-outline">Contact</Link>
          <a href={`tel:${site.phoneTel}`} className="btn btn-outline">{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
