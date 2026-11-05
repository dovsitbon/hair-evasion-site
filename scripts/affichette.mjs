// Affichette A5 imprimable (PDF) avec QR code vers le site, à poser au salon ou en vitrine.
//   npm run affichette   →   public/affichette-hair-evasion-a5.pdf
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const url = `${site.url}/fr`;

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const PAPER = hex("#FAF7F3");
const INK = hex("#1F1B19");
const COPPER = hex("#8E5530");
const MUTED = hex("#5E544D");
const LINE = hex("#E2D8CC");

const pdf = await PDFDocument.create();
pdf.setTitle("Hair Évasion : affichette A5");
pdf.setAuthor("Hair Évasion");
const W = 419.53;
const H = 595.28;
const page = pdf.addPage([W, H]);
const serif = await pdf.embedFont(StandardFonts.TimesRoman);
const serifI = await pdf.embedFont(StandardFonts.TimesRomanItalic);
const sans = await pdf.embedFont(StandardFonts.Helvetica);

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PAPER });

// Photo du haut : le balayage blond, en bandeau
const photo = await sharp(path.join(ROOT, "public/media/hero/balayage-blond-ondule.jpg")).resize(1200, 640, { fit: "cover", position: "centre" }).jpeg({ quality: 88 }).toBuffer();
const img = await pdf.embedJpg(photo);
const photoH = 210;
page.drawImage(img, { x: 0, y: H - photoH, width: W, height: photoH });

const center = (text, font, size, y, color = INK, spacing = 0) => {
  const width = font.widthOfTextAtSize(text, size) + spacing * (text.length - 1);
  if (!spacing) return page.drawText(text, { x: (W - width) / 2, y, size, font, color });
  let x = (W - width) / 2;
  for (const ch of text) {
    page.drawText(ch, { x, y, size, font, color });
    x += font.widthOfTextAtSize(ch, size) + spacing;
  }
};

// Logo : la mèche cuivrée, « HAIR ÉVASION » en capitales espacées, « coiffeur visagiste · Amiens »
let y = H - photoH - 30;
page.drawSvgPath("M6 30C22 30 26 10 44 10S66 30 84 30 106 12 124 8", { x: (W - 118 * 0.6) / 2 - 6 * 0.6, y: y + 6, scale: 0.6, borderColor: hex("#B9774A"), borderWidth: 1.2 });
y -= 26;
center("HAIR ÉVASION", serif, 24, y, INK, 5.2);
y -= 16;
center("coiffeur visagiste · Amiens", sans, 7.5, y, MUTED, 1.6);

y -= 34;
center("Prenez rendez-vous en ligne", serif, 21, y);
y -= 19;
center("coupe, couleur, balayage, lissage, mariage : le salon vous rappelle", serifI, 12, y, MUTED);

// QR code
const qrPng = await QRCode.toBuffer(url, { margin: 0, width: 600, color: { dark: "#1F1B19", light: "#FAF7F3" }, errorCorrectionLevel: "M" });
const qr = await pdf.embedPng(qrPng);
const qrS = 100;
y -= 18 + qrS;
page.drawImage(qr, { x: (W - qrS) / 2, y, width: qrS, height: qrS });
y -= 16;
center(url.replace(/^https?:\/\//, ""), sans, 8.5, y, COPPER);

// Pied : infos pratiques
y -= 18;
page.drawLine({ start: { x: 60, y }, end: { x: W - 60, y }, thickness: 0.5, color: LINE });
y -= 17;
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}  ·  ${site.phone}`, sans, 8.5, y);
y -= 13;
center("Du mardi au vendredi 9 h – 19 h  ·  le samedi 9 h – 18 h", sans, 8.5, y);
y -= 13;
center(`${site.instagramHandle}  ·  ${site.rating.value.toString().replace(".", ",")}/5 sur Google`, sans, 8.5, y, MUTED);

const file = path.join(ROOT, "public/affichette-hair-evasion-a5.pdf");
await writeFile(file, await pdf.save());
console.log("affichette prête :", url);
