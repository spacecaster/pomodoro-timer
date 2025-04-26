let timer;
let isRunning = false;
let timeLeft = 30; // 20 minutes in seconds

const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const timerEndSound = document.getElementById('timer-end-sound');

// Timer functionality
startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startPauseButton.textContent = 'Start';
    } else {
        timer = setInterval(() => {
if (timeLeft === 0) {
    timerEndSound.play(); // Play sound once when timer first hits zero
}
if (timeLeft <= 0) {
    clearInterval(timer);
    document.title = '';
} else {
                timeLeft--;
                updateTimerDisplay();
                updateTitle(); // Update tab title with remaining time
            }
        }, 1000);
        startPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 30; // Reset to 20 minutes
    updateTimerDisplay();
    updateTitle(); // Update title when reset
    startPauseButton.textContent = 'Start';
});

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function updateTitle() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.title = timeString; // Only show the remaining time
}

// Initial display
updateTimerDisplay();
updateTitle();
