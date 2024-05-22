const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuesions = [];
let correctAnswers = 0;
let timer;
const TOTAL_TIME = 30;
let timeLeft = TOTAL_TIME;

const questions = [
    {
        question: "Qual é a capital da França?",
        options: ["Berlim", "Madrid", "Paris", "Lisboa"],
        correct: 3
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Terra", "Marte", "Júpiter", "Saturno"],
        correct: 3
    }
];

const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    correctAnswers = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', MAX_QUESTIONS);
        localStorage.setItem('correctAnswers', correctAnswers);
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerHTML = currentQuestion.options[index];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
    resetTimer();
};

choices.forEach((choice, index) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = index + 1;

        const classToApply =
            selectedAnswer == currentQuestion.correct ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            showConfetti();
            correctAnswers++;
        } else {
            shakeScreen();
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

resetTimer = () => {
    clearInterval(timer);
    timeLeft = TOTAL_TIME;
    progressBarFull.style.width = '100%';

    timer = setInterval(() => {
        timeLeft--;
        progressBarFull.style.width = `${(timeLeft / TOTAL_TIME) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            acceptingAnswers = false;
            shakeScreen();
            setTimeout(() => {
                getNewQuestion();
            }, 1000);
        }
    }, 1000);
};

const showConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
};

const shakeScreen = () => {
    game.classList.add('shake');
    setTimeout(() => {
        game.classList.remove('shake');
    }, 500);
};

startGame();
