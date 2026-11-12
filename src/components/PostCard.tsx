import Image from "next/image";
import Link from "next/link";
import type { ContentMeta } from "@/lib/content";
import { contentHref } from "@/lib/content";

export default function PostCard({ post }: { post: ContentMeta }) {
  return (
    <Link
      href={contentHref(post.collection, post.slug)}
      className="group block overflow-hidden rounded-card border border-line bg-card transition-colors hover:border-line-dark"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,var(--brand-bg-card),var(--brand-bg)_55%,var(--brand-accent-dark))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/75 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          {post.tags[0] && <span className="text-gold-dark">{post.tags[0]}</span>}
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-gold group-hover:text-gold-dark">{post.title}</h3>
        {post.description && <p className="mt-2 text-sm leading-relaxed text-ink-sub">{post.description}</p>}
      </div>
    </Link>
  );
}
