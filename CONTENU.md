# Hair Évasion : contenu du site

Tous les textes du site, en français et en anglais, pour relecture. Les corrections se font dans `locales/fr.json` et `locales/en.json` ; prestations, prix, horaires, annonces, équipe et photos avant / après dans `data/*.json`. Ce fichier se régénère avec `npm run contenu`.

Rien n'a été inventé côté chiffres : les prix restent vides (« tarif au salon ») tant que le salon ne les a pas donnés. Les durées sont indicatives et **à valider**. La note Google (4.8/5, 55 avis) est celle relevée le 2026-11-05. Les avis ne sont pas cités : le site reprend seulement leurs thèmes (qualité, prix, confiance, mèches).

Voir aussi : [INFOS-A-DEMANDER.md](INFOS-A-DEMANDER.md).

## Prestations et prix (`data/prestations.json`)

### Coupe & visagisme / Cut & face-shape styling

| Prestation | Durée indicative | Prix « à partir de » |
|---|---|---|
| **Coupe femme, shampooing et brushing**<br>*Women's cut, wash and blow-dry* | 1 h (à valider) | à remplir |
| **Coupe au rasoir**<br>*Razor cut* | 45 min (à valider) | à remplir |
| **Bilan capillaire et conseil visagiste**<br>*Hair assessment and face-shape advice* | 30 min (à valider) | à remplir |
| **Relooking coupe et couleur**<br>*Full makeover, cut and colour* | 3 h (à valider) | à remplir |

### Couleur & balayage / Colour & balayage

| Prestation | Durée indicative | Prix « à partir de » |
|---|---|---|
| **Coloration**<br>*Colour* | 1 h 30 (à valider) | à remplir |
| **Coloration végétale**<br>*Plant-based colour* | 2 h (à valider) | à remplir |
| **Balayage**<br>*Balayage* | 2 h 30 (à valider) | à remplir |
| **Mèches**<br>*Highlights* | 2 h (à valider) | à remplir |
| **Ombré hair, tie and dye**<br>*Ombré, tie and dye* | 2 h 30 (à valider) | à remplir |

### Lissages & soins / Smoothing & treatments

| Prestation | Durée indicative | Prix « à partir de » |
|---|---|---|
| **Lissage japonais**<br>*Japanese straightening* | 4 h (à valider) | à remplir |
| **Lissage**<br>*Smoothing treatment* | 2 h 30 (à valider) | à remplir |
| **Permanente sans ammoniaque**<br>*Ammonia-free perm* | 2 h (à valider) | à remplir |
| **Soin aux plantes**<br>*Plant-based hair treatment* | 30 min (à valider) | à remplir |

### Mariage & événements / Weddings & events

| Prestation | Durée indicative | Prix « à partir de » |
|---|---|---|
| **Mise en plis**<br>*Set and style* | 45 min (à valider) | à remplir |
| **Chignon, coiffure de soirée**<br>*Updo, evening hair* | 1 h (à valider) | à remplir |
| **Coiffure de mariée**<br>*Bridal hair* | 1 h 30 (à valider) | à remplir |
| **Essai coiffure de mariée**<br>*Bridal hair trial* | 1 h 30 (à valider) | à remplir |

### Homme & enfant / Men & children

| Prestation | Durée indicative | Prix « à partir de » |
|---|---|---|
| **Coupe homme**<br>*Men's cut* | 30 min (à valider) | à remplir |
| **Barbier : taille de barbe**<br>*Barber: beard trim* | 20 min (à valider) | à remplir |
| **Coupe enfant**<br>*Children's cut* | 30 min (à valider) | à remplir |

## Horaires (`data/horaires.json`)

- lundi : fermé
- mardi : 09:00 – 19:00
- mercredi : 09:00 – 19:00
- jeudi : 09:00 – 19:00
- vendredi : 09:00 – 19:00
- samedi : 09:00 – 18:00
- dimanche : fermé

Fermetures exceptionnelles : Noël (2026-12-25), Jour de l'an (2027-01-01).

## Bandeau d'annonces (`data/annonces.json`)

- **2026-11-01 → 2026-12-24** : Fêtes de fin d'année : pensez au bon cadeau Hair Évasion, et réservez tôt vos rendez-vous de décembre. *(Holiday season: think of a Hair Évasion gift voucher, and book your December appointments early.)* — lien « Offrir un bon cadeau »
- **2026-12-25 → 2027-01-01** : Le salon est fermé le 25 décembre et le 1er janvier. Toute l'équipe vous souhaite de belles fêtes. *(The salon is closed on 25 December and 1 January. The whole team wishes you happy holidays.)* — lien « Prendre rendez-vous »

## Textes du site

Chaque ligne : clé, français, anglais. Les textes marqués **à valider** demandent une confirmation du salon.

### meta

| Clé | Français | English | |
|---|---|---|---|
| `meta.title` | Coiffeur visagiste à Amiens centre | Hair Évasion, 4 rue au Lin | Hairdresser in central Amiens | Hair Évasion, 4 rue au Lin | |
| `meta.description` | Hair Évasion, coiffeur visagiste mixte au centre d’Amiens : coupe, balayage, coloration végétale, lissage japonais, coiffure de mariée. 4,8/5 sur Google. | Hair Évasion, hairdresser for women, men and children in central Amiens: cuts, balayage, plant-based colour, Japanese straightening, bridal hair. 4.8/5 on Google. | |
| `meta.ogAlt` | Balayage blond ondulé réalisé au salon Hair Évasion, à Amiens | Blonde balayage on long wavy hair, done at Hair Évasion in Amiens | |

### nav

