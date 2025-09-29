let timer;
let isRunning = false;

// --- Durations (seconds) ---
const DURATIONS = {
  work20: 20 * 60,   // 20:00 Focus
  break7: 7 * 60     // 7:00 Break
};

// Current mode & time
let mode = 'work20';
let timeLeft = DURATIONS[mode];

const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const timerEndSound = document.getElementById('timer-end-sound');

// --- Helpers ---
function setMode(nextMode) {
  // Stop any running timer
  clearInterval(timer);
  isRunning = false;
  startPauseButton.textContent = 'Start';

  mode = nextMode;
  timeLeft = DURATIONS[mode];
  updateActivePreset(mode);
  updateTimerDisplay();
  updateTitle();
}

function updateActivePreset(current) {
  document.querySelectorAll('.preset').forEach(btn => {
    const isActive = btn.dataset.mode === current;
    btn.classList.toggle('active', isActive);
  });
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = minutes.toString().padStart(2, '0');
  secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function updateTitle() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2
