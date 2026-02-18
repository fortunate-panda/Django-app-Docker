// Quiz Data: 10 Questions
const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
        correct: 1
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Simple Sheets", "Cascading Style Sheets", "Cars SUVs Sailboats"],
        correct: 2
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None of the above"],
        correct: 1
    },
    {
        question: "Which of these is a Python web framework?",
        options: ["React", "Django", "Laravel", "Spring"],
        correct: 1
    },
    {
        question: "In CSS, what property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background"],
        correct: 2
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<link>"],
        correct: 2
    },
    {
        question: "Which tool is used to ensure code quality in JavaScript?",
        options: ["ESLint", "jQuery", "RequireJS", "Docker"],
        correct: 0
    },
    {
        question: "What is the most popular version control system?",
        options: ["SVN", "Mercurial", "Git", "FTP"],
        correct: 2
    },
    {
        question: "Which status code indicates a successful HTTP request?",
        options: ["200", "404", "500", "301"],
        correct: 0
    }
];

// State Variables
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsBox = document.getElementById('options-box');
const nextBtn = document.getElementById('next-btn');
const questionCounter = document.getElementById('question-number');
const progressBar = document.getElementById('progress');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const scoreDisplay = document.getElementById('score-display');
const resultMessage = document.getElementById('result-message');

// Initialize Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBox.classList.remove('hidden');
    resultBox.classList.add('hidden');
    nextBtn.classList.add('hidden');
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const currentQuizData = quizData[currentQuestionIndex];
    
    // Update Question Text
    questionText.innerText = currentQuizData.question;
    
    // Clear previous options
    optionsBox.innerHTML = '';
    
    // Create Option Buttons
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.setAttribute('onclick', `checkAnswer(${index}, this)`);
        optionsBox.appendChild(button);
    });

    // Update Progress UI
    questionCounter.innerText = `${currentQuestionIndex + 1} / ${quizData.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Hide Next Button until an answer is picked
    nextBtn.classList.add('hidden');
}

// Check Answer
function checkAnswer(selectedIndex, selectedBtn) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    const allOptions = optionsBox.children;

    // Disable all buttons to prevent multiple clicks
    for (let btn of allOptions) {
        btn.disabled = true;
        // Highlight the correct answer regardless of choice
        if (Array.from(allOptions).indexOf(btn) === correctIndex) {
            btn.classList.add('correct');
        }
    }

    // Check Logic
    if (selectedIndex === correctIndex) {
        score++;
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('wrong');
    }

    // Show Next Button
    nextBtn.classList.remove('hidden');
}

// Next Question Handler
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    
    scoreDisplay.innerText = score;

    // Custom Message based on score
    if (score === 10) {
        resultMessage.innerText = "Perfect Score!";
    } else if (score > 7) {
        resultMessage.innerText = "Great Job!";
    } else if (score > 4) {
        resultMessage.innerText = "Good Effort";
    } else {
        resultMessage.innerText = "Keep Practicing";
    }
}

// Restart Handler
function restartQuiz() {
    startQuiz();
}

// Start the app on load
startQuiz();