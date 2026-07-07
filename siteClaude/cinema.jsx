/* Lallemand Frédéric — FUSION Cinéma × Parallax */
const { useState, useEffect, useRef, useMemo } = React;

/* ============ DATA ============ */
const TIMELINE = [
  { year: "1990s", title: "Jetable & caméscope Hi-8", desc: "Premiers paysages, premiers courts métrages burlesques — décors en carton, inspirés par Les Inconnus." },
  { year: "2004", title: "L'Enfant · Frères Dardenne", desc: "Premiers pas sur un vrai plateau comme régisseur. L'expérience fondatrice." },
  { year: "2005", title: "Formation audiovisuelle · GSARA", desc: "Stage à La Bande Large sur « Je veux voir » — chef op, cadreur, monteur, formateur son." },
  { year: "2008+", title: "Films sociaux · La Bande Large & EsquisseS", desc: "Moyens métrages co-écrits avec des participants de tout âge. Revaloriser, redonner confiance, projeter." },
  { year: "2015+", title: "Photo · Liège architecturale", desc: "Séries de photos, panoramiques 360° et mini-planètes stéréographiques des paysages liégeois." },
  { year: "2022", title: "GitHub · le déclic du code", desc: "Le même regard que pour une image — composition, détail, système. Mais en interface." },
  { year: "2026", title: "IPEFA Verviers · UI / UX Engineer", desc: "Là où le design, l'image et la technologie se rejoignent. Actuellement en études et en stage." },
];

