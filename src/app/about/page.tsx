import type { Metadata } from "next";
import { siteConfig } from "@config";
import SectionHeading from "@/components/SectionHeading";
import ImageSlot from "@/components/ImageSlot";

export const metadata: Metadata = { title: "회사소개" };

const history = [
  {
    year: "한강 르네상스",
    title: "한강 위에 섬을 띄우다",
    body: "한강 위에 문화 랜드마크를 만들자는 계획으로 반포대교 남단, 무지개분수 옆에 세 개의 인공섬(가빛섬·채빛섬·솔빛섬)이 세워졌습니다.",
  },
  {
    year: "2014",
    title: "세빛섬 개장",
    body: "서울을 대표하는 MICE 유니크 베뉴로 문을 열었습니다. 플로팅아일랜드 컨벤션은 첫 번째 섬인 가빛섬에 자리합니다.",
  },
  {
    year: "확장",
    title: "웨딩·연회 공간의 확장",
    body: "컨벤션홀(2층), 마리나파크, 애니버셔리홀, 비스타(3층), 리브고쉬, 빌라드노체, 4층 가든, 5층 루프탑까지 규모와 분위기가 다른 공간을 갖추었습니다. 스포사벨라(드레스)·애니버셔리플라워(플라워)·ArtM Studio(음악)가 패밀리 브랜드로 함께합니다.",
  },
  {
    year: "2026",
    title: "Floating Island Wedding",
    body: "국제결혼과 해외 웨딩 트렌드를 다루는 정보 블로그를 시작했습니다. 두 문화가 만나는 결혼식을 한강 위에서 준비합니다.",
  },
];

const values = [
  {
    name: "여유",
    body: "하루 한 커플만 맞는 단독홀에서 3시간 이상 여유 있게 진행합니다. 앞뒤 예식과 하객이 섞이지 않습니다.",
  },
  {
    name: "맞춤",
    body: "식순·음악·연출·메뉴를 두 사람이 직접 정합니다. 세리모니가 끝나면 같은 자리에서 애프터 파티로 이어집니다.",
  },
  {
    name: "환대",
    body: "해외 하객과 국제 커플을 위해 영어 진행, 할랄·채식 메뉴, 고속터미널 셔틀과 800대 이상 주차를 준비합니다.",
  },
  {
    name: "전망",
    body: "한강과 반포대교 무지개분수를 배경으로, 낮에는 강과 하늘, 밤에는 도시의 불빛이 예식의 배경이 됩니다.",
  },
];

const spaces = [
  { name: "컨벤션홀", floor: "2층", body: "최대 600명. 대형 LED와 로비를 갖춘 컨벤션 웨딩" },
  { name: "마리나파크", floor: "가든·루프탑", body: "요트 마리나를 배경으로 한 야외 예식과 애프터 파티" },
  { name: "애니버셔리홀", floor: "채빛섬", body: "최대 200명. 무대·조명·LED를 갖춘 연회장" },
  { name: "비스타", floor: "3층", body: "한강 전망의 웨딩·컨퍼런스 홀, 야외 테라스 포함" },
  { name: "리브고쉬 · 빌라드노체", floor: "2–3층", body: "프라이빗 연회와 VIP 리셉션" },
  { name: "4층 가든", floor: "야외", body: "칵테일 리셉션과 웰컴 파티" },
  { name: "5층 루프탑", floor: "야외", body: "한강 야경을 배경으로 한 루프탑 가든 웨딩과 파티" },
];

const partnerLinks = [
  { name: "플로팅아일랜드", href: siteConfig.links.floatingisland },
  { name: "마리나파크", href: siteConfig.links.marinapark },
  { name: "스포사벨라", href: siteConfig.links.sposabella },
  { name: "애니버셔리플라워", href: siteConfig.links.anniversaryflower },
  { name: "ArtM Studio", href: siteConfig.links.artmstudio },
].filter((l) => Boolean(l.href));

export default function AboutPage() {
  return (
    <div className="pb-16">
      {/* 슬로건 */}
      <section className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          {siteConfig.company.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-sub">
          {siteConfig.company.description}
        </p>
      </section>

      {/* 히스토리 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="히스토리" title="세빛섬이 걸어온 길" />
        <div className="grid gap-8 md:grid-cols-2">
          <ol className="space-y-8">
            {history.map((h) => (
              <li key={h.title} className="flex gap-6 border-t border-line pt-6">
                <span className="w-28 shrink-0 font-display text-2xl font-bold leading-tight text-accent">
                  {h.year}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{h.title}</h3>
                  <p className="mt-1 text-ink-sub">{h.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <ImageSlot
            ratio="4/5"
            label="세빛섬 야경"
            src="/images/hero-poster.jpg"
            className="hidden md:flex"
          />
        </div>
      </section>

      {/* 가치 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="가치" title="우리가 지키는 것" />
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.name} className="rounded-card border border-line bg-card p-6">
              <h3 className="font-display text-lg font-bold text-primary">{v.name}</h3>
              <p className="mt-2 text-ink-sub">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 공간 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="공간" title="규모와 분위기가 다른 일곱 공간" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spaces.map((s) => (
            <li key={s.name} className="rounded-card border border-line bg-card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-ink">{s.name}</h3>
                <span className="text-xs text-ink-muted">{s.floor}</span>
              </div>
              <p className="mt-2 text-sm text-ink-sub">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 오시는 길 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="오시는 길" title="반포대교 남단, 무지개분수 옆" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3 text-ink-sub">
            <p>서울 서초구 올림픽대로 2085-14 세빛섬</p>
            <p>
              전화{" "}
              <a href="tel:+82-2-537-2440" className="text-ink underline-offset-4 hover:underline">
                02-537-2440
              </a>
            </p>
            <p>
              이메일{" "}
              <a
                href="mailto:ficonvention@gmail.com"
                className="text-ink underline-offset-4 hover:underline"
              >
                ficonvention@gmail.com
              </a>
            </p>
            <p className="text-sm text-ink-muted">
              고속터미널에서 셔틀 운행, 주차 800대 이상. 대형버스 주차 가능.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">패밀리 브랜드</p>
            <ul className="flex flex-wrap gap-3">
              {partnerLinks.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-line-dark hover:text-primary"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
