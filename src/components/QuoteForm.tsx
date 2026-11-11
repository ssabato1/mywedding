"use client";

import { useState } from "react";
import type { Dict, Lang } from "@/i18n";

type F = Dict["contact"]["f"];

export default function QuoteForm({ f, lang }: { f: F; lang: Lang }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "mail" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const r = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      const j = (await r.json()) as { ok: boolean; mailto?: string };
      if (j.ok) {
        setStatus("done");
        form.reset();
      } else if (j.mailto) {
        setStatus("mail");
        window.location.href = j.mailto;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const input = "mt-1.5 w-full rounded-ui border border-line bg-card px-3 py-2.5 text-[15px] text-ink placeholder:text-ink-muted focus:border-gold focus:outline-none";
  const label = "block text-sm font-semibold text-ink";
  const hint = "mt-1 text-xs text-ink-muted";
  const req = <span className="ml-1 text-xs font-normal text-gold">({f.required})</span>;

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {/* 허니팟 */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="sm:col-span-2">
        <label className={label}>{f.date}<input name="date" type="text" placeholder="2027-05-15" className={input} /></label>
        <p className={hint}>{f.dateHint}</p>
      </div>
      <label className={label}>{f.groom}{req}<input name="groom" required className={input} /></label>
      <label className={label}>{f.bride}{req}<input name="bride" required className={input} /></label>
      <label className={label}>{f.phone}{req}<input name="phone" type="tel" required className={input} /></label>
      <label className={label}>{f.email}<input name="email" type="email" className={input} /></label>
      <label className={label}>{f.guests}<input name="guests" type="text" inputMode="numeric" placeholder="150" className={input} /></label>
      <label className={label}>{f.time}
        <select name="time" className={input}>
          {f.timeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <label className={label}>{f.venue}
        <select name="venue" className={input}>
          {f.venueOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <label className={label}>{f.method}
        <select name="method" className={input}>
          {f.methodOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <div className="sm:col-span-2">
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
    </form>
  );
}
