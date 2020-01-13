var colors = generateColorsArray(6);
var heading = document.getElementById("heading");
var squares = document.querySelectorAll(".square");
var goalColor = pickRandomColor();
var goalDisplay = document.getElementById("goalDisplay");
var message = document.querySelector("#message");
var resetButton = document.getElementById("newGame");

var score = 0;
var scoreMultiplier = 1.0;
var scoreDisplay = document.getElementById("scoreDisplay");

goalDisplay.textContent = goalColor;
resetButton.addEventListener("click", function () {
    // pick 6 new colors
    colors = generateColorsArray(6);
    // assign the 6 new colors to the 6 squares
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }

    // change the goal to color to a random color
    goalColor = pickRandomColor();


    // change the heading back to grey and the goal to the new goal
    heading.style.backgroundColor = "#333131";

    // Update the score: if message.textContent has "right" in it keep score
    // otherwise reset score
    if (message.textContent.includes("Right")) {
        updateScore(score, scoreMultiplier);
    } else {
        updateScore(0, 1.0);
    }

    // change the "right" or "wrong" message back to "pick a color"
    message.textContent = "Pick a color "

    // change the text content to "New Colors "
    resetButton.textContent = "New Colors ";
    goalDisplay.textContent = goalColor;
})

for (var i = 0; i < squares.length; i++) {
    // add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    // add click listener to squares
    squares[i].addEventListener("click", function () {
        var clickedColor = this.style.backgroundColor;
        // if the clicked color is the same as the goal color, tell the user they are correct, change the rest of the colors to that color, 
        // and change the heading to that color
        if (clickedColor === goalColor) {
            message.textContent = "Right! You're so good at this; great job! :)";
            changeColorsCorrect(clickedColor);
            resetButton.textContent = "Play again "
            updateScore(score + (100 * scoreMultiplier), scoreMultiplier + 0.5);
        } // otherwise, tell the user they are wrong/try again, change the clicked color to the background color
        else {
            message.textContent = "Wrong! Think a little bit harder!";
            this.style.backgroundColor = "#333131";
            updateScore(0, 1.0)
        }


    })
}

function updateScore(newScore, scoreMult) {
    score = newScore;
    scoreMultiplier = scoreMult;
    scoreDisplay.textContent = score;
}

function changeColorsCorrect(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    heading.style.backgroundColor = color;
}

function pickRandomColor() {
    var randomNum = Math.floor(Math.random() * colors.length);
    return colors[randomNum];
}

function generateColorsArray(array_length) {
    // make an array of rgb(num, num, num) with array_length random colors
    // each num should be a random number between 0 and 255
    arr = [];
    for (var i = 0; i < array_length; i++) {
        var rgb = generateRandomColor();
        arr.unshift(rgb)
    }
    return arr;
}

function generateRandomColor() {
    // each num should be a random number between 0 and 255
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var str = "rgb(" + r + ", " + g + ", " + b + ")";
    // use below line to test game
    // return "rgb(0, 255, 255)"
    return str;
}