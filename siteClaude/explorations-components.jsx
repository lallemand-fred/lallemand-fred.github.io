/* Exploration components — 3 hero variants + 3 gallery variants.
   Each is a standalone static preview (no global state). */

const { useState, useEffect, useRef } = React;

/* ---------- Shared tokens ---------- */
const tok = {
  ivory: "#fffae1", ivory2: "#f5efd8",
  sand: "#b8b08d", coffee: "#221c17",
  clay: "#c19366", ember: "#c96442",
  serif: '"Instrument Serif", serif',
  body: '"Geist", Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", monospace',
};

/* ========== HERO VARIANT A — Name across layers ========== */
function HeroA() {
  return (
    <div style={{ width: "100%", height: "100%", background: tok.coffee, color: tok.ivory, position: "relative", overflow: "hidden", fontFamily: tok.body }}>
      {/* parallax stack */}
      <img src="assets/parallax/parallax05.png" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0, width: "120%", height: "100%", objectFit: "cover", zIndex: 1 }} />
      <img src="assets/parallax/parallax04.png" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 0, width: "120%", zIndex: 2 }} />
      <h1 style={{ position: "absolute", top: "18%", left: 0, right: 0, textAlign: "center", margin: 0, fontFamily: tok.serif, fontSize: 140, letterSpacing: "-0.04em", lineHeight: 0.9, color: tok.ivory, zIndex: 3, textShadow: "0 2px 30px rgba(0,0,0,0.35)" }}>LALLEMAND</h1>
      <img src="assets/parallax/parallax03.png" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 0, width: "120%", zIndex: 4 }} />
      <h1 style={{ position: "absolute", top: "40%", left: 0, right: 0, textAlign: "center", margin: 0, fontFamily: tok.serif, fontStyle: "italic", fontSize: 120, letterSpacing: "-0.04em", color: tok.ivory, mixBlendMode: "screen", zIndex: 5 }}>Frédéric</h1>
      <img src="assets/parallax/parallax02.png" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 0, width: "120%", zIndex: 6 }} />
      <img src="assets/parallax/parallax01.png" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 0, width: "120%", zIndex: 8 }} />
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 30px", display: "flex", justifyContent: "space-between", zIndex: 10, fontFamily: tok.mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        <span style={{ fontFamily: tok.serif, fontStyle: "italic", fontSize: 16, textTransform: "none", letterSpacing: "-0.01em" }}>Lallemand F.</span>
        <span style={{ display: "flex", gap: 20, opacity: 0.8 }}>
          <span>À propos</span><span>Photo</span><span>Vidéo</span><span>Contact</span>
        </span>
      </nav>
      <div style={{ position: "absolute", left: 30, bottom: 30, zIndex: 10, fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8 }}>
        <div style={{ color: tok.sand }}>LIÈGE · BE</div>
        <div>Portfolio · 2026</div>
      </div>
      <div style={{ position: "absolute", right: 30, bottom: 30, zIndex: 10, textAlign: "right", fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8 }}>
        <div style={{ fontFamily: tok.serif, fontStyle: "italic", fontSize: 22, letterSpacing: "-0.01em", textTransform: "none", opacity: 1 }}>UI/UX Engineer</div>
        <div>Disponible Q2 2026</div>
      </div>
    </div>
  );
}

