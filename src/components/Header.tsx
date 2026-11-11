import Link from "next/link";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import LangSwitch from "@/components/LangSwitch";

export default async function Header() {
  const { lang, t } = await i18n();
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-bold tracking-[0.18em] text-primary">
          {siteConfig.company.name}
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-sm text-ink-sub">
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
