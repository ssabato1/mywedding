import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import HeroMedia from "@/components/HeroMedia";
import CtaSlot from "@/components/CtaSlot";

export default async function Hero() {
  const { t } = await i18n();
  return (
    <section className="relative flex min-h-[100vh] items-start overflow-hidden">
      <HeroMedia />
      {/* 가독성 오버레이 */}
      <div className="absolute inset-0 -z-10 bg-black/25" />
      <div className="container-page flex min-h-[52vh] flex-col justify-center pt-10 pb-10 sm:min-h-[54vh] md:pt-[10vh]">
        <p className="mb-4 text-sm font-bold tracking-[0.2em] text-accent-light">
          {siteConfig.company.name}
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-6xl">
          {t.company.tagline.split(/,\s*/).map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 ? "," : ""}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary/80">
          {t.company.description}
        </p>
        <CtaSlot className="mt-10" />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-primary/55">
        {t.hero.scroll}
      </div>
    </section>
  );
}
