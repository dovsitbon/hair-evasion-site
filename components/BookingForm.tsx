"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import site from "@/data/site.json";
import { useLocale } from "@/components/providers";
import { CameraIcon, PhoneIcon } from "@/components/icons";
import { emptyBooking, isEmail, isPhone, LENGTHS, SLOTS, TRIALS, type Booking } from "@/lib/booking";
import { categories, expand, GIFT, WEDDING_IDS } from "@/lib/services";
import { openWeekdays, parisNow } from "@/lib/shop";

type Errors = Partial<Record<"services" | "name" | "phone" | "email" | "photo" | "generic", string>>;
type Done = { notified: boolean; confirmed: boolean };

const MAX_SIDE = 1600;

/** Réduit la photo d'inspiration dans le navigateur (JPEG ≤ 1600 px) pour rester sous la limite d'envoi. */
async function shrink(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  return new Promise((ok, ko) => canvas.toBlob((b) => (b ? ok(b) : ko(new Error("photo"))), "image/jpeg", 0.82));
}

function Fieldset({ legend, children, hint }: { legend: string; children: ReactNode; hint?: string }) {
  return (
    <fieldset className="border-t border-line pt-8">
      <legend className="display float-left w-full text-[1.9rem]">{legend}</legend>
      {hint && <p className="clear-left pt-1 text-[0.875rem] text-muted">{hint}</p>}
      <div className="clear-left space-y-7 pt-6">{children}</div>
    </fieldset>
  );
}

