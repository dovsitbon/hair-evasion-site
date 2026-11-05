import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay } from "@/lib/shop";
import { GIFT, serviceIds, services } from "@/lib/services";

export const LENGTHS = ["courts", "mi-longs", "longs", "tres-longs"] as const;
export const SLOTS = ["matin", "midi", "apres-midi", "fin"] as const;
export const TRIALS = ["oui", "non", "a-voir"] as const;

export type Booking = {
  services: string[];
  length: (typeof LENGTHS)[number] | "";
  first: "oui" | "non" | "";
  days: number[];
  slots: (typeof SLOTS)[number][];
  date: string;
  weddingDate: string;
  trial: (typeof TRIALS)[number] | "";
  people: string;
  name: string;
  phone: string;
  email: string;
  message: string;
};

export const emptyBooking = (): Booking => ({ services: [], length: "", first: "", days: [], slots: [], date: "", weddingDate: "", trial: "", people: "", name: "", phone: "", email: "", message: "" });

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const pick = <T extends string>(v: unknown, list: readonly T[]): T | "" => (list.includes(v as T) ? (v as T) : "");
const list = <T extends string>(v: unknown, allowed: readonly T[]) => (Array.isArray(v) ? [...new Set(v.filter((x): x is T => allowed.includes(x as T)))] : []);

/** Nettoie une demande reçue côté serveur ; null si l'essentiel manque. */
export function parseBooking(v: unknown): Booking | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const q: Booking = {
    services: list(o.services, serviceIds),
    length: pick(o.length, LENGTHS),
    first: pick(o.first, ["oui", "non"] as const),
    days: Array.isArray(o.days) ? [...new Set(o.days.map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n <= 6))] : [],
    slots: list(o.slots, SLOTS),
    date: ISO.test(str(o.date, 10)) ? str(o.date, 10) : "",
    weddingDate: ISO.test(str(o.weddingDate, 10)) ? str(o.weddingDate, 10) : "",
    trial: pick(o.trial, TRIALS),
    people: /^\d{1,2}$/.test(str(o.people, 2)) ? str(o.people, 2) : "",
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
    message: str(o.message, 1500),
  };
  if (!q.services.length || !q.name || !isPhone(q.phone)) return null;
  if (q.email && !isEmail(q.email)) q.email = "";
  return q;
}

/** Récapitulatif lisible (e-mail salon, confirmation client), dans une langue donnée. */
export function bookingMessage(q: Booking, lang: Locale, d: Dict, opts: { title?: boolean; photo?: boolean } = {}) {
  const m = d.booking.message;
  const f = d.booking.fields;
  const c = lang === "fr" ? " :" : ":";
  const line = (label: string, value: string) => (value ? `${label}${c} ${value}` : "");
  const name = (id: string) => (id === GIFT ? d.gift.title : (services.find((s) => s.id === id)?.name[lang] ?? id));
  const blocks = [
    opts.title === false ? [] : [`*${m.title}*`],
    [line(m.services, q.services.map(name).join(", ")), line(m.length, q.length ? f.lengths[q.length] : ""), line(m.first, q.first ? (q.first === "oui" ? f.yes : f.no) : "")],
    [line(m.days, q.days.map((x) => d.days[x]).join(", ")), line(m.slots, q.slots.map((s) => f.slotList[s]).join(", ")), line(m.date, q.date ? formatDay(q.date, lang) : "")],
    [line(m.weddingDate, q.weddingDate ? formatDay(q.weddingDate, lang) : ""), line(m.trial, q.trial ? f.trialList[q.trial] : ""), line(m.people, q.people)],
    [line(m.name, q.name), line(m.phone, q.phone), line(m.email, q.email), line(m.message, q.message), opts.photo ? m.photo : ""],
  ];
  return blocks
    .map((x) => x.filter(Boolean).join("\n"))
    .filter(Boolean)
    .join("\n\n");
}
