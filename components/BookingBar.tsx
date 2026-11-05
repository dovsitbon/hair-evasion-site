"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useLocale } from "@/components/providers";
import { ArrowIcon } from "@/components/icons";
import { categories } from "@/lib/services";
import { formatDay, nextOpenDays } from "@/lib/shop";
import { href } from "@/lib/routes";

/**
 * Petite barre de demande de rendez-vous (prestation + jour souhaité), sous le hero.
 * Elle ne réserve rien : elle ouvre le formulaire, prérempli (?p=couleur&j=2026-11-12).
 */
export function BookingBar({ className = "" }: { className?: string }) {
  const { lang, d } = useLocale();
  const router = useRouter();
  const id = useId();
  const [service, setService] = useState("");
  const [day, setDay] = useState("");
  const [days, setDays] = useState<{ iso: string; day: number }[]>([]);

  // Jours calculés dans le navigateur : la page est statique, la date du jour ne l'est pas.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- date du jour, connue seulement côté client
  useEffect(() => setDays(nextOpenDays(18)), []);

  const b = d.bar;
  return (
    <form
      aria-label={b.label}
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams();
        if (service) q.set("p", service);
        if (day) q.set("j", day);
        const s = q.toString();
        router.push(`${href(lang, "rdv")}${s ? `?${s}` : ""}`);
      }}
      className={`grid gap-px border border-line bg-line sm:grid-cols-[1fr_1fr_auto] ${className}`}
    >
      <label htmlFor={`${id}-s`} className="flex flex-col bg-paper px-5 pt-3 pb-2">
        <span className="eyebrow !text-[0.625rem] !text-muted">{b.service}</span>
        <select id={`${id}-s`} value={service} onChange={(e) => setService(e.target.value)} className="-mx-1 min-h-10 cursor-pointer bg-transparent px-1 text-[1rem] outline-none">
          <option value="">{b.serviceAny}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name[lang]}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={`${id}-d`} className="flex flex-col bg-paper px-5 pt-3 pb-2">
        <span className="eyebrow !text-[0.625rem] !text-muted">{b.day}</span>
        <select id={`${id}-d`} value={day} onChange={(e) => setDay(e.target.value)} className="-mx-1 min-h-10 cursor-pointer bg-transparent px-1 text-[1rem] outline-none">
          <option value="">{b.dayAny}</option>
          {days.map((x) => (
            <option key={x.iso} value={x.iso}>
              {formatDay(x.iso, lang, true)}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn-solid !min-h-16 gap-3 !px-8">
        {b.submit} <ArrowIcon />
      </button>
    </form>
  );
}