function Chip({ type = "checkbox", name, checked, onChange, children }: { type?: "checkbox" | "radio"; name: string; checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="chip">
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

/**
 * Demande de rendez-vous : prestations (plusieurs), longueur, première visite, jours et moments souhaités,
 * questions mariage si besoin, coordonnées, photo d'inspiration, message.
 * Envoi à /api/booking (e-mail au salon + confirmation au client via Resend). Le salon rappelle pour confirmer.
 */
export function BookingForm() {
  const { lang, d } = useLocale();
  const uid = useId();
  const reduce = useReducedMotion();
  const f = d.booking.fields;
  const [q, setQ] = useState<Booking>(emptyBooking);
  const [photo, setPhoto] = useState<{ blob: Blob; url: string } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const [minDate, setMinDate] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Préremplissage depuis la barre de rendez-vous ou un lien (?p=couleur&j=2026-11-12)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p");
    const j = params.get("j");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- paramètres d'URL, lisibles seulement côté client
    setMinDate(parisNow().iso);
    setQ((v) => ({
      ...v,
      services: p ? expand(p) : v.services,
      date: j && /^\d{4}-\d{2}-\d{2}$/.test(j) ? j : v.date,
    }));
  }, []);

  useEffect(() => () => (photo ? URL.revokeObjectURL(photo.url) : undefined), [photo]);

  const set = <K extends keyof Booking>(k: K, v: Booking[K]) => setQ((x) => ({ ...x, [k]: v }));
  const toggle = <K extends "services" | "slots" | "days">(k: K, v: Booking[K][number]) =>
    setQ((x) => {
      const list = x[k] as (typeof v)[];
      return { ...x, [k]: list.includes(v) ? list.filter((y) => y !== v) : [...list, v] };
    });

  const wedding = q.services.some((s) => WEDDING_IDS.includes(s));
  const err = d.booking.errors;

  async function onPhoto(file: File | undefined) {
    setErrors((e) => ({ ...e, photo: undefined }));
    if (!file) return;
    try {
      const blob = await shrink(file);
      setPhoto({ blob, url: URL.createObjectURL(blob) });
    } catch {
      setPhoto(null);
      setErrors((e) => ({ ...e, photo: err.photo }));
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!q.services.length) next.services = err.services;
    if (!q.name.trim()) next.name = err.name;
    if (!isPhone(q.phone)) next.phone = err.phone;
    if (q.email && !isEmail(q.email)) next.email = err.email;
    setErrors(next);
    if (Object.keys(next).length) {
      document.querySelector<HTMLElement>(`[data-err="${Object.keys(next)[0]}"]`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      return;
    }
    setSending(true);
    try {
      const body = new FormData();
      body.set("lang", lang);
      body.set("data", JSON.stringify(wedding ? q : { ...q, weddingDate: "", trial: "", people: "" }));
      if (photo) body.set("photo", photo.blob, "inspiration.jpg");
      const r = await fetch("/api/booking", { method: "POST", body });
      const json = (await r.json()) as { ok: boolean } & Done;
      if (!r.ok || !json.ok) throw new Error();
      setDone({ notified: json.notified, confirmed: json.confirmed });
      topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    } catch {
      setErrors({ generic: err.generic });
    } finally {
      setSending(false);
    }
  }

  const fade = reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const } };
  const s = d.booking.success;

  return (
    <div ref={topRef} className="scroll-mt-32">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="done" {...fade} role="status" className="border border-line bg-beige-soft p-8 sm:p-10">
            <p className="display text-[clamp(2rem,4vw,2.6rem)]">{s.title}</p>
            <p className="lead mt-4">{s.text}</p>
            {done.confirmed && <p className="mt-3 text-muted">{s.email}</p>}
            {!done.notified && (
              <div className="mt-6 border-t border-line pt-6">
                <p>{s.notNotified}</p>
                <a href={`tel:${site.tel}`} className="btn-solid mt-4">
                  <PhoneIcon /> {site.phone}
                </a>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                setDone(null);
                setQ(emptyBooking());
                setPhoto(null);
              }}
              className="link-line mt-8 inline-block text-[0.9375rem]"
            >
              {s.again}
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" {...fade} onSubmit={submit} noValidate className="space-y-12">
            <Fieldset legend={d.booking.sections.services} hint={f.servicesHint}>
              <div data-err="services" className="space-y-6">
                {categories.map((c) => (
                  <div key={c.id}>
                    <p className="eyebrow !text-muted">{c.name[lang]}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.items.map((it) => (
                        <Chip key={it.id} name="services" checked={q.services.includes(it.id)} onChange={() => toggle("services", it.id)}>
                          {it.name[lang]}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ))}
                <div>
                  <p className="eyebrow !text-muted">{d.gift.eyebrow}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip name="services" checked={q.services.includes(GIFT)} onChange={() => toggle("services", GIFT)}>
                      {d.gift.title}
                    </Chip>
                  </div>
                  {q.services.includes(GIFT) && <p className="mt-2 text-[0.875rem] text-muted">{f.giftNote}</p>}
                </div>
                {errors.services && (
                  <p role="alert" className="text-[0.875rem] text-[#a3402c]">
                    {errors.services}
                  </p>
                )}
              </div>
            </Fieldset>

            <Fieldset legend={d.booking.sections.hair}>
              <div role="radiogroup" aria-label={f.length}>
                <p className="label">{f.length}</p>
                <div className="flex flex-wrap gap-2">
                  {LENGTHS.map((l) => (
                    <Chip key={l} type="radio" name="length" checked={q.length === l} onChange={() => set("length", l)}>
                      {f.lengths[l]}
                    </Chip>
                  ))}
                </div>
              </div>
              <div role="radiogroup" aria-label={f.first}>
                <p className="label">{f.first}</p>
                <div className="flex flex-wrap gap-2">
                  {(["oui", "non"] as const).map((v) => (
                    <Chip key={v} type="radio" name="first" checked={q.first === v} onChange={() => set("first", v)}>
                      {v === "oui" ? f.yes : f.no}
                    </Chip>
                  ))}
                </div>
              </div>
            </Fieldset>

            <Fieldset legend={d.booking.sections.when}>
              <div role="group" aria-label={f.days}>
                <p className="label">{f.days}</p>
                <div className="flex flex-wrap gap-2">
                  {openWeekdays().map((day) => (
                    <Chip key={day} name="days" checked={q.days.includes(day)} onChange={() => toggle("days", day)}>
                      <span className="capitalize">{d.days[day]}</span>
                    </Chip>
                  ))}
                </div>
              </div>
              <div role="group" aria-label={f.slots}>
                <p className="label">{f.slots}</p>
                <div className="flex flex-wrap gap-2">
                  {SLOTS.map((sl) => (
                    <Chip key={sl} name="slots" checked={q.slots.includes(sl)} onChange={() => toggle("slots", sl)}>
                      {f.slotList[sl]}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="max-w-xs">
                <label htmlFor={`${uid}-date`} className="label">
                  {f.date} <span className="text-muted">{f.dateHint}</span>
                </label>
                <input id={`${uid}-date`} type="date" min={minDate} value={q.date} onChange={(e) => set("date", e.target.value)} className="field" />
              </div>
            </Fieldset>

            <AnimatePresence initial={false}>
              {wedding && (
                <motion.div key="wedding" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduce ? undefined : { opacity: 0, height: 0 }} transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }} className="overflow-hidden">
                  <Fieldset legend={d.booking.sections.wedding}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor={`${uid}-wd`} className="label">
                          {f.weddingDate}
                        </label>
                        <input id={`${uid}-wd`} type="date" min={minDate} value={q.weddingDate} onChange={(e) => set("weddingDate", e.target.value)} className="field" />
                      </div>
                      <div>
                        <label htmlFor={`${uid}-pp`} className="label">
                          {f.people}
                        </label>
                        <input id={`${uid}-pp`} type="number" inputMode="numeric" min={1} max={20} value={q.people} onChange={(e) => set("people", e.target.value.slice(0, 2))} className="field" />
                      </div>
                    </div>
                    <div role="radiogroup" aria-label={f.trial}>
                      <p className="label">{f.trial}</p>
                      <div className="flex flex-wrap gap-2">
                        {TRIALS.map((t) => (
                          <Chip key={t} type="radio" name="trial" checked={q.trial === t} onChange={() => set("trial", t)}>
                            {f.trialList[t]}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </Fieldset>
                </motion.div>
              )}
            </AnimatePresence>

            <Fieldset legend={d.booking.sections.contact}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div data-err="name">
                  <label htmlFor={`${uid}-n`} className="label">
                    {f.name}
                  </label>
                  <input id={`${uid}-n`} autoComplete="name" value={q.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-n-e` : undefined} className="field" />
                  {errors.name && (
                    <p id={`${uid}-n-e`} className="mt-2 text-[0.875rem] text-[#a3402c]">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div data-err="phone">
                  <label htmlFor={`${uid}-p`} className="label">
                    {f.phone}
                  </label>
                  <input id={`${uid}-p`} type="tel" autoComplete="tel" inputMode="tel" value={q.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-p-e` : undefined} className="field" />
                  {errors.phone && (
                    <p id={`${uid}-p-e`} className="mt-2 text-[0.875rem] text-[#a3402c]">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div data-err="email" className="sm:col-span-2">
                  <label htmlFor={`${uid}-e`} className="label">
                    {f.email} <span className="text-muted">{f.emailHint}</span>
                  </label>
                  <input id={`${uid}-e`} type="email" autoComplete="email" value={q.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-e-e` : undefined} className="field" />
                  {errors.email && (
                    <p id={`${uid}-e-e`} className="mt-2 text-[0.875rem] text-[#a3402c]">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="label">
                  {f.photo} <span className="text-muted">{f.photoHint}</span>
                </p>
                <input ref={fileRef} id={`${uid}-ph`} type="file" accept="image/*" className="sr-only" onChange={(e) => onPhoto(e.target.files?.[0])} />
                {photo ? (
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element -- aperçu local (blob:) */}
                    <img src={photo.url} alt="" className="size-20 object-cover" />
                    <button type="button" onClick={() => fileRef.current?.click()} className="link-line text-[0.9375rem]">
                      {f.photoChange}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="link-line text-[0.9375rem] text-muted"
                    >
                      {f.photoRemove}
                    </button>
                  </div>
                ) : (
                  <label htmlFor={`${uid}-ph`} className="chip !min-h-12 !px-5">
                    <CameraIcon /> {f.photo}
                  </label>
                )}
                {errors.photo && <p className="mt-2 text-[0.875rem] text-[#a3402c]">{errors.photo}</p>}
              </div>

              <div>
                <label htmlFor={`${uid}-m`} className="label">
                  {f.message}
                </label>
                <textarea id={`${uid}-m`} rows={4} value={q.message} onChange={(e) => set("message", e.target.value)} placeholder={f.messagePh} className="field resize-y" />
              </div>
            </Fieldset>

            <div className="border-t border-line pt-8">
              {errors.generic && (
                <p role="alert" className="mb-4 text-[#a3402c]">
                  {errors.generic}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <button type="submit" disabled={sending} className="btn-solid min-w-56 disabled:opacity-60">
                  {sending ? d.booking.sending : d.booking.submit}
                </button>
                <a href={`tel:${site.tel}`} className="inline-flex items-center gap-2">
                  <PhoneIcon /> {site.phone}
                </a>
              </div>
              <p className="mt-4 text-[0.8125rem] text-muted">{d.booking.privacy}</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
