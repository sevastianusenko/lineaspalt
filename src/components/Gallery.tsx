"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Item = { slug: string; cat: string; alt: string; w: number; h: number; sw: number; sh: number };
type Cat = { key: string; label: string };

export default function Gallery({ items, cats, initial = 24 }: { items: Item[]; cats: Cat[]; initial?: number }) {
  const [cat, setCat] = useState("all");
  const [limit, setLimit] = useState(initial);
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);

  const list = cat === "all" ? items : items.filter((i) => i.cat === cat);
  const shown = list.slice(0, limit);

  const close = useCallback(() => {
    ref.current?.close();
    setOpen(null);
  }, []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open, step]);

  const cur = open !== null ? shown[open] : null;

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter photos">
        {[{ key: "all", label: "All work" }, ...cats].map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={cat === c.key}
            onClick={() => {
              setCat(c.key);
              setLimit(initial);
            }}
            className={`shrink-0 px-4 py-2.5 font-display text-[15px] font-bold transition-colors ${cat === c.key ? "bg-yellow text-black" : "bg-white text-ink hover:bg-grey-2"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 columns-2 gap-4 md:columns-3 lg:columns-4">
        {shown.map((i, idx) => (
          <li key={i.slug} className="mb-4 break-inside-avoid">
            <button type="button" onClick={() => setOpen(idx)} className="photo group relative block w-full" aria-label={`Open photo: ${i.alt}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/${i.slug}-sm.webp`} alt={i.alt} width={i.sw} height={i.sh} loading="lazy" decoding="async" className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]" />
              <span className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-yellow transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          </li>
        ))}
      </ul>

      {limit < list.length && (
        <div className="mt-8 text-center">
          <button type="button" className="btn btn-outline" onClick={() => setLimit((l) => l + 24)}>
            Show more ({list.length - limit} left)
          </button>
        </div>
      )}

      <dialog
        ref={ref}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-black/95 p-0 backdrop:bg-black/90"
        aria-label="Photo viewer"
      >
        {cur && (
          <div className="relative flex h-full w-full flex-col items-center justify-center p-4 sm:p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/img/${cur.slug}.webp`} alt={cur.alt} className="max-h-[82vh] w-auto max-w-full rounded-xl object-contain" />
            <p className="mt-4 max-w-2xl text-center text-[16px] text-white">{cur.alt}</p>
            <button type="button" onClick={close} className="absolute right-3 top-3 grid h-12 w-12 place-items-center bg-yellow text-black" aria-label="Close photo">
              <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" fill="none" aria-hidden><path d="M5 5l14 14M19 5L5 19" /></svg>
            </button>
            <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid h-14 w-12 -translate-y-1/2 place-items-center bg-white/15 text-white hover:bg-yellow hover:text-black sm:left-6" aria-label="Previous photo">
              <svg width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" fill="none" aria-hidden><path d="M15 4l-8 8 8 8" /></svg>
            </button>
            <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 grid h-14 w-12 -translate-y-1/2 place-items-center bg-white/15 text-white hover:bg-yellow hover:text-black sm:right-6" aria-label="Next photo">
              <svg width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" fill="none" aria-hidden><path d="M9 4l8 8-8 8" /></svg>
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
