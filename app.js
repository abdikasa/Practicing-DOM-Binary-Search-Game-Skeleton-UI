
//Set the DOM variables/selectors we'll be using.

let dialogueBox = ["Pick a number between 1 and 10.", "I promise I can guess the number you are thinking of with 5 guesses.", "Next I'll present you a series of questions. Answer them honestly.", "Press the button below to start the game"];
let index = 0; let iterator = 0;
let remaining = document.getElementById("time_left");
let buttonStart;
let start = document.querySelector(".btn-begin");
let timeLeft = 5;
let container = document.querySelector(".container");
let lower = document.querySelector("#lower");
let upper = document.querySelector("#upper");
let modal_btn = document.querySelector(".submit-score");

//let minScore = document.querySelector(".min-num");
//let maxScore = document.querySelector(".max-num");
//let numOfGuesses = Math.floor(((Number(minScore.textContent)) + Number(maxScore.textContent)) / 2)
//let guesses = document.querySelector(".numGuesses");
//guesses.innerHTML = ` ${numOfGuesses} `
let close_icon = document.querySelector(".close-icon");
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
close_icon.addEventListener("click", function () {
    let modal = document.querySelector(".modal");
    modal.style.opacity = "0";
    container.style.opacity = "1";
})

modal_btn.addEventListener("click", function () {
    if (checkForEmpty(lower) || checkForEmpty(upper)) {
        showError("Lower or/and upper limits are blank", "alert")

    }
})

function checkForEmpty(input) {
    if (input.value.length === 0) {
        return true;
    } else {
        return false;
    }
}


function check(lower, upper) {
    lower.value > upper.value ? swap() : console.log("Let the games begin!")
}

function swap() {
    let temp = lower.value;
    lower = upper.value;
    upper = temp;
}

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

//document.addEventListener("DOMContentLoaded", printText);

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

function clearError() {
    //Hide results
    lower.value = "";
    upper.value = ""
}

function showError(error, string) {
    const newDiv = document.createElement("div");

    //Retrieving the parent elements of this newely created div.
    const modalParent = document.querySelector(".modal-error");
    const modal_content = document.querySelector(".modal-content");

    //add the bootstrap class name for errors
    newDiv.className = string;
    //appending
    newDiv.appendChild(document.createTextNode(error));

    //To insert a created element between 2 elements like card and heading in this case
    //parentDOM.insertBefore("our desired element", "the element we want to be followed after")
    modalParent.insertBefore(newDiv, modal_content);
    //Set Timeout will get rid of our error div we created within 3000 milliseconds or 3 seconds.
    clearError();
    buttonDisabled();
}

function clearAlerts() {
    document.querySelector(".alert").style.opacity = "0";
}

function deleteAlerts() {
    document.querySelector(".alert").remove();
}


function buttonDisabled() {
    window.setTimeout(clearAlerts, 3000);
    window.setTimeout(deleteAlerts, 4000);
    modal_btn.disabled = true;
    setTimeout(function () { modal_btn.disabled = false; }, 4000);
}






















//matchRegex(str)
//Finds period and does something. Old method I used to seperate the DOM variable and split the paragraph into array cells.
// function matchRegex(str)
// {
//         if(str.match(/[.]/)){}
//         else {}
// }
// matchRegex(dialogueBox[0]);





