const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const correctAnswers = localStorage.getItem('correctAnswers');
const progressBarFull = document.getElementById('progressBarFull');

finalScore.innerText = `Você acertou ${correctAnswers} de ${mostRecentScore} questões!`;

const redirectAfterTimeout = () => {
    let timeLeft = 5;

    const timer = setInterval(() => {
        timeLeft--;
        progressBarFull.style.width = `${(timeLeft / 5) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            window.location.assign('/');
        }
    }, 1000);
};

redirectAfterTimeout();
