import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import ImageSlot from "@/components/ImageSlot";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await i18n();
  return { title: t.outdoor.title };
}

const CANAPE_GALLERY = [
  "/images/canape-reception-01.jpg",
  "/images/canape-reception-02.jpg",
  "/images/canape-reception-03.jpg",
  "/images/after-party-bar-01.jpg",
  "/images/after-party-canape-01.jpg",
  "/images/after-party-guests-01.jpg",
  "/images/after-party-guests-02.jpg",
  "/images/after-party-guests-03.jpg",
  "/images/after-party-bar-02.jpg",
];

const MARINA_GALLERY = [
  "/images/marinapark-ceremony-01.jpg",
  "/images/marinapark-ceremony-02.jpg",
  "/images/marinapark-ceremony-03.jpg",
  "/images/marinapark-ceremony-04.jpg",
  "/images/marinapark-ceremony-05.jpg",
];

export default async function OutdoorWeddingPage() {
  const { t } = await i18n();
  const o = t.outdoor;
  const sections = [
    { ...o.rooftop, href: siteConfig.links.floatingisland, image: "/images/sevit-rooftop-01.jpg", marina: false },
    { ...o.marina, href: siteConfig.links.marinapark, image: "/images/marinapark-garden-01.jpg", marina: true },
  ];
  return (
    <div className="pb-16">
      <div className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-gold sm:text-5xl">
          {o.title}
        </h1>
      </div>

      {sections.map((s) => (
        <section key={s.title} className="container-page border-t border-line py-16">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <h2 className="max-w-3xl font-display text-3xl font-semibold text-gold sm:text-4xl">{s.title}</h2>
              <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-sub">
                {s.paras.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block text-sm font-semibold text-gold hover:text-gold-dark"
              >
                {s.link}
              </a>
            </div>
            <ImageSlot ratio="3/2" label={s.title} src={s.image} />
          </div>

          {!s.marina && (
            <ul className="mt-12 grid gap-4 md:grid-cols-5">
              <li className="md:col-span-2">
                <ImageSlot ratio="2/3" label={o.rooftopGallery[0]} src="/images/sevit-garden-01.jpg" />
              </li>
              <li className="md:col-span-3">
                <ImageSlot ratio="3/2" label={o.rooftopGallery[1]} src="/images/sevit-garden-02.jpg" />
              </li>
            </ul>
          )}

          {!s.marina && (
            <div className="mt-16">
              <h3 className="font-display text-2xl font-semibold text-gold sm:text-3xl">{o.canape.title}</h3>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-sub">{o.canape.body}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CANAPE_GALLERY.map((src, i) => (
                  <li key={src}>
                    <ImageSlot ratio="3/2" label={o.canape.photos[i]} src={src} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {s.marina && (
            <>
              <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {MARINA_GALLERY.map((src, i) => (
                  <li key={src} className={i === 1 ? "lg:row-span-2" : undefined}>
                    <ImageSlot ratio={i === 1 ? "2/3" : "3/2"} label={o.marinaGallery[i]} src={src} />
                  </li>
                ))}
              </ul>

              <div className="mt-16 grid items-start gap-10 md:grid-cols-5">
                <div className="overflow-hidden rounded-card border border-line bg-card md:col-span-2">
                  <Image
                    src="/images/marinapark-after-party-flyer.jpg"
                    alt={o.marinaAfterParty.alt}
                    width={1254}
                    height={1254}
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl font-semibold text-gold sm:text-3xl">{o.marinaAfterParty.title}</h3>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-sub">{o.marinaAfterParty.body}</p>
                </div>
              </div>

              <div className="mt-16 grid items-start gap-10 md:grid-cols-5">
                <div className="md:order-2 md:col-span-2">
                  <div className="overflow-hidden rounded-card border border-line bg-card">
                    <Image
                      src="/images/marinapark-night-wedding-flyer.jpg"
                      alt={o.marinaNight.alt}
                      width={1414}
                      height={2000}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
                <div className="md:order-1 md:col-span-3">
                  <h3 className="font-display text-2xl font-semibold text-gold sm:text-3xl">{o.marinaNight.title}</h3>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-sub">{o.marinaNight.body}</p>
                </div>
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
}
