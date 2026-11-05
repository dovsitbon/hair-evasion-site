# Hair Évasion : site vitrine et demande de rendez-vous

Coiffeur visagiste mixte, 4 rue au Lin, 80000 Amiens. Next.js 16, Tailwind 4, Motion. Français par défaut (`/fr`), anglais (`/en`).

## Lancer

```bash
npm install
npm run dev
```

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Textes FR / EN | `locales/fr.json`, `locales/en.json` |
| Prestations, durées, prix « à partir de » | `data/prestations.json` |
| Horaires, fermetures exceptionnelles (statut « Ouvert / Fermé » en direct) | `data/horaires.json` |
| Bandeau d'annonces (fermetures, offres) | `data/annonces.json` |
| Téléphone, e-mail, WhatsApp, note Google, lien de réservation | `data/site.json` |
| Gérant / équipe | `data/equipe.json` |
| Paires avant / après | `data/avant-apres.json` |
| Photos | `assets/raw/` → `npm run media` (classe dans `assets/<catégorie>/` et prépare `public/media/`) |
| Logo | `components/Logo.tsx`, `public/logo.svg`, `app/icon.svg` |

## Scripts

- `npm run media` : trie et prépare les photos, génère `data/media-sizes.json` et `public/og.jpg`.
- `npm run contenu` : régénère `CONTENU.md` (tous les textes pour validation).
- `npm run affichette` : affichette A5 avec QR code → `public/affichette-hair-evasion-a5.pdf`.

## Demandes de rendez-vous (Resend)

Variables Vercel : `RESEND_API_KEY`, `BOOKING_NOTIFY_EMAIL` (adresse du salon), `RESEND_FROM` (expéditeur sur domaine vérifié). Sans elles, la demande est acceptée et le client est invité à appeler.

Infos encore attendues du salon : [INFOS-A-DEMANDER.md](INFOS-A-DEMANDER.md).
