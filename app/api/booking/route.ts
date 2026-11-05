import { Resend } from "resend";
import site from "@/data/site.json";
import { bookingMessage, parseBooking } from "@/lib/booking";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";

// Demande de rendez-vous → e-mails via Resend :
//  1. notification au salon, toujours en français (suivie de la version anglaise si le client a écrit en anglais),
//     avec la photo d'inspiration en pièce jointe ;
//  2. confirmation au client, dans sa langue, s'il a donné son e-mail.
// Variables (Vercel → Settings → Environment Variables) :
//   RESEND_API_KEY        clé Resend
//   BOOKING_NOTIFY_EMAIL  adresse du salon qui reçoit les demandes
//   RESEND_FROM           expéditeur sur un domaine vérifié, ex. « Hair Évasion <rendez-vous@hair-evasion.fr> »
// Sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte (la confirmation client est alors ignorée).
// Tant que ces variables manquent, la réponse indique notified: false et le site invite le client à appeler.

const MAX_PHOTO = 3.5 * 1024 * 1024;

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const html = (text: string) =>
  `<div style="background:#FAF7F3;padding:32px 24px"><div style="max-width:560px;margin:0 auto;font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#1F1B19;white-space:pre-wrap"><div style="font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#8E5530;margin-bottom:6px">Hair Évasion</div><div style="width:40px;height:1px;background:#B9774A;margin-bottom:22px"></div>${escapeHtml(text).replace(/\*(.+?)\*/g, '<strong style="font-size:19px;font-weight:normal">$1</strong>')}</div></div>`;

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const rawLang = form.get("lang");
  const lang: Locale = typeof rawLang === "string" && isLocale(rawLang) ? rawLang : "fr";
  let data: unknown = null;
  try {
    data = JSON.parse(String(form.get("data") ?? ""));
  } catch {}
  const q = parseBooking(data);
  if (!q) return Response.json({ ok: false }, { status: 400 });

  const file = form.get("photo");
  const photo = file instanceof File && file.size > 0 && file.size <= MAX_PHOTO && file.type.startsWith("image/") ? file : null;

  const fr = getDict("fr");
  const d = getDict(lang);
  const frText = bookingMessage(q, "fr", fr, { photo: !!photo });
  const clientText = bookingMessage(q, lang, d, { title: false });
  const wedding = q.weddingDate ? ` · mariage ${q.weddingDate}` : "";
  const subject = `${fr.booking.email.subject} · ${q.name}${wedding}`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL ?? site.email ?? undefined;
  if (!key || !to) return Response.json({ ok: true, notified: false, confirmed: false });

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM ?? "Hair Évasion <onboarding@resend.dev>";
  const text = lang === "fr" ? frText : `${frText}\n\n— EN —\n\n${bookingMessage(q, lang, d, { photo: !!photo })}`;
  const attachments = photo ? [{ filename: "inspiration.jpg", content: Buffer.from(await photo.arrayBuffer()) }] : undefined;

  let notified = false;
  let confirmed = false;
  try {
    const r = await resend.emails.send({ from, to, replyTo: q.email || undefined, subject, html: html(text), text, attachments });
    notified = !r.error;
  } catch {}

  if (q.email) {
    const e = d.booking.email;
    const msg = `${fill(e.confirmIntro, { name: q.name })}\n\n${clientText}\n\n${e.confirmOutro}`;
    try {
      const r = await resend.emails.send({ from, to: q.email, replyTo: to, subject: e.confirmSubject, html: html(msg), text: msg });
      confirmed = !r.error;
    } catch {}
  }
  return Response.json({ ok: true, notified, confirmed });
}
