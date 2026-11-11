import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import QuoteForm from "@/components/QuoteForm";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await i18n();
  return { title: t.contact.title };
}

export default async function ContactPage() {
  const { t, lang } = await i18n();
  const c = t.contact;
  const k = siteConfig.contact;
  return (
    <div className="pb-16">
      <div className="container-page py-24">
        <p className="eyebrow mb-4">{siteConfig.company.name}</p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-gold sm:text-5xl">{c.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-sub">{c.intro}</p>
      </div>

      <section className="container-page border-t border-line py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <aside className="space-y-6 lg:col-span-2">
            <div className="rounded-card border border-line bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{c.phoneLabel}</p>
              <a href={`tel:${k.phoneIntl}`} className="mt-1 block font-display text-2xl text-gold hover:text-gold-dark">{k.phone}</a>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-muted">{c.emailLabel}</p>
              <a href={`mailto:${k.email}`} className="mt-1 block text-lg text-ink hover:text-gold">{k.email}</a>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-muted">{c.whatsappLabel}</p>
              <a href={`https://wa.me/${k.whatsapp}`} target="_blank" rel="noreferrer" className="mt-1 block text-lg text-ink hover:text-gold">
                {k.whatsappDisplay}
              </a>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-muted">{c.hoursLabel}</p>
              <p className="mt-1 text-sm text-ink-sub">{c.hours}</p>
            </div>
            <div className="rounded-card border border-line bg-card p-6 text-sm text-ink-sub">
              <p>{t.about.address}</p>
            </div>
            <figure className="m-0">
              <Image
                src="/images/bridal-room-flower-board.jpg"
                alt={c.flowerBoardCaption}
                width={730}
                height={919}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full rounded-card border border-line"
              />
              <figcaption className="mt-2 font-sans text-[13px] leading-snug text-ink-muted">{c.flowerBoardCaption}</figcaption>
            </figure>
          </aside>

          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl font-semibold text-gold sm:text-3xl">{c.formTitle}</h2>
            <p className="mt-3 mb-8 text-ink-sub">{c.formIntro}</p>
            <QuoteForm f={c.f} lang={lang} />
          </div>
        </div>
      </section>
    </div>
  );
}
