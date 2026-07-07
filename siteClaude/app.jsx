/* Lallemand Frédéric — Portfolio Prototype
   Single entry, renders the full page. */

const { useState, useEffect, useRef, useMemo } = React;

/* ============ DATA ============ */

const TIMELINE = [
  { year: "1990s", title: "Appareil jetable & caméscope Hi-8", desc: "Premiers paysages, premiers courts métrages burlesques — bricolés en carton, inspirés par Les Inconnus." },
  { year: "2004",  title: "L'Enfant · Frères Dardenne", desc: "Premiers pas sur un vrai plateau comme régisseur. Une expérience fondatrice." },
  { year: "2005",  title: "Formation audiovisuelle · GSARA", desc: "Stage à La Bande Large sur « Je veux voir » — chef op, cam, monteur, formateur son, tout à la fois." },
  { year: "2008+", title: "Films sociaux · La Bande Large & EsquisseS", desc: "Moyens métrages écrits avec des participants de tout âge. Revaloriser, redonner confiance, projeter." },
  { year: "2015+", title: "Photo · Liège architecturale", desc: "Série de photos, panoramiques et mini-planètes autour des paysages urbains liégeois." },
  { year: "2022",  title: "Découverte de GitHub · le code", desc: "Le déclic. Le même regard que pour une image — composition, détail, système." },
  { year: "Aujourd'hui", title: "IPEFA Verviers · UI / UX Engineer", desc: "Là où le design, l'image et la technologie se rejoignent. Disponible pour freelance & CDI." },
];

const WORK = [
  { id: "photos",  num: "01", title: "Photos",        cat: "Architecture · Liège",         img: "assets/photos/tour_kennedy.jpg",            size: "tall" },
  { id: "pano",    num: "02", title: "Panoramiques",  cat: "Paysages urbains 360°",        img: "assets/pano/pano_parc_boverie.jpg",         size: "wide" },
  { id: "planete", num: "03", title: "Mini-planètes", cat: "Projections stéréographiques", img: "assets/planetes/planete_parc_boverie.jpg",  size: "sq"   },
];

const VIDEOS = [
  { cat: "Moyen métrage",  title: "L'Hiver Noir",        sub: "Bande-annonce",                        img: "https://img.youtube.com/vi/oTsjupcDRes/maxresdefault.jpg" },
  { cat: "Moyen métrage",  title: "Le tour du monde",    sub: "EsquisseS ASBL · Esneux",              img: "https://img.youtube.com/vi/oTsjupcDRes/maxresdefault.jpg" },
  { cat: "Moyen métrage",  title: "Starlettes",          sub: "La Bande Large · Esneux",              img: "https://img.youtube.com/vi/Qun36tY-TO8/maxresdefault.jpg" },
  { cat: "Court métrage",  title: "Dehors !",            sub: "Animé par La Bande Large",             img: "https://img.youtube.com/vi/ibcSq0qBmGs/maxresdefault.jpg" },
  { cat: "Court métrage",  title: "Deux gouttes d'eau",  sub: "Animé par La Bande Large",             img: "https://img.youtube.com/vi/mW6ZGUTK9QE/maxresdefault.jpg" },
  { cat: "Court métrage",  title: "La rue beauregard",   sub: "Court métrage · diffusé sur MCM",      img: "https://img.youtube.com/vi/LGpj8TReIQU/maxresdefault.jpg" },
  { cat: "Animation logo", title: "Bildo",               sub: "Animation du logo",                    img: "https://img.youtube.com/vi/_Wh_ejt_s_o/maxresdefault.jpg" },
  { cat: "Animation logo", title: "PixL",                sub: "Animation du logo",                    img: "https://img.youtube.com/vi/5JdCccmM1aA/maxresdefault.jpg" },
  { cat: "Série",          title: "Joli-Bois · Ep 1",    sub: "Tous violents",                        img: "https://img.youtube.com/vi/XAu3OlbAMsI/maxresdefault.jpg" },
  { cat: "Série",          title: "Joli-Bois · Ep 2",    sub: "Tous sales & paresseux",               img: "https://img.youtube.com/vi/vLMZqfXdlZE/maxresdefault.jpg" },
  { cat: "Captation",      title: "Festival de Liège",   sub: "2009 · Caserne Fonck",                 img: "https://img.youtube.com/vi/ETnX5sDwEwA/maxresdefault.jpg" },
];

