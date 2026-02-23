

function rollDice() {
    // prevent rolling if no attempts left
    if (remainingAttempts() <= 0) {
        const resultElement = document.getElementById("result");
        if (resultElement) resultElement.innerText = "No attempts left — declare final winner or reset.";
        return;
    }

    // 1. Get random numbers
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    // 2. Access the hidden path data from the HTML (data-d1..data-d6)
    const pathData = document.getElementById("dice-paths").dataset;

    // 3. Update the images using the paths Django already calculated.
    // dataset keys are like 'd1','d2' so build the property name.
    const p1 = pathData['d' + d1];
    const p2 = pathData['d' + d2];

    // Fallback to /static path if for some reason dataset isn't available
    const die1 = document.getElementById('dice1');
    const die2 = document.getElementById('dice2');
    if (die1) die1.src = p1 || ('/static/images/die' + d1 + '.png');
    if (die2) die2.src = p2 || ('/static/images/die' + d2 + '.png');

    // 4. Result Logic & scoring
    const resultElement = document.getElementById("result");
    if (!resultElement) return;

    // Only count attempts when there is a decisive win (no draws)
    if (d1 > d2) {
        resultElement.innerText = "Player Wins! 🎉";
        resultElement.className = "winner-text";
        playerScore += 1;
        rollCount += 1;
    } else if (d1 < d2) {
        resultElement.innerText = "Computer Wins! 🤖";
        resultElement.className = "loser-text";
        computerScore += 1;
        rollCount += 1;
    } else {
        // draw: do not consume an attempt
        resultElement.innerText = "It's a Draw! 🤝";
        resultElement.className = "";
    }

    updateUI();

}


// --- simple state and helpers ---
let playerScore = 0;
let computerScore = 0;
let rollCount = 0;
const MAX_ATTEMPTS = 5;

function remainingAttempts() {
    return Math.max(0, MAX_ATTEMPTS - rollCount);
}

function updateUI() {
    const pEl = document.getElementById('player-score');
    const cEl = document.getElementById('computer-score');
    const aEl = document.getElementById('attempts-left');
    if (pEl) pEl.innerText = playerScore;
    if (cEl) cEl.innerText = computerScore;
    if (aEl) aEl.innerText = remainingAttempts();
}

document.addEventListener('DOMContentLoaded', function() {
    const rollBtn = document.getElementById('roll-btn');
    if (rollBtn) rollBtn.addEventListener('click', rollDice);
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetGame);
    updateUI();
});

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    rollCount = 0;

    // reset images to initial dice 1 and 2 (use dataset if available)
    const die1 = document.getElementById('dice1');
    const die2 = document.getElementById('dice2');
    const pathsEl = document.getElementById('dice-paths');
    if (pathsEl && pathsEl.dataset) {
        const data = pathsEl.dataset;
        if (die1) die1.src = data.d1 || '/static/images/die1.png';
        if (die2) die2.src = data.d2 || '/static/images/die2.png';
    } else {
        if (die1) die1.src = '/static/images/die1.png';
        if (die2) die2.src = '/static/images/die2.png';
    }

    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerText = 'Roll the dice!';
        resultElement.className = '';
    }

    updateUI();
}

