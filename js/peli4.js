// ==========================
// ELEMENTIT
// ==========================
const cards = document.querySelectorAll(".number-card");
const slots = document.querySelectorAll(".answer-slot");
const checkButton = document.querySelector(".check-button");

// feedback
const feedbackBox = document.getElementById("feedback-box");
const feedbackScore = document.getElementById("feedback-score");
const feedbackEmoji = document.getElementById("feedback-emoji");

// ==========================
// DRAG STATE
// ==========================
let draggedCard = null;
let currentIndex = 0;

// ==========================
// DRAG START
// ==========================
cards.forEach(card => {
  card.addEventListener("dragstart", () => {
    draggedCard = card;
  });
});

// ==========================
// DROP ZONE LOGIC
// ==========================
slots.forEach(slot => {

  slot.addEventListener("dragover", (e) => {
    e.preventDefault(); // pakollinen
  });

  slot.addEventListener("drop", () => {
    if (!draggedCard) return;

    // jos slotissa jo jotain → palauta vanha kortti
    if (slot.textContent !== "") {
      cards.forEach(card => {
        if (card.textContent === slot.textContent) {
          card.style.visibility = "visible";
        }
      });
    }

    slot.textContent = draggedCard.textContent;
    draggedCard.style.visibility = "hidden";

    currentIndex++;
  });
});

slots.forEach(slot => {
  slot.addEventListener("click", () => {

    if (slot.textContent === "") return;

    // palautetaan kortti näkyviin
    cards.forEach(card => {
      if (card.textContent === slot.textContent) {
        card.style.visibility = "visible";
      }
    });

    slot.textContent = "";
    slot.classList.remove("correct", "wrong");

    currentIndex--;
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
// ASETA KORTIT
// ==========================
function setCards() {
  let newCards = generateCards();

  cards.forEach((card, index) => {
    card.textContent = newCards[index];
    card.style.visibility = "visible";
    card.draggable = true;
  });
}


function getCardValue(text) {
  if (text.includes("+")) {
    let parts = text.split("+");
    return Number(parts[0]) + Number(parts[1]);
  }
  return Number(text);
}

function resetGame() {
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
// TARKISTUS
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

  // SCORE SAVE
  loadScores();
  setScore(3, points);

  // FEEDBACK BOX
  feedbackBox.style.display = "block";
  feedbackScore.textContent = `${points}/10 pistettä`;

  if (points <= 1) feedbackEmoji.textContent = "😢";
  else if (points <= 2) feedbackEmoji.textContent = "😞";
  else if (points <= 3) feedbackEmoji.textContent = "😐";
  else if (points <= 4) feedbackEmoji.textContent = "🙂";
  else if (points <= 5) feedbackEmoji.textContent = "😊";
  else if (points <= 6) feedbackEmoji.textContent = "😁";
  else if (points <= 8) feedbackEmoji.textContent = "😄";
  else feedbackEmoji.textContent = "🤩";

  setTimeout(() => {
    resetGame();
  }, 1500);
});

// ==========================
// START
// ==========================
setCards();