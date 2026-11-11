import type { Metadata } from "next";
import { siteConfig } from "@config";

export const metadata: Metadata = { title: "야외 웨딩" };

export default function OutdoorWeddingPage() {
  return (
    <div className="pb-16">
      <div className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          야외 웨딩
        </h1>
      </div>

      <section className="container-page border-t border-line py-16">
        <h2 className="max-w-3xl font-display text-3xl font-bold text-primary sm:text-4xl">
          세빛섬 5층 루프탑 가든 웨딩
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-sub">
          <p>
            한강 야경을 배경으로 세빛섬 5층 루프탑 가든에서 진행하는 야외 예식입니다.
          </p>
          <p>
            3시간 이상 여유 있게 단독으로 진행해 정해진 틀보다 두 사람의 흐름에 맞춘 구성이 가능합니다.
          </p>
          <p>
            세리모니가 끝난 뒤 같은 공간에서 자연스럽게 애프터 파티로 이어지는 커스터마이징 가능한 스페셜 웨딩입니다.
          </p>
        </div>
        <a
          href={siteConfig.links.floatingisland}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block text-sm font-semibold text-accent hover:text-primary"
        >
          세빛섬 사이트 보기
        </a>
      </section>

      <section className="container-page border-t border-line py-16">
        <h2 className="max-w-3xl font-display text-3xl font-bold text-primary sm:text-4xl">
          마리나파크 가든 웨딩
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-sub">
          <p>
            요트 마리나를 배경으로 마리나파크 가든에서 진행하는 야외 예식입니다.
          </p>
          <p>
            하객이 붐비지 않는 여유로운 진행으로 세리모니의 순간과 대화를 충분히 나눌 수 있습니다.
          </p>
          <p>
            예식의 분위기와 순서에 맞춰 파티 웨딩을 접목할 수 있어 한 공간에서 자연스럽게 다음 순서로 이어집니다.
          </p>
        </div>
        <a
          href={siteConfig.links.marinapark}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block text-sm font-semibold text-accent hover:text-primary"
        >
          마리나파크 사이트 보기
        </a>
      </section>
    </div>
  );
}
