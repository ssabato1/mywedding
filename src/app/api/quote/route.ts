import { NextResponse } from "next/server";
import { siteConfig } from "@config";
import { estimate as calcEstimate, estimateToText } from "@/lib/quote-pricing";

export const runtime = "nodejs";

type Quote = {
  date: string; groom: string; bride: string; phone: string; email: string; guests: string;
  time: string; venue: string; venueKey: string; flower: string; video: string; wine: string; champagne: string; cake: string; bridalFlower: string; method: string; budget: string; message: string; lang: string;
};

const FIELDS: (keyof Quote)[] = ["date", "groom", "bride", "phone", "email", "guests", "time", "venue", "venueKey", "flower", "video", "wine", "champagne", "cake", "bridalFlower", "method", "budget", "message", "lang"];

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
  if (!q.groom || !q.bride || !q.phone) {
    return NextResponse.json({ ok: false, error: "missing required" }, { status: 400 });
  }

  const to = process.env.QUOTE_TO || siteConfig.contact.email;
  // 자동 예상 견적: 단가를 알고 있는 공간(플로팅아일랜드 컨벤션·마리나파크)만 계산한다.
  const estimate = calcEstimate({
    venueKey: q.venueKey, guests: q.guests, date: q.date, flower: q.flower,
    video: q.video === "on", wine: q.wine === "on", champagne: q.champagne === "on", cake: q.cake === "on", bridalFlower: q.bridalFlower === "on", lang: q.lang,
  });
  const subject = buildSubject(q);
  const text = buildBody(q) + (estimate ? `\n\n${estimateToText(estimate)}` : "");
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
      if (r.ok) return NextResponse.json({ ok: true, via: "resend", estimate });
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
        희망날짜: q.date, 신랑: q.groom, 신부: q.bride, 전화: q.phone, 이메일: q.email, 예상하객: q.guests,
        선호시간: q.time, 관심공간: q.venue, 연락방법: q.method, 예산: q.budget, 추가내용: q.message, 언어: q.lang,
        자동견적: estimate ? estimateToText(estimate) : "해당 없음",
      }),
    });
    if (r.ok) return NextResponse.json({ ok: true, via: "formsubmit", estimate });
  } catch {
    /* fall through */
  }

  return NextResponse.json({ ok: false, mailto, estimate }, { status: 502 });
}
