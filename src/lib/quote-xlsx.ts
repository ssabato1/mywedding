import { unzip, zip } from "./zip";
import { QUOTE_TEMPLATE_B64 } from "./quote-template-b64";
import { estimate, MENUS, type EstimateInput } from "./quote-pricing";

/** 엑셀 양식(「CONTRACT SHEET」)을 쓰는 공간 */
export const XLSX_VENUES = ["convention", "rooftop"] as const;
export function usesXlsxTemplate(venueKey: string): boolean {
  return (XLSX_VENUES as readonly string[]).includes(venueKey);
}

export type QuoteSheetInfo = { groom?: string; bride?: string; phone?: string; date?: string; time?: string; account?: string };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

class Sheet {
  constructor(public xml: string) {}
  private re(ref: string) {
    return new RegExp(`<c r="${ref}"([^>]*?)(?:/>|>([\\s\\S]*?)</c>)`);
  }
  private put(ref: string, build: (style: string, inner: string) => string) {
    const re = this.re(ref);
    const m = re.exec(this.xml);
    if (!m) throw new Error(`quote-xlsx: cell ${ref} not found in template`);
    const style = /\ss="\d+"/.exec(m[1])?.[0] ?? "";
    this.xml = this.xml.replace(re, () => build(style, m[2] ?? ""));
  }
  /** 양식에서 숨겨 둔 예비 행을 보이게 한다 */
  unhide(row: number) {
    this.xml = this.xml.replace(new RegExp(`(<row r="${row}"[^>]*?)\\s+hidden="(?:1|true)"`), "$1");
  }
  num(ref: string, n: number | null) {
    this.put(ref, (s) => (n === null ? `<c r="${ref}"${s}/>` : `<c r="${ref}"${s}><v>${n}</v></c>`));
  }
  str(ref: string, text: string) {
    this.put(ref, (s) => `<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${esc(text)}</t></is></c>`);
  }
  /** 수식은 그대로 두고, 엑셀이 계산하지 않는 미리보기에서도 보이도록 계산값만 넣는다. */
  cached(ref: string, v: number | string) {
    this.put(ref, (s, inner) => {
      const f = /<f[^>]*\/>|<f[^>]*>[\s\S]*?<\/f>/.exec(inner)?.[0] ?? "";
      return typeof v === "number"
        ? `<c r="${ref}"${s}>${f}<v>${v}</v></c>`
        : `<c r="${ref}"${s} t="str">${f}<v>${esc(v)}</v></c>`;
    });
  }
}