/* ========== HERO VARIANT B — Split with parallax portrait ========== */
function HeroB() {
  return (
    <div style={{ width: "100%", height: "100%", background: tok.ivory, display: "flex", fontFamily: tok.body, position: "relative" }}>
      <div style={{ flex: "0 0 45%", padding: "80px 50px 50px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: `1px solid ${tok.coffee}22` }}>
        <div>
          <div style={{ fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: tok.coffee, opacity: 0.6, marginBottom: 40 }}>01 / Portfolio 2026</div>
          <h1 style={{ fontFamily: tok.serif, fontSize: 80, fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.03em", margin: "0 0 30px", color: tok.coffee }}>
            Frédéric<br/><em style={{ color: tok.clay }}>Lallemand.</em>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.5, color: tok.coffee, opacity: 0.7, maxWidth: "38ch", margin: 0 }}>
            Photographe, réalisateur, et — depuis peu — UI/UX engineer. Trente ans à composer des images ; aujourd'hui, des interfaces.
          </p>
        </div>
        <div style={{ display: "flex", gap: 32, fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: tok.coffee, opacity: 0.7 }}>
          <div><div style={{ fontFamily: tok.serif, fontSize: 28, letterSpacing: "-0.01em", color: tok.coffee, opacity: 1, marginBottom: 2, textTransform: "none" }}>30<span style={{ color: tok.clay }}>+</span></div>ans image</div>
          <div><div style={{ fontFamily: tok.serif, fontSize: 28, letterSpacing: "-0.01em", color: tok.coffee, opacity: 1, marginBottom: 2, textTransform: "none" }}>50<span style={{ color: tok.clay }}>+</span></div>films</div>
          <div><div style={{ fontFamily: tok.serif, fontSize: 28, letterSpacing: "-0.01em", color: tok.coffee, opacity: 1, marginBottom: 2, textTransform: "none" }}>11</div>web lab</div>
        </div>
      </div>
      <div style={{ flex: 1, background: tok.coffee, position: "relative", overflow: "hidden" }}>
        <img src="assets/parallax/parallax05.png" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} />
        <img src="assets/parallax/parallax04.png" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", zIndex: 2 }} />
        <img src="assets/parallax/parallax03.png" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", zIndex: 3 }} />
        <img src="assets/parallax/parallax01.png" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", zIndex: 5 }} />
        <div style={{ position: "absolute", right: 30, top: 30, zIndex: 10, fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: tok.ivory, opacity: 0.85 }}>
          LIÈGE 50°38′N · 5°34′E
        </div>
      </div>
    </div>
  );
}

/* ========== HERO VARIANT C — Magazine cover ========== */
function HeroC() {
  return (
    <div style={{ width: "100%", height: "100%", background: tok.coffee, position: "relative", overflow: "hidden", fontFamily: tok.body, color: tok.ivory }}>
      <img src="assets/parallax/parallax05.png" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1, opacity: 0.95 }} />
      <img src="assets/parallax/parallax03.png" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", zIndex: 2 }} />
      <img src="assets/parallax/parallax01.png" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", zIndex: 4 }} />
      {/* Masthead */}
      <div style={{ position: "absolute", top: 20, left: 30, right: 30, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: `1px solid ${tok.ivory}33` }}>
        <div style={{ fontFamily: tok.serif, fontStyle: "italic", fontSize: 28, letterSpacing: "-0.01em" }}>L—F</div>
        <div style={{ fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.8 }}>VOL. 07 · 2026 · €0</div>
        <div style={{ fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.8 }}>ISSUE — PORTFOLIO</div>
      </div>
      {/* Corner tags */}
      <div style={{ position: "absolute", top: 80, left: 30, zIndex: 10, fontFamily: tok.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: tok.sand }}>
        Photo / Video / Code<br/>Dossier spécial — Liège
      </div>
      <div style={{ position: "absolute", top: 80, right: 30, zIndex: 10, textAlign: "right", fontFamily: tok.mono, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: tok.sand }}>
        64 pages · FR<br/>édition numérique
      </div>
      {/* Main title stacked */}
      <div style={{ position: "absolute", left: 30, right: 30, bottom: 50, zIndex: 5 }}>
        <h1 style={{ fontFamily: tok.serif, fontSize: 96, fontWeight: 400, letterSpacing: "-0.035em", lineHeight: 0.9, margin: 0, color: tok.ivory }}>
          Lallemand<br/>
          <em style={{ color: tok.clay }}>Frédéric</em>
        </h1>
        <div style={{ fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, marginTop: 16, display: "flex", justifyContent: "space-between" }}>
          <span>"De l'argentique au React — une seule idée : composer."</span>
          <span>P.01 ↗</span>
        </div>
      </div>
    </div>
  );
}

/* ========== GALLERY VARIANT A — Editorial varied ========== */
function GalleryA() {
  return (
    <div style={{ width: "100%", height: "100%", background: tok.ivory2, padding: 28, fontFamily: tok.body, overflow: "hidden" }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: tok.coffee, opacity: 0.6, marginBottom: 6 }}>02 — Photo</div>
        <h2 style={{ fontFamily: tok.serif, fontSize: 46, fontWeight: 400, letterSpacing: "-0.02em", margin: 0, color: tok.coffee }}>Liège en trois <em style={{ color: tok.clay }}>regards.</em></h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gridTemplateRows: "260px 180px", gap: 10 }}>
        <div style={{ gridRow: "span 2", position: "relative", overflow: "hidden", background: tok.coffee }}>
          <img src="assets/photos/tour_kennedy.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", left: 14, bottom: 12, color: tok.ivory, textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
            <div style={{ fontFamily: tok.serif, fontSize: 26 }}>Photos</div>
            <div style={{ fontFamily: tok.mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.8 }}>Architecture · Liège</div>
          </div>
        </div>
        <div style={{ gridColumn: "span 2", position: "relative", overflow: "hidden", background: tok.coffee }}>
          <img src="assets/pano/pano_parc_boverie.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", left: 14, bottom: 12, color: tok.ivory, textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
            <div style={{ fontFamily: tok.serif, fontSize: 26 }}>Panoramiques</div>
            <div style={{ fontFamily: tok.mono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.8 }}>360° · Urbain</div>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden", background: tok.coffee }}>
          <img src="assets/planetes/planete-1.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ position: "relative", overflow: "hidden", background: tok.coffee }}>
          <img src="assets/planetes/planete-2.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", left: 14, bottom: 12, color: tok.ivory, textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
            <div style={{ fontFamily: tok.serif, fontSize: 22 }}>Mini-planètes</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== GALLERY VARIANT B — Cinema strip ========== */
