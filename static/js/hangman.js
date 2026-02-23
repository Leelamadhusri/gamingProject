const words = [
    { word: "orange", hint: "Fruit" },{ word: "banana", hint: "Fruit" },{ word: "apple", hint: "Fruit" },{ word: "mango", hint: "Fruit" },
    { word: "Maths", hint: "subject with logic" },{ word: "pencil", hint: "school essential" },{ word: "elephant", hint: "Big animal" },
    { word: "science", hint: "subject of magic" },{ word: "english", hint: "subject of world" },{ word: "sunflower", hint: "flower" },
    { word: "javascript", hint: "programming language" },{ word: "python", hint: "programming language" },{ word: "computer", hint: "electronic device" },{ word: "giraffe", hint: "tall animal" },
    { word: "football", hint: "sport" },{ word: "basketball", hint: "sport" },{ word: "tennis", hint: "sport" },{ word: "volleyball", hint: "sport" },
    { word: "chocolate", hint: "sweet treat" },{ word: "strawberry", hint: "fruit very rare" },{ word: "watermelon", hint: "fruit with full of seeds" },{ word: "pineapple", hint: "fruit looks like flower" },
    { word: "rainbow", hint: "colorful arc in the sky" },{ word: "mountain", hint: "tall landform" },{ word: "ocean", hint: "large body of water" },{ word: "desert", hint: "dry, sandy area" },
    { word: "guitar", hint: "musical instrument with strings" },{ word: "piano", hint: "musical instrument with keys" },{ word: "drums", hint: "musical instrument you hit" },{ word: "violin", hint: "musical instrument you bow" },
    { word: "sunrise", hint: "when the sun comes up" },{ word: "sunset", hint: "when the sun goes down" },{ word: "moonlight", hint: "light from the moon" },{ word: "starlight", hint: "light from stars" },
];

let selectedWord = "";
let guessedLetters = [];
let attempts = 6;
let hint = "";

function startGame() {
    const random = words[Math.floor(Math.random() * words.length)];
    selectedWord = random.word;
    hint = random.hint;

    attempts = 6;

    // ⭐ Pattern hint: reveal some letters
    guessedLetters = [
        selectedWord[1],
        selectedWord[4],
        selectedWord[selectedWord.length - 1]
    ];

    document.getElementById("attempts").innerText = attempts;
    document.getElementById("hint").innerText = "Hint: " + hint;
    document.getElementById("message").innerText = "";

    updateWordDisplay();
}

function updateWordDisplay() {
    let display = "";

    for (let letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }

    document.getElementById("word").innerText = display.trim();
}

function guessLetter() {
    const input = document.getElementById("letterInput");
    const letter = input.value.toLowerCase();
    input.value = "";

    if (!letter || guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);

    if (!selectedWord.includes(letter)) {
        attempts--;
        document.getElementById("attempts").innerText = attempts;
    }

    updateWordDisplay();
    checkGameStatus();
}

function checkGameStatus() {
    if (!document.getElementById("word").innerText.includes("_")) {
        document.getElementById("message").innerText = "You Win 🎉";
    } else if (attempts === 0) {
        document.getElementById("message").innerText =
            "Game Over ❌ Word was: " + selectedWord;
    }
}

startGame();
