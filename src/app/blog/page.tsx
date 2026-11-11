import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAll } from "@/lib/content";
import { i18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await i18n();
  return { title: t.blog.title };
}

export default async function BlogPage() {
  const { lang, t } = await i18n();
  const posts = getAll("posts", lang);
  const fallback = posts.length === 0 && lang !== "ko" ? getAll("posts", "ko") : [];
  const shown = posts.length > 0 ? posts : fallback;
  return (
    <div className="container-page py-20">
      <p className="eyebrow mb-2">{t.blog.eyebrow}</p>
      <h1 className="mb-12 font-display text-3xl font-semibold text-gold sm:text-4xl">{t.blog.title}</h1>
      {shown.length === 0 ? (
        <p className="text-sm text-ink-muted">{t.blog.empty}</p>
      ) : (
        <>
          {posts.length === 0 && <p className="mb-8 text-sm text-ink-muted">{t.blog.emptyEn}</p>}
          <div className="grid gap-8 sm:grid-cols-2">
            {shown.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
