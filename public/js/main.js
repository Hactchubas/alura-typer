
let startingTime = $("#remainingTime").text()
let field = $("#typeField");
let timeCountId = 0;
var intervals = [];

$(document).ready(function () {
    updatePhraseSize();

    // Update character and words event by input on textarea
    counterInitializer();

    // Timer Event Init
    timerInitializer();

    // Restart Game Click Event
    restartGameSetup();

    // Score Buttons Setup
    removeButtonStup(".removeButton");
});


// Count game phrase words
function updatePhraseSize() {
    let phrase = $("#phrase").text();
    $(".nWords").text(phrase.split(/\S+/).length - 1);
}


// Restart game setup
function restartGameSetup() {
    $("#restartGameButton").click(() => {
        field.val("");
        field.attr("disabled", false);

        $("#remainingTime").text(startingTime);
        timerInitializer();
        counterInitializer();


        field.removeClass("disabled_typeField");
    });
}


// Textarea characters and words counter
function counterInitializer() {
    $(".charactersTyped").text("0");
    $(".wordsTyped").text("0");

    field.on("input", () => {
        countCharactersWords();
        checkTextValid();
    });

}

function countCharactersWords() {
    let typed = field.val();
    $(".charactersTyped").text(typed.split("").length);
    $(".wordsTyped").text(typed.split(/\S+/).length - 1);
}

function checkTextValid() {
    let phrase = $("#phrase").text();
    let typed = field.val();
    let comparableStr = phrase.substr(0, typed.length);

    field.addClass("incorrect_field");
    field.removeClass("correct_field");
    if (comparableStr == typed && typed != "") {
        field.addClass("correct_field");
        field.removeClass("incorrect_field");
    }
}


// Timer count down initializer
function timerInitializer() {
    // Guarantee interval end before starting new one
    myClearIntervals(timeCountId)
    field.one("focus", () => {
        myClearIntervals(timeCountId)
        timeCountId = setInterval(timer, 1000);
        intervals.push(timeCountId)
    });
}

function myClearIntervals(clearId) {
    intervals.map(clearInterval)
    const index = intervals.indexOf(clearId);
    intervals.splice(index, 1);
}

// Timer count down event
function timer() {
    remainingTime = $("#remainingTime").text()
    if (remainingTime < 1) {
        endGame();
        return
    }
    remainingTime--;
    $("#remainingTime").text(remainingTime);

}

function endGame() {
    field.attr("disabled", true);
    myClearIntervals();
    field.toggleClass("disabled_typeField");
    insertScore();
}





