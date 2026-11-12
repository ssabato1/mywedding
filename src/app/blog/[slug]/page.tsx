import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAll, getOne, renderMarkdown } from "@/lib/content";
import { i18n } from "@/i18n";
import YouTubeTracks from "@/components/YouTubeTracks";

export const dynamicParams = true;

export function generateStaticParams() {
  return getAll("posts").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = getOne("posts", slug);
  if (!post || post.draft) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getOne("posts", slug);
  if (!post || post.draft) notFound();
  const html = await renderMarkdown(post.content, post.lang);
  const { lang, t } = await i18n();
  const translation = post.translationOf
    ? getOne("posts", post.translationOf)
    : getAll("posts").find((p) => p.translationOf === post.slug) ?? null;
  const translationSlug = translation && !translation.draft ? translation.slug : null;
  const showNote = post.lang !== lang;
  return (
    <article className="reading py-20">
      {showNote && (
        <p className="mb-8 rounded-card border border-line bg-card px-4 py-3 text-sm text-ink-sub">
          {translationSlug ? (
            <Link href={`/blog/${translationSlug}`} className="font-semibold text-gold hover:text-gold-dark">
              {t.blog.readTranslation} →
            </Link>
          ) : (
            t.blog.otherLangNoteEn
          )}
        </p>
      )}
      <header className="mb-12">
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <time>{post.date}</time>
          {post.tags[0] && <span className="text-gold-dark">{post.tags[0]}</span>}
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-snug text-gold sm:text-[2.6rem] sm:leading-[1.25]">{post.title}</h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-sub">{post.description}</p>
      </header>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
      {html.includes("data-yt=") && <YouTubeTracks />}
      {post.tags.length > 0 && (
        <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-6 text-sm">
          {post.tags.map((tag, i) => (
            <li key={`${tag}-${i}`} className="rounded-full border border-line px-3 py-1 text-ink-sub">
              #{tag.replace(/\s+/g, "")}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
