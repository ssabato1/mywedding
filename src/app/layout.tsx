import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await i18n();
  const title = `${siteConfig.company.name} — ${t.company.tagline}`;
  const v = process.env;
  return {
    metadataBase: new URL("https://www.floatingislandwedding.com"),
    title: { default: title, template: `%s | ${siteConfig.company.name}` },
    description: t.company.description,
    keywords: ["플로팅아일랜드 웨딩", "플로팅아일랜드웨딩", "세빛섬 웨딩", "세빛섬웨딩", "세빛섬 결혼식", "마리나파크 웨딩", "한강 웨딩", "한강 야외 웨딩", "국제결혼 예식", "Floating Island Wedding", "Sevit Island wedding", "Marina Park wedding Seoul"],
    openGraph: {
      type: "website",
      siteName: siteConfig.company.name,
      title,
      description: t.company.description,
      url: "https://www.floatingislandwedding.com",
      locale: t.htmlLang === "en" ? "en_US" : "ko_KR",
      images: [{ url: "/images/hero-poster.jpg", alt: "세빛섬 플로팅아일랜드 야경" }],
    },
    twitter: { card: "summary_large_image", title, description: t.company.description, images: ["/images/hero-poster.jpg"] },
    // 검색엔진 소유 확인 코드 — Vercel 환경변수에 넣으면 자동으로 들어갑니다.
    verification: {
      google: v.GOOGLE_SITE_VERIFICATION,
      other: {
        "naver-site-verification": v.NAVER_SITE_VERIFICATION || "5a55dc907062c1b6715acc1d5f02f0dc9a6a62a3",
      },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { t } = await i18n();
  return (
    <html lang={t.htmlLang}>
      <head>
        {/* 블로그 서체: Noto Serif KR(제목)·Noto Sans KR(본문). 빌드는 시스템 폰트 스택으로 통과하고, 브라우저에서만 불러온다. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EventVenue",
              name: "Floating Island Wedding (플로팅아일랜드 웨딩 · 세빛섬 웨딩)",
              alternateName: ["플로팅아일랜드 웨딩", "세빛섬 웨딩", "마리나파크 웨딩", "Sevit Island Wedding"],
              url: "https://www.floatingislandwedding.com",
              image: "https://www.floatingislandwedding.com/images/hero-poster.jpg",
              telephone: siteConfig.contact.phoneIntl,
              email: siteConfig.contact.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "반포동 650 세빛섬",
                addressLocality: "서초구",
                addressRegion: "서울",
                addressCountry: "KR",
              },
              sameAs: Object.values(siteConfig.links),
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
