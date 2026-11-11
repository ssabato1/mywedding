import Image from "next/image";

/**
 * 룩북·비주얼 이미지 자리.
 * 사진 위에 글씨를 올리지 않고, 캡션(산세리프·작은 글씨)을 사진 아래에 둡니다.
 * caption={false} 로 캡션을 숨길 수 있습니다 (alt 로는 계속 사용).
 */
export default function ImageSlot({
  ratio = "4/5",
  label = "이미지",
  src = "/images/magma-lookbook.png",
  className = "",
  caption = true,
}: {
  ratio?: string;
  label?: string;
  src?: string;
  className?: string;
  caption?: boolean;
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <div
        className="relative overflow-hidden rounded-card border border-line bg-card"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={label}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </div>
      {caption && label && (
        <figcaption className="mt-2 font-sans text-[13px] leading-snug text-ink-muted">{label}</figcaption>
      )}
    </figure>
  );
}
