# Handoff: Lallemand Frédéric — Portfolio "Cinéma × Parallax"

## Overview
Site portfolio one-page pour Frédéric Lallemand — photographe / réalisateur en reconversion vers UI/UX Engineering. Fusion entre le parallax d'accueil de son site original (identique, pixel-perfect) et une esthétique "film noir chaleureux" (grain, pellicule, timecode, générique de film) pour présenter son parcours, sa photographie, ses films et ses expérimentations front-end.

## About the Design Files
Les fichiers de ce dossier (`Portfolio Cinéma.html`, `cinema.css`, `cinema.jsx`) sont des **références de design faites en HTML/React-via-Babel-CDN** — un prototype montrant le look et le comportement voulus, pas du code de production à copier tel quel. La tâche consiste à **recréer ce design dans l'environnement réel du projet** (React/Vite, Next.js, ou autre stack déjà en place chez le client) en utilisant ses conventions et son système de build habituels. Si aucun environnement n'existe encore, un simple site statique (HTML/CSS/JS vanilla, sans dépendance à Babel-in-browser) est recommandé — le prototype n'a besoin de React que parce qu'il a été construit rapidement en environnement de design.

## Fidelity
**Haute fidélité (hifi).** Couleurs, typographies, espacements et interactions sont définitifs. Le développeur doit recréer l'UI au pixel près.

## Screens / Views
Ceci est une page unique (one-pager) avec ancres de navigation. Sections dans l'ordre :

### 1. Barre de navigation (fixed top)
- Hauteur ~66px (56px scrolled), fond flou `backdrop-filter: blur(12px)`, fond `color-mix(in srgb, var(--bg) 72%, transparent)`.
- Bordure basse `1px solid var(--line)` apparaît seulement après scroll (classe `.scrolled`).
- Gauche : logo mono `lallemand.frédéric` avec un point rouge clignotant (`.rec-dot`, 7×7px, `#c9503f`, `animation: blink 1.6s infinite`).
- Centre : liens `à propos / photos / films / compétences / projet / contact` — 13px, letter-spacing .03em, soulignement animé au survol (scaleX 0→1, 0.3s).
- Droite : bouton rond (34×34px) toggle thème clair/sombre, icône soleil/lune SVG, rotation 25° au survol.
- Masqué en dessous de 820px sauf logo + toggle.

### 2. Parallax (héros) — **NE PAS MODIFIER, à reprendre à l'identique**
- `<section id="imageParallax">`, hauteur `150vh`, `overflow: hidden`.
- 5 couches d'images empilées en `position: absolute`, chacune `width: clamp(150px, 100%, 100%)`, `height: 100%`, `object-fit: cover` :
  - `#background` (z-index 1) — `parallax05.png`
  - `#middelEnd` (z-index 3) — `parallax04.png`
  - `#middelStart` (z-index 4) — `parallax03.png`
  - `#frontEnd` (z-index 5) — `parallax02.png`
  - `#frontStart` (z-index 6) — `parallax01.png`
- 2 titres `<h1>` en Dancing Script, 6em, couleur ivory, `text-shadow: 5px 4px 8px rgb(107,13,35)` :
  - `#lastName` "Lallemand" (z-index 4, `transform: translateY(200px)`)
  - `#firstName` "Frédéric" (z-index 2, `transform: translateY(70px)`)
- Comportement JS (scroll listener, throttlé nativement par le navigateur — pas de rAF) :
  ```js
  window.addEventListener('scroll', () => {
    const value = window.scrollY;
    background.style.top  = value * 0.40 + 'px';
    middelEnd.style.top   = value * 0.35 + 'px';
    middelStart.style.top = value * 0.30 + 'px';
    frontEnd.style.top    = value * 0.17 + 'px';
    frontStart.style.top  = value * 0.08 + 'px';
  });
  ```
  (Les lignes `marginBotton` sur les titres dans le code source sont une faute de frappe historique du site original — `marginBotton` n'est pas une propriété CSS valide, donc ces deux lignes sont un no-op silencieux. Les conserver telles quelles ou les retirer n'a aucun effet visuel ; à la discrétion du développeur.)
