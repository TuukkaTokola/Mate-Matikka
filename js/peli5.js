let currentAnswer = 0;
let score = 0;
let questions = 0;
let streak = 0;
let timeLeft = 60;
let timer;

const questionEl = document.getElementById("question");
const answers = document.querySelectorAll(".answer");
const feedback = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const timeEl = document.getElementById("time");

const gameMessage = document.getElementById("game-message");
const messageTitle = document.getElementById("message-title");
const messageText = document.getElementById("message-text");
const retryBtn = document.getElementById("retry-btn");

function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function newQuestion() {
  clearInterval(timer);
  feedback.textContent = "";

  if (questions >= 10) {
    endGame();
    return;
  }

  startTimer();

  const a = Math.floor(Math.random() * 5) + 1;
  const b = Math.floor(Math.random() * 5) + 1;

  currentAnswer = a * b;
  questionEl.textContent = `${a} × ${b} = ?`;

  const options = [currentAnswer];

  while (options.length < 4) {
    const wrong = currentAnswer + Math.floor(Math.random() * 10) - 5;

    if (wrong > 0 && !options.includes(wrong)) {
      options.push(wrong);
    }
  }

  options.sort(() => Math.random() - 0.5);

  answers.forEach((btn, i) => {
    btn.textContent = options[i];
    btn.disabled = false;
    btn.classList.remove("correct", "wrong", "hit");

    btn.onclick = () => handleAnswer(btn, options[i]);
  });
}

function handleAnswer(button, value) {
  clearInterval(timer);
  questions++;

  answers.forEach(btn => {
    btn.disabled = true;
  });

  if (value === currentAnswer) {
    score++;
    streak++;
    feedback.textContent = "Oikein! 🎯";
    button.classList.add("correct", "hit");
  } else {
    streak = 0;
    feedback.textContent = "Väärin!";
    button.classList.add("wrong", "hit");
  }

  scoreEl.textContent = score;
  streakEl.textContent = streak;

  setTimeout(newQuestion, 900);
}

function handleTimeout() {
  streak = 0;
  streakEl.textContent = streak;

  answers.forEach(btn => {
    btn.disabled = true;
  });

  showMessage(
    "Aika loppui!",
    "Haluatko yrittää peliä uudelleen?"
  );
}

function endGame() {
  clearInterval(timer);

  loadScores();
  setScore(4, score);

  answers.forEach(btn => {
    btn.disabled = true;
  });

  showMessage(
    "Peli ohi!",
    `Sait ${score}/10 pistettä.`
  );
}

function showMessage(title, text) {
  messageTitle.textContent = title;
  messageText.textContent = text;
  gameMessage.classList.remove("hidden");
}

retryBtn.onclick = () => {
  score = 0;
  questions = 0;
  streak = 0;

  scoreEl.textContent = score;
  streakEl.textContent = streak;

  gameMessage.classList.add("hidden");
  feedback.textContent = "";

  newQuestion();
};

gameMessage.classList.add("hidden");
newQuestion();