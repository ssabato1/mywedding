import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import PostCard from "@/components/PostCard";
import ImageSlot from "@/components/ImageSlot";
import { siteConfig } from "@config";
import { getAll } from "@/lib/content";

export default function Home() {
  const posts = getAll("posts").slice(0, 3);
  return (
    <>
      <Hero />

      {/* 브랜드 소개 스트립 (About 흡수) */}
      <section className="container-page py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">{siteConfig.company.name}</p>
            <h2 className="font-display text-3xl font-bold leading-snug text-primary">
              하루 한 커플, 세&nbsp;시간&nbsp;이상의 결혼식
            </h2>
            <p className="mt-5 leading-relaxed text-ink-sub">
              한국 웨딩홀 대부분은 한두 시간 단위로 예식을 회전시킵니다.
              세빛섬과 마리나파크는 하루 한 커플만 맞아 세리모니부터 애프터 파티까지
              두 사람이 정한 흐름대로 여유 있게 진행합니다. 국제결혼과 해외 웨딩 트렌드,
              예식 준비의 모든 것을 이 블로그에 기록합니다.
            </p>
          </div>
          <ImageSlot ratio="4/5" label="세빛섬 야경" src="/images/hero-poster.jpg" />
        </div>
      </section>

      {/* 최신 블로그 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="저널" title="최신 글" href="/blog" cta="블로그 전체" />
        {posts.length === 0 ? (
          <p className="text-sm text-ink-muted">아직 발행된 글이 없습니다.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>

    </>
  );
}
