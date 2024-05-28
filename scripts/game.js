const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let correctAnswers = 0;
let timer;
const TOTAL_TIME = 30;
let timeLeft = TOTAL_TIME;

const questions = [
    {
        question: "Criada em 2005, a Rádio Unama pode ser sintonizada em qual frequência?",
        options: ["105,5 Mhz", "99,9 Mhz", "102,7 Mhz", "100,5 Mhz"],
        correct: 1
    },
    {
        question: "Em que ano a Unama passou a integrar um dos maiores grupos de educação superior do Brasil: o Grupo Ser Educacional?",
        options: ["2012", "2015", "2013", "2014"],
        correct: 4
    },
    {
        question: "Buscando expandir as possibilidades de atuação profissional de seus alunos, em 2006, a Unama passou a ofertar o programa de:",
        options: ["Programa de pós-graduação em mestrado e doutorado", "Programa de pós-graduação", "Programa de mestrado e doutorado", "Programa de especialização"],
        correct: 1
    },
    {
        question: "Em 2003, a Unama inaugurou um novo campus com uma estrutura completa e moderna.",
        options: ["Campus UNAMA Alcindo Cacela", "Campus UNAMA BR", "Campus UNAMA Santarém", "Campus Parque Shopping"],
        correct: 2
    },
    {
        question: "Com visão de futuro e diante dos novos desafios globais, em 2021 a Unama lançou um novo sistema de aprendizagem e uma plataforma de streaming educacional. Quais são elas?",
        options: ["MICROSOFT TEAMS E UBÍQUA", "GOOGLE MEET e MICROSOFT TEAMS", "UBÍQUA e UNAMA PLAY", "UNAMA PLAY E UNAMA WEB"],
        correct: 3
    },
    {
        question: "A Unama sedia qual Consulado?",
        options: ["Consulado de Portugal", "Consulado da Itália", "Consulado da Arábia Saudita", "Consulado da República Tcheca"],
        correct: 4
    },
    {
        question: "No ano de 2017, a Unama expandiu sua presença para qual região do Brasil?",
        options: ["Norte", "Nordeste", "Sudeste", "Sul"],
        correct: 1
    },
    {
        question: "A TV Unama foi a primeira emissora universitária da Região Norte do Brasil tornando-se referência na qualificação prática dos futuros jornalistas e publicitários do estado. Em que ano a TV Unama foi inaugurada?",
        options: ["2001", "2021", "2022", "2002"],
        correct: 4
    },
    {
        question: "A Unama possui qual conceito do MEC?",
        options: ["Conceito 4", "Conceito 3", "Conceito 6", "Conceito 5"],
        correct: 4
    },
    {
        question: "Em 2015, a UNAMA Ananindeua passa a fazer parte do roteiro oficial do Círio de Nazaré. Qual das romarias tem parada no campus?",
        options: ["Romaria Rodoviária", "Círio de Nazaré", "Círio de Nazaré", "Moto Romaria"],
        correct: 1
    },
];

const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    correctAnswers = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', MAX_QUESTIONS);
        localStorage.setItem('correctAnswers', correctAnswers);
        return window.location.assign('../pages/end.html');
    }
    questionCounter++;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    if (question) {
        question.innerText = currentQuestion.question;
    }

    choices.forEach((choice, index) => {
        if (choice) {
            choice.innerText = currentQuestion.options[index];
        }
    });

    availableQuestions.splice(questionIndex, 1);
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
        }, 2000);
    });
});

resetTimer = () => {
    clearInterval(timer);
    timeLeft = TOTAL_TIME;
    progressBarFull.style.width = '100%';

    timer = setInterval(() => {
        timeLeft--;
        const progressWidth = (timeLeft / TOTAL_TIME) * 100;
        progressBarFull.style.width = `${progressWidth}%`;

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
