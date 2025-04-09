const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Rome", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in the browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  }
];

let currentQuestion = 0;
let score = 0;
let time = 10;
let timerInterval;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  clearInterval(timerInterval);
  time = 10;
  timerEl.textContent = time;

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(option);
    answersEl.appendChild(li);
  });

  startTimer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timerEl.textContent = time;
    if (time === 0) {
      clearInterval(timerInterval);
      disableOptions();
    }
  }, 1000);
}

function checkAnswer(selected) {
  clearInterval(timerInterval);
  const correct = questions[currentQuestion].answer;
  const allOptions = document.querySelectorAll("#answers li");

  allOptions.forEach(li => {
    li.style.pointerEvents = "none";
    if (li.textContent === correct) {
      li.style.background = "lightgreen";
    } else if (li.textContent === selected) {
      li.style.background = "salmon";
    }
  });

  if (selected === correct) {
    score++;
    scoreEl.textContent = "Score: " + score;
  }
}

function disableOptions() {
  document.querySelectorAll("#answers li").forEach(li => {
    li.style.pointerEvents = "none";
  });
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
};

function endQuiz() {
  questionEl.textContent = "Quiz Finished!";
  answersEl.innerHTML = "";
  timerEl.textContent = "0";
  nextBtn.disabled = true;
}

loadQuestion();
