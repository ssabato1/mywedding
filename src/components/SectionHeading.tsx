import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  href,
  cta,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-display text-2xl font-semibold text-gold sm:text-3xl">{title}</h2>
      </div>
      {href && cta && (
        <Link href={href} className="shrink-0 text-sm text-ink-sub hover:text-primary">
          {cta}
        </Link>
      )}
    </div>
  );
}
