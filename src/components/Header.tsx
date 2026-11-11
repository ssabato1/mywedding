import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import NavLinks from "@/components/NavLinks";
import LangSwitch from "@/components/LangSwitch";

export default async function Header() {
  const { lang, t } = await i18n();
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="container-page flex min-h-[96px] items-center justify-between gap-3 py-3 sm:min-h-[108px]">
        <Link href="/" className="flex shrink-0 items-center" aria-label={siteConfig.company.name}>
          <Image
            src="/images/logo-white.png"
            alt={siteConfig.company.name}
            width={544}
            height={518}
            priority
            className="h-14 w-auto shrink-0 sm:h-[72px]"
            style={{ width: "auto" }}
          />
        </Link>
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <NavLinks
            items={[
              { href: "/about", label: t.nav.about },
              { href: "/convention-wedding", label: t.nav.convention },
              { href: "/outdoor-wedding", label: t.nav.outdoor },
              { href: "/blog", label: t.nav.blog },
              { href: "/contact", label: t.nav.contact },
            ]}
          />
          <LangSwitch current={lang} />
        </div>
      </div>
    </header>
  );
}
