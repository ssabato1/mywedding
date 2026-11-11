import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await i18n();
  return {
    title: {
      default: `${siteConfig.company.name} — ${t.company.tagline}`,
      template: `%s | ${siteConfig.company.name}`,
    },
    description: t.company.description,
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
