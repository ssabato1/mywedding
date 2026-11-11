import Image from "next/image";
import { siteConfig } from "@config";

/**
 * 홈 히어로 배경.
 * 배경 영상은 코드를 고치지 않고 site.config.ts 의 hero 슬롯만 바꿔 넣습니다:
 *   1) 모션그래픽을 만들어 public/hero.mp4 로 저장
 *   2) site.config.ts 에서 hero.video 를 "/hero.mp4" 로 (기본값은 null)
 * hero.video 가 null 이면 poster 이미지만으로 완전히 동작합니다.
 * → 6.5 「모션그래픽 생성 — 히어로 모션」 실습.
 *
 * 포스터 이미지는 아래쪽에 두고, 위쪽은 사진의 하늘색으로 이어 붙여 문구가 들어갈 하늘 공간을 넓힙니다.
 */
export default function HeroMedia() {
  const { video, poster } = siteConfig.hero;
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#5f58ab" }}>
      {/* 사진 위쪽 하늘을 위로 늘인 그라디언트 */}
      <div
        className="absolute inset-x-0 top-0 h-[46%]"
        style={{ background: "linear-gradient(to bottom, #4b4790 0%, #5f58ab 55%, #625bae 100%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[62%]">
        {video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            className="h-full w-full object-cover object-bottom"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        )}
        {/* 사진 윗변을 하늘 그라디언트와 섞는 띠 */}
        <div
          className="absolute inset-x-0 top-0 h-16"
          style={{ background: "linear-gradient(to bottom, #625bae, rgba(98,91,174,0))" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-canvas/70 via-canvas/35 to-canvas/15" />
    </div>
  );
}
