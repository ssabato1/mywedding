"use client";

import { useEffect } from "react";

/**
 * 본문 안 유튜브 플레이어와 곡별 링크를 잇는다.
 * `youtu.be/<ID>?t=<초>` 링크를 누르면 새 창으로 나가지 않고,
 * 같은 영상의 플레이어를 그 지점부터 재생하고 플레이어로 화면을 올린다.
 */
export default function YouTubeTracks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      const m = /^https:\/\/youtu\.be\/([\w-]{11})(?:\?t=(\d+))?$/.exec(href);
      if (!a || !m) return;
      const frame = document.querySelector<HTMLIFrameElement>(`.post-body iframe[data-yt="${m[1]}"]`);
      if (!frame) return;
      e.preventDefault();
      frame.src = `https://www.youtube.com/embed/${m[1]}?rel=0&autoplay=1&start=${m[2] ?? 0}`;
      frame.scrollIntoView({ behavior: "smooth", block: "center" });
      document.querySelectorAll(".post-body a.yt-playing").forEach((el) => el.classList.remove("yt-playing"));
      a.classList.add("yt-playing");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
