/**
 * 자동 예상 견적 계산 — 플로팅아일랜드 컨벤션 / 마리나파크.
 * 단가 출처: 회사 제공 견적 예시 2건(고객 정보는 담지 않음).
 * 단가가 바뀌면 PRICING 값만 고치면 폼·메일·화면 견적이 함께 바뀝니다.
 * 확정 견적은 항상 담당자가 다시 확인합니다.
 */
export const PRICING = {
  convention: {
    minGuests: 1,
    coursePerGuest: 130_000, // Wedding Course (Buffet)
    drinkPerGuestWeekday: 1_000, // Free Drink: soft drink + juice + beer
    drinkPerGuestStandard: 1_000,
    venueFee: 3_000_000, // 전관독점 사용료
    venueFeeWaivedOnWeekday: false,
    ceremony: 2_200_000, // 영상·조명연출·혼구용품·메뉴카드·웰컴드링크·플라워 세레모니·웨딩카·1부 전문사회
    flower: { standard: 8_000_000, luxury: 10_000_000, special: 12_000_000 },
    photo: 1_500_000, // 본식사진(2인 촬영) — 필수
    video: 800_000,
    winePerBottle: 60_000, // 하우스 와인 — 5인당 1병 기준
    guestsPerWineBottle: 5,
    champagne: 120_000,
    cake: 450_000,
    weekdayFreeExtras: false,
  },
  /** 세빛섬 5층 루프탑 가든 — 플로팅아일랜드 계약서 단가 준용(확인 전 임시) */
  rooftop: {
    minGuests: 1,
    coursePerGuest: 130_000, // Wedding Course (Buffet)
    drinkPerGuestWeekday: 1_000, // Free Drink: soft drink + juice + beer
    drinkPerGuestStandard: 1_000,
    venueFee: 3_000_000, // 전관독점 사용료
    venueFeeWaivedOnWeekday: false,
    ceremony: 2_200_000, // 영상·조명연출·혼구용품·메뉴카드·웰컴드링크·플라워 세레모니·웨딩카·1부 전문사회
    flower: { standard: 8_000_000, luxury: 10_000_000, special: 12_000_000 },
    photo: 1_500_000, // 본식사진(2인 촬영) — 필수
    video: 800_000,
    winePerBottle: 60_000, // 하우스 와인 — 5인당 1병 기준
    guestsPerWineBottle: 5,
    champagne: 120_000,
    cake: 450_000,
    weekdayFreeExtras: false,
  },
  marina: {
    minGuests: 50,
    coursePerGuest: 120_000, // Wedding Course (Western)
    drinkPerGuestWeekday: 12_000, // Free Drink: 와인·맥주·소프트드링크 — 평일 혜택가
    drinkPerGuestStandard: 15_000,
    venueFee: 3_000_000,
    venueFeeWaivedOnWeekday: true,
    ceremony: 2_000_000, // 음향·조명·웨딩 세팅·혼구용품·신부대기실
    flower: { standard: 7_000_000, luxury: 8_000_000, special: 9_000_000 },
    photo: 1_500_000,
    video: 800_000,
    winePerBottle: 0, // 프리 드링크에 포함
    guestsPerWineBottle: 0,
    champagne: 120_000,
    cake: 350_000,
    weekdayFreeExtras: true, // 평일: 샴페인·케이크 서비스
  },
  vatRate: 0.1,
  /** 신부대기실 플라워 커스터마이징(컬러 선택) — 100만원부터 */
  bridalRoomFlowerFrom: 1_000_000,
  /** 비수기(1·2·7·8월): 대관료 면제 + 식사비 할인 */
  offSeasonMonths: [1, 2, 7, 8],
  offSeasonMealDiscount: 0.1,
  /** 일요일: 대관료 면제 */
  sundayVenueFeeWaived: true,
} as const;

