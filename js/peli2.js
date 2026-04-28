let bgMusic = new Audio("sounds/bg.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;

window.onload = function () {
  loadScores();
};

function startMusic() {
  bgMusic.play();
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
}

//  SOUND EFFECTS
let correctSound = new Audio("sounds/correct.mp3");
let wrongSound = new Audio("sounds/wrong.mp3");

function playCorrectSound() {
  correctSound.currentTime = 0;
  correctSound.play();
}

function playWrongSound() {
  wrongSound.currentTime = 0;
  wrongSound.play();
}

// GAME VARIABLES
let score = 0;
let correctAnswer;

let questionCount = 0;
let maxQuestions = 10;

// uusi kysymys
function newQuestion() {

  // peli loppu 10 kysymystä
  if (questionCount >= maxQuestions) {
    endGame();
    return;
  }

  questionCount++;

  let a = Math.floor(Math.random() * 11);
  let b = Math.floor(Math.random() * (a + 1));

  correctAnswer = a - b;

  document.getElementById("question").innerText = a + " - " + b + " = ?";

  // glow effectii
  let questionFish = document.querySelector(".question-fish");
  if (questionFish) {
    questionFish.classList.add("glow");

    setTimeout(() => {
      questionFish.classList.remove("glow");
    }, 600);
  }

  // vastaukset 
  let answers = [correctAnswer];

  while (answers.length < 4) {
    let rand = Math.floor(Math.random() * 11);
    if (!answers.includes(rand)) {
      answers.push(rand);
    }
  }

  answers.sort(() => Math.random() - 0.5);

  let fish = document.querySelectorAll(".fish");

  fish.forEach((f, i) => {
    let span = f.querySelector("span");
    if (span && answers[i] !== undefined) {
      span.innerText = answers[i];
    }
  });
}

// tarkista vastaus
function checkAnswer(element) {
  startMusic();

  let value = parseInt(element.querySelector("span").innerText);

  document.querySelectorAll(".fish").forEach(f => {
    f.classList.remove("correct", "wrong");
  });

  if (value === correctAnswer) {
    element.classList.add("correct");
    score++;
    playCorrectSound();
  } else {
    element.classList.add("wrong");
    playWrongSound();
  }

  document.getElementById("score").innerText = "Pisteet: " + score;

  setTimeout(() => {
    newQuestion();
  }, 1000);
}

// peli loppu
function endGame() {
  if (score > scores[1]) {
    setScore(1, score);
  } 
  document.getElementById("gameOverScreen").style.display = "flex";
  document.getElementById("finalScore").innerText = "Pisteesi: " + score;

  let stars = "";

  if (score <= 3) {
    stars = "⭐";
  } else if (score <= 6) {
    stars = "⭐⭐";
  } else {
    stars = "⭐⭐⭐";
  }

  document.getElementById("starsResult").innerText = stars;
}


function goHome() {
  window.location.href = "index.html";
}

// START GAME
newQuestion();