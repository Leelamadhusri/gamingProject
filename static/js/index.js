let choices = ["rock", "paper", "scissors"];

let playerScore = 0;
let computerScore = 0;
let roundCount = 0;
const MAX_ATTEMPTS = 5;

function remainingAttempts() {
    return Math.max(0, MAX_ATTEMPTS - roundCount);
}

function updateUI() {
    const pEl = document.getElementById('player-score');
    const cEl = document.getElementById('computer-score');
    const aEl = document.getElementById('attempts-left');
    if (pEl) pEl.innerText = playerScore;
    if (cEl) cEl.innerText = computerScore;
    if (aEl) aEl.innerText = remainingAttempts();

    console.debug('updateUI', { playerScore, computerScore, roundCount, remaining: remainingAttempts() });

    // disable choice buttons when attempts exhausted
    const choiceBtns = document.querySelectorAll('.choice-btn');
    if (remainingAttempts() <= 0) {
        choiceBtns.forEach(b => b.disabled = true);
    } else {
        choiceBtns.forEach(b => b.disabled = false);
    }
}

function declareFinalWinner() {
    const resultEl = document.getElementById('result');
    if (!resultEl) return;
    if (playerScore > computerScore) {
        resultEl.innerText = `Game Over — Final Winner: Player (${playerScore} vs ${computerScore})`;
    } else if (computerScore > playerScore) {
        resultEl.innerText = `Game Over — Final Winner: Computer (${computerScore} vs ${playerScore})`;
    } else {
        resultEl.innerText = `Game Over — It's a Tie (${playerScore} - ${computerScore})`;
    }
}

function playGame(userChoice) {
    if (remainingAttempts() <= 0) {
        declareFinalWinner();
        return;
    }

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const computerEl = document.getElementById('computer');
    if (computerEl) computerEl.innerText = `Computer chose: ${computerChoice}`;

    let result = '';
    if (userChoice === computerChoice) {
        result = "It's a Draw 🤝";
        // draws do not consume an attempt (same as dice game)
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You Win 🎉';
        playerScore += 1;
        roundCount += 1;
    } else {
        result = 'You Lose 😢';
        computerScore += 1;
        roundCount += 1;
    }

    const resultEl = document.getElementById('result');
    if (resultEl) resultEl.innerText = result;

    console.debug('playGame result', { userChoice, computerChoice, playerScore, computerScore, roundCount });

    updateUI();

    if (remainingAttempts() <= 0) {
        declareFinalWinner();
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundCount = 0;
    const computerEl = document.getElementById('computer');
    if (computerEl) computerEl.innerText = '';
    const resultEl = document.getElementById('result');
    if (resultEl) resultEl.innerText = 'Make your move!';
    updateUI();
}

document.addEventListener('DOMContentLoaded', function() {
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetGame);
    updateUI();
});