| Clé | Français | English | |
|---|---|---|---|
| `nav.prestations` | Prestations | Services | |
| `nav.couleur` | Couleur & balayage | Colour & balayage | |
| `nav.mariage` | Mariage | Weddings | |
| `nav.salon` | Le salon | The salon | |
| `nav.infos` | Infos | Visit | |
| `nav.book` | Prendre rendez-vous | Book an appointment | |
| `nav.call` | Appeler | Call | |
| `nav.menu` | Menu | Menu | |
| `nav.close` | Fermer le menu | Close menu | |
| `nav.home` | Hair Évasion, accueil | Hair Évasion, home | |
| `nav.instagram` | Hair Évasion sur Instagram | Hair Évasion on Instagram | |
| `nav.lang` | Langue | Language | |
| `nav.skip` | Aller au contenu | Skip to content | |

### intro

| Clé | Français | English | |
|---|---|---|---|
| `intro.skip` | Passer | Skip | |

### announce

| Clé | Français | English | |
|---|---|---|---|
| `announce.close` | Fermer le bandeau | Close banner | |

### status

| Clé | Français | English | |
|---|---|---|---|
| `status.open` | Ouvert maintenant | Open now | |
| `status.closed` | Fermé | Closed | |
| `status.until` | jusqu’à {time} | until {time} | |
| `status.reopens` | réouverture {day} à {time} | opens {day} at {time} | |
| `status.today` | aujourd’hui | today | |
| `status.tomorrow` | demain | tomorrow | |

### rating

| Clé | Français | English | |
|---|---|---|---|
| `rating.label` | {value}/5 sur Google | {value}/5 on Google | |
| `rating.count` | {count} avis | {count} reviews | |
| `rating.asOf` | Note relevée en {date} | Rating as of {date} | |

### hero

| Clé | Français | English | |
|---|---|---|---|
| `hero.eyebrow` | Coiffeur visagiste · Amiens centre | Hair & face-shape styling · Central Amiens | |
| `hero.title` | La coupe et la couleur *qui vous ressemblent* | The cut and colour *that look like you* | |
| `hero.lead` | Femmes, hommes, enfants : on commence par vous regarder, votre visage, vos cheveux, votre façon de vivre, avant de prendre les ciseaux. | Women, men, children: we start by looking at you, your face, your hair, the way you live, before we pick up the scissors. | |
| `hero.book` | Prendre rendez-vous | Book an appointment | |
| `hero.services` | Voir les prestations | See our services | |

### bar

| Clé | Français | English | |
|---|---|---|---|
| `bar.label` | Demande de rendez-vous | Appointment request | |
| `bar.service` | Prestation | Service | |
| `bar.serviceAny` | Je ne sais pas encore | Not sure yet | |
| `bar.day` | Jour souhaité | Preferred day | |
| `bar.dayAny` | Peu importe | Any day | |
| `bar.submit` | Continuer | Continue | |

### tiles

| Clé | Français | English | |
|---|---|---|---|
| `tiles.eyebrow` | Au salon | At the salon | |
| `tiles.title` | Ce que nous faisons, et bien | What we do, and do well | |
| `tiles.items.coupe.title` | Coupe & visagisme | Cut & face shape | |
| `tiles.items.coupe.text` | Une coupe pensée pour la forme de votre visage et la nature de vos cheveux. | A cut designed around the shape of your face and the nature of your hair. | |
| `tiles.items.couleur.title` | Couleur & balayage | Colour & balayage | |
| `tiles.items.couleur.text` | Balayage, mèches, ombré, coloration classique ou végétale. | Balayage, highlights, ombré, classic or plant-based colour. | |
| `tiles.items.lissage.title` | Lissages & soins | Smoothing & care | |
| `tiles.items.lissage.text` | Lissage japonais, permanente sans ammoniaque, soins aux plantes. | Japanese straightening, ammonia-free perms, plant-based treatments. | |
| `tiles.items.mariage.title` | Mariage & événements | Weddings & events | |
| `tiles.items.mariage.text` | Chignons, coiffures de mariée et d’invitées, essai compris. | Updos, bridal and guest hair, trial included. | |
| `tiles.items.homme-enfant.title` | Homme & enfant | Men & children | |
| `tiles.items.homme-enfant.text` | Coupe homme, coupe au rasoir, barbe, et les plus petits. | Men’s cuts, razor cuts, beard trims, and the little ones. | |

### prices

| Clé | Français | English | |
|---|---|---|---|
| `prices.eyebrow` | Prestations et tarifs | Services and prices | |
| `prices.title` | La carte du salon | The salon menu | |
| `prices.lead` | Les prix s’entendent à partir de, pour des cheveux courts. Pour une couleur ou un lissage, le tarif dépend de la longueur et de l’épaisseur : on vous le donne avant de commencer. | Prices are starting prices, for short hair. For colour or smoothing, the price depends on length and thickness: we tell you before we begin. | |
| `prices.from` | à partir de {price} | from {price} | |
| `prices.onRequest` | tarif au salon | price at the salon | |
| `prices.duration` | env. {time} | approx. {time} | |
| `prices.book` | Demander ce rendez-vous | Request this appointment | |
| `prices.note` | Durées indicatives. Un bilan visagiste peut précéder n’importe quelle prestation. | Durations are a guide. A face-shape consultation can come before any service. | |

### beforeAfter

| Clé | Français | English | |
|---|---|---|---|
| `beforeAfter.eyebrow` | Avant / après | Before / after | |
| `beforeAfter.title` | Le même visage, une autre lumière | Same face, different light | |
| `beforeAfter.lead` | Faites glisser le curseur pour comparer. | Drag the slider to compare. | |
| `beforeAfter.before` | Avant | Before | |
| `beforeAfter.after` | Après | After | |
| `beforeAfter.handle` | Comparer avant et après | Compare before and after | |

