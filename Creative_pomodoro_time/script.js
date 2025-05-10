let timerInterval;
let timeRemaining;
let isPaused = false;
let sessionLength = 60; // in minutes
let breakLength = 5;    // in minutes
let isWorkTime = true;

const timerDisplay = document.querySelector('.timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const sessionTimeDisplay = document.getElementById('session-time');
const decreaseSessionButton = document.getElementById('decrease-session');
const increaseSessionButton = document.getElementById('increase-session');

// New selectors for seconds control
const decreaseSecondsButton = document.getElementById('decrease-seconds');
const increaseSecondsButton = document.getElementById('increase-seconds');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
}

function startTimer() {
    if (timerInterval) return;
    isPaused = false;
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = true;
}

function resetTimer() {
    stopTimer();
    timeRemaining = sessionLength * 60;
    updateTimerDisplay();
    isPaused = true;
    isWorkTime = true;
}

function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
    } else {
        stopTimer();
        isWorkTime = !isWorkTime;
        timeRemaining = (isWorkTime ? sessionLength : breakLength) * 60;
        updateTimerDisplay();
        startTimer();
    }
}

function decreaseSession() {
    if (sessionLength > 1) {
        sessionLength--;
        sessionTimeDisplay.textContent = sessionLength;
        if (!isWorkTime) breakLength--;
        resetTimer();
    }
}

function increaseSession() {
    sessionLength++;
    sessionTimeDisplay.textContent = sessionLength;
    if (!isWorkTime) breakLength++;
    resetTimer();
}

// ⏱ New second adjustment functions
function decreaseSeconds() {
    if (timeRemaining > 5) {
        timeRemaining -= 5;
        updateTimerDisplay();
    }
}

function increaseSeconds() {
    timeRemaining += 5;
    updateTimerDisplay();
}

// Initialize
timeRemaining = sessionLength * 60;
updateTimerDisplay();

// Event Listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
decreaseSessionButton.addEventListener('click', decreaseSession);
increaseSessionButton.addEventListener('click', increaseSession);

// Seconds controls
decreaseSecondsButton.addEventListener('click', decreaseSeconds);
increaseSecondsButton.addEventListener('click', increaseSeconds);
