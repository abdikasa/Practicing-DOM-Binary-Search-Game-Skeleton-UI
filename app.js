//Set the DOM variables/selectors we'll be using.
let dialogueBox = ["Pick a number between 1 and 10.", "I promise I can guess the number you are thinking of with 5 guesses.", "Next I'll present you a series of questions. Answer them honestly.", "Press the button below to start the game"];
let index = 0; let iterator = 0;
let remaining = document.getElementById("time_left");
//let start = document.querySelector(".btn-begin");
let timeLeft = 5;
//let minScore = document.querySelector(".min-num");
//let maxScore = document.querySelector(".max-num");
//let numOfGuesses = Math.floor(((Number(minScore.textContent)) + Number(maxScore.textContent)) / 2)
//let guesses = document.querySelector(".numGuesses");
//guesses.innerHTML = ` ${numOfGuesses} `
let dialogue = document.querySelector(".dialogue")
let demo = document.querySelector(".demo");
let game = document.getElementById("game");

//User click button once, game starts
//Fixed the issue in which the user could click multiple times  and the timer would speed up.
//Button is disabled, will be set to false when the game ends.
// start.addEventListener("click", function () {
//     start.disabled = true;
//     let gameCount = window.setInterval(function () {
//         if (timeLeft === 0) {
//             window.clearTimeout(gameCount);
//             remaining.style.display = "none";
//             start.style.display = "none";
//         } else {
//             remaining.innerHTML = `<span class= "countdown"> ${timeLeft}s`;
//             timeLeft--;
//         }
//     }, 1000)
// })

document.addEventListener("DOMContentLoaded", printText);

function printText() {
    if (iterator < dialogueBox[index].length) {
        if (iterator === 0) {
            dialogue.innerHTML += `<p>`;
            console.log("beg")
        }
        console.log(iterator, index, "during");
        dialogue.innerHTML += `${dialogueBox[index].charAt(iterator)}`;
        iterator++;
        setTimeout(printText, 25);
    }
    else {
        if (iterator === dialogueBox[index].length) {
            console.log("end")
        }
        iterator = 0;
        index++;
        if (index === dialogueBox.length) {
            return;
        }
        setTimeout(printText, 25);
    }
}






