"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const valentineContainer = document.getElementById("valentineContainer");
const rosesContainer = document.getElementById("rosesContainer");
const bouquetWrapper = document.getElementById("bouquetWrapper");
const captionText = document.getElementById("captionText");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  // Nascondi bottoni e mostra loading
  buttonsContainer.classList.add("hidden");
  titleElement.innerHTML = "Preparando il tuo regalo speciale...";
  titleElement.classList.add("loading-title");
  
  // Barra di caricamento
  const loadingBar = document.createElement("div");
  loadingBar.className = "loading-bar";
  loadingBar.innerHTML = `
    <div class="loading-progress"></div>
  `;
  valentineContainer.appendChild(loadingBar);
  
  // Avvia animazione loading
  setTimeout(() => {
    showRoses();
  }, 2500);
}

function showRoses() {
  valentineContainer.style.opacity = "0";
  valentineContainer.style.transition = "opacity 0.8s";
  rosesContainer.style.opacity = "1";
  rosesContainer.style.display = "block";
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;
  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "I'm gonna cry...",
  ];
  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

// ROSA LOGIC
const TOTAL_SEND_MS = 5000 + 1800 + 500;
const packets = document.querySelectorAll(".rose-packet");

function showBouquet() {
  if (!bouquetWrapper) return;
  bouquetWrapper.classList.add("bouquet-visible");
  if (captionText) {
    captionText.textContent = "Consegnato: il tuo bouquet è arrivato a Buenos Aires. Ti amo ❤️";
  }
}

function restartPackets() {
  packets.forEach(p => {
    p.style.animation = "none";
    void p.offsetWidth;
    p.style.animation = "";
  });
}

// Avvia animazione rose dopo che il container è visibile
setTimeout(() => {
  restartPackets();
  setTimeout(showBouquet, TOTAL_SEND_MS);
}, 3500);
