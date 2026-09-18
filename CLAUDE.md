# CLAUDE.md — lallemand.casa

## Contexte du projet

Site portfolio personnel de Frédéric Lallemand, hébergé via GitHub Pages sur le domaine `lallemand.casa` (fichier CNAME présent).

**Etat actuel (2026-07-02) : refonte "Portfolio Cinéma" livrée et en ligne dans `index.html`.** Le design a été fait avec Claude Design (dossier `siteClaude/`, variante retenue : `cinema.jsx`/`cinema.css`), puis converti en HTML/CSS/JS statique et intégré comme nouveau `index.html` — voir détail dans `AVANCEMENT.md` (Phases 0 à 4 terminées).

- **Site en ligne** : `index.html` + `CSS/styleCasa.css` + `JS/appCasa.js` — vanilla, pas de React/Babel, cohérent avec le reste du dépôt.
- **Ancien site** : sauvegardé dans `index_old.html`.
- **`siteClaude/`** : prototype de design d'origine (React/Babel via CDN), gardé comme référence historique — ce n'est plus le code exécuté en production, ne pas le maintenir en parallèle de `index.html`.
- **`casa.html`** : page de test qui a servi à valider la conversion statique avant le swap dans `index.html` — peut être supprimée une fois qu'on est sûr de ne plus en avoir besoin.
- L'ancienne cible (`lallemand_casa_maquette.html`) reste abandonnée.

