import { cookies } from "next/headers";
import { ko } from "./ko";
import { en } from "./en";

export type Lang = "ko" | "en";
export const LANGS: Lang[] = ["ko", "en"];
export const LANG_COOKIE = "lang";

export type Dict = typeof ko;

const dicts: Record<Lang, Dict> = { ko, en };

export function isLang(value: unknown): value is Lang {
  return value === "ko" || value === "en";
}

/** 서버 컴포넌트에서 현재 언어(쿠키 기반, 기본 ko). */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const v = store.get(LANG_COOKIE)?.value;
  return isLang(v) ? v : "ko";
}

export function getDict(lang: Lang): Dict {
  return dicts[lang];
}

/** 서버 컴포넌트 편의 함수: 언어와 사전을 한 번에. */
export async function i18n(): Promise<{ lang: Lang; t: Dict }> {
  const lang = await getLang();
  return { lang, t: dicts[lang] };
}
