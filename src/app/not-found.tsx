import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="sec-deep grain">
      <div className="wrap py-24 lg:py-36">
        <p className="tag">Error 404</p>
        <h1 className="mt-4 text-[clamp(64px,13vw,190px)] leading-[0.85]">
          Dead <span className="text-paint">end.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[20px] text-asphalt-300">
          That page is not on the map. It may have moved when we rebuilt the site. Try one of these instead.
        </p>
        <div className="dash-line mt-10 max-w-md" aria-hidden />
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-paint">Home</Link>
          <Link href="/services/" className="btn btn-ghost">Services</Link>
          <Link href="/contact/" className="btn btn-ghost">Contact</Link>
          <a href={`tel:${site.phoneTel}`} className="btn btn-ghost">{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
