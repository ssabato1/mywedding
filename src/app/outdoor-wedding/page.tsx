import type { Metadata } from "next";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await i18n();
  return { title: t.outdoor.title };
}

export default async function OutdoorWeddingPage() {
  const { t } = await i18n();
  const sections = [
    { ...t.outdoor.rooftop, href: siteConfig.links.floatingisland },
    { ...t.outdoor.marina, href: siteConfig.links.marinapark },
  ];
  return (
    <div className="pb-16">
      <div className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          {t.outdoor.title}
        </h1>
      </div>

      {sections.map((s) => (
        <section key={s.title} className="container-page border-t border-line py-16">
          <h2 className="max-w-3xl font-display text-3xl font-bold text-primary sm:text-4xl">{s.title}</h2>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-sub">
            {s.paras.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block text-sm font-semibold text-accent hover:text-primary"
          >
            {s.link}
          </a>
        </section>
      ))}
    </div>
  );
}