function GalleryB() {
  const imgs = [
    "assets/photos/tour_kennedy.jpg",
    "assets/photos/photo-1.jpg",
    "assets/photos/photo-3.jpg",
    "assets/photos/photo-5.jpg",
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: tok.coffee, color: tok.ivory, fontFamily: tok.body, padding: "28px 0", overflow: "hidden" }}>
      <div style={{ padding: "0 28px", marginBottom: 18 }}>
        <div style={{ fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: tok.sand, marginBottom: 6 }}>Photo · Vue cinématique</div>
        <h2 style={{ fontFamily: tok.serif, fontSize: 42, fontWeight: 400, letterSpacing: "-0.02em", margin: 0 }}>01 / 24 <em style={{ color: tok.clay }}>— Tour Kennedy</em></h2>
      </div>
      <div style={{ position: "relative", aspectRatio: "21/9", margin: "0 28px", background: "#000", overflow: "hidden" }}>
        <img src={imgs[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", left: 20, bottom: 20, fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85 }}>
          Liège · 50°38′N / 5°34′E · ƒ8 · 1/250 · ISO 100
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "16px 28px 0", overflow: "hidden" }}>
        {imgs.map((u, i) => (
          <div key={i} style={{ flex: 1, aspectRatio: "4/3", background: "#000", position: "relative", opacity: i === 0 ? 1 : 0.5, border: i === 0 ? `1px solid ${tok.clay}` : "1px solid transparent" }}>
            <img src={u} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
        <div style={{ flex: 1, aspectRatio: "4/3", background: "transparent", border: `1px dashed ${tok.sand}66`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: tok.mono, fontSize: 10, color: tok.sand, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          +20
        </div>
      </div>
    </div>
  );
}

/* ========== GALLERY VARIANT C — Mini-planets constellation ========== */
function GalleryC() {
  const planets = [
    { src: "assets/planetes/planete-1.jpg", size: 150, top: 60, left: 40 },
    { src: "assets/planetes/planete-3.jpg", size: 100, top: 180, left: 220 },
    { src: "assets/planetes/planete-5.jpg", size: 130, top: 70, left: 360 },
    { src: "assets/planetes/planete-7.jpg", size: 85,  top: 280, left: 100 },
    { src: "assets/planetes/planete-2.jpg", size: 95,  top: 260, left: 340 },
    { src: "assets/planetes/planete-4.jpg", size: 70,  top: 380, left: 230 },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: `radial-gradient(circle at 30% 40%, ${tok.coffee} 0%, #0b0906 100%)`, color: tok.ivory, fontFamily: tok.body, position: "relative", overflow: "hidden" }}>
      {/* Stars */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)", backgroundSize: "40px 40px", opacity: 0.15 }} />
      <div style={{ position: "absolute", top: 24, left: 24, right: 24, display: "flex", justifyContent: "space-between", zIndex: 10 }}>
        <div>
          <div style={{ fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: tok.sand, marginBottom: 4 }}>03 — Constellation</div>
          <h2 style={{ fontFamily: tok.serif, fontSize: 38, fontWeight: 400, letterSpacing: "-0.02em", margin: 0 }}>Mini-<em style={{ color: tok.clay }}>planètes</em></h2>
        </div>
        <div style={{ fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: tok.sand, textAlign: "right", opacity: 0.8 }}>
          13 corps · stéréographique<br/>survolez pour zoomer
        </div>
      </div>
      {planets.map((p, i) => (
        <div key={i} style={{ position: "absolute", top: p.top, left: p.left, width: p.size, height: p.size, borderRadius: "50%", overflow: "hidden", boxShadow: `0 0 40px ${tok.clay}22, 0 2px 12px rgba(0,0,0,0.4)`, border: `1px solid ${tok.ivory}22`, cursor: "pointer", transition: "transform .3s" }}>
          <img src={p.src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}
      {/* connector lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
        <line x1="115" y1="135" x2="270" y2="230" stroke={tok.sand} strokeOpacity="0.2" strokeDasharray="2 3" />
        <line x1="270" y1="230" x2="425" y2="135" stroke={tok.sand} strokeOpacity="0.2" strokeDasharray="2 3" />
        <line x1="270" y1="230" x2="265" y2="415" stroke={tok.sand} strokeOpacity="0.2" strokeDasharray="2 3" />
      </svg>
    </div>
  );
}

/* ========== LAB VARIANT — code-editor style ========== */
function LabCard() {
  return (
    <div style={{ width: "100%", height: "100%", background: tok.coffee, color: tok.ivory, fontFamily: tok.body, padding: 28, overflow: "hidden" }}>
      <div style={{ fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: tok.sand, marginBottom: 6 }}>04 — Web lab</div>
      <h2 style={{ fontFamily: tok.serif, fontSize: 38, fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 22px" }}>Expérimentations <em style={{ color: tok.clay }}>front-end.</em></h2>
      <div style={{ background: "#15120e", border: `1px solid ${tok.sand}22`, borderRadius: 6, overflow: "hidden", fontFamily: tok.mono, fontSize: 11 }}>
        <div style={{ display: "flex", gap: 6, padding: "8px 12px", borderBottom: `1px solid ${tok.sand}22`, alignItems: "center" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ed6a5e" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f4bf4f" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#62c454" }} />
          <span style={{ marginLeft: 10, opacity: 0.6, fontSize: 10 }}>lab/L01 · page-parallax.jsx</span>
        </div>
        <div style={{ padding: 16, lineHeight: 1.8, color: "#b9b4a0" }}>
          <div><span style={{ color: "#c96442" }}>const</span> <span style={{ color: tok.ivory }}>layers</span> = [<span style={{ color: "#c19366" }}>sky</span>, <span style={{ color: "#c19366" }}>hills</span>, <span style={{ color: "#c19366" }}>grass</span>]</div>
          <div><span style={{ color: "#c96442" }}>const</span> <span style={{ color: tok.ivory }}>speed</span> = [<span style={{ color: "#c19366" }}>0.15</span>, <span style={{ color: "#c19366" }}>0.4</span>, <span style={{ color: "#c19366" }}>0.7</span>]</div>
          <div style={{ opacity: 0.4 }}>// scroll → translateY par couche</div>
          <div>layers.<span style={{ color: tok.clay }}>map</span>((l, i) ⇒ l.style.transform = ...)</div>
        </div>
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Parallax","Dashboard","Navbar 3D","Flip card","Login liquide","Pluie de mots"].map(t => (
          <span key={t} style={{ padding: "6px 10px", border: `1px solid ${tok.sand}44`, borderRadius: 999, fontFamily: tok.mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: tok.sand }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ========== Full-page micro previews ========== */
function FullPreview() {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", fontFamily: tok.body, background: tok.ivory, color: tok.coffee }}>
      {/* Mini hero */}
      <div style={{ height: 160, position: "relative", background: tok.coffee, overflow: "hidden" }}>
        <img src="assets/parallax/parallax05.png" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <img src="assets/parallax/parallax01.png" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%" }} />
        <h1 style={{ position: "absolute", top: "30%", left: 0, right: 0, textAlign: "center", margin: 0, fontFamily: tok.serif, fontSize: 46, color: tok.ivory, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>Lallemand <em style={{ color: tok.clay, fontStyle: "italic" }}>Frédéric</em></h1>
      </div>
      <div style={{ background: tok.coffee, color: tok.ivory, padding: "10px 20px", fontFamily: tok.serif, fontStyle: "italic", fontSize: 14, whiteSpace: "nowrap", overflow: "hidden" }}>
        Photographie ✦ Réalisation ✦ Montage ✦ UI Design ✦ Front-end
      </div>
      <div style={{ padding: "24px 20px" }}>
        <div style={{ fontFamily: tok.mono, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.6, marginBottom: 4 }}>02 — Photo</div>
        <h3 style={{ fontFamily: tok.serif, fontSize: 28, margin: "0 0 14px", letterSpacing: "-0.02em" }}>Liège en trois <em style={{ color: tok.clay }}>regards.</em></h3>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 6, height: 130 }}>
          <div style={{ background: "#000", overflow: "hidden" }}><img src="assets/photos/tour_kennedy.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
          <div style={{ background: "#000", overflow: "hidden" }}><img src="assets/pano/pano_parc_boverie.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
          <div style={{ background: "#000", overflow: "hidden", borderRadius: "50%" }}><img src="assets/planetes/planete-3.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
        </div>
      </div>
      <div style={{ background: tok.coffee, color: tok.ivory, padding: 20 }}>
        <div style={{ fontFamily: tok.mono, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: tok.sand, marginBottom: 4 }}>04 — Web lab</div>
        <h3 style={{ fontFamily: tok.serif, fontSize: 24, margin: "0 0 10px", letterSpacing: "-0.02em" }}>Front-end <em style={{ color: tok.clay }}>brut.</em></h3>
        <div style={{ fontFamily: tok.mono, fontSize: 10, opacity: 0.7 }}>L01 → L06 · HTML · CSS · JS</div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroA, HeroB, HeroC, GalleryA, GalleryB, GalleryC, LabCard, FullPreview });
