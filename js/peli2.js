let bgMusic = new Audio("sounds/bg.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;

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

let score = 0;
let correctAnswer;

function newQuestion() {
  let a = Math.floor(Math.random() * 11);
  let b = Math.floor(Math.random() * (a + 1));

  correctAnswer = a - b;

  document.getElementById("question").innerText = a + " - " + b + " = ?";
  let questionFish = document.querySelector(".question-fish");

if (questionFish) {
  questionFish.classList.add("glow");

  setTimeout(() => {
    questionFish.classList.remove("glow");
  }, 600);
}
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
    let span = f.querySelector("span"); // 👈 تأكدنا نجيب span
    if (span) {
      span.innerText = answers[i];
    }
  });
}

function checkAnswer(element) {
  startMusic();
  let value = parseInt(element.querySelector("span").innerText);

  document.querySelectorAll(".fish").forEach(f => {
    f.classList.remove("correct", "wrong");
  });

  if (value === correctAnswer) {
    element.classList.add("correct");
    score++;

    if (typeof playCorrectSound === "function") {
      playCorrectSound();
    }

  } else {
    element.classList.add("wrong");

    if (typeof playWrongSound === "function") {
      playWrongSound();
    }
  }

  document.getElementById("score").innerText = "Pisteet: " + score;

  setTimeout(() => {
    newQuestion();
  }, 1000);
}

newQuestion(); 

function goHome() {
  window.location.href = "index.html";
}

function endGame() {
alert("Peli päättyi! Pisteesi:: " + score);
  window.location.href = "index.html";
}