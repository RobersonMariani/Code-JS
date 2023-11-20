const timer = document.querySelector('.timer');
const milisec = document.querySelector('.milisec');
let interval;
let startTime;
let elapsedTime = 0; // variável para armazenar o tempo decorrido

function updateTimer() {
    const now = new Date();
    elapsedTime = now - startTime; // Atualiza o tempo decorrido

    const hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((elapsedTime / 60000) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0');
    const milisec = Math.floor((elapsedTime % 1000) / 10).toString().padStart(2, '0');

    timer.innerHTML = `${hours}:${minutes}:${seconds}.<span class="milisec">${milisec}</span>`;
}

function startTimer() {
    if (!interval) { // Inicia somente se o cronômetro não estiver rodando
        startTime = new Date() - elapsedTime; // Ajusta o startTime com base no tempo decorrido
        timer.style.color = 'black';
        interval = setInterval(updateTimer, 1);
    }
}

function pauseTimer() {
    if (interval) {
        clearInterval(interval);
        interval = null; // Reseta o interval para permitir reinício
        timer.style.color = 'red';
    }
}

function resetTimer() {
    clearInterval(interval);
    interval = null; // Reseta o interval
    elapsedTime = 0; // Reseta o tempo decorrido
    timer.style.color = 'black';
    timer.innerHTML = '00:00:00.<span class="milisec">00</span>';
    milisec.style.fontSize = '0.8em';
}
document.addEventListener('click', function (e) {
    let el = e.target;
    if (el.classList.contains('start')) { startTimer(); }
    if (el.classList.contains('pause')) { pauseTimer(); }
    if (el.classList.contains('reset')) { resetTimer(); }
});
