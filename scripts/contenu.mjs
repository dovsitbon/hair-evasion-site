// Génère CONTENU.md : tous les textes du site en français et en anglais, la carte des prestations,
// pour relecture et validation par le salon.   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const json = async (p) => JSON.parse(await readFile(path.join(ROOT, p), "utf8"));
const fr = await json("locales/fr.json");
const en = await json("locales/en.json");
const prestations = await json("data/prestations.json");
const annonces = await json("data/annonces.json");
const horaires = await json("data/horaires.json");
const site = await json("data/site.json");

const out = [];
const w = (s = "") => out.push(s);
const dur = (m) => (m == null ? "" : m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${String(m % 60).padStart(2, "0")}` : ""}`);
const strip = (s) => s.replace(/<\/?em>/g, "*");

w("# Hair Évasion : contenu du site");
w();
w("Tous les textes du site, en français et en anglais, pour relecture. Les corrections se font dans `locales/fr.json` et `locales/en.json` ; prestations, prix, horaires, annonces, équipe et photos avant / après dans `data/*.json`. Ce fichier se régénère avec `npm run contenu`.");
w();
w(`Rien n'a été inventé côté chiffres : les prix restent vides (« tarif au salon ») tant que le salon ne les a pas donnés. Les durées sont indicatives et **à valider**. La note Google (${site.rating.value}/5, ${site.rating.count} avis) est celle relevée le ${site.rating.asOf}. Les avis ne sont pas cités : le site reprend seulement leurs thèmes (qualité, prix, confiance, mèches).`);
w();
w("Voir aussi : [INFOS-A-DEMANDER.md](INFOS-A-DEMANDER.md).");
w();

w("## Prestations et prix (`data/prestations.json`)");
w();
for (const c of prestations.categories) {
  w(`### ${c.name.fr} / ${c.name.en}`);
  w();
  w("| Prestation | Durée indicative | Prix « à partir de » |");
  w("|---|---|---|");
  for (const s of c.items) w(`| **${s.name.fr}**<br>*${s.name.en}* | ${dur(s.duration) || "—"} (à valider) | ${s.price == null ? "à remplir" : `${s.price} €`} |`);
  w();
}

w("## Horaires (`data/horaires.json`)");
w();
const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
for (const d of [1, 2, 3, 4, 5, 6, 0]) {
  const r = horaires.week[String(d)];
  w(`- ${days[d]} : ${r ? r.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
}
w();
w(`Fermetures exceptionnelles : ${horaires.closures.map((c) => `${c.label.fr} (${c.from === c.to ? c.from : `${c.from} → ${c.to}`})`).join(", ")}.`);
w();

w("## Bandeau d'annonces (`data/annonces.json`)");
w();
for (const a of annonces.items) w(`- **${a.from} → ${a.to}** : ${a.text.fr} *(${a.text.en})* — lien « ${a.link.fr} »`);
w();

w("## Textes du site");
w();
w("Chaque ligne : clé, français, anglais. Les textes marqués **à valider** demandent une confirmation du salon.");
w();
const flags = {
  "faq.items.5": "à valider (moyens de paiement)",
  "faq.items.0": "à valider (accueil sans rendez-vous)",
  "tips": "à valider (conseils d'entretien)",
  "gift": "à valider (bons cadeaux)",
  "salon.products": "à valider (marques utilisées)",
  "wedding": "à valider (essai, coiffure des invités)",
  "pages.mariage": "à valider (déroulé mariage)",
  "infos.accessText": "à valider (accès, stationnement)",
};
const flagOf = (key) => Object.entries(flags).find(([k]) => key === k || key.startsWith(`${k}.`))?.[1];

const SKIP = new Set(["alt", "days"]);
function walk(a, b, key = "") {
  if (typeof a === "string") {
    const f = flagOf(key);
    w(`| \`${key}\` | ${strip(a).replace(/\n/g, "<br>")} | ${strip(b ?? "").replace(/\n/g, "<br>")} |${f ? ` **${f}** |` : " |"}`);
    return;
  }
  if (Array.isArray(a)) return a.forEach((x, i) => walk(x, b?.[i], `${key}.${i}`));
  for (const k of Object.keys(a)) walk(a[k], b?.[k], key ? `${key}.${k}` : k);
}
for (const section of Object.keys(fr)) {
  if (SKIP.has(section)) continue;
  w(`### ${section}`);
  w();
  w("| Clé | Français | English | |");
  w("|---|---|---|---|");
  walk(fr[section], en[section], section);
  w();
}

w("## Textes alternatifs des photos");
w();
w("| Photo | Français | English |");
w("|---|---|---|");
for (const k of Object.keys(fr.alt)) w(`| ${k} | ${fr.alt[k]} | ${en.alt[k]} |`);
w();

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n"));
console.log("CONTENU.md écrit");
