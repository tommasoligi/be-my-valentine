"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const valentinePage = document.getElementById("valentinePage");
const rosesPage = document.getElementById("rosesPage");
const flowers = document.getElementById("flowers");
const captionText = document.getElementById("captionText");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

if (yesButton && noButton) {
  yesButton.addEventListener("click", handleYesClick);

  noButton.addEventListener("click", function () {
    if (!play) return;

    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();

    if (noCount === MAX_IMAGES) {
      play = false;
    }
  });
}

function handleYesClick() {
  if (!buttonsContainer || !titleElement || !valentinePage || !rosesPage) return;

  buttonsContainer.classList.add("hidden");
  titleElement.innerHTML = "Preparando tu regalo especial...";

  setTimeout(() => {
    valentinePage.classList.add("hidden");
    rosesPage.classList.remove("hidden");

    setTimeout(() => {
      restartPackets();

      // Dopo il viaggio delle rose, far partire i fiori animati
      setTimeout(() => {
        showFlowers();
      }, 7300);
    }, 300);
  }, 2000);
}

function resizeYesButton() {
  if (!yesButton) return;
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;
  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "¿Estás segura?",
    "Dale, por favor",
    "No me hagas esto :(",
    "Me estás rompiendo el corazón",
    "Voy a llorar...",
  ];
  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  if (!catImg) return;
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  if (!noButton) return;
  noButton.innerHTML = generateMessage(noCount);
}

const packets = document.querySelectorAll(".rose-packet");

function restartPackets() {
  packets.forEach((p) => {
    p.style.animation = "none";
    void p.offsetHeight;
    p.style.animation = "";
  });
}

function showFlowers() {
  // Toglie la classe flowers-paused per far partire tutte le animazioni
  if (flowers) {
    flowers.classList.remove("flowers-paused");
  }
  if (captionText) {
    captionText.textContent = "Entregado! Las rosas han llegado ❤️";
  }
}
