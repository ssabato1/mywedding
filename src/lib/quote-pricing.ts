/**
 * 자동 예상 견적 계산 — 플로팅아일랜드 컨벤션 / 마리나파크.
 * 단가 출처: 회사 제공 견적 예시 2건(고객 정보는 담지 않음).
 * 단가가 바뀌면 PRICING 값만 고치면 폼·메일·화면 견적이 함께 바뀝니다.
 * 확정 견적은 항상 담당자가 다시 확인합니다.
 */
export const PRICING = {
  convention: {
    minGuests: 300,
    coursePerGuest: 130_000, // Wedding Course C
    drinkPerGuestWeekday: 15_000, // 프리 드링크: 맥주·주스·콜라·사이다
    drinkPerGuestStandard: 15_000,
    venueFee: 3_000_000, // 전관독점 사용료
    venueFeeWaivedOnWeekday: false,
    ceremony: 2_200_000, // 영상·조명연출·혼구용품·메뉴카드·웰컴드링크·플라워 세레모니·웨딩카·1부 전문사회
    flower: { standard: 8_000_000, luxury: 10_000_000, special: 12_000_000 },
    photo: 1_500_000, // 본식사진(2인 촬영) — 필수
    video: 800_000,
    winePerBottle: 70_000, // 하우스 와인(프랑스산) — 5인당 1병 기준
    guestsPerWineBottle: 5,
    champagne: 120_000,
    cake: 450_000,
    weekdayFreeExtras: false,
  },
  /** 세빛섬 5층 루프탑 가든 — 단가는 컨벤션과 동일, 최소 보증인원 100명 */
  rooftop: {
    minGuests: 100,
    coursePerGuest: 130_000, // Wedding Course C
    drinkPerGuestWeekday: 15_000, // 프리 드링크: 맥주·주스·콜라·사이다
    drinkPerGuestStandard: 15_000,
    venueFee: 3_000_000, // 전관독점 사용료
    venueFeeWaivedOnWeekday: false,
    ceremony: 2_200_000, // 영상·조명연출·혼구용품·메뉴카드·웰컴드링크·플라워 세레모니·웨딩카·1부 전문사회
    flower: { standard: 8_000_000, luxury: 10_000_000, special: 12_000_000 },
    photo: 1_500_000, // 본식사진(2인 촬영) — 필수
    video: 800_000,
    winePerBottle: 70_000, // 하우스 와인(프랑스산) — 5인당 1병 기준
    guestsPerWineBottle: 5,
    champagne: 120_000,
    cake: 450_000,
    weekdayFreeExtras: false,
  },
  marina: {
    minGuests: 50,
    coursePerGuest: 130_000, // Wedding Course C
    drinkPerGuestWeekday: 15_000, // Free Drink: 와인·맥주·소프트드링크
    drinkPerGuestStandard: 15_000,
    venueFee: 3_000_000,
    venueFeeWaivedOnWeekday: true,
    ceremony: 2_000_000, // 음향·조명·웨딩 세팅·혼구용품·신부대기실
    flower: { standard: 8_000_000, luxury: 10_000_000, special: 12_000_000 },
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
  /** 잔치국수·떡 — 1인당 */
  noodlesPerGuest: 3_000,
  /** 애프터 파티 카나페 — 1인당 */
  canapePerGuest: { "30": 30_000, "50": 50_000, "70": 70_000, "90": 90_000 } as Record<string, number>,
  riceCakePerGuest: 3_000,
  /** 사회자 · 연주 */
  mc: { part1: 200_000, both: 300_000 },
  maleQuartet: 600_000,
  stringQuartet: 600_000,
  /** 부케 */
  bouquet: 200_000,
  /** 비수기(1·2·7·8월): 대관료 면제 + 식사비 할인 */
  offSeasonMonths: [1, 2, 7, 8],
  offSeasonMealDiscount: 0.1,
  /** 일요일: 대관료 면제 */
  sundayVenueFeeWaived: true,
  /** 마리나파크는 일요일 예식 100명 이상일 때 대관료 면제 */
  marinaSundayWaiverMinGuests: 100,
  /** 대관료를 뺀 견적 소계(부가세 별도)가 이 금액을 넘으면 대관료 면제 */
  venueFeeWaivedOver: 50_000_000,
  /** 마리나파크는 3,000만원 이상이면 면제 */
  venueFeeWaivedFromMarina: 30_000_000,
  /** 마리나파크 일요일 저녁 예식: 음료·주류를 뺀 총 비용이 이 금액 이상이면 음료·주류 무료 */
  sundayEveningDrinksFreeFrom: 20_000_000,
} as const;

/** 식사 메뉴 등급표 (1인, 부가세 별도) — 2026 공식 메뉴표 기준 */
export const MENUS = [
  { key: "western-a", group: "western", ko: "양식 코스 A", en: "Western course A", price: 100_000 },
  { key: "western-b", group: "western", ko: "양식 코스 B", en: "Western course B", price: 110_000 },
  { key: "western-c", group: "western", ko: "양식 코스 C", en: "Western course C", price: 130_000 },
  { key: "western-d", group: "western", ko: "양식 코스 D", en: "Western course D", price: 150_000 },
  { key: "western-e", group: "western", ko: "양식 코스 E", en: "Western course E", price: 180_000 },
  { key: "korean-a", group: "korean", ko: "한식 코스 A", en: "Korean course A", price: 100_000 },
  { key: "korean-b", group: "korean", ko: "한식 코스 B", en: "Korean course B", price: 110_000 },
  { key: "korean-c", group: "korean", ko: "한식 코스 C", en: "Korean course C", price: 130_000 },
  { key: "korean-d", group: "korean", ko: "한식 코스 D", en: "Korean course D", price: 150_000 },
  { key: "korean-e", group: "korean", ko: "한식 코스 E", en: "Korean course E", price: 180_000 },
  { key: "halal-a", group: "halal", ko: "할랄 코스 A", en: "Halal course A", price: 100_000 },
  { key: "halal-b", group: "halal", ko: "할랄 코스 B", en: "Halal course B", price: 110_000 },
  { key: "halal-c", group: "halal", ko: "할랄 코스 C", en: "Halal course C", price: 130_000 },
  { key: "halal-d", group: "halal", ko: "할랄 코스 D", en: "Halal course D", price: 150_000 },
  { key: "halal-e", group: "halal", ko: "할랄 코스 E", en: "Halal course E", price: 180_000 },
  { key: "vegetarian-a", group: "vegetarian", ko: "베지테리언 코스 A", en: "Vegetarian course A", price: 100_000 },
  { key: "vegetarian-b", group: "vegetarian", ko: "베지테리언 코스 B", en: "Vegetarian course B", price: 110_000 },
  { key: "vegetarian-c", group: "vegetarian", ko: "베지테리언 코스 C", en: "Vegetarian course C", price: 130_000 },
  { key: "vegetarian-d", group: "vegetarian", ko: "베지테리언 코스 D", en: "Vegetarian course D", price: 150_000 },
  { key: "vegetarian-e", group: "vegetarian", ko: "베지테리언 코스 E", en: "Vegetarian course E", price: 180_000 },
  { key: "fish-a", group: "fish", ko: "피시 코스 A", en: "Fish course A", price: 100_000 },
  { key: "fish-b", group: "fish", ko: "피시 코스 B", en: "Fish course B", price: 110_000 },
  { key: "fish-c", group: "fish", ko: "피시 코스 C", en: "Fish course C", price: 130_000 },
  { key: "fish-d", group: "fish", ko: "피시 코스 D", en: "Fish course D", price: 150_000 },
  { key: "fish-e", group: "fish", ko: "피시 코스 E", en: "Fish course E", price: 180_000 },
];
export const MENU_GROUPS = [
  { key: "western", ko: "양식 코스", en: "Western course" },
  { key: "korean", ko: "한식 코스", en: "Korean course" },
  { key: "halal", ko: "할랄 코스", en: "Halal course" },
  { key: "vegetarian", ko: "베지테리언 코스", en: "Vegetarian course" },
  { key: "fish", ko: "피시 코스", en: "Fish course" },
];
export const DEFAULT_MENU: Record<string, string> = { convention: "western-a", rooftop: "western-a", marina: "western-a" };

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
  time?: string;
  flower: string;
  menu?: string;
  video: boolean;
  wine: boolean;
  champagne: boolean;
  cake: boolean;
  bridalFlower?: boolean;
  bouquet?: boolean;
  mc?: string;
  maleQuartet?: boolean;
  stringQuartet?: boolean;
  drink?: boolean;
  noodles?: boolean;
  canape?: string;
  afterGuests?: string;
  riceCake?: boolean;
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

/**
 * 컨벤션 1·2·7·8월 일요일 저녁 6시 예식 특전: 최소 보증인원 250명, 웨딩연출료 면제.
 */
export const SUNDAY_EVENING = { months: [1, 2, 7, 8], time: "18:00", minGuests: 250 } as const;
export function isSundayEveningPromo(venueKey: string, date: string, time?: string): boolean {
  if (venueKey !== "convention" || !(time ?? "").startsWith(SUNDAY_EVENING.time)) return false;
  const pd = parseDate(date);
  return !!pd && pd.day === 0 && (SUNDAY_EVENING.months as readonly number[]).includes(pd.month);
}
export function minGuestsFor(venueKey: VenueKey, date: string, time?: string): number {
  return isSundayEveningPromo(venueKey, date, time) ? SUNDAY_EVENING.minGuests : PRICING[venueKey].minGuests;
}

/** 내려받는 파일 이름 — 예식 희망일을 앞에 둔다 */
export function quoteFileName(date: string, lang: string, venueKey = ""): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : lang === "en" ? "date-tbd" : "날짜미정";
  const marina = venueKey === "marina";
  return lang === "en"
    ? `${d}-${marina ? "marina-park" : "floating-island"}-wedding-quotation.xlsx`
    : `${d}-${marina ? "마리나파크" : "플로팅아일랜드"}-웨딩-견적서.xlsx`;
}

