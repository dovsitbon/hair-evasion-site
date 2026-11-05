# Hair Évasion : infos à demander au salon

Le site est en ligne avec ce qu'on sait déjà (Google, Instagram, Pages Jaunes, Planity). Voici ce qui manque, par ordre d'importance. Chaque réponse se reporte dans un fichier précis : rien d'autre à toucher.

## À demander en priorité

1. **Les prix** de chaque prestation, au moins un prix « à partir de » (cheveux courts). Et les **durées** réelles : celles du site sont indicatives.
   → `data/prestations.json` (`price`, `duration`). Tant que c'est vide, le site affiche « tarif au salon ».
2. **L'e-mail** du salon, pour recevoir les demandes de rendez-vous.
   → variable Vercel `BOOKING_NOTIFY_EMAIL` + `RESEND_API_KEY` (compte Resend), puis `RESEND_FROM` une fois le domaine vérifié. Tant que ce n'est pas branché, le client voit « appelez le salon » après l'envoi.
3. **Le nom du gérant et de l'équipe.** Le compte Instagram est au nom de **Guy Jumel** : est-ce bien le gérant ? Accepte-t-il d'apparaître sur le site ? Une photo portrait ?
   → `data/equipe.json` (`name`, `role`, `photo`). Le bloc « Un regard avant les ciseaux » affiche le nom dès qu'il est renseigné.
4. **Les horaires exacts.** Le brief dit mardi–vendredi 9 h–19 h, samedi 9 h–18 h, fermé dimanche et lundi. **Planity et GlowHub affichent autre chose** : ouvert le lundi 9 h–19 h, samedi dès 8 h. À trancher avec lui, puis corriger aussi sa fiche Google si besoin.
   → `data/horaires.json`.
5. **Un portable pour WhatsApp** (le 03 22 92 42 42 est une ligne fixe).
   → `data/site.json` (`whatsapp`, au format 33612345678).
6. **Le numéro 09 67 42 93 17** apparaît dans une ancienne annonce Instagram (fermeture Covid). Est-il encore actif ? Sinon, rien à faire.

## Site actuel et nom de domaine

7. **hair-evasion.fr ne répond plus** (le domaine ne pointe nulle part au 5 novembre 2026), alors que la bio Instagram le cite encore. Qui détient le nom de domaine ? A-t-il expiré ? Si on le récupère, on le branche sur ce site (et on met à jour `data/site.json` → `url`, le sitemap suit).
8. **Outil de réservation** : sa fiche Planity existe mais n'est **pas réservable en ligne**. Utilise-t-il un autre outil (agenda papier, autre logiciel) ? S'il active une réservation en ligne, le bouton « Prendre rendez-vous » peut y renvoyer directement.
   → `data/site.json` (`bookingUrl`).

## Contenus à valider

9. **Bons cadeaux** : en propose-t-il ? Montant libre ou par prestation ? Coffret avec produits ? (Une photo Instagram montre une carte « Bon cadeau » L'Oréal.)
10. **Mariage** : essai compris ou facturé ? Se déplace-t-il sur le lieu des préparatifs (plusieurs photos sont prises dans un château, pas au salon) ? Coiffe-t-il les invités, les enfants ?
11. **Marques** : Leonor Greyl et L'Oréal Professionnel (vues sur Instagram), coloration végétale : quelle marque ?
12. **Paiement** : carte bancaire et espèces (écrit dans la FAQ), chèques ?
13. **Sans rendez-vous** : accepte-t-il les clients de passage ?
14. **Les 4 conseils d'entretien** (section « Entre deux rendez-vous ») : à relire par lui.
15. **Accès / stationnement** : un parking à conseiller ?

## Visuels

16. **Des photos du salon** (intérieur, bacs, espace détente, devanture actuelle) : je les prendrai sur place. Emplacement prévu : `assets/salon/a-photographier/`, puis `npm run media`.
17. **Des paires avant / après** (même cadrage) pour le curseur de comparaison : la section est prête mais masquée tant qu'il n'y en a pas. → `public/media/avant-apres/` + `data/avant-apres.json`.
18. **Le logo d'origine** (fichier vectoriel ou haute définition). En attendant, le site utilise un logo typographique inspiré de l'enseigne (`components/Logo.tsx`, `public/logo.svg`).

## Administratif

19. **SIRET, raison sociale, nom du responsable de publication** pour les mentions légales. → `data/site.json` (`legal`).
