import { siteConfig } from "@config";

export default function Footer() {
  const links = Object.entries(siteConfig.links).filter(([, href]) => href);
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page flex flex-col gap-2 py-10 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display tracking-[0.18em] text-ink-sub">{siteConfig.company.name}</p>
        <div className="flex flex-wrap gap-4">
          {links.map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" className="hover:text-primary">
              {name}
            </a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} {siteConfig.company.name}</p>
      </div>
    </footer>
  );
}