const PHOTOS = [
  { type: "Photos",        tag: "Tour Kennedy — Liège",      img: "media/images/Tour_Kennedy01PETIT.jpg",              w: 620 },
  { type: "Panoramiques",  tag: "Parc de la Boverie — 360°", img: "media/panoramiques/Pano_Parc_Boverie_PETIT02.jpg",  w: 1040 },
  { type: "Mini-planètes", tag: "Mini-planète · Boverie",    img: "media/mini_planetes/Planete_Parc_BoveriePETIT.jpg", w: 460 },
  { type: "Photos",        tag: "Tour des finances",   img: "media/images/Photo-1.jpg", w: 620, support: "Plaque aluminium", format: "50 x 35 cm" },
  { type: "Photos",        tag: "Chiroux",              img: "media/images/Photo-2.jpg", w: 620, support: "Plaque aluminium", format: "50 x 35 cm" },
  { type: "Photos",        tag: "Fleurs",               img: "media/images/Photo-3.jpg", w: 620, support: "Plaque aluminium", format: "33 x 40 cm" },
  { type: "Photos",        tag: "Fontaine Paradis",     img: "media/images/Photo-4.jpg", w: 620, support: "Plaque aluminium", format: "50 x 35 cm" },
  { type: "Photos",        tag: "Passerelle",           img: "media/images/Photo-5.jpg", w: 620, support: "Plaque aluminium", format: "50 x 35 cm" },
  { type: "Photos",        tag: "Piercot",              img: "media/images/Photo-6.jpg", w: 620, support: "Plaque aluminium", format: "50 x 35 cm" },
  { type: "Photos",        tag: "Kennedy",              img: "media/images/Photo-7.jpg", w: 620, support: "Plaque aluminium", format: "50 x 35 cm" },
  { type: "Panoramiques",  tag: "Bavière",               img: "media/panoramiques/Galerie_Pano/pano-1.jpg",  w: 1040, support: "Toile coton",       format: "150 x 40 cm" },
  { type: "Panoramiques",  tag: "Quai de Rome",          img: "media/panoramiques/Galerie_Pano/pano-2.jpg",  w: 1040, support: "Plaque aluminium",   format: "150 x 35 cm" },
  { type: "Panoramiques",  tag: "Pont de Fragnée",       img: "media/panoramiques/Galerie_Pano/pano-3.jpg",  w: 1040, support: "Plaque aluminium",   format: "150 x 45 cm" },
  { type: "Panoramiques",  tag: "Place Pierre Clerdent", img: "media/panoramiques/Galerie_Pano/pano-4.jpg",  w: 1040, support: "Plaque aluminium",   format: "150 x 35 cm" },
  { type: "Panoramiques",  tag: "Sous la pluie",         img: "media/panoramiques/Galerie_Pano/pano-5.jpg",  w: 1040 },
  { type: "Panoramiques",  tag: "Saucy",                 img: "media/panoramiques/Galerie_Pano/pano-6.jpg",  w: 1040, support: "Plaque aluminium",   format: "150 x 35 cm" },
  { type: "Panoramiques",  tag: "Place Paradis",         img: "media/panoramiques/Galerie_Pano/pano-7.jpg",  w: 1040, support: "Plaque aluminium",   format: "150 x 35 cm" },
  { type: "Panoramiques",  tag: "Boverie",               img: "media/panoramiques/Galerie_Pano/pano-8.jpg",  w: 1040, support: "Plaque aluminium",   format: "150 x 35 cm" },
  { type: "Panoramiques",  tag: "Place St Lambert",      img: "media/panoramiques/Galerie_Pano/pano-9.jpg",  w: 1040, support: "Toile coton",        format: "150 x 35 cm" },
  { type: "Panoramiques",  tag: "Quai St Léonard",       img: "media/panoramiques/Galerie_Pano/pano-10.jpg", w: 1040, support: "Toile coton",        format: "150 x 40 cm" },
  { type: "Panoramiques",  tag: "Botanique",             img: "media/panoramiques/Galerie_Pano/pano-11.jpg", w: 1040, support: "Toile coton",        format: "150 x 45 cm" },
  { type: "Mini-planètes", tag: "Planète Albert 1er",       img: "media/mini_planetes/Planete-1.jpg",  w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète Fragnée",          img: "media/mini_planetes/Planete-2.jpg",  w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète Botanique",        img: "media/mini_planetes/Planete-3.jpg",  w: 460, support: "Toile coton",       format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète Guillemins",       img: "media/mini_planetes/Planete-4.jpg",  w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète Saucy",            img: "media/mini_planetes/Planete-5.jpg",  w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète St Lambert — Flashy", img: "media/mini_planetes/Planete-6.jpg",  w: 460 },
  { type: "Mini-planètes", tag: "Planète St Lambert",       img: "media/mini_planetes/Planete-7.jpg",  w: 460, support: "Toile acrylique",   format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète Boverie",          img: "media/mini_planetes/Planete-8.jpg",  w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète Maghin",           img: "media/mini_planetes/Planete-9.jpg",  w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète Paradis",          img: "media/mini_planetes/Planete-10.jpg", w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète Pierre Clerdent",  img: "media/mini_planetes/Planete-11.jpg", w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète St Léonard",       img: "media/mini_planetes/Planete-12.jpg", w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
  { type: "Mini-planètes", tag: "Planète Rome",             img: "media/mini_planetes/Planete-13.jpg", w: 460, support: "Plaque aluminium", format: "35 x 35 cm" },
];
const GAL_FILTERS = ["Tout", "Photos", "Panoramiques", "Mini-planètes"];

const VIDEOS = [
  { cat: "Moyen métrage",  title: "L'Hiver Noir",       sub: "Bande-annonce",                   yt: "ogPB_kxFN_8" },
  { cat: "Moyen métrage",  title: "L'Hiver Noir",       sub: "Film complet",                    yt: "9FbwLl1mf1g" },
  { cat: "Moyen métrage",  title: "Le tour du monde",   sub: "EsquisseS ASBL · Esneux",         yt: "oTsjupcDRes" },
  { cat: "Moyen métrage",  title: "Starlettes",         sub: "La Bande Large · Esneux",         yt: "Qun36tY-TO8" },
  { cat: "Court métrage",  title: "Dehors !",           sub: "Animé par La Bande Large",        yt: "ibcSq0qBmGs" },
  { cat: "Court métrage",  title: "Deux gouttes d'eau", sub: "Animé par La Bande Large",        yt: "mW6ZGUTK9QE" },
  { cat: "Court métrage",  title: "Cantate pour un cambrioleur", sub: "Animé par EsquisseS ASBL", yt: "lOxviEp6J58" },
  { cat: "Court métrage",  title: "La rue Beauregard",  sub: "Diffusé sur MCM",                 yt: "LGpj8TReIQU" },
  { cat: "Court métrage",  title: "Comme une ombre",    sub: "Animé par La Bande Large",        yt: "sDE2qk5qqbY" },
  { cat: "Court métrage",  title: "Escale mortelle",    sub: "Animé par EsquisseS ASBL",        yt: "fTkKu6lHloU" },
  { cat: "Court métrage",  title: "2h chrono",          sub: "Animé par La Bande Large",        yt: "x-fwHP0Zptg" },
  { cat: "Court métrage",  title: "Thérapie de groupe", sub: "Animé par La Bande Large",        yt: "7nq_m48i9rM" },
  { cat: "Court métrage",  title: "Amour & hasard",     sub: "Animé par EsquisseS ASBL",        yt: "dmnL9umeQvY" },
  { cat: "Court métrage",  title: "Le Couloir",         sub: "Monteur — Adrien François",       yt: "xQdUwQY0pkQ" },
  { cat: "Court métrage",  title: "Hors contrôle",      sub: "Monteur — Khalid Zahar & Adrien François", yt: "NWuoYPswKgU" },
  { cat: "Série",          title: "Joli-Bois · Ep 1",   sub: "Tous violents",                   yt: "XAu3OlbAMsI" },
  { cat: "Série",          title: "Joli-Bois · Ep 2",   sub: "Tous sales & paresseux",          yt: "vLMZqfXdlZE" },
  { cat: "Série",          title: "Joli-Bois · Ep 3",   sub: "Tous incultes",                   yt: "LhXdct9h6e4" },
  { cat: "Série",          title: "Joli-Bois · Ep 4",   sub: "Tous des voyous",                 yt: "VMbSA5ZUYfw" },
  { cat: "Série",          title: "Joli-Bois · Ep 5",   sub: "Tous alcooliques",                yt: "dIe6IsgVKXo" },
  { cat: "Série",          title: "Joli-Bois · Ep 6",   sub: "Ne trouverais pas l'amour ici",   yt: "MzPgO01mHqY" },
  { cat: "Animation logo", title: "BILDO",              sub: "Animation du logo",               yt: "_Wh_ejt_s_o" },
  { cat: "Animation logo", title: "PixL",               sub: "Animation du logo",               yt: "5JdCccmM1aA" },
  { cat: "Animation logo", title: "SKO",                sub: "Animation du logo",               yt: "ry_d1xeSCSE" },
  { cat: "Animation logo", title: "BRK",                sub: "Animation du logo",               yt: "OeJ_oUZfB8Y" },
  { cat: "Captation",      title: "Festival de Liège",  sub: "2009 · Caserne Fonck",            yt: "ETnX5sDwEwA" },
  { cat: "Captation",      title: "Trop en forme",      sub: "Clip vidéo · Dope Skwad + ADN76", yt: "HayedluDHys" },
  { cat: "Captation",      title: "Festival du film d'action sociale", sub: "2012 · Foyer Culturel de Sprimont", yt: "u0lPQkLFCiQ" },
  { cat: "Captation",      title: "Place aux enfants",  sub: "2009 · Région de Sprimont",       yt: "oYfI_x2Z-dQ" },
];
const VIDEO_TABS = ["Tout", "Moyen métrage", "Court métrage", "Série", "Animation logo", "Captation"];

const CREDITS = [
  { role: "Image", name: "Photographie, cadre, étalonnage" },
  { role: "Post-prod", name: "Montage, motion, animation logo" },
  { role: "Front-end", name: "HTML, CSS avancé, JavaScript" },
  { role: "Interface", name: "UI / UX, design system, Figma" },
  { role: "Outils", name: "Photoshop, Premiere, After Effects" },
  { role: "En cours", name: "React, gestion de données · IPEFA" },
];

const LAB = [
  { n: "L01", t: "Page parallax", d: "Hero multi-couches, scroll GPU synchronisé." },
  { n: "L02", t: "Dashboard stats", d: "Data-viz — Chart.js, design sobre." },
  { n: "L03", t: "Navbars 3D & burger", d: "Transitions, profondeur, interaction." },
  { n: "L04", t: "Animations de cartes", d: "Flip, hover, révélation soignée." },
  { n: "L05", t: "Page login liquide", d: "Glassmorphism, effet fluide." },
  { n: "L06", t: "Pluie de mots", d: "Canvas particulaire, typo en mouvement." },
];

/* ============ ICONS ============ */
const SunMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
  </svg>
);
const Chevron = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d={dir === "left" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} />
  </svg>
);

