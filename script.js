let countdown;
let timeLeft = 0;
let isPaused = false;

function adjustTime() {
  let sec = parseInt(document.getElementById("seconds").value, 10) || 0;
  let min = parseInt(document.getElementById("minutes").value, 10) || 0;
  let hr = parseInt(document.getElementById("hours").value, 10) || 0;
  let day = parseInt(document.getElementById("days").value, 10) || 0;

  if (sec >= 60) {
    min += Math.floor(sec / 60);
    sec = sec % 60;
  }

  if (min >= 60) {
    hr += Math.floor(min / 60);
    min = min % 60;
  }

  if (hr >= 24) {
    day += Math.floor(hr / 24);
    hr = hr % 24;
  }

  document.getElementById("days").value = day;
  document.getElementById("hours").value = hr;
  document.getElementById("minutes").value = min;
  document.getElementById("seconds").value = sec;
}

function updateDisplay() {
  let days = Math.floor(timeLeft / 86400);
  let hours = Math.floor((timeLeft % 86400) / 3600);
  let minutes = Math.floor((timeLeft % 3600) / 60);
  let seconds = timeLeft % 60;

  document.getElementById("timerDisplay").textContent = `${String(
    days
  ).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (!isPaused) {
    adjustTime();
    let d = parseInt(document.getElementById("days").value, 10) || 0;
    let h = parseInt(document.getElementById("hours").value, 10) || 0;
    let m = parseInt(document.getElementById("minutes").value, 10) || 0;
    let s = parseInt(document.getElementById("seconds").value, 10) || 0;

    timeLeft = d * 86400 + h * 3600 + m * 60 + s;
  }

  clearInterval(countdown);
  isPaused = false;
  updateDisplay();

  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      document.getElementById("timerDisplay").textContent = "Time's up!";
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
  clearInterval(countdown);
}

function resetTimer() {
  clearInterval(countdown);
  isPaused = false;
  timeLeft = 0;
  document.getElementById("timerDisplay").textContent = "00:00:00:00";

  document.getElementById("days").value = "0";
  document.getElementById("hours").value = "0";
  document.getElementById("minutes").value = "0";
  document.getElementById("seconds").value = "0";
}
