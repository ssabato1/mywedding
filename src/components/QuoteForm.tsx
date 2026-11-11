"use client";

import { useRef, useState } from "react";
import type { Dict, Lang } from "@/i18n";
import { CEREMONY_TIMES, estimate as calcEstimate, isEstimableVenue, type Estimate } from "@/lib/quote-pricing";

type F = Dict["contact"]["f"];

export default function QuoteForm({ f, lang }: { f: F; lang: Lang }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "mail" | "error">("idle");
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [venueKey, setVenueKey] = useState("undecided");
  const [sentOther, setSentOther] = useState(false);

  function read(): Record<string, string> {
    return Object.fromEntries(new FormData(formRef.current!).entries()) as Record<string, string>;
  }

  /** 입력이 바뀔 때마다 화면의 예상 견적을 다시 계산한다. */
  function recalc() {
    const d = read();
    setVenueKey(d.venueKey);
    setEstimate(
      calcEstimate({
        venueKey: d.venueKey, guests: d.guests ?? "", date: d.date ?? "", flower: d.flower ?? "standard",
        video: d.video === "on", wine: d.wine === "on", champagne: d.champagne === "on", cake: d.cake === "on", bridalFlower: d.bridalFlower === "on", lang,
      }),
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = read();
    data.venue = f.venueOptions[f.venueKeys.indexOf(data.venueKey)] ?? data.venueKey;
    setStatus("sending");
    setSentOther(!isEstimableVenue(data.venueKey));
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
  const req = <span className="ml-1 text-xs font-normal text-gold">({f.required})</span>;
  const estimable = isEstimableVenue(venueKey);

  return (
    <form ref={formRef} onSubmit={onSubmit} onChange={recalc} className="grid gap-5 sm:grid-cols-2">
      {/* 허니팟 */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <p className="sm:col-span-2 text-sm text-ink-sub">{f.estHint}</p>

      <label className={label}>{f.venue}
        <select name="venueKey" defaultValue="undecided" className={input}>
          {f.venueOptions.map((o, i) => <option key={o} value={f.venueKeys[i]}>{o}</option>)}
        </select>
      </label>
      <label className={label}>{f.guests}<input name="guests" type="text" inputMode="numeric" placeholder="150" className={input} /></label>
      <div>
        <label className={label}>{f.date}<input name="date" type="date" className={input} /></label>
        <p className={hint}>{f.dateHint}</p>
      </div>
      <label className={label}>{f.time}
        <select name="time" className={input}>
          {[f.timeOptions[0], ...(CEREMONY_TIMES[venueKey] ?? ["11:30", "12:00", "15:00", "18:00"])].map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>

      {estimable && (
        <>
          <label className={label}>{f.flower}
            <select name="flower" defaultValue="standard" className={input}>
              {f.flowerOptions.map((o, i) => <option key={o} value={["standard", "luxury", "special"][i]}>{o}</option>)}
            </select>
          </label>
          <fieldset>
            <legend className={label}>{f.options}</legend>
            <div className="mt-2.5 grid gap-2">
              {venueKey === "convention" && (
                <label className={check}><input type="checkbox" name="wine" defaultChecked className={box} />{f.wine}</label>
              )}
              <label className={check}><input type="checkbox" name="champagne" defaultChecked className={box} />{f.champagne}</label>
              <label className={check}><input type="checkbox" name="cake" defaultChecked className={box} />{f.cake}</label>
              <label className={check}><input type="checkbox" name="video" className={box} />{f.video}</label>
              <label className={check}><input type="checkbox" name="bridalFlower" className={box} />{f.bridalFlower}</label>
            </div>
          </fieldset>
        </>
      )}

      {estimate && (
        <div className="sm:col-span-2 rounded-card border border-gold/40 bg-card p-6" aria-live="polite">
          <h3 className="font-display text-xl font-semibold text-gold">
            {f.estTitle} — {f.estVenue[estimate.venue]}
            <span className="ml-2 font-sans text-sm font-normal text-ink-sub">{estimate.guests} {f.estGuests}</span>
          </h3>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {estimate.lines.map((l) => (
                <tr key={l.label} className="border-t border-line">
                  <td className="py-2 pr-3 text-ink">
                    {l.label}
                    {l.detail && <span className="ml-2 text-xs text-ink-muted">{l.detail}</span>}
                  </td>
                  <td className="py-2 text-right tabular-nums text-ink-sub">{l.amount.toLocaleString("ko-KR")}</td>
                </tr>
              ))}
              <tr className="border-t border-line-dark">
                <td className="py-2 text-ink-sub">{f.estSubtotal}</td>
                <td className="py-2 text-right tabular-nums text-ink-sub">{estimate.subtotal.toLocaleString("ko-KR")}</td>
              </tr>
              <tr>
                <td className="py-1 text-ink-sub">{f.estVat}</td>
                <td className="py-1 text-right tabular-nums text-ink-sub">{estimate.vat.toLocaleString("ko-KR")}</td>
              </tr>
              <tr className="border-t border-gold/40">
                <td className="py-3 font-semibold text-gold">{f.estTotal}</td>
                <td className="py-3 text-right text-lg font-semibold tabular-nums text-gold">
                  {estimate.total.toLocaleString("ko-KR")} {f.estWon}
                </td>
              </tr>
            </tbody>
          </table>
          <ul className="mt-3 space-y-1 text-xs leading-relaxed text-ink-muted">
            {estimate.notes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      )}

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
      {sentOther && (status === "done" || status === "mail") && <p className="sm:col-span-2 text-sm text-ink-sub">{f.estOther}</p>}
    </form>
  );
}
