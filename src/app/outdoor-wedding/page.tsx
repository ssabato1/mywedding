import type { Metadata } from "next";
import { siteConfig } from "@config";

export const metadata: Metadata = { title: "야외 웨딩" };

export default function OutdoorWeddingPage() {
  return (
    <div className="pb-16">
      <section className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          야외 웨딩
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-sub">
          마리나파크 가든에서 한강을 배경으로 치르는 야외 예식. 세리모니에서 애프터 파티까지 같은 자리에서 자연스럽게 이어지며, 식순과 연출을 커플이 직접 정할 수 있습니다. 우천 시에는 실내 홀로 전환해 진행합니다.
        </p>
      </section>
    </div>
  );
}
