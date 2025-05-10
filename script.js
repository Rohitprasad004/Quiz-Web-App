const questions = [
            {
                question: "Which programming language is primarily used for web development?",
                options: ["Java", "Python", "JavaScript", "C++"],
                correct: 2
            },
            {
                question: "What does CSS stand for?",
                options: ["Computer Style Sheets", "Creative Style Sheets", 
                         "Cascading Style Sheets", "Colorful Style Sheets"],
                correct: 2
            },
            {
                question: "Which of these is not a JavaScript framework?",
                options: ["React", "Angular", "Laravel", "Vue"],
                correct: 2
            },
            {
                question: "What is the latest version of HTML?",
                options: ["HTML4", "XHTML", "HTML5", "HTML2019"],
                correct: 2
            },
            {
                question: "Which tag is used to link a JavaScript file?",
                options: ["<script>", "<javascript>", "<js>", "<scripting>"],
                correct: 0
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        const questionElement = document.getElementById("question");
        const optionsContainer = document.getElementById("options-container");
        const nextBtn = document.getElementById("next-btn");
        const resultContainer = document.getElementById("result-container");
        const currentQuestionElement = document.getElementById("current-question");
        const totalQuestionsElement = document.getElementById("total-questions");
        const scoreElement = document.getElementById("score");
        const finalScoreElement = document.getElementById("final-score");
        const totalElement = document.getElementById("total");

        function startQuiz() {
            currentQuestion = 0;
            score = 0;
            scoreElement.textContent = score;
            document.querySelector(".quiz-body").style.display = "block";
            resultContainer.style.display = "none";
            showQuestion();
        }

        function showQuestion() {
            const question = questions[currentQuestion];
            questionElement.textContent = question.question;
            optionsContainer.innerHTML = "";
            
            question.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.textContent = option;
                button.classList.add("option-btn");
                button.addEventListener("click", () => checkAnswer(index));
                optionsContainer.appendChild(button);
            });

            currentQuestionElement.textContent = currentQuestion + 1;
            totalQuestionsElement.textContent = questions.length;
            totalElement.textContent = questions.length;
        }

        function checkAnswer(selectedIndex) {
            const question = questions[currentQuestion];
            const options = optionsContainer.children;
            
            if (selectedIndex === question.correct) {
                options[selectedIndex].classList.add("correct");
                score++;
                scoreElement.textContent = score;
            } else {
                options[selectedIndex].classList.add("wrong");
                options[question.correct].classList.add("correct");
            }

            Array.from(options).forEach(button => {
                button.disabled = true;
            });

            nextBtn.style.display = "block";
        }

        function showNextQuestion() {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
                nextBtn.style.display = "none";
            } else {
                showResult();
            }
        }

        function showResult() {
            document.querySelector(".quiz-body").style.display = "none";
            resultContainer.style.display = "block";
            finalScoreElement.textContent = score;
        }

        nextBtn.addEventListener("click", showNextQuestion);
        startQuiz(); // Initialize the quiz