### reviews

| Clé | Français | English | |
|---|---|---|---|
| `reviews.eyebrow` | Avis Google | Google reviews | |
| `reviews.title` | Ce qui revient le plus souvent | What clients mention most | |
| `reviews.themes.0` | Le travail soigné | Careful, precise work | |
| `reviews.themes.1` | Des prix justes | Fair prices | |
| `reviews.themes.2` | La confiance, rendez-vous après rendez-vous | Trust, appointment after appointment | |
| `reviews.themes.3` | Les mèches et le balayage | Highlights and balayage | |
| `reviews.cta` | Lire les avis sur Google | Read the reviews on Google | |

### wedding

| Clé | Français | English | |
|---|---|---|---|
| `wedding.eyebrow` | Mariage | Weddings | **à valider (essai, coiffure des invités)** |
| `wedding.title` | Le jour J, une coiffure qui tient jusqu’au bout de la nuit | On the day, hair that lasts until the very last dance | **à valider (essai, coiffure des invités)** |
| `wedding.lead` | Chignon tressé, ondulations libres, demi-attaché fleuri : on dessine votre coiffure avec vous, on la teste lors d’un essai, et on s’occupe aussi de vos proches. | Braided bun, loose waves, half-up with flowers: we design your hair with you, test it at a trial, and look after your loved ones too. | **à valider (essai, coiffure des invités)** |
| `wedding.points.0` | Un essai pour caler la coiffure, les accessoires et le timing | A trial to settle the style, the accessories and the timing | **à valider (essai, coiffure des invités)** |
| `wedding.points.1` | Mariée, témoins, mamans, petites demoiselles d’honneur | Bride, bridesmaids, mothers, little flower girls | **à valider (essai, coiffure des invités)** |
| `wedding.points.2` | Fleurs fraîches ou séchées, bijoux de cheveux, voile | Fresh or dried flowers, hair jewellery, veil | **à valider (essai, coiffure des invités)** |
| `wedding.cta` | Demander un rendez-vous mariage | Request a wedding appointment | **à valider (essai, coiffure des invités)** |
| `wedding.more` | Tout sur la coiffure de mariage | All about wedding hair | **à valider (essai, coiffure des invités)** |

### salon

| Clé | Français | English | |
|---|---|---|---|
| `salon.eyebrow` | Le salon | The salon | |
| `salon.title` | Rue au Lin, en plein centre d’Amiens | Rue au Lin, right in the centre of Amiens | |
| `salon.text` | Hair Évasion, c’est un salon de centre-ville où l’on prend le temps. On vous écoute d’abord, on regarde la forme de votre visage, la texture de vos cheveux, votre façon de vous coiffer le matin. Ensuite seulement on propose une coupe ou une couleur. | Hair Évasion is a city-centre salon where we take our time. We listen first, look at the shape of your face, the texture of your hair, how you style it in the morning. Only then do we suggest a cut or a colour. | |
| `salon.portrait.eyebrow` | Visagiste | Face-shape styling | |
| `salon.portrait.title` | Un regard avant les ciseaux | A careful look before the scissors | |
| `salon.portrait.text` | Le visagisme, c’est choisir la longueur, le volume et les reflets qui mettent en valeur vos traits. Pas de coupe imposée, pas de tendance plaquée sur tout le monde. | Face-shape styling means choosing the length, volume and tones that bring out your features. No one-size-fits-all cut, no trend pasted onto everyone. | |
| `salon.space.title` | Un moment pour vous | Time for yourself | |
| `salon.space.text` | Un shampooing qui prend son temps, un massage du cuir chevelu, un café : le salon est fait pour qu’on s’y pose. | An unhurried shampoo, a scalp massage, a coffee: the salon is made for slowing down. | |
| `salon.products.title` | Des soins qui respectent le cheveu | Care that respects your hair | **à valider (marques utilisées)** |
| `salon.products.text` | Au bac et en boutique, nous travaillons avec Leonor Greyl, soins naturels du cheveu, et L’Oréal Professionnel. Pour la couleur, la coloration végétale est proposée à celles et ceux qui veulent une couleur plus douce. | At the basin and in the shop, we work with Leonor Greyl natural hair care and L’Oréal Professionnel. For colour, plant-based colour is available if you want something gentler. | **à valider (marques utilisées)** |
| `salon.frontAlt` | La devanture du salon | The salon’s shopfront | |

### tips

