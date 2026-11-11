import { siteConfig } from "@config";

/**
 * 6.3 「Bluekiwi 하네스 도구 소개 (SNS발행)」 확장 슬롯.
 * site.config.ts 의 cta.enabled 가 false 인 동안 아무것도 렌더하지 않습니다.
 * 실습에서 enabled 를 켜고 label·href 를 채우면 이 버튼이 살아납니다.
 */
export default function CtaSlot({ className = "", label }: { className?: string; label?: string }) {
  if (!siteConfig.cta.enabled) return null;
  return (
    <div className={className}>
      <a
        href={siteConfig.cta.href}
        className="inline-block rounded-ui bg-gold px-5 py-2.5 text-sm font-bold text-canvas hover:bg-gold-dark"
      >
        {label ?? siteConfig.cta.label}
      </a>
    </div>
  );
}
