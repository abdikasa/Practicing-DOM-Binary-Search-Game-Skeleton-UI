
//Set the DOM variables/selectors we'll be using.


let index = 0; let iterator = 0;
let remaining = document.getElementById("time_left");
let buttonStart;
let start = document.querySelector(".btn-begin");
let timeLeft = 5;
let container = document.querySelector(".container");
let lower = document.querySelector("#lower");
let upper = document.querySelector("#upper");
let modal_btn = document.querySelector(".submit-score");
let form = document.querySelector("#form-rules");
let close_icon = document.querySelector(".close-icon");
close_icon.disabled = true;
let dialogue = document.querySelectorAll(".dialogue > p")
let demo = document.querySelector(".demo");
let game = document.getElementById("game");
let timer = document.querySelector(".timer");
let buttonOn = addButton("start");
buttonOn.style.display = "none";
let dialogueBox = [
    `Next I'll present you a series of questions. Answer them honestly.`,
    `Press the button below to start the game`];


// User click button once, game starts
// Fixed the issue in which the user could click multiple times  and the timer would speed up.
// Button is disabled, will be set to false when the game ends.
//Every second using setInterval function we can display a countdown of 5 seconds.

buttonOn.addEventListener("click", buttonWorks);
close_icon.addEventListener("click", function () {
    let lowerScore = storeInputs(lower, upper)[0];
    let upperScore = storeInputs(lower, upper)[1];
    let average = Math.floor((Math.log2(upperScore - lowerScore+1)));
    let lowerUpper = `Pick a number between ${lowerScore} and ${upperScore}. I promise I can guess the number you are thinking of with ${average} guesses.`;
    dialogueBox.unshift(lowerUpper);
    let modal = document.querySelector(".modal");
    modal.style.opacity = "0";
    container.style.display = "block";
    window.setTimeout(function () { modal.style.display = "none" }, 3000)
    container.style.opacity = "1";
    window.setTimeout(printText, 2000);
})

form.addEventListener("submit", function (e) {
    lower.value = Math.abs((lower.value));
    upper.value = Math.abs((upper.value));

    if ((checkForEmpty(lower) || checkForEmpty(upper)) || (lower.value === "0" && upper.value === "0")) {
        showError("Lower or/and upper limits are blank", "alert")
        clearError();
        buttonDisabled();
        //returns 0 for upper and lower due to line 44-45
    } else if (Number(lower.value) > Number(upper.value)) {
        check(lower, upper);
        //use Number otherwise string aka logic error.

    } else if (Number(upper.value) - Number(lower.value) >= 101) {
        showError("Lower and Upper must have a difference of at most 100", "alert")
        //use Number otherwise string aka logic error.
        clearError();
        buttonDisabled();
    } else {
        showError("Inputs are correct, click the 'X' at the top right to begin!", "success")
        modal_btn.style.display = "none";
        window.setTimeout(function () { document.querySelector(".success").style.opacity = "0" }, 2000)
        close_icon.disabled = false;
    }

    e.preventDefault();
})

function storeInputs(input1, input2) {
    return [input1.value, input2.value];
}

function checkForEmpty(input) {
    if (input.value.length === 0) {
        return true;
    } else {
        return false;
    }
}


function check(lower, upper) {
    return Math.abs(Number(lower.value)) > Math.abs(Number(upper.value)) ? swap(lower, upper) : console.log("Let the games begin!")
}

function swap(lower, upper) {
    [lower.value, upper.value] = [upper.value, lower.value];
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
}

function clearAlerts() {
    document.querySelector(".alert").style.opacity = "0";
}

function deleteAlerts() {
    document.querySelector(".alert").remove();
}


function buttonDisabled() {
    window.setTimeout(clearAlerts, 2000);
    window.setTimeout(deleteAlerts, 3000);
    modal_btn.disabled = true;
    modal_btn.textContent = "Disabled"
    setTimeout(function () { modal_btn.disabled = false; modal_btn.textContent = "Press To Start" }, 3000);
}






















//matchRegex(str)
//Finds period and does something. Old method I used to seperate the DOM variable and split the paragraph into array cells.
// function matchRegex(str)
// {
//         if(str.match(/[.]/)){}
//         else {}
// }
// matchRegex(dialogueBox[0]);





