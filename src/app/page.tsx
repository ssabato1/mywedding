import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/PostCard";
import ImageSlot from "@/components/ImageSlot";
import { siteConfig } from "@config";
import { getAll } from "@/lib/content";
import { i18n } from "@/i18n";

export default async function Home() {
  const { lang, t } = await i18n();
  const posts = getAll("posts", lang).slice(0, 3);
  const fallback = posts.length === 0 && lang !== "ko" ? getAll("posts", "ko").slice(0, 3) : [];
  const shown = posts.length > 0 ? posts : fallback;
  return (
    <>
      <Hero />

      {/* 브랜드 소개 스트립 */}
      <section className="container-page py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">{siteConfig.company.name}</p>
            <h2 className="font-display text-3xl font-bold leading-snug text-primary">{t.home.introTitle}</h2>
            <p className="mt-5 leading-relaxed text-ink-sub">{t.home.introBody}</p>
          </div>
          <ImageSlot ratio="4/5" label={t.home.imageLabel} src="/images/hero-poster.jpg" />
        </div>
      </section>

      {/* 최신 블로그 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={t.home.journal} title={t.home.latest} href="/blog" cta={t.home.allPosts} />
        {shown.length === 0 ? (
          <p className="text-sm text-ink-muted">{t.home.noPosts}</p>
        ) : (
          <>
            {posts.length === 0 && <p className="mb-6 text-sm text-ink-muted">{t.blog.emptyEn}</p>}
            <div className="grid gap-8 sm:grid-cols-3">
              {shown.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
