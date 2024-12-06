function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    const scoresList = document.querySelector("#highscores");

    highScores
        .sort((a, b) => b.score - a.score)
        .forEach(({ name, score }) => {
            const li = document.createElement("li");
            li.textContent = `${name} - ${score}`;
            scoresList.appendChild(li);
        });
}

function clearHighScores() {
    localStorage.removeItem("highscores");
    window.location.reload();
}

document.querySelector("#clear").onclick = clearHighScores;

displayHighScores();