const LAB = [
  { num: "L01", title: "Page parallax",         desc: "Hero multi-couches, scroll synchronisé, performance GPU.",         tags: ["HTML", "CSS", "JS"] },
  { num: "L02", title: "Dashboard Statistics",  desc: "Tableau de bord data-viz — Chart.js, design sobre.",               tags: ["JS", "Data-viz"] },
  { num: "L03", title: "Navbars 3D & burger",   desc: "Trois navigations explorant transitions, profondeur, interaction.", tags: ["CSS 3D", "UX"] },
  { num: "L04", title: "Animations de cartes",  desc: "Flip, hover, révélation — micro-interactions soignées.",           tags: ["Transitions"] },
  { num: "L05", title: "Page Login",            desc: "Écran d'authentification avec effet liquide, glassmorphism.",      tags: ["CSS", "Forme"] },
  { num: "L06", title: "Pluie de mots",         desc: "Canvas particulaire — typographie en mouvement.",                  tags: ["Canvas", "Anim"] },
];

const VIDEO_TABS = ["Tout", "Moyen métrage", "Court métrage", "Animation logo", "Série", "Captation"];

/* ============ NAV ============ */
function Nav({ onDark, onOpenTweaks }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""} ${onDark ? "on-dark" : ""}`}>
      <a className="nav__brand" href="#top">
        <span className="dot" />
        <span className="name">Lallemand Frédéric</span>
      </a>
      <ul className="nav__links">
        <li><a href="#about">À propos</a></li>
        <li><a href="#work">Photo</a></li>
        <li><a href="#video">Vidéo</a></li>
        <li><a href="#lab">Web lab</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="nav__cta" onClick={onOpenTweaks}>Tweaks</button>
    </nav>
  );
}

/* ============ HERO / PARALLAX — ORIGINAL (ne pas toucher) ============ */
function Hero() {
  useEffect(() => {
    const background  = document.getElementById('background');
    const middelEnd   = document.getElementById('middelEnd');
    const middelStart = document.getElementById('middelStart');
    const frontEnd    = document.getElementById('frontEnd');
    const frontStart  = document.getElementById('frontStart');
    const lastName    = document.getElementById('lastName');
    const firstName   = document.getElementById('firstName');

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
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="imageParallax">
      <img src="assets/parallax/parallax05.png" alt="Arrière-plan parallax" id="background" />
      <h1 id="lastName">Lallemand</h1>
      <img src="assets/parallax/parallax04.png" alt="Couche parallax arrière" id="middelEnd" />
      <h1 id="firstName">Frédéric</h1>
      <img src="assets/parallax/parallax03.png" alt="Couche parallax centrale" id="middelStart" />
      <img src="assets/parallax/parallax02.png" alt="Couche parallax avant" id="frontEnd" />
      <img src="assets/parallax/parallax01.png" alt="Premier plan parallax" id="frontStart" />
    </section>
  );
}

/* ============ TICKER ============ */
function Ticker() {
  const words = ["Photographie", "Réalisation", "Montage", "UI Design", "Front-end", "Panoramas", "Mini-planètes", "Motion"];
  const track = [...words, ...words, ...words];
  return (
    <section className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {track.map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </section>
  );
}

/* ============ ABOUT ============ */
function About() {
  return (
    <section className="about" id="about">
      <div className="section__head">
        <div>
          <p className="section__kicker reveal">01 — À propos</p>
          <h2 className="section__title reveal">
            Depuis un <em>jetable</em> et un Hi-8 — jusqu'au <em>code.</em>
          </h2>
        </div>
      </div>
      <div className="about__grid">
        <p className="about__statement reveal">
          Trente ans d'image pour un même geste&nbsp;: <em>composer.</em> Aujourd'hui je compose des interfaces — même attention au détail, mêmes contraintes de lumière.
        </p>
        <div className="timeline">
          {TIMELINE.map((r, i) => (
            <div className="tl-row reveal" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="tl-year">{r.year}</div>
              <div>
                <h3 className="tl-title">{r.title}</h3>
                <p className="tl-desc">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ WORK ============ */
function Work() {
  return (
    <section className="work" id="work">
      <div className="section__head">
        <div>
          <p className="section__kicker reveal">02 — Photo</p>
          <h2 className="section__title reveal">
            Liège en trois <em>regards.</em>
          </h2>
        </div>
        <p className="section__intro reveal">
          Une ville traitée en architecture, en panorama 360° et en mini-planète stéréographique — trois manières de la voir autrement.
        </p>
      </div>
      <div className="work__grid">
        {WORK.map((w, i) => (
          <a className={`work__card work__card--${w.size} reveal`} href="#" key={w.id} style={{ transitionDelay: `${i * 100}ms` }}>
            <img src={w.img} alt={w.title} />
            <div className="work__caption">
              <div>
                <h3>{w.title}</h3>
                <p>{w.cat}</p>
              </div>
              <span className="work__num">{w.num} / 03</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ============ VIDEOS ============ */
function Videos() {
  const [tab, setTab] = useState("Tout");
  const scrollRef = useRef(null);
  const filtered = useMemo(() => tab === "Tout" ? VIDEOS : VIDEOS.filter(v => v.cat === tab), [tab]);
  const scrollBy = (dx) => scrollRef.current && scrollRef.current.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="videos" id="video">
      <div className="section__head">
        <div>
          <p className="section__kicker reveal">03 — Vidéo</p>
          <h2 className="section__title reveal">
            Films, <em>séries,</em> captations, logos.
          </h2>
        </div>
        <p className="section__intro reveal">
          Vingt ans de réalisation — du documentaire social à l'animation de logo en 3D, en passant par la série comique Joli-Bois.
        </p>
      </div>

      <div className="video-controls">
        <div className="video-tabs">
          {VIDEO_TABS.map(t => (
            <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="video-arrows">
          <button onClick={() => scrollBy(-450)} aria-label="Précédent">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M10 3L5 8l5 5"/></svg>
          </button>
          <button onClick={() => scrollBy(450)} aria-label="Suivant">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 3l5 5-5 5"/></svg>
          </button>
        </div>
      </div>

      <div className="video-scroll" ref={scrollRef}>
        {filtered.map((v, i) => (
          <div className="vid" key={i}>
            <div className="vid__poster">
              <img src={v.img} alt="" loading="lazy"
                   onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <span className="vid__cat">{v.cat}</span>
              <span className="vid__play">
                <svg viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.5v9l7-4.5-7-4.5z"/></svg>
              </span>
            </div>
            <div className="vid__body">
              <h3 className="vid__title">{v.title}</h3>
              <p className="vid__sub">{v.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ WEB LAB ============ */
function WebLab() {
  return (
    <section className="weblab" id="lab">
      <div className="section__head">
        <div>
          <p className="section__kicker reveal">04 — Web lab</p>
          <h2 className="section__title reveal">
            Des <em>expérimentations</em> — front-end brut.
          </h2>
        </div>
        <p className="section__intro reveal">
          En route vers UI/UX Engineer — six petits ateliers pour travailler la mécanique des interfaces&nbsp;: mouvement, chorégraphie, état.
        </p>
      </div>
      <div className="lab-grid">
        {LAB.map((l, i) => (
          <a className="lab-card reveal" href="#" key={l.num} style={{ transitionDelay: `${i * 70}ms` }}>
            <span className="lab-card__num">{l.num}</span>
            <h3 className="lab-card__title">{l.title}</h3>
            <p className="lab-card__desc">{l.desc}</p>
            <div className="lab-card__tags">
              {l.tags.map(t => <span key={t}>{t}</span>)}
            </div>
            <span className="lab-card__arrow">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 17L17 5M7 5h10v10"/></svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ============ CONTACT + FOOTER ============ */
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__hero">
        <p className="section__kicker reveal">05 — Contact</p>
        <h2 className="reveal">Disons-nous <em>bonjour.</em></h2>
        <p className="reveal">
          Projet photo, film, interface — freelance ou CDI. J'écris, je monte, je filme, je code. Si l'un de ces verbes vous intéresse, écrivez-moi.
        </p>
        <div className="contact__detail">
          <div className="contact__line"><span className="lbl">Email</span><a href="mailto:fred@lallemand-fred.be">fred@lallemand-fred.be</a></div>
          <div className="contact__line"><span className="lbl">GitHub</span><a href="https://github.com/lallemand-fred" target="_blank">@lallemand-fred</a></div>
          <div className="contact__line"><span className="lbl">Basé à</span><span>Liège · Belgique</span></div>
          <div className="contact__line"><span className="lbl">Dispo.</span><span>Q2 2026 · remote ou BE/FR</span></div>
        </div>
      </div>
      <form className="contact__form" onSubmit={(e) => { e.preventDefault(); alert("Merci — message envoyé (démo)"); }}>
        <h3>Un mot rapide</h3>
        <p>Je réponds sous 48h</p>
        <div className="field">
          <label>Votre nom</label>
          <input type="text" required />
        </div>
        <div className="field">
          <label>E-mail</label>
          <input type="email" required />
        </div>
        <div className="field">
          <label>Message</label>
          <textarea required />
        </div>
        <button type="submit" className="contact__submit">Envoyer →</button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">Lallemand<br />Frédéric <em>.</em></div>
        <div className="footer__meta">
          <p>Travail</p>
          <a href="#work">Photo</a>
          <a href="#video">Vidéo</a>
          <a href="#lab">Web lab</a>
        </div>
        <div className="footer__meta">
          <p>Ailleurs</p>
          <a href="#">GitHub</a>
          <a href="#">YouTube</a>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>
      </div>
      <div className="footer__huge">Frédéric</div>
      <div className="footer__bottom">
        <span>© 2026 Frédéric Lallemand</span>
        <span>Tout fait main · HTML / CSS / React</span>
      </div>
    </footer>
  );
}

/* ============ TWEAKS PANEL ============ */
function TweaksPanel({ open, onClose, palette, setPalette, hero, setHero, density, setDensity }) {
  return (
    <div className={`tweaks ${open ? "open" : ""}`}>
      <h4>Tweaks <button className="close" onClick={onClose}>×</button></h4>
      <div className="tweak-row">
        <span className="lbl">Palette</span>
        <div className="tweak-opts">
          {["earth", "dusk", "ink"].map(p => (
            <button key={p} className={palette === p ? "active" : ""} onClick={() => setPalette(p)}>{p}</button>
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <span className="lbl">Hero</span>
        <div className="tweak-opts">
          {["name", "quote"].map(h => (
            <button key={h} className={hero === h ? "active" : ""} onClick={() => setHero(h)}>{h}</button>
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <span className="lbl">Densité</span>
        <div className="tweak-opts">
          {["aérée", "dense"].map(d => (
            <button key={d} className={density === d ? "active" : ""} onClick={() => setDensity(d)}>{d}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ APP ============ */
function App() {
  const defaults = /*EDITMODE-BEGIN*/{
    "palette": "earth",
    "hero": "name",
    "density": "aérée"
  }/*EDITMODE-END*/;

  const [palette, setPalette] = useState(defaults.palette);
  const [hero, setHero] = useState(defaults.hero);
  const [density, setDensity] = useState(defaults.density);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaksAvail, setTweaksAvail] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });

  // Tweaks protocol — listener first, then availability
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode")   setTweaksOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    setTweaksAvail(true);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Apply palette swap via CSS variables
  useEffect(() => {
    const palettes = {
      earth: { ivory: "#fffae1", sand: "#b8b08d", coffee: "#221c17", clay: "#c19366", ember: "#c96442" },
      dusk:  { ivory: "#f4e9dc", sand: "#a88c6b", coffee: "#1a1812", clay: "#d68e5a", ember: "#e26a3a" },
      ink:   { ivory: "#efece2", sand: "#8f8970", coffee: "#15130f", clay: "#8a7a5e", ember: "#b15a3a" },
    };
    const p = palettes[palette] || palettes.earth;
    const r = document.documentElement;
    r.style.setProperty("--ivory",   p.ivory);
    r.style.setProperty("--sand",    p.sand);
    r.style.setProperty("--coffee",  p.coffee);
    r.style.setProperty("--clay",    p.clay);
    r.style.setProperty("--ember",   p.ember);
  }, [palette]);

  // Persist tweaks
  useEffect(() => {
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { palette, hero, density } }, "*");
  }, [palette, hero, density]);

  // IntersectionObserver for reveal
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    const q = () => document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
    q();
    const t = setTimeout(q, 50);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  // Dark-nav detection — switch when hero/weblab/footer in view
  useEffect(() => {
    const darkSelectors = ["#imageParallax", ".weblab", ".footer", ".ticker"];
    const onScroll = () => {
      const navH = 80;
      let isDark = false;
      for (const s of darkSelectors) {
        const el = document.querySelector(s);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < navH && r.bottom > navH) { isDark = true; break; }
      }
      setOnDark(isDark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Spotlight follow
  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <Nav onDark={onDark} onOpenTweaks={() => setTweaksOpen(v => !v)} />
      <Hero />
      <Ticker />
      <About />
      <Work />
      <Videos />
      <WebLab />
      <Contact />
      <Footer />
      <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)}
                   palette={palette} setPalette={setPalette}
                   hero={hero} setHero={setHero}
                   density={density} setDensity={setDensity} />
      <div className={`spotlight ${onDark ? "on" : ""}`} style={{ left: mouse.x, top: mouse.y }} />
    </>
  );
}

// Hero variant: big quote over parallax
function HeroQuote() {
  const heroRef = useRef(null);
  const layersRef = useRef([]);
  const quoteRef = useRef(null);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const y = window.scrollY;
        const speeds = [0.15, 0.25, 0.4, 0.55, 0.7];
        layersRef.current.forEach((el, i) => {
          if (!el) return;
          el.style.transform = `translateX(-50%) translateY(${-y * speeds[i]}px)`;
        });
        if (quoteRef.current) {
          quoteRef.current.style.transform = `translateY(${-y * 0.3}px)`;
          quoteRef.current.style.opacity = Math.max(0, 1 - y / 700);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  const setLayer = (i) => (el) => { layersRef.current[i] = el; };

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero__layer hero__layer--sky"   ref={setLayer(0)}><img src="assets/parallax/parallax05.png" alt="" /></div>
      <div className="hero__layer hero__layer--back"  ref={setLayer(1)}><img src="assets/parallax/parallax04.png" alt="" /></div>
      <div className="hero__layer hero__layer--mid"   ref={setLayer(2)}><img src="assets/parallax/parallax03.png" alt="" /></div>
      <div className="hero__layer here__layer--front" ref={setLayer(3)}><img src="assets/parallax/parallax02.png" alt="" /></div>
      <div className="hero__layer hero__layer--grass" ref={setLayer(4)}><img src="assets/parallax/parallax01.png" alt="" /></div>
      <div ref={quoteRef} style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100 }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sand)", margin: "0 0 24px" }}>Frédéric Lallemand · Portfolio 2026</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--ivory)", fontSize: "clamp(48px, 8vw, 120px)", lineHeight: 1.02, letterSpacing: "-0.03em", margin: 0 }}>
            Trente ans d'<em style={{ color: "var(--clay)" }}>image</em> — et maintenant, du <em style={{ color: "var(--clay)" }}>code.</em>
          </h1>
        </div>
      </div>
      <div className="hero__meta"><span><b>LIÈGE, BE</b></span><span>FR · EN</span></div>
      <div className="hero__scroll"><span>Scroll</span></div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
