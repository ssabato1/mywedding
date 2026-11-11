import { NextResponse } from "next/server";
import { siteConfig } from "@config";
import { estimate as calcEstimate, estimateToText, type Estimate } from "@/lib/quote-pricing";
import { DEPOSIT, termsToText } from "@/lib/quote-terms";

export const runtime = "nodejs";

type Quote = {
  date: string; groom: string; bride: string; phone: string; email: string; guests: string;
  time: string; venue: string; venueKey: string; flower: string; menu: string; video: string; wine: string; champagne: string; cake: string; bridalFlower: string; bouquet: string; mc: string; maleQuartet: string; stringQuartet: string; drink: string; noodles: string; riceCake: string; method: string; budget: string; message: string; lang: string; sendCopy: string;
};

const FIELDS: (keyof Quote)[] = ["date", "groom", "bride", "phone", "email", "guests", "time", "venue", "venueKey", "flower", "menu", "video", "wine", "champagne", "cake", "bridalFlower", "bouquet", "mc", "maleQuartet", "stringQuartet", "drink", "noodles", "riceCake", "method", "budget", "message", "lang", "sendCopy"];

function clean(v: unknown, max = 500): string {
  return typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

export function buildSubject(q: Quote): string {
  return `[견적 요청] ${q.date || "날짜 미정"} · ${q.groom} & ${q.bride} · ${q.guests || "?"}명`;
}

export function buildBody(q: Quote): string {
  return [
    "Floating Island Wedding 견적 요청",
    "",
    `희망 날짜: ${q.date || "미정"}`,
    `신랑: ${q.groom}`,
    `신부: ${q.bride}`,
    `전화: ${q.phone}`,
    `이메일: ${q.email}`,
    `예상 하객: ${q.guests || "미정"}`,
    `선호 시간: ${q.time || "미정"}`,
    `관심 공간: ${q.venue || "미정"}`,
    `선호 연락 방법: ${q.method || "미정"}`,
    `예산: ${q.budget || "미정"}`,
    "",
    "추가 내용:",
    q.message || "(없음)",
    "",
    `언어: ${q.lang || "ko"} · 접수 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
  ].join("\n");
}

const won = (n: number) => n.toLocaleString("ko-KR");
const EMAIL_RE = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

/**
 * 계약금 입금 계좌. 저장소가 공개이므로 계좌번호는 코드에 적지 않고 환경변수에서만 읽는다.
 * DEPOSIT_ACCOUNT_FLOATING (플로팅아일랜드 컨벤션·루프탑 가든), DEPOSIT_ACCOUNT_MARINA (마리나파크)
 * 예: "하나은행 000-000000-00000 (예금주 ㈜FIC)"
 */
function depositText(venueKey: string, lang: string): string {
  const en = lang === "en";
  const marina = venueKey === "marina";
  const account = (marina ? process.env.DEPOSIT_ACCOUNT_MARINA : process.env.DEPOSIT_ACCOUNT_FLOATING)?.trim();
  const name = marina ? (en ? "Marina Park" : "마리나파크") : (en ? "Floating Island" : "플로팅아일랜드");
  return en
    ? [
        "■ Deposit",
        `Deposit: KRW ${won(DEPOSIT)}. Your date is confirmed once the deposit is received.`,
        account ? `Account for ${name}: ${account}` : `Account for ${name}: your coordinator will send it with the contract.`,
        "Please check the date with your coordinator before sending the deposit.",
      ].join("\n")
    : [
        "■ 계약금 안내",
        `계약금: ${won(DEPOSIT)}원 — 계약금 입금이 확인되면 예식일이 확정됩니다.`,
        account ? `${name} 입금 계좌: ${account}` : `${name} 입금 계좌: 담당자가 계약서와 함께 안내해 드립니다.`,
        "입금 전에 담당자와 예식 날짜·시간이 가능한지 먼저 확인해 주세요.",
      ].join("\n");
}

/** 고객에게 보내는 견적서 메일 본문 (견적 + 계약금·계좌 + 계약 규정) */
export function buildCustomerText(q: Quote, estimate: Estimate | null): string {
  const en = q.lang === "en";
  const c = siteConfig.contact;
  return [
    en ? `Dear ${q.groom} & ${q.bride},` : `${q.groom} · ${q.bride} 님께,`,
    "",
    en
      ? "Thank you for your interest in Floating Island Wedding. Here is the self quote you created."
      : "Floating Island Wedding 셀프 견적서를 이용해 주셔서 감사합니다. 작성하신 견적서를 보내 드립니다.",
    "",
    en ? `Date: ${q.date || "undecided"}${q.time ? ` ${q.time}` : ""}` : `예식 일시: ${q.date || "미정"}${q.time ? ` ${q.time}` : ""}`,
    en ? `Space: ${q.venue}` : `공간: ${q.venue}`,
    "",
    estimate ? estimateToText(estimate) : "",
    ...(estimate ? estimate.notes.map((n) => `※ ${n}`) : []),
    "",
    en ? "★ Couples who receive a self quote and go on to sign a contract receive a special benefit." : "★ 셀프 견적으로 견적을 받고 계약까지 진행하시는 커플께는 특별 혜택을 드립니다.",
    "",
    depositText(q.venueKey, q.lang),
    "",
    termsToText(q.lang),
    "",
    en
      ? `Questions: ${c.phoneIntl} · ${c.email} · WhatsApp ${c.whatsappDisplay}`
      : `문의: ${c.phone} · ${c.email} · WhatsApp ${c.whatsappDisplay}`,
    "Floating Island Wedding — https://www.floatingislandwedding.com",
  ].join("\n");
}

/**
 * 견적 요청 접수. 전송 경로(순서대로 시도):
 * 1) RESEND_API_KEY 가 있으면 Resend API 로 QUOTE_TO(기본: site.config contact.email)에 메일 발송
 * 2) 없으면 FormSubmit(formsubmit.co) AJAX 엔드포인트로 같은 주소에 발송 — 첫 수신 시 받은편지함에서 1회 활성화 필요
 * 3) 둘 다 실패하면 클라이언트가 mailto 로 폴백할 수 있도록 { ok:false, mailto } 반환
 */
export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }
  // 허니팟(봇 차단)
  if (clean(raw.website)) return NextResponse.json({ ok: true, via: "honeypot" });

  const q = Object.fromEntries(FIELDS.map((k) => [k, clean(raw[k], k === "message" ? 2000 : 200)])) as Quote;
  if (!q.groom || !q.bride || !q.phone || !EMAIL_RE.test(q.email)) {
    return NextResponse.json({ ok: false, error: "missing required" }, { status: 400 });
  }

  const to = process.env.QUOTE_TO || siteConfig.contact.email;
  // 자동 예상 견적: 단가를 알고 있는 공간(플로팅아일랜드 컨벤션·마리나파크)만 계산한다.
  const estimate = calcEstimate({
    venueKey: q.venueKey, guests: q.guests, date: q.date, time: q.time, flower: q.flower, menu: q.menu,
    video: q.video === "on", wine: q.wine === "on", champagne: q.champagne === "on", cake: q.cake === "on", bridalFlower: q.bridalFlower === "on", bouquet: q.bouquet === "on", mc: q.mc, maleQuartet: q.maleQuartet === "on", stringQuartet: q.stringQuartet === "on", drink: q.drink === "on", noodles: q.noodles === "on", riceCake: q.riceCake === "on", lang: q.lang,
  });
  const subject = buildSubject(q);
  const text = buildBody(q) + (estimate ? `\n\n${estimateToText(estimate)}` : "");
  const wantsCopy = q.sendCopy === "on" && EMAIL_RE.test(q.email);
  const customerSubject = q.lang === "en"
    ? `[Floating Island Wedding] Your self quote — ${q.date || "date undecided"}`
    : `[Floating Island Wedding] 셀프 견적서 — ${q.date || "날짜 미정"}`;
  const customerText = buildCustomerText(q, estimate);
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  // 1) Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.QUOTE_FROM || "Floating Island Wedding <onboarding@resend.dev>",
          to: [to],
          reply_to: q.email || undefined,
          subject,
          text,
        }),
      });
      if (r.ok) {
        let copy: "sent" | "failed" | "none" = "none";
        if (wantsCopy) {
          const c = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: process.env.QUOTE_FROM || "Floating Island Wedding <onboarding@resend.dev>",
              to: [q.email],
              reply_to: to,
              subject: customerSubject,
              text: customerText,
            }),
          }).catch(() => null);
          copy = c?.ok ? "sent" : "failed";
        }
        return NextResponse.json({ ok: true, via: "resend", copy, estimate });
      }
    } catch {
      /* fall through */
    }
  }

  // 2) FormSubmit
  try {
    const r = await fetch(`https://formsubmit.co/ajax/${to}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subject,
        _template: "box",
        _replyto: q.email || undefined,
        ...(wantsCopy ? { _cc: q.email } : {}),
        희망날짜: q.date, 신랑: q.groom, 신부: q.bride, 전화: q.phone, 이메일: q.email, 예상하객: q.guests,
        선호시간: q.time, 관심공간: q.venue, 연락방법: q.method, 예산: q.budget, 추가내용: q.message, 언어: q.lang,
        자동견적: estimate ? estimateToText(estimate) : "해당 없음",
        ...(wantsCopy ? { 견적서_및_계약규정: customerText } : {}),
      }),
    });
    if (r.ok) return NextResponse.json({ ok: true, via: "formsubmit", copy: wantsCopy ? "requested" : "none", estimate });
  } catch {
    /* fall through */
  }

  return NextResponse.json({ ok: false, mailto, estimate }, { status: 502 });
}
