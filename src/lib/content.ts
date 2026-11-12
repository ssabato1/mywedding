import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { getLocalImageSize } from "./image-size";

export type Collection = "posts" | "reports";
export const COLLECTIONS: Collection[] = ["posts", "reports"];

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface ContentMeta {
  collection: Collection;
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  thumbnail?: string;
  lang: "ko" | "en"; // 글 언어 (frontmatter lang, 기본 ko)
  translationOf?: string; // 같은 글의 원문 slug
  period?: string; // reports 전용 — 보고 기간 라벨
  dashboardUrl?: string; // reports 전용 — BI 대시보드 iframe URL
  draft: boolean;
}

export interface ContentDoc extends ContentMeta {
  content: string;
}

/** posts→/blog/{slug}, reports→/reports/{slug} */
export function contentHref(collection: Collection, slug: string): string {
  return `/${collection === "posts" ? "blog" : "reports"}/${slug}`;
}

/** 컬렉션 발행 항목 — draft 제외, 날짜 역순(동률이면 slug 역순). 깨진 파일은 스킵. lang 을 주면 그 언어 글만. */
export function getAll(collection: Collection, lang?: "ko" | "en"): ContentMeta[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readDoc(collection, f))
    .filter((d): d is ContentDoc => d !== null && !d.draft && (lang === undefined || d.lang === lang))
    .sort((a, b) => (a.date === b.date ? (a.slug < b.slug ? 1 : -1) : a.date < b.date ? 1 : -1))
    .map(toMeta);
}

/** slug 로 문서 1건. draft 도 반환하므로 호출부에서 걸러야 한다. 없으면 null. */
export function getOne(collection: Collection, slug: string): ContentDoc | null {
  return readDoc(collection, `${slug}.md`);
}

/** 마크다운 → HTML. GFM 지원, raw HTML 은 안전하게 제거. */
export async function renderMarkdown(md: string, lang: "ko" | "en" = "ko"): Promise<string> {
  const out = await remark().use(remarkGfm).use(remarkHtml, { sanitize: true }).process(md);
  return decorateImages(embedYouTube(String(out), lang));
}

const YT_CHANNEL = "https://www.youtube.com/@artmstudiosounds";

/**
 * 유튜브 영상 표지를 본문 안 플레이어로 바꾼다.
 * - `![캡션](https://i.ytimg.com/vi/<ID>/...)` : 유튜브 썸네일 이미지
 * - `[![캡션](/images/표지.jpg)](https://youtu.be/<ID>)` : 영상 링크를 건 로컬 표지
 * 플레이어 아래에는 채널 구독 버튼을 둔다. 곡별 링크(youtu.be/<ID>?t=초)는
 * YouTubeTracks 컴포넌트가 가로채 이 플레이어에서 재생한다.
 */
function embedYouTube(html: string, lang: "ko" | "en"): string {
  const player = (id: string, alt: string) => {
    const caption = alt ? `<figcaption>${alt}</figcaption>` : "";
    const label = lang === "en" ? "Subscribe to ArtM Studio Sounds" : "아트엠 스튜디오 사운즈 구독";
    const note = lang === "en" ? "New ceremony and banquet music every week" : "새 예식·연회 음악을 놓치지 마세요";
    return (
      `<figure class="post-figure yt-figure">` +
      `<div class="yt-frame"><iframe data-yt="${id}" src="https://www.youtube.com/embed/${id}?rel=0" title="${alt}" loading="lazy" ` +
      `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` +
      caption +
      `<div class="yt-subscribe"><a href="${YT_CHANNEL}?sub_confirmation=1" target="_blank" rel="noopener noreferrer">▶ ${label}</a><span>${note}</span></div>` +
      `</figure>`
    );
  };
  return html
    .replace(/<p><img\s+[^>]*src="https:\/\/i\.ytimg\.com\/vi\/([\w-]{11})\/[^"]*"[^>]*><\/p>/g, (m, id: string) => player(id, /alt="([^"]*)"/.exec(m)?.[1] ?? ""))
    .replace(/<p><a href="https:\/\/youtu\.be\/([\w-]{11})"[^>]*>(<img\s+[^>]*>)<\/a><\/p>/g, (_m, id: string, img: string) => player(id, /alt="([^"]*)"/.exec(img)?.[1] ?? ""));
}

/**
 * 본문 이미지를 figure 로 감싼다: alt 를 캡션으로 보여 주고, 가로/세로 비율에 따라
 * 세로 사진은 폭을 줄여 가운데 놓아 찌그러지거나 화면을 가득 채우지 않게 한다.
 * 로컬 이미지는 width/height 를 넣어 레이아웃 흔들림을 막는다.
 */
function decorateImages(html: string): string {
  return html.replace(/<p>(<img\s+[^>]*>)<\/p>/g, (_m, imgTag: string) => {
    const src = /src="([^"]*)"/.exec(imgTag)?.[1] ?? "";
    const alt = /alt="([^"]*)"/.exec(imgTag)?.[1] ?? "";
    const size = getLocalImageSize(src);
    const portrait = size ? size.height > size.width * 1.1 : false;
    const dims = size ? ` width="${size.width}" height="${size.height}"` : "";
    const img = `<img src="${src}" alt="${alt}"${dims} loading="lazy" decoding="async">`;
    const caption = alt ? `<figcaption>${alt}</figcaption>` : "";
    return `<figure class="post-figure${portrait ? " is-portrait" : ""}">${img}${caption}</figure>`;
  });
}

function readDoc(collection: Collection, filename: string): ContentDoc | null {
  const filePath = path.join(CONTENT_ROOT, collection, filename);
  if (!fs.existsSync(filePath)) return null;
  try {
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    if (!data.title || !data.description || !data.date) {
      console.warn(`[content] ${collection}/${filename} 스킵 — 필수 필드(title·description·date) 누락`);
      return null;
    }
    return {
      collection,
      slug: filename.replace(/\.md$/, ""),
      title: String(data.title),
      description: String(data.description),
      date: toDateString(data.date),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : undefined,
      lang: data.lang === "en" ? "en" : "ko",
      translationOf: typeof data.translationOf === "string" ? data.translationOf : undefined,
      period: typeof data.period === "string" ? data.period : undefined,
      dashboardUrl: typeof data.dashboardUrl === "string" ? data.dashboardUrl : undefined,
      draft: data.draft === true,
      content,
    };
  } catch (err) {
    console.warn(`[content] ${collection}/${filename} 스킵 — 파싱 실패:`, err);
    return null;
  }
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function toMeta(doc: ContentDoc): ContentMeta {
  return {
    collection: doc.collection,
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    date: doc.date,
    tags: doc.tags,
    thumbnail: doc.thumbnail,
    lang: doc.lang,
    translationOf: doc.translationOf,
    period: doc.period,
    dashboardUrl: doc.dashboardUrl,
    draft: doc.draft,
  };
}