/** 식사 메뉴 등급표 (1인, 부가세 별도) — 2026 공식 메뉴표 기준 */
export const MENUS = [
  { key: "western-a", group: "western", ko: "양식 코스 A", en: "Western course A", price: 100_000 },
  { key: "western-b", group: "western", ko: "양식 코스 B", en: "Western course B", price: 110_000 },
  { key: "western-c", group: "western", ko: "양식 코스 C", en: "Western course C", price: 120_000 },
  { key: "western-d", group: "western", ko: "양식 코스 D", en: "Western course D", price: 130_000 },
  { key: "western-e", group: "western", ko: "양식 코스 E", en: "Western course E", price: 150_000 },
  { key: "western-f", group: "western", ko: "양식 코스 F", en: "Western course F", price: 180_000 },
  { key: "korean-a", group: "korean", ko: "한식 코스 A", en: "Korean course A", price: 110_000 },
  { key: "korean-b", group: "korean", ko: "한식 코스 B", en: "Korean course B", price: 130_000 },
  { key: "korean-c", group: "korean", ko: "한식 코스 C", en: "Korean course C", price: 150_000 },
  { key: "korean-d", group: "korean", ko: "한식 코스 D", en: "Korean course D", price: 170_000 },
  { key: "korean-e", group: "korean", ko: "한식 코스 E", en: "Korean course E", price: 180_000 },
  { key: "korean-f", group: "korean", ko: "한식 코스 F", en: "Korean course F", price: 200_000 },
  { key: "halal-a", group: "halal", ko: "할랄 코스 A", en: "Halal course A", price: 110_000 },
  { key: "halal-b", group: "halal", ko: "할랄 코스 B", en: "Halal course B", price: 130_000 },
  { key: "halal-c", group: "halal", ko: "할랄 코스 C", en: "Halal course C", price: 150_000 },
  { key: "halal-d", group: "halal", ko: "할랄 코스 D", en: "Halal course D", price: 170_000 },
  { key: "halal-e", group: "halal", ko: "할랄 코스 E", en: "Halal course E", price: 180_000 },
  { key: "halal-f", group: "halal", ko: "할랄 코스 F", en: "Halal course F", price: 200_000 },
  { key: "buffet-s", group: "buffet", ko: "뷔페 S", en: "Buffet S", price: 110_000 },
  { key: "buffet-a", group: "buffet", ko: "뷔페 A", en: "Buffet A", price: 130_000 },
  { key: "buffet-b", group: "buffet", ko: "뷔페 B", en: "Buffet B", price: 150_000 },
  { key: "buffet-c", group: "buffet", ko: "뷔페 C", en: "Buffet C", price: 180_000 },
] as const;
export const MENU_GROUPS = [
  { key: "western", ko: "양식 코스", en: "Western course" },
  { key: "korean", ko: "한식 코스", en: "Korean course" },
  { key: "halal", ko: "할랄 코스", en: "Halal course" },
  { key: "buffet", ko: "뷔페", en: "Buffet" },
] as const;
export const DEFAULT_MENU: Record<string, string> = { convention: "buffet-a", rooftop: "western-c", marina: "western-c" };

/** 공간별 예식 시작 시간 */
export const CEREMONY_TIMES: Record<string, string[]> = {
  convention: ["11:30", "15:00", "18:00"],
  rooftop: ["12:00", "18:00"],
  marina: ["12:00", "18:00"],
};

export type VenueKey = "convention" | "rooftop" | "marina";
export type FlowerTier = "standard" | "luxury" | "special";
export type Section = "fnb" | "venue" | "ceremony" | "flower" | "others";
export type EstimateLine = { section: Section; label: string; detail?: string; qty?: number; unit?: number; amount: number };
export type Estimate = {
  venue: VenueKey;
  guests: number;
  weekday: boolean | null;
  lines: EstimateLine[];
  subtotal: number;
  vat: number;
  total: number;
  notes: string[];
};
export type EstimateInput = {
  venueKey: string;
  guests: string;
  date: string;
  flower: string;
  menu?: string;
  video: boolean;
  wine: boolean;
  champagne: boolean;
  cake: boolean;
  bridalFlower?: boolean;
  lang: string;
};

export function isEstimableVenue(key: string): key is VenueKey {
  return key === "convention" || key === "rooftop" || key === "marina";
}

/** "2027-04-30" 같은 날짜에서 요일(0=일)과 월. 해석 못 하면 null. */
export function parseDate(date: string): { day: number; month: number } | null {
  const m = /(\d{4})\D+(\d{1,2})\D+(\d{1,2})/.exec(date);
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (Number.isNaN(d.getTime())) return null;
  return { day: d.getUTCDay(), month: d.getUTCMonth() + 1 };
}

