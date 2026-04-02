let score = 0;
let correctAnswer = 0;

function newQuestion() {
  let num1 = Math.floor(Math.random() * 11);
  let num2 = Math.floor(Math.random() * (num1 + 1)); 

  correctAnswer = num1 - num2;

  document.getElementById("question").innerText =
    num1 + " - " + num2 + " = ?";

  generateAnswers();
}

function generateAnswers() {
  let answers = [correctAnswer];

  while (answers.length < 4) {
    let random = Math.floor(Math.random() * 11);
    if (!answers.includes(random)) {
      answers.push(random);
    }
  }

  answers.sort(() => Math.random() - 0.5);

  let fish = document.querySelectorAll(".fish");

  fish.forEach((f, index) => {
    f.innerText = answers[index];
    f.style.background = "";
  });
}

function checkAnswer(element) {
  let value = parseInt(element.innerText);

  if (value === correctAnswer) {
    element.style.background = "green";
    score++;
  } else {
    element.style.background = "red";
  }

  document.getElementById("score").innerText = "Pisteet: " + score;

  setTimeout(newQuestion, 1000);
}

newQuestion();