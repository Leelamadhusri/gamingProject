const boxes = document.querySelectorAll('.box');
const question = document.getElementById('question');
const message = document.getElementById('message');
const hintsEl = document.getElementById('hints');

let correctColor = '';

function randInt(max = 255) {
    return Math.floor(Math.random() * (max + 1));
}

// return rgb string in normalized form: "rgb(r,g,b)"
function randomColor() {
    const r = randInt(255);
    const g = randInt(255);
    const b = randInt(255);
    return `rgb(${r},${g},${b})`;
}

function toRgbArray(rgbString) {
    // expects format like 'rgb(r,g,b)'
    const m = rgbString.match(/rgb\((\d+),(\d+),(\d+)\)/);
    if (!m) return null;
    return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
}

function toHex(rgbArray) {
    return (
        '#' +
        rgbArray
            .map(n => n.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase()
    );
}

function semanticHint(rgbString) {
    const arr = toRgbArray(rgbString);
    if (!arr) return '';

    const palette = [
        {name: 'Red', rgb: [255,0,0], hint: 'Associated with love, danger, and stop signs.'},
        {name: 'Green', rgb: [0,128,0], hint: 'Used for plants, nature, and growth.'},
        {name: 'Blue', rgb: [0,0,255], hint: 'Associated with the sky and ocean.'},
        {name: 'Yellow', rgb: [255,255,0], hint: 'Like the sun — bright and cheerful.'},
        {name: 'Orange', rgb: [255,165,0], hint: 'Warm, like sunsets and citrus fruit.'},
        {name: 'Purple', rgb: [128,0,128], hint: 'Often linked to royalty and creativity.'},
        {name: 'Pink', rgb: [255,192,203], hint: 'Soft and playful.'},
        {name: 'Brown', rgb: [165,42,42], hint: 'Earthy — think soil and wood.'},
        {name: 'Gray', rgb: [128,128,128], hint: 'Neutral, like concrete or clouds.'},
        {name: 'Black', rgb: [0,0,0], hint: 'Very dark — absence of light.'},
        {name: 'White', rgb: [255,255,255], hint: 'Bright — like snow or paper.'}
    ];

    function dist(a,b) {
        return Math.sqrt(
            Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2)+Math.pow(a[2]-b[2],2)
        );
    }

    const scored = palette.map(p => ({...p, d: dist(arr,p.rgb)}));
    scored.sort((x,y) => x.d - y.d);
    const best = scored[0];
    // Return only the human-friendly hint text — do not reveal the color name
    return best.hint;
}

function startGame() {
    message.innerText = '';

    const colors = [];
    for (let i = 0; i < 3; i++) {
        colors.push(randomColor());
    }
    correctColor = colors[Math.floor(Math.random() * colors.length)];

    // show only hints, not the exact rgb
    question.innerText = 'Find the color!';
    if (hintsEl) hintsEl.innerText = semanticHint(correctColor);

    boxes.forEach((box, index) => {
        // set background using normalized rgb
        box.style.backgroundColor = colors[index];
        // store normalized color on the element for reliable comparison
        box.dataset.color = colors[index];
        box.onclick = function() {
            checkAnswer(box.dataset.color);
        };
    });
}

function checkAnswer(selectedColor) {
    // compare normalized strings
    if (selectedColor === correctColor) {
        message.innerText = 'Correct! 🎉';
        message.style.color = 'green';
        // keep showing only the semantic hint; do not reveal exact color
    } else {
        message.innerText = 'Wrong! Try Again. ❌';
        message.style.color = 'red';
    }
}

startGame();
    