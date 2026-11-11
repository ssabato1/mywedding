import type { Metadata } from "next";
import ReportCard from "@/components/ReportCard";
import { getAll } from "@/lib/content";

export const metadata: Metadata = { title: "실적 보고" };

export default function ReportsPage() {
  const reports = getAll("reports");
  return (
    <div className="container-page py-20">
      <p className="eyebrow mb-2">데이터</p>
      <h1 className="mb-4 font-display text-3xl font-semibold text-gold sm:text-4xl">실적 보고</h1>
      <p className="mb-12 max-w-xl text-ink-sub">
        데이터 분석으로 뽑아낸 회사 실적을 공개 자료로 정리합니다.
      </p>
      {reports.length === 0 ? (
        <p className="text-sm text-ink-muted">아직 공개된 실적 보고가 없습니다.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {reports.map((r) => (
            <ReportCard key={r.slug} report={r} />
          ))}
        </div>
      )}
    </div>
  );
}
