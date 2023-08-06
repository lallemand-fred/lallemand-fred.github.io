const card = document.querySelectorAll(".card");
card.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    let elRect = el.getBoundingClientRect();

    let x = e.clientX - elRect.x;
    let y = e.clientY - elRect.y;

    let midCardWidth = elRect.width / 2;
    let midCardHeight = elRect.height / 2;

    let angleY = -(x - midCardWidth) / 8;
    let angleX = (y - midCardHeight) / 8;

    let glowX = (x / elRect.width) * 100;
    let glowY = (y / elRect.height) * 100;

    el.children[0].style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
    el.children[1].style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
    el.children[1].style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(184,196,211,0.5), transparent)`;
  });
  el.addEventListener("mouseleave", () => {
    el.children[0].style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    el.children[1].style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  });
});

let choco = "noir";
