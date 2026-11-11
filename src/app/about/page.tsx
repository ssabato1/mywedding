import type { Metadata } from "next";
import { siteConfig } from "@config";
import { INSTAGRAM } from "@/lib/instagram";
import { i18n } from "@/i18n";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
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
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-gold sm:text-5xl">
          {t.company.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-sub">{t.company.description}</p>
      </section>

      {/* 유니크 베뉴 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.uniqueEyebrow} title={a.uniqueTitle} />
        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-5 text-lg leading-relaxed text-ink-sub md:col-span-3">
            {a.uniqueBody.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="overflow-hidden rounded-card border border-line bg-card md:col-span-2">
            <Image src="/images/sevit-unique-venue-flyer.jpg" alt={a.uniqueFlyer} width={1389} height={2000} sizes="(min-width: 768px) 40vw, 100vw" className="h-auto w-full" />
          </div>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "/images/sevit-dusk-01.jpg",
            "/images/hangang-sunset-01.jpg",
            "/images/sevit-night-02.jpg",
            "/images/sevit-night-03.jpg",
            "/images/sevit-chavit-night.jpg",
            "/images/sevit-day-01.jpg",
          ].map((src, i) => (
            <li key={src}>
              <ImageSlot ratio="3/2" label={a.uniqueGallery[i]} src={src} />
            </li>
          ))}
        </ul>
      </section>

      {/* 히스토리 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.historyEyebrow} title={a.historyTitle} />
        <div className="grid gap-8 md:grid-cols-2">
          <ol className="space-y-8">
            {a.history.map((h) => (
              <li key={h.title} className="flex gap-6 border-t border-line pt-6">
                <span className="w-28 shrink-0 font-display text-2xl font-semibold leading-tight text-gold-dark">
                  {h.year}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-gold">{h.title}</h3>
                  <p className="mt-1 text-ink-sub">{h.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="hidden space-y-6 md:block">
            <ImageSlot ratio="4/5" label={a.imageLabel} src="/images/hero-poster.jpg" />
            <ImageSlot ratio="3/2" label={a.conceptLabel} src="/images/sevit-concept-rendering.jpg" />
            <ImageSlot ratio="5/2" label={a.panoramaLabel} src="/images/sevit-night-panorama.jpg" />
          </div>
        </div>
      </section>

      {/* 한눈에 보는 플로팅아일랜드 (브로슈어 요약) */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.glanceEyebrow} title={a.glanceTitle} />
        <p className="-mt-4 mb-10 max-w-2xl text-lg leading-relaxed text-ink-sub">{a.glanceIntro}</p>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-card border border-line bg-card p-6">
            <h3 className="font-display text-lg font-semibold text-gold">{a.glanceLocationTitle}</h3>
            <dl className="mt-4 divide-y divide-line text-sm">
              {a.glanceLocationRows.map((r) => (
                <div key={r.label} className="flex justify-between gap-4 py-2">
                  <dt className="text-ink">{r.label}</dt>
                  <dd className="shrink-0 text-right text-ink-sub">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm font-semibold text-gold">{a.glanceParking}</p>
          </div>
          <div className="rounded-card border border-line bg-card p-6">
            <ImageSlot ratio="16/9" label={a.glanceFountainTitle} src="/images/rainbow-fountain-night.jpg" caption={false} className="mb-5" />
            <h3 className="font-display text-lg font-semibold text-gold">{a.glanceFountainTitle}</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-sub">
              {a.glanceFountainBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="rounded-card border border-line bg-card p-6">
            <h3 className="font-display text-lg font-semibold text-gold">{a.glanceSpacesTitle}</h3>
            <ul className="mt-4 space-y-4 text-sm">
              {a.glanceSpaces.map((s) => (
                <li key={s.name}>
                  <p className="font-semibold text-ink">{s.name}</p>
                  <p className="mt-1 leading-relaxed text-ink-sub">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 가치 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.valuesEyebrow} title={a.valuesTitle} />
        <div className="grid gap-6 sm:grid-cols-2">
          {a.values.map((v) => (
            <div key={v.name} className="rounded-card border border-line bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-gold">{v.name}</h3>
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
                <h3 className="font-display text-lg font-semibold text-gold">{s.name}</h3>
                <span className="text-xs text-ink-muted">{s.floor}</span>
              </div>
              <p className="mt-2 text-sm text-ink-sub">{s.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-5">
          <ImageSlot ratio="16/9" label={a.engagementLabel} src="/images/engagement-table-01.jpg" className="md:col-span-3" />
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-gold">{a.engagementTitle}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-sub">{a.engagementBody}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{a.engagementNote}</p>
          </div>
        </div>
        <div className="mt-14">
          <h3 className="font-display text-2xl font-semibold text-gold">{a.riveGaucheTitle}</h3>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-sub">{a.riveGaucheBody}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            <li><ImageSlot ratio="3/2" label={a.riveGaucheLabels[0]} src="/images/rive-gauche-small-wedding-01.jpg" /></li>
            <li><ImageSlot ratio="3/2" label={a.riveGaucheLabels[1]} src="/images/rive-gauche-small-wedding-02.jpg" /></li>
          </ul>
          <ImageSlot ratio="1242/1218" label={a.riveGaucheGreenery} src="/images/rive-gauche-greenery.jpg" className="mx-auto mt-6 max-w-2xl" />
        </div>
        <div className="mt-14 grid items-center gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-gold">{a.proposalTitle}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-sub">{a.proposalBody}</p>
          </div>
          <ImageSlot ratio="1046/751" label={a.proposalLabel} src="/images/proposal-sunset-01.jpg" className="md:col-span-3" />
        </div>
      </section>

      {/* MICE·컨벤션 소개 (회사 브로슈어) */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.brochureEyebrow} title={a.brochureTitle} />
        <p className="-mt-4 mb-10 max-w-2xl text-lg leading-relaxed text-ink-sub">{a.brochureIntro}</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {a.brochureStrengths.map((v) => (
            <div key={v.name} className="rounded-card border border-line bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-gold">{v.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-sub">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-semibold text-gold">{a.brochureHallTitle}</h3>
            <ul className="mt-5 space-y-3 text-ink-sub">
              {a.brochureHall.map((t) => (
                <li key={t} className="border-t border-line pt-3 leading-relaxed">{t}</li>
              ))}
            </ul>
            <h3 className="mt-10 font-display text-2xl font-semibold text-gold">{a.brochureServiceTitle}</h3>
            <ul className="mt-5 space-y-3 text-ink-sub">
              {a.brochureService.map((t) => (
                <li key={t} className="border-t border-line pt-3 leading-relaxed">{t}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <ImageSlot ratio="3/2" label={t.convention.grandLabel} src="/images/convention-wedding-02.jpg" />
            <div className="rounded-card border border-line bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-gold">{a.brochureEventsTitle}</h3>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-sub">
                {a.brochureEvents.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-semibold text-gold">{a.brochureMarinaTitle}</h3>
            <p className="mt-5 leading-relaxed text-ink-sub">{a.brochureMarinaBody}</p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {a.brochureMarinaCols.map((c) => (
                      <th key={c} className="border-b border-line-dark px-2 py-2 text-left font-semibold text-gold first:pl-0">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {a.brochureMarinaRows.map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, i) => (
                        <td key={i} className="border-b border-line px-2 py-2 text-ink-sub first:pl-0 first:text-ink">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-6">
            <ImageSlot ratio="3/2" label={t.outdoor.marinaPartyPhotos[1]} src="/images/marinapark-standing-party.jpg" />
            <div className="rounded-card border border-line bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-gold">{a.brochureMarinaEventsTitle}</h3>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-sub">
                {a.brochureMarinaEvents.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="container-page py-16">
        <SectionHeading eyebrow={a.accessEyebrow} title={a.accessTitle} />
        <p className="mb-8 max-w-2xl text-ink-sub">{a.accessIntro}</p>
        <ul className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {a.accessWays.map((w) => (
            <li key={w.title} className="rounded-card border border-line bg-card p-5">
              <h3 className="font-display text-lg font-semibold text-gold">{w.title}</h3>
              <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-sub">
                {w.lines.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="shrink-0 text-gold-dark">{i + 1}.</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
        <div className="mb-10 flex flex-wrap gap-3 text-sm">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Some+Sevit+650+Banpo-dong+Seocho-gu+Seoul"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-4 py-2 text-ink hover:border-line-dark hover:text-primary"
          >
            {a.mapLinks.google}
          </a>
          <a
            href="https://map.naver.com/p/search/%EC%84%B8%EB%B9%9B%EC%84%AC"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-4 py-2 text-ink hover:border-line-dark hover:text-primary"
          >
            {a.mapLinks.naver}
          </a>
          <a
            href="/docs/anniversary-arrival-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-4 py-2 text-ink hover:border-line-dark hover:text-primary"
          >
            {a.mapLinks.pdf}
          </a>
        </div>
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
            <p className="eyebrow mb-3 mt-8">Instagram</p>
            <ul className="flex flex-wrap gap-3">
              {INSTAGRAM.map((id) => (
                <li key={id}>
                  <a
                    href={`https://www.instagram.com/${id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-line-dark hover:text-primary"
                  >
                    @{id}
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
