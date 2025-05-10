// Timer Variables
let timerInterval;
let isBreak = false; // Track whether it's a break or work session
let sessionLength = 25; // Work session length in minutes
let breakLength = 5; // Break session length in minutes
let timeLeftInSeconds = sessionLength * 60;

// DOM Elements
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const sessionTimeDisplay = document.getElementById("session-time");
const decreaseSessionButton = document.getElementById("decrease-session");
const increaseSessionButton = document.getElementById("increase-session");
const breakTimeDisplay = document.createElement("span");
breakTimeDisplay.id = "break-time";

// Update Timer Display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeftInSeconds / 60);
    const seconds = timeLeftInSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Start Timer
function startTimer() {
    startButton.classList.add("hidden");
    stopButton.classList.remove("hidden");
    timerInterval = setInterval(() => {
        if (timeLeftInSeconds > 0) {
            timeLeftInSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            playSound(); // Play sound when timer ends
            toggleSession(); // Switch between work and break sessions
        }
    }, 1000);
}

// Stop Timer
function stopTimer() {
    clearInterval(timerInterval);
    startButton.classList.remove("hidden");
    stopButton.classList.add("hidden");
}

// Reset Timer
function resetTimer() {
    clearInterval(timerInterval);
    startButton.classList.remove("hidden");
    stopButton.classList.add("hidden");
    isBreak = false; // Reset to work session
    timeLeftInSeconds = sessionLength * 60;
    updateTimerDisplay();
}

// Toggle Between Work and Break Session
function toggleSession() {
    isBreak = !isBreak;
    timeLeftInSeconds = isBreak ? breakLength * 60 : sessionLength * 60;
    updateTimerDisplay();
}

// Adjust Session Length
function adjustSessionLength(amount) {
    sessionLength = Math.max(1, sessionLength + amount); // Minimum session length is 1 minute
    sessionTimeDisplay.textContent = sessionLength;
    if (!isBreak) {
        timeLeftInSeconds = sessionLength * 60;
        updateTimerDisplay();
    }
}

// Adjust Break Length
function adjustBreakLength(amount) {
    breakLength = Math.max(1, breakLength + amount); // Minimum break length is 1 minute
    breakTimeDisplay.textContent = breakLength;
    if (isBreak) {
        timeLeftInSeconds = breakLength * 60;
        updateTimerDisplay();
    }
}

// Event Listeners
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
decreaseSessionButton.addEventListener("click", () => adjustSessionLength(-1));
increaseSessionButton.addEventListener("click", () => adjustSessionLength(1));
document.getElementById("decrease-break").addEventListener("click", () => adjustBreakLength(-1));
document.getElementById("increase-break").addEventListener("click", () => adjustBreakLength(1));

// Initialize Timer
updateTimerDisplay();
sessionTimeDisplay.textContent = sessionLength;
breakTimeDisplay.textContent = breakLength;