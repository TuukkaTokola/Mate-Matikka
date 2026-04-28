let correctAnswer;
let score = 0;
let questionCount = 0;
const maxQuestions = 10;

window.onload = function () {
    loadScores();
}

function newQuestion() {
    if (questionCount >= maxQuestions) {
        endGame();
        return;
    }

    questionCount++;

    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);

    correctAnswer = num1 + num2;

    document.getElementById("question").innerText =
        num1 + " + " + num2 + " = ?";

    let answers = [correctAnswer];

    while (answers.length < 3) {
        let wrong = correctAnswer + Math.floor(Math.random() * 5) - 2;
        if (!answers.includes(wrong) && wrong >= 0) {
            answers.push(wrong);
        }
    }

    answers.sort(() => Math.random() - 0.5);

    document.getElementById("btn1").innerText = answers[0];
    document.getElementById("btn2").innerText = answers[1];
    document.getElementById("btn3").innerText = answers[2];

    document.getElementById("result").innerText = "";
}

function checkAnswer(button) {
    if (questionCount > maxQuestions) return;

    let result = document.getElementById("result");

    if (parseInt(button.innerText) === correctAnswer) {
        score++;
        result.innerText = "Oikein! 🎉";
        result.className = "correct";
    } else {
        result.innerText = "Väärin 😅";
        result.className = "wrong";
    }

    updateScore();

    setTimeout(() => {
        result.className = "";
        newQuestion();
    }, 1000);
}


function updateScore() {
    document.getElementById("score").innerText =
        "Pisteet: " + score + " / " + maxQuestions;
}

function endGame() {
    if (score > scores[0]) {
        setScore(0, score)
    }
    document.getElementById("question").innerText = "Peli loppui!"
    document.getElementById("result").innerText =
        "Sait " + score + " / " + maxQuestions + " pistettä 👏";

    document.querySelector(".answers").style.display = "none";
    document.getElementById("restartBtn").style.display = "inline-block";

    localStorage.setItem("score", score);
    localStorage.setItem("max", maxQuestions);

    document.getElementById("restartBtn").style.display = "inline-block";
    document.getElementById("scorePageBtn").style.display = "inline-block";
}

// aloita peli
newQuestion();
function restartGame() {
    score = 0;
    questionCount = 0;

    document.querySelector(".answers").style.display = "block";
    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("result").innerText = "";

    updateScore();
    newQuestion();
}
function goToScore() {
    window.location.href = "scores.html";
}