/** 고객이 고른 내용으로 계약서 양식을 채운 xlsx 를 만든다. 컨벤션·루프탑 가든 전용. */
export function buildQuoteXlsx(input: EstimateInput, info: QuoteSheetInfo): Buffer | null {
  if (!usesXlsxTemplate(input.venueKey)) return null;
  const e = estimate({ ...input, lang: "ko" });
  if (!e) return null;
  const line = (re: RegExp) => e.lines.find((l) => re.test(l.label));
  const entries = unzip(Buffer.from(QUOTE_TEMPLATE_B64, "base64"));
  const sheetEntry = entries.find((x) => x.name === "xl/worksheets/sheet1.xml");
  if (!sheetEntry) return null;
  const sh = new Sheet(sheetEntry.data.toString("utf8"));
  const g = e.guests;

  // ── 머리말
  const names = [info.groom, info.bride].filter(Boolean).join(" · ");
  sh.str("D6", names ? ` ${names}` : " ");
  const [y, m, d] = (info.date ?? "").split("-");
  sh.str("D7", y && m && d ? `  ${y}년 ${Number(m)}월 ${Number(d)}일${info.time ? `  ${info.time}` : ""}` : "        년    월       일");
  sh.num("I7", g);
  sh.cached("I6", Math.round(g * 1.1));
  if (info.groom) sh.str("B8", `  § 신랑 _groom : ${info.groom}`);
  if (info.bride) sh.str("B9", `  § 신부 _bride : ${info.bride}`);
  if (info.phone) sh.str("D8", `  § 연락처 _phone : ${info.phone}`);
  sh.str("G9", `  § 입금 계좌 _account number :   ${info.account || "담당자가 안내해 드립니다"}`);

  // ── 식음료 (13~25행). G열 = 수량 × 단가
  const meal = line(/^식사 —/)!;
  const menu = MENUS.find((x) => x.key === input.menu);
  sh.num("E13", meal.unit ?? 0);
  sh.str("I13", menu ? menu.ko : meal.label.replace(/^식사 — /, ""));
  sh.cached("D13", g);
  const rows: Record<number, { qty: number; unit: number }> = { 13: { qty: g, unit: meal.unit ?? 0 } };
  const noodles = line(/^잔치국수/), rice = line(/^떡/), drink = line(/^프리 드링크/), wine = line(/^하우스 와인/), champ = line(/^건배용 샴페인/), cake = line(/^웨딩 케이크/), canape = line(/카나페/);
  sh.num("D14", noodles ? g : null); rows[14] = { qty: noodles ? g : 0, unit: 3000 };
  sh.num("D15", rice ? g : null); rows[15] = { qty: rice ? g : 0, unit: 3000 };
  rows[16] = { qty: 0, unit: 6000 }; rows[17] = { qty: 0, unit: 6000 }; rows[18] = { qty: 0, unit: 8000 };
  if (drink) sh.cached("D19", g); else sh.num("D19", null);
  rows[19] = { qty: drink ? g : 0, unit: drink?.unit ?? 15000 };
  sh.num("E19", rows[19].unit);
  sh.num("D20", wine?.qty ?? null); rows[20] = { qty: wine?.qty ?? 0, unit: wine?.unit ?? 70000 };
  // 무료 제공 항목은 단가 0으로 두고 비고에 사유를 적는다
  const freebie = (l: typeof champ, ref: number, unit: number, note: string) => {
    sh.num(`D${ref}`, l ? 1 : null);
    const free = !!l && l.amount === 0;
    sh.num(`E${ref}`, free ? 0 : unit);
    if (free) sh.str(`I${ref}`, `${note} — ${l!.detail ?? "무료"}`);
    rows[ref] = { qty: l ? 1 : 0, unit: free ? 0 : unit };
  };
  freebie(champ, 21, 120000, "파티용 고급 샴페인");
  freebie(cake, 22, 450000, "플라워 데코레이션 웨딩케익");
  if (canape) {
    sh.unhide(23);
    sh.str("B23", "애프터 파티 카나페");
    sh.num("D23", canape.qty ?? 0);
    sh.num("E23", canape.unit ?? 0);
    sh.str("I23", "1인당");
  }
  rows[23] = { qty: canape?.qty ?? 0, unit: canape?.unit ?? 0 };
  rows[24] = { qty: 0, unit: 0 }; rows[25] = { qty: 0, unit: 0 };
  let fnb = 0;
  for (const [r, v] of Object.entries(rows)) { const amt = v.qty * v.unit; fnb += amt; sh.cached(`G${r}`, amt); }
  sh.cached("I26", fnb);

  // ── 전관 사용료 · 웨딩 세레모니 · 플라워
  const fee = line(/^전관 독점 사용료/)!;
  sh.num("I29", fee.amount);
  if (fee.detail) sh.str("B29", ` 소계 _ SUB TOTAL  :   ( ${fee.detail} )`);
  const ceremony = e.lines.find((l) => l.section === "ceremony")!;
  sh.num("I32", ceremony.amount);
  if (ceremony.detail) sh.str("B32", ` 소계 _ SUB TOTAL  :   ( ${ceremony.detail} )`);
  const flower = line(/^플라워 장식/)!;
  sh.num("I39", flower.amount);
  sh.str("B39", ` 소계 _ SUB TOTAL  :   ( 선택 — ${flower.label.replace(/^플라워 장식 — /, "")}${flower.detail ? ` ${flower.detail}` : ""} )`);

  // ── 기타 (43~47행)
  const photo = line(/^사진/), video = line(/^영상/), bouquet = line(/^부케/);
  const extras = e.lines.filter((l) => /^(사회자|남성 4중주|현악 4중주)/.test(l.label));
  sh.num("G43", photo?.amount ?? null);
  sh.num("G44", video?.amount ?? null);
  const opt = [...(bouquet ? [bouquet] : []), ...extras];
  const optSum = opt.reduce((s, l) => s + l.amount, 0);
  if (opt.length) {
    sh.unhide(47);
    sh.str("D47", "선택 옵션");
    sh.num("G47", optSum);
    sh.str("I47", opt.map((l) => `${l.label} ${(l.amount / 10000).toLocaleString("ko-KR")}만원`).join(" / "));
  }
  const others = (photo?.amount ?? 0) + (video?.amount ?? 0) + optSum;
  sh.cached("I48", others);

  // ── 합계. 식사비 할인은 「금액 프로모션」 칸(부가세 포함)에 넣는다
  const total = fnb + fee.amount + ceremony.amount + flower.amount + others;
  const withVat = Math.round(total * 1.1);
  const discount = e.lines.filter((l) => l.amount < 0).reduce((s, l) => s - l.amount, 0);
  const promo = Math.round(discount * 1.1);
  sh.cached("I50", total);
  sh.cached("I52", withVat);
  sh.num("I54", promo);
  sh.cached("I56", withVat - promo);
  sh.cached("B50", " 합계 금액 _TOTAL EXPENSE");
  sh.cached("B52", " 합계 금액 _TOTAL EXPENSE 부가세 봉사료포함 :  ");
  sh.cached("B54", promo ? "§ 금액 프로모션 _amount promotion : " : " ");
  sh.cached("B56", " 총 결제 금액 _TOTAL EXPENSE :  ");
  sh.cached("I65", 0);
  sh.cached("I72", names || " ");
  const year = new Date().getFullYear();
  sh.str("C74", `${year} 년`);
  sh.cached("H74", `${year} 년`);

  sheetEntry.data = Buffer.from(sh.xml, "utf8");
  return zip(entries);
}
