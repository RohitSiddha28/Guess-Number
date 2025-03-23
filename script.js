// Selecting elements
let input = document.getElementById("userinput");
let image = document.querySelector(".photo img");
let heading = document.querySelector("h1");
let count = document.getElementById("data");
let hints = document.querySelector(".hints");
let info = document.querySelector(".info");
let submit = document.getElementById("Submit");
let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");
let survival = document.getElementById("survival");
let restart = document.getElementById("restart");
let modebtn = document.getElementById("mode");
let body = document.body;
let countLabel = document.querySelector(".count"); // To update text dynamically

// Variables for game logic
let random = Math.floor(Math.random() * 101);
let open = 0;
let close = 100;
let maxAttempts = 0;
let attempts = 0;
let isSurvivalMode = false;
let diff = document.getElementById("difficultyDisplay");

// Create tooltip
let tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
document.body.appendChild(tooltip);

// ✅ Improved Tooltip Responsiveness
document.querySelectorAll(".btns button").forEach((button) => {
    button.addEventListener("mouseover", function (event) {
        let guesses;
        if (this.id === "easy") guesses = "Find in 7 guesses";
        else if (this.id === "medium") guesses = "Find in 5 guesses";
        else if (this.id === "hard") guesses = "Find in 3 guesses";
        else if (this.id === "survival") guesses = "Unlimited guesses";
        else if(this.id === "restart") guesses = "Restart";
        
        tooltip.innerText = guesses;
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";

        // Get screen width and tooltip width
        let tooltipWidth = tooltip.offsetWidth;
        let screenWidth = window.innerWidth;
        
        // Adjust position if it goes off-screen
        let leftPos = event.pageX;
        if (leftPos + tooltipWidth > screenWidth) {
            leftPos = screenWidth - tooltipWidth - 10; // Keep margin
        }

        tooltip.style.left = leftPos + "px";
        tooltip.style.top = (event.pageY - 30) + "px";
    });

    button.addEventListener("mouseleave", function () {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
    });
});

// 🌙 Load the saved theme when the page loads
document.addEventListener("DOMContentLoaded", function () {
    let savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
});

// Apply the selected theme
function applyTheme(theme) {
    if (theme === "dark") {
        body.classList.add("dark-mode");
        modebtn.innerText = "Light";
    } else {
        body.classList.remove("dark-mode");
        modebtn.innerText = "Dark";
    }
}

// Toggle dark/light mode and save to localStorage
modebtn.addEventListener("click", function () {
    let newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
});

// Start game with difficulty
function startGame(difficulty) {
    easy.style.display = "none";
    medium.style.display = "none";
    hard.style.display = "none";
    survival.style.display = "none";
    restart.style.display = "inline";

    isSurvivalMode = false;
    if (difficulty === "easy") maxAttempts = 7;
    else if (difficulty === "medium") maxAttempts = 5;
    else if (difficulty === "hard") maxAttempts = 3;

    attempts = maxAttempts;
    count.innerText = attempts;
    countLabel.innerHTML = `Remaining guesses: <span id="data">${attempts}</span>`;
    diff.innerText = `${difficulty.toUpperCase()} MODE`;
    diff.style.visibility = "visible";
}

// Start different difficulty modes
function e() { startGame("easy"); }
function m() { startGame("medium"); }
function h() { startGame("hard"); }
function s() { survivalMode(); }

// Start Survival Mode
function survivalMode() {
    isSurvivalMode = true;
    easy.style.display = "none";
    medium.style.display = "none";
    hard.style.display = "none";
    survival.style.display = "none";
    restart.style.display = "inline";
    attempts = 0;
    count.innerText = attempts;
    countLabel.innerHTML = `Total guesses: <span id="data">${attempts}</span>`;
    diff.innerText = "SURVIVAL MODE";
    diff.style.visibility = "visible";
}

// Function to check the guess
function checkGuess() {
    let guess = parseInt(input.value);

    if (isNaN(guess)) {
        info.innerHTML = "Please enter a valid number!";
        return;
    }
    if (guess > 100 || guess < 0) {
        info.innerHTML = "Enter a number between 0 and 100";
        return;
    }

    if (isSurvivalMode) {
        attempts++;
        count.innerText = attempts;
        countLabel.innerHTML = `Total guesses: <span id="data">${attempts}</span>`;
    } else {
        attempts--;
        if (attempts <= 0) {
            attempts = 0;
            count.innerText = attempts;
            heading.innerText = "You've run out of attempts!";
            heading.style.color = "red";
            info.innerHTML = `The number is ${random}`;
            countLabel.innerHTML = `Remaining guesses: <span id="data">${attempts}</span>`;
            submit.disabled = true;
            return;
        }
        count.innerText = attempts;
        countLabel.innerHTML = `Remaining guesses: <span id="data">${attempts}</span>`;
    }

    if (guess === random) {
        info.innerHTML = `The number is ${guess}!!!`;
        image.src = "7433-brilliant-move-chess.webp";
        heading.style.color = "green";
        heading.innerHTML = "You Guessed Correct!!";
        hints.innerText = "";
        submit.disabled = true;
    } else {
        if (guess > random) {
            info.innerHTML = `The number is less than ${guess}`;
            close = Math.min(close, guess);
        } else {
            info.innerHTML = `The number is greater than ${guess}`;
            open = Math.max(open, guess);
        }
        hints.innerHTML = `The number is between ${open} - ${close}`;
    }
}

// Restart the game
function r() {
    heading.innerText = "Guess The Number!";
    heading.color = "white";
    image.src = "qs_mark.webp";
    info.innerText = "Good Luck!";
    hints.innerText = "The number is between 0 - 100";
    easy.style.display = "inline";
    medium.style.display = "inline";
    hard.style.display = "inline";
    survival.style.display = "inline";
    restart.style.display = "none";
    random = Math.floor(Math.random() * 101);
    attempts = 0;
    count.innerText = attempts;
    open = 0;
    close = 100;
    isSurvivalMode = false;
    countLabel.innerHTML = `Total guesses: <span id="data">${attempts}</span>`;
    diff.style.visibility = "hidden";
    submit.disabled = false;
}

// Add event listeners
submit.addEventListener("click", checkGuess);
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});
