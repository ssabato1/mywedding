import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import LangSwitch from "@/components/LangSwitch";

export default async function Header() {
  const { lang, t } = await i18n();
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="container-page flex min-h-[64px] items-center justify-between gap-3 py-2 sm:min-h-[72px]">
        <Link href="/" className="flex shrink-0 items-center" aria-label={siteConfig.company.name}>
          <Image
            src="/images/logo-white.png"
            alt={siteConfig.company.name}
            width={544}
            height={518}
            priority
            className="h-10 w-auto shrink-0 sm:h-12"
            style={{ width: "auto" }}
          />
        </Link>
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <nav className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-xs text-ink-sub sm:gap-6 sm:text-sm">
            <Link href="/about" className="hover:text-primary">{t.nav.about}</Link>
            <Link href="/convention-wedding" className="hover:text-primary">{t.nav.convention}</Link>
            <Link href="/outdoor-wedding" className="hover:text-primary">{t.nav.outdoor}</Link>
            <Link href="/blog" className="hover:text-primary">{t.nav.blog}</Link>
          </nav>
          <LangSwitch current={lang} />
        </div>
      </div>
    </header>
  );
}
