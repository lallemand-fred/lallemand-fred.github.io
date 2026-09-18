/* Lallemand Frédéric — données du site (galerie photo + films)
   c ici qu on ajoute/modifie une photo ou une vidéo -> appCasa.js construit les cartes tout seul
   l ordre des listes = l ordre d affichage dans la pellicule */

/* ---------- 02 — Photographie ----------
   type : "Photos" | "Panoramiques" | "Mini-planètes" (sert aussi aux filtres + largeur de la carte)
   support + taille : le format affiché au survol (à laisser vide si pas de format) */
const photosGalerie = [
  { type: "Photos", src: "media/images/Photo-1.jpg", nom: "Tour des finances", support: "Plaque aluminium", taille: "50 x 35 cm" },
  { type: "Photos", src: "media/images/Photo-2.jpg", nom: "Chiroux", support: "Plaque aluminium", taille: "50 x 35 cm" },
  { type: "Photos", src: "media/images/Photo-3.jpg", nom: "Fleurs", support: "Plaque aluminium", taille: "33 x 40 cm" },
  { type: "Photos", src: "media/images/Photo-4.jpg", nom: "Fontaine Paradis", support: "Plaque aluminium", taille: "50 x 35 cm" },
  { type: "Photos", src: "media/images/Photo-5.jpg", nom: "Passerelle", support: "Plaque aluminium", taille: "50 x 35 cm" },
  { type: "Photos", src: "media/images/Photo-6.jpg", nom: "Piercot", support: "Plaque aluminium", taille: "50 x 35 cm" },
  { type: "Photos", src: "media/images/Photo-7.jpg", nom: "Kennedy", support: "Plaque aluminium", taille: "50 x 35 cm" },

  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-1.jpg", nom: "Bavière", support: "Toile coton", taille: "150 x 40 cm" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-2.jpg", nom: "Quai de Rome", support: "Plaque aluminium", taille: "150 x 35 cm" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-3.jpg", nom: "Pont de Fragnée", support: "Plaque aluminium", taille: "150 x 45 cm" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-4.jpg", nom: "Place Pierre Clerdent", support: "Plaque aluminium", taille: "150 x 35 cm" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-5.jpg", nom: "Sous la pluie" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-6.jpg", nom: "Saucy", support: "Plaque aluminium", taille: "150 x 35 cm" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-7.jpg", nom: "Place Paradis", support: "Plaque aluminium", taille: "150 x 35 cm" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-8.jpg", nom: "Boverie", support: "Plaque aluminium", taille: "150 x 35 cm" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-9.jpg", nom: "Place St Lambert", support: "Toile coton", taille: "150 x 35 cm" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-10.jpg", nom: "Quai St Léonard", support: "Toile coton", taille: "150 x 40 cm" },
  { type: "Panoramiques", src: "media/panoramiques/Galerie_Pano/pano-11.jpg", nom: "Botanique", support: "Toile coton", taille: "150 x 45 cm" },

  { type: "Mini-planètes", src: "media/mini_planetes/Planete-1.jpg", nom: "Planète Albert 1er", support: "Plaque aluminium", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-2.jpg", nom: "Planète Fragnée", support: "Plaque aluminium", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-3.jpg", nom: "Planète Botanique", support: "Toile coton", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-4.jpg", nom: "Planète Guillemins", support: "Plaque aluminium", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-5.jpg", nom: "Planète Saucy", support: "Plaque aluminium", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-6.jpg", nom: "Planète St Lambert — Flashy" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-7.jpg", nom: "Planète St Lambert", support: "Toile acrylique", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-8.jpg", nom: "Planète Boverie", support: "Plaque aluminium", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-9.jpg", nom: "Planète Maghin", support: "Plaque aluminium", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-10.jpg", nom: "Planète Paradis", support: "Plaque aluminium", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-11.jpg", nom: "Planète Pierre Clerdent", support: "Plaque aluminium", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-12.jpg", nom: "Planète St Léonard", support: "Plaque aluminium", taille: "35 x 35 cm" },
  { type: "Mini-planètes", src: "media/mini_planetes/Planete-13.jpg", nom: "Planète Rome", support: "Plaque aluminium", taille: "35 x 35 cm" },
];

