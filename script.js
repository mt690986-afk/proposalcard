// Typing effect for message
const messageText = `From the moment I saw you,
My heart knew you were the one.
You are my smile on the darkest days,
The melody in every song I sing.

Will you make me the happiest man alive?
Will you be my girlfriend? 💍❤️`;

const messageEl = document.getElementById("message");
const yesBtn = document.getElementById("yesBtn");
const bgMusic = document.getElementById("bgMusic");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

// Set canvas size
function setCanvasSize() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// Typing effect function
function typeText(text, element, delay = 50) {
  let index = 0;
  element.textContent = "";
  const timer = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index === text.length) clearInterval(timer);
  }, delay);
}
typeText(messageText, messageEl, 50);

// Confetti animation setup
const confettiPieces = [];
const colors = ["#ff2e63", "#ff477e", "#ff77aa", "#ff99bb", "#ffb3c6"];
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

class Confetti {
  constructor() {
    this.x = Math.random() * canvasWidth;
    this.y = canvasHeight + 10;
    this.size = randomRange(5, 10);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.velocity = {
      x: randomRange(-5, 5),
      y: randomRange(-15, -10),
    };
    this.angle = randomRange(0, 2 * Math.PI);
    this.angularVelocity = randomRange(-0.1, 0.1);
  }
  update() {
    this.velocity.x -= this.velocity.x * drag;
    this.velocity.y = Math.min(this.velocity.y + gravity, terminalVelocity);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.angle += this.angularVelocity;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.4);
    ctx.restore();
  }
}

function createConfettiPieces(amount) {
  for (let i = 0; i < amount; i++) {
    confettiPieces.push(new Confetti());
  }
}

function renderConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach((piece, index) => {
    piece.update();
    piece.draw(ctx);
    if (piece.y > canvasHeight + 20) {
      confettiPieces.splice(index, 1);
    }
  });
  if (confettiPieces.length > 0) {
    requestAnimationFrame(renderConfetti);
  } else {
    confettiCanvas.style.display = "none";
  }
}

// Handle yes button click
yesBtn.addEventListener("click", () => {
  // Play music if not already playing
  if (bgMusic.paused) {
    bgMusic.play();
  }
  // Show confetti canvas
  confettiCanvas.style.display = "block";
  createConfettiPieces(150);
  renderConfetti();

  alert("Zain says: Rabia, you make my world complete! I love you 💖");
});
