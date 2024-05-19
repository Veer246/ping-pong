const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerWidth = 10;
const playerHeight = 100;
const ballSize = 10;

let player1 = { x: 0, y: canvas.height / 2 - playerHeight / 2, score: 0 };
let player2 = { x: canvas.width - playerWidth, y: canvas.height / 2 - playerHeight / 2, score: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };

document.getElementById('player1Score').textContent = player1.score;
document.getElementById('player2Score').textContent = player2.score;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y <= 0 || ball.y >= canvas.height) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (
        (ball.x <= player1.x + playerWidth && ball.y >= player1.y && ball.y <= player1.y + playerHeight) ||
        (ball.x >= player2.x - playerWidth && ball.y >= player2.y && ball.y <= player2.y + playerHeight)
    ) {
        ball.dx *= -1;
    }

    // Ball goes out of bounds to the left
    if (ball.x <= 0) {
        player2.score++;
        document.getElementById('player2Score').textContent = player2.score;
        resetBall();
    }

    // Ball goes out of bounds to the right
    if (ball.x >= canvas.width) {
        player1.score++;
        document.getElementById('player1Score').textContent = player1.score;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

function updatePlayer1(event) {
    const canvasRect = canvas.getBoundingClientRect();
    player1.y = event.clientY - canvasRect.top - playerHeight / 2;
}

function updatePlayer2() {
    const centerY = ball.y - playerHeight / 2;
    if (player2.y < centerY) {
        player2.y += 6;
    } else if (player2.y > centerY) {
        player2.y -= 6;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(player1.x, player1.y, playerWidth, playerHeight, 'lime');
    drawRect(player2.x, player2.y, playerWidth, playerHeight, 'red');
    drawBall(ball.x, ball.y, ballSize, 'white');
}

function gameLoop() {
    updateBall();
    updatePlayer2();
    draw();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('mousemove', updatePlayer1);
gameLoop();
