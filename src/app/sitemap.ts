import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { towns } from "@/content/towns";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { abs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-01");
  const stat = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: abs(path),
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    stat("/", 1, "weekly"),
    stat("/services/", 0.9),
    ...services.map((s) => stat(`/${s.slug}/`, 0.9)),
    stat("/service-areas/", 0.8),
    ...towns.map((t) => stat(t.path, t.tier === "core" ? 0.7 : 0.5)),
    stat("/projects/", 0.7, "weekly"),
    ...getProjects().map((p) => ({ url: abs(`/projects/${p.slug}/`), lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
    stat("/gallery/", 0.6),
    stat("/about/", 0.6),
    stat("/contact/", 0.8),
    stat("/blog/", 0.7, "weekly"),
    ...getPosts().map((p) => ({ url: abs(`/${p.slug}/`), lastModified: new Date(p.modified || p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
    stat("/privacy-policy/", 0.2, "yearly"),
    stat("/terms/", 0.2, "yearly"),
  ];
}
