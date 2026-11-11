import { NextResponse } from "next/server";
import { LANG_COOKIE, isLang } from "@/i18n";

/** GET /api/lang?lang=en — 언어 쿠키를 설정하고 이전 페이지(Referer)로 돌아간다. */
export function GET(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");
  let back = "/";
  if (referer) {
    try {
      const r = new URL(referer);
      // 같은 사이트(호스트 기준)에서 온 요청이면 그 페이지로 되돌아간다
      if (r.host === url.host || (host && r.host === host)) back = r.pathname + r.search;
    } catch {
      /* ignore */
    }
  }
  const res = NextResponse.redirect(new URL(back, url.origin), 303);
  if (isLang(lang)) {
    res.cookies.set(LANG_COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return res;
}
