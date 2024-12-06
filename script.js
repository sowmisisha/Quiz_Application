const questions = [
    {
        prompt: "Inside which HTML element do we put the JavaScript?",
        options: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>",
    },
    {
        prompt: "How do you call a function named myFunction?",
        options: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction"],
        answer: "myFunction()",
    },
    {
        prompt: "How does a for loop start?",
        options: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", "for (i <= 5; i++)"],
        answer: "for (i = 0; i <= 5; i++)",
    },
    {
        prompt: "In JavaScript, which of the following is a logical operator?",
        options: ["|", "&&", "%", "/"],
        answer: "&&",
    },
    {
        prompt: "A named element in a JavaScript program that is used to store and retrieve data is a _____.",
        options: ["method", "assignment operator", "variable", "string"],
        answer: "variable",
    },
];

const timerEl = document.querySelector("#timer");
const questionsEl = document.querySelector("#questions");
const optionsEl = document.querySelector("#options");
const feedbackEl = document.querySelector("#feedback");
const submitBtn = document.querySelector("#submit-score");
const startBtn = document.querySelector("#start");
const nameInput = document.querySelector("#name");

let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

function startQuiz() {
    document.getElementById("start-screen").classList.add("hide");
    questionsEl.classList.remove("hide");

    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.querySelector("#question-words").textContent = currentQuestion.prompt;

    optionsEl.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = `${index + 1}. ${option}`;
        button.value = option;
        button.onclick = handleAnswerClick;
        optionsEl.appendChild(button);
    });
}

function handleAnswerClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) time = 0;
        feedbackEl.textContent = `Wrong! Correct answer: ${questions[currentQuestionIndex].answer}`;
    } else {
        feedbackEl.textContent = "Correct!";
    }
    feedbackEl.classList.remove("hide");
    setTimeout(() => feedbackEl.classList.add("hide"), 2000);

    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }
}

function endQuiz() {
    clearInterval(timerId);
    document.querySelector("#quiz-end").classList.remove("hide");
    document.querySelector("#score-final").textContent = time;
    questionsEl.classList.add("hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) endQuiz();
}

function saveHighScore() {
    const name = nameInput.value.trim();
    if (!name) return;

    const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    highScores.push({ name, score: time });

    localStorage.setItem("highscores", JSON.stringify(highScores));
    window.location.href = "highscore.html";
}

startBtn.onclick = startQuiz;
submitBtn.onclick = saveHighScore;
