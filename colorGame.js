var colors = [];
var heading = document.getElementById("heading");
var squares = document.querySelectorAll(".square");
var goalColor = pickRandomColor();
var goalDisplay = document.getElementById("goalDisplay");
var message = document.querySelector("#message");
var resetButton = document.getElementById("newGame");

var score = 0;
var scoreMultiplier = 1.0;
var scoreDisplay = document.getElementById("scoreDisplay");

var diffButtons = document.querySelectorAll(".difficulty")

var difficulty = 'hard'

init();

function init() {
    for (var i = 0; i < diffButtons.length; i++) {
        diffButtons[i].addEventListener("click", switchDifficulty)
    }


    goalDisplay.textContent = goalColor;
    resetButton.addEventListener("click", function () {
        resetGame();
    })

    resetGame();
}

function addSquareListener() {
    var clickedColor = this.style.backgroundColor;
    // if the clicked color is the same as the goal color, tell the user they are correct, change the rest of the colors to that color, 
    // and change the heading to that color
    if (clickedColor === goalColor) {
        message.textContent = "Right! You're so good at this; great job! :)";
        changeColorsCorrect(clickedColor);
        resetButton.textContent = "Play again ";
        var moreMult;
        difficulty === 'hard' ? moreMult = 0.5 : moreMult = 0.25;
        updateScore(score + (1000 * scoreMultiplier), scoreMultiplier + moreMult);
        for (var i = 0; i < squares.length; i++) {
            squares[i].removeEventListener("click", addSquareListener);
        }
    } // otherwise, tell the user they are wrong/try again, change the clicked color to the background color
    else if (clickedColor !== goalColor) {
        message.textContent = "Wrong! Think a little bit harder!";
        this.style.backgroundColor = "#333131";
        resetScore();
    }
}

function switchDifficulty() {
    // Change the difficulty

    // change button disabled attributes depending on button press


    // if difficulty switches to easy, must reset game with 3 colors

    // otherwise, reset game with 6 colors

    // if game goes to easy, reduce score gain for a win

    // otherwise, return it to normal


    if (difficulty === 'easy') {
        difficulty = 'hard';
    }
    else {
        difficulty = 'easy';
    }
    resetGame()
    for (var i = 0; i < diffButtons.length; i++) {
        diffButtons[i].disabled = !diffButtons[i].disabled;
        diffButtons[i].classList.toggle("active");
        diffButtons[i].classList.toggle("selected");
    }
    resetScore()
}

function resetGame() {
    if (difficulty === 'easy') {
        var numSquares = 3;
    } else {
        var numSquares = 6;
    }
    // pick 6 new colors
    colors = generateColorsArray(numSquares);
    // assign the 6 new colors to the 6 squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block'
            squares[i].style.backgroundColor = colors[i];
            squares[i].addEventListener("click", addSquareListener);
            // change the last elements of the array to be grey if colors.length is 3
        } else {
            squares[i].style.display = "none";
            squares[i].removeEventListener("click", addSquareListener);
        }
    }

    // change the goal to color to a random color
    goalColor = pickRandomColor();


    // change the heading back to grey and the goal to the new goal
    heading.style.backgroundColor = "slateblue";

    // Update the score: if message.textContent has "right" in it keep score
    // otherwise reset score
    if (message.textContent.includes("Right")) {
        updateScore(score, scoreMultiplier);
    } else {
        resetScore()
    }

    // change the "right" or "wrong" message back to ""
    message.textContent = "";

    // change the text content to "New Colors "
    resetButton.textContent = "New Colors ";
    goalDisplay.textContent = goalColor;
}

function updateScore(newScore, scoreMult) {
    score = newScore;
    scoreMultiplier = scoreMult;
    scoreDisplay.textContent = score;
}

function resetScore() {
    difficulty === 'easy' ? updateScore(0, 0.25) : updateScore(0, 1.0);
}

function changeColorsCorrect(color) {
    for (var i = 0; i < colors.length; i++) {
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