Reste à faire (voir `AVANCEMENT.md`) : Phase 5 (un point cosmétique mineur reporté, non bloquant), Phase 7 (intégration future de l'app **MotoShop** dans la section `#project`, à la place ou en complément de la démo Dashboard Statistics). Phase 6 (mise à jour des pages secondaires) terminée le 2026-07-06.

---

## REGLE ABSOLUE — le dépôt de base est LA référence, `siteClaude/` n'est qu'un design

**`media/`, `Youtube/moyenMetrage.html`, les pages secondaires (`PrixPhotos.html`/`PrixPano.html`/`PrixPlanete.html`) et le reste du dépôt de base sont la référence officielle pour TOUTES les données du site — pas seulement les images : textes, liens, ID YouTube, noms de photos, tout.** Le dossier `siteClaude/` ne sert que de référence de **design** (structure, style, comportements) ; son contenu codé en dur a été recopié/regénéré par Claude Design et contenait plusieurs erreurs (images incohérentes, ID YouTube décalés, noms de photos inventés au lieu des vrais noms des pages Prix — voir historique complet dans `AVANCEMENT.md` Phases 1/3/4). Toutes ces erreurs ont été corrigées et sont maintenant reflétées dans `index.html`.

**Conséquence pratique pour la suite (Phases 5-7)** : si on retouche encore du contenu venant de `siteClaude/` ou qu'on ajoute de nouvelles données, toujours vérifier leur valeur réelle dans le dépôt de base avant de les utiliser — ne jamais faire confiance par défaut à un prototype de design généré par IA pour du contenu factuel.

Table de correspondance complète des chemins d'images `siteClaude/assets/` → `media/`, et l'historique détaillé de chaque correction de données (ID vidéo, noms de photos, contact) : voir `AVANCEMENT.md`, Phases 1, 3 et 4.

---

## Règles de travail pour Claude Code

1. **Toujours lire le fichier d'étape concerné** avant de générer du code
2. **Ne jamais écraser** un fichier existant sans demander confirmation
3. **Une étape à la fois** — ne pas sauter d'étape
4. **Variables secrètes** dans `.env` — jamais en dur dans le code
5. **Tout en français** — commentaires, noms de variables, noms de fonctions, clés de contexte. Exception uniquement pour les noms imposés par Django/Python/librairies externes (urlpatterns, cleaned_data, is_staff, commit, verbose_name, wrapper, form, etc.)

---

## Structure actuelle du projet

```
LallemandFrederic_New/
├── index.html                    ← site EN LIGNE (Portfolio Cinéma, statique)
├── index_old.html                ← ancien site, backup avant le swap du 2026-07-02
├── casa.html                     ← page de test ayant servi à valider la conversion (jetable)
├── lallemand_casa_maquette.html  ← ancienne cible, abandonnée
├── CLAUDE.md                     ← ce fichier
├── AVANCEMENT.md                 ← suivi étape par étape (historique complet des corrections)
├── logo_LF.png                   ← logo officiel
├── style.css                     ← CSS de l'ancien site (index_old.html), plus utilisé par index.html
├── CSS/
│   ├── styleCasa.css             ← CSS du site en ligne (index.html)
│   ├── styleNavbar2.css          ← CSS navbar de l'ancien site
│   ├── stylePhotoNavBar01Burger.css ← navbar pages Photo/Pano/Planete (toujours utilisée par ces pages)
│   └── ...                       ← autres CSS secondaires
├── JS/
│   ├── appCasa.js                ← JS du site en ligne (index.html) : thème, parallax, reveal, filtres, curseur
│   ├── appNavbar2.js             ← JS navbar de l'ancien site
│   ├── main.js                   ← JS principal de l'ancien site (loader, parallax, carousel, sliders)
│   └── ...
├── media/                        ← SOURCE OFFICIELLE DES IMAGES (voir règle ci-dessus)
│   ├── parallax/PNG/             ← couches du parallax (5 fichiers)
│   ├── images/                   ← photos Liège (8 fichiers)
│   ├── panoramiques/             ← pano hero + Galerie_Pano/ (12 fichiers)
│   ├── mini_planetes/            ← planète hero + 13 mini-planètes
│   └── videos/images_liens_Youtube/ ← thumbnails carousels vidéo (obsolète si cinema.jsx utilise YouTube direct)
├── siteClaude/                   ← RÉFÉRENCE DE DESIGN D'ORIGINE (Claude Design, converti et intégré — plus synchronisé)
│   ├── Portfolio Cinéma.html     ← prototype React de la variante retenue (historique)
│   ├── cinema.jsx                ← composants React de la variante retenue (historique)
│   ├── cinema.css                ← styles de la variante retenue (base de `CSS/styleCasa.css`)
│   ├── README.md                 ← handoff de design (specs pixel, tokens) — toujours utile en référence
│   ├── Portfolio.html / app.jsx  ← brouillon, jamais intégré
│   ├── Explorations.html / explorations-components.jsx / design-canvas.jsx ← brouillons, jamais intégrés
│   └── assets/                   ← images d'appoint du prototype, jamais la source officielle
├── PHOTOS.html / PANO.html / PLANETE.html / VIDEO.html
├── PrixPhotos.html / PrixPano.html / PrixPlanete.html
└── Youtube/moyenMetrage.html
```
---


Compromis : Ces recommandations privilégient la prudence à la rapidité. Pour les tâches simples, faites preuve de discernement.

1. Réfléchissez avant de coder
Ne présumez de rien. N'ignorez pas votre confusion. Mettez en lumière les compromis.

Avant la mise en œuvre :

Énoncez clairement vos hypothèses. En cas de doute, posez des questions.
S'il existe plusieurs interprétations, présentez-les – ne choisissez pas en silence.
S'il existe une solution plus simple, dites-le. N'hésitez pas à faire valoir vos objections lorsque cela est justifié.
Si quelque chose n'est pas clair, arrêtez-vous. Nommez ce qui vous paraît confus. Posez des questions.
2. La simplicité d'abord
Code minimal permettant de résoudre le problème. Rien de spéculatif.

Aucune fonctionnalité supplémentaire n'est requise.
Pas d'abstractions pour le code à usage unique.
Aucune « flexibilité » ni « configurabilité » qui n'ait été demandée.
Aucune gestion des erreurs pour les scénarios impossibles.
Si vous écrivez 200 lignes alors qu'il n'y en aurait que 50, réécrivez-les.
Demandez-vous : « Un ingénieur senior dirait-il que c'est trop compliqué ? » Si oui, simplifiez.

3. Modifications chirurgicales
Ne touchez qu'à ce que vous devez. Ne nettoyez que vos propres dégâts.

Lors de la modification de code existant :

Ne modifiez pas le code, les commentaires ou la mise en forme adjacents.
Ne remaniez pas ce qui n'est pas cassé.
Respectez le style existant, même si vous le feriez différemment.
Si vous remarquez du code mort sans rapport avec le sujet, signalez-le – ne le supprimez pas.
Lorsque vos modifications créent des éléments orphelins :

Supprimez les importations/variables/fonctions que VOS modifications ont rendues inutilisées.
Ne supprimez pas le code mort préexistant sauf si cela vous est demandé.
Le test : chaque ligne modifiée doit correspondre directement à la requête de l’utilisateur.

4. Exécution axée sur les objectifs
Définir les critères de réussite. Boucler jusqu'à vérification.

Transformer les tâches en objectifs vérifiables :

"Ajouter une validation" → "Écrire des tests pour les entrées invalides, puis les faire réussir"
« Corriger le bug » → « Écrire un test qui le reproduit, puis s'assurer qu'il réussisse »
« Refactoriser X » → « S'assurer que les tests réussissent avant et après »
Pour les tâches en plusieurs étapes, veuillez décrire brièvement le plan :

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
Des critères de réussite rigoureux permettent une autonomie totale. Des critères faibles (« faire en sorte que ça marche ») nécessitent des clarifications constantes.

Ces directives fonctionnent si : moins de modifications inutiles dans les différences, moins de réécritures dues à une complexité excessive, et les questions de clarification sont posées avant la mise en œuvre plutôt qu'après les erreurs.

---

## Le design "Portfolio Cinéma" — maintenant en ligne

`siteClaude/cinema.jsx`/`cinema.css` était un prototype React chargé via CDN (unpkg) + compilé en direct dans le navigateur par Babel. **Décision prise et appliquée (2026-07-02) : converti en HTML/CSS/JS statique**, cohérent avec le reste du site — c'est ce qui tourne aujourd'hui dans `index.html` + `CSS/styleCasa.css` + `JS/appCasa.js`. `siteClaude/` reste disponible comme référence de design d'origine mais n'est plus synchronisé avec le site en ligne.

### Design system (`CSS/styleCasa.css`, repris de `cinema.css`)

| Variable | Valeur dark | Valeur light |
|---|---|---|
| `--bg` | `#15110d` | `#ece4d2` |
| `--bg-raise` | `#1e1711` | `#e3dac6` |
| `--bg-3` | `#271e15` | `#d8ceb6` |
| `--ink` | `#fffae1` | `#1c1710` |
| `--ink-dim` | `#b0a488` | `#6a5f4c` |
| `--amber` | `#cf9548` | `#a4661f` |
| `--slate` | `#7fa0a8` | `#3f6067` |
| `--red` (REC/tampon) | `#c9503f` | `#b23f30` |

Thème par défaut : dark (`data-theme="dark"` sur `<body>`).

### Polices

- `Instrument Serif` (italic) — titres hero et sections
- `Work Sans` (300/400/500/600) — corps de texte
- `JetBrains Mono` (400/500/600) — labels, codes, numéros, brand
- `Dancing Script` (400 à 700) — accent signature

Règle (2026-07-03) : sur desktop, le texte "à lire" (paragraphes, descriptions, valeurs de contact, champ de formulaire, menu de nav top) ne descend jamais sous 16px — plancher fixé suite à un retour utilisateur. Le mobile garde ses tailles d'origine (souvent plus petites), et les micro-labels typographiques volontairement discrets (numéros `L01`, tags "HTML · CSS...", timecodes, catégories en petites capitales JetBrains Mono) restent en dessous, non concernés par cette règle.

### Sections (`cinema.jsx`)

| ID | Numéro | Titre |
|---|---|---|
| `#top-card` | — | Carte de titre / hero |
| `#about` | 01 — À propos | Deux métiers, un seul regard |
| `#gallery` | 02 — Photographie | Liège, en pleine lumière |
| `#films` | 03 — Films | Moyens & courts métrages |
| `#credits` | 04 — Générique technique | Ce que je sais faire |
| `#project` | 05 — Web lab | Ce que je construis. |
| `#contact` | — | Contact |

Note : la section `#project` (2026-07-03) est maintenant une mécanique interactive — une fenêtre `.project-card` affiche le projet actif (tags, titre, description, bouton démo ou "Bientôt disponible"), et huit cartes `.lab-item` (`L01`-`L08`) en dessous permettent de changer ce projet au survol (desktop) ou au clic (partout) — voir `JS/appCasa.js`. Par défaut la fenêtre affiche Dashboard Statistics (`L02`, lien réel vers `https://lallemand-fred.github.io/Statistics-Dashboard/`). `MotoShop` (`L07`) et `Réservation Tennis` (`L08`, projet Python — résa de terrain + gestion admin) sont déjà dans la liste en "Bientôt disponible" ; MotoShop prendra la place de Dashboard par défaut une fois déployé (Phase 7, cf. `AVANCEMENT.md`).

### Comportements implémentés (déjà en place dans `index.html`/`JS/appCasa.js`)

Specs validées avec Claude Design (voir `siteClaude/README.md` pour le détail pixel-près complet) et actuellement en place dans le site statique :

- Parallax : 5 couches, multiplicateurs de scroll exacts `0.40/0.35/0.30/0.17/0.08`, titres Dancing Script. Pas de HUD ("REC", "SCÈNE 01") entre le parallax et la section suivante.
- About : colonne gauche sticky, timeline qui apparaît au scroll.
- Galerie : pellicule horizontale, filtres, flèches, images en pleine couleur.
- Films : même principe que la galerie, filtres par catégorie, vignettes YouTube.
- Sprocket : 30 perforations, utilisé 6 fois.
- Reveal on scroll : IntersectionObserver (threshold 0.12), respecte `prefers-reduced-motion`.
- Curseur glow ambre, actif seulement au survol des éléments importants, désactivé sur tactile.
- Thème clair/sombre togglable, navbar avec flou + bordure au scroll, grain de film en overlay.
- Design haute fidélité : reproduction pixel-près attendue si on retouche le CSS, pas de réinterprétation libre.
- Web lab (`#project`) : fenêtre projet + cartes interactives `L01`-`L08`, voir note dans le tableau des sections ci-dessus.

---

## Pages secondaires — Phase 6 terminée (2026-07-06)

Ces pages ont leur propre navbar (`stylePhotoNavBar01Burger.css` + `appNavBar01Burger.js`) :

- `PHOTOS.html`, `PANO.html`, `PLANETE.html`
- `PrixPhotos.html`, `PrixPano.html`, `PrixPlanete.html`

Leur lien "Vidéos" pointait vers `index.html#video` (ancien id, disparu du nouveau design) — corrigé en `index.html#films`. "Accueil" et "Contact" pointaient déjà correctement vers le nouveau `index.html`.

`VIDEO.html` et `Youtube/moyenMetrage.html` sont des pages orphelines (pas de navbar, aucun lien entrant depuis le nouveau `index.html` — obsolètes depuis la décision du 2026-07-02 de lier "L'Hiver Noir" en direct vers YouTube) : rien à y corriger.

Voir `AVANCEMENT.md` Phase 6.

---

## Plan de migration — grandes phases

Voir `AVANCEMENT.md` pour le détail étape par étape et l'historique complet des corrections.

---

## Notes techniques importantes

- Formulaire contact `formsubmit.co` intégré dans `index.html` (action hashée `83a919eb28df6b2c574f6a644f13d4a0` conservée)
- La section "Liens travaux WEB" reste supprimée dans le nouveau design (pas pertinente dans un portfolio pro)
- Garder le CNAME intact
- Ne jamais utiliser le contenu codé en dur de `siteClaude/` comme source finale sans vérification — toujours remonter vers le dépôt de base (voir règle en tête de fichier)
