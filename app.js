
//Set the DOM variables/selectors we'll be using.

let dialogueBox = ["Pick a number between 1 and 10.", "I promise I can guess the number you are thinking of with 5 guesses.", "Next I'll present you a series of questions. Answer them honestly.", "Press the button below to start the game"];
let index = 0; let iterator = 0;
let remaining = document.getElementById("time_left");
let buttonStart;
let start = document.querySelector(".btn-begin");
let timeLeft = 5;

//let minScore = document.querySelector(".min-num");
//let maxScore = document.querySelector(".max-num");
//let numOfGuesses = Math.floor(((Number(minScore.textContent)) + Number(maxScore.textContent)) / 2)
//let guesses = document.querySelector(".numGuesses");
//guesses.innerHTML = ` ${numOfGuesses} `

let dialogue = document.querySelectorAll(".dialogue > p")
let demo = document.querySelector(".demo");
let game = document.getElementById("game");
let timer = document.querySelector(".timer");
let buttonOn = addButton("start");
buttonOn.style.display = "none";


// User click button once, game starts
// Fixed the issue in which the user could click multiple times  and the timer would speed up.
// Button is disabled, will be set to false when the game ends.
//Every second using setInterval function we can display a countdown of 5 seconds.

buttonOn.addEventListener("click", buttonWorks);

function buttonWorks() {
    buttonOn.disabled = true;
    let gameCount = window.setInterval(function () {
        if (timeLeft === 0) {
            window.clearTimeout(gameCount);
            remaining.style.display = "none";
            buttonOn.style.display = "none";
        } else {
            remaining.innerHTML = `<span class= "countdown"> ${timeLeft}s</span>`;
            timeLeft--;
        }
    }, 1000)
}

//As DOM is loaded and ready to be used, calls printText function
//I have an array of text, it will parse through each cell, print each letter, then reset the function and iterate to the next letter.
//Once iterator is no longer greater than the array cell, we skip a line, reset the iterator, and move on to the next cell and call the function again.
//I added an additional if statement to prevent the iterator/index from exceeding the length of the dialogueBox variable.
//Lastly, we show  the hidden button.

document.addEventListener("DOMContentLoaded", printText);

function printText() {
    if (iterator < dialogueBox[index].length) {
        dialogue[index].innerHTML += `${dialogueBox[index].charAt(iterator)}`;
        iterator++;
        setTimeout(printText, 20);
    }
    else {
        dialogue.innerHTML += '<br>';
        iterator = 0;
        index++;
        if (index === dialogueBox.length) {
            buttonOn.style.display = "block";
            return;
        }
        setTimeout(printText, 20);

    }
}

//Function to add button, adds the css classname I added, and used the insertbefore() method I learned recently
//insertBefore ------>    parentNode.insertBefore(the element you want (former), the element you want followed after the former (latter))

function addButton(text) {
    let btn = document.createElement("button");
    btn.className = "btn-begin";
    btn.appendChild(document.createTextNode(text));
    game.insertBefore(btn, timer);
    return btn;
}


//matchRegex(str)
//Finds period and does something. Old method I used to seperate the DOM variable and split the paragraph into array cells.
// function matchRegex(str)
// {
//         if(str.match(/[.]/)){}
//         else {}
// }
// matchRegex(dialogueBox[0]);
