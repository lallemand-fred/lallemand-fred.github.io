// ----------------------------------Menu burger----------------------------

const navbar = document.querySelector(".navbar");
const burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
  navbar.classList.toggle("show-nav");
});

const links = document.querySelectorAll("nav li");

links.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show-nav");
  });
});

// function toggleMenu() {
//   const navbar = document.querySelector(".navbar");
//   const burger = document.querySelector(".burger");
//   burger.addEventListener("click", () => {
//     navbar.classList.toggle("show-nav");
//   });
// }
// toggleMenu();
//------------------------------Page de chargement---------------------------
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  loader.classList.add("fondu-out");
});
//------------------------------Page Parallax---------------------------
let background = document.getElementById("background");
let middelEnd = document.getElementById("middelEnd");
let middelStart = document.getElementById("middelStart");
let frontEnd = document.getElementById("frontEnd");
let frontStart = document.getElementById("frontStart");
let lastName = document.getElementById("lastName");
let firstName = document.getElementById("firstName");
let navBar = document.querySelector("nav");

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  background.style.top = value * 0.4 + "px";
  middelEnd.style.top = value * 0.35 + "px";
  middelStart.style.top = value * 0.3 + "px";
  frontEnd.style.top = value * 0.17 + "px";
  frontStart.style.top = value * 0.08 + "px";
  lastName.style.marginBotton = value * 2 + "px";
  firstName.style.marginBotton = value * 2 + "px";
});

//-------------------Scroll up apparition des menus, scroll bas disparition----------------

const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
  }

  if (currentScroll < lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  }

  if (currentScroll > lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});
// ---------------------------Hover wave links work--------------------------
let text = document.querySelectorAll("ul li a").forEach((text) => {
  text.innerHTML = text.innerText
    .split("")
    .map(
      (letters, i) =>
        `<span style="transition-delay:${i * 25}ms;">${letters}</span>`
    )
    .join("");
});
// -------------------------------Form wave text---------------------------------
let label1 = document.querySelector(".lab1");
label1.innerHTML = label1.innerText
  .split("")
  .map(
    (letters, i) =>
      `<span style="transition-delay: ${i * 30}ms;">${letters}</span>`
  )
  .join("");
let label2 = document.querySelector(".lab2");
label2.innerHTML = label2.innerText
  .split("")
  .map(
    (letters, i) =>
      `<span style="transition-delay: ${i * 30}ms;">${letters}</span>`
  )
  .join("");

let label3 = document.querySelector(".lab3");
label3.innerHTML = label3.innerText
  .split("")
  .map(
    (letters, i) =>
      `<span style="transition-delay: ${i * 30}ms;">${letters}</span>`
  )
  .join("");
