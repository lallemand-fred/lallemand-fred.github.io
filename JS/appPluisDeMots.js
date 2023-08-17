let div = document.querySelector("#cursor");
let body = document.querySelector("body");
document.onmousemove = function (e) {
  //mouvements curseur
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
  //animation arrière curseur
  body.style.backgroundPositionX = e.pageX / -4 + "px";
  body.style.backgroundPositionY = e.pageY / -4 + "px";
  //Ajout des éléments au corp de page
  let element = document.createElement("div");
  element.className = "element";
  body.prepend(element);
};