- Le fond de la section (`--bg`) doit être **strictement identique** au fond de la section suivante (Title Card) — pas de bande, pas de rupture de couleur entre le bas du parallax et le haut du texte qui suit.

### 3. Title Card (juste après le parallax)
- Fond uni `var(--bg)`, padding `120px 0 110px`.
- Eyebrow avec point rouge clignotant : "Régisseur de formation — développeur par choix" (mono, 12px, uppercase, letter-spacing .1em).
- `<h1>` : "Je cadre des *histoires*, je construis des *interfaces.*" — 46–108px responsive (`clamp`), les mots en italique (`<em>`) sont couleur `--amber`.
- Ligne du bas en flex `justify-content: space-between` : à gauche un paragraphe de 440px max ; à droite un **timecode qui tourne en direct** depuis le chargement de la page, format `HH:MM:SS:FF` (FF = frame, incrémenté toutes les ~42ms soit ~24fps), police mono, couleur `--slate`, 24px.
- **Aucune bande noire, aucun HUD "REC" ni "SCÈNE 01" ici** — le client les a explicitement retirés.

### 4. Séparateur "pellicule" (Sprocket) — répété entre chaque section
- Bande de 30px de haut, 30 petits rectangles (perforations, 26×13px, `border-radius: 2px`, fond `--bg-raise`, bordure `--line`) centrés horizontalement avec `gap: 14px`, deux lignes horizontales fines au-dessus/en dessous.
- Utilisé exactement 6 fois : après Title Card, après About, après Gallery, après Films, après Credits, après Project.

