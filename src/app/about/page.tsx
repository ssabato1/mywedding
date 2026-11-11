import type { Metadata } from "next";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import SectionHeading from "@/components/SectionHeading";
import ImageSlot from "@/components/ImageSlot";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await i18n();
  return { title: t.about.title };
}

export default async function AboutPage() {
  const { t } = await i18n();
  const a = t.about;
  const partnerLinks = Object.entries(a.partnerNames)
    .map(([key, name]) => ({ name, href: siteConfig.links[key] }))
    .filter((l) => Boolean(l.href));

  return (
    <div className="pb-16">
      {/* 슬로건 */}
      <section className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          {t.company.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-sub">{t.company.description}</p>
      </section>

      {/* 히스토리 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.historyEyebrow} title={a.historyTitle} />
        <div className="grid gap-8 md:grid-cols-2">
          <ol className="space-y-8">
            {a.history.map((h) => (
              <li key={h.title} className="flex gap-6 border-t border-line pt-6">
                <span className="w-28 shrink-0 font-display text-2xl font-bold leading-tight text-accent">
                  {h.year}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{h.title}</h3>
                  <p className="mt-1 text-ink-sub">{h.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <ImageSlot ratio="4/5" label={a.imageLabel} src="/images/hero-poster.jpg" className="hidden md:flex" />
        </div>
      </section>

      {/* 가치 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.valuesEyebrow} title={a.valuesTitle} />
        <div className="grid gap-6 sm:grid-cols-2">
          {a.values.map((v) => (
            <div key={v.name} className="rounded-card border border-line bg-card p-6">
              <h3 className="font-display text-lg font-bold text-primary">{v.name}</h3>
              <p className="mt-2 text-ink-sub">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 공간 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.spacesEyebrow} title={a.spacesTitle} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {a.spaces.map((s) => (
            <li key={s.name} className="rounded-card border border-line bg-card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-ink">{s.name}</h3>
                <span className="text-xs text-ink-muted">{s.floor}</span>
              </div>
              <p className="mt-2 text-sm text-ink-sub">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 오시는 길 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.accessEyebrow} title={a.accessTitle} />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3 text-ink-sub">
            <p>{a.address}</p>
            <p>
              {a.phone}{" "}
              <a href="tel:+82-2-537-2440" className="text-ink underline-offset-4 hover:underline">
                02-537-2440
              </a>
            </p>
            <p>
              {a.email}{" "}
              <a href="mailto:ficonvention@gmail.com" className="text-ink underline-offset-4 hover:underline">
                ficonvention@gmail.com
              </a>
            </p>
            <p className="text-sm text-ink-muted">{a.accessNote}</p>
          </div>
          <div>
            <p className="eyebrow mb-3">{a.partners}</p>
            <ul className="flex flex-wrap gap-3">
              {partnerLinks.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-line-dark hover:text-primary"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
