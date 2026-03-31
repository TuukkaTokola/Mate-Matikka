let correctAnswer = 0;
let score = 0;

function checkAnswer(element) {
    let value = Number(element.innerText);

    if (value === correctAnswer) {
        element.style.background = "green";
        score++;
    } else {
        element.style.background = "red";
    }

    document.getElementById("score").innerText = "Pisteet: " + score;

    setTimeout(() => {
        resetColors();
        generateQuestion();
    }, 1000);
}

function resetColors() {
    let fishes = document.querySelectorAll(".fish");
    fishes.forEach(f => f.style.background = "orange");
}

function generateQuestion() {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * num1);

    correctAnswer = num1 - num2;

    document.getElementById("question").innerText =
        num1 + " - " + num2 + " = ?";

    generateAnswers();
}

function generateAnswers() {
    let answers = [correctAnswer];

    while (answers.length < 4) {
        let wrong = Math.floor(Math.random() * 10);
        if (!answers.includes(wrong)) {
            answers.push(wrong);
        }
    }

    answers.sort(() => Math.random() - 0.5);

    let fishes = document.querySelectorAll(".fish");

    fishes.forEach((fish, i) => {
        fish.innerText = answers[i];
    });
}

generateQuestion();