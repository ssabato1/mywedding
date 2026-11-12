import { unzip, zip } from "./zip";
import { QUOTE_TEMPLATES } from "./quote-template-b64";
import { estimate, wireAccount, accountNumber, MENUS, PRICING, type EstimateInput, type VenueKey } from "./quote-pricing";

/** 엑셀 견적서 양식을 쓰는 공간 (마리나파크는 회사명·주소·계좌가 다른 별도 양식) */
export const XLSX_VENUES = ["convention", "rooftop", "marina", "party"] as const;
export function usesXlsxTemplate(venueKey: string): boolean {
  return (XLSX_VENUES as readonly string[]).includes(venueKey);
}

export type QuoteSheetInfo = { groom?: string; bride?: string; phone?: string; date?: string; time?: string; account?: string; lang?: string };


const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

class Sheet {
  constructor(public xml: string) {}
  private re(ref: string) {
    return new RegExp(`<c r="${ref}"([^>]*?)(?:/>|>([\\s\\S]*?)</c>)`);
  }
  /**
   * 양식은 왼쪽에 여백 열(A)을 하나 두므로 실제 내용은 B~F 열에 있다.
   * 아래 코드는 내용 열을 A~E 로 부르고, 여기서 한 칸 오른쪽으로 옮겨 쓴다.
   */
  private shift(ref: string) {
    return String.fromCharCode(ref.charCodeAt(0) + 1) + ref.slice(1);
  }
  private put(logical: string, build: (style: string, inner: string) => string) {
    const ref = this.shift(logical);
    const re = this.re(ref);
    const m = re.exec(this.xml);
    if (!m) throw new Error(`quote-xlsx: cell ${ref} not found in template`);
    const style = /\ss="\d+"/.exec(m[1])?.[0] ?? "";
    this.xml = this.xml.replace(re, () => build(style, m[2] ?? ""));
  }
  /** 견적에 합산된 줄을 연한 갈색으로 칠한다 (양식에 미리 만들어 둔 음영 스타일로 교체) */
  shade(row: number, map: Record<string, string>) {
    for (const col of "BCDEF") {
      const ref = `${col}${row}`;
      const s = map[ref];
      if (s) this.xml = this.xml.replace(new RegExp(`(<c r="${ref}"[^>]*?\\ss=")\\d+(")`), `$1${s}$2`);
    }
  }
  num(logical: string, n: number | null) {
    const ref = this.shift(logical);
    this.put(logical, (s) => (n === null ? `<c r="${ref}"${s}/>` : `<c r="${ref}"${s}><v>${n}</v></c>`));
  }
  str(logical: string, text: string) {
    const ref = this.shift(logical);
    this.put(logical, (s) => `<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${esc(text)}</t></is></c>`);
  }
  /** 수식은 그대로 두고, 엑셀이 계산하지 않는 미리보기에서도 보이도록 계산값만 넣는다. */
  cached(logical: string, v: number | string) {
    const ref = this.shift(logical);
    this.put(logical, (s, inner) => {
      const f = /<f[^>]*\/>|<f[^>]*>[\s\S]*?<\/f>/.exec(inner)?.[0] ?? "";
      return typeof v === "number"
        ? `<c r="${ref}"${s}>${f}<v>${v}</v></c>`
        : `<c r="${ref}"${s} t="str">${f}<v>${esc(v)}</v></c>`;
    });
  }
}

/**
 * 고객이 고른 내용으로 견적서 양식을 채운 xlsx 를 만든다. 컨벤션·루프탑 가든 전용.
 * 견적에 합산된 줄만 연한 갈색으로 칠하고, 수식은 그대로 두되 계산값을 함께 넣는다.
 */
