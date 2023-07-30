//movement
const card = document.querySelector(".card");
const container = document.querySelector(".container");

container.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 10;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 10;
  card.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`;
});
