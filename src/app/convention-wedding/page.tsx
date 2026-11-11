import type { Metadata } from "next";
import { siteConfig } from "@config";

export const metadata: Metadata = { title: "컨벤션 웨딩" };

export default function ConventionWeddingPage() {
  return (
    <div className="pb-16">
      <section className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          컨벤션 웨딩
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-sub">
          한강 위 세빛섬 컨벤션홀에서 열리는 대형 예식. 500명 이상의 하객을 한 공간에 모시고, 대형 LED와 로비까지 여유 있는 예식 시간 동안 온전히 사용합니다. 격식 있는 세리모니와 여유로운 피로연이 한 흐름으로 이어집니다.
        </p>
      </section>
    </div>
  );
}