export function buildQuoteXlsx(input: EstimateInput, info: QuoteSheetInfo): Buffer | null {
  if (!usesXlsxTemplate(input.venueKey)) return null;
  const en = info.lang === "en";
  const eK = estimate({ ...input, lang: "ko" });
  const eL = estimate({ ...input, lang: en ? "en" : "ko" });
  if (!eK || !eL) return null;
  /** 한국어 라벨로 줄을 찾고, 표시는 요청 언어의 같은 줄에서 가져온다 */
  const line = (re: RegExp) => {
    const i = eK.lines.findIndex((l) => re.test(l.label));
    return i < 0 ? undefined : eL.lines[i];
  };
  const marina = input.venueKey === "marina";
  const tpl = QUOTE_TEMPLATES[`${marina ? "mp" : "fi"}-${en ? "en" : "ko"}`];
  const entries = unzip(Buffer.from(tpl.b64, "base64"));
  const sheetEntry = entries.find((x) => x.name === "xl/worksheets/sheet1.xml");
  if (!sheetEntry) return null;
  const sh = new Sheet(sheetEntry.data.toString("utf8"));
  const SHADE = tpl.shade;
  const g = eK.guests;
  const T = (ko: string, e: string) => (en ? e : ko);
  const tbd = T("미정", "to be decided");

  // ── 머리말: 신랑·신부 이름, 예식 일자, 원하는 시간대
  const names = [info.groom, info.bride].filter(Boolean).join(" · ");
  const [y, m, d] = (info.date ?? "").split("-");
  const hasDate = !!(y && m && d);
  const dateText = hasDate
    ? en
      ? new Date(Date.UTC(+y, +m - 1, +d)).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
      : `${y}년 ${+m}월 ${+d}일 (${"일월화수목금토"[new Date(Date.UTC(+y, +m - 1, +d)).getUTCDay()]})`
    : tbd;
  const party = input.venueKey === "party";
  const venueName = marina
    ? T("마리나파크 (반포한강공원 서래나루)", "Marina Park (Seoraenaru, Banpo Hangang Park)")
    : input.venueKey === "rooftop" ? T("세빛섬 5층 루프탑 가든", "Sevit Island 5F Rooftop Garden") : T("플로팅아일랜드 컨벤션홀", "Floating Island Convention Hall");
  // 웨딩파티(예식 없이 피로연만): 제목과 항목 이름을 파티용으로 바꾼다
  if (party) sh.str("A3", T("웨딩파티 견적서   ·   Floating Island Wedding", "Wedding Reception Quotation   ·   Floating Island Wedding"));
  const issued = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
  sh.str("A4", `${T("예식명", "Event")} :  ${names ? (party ? T(`${names} 님 웨딩파티`, `Wedding reception of ${names}`) : T(`${names} 님 예식`, `Wedding of ${names}`)) : ""}`);
  sh.str("D4", `${T("참석 예상 인원", "Expected guests")} :  ${Math.round(g * 1.1)}${T("명", "")}`);
  sh.str("A5", `${party ? T("파티 일시", "Date / time") : T("예식 일시", "Date / time")} :  ${dateText}${info.time ? `  ${info.time}` : `  (${T("시간 미정", "time to be decided")})`}`);
  sh.str("D5", `${T("지불 보증인원", "Guaranteed guests")} :  ${g}${T("명", "")}`);
  sh.str("A6", `${T("신랑", "Groom")} :  ${info.groom ?? ""}${info.phone ? `     ${T("연락처", "Phone")} :  ${info.phone}` : ""}`);
  sh.str("A7", `${T("신부", "Bride")} :  ${info.bride ?? ""}`);
  sh.str("D7", `${T("입금 계좌", "Wire transfer")} :  ${(en ? wireAccount(info.account, input.venueKey === "marina") : info.account) || T("담당자가 안내해 드립니다", "your coordinator will send it with the contract")}`);
  if (en) sh.str("A69", `Account no. :  ${accountNumber(info.account) || "your coordinator will send it with the contract"}`);
  sh.str("A8", `${T("행사 공간", "Venue")} :  ${venueName}`);
  sh.str("D8", `${T("견적일", "Date of issue")} :  ${issued}`);

  // ── 식음료 12~22행. 수량이 들어간 줄만 합산되고 칠해진다
  let fnb = 0;
  const fnbRow = (r: number, l: { qty?: number; unit?: number; amount: number; detail?: string } | undefined, remark?: string) => {
    if (!l) { sh.cached(`D${r}`, ""); return; }
    const free = l.amount === 0 && (l.unit ?? 0) > 0;
    sh.num(`B${r}`, l.qty ?? 1);
    sh.num(`C${r}`, free ? 0 : l.unit ?? 0);
    sh.cached(`D${r}`, l.amount);
    const note = [remark, free ? l.detail : undefined].filter(Boolean).join(" — ");
    if (note) sh.str(`E${r}`, note);
    fnb += l.amount;
    sh.shade(r, SHADE);
  };
  const menu = MENUS.find((x) => x.key === input.menu);
  const meal = line(/^식사 —/)!;
  fnbRow(12, meal, menu ? T(menu.ko, menu.en) : undefined);
  fnbRow(13, line(/^잔치국수/));
  fnbRow(14, line(/^떡/));
  for (const r of [15, 16, 17]) sh.cached(`D${r}`, "");
  fnbRow(18, line(/^프리 드링크/));
  fnbRow(19, line(/^하우스 와인/));
  fnbRow(20, line(/^건배용 샴페인/), T("건배용 샴페인", "Champagne for the toast"));
  fnbRow(21, line(/^웨딩 케이크/), T("플라워 데코레이션 웨딩 케이크", "Wedding cake with flower decoration"));
  fnbRow(22, line(/카나페/), T("1인당", "per guest"));
  sh.cached("D23", fnb);

  // ── 전관 사용료 · 웨딩 세레모니: 면제이면 금액 없이 사유만 적는다
  const single = (r: number, l: { amount: number; detail?: string }, baseNote?: string) => {
    if (l.amount > 0) { sh.num(`D${r}`, l.amount); sh.shade(r, SHADE); }
    const note = [baseNote, l.detail].filter(Boolean).join("  /  ");
    if (note) sh.str(`E${r}`, note);
    return l.amount;
  };
  const fee = single(26, line(/^전관 독점 사용료/)!);
  const ceremonyIdx = eK.lines.findIndex((l) => l.section === "ceremony");
  const ceremonyLine = ceremonyIdx < 0 ? { amount: 0 } : eL.lines[ceremonyIdx];
  sh.num("C29", PRICING[input.venueKey as VenueKey].ceremony);
  const ceremony = single(29, ceremonyLine, party
    ? T("예식 연출은 포함되지 않습니다 (예식 없이 피로연만)", "Wedding production is not included (reception only)")
    : marina
    ? T("음향 · 조명 · 웨딩 세팅 · 혼구용품 · 신부대기실", "Sound · lighting · wedding setting · ceremony items · bridal room")
    : T("영상 · 조명 연출 · 혼구용품 · 메뉴카드 · 웰컴드링크 · 플라워 세레모니 · 웨딩카", "Video · lighting · ceremony items · menu cards · welcome drink · flower ceremony · wedding car"));

  // ── 플라워: 고른 타입 한 줄만 합산
  const flowerLine = line(/^플라워 장식/)!;
  const tierRow = { standard: 33, luxury: 34, special: 35 }[input.flower === "luxury" || input.flower === "special" ? input.flower : "standard"];
  sh.num(`D${tierRow}`, flowerLine.amount);
  sh.shade(tierRow, SHADE);
  sh.cached("D36", flowerLine.amount);

  // ── 기타 40~45행
  let others = 0;
  const other = (r: number, l: { amount: number } | undefined, contents?: string) => {
    if (!l) return;
    sh.num(`C${r}`, l.amount);
    sh.num(`D${r}`, l.amount);
    if (contents) sh.str(`B${r}`, contents);
    others += l.amount;
    sh.shade(r, SHADE);
  };
  other(40, line(/^사진/));
  other(41, line(/^영상/));
  other(42, line(/^부케/));
  other(43, line(/^사회자/), input.mc === "both" ? T("1부 + 2부", "Parts 1 and 2") : T("1부", "Part 1"));
  other(44, line(/^남성 4중주/));
  other(45, line(/^현악 4중주/));
  sh.cached("D48", others);

  // ── 합계. 식사비 할인은 「금액 프로모션」(부가세 포함)에 넣는다
  const total = fnb - eK.lines.filter((l) => l.amount < 0).reduce((s, l) => s + l.amount, 0) + fee + ceremony + flowerLine.amount + others;
  const withVat = Math.round(total * 1.1);
  const discountLine = eL.lines.find((l) => l.amount < 0);
  const promo = Math.round(-eK.lines.filter((l) => l.amount < 0).reduce((s, l) => s + l.amount, 0) * 1.1);
  sh.cached("D50", total);
  sh.cached("D51", withVat);
  sh.num("D52", promo || null);
  if (promo && discountLine) sh.str("E52", `${discountLine.label} ${discountLine.detail ?? ""} (${T("부가세 포함", "incl. VAT")})`);
  sh.cached("D53", withVat - promo);

  // ── 서명
  sh.str("D63", `${T("예식 주최자", "Organizer")} :  ${names}${names && !en ? " 님" : ""}`);
  sh.str("A64", `${T("견적일", "Date of issue")} :  ${issued}`);

  sheetEntry.data = Buffer.from(sh.xml, "utf8");
  return zip(entries);
}
