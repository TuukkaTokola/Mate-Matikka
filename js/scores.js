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
function showScores() {
  loadScores();

  const scoreList = document.getElementById("score-list");
  const totalScore = document.getElementById("total-score");

  if (!scoreList || !totalScore) {
    return;
  }

  scoreList.innerHTML = `
    <p>Peli 1: ${scores[0]}/10</p>
    <p>Peli 2: ${scores[1]}/10</p>
    <p>Peli 3: ${scores[2]}/10</p>
    <p>Peli 4: ${scores[3]}/10</p>
    <p>Peli 5: ${scores[4]}/10</p>
    <p>Peli 6: ${scores[5]}/10</p>
  `;

  const total = scores.reduce((sum, value) => sum + Number(value), 0);
  totalScore.textContent = total;
}

function resetScores() {
  localStorage.removeItem("storedScores");
  location.reload();
}

const resetBtn = document.getElementById("reset-scores-btn");

if (resetBtn) {
  resetBtn.onclick = resetScores;
}

showScores();
