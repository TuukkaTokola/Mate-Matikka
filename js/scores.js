let scores = [0, 0, 0, 0, 0, 0];

function saveScores() {
    localStorage.setItem("storedScores", JSON.stringify(scores));
}

function loadScores() {
    let data = localStorage.getItem("storedScores");

    if (data !== null) {
        scores = JSON.parse(data);
    }
}

function setScore(index, value) {
    if (index >= 0 && index < scores.length) {
        scores[index] = value;
        saveScores();
    } else {
        console.error("Index out of bounds");
    }
}