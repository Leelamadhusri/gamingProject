const BALL_COUNT = 10;
const balls = [];
const gameArea = document.getElementById("gameArea");
const scoreBoard = document.getElementById("scoreBoard");

let score = 0;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomColor() {
    return `rgb(${Math.floor(random(0, 255))},
                ${Math.floor(random(0, 255))},
                ${Math.floor(random(0, 255))})`;
}

// Create balls
for (let i = 0; i < BALL_COUNT; i++) {

    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.backgroundColor = randomColor();

    const size = random(30, 60);
    ball.style.width = size + "px";
    ball.style.height = size + "px";

    // 🖱️ Click to score
    ball.addEventListener("click", () => {
        score++;
        scoreBoard.innerText = "Score: " + score;
        ball.style.backgroundColor = randomColor();
    });

    gameArea.appendChild(ball);

    balls.push({
        element: ball,
        x: random(0, window.innerWidth - size),
        y: random(0, window.innerHeight - size),
        dx: random(-4, 4),
        dy: random(-4, 4),
        size: size
    });
}

function animate() {
    balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x <= 0 || ball.x + ball.size >= window.innerWidth) {
            ball.dx *= -1;
        }

        if (ball.y <= 0 || ball.y + ball.size >= window.innerHeight) {
            ball.dy *= -1;
        }

        ball.element.style.left = ball.x + "px";
        ball.element.style.top = ball.y + "px";
    });

    requestAnimationFrame(animate);
}

animate();
