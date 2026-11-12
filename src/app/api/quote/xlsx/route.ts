import { NextResponse } from "next/server";
import { buildQuoteXlsx, usesXlsxTemplate } from "@/lib/quote-xlsx";
import { docLangFor, quoteFileName, type EstimateInput } from "@/lib/quote-pricing";

export const runtime = "nodejs";

const s = (v: unknown, max = 120) => (typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");
const on = (v: unknown) => v === "on" || v === true;

function toInput(raw: Record<string, unknown>): EstimateInput {
  return {
    venueKey: s(raw.venueKey), guests: s(raw.guests), date: s(raw.date), time: s(raw.time), flower: s(raw.flower), menu: s(raw.menu),
    video: on(raw.video), wine: on(raw.wine), champagne: on(raw.champagne), cake: on(raw.cake), bouquet: on(raw.bouquet),
    mc: s(raw.mc), maleQuartet: on(raw.maleQuartet), stringQuartet: on(raw.stringQuartet), drink: on(raw.drink),
    noodles: on(raw.noodles), riceCake: on(raw.riceCake), canape: s(raw.canape), afterGuests: s(raw.afterGuests), mealMode: s(raw.mealMode), lang: "ko",
  };
}

function respond(raw: Record<string, unknown>) {
  const input = toInput(raw);
  // 링크에 lang 이 명시되면 그대로, 아니면 이름·전화번호로 판단
  const lang = s(raw.docLang) === "en" || s(raw.docLang) === "ko" ? (s(raw.docLang) as "ko" | "en") : docLangFor(s(raw.nationality), s(raw.groom), s(raw.bride), s(raw.phone), s(raw.lang));
  if (!usesXlsxTemplate(input.venueKey)) return NextResponse.json({ ok: false, error: "no template for this venue" }, { status: 400 });
  const buf = buildQuoteXlsx(input, {
    groom: s(raw.groom, 40), bride: s(raw.bride, 40), phone: s(raw.phone, 30), date: input.date, time: input.time,
    account: (input.venueKey === "marina" ? process.env.DEPOSIT_ACCOUNT_MARINA : process.env.DEPOSIT_ACCOUNT_FLOATING)?.trim(), lang,
  });
  if (!buf) return NextResponse.json({ ok: false, error: "cannot build" }, { status: 400 });
  const name = quoteFileName(input.date, lang, input.venueKey);
  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${quoteFileName(input.date, "en", input.venueKey)}"; filename*=UTF-8''${encodeURIComponent(name)}`,
      "Cache-Control": "no-store",
    },
  });
}

/** 화면의 「엑셀로 받기」 — 이름·연락처까지 채운 견적서 */
export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }
  return respond(raw);
}

/** 메일 안의 링크 — 선택 내용과 신랑·신부 이름으로 견적서를 만든다 (연락처·메일 주소는 넣지 않는다) */
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const raw: Record<string, unknown> = {};
  for (const k of ["venueKey", "guests", "date", "time", "flower", "menu", "video", "wine", "champagne", "cake", "bouquet", "mc", "maleQuartet", "stringQuartet", "drink", "noodles", "riceCake", "canape", "afterGuests", "mealMode", "lang", "docLang", "groom", "bride"]) raw[k] = p.get(k) ?? "";
  return respond(raw);
}
