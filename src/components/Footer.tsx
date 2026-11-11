import Image from "next/image";
import { siteConfig } from "@config";
import { i18n } from "@/i18n";
import { INSTAGRAM } from "@/lib/instagram";

export default async function Footer() {
  const { t } = await i18n();
  const brands = Object.entries(t.about.partnerNames)
    .map(([key, name]) => ({ name, href: siteConfig.links[key] }))
    .filter((l) => Boolean(l.href));
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page grid gap-8 pt-10 text-xs text-ink-muted sm:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">{t.about.partners}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {brands.map((l) => (
              <li key={l.name}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Instagram</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {INSTAGRAM.map((id) => (
              <li key={id}>
                <a href={`https://www.instagram.com/${id}/`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  @{id}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-page flex flex-col gap-2 py-10 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <Image src="/images/logo-white.png" alt={siteConfig.company.name} width={544} height={518} className="h-10 w-auto shrink-0 self-start opacity-80" style={{ width: "auto" }} />
        <div className="flex flex-col gap-1 sm:items-end">
          <p>
            <a href={`tel:${siteConfig.contact.phoneIntl}`} className="hover:text-primary">{siteConfig.contact.phone}</a>
            {" · "}
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">{siteConfig.contact.email}</a>
            {" · "}
            <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-primary">WhatsApp {siteConfig.contact.whatsappDisplay}</a>
          </p>
          <p>© {new Date().getFullYear()} {siteConfig.company.name}</p>
        </div>
      </div>
    </footer>
  );
}
