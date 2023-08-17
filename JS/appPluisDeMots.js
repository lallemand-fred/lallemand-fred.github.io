let div = document.querySelector("#cursor");
let body = document.querySelector("body");
document.onmousemove = function (e) {
  //mouvements curseur
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";

  //animation background curseur
  body.style.backgroundPositionX = e.pageX / -4 + "px";
  body.style.backgroundPositionY = e.pageY / -4 + "px";

  //Ajout des éléments au corp de page
  let element = document.createElement("div");
  element.className = "element";
  body.prepend(element);

  //mouvement aléatoire sur l'axe y & x
  element.style.left = cursor.getBoundingClientRect().x + "px";
  element.style.top = cursor.getBoundingClientRect().y + "px";

  setTimeout(function () {
    let text = document.querySelectorAll(".element")[0],
      directionX = Math.random() < 0.5 ? -1 : 1,
      directionY = Math.random() < 0.5 ? -1 : 1;

    text.style.left =
      parseInt(text.style.left) - directionX * (Math.random() * 100) + "px";
    text.style.top =
      parseInt(text.style.top) - directionY * (Math.random() * 100) + "px";
    text.style.opacity = 0;
    text.style.transform = "scale(0.15)";
    text.innerHTML = randomText();

    //suppresion des éléments
    setTimeout(function () {
      element.remove();
    }, 1000);
  }, 10);
};

//Ajout de text aléatoir de lettres et de nombres
function randomText() {
  var text = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
  letter = text[Math.floor(Math.random() * text.length)];
  return letter;
}
