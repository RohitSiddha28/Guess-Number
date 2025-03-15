let input = document.getElementById("userinput");
let image = document.querySelector(".photo img");
let heading = document.querySelector("h1");
let count = document.getElementById("data");
let random = Math.floor(Math.random()*101);
let hints = document.querySelector(".hints");
let info = document.querySelector(".info");
let open = 0;
let close = 100;
info.innerHTML = "Good Luck!";
info.style.fontSize = "25px";
input.addEventListener("change",function() {
    let guess = parseInt(input.value);
    count.innerHTML = parseInt(count.innerHTML) + 1;
    if(guess == random) {
        info.innerHTML = `The number is ${guess}!!!`;
        image.src = "7433-brilliant-move-chess.webp";
        image.alt = "photo";
        heading.innerHTML = "You Guessed Correct!!"
    }
    else if(guess > 100) {
        info.innerHTML = `Warning: The value is must less than 100`;
    }
    else if(guess < 0) {
        info.innerHTML = `The value is must greater than 0`;
    }
    else {
        if(guess > random) {
            info.innerHTML = `The value is less than ${guess}`;
            close = Math.min(close, guess);
        }
        else {
            info.innerHTML = `The value is greater than ${guess}`;
            open = Math.max(open, guess);
        }
        hints.innerHTML = `The number is between ${open} - ${close}`;
    }
})