/* ============ TOP BAR ============ */
function TopBar({ toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header className={`top ${scrolled ? "scrolled" : ""}`}>
      <div className="topbar-inner">
        <a className="brand" href="#top"><span className="rec-dot" />lallemand<b>.frédéric</b></a>
        <nav className="top-links">
          <a href="#about">à propos</a>
          <a href="#gallery">photos</a>
          <a href="#films">films</a>
          <a href="#credits">compétences</a>
          <a href="#project">projet</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="top-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer de thème"><SunMoon /></button>
        </div>
      </div>
    </header>
  );
}

/* ============ PARALLAX (ORIGINE — inchangé) ============ */
function Parallax() {
  useEffect(() => {
    const ids = ["background", "middelEnd", "middelStart", "frontEnd", "frontStart", "lastName", "firstName"];
    const [background, middelEnd, middelStart, frontEnd, frontStart, lastName, firstName] = ids.map(i => document.getElementById(i));
    const onScroll = () => {
      const value = window.scrollY;
      if (background)  background.style.top  = value * 0.40 + "px";
      if (middelEnd)   middelEnd.style.top   = value * 0.35 + "px";
      if (middelStart) middelStart.style.top = value * 0.30 + "px";
      if (frontEnd)    frontEnd.style.top    = value * 0.17 + "px";
      if (frontStart)  frontStart.style.top  = value * 0.08 + "px";
      if (lastName)    lastName.style.marginBotton  = value * 2 + "px";
      if (firstName)   firstName.style.marginBotton = value * 2 + "px";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="parallax-shell">
      <section id="imageParallax">
        <img src="media/parallax/PNG/parallax05.png" alt="Arrière-plan parallax" id="background" />
        <h1 id="lastName">Lallemand</h1>
        <img src="media/parallax/PNG/parallax04.png" alt="Couche parallax arrière" id="middelEnd" />
        <h1 id="firstName">Frédéric</h1>
        <img src="media/parallax/PNG/parallax03.png" alt="Couche parallax centrale" id="middelStart" />
        <img src="media/parallax/PNG/parallax02.png" alt="Couche parallax avant" id="frontEnd" />
        <img src="media/parallax/PNG/parallax01.png" alt="Premier plan parallax" id="frontStart" />
      </section>
    </div>
  );
}

/* ============ TITLE CARD ============ */
function TitleCard() {
  const tcRef = useRef(null);
  useEffect(() => {
    const start = Date.now();
    let raf;
    const pad = n => String(n).padStart(2, "0");
    const tick = () => {
      const e = Date.now() - start;
      const h = Math.floor(e / 3600000), m = Math.floor((e % 3600000) / 60000), s = Math.floor((e % 60000) / 1000), f = Math.floor((e % 1000) / 42);
      if (tcRef.current) tcRef.current.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <section className="titlecard" id="top-card">
      <div className="wrap">
        <div className="eyebrow reveal"><span className="rec-dot" />Régisseur de formation — développeur par choix</div>
        <h1 className="reveal">Je cadre des <em>histoires</em>, je construis des <em>interfaces.</em></h1>
        <div className="sub">
          <p className="tag reveal">Photographe et réalisateur liégeois, aujourd'hui en route vers l'UI/UX engineering. Ce site est le plan de coupe entre ces deux mondes.</p>
          <div className="timecode reveal">
            <span className="label">Temps sur site</span>
            <span className="code" ref={tcRef}>00:00:00:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SPROCKET ============ */
function Sprocket() {
  return <div className="sprocket" aria-hidden="true">{Array.from({ length: 30 }).map((_, i) => <i key={i} />)}</div>;
}

/* ============ ABOUT + CV (sticky texte gauche · parcours droite) ============ */
function About() {
  return (
    <section className="blk" id="about">
      <div className="wrap about-layout">
        <div className="about-left">
          <span className="section-num reveal">01 — À propos</span>
          <h2 className="reveal">Deux métiers, un seul regard.</h2>
          <p className="about-lead reveal">De la régie de plateau (Dardenne, GSARA) à la régie de code. Même exigence, autre matière.</p>
          <div className="about-col reveal">
            <span className="role">1990 — 2016 · Plateau & image</span>
            <h3>Réalisateur, cadreur, monteur</h3>
            <p>Formé à l'audiovisuel au GSARA, j'ai passé plus de vingt ans autour de l'image — régie, cadre, montage, animation 2D/3D. Premier plateau sur « L'Enfant » des Dardenne. La lecture d'un cadre, le sens du détail, la patience du montage : ce sont ces réflexes que j'emmène partout.</p>
          </div>
          <div className="about-col reveal">
            <span className="role">Depuis 2022 · Écran & code</span>
            <h3>Futur UI / UX Engineer</h3>
            <p>Reconversion vers le développement web depuis la découverte de GitHub. Étudiant à l'IPEFA de Verviers en gestion de données et programmation. L'objectif : concevoir des interfaces avec la même exigence qu'un cadre bien composé.</p>
          </div>
        </div>

        <div className="about-right">
          <div className="cv-head reveal">Générique · parcours</div>
          <div className="timeline">
            {TIMELINE.map((r, i) => (
              <div className="tl-row reveal" key={i}>
                <div className="tl-year">{r.year}</div>
                <div>
                  <h3 className="tl-title">{r.title}</h3>
                  <p className="tl-desc">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ GALLERY — pellicule horizontale, pleine couleur ============ */
function Gallery() {
  const [filter, setFilter] = useState("Tout");
  const reelRef = useRef(null);
  const shown = useMemo(() => filter === "Tout" ? PHOTOS : PHOTOS.filter(p => p.type === filter), [filter]);
  const scrollBy = (dx) => reelRef.current && reelRef.current.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="blk" id="gallery">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-num reveal">02 — Photographie</span>
            <h2 className="reveal">Liège, en pleine lumière.</h2>
          </div>
          <p className="reveal">Architecture, panoramiques 360° et mini-planètes — trois manières de lire la même ville.</p>
        </div>
        <div className="reel-controls reveal">
          <div className="gal-filters">
            {GAL_FILTERS.map(f => (
              <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="reel-arrows">
            <button onClick={() => scrollBy(-560)} aria-label="Précédent"><Chevron dir="left" /></button>
            <button onClick={() => scrollBy(560)} aria-label="Suivant"><Chevron dir="right" /></button>
          </div>
        </div>
      </div>
      <div className="reel" ref={reelRef}>
        <div className="reel-pad" />
        {shown.map((p, i) => (
          <figure className="plate reveal" key={p.img} style={{ width: p.w, transitionDelay: `${i * 40}ms` }}>
            <div className="plate-frame">
              <img src={p.img} alt={p.tag} loading="lazy" />
              {p.support && <span className="plate-meta">{p.support}<br />{p.format}</span>}
            </div>
            <figcaption>
              <span className="plate-type">{p.type}</span>
              <span className="plate-tag">{p.tag}</span>
            </figcaption>
          </figure>
        ))}
        <div className="reel-pad" />
      </div>
    </section>
  );
}

/* ============ FILMS — carrousel vidéos YouTube ============ */
function Films() {
  const [tab, setTab] = useState("Tout");
  const reelRef = useRef(null);
  const shown = useMemo(() => tab === "Tout" ? VIDEOS : VIDEOS.filter(v => v.cat === tab), [tab]);
  const scrollBy = (dx) => reelRef.current && reelRef.current.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="blk" id="films">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-num reveal">03 — Films</span>
            <h2 className="reveal">Moyens & courts métrages.</h2>
          </div>
          <p className="reveal">Vingt ans de réalisation — du documentaire social à la série comique et l'animation de logo.</p>
        </div>
        <div className="reel-controls reveal">
          <div className="gal-filters">
            {VIDEO_TABS.map(t => (
              <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <div className="reel-arrows">
            <button onClick={() => scrollBy(-460)} aria-label="Précédent"><Chevron dir="left" /></button>
            <button onClick={() => scrollBy(460)} aria-label="Suivant"><Chevron dir="right" /></button>
          </div>
        </div>
      </div>
      <div className="reel" ref={reelRef}>
        <div className="reel-pad" />
        {shown.map((v, i) => (
          <a className="vid reveal" key={v.yt + i} href={`https://www.youtube.com/watch?v=${v.yt}`} target="_blank" rel="noopener" style={{ transitionDelay: `${i * 40}ms` }}>
            <div className="vid-poster">
              <img src={`https://img.youtube.com/vi/${v.yt}/hqdefault.jpg`} alt={v.title} loading="lazy" />
              <span className="vid-cat">{v.cat}</span>
              <span className="vid-play"><svg viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.5v9l7-4.5-7-4.5z" /></svg></span>
            </div>
            <div className="vid-body">
              <span className="vid-title">{v.title}</span>
              <span className="vid-sub">{v.sub}</span>
            </div>
          </a>
        ))}
        <div className="reel-pad" />
      </div>
    </section>
  );
}

/* ============ CREDITS / SKILLS ============ */
function Credits() {
  return (
    <section className="blk" id="credits">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-num reveal">04 — Générique technique</span>
            <h2 className="reveal">Ce que je sais faire.</h2>
          </div>
          <p className="reveal">Présenté comme un générique de fin — cohérent avec le reste du plateau.</p>
        </div>
        <div className="credits-roll">
          {CREDITS.map((c, i) => (
            <div className="credit-line reveal" key={i} style={{ transitionDelay: `${i * 40}ms` }}>
              <span className="credit-role">{c.role}</span>
              <span className="credit-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PROJECT / WEB LAB ============ */
function Project() {
  return (
    <section className="blk" id="project">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-num reveal">05 — Web lab</span>
            <h2 className="reveal">Le code, en tournage.</h2>
          </div>
          <p className="reveal">Onze petits ateliers front-end — la mécanique des interfaces : mouvement, état, chorégraphie.</p>
        </div>
        <div className="project-card reveal">
          <div className="stamp">Démo<br />en ligne</div>
          <span className="role">HTML · CSS avancé · JavaScript</span>
          <h3>Dashboard Statistics</h3>
          <p>Tableau de bord data-viz complet et déployé : graphiques, sparklines, thème sobre. Le premier vrai projet qui combine mon œil d'image et la rigueur du code — pensé comme on compose un cadre.</p>
          <a className="project-link" href="https://lallemand-fred.github.io/Statistics-Dashboard/" target="_blank" rel="noopener">Voir la démo →</a>
        </div>
        <div className="lab-mini">
          {LAB.map((l) => (
            <a className="reveal" href="#" key={l.n}>
              <span className="n">{l.n}</span>
              <span className="t">{l.t}</span>
              <span className="d">{l.d}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CONTACT ============ */
function Contact() {
  return (
    <section className="blk contact" id="contact">
      <div className="wrap">
        <div className="contact-band reveal">
          <div className="contact-lead">
            <span className="section-num">06 — Contact</span>
            <h2>On tourne <em>ensemble</em> ?</h2>
            <p>Un projet photo, un film, une interface — écrivez-moi.</p>
          </div>
          <div className="contact-links">
            <a href="mailto:lallemand_fred@hotmail.com"><span className="cl-label">Email</span><span className="cl-val">lallemand_fred@hotmail.com</span></a>
            <a href="https://github.com/lallemand-fred" target="_blank" rel="noopener"><span className="cl-label">GitHub</span><span className="cl-val">@lallemand-fred</span></a>
            <a href="https://www.youtube.com/@belgiumvision" target="_blank" rel="noopener"><span className="cl-label">YouTube</span><span className="cl-val">Chaîne de Fred</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ CURSOR GLOW — halo sur éléments importants ============ */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const SEL = "a, button, .plate, .vid, .film-row, .lab-mini a, .project-card, .theme-toggle, .credit-line";
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, raf;
    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (ref.current) ref.current.classList.toggle("active", !!e.target.closest(SEL));
    };
    const loop = () => {
      x += (tx - x) * 0.16; y += (ty - y) * 0.16;
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}

/* ============ APP ============ */
function App() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => { document.body.setAttribute("data-theme", theme); }, [theme]);
  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    const q = () => document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
    q();
    const t = setTimeout(q, 80);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <>
      <TopBar toggleTheme={toggleTheme} />
      <Parallax />
      <TitleCard />
      <Sprocket />
      <About />
      <Sprocket />
      <Gallery />
      <Sprocket />
      <Films />
      <Sprocket />
      <Credits />
      <Sprocket />
      <Project />
      <Sprocket />
      <Contact />
      <footer className="bottom">
        <div className="inner">
          <span>© 2026 Frédéric Lallemand</span>
          <span>Liège / Dison, Belgique</span>
        </div>
      </footer>
      <CursorGlow />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
