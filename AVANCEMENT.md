# AVANCEMENT.md — Intégration Portfolio Cinéma (siteClaude)

Suivi des étapes pour intégrer `siteClaude/cinema.jsx` + `siteClaude/cinema.css` comme nouveau `index.html`, avec les vraies données du dépôt de base (`index.html`, `media/`, `Youtube/moyenMetrage.html`, pages secondaires) — voir règle "`index.html` est LA référence" dans `CLAUDE.md`.

**L'ancien plan (8 phases basées sur `lallemand_casa_maquette.html`) est abandonné** — conservé ci-dessous en archive pour mémoire.

---

## Etat global

```
Phase 0 : Décision technique (React CDN vs statique)   [x] Fait — statique
Phase 1 : Correction des chemins d'images              [x] Fait
Phase 2 : Intégration dans index.html                  [x] Fait
Phase 3 : Complétion du contenu (galerie, films)        [x] Fait
Phase 4 : Contact & footer                              [x] Fait
Phase 5 : Polish & responsive                           [~] Bien avancée (galerie/carrousel/police/mécanique projet corrigés) — reveal/theme toggle pas encore explicitement testés — reste : créer un vrai menu burger tablette/smartphone (Étape 5.23)
Phase 6 : Mise à jour des pages secondaires             [x] Fait
Phase 7 : Intégration MotoShop (future)                 [ ] En attente
```

---

## Phase 0 — Décision technique

**Objectif** : trancher comment `cinema.jsx` (React + Babel via CDN, sans build) doit être livré en production.

### Etape 0.1 — Choisir Option A, B ou C
- **Décidé le 2026-07-02 : Option A** (statique) — cohérence avec le reste du site (déjà en vanilla JS), pas de dépendance CDN React/Babel en prod, pas besoin de la réactivité de React pour cette page (juste thème, filtres galerie/films, effets scroll)
- Statut : `[x]`

### Etape 0.2 — Conversion statique
- Fait le 2026-07-02 : `cinema.jsx`/`cinema.css` retranscrits en HTML/CSS/JS vanilla
  - `CSS/styleCasa.css` — copie quasi telle quelle de `cinema.css` (déjà du CSS pur, pas de syntaxe JSX dedans), + `.plate.is-hidden`/`.vid.is-hidden` ajoutés pour le filtrage sans React
  - `JS/appCasa.js` — remplace toute la logique React (thème, scroll topbar, parallax, timecode, reveal-on-scroll IntersectionObserver, filtres galerie/films + flèches reel, curseur glow)
  - `casa.html` (racine du site) — page de test complète avec les 34 photos et 29 films, pour vérifier le rendu avant de toucher au vrai `index.html`
- Comportement filtres : au lieu de démonter/remonter les cartes comme React, les cartes non filtrées restent dans le DOM avec la classe `.is-hidden` (`display:none`) — résultat visuel identique, implémentation plus simple en vanilla
- Statut : `[x]` — **testé et validé par l'utilisateur dans le navigateur le 2026-07-02**

---

## Phase 1 — Correction des chemins d'images

**Objectif** : remplacer tous les `src` pointant vers `siteClaude/assets/` par les vrais fichiers de `media/` (table de correspondance dans `CLAUDE.md`).

### Etape 1.1 — Logo et parallax
- Fait le 2026-07-02 : `assets/logo_LF.png` → `logo_LF.png` (dans `Portfolio Cinéma.html`), `assets/parallax/parallax01-05.png` → `media/parallax/PNG/parallax01-05.png` (dans `cinema.jsx`)
- Plus aucune référence à `siteClaude/assets/` dans `cinema.jsx` — confirmé par recherche
- Statut : `[x]`

### Etape 1.2 — Photos, panoramiques, mini-planètes
- Fait le 2026-07-02, en même temps que la Phase 3.1 (complétion galerie) : les 9 entrées d'origine corrigées vers `media/images/`, `media/panoramiques/`, `media/mini_planetes/`, et complétées avec tout le contenu manquant (voir Phase 3.1)
- Statut : `[x]`

### Etape 1.3 — Vérifier chaque image une par une dans le navigateur
- Confirmer qu'aucune image ne montre un contenu incohérent avec son intitulé (ex. vérifier qu'un panoramique montre bien un panoramique, pas autre chose)
- Statut : `[ ]`

