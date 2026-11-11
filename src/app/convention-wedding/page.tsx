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
        <div className="grid items-center gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="eyebrow mb-4">{siteConfig.company.name}</p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-gold sm:text-5xl">
              {t.convention.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-sub">{t.convention.body}</p>
          </div>
          <ImageSlot ratio="3/2" label={t.convention.title} src="/images/convention-wedding-02.jpg" className="md:col-span-3" />
        </div>
      </section>

      <section className="container-page pb-8">
        <ImageSlot ratio="3/4" label={t.convention.title} src="/images/convention-wedding-01.jpg" className="mx-auto max-w-md" />
      </section>
    </div>
  );
}
