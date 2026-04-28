let currentAnswer = 0;
let score = 0;
let level = 1;
let questionCount = 0;
const maxQuestions = 10;

window.onload = function () {
  loadScores();
  document.getElementById("game-controls").style.display = "none";
};

function startGame(selectedLevel) {
  level = selectedLevel;
  score = 0;
  questionCount = 0;

  document.getElementById("score").textContent = score;
  document.getElementById("progress").textContent = questionCount;

  document.getElementById("game-section").classList.remove("hidden");
  document.getElementById("game-controls").style.display = "block";

  document.getElementById("feedback").textContent = "";

  let title = "Helppo";
  if (level === 2) title = "Keskitaso";
  if (level === 3) title = "Vaikea";

  document.getElementById("level-title").textContent = "Taso: " + title;

  generateQuestion();
}

function generateQuestion() {
  let divisor, result;

  if (level === 1) {
    divisor = Math.floor(Math.random() * 5) + 1;
    result = Math.floor(Math.random() * 10) + 1;
  } else if (level === 2) {
    divisor = Math.floor(Math.random() * 10) + 2;
    result = Math.floor(Math.random() * 10) + 2;
  } else {
    divisor = Math.floor(Math.random() * 12) + 2;
    result = Math.floor(Math.random() * 12) + 2;
  }

  let dividend = divisor * result;
  currentAnswer = result;

  document.getElementById("question").textContent =
    dividend + " ÷ " + divisor + " = ?";
}

function checkAnswer() {
  const userAnswer = Number(document.getElementById("answer").value);
  const feedback = document.getElementById("feedback");

  if (userAnswer === currentAnswer) {
    feedback.textContent = "Oikein! 🎉";
    score++;
  } else {
    feedback.textContent = "Väärin! Oikea vastaus oli " + currentAnswer;
  }

  questionCount++;

  document.getElementById("score").textContent = score;
  document.getElementById("progress").textContent = questionCount;

  document.getElementById("answer").value = "";

  if (questionCount >= maxQuestions) {
    endGame();
    return;
  }

  generateQuestion();
}

function endGame() {
  document.getElementById("game-controls").style.display = "none";

  if (score > scores[5]) {
    setScore(5, score);
  }

  document.getElementById("question").textContent =
    "Peli ohi! Sait " + score + " / " + maxQuestions + " oikein 🎉";

  document.getElementById("feedback").textContent =
    "Paras tulos: " + scores[5];
}