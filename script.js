const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const originText = document.querySelector("#origin-text textarea");
const acceptbutton = document.querySelector(".acceptbtn");

var timer = [0,0,0];
var interval;
var timerRunning = false;
originText.readOnly = true;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
};

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);

    timer[2]++;
    theTimer.innerHTML = currentTime;

    if (timer[2] == 100) {
        timer[1]++;
        timer[2] = 00;
    };
    if (timer[1] == 60) {
        timer[0]++;
        timer[1] = 00;
    };
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.value.substring(0, textEntered.length);

    if (textEntered == originText.value) {
        testWrapper.style.borderColor = "#429890";
        clearInterval(interval);
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0f";
        }
    }
};

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning && originText.readOnly == true ) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
};

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timerRunning = false;
    timer = [0,0,0];

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
};

function editText() {
    //Reset the test area
    clearInterval(interval);
    timerRunning = false;
    timer = [0,0,0];

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

    acceptbutton.classList.remove("hidden")
    originText.readOnly = false;
    testArea.readOnly = true;
}

function acceptBtnPressed() {
    acceptbutton.classList.add("hidden");
    originText.readOnly = true;
    testArea.readOnly = false;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