### Etape 1.4 — Corriger les données codées en dur (pas que les images)
- ID YouTube de la catégorie "Moyen métrage" dans `VIDEOS` (`cinema.jsx`) corrigés le 2026-07-02 (étaient décalés d'un cran par rapport à `Youtube/moyenMetrage.html` — voir détail dans `CLAUDE.md`)
- Email/GitHub/YouTube du Contact corrigés le 2026-07-02 (`lallemand_fred@hotmail.com`, `github.com/lallemand-fred`, `youtube.com/@belgiumvision`)
- Carte "L'Hiver Noir — Film complet" ajoutée le 2026-07-02 (`yt: "9FbwLl1mf1g"`), à côté de la bande-annonce
- Statut : `[x]` fait pour Contact + Moyen métrage — à refaire cette vérification pour chaque autre donnée codée en dur avant intégration finale (courts métrages, série, credits, timeline...)

---

## Phase 2 — Intégration dans `index.html`

**Objectif** : faire de la variante Portfolio Cinéma le nouveau `index.html` du site.

### Etape 2.1 — Sauvegarder l'index actuel
- Fait le 2026-07-02 : ancien `index.html` copié vers `index_old.html`
- Statut : `[x]`

### Etape 2.2 — Mettre en place la structure retenue en Phase 0
- Fait le 2026-07-02 (Option A statique) : `index.html` remplacé par la structure validée de `casa.html` (identique, titre nettoyé de la mention "test statique")
- Statut : `[x]`

### Etape 2.3 — Vérifier rendu visuel de base
- `index.html` vérifié structurellement identique à `casa.html` (déjà validé par l'utilisateur) : 6 sprockets, 29 films, chemins corrects (galerie photo depuis réduite à 31 entrées, voir Étape 5.8)
- Statut : `[x]` — validé par l'utilisateur dans le navigateur (voir retours des Étapes 5.4 à 5.8)

---

## Phase 3 — Complétion du contenu (galerie, films)

**Objectif** : la galerie et la liste de films de `cinema.jsx` couvraient au départ des extraits (9 photos, 12 vidéos) — complétées avec tout le contenu disponible dans `media/`/`index.html`.

### Etape 3.1 — Galerie photo
- Fait le 2026-07-02 : tableau `PHOTOS` complété — 8 photos (`media/images/`), 12 panoramiques (`media/panoramiques/` + `Galerie_Pano/`), 14 mini-planètes (`media/mini_planetes/`), soit 34 entrées au total (réduit à 31 le 2026-07-03, voir Étape 5.8 — 3 doublons "hero" retirés)
- Noms corrigés le 2026-07-02 avec les vrais noms officiels trouvés dans `PrixPhotos.html`/`PrixPano.html`/`PrixPlanete.html` (ex. Photo-3 = "Fleurs", pas "Quai — Outremeuse" comme l'avait inventé Claude Design — confirme le souci de mismatch signalé au tout début)
- `pano-5` et `Planete-6` n'avaient pas de nom dans les pages Prix — noms donnés directement par l'utilisateur le 2026-07-02 : "Sous la pluie" (pano-5) et "Planète St Lambert — Flashy" (Planete-6, version différente de Planete-7)
- "Planète Alber 1er" (Planete-1) corrigé en "Planète Albert 1er" le 2026-07-02 (confirmé par l'utilisateur : le pont à Liège avec ses quais)
- Statut : `[x]`

### Etape 3.3 — Format & support au survol (au lieu du prix)
- Ajout le 2026-07-02 : chaque `PHOTOS` avec données Prix a maintenant `support`/`format` (ex. "Plaque aluminium" / "50 x 35 cm"), affichés dans un badge discret qui apparaît au survol de la carte (`.plate-meta` dans `cinema.css`, opacity 0→1 au hover) — le nom reste affiché comme avant sous l'image, pas de prix repris
- Statut : `[x]`

### Etape 3.2 — Liste films
- Courts métrages : les 7 manquants ajoutés le 2026-07-02 (Cantate pour un cambrioleur, Comme une ombre, Escale mortelle, 2h chrono, Thérapie de groupe, Amour & hasard, Hors contrôle) — les 11 courts métrages de `index.html` (carousel2) sont maintenant tous dans `cinema.jsx`
- Série Joli-Bois : Ep 3 à 6 ajoutés le 2026-07-02 — les 6 épisodes sont maintenant tous dans `cinema.jsx`
- Captations & animations logos : Trop en forme, Festival du film d'action sociale, Place aux enfants, SKO, BRK ajoutés le 2026-07-02 — tout le contenu de `index.html` est maintenant dans `cinema.jsx`
- `VIDEOS` dans `cinema.jsx` couvre désormais l'intégralité des films de `index.html` (plus "L'Hiver Noir — Film complet", donnée supplémentaire fournie par l'utilisateur)
- Statut : `[x]` liste films complétée intégralement

---

## Phase 4 — Contact & footer

### Etape 4.1 — Formulaire de contact
- Fait le 2026-07-02 : formulaire `formsubmit.co` (même action hashée `83a919eb28df6b2c574f6a644f13d4a0`, mêmes champs nom/email/message) intégré dans `#contact` sous les liens rapides, restylé avec labels flottants façon design cinéma (`.cf-field`, `.cf-submit` dans `CSS/styleCasa.css`)
- Champ `_subject` corrigé ("Nouvau" → "Nouveau", coquille du formulaire d'origine)
- `<input type="textarea">` (invalide) de l'ancien site remplacé par un vrai `<textarea>` — même nom de champ `message` reçu par formsubmit.co
- Statut : `[x]`

### Etape 4.2 — Liens de contact et footer
- Email/GitHub/YouTube corrigés dans `index.html` (2026-07-02) : `lallemand_fred@hotmail.com` / `https://github.com/lallemand-fred` / `https://www.youtube.com/@belgiumvision`
- Footer déjà en place : `© 2026 Frédéric Lallemand` + `Liège / Dison, Belgique`
- Statut : `[x]`

---

## Phase 5 — Polish & responsive

### Etape 5.1 — Test mobile (< 640px)
- Sprocket : trop de perforations (30) créaient des trous trop grands en mobile — réduit à 10 visibles sous 640px (`.sprocket i:nth-child(n+11) { display: none; }` dans `CSS/styleCasa.css`)
- Statut : `[x]` pour le sprocket, reste à tester le reste de la page en mobile

### Etape 5.2 — Test tablette (640px–900px)
- Sprocket : réduit à 15 perforations visibles entre 640px et 900px (`.sprocket i:nth-child(n+16) { display: none; }`)
- Statut : `[x]` pour le sprocket, reste à tester le reste de la page en tablette

### Etape 5.3 — Vérifier interactions
- Filtres galerie/films, theme toggle, reveal au scroll, flèches carousel testés et corrigés par l'utilisateur au fil des Étapes 5.4 à 5.8
- Reste à tester spécifiquement : theme toggle et reveal au scroll (pas de retour utilisateur dessus pour l'instant, contrairement aux flèches/filtres/galerie)
- Statut : `[x]` flèches/filtres/galerie — `[ ]` theme toggle/reveal non explicitement confirmés

### Etape 5.4 — Galerie photo : défilement souris, boucle infinie, lightbox
Fait le 2026-07-03, suite à un retour utilisateur sur la section 02 — Photographie :
- **Défilement à la souris** (`.reel`) : mousedown/mousemove/mouseup dans `JS/appCasa.js`, comme un glissé au doigt — appliqué à la galerie ET aux films (même composant `.reel` partagé)
- **Boucle infinie** : arrivé au bout du reel (souris, flèches ou tactile), retour automatique au début après un court délai ; les flèches gauche/droite bouclent aussi dans les deux sens si on est déjà à une extrémité
- **Lightbox plein écran** (galerie photo uniquement, pas les films qui gardent leur lien YouTube direct) : clic sur une photo → image en grand sur fond noir avec nom/format/support, flèches gauche/droite, glisser pour naviguer, croix en haut à droite pour fermer, clic sur le fond noir ferme aussi. Reste sur la position de scroll d'origine à la fermeture (overlay `position:fixed`, pas de navigation)
- Distinction clic vs glissé : un clic qui a bougé de plus de 4px pendant le drag n'ouvre pas la lightbox (évite l'ouverture accidentelle en faisant défiler)
- Statut : `[x]`

### Etape 5.5 — Correction du 2026-07-03 : flèches mal calées + panoramas coupés en mobile
Retour utilisateur : les flèches ne calaient pas bien les images (surtout visible en filtre "Tout" et "Panoramiques" où les cartes n'ont pas toutes la même largeur), et les panoramas étaient tronqués en mode téléphone.
- **Cause des flèches mal calées** : `reel.scrollBy()` utilisait un pas fixe (`data-step="560"`/`"460"`) alors que les cartes font 620px (Photos), 1040px (Panoramiques) ou 460px (Mini-planètes) — un pas unique ne peut pas s'aligner sur des largeurs différentes.
- **Fix** : les flèches calculent maintenant la position réelle (`offsetLeft`) de la carte visible suivante/précédente et font un `scrollTo()` dessus, quel que soit sa largeur. `data-step` supprimé (devenu inutile) de `index.html`.
- **Cause des panoramas coupés en mobile** : la règle mobile forçait `width: min(78vw, 460px)` sur toutes les cartes sans distinction de type, écrasant le format 2.26:1 d'un panoramique dans un cadre bien plus étroit → `object-fit: cover` rognait une grosse partie de l'image.
- **Fix** : largeur mobile différenciée par type dans `CSS/styleCasa.css`, proportionnelle au format d'origine (Photos 300px ≈ 1.36:1, Panoramiques 480px ≈ 2.18:1, Mini-planètes 220px = 1:1) — les panoramas restent large et complets au lieu d'être écrasés au format des photos.
- Statut : `[x]`

### Etape 5.6 — Correction du 2026-07-03 : défilement saccadé + image collée à gauche
Retour utilisateur : le défilement paraissait "aimanté"/saccadé, et l'image visée se collait à gauche du cadre au lieu d'être centrée.
- **Cause** : `scroll-snap-type`/`scroll-snap-align` (CSS natif, alignement "start") entraient en conflit avec le `scrollTo(behavior:"smooth")` du JS — double mouvement (l'animation JS puis le "pull" natif du navigateur) qui donnait cette sensation saccadée, et l'alignement "start" collait toujours la carte à gauche.
- **Fix** : `scroll-snap-type`/`scroll-snap-align` retirés de `.reel`/`.plate`/`.vid` (plus nécessaires, le JS gère déjà le positionnement précis). Les flèches centrent maintenant la carte visée dans le cadre visible (calcul `offsetLeft - (largeur cadre - largeur carte)/2`), et se basent sur la carte la plus proche du centre actuel pour savoir quelle est la "suivante"/"précédente".
- Statut : `[x]`

### Etape 5.7 — Correction du 2026-07-03 : la boucle défilait au lieu d'apparaître directement
Retour utilisateur : sur la dernière image, passer à la "suivante" faisait défiler visuellement toutes les images pour revenir à la première (pareil en sens inverse depuis la première) — repéré aussi bien sur la galerie photo que sur le carrousel vidéos YouTube (même code partagé `setupReel`).
- **Fix** : quand la navigation boucle (dernière → première ou première → dernière), le `scrollTo` passe en `behavior: "auto"` (instantané, pas d'animation traversant tout le reel) au lieu de `"smooth"`. La navigation normale (image suivante/précédente sans boucler) reste animée en douceur. Même correction appliquée au retour automatique en fin de glissé/molette.
- Statut : `[x]`

### Etape 5.8 — Correction du 2026-07-03 : doublon Tour Kennedy + retour arrière intempestif sur "Photos"
Deux bugs signalés par l'utilisateur, tous deux liés au filtre "Photos" spécifiquement :

**Doublon d'image** : `Tour_Kennedy01PETIT.jpg` (carte "hero" en tête de galerie) et `Photo-7.jpg` (cataloguée "Kennedy" dans `PrixPhotos.html`) sont la même photo — vérifié en comparant les deux fichiers. En creusant le même souci, les 2 autres cartes "hero" étaient logées à la même enseigne : `Pano_Parc_Boverie_PETIT02.jpg` = doublon de `Galerie_Pano/pano-8.jpg` ("Boverie"), et `Planete_Parc_BoveriePETIT.jpg` = doublon de `Planete-8.jpg` ("Planète Boverie"). Les 3 cartes "hero" retirées de `index.html` — la galerie passe de 34 à 31 entrées (7 photos, 11 panoramiques, 13 mini-planètes), chaque photo n'apparaît plus qu'une fois.

**Retour arrière intempestif** : sur le filtre "Photos", cliquer flèche gauche jusqu'à la dernière image la faisait revenir aussitôt à la première. Cause : le centrage instantané de la carte lors d'un bouclage (Étape 5.7) déclenchait un évènement `scroll`, et la surveillance "boucle infinie au bout du glissé" (Étape 5.6) confondait ce centrage programmatique avec un vrai scroll utilisateur arrivé en bout de course — ça ne se voyait que sur "Photos" car c'est le seul filtre où le centrage de la dernière carte tombe assez près du bord réel pour déclencher la fausse détection. Fix : un indicateur `programmatic` ignore la surveillance "boucle infinie" pendant ~600ms après un centrage déclenché par les flèches.
- Statut : `[x]`

### Etape 5.9 — Correction du 2026-07-03 : titre Web lab, plancher de police desktop, mécanique fenêtre projet
Trois retours utilisateur traités ensemble sur la section `#project` :

- **Titre** : "Le code, en tournage." remplacé par "Ce que je construis." (`index.html`, `CLAUDE.md` mis à jour en conséquence).
- **Plancher de police desktop 16px** : sur desktop, aucun texte "à lire" (paragraphes/descriptions/valeurs de contact/champ de formulaire/menu de nav top `nav.top-links`) ne doit descendre sous 16px — retour utilisateur explicite ("sous 16px inacceptable"). Appliqué à `.section-head > p`, `.about-col p`, `.tl-desc`, `.credit-line`, `.project-card p`, `.lab-mini .d`, `.cl-val`, `.cf-field input/textarea` et `nav.top-links` dans `CSS/styleCasa.css`, avec une règle `@media (max-width: 640px)` qui restaure la taille mobile d'origine à chaque fois qu'elle existait déjà (mobile non touché, comme demandé). Les micro-labels typographiques volontairement discrets (numéros `L01`, tags de rôle, timecodes, catégories en petites capitales) sont restés en dessous de 16px — ce sont des éléments de design, pas du texte continu à lire (à confirmer avec l'utilisateur si ce n'est pas ce qu'il voulait).
- **Mécanique fenêtre + cartes** : la fenêtre `.project-card` (jusque-là un bloc figé "Dashboard Statistics") est devenue dynamique. Les 6 cartes `.lab-mini` existantes (`L01`-`L06`, jusque-là des liens morts `href="#"`) portent maintenant des `data-role`/`data-title`/`data-desc`/`data-stamp`/`data-link`, et `JS/appCasa.js` (`setupProjectSwitcher`) met à jour la fenêtre au survol (desktop, `matchMedia("(hover: hover)")`) et au clic (tous supports) — avec un état "pinned" qui garde le dernier projet cliqué affiché quand la souris quitte la zone. Les projets sans démo réelle (`data-link` vide) affichent un bouton désactivé "Bientôt disponible" au lieu du lien "Voir la démo →" (`.project-link.is-disabled` dans le CSS). Un indicateur amber (`.lab-mini a.active`) marque la carte actuellement affichée dans la fenêtre.
- **Nouvelles cartes `L07`/`L08`** : `MotoShop` (NestJS/Angular/PostgreSQL, description reprise du projet actif documenté dans le `CLAUDE.md` global de l'utilisateur) et `Réservation Tennis` (Python, réservation de terrain + gestion admin — "projet TC", décrit par l'utilisateur comme équivalent de MotoShop en Python) ajoutées, toutes deux en "Bientôt disponible" faute de déploiement. Dashboard (`L02`) reste le projet par défaut affiché au chargement — MotoShop prendra sa place quand il sera déployé (Phase 7).
- Paragraphe d'intro corrigé : "Onze petits ateliers" → "Huit petits ateliers" pour matcher les 8 cartes réelles (`L01`-`L08`).
- Aucun lien de démo réel ajouté pour `L01`/`L03`/`L04` (parallax, navbar burger, animations de cartes) — pas assez sûr que ce soit ce que l'utilisateur veut (pointer vers des pages du site lui-même comme `PHOTOS.html` pour le burger menu, par exemple) ; à trancher avec lui plus tard.
- Vérifié dans le navigateur (Playwright + screenshots) : titre, tailles 16px, clic L03/L07 qui change bien la fenêtre, `console --errors` vide.
- Statut : `[x]`

### Etape 5.10 — Correction du 2026-07-06 : saut automatique intempestif vers la première image (galerie)

Retour utilisateur : sur la galerie photo (filtre Panoramiques), en arrivant sur la dernière image (Botanique) et en restant dessus quelques secondes, l'image sautait brusquement vers la première (Bavière) sans action de l'utilisateur.
- **Cause** : le mécanisme de "boucle infinie au bout du scroll" (Étape 5.4/5.8, `JS/appCasa.js`) surveillait tout mouvement de scroll du reel et, ~350ms après s'être arrêté en position de fin, sautait automatiquement au début — se déclenchant donc simplement en s'arrêtant sur la dernière carte (via flèche ou scroll), pas seulement en essayant de continuer au-delà.
- **Fix** : suppression de cette surveillance automatique (`atEnd`, `loopTimer`, et les variables `programmatic`/`programmaticTimer` associées, devenues inutiles). Le bouclage reste disponible mais uniquement de façon volontaire via les flèches (clic sur "suivant" alors qu'on est déjà sur la dernière carte → repart sur la première, et inversement) — comportement déjà en place et non affecté par ce fix.
- Vérifié par l'utilisateur : "ça marche nickel".
- Statut : `[x]`

### Etape 5.11 — Réécriture du 2026-07-06 : bouclage infini par clonage (repris de `JS/main.js`)

Retour utilisateur après l'Étape 5.10 : le passage dernière → première image restait "moche"/brutal (cut instantané), sans transition. Un premier correctif en fondu (fade out/in) a été tenté puis abandonné : l'utilisateur a fait remarquer qu'il avait déjà résolu ce problème proprement dans `JS/main.js` (ancien site) avec une vraie mécanique de carousel à pagination/clonage, et que je n'avais pas pris ce code existant comme modèle.

- **Technique reprise de `main.js`** (`Carousel` + option `infinite: true`) : un clone de la dernière carte est posé avant la première, un clone de la première posé après la dernière. Le scroll (flèches ou glissé-souris) peut donc traverser naturellement jusqu'au clone — visuellement identique à l'original — puis, une fois la transition réellement terminée, un recentrage instantané et invisible bascule sur la vraie carte équivalente. Équivalent du `resetInfinite()` sur `transitionend` de `main.js`, transposé ici sur l'évènement `scrollend` (le reel utilise `overflow-x:auto` + `scrollLeft`, pas un carousel à `transform`).
- **Bug intermédiaire n°1** : un premier essai basé sur un délai d'inactivité de scroll (350ms) se déclenchait parfois en plein milieu de l'animation (micro-pauses du navigateur sur les longues distances, ex. panoramiques 1040px), coupant la transition en plein vol. Fix : attente de l'évènement `scrollend` réel (avec un `setTimeout` de secours en filet si le navigateur ne le supporte pas) au lieu d'un simple délai d'inactivité.
- **Bug intermédiaire n°2** : le clone de la dernière carte, inséré juste avant la première, décalait tout l'affichage d'un cran dès le chargement/changement de filtre (scrollLeft à 0 montrait le clone au lieu de la vraie première image — effet "ordre des images cassé"). Fix : mesure de la position de la 1ère carte avant/après insertion du clone, et compensation du scroll (`reel.scrollLeft +=`) pour qu'elle reste flush au même endroit qu'avant, sans changer le comportement du filtre par ailleurs (pas de reset forcé au début).
- Clones exclus de la lightbox et de la navigation (classe `reel-clone`, `aria-hidden="true"`), et marqués `in` directement pour ne pas hériter de l'état "non révélé" du fade-in au scroll.
- **Validé par l'utilisateur sur le filtre Panoramiques** : "fonctionne très bien". Mécanique générique (`setupReel()`), donc automatiquement appliquée à tous les filtres de la galerie ET à tous les filtres de la section films (même fonction partagée, deux appels : `setupReel("gallery", ...)` et `setupReel("films", ...)`).
- **Point connu, pas bloquant, à revoir plus tard** : les cartes n'ont pas toutes la même largeur (Photos 620px / Panoramiques 1040px / Mini-planètes 460px, idem films). Le recentrage automatique de la carte visée dans le cadre (Étape 5.5/5.6) peut donc donner, sur certains filtres, une impression de micro-ajustement/glitch alors qu'il n'y a pas d'erreur — c'est juste la mécanique de centrage qui rattrape la différence de largeur. Laissé tel quel pour l'instant (jugé secondaire, fluide dans l'ensemble) — à retravailler dans une prochaine session si besoin.
- Statut : `[x]` pour le bouclage fluide — `[ ]` pour le micro-ajustement de recentrage entre cartes de largeurs différentes (cosmétique, reporté)

### Etape 5.12 — Correction du 2026-07-06 : nom visible avant l'image sur les panoramiques

Retour utilisateur : sur le filtre Panoramiques uniquement (pas Photos, pas Mini-planètes), pendant le défilement, le nom (légende) de la carte suivante apparaissait visible alors que son image n'était encore qu'un petit bout — cassait la fluidité du déplacement.

- **Cause** : les images de la galerie étaient toutes en `loading="lazy"`, pensé pour un défilement vertical classique — mal adapté à un carousel horizontal où les cartes voisines sont déjà "sur la page", juste hors champ. Les fichiers panoramiques étant les plus lourds/larges de la galerie (1040px), leur chargement + décodage arrivait trop tard une fois la carte suivante entrée dans le champ visible, laissant apparaître la légende (texte, quasi instantané) bien avant que l'image ait fini de se charger — Photos et Mini-planètes, plus légères, ne laissaient pas voir ce délai.
- **Fix** (`index.html`, section `#gallery`) : `loading="lazy"` retiré des 31 images de la galerie (chargées eagerly dès l'arrivée sur la page), et `decoding="async"` ajouté pour que le décodage se fasse hors du fil principal sans bloquer l'affichage pendant le défilement.
- **Étendu à la section films le même jour** : même mécanique de carousel partagée (`setupReel()`, un seul appel pour la galerie et un pour les films) donc déjà active sur les vidéos — mais les 29 miniatures YouTube (`vid-poster img`) avaient le même `loading="lazy"`, retiré et remplacé par `decoding="async"` par cohérence/prévention, même si le format uniforme des cartes vidéo (400px, toutes identiques) les rendait moins sujettes au problème que les panoramiques.
- Statut : `[x]`

### Etape 5.13 — Correction du 2026-07-06 : bouclage bloqué sur la section films ("rien ne se passe")

Retour utilisateur : sur la section Films, en arrivant sur la dernière vidéo et en cliquant sur la flèche "suivant", rien ne se passait (contrairement à la galerie/Panoramiques où le bouclage fonctionnait bien).

- **Cause** : la marge de fin de piste (`.reel-pad`) a une taille CSS fixe, pensée pour aligner la 1ère carte avec les marges de la page (`(100vw - 1180px)/2 + 40px`) — pas pour laisser assez de place pour **centrer** la dernière carte au milieu de l'écran. Sur un écran large, centrer une carte étroite demande beaucoup plus d'espace de défilement après la dernière carte que ce que cette marge fixe fournit (ex. vidéos 400px : besoin de `(largeur écran - 400)/2`, largement au-delà des ~40-250px fournis par la formule CSS). Résultat : le scroll natif se bloquait avant d'atteindre la position visée par `centerOn()`, et la flèche "suivant" restait bloquée sur la fin — sans erreur visible, juste rien qui bouge. Les panoramiques (1040px, presque aussi larges que l'écran) avaient besoin de beaucoup moins de marge supplémentaire, donc ça passait presque par hasard.
- **Fix** (`JS/appCasa.js`, `setupReel()`) : les marges `.reel-pad` de début/fin sont maintenant recalculées dynamiquement en JS (`sizePads()`) pour garantir assez de place à centrer n'importe quelle carte visible, quel que soit l'écran — appelé à l'initialisation, à chaque changement de filtre (`rebuildClones()`) et au redimensionnement de la fenêtre. L'alignement flush de la 1ère carte au repos reste préservé grâce à la compensation de scroll déjà en place (Étape 5.11).
- Concerne toutes les sections avec cartes étroites relativement à l'écran (Films 400px, Mini-planètes 460px) — pas seulement les vidéos.
- Statut : `[x]`

### Etape 5.14 — Correction du 2026-07-06 : lightbox pas assez large sur grand écran

Retour utilisateur : en cliquant sur une image de la galerie, la lightbox plein écran ne s'adaptait pas à la largeur de l'écran — sur un écran large (TV grand angle, moniteur ultra-wide), l'image restait étroite avec de grosses marges à gauche/droite au lieu d'utiliser un maximum de largeur disponible (sans toucher les bords), sur tous les formats (TV, desktop large/petit, tablette, smartphone).

- **Cause** (`CSS/styleCasa.css`) : `.lb-img` avait un `max-height: 74vh` fixe. Sur un écran large/plat (aspect ratio très étiré), cette hauteur devenait le facteur limitant avant la largeur (`max-width: 92vw`) — l'image (`object-fit: contain`) se retrouvait donc bridée par la hauteur bien avant d'utiliser toute la largeur permise.
- **Fix** : `.lb-stage` prend maintenant tout l'espace disponible du viewport (`width/height: 100%`, marge ramenée à `40px 24px` sur `.lightbox` pour ne pas toucher les bords), et `.lb-img` remplit ce cadre en flex (`flex: 1 1 auto; min-height: 0; width: 100%`) avec `object-fit: contain` — l'image utilise donc automatiquement le maximum de largeur OU de hauteur selon la forme de l'écran et le format de l'image, sans configuration par taille d'écran.
- Vérifié avec Playwright sur 5 tailles d'écran (image panoramique, le format le plus large) : TV ultra-wide 3440×1440 → 98,6% de la largeur utilisée (contre ~68% avant le fix), desktop 1920×1080 → 97,5%, desktop 1366×768 → 96,5%, tablette 1024×1366 → 95,3%, smartphone 390×844 → 87,7%.
- Statut : `[x]`

### Etape 5.15 — Correction du 2026-07-06 : première image de la galerie inclicable au chargement

Retour utilisateur : sur le filtre "Tout", la toute première image à gauche était impossible à sélectionner au clic — il fallait d'abord glisser/défiler vers la gauche pour qu'elle devienne cliquable.

- **Cause** (`JS/appCasa.js`, `rebuildClones`) : la carte réellement visible tout à gauche au chargement n'était pas la vraie première carte mais le **clone** de la dernière carte posé par la technique de bouclage infini (Étape 5.11) — ce clone est volontairement exclu des gestionnaires de clic (`:not(.reel-clone)`), donc inclicable par design. Le recalage du scroll après insertion du clone ne compensait que la largeur du clone lui-même (delta relatif), pas la marge `.reel-pad` de début — devenue bien plus large depuis l'agrandissement dynamique de cette marge (Étape 5.13, nécessaire pour centrer les cartes étroites aux extrémités). Résultat : le clone restait presque entièrement visible à la place de la vraie première carte. Vérifié par mesure directe (Playwright) : `scrollLeft` à 478px alors que la vraie première carte commençait à 986px, écart correspondant exactement à la marge agrandie (490px).
- **Fix** : le recalage cale directement `reel.scrollLeft` sur la position réelle de la première carte (`cards[0].offsetLeft`) au lieu d'un delta relatif — elle se retrouve donc toujours flush contre le bord gauche, peu importe la largeur de la marge, à l'initialisation comme à chaque changement de filtre.
- Vérifié avec Playwright : galerie filtre "Tout" et "Panoramiques", section Films — `scrollLeft` coïncide exactement avec la position de la vraie première carte dans les trois cas, clic ciblant bien `.plate`/`.vid` et non le clone.
- Statut : `[x]`

### Etape 5.16 — Correction du 2026-07-06 : cadre de la section Web lab qui se redimensionnait

Retour utilisateur : dans la section "05 — Web lab / Ce que je construis.", le cadre `.project-card` changeait de hauteur à chaque fois qu'on passait d'une carte `L01`-`L08` à une autre, selon que le texte de description soit long ou court — au lieu de rester fixe avec de la place réservée pour le texte le plus long.

- **Cause** (`CSS/styleCasa.css`) : `.project-card` n'avait pas de hauteur minimale — sa hauteur dépendait entièrement du contenu (titre + description + bouton), donc elle se redimensionnait à chaque changement de projet.
- **Fix** : `min-height` fixe ajoutée, mesurée avec Playwright sur les 8 variantes de contenu à plusieurs largeurs d'écran (la plus longue étant Dashboard Statistics) — `390px` au-dessus de 640px (couvre le max mesuré ~381px), `510px` en dessous de 640px où le texte prend plus de lignes sur une colonne étroite (couvre le max mesuré ~501px à 320px de large, le cas le plus défavorable).
- Vérifié avec Playwright : hauteur identique sur les 8 variantes à 8 largeurs différentes (1440 à 320px), et aucun débordement de texte (`scrollHeight` = `clientHeight` dans tous les cas testés).
- Statut : `[x]`

### Etape 5.17 — Correction du 2026-07-06 : bouton thème toujours affiché en soleil

Retour utilisateur : le bouton de changement de thème (`index.html`) n'affichait qu'une icône soleil, identique dans les deux thèmes — pas de lune pour représenter le passage au sombre.

- **Fix** : ajout d'une icône lune (`.icon-moon`) à côté du soleil existant (`.icon-sun`) dans le bouton `.theme-toggle`. L'icône affichée représente le thème vers lequel on bascule au clic (pas le thème actuel) : sombre actif → soleil affiché (clic = passer en clair) ; clair actif → lune affichée (clic = passer en sombre). Affichage géré en CSS (`[data-theme="light"] .theme-toggle .icon-sun/.icon-moon`), aucun changement JS nécessaire (`document.body.getAttribute("data-theme")` pilote déjà tout).
- Vérifié avec Playwright : soleil visible/lune cachée en sombre (état par défaut), inversé après clic (passage en clair).
- Statut : `[x]`

### Etape 5.18 — Correction du 2026-07-06 : texte parallax "Lallemand Frédéric" — même style blanc + ombre bordeaux dans les 2 thèmes

Retour utilisateur : un premier essai avait fait basculer l'ombre du texte "Lallemand Frédéric" (parallax hero) sur un gris clair en thème clair (le texte, en `var(--ink)`, passait aussi en couleur sombre) — jugé moche par l'utilisateur. Décision finale : garder le même rendu dans les 2 thèmes, blanc + ombre bordeaux, sans distinction claire/sombre.

- **Fix** (`CSS/styleCasa.css`, `#imageParallax h1`) : `color` fixé en dur sur `#fffae1` (au lieu de `var(--ink)` qui suit le thème) et ombre bordeaux (`rgb(107, 13, 35)`) conservée sans variante par thème.
- Vérifié avec Playwright : rendu identique (blanc + bordeaux) en sombre et en clair.
- Statut : `[x]`

### Etape 5.19 — Correction du 2026-07-06 : crédits "Front-end" et retrait de l'email public

Deux retours utilisateur distincts sur `index.html` :

- **Crédits (`#credits`)** : la ligne "Front-end" listait "HTML, CSS avancé, JavaScript" — changée en "HTML, CSS, JavaScript, TypeScript" ("avancé" retiré, TypeScript ajouté).
- **Contact (`#contact`)** : le lien `mailto:lallemand_fred@hotmail.com` (avec l'adresse affichée en clair) retiré des liens rapides — l'utilisateur a mis en place un formulaire de contact (`formsubmit.co`, déjà présent juste en dessous) justement pour recevoir des messages sans exposer son adresse mail personnelle. Restent GitHub et YouTube dans les liens rapides.
- Statut : `[x]`

### Etape 5.20 — Correction du 2026-07-06 : liens de démo réels pour 5 cartes du Web lab

Retour utilisateur : plusieurs cartes `L01`/`L03`/`L04`/`L05`/`L06` du Web lab étaient marquées "Bientôt disponible" alors que les pages de démo existent déjà dans le projet de départ (utilisées avant sur l'ancien site, section "Liens des différents travaux WEB" de `index_old.html`, retirée du nouveau design).

- **Mapping retrouvé dans `index_old.html`** (libellés d'origine de l'utilisateur) : `parallax01.html` → Page parallax, `pageLogin.html` → Page login, `Navbar1.html`/`Navbar2.html` → Navbar burger, `Navbar3.html` → Navbar 3D, `CardAnim.html` → Animation carte01, `CardAnim02.html` → Animation carte flipe, `Cardanim03.html` → Animation carte02, `PluiesDeMots.html` → Effet pluie de lettres. `AnimationBtnCoeur01.html` (Animation bouton) n'a pas de carte L0x correspondante dans le nouveau Web lab, pas repris.
- **Cartes L03 (Navbars 3D & burger) et L04 (Animations de cartes)** regroupent chacune plusieurs anciennes pages en une seule carte (un seul lien possible) : choix fait sur la meilleure correspondance textuelle avec la description de la carte — `Navbar3.html` (le "3D" du titre) et `CardAnim02.html` (le mot "Flip" de la description).
- **Fix** (`index.html`) : pour les 5 cartes, `data-stamp` passé de "Bientôt disponible" à "Démo en ligne" et `data-link` renseigné avec le fichier correspondant — le bouton "Voir la démo →" s'active automatiquement (logique déjà en place dans `JS/appCasa.js`, aucun changement JS nécessaire).
- Vérifié avec Playwright : les 5 boutons montrent "Voir la démo →" (actif, non désactivé) avec le bon `href`, et les 5 fichiers répondent en 200.
- **Point important soulevé par l'utilisateur en le corrigeant** : contrairement à ce qui avait été supposé, le nouveau site (`index.html`) n'a **aucun menu burger actuellement** — `nav.top-links` passe juste en `display: none` sous 820px (`CSS/styleCasa.css` ligne 100), sans aucun remplacement pour tablette/smartphone. Question ouverte à trancher avec l'utilisateur dans une prochaine étape : faut-il ajouter un vrai menu burger pour ces tailles d'écran ?
- Statut : `[x]` pour les 5 liens de démo

### Etape 5.21 — Correction du 2026-07-06 : plusieurs démos par carte (L03/L04)

Retour utilisateur suite à l'Étape 5.20 : L03 (Navbars 3D & burger) et L04 (Animations de cartes) ne montraient chacune qu'1 des 3 anciennes pages regroupées dessous — dommage de n'en montrer qu'une alors que les 3 existent. Deux options proposées (éclater en cartes L09+, ou plusieurs liens dans une même fenêtre) — **option retenue : plusieurs liens dans la même fenêtre**, pour ne pas casser le cadre "Huit petits ateliers" (texte d'intro, grille à 8 cartes) et regrouper les variantes d'un même exercice de façon plus lisible.

- **Fix** (`index.html`/`JS/appCasa.js`/`CSS/styleCasa.css`) : le bouton unique `#projectLink` remplacé par un conteneur `#projectLinks` que le JS remplit dynamiquement — soit avec un seul bouton "Voir la démo →" (cas `data-link`, inchangé pour L01/L02/L05/L06/L07/L08), soit avec plusieurs petits boutons nommés (nouvel attribut `data-links`, JSON `[{label, url}]`) pour L03 (`Burger 1 →` / `Burger 2 →` / `3D →` → `Navbar1.html`/`Navbar2.html`/`Navbar3.html`) et L04 (`Carte 01 →` / `Flip →` / `Carte 02 →` → `CardAnim.html`/`CardAnim02.html`/`Cardanim03.html`). CSS `.project-links` en flex-wrap pour aligner plusieurs boutons proprement.
- Vérifié avec Playwright : 3 boutons corrects (bon `href` chacun) sur L03 et L04, comportement inchangé sur les cartes à lien unique et sur MotoShop/Tennis (toujours "Bientôt disponible"), hauteur du cadre toujours fixe à 390px/510px (aucun débordement, y compris à 320px de large avec les 3 boutons qui passent sur plusieurs lignes).
- Statut : `[x]`

### Etape 5.22 — Correction du 2026-07-06 : libellés incohérents sur L03/L04

Retour utilisateur suite à l'Étape 5.21 : deux libellés détonnaient dans les groupes de boutons.

- **L03 (Navbars 3D & burger)** : bouton `"3D →"` isolé au milieu de `"Burger 1 →"` / `"Burger 2 →"` — pas assez explicite tout seul. Renommé `"Navbar 3D →"`.
- **L04 (Animations de cartes)** : ordre `Carte 01 / Flip / Carte 02` cassait la numérotation séquentielle. Renommé et réordonné en `Carte 01 → CardAnim.html`, `Carte 02 → Cardanim03.html`, `Carte 03 → CardAnim02.html` (l'ancien "Flip" devient "Carte 03", placé après "Carte 02").
- **Fix** : `index.html`, attributs `data-links` des deux `lab-item` L03 et L04 uniquement — aucun changement JS/CSS nécessaire (même logique de rendu qu'à l'Étape 5.21).
- Statut : `[x]`

### Etape 5.23 — À faire à la prochaine connexion : menu burger tablette/smartphone

Question ouverte depuis l'Étape 5.20 : `nav.top-links` passe juste en `display: none` sous 820px (`CSS/styleCasa.css` ligne 100), sans aucun remplacement pour tablette/smartphone — le nouveau site n'a donc actuellement aucun menu de navigation sous 820px.

- **Décision utilisateur (2026-07-06)** : créer un vrai menu burger pour ces tailles d'écran.
- **À faire** : concevoir et intégrer un menu burger dans `index.html`/`CSS/styleCasa.css`/`JS/appCasa.js` pour le format tablette et smartphone (< 820px), cohérent avec le design "Portfolio Cinéma".
- Statut : `[ ]`

---

## Phase 6 — Mise à jour des pages secondaires

### Etape 6.1 — Lien "retour accueil"
Fait le 2026-07-06. Vérification : dans les 6 pages secondaires (`PHOTOS.html`, `PANO.html`, `PLANETE.html`, `PrixPhotos.html`, `PrixPano.html`, `PrixPlanete.html`), les liens "Accueil" (`index.html`) et "Contact" (`index.html#contact`) pointaient déjà correctement vers le nouveau design — seul le lien "Vidéos" restait cassé.

- **Cause** : `index.html#video` référençait un ancien id de section (`#video`, présent dans `index_old.html`) qui n'existe plus dans le nouveau design — les sections y sont `#about`, `#gallery`, `#films`, `#credits`, `#project`, `#contact`. Le clic sur "Vidéos" depuis une page secondaire n'atterrissait donc nulle part en particulier (retour en haut de page).
- **Fix** : `index.html#video` → `index.html#films` dans les 6 pages. Vérifié avec Playwright (clic sur le lien depuis `PHOTOS.html` → atterrit bien dans la section `#films`).
- **`VIDEO.html` et `Youtube/moyenMetrage.html` non concernées** : ce sont des pages orphelines, sans navbar et sans lien entrant depuis le nouveau `index.html` (la décision du 2026-07-02 de lier "L'Hiver Noir" en direct vers YouTube plutôt que vers une galerie locale les a rendues obsolètes) — rien à corriger dessus, pas de régression introduite par la refonte à ce niveau.
- Statut : `[x]`

---

## Phase 7 — Intégration MotoShop (future)

**Objectif** : intégrer l'app Angular MotoShop dans la section `#project` (actuellement occupée par la démo Dashboard Statistics).

**Discussion du 2026-07-06** : actuellement MotoShop tourne seulement en local (BD PostgreSQL + stockage images en local sur le PC) — juste des fausses ventes/comptes de test créés pour le développement, rien d'officiel. Plusieurs approches d'hébergement envisagées (VPS loué vs services gratuits séparés vs plateforme tout-compris vs démo statique sans serveur). **Décision : services gratuits séparés** (frontend Angular sur Vercel/Netlify, backend NestJS sur Render/Railway, PostgreSQL sur Neon/Supabase, images sur Cloudinary/Supabase Storage) — le plus rapide et le moins cher pour une démo de portfolio.

Une piste plus ambitieuse a aussi été discutée (faire évoluer MotoShop en marketplace multi-véhicules pour un vrai TFE, testé en petit groupe privé région verviétoise) mais **mise de côté pour l'instant** — pas encore certain que ce soit exploitable comme sujet de TFE, à rediscuter plus tard si l'idée revient.

**Le travail de mise en ligne (hébergement + déploiement) se fait directement dans le dépôt MotoShop** (`appAngular/`, voir ses propres fichiers `.claude/*.md`), pas ici — pour rester cohérent avec les consignes propres à ce projet. Cette Phase 7 reprendra une fois MotoShop réellement déployé et accessible en ligne : il faudra alors revenir ici pour l'intégrer dans `#project`.

### Etape 7.1 — Décider le mode d'intégration
- Lien externe / iframe / section dédiée avec screenshot
- Statut : `[ ]`

### Etape 7.2 — Déployer MotoShop
- Fait ailleurs, dans le dépôt MotoShop lui-même (voir note ci-dessus) — hébergement décidé (services gratuits séparés) mais déploiement pas encore réalisé
- Statut : `[ ]`

---

## Notes de décision

| Question | Décision | Date |
|---|---|---|
| Variante siteClaude retenue ? | Portfolio Cinéma (`cinema.jsx`) | 2026-07-02 |
| React/Babel CDN ou conversion statique ? | Statique (Option A) — `CSS/styleCasa.css` + `JS/appCasa.js` | 2026-07-02 |
| Compléter galerie/films avec le contenu manquant de `media/` ? | Oui — galerie et liste films complétées intégralement | 2026-07-02 |
| Source officielle des images ? | `media/` (dépôt de base), jamais `siteClaude/assets/` | 2026-07-02 |
| Email/GitHub de contact ? | `lallemand_fred@hotmail.com` / `https://github.com/lallemand-fred` (corrigés dans `cinema.jsx`) | 2026-07-02 |
| README de handoff disponible ? | Oui — `siteClaude/README.md`, fait foi en cas de doute | 2026-07-02 |
| Page galerie locale pour L'Hiver Noir (comme `Youtube/moyenMetrage.html`) ou lien direct ? | Lien direct — pas de galerie à recréer | 2026-07-02 |
| Titre section Web lab ? | "Ce que je construis." (remplace "Le code, en tournage.") | 2026-07-03 |
| Plancher de police desktop ? | 16px minimum pour le texte à lire (pas les micro-labels), mobile inchangé | 2026-07-03 |
| Déclencheur mécanique fenêtre projet ? | Hover sur desktop + clic partout (tactile compris) | 2026-07-03 |
| Hébergement MotoShop (BD/backend/images, jusque-là en local) ? | Services gratuits séparés (Vercel/Netlify + Render/Railway + Neon/Supabase + Cloudinary) — travail fait dans le dépôt MotoShop, pas ici | 2026-07-06 |

---

## Archive — ancien plan (abandonné, basé sur `lallemand_casa_maquette.html`)

Ancien objectif : reconstruire `index.html` à partir de `lallemand_casa_maquette.html` en 8 phases (infrastructure CSS/JS, structure HTML, contenu réel, galerie photos, section films, contact, polish, MotoShop). Remplacé le 2026-07-02 par le plan ci-dessus suite à la refonte complète du design via Claude Design (`siteClaude/`).

Données réelles des carousels vidéo (toujours valables pour la Phase 3.2) :

**Carousel 1 — Moyens métrages :**
- L'Hiver Noir (lien interne `./Youtube/moyenMetrage.html`)
- Le tour du monde, Starlettes, Making of Starlettes, Comme si c'était hier (YouTube)

**Carousel 2 — Courts métrages :**
- Dehors !, Deux gouttes d'eau, Cantate pour un cambrioleur, La rue beauregard, Comme une ombre, Escale mortelle, 2h chrono, Thérapie de groupe, Amour & hasard, Le Couloir, Hors contrôle

**Carousel 3 — Captations & animations logos :**
- Trop en forme, Festival de Liège, Festival du film d'action sociale, Place aux enfants, BILDO, PixL, SKO, BRK

**Carousel 4 — Série Joli-Bois :**
- Épisodes 1 à 6
