"use client";

import { useState } from "react";

export default function YouTube({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <figure className="not-prose my-8">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {on ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 block h-full w-full" aria-label={`Play video: ${title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="chamfer grid h-[72px] w-[104px] place-items-center bg-paint text-black transition-transform group-hover:scale-105">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-[15px] text-asphalt-300">Video: {title}. Loads from YouTube when you press play.</figcaption>
    </figure>
  );
}
