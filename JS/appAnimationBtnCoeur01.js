const heartIcon = document.querySelector(".like-button .heart-icon");
const likesAmountLabel = document.querySelector(".like-button .likes-amount");

let likesAmount = 5;

heartIcon.addEventListener("click", () => {
  heartIcon.classList.toggle("liked");
  if (heartIcon.classList.contains("liked")) {
    likesAmount++;
  } else {
    likesAmount--;
  }
  likesAmountLabel.innerHTML = likesAmount;
});
