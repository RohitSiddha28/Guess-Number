let input = document.getElementById("userinput");
let image = document.querySelector(".photo img");
let heading = document.querySelector("h1");
let count = document.getElementById("data");
let random = Math.floor(Math.random() * 101);
let hints = document.querySelector(".hints");
let info = document.querySelector(".info");
let submit = document.getElementById("Submit");
let open = 0;
let close = 100;
let modebtn = document.getElementById("mode");
let body = document.body; 

modebtn.addEventListener("click", function() {
    body.classList.toggle("dark-mode");
    if(body.classList.contains("dark-mode")) {
        modebtn.innerText = "Light";
    }
    else {
        modebtn.innerText = "Dark";
    }
});

function checkguess() {
    let guess = parseInt(input.value); 
    if (parseInt(count.innerHTML) === 0) {
        input.setAttribute("placeholder", "");
    }
    if (isNaN(guess)) {
        info.innerHTML = "Please enter a valid number!";
        return;
    }
    if (guess > 100) {
        info.innerHTML = "Warning: The value must be less than 100";
        return;
    }
    if (guess < 0) {
        info.innerHTML = "The value must be greater than 0";
        return;
    }
    count.innerHTML = parseInt(count.innerHTML) + 1;
    if (guess === random) {
        info.innerHTML = `The number is ${guess}!!!`;
        image.src = "7433-brilliant-move-chess.webp";
        image.alt = "photo";
        heading.innerHTML = "You Guessed Correct!!";
    } else {
        if (guess > random) {
            info.innerHTML = `The value is less than ${guess}`;
            close = Math.min(close, guess);
        } else {
            info.innerHTML = `The value is greater than ${guess}`;
            open = Math.max(open, guess);
        }
        hints.innerHTML = `The number is between ${open} - ${close}`;
    }
}
submit.addEventListener("click", checkguess);
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkguess();
    }
});
