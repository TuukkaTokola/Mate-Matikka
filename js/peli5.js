let currentAnswer = 0;
let score = 0;
let questions = 0;

const questionEl = document.getElementById("question");
const answers = document.querySelectorAll(".answer");
const feedback = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

function newQuestion() {
  if (questions >= 10) {
    endGame();
    return;
  }

  let a = Math.floor(Math.random() * 5) + 1;
  let b = Math.floor(Math.random() * 5) + 1;

  currentAnswer = a * b;
  questionEl.textContent = `${a} × ${b} = ?`;

  let options = [currentAnswer];

  while (options.length < 4) {
    let wrong = currentAnswer + Math.floor(Math.random() * 10) - 5;
    if (wrong > 0 && !options.includes(wrong)) {
      options.push(wrong);
    }
  }

  options.sort(() => Math.random() - 0.5);

  answers.forEach((btn, i) => {
    btn.textContent = options[i];
    btn.classList.remove("correct", "wrong");

    btn.onclick = () => handleAnswer(btn, options[i]);
  });
}

function handleAnswer(button, value) {
  questions++;

  if (value === currentAnswer) {
    score++;
    feedback.textContent = "Oikein! 🎯";
    button.classList.add("correct");
  } else {
    feedback.textContent = "Väärin!";
    button.classList.add("wrong");
  }

  scoreEl.textContent = score;

  setTimeout(newQuestion, 700);
}

function endGame() {
  feedback.textContent = `Peli ohi! Sait ${score}/10 pistettä`;

  // TÄRKEÄ: tallennus scores.js:ään
  loadScores();
  setScore(4, score); // peli5 = index 4

  answers.forEach(btn => btn.disabled = true);
}

newQuestion();