/* Lallemand Frédéric — Portfolio Cinéma × Parallax
   Conversion statique (vanilla JS) depuis siteClaude/cinema.jsx (2026-07-02) */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Thème clair/sombre ---------- */
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", next);
    });
  }

  /* ---------- Topbar : bordure au scroll ---------- */
  const topbar = document.querySelector("header.top");
  if (topbar) {
    const onTopbarScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 40);
    onTopbarScroll();
    window.addEventListener("scroll", onTopbarScroll, { passive: true });
  }

  /* ---------- Parallax hero (origine — inchangé) ---------- */
  const background  = document.getElementById("background");
  const middelEnd    = document.getElementById("middelEnd");
  const middelStart  = document.getElementById("middelStart");
  const frontEnd     = document.getElementById("frontEnd");
  const frontStart   = document.getElementById("frontStart");
  window.addEventListener("scroll", () => {
    const value = window.scrollY;
    if (background)  background.style.top  = value * 0.40 + "px";
    if (middelEnd)   middelEnd.style.top   = value * 0.35 + "px";
    if (middelStart) middelStart.style.top = value * 0.30 + "px";
    if (frontEnd)    frontEnd.style.top    = value * 0.17 + "px";
    if (frontStart)  frontStart.style.top  = value * 0.08 + "px";
  });

  /* ---------- Timecode (chrono depuis l'arrivée sur la page) ---------- */
  const tcEl = document.querySelector(".timecode .code");
  if (tcEl) {
    const start = Date.now();
    const pad = n => String(n).padStart(2, "0");
    const tick = () => {
      const e = Date.now() - start;
      const h = Math.floor(e / 3600000);
      const m = Math.floor((e % 3600000) / 60000);
      const s = Math.floor((e % 60000) / 1000);
      const f = Math.floor((e % 1000) / 42);
      tcEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- Filtres + flèches + drag + boucle infinie (galerie photo & films) ---------- */
  function setupReel(sectionId, filterAttr) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const buttons = section.querySelectorAll(".gal-filters button");
    const items = section.querySelectorAll(`.reel [${filterAttr}]`);
    const reel = section.querySelector(".reel");

    /* les cartes n'ont pas toutes la même largeur (photo/pano/planète) — on centre
       la carte visée dans le cadre au lieu de la coller à gauche, et on se base sur
       la carte actuellement la plus proche du centre pour savoir "suivant"/"précédent" */
    const visibleCards = () => Array.from(reel.children).filter(el => !el.classList.contains("reel-pad") && !el.classList.contains("is-hidden") && !el.classList.contains("reel-clone"));
    const centerLeftFor = (card) => card.offsetLeft - (reel.clientWidth - card.offsetWidth) / 2;
    const centerOn = (card) => reel.scrollTo({ left: centerLeftFor(card), behavior: "smooth" });
    const closestToCenter = (cards) => {
      const mid = reel.scrollLeft + reel.clientWidth / 2;
      return cards.reduce((best, c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        return d < best.d ? { i, d } : best;
      }, { i: 0, d: Infinity }).i;
    };

    /* boucle infinie façon main.js (technique du clonage) : un clone de la dernière carte est
       posé avant la première, un clone de la première posé après la dernière. Le scroll/smooth-scroll
       peut donc glisser naturellement sur le clone (identique visuellement à l'original), puis une fois
       posé dessus, on recentre en catimini (sans animation) sur la vraie carte équivalente — invisible
       pour l'oeil, comme le `resetInfinite()` du carousel de l'ancien site. */
    const pads = reel.querySelectorAll(".reel-pad");
    const padStart = pads[0], padEnd = pads[pads.length - 1];
    let cloneStart = null, cloneEnd = null;
    /* la marge CSS fixe des .reel-pad aligne la 1ère carte avec la page, mais ne laisse pas
       forcément assez de place pour CENTRER la dernière carte sur un écran large avec des cartes
       étroites (ex. vidéos 400px) — sur un écran suffisamment large, le scroll natif se bloquait
       avant d'atteindre la position visée, et la flèche "suivant" restait bloquée sur la fin.
       On agrandit les marges au strict nécessaire pour que n'importe quelle carte visible reste
       centrable, quel que soit l'écran. */
    const sizePads = () => {
      const cards = visibleCards();
      if (!cards.length) return;
      const narrowest = Math.min(...cards.map(c => c.offsetWidth));
      const need = Math.max(0, (reel.clientWidth - narrowest) / 2) + "px";
      padStart.style.flexBasis = need;
      padEnd.style.flexBasis = need;
    };
    window.addEventListener("resize", sizePads, { passive: true });
    /* insérer cloneStart avant la 1ère carte décale son offsetLeft — on recale le scroll
       directement sur la 1ère carte (flush à gauche) une fois tout en place, plutôt que de
       compenser juste le décalage du clone : depuis l'agrandissement dynamique de .reel-pad
       (sizePads, Étape 5.13), une compensation relative ne rattrapait plus que la largeur du
       clone et laissait toute la marge agrandie + le clone visibles à gauche de la vraie 1ère
       carte (clone sans gestionnaire de clic → carte visiblement "en tête" mais inclicable) */
    const rebuildClones = () => {
      if (cloneStart) cloneStart.remove();
      if (cloneEnd) cloneEnd.remove();
      cloneStart = cloneEnd = null;
      const cards = visibleCards();
      if (!cards.length) return;
      sizePads();
      if (cards.length >= 2) {
        cloneStart = cards[cards.length - 1].cloneNode(true);
        cloneStart.classList.add("reel-clone", "in");
        cloneStart.setAttribute("aria-hidden", "true");
        padStart.after(cloneStart);
        cloneEnd = cards[0].cloneNode(true);
        cloneEnd.classList.add("reel-clone", "in");
        cloneEnd.setAttribute("aria-hidden", "true");
        padEnd.before(cloneEnd);
      }
      reel.scrollLeft = cards[0].offsetLeft;
    };
    rebuildClones();

    /* recentre en catimini si on se retrouve posé sur un clone (fin de smooth-scroll ou fin de glissé) */
    const snapIfOnClone = () => {
      const cards = visibleCards();
      if (!cards.length) return;
      const mid = reel.scrollLeft + reel.clientWidth / 2;
      const nearClone = (clone) => clone && Math.abs(clone.offsetLeft + clone.offsetWidth / 2 - mid) < clone.offsetWidth / 2;
      if (nearClone(cloneStart)) reel.scrollTo({ left: centerLeftFor(cards[cards.length - 1]), behavior: "auto" });
      else if (nearClone(cloneEnd)) reel.scrollTo({ left: centerLeftFor(cards[0]), behavior: "auto" });
    };
    /* attend la vraie fin du smooth-scroll (évènement "scrollend", équivalent du transitionend de
       main.js) avant de recentrer — un simple délai d'inactivité sur "scroll" se déclenchait parfois
       en plein milieu de l'animation (micro-pauses du navigateur sur les longues distances), ce qui
       coupait la transition en plein vol. Le setTimeout est un filet de sécurité si "scrollend"
       n'est pas supporté par le navigateur. */
    const armSnapOnScrollEnd = () => {
      let done = false;
      const finish = () => { if (done) return; done = true; reel.removeEventListener("scrollend", finish); snapIfOnClone(); };
      reel.addEventListener("scrollend", finish, { once: true });
      setTimeout(finish, 700);
    };

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        items.forEach(item => {
          const match = filter === "Tout" || item.getAttribute(filterAttr) === filter;
          item.classList.toggle("is-hidden", !match);
        });
        rebuildClones();
      });
    });

    const arrows = section.querySelectorAll(".reel-arrows button");
    if (arrows[0]) arrows[0].addEventListener("click", () => {
      const cards = visibleCards();
      if (!cards.length) return;
      const idx = closestToCenter(cards);
      if (idx === 0 && cloneStart) { centerOn(cloneStart); armSnapOnScrollEnd(); }
      else centerOn(cards[idx === 0 ? cards.length - 1 : idx - 1]);
    });
    if (arrows[1]) arrows[1].addEventListener("click", () => {
      const cards = visibleCards();
      if (!cards.length) return;
      const idx = closestToCenter(cards);
      if (idx === cards.length - 1 && cloneEnd) { centerOn(cloneEnd); armSnapOnScrollEnd(); }
      else centerOn(cards[idx === cards.length - 1 ? 0 : idx + 1]);
    });

    /* défilement à la souris, comme au doigt */
    let dragging = false, dragMoved = false, startX = 0, startScroll = 0;
    reel.addEventListener("mousedown", (e) => {
      dragging = true; dragMoved = false;
      startX = e.pageX; startScroll = reel.scrollLeft;
      reel.classList.add("dragging");
    });
    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 4) dragMoved = true;
      reel.scrollLeft = startScroll - dx;
    });
    window.addEventListener("mouseup", () => {
      if (!dragging) return;
      dragging = false; reel.classList.remove("dragging");
      snapIfOnClone();
    });
    reel.addEventListener("click", (e) => { if (dragMoved) { e.preventDefault(); e.stopPropagation(); dragMoved = false; } }, true);
  }

  setupReel("gallery", "data-type");
  setupReel("films", "data-cat");

  /* ---------- Lightbox (galerie photo uniquement) ---------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector(".lb-img");
    const lbType = lightbox.querySelector(".lb-type");
    const lbTag = lightbox.querySelector(".lb-tag");
    const lbMeta = lightbox.querySelector(".lb-meta");
    const closeBtn = lightbox.querySelector(".lb-close");
    const prevBtn = lightbox.querySelector(".lb-prev");
    const nextBtn = lightbox.querySelector(".lb-next");

    let items = [];
    let current = 0;

    const collect = () => {
      items = Array.from(document.querySelectorAll("#gallery .plate")).filter(p => !p.classList.contains("is-hidden") && !p.classList.contains("reel-clone"));
    };

    const show = (idx) => {
      if (!items.length) return;
      current = (idx + items.length) % items.length;
      const plate = items[current];
      const img = plate.querySelector("img");
      const meta = plate.querySelector(".plate-meta");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbType.textContent = plate.querySelector(".plate-type").textContent;
      lbTag.textContent = plate.querySelector(".plate-tag").textContent;
      lbMeta.innerHTML = meta ? meta.innerHTML : "";
    };

    const open = (plate) => {
      collect();
      const idx = items.indexOf(plate);
      show(idx >= 0 ? idx : 0);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lb-lock");
    };
    const close = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lb-lock");
    };

    document.querySelectorAll("#gallery .plate:not(.reel-clone)").forEach(plate => {
      plate.addEventListener("click", (e) => { e.preventDefault(); open(plate); });
    });

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
    prevBtn.addEventListener("click", () => show(current - 1));
    nextBtn.addEventListener("click", () => show(current + 1));
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });

    /* glisser pour passer à l'image suivante/précédente */
    let lbStartX = null;
    const lbStage = lightbox.querySelector(".lb-stage");
    lbStage.addEventListener("pointerdown", (e) => { lbStartX = e.clientX; });
    window.addEventListener("pointerup", (e) => {
      if (lbStartX === null) return;
      const dx = e.clientX - lbStartX;
      if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
      lbStartX = null;
    });
  }

  /* ---------- Fenêtre projet (Web lab) : hover desktop + clic mobile pour changer d'aperçu ---------- */
  const labItems = document.querySelectorAll(".lab-mini .lab-item");
  const labWrap = document.querySelector(".lab-mini");
  if (labItems.length && labWrap) {
    const stampEl = document.getElementById("projectStamp");
    const roleEl = document.getElementById("projectRole");
    const titleEl = document.getElementById("projectTitle");
    const descEl = document.getElementById("projectDesc");
    const linksEl = document.getElementById("projectLinks");
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* une carte peut proposer plusieurs démos (data-links, JSON) au lieu d'une seule (data-link) —
       ex. Navbars 3D & burger regroupe 3 anciennes pages, Animations de cartes en regroupe 3 aussi */
    const render = (item) => {
      const { role, title, desc, stamp, link, links } = item.dataset;
      stampEl.innerHTML = stamp;
      roleEl.textContent = role;
      titleEl.textContent = title;
      descEl.textContent = desc;
      linksEl.innerHTML = "";
      const list = links ? JSON.parse(links) : (link ? [{ label: "Voir la démo →", url: link }] : []);
      if (!list.length) {
        const a = document.createElement("a");
        a.className = "project-link is-disabled";
        a.textContent = "Bientôt disponible";
        linksEl.appendChild(a);
        return;
      }
      list.forEach(({ label, url }) => {
        const a = document.createElement("a");
        a.className = "project-link";
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = label;
        linksEl.appendChild(a);
      });
    };

    /* "pinned" = carte cliquée, celle qui reste affichée quand la souris repart */
    let pinned = document.querySelector(".lab-mini .lab-item.active") || labItems[0];
    render(pinned);

    labItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        labItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        pinned = item;
        render(item);
      });
      if (hoverCapable) item.addEventListener("mouseenter", () => render(item));
    });
    if (hoverCapable) labWrap.addEventListener("mouseleave", () => render(pinned));
  }

  /* ---------- Curseur halo (désactivé sur tactile) ---------- */
  const glow = document.querySelector(".cursor-glow");
  if (glow && !window.matchMedia("(pointer: coarse)").matches) {
    const SEL = "a, button, .plate, .vid, .film-row, .lab-mini a, .project-card, .theme-toggle, .credit-line";
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      glow.classList.toggle("active", !!e.target.closest(SEL));
    }, { passive: true });
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      glow.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

});