### 5. About (`#about`) — deux colonnes
- Layout grid 2 colonnes égales, gap 70px. **Colonne de gauche en `position: sticky; top: 96px`** (reste visible pendant que la droite défile) — passe à `position: static` sous 900px.
- Colonne gauche : kicker "01 — À propos", titre serif italique "Deux métiers, un seul regard.", un paragraphe d'intro, puis 2 blocs "rôle" (1990–2016 Plateau & image / Depuis 2022 Écran & code) avec sous-titre + paragraphe.
- Colonne droite : label "Générique · parcours", puis une **timeline verticale** de 7 entrées (année à gauche en mono `--slate`, titre + description à droite), séparées par une ligne verticale pointillée et des puces rondes sur chaque ligne. **Chaque ligne apparaît une par une au scroll** (classe `.reveal` + IntersectionObserver, fade + translateY(26px)→0, transition 0.9s cubic-bezier(.2,.8,.2,1), stagger implicite par ordre d'apparition dans le viewport).
- Dernière entrée du parcours (2026) : "Là où le design, l'image et la technologie se rejoignent. Actuellement en études et en stage." — ne PAS mentionner "disponible freelance/CDI", la personne est encore en études.

### 6. Gallery (`#gallery`)
- Titre : "Liège, en pleine lumière." (jamais "en négatif").
- Barre de contrôle : filtres pill (`Tout / Photos / Panoramiques / Mini-planètes`) à gauche, 2 flèches rondes de défilement à droite.
- **Pellicule horizontale** : rangée `overflow-x: auto` (scroll-snap-type x proximity) de "plaques" (`<figure>`) de largeurs variables (460–1040px), chacune une image plein cadre en `object-fit: cover`, hauteur fixe 460px (320px mobile), **aucun filtre grayscale/désaturation** — couleurs pleines. Légende sous l'image : type (mono, `--amber`) + nom du lieu (serif italique, 20px).
- Les flèches appellent `scrollBy({left: ±560, behavior: 'smooth'})` sur le conteneur du reel.

### 7. Films (`#films`)
- Titre : "Moyens & courts métrages."
- Même pattern reel horizontal que Gallery : filtres par catégorie (`Tout / Moyen métrage / Court métrage / Série / Animation logo / Captation`) + flèches.
- Cartes vidéo (`.vid`, largeur fixe 400px) : poster 16:9 (vignette YouTube `https://img.youtube.com/vi/<ID>/hqdefault.jpg`), dégradé sombre en bas, badge catégorie en haut à droite, bouton play rond en bas à gauche (devient ambre au survol), titre serif italique + sous-titre mono en dessous. Toute la carte est un lien `<a target="_blank">` vers `https://www.youtube.com/watch?v=<ID>`.

### 8. Credits (`#credits`)
- Titre "Ce que je sais faire." — liste 2 colonnes de compétences façon générique de film, chaque ligne `role` (mono, uppercase, aligné à gauche) / `name` (aligné à droite), séparateur en tirets.

### 9. Project / Web Lab (`#project`)
- Une carte projet mise en avant (Dashboard Statistics) avec un tampon rotatif rouge "Démo en ligne" (`border: 3px solid var(--red)`, `transform: rotate(9deg)`, positionné en débordement à droite de la carte).
- En dessous, une grille de 3 colonnes (1 colonne mobile) de 6 mini-cartes "web lab" (numéro, titre, description).

### 10. Contact (`#contact`)
- Bandeau unique avec bordures haut/bas (`border-top/bottom: 1px solid var(--line)`), padding vertical resserré (~46px) — **pas de titre "Fin.", pas de LinkedIn** (retirés explicitement par le client).
- Gauche : kicker "06 — Contact", titre "On tourne *ensemble* ?", un paragraphe.
- Droite : liste de liens (Email / GitHub / YouTube) en 2 lignes chacun (label mono + valeur), séparés par des tirets, `padding-left` qui augmente légèrement au survol.

### 11. Footer
- Bande fine, bordure haute, `© 2026 Frédéric Lallemand` à gauche, `Liège / Dison, Belgique` à droite. Pas d'autre contenu.

## Interactions & Behavior
- **Reveal on scroll** : tout élément `.reveal` commence à `opacity:0; transform: translateY(26px)`, passe à `opacity:1; transform:none` via IntersectionObserver (threshold 0.12), transition 0.9s. Respecte `prefers-reduced-motion: reduce` (désactive animations, affiche direct).
- **Thème clair/sombre** : toggle sur `document.body[data-theme]`, valeurs `"dark"` (défaut) / `"light"`. Toutes les couleurs sont des custom properties CSS qui changent de valeur selon `[data-theme="light"]`.
- **Curseur "glow"** (halo lumineux) : un div `position: fixed`, 440×440px, dégradé radial ambre flouté (`filter: blur(14px)`, `mix-blend-mode: screen` en sombre / `multiply` en clair), suit la souris avec un easing (lerp 0.16 par frame via `requestAnimationFrame`), **opacité 0 par défaut, passe à 1 uniquement quand le curseur survole un élément "important"** (liens, boutons, cartes photo/vidéo, lignes credits) — transition d'opacité 0.5s ease. Désactivé sur pointer coarse (tactile).
- **Reels horizontaux** (Gallery + Films) : `scroll-behavior: smooth`, boutons flèches déclenchent `scrollBy`. Pas de drag-to-scroll custom nécessaire, le scroll natif + trackpad suffit, mais un dev peut ajouter du drag si souhaité.
- **Timecode** : `setInterval`/`requestAnimationFrame` recalculant le temps écoulé depuis le montage du composant, formaté `HH:MM:SS:FF`.
- **Filtrage** : les boutons de filtre (Gallery, Films) sont des toggles simples — un seul actif à la fois, re-render la liste filtrée (pas d'animation de sortie nécessaire, un fade-in suffit si repris).

## State Management
- `theme`: `"dark" | "light"` — un seul état global (contexte, store, ou simple prop drilling selon la stack).
- `galleryFilter`: valeur du filtre actif pour la galerie photo.
- `videoFilter`: valeur du filtre actif pour les films.
- Pas d'appel réseau/API — tout le contenu (bio, timeline, photos, films) est statique, codé en dur dans les données de la page.

## Design Tokens

### Couleurs — mode sombre (défaut)
- `--bg`: `#15110d` (fond principal, noir chaud)
- `--bg-raise`: `#1e1711`
- `--bg-3`: `#271e15`
- `--ink`: `#fffae1` (texte principal, ivoire — **hérité du site original**)
- `--ink-dim`: `#b0a488` (texte secondaire)
- `--sand`: `#b8b08d` (hérité du site original)
- `--amber`: `#cf9548` (accent chaud, ciné)
- `--clay`: `#c19366` (hérité du site original)
- `--slate`: `#7fa0a8` (accent froid, ciné — timecode, dates)
- `--red`: `#c9503f` (point REC, tampon démo)
- `--line`: `rgba(255,250,225,0.13)` (bordures/séparateurs)

### Couleurs — mode clair
- `--bg`: `#ece4d2`, `--bg-raise`: `#e3dac6`, `--bg-3`: `#d8ceb6`
- `--ink`: `#1c1710`, `--ink-dim`: `#6a5f4c`
- `--sand`: `#8a7f60`, `--amber`: `#a4661f`, `--clay`: `#9c6f42`, `--slate`: `#3f6067`, `--red`: `#b23f30`
- `--line`: `rgba(28,23,16,0.14)`

### Typographie
- Titres display : **Instrument Serif** italique (Google Fonts) — utilisé pour tous les `<h2>` de section et emphases `<em>`.
- Corps de texte : **Work Sans**, poids 300–600.
- Labels / mono / UI : **JetBrains Mono**, poids 400–600.
- Titre héros parallax uniquement : **Dancing Script** (hérité du site original, ne pas changer).

### Autres
- Grain de film : overlay `radial-gradient` de points 0.5px sur fond 3×3px, opacité 0.055 (sombre) / 0.04 (clair), `mix-blend-mode: overlay`, `position: fixed` plein écran.
- Border-radius global : 2px (esthétique "carte film", pas de coins très arrondis).
- Largeur de contenu max : 1180px (`.wrap`), padding horizontal 40px (22px mobile).

## Assets
- 5 images de parallax (`parallax01.png` → `parallax05.png`) — fournies par le client, à conserver telles quelles.
- Photos : `tour_kennedy.jpg`, `photo-1.jpg`, `photo-3.jpg`, `photo-5.jpg` (architecture liégeoise).
- Panoramique : `pano_parc_boverie.jpg`.
- Mini-planètes : `planete_parc_boverie.jpg`, `planete-3.jpg`, `planete-5.jpg`, `planete-7.jpg`.
- Vignettes vidéo : chargées dynamiquement depuis `https://img.youtube.com/vi/<ID>/hqdefault.jpg` (pas de fichier local) — prévoir un fallback visuel (dégradé de fond) si une vignette 404.
- Logo/favicon : `logo_LF.png`.
- Toutes les images sont dans le dossier `assets/` du bundle joint, organisées par sous-dossier (`parallax/`, `photos/`, `pano/`, `planetes/`).

## Files
- `Portfolio Cinéma.html` — page principale (structure HTML + chargement des scripts).
- `cinema.css` — toutes les règles de style (thème, layout, composants).
- `cinema.jsx` — composants React (via Babel standalone, pour prototypage uniquement — à réécrire dans le framework cible).
- `assets/` — toutes les images référencées ci-dessus.

Le prototype charge React/ReactDOM/Babel depuis un CDN et transpile le JSX dans le navigateur — **ceci n'est pas adapté à la production**. Le développeur doit réimplémenter les composants dans la stack du projet cible avec un vrai pipeline de build.
