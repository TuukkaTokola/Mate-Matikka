// ==========================
// ELEMENTIT
// ==========================
const cards = document.querySelectorAll(".number-card");
const slots = document.querySelectorAll(".answer-slot");
const checkButton = document.querySelector(".check-button");

const backButton = document.getElementById("back-button");

backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// feedback
const feedbackBox = document.getElementById("feedback-box");
const feedbackScore = document.getElementById("feedback-score");
const feedbackEmoji = document.getElementById("feedback-emoji");

// ==========================
// GAME STATE
// ==========================
let draggedCard = null;
let currentIndex = 0;

let round = 1;
let maxRounds = 10;
let totalPoints = 0;

// ==========================
// DRAG START
// ==========================
cards.forEach(card => {
  card.addEventListener("dragstart", () => {
    draggedCard = card;
  });
});

// ==========================
// DROP ZONE
// ==========================
slots.forEach(slot => {

  slot.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  slot.addEventListener("drop", () => {
    if (!draggedCard) return;

    if (slot.textContent !== "") {
      cards.forEach(card => {
        if (card.textContent === slot.textContent) {
          card.style.visibility = "visible";
        }
      });
    }

    slot.textContent = draggedCard.textContent;
    draggedCard.style.visibility = "hidden";
  });
});

// ==========================
// POISTA SLOTISTA
// ==========================
slots.forEach(slot => {
  slot.addEventListener("click", () => {

    if (slot.textContent === "") return;

    cards.forEach(card => {
      if (card.textContent === slot.textContent) {
        card.style.visibility = "visible";
      }
    });

    slot.textContent = "";
    slot.classList.remove("correct", "wrong");
  });
});

// ==========================
// RANDOM CARDS
// ==========================
function generateCards() {
  let values = new Set();

  while (values.size < 6) {
    let isCalculation = Math.random() < 0.4;

    if (isCalculation) {
      let a = Math.floor(Math.random() * 10) + 1;
      let b = Math.floor(Math.random() * 10) + 1;
      values.add(`${a}+${b}`);
    } else {
      let num = Math.floor(Math.random() * 50) + 1;
      values.add(num.toString());
    }
  }

  return Array.from(values);
}

// ==========================
// SET CARDS
// ==========================
function setCards() {
  let newCards = generateCards();

  cards.forEach((card, index) => {
    card.textContent = newCards[index];
    card.style.visibility = "visible";
    card.draggable = true;
  });
}

// ==========================
function getCardValue(text) {
  if (text.includes("+")) {
    let parts = text.split("+");
    return Number(parts[0]) + Number(parts[1]);
  }
  return Number(text);
}

// ==========================
function resetBoard() {
  slots.forEach(slot => {
    slot.textContent = "";
    slot.classList.remove("correct", "wrong");
  });

  cards.forEach(card => {
    card.style.visibility = "visible";
  });

  currentIndex = 0;
  setCards();
}

// ==========================
// GAME OVER
// ==========================
function endGame() {
  feedbackBox.style.display = "block";

  let average = Math.round(totalPoints / maxRounds);

  feedbackScore.innerHTML = `
    🎉 Peli ohi! <br>
    Keskiarvo: <b>${average} / 10</b>
  `;

  feedbackEmoji.textContent =
    average >= 9 ? "🤩" :
    average >= 7 ? "😄" :
    average >= 5 ? "🙂" :
    average >= 3 ? "😐" :
    "😢";

  let btn = document.createElement("button");
  btn.textContent = "Takaisin etusivulle";
  btn.style.marginTop = "10px";

  btn.onclick = () => {
    window.location.href = "index.html";
  };

  feedbackBox.appendChild(btn);
}

// ==========================
// CHECK
// ==========================
checkButton.addEventListener("click", () => {

  let values = [];

  slots.forEach(slot => {
    if (slot.textContent !== "") {
      values.push(getCardValue(slot.textContent));
    }
  });

  if (values.length !== slots.length) {
    alert("Täytä kaikki kohdat!");
    return;
  }

  let correctOrder = [...values].sort((a, b) => a - b);

  slots.forEach(slot => {
    slot.classList.remove("correct", "wrong");
  });

  let correctCount = 0;

  for (let i = 0; i < values.length; i++) {
    if (values[i] === correctOrder[i]) {
      slots[i].classList.add("correct");
      correctCount++;
    } else {
      slots[i].classList.add("wrong");
    }
  }

  let points = Math.round((correctCount / slots.length) * 10);
  totalPoints += points;

  loadScores();
  setScore(3, Math.round(totalPoints / round));

  feedbackBox.style.display = "block";
  feedbackScore.textContent = `Kierros ${round}: ${points}/10`;

  if (points <= 1) feedbackEmoji.textContent = "😢";
  else if (points <= 2) feedbackEmoji.textContent = "😞";
  else if (points <= 3) feedbackEmoji.textContent = "😐";
  else if (points <= 4) feedbackEmoji.textContent = "🙂";
  else if (points <= 5) feedbackEmoji.textContent = "😊";
  else if (points <= 6) feedbackEmoji.textContent = "😁";
  else if (points <= 8) feedbackEmoji.textContent = "😄";
  else feedbackEmoji.textContent = "🤩";

  setTimeout(() => {

    round++;

    if (round > maxRounds) {
      endGame();
    } else {
      resetBoard();
    }

  }, 1500);
});

// ==========================
// START
// ==========================
setCards();