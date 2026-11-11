/**
 * 회사 정체성 단일 진실원천.
 * 6.1 실습: 헤르메스에게 이 파일을 여러분 회사로 바꿔 달라고 요청하는 것부터 시작합니다.
 * 색·글꼴은 이 파일이 아니라 DESIGN.md + src/styles/tokens.css 담당입니다 (6.5).
 */
export interface SiteConfig {
  company: { name: string; tagline: string; description: string };
  links: Record<string, string>;
  cta: { enabled: boolean; label: string; href: string };
  /** 홈 히어로 배경. video 가 있으면 영상, 없으면(null) poster 이미지로 렌더됩니다. */
  hero: { video: string | null; poster: string };
}

export const siteConfig: SiteConfig = {
  company: {
    name: "Floating Island Wedding",
    tagline: "한강 위에서, 세계의 결혼식을",
    description:
      "국제결혼과 해외 웨딩 트렌드, 예식 준비의 모든 것. 서울 한강 세빛섬에서 두 문화가 만나는 결혼식을 함께 준비합니다.",
  },
  links: {
    floatingisland: "https://www.floatingisland.co.kr",
    marinapark: "https://www.marinapark.co.kr",
    sposabella: "https://www.sposabella.co.kr",
    anniversaryflower: "https://www.anniversaryflower.co.kr",
    artmstudio: "https://artmstudiosounds.com",
    instagram: "https://instagram.com/marinaparkwedding",
    youtube: "https://youtube.com/@artmstudiosounds",
  },
  cta: {
    // 6.3 「Bluekiwi 하네스 도구 소개 (SNS발행)」에서 구현·활성화하는 확장 슬롯
    enabled: false,
    label: "",
    href: "",
  },
  hero: {
    // 6.5 「모션그래픽 생성 — 히어로 모션」 실습 슬롯.
    // 모션그래픽을 만들어 public/hero.mp4 로 저장한 뒤, 아래 video 를 "/hero.mp4" 로만 바꾸면
    // 홈 배경이 영상으로 바뀝니다 (HeroMedia.tsx 컴포넌트는 손대지 않습니다).
    // null 로 두면 poster 이미지로 완전히 동작합니다.
    video: null,
    poster: "/images/magma-hero-poster.png",
  },
};
