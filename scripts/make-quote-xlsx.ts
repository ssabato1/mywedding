/**
 * 견적데이터(JSON)로 엑셀 견적서를 만든다. 웨딩팀 답장에 첨부할 때 사용.
 * 사용: npx tsx scripts/make-quote-xlsx.ts '<견적데이터 JSON>' <저장할 폴더>
 * 출력: 만든 파일의 경로와 언어(ko|en)를 한 줄 JSON 으로 인쇄한다.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildQuoteXlsx, usesXlsxTemplate } from "../src/lib/quote-xlsx";
import { detectQuoteLang, estimate, quoteFileName, type EstimateInput } from "../src/lib/quote-pricing";

const raw = JSON.parse(process.argv[2] ?? "{}") as Record<string, string>;
const outDir = process.argv[3] ?? ".";
const on = (v: unknown) => v === "on" || v === true;
const s = (v: unknown) => (typeof v === "string" ? v : "");
const input: EstimateInput = {
  venueKey: s(raw.venueKey), guests: s(raw.guests), date: s(raw.date), time: s(raw.time), flower: s(raw.flower), menu: s(raw.menu),
  video: on(raw.video), wine: on(raw.wine), champagne: on(raw.champagne), cake: on(raw.cake), bouquet: on(raw.bouquet),
  mc: s(raw.mc), maleQuartet: on(raw.maleQuartet), stringQuartet: on(raw.stringQuartet), drink: on(raw.drink),
  noodles: on(raw.noodles), riceCake: on(raw.riceCake), canape: s(raw.canape), afterGuests: s(raw.afterGuests), lang: "ko",
};
const lang = detectQuoteLang(s(raw.groom), s(raw.bride), s(raw.phone), s(raw.lang));
if (!usesXlsxTemplate(input.venueKey)) {
  console.log(JSON.stringify({ ok: false, reason: "no-template", venueKey: input.venueKey, lang }));
  process.exit(0);
}
const buf = buildQuoteXlsx(input, { groom: s(raw.groom), bride: s(raw.bride), phone: s(raw.phone), date: input.date, time: input.time, lang, account: process.env.DEPOSIT_ACCOUNT_FLOATING });
if (!buf) {
  console.log(JSON.stringify({ ok: false, reason: "build-failed", lang }));
  process.exit(0);
}
mkdirSync(outDir, { recursive: true });
const file = join(outDir, quoteFileName(input.date, lang));
writeFileSync(file, buf);
const e = estimate({ ...input, lang });
console.log(JSON.stringify({ ok: true, file, lang, guests: e?.guests, total: e ? Math.round(e.total) : null }));
