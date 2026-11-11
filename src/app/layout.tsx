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
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
