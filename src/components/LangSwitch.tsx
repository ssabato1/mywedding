import type { Lang } from "@/i18n";

/** 헤더 오른쪽 끝 언어 전환 (KO | EN). 쿠키로 기억되어 다음 방문에도 유지된다. */
export default function LangSwitch({ current }: { current: Lang }) {
  const item = (lang: Lang, label: string) =>
    lang === current ? (
      <span aria-current="true" className="font-bold text-primary">{label}</span>
    ) : (
      <a href={`/api/lang?lang=${lang}`} className="text-ink-muted hover:text-primary">{label}</a>
    );
  return (
    <div className="flex items-center gap-2 text-xs tracking-[0.12em]" aria-label="Language">
      {item("ko", "KO")}
      <span className="text-line-dark">|</span>
      {item("en", "EN")}
    </div>
  );
}
