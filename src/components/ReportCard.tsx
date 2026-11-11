import Image from "next/image";
import Link from "next/link";
import type { ContentMeta } from "@/lib/content";
import { contentHref } from "@/lib/content";

export default function ReportCard({ report }: { report: ContentMeta }) {
  const metrics = getReportMetrics(report);

  return (
    <Link
      href={contentHref(report.collection, report.slug)}
      className="group block overflow-hidden rounded-card border border-line bg-card transition-colors hover:border-line-dark"
    >
      <div className="relative aspect-[16/9] bg-canvas">
        {report.thumbnail ? (
          <Image
            src={report.thumbnail}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <MiniBars />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs">
          {report.period && (
            <span className="rounded-ui bg-primary px-2 py-0.5 font-bold text-card">{report.period}</span>
          )}
          <time className="text-ink-muted">{report.date}</time>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-gold group-hover:text-gold">{report.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-sub">{report.description}</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {metrics.map((metric) => (
            <span key={metric} className="rounded-ui border border-line bg-canvas px-2 py-2 text-center text-xs text-ink-sub">
              {metric}
            </span>
          ))}
        </div>
        <MiniBars className="mt-5 h-12" />
      </div>
    </Link>
  );
}

function getReportMetrics(report: ContentMeta): string[] {
  if (report.slug.includes("awareness")) return ["인지도 34%", "상기도 9%", "선호 적합"];
  if (report.period?.includes("Q2")) return ["자사몰 52%", "+6%p", "재고 점검"];
  return [report.period ?? "기간", report.tags[0] ?? "요약", report.dashboardUrl ? "대시보드" : "리포트"];
}

function MiniBars({ className = "h-full" }: { className?: string }) {
  const bars = [42, 68, 54, 88, 73];
  return (
    <div className={`flex items-end gap-2 px-5 pb-5 pt-8 ${className}`} aria-hidden="true">
      {bars.map((height, index) => (
        <span
          key={height}
          className={index === 3 ? "w-full rounded-t-sm bg-accent" : "w-full rounded-t-sm bg-primary/75"}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
