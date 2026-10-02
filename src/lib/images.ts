import manifest from "@/content/images.json";

export type Img = { slug: string; cat: string; alt: string; w: number; h: number; sw: number; sh: number };

const all = manifest as Record<string, Img>;

export function img(slug: string): Img {
  const i = all[slug];
  if (!i) throw new Error(`Unknown image slug: ${slug}`);
  return i;
}

export const src = (slug: string) => `/img/${slug}.webp`;
export const srcSm = (slug: string) => `/img/${slug}-sm.webp`;

export const allImages = (): Img[] => Object.values(all);
export const byCat = (cat: string) => allImages().filter((i) => i.cat === cat);

export const categories = [
  { key: "striping", label: "Line striping" },
  { key: "ada", label: "ADA and night work" },
  { key: "sealcoating", label: "Sealcoating" },
  { key: "cracks", label: "Crack filling" },
  { key: "warehouse", label: "Warehouse floors" },
];
