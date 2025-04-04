document.addEventListener("DOMContentLoaded", function () {
    const timerDisplay = document.getElementById("timer");
    const startButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");
    const stopButton = document.getElementById("stop");
    const resetButton = document.getElementById("reset");
    const themeSelect = document.getElementById("theme-select");
    const muteButton = document.getElementById("mute");
    const quoteDisplay = document.querySelector(".quote");
    const pomodoroButton = document.getElementById("pomodoro");
    const shortBreakButton = document.getElementById("short-break");
    const longBreakButton = document.getElementById("long-break");

    let timer;
    let timeLeft = 1500; // Default Pomodoro time (25 minutes)
    let isRunning = false;
    let isPaused = false;
    let isMuted = false;
    
    let audio = new Audio();
    let alarm = new Audio("alarm.mp3"); // Alarm sound at the end of each timer

    const quotes = [
        "Push yourself, because no one else is going to do it for you.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Believe in yourself and all that you are.",
        "Dream big and dare to fail.",
        "The only way to do great work is to love what you do.",
        "Stay focused, go after your dreams, and keep moving toward your goals."
    ];

    function updateDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            isPaused = false;
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    if (!isMuted) {
                        alarm.play(); // Play alarm sound when timer ends
                    }
                    displayRandomQuote();
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            isPaused = true;
            audio.pause(); // Pause background music
        }
    }

    function stopTimer() {
        clearInterval(timer);
        isRunning = false;
        timeLeft = 1500; // Reset to default Pomodoro
        updateDisplay();
    }

    function resetTimer() {
        stopTimer();
        displayRandomQuote();
    }

    function changeTheme() {
        const theme = themeSelect.value;
        if (theme === "rain") {
            document.body.style.background = "url('rain.gif') no-repeat center center/cover";
            audio.src = "rain.mp3";
        } else if (theme === "mountain") {
            document.body.style.background = "url('mountain.gif') no-repeat center center/cover";
            audio.src = "mountain.mp3";
        } else {
            document.body.style.background = "url('default.jpg') no-repeat center center/cover";
            audio.src = "";
        }
        
        if (!isMuted && audio.src) {
            audio.loop = true;
            audio.play();
        }
    }

    function toggleMute() {
        if (isMuted) {
            audio.play();
            muteButton.textContent = "Mute";
        } else {
            audio.pause();
            muteButton.textContent = "Unmute";
        }
        isMuted = !isMuted;
    }

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = quotes[randomIndex];
    }

    function setPomodoro() {
        timeLeft = 1500;
        updateDisplay();
    }

    function setShortBreak() {
        timeLeft = 300;
        updateDisplay();
    }

    function setLongBreak() {
        timeLeft = 600;
        updateDisplay();
    }

    themeSelect.innerHTML = `
        <option value='default'>Default</option>
        <option value='rain'>Rain</option>
        <option value='mountain'>Mountain</option>
    `;

    startButton.addEventListener("click", startTimer);
    pauseButton.addEventListener("click", pauseTimer);
    stopButton.addEventListener("click", stopTimer);
    resetButton.addEventListener("click", resetTimer);
    themeSelect.addEventListener("change", changeTheme);
    muteButton.addEventListener("click", toggleMute);
    pomodoroButton.addEventListener("click", setPomodoro);
    shortBreakButton.addEventListener("click", setShortBreak);
    longBreakButton.addEventListener("click", setLongBreak);

    updateDisplay();
    displayRandomQuote();
});
