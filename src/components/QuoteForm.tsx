"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, Lang } from "@/i18n";
import {
  CEREMONY_TIMES,
  DEFAULT_MENU,
  MENUS,
  MENU_GROUPS,
  PRICING,
  estimate as calcEstimate,
  type Estimate,
  type Section,
  type VenueKey,
} from "@/lib/quote-pricing";

type F = Dict["contact"]["f"];

const SECTIONS: Section[] = ["fnb", "venue", "ceremony", "flower", "others"];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const num = (n: number) => n.toLocaleString("ko-KR");

/** 날짜별 혜택: 2 = 대관료 면제 + 식사 할인, 1 = 대관료 면제, 0 = 없음 */
function benefitOf(y: number, m: number, d: number): 0 | 1 | 2 {
  const day = new Date(y, m, d).getDay();
  const off = (PRICING.offSeasonMonths as readonly number[]).includes(m + 1);
  if (off || (day >= 1 && day <= 5)) return 2;
  if (day === 0) return 1;
  return 0;
}

function Calendar({ f, lang, value, onPick }: { f: F; lang: Lang; value: string; onPick: (v: string) => void }) {
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate());
  const move = (d: number) => setView((v) => {
    const t = new Date(v.y, v.m + d, 1);
    return { y: t.getFullYear(), m: t.getMonth() };
  });
  const title = lang === "en"
    ? new Date(view.y, view.m, 1).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : `${view.y}년 ${view.m + 1}월`;
  const nav = "h-9 w-9 rounded-ui border border-line text-ink-sub hover:border-gold hover:text-gold";

  return (
    <div className="rounded-card border border-line bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => move(-1)} className={nav} aria-label="previous month">‹</button>
        <p className="font-display text-lg font-semibold text-gold">{title}</p>
        <button type="button" onClick={() => move(1)} className={nav} aria-label="next month">›</button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-ink-muted">
        {f.calWeekdays.map((w) => <div key={w} className="py-1">{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={`e${i}`} />;
          const v = iso(view.y, view.m, d);
          const past = v < todayIso;
          const sel = v === value;
          const b = benefitOf(view.y, view.m, d);
          return (
            <button
              key={v}
              type="button"
              disabled={past}
              onClick={() => onPick(sel ? "" : v)}
              aria-pressed={sel}
              className={`relative flex h-11 flex-col items-center justify-center rounded-ui text-sm tabular-nums transition-colors ${
                sel
                  ? "bg-gold font-bold text-canvas"
                  : past
                    ? "text-ink-muted/40"
                    : "text-ink hover:bg-canvas hover:text-gold"
              }`}
            >
              {d}
              {!past && !sel && b > 0 && (
                <span className={`absolute bottom-1 h-1 w-1 rounded-full ${b === 2 ? "bg-gold" : "bg-ink-sub"}`} />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-muted">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-gold" />{f.calLegendMeal}</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-ink-sub" />{f.calLegendFee}</span>
      </div>
    </div>
  );
}

/** 계약서(엑셀) 양식 그대로의 견적서 표 */
function Sheet({ f, e, dateLabel, id }: { f: F; e: Estimate; dateLabel: string; id: string }) {
  const cell = "border border-line px-3 py-2";
  return (
    <div className="overflow-x-auto rounded-card border border-gold/40 bg-card p-4 sm:p-6" aria-live="polite">
      <table id={id} className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr>
            <th colSpan={5} className="pb-4 text-center font-display text-xl font-semibold tracking-[0.15em] text-gold">
              {f.sheetTitle} — {f.estVenue[e.venue]}
            </th>
          </tr>
          <tr>
            <td colSpan={3} className={`${cell} text-ink`}>{f.sheetEvent} : {dateLabel}</td>
            <td colSpan={2} className={`${cell} text-ink`}>{f.sheetGuests} : {e.guests} {f.sheetPerson}</td>
          </tr>
        </thead>
        <tbody>
          {SECTIONS.map((sec) => {
            const rows = e.lines.filter((l) => l.section === sec);
            if (rows.length === 0) return null;
            const sub = rows.reduce((s, l) => s + l.amount, 0);
            return [
              <tr key={`${sec}-h`}>
                <td colSpan={5} className={`${cell} bg-canvas font-semibold text-gold`}>{f.sheetSections[sec]}</td>
              </tr>,
              sec === "fnb" && (
                <tr key={`${sec}-c`} className="text-xs text-ink-muted">
                  {f.sheetCols.map((c, i) => (
                    <td key={c} className={`${cell} ${i > 0 && i < 4 ? "text-right" : ""}`}>{c}</td>
                  ))}
                </tr>
              ),
              ...rows.map((l) => (
                <tr key={`${sec}-${l.label}`}>
                  <td className={`${cell} text-ink`}>{l.label}</td>
                  <td className={`${cell} text-right tabular-nums text-ink-sub`}>{l.qty ?? ""}</td>
                  <td className={`${cell} text-right tabular-nums text-ink-sub`}>{l.unit ? num(l.unit) : ""}</td>
                  <td className={`${cell} text-right tabular-nums text-ink`}>{num(l.amount)}</td>
                  <td className={`${cell} text-xs text-ink-muted`}>{l.detail ?? ""}</td>
                </tr>
              )),
              <tr key={`${sec}-s`}>
                <td colSpan={3} className={`${cell} text-right text-ink-sub`}>{f.sheetSub}</td>
                <td className={`${cell} text-right font-semibold tabular-nums text-ink`}>{num(sub)}</td>
                <td className={cell} />
              </tr>,
            ];
          })}
          <tr>
            <td colSpan={3} className={`${cell} text-right font-semibold text-ink`}>{f.sheetTotal}</td>
            <td className={`${cell} text-right font-semibold tabular-nums text-ink`}>{num(e.subtotal)}</td>
            <td className={cell} />
          </tr>
          <tr>
            <td colSpan={3} className={`${cell} text-right text-ink-sub`}>{f.estVat}</td>
            <td className={`${cell} text-right tabular-nums text-ink-sub`}>{num(e.vat)}</td>
            <td className={cell} />
          </tr>
          <tr>
            <td colSpan={3} className={`${cell} bg-canvas text-right font-semibold text-gold`}>{f.sheetTotalVat}</td>
            <td className={`${cell} bg-canvas text-right text-lg font-semibold tabular-nums text-gold`}>{num(e.total)}</td>
            <td className={`${cell} bg-canvas text-xs text-ink-muted`}>{f.estWon}</td>
          </tr>
        </tbody>
      </table>
      <ul className="mt-4 space-y-1 text-xs leading-relaxed text-ink-muted">
        {e.notes.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </div>
  );
}

export default function QuoteForm({ f, lang }: { f: F; lang: Lang }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "mail" | "error">("idle");
  const [venueKey, setVenueKey] = useState<VenueKey>("convention");
  const [date, setDate] = useState("");
  const [tick, setTick] = useState(0);

  const read = (): Record<string, string> =>
    formRef.current ? (Object.fromEntries(new FormData(formRef.current).entries()) as Record<string, string>) : {};

  // 입력이 바뀐 뒤(렌더가 끝난 폼 값을 읽어) 견적서를 다시 계산한다.
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [dateLabel, setDateLabel] = useState(f.calNone);
  useEffect(() => {
    const d = read();
    setEstimate(
      calcEstimate({
        venueKey, date, guests: d.guests ?? "", flower: d.flower ?? "standard", menu: d.menu ?? DEFAULT_MENU[venueKey],
        video: d.video === "on", wine: d.wine === "on", champagne: d.champagne === "on", cake: d.cake === "on",
        bridalFlower: d.bridalFlower === "on", bouquet: d.bouquet === "on", lang,
      }),
    );
    setDateLabel(date ? `${date}${d.time && d.time !== f.timeOptions[0] ? ` ${d.time}` : ""}` : f.calNone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venueKey, date, tick, lang]);

  function downloadExcel() {
    const table = document.getElementById("quote-sheet");
    if (!table || !estimate) return;
    const notes = estimate.notes.map((n) => `<tr><td colspan="5">${n}</td></tr>`).join("");
    const html =
      `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8">` +
      `<style>td,th{border:1px solid #999;padding:4px 8px;font-family:'Malgun Gothic',sans-serif;font-size:11pt}th{font-size:14pt}</style></head><body>` +
      `<table>${table.innerHTML}${notes}</table></body></html>`;
    const url = URL.createObjectURL(new Blob(["﻿", html], { type: "application/vnd.ms-excel" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${date || "date-tbd"}-floating-island-wedding-quote-${venueKey}.xls`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = read();
    data.venueKey = venueKey;
    data.date = date;
    data.venue = f.estVenue[venueKey];
    setStatus("sending");
    try {
      const r = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      const j = (await r.json()) as { ok: boolean; mailto?: string };
      if (j.ok) setStatus("done");
      else if (j.mailto) {
        setStatus("mail");
        window.location.href = j.mailto;
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const input = "mt-1.5 w-full rounded-ui border border-line bg-card px-3 py-2.5 text-[15px] text-ink placeholder:text-ink-muted focus:border-gold focus:outline-none";
  const label = "block text-sm font-semibold text-ink";
  const hint = "mt-1 text-xs text-ink-muted";
  const check = "flex items-center gap-2 text-sm text-ink";
  const box = "h-4 w-4 accent-[var(--brand-gold)]";
  const step = "font-display text-lg font-semibold text-gold";
  const req = <span className="ml-1 text-xs font-normal text-gold">({f.required})</span>;
  const btn = "rounded-ui border border-gold/60 px-4 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-canvas";

  return (
    <form ref={formRef} onSubmit={onSubmit} onChange={() => setTick((t) => t + 1)} className="space-y-10">
      {/* 허니팟 */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {/* 1. 견적서 선택 */}
      <section>
        <h3 className={step}>{f.pickVenue}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {f.venueTabs.map((v) => {
            const on = v.key === venueKey;
            return (
              <button
                key={v.key}
                type="button"
                aria-pressed={on}
                onClick={() => { setVenueKey(v.key as VenueKey); setTick((t) => t + 1); }}
                className={`rounded-card border p-4 text-left transition-colors ${on ? "border-gold bg-gold/10" : "border-line bg-card hover:border-gold/60"}`}
              >
                <span className={`block font-display text-base font-semibold ${on ? "text-gold" : "text-ink"}`}>{v.name}</span>
                <span className="mt-1 block text-xs text-ink-muted">{v.sub}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. 날짜 */}
      <section>
        <h3 className={step}>{f.pickDate}</h3>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <Calendar f={f} lang={lang} value={date} onPick={setDate} />
          <div className="space-y-5">
            <div className="rounded-card border border-line bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{f.calSelected}</p>
              <p className="mt-1 font-display text-2xl text-gold">{date || f.calNone}</p>
            </div>
            <label className={label}>{f.time}
              <select key={venueKey} name="time" className={input}>
                {[f.timeOptions[0], ...(CEREMONY_TIMES[venueKey] ?? [])].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          </div>
        </div>
      </section>

      {/* 3. 인원·메뉴·옵션 */}
      <section>
        <h3 className={step}>{f.pickOptions}</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <label className={label}>{f.guests}<input name="guests" type="text" inputMode="numeric" placeholder={String(PRICING[venueKey].minGuests)} className={input} /></label>
          <label className={label}>{f.flower}
            <select name="flower" defaultValue="standard" className={input}>
              {f.flowerOptions.map((o, i) => <option key={o} value={["standard", "luxury", "special"][i]}>{o}</option>)}
            </select>
          </label>
          <div className="sm:col-span-2">
            <label className={label}>{f.menu}
              <select key={venueKey} name="menu" defaultValue={DEFAULT_MENU[venueKey]} className={input}>
                {MENU_GROUPS.map((g) => (
                  <optgroup key={g.key} label={lang === "en" ? g.en : g.ko}>
                    {MENUS.filter((m) => m.group === g.key).map((m) => (
                      <option key={m.key} value={m.key}>
                        {lang === "en" ? m.en : m.ko} — {num(m.price)} {f.estWon}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <p className={hint}>{f.menuHint}</p>
          </div>
          <fieldset className="sm:col-span-2">
            <legend className={label}>{f.options}</legend>
            <div key={venueKey} className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {venueKey !== "marina" && (
                <label className={check}><input type="checkbox" name="wine" defaultChecked className={box} />{f.wine}</label>
              )}
              <label className={check}><input type="checkbox" name="champagne" defaultChecked className={box} />{f.champagne}</label>
              <label className={check}><input type="checkbox" name="cake" defaultChecked className={box} />{f.cake}</label>
              <label className={check}><input type="checkbox" name="video" className={box} />{f.video}</label>
              <label className={check}><input type="checkbox" name="bouquet" className={box} />{f.bouquet}</label>
              <label className={check}><input type="checkbox" name="bridalFlower" className={box} />{f.bridalFlower}</label>
            </div>
          </fieldset>
        </div>
      </section>

      {/* 견적서 */}
      {estimate && (
        <section>
          <Sheet f={f} e={estimate} dateLabel={dateLabel} id="quote-sheet" />
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={downloadExcel} className={btn}>{f.downloadExcel}</button>
            <button type="button" onClick={() => window.print()} className={btn}>{f.printSheet}</button>
          </div>
        </section>
      )}

      {/* 4. 연락처 */}
      <section>
        <h3 className={step}>{f.sendTitle}</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <label className={label}>{f.groom}{req}<input name="groom" required className={input} /></label>
          <label className={label}>{f.bride}{req}<input name="bride" required className={input} /></label>
          <label className={label}>{f.phone}{req}<input name="phone" type="tel" required className={input} /></label>
          <label className={label}>{f.email}<input name="email" type="email" className={input} /></label>
          <label className={label}>{f.method}
            <select name="method" className={input}>
              {f.methodOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
          <div>
            <label className={label}>{f.budget}<input name="budget" type="text" className={input} /></label>
            <p className={hint}>{f.budgetHint}</p>
          </div>
          <div className="sm:col-span-2">
            <label className={label}>{f.message}<textarea name="message" rows={4} className={input} /></label>
            <p className={hint}>{f.messageHint}</p>
          </div>
          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-ui bg-gold px-6 py-3 text-sm font-bold text-canvas hover:bg-gold-dark disabled:opacity-60"
            >
              {status === "sending" ? f.sending : f.submit}
            </button>
            {status === "done" && <p className="text-sm text-gold">{f.success}</p>}
            {status === "mail" && <p className="text-sm text-ink-sub">{f.successMail}</p>}
            {status === "error" && <p className="text-sm text-accent-light">{f.error}</p>}
          </div>
        </div>
      </section>
    </form>
  );
}
