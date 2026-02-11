"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// DEVONO coincidere con gli id nell'HTML
const valentinePage = document.getElementById("valentinePage");
const rosesPage = document.getElementById("rosesPage");
const bouquetWrapper = document.getElementById("bouquetWrapper");
const captionText = document.getElementById("captionText");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

// Collega gli eventi solo se i bottoni esistono
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

  // Nasconde i bottoni, cambia testo (in spagnolo)
  buttonsContainer.classList.add("hidden");
  titleElement.innerHTML = "Preparando tu regalo especial...";

  // Piccola attesa prima di cambiare pagina
  setTimeout(() => {
    valentinePage.classList.add("hidden");
    rosesPage.classList.remove("hidden");

    // Appena appare la pagina rose, facciamo ripartire i pacchetti
    setTimeout(() => {
      restartPackets();

      // Dopo il “viaggio” dei pacchetti, compare il bouquet
      setTimeout(() => {
        showBouquet();
      }, 7300); // tempo per far finire le animazioni dei pacchetti
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
    "Pookie, por favor",
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
    // forza reflow per riavviare l’animazione
    void p.offsetHeight;
    p.style.animation = "";
  });
}

function showBouquet() {
  if (bouquetWrapper) {
    bouquetWrapper.classList.add("bouquet-visible");
  }
  if (captionText) {
    captionText.textContent =
      "Entregado: ¡tu ramo ha llegado! Te amo ❤️";
  }
}
