let round = 1;
let points = 0;
let leftNumber;
let rightNumber;

window.onload = function () {
  loadScores();
};

const gameArea = document.querySelector(".game");

function newRound() {
    leftNumber = Math.floor(Math.random() * 10);
    rightNumber = Math.floor(Math.random() * 10);

    document.getElementById("leftNumber").textContent = leftNumber;
    document.getElementById("rightNumber").textContent = rightNumber;
}

function checkAnswer(answer) {
    let correct;
    if (leftNumber > rightNumber) correct = ">";
    else if (leftNumber < rightNumber) correct = "<";
    else correct = "=";

    if (answer === correct) {
        points++;
        gameArea.classList.add("correct");
  } else {
        gameArea.classList.add("wrong");
  }

    document.getElementById("points").textContent = points;

    setTimeout(() => {
        gameArea.classList.remove("correct", "wrong");

    if (round < 10) {
        round++;
        newRound();
    } else {
        if (points > scores[2]) {
        setScore(2, points);
        }
        showEndScreen();
    }
  }, 400);
}

function showEndScreen() {
  document.getElementById("finalScore").textContent = points;
  document.getElementById("gameArea").classList.add("hidden");
  document.getElementById("endScreen").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", newRound);