import fs from "node:fs";
import path from "node:path";

export type Project = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  completed: string;
  town: string;
  county: string;
  service: string;
  services: string[];
  townSlug?: string;
  hero: string;
  photos: string[];
  facts: [string, string][];
  summary: string;
  body: string;
  words: number;
};

const dir = path.join(process.cwd(), "src", "content", "projects");
let cache: Project[] | null = null;

function parse(file: string): Project {
  const raw = fs.readFileSync(path.join(dir, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Bad frontmatter: ${file}`);
  const fm: Record<string, unknown> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    fm[line.slice(0, i).trim()] = JSON.parse(line.slice(i + 1).trim());
  }
  const body = m[2].trim();
  const words = body.replace(/!\[[^\]]*\]\([^)]*\)/g, "").split(/\s+/).filter(Boolean).length;
  return { slug: file.replace(/\.md$/, ""), body, words, ...(fm as Omit<Project, "slug" | "body" | "words">) };
}

export function getProjects(): Project[] {
  if (!cache) {
    cache = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map(parse)
      // Dated jobs first (newest completion first), undated ones after.
      .sort((a, b) => (b.completed ? Date.parse(b.completed) || 0 : -1) - (a.completed ? Date.parse(a.completed) || 0 : -1));
  }
  return cache;
}

export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug);
export const projectsForService = (serviceSlug: string) => getProjects().filter((p) => p.services.includes(serviceSlug));
export const projectsForTown = (townSlug: string) => getProjects().filter((p) => p.townSlug === townSlug);
