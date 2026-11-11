import type { Metadata } from "next";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import Image from "next/image";
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
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <ImageSlot ratio="3/4" label={t.convention.title} src="/images/convention-wedding-01.jpg" />
          <ImageSlot ratio="3/4" label={t.convention.subcutLabel} src="/images/night-candle-petals.jpg" />
        </div>
      </section>

      <section className="container-page border-t border-line py-16">
        <h2 className="font-display text-2xl font-semibold text-gold sm:text-3xl">{t.convention.flowerTitle}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-sub">{t.convention.flowerBody}</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {["blue-hydrangea", "purple-aisle", "something-blue", "lavender-dream"].map((name, i) => (
            <li key={name} className="overflow-hidden rounded-card border border-line">
              <Image
                src={`/images/convention-flower-${name}.jpg`}
                alt={t.convention.flowerAlts[i]}
                width={1080}
                height={1350}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
