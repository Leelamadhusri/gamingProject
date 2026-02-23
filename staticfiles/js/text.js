let randomNumber = Math.floor(Math.random() * 20) + 1;

function checkGuess() {
    let userGuess = parseInt(document.getElementById("guess").value);
    let result = document.getElementById("result");

    if (isNaN(userGuess)) {
        result.textContent = "Please enter a number!";
        result.style.color = "red";
        return;
    }

    if (userGuess < 1 || userGuess > 20) {
        result.textContent = "Number out of range (1-20)";
        result.style.color = "red";
    }
    else if (userGuess === randomNumber) {
        result.textContent = "🎉 Successful! You guessed it right!";
        result.style.color = "green";
    }
    else if (userGuess > randomNumber) {
        result.textContent = "Hint: Your number is greater than the actual number.";
        result.style.color = "blue";
    }
    else {
        result.textContent = "Hint: Your number is smaller than the actual number.";
        result.style.color = "blue";
    }
}
