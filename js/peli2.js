let score = 0;
let correctAnswer;

function newQuestion() {
  let a = Math.floor(Math.random() * 11);
  let b = Math.floor(Math.random() * (a + 1));

  correctAnswer = a - b;

  document.getElementById("question").innerText = a + " - " + b + " = ?";

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
    f.querySelector("span").innerText = answers[i];
  });
}

function checkAnswer(element) {
  let value = parseInt(element.querySelector("span").innerText);

  // إزالة أي تأثير قديم
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

  setTimeout(newQuestion, 1000);
}
