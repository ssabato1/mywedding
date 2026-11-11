"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** 상단 메뉴. 지금 보고 있는 페이지의 메뉴 글씨를 골드로 표시합니다. */
export default function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap justify-end gap-x-3 gap-y-1 whitespace-nowrap text-xs text-ink-sub sm:gap-6 sm:text-sm">
      {items.map((it) => {
        const active = pathname === it.href || pathname.startsWith(`${it.href}/`);
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? "page" : undefined}
            className={active ? "font-semibold text-gold" : "transition-colors hover:text-gold"}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
