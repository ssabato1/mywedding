import type { Metadata } from "next";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import ImageSlot from "@/components/ImageSlot";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await i18n();
  return { title: t.convention.title };
}

export default async function ConventionWeddingPage() {
  const { t } = await i18n();
  return (
    <div className="pb-16">
      <section className="container-page py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">{siteConfig.company.name}</p>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
              {t.convention.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-sub">{t.convention.body}</p>
          </div>
          <ImageSlot ratio="3/4" label={t.convention.title} src="/images/convention-wedding-01.jpg" />
        </div>
      </section>
    </div>
  );
}