/**
 * 답변 메일·견적서 언어 정하기: 이름에 한글이 있으면 국문, 이름이 영문이거나 전화번호가 해외 번호이면 영문.
 * 판단할 수 없으면 고객이 보던 화면의 언어를 따른다.
 */
export function detectQuoteLang(groom: string, bride: string, phone: string, siteLang: string): "ko" | "en" {
  const names = `${groom}${bride}`;
  if (/[\uAC00-\uD7A3]/.test(names)) return "ko";
  const p = phone.replace(/[\s().-]/g, "");
  const foreignPhone = (/^\+/.test(p) && !/^\+82/.test(p)) || (/^00/.test(p) && !/^0082/.test(p));
  if (/[A-Za-z]/.test(names) || foreignPhone) return "en";
  return siteLang === "en" ? "en" : "ko";
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
  const promo = isSundayEveningPromo(venue, input.date, input.time);
  const minGuests = minGuestsFor(venue, input.date, input.time);
  const guests = Math.max(minGuests, hasGuests ? parsed : minGuests);
  const pd = parseDate(input.date);
  const weekday = pd ? pd.day >= 1 && pd.day <= 5 : null;
  const benefit = weekday === true;
  const sunday = pd?.day === 0;
  const offSeason = pd ? (PRICING.offSeasonMonths as readonly number[]).includes(pd.month) : false;
  const tier: FlowerTier = input.flower === "luxury" || input.flower === "special" ? input.flower : "standard";
  const drink = benefit ? P.drinkPerGuestWeekday : P.drinkPerGuestStandard;
  const feeWaivedReason = offSeason
    ? en ? "waived in Jan, Feb, Jul, Aug" : "1·2·7·8월 면제"
    : sunday && PRICING.sundayVenueFeeWaived && (venue !== "marina" || guests >= PRICING.marinaSundayWaiverMinGuests)
      ? venue === "marina"
        ? en ? "waived on Sundays, 100 guests or more" : "일요일 100명 이상 면제"
        : en ? "waived on Sundays" : "일요일 면제"
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
  // 모든 일요일 저녁(18:00) 예식: 웨딩 케이크·건배용 샴페인 무료
  const sundayEvening = sunday && (input.time ?? "").startsWith("18:00");
  const extrasFree = (benefit && P.weekdayFreeExtras) || sundayEvening;
  const free = sundayEvening
    ? en ? "Sunday evening — complimentary" : "일요일 저녁 예식 무료"
    : en ? "weekday benefit — complimentary" : "평일 혜택 서비스";

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
    ...(input.drink === false ? [] : [{
      section: "fnb" as const,
      qty: guests,
      unit: drink,
      label:
        venue !== "marina"
          ? en ? "Free drink (beer, juice, cola, lemon-lime soda)" : "프리 드링크 (맥주·주스·콜라·사이다)"
          : en ? "Free drink (wine, beer, soft drinks)" : "프리 드링크 (와인·맥주·소프트드링크)",
      amount: drink * guests,
    }]),
  ];
  const canapeUnit = PRICING.canapePerGuest[input.canape ?? ""];
  if (canapeUnit) {
    const ag = parseInt((input.afterGuests ?? "").replace(/[^\d]/g, ""), 10);
    const afterQty = Number.isFinite(ag) && ag > 0 ? ag : guests;
    lines.push({ section: "fnb", label: en ? "After-party canapés" : "애프터 파티 카나페", qty: afterQty, unit: canapeUnit, detail: en ? "optional" : "선택", amount: canapeUnit * afterQty });
  }
  if (input.noodles) lines.push({ section: "fnb", label: en ? "Wedding noodle" : "잔치국수", qty: guests, unit: PRICING.noodlesPerGuest, amount: PRICING.noodlesPerGuest * guests });
  if (input.riceCake) lines.push({ section: "fnb", label: en ? "Korean rice cake" : "떡", qty: guests, unit: PRICING.riceCakePerGuest, amount: PRICING.riceCakePerGuest * guests });
  if (input.wine && P.winePerBottle > 0) {
    const bottles = Math.ceil(guests / P.guestsPerWineBottle);
    lines.push({
      section: "fnb",
      label: en ? "House wine (French)" : "하우스 와인 (프랑스산)",
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
    { section: "ceremony", label: en ? "Wedding production (video, sound, lighting, hosting)" : "웨딩연출 (영상·음향·조명·진행)", detail: promo ? (en ? "waived — Sunday 18:00 in Jan, Feb, Jul, Aug" : "1·2·7·8월 일요일 저녁 6시 예식 면제") : undefined, amount: promo ? 0 : P.ceremony },
    { section: "flower", label: `${en ? "Flower decoration" : "플라워 장식"} — ${en ? cap(tier) : { standard: "스탠다드", luxury: "럭셔리", special: "스페셜" }[tier]}`, detail: tier === "special" ? (en ? "from" : "부터") : undefined, amount: P.flower[tier] },
    { section: "others", label: en ? "Photography — formal portraits and snapshots, 2 photographers, original files on CD" : "사진 — 원판·스냅, 2인 촬영, 원본 CD 포함", detail: en ? "required" : "필수", amount: P.photo },
  );
  if (input.bridalFlower) {
    lines.push({
      section: "flower",
      label: en ? "Bridal room flowers — custom colours" : "신부대기실 플라워 커스터마이징 (컬러 선택)",
      detail: en ? "from" : "부터",
      amount: PRICING.bridalRoomFlowerFrom,
    });
  }
  if (input.bouquet) lines.push({ section: "flower", label: en ? "Bridal bouquet" : "부케", amount: PRICING.bouquet });
  if (input.mc === "part1") lines.push({ section: "others", label: en ? "MC — part 1 (ceremony)" : "사회자 — 1부", detail: en ? "optional" : "선택", amount: PRICING.mc.part1 });
  if (input.mc === "both") lines.push({ section: "others", label: en ? "MC — parts 1 and 2" : "사회자 — 1부 + 2부", detail: en ? "optional" : "선택", amount: PRICING.mc.both });
  if (input.maleQuartet) lines.push({ section: "others", label: en ? "Male vocal quartet" : "남성 4중주", detail: en ? "optional" : "선택", amount: PRICING.maleQuartet });
  if (input.stringQuartet) lines.push({ section: "others", label: en ? "String quartet" : "현악 4중주", detail: en ? "optional" : "선택", amount: PRICING.stringQuartet });
  if (input.video) lines.push({ section: "others", label: en ? "Video" : "영상 촬영", detail: en ? "optional" : "선택", amount: P.video });

  // 마리나파크 일요일 저녁: 음료·주류와 대관료를 뺀 총 비용이 2,000만원 이상이면 음료·주류 무료
  const drinkLines = lines.filter((l) => /프리 드링크|Free drink|하우스 와인|House wine/.test(l.label));
  const baseForDrinks = lines.reduce((s, l) => s + (l.section === "venue" || drinkLines.includes(l) ? 0 : l.amount), 0);
  const drinksFree = venue === "marina" && sundayEvening && drinkLines.length > 0 && baseForDrinks >= PRICING.sundayEveningDrinksFreeFrom;
  if (drinksFree) for (const l of drinkLines) { l.amount = 0; l.detail = en ? "Sunday evening, KRW 20,000,000 or more — complimentary" : "일요일 저녁 2,000만원 이상 무료"; }
  // 총 비용 5,000만원 초과 시 대관료 면제 (대관료를 뺀 소계, 부가세 별도 기준)
  const feeLine = lines.find((l) => l.section === "venue");
  const beforeFee = lines.reduce((s, l) => s + (l === feeLine ? 0 : l.amount), 0);
  const waiveAt = venue === "marina" ? PRICING.venueFeeWaivedFromMarina : PRICING.venueFeeWaivedOver;
  const waiveLabel = venue === "marina" ? (en ? "KRW 30,000,000 or more" : "3,000만원 이상") : (en ? "over KRW 50,000,000" : "5,000만원 초과");
  const waivedByTotal = !!feeLine && feeLine.amount > 0 && (venue === "marina" ? beforeFee >= waiveAt : beforeFee > waiveAt);
  if (feeLine && waivedByTotal) {
    feeLine.amount = 0;
    feeLine.detail = en ? `waived — total ${waiveLabel}` : `총 비용 ${waiveLabel} 면제`;
  }
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const vat = Math.round(subtotal * PRICING.vatRate);
  const notes: string[] = [];
  if (drinksFree) notes.push(en ? "Sunday evening weddings of KRW 20,000,000 or more (excluding drinks, venue fee and VAT): drinks are complimentary." : "일요일 저녁 예식으로 총 비용(음료·주류·대관료·부가세 제외)이 2,000만원 이상이어서 음료·주류를 무료로 드립니다.");
  if (waivedByTotal) notes.push(en ? `The exclusive venue fee is waived because the total (excluding the venue fee and VAT) is ${waiveLabel}.` : `대관료를 제외한 총 비용(부가세 별도)이 ${waiveLabel}이어서 대관료를 면제했습니다.`);
  else if (feeLine && feeLine.amount > 0) notes.push(en ? `The exclusive venue fee is waived when the total (excluding the venue fee and VAT) is ${waiveLabel} — KRW ${won(Math.max(0, waiveAt - beforeFee))} more to go.` : `대관료를 제외한 총 비용(부가세 별도)이 ${waiveLabel}이면 대관료가 면제됩니다 — 현재 ${won(Math.max(0, waiveAt - beforeFee))}원 부족.`);
  if (!hasGuests) {
    notes.push(en ? `No guest count given — calculated for ${guests} guests.` : `하객 수가 없어 ${guests}명 기준으로 계산했습니다.`);
  } else if (parsed < minGuests) {
    notes.push(en ? `Calculated at the minimum guarantee of ${minGuests} guests.` : `최소 보증인원 ${minGuests}명 기준으로 계산했습니다.`);
  }
  if (sundayEvening && (input.cake || input.champagne)) notes.push(en ? "Sunday evening weddings: the wedding cake and champagne for the toast are complimentary." : "일요일 저녁 예식은 웨딩 케이크와 건배용 샴페인을 무료로 드립니다.");
  if (promo) {
    notes.push(en ? "Sunday 18:00 weddings in January, February, July and August: available from 250 guests, wedding production fee waived." : "1·2·7·8월 일요일 저녁 6시 예식 특전을 적용했습니다: 250명부터 가능, 웨딩연출료 면제.");
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
