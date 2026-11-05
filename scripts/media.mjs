// Classe les photos Instagram de Hair Évasion (assets/raw/) dans assets/<catégorie>/ avec des noms lisibles,
// puis les prépare pour le web dans public/media/<catégorie>/. next/image sert ensuite AVIF/WebP à la bonne taille.
//   npm run media
//
// 33 photos gardées sur 46. Écartées : 01, 03, 05 (vœux de nouvel an), 02, 04 (panneaux « Closed »),
// 23 (annonce de fermeture Covid, texte seul), 12, 13, 14, 22 (visuels publicitaires L'Oréal / Leonor Greyl),
// 06, 10 (coffrets de Noël avec étiquettes de prix), 16 (mèche en cœur, visuel d'illustration).
// Aucune vraie paire avant / après dans le lot : le dossier assets/avant-apres/ attend ses photos.
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const raw = (n) => path.join(ROOT, "assets/raw", `hair-evasion_${n}.jpg`);

// [n° source, catégorie, nom, recadrage { top, bottom, left, right } en pixels retirés]
const PICKS = [
  ["20_CLe2PTtlnAE", "hero", "balayage-blond-ondule", { left: 540 }],

  ["09_CYcGQKis--j", "balayage", "balayage-caramel-boucles", {}],
  ["19_CRejf2BF1o8", "balayage", "balayage-blond-mur-brique", {}],
  ["33_B5In9tDormv", "balayage", "ombre-chatain-ondule", {}],
  ["34_B46-awqI5NR", "balayage", "tie-and-dye-cuivre", {}],
  ["36_B46-OAUo1CD", "balayage", "boucles-meches-caramel", {}],

  ["30_CDg_03_KnZy", "coiffures", "lissage-long-blond", { left: 420 }],
  ["25_CFMoJgkqo3b", "coiffures", "coupe-courte-femme", { left: 330 }],
  ["37_B46-HrvoAQA", "coiffures", "carre-flou-marguerite", {}],
  ["08_Ci5jmvGMZn5", "coiffures", "chignon-cuivre-flou", {}],
  ["28_CFMoCwFKhjK", "coiffures", "chignon-bas-brun", {}],
  ["15_CTmOBD6slYz", "coiffures", "chignon-ombre-tresse", {}],
  ["17_CTAjKxzKgGU", "coiffures", "chignon-perles-blond", {}],
  ["24_CGU3vtsnPgb", "coiffures", "chignon-bijou-dore", {}],
  ["29_CFMn_CQq7XM", "coiffures", "chignon-haut-strass", {}],
  ["26_CFMoHPOK444", "coiffures", "enfant-chignon-roses", {}],
  ["27_CFMoEiIqgc7", "coiffures", "enfant-queue-boucles-roses", {}],

  ["logo", "mariage", "chignon-tresse-bijou", {}],
  ["40_B293C53IVWX", "mariage", "mariee-chignon-dentelle", {}],
  ["39_B293Is3Io6w", "mariage", "mariee-ondulee-gypsophile", {}],
  ["45_B28nxl-ount", "mariage", "mariee-tresse-boheme", {}],
  ["44_B28oedJI5Yc", "mariage", "chignon-tresse-fleur-poudree", {}],
  ["43_B28oqTOInWe", "mariage", "chignon-couronne-fleurs", {}],
  ["41_B29VIMwIdCA", "mariage", "temoin-chignon-gypsophile", {}],
  ["42_B28pDV4IPzk", "mariage", "deux-coiffures-ceremonie", {}],
  ["38_B293OMwIWpT", "mariage", "demi-attache-blond", {}],
  ["07_Ci5kBqsMbq7", "mariage", "chignon-tresse-gypsophile", {}],
  ["31_CB8CZQzK-a5", "mariage", "chignon-flou-fleurs", {}],
  ["35_B46-VhYI2IY", "mariage", "demi-attache-fleurs-sechees", {}],

  ["21_CJg1rMVlWyI", "salon", "devanture-rue-au-lin", {}],
  ["18_CRt2_dol-Cq", "salon", "huile-leonor-greyl", {}],
  ["32_B5-qnjaIhUT", "salon", "trousse-leonor-greyl", {}],
  ["11_CXjkGfJMk-4", "salon", "coffret-bon-cadeau", {}],
];

const sizes = {};
for (const [n, cat, name, c] of PICKS) {
  const file = raw(n);
  const meta = await sharp(file).metadata();
  const box = {
    left: c.left ?? 0,
    top: c.top ?? 0,
    width: meta.width - (c.left ?? 0) - (c.right ?? 0),
    height: meta.height - (c.top ?? 0) - (c.bottom ?? 0),
  };
  await mkdir(path.join(ROOT, "assets", cat), { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  const cropped = sharp(file).rotate().extract(box);
  await cropped.clone().jpeg({ quality: 92 }).toFile(path.join(ROOT, "assets", cat, `${name}.jpg`));
  const max = cat === "hero" ? 2000 : 1400;
  const info = await cropped
    .clone()
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
  sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
}

// Emplacements prévus : photos du salon à prendre sur place, paires avant / après
for (const dir of ["assets/salon/a-photographier", "assets/avant-apres", "public/media/avant-apres"]) await mkdir(path.join(ROOT, dir), { recursive: true });

// Image de partage (Open Graph) 1200 × 630 : le balayage blond, cadré sur les longueurs.
// Recadrages à gauche (hero, lissage, coupe courte) : masques de l'époque Covid visibles sur le côté ou en arrière-plan.
await sharp(raw("20_CLe2PTtlnAE"))
  .extract({ left: 540, top: 500, width: 900, height: 473 })
  .resize(1200, 630)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
await copyFile(raw("logo"), path.join(ROOT, "assets/logo-instagram.jpg"));
console.log(`${PICKS.length} images prêtes`);
