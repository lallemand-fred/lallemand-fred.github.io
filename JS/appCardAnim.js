//Mouvements animation
const card = document.querySelector(".card");
const container = document.querySelector(".container");
//Items
const title = document.querySelector(".title");
const planete = document.querySelector(".planete img");
const purchase = document.querySelector(".purchase");
const description = document.querySelector(".info h3");
const sizes = document.querySelector(".sizes");

container.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
//Anim entrée
card.addEventListener("mouseenter", (e) => {
  card.style.transition = "none";
  //Pop out
  title.style.transform = "translateZ(70px)";
  planete.style.transform = "translateZ(90px) rotateZ(-25deg) ";
  description.style.transform = "translateZ(40px)";
  sizes.style.transform = "translateZ(70px)";
  purchase.style.transform = "translateZ(40px)";
});
//Anim sortie
container.addEventListener("mouseleave", (e) => {
  card.style.transition = "all 0.5s ease";
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;
  //Pop back
  title.style.transform = "translateZ(0px)";
  planete.style.transform = "translateZ(0px) rotateZ(0deg)";
  description.style.transform = "translateZ(0px)";
  sizes.style.transform = "translateZ(0px)";
  purchase.style.transform = "translateZ(0px)";
});