const won = (n: number) => n.toLocaleString("ko-KR");
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export function estimate(input: EstimateInput): Estimate | null {
  if (!isEstimableVenue(input.venueKey)) return null;
  const venue = input.venueKey;
  const P = PRICING[venue];
  const en = input.lang === "en";
  const parsed = parseInt(input.guests.replace(/[^\d]/g, ""), 10);
  const hasGuests = Number.isFinite(parsed) && parsed > 0;
  const guests = Math.max(P.minGuests, hasGuests ? parsed : venue === "marina" ? 50 : venue === "rooftop" ? 100 : 200);
  const pd = parseDate(input.date);
  const weekday = pd ? pd.day >= 1 && pd.day <= 5 : null;
  const benefit = weekday === true;
  const sunday = pd?.day === 0;
  const offSeason = pd ? (PRICING.offSeasonMonths as readonly number[]).includes(pd.month) : false;
  const tier: FlowerTier = input.flower === "luxury" || input.flower === "special" ? input.flower : "standard";
  const drink = benefit ? P.drinkPerGuestWeekday : P.drinkPerGuestStandard;
  const feeWaivedReason = offSeason
    ? en ? "waived in Jan, Feb, Jul, Aug" : "1·2·7·8월 면제"
    : sunday && PRICING.sundayVenueFeeWaived
      ? en ? "waived on Sundays" : "일요일 면제"
      : benefit
        ? en ? "waived on weekdays" : "평일 예식 면제"
        : null;
  // 식사비 10% 할인: 평일 예식 또는 1·2·7·8월 (중복 적용 없음)
  const mealDiscountReason = offSeason
    ? en ? "Meal discount (Jan, Feb, Jul, Aug)" : "식사비 할인 (1·2·7·8월)"
    : benefit
      ? en ? "Meal discount (weekday wedding)" : "식사비 할인 (평일 예식)"
      : null;
  const feeWaived = feeWaivedReason !== null;
  const extrasFree = benefit && P.weekdayFreeExtras;
  const free = en ? "weekday benefit — complimentary" : "평일 혜택 서비스";

  const menu = MENUS.find((m) => m.key === input.menu) ?? MENUS.find((m) => m.key === DEFAULT_MENU[venue])!;
  const mealPerGuest: number = menu.price;
  const lines: EstimateLine[] = [
    {
      section: "fnb",
      label: `${en ? "Meal" : "식사"} — ${en ? menu.en : menu.ko}`,
      qty: guests,
      unit: mealPerGuest,
      amount: mealPerGuest * guests,
    },
    ...(mealDiscountReason
      ? [{
          section: "fnb" as const,
          label: mealDiscountReason,
          detail: `−${PRICING.offSeasonMealDiscount * 100}%`,
          amount: -Math.round(mealPerGuest * guests * PRICING.offSeasonMealDiscount),
        }]
      : []),
    {
      section: "fnb",
      qty: guests,
      unit: drink,
      label:
        venue !== "marina"
          ? en ? "Free drink (soft drinks, juice, beer)" : "프리 드링크 (소프트드링크·주스·맥주)"
          : en ? "Free drink (wine, beer, soft drinks)" : "프리 드링크 (와인·맥주·소프트드링크)",
      amount: drink * guests,
    },
  ];
  if (input.wine && P.winePerBottle > 0) {
    const bottles = Math.ceil(guests / P.guestsPerWineBottle);
    lines.push({
      section: "fnb",
      label: en ? "House wine" : "하우스 와인",
      qty: bottles,
      unit: P.winePerBottle,
      detail: en ? "1 bottle per 5 guests" : "5인당 1병",
      amount: P.winePerBottle * bottles,
    });
  }
  if (input.champagne) {
    lines.push({ section: "fnb", qty: 1, unit: P.champagne, label: en ? "Champagne for the toast" : "건배용 샴페인", detail: extrasFree ? free : undefined, amount: extrasFree ? 0 : P.champagne });
  }
  if (input.cake) {
    lines.push({ section: "fnb", qty: 1, unit: P.cake, label: en ? "Wedding cake" : "웨딩 케이크", detail: extrasFree ? free : undefined, amount: extrasFree ? 0 : P.cake });
  }
  lines.push(
    {
      section: "venue",
      unit: P.venueFee,
      label: en ? "Exclusive venue fee" : "전관 독점 사용료 (대관료)",
      detail: feeWaivedReason ?? undefined,
      amount: feeWaived ? 0 : P.venueFee,
    },
    { section: "ceremony", label: en ? "Wedding ceremony package" : "웨딩 세레모니 (연출·세팅)", amount: P.ceremony },
    { section: "flower", label: `${en ? "Flower decoration" : "플라워 데코레이션"} — ${cap(tier)}`, amount: P.flower[tier] },
    { section: "others", label: en ? "Ceremony photography (2 photographers)" : "본식 사진 (2인 촬영)", detail: en ? "required" : "필수", amount: P.photo },
  );
  if (input.bridalFlower) {
    lines.push({
      section: "flower",
      label: en ? "Bridal room flowers — custom colours" : "신부대기실 플라워 커스터마이징 (컬러 선택)",
      detail: en ? "from" : "부터",
      amount: PRICING.bridalRoomFlowerFrom,
    });
  }
  if (input.video) lines.push({ section: "others", label: en ? "Video" : "영상 촬영", detail: en ? "optional" : "선택", amount: P.video });

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const vat = Math.round(subtotal * PRICING.vatRate);
  const notes: string[] = [];
  if (!hasGuests) {
    notes.push(en ? `No guest count given — calculated for ${guests} guests.` : `하객 수가 없어 ${guests}명 기준으로 계산했습니다.`);
  } else if (parsed < P.minGuests) {
    notes.push(en ? `Calculated at the minimum guarantee of ${P.minGuests} guests.` : `최소 보증인원 ${P.minGuests}명 기준으로 계산했습니다.`);
  }
  if (venue === "rooftop") {
    notes.push(en ? "The rooftop garden estimate uses the Floating Island price list; your coordinator will confirm the rooftop figures." : "루프탑 가든 견적은 플로팅아일랜드 단가를 기준으로 계산했습니다. 루프탑 세부 금액은 담당자가 확인해 드립니다.");
  }
  if (venue === "marina") {
    if (weekday === null) {
      notes.push(en ? "No date given, so weekday benefits are not applied (venue fee waived, drinks at the weekday rate, cake and champagne complimentary)." : "날짜가 없어 평일 혜택(대관료 면제, 프리 드링크 평일가, 케이크·샴페인 서비스)을 적용하지 않았습니다.");
    } else if (benefit) {
      notes.push(en ? "Weekday benefits applied." : "평일 혜택을 적용했습니다.");
    }
  }
  if (!pd) {
    notes.push(en ? "Choose a date to apply date-based benefits: venue fee waived on weekdays, Sundays and in Jan, Feb, Jul and Aug; 10% off the meal on weekdays and in those months." : "날짜를 고르면 날짜별 혜택이 적용됩니다: 평일·일요일·1·2·7·8월은 대관료 면제, 평일과 1·2·7·8월은 식사비 10% 할인.");
  }
  notes.push(
    en
      ? "This is an automatic estimate. The final quote is confirmed by your coordinator and may change with date, menu and options."
      : "자동 계산한 예상 견적입니다. 확정 견적은 날짜·메뉴·옵션에 따라 담당자가 확인해 드립니다.",
  );
  return { venue, guests, weekday, lines, subtotal, vat, total: subtotal + vat, notes };
}

export function estimateToText(e: Estimate): string {
  return [
    `[셀프 견적서 — ${e.venue === "marina" ? "마리나파크 웨딩" : e.venue === "rooftop" ? "루프탑 가든 웨딩" : "플로팅아일랜드 컨벤션"}, ${e.guests}명]`,
    ...e.lines.map((l) => `- ${l.label}${l.qty && l.unit ? ` (${won(l.unit)} × ${l.qty})` : ""}${l.detail ? ` (${l.detail})` : ""}: ${won(l.amount)}원`),
    `소계: ${won(e.subtotal)}원 / 부가세: ${won(e.vat)}원 / 합계: ${won(e.total)}원`,
  ].join("\n");
}
