var colors = generateColorsArray(6);

var squares = document.querySelectorAll(".square");
var goalColor = pickRandomColor();
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");

colorDisplay.textContent = goalColor;

for (var i = 0; i < squares.length; i++) {
    // add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    // add click listener to squares
    squares[i].addEventListener("click", function () {
        var clickedColor = this.style.backgroundColor;
        // if the clicked color is the same as the goal color, tell the user they are correct, change the rest of the colors to that color, 
        // and change the heading to that color
        console.log(clickedColor, goalColor);
        if (clickedColor === goalColor) {
            message.textContent = "Right! You're so good at this; great job! :)";
            changeColorsCorrect(clickedColor);
        } // otherwise, tell the user they are wrong/try again, change the clicked color to the background color
        else {
            message.textContent = "Wrong! Think a little bit harder!";
            this.style.backgroundColor = "#333131";
        }


    })
}

function changeColorsCorrect(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
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
    return str;
}