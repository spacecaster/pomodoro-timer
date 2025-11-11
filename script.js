let timer;
let isRunning = false;

// --- Durations (seconds) ---
const DURATIONS = {
  work20: 20 * 60,   // 20:00 Focus
  break5: 5 * 60     // 5:00 Break
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
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
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
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.title = timeString; // minimalist title: only remaining time
}

// --- Preset buttons ---
document.getElementById('mode-20').addEventListener('click', () => setMode('work20'));
document.getElementById('mode-5').addEventListener('click',  () => setMode('break5'));

// --- Timer controls ---
startPauseButton.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer);
    startPauseButton.textContent = 'Start';
    isRunning = false;
    return;
  }

  // Start ticking
  timer = setInterval(() => {
    if (timeLeft === 0) {
      // Play once when it hits zero, then stop
      try { timerEndSound && timerEndSound.play && timerEndSound.play(); } catch (_) {}
      clearInterval(timer);
      isRunning = false;
      startPauseButton.textContent = 'Start';
      document.title = '';
      return;
    }
    timeLeft--;
    updateTimerDisplay();
    updateTitle();
  }, 1000);

  startPauseButton.textContent = 'Pause';
  isRunning = true;
});

resetButton.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  timeLeft = DURATIONS[mode]; // reset to currently selected mode
  updateTimerDisplay();
  updateTitle();
  startPauseButton.textContent = 'Start';
});

// --- Initial render ---
updateActivePreset(mode);
updateTimerDisplay();
updateTitle();