/* ---------- 03 — Films ----------
   id : l ID YouTube (ce qu il y a après watch?v= dans le lien) -> sert pour le lien ET la vignette
   cat : "Moyen métrage" | "Court métrage" | "Série" | "Animation logo" | "Captation" (filtres) */
const videosFilms = [
  { id: "ogPB_kxFN_8", titre: "L'Hiver Noir", sous: "Bande-annonce", cat: "Moyen métrage" },
  { id: "9FbwLl1mf1g", titre: "L'Hiver Noir", sous: "Film complet", cat: "Moyen métrage" },
  { id: "oTsjupcDRes", titre: "Le tour du monde", sous: "EsquisseS ASBL · Esneux", cat: "Moyen métrage" },
  { id: "Qun36tY-TO8", titre: "Starlettes", sous: "La Bande Large · Esneux", cat: "Moyen métrage" },

  { id: "ibcSq0qBmGs", titre: "Dehors !", sous: "Animé par La Bande Large", cat: "Court métrage" },
  { id: "mW6ZGUTK9QE", titre: "Deux gouttes d'eau", sous: "Animé par La Bande Large", cat: "Court métrage" },
  { id: "lOxviEp6J58", titre: "Cantate pour un cambrioleur", sous: "Animé par EsquisseS ASBL", cat: "Court métrage" },
  { id: "LGpj8TReIQU", titre: "La rue Beauregard", sous: "Diffusé sur MCM", cat: "Court métrage" },
  { id: "sDE2qk5qqbY", titre: "Comme une ombre", sous: "Animé par La Bande Large", cat: "Court métrage" },
  { id: "fTkKu6lHloU", titre: "Escale mortelle", sous: "Animé par EsquisseS ASBL", cat: "Court métrage" },
  { id: "x-fwHP0Zptg", titre: "2h chrono", sous: "Animé par La Bande Large", cat: "Court métrage" },
  { id: "7nq_m48i9rM", titre: "Thérapie de groupe", sous: "Animé par La Bande Large", cat: "Court métrage" },
  { id: "dmnL9umeQvY", titre: "Amour & hasard", sous: "Animé par EsquisseS ASBL", cat: "Court métrage" },
  { id: "xQdUwQY0pkQ", titre: "Le Couloir", sous: "Monteur — Adrien François", cat: "Court métrage" },
  { id: "NWuoYPswKgU", titre: "Hors contrôle", sous: "Monteur — Khalid Zahar & Adrien François", cat: "Court métrage" },

  { id: "XAu3OlbAMsI", titre: "Joli-Bois · Ep 1", sous: "Tous violents", cat: "Série" },
  { id: "vLMZqfXdlZE", titre: "Joli-Bois · Ep 2", sous: "Tous sales & paresseux", cat: "Série" },
  { id: "LhXdct9h6e4", titre: "Joli-Bois · Ep 3", sous: "Tous incultes", cat: "Série" },
  { id: "VMbSA5ZUYfw", titre: "Joli-Bois · Ep 4", sous: "Tous des voyous", cat: "Série" },
  { id: "dIe6IsgVKXo", titre: "Joli-Bois · Ep 5", sous: "Tous alcooliques", cat: "Série" },
  { id: "MzPgO01mHqY", titre: "Joli-Bois · Ep 6", sous: "Ne trouverais pas l'amour ici", cat: "Série" },

  { id: "_Wh_ejt_s_o", titre: "BILDO", sous: "Animation du logo", cat: "Animation logo" },
  { id: "5JdCccmM1aA", titre: "PixL", sous: "Animation du logo", cat: "Animation logo" },
  { id: "ry_d1xeSCSE", titre: "SKO", sous: "Animation du logo", cat: "Animation logo" },
  { id: "OeJ_oUZfB8Y", titre: "BRK", sous: "Animation du logo", cat: "Animation logo" },

  { id: "ETnX5sDwEwA", titre: "Festival de Liège", sous: "2009 · Caserne Fonck", cat: "Captation" },
  { id: "HayedluDHys", titre: "Trop en forme", sous: "Clip vidéo · Dope Skwad + ADN76", cat: "Captation" },
  { id: "u0lPQkLFCiQ", titre: "Festival du film d'action sociale", sous: "2012 · Foyer Culturel de Sprimont", cat: "Captation" },
  { id: "oYfI_x2Z-dQ", titre: "Place aux enfants", sous: "2009 · Région de Sprimont", cat: "Captation" },
];
