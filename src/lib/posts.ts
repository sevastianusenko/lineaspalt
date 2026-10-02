import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import { allImages } from "./images";

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  modified: string;
  category: string;
  categoryName: string;
  image: string;
  words: number;
  body: string;
};

const dir = path.join(process.cwd(), "src", "content", "posts");
let cache: Post[] | null = null;

// Featured images chosen by hand so each article shows the right kind of work.
const hero: Record<string, string> = {
  "parking-lot-pothole-repair-business": "loading-dock-lot-asphalt",
  "crack-filling-before-winter-lancaster": "hot-pour-crack-fill-lot-cracks",
  "ada-parking-compliance-pennsylvania": "church-lot-ada-hatched-stalls",
  "best-time-to-sealcoat-pennsylvania": "driveway-sealcoat-fall-tree",
  "hot-pour-vs-cold-pour-crack-filler": "hot-pour-crack-sealing-melter",
  "parking-lot-striping-mistakes": "small-business-lot-numbered-stalls",
  "sealcoating-myths-lancaster": "driveway-sealcoat-glossy-wet",
  "asphalt-sealcoating-process-step-by-step": "driveway-sealcoat-orange-cones",
  "how-we-stripe-a-parking-lot": "striper-machine-night-lot",
  "hot-pour-crack-sealing-process": "hot-pour-crack-sealing-crew",
  "sealcoating-cost-lancaster-pa": "driveway-sealcoat-wide-apron",
  "why-potholes-form-freeze-thaw": "driveway-resurfaced-edge-gravel",
  "pothole-repair-process": "private-lane-fresh-asphalt",
  "parking-lot-striping-cost": "retail-lot-fresh-yellow-stripes",
  "crack-filling-cost-lancaster-county": "crack-filled-commercial-drive",
  "pothole-repair-cost-lancaster-pa": "driveway-fresh-asphalt-leaves",
  "pothole-repair-vs-full-repaving-which-one-do-you-actually-need": "driveway-fresh-asphalt-garage",
  "ada-parking-spaces-loading-zone-striping-for-a-commercial-retail-building-in-lancaster-county-pa": "ada-blue-symbol-night-striping",
  "how-we-re-striped-a-26-space-commercial-lot-in-lancaster-pa-and-why-the-details-matter": "small-business-lot-numbered-stalls",
  "ada-parking-lot-requirements": "ada-stall-white-outline-brick-building",
  "parking-lot-restriping": "parking-stalls-wheel-stops-white-lines",
  "what-is-sealcoating-and-why-does-it-matter": "driveway-sealcoat-curved-apron",
  "why-your-business-needs-fresh-parking-lot-striping": "shopping-center-yellow-hatching",
  "spring-asphalt-checklist-what-to-fix-after-winter": "retail-lot-angled-yellow-stripes",
  "top-5-reasons-to-sealcoat-your-driveway": "driveway-sealcoat-autumn-garage",
};

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(dir, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Bad frontmatter: ${file}`);
  const fm: Record<string, unknown> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    fm[line.slice(0, i).trim()] = JSON.parse(line.slice(i + 1).trim());
  }
  const slug = file.replace(/\.md$/, "");
  const data = fm as Omit<Post, "slug" | "body">;
  return { slug, body: m[2].trim(), ...data, image: hero[slug] ?? data.image };
}

export function getPosts(): Post[] {
  if (!cache) {
    cache = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map(parse)
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }
  return cache;
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const readMinutes = (words: number) => Math.max(3, Math.round(words / 220));

export function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export type Segment =
  | { type: "html"; html: string }
  | { type: "youtube"; id: string; title: string }
  | { type: "gallery"; slugs: string[] };

const dims = new Map(allImages().map((i) => [i.slug, i]));
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const marked = new Marked({
  gfm: true,
  renderer: {
    image({ href, text }) {
      const slug = href.replace(/^\/img\//, "").replace(/\.webp$/, "");
      const d = dims.get(slug);
      const w = d ? ` width="${d.w}" height="${d.h}"` : "";
      return `<figure><img src="${esc(href)}" alt="${esc(text)}"${w} loading="lazy" decoding="async" style="max-height:640px;object-fit:cover" /></figure>`;
    },
    heading({ tokens, depth }) {
      const inner = this.parser.parseInline(tokens);
      const plain = inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&quot;/g, "");
      return `<h${depth} id="${slugify(plain)}">${inner}</h${depth}>`;
    },
    link({ href, title, tokens }) {
      const inner = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const t = title ? ` title="${esc(title)}"` : "";
      return external
        ? `<a href="${esc(href)}"${t} target="_blank" rel="noopener noreferrer">${inner}</a>`
        : `<a href="${esc(href)}"${t}>${inner}</a>`;
    },
  },
});

export function renderBody(md: string): Segment[] {
  const out: Segment[] = [];
  let buf: string[] = [];
  const flush = () => {
    const text = buf.join("\n").trim();
    if (text) out.push({ type: "html", html: marked.parse(text, { async: false }) as string });
    buf = [];
  };
  for (const line of md.split("\n")) {
    const yt = line.match(/^::youtube\[([\w-]+)\|(.*)\]$/);
    const gal = line.match(/^::gallery\[(.*)\]$/);
    if (yt) {
      flush();
      out.push({ type: "youtube", id: yt[1], title: yt[2] });
    } else if (gal) {
      flush();
      out.push({ type: "gallery", slugs: gal[1].split(",").filter((s) => dims.has(s)) });
    } else buf.push(line);
  }
  flush();
  return out;
}

export function headings(md: string): { id: string; text: string }[] {
  return md
    .split("\n")
    .filter((l) => /^## /.test(l))
    .map((l) => l.replace(/^## /, "").replace(/\\\./g, ".").replace(/[*_`]/g, "").trim())
    .map((text) => ({ text, id: slugify(text) }));
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
