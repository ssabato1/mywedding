import type { MetadataRoute } from "next";
import { getAll } from "@/lib/content";

const BASE = "https://www.floatingislandwedding.com";

/** 검색엔진(구글·네이버·다음)에 제출하는 사이트맵. 글을 발행하면 자동으로 늘어납니다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/convention-wedding", "/outdoor-wedding", "/blog", "/contact"].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const posts = getAll("posts").map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