| Clé | Français | English | |
|---|---|---|---|
| `tips.eyebrow` | Conseils | Advice | **à valider (conseils d'entretien)** |
| `tips.title` | Entre deux rendez-vous | Between appointments | **à valider (conseils d'entretien)** |
| `tips.lead` | Quelques gestes simples pour que votre coupe et votre couleur durent. | A few simple habits to make your cut and colour last. | **à valider (conseils d'entretien)** |
| `tips.items.0.title` | Garder l’éclat d’un balayage | Keeping balayage bright | **à valider (conseils d'entretien)** |
| `tips.items.0.text` | Un shampooing doux, sans sulfates, un masque une fois par semaine et une eau tiède plutôt que chaude. Un gloss au salon toutes les 6 à 8 semaines ravive les reflets. | A gentle sulphate-free shampoo, a mask once a week and lukewarm rather than hot water. A gloss at the salon every 6 to 8 weeks revives the tones. | **à valider (conseils d'entretien)** |
| `tips.items.1.title` | Après une coloration | After colouring | **à valider (conseils d'entretien)** |
| `tips.items.1.text` | Attendez 48 heures avant le premier shampooing pour laisser la couleur se fixer, et protégez vos cheveux du soleil et du chlore. | Wait 48 hours before the first wash so the colour can set, and protect your hair from sun and chlorine. | **à valider (conseils d'entretien)** |
| `tips.items.2.title` | Le bon rythme pour une coupe | How often to cut | **à valider (conseils d'entretien)** |
| `tips.items.2.text` | Toutes les 6 semaines pour une coupe courte ou un carré, toutes les 8 à 10 semaines pour des cheveux longs : les pointes restent nettes et la forme tient. | Every 6 weeks for a short cut or a bob, every 8 to 10 weeks for long hair: the ends stay neat and the shape holds. | **à valider (conseils d'entretien)** |
| `tips.items.3.title` | Brushing et chaleur | Blow-drying and heat | **à valider (conseils d'entretien)** |
| `tips.items.3.text` | Appliquez toujours un protecteur thermique et gardez le fer en dessous de 180 °C. Un séchage à l’air libre, de temps en temps, fait du bien aux longueurs. | Always use a heat protectant and keep straighteners below 180 °C. Letting your hair air-dry now and then does the lengths good. | **à valider (conseils d'entretien)** |

### gift

| Clé | Français | English | |
|---|---|---|---|
| `gift.eyebrow` | Idées cadeaux | Gift ideas | **à valider (bons cadeaux)** |
| `gift.title` | Offrir un moment au salon | Give time at the salon | **à valider (bons cadeaux)** |
| `gift.text` | Un bon cadeau pour une coupe, une couleur, un soin, ou un montant libre, à glisser dans un joli coffret avec les soins qu’elle ou il aime déjà. Il se prépare au salon, sur simple appel. | A gift voucher for a cut, a colour, a treatment or any amount you like, tucked into a pretty box with the products they already love. Prepared at the salon, just give us a call. | **à valider (bons cadeaux)** |
| `gift.cta` | Demander un bon cadeau | Request a gift voucher | **à valider (bons cadeaux)** |
| `gift.call` | Ou appelez le salon | Or call the salon | **à valider (bons cadeaux)** |

### infos

| Clé | Français | English | |
|---|---|---|---|
| `infos.eyebrow` | Infos pratiques | Visit us | |
| `infos.title` | Venir au salon | Getting to the salon | |
| `infos.address` | Adresse | Address | |
| `infos.hours` | Horaires | Opening hours | |
| `infos.access` | Accès | Getting here | |
| `infos.accessText` | En plein centre-ville, à quelques minutes à pied de la place Gambetta et de la cathédrale. Pensez à vous garer un peu en avance : les parkings du centre se remplissent vite le samedi. | Right in the town centre, a few minutes' walk from Place Gambetta and the cathedral. Leave a little extra time to park: city-centre car parks fill up quickly on Saturdays. | **à valider (accès, stationnement)** |
| `infos.phone` | Téléphone | Phone | |
| `infos.route` | Itinéraire | Directions | |
| `infos.closedDay` | Fermé | Closed | |
| `infos.closures` | Fermetures à venir | Upcoming closures | |
| `infos.mapTitle` | Carte : Hair Évasion, 4 rue au Lin, Amiens | Map: Hair Évasion, 4 rue au Lin, Amiens | |

### faq

| Clé | Français | English | |
|---|---|---|---|
| `faq.eyebrow` | Questions fréquentes | Questions | |
| `faq.title` | Avant de venir | Before you come | |
| `faq.items.0.q` | Faut-il prendre rendez-vous ? | Do I need an appointment? | **à valider (accueil sans rendez-vous)** |
| `faq.items.0.a` | C’est préférable, surtout pour une couleur, un balayage ou un lissage. Pour une coupe simple, appelez-nous : s’il y a de la place, on vous prend dans la journée. | It’s best, especially for colour, balayage or smoothing. For a simple cut, give us a call: if there’s room, we’ll fit you in the same day. | **à valider (accueil sans rendez-vous)** |
| `faq.items.1.q` | Combien de temps dure un balayage ? | How long does balayage take? | |
| `faq.items.1.a` | Comptez en général entre 2 h et 3 h, shampooing, patine et coiffage compris. Tout dépend de la longueur, de l’épaisseur et de la couleur de départ : on vous donne une durée précise en prenant le rendez-vous. | Usually between 2 and 3 hours, including wash, toner and styling. It depends on length, thickness and your starting colour: we give you an exact time when you book. | |
| `faq.items.2.q` | Proposez-vous une coloration végétale ? | Do you offer plant-based colour? | |
| `faq.items.2.a` | Oui. Elle convient à celles et ceux qui veulent une couleur plus douce pour le cuir chevelu. Un bilan au salon permet de voir si elle est adaptée à vos cheveux. | Yes. It suits people who want colour that is gentler on the scalp. A quick assessment at the salon tells us whether it’s right for your hair. | |
| `faq.items.3.q` | Comment se passe un lissage japonais ? | What is Japanese straightening like? | |
| `faq.items.3.a` | C’est un lissage permanent : les cheveux traités restent lisses jusqu’à la repousse. La séance est longue (plusieurs heures) et on vérifie d’abord ensemble l’état de vos cheveux. | It’s a permanent straightening: treated hair stays straight until it grows out. The session is long (several hours) and we check the condition of your hair together first. | |
| `faq.items.4.q` | Coiffez-vous les mariées et leurs invités ? | Do you do hair for brides and their guests? | |
| `faq.items.4.a` | Oui : la mariée, mais aussi les témoins, les mamans et les enfants. On commence par un essai, quelques semaines avant le mariage. | Yes: the bride, and also bridesmaids, mothers and children. We start with a trial a few weeks before the wedding. | |
| `faq.items.5.q` | Comment puis-je payer ? | How can I pay? | **à valider (moyens de paiement)** |
| `faq.items.5.a` | Le règlement se fait au salon, à la fin de la prestation, par carte bancaire ou en espèces. | You pay at the salon after your appointment, by card or in cash. | **à valider (moyens de paiement)** |
| `faq.items.6.q` | Ma demande de rendez-vous en ligne est-elle confirmée ? | Is my online request a confirmed booking? | |
| `faq.items.6.a` | Pas encore : le salon vous rappelle pour vous proposer un créneau et le confirmer avec vous. | Not yet: the salon calls you back to offer a time and confirm it with you. | |

### footer

| Clé | Français | English | |
|---|---|---|---|
| `footer.tagline` | Coiffeur visagiste mixte au centre d’Amiens. Coupe, couleur, balayage, lissage et coiffures de mariage. | Hair salon for women, men and children in central Amiens. Cuts, colour, balayage, smoothing and wedding hair. | |
| `footer.contact` | Contact | Contact | |
| `footer.pages` | À voir | Explore | |
| `footer.rights` | Hair Évasion, Amiens | Hair Évasion, Amiens | |
| `footer.legal` | Mentions légales | Legal notice | |
| `footer.days` | Du mardi au vendredi, 9 h – 19 h<br>Le samedi, 9 h – 18 h | Tuesday to Friday, 9am – 7pm<br>Saturday, 9am – 6pm | |
| `footer.closed` | Fermé le dimanche et le lundi | Closed Sunday and Monday | |

### booking

| Clé | Français | English | |
|---|---|---|---|
| `booking.eyebrow` | Demande de rendez-vous | Appointment request | |
| `booking.title` | Votre prochain rendez-vous | Your next appointment | |
| `booking.lead` | Dites-nous ce que vous aimeriez et quand vous êtes disponible. Le salon vous rappelle pour fixer l’heure avec vous. | Tell us what you’d like and when you’re free. The salon calls you back to set the time with you. | |
| `booking.preferCall` | Plus simple au téléphone ? | Easier by phone? | |
| `booking.sections.services` | Ce que vous souhaitez | What you’d like | |
| `booking.sections.hair` | Vos cheveux | Your hair | |
| `booking.sections.when` | Vos disponibilités | When you’re free | |
| `booking.sections.wedding` | Votre mariage | Your wedding | |
| `booking.sections.contact` | Vos coordonnées | Your details | |
| `booking.fields.services` | Prestations | Services | |
| `booking.fields.servicesHint` | Plusieurs choix possibles. | Choose as many as you like. | |
| `booking.fields.length` | Longueur de vos cheveux | Hair length | |
| `booking.fields.lengths.courts` | Courts | Short | |
| `booking.fields.lengths.mi-longs` | Mi-longs | Medium | |
| `booking.fields.lengths.longs` | Longs | Long | |
| `booking.fields.lengths.tres-longs` | Très longs | Very long | |
| `booking.fields.first` | Est-ce votre première visite au salon ? | Is this your first visit to the salon? | |
| `booking.fields.yes` | Oui | Yes | |
| `booking.fields.no` | Non | No | |
| `booking.fields.days` | Jours qui vous arrangent | Days that suit you | |
| `booking.fields.slots` | Moments de la journée | Times of day | |
| `booking.fields.slotList.matin` | Matin | Morning | |
| `booking.fields.slotList.midi` | Midi | Midday | |
| `booking.fields.slotList.apres-midi` | Après-midi | Afternoon | |
| `booking.fields.slotList.fin` | Fin de journée | Late afternoon | |
| `booking.fields.date` | Une date précise ? | A specific date? | |
| `booking.fields.dateHint` | Facultatif. | Optional. | |
| `booking.fields.weddingDate` | Date du mariage | Wedding date | |
| `booking.fields.trial` | Souhaitez-vous un essai ? | Would you like a trial? | |
| `booking.fields.trialList.oui` | Oui | Yes | |
| `booking.fields.trialList.non` | Non | No | |
| `booking.fields.trialList.a-voir` | À voir ensemble | Let’s discuss | |
| `booking.fields.people` | Nombre de personnes à coiffer | Number of people to style | |
| `booking.fields.name` | Nom et prénom | Full name | |
| `booking.fields.phone` | Téléphone | Phone | |
| `booking.fields.email` | E-mail | Email | |
| `booking.fields.emailHint` | Pour recevoir le récapitulatif de votre demande. | To receive a summary of your request. | |
| `booking.fields.photo` | Photo d’inspiration | Inspiration photo | |
| `booking.fields.photoHint` | Facultatif. Une coupe, une couleur que vous aimez (JPG, PNG ou HEIC). | Optional. A cut or colour you like (JPG, PNG or HEIC). | |
| `booking.fields.photoChange` | Changer | Change | |
| `booking.fields.photoRemove` | Retirer | Remove | |
| `booking.fields.message` | Message | Message | |
| `booking.fields.messagePh` | Votre couleur actuelle, une envie, une contrainte d’horaire… | Your current colour, an idea, a time constraint… | |
| `booking.fields.giftNote` | Pour un bon cadeau, indiquez la prestation ou le montant dans le message. | For a gift voucher, mention the service or amount in your message. | |
| `booking.submit` | Envoyer ma demande | Send my request | |
| `booking.sending` | Envoi… | Sending… | |
| `booking.privacy` | Vos coordonnées servent uniquement à vous rappeler pour ce rendez-vous. | Your details are only used to call you back about this appointment. | |
| `booking.errors.services` | Choisissez au moins une prestation. | Choose at least one service. | |
| `booking.errors.name` | Indiquez votre nom. | Please enter your name. | |
| `booking.errors.phone` | Indiquez un numéro de téléphone valide. | Please enter a valid phone number. | |
| `booking.errors.email` | Cette adresse e-mail ne semble pas valide. | This email address doesn’t look right. | |
| `booking.errors.photo` | La photo n’a pas pu être lue. Essayez une autre image. | We couldn’t read that photo. Try another image. | |
| `booking.errors.generic` | L’envoi n’a pas abouti. Réessayez, ou appelez le salon. | Your request didn’t go through. Please try again, or call the salon. | |
| `booking.success.title` | Merci, votre demande est bien partie | Thank you, your request has been sent | |
| `booking.success.text` | Le salon vous rappelle pour vous proposer un créneau et le confirmer avec vous. | The salon will call you back to offer a time and confirm it with you. | |
| `booking.success.email` | Un récapitulatif vient de vous être envoyé par e-mail. | A summary has just been sent to your email. | |
| `booking.success.notNotified` | Dernière étape : pour être sûr que votre demande soit vue rapidement, appelez le salon. | One last step: to make sure your request is seen quickly, please call the salon. | |
| `booking.success.again` | Faire une autre demande | Make another request | |
| `booking.message.title` | Demande de rendez-vous | Appointment request | |
| `booking.message.services` | Prestations | Services | |
| `booking.message.length` | Longueur | Length | |
| `booking.message.first` | Première visite | First visit | |
| `booking.message.days` | Jours | Days | |
| `booking.message.slots` | Moments | Times | |
| `booking.message.date` | Date souhaitée | Preferred date | |
| `booking.message.weddingDate` | Date du mariage | Wedding date | |
| `booking.message.trial` | Essai | Trial | |
| `booking.message.people` | Personnes à coiffer | People to style | |
| `booking.message.name` | Nom | Name | |
| `booking.message.phone` | Téléphone | Phone | |
| `booking.message.email` | E-mail | Email | |
| `booking.message.message` | Message | Message | |
| `booking.message.photo` | Photo d’inspiration en pièce jointe | Inspiration photo attached | |
| `booking.email.subject` | Demande de rendez-vous | Appointment request | |
| `booking.email.confirmSubject` | Hair Évasion : nous avons bien reçu votre demande | Hair Évasion: we’ve received your request | |
| `booking.email.confirmIntro` | Bonjour {name},<br><br>Merci pour votre demande de rendez-vous. Le salon vous rappelle très vite pour vous proposer un créneau. Voici ce que vous nous avez envoyé : | Hello {name},<br><br>Thank you for your appointment request. The salon will call you back very soon to offer a time. Here is what you sent us: | |
| `booking.email.confirmOutro` | À bientôt au salon,<br>Hair Évasion<br>4 rue au Lin, 80000 Amiens<br>03 22 92 42 42 | See you soon at the salon,<br>Hair Évasion<br>4 rue au Lin, 80000 Amiens, France<br>+33 3 22 92 42 42 | |

### pages

| Clé | Français | English | |
|---|---|---|---|
| `pages.rdv.metaTitle` | Prendre rendez-vous chez votre coiffeur à Amiens | Hair Évasion | Book a hairdresser in Amiens | Hair Évasion | |
| `pages.rdv.metaDescription` | Demandez votre rendez-vous chez Hair Évasion, coiffeur visagiste rue au Lin à Amiens : coupe, couleur, balayage, lissage, mariage. Le salon vous rappelle pour confirmer. | Request an appointment at Hair Évasion, rue au Lin in central Amiens: cuts, colour, balayage, smoothing, weddings. The salon calls you back to confirm. | |
| `pages.balayage.metaTitle` | Balayage à Amiens : blond, caramel, ombré | Hair Évasion | Balayage in Amiens: blonde, caramel, ombré | Hair Évasion | |
| `pages.balayage.metaDescription` | Balayage, mèches, ombré et tie and dye au centre d’Amiens. Des reflets dessinés à la main selon votre visage et votre teint, chez Hair Évasion, 4 rue au Lin. | Balayage, highlights, ombré and tie and dye in central Amiens. Hand-painted tones chosen for your face and skin tone, at Hair Évasion, 4 rue au Lin. | |
| `pages.balayage.eyebrow` | Couleur · Amiens centre | Colour · Central Amiens | |
| `pages.balayage.title` | Balayage à Amiens | Balayage in Amiens | |
| `pages.balayage.intro` | Un balayage réussi ne se voit pas comme une couleur : on dirait que vos cheveux ont pris le soleil. Chez Hair Évasion, les reflets sont posés à la main, mèche par mèche, en fonction de votre visage, de votre teint et de votre base naturelle. | Good balayage doesn’t look like colour: it looks like your hair has caught the sun. At Hair Évasion, tones are painted by hand, section by section, to suit your face, your skin tone and your natural base. | |
| `pages.balayage.sections.0.title` | Blond, caramel, cuivré | Blonde, caramel, copper | |
| `pages.balayage.sections.0.text` | Blond lumineux sur des cheveux clairs, caramel ou miel sur un châtain, reflets cuivrés pour réchauffer un brun : on choisit ensemble la nuance qui éclaire votre visage, sans effet de racine marquée. | Bright blonde on fair hair, caramel or honey on light brown, copper tones to warm up dark hair: we choose together the shade that lights up your face, without a harsh regrowth line. | |
| `pages.balayage.sections.1.title` | Balayage, mèches ou ombré ? | Balayage, highlights or ombré? | |
| `pages.balayage.sections.1.text` | Le balayage donne des reflets fondus, posés à main levée. Les mèches éclaircissent de façon plus régulière, de la racine aux pointes. L’ombré et le tie and dye jouent sur un dégradé, plus foncé en haut, plus clair en bas. On vous conseille selon l’entretien que vous voulez. | Balayage gives soft, blended tones painted freehand. Highlights lighten more evenly, from root to tip. Ombré and tie and dye play on a gradient, darker at the top, lighter at the ends. We advise you depending on how much upkeep you want. | |
| `pages.balayage.sections.2.title` | Combien de temps, quel entretien ? | How long, how much upkeep? | |
| `pages.balayage.sections.2.text` | Comptez en général 2 h à 3 h au salon. Le balayage repousse en douceur : un rafraîchissement tous les 3 à 4 mois suffit, avec un gloss entre deux pour garder l’éclat. | Usually 2 to 3 hours at the salon. Balayage grows out softly: a refresh every 3 to 4 months is enough, with a gloss in between to keep it bright. | |
| `pages.balayage.gallery` | Balayages réalisés au salon | Balayage done at the salon | |
| `pages.balayage.cta` | Demander un rendez-vous balayage | Request a balayage appointment | |
| `pages.balayage.related` | Voir aussi la coloration végétale et le lissage japonais dans la carte du salon. | See also plant-based colour and Japanese straightening on the salon menu. | |
| `pages.mariage.metaTitle` | Coiffure de mariage à Amiens : mariée et invités | Hair Évasion | Wedding hair in Amiens: brides and guests | Hair Évasion | **à valider (déroulé mariage)** |
| `pages.mariage.metaDescription` | Coiffure de mariée à Amiens : essai, chignon, tresses, ondulations, accessoires. Hair Évasion coiffe aussi les témoins, mamans et enfants. 4 rue au Lin. | Bridal hair in Amiens: trial, updos, braids, waves, accessories. Hair Évasion also styles bridesmaids, mothers and children. 4 rue au Lin. | **à valider (déroulé mariage)** |
| `pages.mariage.eyebrow` | Mariage · Amiens | Weddings · Amiens | **à valider (déroulé mariage)** |
| `pages.mariage.title` | Coiffure de mariage à Amiens | Wedding hair in Amiens | **à valider (déroulé mariage)** |
| `pages.mariage.intro` | Votre coiffure doit vous ressembler, aller avec la robe, résister aux embrassades et à la piste de danse. On la prépare avec vous, de la première idée à l’essai, puis le jour J. | Your hair should feel like you, go with the dress, and survive the hugs and the dance floor. We plan it with you, from the first idea to the trial, then on the day. | **à valider (déroulé mariage)** |
| `pages.mariage.process.title` | Comment ça se passe | How it works | **à valider (déroulé mariage)** |
| `pages.mariage.process.steps.0.title` | Le premier rendez-vous | First meeting | **à valider (déroulé mariage)** |
| `pages.mariage.process.steps.0.text` | Vous venez avec vos photos, la robe, le voile ou les accessoires. On parle du déroulé de la journée, de vos cheveux, de ce que vous aimez. | Bring your photos, the dress, the veil or accessories. We talk about the day’s schedule, your hair and what you love. | **à valider (déroulé mariage)** |
| `pages.mariage.process.steps.1.title` | L’essai | The trial | **à valider (déroulé mariage)** |
| `pages.mariage.process.steps.1.text` | Quelques semaines avant le mariage, on réalise la coiffure en entier. On ajuste jusqu’à ce qu’elle soit exactement comme vous l’imaginiez. | A few weeks before the wedding, we do the full style. We adjust until it’s exactly what you pictured. | **à valider (déroulé mariage)** |
| `pages.mariage.process.steps.2.title` | Le jour J | The day | **à valider (déroulé mariage)** |
| `pages.mariage.process.steps.2.text` | On vous coiffe, vous et vos proches, dans le calme et à l’heure. La coiffure est pensée pour tenir jusqu’au bout de la soirée. | We style you and your loved ones, calmly and on time. The style is built to last until the end of the evening. | **à valider (déroulé mariage)** |
| `pages.mariage.styles.title` | Chignons, tresses, ondulations | Updos, braids, waves | **à valider (déroulé mariage)** |
| `pages.mariage.styles.text` | Chignon bas tressé, chignon haut et bijou, ondulations libres, demi-attaché fleuri, tresse bohème : chaque photo de cette page a été coiffée par le salon. | Low braided bun, high bun with jewellery, loose waves, half-up with flowers, boho braid: every photo on this page was styled by the salon. | **à valider (déroulé mariage)** |
| `pages.mariage.guests.title` | Témoins, mamans, enfants | Bridesmaids, mothers, children | **à valider (déroulé mariage)** |
| `pages.mariage.guests.text` | Le salon coiffe aussi votre entourage : chignons de témoins, mises en plis, petites coiffures fleuries pour les demoiselles d’honneur. | The salon also styles your circle: bridesmaid updos, sets, little flowered styles for flower girls. | **à valider (déroulé mariage)** |
| `pages.mariage.cta` | Demander un rendez-vous mariage | Request a wedding appointment | **à valider (déroulé mariage)** |

### legal

| Clé | Français | English | |
|---|---|---|---|
| `legal.metaTitle` | Mentions légales | Hair Évasion | Legal notice | Hair Évasion | |
| `legal.title` | Mentions légales | Legal notice | |
| `legal.pending` | Mentions en cours de complément (raison sociale et SIRET à renseigner par le salon). | Notice being completed (company name and SIRET to be provided by the salon). | |
| `legal.editor` | Éditeur | Publisher | |
| `legal.editorText` | Hair Évasion, salon de coiffure, 4 rue au Lin, 80000 Amiens. Téléphone : 03 22 92 42 42. | Hair Évasion, hair salon, 4 rue au Lin, 80000 Amiens, France. Phone: +33 3 22 92 42 42. | |
| `legal.host` | Hébergeur | Hosting | |
| `legal.data` | Données personnelles | Personal data | |
| `legal.dataText` | Les informations envoyées par le formulaire de rendez-vous (nom, téléphone, e-mail, photo, message) servent uniquement à vous recontacter pour ce rendez-vous. Elles ne sont ni revendues ni utilisées à d’autres fins. Vous pouvez demander leur suppression en appelant le salon. | Information sent through the appointment form (name, phone, email, photo, message) is only used to contact you about this appointment. It is never sold or used for any other purpose. You can ask for it to be deleted by calling the salon. | |
| `legal.photos` | Photos | Photos | |
| `legal.photosText` | Toutes les photos de coiffures sont des réalisations du salon, publiées sur son compte Instagram @hairevasionamiens. | All hairstyle photos show work done by the salon, published on its Instagram account @hairevasionamiens. | |

## Textes alternatifs des photos

| Photo | Français | English |
|---|---|---|
| balayage-blond-ondule | Balayage blond lumineux sur cheveux longs ondulés, vu de dos | Bright blonde balayage on long wavy hair, seen from behind |
| balayage-caramel-boucles | Balayage caramel sur longues boucles, au salon | Caramel balayage on long curls, at the salon |
| balayage-blond-mur-brique | Balayage blond fondu sur cheveux longs, devant un mur de briques | Blended blonde balayage on long hair, in front of a brick wall |
| ombre-chatain-ondule | Ombré châtain aux pointes miel, cheveux ondulés | Light-brown ombré with honey ends, wavy hair |
| tie-and-dye-cuivre | Tie and dye cuivré sur cheveux bruns mi-longs | Copper tie and dye on medium-length dark hair |
| boucles-meches-caramel | Boucles anglaises avec mèches caramel, de profil | Ringlet curls with caramel highlights, side view |
| lissage-long-blond | Cheveux longs blonds parfaitement lisses après un lissage | Long blonde hair perfectly straight after smoothing |
| coupe-courte-femme | Coupe courte femme dégradée, vue de dos | Short layered women’s cut, seen from behind |
| carre-flou-marguerite | Carré flou et tressé, piqué d’une marguerite | Soft braided bob with a daisy |
| chignon-cuivre-flou | Chignon flou aux reflets cuivrés | Loose updo with copper tones |
| chignon-bas-brun | Chignon bas bouclé sur cheveux bruns | Curly low bun on dark hair |
| chignon-ombre-tresse | Chignon tressé sur cheveux ombrés | Braided updo on ombré hair |
| chignon-perles-blond | Chignon blond sculpté, piqué de perles | Sculpted blonde updo with pearls |
| chignon-bijou-dore | Chignon bouclé orné d’un bijou de cheveux doré | Curly updo with a gold hair piece |
| chignon-haut-strass | Chignon haut entouré d’un bandeau de strass | High bun wrapped in a rhinestone band |
| enfant-chignon-roses | Coiffure d’enfant : chignon bouclé et petites roses | Child’s hairstyle: curly bun with small roses |
| enfant-queue-boucles-roses | Coiffure d’enfant : queue de cheval bouclée et roses | Child’s hairstyle: curly ponytail with roses |
| chignon-tresse-bijou | Chignon tressé de mariée, orné de bijoux de cheveux | Braided bridal updo with hair jewellery |
| mariee-chignon-dentelle | Mariée de dos, chignon tressé et gypsophile, robe en dentelle | Bride from behind, braided bun with baby’s breath, lace dress |
| mariee-ondulee-gypsophile | Mariée aux longs cheveux ondulés et brins de gypsophile | Bride with long wavy hair and sprigs of baby’s breath |
| mariee-tresse-boheme | Tresse bohème de mariée, fleurs séchées dans les cheveux | Boho bridal braid with dried flowers |
| chignon-tresse-fleur-poudree | Chignon tressé orné d’une fleur rose poudré | Braided updo with a dusty-pink flower |
| chignon-couronne-fleurs | Chignon bas et couronne de fleurs | Low bun with a flower crown |
| temoin-chignon-gypsophile | Témoin en robe rose poudré, chignon et gypsophile | Bridesmaid in dusty pink, updo with baby’s breath |
| deux-coiffures-ceremonie | Deux coiffures de cérémonie vues de dos, dans un salon aux boiseries | Two ceremony hairstyles seen from behind, in a wood-panelled room |
| demi-attache-blond | Demi-attaché blond aux longues ondulations | Blonde half-up style with long waves |
| chignon-tresse-gypsophile | Chignon tressé piqué de gypsophile | Braided updo dotted with baby’s breath |
| chignon-flou-fleurs | Chignon flou sur le côté, fleur blanche et gypsophile | Loose side updo, white flower and baby’s breath |
| demi-attache-fleurs-sechees | Demi-attaché tressé et fleurs séchées | Braided half-up style with dried flowers |
| devanture-rue-au-lin | La devanture du salon Hair Évasion, rue au Lin à Amiens | The Hair Évasion shopfront, rue au Lin in Amiens |
| huile-leonor-greyl | L’huile de Leonor Greyl, présentée au salon | Leonor Greyl hair oil on display at the salon |
| trousse-leonor-greyl | Trousse de soins Leonor Greyl au salon | Leonor Greyl care kit at the salon |
| coffret-bon-cadeau | Coffret de soins et carte bon cadeau du salon | Gift box of hair care with the salon’s gift voucher card |
