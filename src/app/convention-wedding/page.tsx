import type { Metadata } from "next";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await i18n();
  return { title: t.convention.title };
}

export default async function ConventionWeddingPage() {
  const { t } = await i18n();
  return (
    <div className="pb-16">
      <section className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          {t.convention.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-sub">{t.convention.body}</p>
      </section>
    </div>
  );
}
